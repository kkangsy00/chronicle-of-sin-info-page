<template>
  <div class="links-page">
    <!-- 홈 버튼 -->
    <HomeButton @navigate="(page) => $emit('navigate', page)" />
    <div class="container">
      <div class="links-content">
        <div v-for="category in linkData.categories" :key="category.id" class="link-section">
          <h2>{{ category.title }}</h2>
          <div class="link-list">
            <a 
              v-for="link in category.links" 
              :key="link.title"
              :href="link.url" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="link-item"
            >
              <span class="link-title">{{ link.title }}</span>
              <span class="link-desc">{{ link.desc }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import HomeButton from './HomeButton.vue'

defineEmits(['navigate'])

const linkData = ref({ categories: [] })

onMounted(async () => {
  const response = await fetch(`${import.meta.env.BASE_URL}data/links.json`)
  linkData.value = await response.json()
})
</script>

<style scoped>
.links-page {
  min-height: 100vh;
  color: white;
}



.container {
  max-width: 75vw;
  margin: 0 auto;
  padding: 4vw 1.5vw;
}

.link-section {
  background: rgba(0, 0, 0, 0.3);
  border: var(--border-hair) solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5vw;
  padding: 2vw;
  backdrop-filter: blur(10px);
  margin-bottom: 1.5vw;
}

.link-section h2 {
  font-size: var(--fs-md);
  color: #d8d7c1;
  margin-bottom: 1.2vw;
  padding-bottom: 0.6vw;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
}

.link-list {
  display: grid;
  gap: 0.8vw;
}

.link-item {
  display: block;
  padding: 1.2vw 1.5vw;
  background: linear-gradient(90deg, rgba(22, 21, 0, 0.8) 0%, rgba(41, 38, 21, 0.3) 100%);
  border: var(--border-hair) solid #000000;
  border-left: 3px solid #4c4d3e;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.link-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: rgba(0, 0, 0, 0.8);
  opacity: 0.6;
}

.link-item:hover {
  background: linear-gradient(90deg, rgba(22, 22, 0, 1) 0%, rgba(41, 38, 21, 0.5) 100%);
  transform: translateX(0.5vw);
  border-left-color: #fdfdfc;
  box-shadow: 0 0.3vw 0.8vw rgba(0, 0, 0, 0.4);
}

.link-title {
  display: block;
  color: #d8d7c1;
  font-size: var(--fs-base);
  font-weight: 500;
  margin-bottom: 0.4vw;
  transition: color 0.3s ease;
}

.link-item:hover .link-title {
  color: #fdfdfc;
}

.link-desc {
  color: var(--color-text-secondary);
  font-size: var(--fs-xs);
  line-height: 1.4;
  transition: color var(--transition-normal);
}

.link-item:hover .link-desc {
  color: var(--color-text-muted);
}

/* 반응형 — 폰트/테두리는 토큰·헤어라인으로 처리. 레이아웃 비율만 조정 */
@media (min-width: 2561px) {
  .container { max-width: 70vw; padding: 5vw 2vw; }
  .link-section { padding: 2.5vw; margin-bottom: 2vw; border-radius: 0.6vw; }
  .link-section h2 { margin-bottom: 1.5vw; padding-bottom: 0.8vw; }
  .link-list { gap: 1vw; }
  .link-item { padding: 1.5vw 2vw; }
  .link-item:hover { transform: translateX(0.6vw); }
}

@media (min-width: 1921px) {
  .container { max-width: 72vw; padding: 4.5vw 1.8vw; }
  .link-section { padding: 2.2vw; margin-bottom: 1.8vw; }
  .link-section h2 { margin-bottom: 1.3vw; }
  .link-item { padding: 1.3vw 1.7vw; }
}

@media (max-width: 1280px) {
  .container { max-width: 80vw; padding: 4vw 1.5vw; }
  .link-section { padding: 2vw; }
  .link-item { padding: 1.3vw 1.6vw; }
}

@media (max-width: 1024px) {
  .container { max-width: 85vw; padding: 4vw 2vw; }
  .link-section { padding: 2.5vw; }
  .link-item { padding: 1.5vw 2vw; }
}

/* 반응형 - 소형 화면 */
@media (max-width: 768px) {
  .container { max-width: 90vw; padding: 5vw 2.5vw; }
  .link-section { padding: 3vw; margin-bottom: 3vw; border-radius: 1vw; }
  .link-section h2 { margin-bottom: 2vw; padding-bottom: 1vw; }
  .link-list { gap: 1.5vw; }
  .link-item { padding: 2vw 2.5vw; }
  .link-item:hover { transform: translateX(1vw); }
}

@media (max-width: 640px) {
  .container { max-width: 92vw; padding: 6vw 3vw; }
  .link-section { padding: 3.5vw; margin-bottom: 3.5vw; }
  .link-section h2 { margin-bottom: 2.5vw; }
  .link-list { gap: 2vw; }
  .link-item { padding: 2.5vw 3vw; }
}

@media (max-width: 480px) {
  .container { max-width: 95vw; padding: 7vw 3vw; }
  .link-section { padding: 4vw; margin-bottom: 4vw; border-radius: 1.5vw; }
  .link-section h2 { margin-bottom: 3vw; padding-bottom: 1.5vw; }
  .link-list { gap: 2.5vw; }
  .link-item { padding: 3vw 3.5vw; }
  .link-item:hover { transform: translateX(1.5vw); }
}
</style>
