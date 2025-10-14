<template>
  <div class="home-page">
    <div class="hero-section">
      <h1>죄의 연대기</h1>
      <p>완전한 선인도 완전한 악인도 없다</p>
      
      <div class="nav-buttons">
        <button class="nav-btn info-btn" @click="$emit('navigate', 'info')">
          인물정보
        </button>
        <button class="nav-btn gallery-btn" @click="$emit('navigate', 'gallery')">
          아트워크
        </button>
      </div>
    </div>
  </div>
  <div class="txt"> 
    본 문서는 크툴루의 부름 7th 팬메이드 시나리오 「죄의 연대기」의 강한 스포일러를 포함합니다.
    <br/> UI를 포함한 디자인 요소 일부는 모바일 게임 「회색도시 2」를 참고하였습니다.
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  emits: ['navigate']
}
</script>

<style scoped>
@font-face {
    font-family: 'KotraDoYak';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2110@1.0/KOTRALEAP.woff2') format('woff2');
    font-weight: normal;
    font-display: swap;
}
@import url('//fonts.googleapis.com/earlyaccess/nanummyeongjo.css');


.home-page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.hero-section {
  text-align: center;
}

.hero-section h1 {
  font-family: "KotraDoYak", sans-serif;
  font-size: clamp(3rem, 12vw, 8rem);
  margin-bottom: 1rem;
  color: #cdcdcd;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

.hero-section p {
  font-family: "Nanum Myeongjo", serif;
  font-size: clamp(1.2rem, 3vw, 2rem);
  color: #bdb7a0;
  margin-bottom: 15rem;
  opacity: 0.9;
}

.txt {
  text-align: center;
  color: white;
  opacity: 0.7;
  position: absolute;
  bottom: 10px;
  width: 100%;
}

.nav-buttons {
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
}

.nav-btn {
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border: 2px solid rgba(255, 255, 255, 0.8);
  background: rgba(0, 0, 0, 0.3);
  color: white;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  width: 100%;
  min-width: 150px;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: white;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.info-btn:hover {
  background: linear-gradient(135deg, rgba(81, 79, 64, 0.8), rgba(59, 66, 59, 0.8));
}

.gallery-btn:hover {
  background: linear-gradient(135deg, rgba(68, 59, 36, 0.8), rgba(48, 76, 77, 0.8));
}

@media (max-width: 650px) {
  .nav-buttons {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .nav-btn {
    width: 200px;
  }
}
</style>
