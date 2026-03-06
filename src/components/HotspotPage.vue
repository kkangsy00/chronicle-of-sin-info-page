<template>
  <div class="hotspot-page">
    <HomeButton @navigate="$emit('navigate', 'home')" />

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
          <button class="close-btn" @click.stop="selectedId = null">×</button>
          <div class="info-title">{{ selectedHotspot.label }}</div>
          <div class="info-desc">{{ selectedHotspot.description }}</div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import HomeButton from './HomeButton.vue'

defineEmits(['navigate'])

/* ───── 데이터 로드 ───── */
const sceneData = ref({ baseImage: '', hotspots: [] })

fetch('/data/hotspot/scene.json')
  .then(r => r.json())
  .then(data => { sceneData.value = data })

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
  object-fit: contain;
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
  background: rgba(0, 0, 0, 0.82);
  color: #fff;
  border-top: 1px solid rgba(255, 220, 50, 0.4);
  padding: 0.7rem 2.5rem 0.7rem 1rem;
  white-space: pre-wrap;
}

.info-title {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.3rem;
  color: #ffd700;
}

.info-desc {
  font-size: 0.85rem;
  opacity: 0.9;
  line-height: 1.5;
}

.close-btn {
  position: absolute;
  top: 0.4rem;
  right: 0.5rem;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  font-size: 1.2rem;
  cursor: pointer;
  line-height: 1;
  padding: 0;
}
.close-btn:hover {
  color: #fff;
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
</style>
