export interface ICreateDepartmentPayload {
  name: string;
  code: string;
  description?: string;
  head_id?: string;
  location?: string;
  budget?: number;
  status?: 'ACTIVE' | 'INACTIVE';
}

export interface IUpdateDepartmentPayload extends Partial<ICreateDepartmentPayload> {
  updated_by?: string;
}
