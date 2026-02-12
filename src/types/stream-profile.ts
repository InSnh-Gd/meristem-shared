export type StreamProfilePreset = 'realtime' | 'balanced' | 'conserve';

export type StreamProfile = Readonly<{
  preset: StreamProfilePreset;
  min_interval_ms: number;
  debounce_ms: number;
  batch_window_ms: number;
  batch_max_size: number;
}>;

const STREAM_PROFILE_PRESETS: Readonly<Record<StreamProfilePreset, StreamProfile>> = Object.freeze({
  realtime: Object.freeze({
    preset: 'realtime',
    min_interval_ms: 0,
    debounce_ms: 0,
    batch_window_ms: 0,
    batch_max_size: 1,
  }),
  balanced: Object.freeze({
    preset: 'balanced',
    min_interval_ms: 120,
    debounce_ms: 80,
    batch_window_ms: 150,
    batch_max_size: 10,
  }),
  conserve: Object.freeze({
    preset: 'conserve',
    min_interval_ms: 500,
    debounce_ms: 300,
    batch_window_ms: 400,
    batch_max_size: 20,
  }),
});

export const DEFAULT_STREAM_PROFILE_PRESET: StreamProfilePreset = 'balanced';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isFiniteNumber = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value);

const clampPositiveInteger = (value: unknown, fallback: number): number => {
  if (!isFiniteNumber(value)) {
    return fallback;
  }

  if (value < 0) {
    return fallback;
  }

  return Math.floor(value);
};

export const isStreamProfilePreset = (value: unknown): value is StreamProfilePreset =>
  value === 'realtime' || value === 'balanced' || value === 'conserve';

export const resolveStreamProfilePreset = (value: unknown): StreamProfilePreset =>
  isStreamProfilePreset(value) ? value : DEFAULT_STREAM_PROFILE_PRESET;

/**
 * 逻辑块：Stream Profile 统一归一化入口。
 * - 目标：允许“仅传 preset”或“preset + 局部覆盖”两种写法，避免前后端重复维护默认值。
 * - 原因：Phase 2.5 先锁定协议，不提前引入复杂运行时调优面板。
 * - 降级：任何非法字段都回退到 preset 默认值，保证订阅链路稳定。
 */
export const resolveStreamProfile = (value: unknown): StreamProfile => {
  if (isStreamProfilePreset(value)) {
    return STREAM_PROFILE_PRESETS[value];
  }

  if (!isRecord(value)) {
    return STREAM_PROFILE_PRESETS[DEFAULT_STREAM_PROFILE_PRESET];
  }

  const preset = resolveStreamProfilePreset(value.preset);
  const base = STREAM_PROFILE_PRESETS[preset];

  return Object.freeze({
    preset,
    min_interval_ms: clampPositiveInteger(value.min_interval_ms, base.min_interval_ms),
    debounce_ms: clampPositiveInteger(value.debounce_ms, base.debounce_ms),
    batch_window_ms: clampPositiveInteger(value.batch_window_ms, base.batch_window_ms),
    batch_max_size: clampPositiveInteger(value.batch_max_size, base.batch_max_size),
  });
};
