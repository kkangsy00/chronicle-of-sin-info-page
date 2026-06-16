<template>
  <div class="image-modal" @click="$emit('close')">
    <button class="close-btn" @click="$emit('close')">&times;</button>

    <div class="modal-content" @click.stop>
      <img :src="images[current]" :alt="alt" class="modal-image" />
    </div>

    <template v-if="images.length > 1">
      <button class="nav-arrow prev-arrow" @click.stop="prev">◀</button>
      <button class="nav-arrow next-arrow" @click.stop="next">▶</button>
      <div class="image-counter">{{ current + 1 }} / {{ images.length }}</div>
    </template>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    default: () => []
  },
  startIndex: {
    type: Number,
    default: 0
  },
  alt: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close'])

const current = ref(props.startIndex)
watch(() => props.startIndex, (v) => { current.value = v })

const prev = () => { if (current.value > 0) current.value-- }
const next = () => { if (current.value < props.images.length - 1) current.value++ }

const onKey = (e) => {
  if (e.key === 'Escape') emit('close')
  else if (e.key === 'ArrowLeft') prev()
  else if (e.key === 'ArrowRight') next()
}

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<style scoped>
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

/* 반응형 — 버튼 크기·폰트는 clamp로 처리. 위치·이미지 최대치만 조정 */
@media (max-width: 768px) {
  .prev-arrow { left: 0.8vw; }
  .next-arrow { right: 0.8vw; left: auto; }
  .modal-image { max-width: 90vw; max-height: 75vh; }
  .close-btn { top: 1vw; right: 1vw; }
}

@media (max-width: 480px) {
  .prev-arrow { left: 1vw; }
  .next-arrow { right: 1vw; left: auto; }
  .modal-image { max-width: 75vw; max-height: 70vh; }
  .image-counter { padding: 0.8vw 1.2vw; }
}
</style>
