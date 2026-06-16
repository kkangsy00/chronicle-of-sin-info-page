# chronicle-of-sin-info-page

TRPG 시나리오 「죄의 연대기」 플레이어 캐릭터의 아카이브 페이지입니다.
Vue.js 3로 제작된 단일 페이지 애플리케이션(SPA)으로, 별도 라우터 없이 상태 기반 화면 전환(`App.vue`의 `navigateTo`)으로 동작합니다.

## 페이지 구성

| 페이지 | 컴포넌트 | 설명 |
| --- | --- | --- |
| Home | `HomePage` | 메인 페이지 (각 페이지로 이동하는 진입점) |
| Info | `InfoPage` | 캐릭터 프로필 이미지 및 인물 정보 (탭, 이미지 선택, BGM 플레이어 포함) |
| Gallery | `GalleryPage` | 이미지 갤러리 |
| Links | `LinksPage` | 관련 링크 모음 |
| Scene | `ScenePage` | 장면 목록 |
| Hotspot | `HotspotPage` | 장면 내 핫스팟(상호작용 지점) 뷰 |
| Records | `RecordsPage` | 기록 목록 |
| Record Detail | `RecordDetailPage` | 기록 상세 |

### Info 페이지 하위 컴포넌트

`src/components/info/` — `CharacterTabs`, `CharacterImage`, `ImageSelector`, `InfoTabs`, `InfoContent`, `BgmPlayer`

## 기술 스택

- **Vue.js 3** (Composition API, `<script setup>`)
- **Vite 4** (개발 서버 / 번들러)
- **GitHub Pages** (호스팅)
- **GitHub Actions** / **gh-pages** (배포)

## 프로젝트 구조

```
chronicle-of-sin-info-page/
├── index.html
├── vite.config.js
├── public/              # 정적 에셋 (이미지, data/ JSON 등)
├── src/
│   ├── main.js          # 앱 진입점
│   ├── App.vue          # 루트 / 화면 전환 로직
│   ├── style.css
│   └── components/      # 페이지 및 하위 컴포넌트
└── dist/                # 빌드 산출물
```

## 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:5174)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## 배포

`main` 브랜치에 push하면 GitHub Actions(`.github/workflows/deploy.yml`)가 자동으로 빌드 후 GitHub Pages에 배포합니다.

수동 배포가 필요한 경우:

```bash
npm run deploy   # npm run build && gh-pages -d dist
```

배포 주소: https://kkangsy00.github.io/chronicle-of-sin-info-page/

> `vite.config.js`의 `base`는 `package.json`의 `homepage` 경로를 따릅니다. 다른 경로에 배포하려면 `VITE_BASE_PATH` 환경 변수로 재정의할 수 있습니다.

## 주의사항

- 본 프로젝트는 비영리 목적으로 제작되었습니다.
- 본 프로젝트는 크툴루의 부름 7판 팬메이드 시나리오 [「죄의 연대기」](https://www.postype.com/@guuk-in-polar/post/14306929)의 스포일러를 포함합니다.
- 디자인 요소는 모바일 게임 「회색도시 2」를 참고하여 제작되었습니다.

## 플레이어

- **KPC (박영숙/천진영)**: 덛
- **PC1 (강세현/양춘호)**: 밋쯔
- **PC2 (손효성/곽필종)**: 와이
- **PC3 (주대현/이념)**: 나랑
- **PC4 (심재경/홍경아)**: 비
- **PC5 (하인성/문성경)**: 2A
