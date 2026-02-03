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
            털털이는 항상 여러분의 실패가 기대됩니다
          </h1>
          
          <p className={styles.descriptionTop}>
            사람은 모두 실패를 겪고 저 또한 이 공간을 제작하는 과정에서 수많은 실패를 했습니다<br />
            하지만 털털이는 실패를 절대 좌절하는 순간이라고 생각하지 않아요<br />
            그래서 존재합니다.
          </p>
          
          <p className={styles.descriptionBottom}>
            실패를 원하는 사람은 없지만 원하지 않는 일에서도 배움은 항상 따라옵니다<br />
            실패를 경험삼아 털털나무와 함께 성장한 여러분을 기대하겠습니다<br />
            여러분이 이 사이트에 들어올 일이 없는 날까지도<br />
            로고도, 기능도 부족한 털털이는 매일 성장하며 존재합니다!!<br />
            혹시나 좌절이 오는 순간이 생기면 언제든 찾아오세요<br />
            실패는 두렵고 부끄러운 것이 아닙니다 털털나무 같은 것입니다!!
          </p>
        </div>
      </section>
    </main>
  );
}