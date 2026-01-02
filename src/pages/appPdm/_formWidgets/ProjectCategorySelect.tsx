import React, { useEffect, useState, useMemo } from 'react';
import { TreeSelect } from 'antd';
import { ProjectCategoryGetListAsync } from '@/services/pdm/ProjectCategory';
import type { DefaultOptionType } from 'antd/es/select';

interface ProjectCategorySelectProps {
  value?: any;
  onChange?: (value: any, label?: any) => void;
  excludeId?: string; // 排除的ID,用于编辑时避免选择自己或自己的子级作为父级
  onlyLeaf?: boolean; // 是否只能选择叶子节点
  [key: string]: any;
}

/**
 * 项目分类下拉树组件
 * 数据源为项目分类本身,支持树状结构展示
 */
const ProjectCategorySelect: React.FC<ProjectCategorySelectProps> = (props) => {
  const { value, onChange, excludeId, onlyLeaf = false, ...restProps } = props;
  const [rawData, setRawData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 加载分类数据 - 只在组件挂载时加载一次
  useEffect(() => {
    setLoading(true);
    ProjectCategoryGetListAsync({
      MaxResultCount: 1000,
      SkipCount: 0,
    })
      .then(res => {
        setRawData(res.items || []);
      })
      .catch(error => {
        console.error('加载项目分类失败:', error);
        setRawData([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); // 空依赖数组 - 只加载一次

  // 使用 useMemo 根据 rawData、excludeId 和 onlyLeaf 计算树形数据
  const treeData = useMemo(() => {
    // 过滤掉排除的节点
    const filteredItems = excludeId
      ? rawData.filter(item => item.id !== excludeId)
      : rawData;

    const map = new Map<string, DefaultOptionType>();
    const roots: DefaultOptionType[] = [];

    // 先创建所有节点的映射
    filteredItems.forEach(item => {
      map.set(item.code, {
        value: item.code,
        title: `${item.code} - ${item.name}`,
        key: item.code,
        children: [],
        isLeaf: item.isLeaf,
      });
    });

    // 构建树形结构
    filteredItems.forEach(item => {
      const node = map.get(item.code);
      if (!node) return;

      if (item.parentCode && map.has(item.parentCode)) {
        const parentNode = map.get(item.parentCode);
        if (parentNode && parentNode.children) {
          parentNode.children.push(node);
        }
      } else {
        roots.push(node);
      }
    });

    // 清理空children并设置禁用状态
    const cleanEmptyChildren = (nodes: DefaultOptionType[]) => {
      nodes.forEach(node => {
        if (node.children && node.children.length === 0) {
          delete node.children;
        } else if (node.children) {
          cleanEmptyChildren(node.children);
          // 如果只允许选择叶子节点,禁用有子节点的节点
          if (onlyLeaf) {
            node.disabled = true;
            node.selectable = false;
          }
        }
      });
    };
    cleanEmptyChildren(roots);

    return roots;
  }, [rawData, excludeId, onlyLeaf]); // 当原始数据或过滤条件变化时重新计算

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

//@ts-ignore
ProjectCategorySelect.GroupName = "PDM";
export default ProjectCategorySelect;
export { ProjectCategorySelect };
