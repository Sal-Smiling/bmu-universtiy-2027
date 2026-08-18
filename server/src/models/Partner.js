import mongoose from 'mongoose';

const partnerSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true, trim: true }, // Partner University or Organization
    category: {
      type: String,
      required: true,
      enum: ['International Partners & Collaborations', 'Regional Alliances', 'Local Partners & Collaborations', 'Memorandum of Understanding & Official Signings', 'Our Partners logo'],
      default: 'International Partners & Collaborations'
    },
    location: { type: String, default: 'Global' },
    badge: { type: String, default: 'Global Partner' },
    scope: { type: String, default: 'Dual Degree & Research Articulation' },
    logoUrl: { type: String, default: '' },
    signingPhotoUrl: { type: String, default: '' }, // For MOU Signings
    status: { type: String, default: 'Active Charter' },
    signedDate: { type: String, default: '2026' },
    description: { type: String, default: 'Strategic academic and technological collaboration.' },
    websiteUrl: { type: String, default: '' }
  },
  { timestamps: true }
);

const Partner = mongoose.model('Partner', partnerSchema);

export default Partner;
