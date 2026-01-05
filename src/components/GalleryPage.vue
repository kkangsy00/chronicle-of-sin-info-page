<template>
  <div class="gallery-page">
    <!-- 홈 버튼 -->
    <HomeButton @navigate="(page) => $emit('navigate', page)" />
      <div class="header-section">
        <transition :name="headerInfo.transition" mode="out-in">
          <div 
            :key="selectedTag" 
            class="header-image" 
            :style="{ backgroundImage: `url(${headerInfo.image})` }"
          ></div>
        </transition>
      </div>
     <div class="gallery-container">
      <!-- 태그 필터 -->
      <div class="filter-section">
        <div class="tag-filters">
          <button 
            :class="['tag-btn', { active: selectedTag === 'all' }]"
            @click="filterByTag('all')"
          >
            전체
          </button>
          <button 
            v-for="tag in availableTags" 
            :key="tag"
            :class="['tag-btn', { active: selectedTag === tag }]"
            @click="filterByTag(tag)"
          >
            {{ tag }}
          </button>
        </div>
      </div>
      
      <div class="gallery-grid">
        <div v-for="item in filteredItems" :key="item.id" class="gallery-item">
          <div class="gallery-card" @click="openImage(item)">
            <img :src="item.thumbnail" :alt="item.title">
          </div>
        </div>
      </div>
      
      <!-- 이미지 뷰어 모달 -->
      <div v-if="selectedImage" class="image-modal" @click="closeImage">
        <div class="modal-content" @click.stop>
          <button class="close-btn" @click="closeImage">&times;</button>
          <img :src="selectedImage.fullImage" :alt="selectedImage.title">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import HomeButton from './HomeButton.vue'

defineEmits(['navigate'])

const galleryItems = ref([])
const selectedImage = ref(null)
const selectedTag = ref('all')
const baseUrl = import.meta.env.BASE_URL
const galleryData = ref(null)

// 갤러리 아이템 로드
const loadGalleryItems = async () => {
  const response = await fetch(`${baseUrl}data/gallery/gallery.json`)
  const data = await response.json()
  
  galleryData.value = data
  
  galleryItems.value = data.images.map((img, index) => ({
    id: index + 1,
    tags: img.tags.map(tagId => data.tagMap[tagId.toString()]),
    thumbnail: `${baseUrl}data/gallery/images/${img.filename}`,
    fullImage: `${baseUrl}data/gallery/images/${img.filename}`
  }))
}

// 헤더 정보 계산 (JSON 데이터 기반)
const headerInfo = computed(() => {
  const headerBase = `${baseUrl}data/gallery/header/`
  
  if (!galleryData.value?.headers) {
    return {
      image: `${headerBase}header_0.png`,
      transition: 'fade'
    }
  }
  
  // tagMap에서 현재 선택된 태그에 해당하는 ID 찾기
  const tagId = Object.keys(galleryData.value.tagMap).find(
    id => galleryData.value.tagMap[id] === selectedTag.value
  )
  
  // 해당 태그의 헤더 정보가 있으면 사용, 없으면 기본값
  const headerData = galleryData.value.headers[tagId] || galleryData.value.headers.default
  
  return {
    image: `${headerBase}${headerData.image}`,
    transition: headerData.transition
  }
})

// 사용 가능한 모든 태그 추출
const availableTags = computed(() => {
  const map = galleryData.value?.tagMap
  if (map) {
    return Object.keys(map)
      .map(k => ({ id: Number(k), name: map[k] }))
      .sort((a, b) => a.id - b.id)
      .map(x => x.name)
  }
  const s = new Set()
  galleryItems.value.forEach(i => i.tags.forEach(t => s.add(t)))
  return Array.from(s).sort()
})

// 필터된 아이템들
const filteredItems = computed(() => {
  if (selectedTag.value === 'all') {
    return galleryItems.value
  }
  return galleryItems.value.filter(item => 
    item.tags.includes(selectedTag.value)
  )
})

// 태그로 필터링
const filterByTag = (tag) => {
  selectedTag.value = tag
}

// 이미지 모달 열기
const openImage = (item) => {
  selectedImage.value = item
}

// 이미지 모달 닫기
const closeImage = () => {
  selectedImage.value = null
}

onMounted(loadGalleryItems)
</script>

<style scoped>
.gallery-page {
  min-height: 100vh;
  color: white;
}

.header-section {
  height: 23vw;
  position: relative;
  overflow: hidden;
  margin-bottom: 1.5vw;
  margin-left: -1.2vw;
}

.header-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center 40% ;
  background-repeat: no-repeat;
  transition: all 0.5s ease;
  position: relative;
}

.header-image::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%);
}

/* 헤더 전환 효과 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-right-enter-active, .slide-right-leave-active {
  transition: transform 0.2s ease;
}
.slide-right-enter-from {
  transform: translateX(100%);
}
.slide-right-leave-to {
  transform: translateX(-100%);
}

.slide-left-enter-active, .slide-left-leave-active {
  transition: transform 0.2s ease;
}
.slide-left-enter-from {
  transform: translateX(-100%);
}
.slide-left-leave-to {
  transform: translateX(100%);
}

.gallery-container {
  max-width: 90vw;
  margin: 0 auto;
  padding-top: 1.5vw;
}

.filter-section {
  margin-bottom: 2vw;
  text-align: center;
}

.tag-filters {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5vw;
}

.tag-btn {
  background: rgba(0, 0, 0, 0.3);
  color: white;
  border: 0.05vw solid rgba(255, 255, 255, 0.2);
  padding: 0.5vw 1vw;
  border-radius: 1.2vw;
  transition: all 0.3s ease;
  font-size: 0.9vw;
  cursor: pointer;
}

.tag-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-0.1vw);
}

.tag-btn.active {
  background: linear-gradient(135deg, #514f40, #3b423b);
  border-color: #fdfdfc;
  color: #fdfdfc;
  font-weight: bold;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18vw, 1fr));
  gap: 2vw;
  padding: 0 1.5vw;
}

.gallery-card {
  position: relative;
  border-radius: 0.8vw;
  overflow: hidden;
  height: 20vw;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 0.05vw solid rgba(255, 255, 255, 0.1);
}

.gallery-card:hover {
  transform: translateY(-0.3vw);
  box-shadow: 0 0.8vw 2vw rgba(0, 0, 0, 0.5);
  border-color: rgba(255, 255, 255, 0.3);
}

.gallery-card img {
  width: 100%;
  height: 20vw;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.gallery-card:hover img {
  transform: scale(1.05);
}

/* 이미지 모달 */
.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  backdrop-filter: blur(5px);
}

.modal-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  background: rgba(0, 0, 0, 0.8);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.close-btn {
  position: absolute;
  top: 1vw;
  right: 1.2vw;
  background: none;
  border: none;
  color: white;
  font-size: 2.5vw;
  cursor: pointer;
  z-index: 2001;
  width: 2.5vw;
  height: 2.5vw;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  transition: background 0.3s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.modal-content img {
  width: 100%;
  height: auto;
  max-height: 80vh;
  object-fit: contain;
}

/* 반응형 - 대형 화면 */
@media (min-width: 2561px) {
  .tag-btn { padding: 1.2vw 1.8vw; font-size: 1.6vw; border-radius: 2.4vw; border: 0.15vw solid rgba(255, 255, 255, 0.2); }
  .close-btn { width: 3vw; height: 3vw; font-size: 3vw; }
}

@media (min-width: 1921px) {
  .tag-btn { padding: 1vw 1.5vw; font-size: 1.2vw; border-radius: 2.2vw; border: 0.1vw solid rgba(255, 255, 255, 0.2); }
  .close-btn { width: 2.8vw; height: 2.8vw; font-size: 2.8vw; }
}

/* 반응형 - 중형 화면 */
@media (max-width: 1280px) {
  .tag-btn { padding: 0.7vw 1.2vw; font-size: 1.2vw; }
}

@media (max-width: 640px) {
  .close-btn { width: 10vw; height: 10vw; font-size: 7vw; }
}

@media (max-width: 480px) {
  .tag-btn { padding: 1.5vw 2vw; font-size: 2.2vw; border-radius: 3vw; }
  .close-btn { width: 12vw; height: 12vw; font-size: 8vw; }
  .gallery-grid { grid-template-columns: repeat(auto-fill, minmax(20vw, 1fr)); }
}
</style>
