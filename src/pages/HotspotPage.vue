<template>
  <div class="hotspot-page">
    <HomeButton @navigate="$emit('navigate', 'scene')" />

    <div
      class="image-container"
      @click.self="selectedId = null"
    >

      <img
        :src="sceneData.baseImage"
        class="base-image"
        alt="배경 이미지"
        draggable="false"
        @click="selectedId = null"
      />

      <img
        v-for="hotspot in sceneData.hotspots"
        :key="'overlay-' + hotspot.id"
        :src="hotspot.overlay"
        class="overlay-image"
        :class="{ active: hoverId === hotspot.id }"
        alt=""
        draggable="false"
      />

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
import HomeButton from '../components/HomeButton.vue'

const props = defineProps({
  scenePath: {
    type: String,
    default: '/data/hotspot/scene_1/scene.json'
  }
})

defineEmits(['navigate'])

const sceneData = ref({ baseImage: '', hotspots: [] })
const baseUrl = import.meta.env.BASE_URL

const titleBgUrl = `url(${baseUrl}data/hotspot/background_name.png)`

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

const hoverId = ref(null)

const selectedId = ref(null)

const selectedHotspot = computed(() =>
  sceneData.value.hotspots.find(h => h.id === selectedId.value) ?? null
)
</script>

<style scoped>
.hotspot-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  box-sizing: border-box;
}

.image-container {
  position: relative;
  display: inline-block;
  user-select: none;
  aspect-ratio: 2828 / 4536;
}

.base-image {
  display: block;
  max-width: 90vw;
  max-height: 85vh;
}

.overlay-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: fill;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s ease;
}
.overlay-image.active {
  opacity: 1;
}

.hotspot {
  position: absolute;
  cursor: pointer;
  /* 위치 디버그: 주석 해제하면 영역이 보임 */
  /* background: rgba(255, 0, 0, 0.2); */
}

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
  font-size: var(--fs-base);
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
  font-size: var(--fs-base);
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 5%, rgba(0, 0, 0, 0.85) 20%, rgba(0, 0, 0, 0.9));
  padding: 2.5vw 2vw 2.5vw 1vw;
}

@media (min-width: 2561px) {
  .info-title {
    padding: 2.5vw 0.6vw 0.6vw 1vw;
    margin-bottom: -3.5vw;
  }

  .info-title-text {
    transform: translateY(-1.8vw);
  }

  .info-desc {
    padding: 3vw 2.5vw 3vw 1.2vw;
  }
}

@media (min-width: 1921px) {
  .info-title {
    padding: 2.2vw 0.55vw 0.55vw 0.9vw;
    margin-bottom: -3.2vw;
  }

  .info-title-text {
    transform: translateY(-1.6vw);
  }

  .info-desc {
    padding: 2.8vw 2.2vw 2.8vw 1.1vw;
  }
}

@media (max-width: 1024px) {
  .info-title {
    padding: 2.5vw 0.8vw 0.8vw 1vw;
    margin-bottom: -3vw;
  }

  .info-title-text {
    transform: translateY(-1.5vw);
  }

  .info-desc {
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
    padding: 3vw 1vw 1vw 1.2vw;
    margin-bottom: -3.5vw;
  }

  .info-title-text {
    transform: translateY(-2vw);
  }

  .info-desc {
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
    padding: 3.5vw 1.2vw 1.2vw 1.5vw;
    margin-bottom: -4vw;
  }

  .info-title-text {
    transform: translateY(-2.5vw);
  }

  .info-desc {
    padding: 3.5vw 3vw 3.5vw 1.8vw;
  }
}

@media (orientation: portrait) and (max-height: 800px) {
  .hotspot-page {
    padding: 1rem;
    min-height: auto;
    align-items: flex-start;
    padding-top: 0.5rem;
  }

  .info-title {
    padding: 2.5vw 1vw 0.8vw 1.2vw;
    margin-bottom: -3.5vw;
  }

  .info-title-text {
    transform: translateY(-1.8vw);
  }

  .info-desc {
    padding: 3.5vw 2.5vw 5vw 1.8vw;
    line-height: 1.5;
  }
}
</style>
