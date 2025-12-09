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

/* 반응형 - 대형 화면 */
@media (min-width: 2561px) {
  .bgm-content { padding: 40px; }
  .bgm-item { gap: 30px; }
  .bgm-play-btn { padding: 18px 25px; font-size: 20px; gap: 10px; }
  .play-icon { border-left-width: 12px; border-top-width: 7px; border-bottom-width: 7px; }
  .stop-icon { width: 12px; height: 12px; }
  .content-card { padding: 35px 40px; }
  .content-card h3 { font-size: 32px; margin: 0 0 16px 14px; }
  .content-card h3::before { width: 32px; height: 32px; font-size: 26px; line-height: 32px; padding: 2px 12px; }
  .bgm-txt { font-size: 20px; }
  .mini-player { padding: 18px; margin-top: 30px; }
  .mini-title { font-size: 18px; }
}

@media (min-width: 1921px) {
  .bgm-content { padding: 30px; }
  .bgm-item { gap: 25px; }
  .bgm-play-btn { padding: 14px 20px; font-size: 18px; gap: 8px; }
  .play-icon { border-left-width: 10px; border-top-width: 6px; border-bottom-width: 6px; }
  .stop-icon { width: 10px; height: 10px; }
  .content-card { padding: 30px 35px; }
  .content-card h3 { font-size: 28px; margin: 0 0 14px 12px; }
  .content-card h3::before { width: 28px; height: 28px; font-size: 22px; line-height: 28px; padding: 2px 10px; }
  .bgm-txt { font-size: 18px; }
  .mini-player { padding: 14px; margin-top: 25px; }
  .mini-title { font-size: 16px; }
}

/* 반응형 - 소형 화면 */
@media (max-width: 1280px) {
  .bgm-content { padding: 18px; }
  .bgm-item { gap: 18px; }
  .bgm-play-btn { padding: 9px 14px; }
  .content-card { padding: 22px 28px; }
  .content-card h3 { font-size: 22px; }
  .bgm-txt { font-size: 15px; }
}

@media (max-width: 1024px) {
  .bgm-content { padding: 16px; }
  .bgm-item { gap: 16px; }
  .bgm-play-btn { padding: 8px 12px; font-size: 15px; }
  .content-card { padding: 20px 25px; }
  .content-card h3 { font-size: 21px; }
  .content-card h3::before { width: 22px; height: 22px; font-size: 18px; line-height: 22px; }
  .bgm-txt { font-size: 15px; }
  .mini-player { padding: 8px; margin-top: 16px; }
  .mini-title { font-size: 13px; }
}

@media (max-width: 768px) {
  .bgm-content { padding: 14px; }
  .bgm-item { gap: 14px; }
  .bgm-play-btn { padding: 8px 10px; font-size: 14px; gap: 5px; }
  .play-icon { border-left-width: 7px; border-top-width: 4px; border-bottom-width: 4px; }
  .stop-icon { width: 7px; height: 7px; }
  .content-card { padding: 16px 20px; }
  .content-card h3 { font-size: 20px; margin: 0 0 10px 8px; }
  .content-card h3::before { width: 20px; height: 20px; font-size: 16px; line-height: 20px; padding: 1px 6px; }
  .bgm-txt { font-size: 14px; margin: 0 0 8px 10px; }
  .mini-player { padding: 8px; margin-top: 14px; }
  .mini-title { font-size: 12px; }
}

@media (max-width: 640px) {
  .bgm-content { padding: 12px; }
  .bgm-item { gap: 12px; }
  .bgm-play-btn { padding: 7px 9px; font-size: 13px; }
  .content-card { padding: 14px 18px; }
  .content-card h3 { font-size: 18px; }
  .bgm-txt { font-size: 13px; }
  .mini-player { margin-top: 12px; }
}

@media (max-width: 480px) {
  .bgm-content { padding: 10px; }
  .bgm-item { gap: 10px; flex-wrap: wrap; }
  .bgm-play-btn { padding: 6px 8px; font-size: 12px; gap: 4px; }
  .play-icon { border-left-width: 6px; border-top-width: 4px; border-bottom-width: 4px; }
  .stop-icon { width: 6px; height: 6px; }
  .content-card { padding: 12px 16px; }
  .content-card h3 { font-size: 17px; margin: 0 0 8px 6px; }
  .content-card h3::before { width: 18px; height: 18px; font-size: 14px; line-height: 18px; padding: 1px 5px; }
  .bgm-txt { font-size: 12px; margin: 0 0 6px 8px; }
  .mini-player { flex-direction: column; gap: 8px; padding: 8px; margin-top: 10px; }
  .mini-title { font-size: 11px; }
}
</style>
