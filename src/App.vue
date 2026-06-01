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

    <!-- 기록 페이지 -->
    <RecordsPage v-if="currentPage === 'records'" @navigate="navigateTo" />

    <!-- 기록 상세 페이지 -->
    <RecordDetailPage
      v-if="currentPage === 'record-detail'"
      :record="currentRecord"
      @navigate="navigateTo"
    />

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
import RecordsPage from './components/RecordsPage.vue'
import RecordDetailPage from './components/RecordDetailPage.vue'
import HotspotPage from './components/HotspotPage.vue'

const currentPage = ref('home')
const currentScenePath = ref('/data/hotspot/scene.json')
const currentRecord = ref(null)

const navigateTo = (target) => {
  if (typeof target === 'string') {
    currentPage.value = target
  } else {
    currentPage.value = target.page
    if (target.scenePath) {
      currentScenePath.value = target.scenePath
    }
    if (target.record) {
      currentRecord.value = target.record
    }
  }
}
</script>
