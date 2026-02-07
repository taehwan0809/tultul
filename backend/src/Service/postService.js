const pool = require('../../config/database');



const postService = {
    createPost: async(title,content, thumbnail, userId)=>{
        const sql = 'insert into posts (title,content,thumbnail,user_id) values (?,?,?,?)';
        const [result] = await pool.query(sql, [title,content,thumbnail,userId]);

        return result.insertId;
    },
    getAllPosts: async()=>{
        const sql = 'select posts.id, posts.title,posts.thumbnail,posts.created_at, users.nickname AS author from posts join users on posts.user_id = users.id order by posts.created_at desc'
        const [result] = await pool.query(sql);
        return result;
    },
    getPostById: async(id)=>{
        const sql = 'select posts.*, users.nickname as author from posts join users on posts.user_id = users.id where posts.id = ?';
        const [rows] = await pool.query(sql, [id]);

        return rows[0];
    },
    getMyPostCount: async(userId)=>{
        const sql = 'select count(*) as count from posts where user_id = ?';
        const [rows] = await pool.query(sql, [userId]);
        return rows[0].count;
    }
}


module.exports = postService;