const express = require('express');
const router = express.Router();
const controller = require('../Controller/userController');
const {signupSchema} = require('../middlewares/validation');
const verifyToken = require('../middlewares/auth');

const validateSignup = (req,res,next)=>{
    const {error} = signupSchema.validate(req.body);
    if(error){
        return res.status(400).json({message:error.details[0].message});
    }
    next();
};



router.post('/signup', validateSignup, controller.signup);
router.post('/login', controller.login);


module.exports = router;