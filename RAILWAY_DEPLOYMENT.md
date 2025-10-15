# 🚂 Railway Deployment Guide for LegalIndia.ai

This guide will help you deploy your LegalIndia.ai application on Railway.

## 📋 Prerequisites

- Railway account ([railway.app](https://railway.app))
- GitHub repository connected to Railway
- DeepSeek API key

## 🚀 Quick Deploy

### Step 1: Create New Project on Railway

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your `lindia` repository

### Step 2: Configure Environment Variables

In the Railway dashboard, go to **Variables** and add the following:

#### Required Variables

```bash
# DeepSeek API Key (REQUIRED)
DEEPSEEK_API_KEY=your_deepseek_api_key_here

# Node Environment
NODE_ENV=production

# Frontend Configuration
NEXT_PUBLIC_FRONTEND_API_BASE=/api
NEXT_PUBLIC_FRONTEND_ENV=production
```

#### Optional Variables

```bash
# Admin Secret (for admin operations)
ADMIN_SECRET=your_secure_admin_secret

# Custom Prompt Base
PROMPT_BASE=Refine and clarify the legal research query for Indian law.

# Hugging Face Token (if needed)
HF_TOKEN=your_huggingface_token
```

### Step 3: Deploy

Railway will automatically:
1. Detect Next.js application
2. Run `npm ci --include=dev && npm run build`
3. Start the application with `npm start`
4. Assign a public URL

## 🔧 Configuration Details

### Railway Configuration (`railway.json`)

```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm ci --include=dev && npm run build"
  },
  "deploy": {
    "numReplicas": 1,
    "startCommand": "npm start",
    "healthcheckPath": "/api/health",
    "healthcheckTimeout": 100,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 5
  }
}
```

### Health Check Endpoint

The application exposes a health check at `/api/health`:

```bash
curl https://your-app.railway.app/api/health
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2025-10-15T10:30:00.000Z",
  "uptime": 3600,
  "environment": "production",
  "version": "1.0.0",
  "services": {
    "deepseek": "configured"
  },
  "memory": {
    "used": 120,
    "total": 512,
    "unit": "MB"
  }
}
```

## 📊 Monitoring

### View Logs

In Railway dashboard:
1. Go to your project
2. Click on the service
3. Navigate to **"Logs"** tab

### Log Format

The application uses structured logging:

```
[2025-10-15T10:30:00.000Z] POST /api/research - 200 - 1234ms
[Research] Processing query (234 chars) for client: ABC Corp
[DeepSeek] API call successful
```

### Health Monitoring

Railway automatically monitors the `/api/health` endpoint:
- **Healthy**: Returns 200 status
- **Unhealthy**: Returns 500 status
- **Timeout**: No response within 100 seconds

## 🔒 Security Best Practices

### 1. Environment Variables
- ✅ Never commit API keys to Git
- ✅ Use Railway's secure environment variable storage
- ✅ Rotate API keys periodically

### 2. Security Headers
The application includes security headers:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

### 3. API Rate Limiting
Consider adding rate limiting for production:
- Use Railway's built-in rate limiting
- Or implement custom rate limiting middleware

## ⚡ Performance Optimization

### 1. Build Optimization
- Uses `npm ci` for faster, deterministic installs
- Standalone output mode for smaller deployments
- SWC minification for faster builds

### 2. Runtime Optimization
- Compression enabled
- Image optimization (AVIF, WebP)
- API response caching headers

### 3. Memory Management
- Monitor memory usage via `/api/health`
- Default Railway memory limit: 512MB
- Can be increased in Railway settings if needed

## 🐛 Troubleshooting

### Build Fails

**Issue**: Build command fails

**Solutions**:
```bash
# Check if all dependencies are in package.json
npm install

# Verify build works locally
npm run build

# Check Railway build logs for specific errors
```

### DeepSeek API Errors

**Issue**: "Service not properly configured"

**Solutions**:
1. Verify `DEEPSEEK_API_KEY` is set in Railway variables
2. Check API key validity
3. View logs for detailed error messages

### Health Check Failing

**Issue**: Railway shows service as unhealthy

**Solutions**:
1. Check `/api/health` endpoint manually
2. Verify application is starting correctly
3. Check for startup errors in logs
4. Ensure PORT environment variable is being used

### Memory Issues

**Issue**: Application crashes due to memory

**Solutions**:
1. Monitor memory via `/api/health`
2. Increase memory limit in Railway settings
3. Optimize API response sizes
4. Implement response streaming for large results

## 📈 Scaling

### Vertical Scaling (Increase Resources)
In Railway dashboard:
1. Go to Settings
2. Adjust **Memory** and **CPU** limits
3. Redeploy

### Horizontal Scaling (Multiple Instances)
Update `railway.json`:
```json
{
  "deploy": {
    "numReplicas": 2
  }
}
```

## 🔄 CI/CD

Railway automatically deploys when you push to main branch:

1. **Commit changes**: `git commit -m "feat: update"`
2. **Push to GitHub**: `git push origin main`
3. **Railway auto-deploys**: Monitor in dashboard

### Manual Deployment

In Railway dashboard:
1. Go to your service
2. Click **"Deploy"**
3. Select specific commit or branch

## 📞 Support

### Railway Issues
- Railway Discord: [discord.gg/railway](https://discord.gg/railway)
- Railway Docs: [docs.railway.app](https://docs.railway.app)

### Application Issues
- Check application logs in Railway
- Review health check endpoint
- Verify environment variables

## 🎯 Next Steps

1. ✅ Set up custom domain in Railway
2. ✅ Configure SSL (automatic with Railway)
3. ✅ Set up monitoring alerts
4. ✅ Add database for research history (PostgreSQL)
5. ✅ Implement Redis caching for API responses
6. ✅ Add authentication with NextAuth.js

## 📝 Deployment Checklist

Before deploying to production:

- [ ] All environment variables configured
- [ ] DeepSeek API key verified
- [ ] Health check endpoint tested
- [ ] Application builds successfully locally
- [ ] Security headers configured
- [ ] Logging working correctly
- [ ] Error handling tested
- [ ] API endpoints tested
- [ ] Frontend routes working
- [ ] Custom domain configured (if applicable)

## 🌐 Post-Deployment

After successful deployment:

1. **Test the application**: Visit your Railway URL
2. **Check health**: `curl https://your-app.railway.app/api/health`
3. **Test research**: Try a legal research query
4. **Monitor logs**: Check Railway dashboard logs
5. **Set up alerts**: Configure Railway notifications

---

**Happy Deploying! 🚀**

For questions or issues, check the Railway logs and health endpoint first.
