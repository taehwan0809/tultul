"use client";

import { useState } from "react";
import Header from "../../components/Header"; // 헤더 불러오기
import "./style.css";

export default function CommunityPage() {
  // 나중에 실제 백엔드 로그인 정보와 연결할 부분
  const [user, setUser] = useState<{ name: string } | null>(null); // null이면 로그아웃 상태

  const posts = [
    { id: 1, title: "오늘 면접에서 떨어졌네요...", date: "2027-02-22", color: "#FFDADA" },
    { id: 2, title: "회사 상사 때문에 너무 스트레스 받아요", date: "2027-02-21", color: "#DADAFF" },
    { id: 3, title: "드디어 첫 월급을 받았습니다!", date: "2027-02-20", color: "#DAFFDA" },
    { id: 4, title: "고민이 있는데 들어주실 분?", date: "2027-02-19", color: "#FFFADA" },
    { id: 5, title: "오늘 날씨가 너무 좋네요.", date: "2027-02-18", color: "#EAEAEA" },
    { id: 6, title: "털털이 캐릭터 추천 좀 해주세요", date: "2027-02-17", color: "#FFD0FF" },
  ];

  return (
    <main className="community-container">
      <div className="background-noise"></div>
      
      {/* 분리한 공통 헤더 사용 */}
      <Header />

      <section className="hero-section">
        <h1 className="hero-title">
          {user ? (
            <>
              <span className="highlight">{user.name}</span>님<br />
              오늘은 어떤 이야기를 해볼까요?
            </>
          ) : (
            <>
              로그인 먼저 해주세요!<br />
              <span className="sub-text">털털이의 정원이 기다리고 있어요.</span>
            </>
          )}
        </h1>
        <img className="hero-img" src="/images/garden/level1.png" alt="식물" />
      </section>

      <section className="content-section">
        <div className="content-header">
          <select className="sort-select">
            <option value="latest">최신순</option>
            <option value="popular">토닥토닥순</option>
          </select>
        </div>

        <div className="post-grid">
          {posts.map((post) => (
            <article key={post.id} className="post-card">
              <div className="post-thumbnail" style={{ backgroundColor: post.color }}></div>
              <div className="post-info">
                <h2 className="post-title">{post.title}</h2>
                <time className="post-date">{post.date}</time>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}