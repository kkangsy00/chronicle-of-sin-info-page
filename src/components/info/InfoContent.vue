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
  padding: 1.5vw 1.8vw;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border-bottom: 0.05vw solid rgba(0, 0, 0, 0.05);
  border-left: 0.05vw solid #000000;
  border-right: 0.05vw solid #000000;
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
  margin: 0 0 0.7vw 0.6vw;
  font-size: 1.5vw;
  display: block;
  position: relative;
}

:deep(.content-card h3::before) {
  content: attr(data-index);
  display: inline-block;
  width: 1.5vw;
  height: 1.5vw;
  background: #4c4d3e;
  color: #3d3b2f;
  font-size: 1.2vw;
  border-radius: 0.4vw;
  padding: 0.05vw 0.5vw 0.1vw 0.5vw;
  margin-right: 0.5vw;
  text-align: center;
  line-height: 1.5vw;
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
  font-size: 1vw;
  margin: 0 0 0.6vw 0.7vw;
  line-height: 1;
}

/* 반응형 - 대형 화면 */
/* @media (min-width: 2561px) {
  :deep(.content-card) { padding: 2vw 2.3vw; }
  :deep(.content-card h3) { font-size: 1.9vw; margin-bottom: 0.9vw; }
  :deep(.content-card h3::before) { width: 1.9vw; height: 1.9vw; font-size: 1.5vw; line-height: 1.9vw; }
  :deep(.content-card h3::after) { margin: 8px 0 16px 0; }
  :deep(.content-card p) { font-size: 1.2vw; }
}

@media (min-width: 1921px) {
  :deep(.content-card) { padding: 30px 38px; }
  :deep(.content-card h3) { padding: 1.8vw 2vw; }
  :deep(.content-card h3::before) { font-size: 1.7vw; }
  :deep(.content-card h3::after) { margin: 6px 0 14px 0; }
  :deep(.content-card p) { font-size: 18px; margin: 0 0 12px 14px; }
} */

/* 반응형 - 소형 화면 */
/* @media (max-width: 1280px) {
  :deep(.content-card) { padding: 22px 28px; }
  :deep(.content-card h3) { font-size: 23px; }
  :deep(.content-card h3::before) { width: 23px; height: 23px; font-size: 19px; line-height: 23px; }
  :deep(.content-card p) { font-size: 15px; }
} */

@media (max-width: 1024px) {
  :deep(.content-card h3) { font-size: 2vw; }
  :deep(.content-card h3::before) { width: 1.6vw; height: 1.8vw; font-size: 1.6vw; line-height: 1.6vw; padding: 0.4vw 0.8vw; margin-right: 1vw; }
  :deep(.content-card h3::after) { margin: 1vw 0 1.5vw 0; }
  :deep(.content-card p) { font-size: 1.5vw; margin: 0 0 1vw 1vw; }
}

@media (max-width: 480px) {
  :deep(.content-card) { padding: 2.5vw 3vw; }
  :deep(.content-card h3) { font-size: 3.5vw; margin-bottom: 1.5vw; }
  :deep(.content-card h3::before) { width: 2.2vw; height: 2.8vw; font-size: 2.5vw; line-height: 2.8vw; padding: 0.7vw 1.6vw; margin-right: 1.5vw; }
  :deep(.content-card h3::after) { margin: 1vw 0 2vw 0; }
  :deep(.content-card p) { font-size: 3vw; margin: 0 0 2vw 2vw; }
}
</style>
