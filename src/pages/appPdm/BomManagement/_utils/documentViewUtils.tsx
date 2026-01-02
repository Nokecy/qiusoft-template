import type { API } from '@/services/typings';
import type { DataNode } from 'antd/es/tree';

/**
 * 将递归树结构扁平化为列表
 * @param tree 递归树结构
 * @returns 扁平化的列表
 */
export function flattenDocumentTree(
  tree: API.BurnAbpPdmBomManagementBomsBomItemTreeDto[]
): API.BurnAbpPdmBomManagementBomsBomItemTreeDto[] {
  const result: API.BurnAbpPdmBomManagementBomsBomItemTreeDto[] = [];

  function traverse(nodes: API.BurnAbpPdmBomManagementBomsBomItemTreeDto[]) {
    nodes.forEach((node) => {
      result.push(node);
      if (node.children && node.children.length > 0) {
        traverse(node.children);
      }
    });
  }

  traverse(tree);
  return result;
}

/**
 * 构建Ant Design Tree组件所需的数据格式（增强视觉层级）
 * @param tree 递归树结构
 * @returns Tree组件数据
 */
export function buildDocumentTreeData(
  tree: API.BurnAbpPdmBomManagementBomsBomItemTreeDto[]
): DataNode[] {
  function convertNode(
    node: API.BurnAbpPdmBomManagementBomsBomItemTreeDto,
    level: number = 1
  ): DataNode {
    const isActive = node.activationStatus === 1;
    const statusColor = isActive ? '#52c41a' : '#bfbfbf';
    const statusText = isActive ? '激活' : '失效';

    return {
      key: `${node.id}`,
      title: (
        <div style={{ padding: '2px 0', lineHeight: 1.8 }}>
          {/* 物料编码 */}
          <strong
            style={{
              color: '#1890ff',
              fontSize: 13,
              fontFamily: 'Consolas, Monaco, monospace',
            }}
          >
            {node.childMaterialCode}
          </strong>

          {/* 物料描述 */}
          <span
            style={{
              marginLeft: 8,
              color: '#262626',
              fontSize: 13,
            }}
          >
            {node.childMaterialDescription}
          </span>

          {/* 用量信息 */}
          <span
            style={{
              marginLeft: 10,
              color: '#8c8c8c',
              fontSize: 12,
            }}
          >
            用量: {node.quantity} {node.unitOfMeasure}
          </span>

          {/* 状态标识 */}
          <span
            style={{
              marginLeft: 8,
              color: statusColor,
              fontSize: 12,
              fontWeight: 500,
            }}
          >
            {isActive ? '●' : '○'} {statusText}
          </span>
        </div>
      ),
      children: node.children
        ? node.children.map((child) => convertNode(child, level + 1))
        : undefined,
    };
  }

  return tree.map((node) => convertNode(node, 1));
}

/**
 * 根据选中节点过滤文档列表
 * @param tree 完整树结构
 * @param selectedNodeId 选中的节点ID
 * @returns 该节点的文档列表
 */
export function filterDocumentsByNode(
  tree: API.BurnAbpPdmBomManagementBomsBomNodeDocumentDto[],
  selectedNodeId: number | null
): API.BurnAbpPdmBomManagementBomsBomNodeDocumentInfoDto[] {
  if (!selectedNodeId) return [];

  const flatList = flattenDocumentTree(tree);
  const node = flatList.find((n) => n.bomItemId === selectedNodeId);

  return node?.documents || [];
}

/**
 * 收集树中所有文档（去重）
 * @param tree 递归树结构
 * @returns 所有文档的列表
 */
export function collectAllDocuments(
  tree: API.BurnAbpPdmBomManagementBomsBomNodeDocumentDto[]
): API.BurnAbpPdmBomManagementBomsBomNodeDocumentInfoDto[] {
  const documentMap = new Map<string, API.BurnAbpPdmBomManagementBomsBomNodeDocumentInfoDto>();

  function traverse(nodes: API.BurnAbpPdmBomManagementBomsBomNodeDocumentDto[]) {
    nodes.forEach((node) => {
      node.documents?.forEach((doc) => {
        if (doc.documentNumber) {
          documentMap.set(doc.documentNumber, doc);
        }
      });
      if (node.children && node.children.length > 0) {
        traverse(node.children);
      }
    });
  }

  traverse(tree);
  return Array.from(documentMap.values());
}
