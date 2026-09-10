const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Section = require('../models/Section');

dotenv.config({ path: 'server/.env' });

async function seedSections() {
  const defaults = [
    { name: 'Work Docs', color: 'blue' },
    { name: 'Learning Repos', color: 'emerald' },
    { name: 'Entertainment', color: 'pink' },
  ];

  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI missing in server/.env');
    }

    await connectDB(process.env.MONGO_URI);

    for (const section of defaults) {
      await Section.updateOne(
        { name: section.name },
        { $setOnInsert: section },
        { upsert: true }
      );
    }

    console.log('✅ Default sections seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
}

seedSections();
