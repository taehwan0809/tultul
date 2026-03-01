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

const socket: Socket = io(window.location.origin, {
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

  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    const onResize = () => {
      if (window.innerWidth > 657) setSidebarOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACK_URL}/history?char=${charId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          const historyMsgs = data.map((row: any, index: number) => ({
            id: index,
            text: row.message,
            sender: row.role === "model" ? "ai" : "me",
          }));
          setMessages(historyMsgs);
        }
      } catch (err) {
        console.error("이전 대화 불러오기 실패:", err);
      }
    };

    fetchHistory();

    socket.connect();

    socket.on("receiveMessage", (data: { text: string }) => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), text: data.text, sender: "ai" },
      ]);
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
  }, [charId]);

  const handleSendMessage = () => {
    if (!inputValue.trim() || isTyping) return;

    const userText = inputValue;
    setInputValue("");

    setMessages((prev) => [...prev, { id: Date.now(), text: userText, sender: "me" }]);
    setIsTyping(true);

    socket.emit("sendMessage", {
      message: userText,
      characterType: charId,
    });
  };

  return (
    <main className={`chat-container ${sidebarOpen ? "sidebar-open" : ""}`}>
      <header className="mobile-topbar">
        <button
          className="hamburger"
          aria-label="사이드바 열기"
          aria-expanded={sidebarOpen}
          onClick={() => setSidebarOpen((v) => !v)}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>

        <div className="mobile-title">
          <b>{charNames[charId]}</b>님과 대화
        </div>
      </header>

      <aside className={`sidebar ${sidebarOpen ? "is-open" : ""}`}>
        <img
          className="logo"
          src="/images/logo/logo.png"
          alt="로고"
          onClick={() => {
            setSidebarOpen(false);
            router.push("/");
          }}
          style={{ cursor: "pointer" }}
        />
        <nav className="menu">
          <p className="now-talking">
            지금 <b>{charNames[charId]}</b>님과 대화 중
          </p>
          <button
            onClick={() => {
              setSidebarOpen(false);
              router.push("/select");
            }}
          >
            다른 털털이들 보러 가기
          </button>
          <button
            onClick={() => {
              setSidebarOpen(false);
              router.push("/community");
            }}
          >
            커뮤니티 방문
          </button>
        </nav>
      </aside>

      <div
        className={`sidebar-overlay ${sidebarOpen ? "show" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      <section className="chat-content">
        <div className="message-list" ref={scrollRef}>
          {messages.length === 0 && !isTyping && (
            <div className="empty-chat">
              {charNames[charId]}님에게 먼저 말을 걸어보세요!
            </div>
          )}

          {messages.map((msg) => (
            <div key={msg.id} className={`message-bubble ${msg.sender}`}>
              {msg.sender === "ai" && (
                <img
                  src={`/images/models/${
                    charId === "chun-sam" ? "cs" : charId === "byeong-cheol" ? "bc" : "dp"
                  }.png`}
                  className="profile-image"
                  alt="profile"
                />
              )}
              <div className="text">{msg.text}</div>
            </div>
          ))}

          {isTyping && (
            <div className="message-bubble ai">
              <img
                src={`/images/models/${
                  charId === "chun-sam" ? "cs" : charId === "byeong-cheol" ? "bc" : "dp"
                }.png`}
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
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder={`${charNames[charId]}님에게 이야기 털어놓기...`}
          />
          <button onClick={handleSendMessage} disabled={isTyping}>
            보내기
          </button>
        </div>
      </section>
    </main>
  );
}