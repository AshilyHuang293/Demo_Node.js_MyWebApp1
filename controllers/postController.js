const { Post, User } = require('../models');
const { sequelize } = require('../models');

exports.getAllPosts = async (req, res) => {
    const posts = await Post.findAll({
        //include: User, //做「關聯查詢」（JOIN 查詢），前提是 Post 和 User 模型之間 已經建立關聯
        where: { UserId: req.session.user.id },
        order: [['Id', 'ASC']]
    });

    res.render('index', {
        title: '留言板',
        content: '歡迎來到網站留言板。',
        posts,
        user: req.session.user || null
    });
};

exports.renderEditPage = async (req, res) => {
    const post = await Post.findByPk(req.params.id);
    if (!post || post.UserId !== req.session.user.id) {
        return res.redirect('/');
    }
    res.render('edit', {
        title: '編輯',
        post
    });
};

exports.createPost = async (req, res) => {
    try {
        await Post.create({
            UserId: req.session.user.id,
            Content: req.body.content,
            CreateDate: sequelize.fn('GETDATE')
        });
        res.redirect('/');
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updatePost = async (req, res) => {
    try {
        console.log('reqParams:', req.params);
        const post = await Post.findByPk(req.params.id);
        if (post && (req.session.user.id === post.UserId || req.session.user.role === 'admin')) {
            console.log('bodyContent:', req.body.content);
            await post.update({
                Content: req.body.content,
                EditDate: sequelize.fn('GETDATE')
            });
        }
        res.redirect('/');
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (post && (req.session.user.id === post.UserId || req.session.user.role === 'admin')) {
            await post.destroy();
        }
        res.redirect('/');
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};