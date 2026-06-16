<template>
  <div class="links-page">
    <!-- 홈 버튼 -->
    <HomeButton @navigate="$emit('navigate', $event)" />
    <div class="container">
      <div class="links-content">
        <div v-for="category in linkData.categories" :key="category.id" class="link-section">
          <h2>{{ category.title }}</h2>
          <CardList :items="category.links" as="link" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import HomeButton from '../components/HomeButton.vue'
import CardList from '../components/CardList.vue'

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

/* 반응형 — 섹션·제목 여백만 조정 (링크 카드 스타일은 CardList) */
@media (min-width: 2561px) {
  .container { max-width: 70vw; padding: 5vw 2vw; }
  .link-section { padding: 2.5vw; margin-bottom: 2vw; border-radius: 0.6vw; }
  .link-section h2 { margin-bottom: 1.5vw; padding-bottom: 0.8vw; }
}

@media (min-width: 1921px) {
  .container { max-width: 72vw; padding: 4.5vw 1.8vw; }
  .link-section { padding: 2.2vw; margin-bottom: 1.8vw; }
  .link-section h2 { margin-bottom: 1.3vw; }
}

@media (max-width: 1280px) {
  .container { max-width: 80vw; padding: 4vw 1.5vw; }
  .link-section { padding: 2vw; }
}

@media (max-width: 1024px) {
  .container { max-width: 85vw; padding: 4vw 2vw; }
  .link-section { padding: 2.5vw; }
}

@media (max-width: 768px) {
  .container { max-width: 90vw; padding: 5vw 2.5vw; }
  .link-section { padding: 3vw; margin-bottom: 3vw; border-radius: 1vw; }
  .link-section h2 { margin-bottom: 2vw; padding-bottom: 1vw; }
}

@media (max-width: 640px) {
  .container { max-width: 92vw; padding: 6vw 3vw; }
  .link-section { padding: 3.5vw; margin-bottom: 3.5vw; }
  .link-section h2 { margin-bottom: 2.5vw; }
}

@media (max-width: 480px) {
  .container { max-width: 95vw; padding: 7vw 3vw; }
  .link-section { padding: 4vw; margin-bottom: 4vw; border-radius: 1.5vw; }
  .link-section h2 { margin-bottom: 3vw; padding-bottom: 1.5vw; }
}
</style>
