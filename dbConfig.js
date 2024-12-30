const mssql = require('mssql');

const config = {
  user: 'sa',
  password: '12341234',
  server: 'APEX-PREDATOR',
  database: 'QuanLyKhoHang',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

// Create and return the connection pool, keep it open globally
let poolPromise;

async function createPool() {
  try {
    poolPromise = mssql.connect(config);
    console.log('Connected to SQL Server');
  } catch (err) {
    console.error('SQL Server connection error:', err);
  }
}

// Initialize the connection pool when the app starts
createPool();

module.exports = poolPromise;
