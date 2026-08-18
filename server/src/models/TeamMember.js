import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    title: { type: String, required: true }, // e.g., 'President & Dean of Quantum Systems', 'Vice Dean'
    roleCategory: {
      type: String,
      required: true,
      default: 'Our Management Team'
    },
    highlight: { type: String, default: '' }, // e.g. 'Institutional Founder', 'University President'
    message: { type: String, default: '' }, // For leadership messages / welcome addresses
    photoUrl: { type: String, default: '' },
    bio: { type: String, default: 'Distinguished academic and technology leader at BMU University.' },
    facebook: { type: String, default: '' }, // e.g., 'https://facebook.com/bonamary'
    email: { type: String, default: '' }, // e.g., 'info@bonamary.edu.kh'
    department: { type: String, default: 'Academic Leadership & Deans' },
    education: { type: String, default: 'Ph.D. / Advanced Executive Leadership' },
    publications: { type: Number, default: 35 },
    citations: { type: String, default: '1,800+' },
    office: { type: String, default: 'Executive Academic Wing' },
    order: { type: Number, default: 1 }
  },
  { timestamps: true }
);

const TeamMember = mongoose.model('TeamMember', teamMemberSchema);

export default TeamMember;
