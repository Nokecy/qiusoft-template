/**
 * PDM 公共组件类型定义
 */

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
