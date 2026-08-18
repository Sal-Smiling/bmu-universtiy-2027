const mongoose = require('mongoose');
const uri = 'mongodb+srv://bonamarywebsite_db:BmuWebsite2026%23@bmuweb.dtuwgai.mongodb.net/BmuWeb?retryWrites=true&w=majority&appName=BmuWeb';
mongoose.connect(uri).then(async () => {
  const db = mongoose.connection.db;
  const internships = db.collection('internships');
  const items = [
    { id: 'int-1', company: 'eduCLaaS Singapore', position: 'Cloud Solutions Engineering Intern', stipend: '$1,500 / Month', status: 'Open for Applications', description: '6-month immersive work-study placement.', createdAt: new Date(), updatedAt: new Date() },
    { id: 'int-2', company: 'True VISIONS & Quantum Labs', position: 'AI Security Red Team Analyst Intern', stipend: '$2,000 / Month', status: 'Open for Applications', description: 'Embedded defense research internship.', createdAt: new Date(), updatedAt: new Date() }
  ];
  for (let item of items) {
    await internships.updateOne({ id: item.id }, { $set: item }, { upsert: true });
  }
  console.log('Successfully restored old internships to MongoDB Atlas!');
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
