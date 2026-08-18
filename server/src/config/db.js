import mongoose from 'mongoose';

/**
 * Connect to MongoDB database using Mongoose
 * Includes automatic retry logic and connection event monitoring
 */
const connectDB = async () => {
  try {
    // Hardcoded direct replica set string to bypass Render/Atlas SRV DNS resolution issues causing SSL Alert 80
    const uri = 'mongodb://bonamarywebsite_db:BmuWebsite2026%23@ac-huxtikl-shard-00-00.dtuwgai.mongodb.net:27017,ac-huxtikl-shard-00-01.dtuwgai.mongodb.net:27017,ac-huxtikl-shard-00-02.dtuwgai.mongodb.net:27017/BmuWeb?ssl=true&replicaSet=atlas-huxtikl-shard-0&authSource=admin&retryWrites=true&w=majority';

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
