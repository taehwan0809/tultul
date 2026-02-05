const userService = require('../Service/userService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {
    signup: (req,res, next)=>{
        try{
        const {nickname, email, password} = req.body;
        if(!nickname || !email || !password)throw new Error("빈칸 있음")
        
        const newUser = userService.createUser(nickname,email,password);

        res.status(201).json(newUser);

        }catch(err){
            next(err);
        }
        
    },
    login: async(req,res,next)=>{
        try{
            const {email, password} = req.body;
            
            const user = await userService.getUserByEmail(email);
            if(!user) return res.status(401).json({message: "없는 이메일"});

            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) return res.status(401).json({message: "비번 틀림"})


            const token = jwt.sign(
                {id: user.id, email: user.email},
                process.env.JWT_SECRET,
                {expiresIn: '1h'}
            );

            res.cookie('accessToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV==='production',
                maxAge: 3600000,
                sameSite: 'Lax'
            })

            res.json({message: "성공!"});


        }catch(err){
            next(err);
        }
    }
}
module.exports = userController;