const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://bonamarywebsite_db:BmuWebsite2026%23@bmuweb.dtuwgai.mongodb.net/BmuWeb?retryWrites=true&w=majority&appName=BmuWeb';
const client = new MongoClient(uri, {
  serverSelectionTimeoutMS: 5000
});
client.connect().then(() => {
  console.log("Connected successfully to MongoDB SRV!");
  client.close();
}).catch(err => {
  console.error("Connection failed:", err.message);
});
