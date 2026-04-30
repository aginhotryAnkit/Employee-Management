import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.createTable('departments', {
      id:          { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false },
      name:        { type: DataTypes.STRING, allowNull: false, unique: true },
      code:        { type: DataTypes.STRING, allowNull: false, unique: true },
      description: { type: DataTypes.TEXT, allowNull: true },
      head_id:     { type: DataTypes.UUID, allowNull: true, references: { model: 'users', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'SET NULL' },
      location:    { type: DataTypes.STRING, allowNull: true },
      budget:      { type: DataTypes.DECIMAL(12, 2), allowNull: true },
      status:      { type: DataTypes.ENUM('ACTIVE', 'INACTIVE'), defaultValue: 'ACTIVE', allowNull: false },
      created_by:  { type: DataTypes.UUID, allowNull: true },
      updated_by:  { type: DataTypes.UUID, allowNull: true },
      createdAt:   { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
      updatedAt:   { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    });
  },
  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.dropTable('departments');
  },
};
