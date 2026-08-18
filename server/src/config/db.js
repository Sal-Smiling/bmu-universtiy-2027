import mongoose from 'mongoose';

/**
 * Connect to MongoDB database using Mongoose
 * Includes automatic retry logic and connection event monitoring
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    // Use direct replica set URI instead of SRV to bypass Vercel DNS timeouts and false-positive IP whitelist errors
    const uri = 'mongodb://bonamarywebsite_db:BmuWebsite2026%23@ac-huxtikl-shard-00-00.dtuwgai.mongodb.net:27017,ac-huxtikl-shard-00-01.dtuwgai.mongodb.net:27017,ac-huxtikl-shard-00-02.dtuwgai.mongodb.net:27017/BmuWeb?ssl=true&replicaSet=atlas-9eacnd-shard-0&authSource=admin&retryWrites=true&w=majority';
    
    cached.promise = mongoose.connect(uri, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      bufferCommands: false, // Fail fast in serverless after connection
      family: 4, // Force IPv4 (Node 20 defaults to IPv6, which Atlas Free Tier doesn't support)
    }).then((mongoose) => {
      console.log(`[MongoDB Connected]: ${mongoose.connection.host}`);
      return mongoose;
    }).catch(error => {
      console.error(`[MongoDB Connection Error]: ${error.message}`);
      cached.promise = null;
      throw error;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
};

mongoose.connection.on('disconnected', () => {
  console.warn('[MongoDB Disconnected]: Attempting to reconnect...');
});

mongoose.connection.on('error', (err) => {
  console.error(`[MongoDB Runtime Error]: ${err.message}`);
});

export default connectDB;
