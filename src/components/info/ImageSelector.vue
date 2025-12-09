<template>
  <div class="images-content fade-transition">
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
  border: 1px solid #000000;
  padding: 20px;
  flex: 1;
  overflow-y: auto;
}

.images-content::-webkit-scrollbar {
  width: var(--scrollbar-width);
}

.images-content::-webkit-scrollbar-track {
  background: var(--scrollbar-track);
}

.images-content::-webkit-scrollbar-thumb {
  background: var(--scrollbar-thumb);
  border: 2px solid var(--scrollbar-track);
}

.image-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
}

.image-button {
  background: rgba(0, 0, 0, 0.3);
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
  border: 1px solid #000000;
  color: #ffffff;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  padding: 15px 10px;
  transition: all 0.3s ease;
  border-radius: 2px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  position: relative;
  width: 150px;
  height: 150px;
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
  border-radius: 4px;
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
  transform: translateY(-1px);
}

.image-button.active::before {
  background: rgba(253, 253, 252, 0.3);
}


/* 반응형 - 대형 화면 */
@media (min-width: 2561px) {
  .images-content { padding: 40px; }
  .image-buttons { gap: 25px; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); }
  .image-button { width: 250px; height: 250px; font-size: 20px; padding: 25px 18px; }
}

@media (min-width: 1921px) {
  .images-content { padding: 30px; }
  .image-buttons { gap: 20px; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); }
  .image-button { width: 200px; height: 200px; font-size: 18px; padding: 20px 15px; }
}

/* 반응형 - 소형 화면 */
@media (max-width: 1280px) {
  .images-content { padding: 18px; }
  .image-buttons { gap: 14px; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); }
  .image-button { width: 140px; height: 140px; font-size: 15px; padding: 14px 10px; }
}

@media (max-width: 1024px) {
  .images-content { padding: 16px; }
  .image-buttons { gap: 12px; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); }
  .image-button { width: 130px; height: 130px; font-size: 15px; padding: 12px 8px; }
}

@media (max-width: 768px) {
  .images-content { padding: 14px; }
  .image-buttons { gap: 10px; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); }
  .image-button { width: 120px; height: 120px; font-size: 14px; padding: 10px 8px; }
}

@media (max-width: 640px) {
  .images-content { padding: 12px; }
  .image-buttons { gap: 10px; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); }
  .image-button { width: 110px; height: 110px; font-size: 13px; padding: 10px 6px; }
}

@media (max-width: 480px) {
  .images-content { padding: 10px; }
  .image-buttons { gap: 8px; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); }
  .image-button { width: 100px; height: 100px; font-size: 12px; padding: 8px 6px; }
}
</style>
