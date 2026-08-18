import mongoose from 'mongoose';

const scholarshipSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, default: '' },
    description: { type: String, required: true },
    academicYear: { type: String, default: 'Academic Year 2025–2026' },
    images: [{ type: String }],
    status: { type: String, default: 'Active' }
  },
  { timestamps: true }
);

const Scholarship = mongoose.model('Scholarship', scholarshipSchema);

export default Scholarship;
