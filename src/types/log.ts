export type LogLevel = "DEBUG" | "INFO" | "WARN" | "ERROR" | "FATAL";

export type LogEnvelope = Readonly<{
  readonly ts: number;
  readonly level: LogLevel;
  readonly node_id: string;
  readonly source: string;
  readonly trace_id: string;
  readonly content: string;
  readonly meta: Record<string, unknown>;
}>;
