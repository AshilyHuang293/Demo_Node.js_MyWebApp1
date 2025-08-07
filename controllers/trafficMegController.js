const { TrafficMeg } = require('../models');

exports.getList = async (req, res, next) => {
    try {
        const trafficList = await TrafficMeg.findAll({
            order: [['id', 'ASC']]
        });

        res.render('index', {
            title: '首頁',
            content: '歡迎來到網站首頁。',
            trafficList // 傳給前端 view 使用
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }

}