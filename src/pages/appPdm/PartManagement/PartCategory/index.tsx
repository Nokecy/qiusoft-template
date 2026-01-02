import { AgGridPlus } from '@/components/agGrid';
import { PartCategoryGetTreeAsync, PartCategoryDeleteAsync } from '@/services/pdm/PartCategory';
import { PartCategoryAttributeGetByCategoryIdAsync, PartCategoryAttributeDeleteAsync } from '@/services/pdm/PartCategoryAttribute';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space, Drawer } from 'antd';
import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Access, useAccess, useIntl } from 'umi';
import PartCategoryFormDialog from './components/partCategoryFormDialog';
import CategoryAttributeFormDialog from '../CategoryAttribute/components/categoryAttributeFormDialog';
import DeleteConfirm from '@/components/deleteConfirm';
import { PartCategoryPermissions, PartCategoryAttributePermissions } from '@/pages/appPdm/_permissions';
import Import from './components/import';
import { cloneDeep } from 'lodash';
import dayjs from 'dayjs';

// 树形数据扁平化处理函数
const flattenTreeDeep = (treeData: any[], childrenName = 'children') => {
  const flattenData = (treeData: any[], res: any[], parentPath: string[] = [], childrenName = 'children') => {
    treeData.forEach(item => {
      // 使用categoryName作为路径标识
      const currentPath = [...parentPath, item.categoryName || item.categoryCode || String(item.id)];
      const flatItem = {
        ...item,
        hierarchy: currentPath
      };
      // 删除children字段，避免重复
      delete flatItem[childrenName];
      res.push(flatItem);

      // 递归处理子节点
      if (item[childrenName] && item[childrenName].length > 0) {
        flattenData(item[childrenName], res, currentPath, childrenName);
      }
    });
    return res;
  };

  let data = cloneDeep(treeData);
  let res: any[] = [];
  flattenData(data, res, [], childrenName);
  return res;
};

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

// 物料分类操作列渲染
const CategoryOptions = (props: ICellRendererParams & { onRefresh: () => void }) => {
  const { data, onRefresh } = props;
  const intl = useIntl();
  const access = useAccess();

  const canUpdate = (access && (access[PartCategoryPermissions.Update] ?? true)) as boolean;
  const canDelete = (access && (access[PartCategoryPermissions.Delete] ?? true)) as boolean;

  const handleDelete = (id: any) => {
    const hide = message.loading('正在操作,请稍后', 0);
    return PartCategoryDeleteAsync({ id }).then(() => onRefresh()).finally(() => hide());
  };

  return (
    <Space>
      <Access accessible={canUpdate}>
        <PartCategoryFormDialog
          title={'编辑物料分类'}
          entityId={data.id}
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

// 分类属性操作列渲染
const AttributeOptions = (props: ICellRendererParams & { onRefresh: () => void; currentCategoryId?: string; categoryName?: string }) => {
  const { data, onRefresh, currentCategoryId, categoryName } = props;
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
          categoryName={categoryName}
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

const PdmPartCategoryPage: React.FC<any> = () => {
  const gridRef = useRef<GridRef>();
  const attrGridRef = useRef<GridRef>();
  const intl = useIntl();
  const access = useAccess();
  const canCreate = (access && (access[PartCategoryPermissions.Create] ?? true)) as boolean;
  const canCreateAttr = (access && (access[PartCategoryAttributePermissions.Create] ?? true)) as boolean;

  // 选中的分类
  const [selectedCategory, setSelectedCategory] = useState<{
    id: string;
    categoryName: string;
  } | null>(null);

  // 抽屉显示状态
  const [drawerOpen, setDrawerOpen] = useState(false);

  const onRefresh = () => {
    gridRef.current?.onRefresh();
  };

  const onAttrRefresh = () => {
    attrGridRef.current?.onRefresh();
  };

  // 选中分类变化时刷新属性列表
  useEffect(() => {
    if (selectedCategory && drawerOpen) {
      attrGridRef.current?.onRefresh();
    }
  }, [selectedCategory?.id, drawerOpen]);

  // 处理分类名称点击，打开抽屉
  const handleCategoryNameClick = (data: any) => {
    setSelectedCategory({
      id: String(data.id),
      categoryName: data.categoryName || data.categoryCode || '-',
    });
    setDrawerOpen(true);
  };

  // 物料分类列定义
  const columnDefs: any = useMemo(() => [
    { field: 'categoryCode', headerName: '分类编码', width: 150 },
    { field: 'path', headerName: '分类路径', width: 280 },
    { field: 'level', headerName: '层级', width: 80, hideInSearch: true },
    {
      field: 'isLeaf',
      headerName: '叶子节点',
      width: 100,
      hideInSearch: true,
      cellRenderer: (params: any) => params.value ? '是' : '否'
    },
    { field: 'partNumberPrefix', headerName: '物料号前缀', width: 150 },
    {
      field: 'isCodeParticipant',
      headerName: '参与编码',
      width: 100,
      hideInSearch: true,
      cellRenderer: (params: any) => params.value ? '是' : '否'
    },
    { field: 'codeSeparator', headerName: '编码分隔符', width: 100, hideInSearch: true },
    {
      field: 'isActive',
      headerName: '是否启用',
      width: 100,
      cellRenderer: (params: any) => params.value ? '启用' : '禁用'
    },
    { field: 'memo', headerName: '备注', width: 200 },
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
      width: 120,
      pinned: 'right',
      filter: false,
      sortable: false,
      cellRenderer: CategoryOptions,
      cellRendererParams: { onRefresh }
    }
  ], [intl, onRefresh]);

  // 分类属性列定义
  const attrColumnDefs: any = useMemo(() => [
    { field: 'attributeCode', headerName: '属性编码', width: 120 },
    { field: 'displayName', headerName: '显示名称', width: 120 },
    {
      field: 'dataType',
      headerName: '数据类型',
      width: 90,
      hideInSearch: true,
      cellRenderer: (params: any) => dataTypeMap[params.value] || params.value
    },
    {
      field: 'isRequired',
      headerName: '必填',
      width: 70,
      hideInSearch: true,
      cellRenderer: (params: any) => (params.value ? '是' : '否')
    },
    { field: 'displayOrder', headerName: '顺序', width: 70, hideInSearch: true },
    {
      field: 'isActive',
      headerName: '启用',
      width: 70,
      hideInSearch: true,
      cellRenderer: (params: any) => (params.value ? '是' : '否')
    },
    { field: 'helpText', headerName: '说明', flex: 1, minWidth: 100 },
    {
      field: 'action',
      headerName: intl.formatMessage({ id: 'AbpUi:Actions' }),
      width: 100,
      pinned: 'right',
      filter: false,
      sortable: false,
      cellRenderer: AttributeOptions,
      cellRendererParams: {
        onRefresh: onAttrRefresh,
        currentCategoryId: selectedCategory?.id,
        categoryName: selectedCategory?.categoryName
      }
    }
  ], [intl, onAttrRefresh, selectedCategory]);

  return (
    <>
      <AgGridPlus
        gridRef={gridRef}
        headerTitle={'物料分类'}
        gridKey="appPdm.PartManagement.PartCategory"
        treeData={true}
        getDataPath={(data) => {
          return data.hierarchy;
        }}
        autoGroupColumnDef={{
          headerName: '分类名称',
          minWidth: 300,
          pinned: 'left',
          cellRendererParams: {
            suppressCount: true,
            innerRenderer: (params: any) => {
              const name = params.data?.categoryName || params.data?.categoryCode || '-';
              return (
                <a
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCategoryNameClick(params.data);
                  }}
                  style={{ color: '#1890ff', cursor: 'pointer' }}
                >
                  {name}
                </a>
              );
            }
          }
        }}
        groupDefaultExpanded={-1}
        request={async () => {
          const data = await PartCategoryGetTreeAsync();
          const flatData = flattenTreeDeep(data || []);
          return {
            success: true,
            data: flatData,
            total: flatData.length
          } as any;
        }}
        rowSelection={'single'}
        columnDefs={columnDefs}
        toolBarRender={() => [
          <Access key="create" accessible={canCreate}>
            <PartCategoryFormDialog
              title={'新建'}
              onAfterSubmit={onRefresh}
              buttonProps={{ icon: <PlusOutlined /> }}
            >
              新建
            </PartCategoryFormDialog>
          </Access>,
          <Access key="import" accessible={canCreate}>
            <Import onAfterSubmit={onRefresh} />
          </Access>,
        ]}
      />

      {/* 分类属性侧滑抽屉 */}
      <Drawer
        title={`分类属性 - ${selectedCategory?.categoryName || ''}`}
        placement="right"
        width={800}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        destroyOnClose
      >
        <div style={{ height: 'calc(100vh - 120px)' }}>
          <AgGridPlus
            gridRef={attrGridRef}
            headerTitle={false}
            gridKey="appPdm.PartManagement.PartCategory.Attributes"
            request={async () => {
              if (!selectedCategory?.id) {
                return { success: true, data: [], total: 0 } as any;
              }
              const list = await PartCategoryAttributeGetByCategoryIdAsync({ categoryId: selectedCategory.id });
              return { success: true, data: list || [], total: list?.length || 0 } as any;
            }}
            rowSelection={'single'}
            columnDefs={attrColumnDefs}
            toolBarRender={() => [
              <Access key="create-attr" accessible={canCreateAttr}>
                <CategoryAttributeFormDialog
                  title={'新增属性'}
                  categoryId={selectedCategory?.id}
                  categoryName={selectedCategory?.categoryName}
                  onAfterSubmit={onAttrRefresh}
                  buttonProps={{ type: 'primary', icon: <PlusOutlined /> }}
                >
                  新建
                </CategoryAttributeFormDialog>
              </Access>,
            ]}
          />
        </div>
      </Drawer>
    </>
  );
};

export default PdmPartCategoryPage;

export const routeProps = {
  name: '物料分类管理',
};
