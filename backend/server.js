const express = require('express');
const http = require("http");
const {Server} = require('socket.io');
const app = express();
const server = http.createServer(app);
require('dotenv').config();
const PORT = process.env.PORT;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRouter = require('./src/Router/userRoute');
const authRouter = require('./src/Router/authRoute');
const postRouter = require('./src/Router/postRoute');
const socketVerifyToken = require('./src/middlewares/socketAuth');
const setupChatHandler = require('./src/Socket/chatHandler');
const aiRouter = require('./src/Router/aiRouter');

app.use(cors({
    origin: `${process.env.FRONT_URL}`,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const io = new Server(server,{
    cors: {origin: process.env.FRONT_URL, credentials: true},
    transports: ['websocket', 'polling']
});

io.use(socketVerifyToken);

setupChatHandler(io);


app.use('/uploads', express.static('uploads'))
app.use('/', userRouter);
app.use('/auth', authRouter);
app.use('/', postRouter);
app.use('/', aiRouter);

app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).json({
        message: err.message,

    });
});


server.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`)
})