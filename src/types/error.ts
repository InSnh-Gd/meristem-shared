/**
 * Error Code Specification
 * Following general system standards
 */
export enum ErrorCode {
  // Common Errors
  INTERNAL_ERROR = "INTERNAL_ERROR",
  INVALID_PARAMS = "INVALID_PARAMS",
  UNAUTHORIZED = "UNAUTHORIZED",
  NOT_FOUND = "NOT_FOUND",
  TIMEOUT = "TIMEOUT",

  // Network/Auth Errors
  EXPIRED_CREDENTIALS = "EXPIRED_CREDENTIALS",
  PENDING_APPROVAL = "PENDING_APPROVAL",
  HWID_MISMATCH = "HWID_MISMATCH",
  VERSION_CONFLICT = "VERSION_CONFLICT",

  // Task Errors
  TASK_FAILED = "TASK_FAILED",
  SOURCE_OFFLINE = "SOURCE_OFFLINE",
  WORKSPACE_CLEANUP_FAILED = "WORKSPACE_CLEANUP_FAILED"
}

export interface ErrorResponse {
  error: ErrorCode;
  message: string;
  detail?: unknown;
}
