<template>
  <div class="bgm-content">
    <div class="bgm-list">
      <div
        v-for="(bgm, idx) in bgmList"
        :key="idx"
        :class="['bgm-item', 'content-card', idx % 2 === 0 ? 'color-a' : 'color-b']"
      >
        <button
          :class="{ playing: isPlaying && selectedIndex === idx }"
          class="bgm-play-btn"
          @click="togglePlay(idx)"
        >
          <span 
            class="btn-icon" 
            :class="isPlaying && selectedIndex === idx ? 'stop-icon' : 'play-icon'"
          ></span>
          {{ (isPlaying && selectedIndex === idx) ? '정지' : '듣기' }}
        </button>
        <div class="bgm-left">
          <h3 :data-index="String(idx + 1).padStart(2, '0')">{{ getBgmLabel(bgm) }}</h3>
          <p v-if="bgm.txt" class="bgm-txt">{{ bgm.txt }}</p>
        </div>
      </div>
    </div>
    <div v-if="isPlaying && embedUrl" class="mini-player">
      <div class="mini-title">{{ currentBgmLabel }}</div>
      <iframe
        :src="embedUrl"
        :key="embedUrl"
        width="140"
        height="56"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  bgmList: {
    type: Array,
    default: () => []
  }
})

const isPlaying = ref(false)
const selectedIndex = ref(null)

const getBgmLabel = (bgm) => 
  typeof bgm === 'string' ? bgm : (bgm?.title || bgm?.url || '')

const currentBgm = computed(() => 
  props.bgmList[selectedIndex.value]
)

const currentBgmLabel = computed(() => 
  currentBgm.value ? getBgmLabel(currentBgm.value) : ''
)

const embedUrl = computed(() => {
  const data = currentBgm.value
  if (!data) return ''
  const url = typeof data === 'string' ? data : data.url
  return url ? `${url}${url.includes('?') ? '&' : '?'}rel=0&autoplay=1&controls=1` : ''
})

const togglePlay = (index) => {
  if (selectedIndex.value === index && isPlaying.value) {
    isPlaying.value = false
    selectedIndex.value = null
  } else {
    selectedIndex.value = index
    isPlaying.value = true
  }
}
</script>

<style scoped>
.bgm-content {
  background: linear-gradient(90deg, rgba(22, 21, 0, 0.8), rgba(41, 38, 21, 0.3));
  border: 1px solid #000;
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.bgm-list {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
}

.bgm-list::-webkit-scrollbar {
  width: var(--scrollbar-width);
}

.bgm-list::-webkit-scrollbar-track {
  background: var(--scrollbar-track);
}

.bgm-list::-webkit-scrollbar-thumb {
  background: var(--scrollbar-thumb);
  border: 2px solid var(--scrollbar-track);
}

.bgm-item {
  display: flex;
  align-items: center;
  gap: 20px;
}

.bgm-left {
  flex: 1;
}

.bgm-play-btn {
  background: #666045;
  color: #d8d7c1;
  border: 1px solid #000;
  padding: 10px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
}

.bgm-play-btn.playing {
  background: #ce3a24;
}

.btn-icon {
  display: inline-block;
}

.play-icon {
  width: 0;
  height: 0;
  border-left: 8px solid currentColor;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
}

.stop-icon {
  width: 8px;
  height: 8px;
  background: currentColor;
}

.mini-player {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background: rgba(20,20,18,0.6);
  border: 1px solid #000;
  margin-top: 20px;
}

.mini-title {
  color: #e6e3d1;
  font-size: 14px;
}

/* content-card 스타일 */
.content-card {
  padding: 25px 30px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 1px solid #000000;
  border-right: 1px solid #000000;
}

.content-card.color-a {
  background: linear-gradient(90deg, rgba(22, 22, 0, 1) 0%, rgba(41, 38, 21, 0.5) 100%);
}

.content-card.color-b {
  background: linear-gradient(90deg, rgba(22, 21, 0, 0.8) 0%, rgba(41, 38, 21, 0.3) 100%);
}

.content-card h3 {
  color: #d8d7c1;
  margin: 0 0 12px 10px;
  font-size: 24px;
  display: block;
  position: relative;
}

.content-card h3::before {
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

.bgm-item::before,
.bgm-item h3::after {
  display: none;
}

.bgm-txt {
  color: #84836e;
  font-size: 16px;
  margin: 0 0 10px 12px;
  line-height: 1;
}
</style>
