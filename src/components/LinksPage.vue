<template>
  <div class="links-page">
    <!-- 홈 버튼 -->
    <button class="home-btn" @click="$emit('go-home')" title="홈으로 돌아가기">
      ×
    </button>
    
    <div class="container">
      <div class="header">
        <h1>관련 링크</h1>
        <p>죄의 연대기 관련 자료 및 참고 링크 모음</p>
      </div>
      
      <div class="links-content">
        <!-- TRPG 자료 섹션 -->
        <div class="link-section">
          <h2>🎲 TRPG 자료</h2>
          <div class="link-list">
            <a href="https://www.chaosium.com/call-of-cthulhu-rpg/" target="_blank" rel="noopener noreferrer" class="link-item">
              <span class="link-title">크툴루의 부름 공식 사이트</span>
              <span class="link-desc">Chaosium 공식 룰북 및 자료</span>
            </a>
            <a href="https://www.drivethrurpg.com/browse/pub/24/Chaosium" target="_blank" rel="noopener noreferrer" class="link-item">
              <span class="link-title">DriveThruRPG - Chaosium</span>
              <span class="link-desc">디지털 룰북 및 시나리오 구매</span>
            </a>
            <a href="https://www.reddit.com/r/callofcthulhu/" target="_blank" rel="noopener noreferrer" class="link-item">
              <span class="link-title">Reddit - Call of Cthulhu</span>
              <span class="link-desc">커뮤니티 및 팬메이드 자료</span>
            </a>
          </div>
        </div>
        
        <!-- 시각 자료 섹션 -->
        <div class="link-section">
          <h2>🎨 시각 자료</h2>
          <div class="link-list">
            <a href="https://www.artstation.com/search?query=cthulhu" target="_blank" rel="noopener noreferrer" class="link-item">
              <span class="link-title">ArtStation - Cthulhu Art</span>
              <span class="link-desc">크툴루 관련 컨셉 아트 및 일러스트</span>
            </a>
            <a href="https://www.pinterest.com/search/pins/?q=lovecraft%20aesthetic" target="_blank" rel="noopener noreferrer" class="link-item">
              <span class="link-title">Pinterest - Lovecraft Aesthetic</span>
              <span class="link-desc">러브크래프트 분위기 이미지 모음</span>
            </a>
            <a href="https://unsplash.com/s/photos/gothic-architecture" target="_blank" rel="noopener noreferrer" class="link-item">
              <span class="link-title">Unsplash - Gothic Architecture</span>
              <span class="link-desc">고딕 건축 및 분위기 사진</span>
            </a>
          </div>
        </div>
        
        <!-- 음향 자료 섹션 -->
        <div class="link-section">
          <h2>🎵 음향 & 분위기</h2>
          <div class="link-list">
            <a href="https://tabletopaudio.com/" target="_blank" rel="noopener noreferrer" class="link-item">
              <span class="link-title">Tabletop Audio</span>
              <span class="link-desc">TRPG용 배경음악 및 효과음</span>
            </a>
            <a href="https://www.youtube.com/results?search_query=lovecraftian+ambient" target="_blank" rel="noopener noreferrer" class="link-item">
              <span class="link-title">YouTube - Lovecraftian Ambient</span>
              <span class="link-desc">러브크래프트 분위기 앰비언트 음악</span>
            </a>
            <a href="https://mynoise.net/NoiseMachines/thunderNoiseGenerator.php" target="_blank" rel="noopener noreferrer" class="link-item">
              <span class="link-title">MyNoise - Thunder Generator</span>
              <span class="link-desc">천둥소리 및 자연음 생성기</span>
            </a>
          </div>
        </div>
        
        <!-- 도구 & 유틸리티 섹션 -->
        <div class="link-section">
          <h2>🛠️ 도구 & 유틸리티</h2>
          <div class="link-list">
            <a href="https://roll20.net/" target="_blank" rel="noopener noreferrer" class="link-item">
              <span class="link-title">Roll20</span>
              <span class="link-desc">온라인 TRPG 플랫폼</span>
            </a>
            <a href="https://www.notion.so/" target="_blank" rel="noopener noreferrer" class="link-item">
              <span class="link-title">Notion</span>
              <span class="link-desc">캠페인 노트 및 자료 정리</span>
            </a>
            <a href="https://donjon.bin.sh/coc/" target="_blank" rel="noopener noreferrer" class="link-item">
              <span class="link-title">Donjon - CoC Generator</span>
              <span class="link-desc">크툴루 캐릭터 및 시나리오 생성기</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LinksPage',
  emits: ['go-home']
}
</script>

<style scoped>
.links-page {
  min-height: 100vh;
  color: white;
}

.home-btn {
  position: fixed;
  top: 20px;
  left: 20px;
  background: #ce3a24;
  color: black;
  border: 1px solid black;
  width: 50px;
  height: 50px;
  border-radius: 0;
  cursor: pointer;
  z-index: 1000;
  font-size: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  line-height: 1;
}

.home-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.header {
  text-align: center;
  margin-bottom: 50px;
}

.header h1 {
  font-size: clamp(2.5rem, 8vw, 4rem);
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

.header p {
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  color: #bdb7a0;
  opacity: 0.8;
}

.links-content {
  display: grid;
  gap: 40px;
}

.link-section {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 30px;
  backdrop-filter: blur(10px);
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
  color: #84836e;
  font-size: 14px;
  line-height: 1.4;
  transition: color 0.3s ease;
}

.link-item:hover .link-desc {
  color: #bdb7a0;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .container {
    padding: 30px 15px;
  }
  
  .link-section {
    padding: 20px;
  }
  
  .link-section h2 {
    font-size: 1.5rem;
  }
  
  .link-item {
    padding: 15px 18px;
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
    gap: 30px;
  }
  
  .link-section {
    padding: 15px;
  }
  
  .link-item {
    padding: 12px 15px;
  }
  
  .link-item:hover {
    transform: translateX(4px);
  }
}
</style>
