const  groq = require("../../config/groq");
const pool = require('../../config/database');

const aiService = {
askAI: async (userId, userMessage, charId) => {
        const personas = {
            "chun-sam": "73세 김춘삼 할아버지. 다정한 말투. 단어마다 마침표.",
            "byeong-cheol": "52세 아재 김병철. 열정 과다. 아재개그. 이모지 활용",
            "du-pal": "29세 곽두팔. 무뚝뚝한 상남자."
        };

        try {
            // 1. DB에서 이전 대화 내역 가져오기 (최근 10개 정도)
            const [history] = await pool.query(
                'SELECT role, message FROM chat_logs WHERE user_id = ? AND character_id = ? ORDER BY created_at DESC LIMIT 10',
                [userId, charId]
            );

            // 2. Groq 형식에 맞게 메시지 배열 구성
            let messages = [
                { role: "system", content: personas[charId] || personas['chun-sam'] }
            ];

            // 과거 내역 추가 (시간순으로 뒤집기)
            history.reverse().forEach(row => {
                messages.push({
                    role: row.role === 'model' ? 'assistant' : 'user',
                    content: row.message
                });
            });

            // 현재 메시지 추가
            messages.push({ role: "user", content: userMessage });

            // 3. Groq API 호출
            const response = await groq.chat.completions.create({
                model: "llama-3.3-70b-versatile",
                messages: messages,
                temperature: 0.8
            });

            const aiReply = response.choices[0].message.content;

            // 4. DB 저장
            const sql = "INSERT INTO chat_logs (user_id, character_id, role, message) VALUES (?, ?, 'user', ?), (?, ?, 'model', ?)";
            await pool.query(sql, [userId, charId, userMessage, userId, charId, aiReply]);

            return aiReply;

        } catch (e) {
            console.error("Groq 기억상실 에러:", e.message);
            throw new Error("AI 응답 생성 실패");
        }
    },
    getHistoryByChar: async(userId, charId)=>{
        const sql = 'select role, message from chat_logs where user_id = ? and character_id = ? order by created_at asc';
        const [rows] = await pool.query(sql, [userId,charId]);
        return rows;
    }
}


module.exports = aiService