import mongoose from 'mongoose';
import { Jimp } from 'jimp';

const MONGODB_URI = 'mongodb+srv://bonamarywebsite_db:BmuWebsite2026%23@bmuweb.dtuwgai.mongodb.net/BmuWeb?retryWrites=true&w=majority&appName=BmuWeb';

const compressBase64Image = async (base64Str) => {
  if (!base64Str) return base64Str;
  try {
    const matches = base64Str.match(/^data:(.+);base64,(.*)$/);
    if (!matches || matches.length !== 3) return base64Str;
    const mime = matches[1];
    const data = matches[2];

    const buffer = Buffer.from(data, 'base64');
    
    // Only compress if larger than 250KB
    if (buffer.length < 250 * 1024) return base64Str;
    
    const image = await Jimp.read(buffer);
    
    if (image.bitmap.width > 800) {
      image.resize({ w: 800 });
    }
    
    const compressedBuffer = await image.getBuffer(mime);
    return `data:${mime};base64,${compressedBuffer.toString('base64')}`;
  } catch (error) {
    console.error('Error compressing image:', error);
    return base64Str;
  }
};

const run = async () => {
  await mongoose.connect(MONGODB_URI);
  const Partnership = mongoose.model('Partnership', new mongoose.Schema({}, { strict: false }));
  
  const mous = await Partnership.find({});
  console.log(`Found ${mous.length} MOUs`);
  
  for (let mou of mous) {
    console.log(`Processing MOU: ${mou.partner}`);
    let updated = false;
    let newDoc = { image: mou.get('image'), gallery: mou.get('gallery') };
    
    if (newDoc.image && newDoc.image.length > 300 * 1024) {
      console.log(`Compressing main image (length: ${newDoc.image.length})`);
      newDoc.image = await compressBase64Image(newDoc.image);
      updated = true;
    }
    
    if (newDoc.gallery && Array.isArray(newDoc.gallery)) {
      const newGallery = [];
      for (let i = 0; i < newDoc.gallery.length; i++) {
        let img = newDoc.gallery[i];
        if (img && img.length > 300 * 1024) {
          console.log(`Compressing gallery image ${i} (length: ${img.length})`);
          img = await compressBase64Image(img);
          updated = true;
        }
        newGallery.push(img);
      }
      newDoc.gallery = newGallery;
    }
    
    if (updated) {
      await Partnership.updateOne({ _id: mou._id }, { $set: newDoc });
      console.log(`Updated MOU: ${mou.partner}`);
    } else {
      console.log(`No compression needed for MOU: ${mou.partner}`);
    }
  }
  
  console.log('Done!');
  process.exit(0);
};

run().catch(console.error);
