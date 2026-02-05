const express = require('express');
const router = express.Router();
const {getGoogleAuthURL} = require('../utils/googleAuth');
const authController = require('../Controller/authController');


router.get('/google', (req,res)=>{
    res.redirect(getGoogleAuthURL());
});

router.get('/google/callback', authController.googleLogin);

module.exports = router;