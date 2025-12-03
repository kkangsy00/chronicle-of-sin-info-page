<template>
  <div class="image-section">
    <div 
      class="image-container" 
      @mouseenter="showImgTxt = true" 
      @mouseleave="showImgTxt = false"
    >
      <img 
        :src="imageSrc" 
        class="fade-transition main-image"
        alt="캐릭터 이미지"
      >
      <transition name="fade">
        <div v-if="showImgTxt && imageTxt" class="main-image-txt">
          {{ imageTxt }}
        </div>
      </transition>
    </div>
    <img
      v-if="overlayImage"
      :src="overlayImage"
      alt="캐릭터 이름"
      class="overlay-image"
    >
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  imageSrc: {
    type: String,
    default: ''
  },
  imageTxt: {
    type: String,
    default: ''
  },
  overlayImage: {
    type: String,
    default: null
  }
})

const showImgTxt = ref(false)
</script>

<style scoped>
.image-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: left;
  min-width: 300px;
  position: relative;
  z-index: 1;
}

.image-container {
  background: transparent;
  width: 100%;
  max-width: 500px;
  min-width: 220px;
  height: 100%;
  max-height: 1000px;
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.main-image {
  max-width: 150%;
  max-height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.main-image-txt {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  color: #fff;
  padding: 10px;
  font-size: 14px;
  text-align: center;
  opacity: 1;
  z-index: 3;
}

.overlay-image {
  position: absolute;
  right: 10%;
  top: 60%;
  transform: translateY(-60%);
  width: 40%;
  height: auto;
  max-width: 200px;
  max-height: 80%;
  min-width: 40px;
  object-fit: contain;
  z-index: 2;
}

.overlay-image:hover {
  opacity: 0;
  transition: opacity 0.2s;
}

/* 반응형 */
@media (max-width: 1024px) {
  .image-section { min-width: 240px; }
  .image-container { min-height: 280px; }
}

@media (max-width: 768px) {
  .image-section { min-width: 200px; }
  .image-container { min-height: 220px; }
}

@media (max-width: 480px) {
  .image-section { flex: none; min-width: 100%; }
  .image-container { max-height: 350px; min-height: 250px; }
}
</style>
