const userModel = require('../models/userModel'); // Đảm bảo rằng bạn có model cho người dùng

// Hiển thị tất cả người dùng
async function showAllUsers(req, res) {
    try {
        const users = await userModel.getAllUsers();
        res.render('users', { users });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching users');
    }
}

// Hiển thị form thêm người dùng mới
function showAddUserForm(req, res) {
    res.render('addUser');
}

// Xử lý thêm người dùng mới
async function addUser(req, res) {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
        return res.status(400).send('All fields are required.');
    }

    try {
        await userModel.addUser(username, password, role);
        res.redirect('/users');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding user');
    }
}

// Hiển thị form sửa người dùng
async function showEditUserForm(req, res) {
    const { id } = req.params;
    try {
        const user = await userModel.getUserById(id);
        if (user) {
            res.render('editUser', { user });
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching user');
    }
}

// Xử lý cập nhật thông tin người dùng
async function updateUser(req, res) {
    const { id } = req.params;
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
        return res.status(400).send('All fields are required.');
    }

    try {
        await userModel.updateUser(id, username, password, role);
        res.redirect('/users');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating user');
    }
}

// Xử lý xóa người dùng
async function deleteUser(req, res) {
    const { id } = req.params;
    try {
        await userModel.deleteUser(id);
        res.redirect('/users');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting user');
    }
}

module.exports = {
    showAllUsers,
    showAddUserForm,
    addUser,
    showEditUserForm,
    updateUser,
    deleteUser
};
