"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Editor from "../../components/Editor"; // 분리한 컴포넌트 불러오기

export default function PostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    console.log({ title, content });
    alert("종이에 기록을 남겼습니다!");
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundImage: "url('/images/background/paper_texture.jpg')", 
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      backgroundColor: "#f4f1ea",
      paddingBottom: "100px"
    }}>
      <Header />
      
      <div style={{ 
        maxWidth: "850px", 
        margin: "60px auto", 
        padding: "50px",
        backgroundColor: "rgba(255, 255, 255, 0.7)", 
        boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
        borderRadius: "3px",
        border: "1px solid #e2ddd0"
      }}>
        <h1 style={{ fontFamily: "serif", textAlign: "center", marginBottom: "40px", color: "#2c2c2c" }}>
          오늘의 사건
        </h1>
        
        <input
          type="text"
          placeholder="제목을 적어주세요..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "15px 0",
            fontSize: "28px",
            marginBottom: "30px",
            border: "none",
            borderBottom: "2px solid #555",
            background: "transparent",
            outline: "none",
            fontFamily: "serif"
          }}
        />

        {/* 분리된 에디터 사용 */}
        <Editor value={content} onChange={setContent} />

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "40px", gap: "15px" }}>
          <button
            onClick={() => window.history.back()}
            style={{ padding: "12px 25px", backgroundColor: "transparent", border: "1px solid #888", borderRadius: "4px", cursor: "pointer" }}
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            style={{ padding: "12px 40px", backgroundColor: "#2c2c2c", color: "#fff", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }}
          >
            기록하기
          </button>
        </div>
      </div>
    </div>
  );
}