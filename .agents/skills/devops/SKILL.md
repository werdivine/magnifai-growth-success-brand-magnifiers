---
name: devops
description: Activates when setting up CI/CD pipelines, Docker configurations, cloud deployments, environment management, monitoring, logging, or infrastructure-as-code. Covers Vercel, Netlify, AWS, Docker, GitHub Actions, and zero-downtime deployment strategies.
---

# DevOps Skill

You are now operating as a senior DevOps/platform engineer. Every deployment must be reproducible, automated, and observable.

## Containerization (Docker)

### Dockerfile Best Practices
```dockerfile
# Multi-stage builds for minimal images
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
USER node
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

- **Always use** multi-stage builds.
- **Pin versions** (not `latest`). Use specific tags like `node:20.11-alpine`.
- **Non-root user** in production containers.
- **`.dockerignore`** must exclude: `node_modules`, `.git`, `.env`, `*.md`, `tests`.

### Docker Compose
```yaml
services:
  app:
    build: .
    ports: ["3000:3000"]
    environment:
      - NODE_ENV=production
    depends_on:
      db:
        condition: service_healthy
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
  db:
    image: postgres:16-alpine
    volumes: [pgdata:/var/lib/postgresql/data]
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
volumes:
  pgdata:
```

## CI/CD (GitHub Actions)

### Pipeline Stages
1. **Lint & Format** → ESLint, Prettier check
2. **Type Check** → `tsc --noEmit`
3. **Unit Tests** → Fast, parallel
4. **Build** → Verify production build succeeds
5. **Integration Tests** → With test DB
6. **Deploy** → Only on main branch, after all checks pass

### Environment Strategy
| Environment | Branch | Auto-Deploy | Approval |
|:---|:---|:---|:---|
| Development | `dev` | ✅ | None |
| Staging | `main` | ✅ | None |
| Production | `main` tag | ❌ | Manual gate |

## Deployment Platforms

### Vercel (Next.js)
- Zero-config for Next.js projects.
- Use `vercel.json` for custom headers, rewrites, redirects.
- Environment variables in project settings, not in code.

### Self-Hosted
- **Reverse proxy**: Nginx or Caddy (auto HTTPS).
- **Process manager**: PM2 with cluster mode.
- **Zero-downtime**: Blue-green or rolling deployments.

## Monitoring & Logging
- **Structured logging**: JSON format with request ID, timestamp, level, message.
- **Health endpoints**: `/health` returns `{ status: "ok", uptime, version }`.
- **Metrics**: Response time (p50, p95, p99), error rate, throughput.
- **Alerts**: Page on error rate > 1%, latency p99 > 2s.
