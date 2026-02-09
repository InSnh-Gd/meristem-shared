import type { NodePersona } from './node';
import type { HardwareProfile } from './hardware-profile';

export const WIRE_CONTRACT_VERSION = '2026-02-09';

export const CORE_API_PATHS = {
  join: '/api/v1/join',
  tasks: '/api/v1/tasks',
  results: '/api/v1/results',
} as const;

export type JoinStatus = 'new' | 'existing' | 'pending_approval';

export type JoinRequestPayload = {
  hwid: string;
  hostname: string;
  persona: NodePersona;
  hardware_profile?: HardwareProfile;
  hardware_profile_hash?: string;
  org_id?: string;
};

export type JoinSuccessData = {
  node_id: string;
  core_ip: string;
  status: JoinStatus;
  message?: string;
};

export type JoinSuccessResponse = {
  success: true;
  data: JoinSuccessData;
};

export type JoinErrorResponse = {
  success: false;
  error: string;
};

export type JoinResponsePayload = JoinSuccessResponse | JoinErrorResponse;
