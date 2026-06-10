// src/lib/orchestrator/DEPLOYMENT.md
// Deployment and Operations Guide

## Deployment Overview

The Advanced Multi-Agent Orchestrator can be deployed in various environments:
- **Development**: Local execution with mock services
- **Staging**: Full feature set with limited resources
- **Production**: Scalable, resilient deployment

## Environment Setup

### Development Environment

```bash
# Clone repository
git clone <repo-url>
cd magnifai-growth-success-brand-magnifiers

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

### Environment Variables

```bash
# OpenAI API (optional, defaults to other providers)
OPENAI_API_KEY=sk-...

# Anthropic API (optional)
ANTHROPIC_API_KEY=sk-ant-...

# Google Gemini API (optional)
GOOGLE_API_KEY=AIzaSy...

# Cost tracking
DAILY_BUDGET=100
MONTHLY_BUDGET=1000
PER_USER_BUDGET=50

# Redis (optional, for production)
REDIS_URL=redis://localhost:6379

# Qdrant (optional, for production)
QDRANT_URL=http://localhost:6333

# Logging
LOG_LEVEL=info
```

## Local Development

### Running Tests

```bash
# Run all tests
npm test

# Run orchestrator tests specifically
npm test -- orchestrator

# Run with coverage
npm test -- --coverage
```

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

## Production Deployment

### Option 1: Vercel (Recommended for Next.js)

1. **Connect repository** to Vercel
2. **Configure environment variables** in Vercel dashboard
3. **Deploy** automatically on push to main branch

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Option 2: Docker

```dockerfile
# Dockerfile
FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy application
COPY . .

# Build TypeScript
RUN npm run build

# Run application
CMD ["npm", "start"]
```

```bash
# Build image
docker build -t magnifai-orchestrator .

# Run container
docker run -p 3000:3000 \
  -e OPENAI_API_KEY=sk-... \
  -e DAILY_BUDGET=100 \
  magnifai-orchestrator
```

### Option 3: Kubernetes

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: orchestrator
spec:
  replicas: 3
  selector:
    matchLabels:
      app: orchestrator
  template:
    metadata:
      labels:
        app: orchestrator
    spec:
      containers:
      - name: orchestrator
        image: magnifai/orchestrator:latest
        ports:
        - containerPort: 3000
        env:
        - name: OPENAI_API_KEY
          valueFrom:
            secretKeyRef:
              name: api-keys
              key: openai-key
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
---
apiVersion: v1
kind: Service
metadata:
  name: orchestrator-service
spec:
  selector:
    app: orchestrator
  ports:
  - port: 80
    targetPort: 3000
```

## Scaling

### Horizontal Scaling

```bash
# Vercel: Automatic

# Docker: docker-compose
version: '3.8'
services:
  orchestrator:
    image: magnifai-orchestrator
    deploy:
      replicas: 4

# Kubernetes: kubectl scale
kubectl scale deployment orchestrator --replicas=5
```

### Vertical Scaling

```yaml
# Kubernetes resources
resources:
  requests:
    memory: "512Mi"
    cpu: "500m"
  limits:
    memory: "1Gi"
    cpu: "1000m"
```

## Monitoring

### Metrics to Track

1. **Request Metrics**
   - Requests per minute
   - Average response time
   - Error rate
   - Success rate

2. **Cost Metrics**
   - Daily spending
   - Cost per request
   - Budget utilization

3. **Agent Metrics**
   - Tasks completed per agent
   - Success rate per agent
   - Average latency per agent

4. **Memory Metrics**
   - Memory utilization
   - Query performance
   - Cache hit rate

### Logging

```bash
# View logs (Vercel)
vercel logs

# Docker logs
docker logs orchestrator

# Kubernetes logs
kubectl logs -l app=orchestrator
```

### Alerts

Set up alerts for:
- Error rate > 5%
- Daily budget > 80% utilized
- Response time > 5 seconds
- Memory usage > 80%

## Performance Optimization

### Caching

```typescript
// Implement response caching
const cache = new Map<string, any>();

async function cachedExecute(task: Task) {
  const key = JSON.stringify(task);
  
  if (cache.has(key)) {
    return cache.get(key);
  }
  
  const result = await executeTask(task);
  cache.set(key, result);
  
  return result;
}
```

### Connection Pooling

```typescript
// Reuse connections
const agent = new Agent({
  // Reuse HTTP client
  httpAgent: new https.Agent({ keepAlive: true }),
});
```

### Batch Processing

```typescript
// Process multiple tasks efficiently
const results = await Promise.allSettled(
  tasks.map(task => orchestrator.run(task))
);
```

## Backup and Recovery

### Regular Backups

```bash
# Redis backup
redis-cli SAVE

# Database backup
pg_dump orchestrator > backup.sql
```

### Disaster Recovery

1. **Multi-region deployment**
2. **Automated failover**
3. **Regular backup testing**
4. **Documented recovery procedures**

## Security

### API Key Management

```bash
# Use secret management
# AWS Secrets Manager, HashiCorp Vault, etc.

# Never commit keys
git rm --cached .env.local
echo ".env.local" >> .gitignore
```

### Access Control

```typescript
// Implement authentication
const auth = require('express-jwt');

app.use(auth({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256']
}));
```

### Rate Limiting

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);
```

## Troubleshooting

### High Latency

**Causes:**
- API rate limits
- Network issues
- Large task complexity

**Solutions:**
- Implement caching
- Increase timeouts
- Optimize task decomposition

### High Costs

**Causes:**
- Expensive models
- Too many retries
- Inefficient decomposition

**Solutions:**
- Use cheaper models
- Adjust maxRetries
- Optimize task splitting

### Memory Issues

**Causes:**
- Large context windows
- Memory leaks
- Unbounded caches

**Solutions:**
- Implement TTL
- Regular cleanup
- Monitor memory usage

## Maintenance

### Regular Tasks

- **Daily**: Check logs, monitor costs
- **Weekly**: Review performance metrics
- **Monthly**: Update dependencies
- **Quarterly**: Security audit

### Updates

```bash
# Update dependencies
npm update

# Check for vulnerabilities
npm audit

# Test after updates
npm test
```

## Support

### Documentation

- [API Reference](./API_REFERENCE.md)
- [Usage Examples](./advanced-patterns.ts)
- [Implementation Details](./IMPLEMENTATION_SUMMARY.md)

### Getting Help

- Check logs for errors
- Review monitoring dashboards
- Consult API documentation
- Contact support if needed

## Conclusion

This deployment guide provides everything needed to run the orchestrator in production. The system is designed to be:

- **Scalable**: Handle increasing loads
- **Reliable**: With comprehensive error handling
- **Observable**: Full monitoring and logging
- **Secure**: Proper authentication and rate limiting
- **Maintainable**: Clear documentation and procedures

For questions or issues, refer to the documentation or contact the support team.
