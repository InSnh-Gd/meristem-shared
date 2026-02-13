export interface LogParserInput {
  readonly raw: string;
  readonly source: string;
  readonly timestamp?: number;
  readonly metadata?: Record<string, unknown>;
}

export interface LogParserOutput {
  readonly content: string;
  readonly level: "debug" | "info" | "warn" | "error" | "fatal";
  readonly trace_id?: string;
  readonly app_id: string;
  readonly metadata: Record<string, unknown>;
}

export interface LogParser {
  parse(input: LogParserInput): LogParserOutput | null;
  validate(input: unknown): input is LogParserInput;
}

export interface StreamScraper {
  onStdout(line: string): void;
  onStderr(line: string): void;
  onClose(code: number): void;
}

export interface ExternalLogConfig {
  readonly app_id: string;
  readonly parser: string;
  readonly command?: string;
  readonly file_path?: string;
}
