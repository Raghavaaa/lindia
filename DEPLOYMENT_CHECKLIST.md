# ✅ Railway Deployment Checklist

Use this checklist when deploying LegalIndia.ai to Railway.

## Pre-Deployment

### 1. Code Preparation
- [x] All code changes committed to Git
- [x] Application builds successfully locally (`npm run build`)
- [x] No build errors or critical warnings
- [x] Railway configuration files present (`railway.json`)
- [x] Environment documentation exists (`.env.example`)

### 2. Environment Variables Preparation
Gather the following before deployment:

- [ ] **DEEPSEEK_API_KEY** - Get from [DeepSeek](https://platform.deepseek.com/)
- [ ] **ADMIN_SECRET** - Generate a secure random string
- [ ] **NODE_ENV** - Set to `production`

### 3. Railway Account Setup
- [ ] Railway account created at [railway.app](https://railway.app)
- [ ] GitHub repository connected
- [ ] Billing configured (if needed)

## Deployment Steps

### Step 1: Create Railway Project
- [ ] Log in to Railway dashboard
- [ ] Click "New Project"
- [ ] Select "Deploy from GitHub repo"
- [ ] Choose your `lindia` repository
- [ ] Confirm deployment

### Step 2: Configure Environment Variables
In Railway dashboard → Variables tab:

```bash
# Required
DEEPSEEK_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxx
NODE_ENV=production
NEXT_PUBLIC_FRONTEND_API_BASE=/api
NEXT_PUBLIC_FRONTEND_ENV=production

# Optional
ADMIN_SECRET=your_secure_secret_here
PROMPT_BASE=Refine and clarify the legal research query for Indian law.
```

- [ ] All required variables added
- [ ] Values verified (no typos)
- [ ] Variables saved

### Step 3: Initial Deployment
- [ ] Railway automatically starts deployment
- [ ] Build logs show no errors
- [ ] Build completes successfully
- [ ] Application starts without errors

### Step 4: Verify Deployment
- [ ] Application URL accessible (Railway provides this)
- [ ] Home page loads correctly
- [ ] Check health endpoint: `https://your-app.railway.app/api/health`
- [ ] Health check returns "healthy" status

## Post-Deployment Testing

### 1. Health Check
```bash
curl https://your-app.railway.app/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "...",
  "services": {
    "deepseek": "configured"
  }
}
```

- [ ] Health check returns 200 status
- [ ] All services show as "configured"

### 2. Application Testing
- [ ] Home page loads
- [ ] Navigation works (Property, Research, Case tabs)
- [ ] Research page accessible
- [ ] Can submit a research query
- [ ] AI response received successfully
- [ ] No console errors

### 3. API Testing
Test the research API:

```bash
curl -X POST https://your-app.railway.app/api/simple-research \
  -H "Content-Type: application/json" \
  -d '{"query": "What is the procedure for property registration in India?"}'
```

- [ ] API responds with 200 status
- [ ] Receives legal research response
- [ ] Response time acceptable (< 30s)

### 4. Monitoring Setup
- [ ] Railway logs accessible
- [ ] No error logs present
- [ ] Request logs showing correctly
- [ ] Memory usage acceptable (< 80%)

## Configuration Verification

### Railway Configuration
- [x] `railway.json` present
- [x] Health check path: `/api/health`
- [x] Build command: `npm ci --include=dev && npm run build`
- [x] Start command: `npm start`

### Next.js Configuration
- [x] `next.config.ts` optimized for production
- [x] Standalone output enabled
- [x] Security headers configured
- [x] Compression enabled

### API Routes
- [x] `/api/health` - Health check
- [x] `/api/research` - Main research endpoint
- [x] `/api/simple-research` - Simple research endpoint
- [x] All routes have error handling
- [x] All routes have logging

## Security Checklist

### Environment Variables
- [ ] API keys not committed to Git
- [ ] `.env` files in `.gitignore`
- [ ] Only `.env.example` committed
- [ ] Railway variables marked as sensitive

### Application Security
- [x] Security headers configured
- [x] No `X-Powered-By` header
- [x] CORS properly configured
- [x] Input validation on all endpoints

### Monitoring
- [ ] Railway monitoring enabled
- [ ] Health check running every 60s
- [ ] Logs being captured
- [ ] Error tracking configured

## Troubleshooting

If deployment fails, check:

1. **Build Errors**
   - [ ] Review Railway build logs
   - [ ] Test build locally: `npm ci --include=dev && npm run build`
   - [ ] Check for missing dependencies

2. **Runtime Errors**
   - [ ] Check Railway runtime logs
   - [ ] Verify environment variables set
   - [ ] Test health endpoint

3. **API Errors**
   - [ ] Verify `DEEPSEEK_API_KEY` is correct
   - [ ] Check DeepSeek API status
   - [ ] Review API error logs

4. **Performance Issues**
   - [ ] Check memory usage in Railway dashboard
   - [ ] Review request duration logs
   - [ ] Consider scaling up resources

## Documentation

### Files to Review
- [ ] `RAILWAY_DEPLOYMENT.md` - Complete deployment guide
- [ ] `IMPROVEMENTS_SUMMARY.md` - All improvements listed
- [ ] `README.md` - Project overview
- [ ] `.env.example` - Environment variables reference

## Success Criteria

Your deployment is successful when:

- ✅ Health check returns `"status": "healthy"`
- ✅ No errors in Railway logs
- ✅ Application accessible via Railway URL
- ✅ Research functionality works end-to-end
- ✅ Memory usage stable (< 256MB typically)
- ✅ Response times acceptable (< 30s for research)

## Next Steps (Optional)

After successful deployment:

- [ ] Set up custom domain
- [ ] Configure SSL certificate (automatic with Railway)
- [ ] Set up monitoring alerts
- [ ] Add database for persistence
- [ ] Implement Redis caching
- [ ] Set up CI/CD pipeline

## Support Resources

- **Railway Docs**: https://docs.railway.app
- **Railway Discord**: https://discord.gg/railway
- **DeepSeek API**: https://platform.deepseek.com/docs
- **Next.js Docs**: https://nextjs.org/docs

## Emergency Rollback

If you need to rollback:

1. Go to Railway dashboard
2. Select your service
3. Click "Deployments"
4. Find previous successful deployment
5. Click "Redeploy"

---

**Date**: ___________  
**Deployed By**: ___________  
**Railway URL**: ___________  
**Status**: ⬜ Success  ⬜ Failed  ⬜ Needs Review

