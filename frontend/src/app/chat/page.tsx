"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import "./style.css";
import { io, Socket } from "socket.io-client";

interface Message {
  id: number;
  text: string;
  sender: "me" | "ai";
}

const socket: Socket = io(process.env.NEXT_PUBLIC_BACK_URL as string, {
  withCredentials: true,
  autoConnect: false,
});

export default function ChatPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const charId = searchParams.get("char") || "chun-sam";

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  const charNames: { [key: string]: string } = {
    "chun-sam": "김춘삼씨",
    "byeong-cheol": "김병철씨",
    "du-pal": "곽두팔씨",
  };

  // 스크롤 하단 고정
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    // 1. 기존 대화 내역(History) 가져오기
    const fetchHistory = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/history?char=${charId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          // 세션 쿠키 전달을 위해 필요하다면 추가
          credentials: 'include' 
        });
        
        if (response.ok) {
          const data = await response.json();
          // DB의 role을 'me'/'ai' 형식으로 맞춰서 상태에 저장
          const historyMsgs = data.map((row: any, index: number) => ({
            id: index,
            text: row.message,
            sender: row.role === 'model' ? 'ai' : 'me'
          }));
          setMessages(historyMsgs);
        }
      } catch (err) {
        console.error("이전 대화 불러오기 실패:", err);
      }
    };

    fetchHistory();

    // 2. 소켓 연결
    socket.connect();

    socket.on("receiveMessage", (data: { text: string }) => {
      const aiMsg: Message = {
        id: Date.now(),
        text: data.text,
        sender: "ai",
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    });

    socket.on("errorMessage", (msg: string) => {
      alert(msg);
      setIsTyping(false);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("errorMessage");
      socket.disconnect();
    };
  }, [charId]); // 캐릭터가 바뀌면 내역을 새로 불러오도록 설정

  const handleSendMessage = () => {
    if (!inputValue.trim() || isTyping) return;

    const userText = inputValue;
    setInputValue("");

    const myMsg: Message = { id: Date.now(), text: userText, sender: "me" };
    setMessages((prev) => [...prev, myMsg]);

    setIsTyping(true);

    socket.emit("sendMessage", {
      message: userText,
      characterType: charId,
    });
  };

  return (
    <main className="chat-container">
      <aside className="sidebar">
        <img className="logo" src="/images/logo/logo.png" alt="로고" onClick={() => router.push('/')} style={{cursor: 'pointer'}} />
        <nav className="menu">
          <p className="now-talking">지금 <b>{charNames[charId]}</b>님과 대화 중</p>
          <button onClick={() => router.push('/select')}>다른 털털이들 보러 가기</button>
          <button onClick={() => router.push('/community')}>커뮤니티 방문</button>
        </nav>
      </aside>

      <section className="chat-content">
        <div className="message-list" ref={scrollRef}>
          {messages.length === 0 && !isTyping && (
            <div className="empty-chat">{charNames[charId]}님에게 먼저 말을 걸어보세요!</div>
          )}
          
          {messages.map((msg) => (
            <div key={msg.id} className={`message-bubble ${msg.sender}`}>
              {msg.sender === "ai" && (
                <img 
                  src={`/images/models/${charId === 'chun-sam' ? 'cs' : charId === 'byeong-cheol' ? 'bc' : 'dp'}.png`} 
                  className="profile-image" 
                  alt="profile" 
                />
              )}
              <div className="text">{msg.text}</div>
            </div>
          ))}

          {isTyping && (
            <div className="message-bubble ai">
               {/* '생각 중' 사진도 클래스명을 profile-image로 통일해서 크기 조절 */}
               <img 
                  src={`/images/models/${charId === 'chun-sam' ? 'cs' : charId === 'byeong-cheol' ? 'bc' : 'dp'}.png`} 
                  className="profile-image" 
                  alt="profile" 
               />
               <div className="ai-content">
                  <div className="typing-indicator">{charNames[charId]}님이 생각 중...</div>
               </div>
            </div>
          )}
        </div>

        <div className="input-area">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder={`${charNames[charId]}님에게 이야기 털어놓기...`}
          />
          <button onClick={handleSendMessage} disabled={isTyping}>보내기</button>
        </div>
      </section>
    </main>
  );
}