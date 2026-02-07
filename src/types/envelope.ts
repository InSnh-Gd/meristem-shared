export type EnvelopeType = "CMD" | "EVENT" | "REQ" | "RESP";

/**
 * M-Bus Message Envelope
 * Following EVENT_BUS_SPEC.md §2
 */
export interface Envelope<T = unknown> {
  id: string;               // UUID-v4
  traceId: string;          // Trace ID
  source: string;           // core | node:[id] | plugin:[id]
  target: string;           // all | node:[id] | group:[name]
  type: EnvelopeType;
  subject: string;          // e.g., system.node.join
  payload: T;               // Business data
  timestamp: number;        // Unix ms timestamp
  expires: number;          // Expiration (0 = never)
  priority: number;         // Priority (1-10)
}
