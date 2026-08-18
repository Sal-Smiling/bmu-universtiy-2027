import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Partnership from './src/models/Partnership.js';

dotenv.config();

const oldMOUs = [
    {
      id: 'mou-1',
      partner: 'eduCLaaS Singapore & True VISIONS',
      category: 'Work-Study Articulation & Cloud Academy',
      date: 'July 4, 2026',
      status: 'Active Charter',
    },
    {
      id: 'mou-2',
      partner: 'Yulin University (China)',
      category: '2+2 Dual Bachelor Degree Exchange',
      date: 'June 29, 2026',
      status: 'Signed & Ratified',
    },
    {
      id: 'mou-3',
      partner: 'UCAM (Catholic University of Murcia, Spain)',
      category: 'Postgraduate Quantum Business MBA Partnership',
      date: 'June 18, 2026',
      status: 'Active Charter',
    },
];

async function restore() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
        
        for (const mou of oldMOUs) {
            await Partnership.findOneAndUpdate(
                { id: mou.id },
                mou,
                { upsert: true, new: true }
            );
        }
        
        console.log('Successfully restored old MOUs to MongoDB Atlas!');
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

restore();
