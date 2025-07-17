const express = require('express');
const router = express.Router();
const postController = require('../controllers/postcontroller');
const { requireLogin } = require('../middleware');

router.use(requireLogin);

router.get('/', postController.listPosts);
router.get('/add', postController.showAddForm);
router.post('/add', postController.handleAdd);
router.get('/edit/:id', postController.showEditForm);
router.post('/edit/:id', postController.handleEdit);
router.post('/delete/:id', postController.handleDelete);



module.exports = router;
