/**
 * WMS仓库管理系统权限定义
 * 从C#代码转换为TypeScript
 */

const GroupName = "WMS";
const MobileGroupName = "WMS.Mobile";

const BaseGroupName = GroupName + ".BaseGroup";
const ReceiptGroupName = GroupName + ".ReceiptGroup";
const ShipmentGroupName = GroupName + ".ShipmentGroup";
const InventoryGroupName = GroupName + ".InventoryGroup";
const OutStoreQueryGroupName = GroupName + ".OutStoreQueryGroup";
const CountManagerGroupName = GroupName + ".CountManager";
const StoreTransferOrderGroupName = GroupName + ".StoreTransferManager";
const OutInstructionPendRecordDockGroupName = GroupName + ".OutInstructionPendRecordDock";

/**
 * 库房信息
 */
export const WareHouse = {
	/** 库房信息权限 */
	Default: GroupName + ".WareHouse",
	/** 创建库房 */
	Create: GroupName + ".WareHouse.Create",
	/** 更新库房 */
	Update: GroupName + ".WareHouse.Update",
	/** 删除库房 */
	Delete: GroupName + ".WareHouse.Delete",
	/** 导入库房 */
	Import: GroupName + ".WareHouse.Import",
	/** 导出库房 */
	Export: GroupName + ".WareHouse.Export"
} as const;

/**
 * 库位信息
 */
export const WareHouseLocations = {
	/** 库位信息权限 */
	Default: GroupName + ".WareHouseLocations",
	/** 创建库位信息 */
	Create: GroupName + ".WareHouseLocations.Create",
	/** 更新库位信息 */
	Update: GroupName + ".WareHouseLocations.Update",
	/** 删除库位信息 */
	Delete: GroupName + ".WareHouseLocations.Delete",
	/** 导入库位信息 */
	Import: GroupName + ".WareHouseLocations.Import",
	/** 导出库位信息 */
	Export: GroupName + ".WareHouseLocations.Export"
} as const;

/**
 * 货台信息
 */
export const CargoArea = {
	/** 货台信息权限 */
	Default: GroupName + ".CargoArea",
	/** 创建货台信息 */
	Create: GroupName + ".CargoArea.Create",
	/** 更新货台信息 */
	Update: GroupName + ".CargoArea.Update",
	/** 删除货台信息 */
	Delete: GroupName + ".CargoArea.Delete"
} as const;

/**
 * 批次属性
 */
export const LotAttrItem = {
	/** 批次属性权限 */
	Default: GroupName + ".LotAttr",
	/** 创建批次属性 */
	Create: GroupName + ".LotAttr.Create",
	/** 更新批次属性 */
	Update: GroupName + ".LotAttr.Update",
	/** 删除批次属性 */
	Delete: GroupName + ".LotAttr.Delete"
} as const;

/**
 * 批次属性组
 */
export const LotAttrItemGroup = {
	/** 批次属性组权限 */
	Default: GroupName + ".LotAttrItemGroup",
	/** 创建批次属性组 */
	Create: GroupName + ".LotAttrItemGroup.Create",
	/** 更新批次属性组 */
	Update: GroupName + ".LotAttrItemGroup.Update",
	/** 删除批次属性组 */
	Delete: GroupName + ".LotAttrItemGroup.Delete"
} as const;

/**
 * 物料分类
 */
export const MaterialItemCategory = {
	/** 物料分类权限 */
	Default: GroupName + ".MaterialItemCategory",
	/** 创建物料分类 */
	Create: GroupName + ".MaterialItemCategory.Create",
	/** 更新物料分类 */
	Update: GroupName + ".MaterialItemCategory.Update",
	/** 删除物料分类 */
	Delete: GroupName + ".MaterialItemCategory.Delete"
} as const;

/**
 * 物料信息
 */
export const MaterialItems = {
	/** 物料信息权限 */
	Default: GroupName + ".MaterialItems",
	/** 创建物料信息 */
	Create: GroupName + ".MaterialItems.Create",
	/** 更新物料信息 */
	Update: GroupName + ".MaterialItems.Update",
	/** 删除物料信息 */
	Delete: GroupName + ".MaterialItems.Delete",
	/** 导出物料信息 */
	Export: GroupName + ".MaterialItems.Export",
	/** 导入物料信息 */
	Import: GroupName + ".MaterialItems.Import",
	/** 批量替换物料信息 */
	BulkReplace: GroupName + ".MaterialItems.BulkReplace"
} as const;

/**
 * 物料有效期管理
 */
export const MaterialItemLifeDay = {
	/** 物料有效期管理权限 */
	Default: GroupName + ".MaterialItemLifeDay",
	/** 创建物料有效期管理 */
	Create: GroupName + ".MaterialItemLifeDay.Create",
	/** 更新物料有效期管理 */
	Update: GroupName + ".MaterialItemLifeDay.Update",
	/** 删除物料有效期管理 */
	Delete: GroupName + ".MaterialItemLifeDay.Delete",
	/** 导入物料有效期管理 */
	Import: GroupName + ".MaterialItemLifeDay.Import",
	/** 导出物料有效期管理 */
	Export: GroupName + ".MaterialItemLifeDay.Export"
} as const;

/**
 * 物料库位设置
 */
export const MaterialItemLocationSetting = {
	/** 物料库位设置权限 */
	Default: GroupName + ".MaterialItemLocationSetting",
	/** 创建物料库位设置 */
	Create: GroupName + ".MaterialItemLocationSetting.Create",
	/** 更新物料库位设置 */
	Update: GroupName + ".MaterialItemLocationSetting.Update",
	/** 删除物料库位设置 */
	Delete: GroupName + ".MaterialItemLocationSetting.Delete",
	/** 批量替换物料库位设置 */
	BulkReplace: GroupName + ".MaterialItemLocationSetting.BulkReplace"
} as const;

/**
 * 物料库房信息
 */
export const MaterialItemWarehouseInfo = {
	/** 物料库房信息权限 */
	Default: GroupName + ".MaterialItemWarehouseInfo",
	/** 创建物料库房信息 */
	Create: GroupName + ".MaterialItemWarehouseInfo.Create",
	/** 更新物料库房信息 */
	Update: GroupName + ".MaterialItemWarehouseInfo.Update",
	/** 删除物料库房信息 */
	Delete: GroupName + ".MaterialItemWarehouseInfo.Delete",
	/** 导入物料库房信息 */
	Import: GroupName + ".MaterialItemWarehouseInfo.Import"
} as const;

/**
 * 仓库人员管理
 */
export const WarehouseMan = {
	/** 仓库人员管理权限 */
	Default: GroupName + ".WarehouseMan",
	/** 创建仓库人员管理 */
	Create: GroupName + ".WarehouseMan.Create",
	/** 更新仓库人员管理 */
	Update: GroupName + ".WarehouseMan.Update",
	/** 删除仓库人员管理 */
	Delete: GroupName + ".WarehouseMan.Delete"
} as const;

/**
 * 仓库区域管理
 */
export const WarehouseZone = {
	/** 仓库区域管理权限 */
	Default: GroupName + ".WarehouseZone",
	/** 创建仓库区域管理 */
	Create: GroupName + ".WarehouseZone.Create",
	/** 更新仓库区域管理 */
	Update: GroupName + ".WarehouseZone.Update",
	/** 删除仓库区域管理 */
	Delete: GroupName + ".WarehouseZone.Delete",
	/** 导入仓库区域管理 */
	Import: GroupName + ".WarehouseZone.Import",
	/** 导出仓库区域管理 */
	Export: GroupName + ".WarehouseZone.Export"
} as const;

/**
 * 仓库班组管理
 */
export const WarehouseTeam = {
	/** 仓库班组管理权限 */
	Default: GroupName + ".WarehouseTeam",
	/** 创建仓库班组管理 */
	Create: GroupName + ".WarehouseTeam.Create",
	/** 更新仓库班组管理 */
	Update: GroupName + ".WarehouseTeam.Update",
	/** 删除仓库班组管理 */
	Delete: GroupName + ".WarehouseTeam.Delete"
} as const;

/**
 * 超期推送规则
 */
export const OverduePushRule = {
	/** 超期推送规则权限 */
	Default: GroupName + ".OverduePushRule",
	/** 创建超期推送规则 */
	Create: GroupName + ".OverduePushRule.Create",
	/** 更新超期推送规则 */
	Update: GroupName + ".OverduePushRule.Update",
	/** 删除超期推送规则 */
	Delete: GroupName + ".OverduePushRule.Delete"
} as const;

/**
 * 库龄推送规则
 */
export const StockAgePushRule = {
	/** 库龄推送规则权限 */
	Default: GroupName + ".StockAgePushRule",
	/** 创建库龄推送规则 */
	Create: GroupName + ".StockAgePushRule.Create",
	/** 更新库龄推送规则 */
	Update: GroupName + ".StockAgePushRule.Update",
	/** 删除库龄推送规则 */
	Delete: GroupName + ".StockAgePushRule.Delete"
} as const;

/**
 * 采购入库指令
 */
export const PurchaseInInstruction = {
	/** 采购入库指令权限 */
	Default: GroupName + ".PurchaseInInstruction",
	/** 创建采购入库指令 */
	Create: GroupName + ".PurchaseInInstruction.Create",
	/** 更新采购入库指令 */
	Update: GroupName + ".PurchaseInInstruction.Update",
	/** 删除采购入库指令 */
	Delete: GroupName + ".PurchaseInInstruction.Delete",
	/** 生成箱号 */
	CreateBoxNo: GroupName + ".PurchaseInInstruction.CreateBoxNo",
	/** 打印箱号 */
	PrintBoxNo: GroupName + ".PurchaseInInstruction.PrintBoxNo",
	/** 审核采购入库指令 */
	Verify: GroupName + ".PurchaseInInstruction.Verify",
	/** 取消审核采购入库指令 */
	CancelVerify: GroupName + ".PurchaseInInstruction.CancelVerify",
	/** 收货完成 */
	ReceiveCompleted: GroupName + ".PurchaseInInstruction.ReceiveCompleted"
} as const;

/**
 * 客户来料入库指令
 */
export const CustomerIncomingInInstruction = {
	/** 客户来料入库指令权限 */
	Default: GroupName + ".CustomerIncomingInInstruction",
	/** 创建客户来料入库指令 */
	Create: GroupName + ".CustomerIncomingInInstruction.Create",
	/** 更新客户来料入库指令 */
	Update: GroupName + ".CustomerIncomingInInstruction.Update",
	/** 删除客户来料入库指令 */
	Delete: GroupName + ".CustomerIncomingInInstruction.Delete",
	/** 生成箱号 */
	CreateBoxNo: GroupName + ".CustomerIncomingInInstruction.CreateBoxNo",
	/** 打印箱号 */
	PrintBoxNo: GroupName + ".CustomerIncomingInInstruction.PrintBoxNo",
	/** 审核客户来料入库指令 */
	Verify: GroupName + ".CustomerIncomingInInstruction.Verify",
	/** 取消审核客户来料入库指令 */
	CancelVerify: GroupName + ".CustomerIncomingInInstruction.CancelVerify",
	/** 收货完成 */
	ReceiveCompleted: GroupName + ".CustomerIncomingInInstruction.ReceiveCompleted"
} as const;

/**
 * 生产辅料入库
 */
export const ProductionAssistInInstruction = {
	/** 生产辅料入库权限 */
	Default: GroupName + ".ProductionAssistInInstruction",
	/** 创建生产辅料入库 */
	Create: GroupName + ".ProductionAssistInInstruction.Create",
	/** 更新生产辅料入库 */
	Update: GroupName + ".ProductionAssistInInstruction.Update",
	/** 删除生产辅料入库 */
	Delete: GroupName + ".ProductionAssistInInstruction.Delete",
	/** 生成箱号 */
	CreateBoxNo: GroupName + ".ProductionAssistInInstruction.CreateBoxNo",
	/** 打印箱号 */
	PrintBoxNo: GroupName + ".ProductionAssistInInstruction.PrintBoxNo",
	/** 审核生产辅料入库 */
	Verify: GroupName + ".ProductionAssistInInstruction.Verify",
	/** 取消审核生产辅料入库 */
	CancelVerify: GroupName + ".ProductionAssistInInstruction.CancelVerify",
	/** 收货完成 */
	ReceiveCompleted: GroupName + ".ProductionAssistInInstruction.ReceiveCompleted"
} as const;

/**
 * 销售退货入库指令
 */
export const SaleReturnInInstruction = {
	/** 销售退货入库指令权限 */
	Default: GroupName + ".SaleReturnInInstruction",
	/** 创建销售退货入库指令 */
	Create: GroupName + ".SaleReturnInInstruction.Create",
	/** 更新销售退货入库指令 */
	Update: GroupName + ".SaleReturnInInstruction.Update",
	/** 删除销售退货入库指令 */
	Delete: GroupName + ".SaleReturnInInstruction.Delete",
	/** 生成箱号 */
	CreateBoxNo: GroupName + ".SaleReturnInInstruction.CreateBoxNo",
	/** 打印箱号 */
	PrintBoxNo: GroupName + ".SaleReturnInInstruction.PrintBoxNo",
	/** 审核销售退货入库指令 */
	Verify: GroupName + ".SaleReturnInInstruction.Verify",
	/** 取消审核销售退货入库指令 */
	CancelVerify: GroupName + ".SaleReturnInInstruction.CancelVerify",
	/** 收货完成 */
	ReceiveCompleted: GroupName + ".SaleReturnInInstruction.ReceiveCompleted"
} as const;

/**
 * 产品入库指令
 */
export const ProductionInInstruction = {
	/** 产品入库指令权限 */
	Default: GroupName + ".ProductionInInstruction",
	/** 创建产品入库指令 */
	Create: GroupName + ".ProductionInInstruction.Create",
	/** 更新产品入库指令 */
	Update: GroupName + ".ProductionInInstruction.Update",
	/** 删除产品入库指令 */
	Delete: GroupName + ".ProductionInInstruction.Delete",
	/** 生成箱号 */
	CreateBoxNo: GroupName + ".ProductionInInstruction.CreateBoxNo",
	/** 打印箱号 */
	PrintBoxNo: GroupName + ".ProductionInInstruction.PrintBoxNo",
	/** 审核产品入库指令 */
	Verify: GroupName + ".ProductionInInstruction.Verify",
	/** 取消审核产品入库指令 */
	CancelVerify: GroupName + ".ProductionInInstruction.CancelVerify",
	/** 收货完成 */
	ReceiveCompleted: GroupName + ".ProductionInInstruction.ReceiveCompleted"
} as const;

/**
 * 生成退料入库
 */
export const IssueReturnInInstruction = {
	/** 生成退料入库权限 */
	Default: GroupName + ".IssueReturnInInstruction",
	/** 创建生成退料入库 */
	Create: GroupName + ".IssueReturnInInstruction.Create",
	/** 更新生成退料入库 */
	Update: GroupName + ".IssueReturnInInstruction.Update",
	/** 删除生成退料入库 */
	Delete: GroupName + ".IssueReturnInInstruction.Delete",
	/** 生成箱号 */
	CreateBoxNo: GroupName + ".IssueReturnInInstruction.CreateBoxNo",
	/** 打印箱号 */
	PrintBoxNo: GroupName + ".IssueReturnInInstruction.PrintBoxNo",
	/** 审核生成退料入库 */
	Verify: GroupName + ".IssueReturnInInstruction.Verify",
	/** 取消审核生成退料入库 */
	CancelVerify: GroupName + ".IssueReturnInInstruction.CancelVerify",
	/** 收货完成 */
	ReceiveCompleted: GroupName + ".IssueReturnInInstruction.ReceiveCompleted"
} as const;

/**
 * 其他入库指令
 */
export const NoOrderInInstruction = {
	/** 其他入库指令权限 */
	Default: GroupName + ".NoOrderInInstruction",
	/** 创建其他入库指令 */
	Create: GroupName + ".NoOrderInInstruction.Create",
	/** 更新其他入库指令 */
	Update: GroupName + ".NoOrderInInstruction.Update",
	/** 删除其他入库指令 */
	Delete: GroupName + ".NoOrderInInstruction.Delete",
	/** 生成箱号 */
	CreateBoxNo: GroupName + ".NoOrderInInstruction.CreateBoxNo",
	/** 打印箱号 */
	PrintBoxNo: GroupName + ".NoOrderInInstruction.PrintBoxNo",
	/** 审核其他入库指令 */
	Verify: GroupName + ".NoOrderInInstruction.Verify",
	/** 取消审核其他入库指令 */
	CancelVerify: GroupName + ".NoOrderInInstruction.CancelVerify",
	/** 收货完成 */
	ReceiveCompleted: GroupName + ".NoOrderInInstruction.ReceiveCompleted"
} as const;

/**
 * 期初入库指令
 */
export const DefaultOrderInInstruction = {
	/** 期初入库指令权限 */
	Default: GroupName + ".DefaultOrderInInstruction",
	/** 创建期初入库指令 */
	Create: GroupName + ".DefaultOrderInInstruction.Create",
	/** 更新期初入库指令 */
	Update: GroupName + ".DefaultOrderInInstruction.Update",
	/** 删除期初入库指令 */
	Delete: GroupName + ".DefaultOrderInInstruction.Delete",
	/** 生成箱号 */
	CreateBoxNo: GroupName + ".DefaultOrderInInstruction.CreateBoxNo",
	/** 打印箱号 */
	PrintBoxNo: GroupName + ".DefaultOrderInInstruction.PrintBoxNo",
	/** 审核期初入库指令 */
	Verify: GroupName + ".DefaultOrderInInstruction.Verify",
	/** 取消审核期初入库指令 */
	CancelVerify: GroupName + ".DefaultOrderInInstruction.CancelVerify",
	/** 收货完成 */
	ReceiveCompleted: GroupName + ".DefaultOrderInInstruction.ReceiveCompleted",
	/** 导入期初入库指令 */
	Import: GroupName + ".DefaultOrderInInstruction.Import"
} as const;

/**
 * 转库入库指令
 */
export const TransactionOrderInInstruction = {
	/** 转库入库指令权限 */
	Default: GroupName + ".TransactionOrderInInstruction",
	/** 创建转库入库指令 */
	Create: GroupName + ".TransactionOrderInInstruction.Create",
	/** 更新转库入库指令 */
	Update: GroupName + ".TransactionOrderInInstruction.Update",
	/** 删除转库入库指令 */
	Delete: GroupName + ".TransactionOrderInInstruction.Delete",
	/** 生成箱号 */
	CreateBoxNo: GroupName + ".TransactionOrderInInstruction.CreateBoxNo",
	/** 打印箱号 */
	PrintBoxNo: GroupName + ".TransactionOrderInInstruction.PrintBoxNo",
	/** 审核转库入库指令 */
	Verify: GroupName + ".TransactionOrderInInstruction.Verify",
	/** 取消审核转库入库指令 */
	CancelVerify: GroupName + ".TransactionOrderInInstruction.CancelVerify",
	/** 收货完成 */
	ReceiveCompleted: GroupName + ".TransactionOrderInInstruction.ReceiveCompleted",
	/** 导入转库入库指令 */
	Import: GroupName + ".TransactionOrderInInstruction.Import"
} as const;

/**
 * 服务退料入库指令
 */
export const ServiceReturnInInstruction = {
	/** 服务退料入库指令权限 */
	Default: GroupName + ".ServiceReturnInInstruction",
	/** 创建服务退料入库指令 */
	Create: GroupName + ".ServiceReturnInInstruction.Create",
	/** 更新服务退料入库指令 */
	Update: GroupName + ".ServiceReturnInInstruction.Update",
	/** 删除服务退料入库指令 */
	Delete: GroupName + ".ServiceReturnInInstruction.Delete",
	/** 生成箱号 */
	CreateBoxNo: GroupName + ".ServiceReturnInInstruction.CreateBoxNo",
	/** 打印箱号 */
	PrintBoxNo: GroupName + ".ServiceReturnInInstruction.PrintBoxNo",
	/** 审核服务退料入库指令 */
	Verify: GroupName + ".ServiceReturnInInstruction.Verify",
	/** 取消审核服务退料入库指令 */
	CancelVerify: GroupName + ".ServiceReturnInInstruction.CancelVerify",
	/** 收货完成 */
	ReceiveCompleted: GroupName + ".ServiceReturnInInstruction.ReceiveCompleted"
} as const;

/**
 * 产品入库指令明细
 */
export const ProductionInInstructionItem = {
	/** 产品入库指令明细权限 */
	Default: GroupName + ".ProductionInInstructionItem",
	/** 创建入库指令 */
	CreateInInstruction: GroupName + ".ProductionInInstructionItem.CreateInInstruction"
} as const;

/**
 * 入库指令查询
 */
export const InInstructionItem = {
	/** 入库指令查询权限 */
	Default: GroupName + ".InInstructionItem"
} as const;

/**
 * 入库箱列表
 */
export const InInstructionBox = {
	/** 入库箱列表权限 */
	Default: GroupName + ".InInstructionBox"
} as const;

/**
 * 入库SN列表
 */
export const InInstructionSN = {
	/** 入库SN列表权限 */
	Default: GroupName + ".InInstructionSN"
} as const;

/**
 * 入库批次列表
 */
export const InInstructionBatch = {
	/** 入库批次列表权限 */
	Default: GroupName + ".InInstructionBatch"
} as const;

/**
 * 库存交易列表
 */
export const InventoryTransactionInfo = {
	/** 库存交易列表权限 */
	Default: GroupName + ".InventoryTransaction"
} as const;

/**
 * 上架任务管理
 */
export const PutTaskItem = {
	/** 上架任务管理权限 */
	Default: GroupName + ".PutTaskItem",
	/** 删除上架任务管理 */
	Delete: GroupName + ".PutTaskItem.Delete"
} as const;

/**
 * 成品销售出库
 */
export const SaleOutInstruction = {
	/** 成品销售出库权限 */
	Default: GroupName + ".ShipmentOrder",
	/** 创建成品销售出库 */
	Create: GroupName + ".ShipmentOrder.Create",
	/** 更新成品销售出库 */
	Update: GroupName + ".ShipmentOrder.Update",
	/** 删除成品销售出库 */
	Delete: GroupName + ".ShipmentOrder.Delete",
	/** 审核成品销售出库 */
	Verify: GroupName + ".ShipmentOrder.Verify",
	/** 取消审核成品销售出库 */
	CancelVerify: GroupName + ".ShipmentOrder.CancelVerify",
	/** 手动发运 */
	ManualShipment: GroupName + ".ShipmentOrder.ManualShipment",
	/** 分配销售出库指令 */
	Allocation: GroupName + ".ShipmentOrder.Allocation",
	/** 预分配销售出库指令 */
	PreAllocation: GroupName + ".ShipmentOrder.PreAllocation",
	/** 释放下架任务 */
	ReleasePickTask: GroupName + ".ShipmentOrder.Release",
	/** 手动分配 */
	ManualAllocation: GroupName + ".ShipmentOrder.ManualAllocation",
	/** 指定处理人 */
	AssignHandler: GroupName + ".ShipmentOrder.AssignHandler",
	/** 手动下架 */
	ManualPick: GroupName + ".ShipmentOrder.ManualPick",
	/** 导出成品销售出库 */
	Export: GroupName + ".ShipmentOrder.Export",
	/** 取消需求合并 */
	CancelDemandMerge: GroupName + ".ShipmentOrder.CancelDemandMerge"
} as const;

/**
 * 生产退回出库指令
 */
export const ProductionReturnOutInstruction = {
	/** 生产退回出库指令权限 */
	Default: GroupName + ".ProductionReturnOutInstruction",
	/** 创建生产退回出库指令 */
	Create: GroupName + ".ProductionReturnOutInstruction.Create",
	/** 更新生产退回出库指令 */
	Update: GroupName + ".ProductionReturnOutInstruction.Update",
	/** 删除生产退回出库指令 */
	Delete: GroupName + ".ProductionReturnOutInstruction.Delete",
	/** 分配生产退回出库指令 */
	Allocation: GroupName + ".ProductionReturnOutInstruction.Allocation",
	/** 预分配生产退回出库指令 */
	PreAllocation: GroupName + ".ProductionReturnOutInstruction.PreAllocation",
	/** 审核生产退回出库指令 */
	Verify: GroupName + ".ProductionReturnOutInstruction.Verify",
	/** 取消审核生产退回出库指令 */
	CancelVerify: GroupName + ".ProductionReturnOutInstruction.CancelVerify",
	/** 手动发运 */
	ManualShipment: GroupName + ".ProductionReturnOutInstruction.ManualShipment",
	/** 手动下架 */
	ManualPick: GroupName + ".ProductionReturnOutInstruction.ManualPick",
	/** 导出生产退回出库指令 */
	Export: GroupName + ".ProductionReturnOutInstruction.Export",
	/** 取消需求合并 */
	CancelDemandMerge: GroupName + ".ProductionReturnOutInstruction.CancelDemandMerge"
} as const;

/**
 * 原料领料出库
 */
export const MaterialOutInstruction = {
	/** 原料领料出库权限 */
	Default: GroupName + ".AssignMaterial",
	/** 创建原料领料出库 */
	Create: GroupName + ".AssignMaterial.Create",
	/** 更新原料领料出库 */
	Update: GroupName + ".AssignMaterial.Update",
	/** 删除原料领料出库 */
	Delete: GroupName + ".AssignMaterial.Delete",
	/** 分配原料领料出库 */
	Allocation: GroupName + ".AssignMaterial.Allocation",
	/** 预分配原料领料出库 */
	PreAllocation: GroupName + ".AssignMaterial.PreAllocation",
	/** 导入原料领料出库 */
	Import: GroupName + ".AssignMaterial.Import",
	/** 审核原料领料出库 */
	Verify: GroupName + ".AssignMaterial.Verify",
	/** 取消审核原料领料出库 */
	CancelVerify: GroupName + ".AssignMaterial.CancelVerify",
	/** 手动发运 */
	ManualShipment: GroupName + ".AssignMaterial.ManualShipment",
	/** 取消需求合并 */
	CancelDemandMerge: GroupName + ".AssignMaterial.CancelDemandMerge"
} as const;

/**
 * 采购退货指令
 */
export const PurchaseOutInstruction = {
	/** 采购退货指令权限 */
	Default: GroupName + ".MaterialPurchaseOutInstructionOrder",
	/** 创建采购退货指令 */
	Create: GroupName + ".MaterialPurchaseOutInstructionOrder.Create",
	/** 更新采购退货指令 */
	Update: GroupName + ".MaterialPurchaseOutInstructionOrder.Update",
	/** 删除采购退货指令 */
	Delete: GroupName + ".MaterialPurchaseOutInstructionOrder.Delete",
	/** 分配采购退货指令 */
	Allocation: GroupName + ".MaterialPurchaseOutInstructionOrder.Allocation",
	/** 预分配采购退货指令 */
	PreAllocation: GroupName + ".MaterialPurchaseOutInstructionOrder.PreAllocation",
	/** 审核采购退货指令 */
	Verify: GroupName + ".MaterialPurchaseOutInstructionOrder.Verify",
	/** 取消审核采购退货指令 */
	CancelVerify: GroupName + ".MaterialPurchaseOutInstructionOrder.CancelVerify",
	/** 手动发运 */
	ManualShipment: GroupName + ".MaterialPurchaseOutInstructionOrder.ManualShipment",
	/** 取消需求合并 */
	CancelDemandMerge: GroupName + ".MaterialPurchaseOutInstructionOrder.CancelDemandMerge"
} as const;

/**
 * 客供退货指令
 */
export const CustomerOutInstruction = {
	/** 客供退货指令权限 */
	Default: GroupName + ".CustomerOutInstruction",
	/** 创建客供退货指令 */
	Create: GroupName + ".CustomerOutInstruction.Create",
	/** 更新客供退货指令 */
	Update: GroupName + ".CustomerOutInstruction.Update",
	/** 删除客供退货指令 */
	Delete: GroupName + ".CustomerOutInstruction.Delete",
	/** 分配客供退货指令 */
	Allocation: GroupName + ".CustomerOutInstruction.Allocation",
	/** 预分配客供退货指令 */
	PreAllocation: GroupName + ".CustomerOutInstruction.PreAllocation",
	/** 审核客供退货指令 */
	Verify: GroupName + ".CustomerOutInstruction.Verify",
	/** 取消审核客供退货指令 */
	CancelVerify: GroupName + ".CustomerOutInstruction.CancelVerify",
	/** 手动发运 */
	ManualShipment: GroupName + ".CustomerOutInstruction.ManualShipment",
	/** 取消需求合并 */
	CancelDemandMerge: GroupName + ".CustomerOutInstruction.CancelDemandMerge"
} as const;

/**
 * 转库出库指令
 */
export const TransactionOrderOutInstruction = {
	/** 转库出库指令权限 */
	Default: GroupName + ".TransactionOrderOutInstruction",
	/** 创建转库出库指令 */
	Create: GroupName + ".TransactionOrderOutInstruction.Create",
	/** 更新转库出库指令 */
	Update: GroupName + ".TransactionOrderOutInstruction.Update",
	/** 删除转库出库指令 */
	Delete: GroupName + ".TransactionOrderOutInstruction.Delete",
	/** 审核转库出库指令 */
	Verify: GroupName + ".TransactionOrderOutInstruction.Verify",
	/** 取消审核转库出库指令 */
	CancelVerify: GroupName + ".TransactionOrderOutInstruction.CancelVerify",
	/** 分配转库出库指令 */
	Allocation: GroupName + ".TransactionOrderOutInstruction.Allocation",
	/** 手动发运 */
	ManualShipment: GroupName + ".TransactionOrderOutInstruction.ManualShipment",
	/** 取消需求合并 */
	CancelDemandMerge: GroupName + ".TransactionOrderOutInstruction.CancelDemandMerge"
} as const;

/**
 * 杂出指令
 */
export const NoOrderOutInstruction = {
	/** 杂出指令权限 */
	Default: GroupName + ".NoOrderOutInstruction",
	/** 创建杂出指令 */
	Create: GroupName + ".NoOrderOutInstruction.Create",
	/** 更新杂出指令 */
	Update: GroupName + ".NoOrderOutInstruction.Update",
	/** 删除杂出指令 */
	Delete: GroupName + ".NoOrderOutInstruction.Delete",
	/** 审核杂出指令 */
	Verify: GroupName + ".NoOrderOutInstruction.Verify",
	/** 取消审核杂出指令 */
	CancelVerify: GroupName + ".NoOrderOutInstruction.CancelVerify",
	/** 分配杂出指令 */
	Allocation: GroupName + ".NoOrderOutInstruction.Allocation",
	/** 预分配杂出指令 */
	PreAllocation: GroupName + ".NoOrderOutInstruction.PreAllocation",
	/** 手动发运 */
	ManualShipment: GroupName + ".NoOrderOutInstruction.ManualShipment",
	/** 取消需求合并 */
	CancelDemandMerge: GroupName + ".NoOrderOutInstruction.CancelDemandMerge"
} as const;

/**
 * 服务领料出库指令
 */
export const ServicePickingOutInstruction = {
	/** 服务领料出库指令权限 */
	Default: GroupName + ".ServicePickingOutInstruction",
	/** 创建服务领料出库指令 */
	Create: GroupName + ".ServicePickingOutInstruction.Create",
	/** 更新服务领料出库指令 */
	Update: GroupName + ".ServicePickingOutInstruction.Update",
	/** 删除服务领料出库指令 */
	Delete: GroupName + ".ServicePickingOutInstruction.Delete",
	/** 审核服务领料出库指令 */
	Verify: GroupName + ".ServicePickingOutInstruction.Verify",
	/** 取消审核服务领料出库指令 */
	CancelVerify: GroupName + ".ServicePickingOutInstruction.CancelVerify",
	/** 分配服务领料出库指令 */
	Allocation: GroupName + ".ServicePickingOutInstruction.Allocation",
	/** 预分配服务领料出库指令 */
	PreAllocation: GroupName + ".ServicePickingOutInstruction.PreAllocation",
	/** 手动发运 */
	ManualShipment: GroupName + ".ServicePickingOutInstruction.ManualShipment",
	/** 取消需求合并 */
	CancelDemandMerge: GroupName + ".ServicePickingOutInstruction.CancelDemandMerge"
} as const;

/**
 * 出库指令列表
 */
export const OutInstructionItem = {
	/** 出库指令列表权限 */
	Default: GroupName + ".OutInstructionItem"
} as const;

/**
 * 出库指令管理
 */
export const OutInstructionOrder = {
	/** 出库指令管理权限 */
	Default: GroupName + ".OutInstructionOrder",
	/** 批量释放任务 */
	BatchRelease: GroupName + ".OutInstructionOrder.BatchRelease"
} as const;

/**
 * 下架任务管理
 */
export const PickTask = {
	/** 下架任务管理权限 */
	Default: GroupName + ".PickTask",
	/** 分配处理人 */
	AssignHandler: GroupName + ".PickTask.AssignHandler",
	/** 手动分配 */
	ManualAllocation: GroupName + ".PickTask.ManualAllocation",
	/** 释放任务 */
	ReleasePickTask: GroupName + ".PickTask.Release",
	/** 重新分配 */
	Allocation: GroupName + ".PickTask.Allocation",
	/** 导出下架任务管理 */
	Export: GroupName + ".PickTask.Export",
	/** 删除下架任务管理 */
	Delete: GroupName + ".PickTask.Delete"
} as const;

/**
 * 发货单管理
 */
export const DeliveryOrder = {
	/** 发货单管理权限 */
	Default: GroupName + ".DeliveryOrder",
	/** 创建发货单管理 */
	Create: GroupName + ".DeliveryOrder.Create",
	/** 根据追溯码创建发货单 */
	CreateByTraceId: GroupName + ".DeliveryOrder.CreateByTraceId",
	/** 删除发货单管理 */
	Delete: GroupName + ".DeliveryOrder.Delete"
} as const;

/**
 * 物料下架管理
 */
export const MaterialPickingItem = {
	/** 物料下架管理权限 */
	Default: GroupName + ".MaterialPickingItem",
	/** 下架物料 */
	Pick: GroupName + ".MaterialPickingItem.Pick"
} as const;

/**
 * 库存管理
 */
export const Stock = {
	/** 库存管理权限 */
	Default: GroupName + ".Stock"
} as const;

/**
 * 库位库存管理
 */
export const StockBin = {
	/** 库位库存管理权限 */
	Default: GroupName + ".StockBin",
	/** 切换库位库存 */
	Switch: GroupName + ".StockBin.Switch",
	/** 合并库位库存 */
	Merge: GroupName + ".StockBin.Merge"
} as const;

/**
 * 库位下架管理
 */
export const PickByStockBin = {
	/** 库位下架管理权限 */
	Default: GroupName + ".PickByStockBin"
} as const;

/**
 * 根据任务令手动下架库位库存
 */
export const PickStockBinByWorkJob = {
	/** 根据任务令手动下架库位库存权限 */
	Default: GroupName + ".PickStockBinByWorkJob",
	/** 下架库位库存 */
	Pick: GroupName + ".PickStockBinByWorkJob.Pick"
} as const;

/**
 * 库存SN导入
 */
export const StockBinSnImport = {
	/** 库存SN导入权限 */
	Default: GroupName + ".StockBinSnImport",
	/** 创建库存SN导入 */
	Create: GroupName + ".StockBinSnImport.Create",
	/** 删除库存SN导入 */
	Delete: GroupName + ".StockBinSnImport.Delete"
} as const;

/**
 * 库存箱类型统计
 */
export const StockBinBoxTypeInfo = {
	/** 库存箱类型统计权限 */
	Default: GroupName + ".StockBinBoxTypeInfo"
} as const;

/**
 * 超期库存管理
 */
export const TimeOutStockBin = {
	/** 超期库存管理权限 */
	Default: GroupName + ".TimeOutStockBin",
	/** 导出超期库存 */
	Export: GroupName + ".Export"
} as const;

/**
 * 物料移位管理
 */
export const MaterialLocationMove = {
	/** 物料移位管理权限 */
	Default: GroupName + ".MaterialLocationMove",
	/** 批量移位 */
	Batch: GroupName + ".MaterialLocationMove.Batch",
	/** 单个移位 */
	Single: GroupName + ".MaterialLocationMove.Single",
	/** 追溯码移位 */
	TraceId: GroupName + ".MaterialLocationMove.TraceId",
	/** 物料上架 */
	MaterialPut: GroupName + ".MaterialLocationMove.Put",
	/** 物料下架 */
	MaterialPick: GroupName + ".MaterialLocationMove.Pick"
} as const;

/**
 * 工厂区域管理
 */
export const FactoryZone = {
	/** 工厂区域管理权限 */
	Default: GroupName + ".FactoryZone",
	/** 创建工厂区域管理 */
	Create: GroupName + ".FactoryZone.Create",
	/** 更新工厂区域管理 */
	Update: GroupName + ".FactoryZone.Update",
	/** 删除工厂区域管理 */
	Delete: GroupName + ".FactoryZone.Delete"
} as const;

/**
 * 车辆信息管理
 */
export const VehicleInfo = {
	/** 车辆信息管理权限 */
	Default: GroupName + ".VehicleInfo",
	/** 创建车辆信息管理 */
	Create: GroupName + ".VehicleInfo.Create",
	/** 更新车辆信息管理 */
	Update: GroupName + ".VehicleInfo.Update",
	/** 删除车辆信息管理 */
	Delete: GroupName + ".VehicleInfo.Delete"
} as const;

/**
 * 司机信息管理
 */
export const DriverInfo = {
	/** 司机信息管理权限 */
	Default: GroupName + ".DriverInfo",
	/** 创建司机信息管理 */
	Create: GroupName + ".DriverInfo.Create",
	/** 更新司机信息管理 */
	Update: GroupName + ".DriverInfo.Update",
	/** 删除司机信息管理 */
	Delete: GroupName + ".DriverInfo.Delete"
} as const;

/**
 * 运输点管理
 */
export const TransportPoint = {
	/** 运输点管理权限 */
	Default: GroupName + ".TransportPoint",
	/** 创建运输点管理 */
	Create: GroupName + ".TransportPoint.Create",
	/** 更新运输点管理 */
	Update: GroupName + ".TransportPoint.Update",
	/** 删除运输点管理 */
	Delete: GroupName + ".TransportPoint.Delete"
} as const;

/**
 * 预约车辆管理
 */
export const ReserveCar = {
	/** 预约车辆管理权限 */
	Default: GroupName + ".ReserveCar",
	/** 创建预约车辆管理 */
	Create: GroupName + ".ReserveCar.Create",
	/** 更新预约车辆管理 */
	Update: GroupName + ".ReserveCar.Update",
	/** 删除预约车辆管理 */
	Delete: GroupName + ".ReserveCar.Delete"
} as const;

/**
 * 盘点差异原因
 */
export const CountDiffReasons = {
	/** 盘点差异原因权限 */
	Default: GroupName + ".CountDiffReason",
	/** 创建盘点差异原因 */
	Create: GroupName + ".CountDiffReason.Create",
	/** 更新盘点差异原因 */
	Update: GroupName + ".CountDiffReason.Update",
	/** 删除盘点差异原因 */
	Delete: GroupName + ".CountDiffReason.Delete",
	/** 导入盘点差异原因 */
	Import: GroupName + ".CountDiffReason.Import",
	/** 导出盘点差异原因 */
	Export: GroupName + ".CountDiffReason.Export"
} as const;

/**
 * 盘点规则管理
 */
export const CountRule = {
	/** 盘点规则管理权限 */
	Default: GroupName + ".CountRule",
	/** 创建盘点规则管理 */
	Create: GroupName + ".CountRule.Create",
	/** 更新盘点规则管理 */
	Update: GroupName + ".CountRule.Update",
	/** 删除盘点规则管理 */
	Delete: GroupName + ".CountRule.Delete"
} as const;

/**
 * 盘点参数管理
 */
export const CountParam = {
	/** 盘点参数管理权限 */
	Default: GroupName + ".CountParam",
	/** 创建盘点参数管理 */
	Create: GroupName + ".CountParam.Create",
	/** 更新盘点参数管理 */
	Update: GroupName + ".CountParam.Update",
	/** 删除盘点参数管理 */
	Delete: GroupName + ".CountParam.Delete"
} as const;

/**
 * 盘点单管理
 */
export const CountOrder = {
	/** 盘点单管理权限 */
	Default: GroupName + ".CountOrder",
	/** 创建盘点单管理 */
	Create: GroupName + ".CountOrder.Create",
	/** 更新盘点单管理 */
	Update: GroupName + ".CountOrder.Update",
	/** 删除盘点单管理 */
	Delete: GroupName + ".CountOrder.Delete",
	/** 分发盘点任务 */
	Distribute: GroupName + ".CountOrder.Distribute",
	/** 完成初盘 */
	FinishFirstCount: GroupName + ".CountOrder.FinishFirstCount",
	/** 关闭盘点单 */
	Close: GroupName + ".CountOrder.Close"
} as const;

/**
 * 盘点任务明细
 */
export const CountOrderTaskItem = {
	/** 盘点任务明细权限 */
	Default: GroupName + ".CountOrderTaskItem"
} as const;

/**
 * 盘点任务明细详情
 */
export const CountOrderTaskItemDetail = {
	/** 盘点任务明细详情权限 */
	Default: GroupName + ".CountOrderTaskItemDetail",
	/** 提交差异维护 */
	SubmitDifferencesMaintain: GroupName + ".CountOrderTaskItemDetailSubmitDifferencesMaintain"
} as const;

/**
 * 欠料原因管理
 */
export const LessReason = {
	/** 欠料原因管理权限 */
	Default: GroupName + ".LessReason",
	/** 创建欠料原因管理 */
	Create: GroupName + ".LessReason.Create",
	/** 更新欠料原因管理 */
	Update: GroupName + ".LessReason.Update",
	/** 删除欠料原因管理 */
	Delete: GroupName + ".LessReason.Delete"
} as const;

/**
 * 条码解析规则
 */
export const BarCodeResolveRule = {
	/** 条码解析规则权限 */
	Default: GroupName + ".BarCodeResolveRule",
	/** 创建条码解析规则 */
	Create: GroupName + ".BarCodeResolveRule.Create",
	/** 更新条码解析规则 */
	Update: GroupName + ".BarCodeResolveRule.Update",
	/** 删除条码解析规则 */
	Delete: GroupName + ".BarCodeResolveRule.Delete",
	/** 模拟条码解析 */
	Mock: GroupName + ".BarCodeResolveRule.Mock"
} as const;

/**
 * 追溯码管理
 */
export const TraceId = {
	/** 追溯码管理权限 */
	Default: GroupName + ".TraceId",
	/** 创建追溯码管理 */
	Create: GroupName + ".TraceId.Create",
	/** 更新追溯码管理 */
	Update: GroupName + ".TraceId.Update",
	/** 删除追溯码管理 */
	Delete: GroupName + ".TraceId.Delete"
} as const;

/**
 * 实权信息管理
 */
export const RealRightInfo = {
	/** 实权信息管理权限 */
	Default: GroupName + ".RealRightInfo",
	/** 创建实权信息管理 */
	Create: GroupName + ".RealRightInfo.Create",
	/** 更新实权信息管理 */
	Update: GroupName + ".RealRightInfo.Update",
	/** 删除实权信息管理 */
	Delete: GroupName + ".RealRightInfo.Delete"
} as const;

/**
 * 门店调拨单
 */
export const StoreTransferOrder = {
	/** 门店调拨单权限 */
	Default: GroupName + ".StoreTransferOrder",
	/** 创建门店调拨单 */
	Create: GroupName + ".StoreTransferOrder.Create",
	/** 审核门店调拨单 */
	Verify: GroupName + ".StoreTransferOrder.Verify",
	/** 取消审核门店调拨单 */
	CancelVerify: GroupName + ".StoreTransferOrder.CancelVerify"
} as const;

/**
 * 门店调拨单明细
 */
export const StoreTransferOrderItem = {
	/** 门店调拨单明细权限 */
	Default: GroupName + ".StoreTransferOrderItem",
	/** 创建门店调拨单明细 */
	Create: GroupName + ".StoreTransferOrderItem.Create",
	/** 审核门店调拨单明细 */
	Verify: GroupName + ".StoreTransferOrderItem.Verify",
	/** 取消审核门店调拨单明细 */
	CancelVerify: GroupName + ".StoreTransferOrderItem.CancelVerify"
} as const;

/**
 * 门店调拨任务
 */
export const StoreTransferTaskItem = {
	/** 门店调拨任务权限 */
	Default: GroupName + ".StoreTransferTaskItem",
	/** 创建门店调拨任务 */
	Create: GroupName + ".StoreTransferTaskItem.Create",
	/** 审核门店调拨任务 */
	Verify: GroupName + ".StoreTransferTaskItem.Verify",
	/** 取消审核门店调拨任务 */
	CancelVerify: GroupName + ".StoreTransferTaskItem.CancelVerify"
} as const;

/**
 * 库房调拨关系
 */
export const StoreTransferMap = {
	/** 库房调拨关系权限 */
	Default: GroupName + ".StoreTransferMap",
	/** 创建库房调拨关系 */
	Create: GroupName + ".StoreTransferMap.Create",
	/** 更新库房调拨关系 */
	Update: GroupName + ".StoreTransferMap.Update",
	/** 删除库房调拨关系 */
	Delete: GroupName + ".StoreTransferMap.Delete"
} as const;

/**
 * ERP库存对比
 */
export const ERPStoreCompare = {
	/** ERP库存对比权限 */
	Default: GroupName + ".ERPStoreCompare",
	/** 历史对比 */
	HistoryCompare: GroupName + ".ERPStoreCompare.HistoryCompare",
	/** 历史导出 */
	HistoryExport: GroupName + ".ERPStoreCompare.HistoryExport",
	/** 实时对比 */
	RealTimeCompare: GroupName + ".ERPStoreCompare.RealTimeCompare",
	/** 实时导出 */
	RealTimeExport: GroupName + ".ERPStoreCompare.RealTimeExport"
} as const;

/**
 * 对比排除设置
 */
export const ExcludeCompareSetting = {
	/** 对比排除设置权限 */
	Default: GroupName + ".ExcludeCompareSetting",
	/** 创建对比排除设置 */
	Create: GroupName + ".ExcludeCompareSetting.Create",
	/** 更新对比排除设置 */
	Update: GroupName + ".ExcludeCompareSetting.Update",
	/** 删除对比排除设置 */
	Delete: GroupName + ".ExcludeCompareSetting.Delete"
} as const;

/**
 * 指令单回传设置
 */
export const InstructionOrderCallBackSetting = {
	/** 指令单回传设置权限 */
	Default: GroupName + ".InstructionOrderCallBackSetting",
	/** 创建指令单回传设置 */
	Create: GroupName + ".InstructionOrderCallBackSetting.Create",
	/** 更新指令单回传设置 */
	Update: GroupName + ".InstructionOrderCallBackSetting.Update",
	/** 删除指令单回传设置 */
	Delete: GroupName + ".InstructionOrderCallBackSetting.Delete"
} as const;

/**
 * 出库指令待处理记录
 */
export const OutInstructionPendRecordInfo = {
	/** 出库指令待处理记录权限 */
	Default: GroupName + ".OutInstructionPendRecordInfo",
	/** 重试出库指令待处理记录 */
	ReTry: GroupName + ".OutInstructionPendRecordInfo.ReTry"
} as const;

/**
 * 库位库存延期
 */
export const StockBinDelay = {
	/** 库位库存延期权限 */
	Default: GroupName + ".StockBinDelay",
	/** 延期库位库存 */
	Delay: GroupName + ".StockBinDelay.Delay"
} as const;

/**
 * 出库检验方案
 */
export const OutInspectionScheme = {
	/** 出库检验方案权限 */
	Default: GroupName + ".OutInspectionScheme",
	/** 创建出库检验方案 */
	Create: GroupName + ".OutInspectionScheme.Create",
	/** 更新出库检验方案 */
	Update: GroupName + ".OutInspectionScheme.Update",
	/** 删除出库检验方案 */
	Delete: GroupName + ".OutInspectionScheme.Delete"
} as const;

/**
 * 库位拆合记录
 */
export const StockBinSplitCombinRecord = {
	/** 库位拆合记录权限 */
	Default: GroupName + ".StockBinSplitCombinRecord"
} as const;

/**
 * 出库检验项目
 */
export const OutInspectionProject = {
	/** 出库检验项目权限 */
	Default: GroupName + ".OutInspectionProject",
	/** 创建出库检验项目 */
	Create: GroupName + ".OutInspectionProject.Create",
	/** 更新出库检验项目 */
	Update: GroupName + ".OutInspectionProject.Update",
	/** 删除出库检验项目 */
	Delete: GroupName + ".OutInspectionProject.Delete"
} as const;

/**
 * 出库检验任务
 */
export const OutInspectionTask = {
	/** 出库检验任务权限 */
	Default: GroupName + ".OutInspectionTask"
} as const;

/**
 * 指令配置管理
 */
export const InstructionConfig = {
	/** 指令配置管理权限 */
	Default: GroupName + ".InstructionConfig",
	/** 创建指令配置管理 */
	Create: GroupName + ".InstructionConfig.Create",
	/** 更新指令配置管理 */
	Update: GroupName + ".InstructionConfig.Update",
	/** 删除指令配置管理 */
	Delete: GroupName + ".InstructionConfig.Delete"
} as const;

/**
 * 上架推荐策略
 */
export const PutItemRecommendStrategies = {
	/** 上架推荐策略权限 */
	Default: GroupName + ".PutItemRecommendStrategy",
	/** 创建上架推荐策略 */
	Create: GroupName + ".PutItemRecommendStrategy.Create",
	/** 更新上架推荐策略 */
	Update: GroupName + ".PutItemRecommendStrategy.Update",
	/** 删除上架推荐策略 */
	Delete: GroupName + ".PutItemRecommendStrategy.Delete"
} as const;

/**
 * 上架推荐策略明细
 */
export const PutItemRecommendStrategyItems = {
	/** 上架推荐策略明细权限 */
	Default: GroupName + ".PutItemRecommendStrategyItem",
	/** 创建上架推荐策略明细 */
	Create: GroupName + ".PutItemRecommendStrategyItem.Create",
	/** 更新上架推荐策略明细 */
	Update: GroupName + ".PutItemRecommendStrategyItem.Update",
	/** 删除上架推荐策略明细 */
	Delete: GroupName + ".PutItemRecommendStrategyItem.Delete",
	/** 导入上架推荐策略明细 */
	Import: GroupName + ".PutItemRecommendStrategyItem.Import"
} as const;

/**
 * 出库需求合并策略
 */
export const OutInstructionDemandMergeRules = {
	/** 出库需求合并策略权限 */
	Default: GroupName + ".OutInstructionDemandMergeRule",
	/** 创建出库需求合并策略 */
	Create: GroupName + ".OutInstructionDemandMergeRule.Create",
	/** 更新出库需求合并策略 */
	Update: GroupName + ".OutInstructionDemandMergeRule.Update",
	/** 删除出库需求合并策略 */
	Delete: GroupName + ".OutInstructionDemandMergeRule.Delete"
} as const;

/**
 * 出库需求
 */
export const OutInstructionDemands = {
	/** 出库需求权限 */
	Default: GroupName + ".OutInstructionDemand",
	/** 重新回传 */
	ReCallBack: GroupName + ".OutInstructionDemand.ReCallBack",
	/** 合并出库需求 */
	Merge: GroupName + ".OutInstructionDemand.Merge",
	/** 删除出库需求 */
	Delete: GroupName + ".OutInstructionDemand.Delete"
} as const;

/**
 * 出库需求明细
 */
export const OutInstructionDemandItems = {
	/** 出库需求明细权限 */
	Default: GroupName + ".OutInstructionDemandItem"
} as const;

/**
 * 下架任务类型
 */
export const MaterialPickTaskTypes = {
	/** 下架任务类型权限 */
	Default: GroupName + ".MaterialPickTaskType",
	/** 创建下架任务类型 */
	Create: GroupName + ".MaterialPickTaskType.Create",
	/** 更新下架任务类型 */
	Update: GroupName + ".MaterialPickTaskType.Update",
	/** 删除下架任务类型 */
	Delete: GroupName + ".MaterialPickTaskType.Delete"
} as const;

/**
 * 箱批次解析规则
 */
export const BoxLotResolveRules = {
	/** 箱批次解析规则权限 */
	Default: GroupName + ".BoxLotResolveRule",
	/** 创建箱批次解析规则 */
	Create: GroupName + ".BoxLotResolveRule.Create",
	/** 更新箱批次解析规则 */
	Update: GroupName + ".BoxLotResolveRule.Update",
	/** 删除箱批次解析规则 */
	Delete: GroupName + ".BoxLotResolveRule.Delete"
} as const;

/**
 * 任务代理人
 */
export const PickTaskAgents = {
	/** 任务代理人权限 */
	Default: GroupName + ".PickTaskAgent",
	/** 创建任务代理人 */
	Create: GroupName + ".PickTaskAgent.Create",
	/** 更新任务代理人 */
	Update: GroupName + ".PickTaskAgent.Update",
	/** 删除任务代理人 */
	Delete: GroupName + ".PickTaskAgent.Delete"
} as const;

/**
 * 设备任务管理
 */
export const DeviceTask = {
	/** 设备任务管理权限 */
	Default: GroupName + ".DeviceTask",
	/** 蓝芯AGV设备任务 */
	LanxinAgv: GroupName + ".DeviceTask.LanxinAgv",
	/** 堆垛机设备任务 */
	StackerCrane: GroupName + ".DeviceTask.StackerCrane"
} as const;
