import { MongoClient } from 'mongodb';

const localUri = 'mongodb://127.0.0.1:27017/bmu';
const remoteUri = 'mongodb+srv://bonamarywebsite_db:BmuWebsite2026%23@bmuweb.dtuwgai.mongodb.net/BmuWeb?retryWrites=true&w=majority&appName=BmuWeb';

async function migrateData() {
  let localClient;
  let remoteClient;

  try {
    console.log('Connecting to local database...');
    localClient = new MongoClient(localUri);
    await localClient.connect();
    const localDb = localClient.db('bmu_university');
    console.log('Connected to local DB.');

    console.log('Connecting to remote Atlas database...');
    remoteClient = new MongoClient(remoteUri);
    await remoteClient.connect();
    // Use BmuWeb as the database name on Atlas
    const remoteDb = remoteClient.db('BmuWeb');
    console.log('Connected to remote Atlas DB.');

    const collections = await localDb.listCollections().toArray();
    console.log(`Found ${collections.length} collections to migrate.`);

    for (const collInfo of collections) {
      const collName = collInfo.name;
      console.log(`\nMigrating collection: ${collName}...`);
      
      const localCollection = localDb.collection(collName);
      const remoteCollection = remoteDb.collection(collName);

      const docs = await localCollection.find({}).toArray();
      console.log(` - Read ${docs.length} documents from local.`);

      if (docs.length > 0) {
        // Clear remote collection first to avoid duplicates
        await remoteCollection.deleteMany({});
        console.log(` - Cleared remote collection.`);

        // Insert documents
        const result = await remoteCollection.insertMany(docs);
        console.log(` - Inserted ${result.insertedCount} documents into remote.`);
      } else {
        console.log(` - Skipping empty collection.`);
      }
    }

    console.log('\nMigration completed successfully!');

  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    if (localClient) await localClient.close();
    if (remoteClient) await remoteClient.close();
  }
}

migrateData();
