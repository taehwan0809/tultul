"use client";

import { useState } from "react"; // 1. 상태 관리를 위해 추가
import { useRouter} from "next/navigation";
import "./style.css";

export default function SignupPage() {
  // 2. 입력값을 담을 바구니(State) 만들기
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  // 3. 회원가입 버튼 눌렀을 때 실행될 함수
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 페이지 새로고침 방지

    const userData = { email, nickname, password };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("회원가입 성공!");
        router.push('/login');
      } else {
        alert(`실패: ${result.message}`);
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  return (
    <main className="box">
      <section className="group">
        {/* onSubmit 추가 */}
        <form className="signup-form" onSubmit={handleSubmit}>
          <img className="element" src="/images/logo/logo.png" alt="로고" />

          {/* value와 onChange를 연결해줘야 입력값이 변수에 담깁니다 */}
          <input 
            type="email" 
            className="div" 
            placeholder="이메일을 입력하세요" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input 
            type="text" 
            className="div" 
            placeholder="닉네임을 입력하세요" 
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />

          <input 
            type="password" 
            className="rectangle-2" 
            placeholder="비밀번호를 입력하세요" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="group-2">
            회원가입
          </button>
        </form>
      </section>
    </main>
  );
}