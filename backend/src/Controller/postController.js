const postService = require('../Service/postService');


const postController = {
    createPost: async (req, res, next) => {
        try {
            const { title, content } = req.body;
            const userId = req.user.id;
            const imageUrl = req.file.key;
            console.log(imageUrl)

            await postService.createPost(title, content, imageUrl, userId)

            res.status(201).json({ message: "기록 성공!" });

        } catch (e) {
            next(e);
        }
    },
    getPosts: async (req, res, next) => {
        try {
            const posts = await postService.getAllPosts();

            res.json(posts);
        } catch (err) {
            next(err)
        }
    },
    getPostById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const post = await postService.getPostById(id);
            res.json(post);
        } catch (err) {
            next(err)
        }
    },
    getMyPostCount: async (req, res, next) => {
        try {
            const userId = req.user.id;
            const count = await postService.getMyPostCount(userId);
            res.json({ count });
        } catch (e) {
            next(e)
        }
    },
    deletePost: async (req, res, next) => {
        try {
            const { id } = req.params
            const result = await postService.deletePost(id)

            res.json("성공")
        } catch (err) {
            next(err)
        }
    }

}

module.exports = postController