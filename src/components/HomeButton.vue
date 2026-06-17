<template>
  <button class="home-btn" @click="$emit('navigate', 'home')" title="돌아가기">
    ×
  </button>
</template>

<script setup>
defineEmits(['navigate'])
</script>

<style scoped>
.home-btn {
  position: fixed;

  top: clamp(12px, 1.2vw, 24px);
  left: clamp(12px, 1.2vw, 24px);
  width: clamp(44px, 4vw, 64px);
  height: clamp(44px, 4vw, 64px);
  background: #ce3a24;
  color: black;
  border: var(--border-hair) solid black;
  cursor: pointer;
  z-index: 1000;
  font-size: clamp(1.5rem, 3vw, 2.8rem);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  line-height: 1;
}

.home-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
</style>
