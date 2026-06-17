<template>
  <div class="info-page">
    <HomeButton @navigate="$emit('navigate', $event)" />

    <div class="container">
      <div class="main-content">

        <CharacterImage
          :image-src="currentImage"
          :image-txt="currentImgTxt"
          :overlay-image="currentTab.overlayImage"
          :image-type="currentImageType"
        />

        <div class="info-section">
          <div class="info-container">

            <InfoTabs v-model:active-tab="activeInfoTab" />

            <InfoContent
              v-show="activeInfoTab === 'info'"
              :sections="currentTab.sections || []"
              ref="infoContentRef"
            />

            <ImageSelector
              v-show="activeInfoTab === 'images'"
              :images="currentTab.images"
              :selected-image-id="currentSelectedImageId"
              @select="selectImage"
            />

            <BgmPlayer
              v-show="activeInfoTab === 'bgm'"
              :bgm-list="currentTab.bgm || []"
            />

            <CharacterTabs
              :tabs="tabs"
              :active-tab-id="activeTabId"
              @select="switchTab"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import HomeButton from '../components/HomeButton.vue'
import CharacterImage from './info/CharacterImage.vue'
import InfoTabs from './info/InfoTabs.vue'
import InfoContent from './info/InfoContent.vue'
import ImageSelector from './info/ImageSelector.vue'
import BgmPlayer from './info/BgmPlayer.vue'
import CharacterTabs from './info/CharacterTabs.vue'

defineEmits(['navigate'])

const activeTabId = ref(1)
const activeInfoTab = ref('info')
const selectedImagePerTab = ref({})
const infoContentRef = ref(null)
const tabs = ref([])

const initializeTabs = async () => {
  const baseUrl = import.meta.env.BASE_URL

  tabs.value = await Promise.all(
    [1,2,3,4,5,6,7,8,9,10,11,12,13,16,17,18,19].map(async (tabId) => {
      const response = await fetch(`${baseUrl}data/info/${tabId}/content.json`)
      const data = await response.json()

      return {
        id: tabId,
        name: data.name,
        overlayImage: data.overlayImage ? `${baseUrl}data/info/${tabId}/${data.overlayImage}` : null,
        sections: data.sections || [],
        bgm: data.bgm || [],
        images: (data.images || []).map(img => ({
          ...img,
          src: `${baseUrl}data/info/${tabId}/${img.src}`
        }))
      }
    })
  )
}

const currentTab = computed(() =>
  tabs.value.find(tab => tab.id === activeTabId.value) || tabs.value[0] || {}
)

const currentSelectedImageId = computed(() =>
  selectedImagePerTab.value[activeTabId.value] || 1
)

const currentImageData = computed(() =>
  currentTab.value.images?.find(img => img.id === currentSelectedImageId.value) || {}
)
const currentImage = computed(() => currentImageData.value.src || '')
const currentImgTxt = computed(() => currentImageData.value.txt)
const currentImageType = computed(() => currentImageData.value.type || 'portrait')

const switchTab = (tabId) => {
  activeTabId.value = tabId
  nextTick(() => infoContentRef.value?.scrollToTop())
}

const selectImage = (imageId) => {
  selectedImagePerTab.value[activeTabId.value] = imageId
}

onMounted(initializeTabs)
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 95vw;
  min-width: 45vw;
  margin: 0 auto;
  gap: 1.5vw;
}

.main-content {
  display: flex;
  flex: 1;
  gap: 1.5vw;
  height: 95vh;
  min-height: 50vh;
}

.info-section {
  flex: 2;
  display: flex;
  min-width: 25vw;
  padding: 0.5vw;
  position: relative;
  z-index: 10;
}

.info-container {
  background: transparent;
  padding: 0;
  width: 100%;
  height: 100%;
  min-height: 35vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 10;
}

@media (max-width: 1280px) {
  .container { max-width: 96vw; min-width: 50vw; gap: 1.4vw; }
  .main-content { gap: 1.4vw; min-height: 48vh; }
  .info-section { min-width: 30vw; padding: 0.6vw; }
  .info-container { min-height: 34vh; }
}

@media (max-width: 1024px) {
  .container { min-width: 55vw; gap: 1.2vw; }
  .main-content { gap: 1.2vw; min-height: 45vh; }
  .info-section { min-width: 35vw; padding: 0.5vw; }
  .info-container { min-height: 32vh; }
}

@media (max-width: 768px) {
  .container { min-width: 60vw; gap: 1vw; }
  .main-content { gap: 1vw; min-height: 42vh; }
  .info-section { min-width: 40vw; padding: 0.4vw; }
  .info-container { min-height: 28vh; }
}

@media (max-width: 640px) {
  .container { min-width: 70vw; gap: 0.8vw; }
  .main-content { gap: 0.8vw; min-height: 40vh; }
  .info-section { min-width: 45vw; padding: 0.4vw; }
  .info-container { min-height: 25vh; }
}

@media (max-width: 480px) {
  .container { min-width: 100%; gap: 1vw; }
  .main-content { flex-direction: column; gap: 2vw; }
  .info-section { flex: none; min-width: 100%; min-height: 50vh; padding: 1vw; }
}
</style>
