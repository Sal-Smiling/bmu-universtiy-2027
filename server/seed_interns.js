import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import Internship from './src/models/Internship.js';
import dotenv from 'dotenv';
dotenv.config();

const clientAssetsDir = path.resolve('../client/src/assets');

function getBase64Image(filename, mimeType) {
  try {
    const filePath = path.join(clientAssetsDir, filename);
    const fileData = fs.readFileSync(filePath);
    return `data:${mimeType};base64,${fileData.toString('base64')}`;
  } catch (error) {
    console.error(`Error reading ${filename}:`, error.message);
    return '';
  }
}

const internships = [
  {
    id: `int-${Date.now()}-1`,
    company: 'លី ម៉ី (Ly Mey)',
    position: 'ICT Teacher at Code Jesters (Year 3)',
    description: 'Teaching at True Visions International School of Cambodia',
    status: 'Year 3 Scholar',
    image: getBase64Image('intern-1.jpg', 'image/jpeg')
  },
  {
    id: `int-${Date.now()}-2`,
    company: 'ផេង ដាលីស (Pheng Dalis)',
    position: 'គ្រប់គ្រងថ្នាក់ភាសាចិន នៅ BMU (Year 3)',
    description: 'Chinese Language Class Manager at Bonamary University',
    status: 'Year 3 Scholar',
    image: getBase64Image('intern-2.png', 'image/png')
  },
  {
    id: `int-${Date.now()}-3`,
    company: 'សោម រស្មីស្រីពេជ្រ (Som Rasmey Sreypich)',
    position: 'Academic Officer at BMU (Year 3)',
    description: 'Academic Operations & Support at Bonamary University',
    status: 'Year 3 Scholar',
    image: getBase64Image('intern-3.png', 'image/png')
  },
  {
    id: `int-${Date.now()}-4`,
    company: 'ឆាយ ពន្លឺពេជ្រ (Chhay Ponluepich)',
    position: 'ICT Teacher at Code Jesters (Year 3)',
    description: 'Teaching at True Visions International School of Cambodia',
    status: 'Year 3 Scholar',
    image: getBase64Image('intern-4.png', 'image/png')
  }
];

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bmu-db')
  .then(async () => {
    console.log('Connected to MongoDB');
    for (const intern of internships) {
      // Check if they exist by company name
      const exists = await Internship.findOne({ company: intern.company });
      if (!exists) {
        await Internship.create(intern);
        console.log(`Inserted: ${intern.company}`);
      } else {
        console.log(`Already exists: ${intern.company}`);
      }
    }
    console.log('Seeding complete.');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
