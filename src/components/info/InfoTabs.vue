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
  font-size: var(--fs-base);
  padding: 2vw 3vw;
  border: none;
  color: #8a8777;
  cursor: pointer;
  font-weight: 500;
  white-space: nowrap;
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

/* 반응형 — 폰트는 토큰(clamp)으로 처리. 패딩만 조정
   (기존 min/max 1921 경계가 겹치던 버그도 1920으로 분리해 해소) */
@media (min-width: 1921px) {
  .info-tab-button { padding: 1.2vw 2.5vw; }
}

@media (max-width: 1920px) {
  .info-tab-button { padding: 1vw 2vw; }
}

@media (max-width: 1024px) {
  .info-tab-button { padding: 1vw 2.5vw; }
}

@media (max-width: 480px) {
  /* 좁은 화면에서 '이미지변경' 줄바꿈 방지: 탭 영역을 넓히고 좌우 패딩 축소 */
  .info-tabs { width: 80%; }
  .info-tab-button { padding: 2vw 1vw; }
}
</style>
