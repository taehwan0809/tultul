"use client";

import { useState } from "react";
import Header from "../../components/Header";
import styles from "./garden.module.css";

export default function GardenPage() {
  const [postCount, setPostCount] = useState(0);

  const getGrowthStage = (count: number) => {
    if (count >= 9) return 4;
    if (count >= 5) return 3;
    if (count >= 2) return 2;
    return 1;
  };

  const stage = getGrowthStage(postCount);

  // 단계별 데이터에 그라데이션(bg) 추가
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

  return (
    // 인라인 스타일로 배경을 실시간 변경
    <main className={styles.component} style={{ background: current.bg, transition: "background 1s ease" }}>
      <Header />
      
      {/* 숲 배경 이미지는 그라데이션 위에 겹쳐서 투명도 유지 */}
      <img className={styles.forestBg} src="/images/garden/land.png" alt="숲 배경" />

      <section className={styles.content}>
        <h1 className={styles.title}>{current.name}</h1>
        {/* </br> 태그를 실제 줄바꿈으로 변환 */}
        <h2 className={styles.subtitle}>
            {current.content.split('</br>').map((line, i) => (
            <span key={i}>
                {line}
                <br />
            </span>
            ))}
        </h2>
        <p className={styles.p}>게시한 게시글 수: {postCount}개</p>
        
        <div className={styles.treeWrapper}>
          <img className={styles.treeImage} src={current.img} alt={current.name} />
        </div>

        {/* 테스트용 버튼 */}
        <button className={styles.testButton} onClick={() => setPostCount(postCount + 1)}>
          기록 추가하기
        </button>
      </section>
    </main>
  );
}