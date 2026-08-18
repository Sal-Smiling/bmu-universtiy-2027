import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './src/config/db.js';
import programRoutes from './src/routes/programRoutes.js';
import newsRoutes from './src/routes/newsRoutes.js';
import applicationRoutes from './src/routes/applicationRoutes.js';
import contactRoutes from './src/routes/contactRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import documentRoutes from './src/routes/documentRoutes.js';
import settingRoutes from './src/routes/settingRoutes.js';
import partnerRoutes from './src/routes/partnerRoutes.js';
import teamRoutes from './src/routes/teamRoutes.js';
import eventRoutes from './src/routes/eventRoutes.js';
import internshipRoutes from './src/routes/internshipRoutes.js';
import scholarshipRoutes from './src/routes/scholarshipRoutes.js';
import campusLifeRoutes from './src/routes/campusLifeRoutes.js';
import communityServiceRoutes from './src/routes/communityServiceRoutes.js';
import partnershipRoutes from './src/routes/partnershipRoutes.js';
import facultyRoutes from './src/routes/facultyRoutes.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { errorHandler, notFound } from './src/middleware/errorHandler.js';
import { imageProcessor } from './src/middleware/imageProcessor.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Security Header Middleware - customized to allow React SPA scripts, Google Fonts, and external image libraries
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

// CORS Configuration - allow frontend on localhost:5173 and production domains
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:3000', process.env.CLIENT_URL || '*'],
    credentials: true,
  })
);

// Body parser middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// HTTP Request Logging in development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// API Health Check Route
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected (' + mongoose.connection.readyState + ')';
  res.status(200).json({
    success: true,
    status: 'ONLINE',
    database: dbStatus,
    server: 'BMU University API Foundry v1.0',
    timestamp: new Date().toISOString(),
  });
});

// Root Health Check for Render
app.get('/', (req, res) => {
  res.status(200).send('BMU Server is running.');
});

// Image Processing Middleware
app.use(imageProcessor);

// Mount API Routes
app.use('/api/v1/programs', programRoutes);
app.use('/api/v1/news', newsRoutes);
app.use('/api/v1/applications', applicationRoutes);
app.use('/api/v1/contact', contactRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/documents', documentRoutes);
app.use('/api/v1/settings', settingRoutes);
app.use('/api/v1/partners', partnerRoutes);
app.use('/api/v1/team', teamRoutes);
app.use('/api/v1/events', eventRoutes);
app.use('/api/v1/internships', internshipRoutes);
app.use('/api/v1/scholarships', scholarshipRoutes);
app.use('/api/v1/campus-life', campusLifeRoutes);
app.use('/api/v1/community-services', communityServiceRoutes);
app.use('/api/v1/partnerships', partnershipRoutes);
app.use('/api/v1/faculties', facultyRoutes);

// Serve static uploaded files (PDFs and images)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve Frontend SPA from client/dist when compiled
const clientBuildPath = path.resolve(__dirname, '../client/dist');
if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));
  app.get('*', (req, res, next) => {
    if (req.originalUrl.startsWith('/api/') || req.originalUrl.startsWith('/uploads/')) {
      return next();
    }
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 [BMU Server Active]: Running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

export default app;
