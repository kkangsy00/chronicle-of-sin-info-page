<template>
  <div 
    class="info-content fade-transition" 
    ref="contentRef"
    v-html="content"
  ></div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  content: {
    type: String,
    default: ''
  }
})

const contentRef = ref(null)

// 콘텐츠 변경 시 스크롤 맨 위로
watch(() => props.content, () => {
  contentRef.value?.scrollTo(0, 0)
})

// 외부에서 스크롤 리셋 호출 가능
defineExpose({
  scrollToTop: () => contentRef.value?.scrollTo(0, 0)
})
</script>

<style scoped>
.info-content {
  padding: 0;
  flex: 1;
  overflow-y: auto;
}

.info-content::-webkit-scrollbar {
  width: var(--scrollbar-width);
}

.info-content::-webkit-scrollbar-track {
  background: var(--scrollbar-track);
}

.info-content::-webkit-scrollbar-thumb {
  background: var(--scrollbar-thumb);
  border: 2px solid var(--scrollbar-track);
}

/* v-html 동적 콘텐츠 스타일 */
:deep(.content-card) {
  padding: 25px 30px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 1px solid #000000;
  border-right: 1px solid #000000;
}

:deep(.content-card::before) {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  opacity: 0.6;
  background: rgba(0, 0, 0, 0.8);
}

:deep(.content-card.color-a) {
  background: linear-gradient(90deg, rgba(22, 22, 0, 1) 0%, rgba(41, 38, 21, 0.5) 100%);
}

:deep(.content-card.color-b) {
  background: linear-gradient(90deg, rgba(22, 21, 0, 0.8) 0%, rgba(41, 38, 21, 0.3) 100%);
}

:deep(.content-card h3) {
  color: #d8d7c1;
  margin: 0 0 12px 10px;
  font-size: 24px;
  display: block;
  position: relative;
}

:deep(.content-card h3::before) {
  content: attr(data-index);
  display: inline-block;
  width: 24px;
  height: 24px;
  background: #4c4d3e;
  color: #3d3b2f;
  font-size: 20px;
  border-radius: 7px;
  padding: 1px 8px 2px 8px;
  margin-right: 8px;
  text-align: center;
  line-height: 24px;
  vertical-align: middle;
}

:deep(.content-card h3::after) {
  content: '';
  display: block;
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255);
  opacity: 0.18;
  margin: 5px 0 12px 0;
}

:deep(.content-card p) {
  color: #84836e;
  font-size: 16px;
  margin: 0 0 10px 12px;
  line-height: 1;
}

/* 반응형 */
@media (max-width: 1024px) {
  :deep(.content-card) { padding: var(--spacing-sm) 25px; }
  :deep(.content-card h3) { font-size: 22px; }
  :deep(.content-card p) { font-size: 15px; }
}

@media (max-width: 768px) {
  :deep(.content-card) { padding: 12px 22px; }
  :deep(.content-card h3) { font-size: 20px; }
  :deep(.content-card h3::before) { width: 22px; height: 22px; font-size: 18px; }
  :deep(.content-card p) { font-size: 14px; }
}

@media (max-width: 480px) {
  :deep(.content-card) { padding: 16px 20px; }
  :deep(.content-card h3) { font-size: 19px; }
  :deep(.content-card h3::before) { width: 20px; height: 20px; font-size: 16px; }
  :deep(.content-card p) { font-size: 13px; }
}
</style>
