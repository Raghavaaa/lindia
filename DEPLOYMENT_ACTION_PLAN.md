# 🚀 Deployment Action Plan - October 18, 2025

## Current Status Summary

### ✅ Already Deployed
1. **Backend API (lindia-b)**: `https://api.legalindia.ai` ✅
2. **Frontend (lindia-f)**: `https://www.legalindia.ai` ✅
3. **Database (lindia-db)**: PostgreSQL on Railway ✅

### ❌ Not Deployed
4. **AI Engine (lindia-ai)**: Local only ❌

---

## 📋 Step-by-Step Deployment Guide

### Step 1: Commit Main Repository Changes ⏳

Your main repo has:
- 68 commits ahead of origin/main
- Staged changes: ai-engine submodule, frontend/DEPLOYMENT_FIX.md, frontend/vercel.json

**Commands:**
```bash
cd /Users/raghavankarthik/ai-law-junior

# Commit the staged changes
git commit -m "chore: update ai-engine submodule and frontend deployment config"

# Push all 68 commits + the new one
git push origin main
```

---

### Step 2: Push AI Engine to GitHub

The ai-engine submodule needs to be pushed to its remote repository.

**Commands:**
```bash
cd /Users/raghavankarthik/ai-law-junior/ai-engine

# Check status
git status

# If there are commits, push them
git push origin main
```

---

### Step 3: Deploy AI Engine to Railway

**Option A: Via Railway Dashboard (Easiest)**

1. Go to https://railway.app/new
2. Click **"Deploy from GitHub repo"**
3. Select repository: `Raghavaaa/lindia-ai`
4. Railway will auto-detect `Procfile` and deploy
5. Set environment variables in Railway dashboard:
   ```
   MODEL_PROVIDER=InLegalBERT
   BACKEND_URL=https://api.legalindia.ai
   ENVIRONMENT=production
   PORT=8080
   ```
6. Get your deployment URL (e.g., `https://lindia-ai-production.up.railway.app`)

**Option B: Via Railway CLI**

```bash
cd /Users/raghavankarthik/ai-law-junior/ai-engine

# Install Railway CLI (if not installed)
npm install -g @railway/cli

# Login
railway login

# Initialize and link
railway init

# Deploy
railway up
```

---

### Step 4: Update Backend Configuration

After AI engine is deployed, update your backend to use the new URL.

**Update Backend Environment Variable:**

1. Go to Railway dashboard → Backend service
2. Add/update environment variable:
   ```
   AI_ENGINE_URL=https://lindia-ai-production.up.railway.app
   ```
3. Redeploy backend (automatic on Railway)

**Or update locally in backend code:**
```bash
cd /Users/raghavankarthik/ai-law-junior/app
# Edit .env or config file with new AI_ENGINE_URL
```

---

### Step 5: Test AI Integration

Once deployed, test the complete flow:

```bash
# Test 1: Check AI engine health
curl https://lindia-ai-production.up.railway.app/health

# Expected response:
# {
#   "status": "ok",
#   "model_provider": "InLegalBERT",
#   "service": "ai-engine",
#   "uptime_seconds": 123.45
# }

# Test 2: Test inference endpoint
curl -X POST https://lindia-ai-production.up.railway.app/inference \
  -H "Content-Type: application/json" \
  -d '{"query": "What is Section 420 IPC?"}'

# Test 3: Test via backend
curl -X POST https://api.legalindia.ai/api/v1/junior/chat \
  -H "X-API-Key: legalindia_secure_api_key_2025" \
  -H "Content-Type: application/json" \
  -d '{"question": "Explain IPC Section 420", "conversation_id": "test-001"}'
```

---

## 🔍 Troubleshooting

### Issue: "Connection refused" to AI engine

**Solution:**
- Check AI engine is running on Railway
- Verify environment variable `AI_ENGINE_URL` in backend
- Check Railway logs: `railway logs -s ai-engine`

### Issue: Backend can't reach AI engine

**Solution:**
- Ensure AI engine URL doesn't have trailing slash
- Check CORS settings in AI engine
- Verify backend has correct URL in environment

### Issue: 68 commits won't push

**Solution:**
```bash
# Check which remote you're pushing to
git remote -v

# Force push if needed (be careful!)
git push origin main --force
```

---

## 📊 Deployment Checklist

- [ ] Main repo changes committed
- [ ] Main repo pushed to GitHub (69 total commits)
- [ ] AI engine pushed to lindia-ai repo
- [ ] AI engine deployed to Railway
- [ ] AI engine health check passing
- [ ] Backend updated with AI_ENGINE_URL
- [ ] Backend redeployed
- [ ] End-to-end test successful
- [ ] Frontend can access AI features

---

## 🎯 Expected Final State

### All Services Running:

```
┌─────────────────────────────────────────┐
│  Frontend: www.legalindia.ai (Vercel)   │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│  Backend: api.legalindia.ai (Railway)   │
└─────┬──────────────────────┬────────────┘
      │                      │
      ▼                      ▼
┌─────────────┐    ┌──────────────────────┐
│ PostgreSQL  │    │ AI Engine (Railway)  │
│  (Railway)  │    │ lindia-ai-prod       │
└─────────────┘    └──────────────────────┘
```

### Service URLs:
- Frontend: `https://www.legalindia.ai`
- Backend: `https://api.legalindia.ai`
- AI Engine: `https://lindia-ai-production.up.railway.app` (or custom domain)
- Database: Internal Railway connection

---

## 💡 Next Steps After Deployment

1. **Set up custom domain for AI engine** (optional)
   - In Railway: Settings → Domains → Add custom domain
   - Example: `ai.legalindia.ai`

2. **Configure monitoring**
   - Set up Railway monitoring
   - Add Sentry for error tracking
   - Set up uptime monitoring (UptimeRobot, etc.)

3. **Integrate actual AI models**
   - Replace placeholder responses
   - Add InLegalBERT model
   - Set up vector database (Pinecone/Weaviate)

4. **Documentation**
   - Update API documentation
   - Add AI endpoint examples
   - Create integration guides

---

**Created:** October 18, 2025  
**Status:** Ready to Execute  
**Estimated Time:** 30-45 minutes total

