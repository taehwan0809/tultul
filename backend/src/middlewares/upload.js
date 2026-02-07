const multer = require('multer');
const path = require('path');
const fs = require('fs');


try{
    fs.readdirSync('uploads');
}catch(e){
    fs.mkdirSync('uploads');
}


const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, 'uploads/');
    },
    filename: (req,file,cb)=>{
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + '-'+Math.round(Math.random()*1e9)+ext);
    }
});

const upload = multer({
    storage: storage,
    limits: {fileSize: 5*1024*1024}
})

module.exports = upload;