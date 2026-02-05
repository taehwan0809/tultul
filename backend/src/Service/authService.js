const axios = require('axios');
const userService = require('./userService');

const authService = {
    processGoogleLogin: async(code)=>{
        const tokenRes = await axios.post('https://oauth2.googleapis.com/token', {
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: process.env.GOOGLE_REDIRECT_URI,
            grant_type: 'authorization_code',
        });

        const {access_token} = tokenRes.data;

        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json`,
            {
                headers: {Authorization: `Bearer ${access_token}`},
            }
        );
        const {email, name:nickname} = userRes.data;

        const jwtToken = await userService.socialLogin(email, nickname);

        return jwtToken;
    }
};

module.exports = authService;