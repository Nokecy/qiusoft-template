import { IssueStatus } from './issueEnums';

/**
 * 状态判断工具函数
 */

/**
 * 判断是否可以指派处理人
 * @param status 当前状态
 * @param isCreator 是否为创建人
 * @param isHandler 是否为当前处理人
 */
export const canAssign = (status?: number, isCreator?: boolean, isHandler?: boolean): boolean => {
  if (status === IssueStatus.Closed || status === IssueStatus.Cancelled) {
    return false;
  }

  // 打开状态，只有创建人可以指派
  if (status === IssueStatus.Open) {
    return !!isCreator;
  }

  // 处理中或已解决状态，创建人或当前处理人可以重新指派
  if (status === IssueStatus.InProgress || status === IssueStatus.Resolved) {
    return !!(isCreator || isHandler);
  }

  return false;
};

/**
 * 判断是否可以确认接收
 * @param status 当前状态
 * @param isHandler 是否为指定的处理人
 */
export const canConfirmReceive = (status?: number, isHandler?: boolean): boolean => {
  return status === IssueStatus.PendingReceive && !!isHandler;
};

/**
 * 判断是否可以开始处理
 * @param status 当前状态
 * @param isHandler 是否为处理人
 */
export const canStartProcessing = (status?: number, isHandler?: boolean): boolean => {
  return status === IssueStatus.Received && !!isHandler;
};

/**
 * 判断是否可以解决问题
 * @param status 当前状态
 * @param isHandler 是否为处理人
 */
export const canResolve = (status?: number, isHandler?: boolean): boolean => {
  return status === IssueStatus.InProgress && !!isHandler;
};

/**
 * 判断是否可以关闭问题
 * @param status 当前状态
 * @param isCreator 是否为创建人
 * @param isHandler 是否为处理人
 */
export const canClose = (status?: number, isCreator?: boolean, isHandler?: boolean): boolean => {
  return status === IssueStatus.Resolved && !!(isCreator || isHandler);
};

/**
 * 判断是否可以激活问题
 * @param status 当前状态
 * @param isCreator 是否为创建人
 */
export const canActivate = (status?: number, isCreator?: boolean): boolean => {
  return status === IssueStatus.Closed && !!isCreator;
};

/**
 * 判断是否可以转任务
 * @param status 当前状态
 * @param isCreator 是否为创建人
 * @param isHandler 是否为处理人
 */
export const canConvertToTask = (status?: number, isCreator?: boolean, isHandler?: boolean): boolean => {
  return status !== IssueStatus.Closed && !!(isCreator || isHandler);
};

/**
 * 判断是否可以确认问题（兼容旧代码）
 * @deprecated 使用 canConfirmReceive 替代
 * @param status 当前状态
 */
export const canConfirm = (status?: number): boolean => {
  return status === IssueStatus.Open;
};
