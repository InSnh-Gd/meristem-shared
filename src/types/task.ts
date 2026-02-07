/**
 * Task Status Specification
 * Following DATA_MODELS.md §2.1
 */
export type TaskStatusType = "PENDING" | "RUNNING" | "PAUSED" | "FINISHED" | "FAILED" | "ORPHANED";

export interface Task {
  task_id: string;          // UUID v4
  owner_id: string;         // User ID or Plugin ID
  trace_id: string;         // For cross-node tracing
  target_node_id: string;   // Routing destination
  type: "COMMAND" | "GIG_JOB";
  status: TaskStatusType;
  availability: "READY" | "SOURCE_OFFLINE" | "EXPIRED";
  payload: {
    plugin_id: string;
    action: string;
    params: Record<string, unknown>;
    volatile: boolean;      // Cleanup workspace after completion
  };
  lease: {
    expire_at: number;      // Unix ms timestamp
    heartbeat_interval: number; // Suggested interval (e.g., 3000ms)
  };
  progress: {
    percent: number;        // 0-100
    last_log_snippet: string;
    updated_at: number;     // Unix ms timestamp
  };
  result_uri: string;       // mfs://[node_id]/task/[task_id]/res.zip
  handshake: {
    result_sent: boolean;
    core_acked: boolean;
  };
}
