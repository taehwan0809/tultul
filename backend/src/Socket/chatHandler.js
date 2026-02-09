const aiService = require('../Service/aiService');


module.exports = (io) =>{
    io.on("connection", (socket)=>{
        console.log(`인증 성공: ${socket.userId}`);

        socket.on("sendMessage", async({message, characterType})=>{
            try{

                    const aiReply = await aiService.askAI(socket.userId, message, characterType);

                    socket.emit('receiveMessage', {
                        text: aiReply,
                        sender: "ai",
                        characterType
                    });
            }catch(e){
                console.log(e)
                socket.emit("errorMessage", "AI 응답 중 오류 발생");
            }
        });

        socket.on("disconnect", ()=>{
            console.log("접속 종료")
        })
    })
}