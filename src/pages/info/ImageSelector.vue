<template>
  <div class="images-content fade-transition custom-scroll">
    <div class="image-buttons">
      <button
        v-for="image in images"
        :key="image.id"
        :class="['image-button', { active: selectedImageId === image.id }]"
        :style="{ backgroundImage: `url(${image.src})` }"
        @click="$emit('select', image.id)"
      >
        <span>{{ image.name }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  images: {
    type: Array,
    default: () => []
  },
  selectedImageId: {
    type: Number,
    default: 1
  }
})

defineEmits(['select'])
</script>

<style scoped>
.images-content {
  background: linear-gradient(90deg, rgba(22, 21, 0, 0.8) 0%, rgba(41, 38, 21, 0.3) 100%);
  border: var(--border-hair) solid #000000;
  padding: 1.2vw;
  flex: 1;
  overflow-y: auto;
}

/* 스크롤바는 전역 .custom-scroll 사용 */

.image-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(9vw, 1fr));
  gap: 1vw;
}

.image-button {
  background: rgba(0, 0, 0, 0.3);
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
  border: var(--border-hair) solid #000000;
  color: #ffffff;
  cursor: pointer;
  font-size: var(--fs-sm);
  font-weight: 700;
  padding: 1vw 0.6vw;
  transition: all 0.3s ease;
  border-radius: 0.12vw;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  position: relative;
  width: 9vw;
  height: 9vw;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.image-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 0.24vw;
  z-index: 1;
}

.image-button span {
  position: relative;
  z-index: 2;
}

.image-button:hover::before {
  background: rgba(255, 255, 255, 0.2);
}

.image-button.active {
  border: 2px solid #fdfdfc;
  transform: translateY(-0.05vw);
}

.image-button.active::before {
  background: rgba(253, 253, 252, 0.3);
}

/* 반응형 — 버튼 라벨 폰트는 토큰(clamp)으로 처리. 그리드·크기만 조정 */
@media (min-width: 2561px) {
  .images-content { padding: 2vw; }
  .image-buttons { gap: 1.5vw; grid-template-columns: repeat(auto-fill, minmax(12vw, 1fr)); }
  .image-button { width: 12vw; height: 12vw; padding: 1.5vw 1vw; }
}

@media (min-width: 1921px) {
  .images-content { padding: 1.6vw; }
  .image-buttons { gap: 1.2vw; grid-template-columns: repeat(auto-fill, minmax(10vw, 1fr)); }
  .image-button { width: 10vw; height: 10vw; padding: 1.2vw 0.8vw; }
}

/* 반응형 - 소형 화면 */
@media (max-width: 768px) {
  .images-content { padding: 1.5vw; }
  .image-buttons { gap: 1.2vw; grid-template-columns: repeat(auto-fill, minmax(15vw, 1fr)); }
  .image-button { width: 15vw; height: 15vw; padding: 1.2vw 1vw; }
}

@media (max-width: 480px) {
  .images-content { padding: 2vw; }
  .image-buttons { gap: 1.5vw; grid-template-columns: repeat(auto-fill, minmax(20vw, 1fr)); }
  .image-button { width: 20vw; height: 20vw; padding: 1.5vw 1.2vw; }
}
</style>
