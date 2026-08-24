import fs from 'fs';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dqbojrbs5',
  api_key: process.env.CLOUDINARY_API_KEY || '118219649171455',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'cJTWJSeErSKDlZy-LD8W9Mpqdtc',
});
const UPLOADS_DIR = path.join(process.cwd(), 'uploads');
// Skip directory creation in serverless environments (read-only filesystem)
if (!process.env.VERCEL) {
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
}

// Helper to check if string is a base64 image URL
const isBase64Image = (str) => {
  return typeof str === 'string' && str.startsWith('data:image/');
};

// Upload Base64 to Cloudinary and return secure URL
const processBase64ToWebP = async (base64String) => {
  try {
    const result = await cloudinary.uploader.upload(base64String, {
      folder: 'bmu_university',
      resource_type: 'auto',
    });
    return result.secure_url;
  } catch (err) {
    console.error('Cloudinary upload error in imageProcessor:', err);
    return base64String; // Fallback to original string if upload fails
  }
};

// Deep traverse an object or array and replace Base64 strings with WebP URLs concurrently
const traverseAndProcess = async (obj) => {
  if (Array.isArray(obj)) {
    const promises = obj.map(async (item, i) => {
      if (isBase64Image(item)) {
        obj[i] = await processBase64ToWebP(item);
      } else if (typeof item === 'object' && item !== null) {
        await traverseAndProcess(item);
      }
    });
    await Promise.all(promises);
  } else if (typeof obj === 'object' && obj !== null) {
    const keys = Object.keys(obj);
    const promises = keys.map(async (key) => {
      if (isBase64Image(obj[key])) {
        obj[key] = await processBase64ToWebP(obj[key]);
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        await traverseAndProcess(obj[key]);
      }
    });
    await Promise.all(promises);
  }
};

export const imageProcessor = async (req, res, next) => {
  if (req.body && (req.method === 'POST' || req.method === 'PUT')) {
    try {
      await traverseAndProcess(req.body);
    } catch (err) {
      console.error('Error in imageProcessor middleware:', err);
    }
  }
  next();
};
