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
  border: 0.05vw solid #000;
  flex: 1;
  padding: 1.2vw;
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
  border: 0.1vw solid var(--scrollbar-track);
}

.bgm-item {
  display: flex;
  align-items: center;
  gap: 1.2vw;
}

.bgm-left {
  flex: 1;
}

.bgm-play-btn {
  background: #666045;
  color: #d8d7c1;
  border: 0.05vw solid #000;
  padding: 0.6vw 1vw;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4vw;
  font-size: 0.9vw;
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
  border-left: 0.5vw solid currentColor;
  border-top: 0.3vw solid transparent;
  border-bottom: 0.3vw solid transparent;
}

.stop-icon {
  width: 0.5vw;
  height: 0.5vw;
  background: currentColor;
}

.mini-player {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6vw;
  background: rgba(20,20,18,0.6);
  border: 0.05vw solid #000;
  margin-top: 1.2vw;
}

.mini-title {
  color: #e6e3d1;
  font-size: 0.9vw;
}

/* content-card 스타일 */
.content-card {
  padding: 1.5vw 1.8vw;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border-bottom: 0.05vw solid rgba(0, 0, 0, 0.05);
  border-left: 0.05vw solid #000000;
  border-right: 0.05vw solid #000000;
}

.content-card.color-a {
  background: linear-gradient(90deg, rgba(22, 22, 0, 1) 0%, rgba(41, 38, 21, 0.5) 100%);
}

.content-card.color-b {
  background: linear-gradient(90deg, rgba(22, 21, 0, 0.8) 0%, rgba(41, 38, 21, 0.3) 100%);
}

.content-card h3 {
  color: #d8d7c1;
  margin: 0 0 0.7vw 0.6vw;
  font-size: 1.5vw;
  display: block;
  position: relative;
}

.content-card h3::before {
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

.bgm-item::before,
.bgm-item h3::after {
  display: none;
}

.bgm-txt {
  color: #84836e;
  font-size: 1vw;
  margin: 0 0 0.6vw 0.7vw;
  line-height: 1;
}

/* 반응형 - 대형 화면 */
@media (min-width: 2561px) {
  .bgm-content { padding: 2.2vw; }
  .bgm-item { gap: 1.8vw; }
  .bgm-play-btn { padding: 1vw 1.5vw; font-size: 1.2vw; gap: 0.6vw; }
  .play-icon { border-left-width: 0.7vw; border-top-width: 0.4vw; border-bottom-width: 0.4vw; }
  .stop-icon { width: 0.7vw; height: 0.7vw; }
  .content-card { padding: 2vw 2.3vw; }
  .content-card h3 { font-size: 1.9vw; margin-bottom: 0.9vw; }
  .content-card h3::before { width: 1.9vw; height: 1.9vw; font-size: 1.5vw; line-height: 1.9vw; }
  .bgm-txt { font-size: 1.2vw; }
  .mini-player { padding: 1vw; margin-top: 1.8vw; }
  .mini-title { font-size: 1.1vw; }
}

@media (min-width: 1921px) {
  .bgm-content { padding: 1.8vw; }
  .bgm-item { gap: 1.5vw; }
  .bgm-play-btn { padding: 0.8vw 1.2vw; font-size: 1.1vw; }
  .content-card { padding: 1.8vw 2vw; }
  .content-card h3 { font-size: 1.7vw; }
  .bgm-txt { font-size: 1.1vw; }
}

/* 반응형 - 소형 화면 */
@media (max-width: 768px) {
  .bgm-content { padding: 1.5vw; }
  .bgm-item { gap: 1.5vw; }
  .bgm-play-btn { padding: 0.8vw 1vw; font-size: 1.4vw; }
  .content-card { padding: 1.6vw 2vw; }
  .content-card h3 { font-size: 2vw; }
  .bgm-txt { font-size: 1.4vw; }
  .mini-title { font-size: 1.2vw; }
}

@media (max-width: 480px) {
  .bgm-content { padding: 2vw; }
  .bgm-item { gap: 2vw; flex-wrap: wrap; }
  .bgm-play-btn { padding: 1.2vw 1.5vw; font-size: 2vw; gap: 0.8vw; }
  .play-icon { border-left-width: 1vw; border-top-width: 0.6vw; border-bottom-width: 0.6vw; }
  .stop-icon { width: 1vw; height: 1vw; }
  .content-card { padding: 2.5vw 3vw; }
  .content-card h3 { font-size: 2.8vw; margin-bottom: 1.5vw; }
  .content-card h3::before { width: 2.8vw; height: 2.8vw; font-size: 2.2vw; line-height: 2.8vw; }
  .bgm-txt { font-size: 2vw; }
  .mini-player { flex-direction: column; gap: 1.5vw; padding: 1.5vw; margin-top: 2vw; }
  .mini-title { font-size: 1.8vw; }
}
</style>
