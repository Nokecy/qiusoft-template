export enum BusinessTypeEnum {
	DepositToPurchasePayToShip = "10",
	DepositToPurchasePayOnDelivery = "20",
	DepositPayToShip = "30",
	DepositPayOnDelivery = "40",
	PayToShip = "50",
	PayOnDelivery = "60",
	MonthlySettlement = "70",
	SingleOrderSettlement = "80"
}

export const businessTypeEnum = [
	{ label: "定金采购款到发货", value: BusinessTypeEnum.DepositToPurchasePayToShip, color: '#52c41a' },
	{ label: "定金采购货到付款", value: BusinessTypeEnum.DepositToPurchasePayOnDelivery, color: '#1890ff' },
	{ label: "定金方式款到发货", value: BusinessTypeEnum.DepositPayToShip, color: '#fa8c16' },
	{ label: "定金方式货到付款", value: BusinessTypeEnum.DepositPayOnDelivery, color: '#722ed1' },
	{ label: "款到发货", value: BusinessTypeEnum.PayToShip, color: '#eb2f96' },
	{ label: "货到付款", value: BusinessTypeEnum.PayOnDelivery, color: '#faad14' },
	{ label: "按月月结", value: BusinessTypeEnum.MonthlySettlement, color: '#13c2c2' },
	{ label: "按单月结", value: BusinessTypeEnum.SingleOrderSettlement, color: '#f5222d' }
];