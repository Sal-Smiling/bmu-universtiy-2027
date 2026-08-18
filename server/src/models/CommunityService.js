import mongoose from 'mongoose';

const communityServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
  programName: {
    type: String,
    required: true,
    default: 'Volunteer Exchange Program',
  },
  duration: {
    type: String,
    default: '14-Day Global Visit',
  },
  description: {
    type: String,
    required: true,
  },
  acknowledgements: {
    type: [String],
    default: [],
  },
  image: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

const CommunityService = mongoose.model('CommunityService', communityServiceSchema);

export default CommunityService;
