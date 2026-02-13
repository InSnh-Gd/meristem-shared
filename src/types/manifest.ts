/**
 * 插件 Manifest 契约定义。
 * 对应 PLUGIN_PROTOCOL.md §1 插件清单规格。
 */

import type { PluginUiMode, SduiVersion } from './plugin';
import type { StreamProfilePreset } from './stream-profile';

/**
 * 插件分层模型。
 * - core: 核心插件，承载从 Core 解耦出的平台能力
 * - extension: 扩展插件，业务或集成能力扩展
 */
export type PluginTier = 'core' | 'extension';

/**
 * 运行时性能档位。
 * - hotpath: 性能优先，允许本地快路径优化
 * - sandbox: 隔离优先，禁用快路径，走标准总线路径
 */
export type RuntimeProfile = 'hotpath' | 'sandbox';

/**
 * 流 Profile，用于 UI 数据订阅 (Manifest中使用简化的preset格式)。
 */
export type ManifestStreamProfile = StreamProfilePreset;

/**
 * 权限代码。
 * 必须是 PLUGIN_PROTOCOL.md §2 中定义的预定义代码。
 */
export type PermissionCode =
  // 系统级
  | 'sys:manage'
  | 'sys:audit'
  // 节点级
  | 'node:read'
  | 'node:cmd'
  | 'node:join'
  // 资源级
  | 'mfs:write'
  | 'nats:pub'
  | 'plugin:access';

/**
 * UI 配置。
 */
export interface PluginUiConfig {
  entry?: string;
  mode: PluginUiMode;
  icon?: string;
}

/**
 * 前后端联动契约。
 * 定义插件 UI 与前端的交互规范。
 */
export interface UiContract {
  /** 插件挂载路由 */
  route: string;
  /** 插件 UI 可订阅主题白名单 */
  channels: string[];
  /** 插件默认日志级别 */
  default_log_level: 'info' | 'debug';
  /** UI 默认流量档位 */
  stream_profile: ManifestStreamProfile;
}

/**
 * 插件 Manifest 完整定义。
 */
export interface PluginManifest {
  /** 插件唯一标识，遵循反向域名命名规范 */
  id: string;
  /** 插件显示名称 */
  name: string;
  /** 语义化版本号 (SemVer) */
  version: string;
  /** 插件分层: core | extension */
  tier: PluginTier;
  /** 运行时性能档位: hotpath | sandbox */
  runtime_profile: RuntimeProfile;
  /** SDUI 渲染器版本要求 */
  sdui_version: SduiVersion;
  /** 依赖的其他插件 ID 数组 */
  dependencies: string[];
  /** 入口文件路径 */
  entry: string;
  /** UI 配置 */
  ui: PluginUiConfig;
  /** 前后端联动契约 */
  ui_contract: UiContract;
  /** 权限声明数组 */
  permissions: PermissionCode[];
  /** 事件订阅数组 */
  events: string[];
  /** 导出的服务名数组 (M-Service) */
  exports: string[];
  /** SHA-256 校验和 (可选，用于防篡改验证) */
  checksum?: string;
}

/**
 * Manifest 校验错误。
 */
export interface ManifestValidationError {
  code: 'MISSING_FIELD' | 'INVALID_FIELD' | 'INVALID_PERMISSION' | 'CIRCULAR_DEPENDENCY' | 'SDUI_VERSION_MISMATCH' | 'INVALID_TIER' | 'INVALID_RUNTIME_PROFILE';
  field?: string;
  message: string;
  details?: unknown;
}

/**
 * Manifest 校验结果。
 */
export interface ManifestValidationResult {
  valid: boolean;
  errors: ManifestValidationError[];
  warnings: string[];
}

/**
 * 拓扑排序后的插件加载顺序。
 */
export interface PluginLoadOrder {
  /** 加载顺序数组 (被依赖的优先) */
  order: string[];
  /** 循环依赖检测结果 */
  hasCircularDependency: boolean;
  /** 循环依赖链 (如有) */
  circularChain?: string[];
}
