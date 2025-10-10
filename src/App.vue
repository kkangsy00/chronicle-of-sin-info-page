<template>
  <div class="container">
    <!-- 메인 콘텐츠 영역 -->
    <div class="main-content">
      <!-- 좌측 이미지 영역 -->
      <div class="image-section">
        <div class="image-container">
          <img 
            :src="currentTab.image" 
            :alt="currentTab.title"
            class="fade-transition"
            @error="handleImageError"
          >
        </div>
      </div>

      <!-- 우측 정보 영역 -->
      <div class="info-section">
        <div class="info-container">
          <div 
            class="info-content fade-transition" 
            ref="infoContent"
            v-html="currentTab.content"
          ></div>
          
          <!-- 하단 탭 영역 (정보영역 내부로 이동) -->
          <div class="tab-section">
            <div class="tab-container">
              <button 
                v-for="tab in tabs" 
                :key="tab.id"
                :class="['tab-button', { active: activeTabId === tab.id }]"
                @click="switchTab(tab.id)"
                @keydown.enter="switchTab(tab.id)"
                @keydown.space="switchTab(tab.id)"
              >
                {{ tab.name }}
              </button>
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
  name: 'App',
  setup() {
    const activeTabId = ref(1)
    const infoContent = ref(null)

    // 탭 메타데이터와 콘텐츠를 합친 완전한 탭 데이터
    const tabs = ref([])

    // 동적으로 사용 가능한 탭 ID들을 스캔
    const getAvailableTabIds = () => {
      // Vite의 import.meta.glob을 사용하여 탭 폴더들을 스캔
      const contentFiles = import.meta.glob('./data/tabs/*/content.json')
      const tabIds = Object.keys(contentFiles)
        .map(path => {
          // './data/tabs/1/content.json' -> '1'
          const match = path.match(/\/tabs\/(\d+)\/content\.json$/)
          return match ? parseInt(match[1]) : null
        })
        .filter(id => id !== null)
        .sort((a, b) => a - b) // 숫자 순서로 정렬
      
      return tabIds
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
        const contentModule = await import(`./data/tabs/${tabId}/content.json`)
        return contentModule.default
      } catch (error) {
        console.error(`콘텐츠 로드 실패 (탭 ${tabId}):`, error)
        return { 
          intro: '콘텐츠를 불러올 수 없습니다.', 
          name: '오류',
          title: '콘텐츠 로드 실패',
          image: 'https://via.placeholder.com/400x300/CCCCCC/666666?text=오류',
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
      
      // 동적으로 탭 ID들을 가져옴
      const availableTabIds = getAvailableTabIds()
      
      for (const tabId of availableTabIds) {
        const contentData = await loadTabContent(tabId)
        const contentHTML = generateContentHTML(contentData)
        
        tabsWithContent.push({
          id: tabId,
          name: contentData.name,
          title: contentData.title,
          image: contentData.image,
          content: contentHTML,
          rawContent: contentData // 원본 데이터도 보관
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
        image: 'https://via.placeholder.com/400x300/CCCCCC/666666?text=Loading...'
      }
    })

    // 탭 전환 함수 (콘텐츠 동적 업데이트)
    const switchTab = async (tabId) => {
      if (activeTabId.value === tabId) return
      
      activeTabId.value = tabId
      
      // 해당 탭의 콘텐츠를 다시 로드하고 HTML 생성
      const currentTabData = tabs.value.find(tab => tab.id === tabId)
      if (currentTabData && currentTabData.rawContent) {
        // 제목 업데이트를 위해 다시 HTML 생성
        currentTabData.content = generateContentHTML(currentTabData.rawContent)
      }
      
      // 다음 틱에서 스크롤을 맨 위로 이동
      await nextTick()
      if (infoContent.value) {
        infoContent.value.scrollTop = 0
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
      tabs,
      currentTab,
      infoContent,
      switchTab,
      handleImageError
    }
  }
}
</script>
