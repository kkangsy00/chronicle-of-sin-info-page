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

    <!-- 핫스팟 페이지 -->
    <HotspotPage v-if="currentPage === 'hotspot'" @navigate="navigateTo" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HomePage from './components/HomePage.vue'
import InfoPage from './components/InfoPage.vue'
import GalleryPage from './components/GalleryPage.vue'
import LinksPage from './components/LinksPage.vue'
import HotspotPage from './components/HotspotPage.vue'

const currentPage = ref('home')

const navigateTo = (page) => {
  currentPage.value = page
}
</script>
