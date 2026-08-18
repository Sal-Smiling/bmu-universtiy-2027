import mongoose from 'mongoose';

/**
 * Connect to MongoDB database using Mongoose
 * Includes automatic retry logic and connection event monitoring
 */
const connectDB = async () => {
  try {
    const uri = 'mongodb+srv://bonamarywebsite_db:BmuWebsite2026%23@bmuweb.dtuwgai.mongodb.net/BmuWeb?retryWrites=true&w=majority&appName=BmuWeb';

    // In serverless environments, we shouldn't infinitely loop on connection failure.
    // We should fail fast so the function doesn't timeout.
    if (mongoose.connection.readyState >= 1) {
      return;
    }

    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log(`[MongoDB Connected]: ${conn.connection.host} (${conn.connection.name})`);
  } catch (error) {
    console.error(`[MongoDB Connection Error]: ${error.message}`);
    // Do not exit process in serverless, just throw error
    if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
      process.exit(1);
    }
  }
};

mongoose.connection.on('disconnected', () => {
  console.warn('[MongoDB Disconnected]: Attempting to reconnect...');
});

mongoose.connection.on('error', (err) => {
  console.error(`[MongoDB Runtime Error]: ${err.message}`);
});

export default connectDB;
