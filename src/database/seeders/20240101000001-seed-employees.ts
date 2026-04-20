import { QueryInterface } from 'sequelize';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

module.exports = {
  async up(queryInterface: QueryInterface): Promise<void> {
    const saltRounds = 10;
    await queryInterface.bulkInsert('employees', [
      {
        id: uuidv4(),
        name: 'Super Admin',
        email: 'admin@company.com',
        password: await bcrypt.hash('Admin@123', saltRounds),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'John Employee',
        email: 'john@company.com',
        password: await bcrypt.hash('John@123', saltRounds),
        role: 'employee',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.bulkDelete('employees', {});
  },
};
