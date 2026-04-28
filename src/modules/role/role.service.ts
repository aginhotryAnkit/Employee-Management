import Role from '../../database/models/role.model';

export const getRolesService = async () => {
  return await Role.findAll({ attributes: ['id', 'name'], order: [['name', 'ASC']] });
};
