const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const uri = 'mongodb+srv://bonamarywebsite_db:BmuWebsite2026%23@bmuweb.dtuwgai.mongodb.net/BmuWeb?retryWrites=true&w=majority&appName=BmuWeb';

mongoose.connect(uri).then(async () => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('password123', salt);
  await mongoose.connection.db.collection('users').updateOne(
    { email: 'admin@bmu.edu.kh' },
    { $set: { password: hashedPassword } }
  );
  console.log('Password reset complete!');
  process.exit(0);
});
