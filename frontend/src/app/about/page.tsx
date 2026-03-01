"use client";

import Header from "../../components/Header";
import styles from "./about.module.css";

export default function AboutPage() {
  return (
    <main className={styles.container}>
      <Header />

      <section className={styles.contentSection}>
        {/* 장식용 투명 판: 글씨를 잘 보이게 함 */}
        <div className={styles.paperOverlay}>
          <h1 className={styles.title}>
            당신의 마음을 털어놓는 곳, 털털이
          </h1>
          
          <p className={styles.descriptionTop}>
            "오늘 하루, 속 시원히 털어놓을 곳이 있었나요?" <br />
    털털이는 일상의 무거운 짐을 가볍게 털어내고 싶은 당신을 위한 <strong>AI 심리 대화 서비스 & 커뮤니티</strong>입니다.
          </p>
          
          <p className={styles.descriptionBottom}>
            실패를 원하는 사람은 없지만 원하지 않는 일에서도 배움은 항상 따라옵니다<br />
            실패를 경험삼아 털털나무와 함께 성장한 여러분을 기대하겠습니다<br />
          </p>
        </div>
      </section>
    </main>
  );
}