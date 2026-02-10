# ResumeForge - AI 취업 서류 자동 생성

**클릭 몇 번으로 이력서와 자기소개서를 자동 생성하는 AI 서비스**

🚀 **Production:** https://resumeforge-silk.vercel.app

---

## 🎯 주요 기능

- ✅ **AI 이력서 생성** - Claude AI로 전문적인 이력서 자동 작성
- ✅ **AI 자기소개서 생성** - 지원 동기부터 포부까지 자동 생성
- ✅ **간편한 입력 폼** - 학력, 경력, 스킬 등 필수 정보만 입력
- ✅ **즉시 결과 확인** - 생성 즉시 다운로드 및 수정 가능
- ✅ **무료 사용** - 베타 기간 중 무료 (유료 플랜 준비 중)

---

## 💼 타겟 사용자

- **취업 준비생** - 이력서/자소서 작성 시간 단축
- **이직 준비자** - 빠르게 서류 준비
- **대학생** - 첫 취업 서류 작성 가이드

**한국 시장:** 청년 미취업 54.4%, 취준생 약 300만 명

---

## 📊 경쟁 우위

| 기존 서비스 | ResumeForge |
|------------|-------------|
| 분석/첨삭만 제공 | **자동 생성** |
| 여전히 수동 작성 필요 | **클릭 몇 번으로 완성** |
| 템플릿 제공 | **AI가 맞춤 작성** |

---

## 🛠️ 기술 스택

- **Frontend:** Next.js 14 + TypeScript + Tailwind CSS
- **AI:** Anthropic Claude 3.5 Sonnet
- **Database:** Supabase (PostgreSQL)
- **Deployment:** Vercel
- **Auth:** Supabase Auth (향후 추가)

---

## 🚀 배포 및 개발

### 로컬 개발
```bash
npm install
npm run dev
# http://localhost:3000
```

### 환경 변수
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
ANTHROPIC_API_KEY=your_anthropic_api_key
```

### 배포
```bash
npm run build
vercel --prod
```

---

## 💰 수익 모델 (준비 중)

- **Free Tier:** 월 3회 생성 무료
- **Pro Plan:** 월 19,900원 - 무제한 생성, 템플릿 추가, 면접 Q&A
- **Enterprise:** 기업 대량 구독

**예상 마진:** 75%

---

## 📈 로드맵

### Phase 1 (완료)
- [x] MVP 개발
- [x] AI 이력서/자소서 생성 기능
- [x] Vercel 배포

### Phase 2 (진행 중)
- [ ] 사용자 인증 (Supabase Auth)
- [ ] 템플릿 라이브러리
- [ ] PDF 다운로드 기능
- [ ] 면접 Q&A 생성

### Phase 3 (계획)
- [ ] 유료 플랜 출시
- [ ] SEO 최적화
- [ ] 커뮤니티 마케팅 (블라인드, 대학 커뮤니티)
- [ ] 앱스토어 출시 (PWA)

---

## 🎨 스크린샷

### 1. 메인 화면
- 간결한 입력 폼
- 단계별 가이드

### 2. 결과 화면
- 이력서 자동 생성
- 자기소개서 즉시 확인

---

## 📞 문의

- **GitHub:** https://github.com/pluto-oc/resumeforge
- **Email:** support@resumeforge.app (준비 중)

---

## 📄 라이선스

MIT License

Copyright (c) 2026 Pluto OC

---

**Built with ❤️ by Pluto**

**Part of Ave Ecosystem** 🌐
