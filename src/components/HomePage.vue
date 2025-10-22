<template>
  <div class="home-page">
    <h1>죄의 연대기</h1>
    <p>완전한 선인도 완전한 악인도 없다</p>
    
    <div class="nav-buttons">
      <button class="nav-btn" @click="$emit('navigate', 'info')">
        <div class="btn-image info-image"></div>
        <span>인물</span>
      </button>
      <button class="nav-btn" @click="$emit('navigate', 'gallery')">
        <div class="btn-image gallery-image"></div>
        <span>아트워크</span>
      </button>
      <button class="nav-btn" @click="$emit('navigate', 'links')">
        <div class="btn-image links-image"></div>
        <span>링크</span>
      </button>
    </div>
    
    <div class="bottom-txt"> 
      본 페이지는 크툴루의 부름 7판 팬메이드 시나리오 「죄의 연대기」의 스포일러를 포함합니다.
      <br/> 디자인 요소는 모바일 게임 「회색도시 2」를 참고하여 제작되었습니다.
    </div>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
}

h1 {
  font-family: 'KotraDoYak', sans-serif;
  font-size: clamp(3rem, 12vw, 8rem);
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

p {
  font-size: clamp(1.2rem, 3vw, 2rem);
  color: #bdb7a0;
}

.nav-buttons {
  display: flex;
  gap: 3rem;
  margin: 3rem 0;
  flex-wrap: wrap;
}

.nav-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  height: 200px;
  border: 3px solid black;
  background: rgba(0, 0, 0, 0.4);
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 20px;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: white;
  transform: translateY(-3px);
}

.btn-image {
  width: 120px;
  height: 120px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 15px;
}

.info-image { background-image: url('/data/statics/info.png'); }
.gallery-image { background-image: url('/data/statics/gallery.png'); }
.links-image { background-image: url('/data/statics/links.png'); }

.nav-btn span {
  color: #bdb7a0;
  font-size: 1.3rem;
}

.nav-btn:hover span {
  color: #fdfdfc;
}

.bottom-txt {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8vw;
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
