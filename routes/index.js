var express = require('express');
var router = express.Router();
const authMiddleware = require('../middleware/auth');
const postController  = require('../controllers/postController');

/* GET home page. */
router.get('/', authMiddleware.ensureLogin, postController.getAllPosts);

// 發表留言
router.post('/posts', authMiddleware.ensureLogin, postController.createPost);

// 編輯留言頁面
router.get('/posts/:id/edit', authMiddleware.ensureLogin, postController.renderEditPage);

// 更新留言
router.put('/posts/:id', authMiddleware.ensureLogin, postController.updatePost);

// 刪除留言
router.delete('/posts/:id', authMiddleware.ensureLogin, postController.deletePost);

module.exports = router;