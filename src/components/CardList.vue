<template>
  <div class="card-list">
    <component
      :is="as === 'link' ? 'a' : 'button'"
      v-for="(item, i) in items"
      :key="item.id ?? item.title ?? i"
      class="card-item"
      :class="variant"
      v-bind="as === 'link'
        ? { href: item.url, target: '_blank', rel: 'noopener noreferrer' }
        : {}"
      @click="as === 'link' ? null : $emit('select', item)"
    >
      <span class="card-title">{{ item.title }}</span>
      <span class="card-desc">{{ item.desc ?? item.description }}</span>
    </component>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => []
  },
  // 'button' → click 시 select 이벤트 / 'link' → <a> 새 탭
  as: {
    type: String,
    default: 'button'
  },
  // 'accent' (장면·링크: 그라데이션+좌측 강조선) / 'plain' (기록: 단색)
  variant: {
    type: String,
    default: 'accent'
  }
})

defineEmits(['select'])
</script>

<style scoped>
.card-list {
  display: flex;
  flex-direction: column;
  gap: 0.8vw;
}

/* ── 공통 ── */
.card-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 1.2vw 1.5vw;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.card-title {
  display: block;
  font-size: var(--fs-base);
  font-weight: 500;
  margin-bottom: 0.4vw;
  transition: color 0.3s ease;
}

.card-desc {
  font-size: var(--fs-xs);
  line-height: 1.4;
  transition: color 0.3s ease;
}

/* ── accent 변형 (장면·링크) ── */
.card-item.accent {
  background: linear-gradient(90deg, rgba(22, 21, 0, 0.8) 0%, rgba(41, 38, 21, 0.3) 100%);
  border: var(--border-hair) solid #000000;
  border-left: 3px solid #4c4d3e;
}

.card-item.accent::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: rgba(0, 0, 0, 0.8);
  opacity: 0.6;
}

.card-item.accent:hover {
  background: linear-gradient(90deg, rgba(22, 22, 0, 1) 0%, rgba(41, 38, 21, 0.5) 100%);
  transform: translateX(0.5vw);
  border-left-color: #fdfdfc;
  box-shadow: 0 0.3vw 0.8vw rgba(0, 0, 0, 0.4);
}

.card-item.accent .card-title {
  color: #d8d7c1;
}

.card-item.accent:hover .card-title {
  color: #fdfdfc;
}

.card-item.accent .card-desc {
  color: var(--color-text-secondary, #9b9883);
}

.card-item.accent:hover .card-desc {
  color: var(--color-text-muted, #bdb7a0);
}

/* ── plain 변형 (기록) ── */
.card-item.plain {
  justify-content: center;
  background: rgba(0, 0, 0, 0.2);
  border: var(--border-hair) solid rgba(255, 255, 255, 0.1);
  border-radius: 0.3vw;
  color: white;
}

.card-item.plain:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateX(0.5vw);
}

.card-item.plain .card-title {
  font-size: var(--fs-md);
  font-weight: bold;
  color: #fdfdfc;
  margin-bottom: 0.5vw;
}

.card-item.plain .card-desc {
  font-size: var(--fs-sm);
  color: #bdb7a0;
}

/* ── 반응형 — 폰트/테두리는 토큰·헤어라인으로 처리. 간격·패딩만 조정 ── */
@media (min-width: 2561px) {
  .card-list { gap: 1vw; }
  .card-item { padding: 1.5vw 2vw; }
  .card-item.accent:hover { transform: translateX(0.6vw); }
}

@media (min-width: 1921px) {
  .card-item { padding: 1.3vw 1.7vw; }
}

@media (max-width: 1280px) {
  .card-item { padding: 1.3vw 1.6vw; }
}

@media (max-width: 1024px) {
  .card-item { padding: 1.5vw 2vw; }
}

@media (max-width: 768px) {
  .card-list { gap: 1.5vw; }
  .card-item { padding: 2vw 2.5vw; }
  .card-item.accent:hover { transform: translateX(1vw); }
}

@media (max-width: 640px) {
  .card-list { gap: 2vw; }
  .card-item { padding: 2.5vw 3vw; }
}

@media (max-width: 480px) {
  .card-list { gap: 2.5vw; }
  .card-item { padding: 3vw 3.5vw; }
  .card-item.accent:hover { transform: translateX(1.5vw); }
}
</style>
