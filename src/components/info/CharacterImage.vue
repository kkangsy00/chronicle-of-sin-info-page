<template>
  <div class="image-section">
    <div 
      :class="['image-container', imageType]"
      @mouseenter="showImgTxt = true" 
      @mouseleave="showImgTxt = false"
    >
      <img 
        :src="imageSrc" 
        :class="['fade-transition', 'main-image', imageType]"
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
  },
  imageType: {
    type: String,
    default: 'portrait' // 'portrait' (세로) 또는 'square' (인장)
  }
})

const showImgTxt = ref(false)
</script>

<style scoped>
.image-section {
  flex: 1;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
}

.image-container {
  background: transparent;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: relative;
}

/* 인장(square)일 때는 중앙 정렬 */
.image-container.square {
  align-items: center;
}

.main-image {
  width: auto;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

/* 세로로 긴 이미지 (기본) - .main-image 기본 스타일 사용 */

/* 정사각형 이미지 (인장) */
.main-image.square {
  width: 100%;
  height: auto;
  min-height: 18vh; 
  max-height: 20vh;
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
  bottom: 40%;
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

/* 반응형 - 대형 화면 */
@media (min-width: 2561px) {
  .image-section { min-width: 18vw; }
  .image-container { max-width: 40vw; min-width: 16vw; min-height: 50vh;}
  .main-image { min-height: 75vh; }
  .main-image.square { min-height: 45vh; max-height: 60vh; }
  .main-image-txt { padding: 18px; font-size: 18px; }
  .overlay-image { max-width: 300px; }
}

@media (min-width: 1921px) {
  .image-section { min-width: 19vw; }
  .image-container { max-width: 38vw; min-width: 15vw; min-height: 45vh;  }
  .main-image { min-height: 72vh; }
  .main-image.square { min-height: 40vh; max-height: 50vh; }
  .main-image-txt { padding: 14px; font-size: 16px; }
  .overlay-image { max-width: 250px; }
}

/* 반응형 - 소형 화면 */
@media (max-width: 1280px) {
  .image-section { min-width: 22vw; }
  .image-container { max-width: 32vw; min-width: 18vw; min-height: 38vh; }
  .main-image { min-height: 65vh; }
  .main-image.square { min-height: 30vh; max-height: 40vh; }
  .main-image-txt { padding: 9px; font-size: 13px; }
  .overlay-image { max-width: 180px; }
}

@media (max-width: 1024px) {
  .image-section { min-width: 24vw; }
  .image-container { max-width: 30vw; min-width: 20vw; min-height: 35vh; }
  .main-image { min-height: 60vh; }
  .main-image.square { min-height: 20vh; max-height: 40vh; }
  .main-image-txt { padding: 8px; font-size: 13px; }
  .overlay-image { max-width: 160px; }
}

@media (max-width: 768px) {
  .image-container { max-width: 40vw; }
  .main-image.square { min-height: 18vh; max-height: 28vh; }
  .main-image-txt { padding: 8px; font-size: 12px; }
  .overlay-image { max-width: 140px; }
}

@media (max-width: 640px) {
  .image-section { min-width: 28vw; }
  .image-container { max-width: 40vw; min-width: 25vw; min-height: 28vh; }
  .main-image { min-height: 50vh; }
  .main-image-txt { padding: 6px; font-size: 11px; }
  .overlay-image { max-width: 120px; }
}

@media (max-width: 480px) {
  .image-section { flex: none; min-width: 100%; }
  .image-container { max-width: 100%; min-width: 80vw; max-height: 50vh; min-height: 35vh; }
  .main-image { min-height: 40vh; }
  .main-image-txt { padding: 6px; font-size: 11px; }
  .overlay-image { max-width: 100px; min-width: 35px; }
}
</style>
