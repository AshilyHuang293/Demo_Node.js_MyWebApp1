// 檢查是否登入
exports.ensureLogin = (req, res, next) => {
    if (req.session && req.session.user)
        return next();

    res.redirect('/auth/login');
};

// 檢查是否為管理員
exports.ensureAdmin = (req, res, next) => {
    if (req.session?.user?.role === 'admin')
        return next();
    
    res.redirect('/');
};