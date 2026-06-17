<template>
  <div
    class="info-content fade-transition custom-scroll"
    ref="contentRef"
  >
    <div
      v-for="(section, i) in sections"
      :key="i"
      class="content-card"
      :class="i % 2 === 0 ? 'color-a' : 'color-b'"
    >
      <h3 :data-index="String(i + 1).padStart(2, '0')">{{ section.header }}</h3>
      <p v-for="(para, j) in section.content" :key="j">{{ para }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  sections: {
    type: Array,
    default: () => []
  }
})

const contentRef = ref(null)

watch(() => props.sections, () => {
  contentRef.value?.scrollTo(0, 0)
})

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
</style>
