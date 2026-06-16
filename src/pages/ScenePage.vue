<template>
  <div class="scene-page">
    <HomeButton @navigate="$emit('navigate', $event)" />
    <div class="container">
      <div class="scene-content">
        <CardList
          :items="sceneData.scenes"
          @select="(scene) => $emit('navigate', { page: 'hotspot', scenePath: scene.scenePath })"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import HomeButton from '../components/HomeButton.vue'
import CardList from '../components/CardList.vue'

defineEmits(['navigate'])

const sceneData = ref({ scenes: [] })

onMounted(async () => {
  const response = await fetch(`${import.meta.env.BASE_URL}data/hotspot/scenes.json`)
  sceneData.value = await response.json()
})
</script>

<style scoped>
.scene-page {
  min-height: 100vh;
  color: white;
}

.container {
  max-width: 75vw;
  margin: 0 auto;
  padding: 4vw 1.5vw;
}

.scene-content {
  background: rgba(0, 0, 0, 0.3);
  border: var(--border-hair) solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5vw;
  padding: 2vw;
  backdrop-filter: blur(10px);
}

/* 반응형 — 컨테이너·래퍼 여백만 조정 (카드 스타일은 CardList) */
@media (min-width: 2561px) {
  .container { max-width: 70vw; padding: 5vw 2vw; }
  .scene-content { padding: 2.5vw; border-radius: 0.6vw; }
}

@media (min-width: 1921px) {
  .container { max-width: 72vw; padding: 4.5vw 1.8vw; }
  .scene-content { padding: 2.2vw; }
}

@media (max-width: 1280px) {
  .container { max-width: 80vw; padding: 4vw 1.5vw; }
  .scene-content { padding: 2vw; }
}

@media (max-width: 1024px) {
  .container { max-width: 85vw; padding: 4vw 2vw; }
  .scene-content { padding: 2.5vw; }
}

@media (max-width: 768px) {
  .container { max-width: 90vw; padding: 5vw 2.5vw; }
  .scene-content { padding: 3vw; border-radius: 1vw; }
}

@media (max-width: 640px) {
  .container { max-width: 92vw; padding: 6vw 3vw; }
  .scene-content { padding: 3.5vw; }
}

@media (max-width: 480px) {
  .container { max-width: 95vw; padding: 7vw 3vw; }
  .scene-content { padding: 4vw; border-radius: 1.5vw; }
}
</style>
