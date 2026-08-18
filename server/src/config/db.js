import mongoose from 'mongoose';

/**
 * Connect to MongoDB database using Mongoose
 * Includes automatic retry logic and connection event monitoring
 */
const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/bmu_university';
    
    let connected = false;
    while (!connected) {
      try {
        const conn = await mongoose.connect(uri, {
          serverSelectionTimeoutMS: 5000,
          socketTimeoutMS: 45000,
        });
        console.log(`[MongoDB Connected]: ${conn.connection.host} (${conn.connection.name})`);
        connected = true;
      } catch (error) {
        console.error(`[MongoDB Connection Error]: ${error.message}`);
        console.log('Retrying connection in 5 seconds...');
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }
  } catch (error) {
    console.error('Fatal database error:', error);
  }
};

mongoose.connection.on('disconnected', () => {
  console.warn('[MongoDB Disconnected]: Attempting to reconnect...');
});

mongoose.connection.on('error', (err) => {
  console.error(`[MongoDB Runtime Error]: ${err.message}`);
});

export default connectDB;
