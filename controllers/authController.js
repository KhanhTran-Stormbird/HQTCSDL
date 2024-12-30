const sql = require('mssql');
const poolPromise = require('../dbConfig'); // Sử dụng pool từ dbConfig

// Hiển thị form đăng nhập
function showLoginForm(req, res) {
    res.render('login', { error: null });
}

// Xử lý đăng nhập
async function loginUser(req, res) {
    const { username, password } = req.body;

    // Kiểm tra nếu thiếu tên người dùng hoặc mật khẩu
    if (!username || !password) {
        return res.render('login', { error: 'Username and password are required' });
    }

    let pool;

    try {
        // Sử dụng kết nối từ pool đã mở sẵn
        pool = await poolPromise;

        // Truy vấn cơ sở dữ liệu để xác thực người dùng
        const result = await pool.request()
            .input('username', sql.NVarChar, username)
            .input('password', sql.NVarChar, password)
            .query('SELECT * FROM NguoiDung WHERE TenNguoiDung = @username AND MatKhau = @password');

        if (result.recordset.length > 0) {
            const user = result.recordset[0];

            // Render trang HTML dựa trên vai trò người dùng
            if (user.VaiTro === 'Admin') {
                return res.render('welcome', { message: 'Welcome Admin' });
            } else if (user.VaiTro === 'Staff') {
                return res.render('welcome', { message: 'Welcome Staff' });
            } else {
                return res.render('welcome', { message: 'Welcome User' });
            }
        } else {
            return res.render('login', { error: 'Invalid username or password.' });
        }
    } catch (err) {
        console.error('Error during login:', err);
        return res.render('login', { error: 'An error occurred while logging in.' });
    }
}

// Hiển thị form đăng ký
function showRegisterForm(req, res) {
    res.render('register', { error: null });
}

// Xử lý đăng ký người dùng
async function registerUser(req, res) {
    const { username, password, confirm_password } = req.body;

    // Kiểm tra nếu mật khẩu và xác nhận mật khẩu không khớp
    if (password !== confirm_password) {
        return res.render('register', { error: 'Mật khẩu không khớp' });
    }

    let pool;

    try {
        pool = await poolPromise;

        // Kiểm tra nếu người dùng đã tồn tại
        const result = await pool.request()
            .input('username', sql.NVarChar, username)
            .query('SELECT * FROM NguoiDung WHERE TenNguoiDung = @username');

        if (result.recordset.length > 0) {
            return res.render('register', { error: 'Tên người dùng đã tồn tại' });
        }

        // Thêm người dùng mới vào cơ sở dữ liệu mà không mã hóa mật khẩu
        await pool.request()
            .input('username', sql.NVarChar, username)
            .input('password', sql.NVarChar, password)
            .input('role', sql.NVarChar, 'Staff') // Vai trò mặc định là 'Staff'
            .query('INSERT INTO NguoiDung (TenNguoiDung, MatKhau, VaiTro) VALUES (@username, @password, @role)');

        // Sau khi đăng ký thành công, chuyển hướng về trang đăng nhập
        res.redirect('/login');
    } catch (err) {
        console.error('Error during registration:', err);
        return res.render('register', { error: 'Có lỗi xảy ra. Vui lòng thử lại sau.' });
    }
}

// Xử lý logout
function logoutUser(req, res) {
    // Chỉ cần redirect về trang đăng nhập sau khi logout
    res.redirect('/login');
}

module.exports = {
    showLoginForm,
    loginUser,
    logoutUser,
    showRegisterForm,
    registerUser
};
