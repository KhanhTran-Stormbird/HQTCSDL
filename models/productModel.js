const mssql = require('../dbConfig'); // Đảm bảo mssql đã được cấu hình đúng

// Lấy tất cả sản phẩm
async function getAllProducts() {
    const pool = await mssql; // Sử dụng kết nối pool từ dbConfig
    const result = await pool.request().query('SELECT * FROM SanPhamTonKHo'); // Sử dụng request().query()
    return result.recordset; // Trả về kết quả
}

// Thêm sản phẩm mới
async function addProduct(name, quantity, price) {
    const pool = await mssql; // Sử dụng kết nối pool từ dbConfig
    await pool.request().query`
        INSERT INTO SanPhamTonKHo (TenSanPham, SoLuongTon, Gia) 
        VALUES (${name}, ${quantity}, ${price})
    `;
}

// Cập nhật sản phẩm
async function updateProduct(id, name, quantity, price) {
    const pool = await mssql; // Sử dụng kết nối pool từ dbConfig
    await pool.request().query`
        UPDATE SanPhamTonKHo
        SET TenSanPham = ${name}, SoLuongTon = ${quantity}, Gia = ${price}
        WHERE MaSanPham = ${id}
    `;
}

// Lấy sản phẩm theo ID
async function getProductById(id) {
    const pool = await mssql; // Sử dụng kết nối pool từ dbConfig
    const result = await pool.request().query`SELECT * FROM SanPhamTonKHo WHERE MaSanPham = ${id}`;
    return result.recordset[0];
}

// Xóa sản phẩm
async function deleteProduct(id) {
    const pool = await mssql; // Sử dụng kết nối pool từ dbConfig
    await pool.request().query`DELETE FROM SanPhamTonKHo WHERE MaSanPham = ${id}`;
}

module.exports = {
    getAllProducts,
    addProduct,
    updateProduct,
    getProductById,
    deleteProduct
};
