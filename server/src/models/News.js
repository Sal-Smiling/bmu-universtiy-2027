import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
    },
    date: { type: String, required: true },
    author: { type: String, required: true },
    readTime: { type: String, default: '4 min read' },
    featured: { type: Boolean, default: false },
    image: { type: String, required: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: String }],
    gallery: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const News = mongoose.model('News', newsSchema);

export default News;
