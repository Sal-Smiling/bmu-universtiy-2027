import mongoose from 'mongoose';

const partnershipSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    partner: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    date: { type: String, default: '' },
    status: { type: String, default: 'Active Charter' },
    image: { type: String, default: '' }, // Base64 image
    gallery: [{ type: String }] // Array of base64 images
  },
  { timestamps: true }
);

const Partnership = mongoose.model('Partnership', partnershipSchema);

export default Partnership;
