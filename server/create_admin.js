import mongoose from 'mongoose';
import dotenv from 'dotenv';
import readline from 'readline';
import User from './src/models/User.js';

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/bmu');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const createAdmin = async () => {
  await connectDB();

  rl.question('Enter Admin Name (e.g. Super Admin): ', (name) => {
    rl.question('Enter Admin Email (e.g. admin@bmu.edu.kh): ', (email) => {
      rl.question('Enter Secure Password: ', async (password) => {
        try {
          const userExists = await User.findOne({ email });

          if (userExists) {
            console.log('\n❌ An admin with this email already exists!');
          } else {
            const user = await User.create({
              name,
              email,
              password, // Mongoose pre-save hook will hash this securely
              role: 'admin'
            });

            console.log('\n✅ Admin account created successfully!');
            console.log(`Email: ${user.email}`);
            console.log('You can now log into the Dashboard using these credentials.');
          }
        } catch (error) {
          console.error('\n❌ Error creating admin:', error.message);
        } finally {
          process.exit();
        }
      });
    });
  });
};

createAdmin();
