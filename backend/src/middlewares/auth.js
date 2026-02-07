const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next)=>{
    const cookie = req.cookies.accessToken;

    if(!cookie) return res.status(401).json({message: "토큰 내놔"});

    jwt.verify(cookie, process.env.JWT_SECRET, (err, decoded) => {
        if(err) return res.status(403).json({message: "토큰 위조됨"});

        req.user = decoded;
        next();
    });
};


module.exports = verifyToken;