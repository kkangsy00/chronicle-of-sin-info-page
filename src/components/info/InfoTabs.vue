<template>
  <div class="info-tabs">
    <button 
      v-for="tab in tabs"
      :key="tab.key"
      :class="['info-tab-button', { active: activeTab === tab.key }]"
      @click="$emit('update:activeTab', tab.key)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  activeTab: {
    type: String,
    default: 'info'
  },
  tabs: {
    type: Array,
    default: () => [
      { key: 'info', label: '인물정보' },
      { key: 'images', label: '이미지변경' },
      { key: 'bgm', label: '사운드' }
    ]
  }
})

defineEmits(['update:activeTab'])
</script>

<style scoped>
.info-tabs {
  display: flex;
  width: 70%;
  background: #666045;
  border-top: 1px solid #000000;
  border-left: 1px solid #000000;
  border-right: 1px solid #000000;
}

.info-tab-button {
  flex: 1;
  background: rgba(101, 94, 68, 0.6);
  font-size: 16px;
  padding: 15px 20px;
  border: none;
  color: #8a8777;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.info-tab-button:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #545352;
}

.info-tab-button.active {
  background: rgba(35, 35, 9, 0.8);
  text-shadow: 0 0 15px #00bbff;
  color: #d8d7c1;
}

/* 반응형 - 대형 화면 */
@media (min-width: 2561px) {
  .info-tab-button { padding: 25px 35px; font-size: 22px; }
}

@media (min-width: 1921px) {
  .info-tab-button { padding: 20px 28px; font-size: 19px; }
}

/* 반응형 - 소형 화면 */
@media (max-width: 1280px) {
  .info-tab-button { padding: 14px 18px; font-size: 15px; }
}

@media (max-width: 1024px) {
  .info-tab-button { padding: 13px 16px; font-size: 15px; }
}

@media (max-width: 768px) {
  .info-tab-button { padding: 12px 14px; font-size: 14px; }
}

@media (max-width: 640px) {
  .info-tab-button { padding: 10px 12px; font-size: 13px; }
}

@media (max-width: 480px) {
  .info-tab-button { padding: 10px 8px; font-size: 12px; }
}
</style>
