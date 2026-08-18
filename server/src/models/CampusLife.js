import mongoose from 'mongoose';

const campusLifeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

const CampusLife = mongoose.model('CampusLife', campusLifeSchema);

export default CampusLife;
