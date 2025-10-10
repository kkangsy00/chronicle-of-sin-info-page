# Vue.js 탭 기반 정보 페이지

Vue.js 프레임워크를 사용한 모던한 탭 기반 정보 페이지입니다. Frontend 입문자를 위한 GitHub Pages 배포 실습 프로젝트입니다.

## 🚀 기능

- **Vue.js 3 Composition API**: 최신 Vue.js 3의 Composition API 사용
- **반응형 데이터 바인딩**: Vue의 반응형 시스템으로 상태 관리
- **하단 탭 네비게이션**: 4개의 탭으로 구성된 네비게이션
- **동적 콘텐츠**: 탭 클릭 시 해당하는 정보와 이미지 표시
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 기기에서 최적화
- **스크롤 가능한 정보 박스**: 우측 정보 영역에서 세로 스크롤 지원
- **부드러운 애니메이션**: Vue 전환 효과와 CSS 애니메이션
- **키보드 네비게이션**: 1-4 숫자키로 탭 전환 가능

## 📋 탭 구성

1. **웹 개발**: HTML, CSS, JavaScript, Vue.js 기초
2. **반응형**: 반응형 디자인과 Vue.js 반응형 시스템
3. **Vue.js**: Vue.js 프레임워크 특징과 생태계
4. **배포**: Vue 프로젝트 빌드 및 배포 방법

## 🛠️ 기술 스택

- **Vue.js 3**: Composition API, 반응형 데이터 바인딩
- **Vite**: 빠른 개발 서버와 번들러
- **HTML5**: 시맨틱 마크업
- **CSS3**: Flexbox, 그라디언트, 애니메이션
- **GitHub Actions**: 자동 배포 CI/CD
- **GitHub Pages**: 무료 정적 웹사이트 호스팅

## 🏃‍♂️ 개발 시작하기

### 1. 프로젝트 클론

```bash
git clone https://github.com/username/vue-tab-project.git
cd vue-tab-project
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173`으로 접속

### 4. 프로덕션 빌드

```bash
npm run build
```

### 5. 빌드 결과 미리보기

```bash
npm run preview
```

## 📱 반응형 지원

- **데스크톱**: 좌우 분할 레이아웃 (이미지 좌측, 정보 우측)
- **모바일**: 상하 분할 레이아웃 (적응형 디자인)
- **태블릿**: 중간 크기에 최적화된 레이아웃

## 🎨 Vue.js 특징 활용

- **Composition API**: setup() 함수로 컴포넌트 로직 구성
- **Reactive Data**: ref, computed를 통한 반응형 상태 관리
- **Template Directives**: v-for, v-if, v-html 등 활용
- **Event Handling**: @click, @keydown 이벤트 처리
- **Lifecycle Hooks**: onMounted를 통한 초기화
- **Next Tick**: nextTick()으로 DOM 업데이트 후 작업 처리

## 🚀 GitHub Pages 자동 배포

GitHub Actions를 통한 자동 배포가 설정되어 있습니다:

1. **코드 푸시**: main 브랜치에 푸시
2. **자동 빌드**: GitHub Actions가 자동으로 `npm run build` 실행
3. **자동 배포**: 빌드된 dist 폴더를 gh-pages 브랜치에 배포
4. **배포 완료**: `https://username.github.io/repository-name` 에서 확인

### 수동 배포 방법

```bash
# 빌드
npm run build

# Git 설정
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

## 📂 프로젝트 구조

```
vue-tab-project/
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Actions 배포 설정
├── src/
│   ├── App.vue              # 메인 Vue 컴포넌트
│   ├── main.js              # Vue 앱 엔트리 포인트
│   └── style.css            # 전역 스타일
├── index.html               # HTML 템플릿
├── vite.config.js           # Vite 설정
├── package.json             # 프로젝트 설정 및 의존성
└── README.md                # 프로젝트 설명서
```

## 🎯 Vue.js 학습 포인트

이 프로젝트를 통해 다음을 학습할 수 있습니다:

- **Vue.js 3 Composition API** 사용법
- **반응형 데이터 바인딩**과 상태 관리
- **컴포넌트 기반 개발** 방식
- **Vue 디렉티브**와 이벤트 처리
- **라이프사이클 훅** 활용
- **Vite**를 통한 모던 개발 환경
- **GitHub Actions**를 통한 CI/CD

## 🔧 커스터마이징

- `src/App.vue`의 `tabs` 데이터를 수정하여 탭 내용 변경
- `src/style.css`에서 색상, 폰트, 레이아웃 조정
- `vite.config.js`에서 빌드 설정 변경

## 🆚 기존 바닐라 JS 버전과의 차이점

### 장점
- **반응형 데이터**: 상태 변경 시 자동 UI 업데이트
- **컴포넌트 기반**: 재사용 가능하고 관리하기 쉬운 코드
- **선언적 렌더링**: 템플릿 기반의 직관적인 UI 작성
- **개발 도구**: Vue DevTools, HMR 등 강력한 개발 환경

### 개선사항
- DOM 조작 코드 제거 (Vue가 자동 처리)
- 상태 관리 로직 단순화
- 코드 가독성 및 유지보수성 향상
- 타입스크립트 지원 (확장 가능)

## 📝 라이선스

이 프로젝트는 학습 목적으로 자유롭게 사용하실 수 있습니다.
