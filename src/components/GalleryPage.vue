<template>
  <div class="gallery-page">
    <!-- 홈 버튼 -->
    <button class="home-btn" @click="$emit('go-home')" title="홈으로 돌아가기">
      ×
    </button>
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
            <img :src="item.thumbnail" :alt="item.title" @error="handleImageError">

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

<script>
import { ref, computed, onMounted } from 'vue'

export default {
  name: 'GalleryPage',
  emits: ['go-home'],
  setup() {
    const galleryItems = ref([])
    const selectedImage = ref(null)
    const selectedTag = ref('all')

    // 갤러리 아이템 로드
    const loadGalleryItems = async () => {
      try {
        const baseUrl = import.meta.env.BASE_URL
        const response = await fetch(`${baseUrl}data/gallery/gallery.json`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const galleryData = await response.json()
        
        // 갤러리 데이터를 화면용 형태로 변환
        const items = galleryData.images.map(img => ({
          id: img.id,
          title: img.title,
          description: img.description,
          character: img.character,
          tags: img.tags || [],
          uploadDate: img.uploadDate,
          thumbnail: `${baseUrl}data/gallery/images/${img.filename}`,
          fullImage: `${baseUrl}data/gallery/images/${img.filename}`
        }))
        
        galleryItems.value = items
      } catch (error) {
        console.error('갤러리 로드 실패:', error)
        // 기본 플레이스홀더 이미지들
        galleryItems.value = [
          {
            id: 'placeholder-1',
            title: '이미지 준비중',
            description: '갤러리 이미지를 준비중입니다.',
            thumbnail: 'https://via.placeholder.com/300x400/CCCCCC/666666?text=준비중',
            fullImage: 'https://via.placeholder.com/800x600/CCCCCC/666666?text=준비중',
            character: '준비중',
            tags: ['준비중']
          }
        ]
      }
    }

    // 사용 가능한 모든 태그 추출
    const availableTags = computed(() => {
      const allTags = new Set()
      galleryItems.value.forEach(item => {
        item.tags.forEach(tag => allTags.add(tag))
      })
      return Array.from(allTags).sort()
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

    // 이미지 로드 에러 처리
    const handleImageError = (event) => {
      event.target.src = 'https://via.placeholder.com/300x400/CCCCCC/666666?text=이미지를+불러올+수+없습니다'
    }

    // ESC 키로 모달 닫기
    const handleKeydown = (event) => {
      if (event.key === 'Escape' && selectedImage.value) {
        closeImage()
      }
    }

    onMounted(() => {
      loadGalleryItems()
      document.addEventListener('keydown', handleKeydown)
    })

    return {
      galleryItems,
      selectedImage,
      selectedTag,
      availableTags,
      filteredItems,
      filterByTag,
      openImage,
      closeImage,
      handleImageError
    }
  }
}
</script>

<style scoped>
.gallery-page {
  min-height: 100vh;
  padding: 20px;
  color: white;
}

.home-btn {
  position: fixed;
  top: 20px;
  left: 20px;
  background: #dc3545;
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border: 1px solid black;
  cursor: pointer;
  z-index: 1000;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  line-height: 1;
}

.home-btn:hover {
  background: #c82333;
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.gallery-container {
  max-width: 1400px;
  margin: 0 auto;
  padding-top: 80px;
}

.filter-section {
  margin-bottom: 2rem;
  text-align: center;
}

.tag-filters {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag-btn {
  background: rgba(0, 0, 0, 0.3);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  font-size: 14px;
}

.tag-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-1px);
}

.tag-btn.active {
  background: linear-gradient(135deg, #514f40, #3b423b);
  border-color: #fdfdfc;
  color: #fdfdfc;
  font-weight: bold;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding: 0 20px;
}

.gallery-card {
  position: relative;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.gallery-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  border-color: rgba(255, 255, 255, 0.3);
}

.gallery-card img {
  width: 100%;
  height: 300px;
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
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  z-index: 2001;
  width: 40px;
  height: 40px;
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
  max-height: 70vh;
  object-fit: contain;
}



@media (max-width: 650px) {
  .gallery-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0 10px;
  }
  
  .gallery-container {
    padding-top: 60px;
  }
  
  .modal-content {
    max-width: 95vw;
    max-height: 95vh;
  }
  
  .tag-filters {
    gap: 0.3rem;
  }
  
  .tag-btn {
    font-size: 12px;
    padding: 6px 12px;
  }
}
</style>
