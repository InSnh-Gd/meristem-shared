import type { NodeTransport } from './node';

/**
 * Plugin Isolate 通信协议类型定义。
 * 用于 Core 与插件运行环境之间的消息传递。
 */

/**
 * 消息类型枚举 - 定义 Plugin Isolate 通信协议的所有消息类型。
 */
export enum PluginMessageType {
  INIT = 'INIT',
  INIT_ACK = 'INIT_ACK',
  INVOKE = 'INVOKE',
  INVOKE_RESULT = 'INVOKE_RESULT',
  EVENT = 'EVENT',
  HEALTH = 'HEALTH',
  HEALTH_ACK = 'HEALTH_ACK',
  ERROR = 'ERROR',
  TERMINATE = 'TERMINATE',
}

/**
 * 基础消息结构 - 所有插件通信消息的公共结构。
 */
export interface PluginMessage {
  id: string;
  type: PluginMessageType;
  pluginId: string;
  timestamp: number;
  payload?: unknown;
  traceId?: string;
}

/**
 * 插件可调用的上下文 API 接口。
 * 通过 postMessage 从宿主环境暴露给插件。
 */
export interface PluginContextApi {
  getNodes(): Promise<NodeTransport[]>;
  publishEvent(subject: string, data: unknown): Promise<void>;
  callService(service: string, method: string, params: unknown): Promise<unknown>;
  getConfig(): Promise<Record<string, unknown>>;
  setConfig(config: Record<string, unknown>): Promise<void>;
}

/**
 * 方法调用请求 - 宿主向插件发起方法调用时使用。
 */
export interface PluginInvokeRequest {
  method: string;
  params: unknown;
  timeout?: number;
}

/**
 * 方法调用响应 - 插件返回方法调用结果时使用。
 */
export interface PluginInvokeResponse {
  success: boolean;
  data?: unknown;
  error?: {
    code: string;
    message: string;
  };
}

/**
 * 插件健康状态报告 - 插件定期上报的健康检查数据。
 */
export interface PluginHealthReport {
  memoryUsage: NodeJS.MemoryUsage;
  uptime: number;
  status: 'healthy' | 'degraded' | 'unhealthy';
}
