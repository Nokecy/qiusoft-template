export enum OrderTypeEnum {
	Normal = "10",
	Package = "20",
	Repair = "30",
	ATO = "40",
	Amount = "50",
	Internal = "60",
	Sample = "70"
}

export const orderTypeEnum = [
	{ label: "普通订单", value: OrderTypeEnum.Normal, color: '#52c41a' },
	{ label: "一揽子订单", value: OrderTypeEnum.Package, color: '#1890ff' },
	{ label: "维修订单", value: OrderTypeEnum.Repair, color: '#fa8c16' },
	{ label: "ATO模式", value: OrderTypeEnum.ATO, color: '#722ed1' },
	{ label: "金额订单", value: OrderTypeEnum.Amount, color: '#eb2f96' },
	{ label: "内部订单", value: OrderTypeEnum.Internal, color: '#faad14' },
	{ label: "样品订单", value: OrderTypeEnum.Sample, color: '#13c2c2' }
];