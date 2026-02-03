"use client";

import Link from "next/link"; // Next.js에서는 a 태그 대신 Link를 씁니다.
import "./Header.css";

export default function Header() {
  return (
    <header className="nav-bar">
      <div className="nav-content">
        <Link href="/">
          <img className="logo" src="/images/logo/logo.png" alt="털털이 로고" />
        </Link>
        <div className="menu-links">
          <Link href="/post" className="nav-item">털털하러 가기</Link>
          <Link href="/garden" className="nav-item">털털정원</Link>
          <Link href="/select" className="nav-item">AI와 털털하기</Link>
          <Link href="/about" className="nav-item">ABOUT</Link>
        </div>
        <div className="profile-icon">
          <Link href="/login">
            <img className="profile" src="/images/logo/Vector.png" alt="털털이 로고" />
          </Link>
        </div>
      </div>
    </header>
  );
}