/**
 * Hooks 统一导出
 */

// KeepAlive 路由参数处理
export {
  useKeepAliveParams,
  useKeepAliveLoad,
  useKeepAliveLoadWithParams,
  type RouteParams,
  type UseKeepAliveParamsOptions,
  type UseKeepAliveParamsResult,
} from './useKeepAliveParams';

// 其他 Hooks
export { default as useBNR } from './useBNR';
export { default as useDraggableDialog } from './useDraggableDialog';
export { default as useHardwareBridgeWebSocket } from './useHardwareBridgeWebSocket';
export { default as usePrevLocation } from './usePrevLocation';
export { default as usePromiseQueue } from './usePromiseQueue';
export { default as useSound } from './useSound';
export { default as useWorkflow } from './useWorkflow';
export { useAttachmentUpload } from './useAttachmentUpload';
