const aiService = require('../Service/aiService');



const aiController = {

    getHistory: async (req, res) => {
        try {
            const userId = req.user ? req.user.id : req.session.userId;
            const histroy = await aiService.getHistoryByChar(userId, req.query.char);
            res.json(histroy);
        } catch (e) {
            res.status(500).json({ error: e.message });
            console.log(e)
        }
    }
};

module.exports = aiController;