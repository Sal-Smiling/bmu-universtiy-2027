import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Partner from './src/models/Partner.js';

dotenv.config();

const test = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const partners = await Partner.find({});
    console.log(`Found ${partners.length} partners.`);
    if (partners.length > 0) {
      const p = partners[0];
      console.log('Testing update on:', p.title);
      p.websiteUrl = 'https://test.com';
      await p.save();
      console.log('Update successful!');
    }
  } catch (err) {
    console.error('Error:', err);
  } finally {
    mongoose.connection.close();
  }
};

test();
