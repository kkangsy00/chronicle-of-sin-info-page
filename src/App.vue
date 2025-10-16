<template>
  <div class="app">
    <!-- 홈 페이지 -->
    <HomePage v-if="currentPage === 'home'" @navigate="navigateTo" />
    
    <!-- 정보 페이지 -->
    <InfoPage v-if="currentPage === 'info'" @go-home="navigateTo('home')" />
    
    <!-- 갤러리 페이지 -->
    <GalleryPage v-if="currentPage === 'gallery'" @go-home="navigateTo('home')" />
    
    <!-- 링크 페이지 -->
    <LinksPage v-if="currentPage === 'links'" @go-home="navigateTo('home')" />
  </div>
</template>

<script>
import { ref } from 'vue'
import HomePage from './components/HomePage.vue'
import InfoPage from './components/InfoPage.vue'
import GalleryPage from './components/GalleryPage.vue'
import LinksPage from './components/LinksPage.vue'

export default {
  name: 'App',
  components: {
    HomePage,
    InfoPage,
    GalleryPage,
    LinksPage
  },
  setup() {
    const currentPage = ref('home') // 기본값: 홈 페이지
    
    const navigateTo = (page) => {
      currentPage.value = page
    }
    
    return {
      currentPage,
      navigateTo
    }
  }
}
</script>
