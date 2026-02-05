const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const cors = require('cors');
const userRouter = require('./src/Router/userRoute');
const authRouter = require('./src/Router/authRoute');

app.use(cors({
    origin: `${process.env.FRONT_URL}`,
    credentials: true
}));

app.use(express.json());

app.use('/', userRouter);
app.use('/auth', authRouter);

app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).json({
        message: err.message,

    });
});

app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`)
})