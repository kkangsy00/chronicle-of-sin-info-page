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
</style>
