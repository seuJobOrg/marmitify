import { AppDataSource } from '../data-source';
import { seedUsers } from './user.seed';

AppDataSource.initialize()
  .then(async (dataSource) => {
    await seedUsers(dataSource);
    console.log('Seeding completed.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seeding error:', error);
    process.exit(1);
  });