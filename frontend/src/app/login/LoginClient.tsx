"use client";

import { useState, useEffect } from "react"; // 1. useEffect 추가
import { useRouter, useSearchParams } from "next/navigation"; // 2. useSearchParams 추가
import "./style.css";
import GoogleButton from "../../components/GoogleButton";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  
  // URL의 쿼리 파라미터를 읽어오기 위한 훅
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  // 페이지 로드 시 쿼리 파라미터 체크
  useEffect(() => {
    if (message === "login_required") {
      alert("로그인이 필요한 서비스입니다. 로그인 후 이용해 주세요!");
      
      // 알림을 보여준 후 URL에서 메시지를 제거하고 싶다면 아래 주석 해제 (깔끔함 유지)
      // window.history.replaceState({}, '', '/login');
    }
  }, [message]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // fetch 사용 시 credentials: "include"를 넣어야 백엔드가 보내는 쿠키를 저장할 수 있습니다.
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        alert("로그인 성공!");
        router.push("/community"); 
      } else {
        alert(data.message || "로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error("로그인 에러:", error);
      alert("서버와 통신 중 오류가 발생했습니다.");
    }
  };

  return (
    <main className="box">
      <section className="group">
        <div className="rectangle"></div>
        <form className="login-form" onSubmit={handleLogin}>
          <img className="element" src="/images/logo/logo.png" alt="로고" />

          <input 
            type="email" 
            className="div" 
            placeholder="이메일을 입력하세요" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input 
            type="password" 
            className="rectangle-2" 
            placeholder="비밀번호를 입력하세요" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="signup-link-container">
            <Link href="/signup" className="text-wrapper-5">회원가입</Link>
          </div>

          <div className="divider-container">
            <span>또는 다음으로 계속</span>
          </div>

          <div className="social-login">
            <GoogleButton />
          </div>

          <button type="submit" className="group-2">
            로그인
          </button>
        </form>
      </section>
    </main>
  );
} 