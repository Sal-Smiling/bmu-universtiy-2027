import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const titles = [
    'B.S. in Cyber Warfare & Zero-Trust Architecture',
    'B.S. in Quantum Computing & Algorithms',
    'M.S. in Autonomous AI & Humanoid Robotics',
    'B.S. in Silicon Valley Financial Technology & DeFi',
    'M.S. in Computational Bioengineering & Genomics',
    'Ph.D. in Neural Engineering & BCI'
  ];
  const result = await mongoose.connection.db.collection('programs').deleteMany({ title: { $in: titles } });
  console.log('Deleted programs:', result.deletedCount);
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
