/**订单类型 */
const SaleOrderTypeEnum = [
    { label: '普通订单', value: "10" },
    { label: '一揽子订单', value: "20" },
    { label: '维修订单', value: "30" },
    { label: 'ATO模式', value: "40" },
    { label: '金额订单', value: "50" },
    { label: '内部订单', value: "60" },
    { label: '样品订单', value: "70" }
];

/**是否含税 */
const PriceIsTaxEnum = [
    { label: '含税', value: "0" },
    { label: '不含税', value: "1" },
];

/**交易方式 */
const BusinessTypeEnum = [
    { label: '定金采购款到发货', value: "10" },
    { label: '定金生产款到发货', value: "11" },
    { label: '定金采购货到付款', value: "20" },
    { label: '定金生产货到付款', value: "21" },
    { label: '定金方式款到发货', value: "30" },
    { label: '定金方式货到付款', value: "40" },
    { label: '款到发货', value: "50" },
    { label: '货到付款', value: "60" },
    { label: '按月月结', value: "70" },
    { label: '按单月结', value: "80" },
];

/**订单履行方式 */
const EarnestTypeEnum = [
    { label: '按单', value: "10" },
    { label: '预测', value: "20" }
];

/**客户状态 */
const CustomerStatus = [{ label: "潜在", value: "00" },
{ label: "临时", value: "10" },
{ label: "正式", value: "20" },
{ label: "关闭", value: "30" },
{ label: "报价客户", value: "40" },
]

/**信用评级参数类别 */
const CreditRatingType = [
    { label: "信誉额度控制", value: "10" },
    { label: "正式", value: "20" },
    { label: "预期天数控制", value: "30" }
]

/**信用评级处理方式 */
const CreditRatingControlType = [{ label: "潜在", value: "00" },
{ label: "预警", value: "10" },
{ label: "严重预警", value: "20" },
{ label: "采取措施", value: "30" },
{ label: "停止做单送货", value: "40" }
]

export { SaleOrderTypeEnum, PriceIsTaxEnum, BusinessTypeEnum, EarnestTypeEnum, CustomerStatus, CreditRatingType, CreditRatingControlType };