"use client";

import { useState, useEffect } from "react"; // useEffect 추가
import Header from "../../components/Header";
import axios from "axios"; // axios 추가
import styles from "./garden.module.css";

export default function GardenPage() {
  const [postCount, setPostCount] = useState(0);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const fetchPostCount = async () => {
      try {
        // 백엔드에 내 게시글 개수 요청
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/my/count`, {
          withCredentials: true, // 세션/쿠키 전달 필수
        });
        setPostCount(res.data.count);
      } catch (error) {
        console.error("게시글 개수 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPostCount();
  }, []);

  const getGrowthStage = (count: number) => {
    if (count >= 9) return 4;
    if (count >= 5) return 3;
    if (count >= 2) return 2;
    return 1;
  };

  const stage = getGrowthStage(postCount);

  const growthData = {
    1: { 
      name: "씨앗", 
      content: "실패는 끝이 아닌 성장 기록입니다. </br> 게시글을 올려 새싹으로 키워보세요",
      img: "/images/garden/level0.png", 
      bg: "linear-gradient(180deg, rgba(255, 249, 82, 1) 0%, rgba(139, 220, 250, 1) 71%)" 
    },
    2: { 
      name: "새싹", 
      content: "실패를 두려워하지 마세요. </br> 게시글을 올려 어린 나무로 키워보세요",
      img: "/images/garden/level1.png", 
      bg: "linear-gradient(180deg, rgba(255, 205, 113, 1) 0%, rgba(170, 205, 218, 1) 73%)" 
    },
    3: { 
      name: "어린 나무", 
      content: "다양한 경험을 하는 건 대단한 일이에요 </br> 게시글을 올려 털털나무로 키워보세요",
      img: "/images/garden/level2.png", 
      bg: "linear-gradient(180deg, rgba(255, 181, 116, 1) 7%, rgba(168, 220, 240, 1) 100%)" 
    },
    4: { 
      name: "털털나무", 
      content: "나무와 함께 성장하셨어요! </br>앞으로 실패를 두려워하지 마세요",
      img: "/images/garden/level3.png", 
      bg: "linear-gradient(180deg, rgba(255, 169, 115, 1) 12%, rgba(170, 205, 218, 1) 100%)" 
    },
  };

  const current = growthData[stage as keyof typeof growthData];

  if (loading) return <div className={styles.loading}>정원 불러오는 중... 🌱</div>;

  return (
    <main className={styles.component} style={{ background: current.bg, transition: "background 1s ease" }}>
      <Header />
      <img className={styles.forestBg} src="/images/garden/land.png" alt="숲 배경" />

      <section className={styles.content}>
        <h1 className={styles.title}>{current.name}</h1>
        <h2 className={styles.subtitle}>
          {current.content.split('</br>').map((line, i) => (
            <span key={i}>{line}<br /></span>
          ))}
        </h2>
        <p className={styles.p}>현재 나의 기록: {postCount}개</p>
        
        <div className={styles.treeWrapper}>
          <img className={styles.treeImage} src={current.img} alt={current.name} />
        </div>

        {/* 💡 실무용으로는 테스트 버튼 대신 '기록하러 가기' 버튼을 넣으면 좋겠죠? */}
        <button className={styles.testButton} onClick={() => window.location.href='/community/write'}>
          새로운 기록 남기기
        </button>
      </section>
    </main>
  );
}