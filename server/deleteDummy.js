const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const names = ['Cybersecurity', 'Computer Science', 'Artificial Intelligence', 'Engineering', 'Bio-Tech'];
  const result = await mongoose.connection.db.collection('faculties').deleteMany({ name: { $in: names } });
  console.log('Deleted:', result.deletedCount);
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
