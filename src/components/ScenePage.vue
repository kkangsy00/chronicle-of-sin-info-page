<template>
  <div class="scene-page">
    <HomeButton @navigate="(page) => $emit('navigate', page)" />
    <div class="container">
      <div class="scene-content">
        <div class="scene-list">
          <button
            v-for="scene in sceneData.scenes"
            :key="scene.id"
            class="scene-item"
            @click="$emit('navigate', { page: 'hotspot', scenePath: scene.scenePath })"
          >
            <span class="scene-title">{{ scene.title }}</span>
            <span class="scene-desc">{{ scene.description }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import HomeButton from './HomeButton.vue'

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
  border: 0.05vw solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5vw;
  padding: 2vw;
  backdrop-filter: blur(10px);
}

.scene-list {
  display: grid;
  gap: 0.8vw;
}

.scene-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 1.2vw 1.5vw;
  background: linear-gradient(90deg, rgba(22, 21, 0, 0.8) 0%, rgba(41, 38, 21, 0.3) 100%);
  border: 0.05vw solid #000000;
  border-left: 0.25vw solid #4c4d3e;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.scene-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 0.05vw;
  background: rgba(0, 0, 0, 0.8);
  opacity: 0.6;
}

.scene-item:hover {
  background: linear-gradient(90deg, rgba(22, 22, 0, 1) 0%, rgba(41, 38, 21, 0.5) 100%);
  transform: translateX(0.5vw);
  border-left-color: #fdfdfc;
  box-shadow: 0 0.3vw 0.8vw rgba(0, 0, 0, 0.4);
}

.scene-title {
  display: block;
  color: #d8d7c1;
  font-size: 1.2vw;
  font-weight: 500;
  margin-bottom: 0.4vw;
  transition: color 0.3s ease;
}

.scene-item:hover .scene-title {
  color: #fdfdfc;
}

.scene-desc {
  color: var(--color-text-secondary, #9b9883);
  font-size: 0.9vw;
  line-height: 1.4;
  transition: color 0.3s ease;
}

.scene-item:hover .scene-desc {
  color: var(--color-text-muted, #bdb7a0);
}

/* 반응형 - 대형 화면 */
@media (min-width: 2561px) {
  .container { max-width: 70vw; padding: 5vw 2vw; }
  .scene-content { padding: 2.5vw; border-radius: 0.6vw; }
  .scene-list { gap: 1vw; }
  .scene-item { padding: 1.5vw 2vw; border-left-width: 0.3vw; }
  .scene-item:hover { transform: translateX(0.6vw); }
  .scene-title { font-size: 1.4vw; margin-bottom: 0.5vw; }
  .scene-desc { font-size: 1vw; }
}

@media (min-width: 1921px) {
  .container { max-width: 72vw; padding: 4.5vw 1.8vw; }
  .scene-content { padding: 2.2vw; }
  .scene-item { padding: 1.3vw 1.7vw; }
  .scene-title { font-size: 1.3vw; }
  .scene-desc { font-size: 0.95vw; }
}

/* 반응형 - 중형 화면 */
@media (max-width: 1280px) {
  .container { max-width: 80vw; padding: 4vw 1.5vw; }
  .scene-content { padding: 2vw; }
  .scene-item { padding: 1.3vw 1.6vw; }
  .scene-title { font-size: 1.3vw; }
  .scene-desc { font-size: 1vw; }
}

@media (max-width: 1024px) {
  .container { max-width: 85vw; padding: 4vw 2vw; }
  .scene-content { padding: 2.5vw; }
  .scene-item { padding: 1.5vw 2vw; }
  .scene-title { font-size: 1.5vw; }
  .scene-desc { font-size: 1.1vw; }
}

/* 반응형 - 소형 화면 */
@media (max-width: 768px) {
  .container { max-width: 90vw; padding: 5vw 2.5vw; }
  .scene-content { padding: 3vw; border-radius: 1vw; }
  .scene-list { gap: 1.5vw; }
  .scene-item { padding: 2vw 2.5vw; border-left-width: 0.4vw; }
  .scene-item:hover { transform: translateX(1vw); }
  .scene-title { font-size: 2vw; margin-bottom: 0.6vw; }
  .scene-desc { font-size: 1.6vw; }
}

@media (max-width: 640px) {
  .container { max-width: 92vw; padding: 6vw 3vw; }
  .scene-content { padding: 3.5vw; }
  .scene-list { gap: 2vw; }
  .scene-item { padding: 2.5vw 3vw; border-left-width: 0.5vw; }
  .scene-title { font-size: 2.5vw; }
  .scene-desc { font-size: 2vw; }
}

@media (max-width: 480px) {
  .container { max-width: 95vw; padding: 7vw 3vw; }
  .scene-content { padding: 4vw; border-radius: 1.5vw; }
  .scene-list { gap: 2.5vw; }
  .scene-item { padding: 3vw 3.5vw; border-left-width: 0.6vw; border-width: 0.1vw; }
  .scene-item:hover { transform: translateX(1.5vw); }
  .scene-title { font-size: 3vw; margin-bottom: 0.8vw; }
  .scene-desc { font-size: 2.3vw; }
}
</style>
