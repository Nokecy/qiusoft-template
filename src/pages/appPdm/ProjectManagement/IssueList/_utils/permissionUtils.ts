/**
 * 权限判断工具函数
 */

/**
 * 判断当前用户是否为创建人
 * @param creatorId 创建人ID
 * @param currentUserId 当前用户ID
 */
export const isCreator = (creatorId?: string, currentUserId?: string): boolean => {
  if (!creatorId || !currentUserId) return false;
  return creatorId === currentUserId;
};

/**
 * 判断当前用户是否为负责人
 * @param handlerCode 负责人编码
 * @param currentUserCode 当前用户编码
 */
export const isHandler = (handlerCode?: string, currentUserCode?: string): boolean => {
  if (!handlerCode || !currentUserCode) return false;
  return handlerCode === currentUserCode;
};

/**
 * 判断当前用户是否可以删除
 * @param creatorId 创建人ID
 * @param currentUserId 当前用户ID
 */
export const canDelete = (creatorId?: string, currentUserId?: string): boolean => {
  return isCreator(creatorId, currentUserId);
};

/**
 * 判断当前用户是否可以修改
 * @param creatorId 创建人ID
 * @param currentUserId 当前用户ID
 */
export const canUpdate = (creatorId?: string, currentUserId?: string): boolean => {
  return isCreator(creatorId, currentUserId);
};

/**
 * 判断当前用户是否可以执行操作（确认、解决等）
 * @param handlerCode 负责人编码
 * @param currentUserCode 当前用户编码
 */
export const canExecute = (handlerCode?: string, currentUserCode?: string): boolean => {
  return isHandler(handlerCode, currentUserCode);
};
