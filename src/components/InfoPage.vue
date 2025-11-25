<template>
  <div class="info-page">
    <!-- 홈 버튼 -->
    <button class="home-btn" @click="$emit('go-home')" title="돌아가기">
      ×
    </button>
    
    <div class="container">
      <!-- 메인 콘텐츠 영역 -->
      <div class="main-content">
        <!-- 좌측 이미지 영역 -->
        <div class="image-section">
          <div class="image-container" @mouseenter="showImgTxt = true" @mouseleave="showImgTxt = false">
            <img 
              :src="currentImage" 
              class="fade-transition main-image"
            >
            <transition name="fade">
              <div v-if="showImgTxt && currentImgTxt" class="main-image-txt">
                {{ currentImgTxt }}
              </div>
            </transition>
          </div>
          <img
            :src="currentTab.overlayImage"
            alt="overlay"
            class="overlay-image"
            v-if="currentTab.overlayImage"
          >
        </div>

        <!-- 우측 정보 영역 -->
        <div class="info-section">
          <div class="info-container">
            <!-- 상단 정보 탭 -->
            <div class="info-tabs">
              <button 
                v-for="tab in [
                  { key: 'info', label: '인물정보' },
                  { key: 'images', label: '이미지변경' },
                  { key: 'bgm', label: '사운드' }
                ]"
                :key="tab.key"
                :class="{ active: activeInfoTab === tab.key }"
                class="info-tab-button"
                @click="activeInfoTab = tab.key"
              >
                {{ tab.label }}
              </button>
            </div>

            <!-- 정보 탭 콘텐츠 -->
            <div 
              v-if="activeInfoTab === 'info'"
              class="info-content fade-transition" 
              ref="infoContent"
              v-html="currentTab.content"
            ></div>

            <!-- 이미지 탭 콘텐츠 -->
            <div 
              v-if="activeInfoTab === 'images'"
              class="images-content fade-transition"
            >
              <div class="image-buttons">
                <button
                  v-for="image in currentTab.images"
                  :key="image.id"
                  :class="['image-button', { active: currentSelectedImageId === image.id }]"
                  :style="{ backgroundImage: `url(${image.src})` }"
                  @click="selectImage(image.id)"
                >
                  <span>{{ image.name }}</span>
                </button>
              </div>
            </div>
            <!-- BGM 탭 콘텐츠 -->
            <div v-if="activeInfoTab === 'bgm'" class="bgm-content">
              <div class="bgm-list">
                <div
                  v-for="(bgm, idx) in currentTab.bgm || []"
                  :key="idx"
                  :class="['bgm-item', 'content-card', idx % 2 === 0 ? 'color-a' : 'color-b']"
                >
                  <button
                    :class="{ playing: isBgmPlaying && currentSelectedBgmIndex === idx }"
                    class="bgm-play-btn"
                    @click="togglePlayBgm(idx)"
                  >
                    <span class="btn-icon" :class="isBgmPlaying && currentSelectedBgmIndex === idx ? 'stop-icon' : 'play-icon'"></span>
                    {{ (isBgmPlaying && currentSelectedBgmIndex === idx) ? '정지' : '듣기' }}
                  </button>
                  <div class="bgm-left">
                    <h3 :data-index="String(idx + 1).padStart(2, '0')">{{ getBgmLabel(bgm) }}</h3>
                    <p v-if="bgm.txt" class="bgm-txt">{{ bgm.txt }}</p>
                  </div>
                </div>
              </div>
              <div v-if="isBgmPlaying && currentBgmEmbed" class="mini-player">
                <div class="mini-title">{{ getBgmLabel(currentBgmData) }}</div>
                <iframe
                  :src="currentBgmEmbed"
                  width="140"
                  height="56"
                  frameborder="0"
                ></iframe>
              </div>
            </div>
            
            <!-- 하단 탭 영역 (정보영역 내부) -->
            <div class="tab-section">
              <button class="scroll-button scroll-left" @click="scrollTabs('left')">&lt;</button>
              <div class="tab-container" ref="tabContainer">
                <button 
                  v-for="tab in tabs" 
                  :key="tab.id"
                  :class="['tab-button', { active: activeTabId === tab.id }]"
                  @click="switchTab(tab.id)"
                >
                  {{ tab.name }}
                  <div class="pct-txt">100%</div>
                </button>
              </div>
              <button class="scroll-button scroll-right" @click="scrollTabs('right')">&gt;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, nextTick } from 'vue'

export default {
  name: 'InfoPage',
  emits: ['go-home'],
  setup() {
    const activeTabId = ref(1)
    const activeInfoTab = ref('info')
    const selectedImagePerTab = ref({})
    const selectedBgmPerTab = ref({})
    const infoContent = ref(null)
    const showImgTxt = ref(false)
    const tabContainer = ref(null)
    const tabs = ref([])
    const isBgmPlaying = ref(false)

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

    const currentSelectedBgmIndex = computed(() =>
      typeof selectedBgmPerTab.value[activeTabId.value] === 'number'
        ? selectedBgmPerTab.value[activeTabId.value]
        : null
    )

    // 현재 선택된 이미지 정보
    const currentImageData = computed(() => 
      currentTab.value.images?.find(img => img.id === currentSelectedImageId.value) || {}
    )
    const currentImage = computed(() => currentImageData.value.src || '')
    const currentImgTxt = computed(() => currentImageData.value.txt)

    const currentBgmData = computed(() =>
      (currentTab.value.bgm || [])[currentSelectedBgmIndex.value]
    )

    const getBgmLabel = (bgm) => 
      typeof bgm === 'string' ? bgm : (bgm?.title || bgm?.url || '')

    const currentBgmEmbed = computed(() => {
      const data = currentBgmData.value
      if (!data) return ''
      const url = typeof data === 'string' ? data : data.url
      return url ? `${url}${url.includes('?') ? '&' : '?'}rel=0&autoplay=1&controls=1` : ''
    })

    const switchTab = (tabId) => {
      activeTabId.value = tabId
      nextTick(() => infoContent.value?.scrollTo(0, 0))
    }

    const selectImage = (imageId) => {
      selectedImagePerTab.value[activeTabId.value] = imageId
    }

    const togglePlayBgm = (index) => {
      if (currentSelectedBgmIndex.value === index && isBgmPlaying.value) {
        isBgmPlaying.value = false
        selectedBgmPerTab.value[activeTabId.value] = null
      } else {
        selectedBgmPerTab.value[activeTabId.value] = index
        isBgmPlaying.value = true
      }
    }

    const scrollTabs = (direction) => {
      tabContainer.value?.scrollBy({ 
        left: direction === 'left' ? -100 : 100, 
        behavior: 'smooth' 
      })
    }

    onMounted(initializeTabs)

    return {
      activeTabId, activeInfoTab, tabs, currentTab,
      currentImage, currentImgTxt, currentSelectedImageId, currentSelectedBgmIndex,
      currentBgmEmbed, isBgmPlaying, getBgmLabel, currentBgmData,
      infoContent, tabContainer, showImgTxt,
      switchTab, selectImage, togglePlayBgm, scrollTabs
    }
  }
}
</script>

<style scoped>


/* InfoPage 전용 스타일들 */
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 1800px;
  min-width: 850px;
  margin: 0 auto;
  /* padding: 20px; */
  gap: 20px;
}

.main-content {
  display: flex;
  flex: 1;
  gap: 20px;
  height: 100vh;
  min-height: 400px;
}

.image-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: left;
  min-width: 300px;
  position: relative;
  z-index: 1;
}

.image-container {
  background: transparent;
  width: 100%;
  max-width: 500px;
  min-width: 220px;
  height: 100%;
  max-height: 1000px;
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.main-image {
  max-width: 150%;
  max-height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.main-image-txt {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  color: #fff;
  padding: 10px;
  font-size: 14px;
  text-align: center;
  opacity: 1;
  z-index: 3;
}

.overlay-image {
  position: absolute;
  right: 10%;
  top: 60%;
  transform: translateY(-60%);
  width: 40%;
  height: auto;
  max-width: 200px;
  max-height: 80%;
  min-width: 40px;
  object-fit: contain;
  z-index: 2;
}

.overlay-image:hover {
  opacity: 0;
  transition: opacity 0.2s;
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

.info-content {
  padding: 0;
  flex: 1;
  overflow-y: auto;
}

/* 공통 스크롤바 */
.info-content::-webkit-scrollbar, .images-content::-webkit-scrollbar, .bgm-list::-webkit-scrollbar {
  width: 15px;
}
.info-content::-webkit-scrollbar-track, .images-content::-webkit-scrollbar-track, .bgm-list::-webkit-scrollbar-track {
  background: #000;
}
.info-content::-webkit-scrollbar-thumb, .images-content::-webkit-scrollbar-thumb, .bgm-list::-webkit-scrollbar-thumb {
  background: #545042;
  border: 2px solid #000;
}

/* info-content 내부 기본 스타일은 :deep()에서 처리 */

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

/* 공통 버튼 */
.scroll-button, .tab-button, .info-tab-button {
  border: none;
  color: #8a8777;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}
.scroll-button:hover, .tab-button:hover, .info-tab-button:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #545352;
}
.scroll-button:active { transform: scale(0.95); }

.tab-button {
  background: transparent;
  border: 1px solid #000000;
  font-size: clamp(14px, 2vh, 24px);
  position: relative;
  min-width: 100px;
  flex: 1;
  text-align: center;
  height: 100%;
}

.info-tab-button {
  flex: 1;
  background: rgba(101, 94, 68, 0.6);
  font-size: 16px;
  padding: 15px 20px;
}

/* 활성 상태 스타일 */
.tab-button.active {
  background: linear-gradient(180deg, #fdfdfc, #bdb7a0);
  color: #545352;
  transform: translateY(-1px);
}

.info-tab-button.active {
  background: rgba(35, 35, 9, 0.8);
  text-shadow: 0 0 15px #00bbff;
  color: #d8d7c1;
}

.info-tabs {
  display: flex;
  width: 60%;
  background: #666045;
  border-top: 1px solid #000000;
  border-left: 1px solid #000000;
  border-right: 1px solid #000000;
}

.images-content {
  background: linear-gradient(90deg, rgba(22, 21, 0, 0.8) 0%, rgba(41, 38, 21, 0.3) 100%);
  border: 1px solid #000000;
  padding: 20px;
  flex: 1;
  overflow-y: auto;
}

.image-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
}

.image-button {
  background: rgba(0, 0, 0, 0.3);
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
  border: 1px solid #000000;
  color: #ffffff;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  padding: 15px 10px;
  transition: all 0.3s ease;
  border-radius: 2px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  position: relative;
  width: 150px;
  height: 150px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.image-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  z-index: 1;
}

.image-button span {
  position: relative;
  z-index: 2;
}

.image-button:hover::before {
  background: rgba(255, 255, 255, 0.2);
}

.image-button.active {
  border: 2px solid #fdfdfc;
  transform: translateY(-1px);
}

.image-button.active::before {
  background: rgba(253, 253, 252, 0.3);
}

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



/* v-html 동적 콘텐츠에 대한 :deep 스타일 통합 */
:deep(.content-card) {
  padding: 25px 30px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 1px solid #000000;
  border-right: 1px solid #000000;
}

:deep(.content-card::before) {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  opacity: 0.6;
  background: rgba(0, 0, 0, 0.8);
}

/* 콘텐츠 카드 색상 변형 */
:deep(.content-card.color-a) {
  background: linear-gradient(90deg, rgba(22, 22, 0, 1) 0%, rgba(41, 38, 21, 0.5) 100%);
}

:deep(.content-card.color-b) {
  background: linear-gradient(90deg, rgba(22, 21, 0, 0.8) 0%, rgba(41, 38, 21, 0.3) 100%);
}

/* 콘텐츠 카드 내부 요소 */
:deep(.content-card h3) {
  color: #d8d7c1;
  margin: 0 0 12px 10px;
  font-size: 24px;
  display: block;
  position: relative;
}

:deep(.content-card h3::before) {
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

:deep(.content-card h3::after) {
  content: '';
  display: block;
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255);
  opacity: 0.18;
  margin: 5px 0 12px 0;
}

:deep(.content-card p) {
  color: #84836e;
  font-size: 16px;
  margin: 0 0 10px 12px;
  line-height: 1;
}

/* BGM 항목 스타일 */
:deep(.bgm-item::before), :deep(.bgm-item h3::after) { display: none; }
:deep(.bgm-item .bgm-txt) {
  color: #84836e;
  font-size: 16px;
  margin: 0 0 10px 12px;
  line-height: 1;
}

/* 반응형 */
@media (max-width: 1024px) {
  .container { min-width: 768px; gap: 15px; }
  .main-content { gap: 15px; min-height: 350px; }
  .image-section { min-width: 240px; }
  .info-section { min-width: 480px; }
  .image-container, .info-container { min-height: 280px; }
  :deep(.content-card) { padding: 15px 25px; }
  :deep(.content-card h3) { font-size: 22px; }
  :deep(.content-card p) { font-size: 15px; }
}

@media (max-width: 800px) {
  .container { min-width: 650px; gap: 12px; }
  .main-content { gap: 12px; min-height: 320px; }
  .image-section { min-width: 200px; }
  .info-section { min-width: 400px; }
  .image-container, .info-container { min-height: 220px; }
  .tab-section { min-height: 55px; max-height: 85px; }
  :deep(.content-card) { padding: 12px 22px; }
  :deep(.content-card h3) { font-size: 20px; }
  :deep(.content-card h3::before) { width: 22px; height: 22px; font-size: 18px; }
  :deep(.content-card p) { font-size: 14px; }
  .tab-button { min-width: 80px; }
  .info-tab-button { padding: 12px 18px; font-size: 15px; }
}

@media (max-width: 700px) {
  .main-content { flex-direction: column; gap: 15px; }
  .image-section, .info-section { flex: none; min-width: 100%; }
  .image-container { max-height: 350px; min-height: 250px; }
  .info-section { min-height: 400px; }
  .tab-section { min-height: 50px; max-height: 80px; }
  .tab-button { min-width: 70px; }
  :deep(.content-card) { padding: 16px 20px; }
  :deep(.content-card h3) { font-size: 19px; }
  :deep(.content-card h3::before) { width: 20px; height: 20px; font-size: 16px; }
  :deep(.content-card p) { font-size: 13px; }
}
</style>
