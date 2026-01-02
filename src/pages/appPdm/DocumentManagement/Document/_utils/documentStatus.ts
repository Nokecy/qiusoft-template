/**
 * 文档状态相关枚举与工具函数
 * 实现方案B：发布状态与修订状态解耦
 */

// ==================== 枚举定义 ====================

/**
 * 发布状态（方案B - 列表主Tag）
 * 表达"是否存在可用发布基线"
 */
export enum PublishState {
  Unreleased = 0,  // 未发布（无版本快照基线）
  Released = 1,    // 已发布（存在版本快照基线）
  Obsolete = 2,    // 已作废（只读，不允许新操作）
}

/**
 * 修订状态（当前工作修订的状态）
 */
export enum RevisionState {
  Draft = 0,       // 草稿（修订中）
  InApproval = 1,  // 审批中
  Approved = 2,    // 已批准（待发布）
}

// ==================== 状态配置 ====================

/** 发布状态配置 */
export const publishStateConfig: Record<number, { label: string; color: string }> = {
  [PublishState.Unreleased]: { label: '未发布', color: 'default' },
  [PublishState.Released]: { label: '已发布', color: 'green' },
  [PublishState.Obsolete]: { label: '已作废', color: 'red' },
};

/** 修订子状态配置 */
export const revisionStateConfig: Record<number, { label: string; color: string }> = {
  [RevisionState.Draft]: { label: '修订中', color: 'blue' },
  [RevisionState.InApproval]: { label: '审批中', color: 'blue' },
  [RevisionState.Approved]: { label: '待发布', color: 'cyan' },
};

// ==================== 派生计算函数 ====================

/**
 * 从后端数据派生发布状态
 *
 * 推导规则：
 * - 存在 latestVersionId 且未作废 → Released
 * - 不存在 latestVersionId 且未作废 → Unreleased
 * - lifecycleState === 5 (Obsolete) → Obsolete
 */
export function derivePublishState(data: {
  latestVersionId?: string | null;
  lifecycleState?: number;
}): PublishState {
  // 已作废状态
  if (data.lifecycleState === 5) {
    return PublishState.Obsolete;
  }
  // 存在发布版本
  if (data.latestVersionId) {
    return PublishState.Released;
  }
  // 未发布
  return PublishState.Unreleased;
}

/**
 * 检查是否可以检出
 *
 * 条件：已发布 且 无当前修订 且 未检出
 */
export function canCheckOut(data: {
  latestVersionId?: string | null;
  currentRevisionId?: string | null;
  isCheckedOut?: boolean;
  lifecycleState?: number;
}): boolean {
  const publishState = derivePublishState(data);
  return (
    publishState === PublishState.Released &&
    !data.currentRevisionId &&
    !data.isCheckedOut
  );
}

/**
 * 检查是否可以签入
 *
 * 条件：已发布 且 已检出 且 检出人是当前用户
 */
export function canCheckIn(
  data: {
    latestVersionId?: string | null;
    isCheckedOut?: boolean;
    checkOutInfo?: { checkedOutUserId?: string };
    lifecycleState?: number;
  },
  currentUserId?: string
): boolean {
  // 只要已签出且是本人签出，就可以签入（无论是否已发布）
  return (
    data.isCheckedOut === true &&
    data.checkOutInfo?.checkedOutUserId === currentUserId
  );
}

/**
 * 检查是否可以强制解锁
 *
 * 条件：已检出 (不再强制要求存在当前修订ID，只要被锁就能解锁)
 */
export function canForceUnlock(data: {
  isCheckedOut?: boolean;
  currentRevisionId?: string | null;
}): boolean {
  return data.isCheckedOut === true;
}

/**
 * 检查是否可以撤销修订
 *
 * 条件：已检出 且 当前修订状态为草稿
 */
export function canDiscardRevision(data: {
  isCheckedOut?: boolean;
  currentRevisionId?: string | null;
  currentRevisionState?: number;
}): boolean {
  return (
    data.isCheckedOut === true &&
    data.currentRevisionState === RevisionState.Draft
  );
}

/**
 * 检查是否可以提交审批
 *
 * 条件：当前修订状态为草稿 且 未检出
 */
export function canSubmit(data: {
  currentRevisionId?: string | null;
  currentRevisionState?: number;
  isCheckedOut?: boolean;
}): boolean {
  return (
    !!data.currentRevisionId &&
    data.currentRevisionState === RevisionState.Draft &&
    !data.isCheckedOut
  );
}

/**
 * 检查是否可以批准
 *
 * 条件：当前修订状态为审批中
 */
export function canApprove(data: {
  currentRevisionState?: number;
}): boolean {
  return data.currentRevisionState === RevisionState.InApproval;
}

/**
 * 检查是否可以发布
 *
 * 条件：当前修订状态为已批准
 */
export function canRelease(data: {
  currentRevisionState?: number;
}): boolean {
  return data.currentRevisionState === RevisionState.Approved;
}

/**
 * 检查是否可以编辑
 *
 * 条件：当前修订状态为草稿 且 (未锁定 或 本人锁定)
 */
export function canEdit(
  data: {
    currentRevisionId?: string | null;
    currentRevisionState?: number;
    isCheckedOut?: boolean;
    checkOutInfo?: { checkedOutUserId?: string };
  },
  currentUserId?: string
): boolean {
  if (!data.currentRevisionId) return false;
  if (data.currentRevisionState !== RevisionState.Draft) return false;

  // 未锁定 或 本人锁定
  if (!data.isCheckedOut) return true;
  return data.checkOutInfo?.checkedOutUserId === currentUserId;
}

/**
 * 获取主按钮类型
 *
 * 按状态返回应该突出的主按钮
 */
export function getPrimaryAction(
  data: {
    latestVersionId?: string | null;
    currentRevisionId?: string | null;
    currentRevisionState?: number;
    isCheckedOut?: boolean;
    checkOutInfo?: { checkedOutUserId?: string };
    lifecycleState?: number;
  },
  currentUserId?: string
): 'checkIn' | 'submit' | 'approve' | 'release' | 'checkOut' | null {
  // 已检出且本人检出 → 签入
  if (data.isCheckedOut && data.checkOutInfo?.checkedOutUserId === currentUserId) {
    return 'checkIn';
  }

  // 草稿状态且未检出 → 提交审批
  if (data.currentRevisionState === RevisionState.Draft && !data.isCheckedOut) {
    return 'submit';
  }

  // 审批中 → 批准
  if (data.currentRevisionState === RevisionState.InApproval) {
    return 'approve';
  }

  // 已批准 → 发布
  if (data.currentRevisionState === RevisionState.Approved) {
    return 'release';
  }

  // 已发布且无当前修订 → 检出
  if (canCheckOut(data)) {
    return 'checkOut';
  }

  return null;
}

/**
 * 检查是否为未发布文档（不显示检出相关操作）
 */
export function isUnreleasedDocument(data: {
  latestVersionId?: string | null;
  lifecycleState?: number;
}): boolean {
  return derivePublishState(data) === PublishState.Unreleased;
}

/**
 * 格式化版本号
 *
 * @param version 主版本号 (如 "A")
 * @param revision 次修订号 (如 "0")
 * @returns 完整版本号 (如 "A0")
 */
export function formatVersionNumber(
  version?: string | null,
  revision?: string | null
): string {
  if (!version && !revision) return '-';
  return `${version || ''}${revision || ''}`;
}
