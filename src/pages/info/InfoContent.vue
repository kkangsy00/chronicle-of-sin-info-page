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

/* .content-card 스타일은 전역 styles/content-card.css 에서 공용 관리 (v-html 대응) */
</style>
