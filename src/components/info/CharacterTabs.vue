<template>
  <div class="tab-section">
    <button class="scroll-button scroll-left" @click="scrollTabs('left')">&lt;</button>
    <div class="tab-container" ref="tabContainer">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        :class="['tab-button', { active: activeTabId === tab.id }]"
        @click="$emit('select', tab.id)"
      >
        {{ tab.name }}
        <div class="pct-txt">100%</div>
      </button>
    </div>
    <button class="scroll-button scroll-right" @click="scrollTabs('right')">&gt;</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  tabs: {
    type: Array,
    default: () => []
  },
  activeTabId: {
    type: Number,
    default: 1
  }
})

defineEmits(['select'])

const tabContainer = ref(null)

const scrollTabs = (direction) => {
  tabContainer.value?.scrollBy({ 
    left: direction === 'left' ? -100 : 100, 
    behavior: 'smooth' 
  })
}
</script>

<style scoped>
.tab-section {
  height: 8vh;
  min-height: 60px;
  max-height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  box-shadow: 0 3px 30px rgba(0, 0, 0, 0.8);
  background: linear-gradient(180deg, #514f40, #3b423b);
}

.tab-container {
  backdrop-filter: blur(10px);
  display: flex;
  flex: 1;
  height: 100%;
  justify-content: flex-start;
  white-space: nowrap;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.tab-container::-webkit-scrollbar {
  display: none;
}

.scroll-button {
  background: linear-gradient(180deg, #514f40, #3b423b);
  border: 1px solid #000000;
  color: #252317;
  cursor: pointer;
  font-size: clamp(30px, 4vh, 60px);
  width: 10%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.scroll-button,
.tab-button {
  border: none;
  color: #8a8777;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.scroll-button:hover,
.tab-button:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #545352;
}

.scroll-button:active {
  transform: scale(0.95);
}

.tab-button {
  background: transparent;
  border: 1px solid #000000;
  font-size: clamp(16px, 2vh, 26px);
  position: relative;
  min-width: 100px;
  flex: 1;
  text-align: center;
  height: 100%;
}

.tab-button.active {
  background: linear-gradient(180deg, #fdfdfc, #bdb7a0);
  color: #545352;
  transform: translateY(-1px);
}

.pct-txt {
  font-size: 1em;
  opacity: 0.7;
}

/* 반응형 */
@media (max-width: 768px) {
  .tab-section { min-height: 55px; max-height: 85px; }
  .tab-button { min-width: 80px; }
}

@media (max-width: 480px) {
  .tab-section { min-height: 50px; max-height: 80px; }
  .tab-button { min-width: 70px; }
}
</style>
