/**
 * 插件传输层契约。
 * 传输层时间戳使用 Unix 毫秒；持久化模型可使用 Date。
 */
export type PluginUiMode = 'SDUI' | 'ESM';
export type SduiVersion = `${number}.${number}`;

export type PluginUiTransport = {
  entry?: string;
  mode: PluginUiMode;
  icon?: string;
  sdui_version?: SduiVersion;
};

export type PluginConfigTransport = {
  schema: Record<string, unknown>;
  v?: number;
};

export type PluginStatus = 'ACTIVE' | 'DISABLED' | 'ERROR';

export type PluginTransport = {
  plugin_id: string;
  name: string;
  version: string;
  entry: string;
  ui: PluginUiTransport;
  permissions: string[];
  events: string[];
  exports: string[];
  config: PluginConfigTransport;
  status: PluginStatus;
  installed_at: number;
  updated_at: number;
};
