var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('我只純輸出文字');
});

// 註冊
router.get('/register', userController.renderRegisterPage);
router.post('/register', userController.register);

// 登入
router.get('/login', userController.renderLoginPage);
router.post('/login', userController.login);

// 登出
router.get('/logout', userController.logout);

module.exports = router;