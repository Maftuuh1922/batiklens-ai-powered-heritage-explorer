# Cloudflare Workers AI Chat Agent

[![Deploy to Cloudflare][![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/Maftuuh1922/batiklens-ai-powered-heritage-explorer)]

A production-ready, full-stack chat application powered by Cloudflare Workers, featuring AI-powered conversations with multi-session management, streaming responses, and built-in tools like web search. Built with React, TypeScript, and the Cloudflare Agents SDK for seamless Durable Object integration.

## ✨ Features

- **Multi-Session Chat**: Create, switch, delete, and manage unlimited chat sessions with automatic title generation.
- **AI Streaming**: Real-time streaming responses using Cloudflare AI Gateway (OpenAI-compatible).
- **Tool Integration**: Built-in tools for web search (SerpAPI), weather, and extensible MCP (Model Context Protocol) support.
- **Modern UI**: Responsive design with shadcn/ui, Tailwind CSS, dark mode, and smooth animations.
- **Session Persistence**: Durable Objects for stateful chat history and global session control.
- **Type-Safe**: Full TypeScript support across frontend and Workers.
- **Production-Ready**: Error handling, logging, CORS, health checks, and client error reporting.

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, TanStack Query, React Router, Framer Motion, Lucide Icons.
- **Backend**: Cloudflare Workers, Hono, Cloudflare Agents SDK, Durable Objects.
- **AI/ML**: Cloudflare AI Gateway (@cloudflare/ai), OpenAI SDK (Gemini models supported).
- **Tools**: SerpAPI (web search), MCP SDK (extensible tools).
- **Build Tools**: Bun, Wrangler, Vitest.

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) (recommended package manager)
- [Cloudflare Account](https://dash.cloudflare.com/) with Workers enabled
- Cloudflare AI Gateway credentials (Account ID, Gateway ID, API Token)

### Installation

1. Clone the repository:
   ```
   git clone <your-repo-url>
   cd batik-lens-w7w8_o5czvrpplbdqzsht
   ```

2. Install dependencies:
   ```
   bun install
   ```

3. Configure environment variables in `wrangler.jsonc`:
   ```json
   "vars": {
     "CF_AI_BASE_URL": "https://gateway.ai.cloudflare.com/v1/YOUR_ACCOUNT_ID/YOUR_GATEWAY_ID/openai",
     "CF_AI_API_KEY": "your-cloudflare-api-token",
     "SERPAPI_KEY": "your-serpapi-key",  // Optional: for web search
     "OPENROUTER_API_KEY": "your-openrouter-key"  // Optional: additional models
   }
   ```

4. Generate types:
   ```
   bun cf-typegen
   ```

5. Run locally:
   ```
   bun dev
   ```
   Open [http://localhost:3000](http://localhost:3000) (or your configured PORT).

### Connect Batik Classifier Backend

This UI can call a local Python backend for image classification.

1. Start the backend (Flask + TFLite):
   ```bash
   # Activate local env
   source ../batik-classifier/api/batik-env/bin/activate
   # Run the server
   python ../batik-classifier/api/app_mobilenet.py
   # Backend runs at: http://localhost:5000
   ```

2. Point the frontend to the backend by setting an env var:
   ```bash
   # Create .env.local in this folder
   echo "VITE_BACKEND_URL=http://localhost:5000" > .env.local
   ```

3. Use the Scan page to upload an image; it will POST to `/predict` and display the result.

## 💻 Development

- **Frontend**: `bun dev` (Vite dev server).
- **Workers**: Routes are hot-reloaded. Edit `worker/userRoutes.ts` for custom APIs.
- **Linting**: `bun lint`.
- **Type Checking**: Handled by `tsconfig.json` references.
- **Adding Tools**: Extend `worker/tools.ts` or configure MCP servers in `worker/mcp-client.ts`.
- **Custom Agents**: Modify `worker/agent.ts` and implement new Durable Object classes.

### Key Files to Customize

| Purpose | File |
|---------|------|
| UI Components | `src/pages/HomePage.tsx`, `src/components/` |
| Chat Logic | `src/lib/chat.ts`, `worker/chat.ts` |
| Tools | `worker/tools.ts` |
| Sessions | `worker/userRoutes.ts`, `worker/app-controller.ts` |
| Styling | `tailwind.config.js`, `src/index.css` |

## ☁️ Deployment

1. Build the app:
   ```
   bun build
   ```

2. Add secrets (if not in vars):
   ```
   wrangler secret put CF_AI_API_KEY
   wrangler secret put SERPAPI_KEY  # Optional
   ```

3. Deploy:
   ```
   bun deploy
   ```
   Or use the button below:

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/Maftuuh1922/batiklens-ai-powered-heritage-explorer)

Your app will be live at `https://your-project.workers.dev`. Assets are automatically served as a SPA.

### Production Config

- Update `wrangler.jsonc` for custom domains, environments.
- Enable Observability for metrics and logs.
- Scale with Durable Objects (automatic).

## 📚 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/chat/:sessionId/chat` | POST | Send message (supports streaming) |
| `/api/chat/:sessionId/messages` | GET | Get chat history |
| `/api/sessions` | GET/POST/DELETE | Manage sessions |
| `/api/health` | GET | Health check |

See `worker/userRoutes.ts` for details.

## 🤝 Contributing

1. Fork and create a PR.
2. Follow TypeScript and ESLint rules.
3. Test changes with `bun dev`.
4. Update README if adding features.

## ⚠️ License

This project is MIT licensed. See [LICENSE](LICENSE) for details.

## 🙌 Support

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Cloudflare AI Gateway](https://developers.cloudflare.com/ai-gateway/)
- File issues here on GitHub.

Built with ❤️ for the Cloudflare developer community.