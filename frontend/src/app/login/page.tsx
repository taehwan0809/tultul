"use client";

import "./style.css";
import GoogleButton from "../../components/GoogleButton";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="box">
      <section className="group">
        <div className="rectangle"></div> {/* 흰색 배경 박스 */}

        <form className="login-form">
          {/* 로고 */}
          <img className="element" src="/images/logo/logo.png" alt="로고" />

          {/* 이메일 */}
          <input type="email" className="div" placeholder="이메일을 입력하세요" />

          {/* 비밀번호 */}
          <input type="password" className="rectangle-2" placeholder="비밀번호를 입력하세요" />

          <div className="signup-link-container">
            <Link href="/signup" className="text-wrapper-5">회원가입</Link>
          </div>

          <div className="divider-container">
            <span>또는 다음으로 계속</span>
          </div>

          <div className="social-login">
            <GoogleButton />
          </div>

          {/* 로그인 버튼 */}
          <button type="submit" className="group-2">
            로그인
          </button>
        </form>
      </section>
    </main>
  );
}