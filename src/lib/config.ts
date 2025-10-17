// Global configuration for frontend
export const config = {
  apiBase: process.env.NEXT_PUBLIC_FRONTEND_API_BASE || '/api',
  environment: process.env.NEXT_PUBLIC_FRONTEND_ENV || 'development',
  
  // API endpoints
  endpoints: {
    health: '/api/health',
    auth: {
      google: '/api/auth/google',
      me: '/api/me',
    },
    clients: '/api/clients',
    research: {
      run: '/api/simple-research',
      save: '/api/research',
      history: '/api/research/saved',
    },
    admin: {
      prompt: '/api/admin/updatePrompt',
    },
  },
} as const;

// Helper function to build full API URLs
export const buildApiUrl = (endpoint: string): string => {
  return `${config.apiBase}${endpoint}`;
};

// CORS-safe fetch wrapper
export const apiFetch = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const url = buildApiUrl(endpoint);
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include', // For JWT cookies
  };

  return fetch(url, { ...defaultOptions, ...options });
};

