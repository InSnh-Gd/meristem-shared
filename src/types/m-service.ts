/**
 * M-Service 协议类型定义。
 * 定义插件间服务调用的请求/响应契约。
 */

import type { PluginManifest } from './manifest';

/**
 * M-Service 请求信封。
 * 用于跨插件的同步服务调用。
 */
export interface MServiceRequest {
  /** 链路追踪 ID */
  trace_id: string;
  /** 调用方插件 ID */
  caller: string;
  /** 目标服务名 */
  service: string;
  /** 目标方法名 */
  method: string;
  /** 请求载荷 */
  payload: Record<string, unknown>;
  /** 超时时间 (毫秒)，默认 5000 */
  timeout: number;
}

/**
 * M-Service 响应信封。
 */
export interface MServiceResponse {
  /** 调用是否成功 */
  success: boolean;
  /** 响应数据 (成功时) */
  data?: unknown;
  /** 错误信息 (失败时) */
  error?: MServiceError;
}

/**
 * M-Service 错误详情。
 */
export interface MServiceError {
  /** 错误码 */
  code: MServiceErrorCode;
  /** 错误描述 */
  message: string;
}

/**
 * M-Service 错误码枚举。
 */
export type MServiceErrorCode =
  | 'SERVICE_UNAVAILABLE'
  | 'ACCESS_DENIED'
  | 'TIMEOUT'
  | 'METHOD_NOT_FOUND'
  | 'INTERNAL_ERROR';

/**
 * 服务注册条目。
 * 用于 Core 维护的服务注册表。
 */
export interface ServiceRegistration {
  /** 服务名 */
  service: string;
  /** 提供服务的插件 ID */
  pluginId: string;
  /** 暴露的方法列表 */
  methods: string[];
  /** 插件 Manifest 引用 */
  manifest: PluginManifest;
}
