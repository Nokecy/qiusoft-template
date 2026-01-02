import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import DeleteConfirm from '@/components/deleteConfirm';
import { PartCategoryAttributeGetByCategoryIdAsync, PartCategoryAttributeDeleteAsync } from '@/services/pdm/PartCategoryAttribute';
import { PartCategoryGetTreeAsync } from '@/services/pdm/PartCategory';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, Tree, message, Space } from 'antd';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Access, useAccess, useIntl } from 'umi';
import CategoryAttributeFormDialog from './components/categoryAttributeFormDialog';
import { PartCategoryAttributePermissions } from '@/pages/appPdm/_permissions';
import dayjs from 'dayjs';

// 数据类型枚举映射
const dataTypeMap: Record<number, string> = {
  1: '文本',
  3: '整数',
  4: '小数',
  5: '布尔',
  6: '日期',
  8: '单选下拉',
  9: '多选',
};

type TreeNode = {
  value: string;
  label: string;
  title: string;
  key: string;
  children?: TreeNode[];
};

// 将扁平数组转换为树形结构
const buildTree = (items?: API.BurnAbpPdmPartManagementPartCategoriesDtosPartCategoryDto[]): API.BurnAbpPdmPartManagementPartCategoriesDtosPartCategoryDto[] => {
  if (!items || !items.length) return [];

  // 创建ID到节点的映射
  const map = new Map<number, any>();
  const roots: any[] = [];

  // 第一遍遍历：创建所有节点的副本
  items.forEach(item => {
    map.set(item.id!, { ...item, children: [] });
  });

  // 第二遍遍历：建立父子关系
  items.forEach(item => {
    const node = map.get(item.id!);
    if (item.parentId === null || item.parentId === undefined) {
      // 根节点
      roots.push(node);
    } else {
      // 子节点：添加到父节点的children中
      const parent = map.get(item.parentId);
      if (parent) {
        parent.children.push(node);
      } else {
        // 如果找不到父节点，当作根节点处理
        roots.push(node);
      }
    }
  });

  return roots;
};

const toTreeData = (items?: API.BurnAbpPdmPartManagementPartCategoriesDtosPartCategoryDto[]): TreeNode[] => {
  if (!items || !items.length) return [];
  return items.map(node => {
    const treeNode: TreeNode = {
      value: String(node.id),
      key: String(node.id),
      label: node.categoryName || node.categoryCode || '-',
      title: node.categoryName || node.categoryCode || '-',
    };

    // 递归处理子节点
    const children = (node as any).children;
    if (children && children.length > 0) {
      treeNode.children = toTreeData(children);
    }

    return treeNode;
  });
};

const Options = (props: ICellRendererParams & { onRefresh: () => void; currentCategoryId?: string }) => {
  const { data, onRefresh, currentCategoryId } = props;
  const intl = useIntl();
  const access = useAccess();
  const canUpdate = (access && (access[PartCategoryAttributePermissions.Update] ?? true)) as boolean;
  const canDelete = (access && (access[PartCategoryAttributePermissions.Delete] ?? true)) as boolean;

  const handleDelete = (id: any) => {
    const hide = message.loading('正在操作,请稍后', 0);
    return PartCategoryAttributeDeleteAsync({ id }).then(() => onRefresh()).finally(() => hide());
  };

  return (
    <Space>
      <Access accessible={canUpdate}>
        <CategoryAttributeFormDialog
          title={'编辑属性'}
          entityId={data.id}
          categoryId={currentCategoryId}
          categoryName={data.categoryName}
          record={data}
          onAfterSubmit={onRefresh}
          buttonProps={{ icon: <EditOutlined />, type: 'link', title: intl.formatMessage({ id: 'AbpUi:Edit' }) }}
        />
      </Access>
      <Access accessible={canDelete}>
        <DeleteConfirm title="确定删除?" onConfirm={() => handleDelete(data.id)}>
          <Button size={'small'} icon={<DeleteOutlined />} type={'link'} title={intl.formatMessage({ id: 'AbpUi:Delete' })} />
        </DeleteConfirm>
      </Access>
    </Space>
  );
};

const CategoryAttributePage: React.FC = () => {
  const gridRef = useRef<GridRef>();
  const intl = useIntl();
  const access = useAccess();
  const [categoryId, setCategoryId] = useState<string>();
  const [categoryName, setCategoryName] = useState<string>();
  const [treeData, setTreeData] = useState<TreeNode[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const canCreate = (access && (access[PartCategoryAttributePermissions.Create] ?? true)) as boolean;

  // 递归收集所有节点的key
  const getAllKeys = (nodes: TreeNode[]): React.Key[] => {
    const keys: React.Key[] = [];
    const traverse = (items: TreeNode[]) => {
      items.forEach(item => {
        keys.push(item.key);
        if (item.children && item.children.length > 0) {
          traverse(item.children);
        }
      });
    };
    traverse(nodes);
    return keys;
  };

  useEffect(() => {
    PartCategoryGetTreeAsync().then(res => {
      console.log('分类属性页面 - API返回的原始数据:', res);
      // 先将扁平数组构建为树形结构
      const tree = buildTree(res);
      console.log('分类属性页面 - 构建的树形结构:', tree);
      // 再转换为Tree组件需要的格式
      const treeData = toTreeData(tree);
      console.log('分类属性页面 - 转换后的树形数据:', treeData);
      setTreeData(treeData);
      // 设置所有节点默认展开
      const allKeys = getAllKeys(treeData);
      setExpandedKeys(allKeys);
    });
  }, []);

  useEffect(() => {
    gridRef.current?.onRefresh();
  }, [categoryId]);

  const onRefresh = () => gridRef.current?.onRefresh();

  const handleTreeSelect = (keys: any[], info: any) => {
    const selectedKey = keys?.[0] as string;
    setCategoryId(selectedKey || undefined);
    setCategoryName(info?.node?.title || undefined);
  };

  // 列定义
  const columnDefs: any = useMemo(() => [
    { field: 'attributeCode', headerName: '属性编码', width: 150 },
    { field: 'displayName', headerName: '显示名称', width: 150 },
    {
      field: 'dataType',
      headerName: '数据类型',
      width: 100,
      hideInSearch: true,
      cellRenderer: (params: any) => dataTypeMap[params.value] || params.value
    },
    {
      field: 'isRequired',
      headerName: '必填',
      width: 80,
      hideInSearch: true,
      cellRenderer: (params: any) => (params.value ? '是' : '否')
    },
    { field: 'displayOrder', headerName: '显示顺序', width: 100, hideInSearch: true },
    { field: 'minValue', headerName: '最小值', width: 100, hideInSearch: true },
    { field: 'maxValue', headerName: '最大值', width: 100, hideInSearch: true },
    {
      field: 'isActive',
      headerName: '是否启用',
      width: 100,
      hideInSearch: true,
      cellRenderer: (params: any) => (params.value ? '启用' : '禁用')
    },
    { field: 'helpText', headerName: '说明', flex: 1, minWidth: 180 },
    { field: 'creator', headerName: '创建人', width: 100, hideInSearch: true },
    {
      field: 'creationTime',
      headerName: '创建时间',
      width: 160,
      hideInSearch: true,
      initialSort: 'desc',
      cellRenderer: ({ value }: any) => value ? dayjs(value).format('YYYY-MM-DD HH:mm') : '-'
    },
    {
      field: 'lastModificationTime',
      headerName: '最后修改时间',
      width: 160,
      hideInSearch: true,
      cellRenderer: ({ value }: any) => value ? dayjs(value).format('YYYY-MM-DD HH:mm') : '-'
    },
    { field: 'lastModifier', headerName: '最后修改人', width: 100, hideInSearch: true },
    {
      field: 'action',
      headerName: intl.formatMessage({ id: 'AbpUi:Actions' }),
      width: 150,
      pinned: 'right',
      filter: false,
      sortable: false,
      cellRenderer: Options,
      cellRendererParams: { onRefresh, currentCategoryId: categoryId }
    }
  ], [intl, onRefresh, categoryId]);

  return (
    <div style={{ display: 'flex', gap: 16, height: '100%' }}>
      <div style={{
        width: 320,
        minWidth: 280,
        border: '1px solid #f0f0f0',
        borderRadius: 6,
        padding: '16px 12px',
        overflow: 'auto',
        backgroundColor: '#fafafa',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{
          fontWeight: 600,
          fontSize: 16,
          marginBottom: 12,
          paddingBottom: 12,
          borderBottom: '1px solid #e8e8e8'
        }}>物料分类</div>
        <div style={{ flex: 1, overflow: 'auto' }}>
          <Tree
            treeData={treeData}
            onSelect={handleTreeSelect}
            selectedKeys={categoryId ? [categoryId] : []}
            expandedKeys={expandedKeys}
            onExpand={setExpandedKeys}
            showLine
            blockNode
            style={{ backgroundColor: 'transparent' }}
          />
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <AgGridPlus
          gridRef={gridRef}
          headerTitle={'分类属性'}
          gridKey="appPdm.PartManagement.CategoryAttribute"
          request={async () => {
            if (!categoryId) {
              return { success: true, data: [], total: 0 } as any;
            }
            const list = await PartCategoryAttributeGetByCategoryIdAsync({ categoryId });
            return { success: true, data: list || [], total: list?.length || 0 } as any;
          }}
          rowSelection={'multiple'}
          rowMultiSelectWithClick={true}
          columnDefs={columnDefs}
          toolBarRender={() => [
            <Access key="create" accessible={canCreate}>
              <CategoryAttributeFormDialog
                title={'新增属性'}
                categoryId={categoryId}
                categoryName={categoryName}
                onAfterSubmit={onRefresh}
                buttonProps={{ type: 'primary', icon: <PlusOutlined />, disabled: !categoryId }}
              >
                新建
              </CategoryAttributeFormDialog>
            </Access>,
          ]}
        />
      </div>
    </div>
  );
};

export default CategoryAttributePage;

export const routeProps = {
  name: '分类属性管理',
};
