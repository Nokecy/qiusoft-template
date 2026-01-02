/**
 * 动态属性列表组件
 * 用于管理指定打印功能的动态属性
 */

import React, { useRef, useEffect } from 'react';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { Access, useAccess } from '@umijs/max';
import { Button, Space, message, Tag } from 'antd';
import { AgGridPlus } from '@/components/agGrid';
import { ICellRendererParams } from 'ag-grid-community';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import DeleteConfirm from '@/components/deleteConfirm';
import {
  DynamicPropertyDefinitionGetListByFeatureAsync,
  DynamicPropertyDefinitionCreateAsync,
  DynamicPropertyDefinitionUpdateAsync,
  DynamicPropertyDefinitionDeleteAsync,
  DynamicPropertyDefinitionGetAsync,
} from '@/services/openApi/DynamicPropertyDefinition';
import DynamicPropertyFormDialog from './formDialog';
import { LabelPrintFeatureDefinition as Permission } from '@/pages/appSYS/_permissions/labelManagement';

interface DynamicPropertyListProps {
  feature: string;
}

// 属性类型枚举及显示配置
const propertyTypeEnum = [
  { label: '字符串', value: 'string', color: '#108ee9' },
  { label: '整数', value: 'int', color: '#87d068' },
  { label: '小数', value: 'decimal', color: '#2db7f5' },
  { label: '布尔值', value: 'boolean', color: '#f50' },
  { label: '日期时间', value: 'dateTime', color: '#108ee9' },
  { label: '枚举', value: 'enum', color: '#722ed1' },
];

const DynamicPropertyList: React.FC<DynamicPropertyListProps> = ({ feature }) => {
  const gridRef = useRef<GridRef>();
  const access = useAccess();

  const onRefresh = () => {
    gridRef.current?.onRefresh();
  };

  // 刷新列表
  useEffect(() => {
    onRefresh();
  }, [feature]);

  const Options = (props: ICellRendererParams & { onRefresh: () => void }) => {
    const { data, onRefresh } = props;

    const refresh = () => {
      onRefresh();
    };

    const handleDelete = (id: string) => {
      const hide = message.loading('正在删除，请稍后', 0);
      return DynamicPropertyDefinitionDeleteAsync({ id })
        .then(() => {
          message.success('删除成功');
          refresh();
        })
        .catch((error) => {
          message.error('删除失败');
          console.error('删除失败:', error);
        })
        .finally(() => {
          hide();
        });
    };

    return (
      <Space>
        <Access accessible={!!access[Permission.Update]}>
          <DynamicPropertyFormDialog
            feature={feature}
            getRequest={DynamicPropertyDefinitionGetAsync}
            updateRequest={DynamicPropertyDefinitionUpdateAsync}
            title="编辑动态属性"
            entityId={data.id}
            mode="edit"
            onAfterSubmit={refresh}
            buttonProps={{
              icon: <EditOutlined />,
              type: 'link',
              size: 'small',
            }}
          />
        </Access>

        <Access accessible={!!access[Permission.Delete]}>
          <DeleteConfirm title="确定删除此动态属性?" onConfirm={() => handleDelete(data.id)}>
            <Button size="small" icon={<DeleteOutlined />} type="link" danger />
          </DeleteConfirm>
        </Access>
      </Space>
    );
  };

  const columnDefs: any = [
    {
      headerName: '属性名称',
      field: 'propertyName',
      width: 150,
    },
    {
      headerName: '显示名称',
      field: 'displayName',
      width: 150,
    },
    {
      headerName: '属性类型',
      field: 'propertyType',
      width: 120,
      hideInSearch: true,
      valueEnum: propertyTypeEnum,
    },
    {
      headerName: '必填',
      field: 'required',
      width: 80,
      hideInSearch: true,
      cellRenderer: (params: ICellRendererParams) => {
        return params.value ? <Tag color="red">是</Tag> : <Tag>否</Tag>;
      },
    },
    {
      headerName: '默认值',
      field: 'defaultValue',
      width: 120,
      hideInSearch: true,
      cellRenderer: (params: ICellRendererParams) => {
        if (params.value === null || params.value === undefined) return '-';
        if (typeof params.value === 'object') return JSON.stringify(params.value);
        return String(params.value);
      },
    },
    {
      headerName: '说明',
      field: 'description',
      width: 200,
      flex: 1,
      hideInSearch: true,
    },
    {
      headerName: '操作',
      field: '',
      width: 160,
      pinned: 'right',
      filter: false,
      cellRenderer: (props: any) => <Options {...props} />,
      cellRendererParams: { onRefresh },
    },
  ];

  return (
    <AgGridPlus
      gridRef={gridRef}
      headerTitle={`功能编码: ${feature}`}
      gridKey={`label-management.dynamic-property.${feature}`}
      request={async (params: any) => {
        const data = await DynamicPropertyDefinitionGetListByFeatureAsync({ feature });

        // 前端过滤
        let items = data || [];
        if (params?.filter) {
          const filter = params.filter.toLowerCase();
          items = items.filter((item: any) =>
            item.propertyName?.toLowerCase().includes(filter) ||
            item.displayName?.toLowerCase().includes(filter)
          );
        }

        return {
          success: true,
          data: items,
          total: items.length,
        };
      }}
      toolBarRender={() => [
        <Access key="create" accessible={!!access[Permission.Create]}>
          <DynamicPropertyFormDialog
            feature={feature}
            createRequest={DynamicPropertyDefinitionCreateAsync}
            updateRequest={DynamicPropertyDefinitionUpdateAsync}
            title="新建动态属性"
            mode="create"
            onAfterSubmit={onRefresh}
            buttonProps={{
              icon: <PlusOutlined />,
              type: 'primary',
            }}
          >
            新建
          </DynamicPropertyFormDialog>
        </Access>,
      ]}
      columnDefs={columnDefs}
    />
  );
};

export default DynamicPropertyList;
