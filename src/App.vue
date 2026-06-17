<template>
  <div class="app">
    <HomePage v-if="currentPage === 'home'" @navigate="navigateTo" />
    <InfoPage v-if="currentPage === 'info'" @navigate="navigateTo" />
    <GalleryPage v-if="currentPage === 'gallery'" @navigate="navigateTo" />
    <LinksPage v-if="currentPage === 'links'" @navigate="navigateTo" />
    <ScenePage v-if="currentPage === 'scene'" @navigate="navigateTo" />
    <RecordsPage v-if="currentPage === 'records'" @navigate="navigateTo" />

    <RecordDetailPage
      v-if="currentPage === 'record-detail'"
      :record="currentRecord"
      @navigate="navigateTo"
    />

    <HotspotPage
      v-if="currentPage === 'hotspot'"
      :scenePath="currentScenePath"
      @navigate="navigateTo"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HomePage from './pages/HomePage.vue'
import InfoPage from './pages/InfoPage.vue'
import GalleryPage from './pages/GalleryPage.vue'
import LinksPage from './pages/LinksPage.vue'
import ScenePage from './pages/ScenePage.vue'
import RecordsPage from './pages/RecordsPage.vue'
import RecordDetailPage from './pages/RecordDetailPage.vue'
import HotspotPage from './pages/HotspotPage.vue'

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
