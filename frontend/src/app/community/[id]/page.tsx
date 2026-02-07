"use client";

import { useEffect, useState, use } from "react"; // 1. use 추가
import axios from "axios";
import Header from "../../../components/Header";
import "../style.css"; 

interface PostDetail {
  id: number;
  title: string;
  content: string; 
  created_at: string;
  thumbnail: string;
  author: string;
}

// 2. params 타입을 Promise로 정의
export default function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // 3. use(params)를 사용해 비동기 데이터를 동기적으로 꺼냄
  const resolvedParams = use(params); 
  const id = resolvedParams.id;

  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // 4. 이제 안전하게 id를 사용합니다.
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/community/${id}`);
        setPost(res.data);
      } catch (error) {
        console.error("상세 데이터 로딩 실패:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]); // 의존성 배열에 id 넣기

  if (loading) return <div className="loading">정원에서 이야기를 가져오는 중... 🌱</div>;
  if (!post) return <div className="error">존재하지 않는 이야기입니다.</div>;

  return (
    <main className="community-container">
      <Header />
      
      <article className="detail-wrapper" style={{ maxWidth: '900px', margin: '100px auto', padding: '40px', background: 'white', borderRadius: '20px' }}>
        <header className="detail-header" style={{ marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
          <h1 style={{ fontSize: '32px', color: '#333', marginBottom: '10px' }}>{post.title}</h1>
          <div style={{ color: '#888', display: 'flex', gap: '15px' }}>
            <span>By. {post.author}</span>
            <span>{post.created_at?.slice(0, 10)}</span>
          </div>
        </header>

        {post.thumbnail && (
          <img 
            src={`${process.env.NEXT_PUBLIC_BACK_URL}${post.thumbnail}`} 
            style={{ width: '100%', borderRadius: '15px', marginBottom: '30px', objectFit: 'cover' }} 
            alt="대표 이미지" 
          />
        )}

        <div 
          className="detail-content" 
          style={{ lineHeight: '1.8', fontSize: '18px', color: '#444' }}
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
      </article>
    </main>
  );
}