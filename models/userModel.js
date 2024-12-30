const mssql = require('../dbConfig'); // Đảm bảo mssql đã được cấu hình đúng

// Lấy tất cả người dùng
async function getAllUsers() {
    const pool = await mssql; // Sử dụng kết nối pool từ dbConfig
    const result = await pool.request().query('SELECT * FROM NguoiDung'); // Sử dụng request().query()
    return result.recordset; // Trả về kết quả
}

// Thêm người dùng mới
async function addUser(username, password, role) {
    const pool = await mssql; // Sử dụng kết nối pool từ dbConfig
    await pool.request().query`
        INSERT INTO NguoiDung (TenNguoiDung, MatKhau, VaiTro) 
        VALUES (${username}, ${password}, ${role})
    `;
}

// Cập nhật người dùng
async function updateUser(id, username, password, role) {
    const pool = await mssql; // Sử dụng kết nối pool từ dbConfig
    await pool.request().query`
        UPDATE NguoiDung
        SET TenNguoiDung = ${username}, MatKhau = ${password}, VaiTro = ${role}
        WHERE MaNguoiDung = ${id}
    `;
}

// Lấy người dùng theo ID
async function getUserById(id) {
    const pool = await mssql; // Sử dụng kết nối pool từ dbConfig
    const result = await pool.request().query`SELECT * FROM NguoiDung WHERE MaNguoiDung = ${id}`;
    return result.recordset[0]; // Trả về người dùng nếu tìm thấy
}

// Xóa người dùng
async function deleteUser(id) {
    const pool = await mssql; // Sử dụng kết nối pool từ dbConfig
    await pool.request().query`DELETE FROM NguoiDung WHERE MaNguoiDung = ${id}`;
}

module.exports = {
    getAllUsers,
    addUser,
    updateUser,
    getUserById,
    deleteUser
};
