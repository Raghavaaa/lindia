# 🚂 Railway Deployment Guide - AI Engine

## Quick Deployment Steps

### **Option 1: Deploy via Railway Dashboard (Recommended - 10 minutes)**

#### Step 1: Login to Railway
1. Go to https://railway.app/
2. Click **"Login"** and sign in with GitHub
3. Click **"New Project"**

#### Step 2: Deploy from GitHub
1. Click **"Deploy from GitHub repo"**
2. Select repository: **`Raghavaaa/lindia-ai`**
3. Railway will automatically detect the repository

#### Step 3: Configure Service
Railway should auto-detect:
- ✅ `Procfile` - will use gunicorn with uvicorn workers
- ✅ `requirements.txt` - will install Python dependencies
- ✅ Python runtime

If not auto-detected, manually set:
- **Start Command**: `gunicorn -w 2 -k uvicorn.workers.UvicornWorker main:app`
- **Build Command**: `pip install -r requirements.txt`

#### Step 4: Set Environment Variables

In Railway Dashboard → Your Service → **Variables** tab, add:

```bash
# Required Variables
PORT=8080
ENVIRONMENT=production

# AI Configuration
MODEL_PROVIDER=InLegalBERT

# Backend Integration
BACKEND_URL=https://api.legalindia.ai

# Optional - for future use
# OPENAI_API_KEY=sk-...
# ANTHROPIC_API_KEY=...
# PINECONE_API_KEY=...
# PINECONE_ENVIRONMENT=...
```

**Important:** Railway automatically sets `PORT` - your app will use `$PORT` environment variable.

#### Step 5: Deploy!
1. Click **"Deploy"** or it may auto-deploy
2. Wait for build to complete (2-3 minutes)
3. Check deployment logs for errors

#### Step 6: Get Your Service URL
Once deployed, Railway provides a public URL:
- Format: `https://lindia-ai-production-xxxx.up.railway.app`
- Copy this URL - you'll need it for backend configuration

#### Step 7: Test Deployment
Open in browser or use curl:
```bash
# Test health endpoint
curl https://your-service-url.up.railway.app/health

# Expected response:
# {
#   "status": "ok",
#   "uptime_seconds": 123.45,
#   "model_provider": "InLegalBERT",
#   "service": "ai-engine"
# }
```

---

### **Option 2: Deploy via Railway CLI (Advanced)**

#### Step 1: Install Railway CLI
```bash
npm install -g @railway/cli
```

#### Step 2: Login
```bash
railway login
```

#### Step 3: Deploy
```bash
cd /Users/raghavankarthik/ai-law-junior/ai-engine

# Initialize Railway project
railway init

# Select "Create new project"
# Name it: "lindia-ai"

# Link to GitHub repo (optional)
railway link

# Deploy
railway up
```

#### Step 4: Set Environment Variables
```bash
railway variables set MODEL_PROVIDER=InLegalBERT
railway variables set BACKEND_URL=https://api.legalindia.ai
railway variables set ENVIRONMENT=production
```

#### Step 5: View Logs
```bash
railway logs
```

---

## 🔧 Post-Deployment Configuration

### Update Backend to Use AI Engine

#### Option A: Via Railway Dashboard
1. Go to your **Backend service** in Railway
2. Navigate to **Variables** tab
3. Add/Update:
   ```
   AI_ENGINE_URL=https://your-ai-service.up.railway.app
   ```
4. Redeploy backend (automatic)

#### Option B: Via Environment File
If your backend is on another platform:
1. Update `.env` or environment variables
2. Set `AI_ENGINE_URL=https://your-ai-service.up.railway.app`
3. Redeploy backend

---

## 🧪 Testing Your Deployment

### Test 1: Health Check
```bash
curl https://your-ai-service.up.railway.app/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "uptime_seconds": 456.78,
  "model_provider": "InLegalBERT",
  "service": "ai-engine",
  "timestamp": "2025-10-18T..."
}
```

### Test 2: Inference Endpoint
```bash
curl -X POST https://your-ai-service.up.railway.app/inference \
  -H "Content-Type: application/json" \
  -d '{
    "query": "What is Section 420 IPC?",
    "context": "Indian Penal Code"
  }'
```

**Expected Response:**
```json
{
  "status": "success",
  "query": "What is Section 420 IPC?",
  "response": "Section 420 of IPC deals with...",
  "model": "InLegalBERT",
  "timestamp": "2025-10-18T..."
}
```

### Test 3: Embeddings Endpoint
```bash
curl -X POST https://your-ai-service.up.railway.app/embed \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Contract dispute resolution",
    "model": "InLegalBERT"
  }'
```

### Test 4: Search Endpoint
```bash
curl -X POST https://your-ai-service.up.railway.app/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "property disputes",
    "limit": 5
  }'
```

### Test 5: End-to-End via Backend
```bash
curl -X POST https://api.legalindia.ai/api/v1/junior/chat \
  -H "X-API-Key: legalindia_secure_api_key_2025" \
  -H "Content-Type: application/json" \
  -d '{
    "question": "Explain IPC Section 420",
    "conversation_id": "test-oct18-001"
  }'
```

---

## 🔐 Custom Domain Setup (Optional)

### Add Custom Domain: ai.legalindia.ai

#### Step 1: In Railway Dashboard
1. Go to your AI service
2. Click **"Settings"** → **"Domains"**
3. Click **"Custom Domain"**
4. Enter: `ai.legalindia.ai`

#### Step 2: Update DNS
Add these DNS records at your domain provider:

**For Cloudflare or standard DNS:**
```
Type: CNAME
Name: ai
Value: <railway-provided-value>.railway.app
Proxy: Yes (if Cloudflare)
TTL: Auto
```

#### Step 3: Verify SSL
Railway automatically provisions SSL certificates. Wait 2-5 minutes for DNS propagation.

#### Step 4: Test
```bash
curl https://ai.legalindia.ai/health
```

---

## 📊 Monitoring & Logs

### View Real-Time Logs
```bash
# Via CLI
railway logs

# Or in Railway Dashboard
# Go to your service → "Deployments" tab → Click on latest deployment
```

### Monitor Performance
- **Railway Dashboard**: View CPU, Memory, Network usage
- **Health Endpoint**: Check `/health` regularly
- **Uptime Monitoring**: Use UptimeRobot or similar service

### Set Up Alerts
1. Go to Railway Dashboard → Settings
2. Add notification webhook (Slack, Discord, etc.)
3. Get alerts for deployment failures, crashes

---

## 🚨 Troubleshooting

### Issue: Build Fails
**Check:**
- Ensure `requirements.txt` has all dependencies
- Check Railway build logs for missing packages
- Verify Python version compatibility

**Solution:**
```bash
# Test locally first
cd /Users/raghavankarthik/ai-law-junior/ai-engine
pip install -r requirements.txt
python main.py
```

### Issue: "Application failed to respond"
**Check:**
- Ensure app binds to `0.0.0.0` and uses `$PORT` environment variable
- Check `main.py` has correct uvicorn configuration
- Verify `Procfile` command is correct

**Solution:**
Check `main.py` has:
```python
if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8080))
    uvicorn.run("main:app", host="0.0.0.0", port=port)
```

### Issue: Environment Variables Not Working
**Check:**
- Variables set in Railway dashboard
- No typos in variable names
- Case sensitivity

**Solution:**
```bash
railway variables
# Lists all environment variables
```

### Issue: Backend Can't Reach AI Service
**Check:**
- AI service is running (check Railway dashboard)
- Backend has correct `AI_ENGINE_URL`
- No trailing slashes in URL
- CORS settings allow backend domain

**Solution:**
Test connectivity:
```bash
# From your local machine
curl https://ai-service.railway.app/health

# Check backend logs for connection errors
railway logs -s backend
```

---

## 💰 Railway Pricing

### Free Tier (Starter Plan)
- $5 free credit per month
- Suitable for development/testing
- Auto-sleeps after 1 hour of inactivity

### Production Plan
- Pay-as-you-go
- ~$5-20/month for small AI service
- No sleep/downtime
- Better performance

**Recommendation:** Start with free tier, upgrade when needed.

---

## 🎯 Success Checklist

- [ ] Railway account created and logged in
- [ ] AI engine deployed from `Raghavaaa/lindia-ai` repo
- [ ] Environment variables configured
- [ ] Health check endpoint responding
- [ ] Service URL obtained
- [ ] Backend updated with AI_ENGINE_URL
- [ ] Backend redeployed
- [ ] End-to-end test successful
- [ ] (Optional) Custom domain configured
- [ ] (Optional) Monitoring/alerts set up

---

## 📞 Support Resources

- **Railway Documentation**: https://docs.railway.app/
- **Railway Discord**: https://discord.gg/railway
- **AI Engine Repo**: https://github.com/Raghavaaa/lindia-ai

---

## 🚀 Next Steps After Deployment

1. **Test all endpoints** thoroughly
2. **Monitor performance** for the first 24 hours
3. **Set up error tracking** (Sentry recommended)
4. **Configure auto-scaling** if needed
5. **Plan for actual AI model integration** (replace placeholders)
6. **Set up vector database** (Pinecone/Weaviate)
7. **Implement caching** for better performance
8. **Add authentication** for AI endpoints (API keys)

---

**Last Updated:** October 18, 2025  
**Status:** Ready to Deploy  
**Estimated Time:** 10-15 minutes

---

## Quick Command Reference

```bash
# Railway CLI
railway login
railway init
railway up
railway logs
railway variables
railway status
railway open  # Opens service in browser

# Testing
curl https://your-service.railway.app/health
curl https://your-service.railway.app/
curl -X POST https://your-service.railway.app/inference -H "Content-Type: application/json" -d '{"query":"test"}'

# Backend test
curl https://api.legalindia.ai/health
```

---

✅ **Your AI Engine is ready for Railway deployment!**

Follow the steps above, and you'll have your AI service running in production within 15 minutes.

