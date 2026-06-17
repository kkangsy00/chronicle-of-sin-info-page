<template>
  <div class="record-detail-page">
    <HomeButton @navigate="$emit('navigate', 'records')" />
    <div class="container">
      <div class="detail-content">
        <div class="record-viewer">
          <div v-if="props.record?.videoUrl" class="video-container">
            <iframe
              :src="props.record.videoUrl"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>

          <div v-else class="image-grid">
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

    <ImageModal
      v-if="selectedImageIndex !== null"
      :images="recordWithImages?.images || []"
      :start-index="selectedImageIndex"
      :alt="recordWithImages?.title"
      @close="closeImage"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import HomeButton from '../components/HomeButton.vue'
import ImageModal from '../components/ImageModal.vue'

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

.video-container {
  width: 100%;
  max-width: 70vw;
  margin: 0 auto;
  aspect-ratio: 16 / 9;
}

.video-container iframe {
  width: 100%;
  height: 100%;
  border-radius: 0.5vw;
}

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
}

@media (max-width: 480px) {
  .image-grid {
    grid-template-columns: repeat(auto-fill, minmax(25vw, 1fr));
  }
}
</style>