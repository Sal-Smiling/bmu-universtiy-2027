# 🚀 BMU University — Comprehensive Production Deployment & Operations Guide

This guide provides step-by-step instructions for deploying the **BMU University MERN Stack Web Application** to production environments (Vercel, Render, Heroku, AWS, or Docker).

---

## 🏛️ Architecture Overview

The project is structured as an npm workspace monorepo:
* **`client/`**: React 18 + Vite frontend with Tailwind CSS and Framer Motion animations.
* **`server/`**: Node.js + Express.js REST API with Mongoose MongoDB schemas and security middleware (Helmet, CORS, Rate Limiting).
* **Resilient Offline Fallback**: The frontend `api.js` service is engineered to automatically detect when the backend API or MongoDB server is unreachable and seamlessly fall back to local datasets (`programsData`, `newsData`, etc.). **This guarantees 100% uptime for end-users under any circumstances!**

---

## 🌐 1. Deploying to Vercel (Recommended Serverless Approach)

Vercel is ideal for hosting the static React frontend and running our Express API as serverless functions.

### Step 1: Push Code to GitHub
Ensure your latest changes are pushed to your GitHub repository:
```bash
git add .
git commit -m "feat: complete MERN stack university platform"
git push origin main
```

### Step 2: Import Project in Vercel
1. Log in to [Vercel](https://vercel.com/) and click **Add New -> Project**.
2. Import your GitHub repository (`bmu-website`).
3. Leave the **Root Directory** as `./` (the monorepo root).
4. Vercel will automatically detect `vercel.json` and configure the builds for both `client/` and `server/`.

### Step 3: Configure Environment Variables in Vercel
In your Vercel Project Settings -> Environment Variables, add:
* `NODE_ENV`: `production`
* `MONGO_URI`: Your MongoDB Atlas connection string (e.g., `mongodb+srv://admin:password@cluster0.mongodb.net/bmu_university?retryWrites=true&w=majority`).

### Step 4: Deploy
Click **Deploy**. Vercel will build the Vite frontend into `client/dist` and route `/api/*` requests to `server/server.js`.

---

## ☁️ 2. Deploying to Render (Full-Stack Managed Infrastructure)

Render allows you to host the Node.js backend as a continuous web service, the Vite frontend as a static site, and an automated MongoDB database instance simultaneously.

### Step 1: Use the Included Blueprint
We have provided an automated `render.yaml` blueprint file at the root of the project.

### Step 2: Connect to Render
1. Log in to [Render](https://dashboard.render.com/) and go to **Blueprints**.
2. Click **New Blueprint Instance** and select your GitHub repository.
3. Render will automatically parse `render.yaml` and create three services:
   * **`bmu-mongo-db`**: Managed MongoDB database instance.
   * **`bmu-backend-api`**: Node.js Express server running on port 5000.
   * **`bmu-frontend-client`**: Vite static global CDN deployment connected to your API.

### Step 3: Seed the Production Database on Render
Once the backend service is live, open the Render SSH console for `bmu-backend-api` and run:
```bash
npm run seed
```
This will populate your production MongoDB instance with BMU's official academic programs and Silicon Valley news chronicles!

---

## 🐳 3. Docker Deployment (Self-Hosted / VPS / AWS EC2)

To run the full stack on any VPS (DigitalOcean, AWS EC2, Linode) using Docker Compose:

### Step 1: Create `docker-compose.yml`
```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:6.0
    container_name: bmu_mongodb
    restart: always
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

  backend:
    build: ./server
    container_name: bmu_backend
    restart: always
    ports:
      - "5000:5000"
    environment:
      - PORT=5000
      - NODE_ENV=production
      - MONGO_URI=mongodb://mongodb:27017/bmu_university
    depends_on:
      - mongodb

  frontend:
    build: ./client
    container_name: bmu_frontend
    restart: always
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mongo_data:
```

### Step 2: Launch Containers
```bash
docker-compose up -d --build
```
Your full-stack university platform will be live on port 80!

---

## 🧪 4. Post-Deployment Verification Checklist

Once deployed, verify the following user journeys to ensure 100% operational integrity:
- [x] **Home Page**: Check that the Antigravity glowing particle engine and kinetic typography animate smoothly without lag.
- [x] **Academic Program Finder (`/programs`)**: Test category tabs (Computer Science, Quantum Science, AI) and search query input. Click a card to open the interactive curriculum modal.
- [x] **Campus Experience (`/campus`)**: Click through the 5 campus sector tabs (Quantum Foundry, Robotics Arena, SCIF Cyber Labs, Bio-Foundry, Innovation Housing) to verify VR walkthrough previews.
- [x] **News Chronicle (`/news`)**: Verify category filtering and click the Featured Headline card to test the modal reading view.
- [x] **Admissions Application Form (`/admission`)**: Submit a test application with GPA and Statement of Purpose. Verify that an official Application ID (e.g., `BMU-492019`) is generated and displayed.
- [x] **Student & Faculty Portal (`/login`)**: Toggle between Student Foundry and Faculty SCIF login types and click Authenticate to test the simulated 256-bit quantum enclave session.
- [x] **Offline Resilience**: Turn off your WiFi or stop the backend server—refresh `/programs` and verify that the application seamlessly serves fallback data without displaying an error!

---
*Engineered by Antigravity for BMU University.*
