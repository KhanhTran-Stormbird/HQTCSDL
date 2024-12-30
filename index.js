const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');  // Import express-session
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const app = express();

// Session middleware configuration
app.use(session({
  secret: 'your-secret-key',  // Replace with a strong, secure key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true in production with HTTPS
}));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Kết nối cơ sở dữ liệu
require('./dbConfig');

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(productRoutes);
app.use(userRoutes); 
app.use(authRoutes);

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
