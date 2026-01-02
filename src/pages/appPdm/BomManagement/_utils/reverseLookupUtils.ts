import type { API } from '@/services/typings';

/**
 * 将扁平的反查结果转换为树形结构
 * @param data 反查结果数组
 * @returns 树形结构数据
 */
export function buildReverseLookupTree(
  data: API.BurnAbpPdmBomManagementBomsBomReverseLookupDto[]
): API.BurnAbpPdmBomManagementBomsBomReverseLookupDto[] {
  if (!data || data.length === 0) return [];

  // 按层级排序
  const sorted = [...data].sort((a, b) => (a.level || 0) - (b.level || 0));

  // 第一层级作为根节点
  return sorted.filter((item) => item.level === 1);
}

/**
 * 计算统计信息
 * @param data 反查结果数组
 * @returns 统计信息对象
 */
export function calculateStatistics(data: API.BurnAbpPdmBomManagementBomsBomReverseLookupDto[]) {
  if (!data || data.length === 0) {
    return {
      directParents: 0,
      totalReferences: 0,
      maxLevel: 0,
    };
  }

  const directParents = data.filter((item) => item.level === 1).length;
  const totalReferences = data.length;
  const maxLevel = Math.max(...data.map((item) => item.level || 0));

  return {
    directParents,
    totalReferences,
    maxLevel,
  };
}

/**
 * 按层级分组数据
 * @param data 反查结果数组
 * @returns 按层级分组的Map
 */
export function groupByLevel(
  data: API.BurnAbpPdmBomManagementBomsBomReverseLookupDto[]
): Map<number, API.BurnAbpPdmBomManagementBomsBomReverseLookupDto[]> {
  const grouped = new Map<number, API.BurnAbpPdmBomManagementBomsBomReverseLookupDto[]>();

  data.forEach((item) => {
    const level = item.level || 0;
    if (!grouped.has(level)) {
      grouped.set(level, []);
    }
    grouped.get(level)!.push(item);
  });

  return grouped;
}

/**
 * 导出为CSV格式
 * @param data 反查结果数组
 * @param childMaterialCode 子项物料编码
 */
export function exportToCSV(
  data: API.BurnAbpPdmBomManagementBomsBomReverseLookupDto[],
  childMaterialCode: string
) {
  const headers = ['层级', '父项物料编码', '父项物料描述', '版本', '用量', '单位', '生效日期', '失效日期'];
  const rows = data.map((item) => [
    item.level || '',
    item.materialCode || '',
    item.materialDescription || '',
    item.version || '',
    item.quantity || '',
    item.unitOfMeasure || '',
    item.effectiveDate || '',
    item.expiryDate || '',
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
  ].join('\n');

  // 创建下载
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `BOM反查_${childMaterialCode}_${new Date().getTime()}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
