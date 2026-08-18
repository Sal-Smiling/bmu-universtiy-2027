import mongoose from 'mongoose';

const internshipSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    company: { type: String, required: true, trim: true }, // e.g., 'eduCLaaS Singapore', 'Quantum Cloud Tech'
    position: { type: String, required: true },
    department: { type: String, default: 'AI & Supercomputing Engineering' },
    location: { type: String, default: 'Hybrid / Singapore Enclave' },
    stipend: { type: String, default: '$1,200 - $2,500 / Month' },
    status: { type: String, default: 'Open for Applications' },
    image: { type: String, default: '' },
    postedDate: { type: String, default: 'July 2026' },
    requirements: [{ type: String }],
    description: { type: String, required: true }
  },
  { timestamps: true }
);

const Internship = mongoose.model('Internship', internshipSchema);

export default Internship;
