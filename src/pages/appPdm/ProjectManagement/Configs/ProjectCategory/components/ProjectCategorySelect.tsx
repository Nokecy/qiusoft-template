import React, { useEffect, useState } from 'react';
import { TreeSelect } from 'antd';
import { ProjectCategoryGetListAsync } from '@/services/pdm/ProjectCategory';
import type { DefaultOptionType } from 'antd/es/select';

interface ProjectCategorySelectProps {
  value?: any;
  onChange?: (value: any, label?: any) => void;
  excludeId?: string; // 排除的ID，用于编辑时避免选择自己或自己的子级作为父级
  [key: string]: any;
}

/**
 * 项目分类下拉树组件
 * 数据源为项目分类本身，支持树状结构展示
 */
const ProjectCategorySelect: React.FC<ProjectCategorySelectProps> = (props) => {
  const { value, onChange, excludeId, ...restProps } = props;
  const [treeData, setTreeData] = useState<DefaultOptionType[]>([]);
  const [loading, setLoading] = useState(false);

  // 将扁平数据转换为树形结构
  const buildTree = (items: any[], excludeId?: string): DefaultOptionType[] => {
    // 过滤掉排除的节点
    const filteredItems = excludeId
      ? items.filter(item => item.id !== excludeId)
      : items;

    const map = new Map<string, DefaultOptionType>();
    const roots: DefaultOptionType[] = [];

    // 先创建所有节点的映射
    filteredItems.forEach(item => {
      map.set(item.code, {
        value: item.code,
        title: `${item.code} - ${item.name}`,
        key: item.code,
        children: [],
      });
    });

    // 构建树形结构
    filteredItems.forEach(item => {
      const node = map.get(item.code);
      if (!node) return;

      if (item.parentCode && map.has(item.parentCode)) {
        // 如果有父节点，添加到父节点的children中
        const parentNode = map.get(item.parentCode);
        if (parentNode && parentNode.children) {
          parentNode.children.push(node);
        }
      } else {
        // 否则作为根节点
        roots.push(node);
      }
    });

    // 清理空children
    const cleanEmptyChildren = (nodes: DefaultOptionType[]) => {
      nodes.forEach(node => {
        if (node.children && node.children.length === 0) {
          delete node.children;
        } else if (node.children) {
          cleanEmptyChildren(node.children);
        }
      });
    };
    cleanEmptyChildren(roots);

    return roots;
  };

  // 加载分类数据
  const loadData = async () => {
    setLoading(true);
    try {
      const res = await ProjectCategoryGetListAsync({
        MaxResultCount: 1000, // 加载所有数据
        SkipCount: 0,
      });
      const tree = buildTree(res.items || [], excludeId);
      setTreeData(tree);
    } catch (error) {
      console.error('加载项目分类失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [excludeId]);

  const handleChange = (selectedValue: any, label: any, extra: any) => {
    if (onChange) {
      onChange(selectedValue, extra.triggerNode?.props?.title);
    }
  };

  return (
    <TreeSelect
      {...restProps}
      value={value}
      onChange={handleChange}
      treeData={treeData}
      loading={loading}
      placeholder="请选择父级分类"
      allowClear
      showSearch
      treeDefaultExpandAll={false}
      treeNodeFilterProp="title"
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
    />
  );
};

export default ProjectCategorySelect;
