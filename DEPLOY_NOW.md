# 🚀 DEPLOY NOW - Quick Start

**Date:** October 18, 2025  
**Status:** ✅ Ready to Deploy AI Engine

---

## ✅ What's Already Done

1. ✅ Main repository pushed to GitHub (69 commits)
2. ✅ AI Engine pushed to `github.com/Raghavaaa/lindia-ai`
3. ✅ Backend deployed: `https://api.legalindia.ai`
4. ✅ Frontend deployed: `https://www.legalindia.ai`
5. ✅ Database deployed: PostgreSQL on Railway

---

## 🎯 What You Need to Do NOW

### **Deploy AI Engine to Railway (10 minutes)**

#### Quick Steps:

1. **Open Railway Dashboard**
   - Go to: https://railway.app/new
   - Login with your GitHub account

2. **Deploy from GitHub**
   - Click **"Deploy from GitHub repo"**
   - Select: **`Raghavaaa/lindia-ai`**
   - Railway will auto-detect and start deploying

3. **Set Environment Variables**
   
   Once deployment starts, go to **Variables** tab and add:
   
   ```bash
   MODEL_PROVIDER=InLegalBERT
   BACKEND_URL=https://api.legalindia.ai
   ENVIRONMENT=production
   ```

4. **Wait for Deployment** (2-3 minutes)
   - Watch the build logs
   - Wait for green checkmark ✅

5. **Copy Your Service URL**
   - It will look like: `https://lindia-ai-production-xxxx.up.railway.app`
   - **SAVE THIS URL** - you'll need it next!

6. **Test the Deployment**
   
   Open in browser or use terminal:
   ```bash
   curl https://YOUR-SERVICE-URL.up.railway.app/health
   ```
   
   Should return:
   ```json
   {
     "status": "ok",
     "model_provider": "InLegalBERT",
     "service": "ai-engine"
   }
   ```

---

## 🔧 Next: Update Backend

After AI engine is deployed:

1. **Go back to Railway Dashboard**
2. **Find your Backend service** (api.legalindia.ai)
3. **Go to Variables tab**
4. **Add/Update this variable:**
   ```
   AI_ENGINE_URL=https://YOUR-AI-SERVICE-URL.up.railway.app
   ```
5. **Redeploy backend** (automatic)

---

## 🧪 Final Test

Test the complete integration:

```bash
# Test AI engine directly
curl https://YOUR-AI-SERVICE-URL.up.railway.app/health

# Test backend connection to AI
curl -X POST https://api.legalindia.ai/api/v1/junior/chat \
  -H "X-API-Key: legalindia_secure_api_key_2025" \
  -H "Content-Type: application/json" \
  -d '{
    "question": "What is Section 420 IPC?",
    "conversation_id": "test-deployment-001"
  }'
```

If both work, you're done! ✅

---

## 📚 Detailed Guides

- **Full Railway Guide**: See `RAILWAY_DEPLOYMENT_GUIDE.md`
- **Complete Action Plan**: See `DEPLOYMENT_ACTION_PLAN.md`
- **System Status**: See `SYSTEM_STATUS_COMPLETE.md`

---

## 🚨 If You Get Stuck

### Build Fails
- Check Railway logs for errors
- Ensure all dependencies in `requirements.txt`
- Check `Procfile` syntax

### Service Won't Start
- Verify environment variables are set
- Check that PORT is not hardcoded
- Review Railway logs

### Backend Can't Reach AI
- Verify `AI_ENGINE_URL` has no trailing slash
- Check backend logs
- Ensure CORS is configured correctly

---

## 📞 Quick Support

- Railway Docs: https://docs.railway.app/
- Railway Discord: https://discord.gg/railway
- AI Engine Repo: https://github.com/Raghavaaa/lindia-ai

---

## ✨ Summary

**What to do right now:**

1. 🌐 Go to https://railway.app/new
2. 🚀 Deploy `Raghavaaa/lindia-ai` repository
3. ⚙️ Set 3 environment variables
4. ⏱️ Wait 2-3 minutes for build
5. 🔗 Copy service URL
6. 🔄 Update backend with AI_ENGINE_URL
7. ✅ Test both services

**Time needed:** 10-15 minutes total

**Current status:** Everything else is deployed and working! Just need AI engine.

---

Good luck! 🚀

**Last Updated:** October 18, 2025

