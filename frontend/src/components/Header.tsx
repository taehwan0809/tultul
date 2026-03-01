"use client";

import Link from "next/link";
import { useState } from "react";
import "./Header.css";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav-bar">
      <div className="nav-content">
        <Link href="/community" className="logo-link" onClick={() => setOpen(false)}>
          <img className="logo" src="/images/logo/logo.png" alt="털털이 로고" />
        </Link>

        <nav className={`menu-links ${open ? "is-open" : ""}`}>
          <Link href="/post" className="nav-item" onClick={() => setOpen(false)}>
            털털하러 가기
          </Link>
          <Link href="/garden" className="nav-item" onClick={() => setOpen(false)}>
            털털정원
          </Link>
          <Link href="/select" className="nav-item" onClick={() => setOpen(false)}>
            AI와 털털하기
          </Link>
          <Link href="/about" className="nav-item" onClick={() => setOpen(false)}>
            ABOUT
          </Link>
        </nav>

        <div className="right-area">
          <Link href="/login" className="profile-icon" onClick={() => setOpen(false)}>
            <img className="profile" src="/images/logo/Vector.png" alt="프로필" />
          </Link>

          <button
            className="hamburger"
            aria-label="메뉴 열기"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            type="button"
          >
          <img src="/images/logo/menu.png" alt="햄버거 메뉴" />
          </button>
        </div>
      </div>

      {open && <div className="nav-backdrop" onClick={() => setOpen(false)} />}
    </header>
  );
}