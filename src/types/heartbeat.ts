/**
 * Heartbeat Message Specification
 * Following EVENT_BUS_SPEC.md §6.2
 */
export interface Heartbeat {
  node_id: string;      // Node unique identifier
  ts: number;           // Unix ms timestamp
  v: number;            // Current configuration version
  claimed_ip: string;   // Agent's claimed IP (for soft reclamation)
}

/**
 * Heartbeat ACK Specification
 * Following EVENT_BUS_SPEC.md §6.3
 */
export interface HeartbeatAck {
  ack: boolean;
  sps: number;          // Safe Payload Size (bytes)
}
