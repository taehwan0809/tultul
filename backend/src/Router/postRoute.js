const express = require('express');
const router = express.Router();
const controller = require('../Controller/postController');
const verifyToken = require('../middlewares/auth');
const { upload } = require('../middlewares/upload');

router.post('/post', verifyToken, upload.single('thumbnail'), controller.createPost);
router.get('/community', controller.getPosts);
router.get('/community/:id', controller.getPostById);
router.get('/my/count', verifyToken, controller.getMyPostCount);
router.delete('/delete/:id', controller.deletePost);


module.exports = router;