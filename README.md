<!-- HEADER -->
<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,9,5&height=200&section=header&text=🎨%20BatikLens&fontSize=60&fontColor=fff&animation=fadeIn&fontAlignY=35&desc=AI-Powered%20Indonesian%20Batik%20Heritage%20Explorer&descAlignY=55&descSize=18"/>
</p>

<p align="center">
  <em>Discover, Learn, and Explore the Beauty of Indonesian Batik Patterns with Artificial Intelligences</em>
</p>

<!-- BADGES -->
<p align="center">
  <img src="https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/TensorFlow-ML-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white"/>
  <img src="https://img.shields.io/badge/Cloudflare-Workers-F38020?style=for-the-badge&logo=cloudflare&logoColor=white"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square"/>
  <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square"/>
  <img src="https://img.shields.io/github/stars/Maftuuh1922/batiklens-ai-powered-heritage-explorer?style=flat-square&color=yellow"/>
  <img src="https://img.shields.io/github/forks/Maftuuh1922/batiklens-ai-powered-heritage-explorer?style=flat-square"/>
</p>

---

## 📸 Preview

<p align="center">
  <img src="https://via.placeholder.com/800x400/1a1a2e/ffffff?text=BatikLens+Demo+Screenshot" alt="BatikLens Demo" width="100%"/>
</p>

> 💡 **Tip**: Replace placeholder with actual screenshots of your app

---

## ✨ Features

<table>
  <tr>
    <td align="center" width="33%">
      <img src="https://img.icons8.com/fluency/96/camera.png" width="60"/>
      <br/><b>📷 Scan & Identify</b>
      <br/><sub>Upload or capture batik images for instant AI-powered pattern recognition</sub>
    </td>
    <td align="center" width="33%">
      <img src="https://img.icons8.com/fluency/96/artificial-intelligence.png" width="60"/>
      <br/><b>🤖 AI Chat Assistant</b>
      <br/><sub>Interactive chatbot to learn about batik history, patterns, and cultural significance</sub>
    </td>
    <td align="center" width="33%">
      <img src="https://img.icons8.com/fluency/96/gallery.png" width="60"/>
      <br/><b>🖼️ Batik Gallery</b>
      <br/><sub>Explore 40+ authentic Indonesian batik patterns from various regions</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="33%">
      <img src="https://img.icons8.com/fluency/96/book.png" width="60"/>
      <br/><b>📚 Rich Catalog</b>
      <br/><sub>Detailed information about each batik pattern, origin, and meaning</sub>
    </td>
    <td align="center" width="33%">
      <img src="https://img.icons8.com/fluency/96/cloud.png" width="60"/>
      <br/><b>☁️ Cloud Powered</b>
      <br/><sub>Deployed on Cloudflare Workers for blazing-fast global performance</sub>
    </td>
    <td align="center" width="33%">
      <img src="https://img.icons8.com/fluency/96/smartphone-tablet.png" width="60"/>
      <br/><b>📱 Responsive Design</b>
      <br/><sub>Beautiful UI that works seamlessly on desktop, tablet, and mobile</sub>
    </td>
  </tr>
</table>

---

## 🛠️ Tech Stack

<p align="center">
  <img src="https://skillicons.dev/icons?i=react,typescript,vite,tailwind,tensorflow,python,cloudflare&theme=dark"/>
</p>

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, Framer Motion |
| **Backend** | Cloudflare Workers, Hono, Durable Objects |
| **AI/ML** | TensorFlow.js, MobileNet, Cloudflare AI Gateway |
| **Database** | Cloudflare D1, Durable Objects |
| **Deployment** | Cloudflare Workers, Vercel |
| **Tools** | Bun, Wrangler, ESLint, Prettier |

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) (recommended package manager)
- [Cloudflare Account](https://dash.cloudflare.com/) with Workers enabled
- Cloudflare AI Gateway credentials (Account ID, Gateway ID, API Token)

---

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) or [Node.js](https://nodejs.org/) (v18+)
- [Cloudflare Account](https://dash.cloudflare.com/) with Workers enabled
- Python 3.9+ (for ML backend)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Maftuuh1922/batiklens-ai-powered-heritage-explorer.git
cd batiklens-ai-powered-heritage-explorer

# 2. Install dependencies
bun install
# or
npm install

# 3. Setup environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# 4. Run development server
bun dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app 🎉

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Cloudflare AI Gateway
CF_AI_BASE_URL=https://gateway.ai.cloudflare.com/v1/YOUR_ACCOUNT_ID/YOUR_GATEWAY_ID/openai
CF_AI_API_KEY=your-cloudflare-api-token

# Backend URL (for image classification)
VITE_BACKEND_URL=http://localhost:5000

# Optional
SERPAPI_KEY=your-serpapi-key
OPENROUTER_API_KEY=your-openrouter-key
```

---

## 🧠 AI Model Setup

### Batik Classifier Backend

The image classification uses a MobileNet model trained on 40+ batik patterns.

```bash
# Navigate to classifier directory
cd ../batik-classifier/api

# Create virtual environment
python -m venv batik-env
source batik-env/bin/activate  # Linux/Mac
# or
batik-env\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements.txt

# Run the Flask server
python app_mobilenet.py
# Backend runs at: http://localhost:5000
```

### Supported Batik Patterns

<details>
<summary>📋 Click to see all 40+ supported patterns</summary>

| Region | Pattern |
|--------|---------|
| Aceh | Batik Aceh |
| Bali | Barong, Merak |
| Betawi | Ondel-ondel |
| Jawa Barat | Megamendung, Garutan |
| Jawa Tengah | Parang, Kawung, Sogan, Lasem |
| Jawa Timur | Pring, Madura Mataketeran |
| Yogyakarta | Kawung, Parang, Sekar |
| Kalimantan | Dayak |
| Sulawesi | Lontara |
| Sumatera | Boraspati, Rumah Minang, Lampung Gajah |
| Papua | Asmat, Cendrawasih, Tifa |
| Maluku | Pala |
| NTB | Lumbung |
| ...and more! | |

</details>

---

## 📁 Project Structure

```
batiklens-ai-powered-heritage-explorer/
├── 📂 public/
│   └── 📂 batik-images/       # Batik pattern images
├── 📂 src/
│   ├── 📂 components/         # Reusable UI components
│   ├── 📂 hooks/              # Custom React hooks
│   ├── 📂 lib/                # Utilities & helpers
│   ├── 📂 pages/
│   │   ├── LandingPage.tsx    # Welcome screen
│   │   ├── HomePage.tsx       # Main dashboard
│   │   ├── ScanPage.tsx       # Image upload & scan
│   │   ├── ResultPage.tsx     # Classification results
│   │   ├── CatalogPage.tsx    # Batik catalog
│   │   ├── GalleryPage.tsx    # Image gallery
│   │   └── DetailPage.tsx     # Pattern details
│   ├── App.tsx
│   └── main.tsx
├── 📂 worker/
│   ├── agent.ts               # AI agent logic
│   ├── chat.ts                # Chat functionality
│   ├── tools.ts               # AI tools
│   └── index.ts               # Worker entry
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── wrangler.jsonc             # Cloudflare config
```

---

## 🎯 Usage

### 1. Scan Batik Pattern
- Click "Scan" button on the homepage
- Upload an image or use camera capture
- AI will identify the batik pattern instantly

### 2. Explore Catalog
- Browse 40+ authentic batik patterns
- Learn about history and cultural significance
- View high-quality images

### 3. Chat with AI
- Ask questions about batik
- Get recommendations
- Learn about Indonesian heritage

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Indonesian Batik UNESCO World Heritage
- TensorFlow.js Team
- Cloudflare Workers Team
- All contributors and supporters

---

## 📞 Contact

**Muhammad Maftuh** - [@maftuuh](https://instagram.com/maftuuh)

Project Link: [https://github.com/Maftuuh1922/batiklens-ai-powered-heritage-explorer](https://github.com/Maftuuh1922/batiklens-ai-powered-heritage-explorer)

---

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,9,5&height=100&section=footer"/>
</p>

<p align="center">
  Made with ❤️ in Indonesia 🇮🇩
  <br/>
  <sub>Preserving Cultural Heritage Through Technology</sub>
</p>
