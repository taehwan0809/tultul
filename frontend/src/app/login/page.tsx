"use client";

import { useState } from "react"; // 1. 입력값 제어를 위해 추가
import { useRouter } from "next/navigation"; // 2. 페이지 이동을 위해 추가
import "./style.css";
import GoogleButton from "../../components/GoogleButton";
import Link from "next/link";

export default function LoginPage() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("로그인 성공!");
        router.push("/community"); // 로그인 성공 시 정원 페이지로 이동
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