interface ISummaryCard {
  title: string;
  count: string;
}

export interface IDashboardSummary {
  totalEmployees: ISummaryCard;
  activeEmployees: ISummaryCard;
  pendingInvites: ISummaryCard;
  departments: ISummaryCard;
}

export interface IRecentEmployee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string | null;
  manager: string | null;
  status: string;
  avatar: string | null;
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
