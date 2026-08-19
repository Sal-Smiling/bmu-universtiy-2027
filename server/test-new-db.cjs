const { MongoClient } = require('mongodb');

async function test(uri) {
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
  try {
    await client.connect();
    console.log("SUCCESS for:", uri.replace(/:([^:@]+)@/, ':***@'));
    await client.close();
  } catch (e) {
    console.error("FAILED for:", uri.replace(/:([^:@]+)@/, ':***@'), e.message);
  }
}

async function run() {
  await test('mongodb+srv://pisal:Bumweb101@bmuweb.rxetoff.mongodb.net/BmuWeb?retryWrites=true&w=majority&appName=BMUWeb');
  await test('mongodb+srv://sal:Bumweb101@bmuweb.rxetoff.mongodb.net/BmuWeb?retryWrites=true&w=majority&appName=BMUWeb');
}
run();
