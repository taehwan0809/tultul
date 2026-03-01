const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3')
const multer = require('multer')
const multerS3 = require('multer-s3')
const s3 = new S3Client({
    region: 'ap-northeast-2',
    credentials: {
        accessKeyId: process.env.IAM_ACCESS,
        secretAccessKey: process.env.IAM_SECRET
    }
})

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET,
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
})

async function deleteS3Object(key) {
    if (!key) return;

    const command = new DeleteObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: key
    });

    await s3.send(command)

}


module.exports = { upload, deleteS3Object }