<template>
  <div class="records-page">
    <HomeButton @navigate="(page) => $emit('navigate', page)" />
    <div class="container">
      <div class="records-content">
        <div class="records-list">
          <button
            v-for="record in recordsData.records"
            :key="record.id"
            class="record-item"
            @click="$emit('navigate', { page: 'record-detail', record: record })"
          >
            <span class="record-title">{{ record.title }}</span>
            <span class="record-desc">{{ record.description }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import HomeButton from './HomeButton.vue'

defineEmits(['navigate'])

const recordsData = ref({ records: [] })

onMounted(async () => {
  const response = await fetch(`${import.meta.env.BASE_URL}data/records/records.json`)
  recordsData.value = await response.json()
})
</script>

<style scoped>
.records-page {
  min-height: 100vh;
  color: white;
}

.container {
  max-width: 75vw;
  margin: 0 auto;
  padding: 4vw 1.5vw;
}

.records-content {
  background: rgba(0, 0, 0, 0.3);
  border: 0.05vw solid rgba(255, 255, 255, 0.1);
  padding: 2vw;
  border-radius: 0.5vw;
}

.records-list {
  display: flex;
  flex-direction: column;
  gap: 1vw;
}

.record-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 1.5vw 2vw;
  background: rgba(0, 0, 0, 0.2);
  border: 0.05vw solid rgba(255, 255, 255, 0.1);
  border-radius: 0.3vw;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
}

.record-item:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateX(0.5vw);
}

.record-title {
  font-size: 1.5vw;
  font-weight: bold;
  color: #fdfdfc;
  margin-bottom: 0.5vw;
}

.record-desc {
  font-size: 1vw;
  color: #bdb7a0;
}

/* 반응형 */
@media (max-width: 768px) {
  .container {
    max-width: 90vw;
    padding: 2vw 1vw;
  }

  .records-content {
    padding: 1.5vw;
  }

  .record-item {
    padding: 1.2vw 1.5vw;
  }

  .record-title {
    font-size: 2vw;
  }

  .record-desc {
    font-size: 1.3vw;
  }
}

@media (max-width: 480px) {
  .record-item {
    padding: 1vw;
  }

  .record-title {
    font-size: 2.5vw;
  }

  .record-desc {
    font-size: 1.5vw;
  }
}
</style>
