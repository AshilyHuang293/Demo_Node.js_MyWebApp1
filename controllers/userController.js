const { User } = require('../models');
const { sequelize } = require('../models');
const bcrypt = require('bcrypt');

exports.renderRegisterPage = (req, res) => {
    res.render('register', {
        title: '註冊'
    });
};

exports.renderLoginPage = (req, res) => {
    let errMes = null;
    if (req.query.errorCode) {
        switch (req.query.errorCode) {
            case 'A001':
                errMes = '帳號未註冊或是帳號密碼錯誤';
                break;
            default:
                errMes = '未知錯誤代碼';
                break;
        }
    }

    res.render('login', {
        title: '登入',
        errMes
    });
};

exports.register = async (req, res) => {
    try {
        const hashed = await bcrypt.hash(req.body.password, 10);
        await User.create({
            UserName: req.body.username,
            Password: hashed,
            Role: 'user',
            CreateDate: sequelize.fn('GETDATE')
        });
        res.redirect('/auth/login');
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        // console.log('bodyUser:', req.body);
        const user = await User.findOne({ where: { UserName: req.body.username } });
        if (user && await bcrypt.compare(req.body.password, user.Password)) {
            req.session.user = {
                id: user.Id,
                username: user.UserName,
                role: user.Role
            };
            return res.redirect('/');
        }
        res.redirect('/auth/login?errorCode=A001');
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};