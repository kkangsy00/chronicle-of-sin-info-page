<template>
  <button class="home-btn" @click="$emit('navigate', 'home')" title="돌아가기">
    ×
  </button>
</template>

<script setup>
defineEmits(['navigate'])
</script>

<style scoped>
.home-btn {
  position: fixed;
  top: 1.2vw;
  left: 1.2vw;
  background: #ce3a24;
  color: black;
  border: 0.05vw solid black;
  width: 3vw;
  height: 3vw;
  cursor: pointer;
  z-index: 1000;
  font-size: clamp(2rem, 3vw, 3.5rem);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  line-height: 1;
}

.home-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 0.3vw 0.6vw rgba(0, 0, 0, 0.3);
}

/* 반응형 - 대형 화면 */
@media (min-width: 2561px) {
  .home-btn { left: 1.5vw; top: 1.5vw; width: 3.5vw; height: 3.5vw; border: 0.15vw solid black; font-size: clamp(4rem, 5vw, 6rem); }
}

@media (min-width: 1921px) {
  .home-btn { top: 1.3vw; left: 1.3vw; width: 3.2vw; height: 3.2vw; border: 0.1vw solid black; }
}

/* 반응형 - 소형 화면 */
@media (max-width: 1280px) {
  .home-btn {top: 1vw; left: 1vw; width: 3.5vw; height: 3.5vw; }
}

@media (max-width: 1024px) {
  .home-btn { top: 1vw; left: 1vw; width: 4vw; height: 4vw; }
}

@media (max-width: 768px) {
  .home-btn { top: 1.5vw; left: 1.5vw; width: 6vw; height: 6vw;}
}

@media (max-width: 640px) {
  .home-btn { top: 1.8vw; left: 1.8vw; width: 7vw; height: 7vw; }
}

@media (max-width: 480px) {
  .home-btn { top: 2vw; left: 2vw; width: 8vw; height: 8vw; }
}
</style>
