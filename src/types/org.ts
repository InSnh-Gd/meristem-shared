export type OrgDocument = {
  org_id: string;
  name: string;
  slug: string;
  owner_user_id: string;
  settings: Record<string, unknown>;
  created_at: Date;
  updated_at: Date;
};
