export type HardwareArch = 'x86_64' | 'arm64' | 'unknown';

export type HardwareCpuProfile = {
  model: string;
  cores: number;
  threads?: number;
};

export type HardwareMemoryProfile = {
  total: number;
  available?: number;
  type?: string;
};

export type HardwareStorageProfile = {
  type?: string;
  size?: number;
  total?: number;
  available?: number;
};

export type HardwareGpuProfile = {
  model: string;
  vram?: number;
  memory?: number;
};

export type HardwareProfile = {
  cpu?: HardwareCpuProfile;
  memory?: HardwareMemoryProfile;
  storage?: HardwareStorageProfile[];
  gpu?: HardwareGpuProfile[];
  os?: string;
  arch?: HardwareArch;
};

export type HardwareProfileHash = string;
