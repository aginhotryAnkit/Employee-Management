export interface IDashboardSummary {
  totalEmployees: number;
  activeEmployees: number;
  pendingInvites: number;
  departments: number;
}

export interface IRecentEmployee {
  id: string;
  name: string;
  role: string;
  status: 'Active' | 'Pending Invite';
}

export interface IPendingInvite {
  email: string;
  role: string;
  expiresIn: string;
}

export interface IDepartmentStat {
  department: string;
  count: number;
}

export interface IDashboardResponse {
  summary: IDashboardSummary;
  recentEmployees: IRecentEmployee[];
  pendingInvites: IPendingInvite[];
  departmentStats: IDepartmentStat[];
}
