# 🚀 DeepSeek API Setup Guide

## 🎯 **DeepSeek API Configuration**

### **Step 1: Get DeepSeek API Key**

1. **Go to DeepSeek Platform:**
   - Visit: https://platform.deepseek.com/
   - Sign up or login to your account

2. **Create API Key:**
   - Go to: https://platform.deepseek.com/api_keys
   - Click **"Create API Key"**
   - Copy the key (starts with `sk-...`)

### **Step 2: Set Environment Variables in Railway**

In your Railway dashboard for `lindia-ai` service:

**Go to Variables tab and add:**

```bash
# DeepSeek Configuration
DEEPSEEK_API_KEY=sk_your_deepseek_api_key_here
DEEPSEEK_MODEL=deepseek-chat
DEEPSEEK_API_URL=https://api.deepseek.com/v1/chat/completions
DEEPSEEK_TIMEOUT=30

# Provider Order (DeepSeek as backup)
PROVIDER_ORDER=inlegalbert,deepseek

# Primary Provider
MODEL_PROVIDER=inlegalbert
```

### **Step 3: DeepSeek Models Available**

```bash
# Recommended Models:
DEEPSEEK_MODEL=deepseek-chat          # Chat completion model
DEEPSEEK_MODEL=deepseek-coder         # Code generation model
DEEPSEEK_MODEL=deepseek-math          # Mathematical reasoning model
```

---

## 🔄 **How DeepSeek Works in Your System**

### **AI Provider Flow:**
```
1. InLegalBERT (Primary) → If fails
2. DeepSeek (Backup) → If fails  
3. Fallback Response
```

### **DeepSeek API Endpoints:**
- **Chat Completions:** `https://api.deepseek.com/v1/chat/completions`
- **Models List:** `https://api.deepseek.com/v1/models`
- **Usage:** `https://api.deepseek.com/v1/usage`

---

## 🧪 **Test DeepSeek Integration**

### **Test 1: Direct DeepSeek API**
```bash
curl -X POST https://api.deepseek.com/v1/chat/completions \
  -H "Authorization: Bearer sk_your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "deepseek-chat",
    "messages": [
      {"role": "system", "content": "You are a legal AI assistant specializing in Indian law."},
      {"role": "user", "content": "What is Section 420 IPC?"}
    ],
    "max_tokens": 500,
    "temperature": 0.7
  }'
```

### **Test 2: Through Your AI Engine**
```bash
curl -X POST https://lindia-ai-production.up.railway.app/inference \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Explain Indian contract law",
    "context": "Legal research query",
    "max_tokens": 600,
    "temperature": 0.7
  }'
```

### **Test 3: Through Backend (Research)**
```bash
curl -X POST https://api.legalindia.ai/api/v1/research/ \
  -H "X-API-Key: legalindia_secure_api_key_2025" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "What are the requirements for a valid contract in India?",
    "jurisdiction": "India",
    "practice_area": "Contract Law"
  }'
```

---

## 📊 **DeepSeek Pricing**

### **Current Rates (as of 2024):**
- **deepseek-chat:** $0.14 per 1M input tokens, $0.28 per 1M output tokens
- **deepseek-coder:** $0.14 per 1M input tokens, $0.28 per 1M output tokens
- **Free tier:** $5 credit for new users

### **Cost Estimation:**
- **Typical legal query:** ~$0.001-0.005 per request
- **Research query:** ~$0.002-0.010 per request
- **Monthly usage:** ~$10-50 for moderate usage

---

## 🔧 **DeepSeek Provider Configuration**

Your AI engine already has DeepSeek integration:

```python
# In your ai-engine/providers/deepseek_provider.py
class DeepSeekProvider(BaseProvider):
    async def inference(self, query, context=None, max_tokens=512, temperature=0.7):
        # Calls DeepSeek API
        # Returns structured response
        # Handles errors gracefully
```

---

## 🎯 **Complete Environment Setup**

### **Railway Variables for Full AI Stack:**

```bash
# Primary Provider
MODEL_PROVIDER=inlegalbert
PROVIDER_ORDER=inlegalbert,deepseek

# InLegalBERT (Hugging Face)
INLEGALBERT_API_KEY=hf_your_huggingface_token
INLEGALBERT_MODEL=legal-bert-base-uncased
INLEGALBERT_API_URL=https://api-inference.huggingface.co/models/legal-bert-base-uncased

# DeepSeek (Backup)
DEEPSEEK_API_KEY=sk_your_deepseek_api_key
DEEPSEEK_MODEL=deepseek-chat
DEEPSEEK_API_URL=https://api.deepseek.com/v1/chat/completions
DEEPSEEK_TIMEOUT=30

# Backend Integration
BACKEND_URL=https://api.legalindia.ai
ENVIRONMENT=production
LOG_LEVEL=INFO
```

---

## 🚀 **Deployment Steps**

### **1. Set Environment Variables:**
- Add DeepSeek API key to Railway
- Configure provider order
- Set timeout and model preferences

### **2. Test Integration:**
- Test direct DeepSeek API
- Test through AI engine
- Test through backend endpoints

### **3. Monitor Performance:**
- Check AI engine logs
- Monitor API usage
- Track response times

---

## 🎉 **What You Get with DeepSeek**

### **Advantages:**
- ✅ **High-quality** legal responses
- ✅ **Fast** inference speed
- ✅ **Reliable** backup provider
- ✅ **Cost-effective** pricing
- ✅ **Automatic** fallback system

### **Use Cases:**
- ✅ **Legal research** queries
- ✅ **Contract analysis**
- ✅ **Case law** interpretation
- ✅ **Statutory** guidance
- ✅ **General legal** advice

---

## 📋 **Quick Setup Checklist**

- [ ] Create DeepSeek account
- [ ] Generate API key
- [ ] Add to Railway variables
- [ ] Test direct API
- [ ] Test through AI engine
- [ ] Test through backend
- [ ] Monitor usage and costs

---

## 🎯 **Next Steps**

1. **Get DeepSeek API key** from https://platform.deepseek.com/
2. **Add to Railway** environment variables
3. **Test the integration** with legal queries
4. **Monitor performance** and costs

**Your AI engine will automatically use DeepSeek as backup when InLegalBERT is unavailable!** 🚀

---

**DeepSeek API Documentation:** https://platform.deepseek.com/api-docs/
**DeepSeek Pricing:** https://platform.deepseek.com/pricing/
