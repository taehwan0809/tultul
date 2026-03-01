"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Editor from "../../components/Editor";
import axios from "axios";
import { useRouter} from "next/navigation";


export default function PostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 1. 썸네일 상태 관리 (제네릭 추가로 File 타입 허용)
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  // 2. 이벤트 객체 e에 타입 명시
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // ?. 사용으로 null 방지
    if (file) {
      setThumbnail(file);
      setPreview(URL.createObjectURL(file));
    }
  };

const handleSubmit = async () => {
  
  // 1. 유효성 검사 (간단하게)
  if (!title || !content || !thumbnail) {
    return alert("빈칸없이 모두 채워주세요!");
  }

  // 2. FormData 바구니 만들기 (파일 전송을 위해 필수!)
  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content); // HTML 태그 문자열이 그대로 담깁니다.
  formData.append("thumbnail", thumbnail); // 실제 파일 객체 추가

  

  try {
    // 3. 백엔드로 전송
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/post`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // 파일 전송 시 필수 헤더
      },
      withCredentials: true, // 구글 로그인 세션/쿠키를 같이 보내려면 필수
    });
    const data = response.data;

    if (response.status === 201) {
      alert("기록을 성공적으로 남겼습니다!");
      // 성공 후 글 목록 페이지로 이동 등의 로직
      router.push('/community');
      
    }else{
      alert(data)
    }
  } catch (error) {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 401) {
      alert("로그인 세션이 만료되었습니다. 다시 로그인해 주세요.");
      // router.push("/login");
    } else {
      // 백엔드에서 보낸 message가 있다면 그걸 띄우고, 없으면 기본 메시지
      alert(error.response?.data?.message || "서버에 기록을 남기지 못했습니다.");
    }
  } else {
    // Axios 에러가 아닌 일반 에러 처리
    console.error("기록 실패:", error);
    alert("알 수 없는 오류가 발생했습니다.");
  }
  }
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

        {/* 썸네일 업로드 섹션 추가 */}
        <div style={{ marginBottom: "30px", textAlign: "center" }}>
          <div 
            onClick={() => document.getElementById('thumbInput')?.click()}
            style={{
              width: "100%",
              height: "250px",
              border: "2px dashed #ccc",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              overflow: "hidden",
              backgroundColor: "#f9f9f9",
              marginBottom: "20px"
            }}
          >
            {preview ? (
              <img src={preview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <span style={{ color: "#888" }}>+ 클릭하여 썸네일을 선택하세요</span>
            )}
          </div>
          <input 
            id="thumbInput"
            type="file" 
            accept="image/*" 
            onChange={handleThumbnailChange} 
            style={{ display: "none" }} 
          />
        </div>
        
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