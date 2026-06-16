<template>
  <div class="record-detail-page">
    <HomeButton @navigate="(page) => $emit('navigate', page)" />
    <div class="container">
      <div class="detail-content">
        <div class="record-viewer">
          <!-- 이미지 그리드 -->
          <div class="image-grid">
            <div
              v-for="(image, index) in recordWithImages?.images"
              :key="index"
              class="grid-item"
              @click="openImage(index)"
            >
              <img :src="image" :alt="`${recordWithImages?.title} - ${index + 1}`" class="grid-image">
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 이미지 뷰어 모달 -->
    <div v-if="selectedImageIndex !== null" class="image-modal" @click="closeImage">
      <button class="close-btn" @click="closeImage">&times;</button>

      <div class="modal-content" @click.stop>
        <!-- 이미지 표시 -->
        <img
          :src="recordWithImages?.images[selectedImageIndex]"
          :alt="`${recordWithImages?.title} - ${selectedImageIndex + 1}`"
          class="modal-image"
        />
      </div>

      <!-- 이전 버튼 -->
      <button
        v-if="recordWithImages?.images && recordWithImages.images.length > 1"
        class="nav-arrow prev-arrow"
        @click.stop="previousImage"
      >
        ◀
      </button>

      <!-- 다음 버튼 -->
      <button
        v-if="recordWithImages?.images && recordWithImages.images.length > 1"
        class="nav-arrow next-arrow"
        @click.stop="nextImage"
      >
        ▶
      </button>

      <!-- 이미지 카운터 -->
      <div v-if="recordWithImages?.images && recordWithImages.images.length > 1" class="image-counter">
        {{ selectedImageIndex + 1 }} / {{ recordWithImages.images.length }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import HomeButton from './HomeButton.vue'

defineEmits(['navigate'])

const selectedImageIndex = ref(null)
const baseUrl = import.meta.env.BASE_URL

const props = defineProps({
  record: Object
})

const recordWithImages = computed(() => {
  if (!props.record) return null
  return {
    ...props.record,
    images: (props.record.images || []).map(img =>
      img.startsWith('http') ? img : `${baseUrl}${img.startsWith('/') ? img.slice(1) : img}`
    )
  }
})

const openImage = (index) => {
  selectedImageIndex.value = index
}

const closeImage = () => {
  selectedImageIndex.value = null
}

const previousImage = () => {
  if (selectedImageIndex.value > 0) {
    selectedImageIndex.value--
  }
}

const nextImage = () => {
  if (recordWithImages.value?.images && selectedImageIndex.value < recordWithImages.value.images.length - 1) {
    selectedImageIndex.value++
  }
}
</script>

<style scoped>
.record-detail-page {
  min-height: 100vh;
  color: white;
}

.container {
  max-width: 85vw;
  margin: 0 auto;
  padding: 4vw 1.5vw;
}

.detail-content {
  background: rgba(0, 0, 0, 0.3);
  border: var(--border-hair) solid rgba(255, 255, 255, 0.1);
  padding: 2vw;
  border-radius: 0.5vw;
}

.record-viewer {
  text-align: center;
}


/* 이미지 그리드 */
.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15vw, 1fr));
  gap: 1.5vw;
  padding: 0 1vw;
}

.grid-item {
  position: relative;
  border-radius: 0.5vw;
  overflow: hidden;
  aspect-ratio: 1;
  cursor: pointer;
  transition: all 0.3s ease;
  border: var(--border-hair) solid rgba(255, 255, 255, 0.1);
}

.grid-item:hover {
  transform: translateY(-0.3vw);
  box-shadow: 0 0.8vw 2vw rgba(0, 0, 0, 0.5);
  border-color: rgba(255, 255, 255, 0.3);
}

.grid-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.grid-item:hover .grid-image {
  transform: scale(1.05);
}

/* 이미지 모달 */
.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  backdrop-filter: blur(5px);
}

.modal-content {
  position: relative;
  max-width: 85vw;
  max-height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-image {
  max-width: 80vw;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 0.3vw;
}

.close-btn {
  position: fixed;
  top: 2vw;
  right: 2vw;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  font-size: clamp(1.5rem, 2.5vw, 2.6rem);
  cursor: pointer;
  z-index: 2002;
  width: clamp(40px, 3vw, 60px);
  height: clamp(40px, 3vw, 60px);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.3s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* 네비게이션 화살표 */
.nav-arrow {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  border: var(--border-hair) solid rgba(255, 255, 255, 0.2);
  color: #fdfdfc;
  width: clamp(44px, 3.5vw, 64px);
  height: clamp(44px, 3.5vw, 64px);
  font-size: clamp(1rem, 1.5vw, 1.8rem);
  cursor: pointer;
  border-radius: 0.3vw;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2001;
}

.prev-arrow {
  left: 2vw;
}

.next-arrow {
  right: 2vw;
}


.nav-arrow:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-50%) scale(1.1);
}

/* 이미지 카운터 */
.image-counter {
  position: absolute;
  bottom: 2vw;
  left: 50%;
  transform: translateX(-50%);
  font-size: var(--fs-base);
  color: #bdb7a0;
  background: rgba(0, 0, 0, 0.5);
  padding: 0.5vw 1.5vw;
  border-radius: 0.3vw;
  z-index: 2001;
}

/* 반응형 — 화살표/닫기/카운터의 크기·폰트는 clamp·토큰으로 처리.
   그리드 열·이미지 최대치·화살표 위치 등 레이아웃만 조정 */
@media (max-width: 1024px) {
  .image-grid {
    grid-template-columns: repeat(auto-fill, minmax(18vw, 1fr));
  }
}

@media (max-width: 768px) {
  .container {
    max-width: 95vw;
    padding: 2vw 1vw;
  }

  .image-grid {
    grid-template-columns: repeat(auto-fill, minmax(20vw, 1fr));
    gap: 1vw;
    padding: 0;
  }

  .prev-arrow {
    left: 0.8vw;
  }

  .next-arrow {
    right: 0.8vw;
    left: auto;
  }

  .modal-image {
    max-width: 90vw;
    max-height: 75vh;
  }

  .close-btn {
    top: 1vw;
    right: 1vw;
  }
}

@media (max-width: 480px) {
  .image-grid {
    grid-template-columns: repeat(auto-fill, minmax(25vw, 1fr));
  }

  .prev-arrow {
    left: 1vw;
  }

  .next-arrow {
    right: 1vw;
    left: auto;
  }

  .modal-image {
    max-width: 75vw;
    max-height: 70vh;
  }

  .image-counter {
    padding: 0.8vw 1.2vw;
  }
}
</style>