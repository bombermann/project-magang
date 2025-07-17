const bcrypt = require('bcrypt');
// const userModel = require('../models/usermodel');
const userModel = require('../model/usermodel')

exports.listAdmins = async (req, res) => {
  const admins = await userModel.getAllAdmins();
  res.render('admin_list', { admins });
};

exports.showAddForm = (req, res) => {
  res.render('admin_add');
};

exports.handleAdd = async (req, res) => {
  const { username, password } = req.body;
  // const hash = await bcrypt.hash(password, 10);
  await userModel.createAdmin(username, password);
  res.redirect('/users');
};

exports.showEditForm = async (req, res) => {
  const admin = await userModel.findById(req.params.id);
  res.render('admin_edit', { admin });
};

exports.handleEdit = async (req, res) => {
  const { username, password } = req.body;
  // const hash = await bcrypt.hash(password, 10);
  await userModel.updateAdmin(req.params.id, username, password);
  res.redirect('/users');
};

exports.handleDelete = async (req, res) => {
  await userModel.deleteAdmin(req.params.id);
  res.redirect('/users');
};
