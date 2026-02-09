const jwt = require('jsonwebtoken');

const socketVerifyToken = (socket, next) => {
    try {
        const token = socket.handshake.auth.token || socket.handshake.headers.cookie?.split('accessToken=')[1];

        if (!token) {
            return next(new Error("토큰이 없음"));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.userId = decoded.id; 
        console.log(socket.userId);
        next();
    } catch (err) {
        next(new Error("유효하지 않은 토큰"));
    }
};

module.exports = socketVerifyToken;