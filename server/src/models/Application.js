import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    applicationId: {
      type: String,
      required: true,
      unique: true,
      default: () => `BMU-${Math.floor(100000 + Math.random() * 900000)}`,
    },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    gender: { type: String, required: true },
    nationality: { type: String, required: true },
    degreeLevel: {
      type: String,
      required: true,
      enum: ['Undergraduate', 'Graduate', 'Doctoral'],
    },
    programOfInterest: { type: String, required: true },
    previousInstitution: { type: String, required: true },
    gpa: { type: Number, required: true, min: 0.0, max: 4.0 },
    statementOfPurpose: { type: String, required: true },
    portfolioUrl: { type: String },
    status: {
      type: String,
      enum: ['Submitted', 'Under Review', 'Interview Scheduled', 'Accepted', 'Waitlisted', 'Rejected'],
      default: 'Submitted',
    },
    submittedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model('Application', applicationSchema);

export default Application;
