const jwt = require('jsonwebtoken');
const pool = require('../../config/database');
const bcrypt = require('bcrypt');

const userService = {
    createUser: async (nickname, email, password) => {
        const hashed = await bcrypt.hash(password, 10);

        const sql = 'insert into users (email,password,nickname) values (?,?,?)';
        const result = await pool.query(sql, [email, hashed, nickname]);
        return result.insertId;
    },
    getUserByEmail: async (email) => {
        const sql = 'select * from users where email = ?';
        const [rows] = await pool.query(sql, [email]);
        return rows[0];
    },
    socialLogin: async (email, nickname) => {
        const [rows] = await pool.query('select * from users where email = ?', [
            email,
        ]);
        let user = rows[0];

        if (!user) {
            const sql = 'insert into users (email,nickname,provider) values (?,?,?)';
            const [result] = await pool.query(sql, [email, nickname, 'google']);
            user = { id: result.insertId, email, nickname };
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, nickname: user.nickname },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        return token;
    }


}

module.exports = userService;