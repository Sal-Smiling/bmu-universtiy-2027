import multer from 'multer';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dqbojrbs5',
  api_key: process.env.CLOUDINARY_API_KEY || '118219649171455',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'cJTWJSeErSKDlZy-LD8W9Mpqdtc',
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'bmu_university_uploads',
      resource_type: 'auto', // supports pdf, doc, images, etc.
      public_id: `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1e9)}`,
    };
  },
});

const checkFileType = (file, cb) => {
  const filetypes = /pdf|doc|docx|png|jpg|jpeg/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype) || file.mimetype === 'application/pdf';

  if (extname || mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only PDF, DOC, and Image files are supported!'));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB max limit for PDFs/research documents
  fileFilter(req, file, cb) {
    checkFileType(file, cb);
  },
});

export default upload;
