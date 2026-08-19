const { MongoClient } = require('mongodb');

const oldUri = 'mongodb+srv://bonamarywebsite_db:BmuWebsite2026%23@bmuweb.dtuwgai.mongodb.net/BmuWeb?retryWrites=true&w=majority';
const newUri = 'mongodb+srv://pisal:Bumweb101@bmuweb.rxetoff.mongodb.net/BmuWeb?retryWrites=true&w=majority&appName=BMUWeb';

async function migrate() {
  console.log("Connecting to databases...");
  const oldClient = new MongoClient(oldUri);
  const newClient = new MongoClient(newUri);
  
  try {
    await oldClient.connect();
    await newClient.connect();
    
    const oldDb = oldClient.db('BmuWeb');
    const newDb = newClient.db('BmuWeb');
    
    // Get all collections
    const collections = await oldDb.listCollections().toArray();
    console.log(`Found ${collections.length} collections to migrate.`);
    
    for (const col of collections) {
      const colName = col.name;
      console.log(`Migrating collection: ${colName}...`);
      
      const oldCollection = oldDb.collection(colName);
      const newCollection = newDb.collection(colName);
      
      // Fetch all documents
      const docs = await oldCollection.find({}).toArray();
      
      if (docs.length > 0) {
        // Clear new collection first to avoid duplicates
        await newCollection.deleteMany({});
        // Insert all documents
        await newCollection.insertMany(docs);
        console.log(`  -> Inserted ${docs.length} documents.`);
      } else {
        console.log(`  -> Empty collection, skipped.`);
      }
    }
    
    console.log("Migration completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await oldClient.close();
    await newClient.close();
  }
}

migrate();
