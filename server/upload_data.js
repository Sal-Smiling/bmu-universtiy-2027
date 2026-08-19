import { MongoClient } from 'mongodb';
import { EJSON } from 'bson';
import fs from 'fs/promises';
import path from 'path';

const remoteUri = 'mongodb+srv://bonamarywebsite_db:BmuWebsite2026%23@bmuweb.dtuwgai.mongodb.net/BmuWeb?retryWrites=true&w=majority&appName=BmuWeb';
const downloadsDir = 'C:\\Users\\DELL\\Downloads';

async function uploadData() {
  let client;
  try {
    console.log('Connecting to remote Atlas database...');
    client = new MongoClient(remoteUri);
    await client.connect();
    const db = client.db('BmuWeb');
    console.log('Connected to Atlas DB.');

    const files = await fs.readdir(downloadsDir);
    const jsonFiles = files.filter(f => f.startsWith('BmuWeb.') && f.endsWith('.json'));

    if (jsonFiles.length === 0) {
      console.log('No exported JSON files found in Downloads folder.');
      return;
    }

    for (const file of jsonFiles) {
      // The file name is like BmuWeb.collectionName.json
      const collectionName = file.split('.')[1];
      console.log(`\nUploading collection: ${collectionName}...`);
      
      const filePath = path.join(downloadsDir, file);
      const dataRaw = await fs.readFile(filePath, 'utf-8');
      
      let docs;
      try {
        // Compass exports an array of objects in MongoDB Extended JSON (EJSON)
        docs = EJSON.parse(dataRaw);
      } catch (e) {
        console.error(`Failed to parse EJSON in ${file}:`, e.message);
        continue;
      }

      // Compass export format can be single object or array
      if (!Array.isArray(docs)) {
        docs = [docs];
      }

      if (docs.length > 0 && Object.keys(docs[0]).length > 0) {
        const collection = db.collection(collectionName);
        
        // Remove existing to prevent duplicate key errors on _id
        await collection.deleteMany({});
        
        // Convert MongoDB EJSON $oid to actual ObjectId string if necessary, 
        // though native driver usually accepts it if we just insert it.
        // Actually, native driver accepts _id as string or object.
        const result = await collection.insertMany(docs);
        console.log(` ✅ Inserted ${result.insertedCount} documents into ${collectionName}`);
      } else {
        console.log(` ⏩ Skipping empty collection ${collectionName}`);
      }
    }

    console.log('\n🎉 ALL DATA UPLOADED SUCCESSFULLY!');

  } catch (error) {
    console.error('Upload failed:', error);
  } finally {
    if (client) await client.close();
  }
}

uploadData();
