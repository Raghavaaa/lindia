# LegalIndia Frontend

Pure frontend application for LegalIndia.ai - AI-powered legal research for Indian law.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/legalindia-frontend.git
cd legalindia-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.sample .env.local
```

Edit `.env.local` with your configuration:
```env
NEXT_PUBLIC_FRONTEND_API_BASE=https://legalindia-backend-production.up.railway.app
NEXT_PUBLIC_FRONTEND_ENV=development
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── research/          # Research functionality
│   ├── history/           # Research history
│   └── login/             # Authentication
├── lib/
│   └── config.ts          # API configuration and helpers
└── components/            # Reusable UI components
```

## 🔧 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `DEEPSEEK_API_KEY` | DeepSeek API key for AI research | Yes | - |
| `NODE_ENV` | Environment mode | Yes | development |
| `NEXT_PUBLIC_FRONTEND_API_BASE` | Backend API base URL | No | /api |
| `NEXT_PUBLIC_FRONTEND_ENV` | Frontend environment | No | development |
| `ADMIN_SECRET` | Admin operations secret | No | - |
| `PORT` | Server port (auto-set by Railway) | No | 3000 |

See `.env.example` for complete configuration options.

## 🌐 API Integration

The frontend communicates with the backend via versioned API endpoints:

- All API calls use `/api/v1/` prefix
- CORS-safe fetch wrapper in `src/lib/config.ts`
- Streaming support for research results (SSE)
- JWT authentication for protected routes

### Key Features

- **Streaming Research**: Real-time streaming of AI research results
- **Auto-scroll**: Automatic scrolling during streaming
- **Save Research**: Save research with client organization
- **History**: Paginated research history
- **Responsive Design**: Mobile-first responsive UI

## 🚀 Deployment

### Railway Deployment

For detailed Railway deployment instructions, see **[RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md)**.

**Quick Steps:**

1. Connect your GitHub repository to Railway
2. Set required environment variables:
   - `DEEPSEEK_API_KEY`: Your DeepSeek API key **(REQUIRED)**
   - `NODE_ENV`: production
   - `NEXT_PUBLIC_FRONTEND_API_BASE`: /api
   - `NEXT_PUBLIC_FRONTEND_ENV`: production

3. Railway automatically builds and deploys
4. Health check endpoint: `/api/health`

### Build for Production

```bash
# Install dependencies
npm ci --include=dev

# Build the application
npm run build

# Start production server
npm start
```

### Environment Setup

Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- TypeScript for type safety
- Tailwind CSS for styling
- ESLint for code quality
- Prettier for formatting

## 🔒 Security

- No backend secrets in frontend code
- CORS-safe API calls
- JWT token handling
- Environment variable validation

## 📱 Features

### Research Page
- Real-time streaming research results
- Auto-scroll during streaming
- Fixed "Scroll to Top" button
- Save research with client names
- Error handling and loading states

### History Page
- Paginated research history
- Client-based organization
- Search and filter capabilities
- Detailed view with full research content

### Authentication
- Google OAuth integration
- JWT token management
- Protected routes
- Session persistence

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.# Railway Deployment Fix
