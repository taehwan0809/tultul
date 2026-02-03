"use client";

import "./style.css";

export default function SignupPage() {
  return (
    <main className="box">
      {/* 이제 group 자체가 흰색 박스 역할을 합니다 */}
      <section className="group">
        <form className="signup-form">
          {/* 로고 */}
          <img className="element" src="/images/logo/logo.png" alt="로고" />

          {/* 이메일 */}
          <input type="email" className="div" placeholder="이메일을 입력하세요" />

          {/* 닉네임 */}
          <input type="text" className="div" placeholder="닉네임을 입력하세요" />

          {/* 비밀번호 */}
          <input type="password" className="rectangle-2" placeholder="비밀번호를 입력하세요" />

          {/* 회원가입 버튼 */}
          <button type="submit" className="group-2">
            회원가입
          </button>
        </form>
      </section>
    </main>
  );
}