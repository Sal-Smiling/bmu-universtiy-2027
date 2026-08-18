import mongoose from 'mongoose';

const siteSettingSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true }, // e.g., 'banner', 'stats', 'tuition_fees'
    title: { type: String },
    subtitle: { type: String },
    tag: { type: String },
    image: { type: String },
    slides: { type: mongoose.Schema.Types.Mixed }, // Array of custom carousel slides
    emblems: { type: mongoose.Schema.Types.Mixed }, // Array of official partner emblems
    content: { type: mongoose.Schema.Types.Mixed }, // JSON or array format for stats/tuition tables
    lastUpdatedBy: { type: String, default: 'Admin Command Center' },
  },
  { timestamps: true }
);

const SiteSetting = mongoose.model('SiteSetting', siteSettingSchema);

export default SiteSetting;
