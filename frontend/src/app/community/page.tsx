"use client";

import { useState, useEffect } from "react";
import Header from "../../components/Header";
import axios from "axios";
import "./style.css";
import Link from "next/link";

// 1. 게시글 타입 정의 (DB 컬럼명과 일치시킴)
interface Post {
  id: number;
  title: string;
  created_at: string; 
  thumbnail: string;
  author: string;
}

export default function CommunityPage() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [posts, setPosts] = useState<Post[]>([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchData = async () => {
    // 1. 사용자 체크 (실패해도 무관하게)
    try {
      const userRes = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/auth/check`, {
        withCredentials: true
      });
      if (userRes.data.user) setUser({ name: userRes.data.user.nickname });
    } catch (e) {
      console.log("미로그인 상태 또는 인증 실패");
      // 여기서 401 에러가 나도 catch에서 잡히므로 아래 로직은 정상 실행됩니다.
    }

    // 2. 게시글 목록 가져오기 (이건 꼭 성공해야 함)
    try {
      const postRes = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/community`);
      setPosts(postRes.data);
    } catch (error) {
      console.error("게시글 로딩 실패:", error);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);

  if (loading) return <div className="loading-state">정원 가꾸는 중... 🌱</div>;

  return (
    <main className="community-container">
      <div className="background-noise"></div>
      <Header />

      {/* 히어로 섹션: 로그인 상태에 따라 문구 변경 */}
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

        </div>

        <div className="post-grid">
          {posts.length > 0 ? (
            posts.map((post) => {
              // 이미지 경로 처리: /가 중복되지 않도록 처리
              
              const fullImageUrl = `${process.env.NEXT_PUBLIC_S3_BASE_URL}/${post.thumbnail}`;

              return (
              <Link href={`/community/${post.id}`} key={post.id} style={{ textDecoration: 'none' }}>
                <article key={post.id} className="post-card">
                  <div 
                    className="post-thumbnail" 
                    style={{ 
                      backgroundImage: `url(${fullImageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundColor: '#f0f0f0' // 이미지 없을 때 대비
                    }}
                  ></div>
                  <div className="post-info">
                    <h2 className="post-title">{post.title}</h2>
                    <div className="post-meta" style={{ display: 'flex', justifyContent: 'center', gap: '10px', color: '#888', fontSize: '14px' }}>
                      <span className="post-author">By. {post.author || '익명'}</span>
                      <span className="divider">|</span>
                      <time className="post-date">
                        {post.created_at ? String(post.created_at).slice(0, 10) : "날짜 미상"}
                      </time>
                    </div>
                  </div>
                </article>
              </Link>
              );
            })
          ) : (
            <div className="empty-posts">
              아직 등록된 이야기가 없습니다. 첫 번째 주인공이 되어보세요! 🌱
            </div>
          )}
        </div>
      </section>
    </main>
  );
}