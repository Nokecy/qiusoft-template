/**
 * 备货单状态枚举
 */
export enum StockingOrderStatus {
	/** 草稿 */
	Draft = 0,
	/** 审批中 */
	Approving = 10,
	/** 已审批 */
	Approved = 20
}

/**
 * 备货单状态配置
 */
export const stockingOrderStatusEnum = [
	{ label: '草稿', value: StockingOrderStatus.Draft, color: 'default' },
	{ label: '审批中', value: StockingOrderStatus.Approving, color: 'processing' },
	{ label: '已审批', value: StockingOrderStatus.Approved, color: 'success' }
];
