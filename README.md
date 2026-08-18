# 🏛️ BMU University — Official Production MERN Stack Website

A state-of-the-art, futuristic university web platform engineered for **BMU University** (Silicon Valley Campus). Built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js), **Tailwind CSS**, and **Framer Motion**, featuring dark-mode aesthetics, glowing glassmorphism, and seamless full-stack integration.

---

## ✨ Key Architectural Features

1. **🎨 Futuristic Silicon Valley Aesthetics**:
   - Official BMU Palette: **Crimson Red (`#E60000`)**, **Magenta Pink (`#FF4D85`)**, **Deep Black (`#0A0A0A`)**, and **Glass Surface (`#181818`)**.
   - **Antigravity Particle Engine**: Interactive floating glowing orbs and kinetic typography powered by Framer Motion.
2. **🏫 Complete Academic & Campus Experience**:
   - **Interactive Program Finder**: Instant search and filtering across undergraduate, master's, and doctoral foundries with detailed curriculum modals.
   - **Silicon Valley Campus Explorer**: Virtual 360° VR preview of supercomputing cleanrooms, robotics arenas, and SCIF cyber defense labs.
   - **News & Research Chronicle**: Dynamic dispatch of quantum computing milestones, NVIDIA supercomputing alliances, and student hackathon victories.
   - **Faculty & Research Directories**: Turing Award laureate profiles and over $150M+ in active federal grants.
3. **🚀 Full-Stack MERN Architecture with Offline Resilience**:
   - **Backend API**: Node.js & Express server equipped with Helmet security headers, CORS, Morgan logging, and robust error handling.
   - **MongoDB Database**: Clean Mongoose schemas for Programs, News, Student Admissions Applications, and Contact Inquiries.
   - **Resilient Frontend API Service**: Centralized Axios client that automatically switches to local offline datasets if the MongoDB database or backend server is unreachable! Guaranteed 100% uptime!
4. **📝 Interactive Admissions & Contact Portals**:
   - Multi-step online application wizard with real-time validation (React Hook Form), GPA verification, and instant application ID generation.

---

## 🛠️ Technology Stack

| Component | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS, Framer Motion, Lucide React Icons, Swiper.js, React Hook Form, Axios |
| **Backend** | Node.js, Express.js, Mongoose ODM, Helmet (Security), CORS, Morgan (Logging), dotenv |
| **Database** | MongoDB / MongoDB Atlas |
| **Deployment** | Vercel (monorepo serverless), Render (full-stack YAML blueprint), Docker-ready |

---

## 📂 Monorepo Structure

```text
BMU-website/
├── package.json             # Root monorepo workspace config
├── vercel.json              # Vercel deployment configuration
├── render.yaml              # Render full-stack deployment blueprint
├── client/                  # Frontend React + Vite application
│   ├── index.html
│   ├── vite.config.js       # Vite proxy to backend http://localhost:5000
│   ├── tailwind.config.js   # BMU color tokens & glassmorphism utilities
│   └── src/
│       ├── components/      # Atomic UI (Navbar, Footer, Card, Button, AntigravityBackground)
│       ├── pages/           # Home, Programs, Campus, News, About, Faculty, Research, Admission, StudentLife, Library, Contact, NotFound
│       ├── data/            # Mock datasets for offline resilience
│       └── services/        # Centralized Axios API service with offline fallback
└── server/                  # Backend Node.js + Express API server
    ├── server.js            # Express application entry point
    ├── .env.example         # Environment variable template
    └── src/
        ├── config/db.js     # Mongoose MongoDB connection
        ├── models/          # Mongoose Schemas (Program, News, Application, Contact)
        ├── controllers/     # Route logic & CRUD operations
        ├── routes/          # Express API route endpoints
        ├── middleware/      # Global error handling & 404 catcher
        └── seed/seed.js     # Automated database seeding script
```

---

## 🚀 Getting Started & Running Locally

### 1. Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (running locally on `mongodb://localhost:27017` or a MongoDB Atlas cloud URI)

### 2. Installation
Clone the repository and install dependencies across the entire monorepo with a single command:
```bash
git clone https://github.com/bmu-university/bmu-website.git
cd BMU-website
npm install
```

### 3. Environment Setup
Configure the backend environment variables:
```bash
cd server
cp .env.example .env
```
Ensure your `.env` file contains:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/bmu_university
CLIENT_URL=http://localhost:5173
```

### 4. Seed the Database (Optional but Recommended)
Populate your MongoDB database with BMU's official academic programs and Silicon Valley news dispatch:
```bash
npm run seed --workspace=server
```
*(Note: Even if you skip seeding or work offline, the frontend's resilient API service will automatically serve local mock data so the website never breaks!)*

### 5. Launch the Full-Stack Application
From the root directory, start both the Express backend server and the Vite React frontend concurrently:
```bash
npm run dev
```
- 🌐 **Frontend Web App**: `http://localhost:5173`
- ⚙️ **Backend API Server**: `http://localhost:5000/api/health`

---

## 🌐 Production Deployment Guides

### Option A: Deploy to Vercel (Recommended for Serverless)
1. Install the Vercel CLI or connect your GitHub repository to Vercel.
2. The included `vercel.json` automatically configures the Vite frontend static build and mounts the Express backend as serverless functions under `/api/*`.
3. Set your environment variable in the Vercel dashboard:
   - `MONGO_URI`: Your MongoDB Atlas connection string.

### Option B: Deploy to Render (Full-Stack Blueprint)
1. In your Render dashboard, select **New -> Blueprint** and connect your GitHub repository.
2. Render will automatically read `render.yaml`, spin up a managed MongoDB instance (`bmu-mongo-db`), deploy the Node.js backend service (`bmu-backend-api`), and host the Vite static frontend (`bmu-frontend-client`).

### Option C: Deploy to Heroku / AWS / DigitalOcean
1. Build the production client bundle:
   ```bash
   npm run build --workspace=client
   ```
2. Configure Express in `server/server.js` to serve the static files from `client/dist` when running in `NODE_ENV=production`.
3. Start the server:
   ```bash
   npm start --workspace=server
   ```

---

## 🛡️ License & Acknowledgments
Designed and engineered for **BMU University** following Silicon Valley engineering benchmarks and futuristic web design standards. All rights reserved.
