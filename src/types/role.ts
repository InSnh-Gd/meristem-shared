export type RoleDocument = {
  role_id: string;
  name: string;
  description: string;
  permissions: string[];
  is_builtin: boolean;
  org_id: string;
  created_at: Date;
  updated_at: Date;
};
