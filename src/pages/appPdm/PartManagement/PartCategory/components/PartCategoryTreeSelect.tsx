import React, { useEffect, useState } from 'react';
import { TreeSelect } from 'antd';
import { PartCategoryGetTreeAsync } from '@/services/pdm/PartCategory';

// 将扁平数组转换为树形结构
const buildTree = (items?: API.BurnAbpPdmPartManagementPartCategoriesDtosPartCategoryDto[]): API.BurnAbpPdmPartManagementPartCategoriesDtosPartCategoryDto[] => {
  if (!items || !items.length) return [];

  // 创建ID到节点的映射
  const map = new Map<number, any>();
  const roots: any[] = [];

  // 第一遍遍历:创建所有节点的副本
  items.forEach(item => {
    map.set(item.id!, { ...item, children: [] });
  });

  // 第二遍遍历:建立父子关系
  items.forEach(item => {
    const node = map.get(item.id!);
    if (item.parentId === null || item.parentId === undefined) {
      // 根节点
      roots.push(node);
    } else {
      // 子节点:添加到父节点的children中
      const parent = map.get(item.parentId);
      if (parent) {
        parent.children.push(node);
      } else {
        // 如果找不到父节点,当作根节点处理
        roots.push(node);
      }
    }
  });

  return roots;
};

const convertTree = (nodes?: API.BurnAbpPdmPartManagementPartCategoriesDtosPartCategoryDto[]) => {
  if (!nodes) return [];
  return nodes.map(node => ({
    value: node.id as string,
    title: node.categoryName || node.categoryCode || '-',
    key: node.id as string,
    children: convertTree((node as any).children),
  }));
};

const PartCategoryTreeSelect: React.FC<any> = props => {
  const [treeData, setTreeData] = useState<any[]>([]);
  useEffect(() => {
    let mounted = true;
    PartCategoryGetTreeAsync().then(res => {
      if (mounted) {
        // 先将扁平数组构建为树形结构
        const tree = buildTree(res);
        // 再转换为TreeSelect需要的格式
        setTreeData(convertTree(tree));
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <TreeSelect
      allowClear
      showSearch
      treeDefaultExpandAll
      placeholder={props.placeholder || '请选择上级分类'}
      treeData={treeData}
      {...props}
    />
  );
};

export default PartCategoryTreeSelect;
