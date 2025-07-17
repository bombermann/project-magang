// const postModel = require('../model/postmodel');

// exports.listPosts = async (req, res) => {
//   const posts = await postModel.getAllPosts();
//   res.render('post_list', { posts });
// };

// exports.showAddForm = (req, res) => {
//   res.render('post_add');
// };

// exports.handleAdd = async (req, res) => {
//   console.log(req.body);
//   const { title, content } = req.body;
//   await postModel.createPost(title, content);
//   res.redirect('/post');
// };

// exports.showEditForm = async (req, res) => {
//   const post = await postModel.findById(req.params.id);
//   res.render('post_edit', { post });
// };

// exports.handleEdit = async (req, res) => {
//   const { title, content } = req.body;
//   await postModel.updatePost(req.params.id, title, content);
//   res.redirect('/post');
// };

// exports.handleDelete = async (req, res) => {
//   await postModel.deletePost(req.params.id);
//   res.redirect('/post');
// };
const postModel = require('../model/postmodel');

exports.listPosts = async (req, res) => {
  try {
    const posts = await postModel.getAll();
    res.render('post_list', { posts });
  } catch (err) {
    console.error('Error loading posts:', err);
    res.status(500).send('Gagal memuat postingan.');
  }
};

exports.showAddForm = (req, res) => {
  res.render('post_add');
};

exports.handleAdd = async (req, res) => {
  try {
    console.log(req.body);
    const { postTitle, postContent } = req.body;
    // const title = req.params.title;
    // const content = req.params.content;
    console.log(postTitle, postContent);
    await postModel.create(postTitle, postContent);
    res.redirect('/post');
  } catch (err) {
    console.error('Error adding post:', err);
    res.status(500).send('Gagal menambahkan postingan.');
  }
};

exports.showEditForm = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (!post) return res.status(404).send('Post tidak ditemukan');
    res.render('post_edit', { post });
  } catch (err) {
    console.error('Error loading post:', err);
    res.status(500).send('Gagal memuat form edit.');
  }
};

exports.handleEdit = async (req, res) => {
  try {
    const { title, content } = req.body;
    await postModel.update(req.params.id, title, content);
    res.redirect('/post');
  } catch (err) {
    console.error('Error updating post:', err);
    res.status(500).send('Gagal memperbarui postingan.');
  }
};

exports.handleDelete = async (req, res) => {
  try {
    await postModel.delete(req.params.id);
    res.redirect('/post');
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).send('Gagal menghapus postingan.');
  }
};
