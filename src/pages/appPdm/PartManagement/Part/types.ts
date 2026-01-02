/**
 * 物料详情页面 - 类型定义文件
 */

import type { BurnAbpPdmBomManagementBomsBomItemDto } from '@/services/pdm/typings';

/**
 * 物料详情数据接口
 */
export interface PartDetailData {
  id: string;
  partNumber: string;
  outCode?: string;
  drawingNumber?: string;        // 物料图号
  description: string;
  engDescription?: string;       // 英文描述
  outDescription?: string;       // 对外描述
  specification?: string;
  outSpecification?: string;     // 对外规格型号
  unit: string;
  unitName?: string;             // 单位名称
  unitCode?: string;
  productSeriesId?: number;
  productSeriesCode?: string;
  productSeriesName?: string;
  categoryName: string;
  categoryCode?: string;
  version: string;
  lifecycleStatus: number;
  isCritical: boolean;
  isActive: boolean;
  comeFrom?: string;             // 来源编码
  comeFromName?: string;         // 来源名称
  comeFromType?: number;         // 来源类型: 2=生产, 3=虚拟, 8=模型
  eanCode?: string;              // EAN码
  upcCode?: string;              // UPC码
  creationTime: string;
  creator: string;
  lastModificationTime?: string;
  lastModifier?: string;
  imageUrl?: string;
  // 检出信息
  isCheckedOut?: boolean;
  checkOutInfo?: {
    checkedOutUserId?: string;
    checkedOutUserName?: string;
    checkedOutTime?: string;
    checkOutComment?: string;
    expireAt?: string;
    forceUnlockReason?: string;
  };
  // 规格尺寸信息
  material?: string;             // 材料/材质
  surfaceTreatment?: string;     // 表面处理
  color?: string;                // 颜色
  length?: number;               // 长度 (mm)
  width?: number;                // 宽度 (mm)
  height?: number;               // 高度 (mm)
  weight?: number;               // 重量 (g)
  diameter?: number;             // 直径 (mm)
  volume?: number;               // 体积 (mm³)
  attributeValues?: Array<{
    attributeCode: string;
    attributeName: string;
    attributeValue: string;
    displayText?: string;
    unit?: string;
    value?: string;
  }>;
}

/**
 * 库存数据接口
 */
export interface InventoryData {
  warehouseCode: string;
  warehouseName: string;
  availableQty: number;
  inTransitQty: number;
  safetyStock: number;
  lockedQty?: number;
  unit: string;
}

/**
 * 关联文档数据接口
 */
export interface DocumentLinkData {
  id: string;
  partNumber?: string;
  partName?: string;
  documentNumber?: string;
  documentName?: string;
  usage?: number;
  isPrimary?: boolean;
  creationTime?: string;
}

/**
 * 供应商数据接口
 */
export interface SupplierData {
  id: string;
  supplierCode: string;
  supplierName: string;
  leadTime: number;
  price: number;
  isPrimary: boolean;
  contactPerson?: string;
  contactPhone?: string;
  lastPurchaseDate?: string;
}

/**
 * 质量记录数据接口
 */
export interface QualityRecordData {
  id: string;
  batchNumber: string;
  inspectionType: string;
  inspectionResult: string;
  inspector: string;
  inspectionTime: string;
  defectRate?: number;
  reportUrl?: string;
}

/**
 * 版本历史数据接口
 */
export interface VersionHistoryData {
  id: string;
  version: string;
  versionDate?: string;
  versionReason?: string;
  isCurrent: boolean;
  lifecycleStatus: number;
  createdBy?: string;
  creationTime?: string;
  releasedBy?: string;
  releaseDate?: string;
}

/**
 * 操作类型
 */
export type OperationType = 'checkout' | 'checkin' | 'undo_checkout' | 'submit' | 'withdraw' | 'approve' | 'reject';

/**
 * 生命周期状态配置
 */
export interface LifecycleConfig {
  label: string;
  color: string;
}

/**
 * 库存健康度状态
 */
export interface StockHealth {
  percent: number;
  status: 'success' | 'normal' | 'exception';
}

/**
 * 库存统计数据
 */
export interface InventoryStats {
  total: number;
  inTransit: number;
  locked: number;
  available: number;
  safetyTotal: number;
  healthPercent: number;
}

/**
 * 质量统计数据
 */
export interface QualityStats {
  passCount: number;
  failCount: number;
  totalCount: number;
  passRate: number;
}

/**
 * 变更类型配置
 */
export interface ChangeTypeConfig {
  label: string;
  color: string;
}

/**
 * BOM 文档树节点数据 (用于树形视图)
 */
export interface BomDocumentTreeNode {
  bomItemId?: number;
  bomPath?: string;
  partNumber?: string;
  partName?: string;
  documents?: BomDocumentItem[];
  children?: BomDocumentTreeNode[];
}

/**
 * BOM 文档项 (关联信息 + 文档详情)
 */
export interface BomDocumentItem {
  link?: {
    id?: string;
    partNumber?: string;
    partName?: string;
    documentNumber?: string;
    documentName?: string;
    usage?: number;
    isPrimary?: boolean;
    creationTime?: string;
  };
  document?: {
    id?: string;
    documentNumber?: string;
    name?: string;
    title?: string;
    description?: string;
    version?: string;
    status?: number;
    fileType?: string;
    creationTime?: string;
  };
}

/**
 * BOM子项详情组件Props
 */
export interface BomItemDetailProps {
  item: BurnAbpPdmBomManagementBomsBomItemDto | null;
  onEdit: (item: BurnAbpPdmBomManagementBomsBomItemDto) => void;
  onDelete: (item: BurnAbpPdmBomManagementBomsBomItemDto) => void;
  canUpdate: boolean;
}
