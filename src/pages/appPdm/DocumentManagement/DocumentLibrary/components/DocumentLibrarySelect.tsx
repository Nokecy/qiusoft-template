import React, { useEffect, useState } from 'react';
import { TreeSelect } from 'antd';
import { DocumentLibraryGetListAsync } from '@/services/pdm/DocumentLibrary';
import { useForm } from '@formily/react';

// 文档库类型枚举
enum DocumentLibraryType {
  Storage = 1,  // 存储库
  Recycle = 2,  // 回收库
}

// 将扁平数据转换为树形结构,并排除指定ID
const buildTreeData = (flatData: any[], excludeId?: string) => {
  const map = new Map();
  const roots: any[] = [];

  // 先过滤掉要排除的节点
  const filteredData = flatData.filter(item => !excludeId || item.id !== excludeId);

  // 建立id到节点的映射
  filteredData.forEach(item => {
    map.set(item.id, {
      value: item.id,
      title: item.libraryName || item.libraryCode || '-',
      key: item.id,
      children: []
    });
  });

  // 建立父子关系
  filteredData.forEach(item => {
    const node = map.get(item.id);
    if (item.parentLibraryId && item.parentLibraryId !== excludeId) {
      const parent = map.get(item.parentLibraryId);
      if (parent) {
        parent.children.push(node);
      } else {
        // 父节点不存在或被排除,作为根节点
        roots.push(node);
      }
    } else {
      // 没有父节点,作为根节点
      roots.push(node);
    }
  });

  return roots;
};

interface DocumentLibrarySelectProps {
  libraryType?: DocumentLibraryType; // 文档库类型: 1-存储库, 2-回收库
  placeholder?: string;
  [key: string]: any;
}

const DocumentLibrarySelect: React.FC<DocumentLibrarySelectProps> = props => {
  const { libraryType, ...restProps } = props;
  const [treeData, setTreeData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const form = useForm();

  // 获取当前表单的id值,用于排除自己
  const currentId = form.values?.id;

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    DocumentLibraryGetListAsync({
      SkipCount: 0,
      MaxResultCount: 10000
    } as any)
      .then(res => {
        if (mounted) {
          // 只包含激活状态的文档库
          let activeItems = (res.items || []).filter((item: any) => item.isActive === true);

          // 如果指定了类型,则只显示对应类型的文档库
          if (libraryType !== undefined) {
            activeItems = activeItems.filter((item: any) => item.libraryType === libraryType);
          }

          // 构建树形结构,并排除当前编辑的文档库
          const tree = buildTreeData(activeItems, currentId);
          setTreeData(tree);
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [currentId, libraryType]);

  return (
    <TreeSelect
      allowClear
      showSearch
      loading={loading}
      treeDefaultExpandAll
      placeholder={restProps.placeholder || '请选择父级文档库'}
      treeData={treeData}
      filterTreeNode={(input, treeNode: any) =>
        treeNode.title.toLowerCase().includes(input.toLowerCase())
      }
      {...restProps}
    />
  );
};

export default DocumentLibrarySelect;
