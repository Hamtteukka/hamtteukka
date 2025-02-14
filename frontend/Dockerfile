# syntax=docker/dockerfile:1

### Base 이미지 설정
FROM node:20-alpine AS base
# libc6-compat 설치 (일부 의존성이 필요할 수 있음)
RUN apk add --no-cache libc6-compat
WORKDIR /app

### 의존성 설치 단계
FROM base AS deps
# lockfile 존재 여부에 따라 npm, yarn, pnpm 중 하나로 설치합니다.
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN \
  if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm install --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

### 빌드 단계
FROM base AS builder
WORKDIR /app
# 이전 단계에서 설치한 node_modules 복사
COPY --from=deps /app/node_modules ./node_modules
# 전체 소스코드 복사
COPY . .
# package.json의 build 스크립트를 실행 (즉, next build)
RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

### 런타임(프로덕션) 단계
FROM node:20-alpine AS runner
WORKDIR /app
# NODE_ENV 설정
ENV NODE_ENV=production
# 보안을 위해 별도의 사용자/그룹 생성
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
# 빌드 산출물 복사  
# public 폴더 (정적 파일)
COPY --from=builder /app/public ./public
# Next.js 빌드 결과 (.next 폴더)
COPY --from=builder /app/.next ./.next
# 실행에 필요한 package.json (예: "start" 스크립트)
COPY --from=builder /app/package.json ./package.json
# 빌드 단계에서 설치한 node_modules도 복사 (next start 실행 시 필요)
COPY --from=builder /app/node_modules ./node_modules
# 권한 변경 (nextjs 사용자로 실행)
USER nextjs
# 컨테이너 포트 노출
EXPOSE 3000
# 프로덕션 서버 실행 (package.json의 start 스크립트: "next start")
CMD ["yarn", "start"]
