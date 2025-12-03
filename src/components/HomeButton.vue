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
  top: 20px;
  left: 20px;
  background: #ce3a24;
  color: black;
  border: 1px solid black;
  width: 50px;
  height: 50px;
  cursor: pointer;
  z-index: 1000;
  font-size: 50px;
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
