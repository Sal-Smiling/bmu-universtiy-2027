import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide document title'],
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Scholarship Announcement', 'Academic Regulation', 'Research Whitepaper', 'Exchange Report', 'Syllabus Archive'],
      default: 'Research Whitepaper',
    },
    description: {
      type: String,
      default: 'Official university institutional archive document.',
    },
    fileUrl: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    fileSize: {
      type: String,
      default: '2.4 MB',
    },
    fileType: {
      type: String,
      default: 'application/pdf',
    },
    uploadedBy: {
      type: String,
      default: 'BMU Academic Registrar & Library Admin',
    },
    downloads: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Document = mongoose.model('Document', documentSchema);
export default Document;
