/**
 * Node 传输层契约。
 * 传输层时间戳使用 Unix 毫秒；持久化模型可使用 Date。
 */
export type NodePersona = 'AGENT' | 'GIG';

export type NodeRoleFlagsTransport = {
  is_relay: boolean;
  is_storage: boolean;
  is_compute: boolean;
};

export type NodeNetworkMode = 'DIRECT' | 'RELAY';

export type NodeNetworkTransport = {
  virtual_ip: string;
  current_relay_id?: string;
  mode: NodeNetworkMode;
  v: number;
};

export type NodeInventoryTransport = {
  cpu_model: string;
  cores: number;
  ram_total: number;
  os: string;
  arch: 'x86_64' | 'arm64';
};

export type NodeGpuInfoTransport = {
  model: string;
  vram_total: number;
  usage: number;
};

export type NodeStatusTransport = {
  online: boolean;
  connection_status: 'online' | 'offline' | 'expired_credentials' | 'pending_approval';
  last_seen: number;
  cpu_usage: number;
  ram_free: number;
  gpu_info: NodeGpuInfoTransport[];
};

export type NodeTransport = {
  node_id: string;
  org_id: string;
  hwid: string;
  hostname: string;
  persona: NodePersona;
  role_flags: NodeRoleFlagsTransport;
  network: NodeNetworkTransport;
  inventory: NodeInventoryTransport;
  status: NodeStatusTransport;
  created_at: number;
};
