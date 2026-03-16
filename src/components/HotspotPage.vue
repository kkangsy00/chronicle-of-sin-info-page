<template>
  <div class="hotspot-page">
    <HomeButton @navigate="$emit('navigate', 'scene')" />

    <div
      class="image-container"
      @click.self="selectedId = null"
    >
      <!-- ① 기본 이미지 (가장 아래 레이어) -->
      <img
        :src="sceneData.baseImage"
        class="base-image"
        alt="배경 이미지"
        draggable="false"
        @click="selectedId = null"
      />

      <!-- ② 오버레이 이미지들 (hover 시 표시) -->
      <img
        v-for="hotspot in sceneData.hotspots"
        :key="'overlay-' + hotspot.id"
        :src="hotspot.overlay"
        class="overlay-image"
        :class="{ active: hoverId === hotspot.id }"
        alt=""
        draggable="false"
      />

      <!-- ③ Hotspot 영역 (투명 div) -->
      <div
        v-for="hotspot in sceneData.hotspots"
        :key="'hotspot-' + hotspot.id"
        class="hotspot"
        :style="{
          left:   hotspot.x      + '%',
          top:    hotspot.y      + '%',
          width:  hotspot.width  + '%',
          height: hotspot.height + '%',
        }"
        @mouseenter="hoverId = hotspot.id"
        @mouseleave="hoverId = null"
        @click.stop="selectedId = hotspot.id"
      />

      <!-- ④ 설명 패널 (클릭 시 이미지 하단에 고정 표시) -->
      <Transition name="fade">
        <div v-if="selectedHotspot" class="info-panel">
          <div class="info-title"><span class="info-title-text">{{ selectedHotspot.label }}</span></div>
          <div class="info-desc">{{ selectedHotspot.description }}</div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import HomeButton from './HomeButton.vue'

const props = defineProps({
  scenePath: {
    type: String,
    default: '/data/hotspot/scene_1/scene.json'
  }
})

defineEmits(['navigate'])

/* ───── 데이터 로드 ───── */
const sceneData = ref({ baseImage: '', hotspots: [] })
const baseUrl = import.meta.env.BASE_URL

// CSS v-bind용 배경 이미지 URL
const titleBgUrl = `url(${baseUrl}data/hotspot/background_name.png)`

// 절대 경로('/data/...')를 BASE_URL 기준 상대 경로로 변환
const toBase = (path) => baseUrl + path.replace(/^\//, '')

const fetchPath = baseUrl + props.scenePath.replace(/^\//, '')
fetch(fetchPath)
  .then(r => r.json())
  .then(data => {
    sceneData.value = {
      ...data,
      baseImage: toBase(data.baseImage),
      hotspots: data.hotspots.map(h => ({ ...h, overlay: toBase(h.overlay) }))
    }
  })

/* ───── hover 상태 (오버레이 표시용) ───── */
const hoverId = ref(null)

/* ───── 클릭 상태 (설명 패널 표시용) ───── */
const selectedId = ref(null)

const selectedHotspot = computed(() =>
  sceneData.value.hotspots.find(h => h.id === selectedId.value) ?? null
)
</script>

<style scoped>
/* ── 페이지 전체 ── */
.hotspot-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  box-sizing: border-box;
}

/* ── 이미지 + 레이어들이 쌓이는 컨테이너 ── */
.image-container {
  position: relative;
  display: inline-block; /* 이미지 크기에 맞게 축소 */
  user-select: none;
  aspect-ratio: 2828 / 4536;
}

/* ── 기본 이미지 ── */
.base-image {
  display: block;
  max-width: 90vw;
  max-height: 85vh;
}

/* ── 오버레이 이미지 ── */
.overlay-image {
  position: absolute;
  inset: 0;           /* top/right/bottom/left 모두 0 */
  width: 100%;
  height: 100%;
  object-fit: fill;
  pointer-events: none;   /* 마우스 이벤트가 아래 hotspot div로 통과 */
  opacity: 0;
  transition: opacity 0.2s ease;
}
.overlay-image.active {
  opacity: 1;
}

/* ── Hotspot 투명 영역 ── */
.hotspot {
  position: absolute;
  cursor: pointer;
  /* 개발 중 위치 확인이 필요하면 아래 주석을 해제하세요 */
  /* background: rgba(255, 0, 0, 0.2); */
}

/* ── 설명 패널 (클릭 시 이미지 하단에 고정) ── */
.info-panel {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  color: #fff;
  white-space: pre-wrap;
}

.info-title {
  font-size: 1.2vw;
  font-weight: bold;
  color: #a77061;
  padding: 2vw 0.5vw 0.5vw 0.8vw;
  margin-bottom: -3vw;
  position: relative;
  z-index: 1;
}

.info-title::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: v-bind(titleBgUrl);
  background-size: cover;
  background-position: left;
  z-index: -1;
}

.info-title-text {
  display: block;
  transform: translateY(-1.5vw);
}

.info-desc {
  font-size: 1.2vw;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 5%, rgba(0, 0, 0, 0.85) 20%, rgba(0, 0, 0, 0.9));
  padding: 2.5vw 2vw 2.5vw 1vw;
}

/* ── 툴팁 등장 애니메이션 ── */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 반응형 - 대형 화면 (QHD) */
@media (min-width: 2561px) {
  .info-title {
    font-size: 1.5vw;
    padding: 2.5vw 0.6vw 0.6vw 1vw;
    margin-bottom: -3.5vw;
  }

  .info-title-text {
    transform: translateY(-1.8vw);
  }

  .info-desc {
    font-size: 1.5vw;
    padding: 3vw 2.5vw 3vw 1.2vw;
  }
}

/* 반응형 - 고급 화면 (FHD) */
@media (min-width: 1921px) {
  .info-title {
    font-size: 1.3vw;
    padding: 2.2vw 0.55vw 0.55vw 0.9vw;
    margin-bottom: -3.2vw;
  }

  .info-title-text {
    transform: translateY(-1.6vw);
  }

  .info-desc {
    font-size: 1.3vw;
    padding: 2.8vw 2.2vw 2.8vw 1.1vw;
  }
}

/* 반응형 - 모바일 가로 화면 */
@media (max-width: 1024px) {
  .info-title {
    font-size: 1.5vw;
    padding: 2.5vw 0.8vw 0.8vw 1vw;
    margin-bottom: -3vw;
  }

  .info-title-text {
    transform: translateY(-1.5vw);
  }

  .info-desc {
    font-size: 1.5vw;
    padding: 2.5vw 2vw 2.5vw 1.2vw;
  }
}

@media (max-width: 768px) {
  .hotspot-page {
    padding: 1.5rem;
  }

  .base-image {
    max-width: 95vw;
    max-height: 90vh;
  }

  .info-title {
    font-size: 2vw;
    padding: 3vw 1vw 1vw 1.2vw;
    margin-bottom: -3.5vw;
  }

  .info-title-text {
    transform: translateY(-2vw);
  }

  .info-desc {
    font-size: 2vw;
    padding: 3vw 2.5vw 3vw 1.5vw;
  }
}

@media (max-width: 480px) {
  .hotspot-page {
    padding: 1rem;
  }

  .base-image {
    max-width: 98vw;
    max-height: 85vh;
  }

  .info-title {
    font-size: 2.5vw;
    padding: 3.5vw 1.2vw 1.2vw 1.5vw;
    margin-bottom: -4vw;
  }

  .info-title-text {
    transform: translateY(-2.5vw);
  }

  .info-desc {
    font-size: 2.5vw;
    padding: 3.5vw 3vw 3.5vw 1.8vw;
  }
}

/* 반응형 - 모바일 세로 화면 (높이 제약) */
@media (orientation: portrait) and (max-height: 800px) {
  .hotspot-page {
    padding: 1rem;
    min-height: auto;
    align-items: flex-start;
    padding-top: 0.5rem;
  }

  .info-title {
    font-size: 3vw;
    padding: 2.5vw 1vw 0.8vw 1.2vw;
    margin-bottom: -3.5vw;
  }

  .info-title-text {
    transform: translateY(-1.8vw);
  }

  .info-desc {
    font-size: 3vw;
    padding: 3.5vw 2.5vw 5vw 1.8vw;
    line-height: 1.5;
  }
}

</style>
