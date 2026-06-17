<template>
  <div class="records-page">
    <HomeButton @navigate="$emit('navigate', $event)" />
    <div class="container">
      <div class="records-content">
        <CardList
          :items="recordsData.records"
          variant="plain"
          @select="(record) => $emit('navigate', { page: 'record-detail', record })"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import HomeButton from '../components/HomeButton.vue'
import CardList from '../components/CardList.vue'

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
  border: var(--border-hair) solid rgba(255, 255, 255, 0.1);
  padding: 2vw;
  border-radius: 0.5vw;
}

@media (max-width: 768px) {
  .container {
    max-width: 90vw;
    padding: 2vw 1vw;
  }

  .records-content {
    padding: 1.5vw;
  }
}
</style>
