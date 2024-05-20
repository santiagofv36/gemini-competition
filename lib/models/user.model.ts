export default interface User {
  id: string;
  name: string;
  email: string;
  role: TRoleEnum;
  status: string;
  created_at: string;
  updated_at: string;
}

export const Role = ['ADMIN', 'USER', 'GUEST'] as const;
export type TRoleEnum = (typeof Role)[number];
