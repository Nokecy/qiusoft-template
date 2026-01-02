import React, { useEffect, useState } from 'react';
import { TreeSelect } from 'antd';
import { ProductSeriesGetTreeAsync } from '@/services/pdm/ProductSeries';

// 转换树形数据为 TreeSelect 需要的格式
const convertTree = (nodes?: API.BurnAbpPdmPartManagementProductSeriesDtosProductSeriesTreeDto[]): any[] => {
  if (!nodes) return [];
  return nodes.map(node => ({
    value: node.id,
    title: node.seriesName || node.seriesCode || '-',
    key: node.id,
    children: convertTree(node.children),
  }));
};

const ProductSeriesTreeSelect: React.FC<any> = props => {
  const [treeData, setTreeData] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;
    ProductSeriesGetTreeAsync({ rootId: '' }).then(res => {
      if (mounted) {
        setTreeData(convertTree(res));
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
      placeholder={props.placeholder || '请选择上级系列'}
      treeData={treeData}
      {...props}
    />
  );
};

export default ProductSeriesTreeSelect;
