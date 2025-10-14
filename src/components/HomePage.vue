<template>
  <div class="home-page">
    <div class="hero-section">
      <h1>Chronicle of Sin</h1>
      <p>캐릭터 정보 페이지에 오신 것을 환영합니다</p>
      
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
</template>

<script>
export default {
  name: 'HomePage',
  emits: ['navigate']
}
</script>

<style scoped>
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
  font-size: clamp(3rem, 8vw, 6rem);
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

.hero-section p {
  font-size: clamp(1.2rem, 3vw, 2rem);
  margin-bottom: 3rem;
  opacity: 0.9;
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
