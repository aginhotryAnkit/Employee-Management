import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.addColumn('departments', 'code',        { type: DataTypes.STRING, allowNull: true, unique: true });
    await queryInterface.addColumn('departments', 'description', { type: DataTypes.TEXT, allowNull: true });
    await queryInterface.addColumn('departments', 'head_id',     { type: DataTypes.UUID, allowNull: true });
    await queryInterface.addColumn('departments', 'location',    { type: DataTypes.STRING, allowNull: true });
    await queryInterface.addColumn('departments', 'budget',      { type: DataTypes.DECIMAL(12, 2), allowNull: true });
    await queryInterface.addColumn('departments', 'status',      { type: DataTypes.ENUM('ACTIVE', 'INACTIVE'), defaultValue: 'ACTIVE', allowNull: false });
    await queryInterface.addColumn('departments', 'created_by',  { type: DataTypes.UUID, allowNull: true });
    await queryInterface.addColumn('departments', 'updated_by',  { type: DataTypes.UUID, allowNull: true });
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.removeColumn('departments', 'code');
    await queryInterface.removeColumn('departments', 'description');
    await queryInterface.removeColumn('departments', 'head_id');
    await queryInterface.removeColumn('departments', 'location');
    await queryInterface.removeColumn('departments', 'budget');
    await queryInterface.removeColumn('departments', 'status');
    await queryInterface.removeColumn('departments', 'created_by');
    await queryInterface.removeColumn('departments', 'updated_by');
  },
};
