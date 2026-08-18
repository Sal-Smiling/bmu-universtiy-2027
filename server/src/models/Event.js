import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      default: 'Upcoming Events & Symposia'
    },
    eventDate: { type: String, required: true },
    location: { type: String, default: 'BMU Main Campus & SCIF Enclave' },
    photos: [{ type: String }], // Multi-photo gallery support
    description: { type: String, required: true },
    organizer: { type: String, default: 'BMU Student Affairs' }
  },
  { timestamps: true }
);

const Event = mongoose.model('Event', eventSchema);

export default Event;
