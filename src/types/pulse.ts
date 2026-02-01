/**
 * Dynamic Pulse Specification
 * Following HARDWARE_PROTOCOL.md §3.2
 */
export interface Pulse {
  node_id: string;
  ts: number;                // Unix ms timestamp
  core: {                    // Trusted core metrics
    cpu_load: number;        // 0.0 - 1.0
    ram_usage: number;       // 0.0 - 1.0
    net_io: {
      in: number;
      out: number;
    };
  };
  plugins: Record<string, any>; // Extensible plugin metrics
}

/**
 * Static Inventory Specification
 * Following HARDWARE_PROTOCOL.md §3.1
 */
export interface Inventory {
  node_id: string;
  ts: number;
  payload: {
    cpu: {
      model: string;
      arch: "x86_64" | "arm64";
      cores: number;
      threads: number;
    };
    ram: {
      total_bytes: number;
    };
    os: {
      kernel: string;
      distro: string;
    };
    capabilities: string[];
  };
}
