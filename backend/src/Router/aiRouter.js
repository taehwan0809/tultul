const express = require('express');
const router = express.Router();
const controller = require('../Controller/aiController');


router.get('/history', controller.getHistory);


module.exports = router;