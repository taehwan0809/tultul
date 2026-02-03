"use client";

import "./style.css";

export default function SelectPage() {
  const characters = [
    {
      id: "chun-sam",
      name: "김춘삼씨 (73세)",
      quote: '"괜찮어. 딸래미. 화이팅^^"',
      desc: "손녀가 있으실 것 같은 따뜻한 할아버지",
      img: "/images/models/cs.png",
    },
    {
      id: "byeong-cheol",
      name: "김병철씨 (52세)",
      quote: '"오늘 하루도 화이팅!!!"',
      desc: "지나가는 따뜻한 아저씨 스타일",
      img: "/images/models/bc.png",
    },
    {
      id: "du-pal",
      name: "곽두팔씨 (29세)",
      quote: '"29세도 20대이다!!!"',
      desc: "털털한 럭키비키 상남자",
      img: "/images/models/dp.png",
    },
  ];

  return (
    <main className="select-container">
      {/* 헤더 로고 */}
      <header className="header">
        <img src="images/logo/logo.png" alt="털털이 로고" className="logo" />
      </header>

      {/* 카드 섹션 */}
      <section className="card-wrapper">
        {characters.map((char) => (
          <article key={char.id} className="char-card">
            <button className="card-inner">
              <div className="img-box">
                <img src={char.img} alt={char.name} />
              </div>
              <h2 className="char-name">{char.name}</h2>
              <p className="char-quote">{char.quote}</p>
              <p className="char-desc">{char.desc}</p>
            </button>
          </article>
        ))}
      </section>

      {/* 푸터 문구 */}
      <footer className="footer">
        <div className="footerBox">
        <p className="footer-text">오늘의 이야기를 털털할 분을 고르세요</p>
        </div>
      </footer>
    </main>
  );
}