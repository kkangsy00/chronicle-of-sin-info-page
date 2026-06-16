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
  border: var(--border-hair) solid #000;
  flex: 1;
  padding: 1.2vw;
  display: flex;
  flex-direction: column;
  min-height: 0;
  position: relative;
}

.bgm-list {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  padding-bottom: 5vw;
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
  gap: 1.2vw;
}

.bgm-left {
  flex: 1;
}

.bgm-play-btn {
  background: #666045;
  color: #d8d7c1;
  border: var(--border-hair) solid #000;
  padding: 0.6vw 1vw;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4vw;
  font-size: var(--fs-xs);
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
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6vw 1.2vw;
  background: rgba(20, 20, 18, 0.92);
  border-top: var(--border-hair) solid #000;
  z-index: 10;
}

.mini-title {
  color: #e6e3d1;
  font-size: var(--fs-xs);
}

/* .content-card 공용 스타일은 전역 styles/content-card.css.
   여기선 BGM 카드만의 차이만 둔다. (.bgm-txt 의 p 스타일도 전역 .content-card p 가 처리) */
.bgm-item {
  min-height: 7.5vw;
}

/* BGM 카드는 상단 가로선·제목 밑줄을 쓰지 않음 */
.bgm-item::before,
.bgm-item h3::after {
  display: none;
}

/* 반응형 — 폰트는 토큰(clamp)으로 처리. 패딩·아이콘 도형·여백 등 레이아웃만 조정 */
@media (min-width: 2561px) {
  .bgm-content { padding: 2.2vw; }
  .bgm-item { gap: 1.8vw; }
  .bgm-play-btn { padding: 1vw 1.5vw; gap: 0.6vw; }
  .play-icon { border-left-width: 0.7vw; border-top-width: 0.4vw; border-bottom-width: 0.4vw; }
  .stop-icon { width: 0.7vw; height: 0.7vw; }
  .mini-player { padding: 1vw 2.2vw; }
}

@media (min-width: 1921px) {
  .bgm-content { padding: 1.8vw; }
  .bgm-item { gap: 1.5vw; }
  .bgm-play-btn { padding: 0.8vw 1.2vw; }
}

/* 반응형 - 소형 화면 */
@media (max-width: 768px) {
  .bgm-content { padding: 1.5vw; }
  .bgm-item { gap: 1.5vw; min-height: 9vw; }
  .bgm-play-btn { padding: 0.8vw 1vw; }
}

@media (max-width: 480px) {
  .bgm-content { padding: 2vw; }
  .bgm-item { gap: 2vw; min-height: 12vw; flex-wrap: wrap; }
  .bgm-play-btn { padding: 1.2vw 1.5vw; gap: 0.8vw; }
  .play-icon { border-left-width: 1vw; border-top-width: 0.6vw; border-bottom-width: 0.6vw; }
  .stop-icon { width: 1vw; height: 1vw; }
  .mini-player { flex-direction: column; gap: 1.5vw; padding: 1.5vw; }
}

@media (orientation: landscape) and (max-height: 500px) {
  .bgm-item { min-height: 20vh; }
}


</style>
