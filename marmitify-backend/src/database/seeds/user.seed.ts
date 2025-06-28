import { DataSource } from 'typeorm';
import { User } from '../../modules/user/user.entity';

export const seedUsers = async (dataSource: DataSource) => {
  const userRepository = dataSource.getRepository(User);

  await userRepository.save([
    {
        name: 'Admin',
        email: 'admin@gmail.com',
        password: 'admin123',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
  ]);
};