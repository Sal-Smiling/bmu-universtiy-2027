import mongoose from 'mongoose';

const programSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true, trim: true },
    department: { type: String, required: true },
    category: {
      type: String,
      required: true,
      default: 'Artificial Intelligence'
    },
    degree: {
      type: String,
      required: true,
      default: 'Undergraduate'
    },
    scope: {
      type: String,
      enum: ['International Academic Programs', 'National Academic Programs'],
      default: 'International Academic Programs'
    },
    duration: { type: String, required: true },
    tuition: { type: String, required: true },
    featured: { type: Boolean, default: false },
    rating: { type: String, default: '4.95' },
    studentsEnrolled: { type: Number, default: 120 },
    description: { type: String, required: true },
    careerPathways: [{ type: String }],
    curriculumHighlights: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const Program = mongoose.model('Program', programSchema);

export default Program;
