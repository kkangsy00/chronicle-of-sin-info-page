<template>
  <div class="home-page">
    <div class="hero-section">
      <h1>죄의 연대기</h1>
      <p>완전한 선인도 완전한 악인도 없다</p>
      
      <div class="nav-buttons">
        <button class="nav-btn info-btn" @click="$emit('navigate', 'info')">
          <div class="btn-image info-image"></div>
          <span class="btn-text">인물</span>
        </button>
        <button class="nav-btn gallery-btn" @click="$emit('navigate', 'gallery')">
          <div class="btn-image gallery-image"></div>
          <span class="btn-text">아트워크</span>
        </button>
      </div>
    </div>
  </div>
  <div class="bottom-txt"> 
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

.home-page {
  height: 100vh;
  min-height: 500px;
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
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

.hero-section p {
  font-family: "Nanum Myeongjo", serif;
  font-size: clamp(1.2rem, 3vw, 2rem);
  color: #bdb7a0;
  opacity: 0.9;
}

.bottom-txt {
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  position: absolute;
  width: 100%;
  font-size: 0.8vw;
}

.nav-buttons {
  display: flex;
  gap: 3rem;
  margin-top: 3rem;
  justify-content: center;
  flex-wrap: wrap;
}

.nav-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
  border: 3px solid rgba(0, 0, 0);
  background: rgba(0, 0, 0, 0.4);
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  padding: 20px;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.8);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
}

.btn-image {
  width: 120px;
  height: 120px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 15px;
  transition: transform 0.3s ease;
}

.info-image {
  background-image: url('/data/statics/info.png');
}

.gallery-image {
  background-image: url('/data/statics/gallery.png');
}

.btn-text {
  color: #bdb7a0;
  font-size: 1.3rem;
  font-weight: 400;
}

.nav-btn:hover .btn-text {
  color: #fdfdfc;
}

@media (max-width: 650px) {
  .nav-buttons {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
  
  .nav-btn {
    width: 180px;
    height: 180px;
    padding: 15px;
  }
  
  .btn-image {
    width: 100px;
    height: 100px;
    margin-bottom: 10px;
  }
  
  .btn-text {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .nav-btn {
    width: 160px;
    height: 160px;
    padding: 10px;
  }
  
  .btn-image {
    width: 80px;
    height: 80px;
  }
  
  .btn-text {
    font-size: 0.9rem;
  }
}
</style>
