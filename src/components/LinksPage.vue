<template>
  <div class="links-page">
    <!-- 홈 버튼 -->
    <HomeButton @navigate="(page) => $emit('navigate', page)" />
    <div class="container">
      <div class="links-content">
        <div v-for="category in linkData.categories" :key="category.id" class="link-section">
          <h2>{{ category.title }}</h2>
          <div class="link-list">
            <a 
              v-for="link in category.links" 
              :key="link.title"
              :href="link.url" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="link-item"
            >
              <span class="link-title">{{ link.title }}</span>
              <span class="link-desc">{{ link.desc }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import HomeButton from './HomeButton.vue'

defineEmits(['navigate'])

const linkData = ref({ categories: [] })

onMounted(async () => {
  const response = await fetch(`${import.meta.env.BASE_URL}data/links.json`)
  linkData.value = await response.json()
})
</script>

<style scoped>
.links-page {
  min-height: 100vh;
  color: white;
}



.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
}

.link-section {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 30px;
  backdrop-filter: blur(10px);
  margin-bottom: 20px;
}

.link-section h2 {
  font-size: 1.8rem;
  color: #d8d7c1;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
}

.link-list {
  display: grid;
  gap: 12px;
}

.link-item {
  display: block;
  padding: 18px 22px;
  background: linear-gradient(90deg, rgba(22, 21, 0, 0.8) 0%, rgba(41, 38, 21, 0.3) 100%);
  border: 1px solid #000000;
  border-left: 4px solid #4c4d3e;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.link-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: rgba(0, 0, 0, 0.8);
  opacity: 0.6;
}

.link-item:hover {
  background: linear-gradient(90deg, rgba(22, 22, 0, 1) 0%, rgba(41, 38, 21, 0.5) 100%);
  transform: translateX(8px);
  border-left-color: #fdfdfc;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

.link-title {
  display: block;
  color: #d8d7c1;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 6px;
  transition: color 0.3s ease;
}

.link-item:hover .link-title {
  color: #fdfdfc;
}

.link-desc {
  color: var(--color-text-secondary);
  font-size: 14px;
  line-height: 1.4;
  transition: color var(--transition-normal);
}

.link-item:hover .link-desc {
  color: var(--color-text-muted);
}

/* 반응형 - 통일된 브레이크포인트 */
@media (max-width: 768px) {
  .container {
    padding: var(--spacing-lg) var(--spacing-sm);
  }
  
  .link-section {
    padding: var(--spacing-md);
  }
  
  .link-section h2 {
    font-size: 1.5rem;
  }
  
  .link-item {
    padding: var(--spacing-sm) 18px;
  }
  
  .link-title {
    font-size: 16px;
  }
  
  .link-desc {
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .links-content {
    gap: var(--spacing-lg);
  }
  
  .link-section {
    padding: var(--spacing-sm);
  }
  
  .link-item {
    padding: 12px var(--spacing-sm);
  }
  
  .link-item:hover {
    transform: translateX(4px);
  }
}
</style>
