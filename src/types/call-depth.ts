export const DEFAULT_CALL_DEPTH = 0;
export const MAX_CALL_DEPTH = 16;

export const normalizeCallDepth = (value: unknown): number => {
  if (typeof value !== 'number' || !Number.isInteger(value) || value < 0) {
    return DEFAULT_CALL_DEPTH;
  }
  return value > MAX_CALL_DEPTH ? MAX_CALL_DEPTH : value;
};

export const incrementCallDepth = (value: unknown): number => {
  const current = normalizeCallDepth(value);
  return current >= MAX_CALL_DEPTH ? MAX_CALL_DEPTH : current + 1;
};
