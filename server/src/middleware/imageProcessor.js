import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const UPLOADS_DIR = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Helper to check if string is a base64 image URL
const isBase64Image = (str) => {
  return typeof str === 'string' && str.startsWith('data:image/');
};

// Convert Base64 to WebP and save to disk
const processBase64ToWebP = async (base64String) => {
  try {
    const matches = base64String.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return base64String; // Return original if invalid format
    }

    const imageBuffer = Buffer.from(matches[2], 'base64');
    const uniqueFilename = `img-${Date.now()}-${Math.round(Math.random() * 1E9)}.webp`;
    const outputPath = path.join(UPLOADS_DIR, uniqueFilename);

    await sharp(imageBuffer)
      .webp({ quality: 80, effort: 4 }) // Aggressive compression for web
      .toFile(outputPath);

    return `/uploads/${uniqueFilename}`;
  } catch (err) {
    console.error('Error processing image with sharp:', err);
    return base64String; // Fallback to original Base64 if conversion fails
  }
};

// Deep traverse an object or array and replace Base64 strings with WebP URLs
const traverseAndProcess = async (obj) => {
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      if (isBase64Image(obj[i])) {
        obj[i] = await processBase64ToWebP(obj[i]);
      } else if (typeof obj[i] === 'object' && obj[i] !== null) {
        await traverseAndProcess(obj[i]);
      }
    }
  } else if (typeof obj === 'object' && obj !== null) {
    for (const key in obj) {
      if (isBase64Image(obj[key])) {
        obj[key] = await processBase64ToWebP(obj[key]);
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        await traverseAndProcess(obj[key]);
      }
    }
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
