import { Op } from 'sequelize';
import sequelize from '../../config/database';
import User from '../../database/models/user.model';
import UserInvite from '../../database/models/user_invite.model';
import Department from '../../database/models/department.model';
import Role from '../../database/models/role.model';
import { IDashboardResponse, IPendingInvite, IRecentEmployee } from './dashboard.interface';

const getExpiresIn = (expiresAt: Date): string => {
  const diffMs = expiresAt.getTime() - Date.now();
  if (diffMs <= 0) return 'Expired';
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''}`;
  const days = Math.floor(hours / 24);
  return `${days} day${days !== 1 ? 's' : ''}`;
};

export const getDashboardService = async (): Promise<IDashboardResponse> => {
  const [
    totalEmployees,
    activeEmployees,
    pendingInvitesCount,
    departmentsCount,
    recentUsers,
    pendingInvites,
    departmentStats,
  ] = await Promise.all([
    // summary counts
    User.count(),
    User.count({ where: { is_active: true } }),
    UserInvite.count({ where: { is_used: false, expires_at: { [Op.gt]: new Date() } } }),
    Department.count(),

    // recent 5 employees ordered by createdAt
    User.findAll({
      limit: 5,
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'name', 'is_active'],
      include: [{ model: Role, as: 'role', attributes: ['name'] }],
    }),

    // pending invites with user email and role
    UserInvite.findAll({
      where: { is_used: false, expires_at: { [Op.gt]: new Date() } },
      include: [{
        model: User,
        as: 'user',
        attributes: ['email'],
        include: [{ model: Role, as: 'role', attributes: ['name'] }],
      }],
    }),

    // department wise employee count
    User.findAll({
      attributes: ['department_id', [sequelize.fn('COUNT', sequelize.col('User.id')), 'count']],
      include: [{ model: Department, as: 'department', attributes: ['name'] }],
      group: ['department_id', 'department.id'],
      raw: false,
    }),
  ]);

  const recentEmployees: IRecentEmployee[] = recentUsers.map((u: any) => ({
    id: u.id,
    name: u.name,
    role: u.role?.name ?? 'N/A',
    status: u.is_active ? 'Active' : 'Pending Invite',
  }));

  const pendingInvitesList: IPendingInvite[] = pendingInvites.map((inv: any) => ({
    email: inv.user?.email ?? 'N/A',
    role: inv.user?.role?.name ?? 'N/A',
    expiresIn: getExpiresIn(inv.expires_at),
  }));

  const deptStats = departmentStats.map((d: any) => ({
    department: d.department?.name ?? 'N/A',
    count: Number(d.get('count')),
  }));

  return {
    summary: {
      totalEmployees,
      activeEmployees,
      pendingInvites: pendingInvitesCount,
      departments: departmentsCount,
    },
    recentEmployees,
    pendingInvites: pendingInvitesList,
    departmentStats: deptStats,
  };
};
