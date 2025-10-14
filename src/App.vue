<template>
  <div class="container">
    <!-- 메인 콘텐츠 영역 -->
    <div class="main-content">
      <!-- 좌측 이미지 영역 -->
      <div class="image-section">
        <div class="image-container" @mouseenter="showImgTxt = true" @mouseleave="showImgTxt = false" style="position:relative;">
          <img 
            :src="currentImage" 
            class="fade-transition main-image"
            @error="handleImageError"
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
          @error="handleImageError"
        >
      </div>

      <!-- 우측 정보 영역 -->
      <div class="info-section">
        <div class="info-container">
          <!-- 상단 정보 탭 -->
          <div class="info-tabs">
            <button 
              :class="['info-tab-button', { active: activeInfoTab === 'info' }]"
              @click="switchInfoTab('info')"
            >
              인물정보
            </button>
            <button 
              :class="['info-tab-button', { active: activeInfoTab === 'images' }]"
              @click="switchInfoTab('images')"
            >
              이미지변경
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
                :class="['image-button', { active: selectedImageId === image.id }]"
                :style="{ backgroundImage: `url(${image.src})` }"
                @click="selectImage(image.id)"
              >
                <span>{{ image.name }}</span>
              </button>
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
</template>

<script>
import { ref, computed, onMounted, nextTick } from 'vue'

export default {
  name: 'App',
  setup() {
    const activeTabId = ref(1)
    const activeInfoTab = ref('info') // 'info' 또는 'images'
    const selectedImageId = ref(1)
    const infoContent = ref(null)
    const showImgTxt = ref(false)
    const tabContainer = ref(null)

    // 탭 메타데이터와 콘텐츠를 합친 완전한 탭 데이터
    const tabs = ref([])

    // 동적으로 사용 가능한 탭 ID들을 스캔
    const getAvailableTabIds = () => {
      // public/data/tabs 폴더에 있는 탭 ID들
      return [1, 2, 3, 4, 5, 6, 10, 12]
    }
    
    // 콘텐츠를 HTML로 변환하는 함수
    const generateContentHTML = (contentData) => {
      let html = ''
      
      contentData.sections.forEach(section => {
        html += `<div class='content-card ${section.colorClass}'>`
        html += `<h3 data-index="${section.index}">${section.header}</h3>`
        section.content.forEach(paragraph => {
          html += `<p>${paragraph}</p>`
        })
        html += `</div>`
      })
      
      return html
    }

    // 동적으로 콘텐츠 로드
    const loadTabContent = async (tabId) => {
      try {
        const baseUrl = import.meta.env.BASE_URL
        const response = await fetch(`${baseUrl}data/tabs/${tabId}/content.json`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const contentData = await response.json()
        return contentData
      } catch (error) {
        console.error(`콘텐츠 로드 실패 (탭 ${tabId}):`, error)
        return {
          name: '오류',
          title: '콘텐츠 로드 실패',
          images: [],
          sections: [{
            index: 1,
            header: '오류',
            colorClass: 'color-a',
            content: ['콘텐츠 로드에 실패했습니다.']
          }]
        }
      }
    }

    // 탭 데이터 초기화
    const initializeTabs = async () => {
      const tabsWithContent = []
      const baseUrl = import.meta.env.BASE_URL
      
      // 동적으로 탭 ID들을 가져옴
      const availableTabIds = getAvailableTabIds()
      
      for (const tabId of availableTabIds) {
        const contentData = await loadTabContent(tabId)
        const contentHTML = generateContentHTML(contentData)
        
        // 이미지 경로를 절대 경로로 변환
        const fixedImages = (contentData.images || []).map(img => ({
          ...img,
          src: img.src.startsWith('./') ? `${baseUrl}data/tabs/${tabId}/${img.src.slice(2)}` : img.src
        }))
        
        const fixedOverlayImage = contentData.overlayImage && contentData.overlayImage.startsWith('./') 
          ? `${baseUrl}data/tabs/${tabId}/${contentData.overlayImage.slice(2)}`
          : contentData.overlayImage
        
        tabsWithContent.push({
          id: tabId,
          name: contentData.name,
          title: contentData.title,
          overlayImage: fixedOverlayImage,
          content: contentHTML,
          images: fixedImages
        })
      }
      
      tabs.value = tabsWithContent
    }

    // 현재 활성 탭 계산
    const currentTab = computed(() => {
      const tab = tabs.value.find(tab => tab.id === activeTabId.value)
      if (tab) {
        return tab
      }
      // 탭이 없을 때 기본값 반환
      return {
        id: 1,
        name: '로딩중...',
        title: '로딩중...',
        content: '<p>콘텐츠를 불러오는 중입니다...</p>',
        overlayImage: '',
        images: []
      }
    })

    // 현재 선택된 이미지 계산
    const currentImage = computed(() => {
      const selectedImage = currentTab.value.images?.find(img => img.id === selectedImageId.value)
      return selectedImage?.src || ''
    })

    const currentImgTxt = computed(() => {
      const selectedImgTxt = currentTab.value.images?.find(img => img.id === selectedImageId.value)
      return selectedImgTxt?.txt
    })

    // 탭 전환 함수
    const switchTab = (tabId) => {
      if (activeTabId.value === tabId) return
      
      activeTabId.value = tabId
      selectedImageId.value = 1 // 탭 전환 시 기본 이미지로 리셋
      
      // 스크롤을 맨 위로 이동
      nextTick(() => {
        if (infoContent.value) {
          infoContent.value.scrollTop = 0
        }
      })
    }

    // 정보 탭 전환 함수
    const switchInfoTab = (tabType) => {
      activeInfoTab.value = tabType
    }

    // 이미지 선택 함수
    const selectImage = (imageId) => {
      selectedImageId.value = imageId
    }

    // 탭 스크롤 제어 함수
    const scrollTabs = (direction) => {
      if (!tabContainer.value) return
      
      const scrollAmount = 100 // 한 번에 스크롤할 픽셀 수
      const currentScroll = tabContainer.value.scrollLeft
      
      if (direction === 'left') {
        tabContainer.value.scrollTo({
          left: currentScroll - scrollAmount,
          behavior: 'smooth'
        })
      } else if (direction === 'right') {
        tabContainer.value.scrollTo({
          left: currentScroll + scrollAmount,
          behavior: 'smooth'
        })
      }
    }

    // 이미지 로드 에러 처리
    const handleImageError = (event) => {
      event.target.src = 'https://via.placeholder.com/400x300/CCCCCC/666666?text=이미지를+불러올+수+없습니다'
    }

    // 키보드 네비게이션
    const handleKeydown = (event) => {
      const key = event.key
      if (key >= '1' && key <= '9') {
        const tabId = parseInt(key)
        if (tabs.value.find(tab => tab.id === tabId)) {
          switchTab(tabId)
        }
      }
    }

    // 마운트 시 초기화
    onMounted(async () => {
      try {
        await initializeTabs()
        document.addEventListener('keydown', handleKeydown)
      } catch (error) {
        console.error('초기화 에러:', error)
      }
    })

    return {
      activeTabId,
      activeInfoTab,
      selectedImageId,
      tabs,
      currentTab,
      currentImage,
      currentImgTxt,
      infoContent,
      tabContainer,
      switchTab,
      switchInfoTab,
      selectImage,
      scrollTabs,
      handleImageError,
      showImgTxt
    }
  }
}
</script>
