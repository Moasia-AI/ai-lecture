# 작은대학교 AI학과

AI 시대를 매일 짧게 공부하는 공간. 교회 청년/청장년부 대상.

## 어떻게 쓰나요

### 1. 로컬에서 미리보기

```bash
npm run dev
```

브라우저에서 http://localhost:3000 을 열면 됩니다.

### 2. 새 글 올리기 (가장 중요)

`content/posts/` 폴더에 **마크다운(.md) 파일을 하나 추가**하면 끝입니다.

파일명은 `YYYY-MM-DD-slug.md` 형식을 추천합니다. (예: `2026-10-30-what-is-ai.md`)

파일 맨 위에 **frontmatter** 를 꼭 붙여주세요:

```markdown
---
title: "글 제목"
date: "2026-10-30"
summary: "목록 카드에 보일 1~2줄 요약"
tags: ["태그1", "태그2"]
---

여기부터 본문 마크다운.
```

- `title` : 글 제목
- `date` : 날짜 (YYYY-MM-DD). **이 날짜 순으로 정렬**됩니다.
- `summary` : 목록에 미리 보여줄 요약 (생략하면 본문 앞부분이 쓰입니다)
- `tags` : 태그 (생략 가능)

### 3. 글의 서식 (팁)

- `**굵게**` → 중요한 포인트 (주황색으로 강조됨)
- `*기울임*` → 하이라이트 (배경 강조)
- `## 소제목` → 섹션 나누기 (스캔하기 쉽게)
- `- 리스트` → 긴 문장 대신 리스트로 (카톡에서 안 읽히는 이유를 해결)
- `> 인용` → 다른 사람 말, 중요 문장

**짧게, 소제목으로 끊어서 쓰세요.** 카톡에서 긴 글 안 읽히는 걸 해결하려고 만든 사이트니까요.

## 사이트 이름/소개 바꾸기

`site.config.ts` 파일 하나만 수정하면 됩니다.

```ts
export const siteConfig = {
  name: "작은대학교 AI학과",
  tagline: "AI 시대, 하루 3분으로 준비합니다",
  description: "...",
  // ...
};
```

## 배포 (Vercel)

1. 이 폴더를 GitHub에 올립니다.
2. [vercel.com](https://vercel.com) 에서 GitHub 레포지토리를 import.
3. 자동으로 빌드 → 배포 → 도메인이 나옵니다.
4. 이후 **git push 할 때마다 자동 재배포**됩니다.

나중에 `ai.littleuniv.com` 같은 서브도메인을 Vercel 대시보드에서 연결할 수 있습니다.

## 폴더 구조

```
ai-lecture/
├── app/
│   ├── layout.tsx            # 공통 레이아웃 (헤더/푸터)
│   ├── page.tsx              # 홈 (글 목록)
│   ├── posts/[slug]/page.tsx # 글 상세
│   └── globals.css           # 글로벌 스타일
├── content/posts/            # ⭐ 글은 여기에
│   └── *.md
├── lib/posts.ts              # 마크다운 처리 로직
├── site.config.ts            # 사이트 설정
└── ...
```
