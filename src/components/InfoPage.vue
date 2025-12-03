<template>
  <div class="info-page">
    <HomeButton @navigate="(page) => $emit('navigate', page)" />
    
    <div class="container">
      <div class="main-content">
        <!-- 좌측 이미지 영역 -->
        <CharacterImage
          :image-src="currentImage"
          :image-txt="currentImgTxt"
          :overlay-image="currentTab.overlayImage"
        />

        <!-- 우측 정보 영역 -->
        <div class="info-section">
          <div class="info-container">
            <!-- 상단 정보 탭 -->
            <InfoTabs v-model:active-tab="activeInfoTab" />

            <!-- 정보 탭 콘텐츠 -->
            <InfoContent
              v-show="activeInfoTab === 'info'"
              :content="currentTab.content"
              ref="infoContentRef"
            />

            <!-- 이미지 탭 콘텐츠 -->
            <ImageSelector
              v-show="activeInfoTab === 'images'"
              :images="currentTab.images"
              :selected-image-id="currentSelectedImageId"
              @select="selectImage"
            />

            <!-- BGM 탭 콘텐츠 -->
            <BgmPlayer
              v-show="activeInfoTab === 'bgm'"
              :bgm-list="currentTab.bgm || []"
            />
            
            <!-- 하단 캐릭터 탭 -->
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
import HomeButton from './HomeButton.vue'
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

// 콘텐츠를 HTML로 변환
const generateContentHTML = (sections) => 
  sections.map((section, i) => 
    `<div class='content-card ${i % 2 === 0 ? 'color-a' : 'color-b'}'>
      <h3 data-index="${String(i + 1).padStart(2, '0')}">${section.header}</h3>
      ${section.content.map(p => `<p>${p}</p>`).join('')}
    </div>`
  ).join('')

// 탭 데이터 초기화
const initializeTabs = async () => {
  const baseUrl = import.meta.env.BASE_URL
  
  tabs.value = await Promise.all(
    [1,2,3,4,5,6,7,8,9,10,11,12].map(async (tabId) => {
      const response = await fetch(`${baseUrl}data/info/${tabId}/content.json`)
      const data = await response.json()
      
      return {
        id: tabId,
        name: data.name,
        overlayImage: data.overlayImage ? `${baseUrl}data/info/${tabId}/${data.overlayImage}` : null,
        content: generateContentHTML(data.sections),
        bgm: data.bgm || [],
        images: (data.images || []).map(img => ({
          ...img,
          src: `${baseUrl}data/info/${tabId}/${img.src}`
        }))
      }
    })
  )
}

// 현재 활성 탭
const currentTab = computed(() => 
  tabs.value.find(tab => tab.id === activeTabId.value) || tabs.value[0] || {}
)

// 현재 선택된 이미지 ID
const currentSelectedImageId = computed(() => 
  selectedImagePerTab.value[activeTabId.value] || 1
)

// 현재 선택된 이미지 정보
const currentImageData = computed(() => 
  currentTab.value.images?.find(img => img.id === currentSelectedImageId.value) || {}
)
const currentImage = computed(() => currentImageData.value.src || '')
const currentImgTxt = computed(() => currentImageData.value.txt)

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
  max-width: 1800px;
  min-width: 850px;
  margin: 0 auto;
  gap: 20px;
}

.main-content {
  display: flex;
  flex: 1;
  gap: 20px;
  height: 100vh;
  min-height: 400px;
}

.info-section {
  flex: 2;
  display: flex;
  min-width: 350px;
  padding: 10px;
  position: relative;
  z-index: 10;
}

.info-container {
  background: transparent;
  padding: 0;
  width: 100%;
  height: 100%;
  min-height: 300px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 10;
}

/* 반응형 */
@media (max-width: 1024px) {
  .container { min-width: 768px; gap: var(--spacing-sm); }
  .main-content { gap: var(--spacing-sm); min-height: 350px; }
  .info-section { min-width: 480px; }
  .info-container { min-height: 280px; }
}

@media (max-width: 768px) {
  .container { min-width: 650px; gap: 12px; }
  .main-content { gap: 12px; min-height: 320px; }
  .info-section { min-width: 400px; }
  .info-container { min-height: 220px; }
}

@media (max-width: 480px) {
  .main-content { flex-direction: column; gap: var(--spacing-sm); }
  .info-section { flex: none; min-width: 100%; min-height: 400px; }
}
</style>
