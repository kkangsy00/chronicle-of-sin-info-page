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

<script setup>
defineEmits(['navigate'])
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
  font-size: 8vw;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 0.15vw 0.15vw 0.3vw rgba(0, 0, 0, 0.8);
}

p {
  font-size: 2vw;
  font-family: "Nanum Myeongjo", serif;
  color: #bdb7a0;
}

.nav-buttons {
  display: flex;
  gap: 3vw;
  margin: 3vh 0;
  flex-wrap: wrap;
  justify-content: center;
}

.nav-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 12vw;
  height: 12vw;
  border: 0.15vw solid black;
  background: rgba(0, 0, 0, 0.4);
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 1.2vw;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: white;
  transform: translateY(-3px);
}

.btn-image {
  width: 100%;
  height: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 0.8vw;
}

.info-image { background-image: url('/data/statics/info.png'); }
.gallery-image { background-image: url('/data/statics/gallery.png'); }
.links-image { background-image: url('/data/statics/links.png'); }

.nav-btn span {
  color: #bdb7a0;
  font-size: 1.2vw;
}

.nav-btn:hover span {
  color: #fdfdfc;
}

.bottom-txt {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8vw;
  padding: 0 2vw;
}

/* 반응형 - 대형 화면 */
@media (min-width: 2561px) {
  h1 { font-size: 10vw; }
  p { font-size: 2.5vw; }
  .nav-buttons { gap: 4vw; margin: 4vh 0; }
  .nav-btn { width: 14vw; height: 14vw; padding: 1.5vw; border-width: 0.2vw; }
  .btn-image { margin-bottom: 1vw; }
  .nav-btn span { font-size: 1.5vw; }
  .bottom-txt { font-size: 1vw; padding: 3vw; }
}

@media (min-width: 1921px) {
  h1 { font-size: 9vw; }
  p { font-size: 2.2vw; }
  .nav-buttons { gap: 3.5vw; }
  .nav-btn { width: 13vw; height: 13vw; padding: 1.3vw; border-width: 0.18vw; }
  .nav-btn span { font-size: 1.3vw; }
  .bottom-txt { font-size: 0.9vw; padding: 2.5vw; }
}

/* 반응형 - 중형 화면 */
@media (max-width: 1280px) {
  .nav-buttons { gap: 2.5vw; }
  .nav-btn { width: 13vw; height: 13vw; padding: 1.2vw; }
  .nav-btn span { font-size: 1.3vw; }
}

@media (max-width: 1024px) {
  .nav-buttons { gap: 2vw; }
  .nav-btn { width: 14vw; height: 14vw; padding: 1vw; }
  .nav-btn span { font-size: 1.4vw; }
}

/* 반응형 - 소형 화면 */
@media (max-width: 768px) {
  .nav-buttons { flex-direction: column; align-items: center; gap: 3vh; margin: 3vh 0; }
  .nav-btn { width: 22vw; height: 22vw; padding: 2vw; }
  .btn-image { margin-bottom: 1.2vh; }
  .nav-btn span { font-size: 2.5vw; }
  .bottom-txt { font-size: 1.5vw; }
}

@media (max-width: 640px) {
  .nav-btn { width: 24vw; height: 24vw; padding: 1.8vw; }
  .nav-btn span { font-size: 2.8vw; }
  .bottom-txt { font-size: 1.8vw; }
}

@media (max-width: 480px) {
  .nav-btn { width: 28vw; height: 28vw; padding: 1.5vw; border-width: 0.3vw; }
  .btn-image { margin-bottom: 1vh; }
  .nav-btn span { font-size: 3.2vw; }
  .bottom-txt { font-size: 2vw; }
}
</style>
