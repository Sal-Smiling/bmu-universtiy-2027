import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    ticketId: {
      type: String,
      required: true,
      unique: true,
      default: () => `TICKET-${Math.floor(10000 + Math.random() * 90000)}`,
    },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String },
    department: {
      type: String,
      required: true,
      enum: [
        'Admissions Office',
        'Research Partnerships & Grants',
        'Academic Affairs & Dean',
        'Campus Tours & Visitor Center',
        'Silicon Valley Corporate Incubator',
        'General University Inquiry',
      ],
    },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ['New', 'In Progress', 'Resolved'],
      default: 'New',
    },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
