"use client";

import { useState } from "react";
import "./style.css";

// 메시지 한 개의 타입 정의
interface Message {
  id: number;
  text: string;
  sender: "me" | "ai";
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "안녕! 오늘 하루는 어땠어?", sender: "ai" }
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // 1. 내 메시지 추가
    const myMsg: Message = { id: Date.now(), text: inputValue, sender: "me" };
    setMessages((prev) => [...prev, myMsg]);
    setInputValue("");

    // 2. AI의 가짜 답장 (백엔드 대신 1초 뒤에 나타나게)
    setTimeout(() => {
      const aiMsg: Message = {
        id: Date.now() + 1,
        text: "오호, 그랬구나! 더 자세히 말해줄래?",
        sender: "ai",
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1000);
  };

  return (
    <main className="chat-container">
      {/* 왼쪽 사이드바 (기존 피그마 디자인) */}
      <aside className="sidebar">
        <img className="logo" src="/images/logo/logo.png" alt="로고" />
        <nav className="menu">
          <button>다른 털털이들 보러 가기</button>
          <button>커뮤니티 방문</button>
        </nav>
      </aside>

      {/* 오른쪽 채팅창 */}
      <section className="chat-content">
        <div className="message-list">
          {messages.map((msg) => (
            <div key={msg.id} className={`message-bubble ${msg.sender}`}>
              {msg.sender === "ai" && <div className="profile-circle">AI</div>}
              <div className="text">{msg.text}</div>
            </div>
          ))}
        </div>

        {/* 입력창 구역 */}
        <div className="input-area">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="메시지를 입력하세요..."
          />
          <button onClick={handleSendMessage}>보내기</button>
        </div>
      </section>
    </main>
  );
}