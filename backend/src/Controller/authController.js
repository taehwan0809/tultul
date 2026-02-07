const authService =require('../Service/authService');

const authController = {
    googleLogin: async(req,res,next)=>{
        const {code} = req.query;
        try{
            const token = await authService.processGoogleLogin(code);


            res.cookie('accessToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV==='production',
                maxAge: 3600000,
                sameSite: 'Lax'
            })
            res.redirect(`${process.env.FRONT_URL}/community?login=success`)
        }catch(err){
            next(err);
        }
    }
}


module.exports = authController;