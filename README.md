
# 리소스 대시보드

Next.js 기반 리소스 시각화 대시보드 프로젝트입니다.  
반응형 UI, CSS 변수 기반 디자인 시스템, Tailwind 커스터마이징 구조를 적용했습니다.

링크
배포 URL: https://resource-utilization-dashboard.vercel.app

Sitemap: [sitemap.xml](https://resource-utilization-dashboard.vercel.app/sitemap.xml)

Robots.txt: [robots.txt](https://resource-utilization-dashboard.vercel.app/robots.txt)

---

## 🧭 페이지 구성

### 🏠 대시보드 홈 `/`

리소스 분석의 시작점으로, 전체 흐름을 안내하는 역할을 하는 메인 페이지입니다.

- 최근 리소스 항목들을 시간 순으로 정리된 스냅샷 형태로 보여줍니다
- 상단의 안내문과 버튼으로 하위 페이지로 진입 유도 (Dashboard / Resource)
<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/8b9ffb8d-3479-4519-9869-b21b25496440" />


### 📊 분석 대시보드 `/dashboard`
리소스 지표를 카드 및 차트 형태로 시각적으로 분할하여 보여줍니다.
<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/236fe28e-8090-4c94-8bff-7f27738415a6" />

### 📋 리소스 테이블 `/resource`
최근 리소스 상태를 시계열 기준으로 정리한 테이블 형태로 확인할 수 있습니다.
<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/3f933a90-ca06-4415-885c-6139b98677e5" />


## 🚀 실행 방법

```bash
npm install
npm run dev
```
## 🔐 환경 변수 설정 (.env.local)

다음 환경 변수를 반드시 설정해야 Supabase 연동이 정상 작동합니다.

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ROLE_KEY=your-service-role-api-key
```
👉 브라우저에서 http://localhost:3000 열기

👉 app/page.tsx 수정으로 바로 업데이트 반영됨



## 🧩 기술 스택
- Next.js (App Router)
- TypeScript
- Tailwind CSS (screens 커스텀 + CSS 변수)
- FontAwesome
- Chart.JS

## 📂 프로젝트 디렉토리 구조 (src/)
```
src/
├── app/                                 # 주요 애플리케이션 폴더
│   ├── api/                             # API 라우트 정의
│   │   ├── average-chart/               # 평균 차트 데이터 API
│   │   ├── resource-data/               # 리소스 테이블 API
│   │   ├── usage-chart/                 # 사용량 차트 API
│   │   └── workload-allocation/         # 작업 분배 차트 API
│   ├── components/                      # UI 컴포넌트
│   │   ├── Cards/                       # 카드 컴포넌트
│   │   ├── Charts/                      # 차트 컴포넌트
│   │   ├── Sidebars/                    # 사이드바 컴포넌트
│   │   └── Tables/                      # 테이블 컴포넌트
│   ├── dashboard/                       # 대시보드 페이지
│   ├── favicon.ico                      # 사이트 아이콘
│   ├── globals.css                      # 글로벌 스타일
│   ├── layout.tsx                       # 공통 레이아웃
│   ├── lib/                             # 서버 사이드 데이터 로딩 및 유틸리티
│   │   ├── dashboard-data.ts            # 대시보드 관련 데이터 처리
│   │   └── resource-preview.ts          # 리소스 미리보기 관련 데이터 처리
│   ├── page.tsx                         # 메인 페이지
│   ├── resource/                        # 리소스 페이지
│   ├── styles/                          # SCSS 및 Tailwind 스타일
│   │   ├── components/                  # 컴포넌트 스타일
│   │   ├── index.css                    # Notus NextJS 템플릿 파일
│   │   └── tailwind.css                 # Notus NextJS 템플릿 파일
│   └── types/                           # 타입 정의
│       ├── dashboard.ts
│       ├── resource-preview.ts
│       └── resource.ts
└── utils/
    └── supabase/                        # Supabase 관련 유틸
        └── server.ts
```

## 📦 Kaggle 데이터 전처리 요약
https://www.kaggle.com/code/jaehyukj3/resource-utilization-data
### 1️⃣ 컬럼 정리 및 기본 타입 변환
- Resource Allocation → resource_allocation 으로 컬럼명 정비
- 'timestamp' 컬럼을 datetime 타입으로 변환 → errors='coerce'로 예외 처리
- 변환 실패한 NaT 값 제거 후 타입 확인
### 2️⃣ 결측치 처리
- 주요 수치형 컬럼:
- cpu_utilization, memory_usage, storage_usage, workload, resource_allocation
- 처리 순서:
- ffill()로 forward fill → 여전히 남은 결측치는 .mean()으로 평균 대체
- 처리 전/후 결측치 수량 출력으로 로그 확인
### 3️⃣ 이상치 탐지 및 제거
- 대상 컬럼:
- cpu_utilization, memory_usage, storage_usage, resource_allocation
- 방식:
- zscore() 활용 → Z-score가 3 이상이면 이상치로 판단
- 해당 값 NaN 처리 후 결측치와 동일하게 채움 (ffill + mean)
### 4️⃣ 값 클리핑 처리
- 대상 metric:
- cpu_utilization, storage_usage, workload
- 방식:
- 상한선 100 기준으로 초과값 클리핑 (np.clip)
- 초과값 개수 로그 출력
### 5️⃣ 파생 변수 생성
| 컬럼명 | 내용 |
|---|---|
| date_only | 날짜만 추출 (YYYY-MM-DD) | 
| hour_of_day | 시간대 추출 (0~23시) | 
| day_of_week | 요일명 추출 (ex. Monday) | 
| day_index | 요일 숫자 (0~6) | 

### 6️⃣ 시간 정렬 및 인덱스 초기화
- timestamp 기준 오름차순 정렬
### 7️⃣ ID 컬럼 생성
- df.index 기반으로 id 컬럼 생성 후 맨 앞으로 이동
### 8️⃣ 전처리 결과 출력 및 저장
- .head(), .info(), .describe() 호출로 전체 정보 확인
- 최종 파일 이름: 'processed_resource_data.csv'

### 🧪 주요 전처리 코드 요약

```
df['timestamp'] = pd.to_datetime(df['timestamp'], errors='coerce')
df.dropna(subset=['timestamp'], inplace=True)

for col in target_columns:
    df[col] = df[col].ffill().fillna(df[col].mean())

z = np.abs(zscore(df[col]))
df.loc[z > 3, col] = np.nan

df['date_only'] = df['timestamp'].dt.date
df.sort_values(by='timestamp', inplace=True)

df['id'] = df.index
df.to_csv("processed_resource_data.csv", index=False)
```
## 🛠 Supabase 연동 및 사용 구조
프로젝트에서는 Supabase를 데이터 저장소 및 SQL 함수 기반 분석 API로 사용합니다.

프론트엔드에서는 두 가지 방식으로 Supabase 데이터를 가져옵니다.

## ✅ 1. 커스텀 SQL 함수 호출 (RPC)
클라이언트에서는 .rpc()를 통해 Supabase 내 정의된 SQL 함수들을 호출합니다.
```
// GET /api/chart?group=hour_of_day
const RPC_MAP: Record<string, string> = {
  hour_of_day: "get_hourly_avg",
  month_day: "get_avg_by_day",
  day_index: "get_weekday_avg",
};

const supabase = await createClient();
const { data, error } = await supabase.rpc(RPC_MAP[group ?? "hour_of_day"]);
```
📌 get_hourly_avg, get_avg_by_day, get_weekday_avg는 모두 Supabase에서 정의한 SQL 함수

📊 시간/날짜/요일 단위 리소스 사용량을 시각화할 때 사용

### ✅ 2. 직접 SQL 쿼리
데이터 리스트나 최근 항목 조회 시 .from(...).select(...).order(...).limit(...) 형식으로 테이블 쿼리 사용:
```
const { data: resources } = await supabase
  .from("resources")
  .select("*")
  .order("date_only", { ascending: false })
  .order("hour_of_day", { ascending: false })
  .limit(10);
```
📌 리소스 테이블에서 최신 순으로 10개 항목을 가져와 렌더링

📌 리소스 상세/테이블 목록 화면 등에서 사용됨

### 🧠 커스텀 함수 목적 요약
| 함수명 | 기능 | 
|---|---|
| get_hourly_avg() | 시간대별 평균 리소스 사용량 | 
| get_avg_by_day() | 월/일 기준 평균 사용량 | 
| get_weekday_avg() | 요일 기준 평균 사용량 | 
| get_change_indicators() | CPU/Memory/Storage 증감률 + 상태 계산 | 
| get_workload_allocation_ranges() | 최근 24h / 168h의 workload, resource_allocation 데이터 | 

## 🎨 디자인 시스템
### ✅ Tailwind 커스텀 브레이크포인트
```
@theme {
  --breakpoint-compact: 460px;
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
  --breakpoint-wide: 1720px;
}
```

## 🔍 SEO 최적화 작업
해당 프로젝트는 검색 엔진에 잘 노출되도록 다음과 같은 SEO 최적화를 적용했습니다:

### ✅ 1. 메타데이터 설정 (generateMetadata)

Next.js 13+의 app/ 디렉토리 구조를 기반으로, 각 페이지별 generateMetadata() 함수 또는 metadata 객체 사용

title, description, openGraph 등의 정보 명시로 검색 결과 및 소셜 미리보기 향상

```
export const metadata = {
  title: "리소스 대시보드",
  description: "리소스 데이터를 시각화하는 Next.js 기반 대시보드",
  openGraph: {
    title: "리소스 대시보드",
    description: "리소스 데이터를 시각화하는 Next.js 기반 대시보드",
    url: "https://resource-utilization-dashboard.vercel.app",
    siteName: "Resource Nextjs",
    locale: "ko-KR",
    type: "website",
  },
};
```
### ✅ 2. Google Search Console 등록
Google 사이트 소유권 확인을 위해 google-site-verification 메타태그 삽입

```
verification: {
  google: "lfUFCPYeSMM84AxR75MmurPWqk5Dp5fxXXogK6czTLA",
}
```
Google Search Console을 통해 사이트 등록 및 색인 요청

### ✅ 3. 자동 Sitemap 및 Robots 설정
next-sitemap 라이브러리 사용

/sitemap.xml, /robots.txt 자동 생성 및 배포

검색 봇이 사이트 구조를 쉽게 파악할 수 있도록 설정

robots.txt 예시

```
# *
User-agent: *
Allow: /

# Host
Host: https://resource-utilization-dashboard.vercel.app

# Sitemaps
Sitemap: https://resource-utilization-dashboard.vercel.app/sitemap.xml
```
```
