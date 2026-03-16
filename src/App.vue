<template>
  <div class="app">
    <!-- 홈 페이지 -->
    <HomePage v-if="currentPage === 'home'" @navigate="navigateTo" />
    
    <!-- 정보 페이지 -->
    <InfoPage v-if="currentPage === 'info'" @navigate="navigateTo" />
    
    <!-- 갤러리 페이지 -->
    <GalleryPage v-if="currentPage === 'gallery'" @navigate="navigateTo" />
    
    <!-- 링크 페이지 -->
    <LinksPage v-if="currentPage === 'links'" @navigate="navigateTo" />

    <!-- 장면 목록 페이지 -->
    <ScenePage v-if="currentPage === 'scene'" @navigate="navigateTo" />

    <!-- 핫스팟 페이지 -->
    <HotspotPage
      v-if="currentPage === 'hotspot'"
      :scenePath="currentScenePath"
      @navigate="navigateTo"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HomePage from './components/HomePage.vue'
import InfoPage from './components/InfoPage.vue'
import GalleryPage from './components/GalleryPage.vue'
import LinksPage from './components/LinksPage.vue'
import ScenePage from './components/ScenePage.vue'
import HotspotPage from './components/HotspotPage.vue'

const currentPage = ref('home')
const currentScenePath = ref('/data/hotspot/scene.json')

const navigateTo = (target) => {
  if (typeof target === 'string') {
    currentPage.value = target
  } else {
    currentPage.value = target.page
    if (target.scenePath) {
      currentScenePath.value = target.scenePath
    }
  }
}
</script>
