import React, { useRef, useMemo } from 'react';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { Access, useAccess, useIntl } from 'umi';
import { Button, message, Space } from 'antd';
import { AgGridPlus } from '@/components/agGrid';
import { ICellRendererParams } from 'ag-grid-community';
import { PlusOutlined, DeleteOutlined, EditOutlined, EyeOutlined, CheckOutlined } from '@ant-design/icons';
import {
  PdmPartNumberRuleDefinitionGetListAsync,
  PdmPartNumberRuleDefinitionDeleteAsync,
  PdmPartNumberRuleDefinitionSetDefaultAsync,
} from '@/services/pdm/PdmPartNumberRuleDefinition';
import PartNumberRuleFormDialog from './components/formDialog';
import DeleteConfirm from '@/components/deleteConfirm';

/**
 * 物料料号规则管理
 */
const PartNumberRulesPage: React.FC = () => {
  const intl = useIntl();
  const gridRef = useRef<GridRef>();
  const access = useAccess();

  const onRefresh = () => {
    gridRef.current?.onRefresh();
  };

  // 操作列渲染
  const Options = (props: ICellRendererParams & { onRefresh: () => void }) => {
    const { data, onRefresh } = props;
    const intl = useIntl();

    const handleDelete = async () => {
      const hide = message.loading('正在删除...', 0);
      try {
        await PdmPartNumberRuleDefinitionDeleteAsync({ id: data.id });
        message.success('删除成功');
        onRefresh();
      } catch (error) {
        message.error('删除失败');
      } finally {
        hide();
      }
    };

    const handleSetDefault = async () => {
      const hide = message.loading('正在设置默认规则...', 0);
      try {
        await PdmPartNumberRuleDefinitionSetDefaultAsync({ id: data.id });
        message.success('设置成功');
        onRefresh();
      } catch (error) {
        message.error('设置失败');
      } finally {
        hide();
      }
    };

    return (
      <Space>
        <Access accessible={!!true}>
          <PartNumberRuleFormDialog
            title="查看"
            entityId={`${data.id}-view`}
            data={data}
            onAfterSubmit={onRefresh}
            isView={true}
            buttonProps={{ icon: <EyeOutlined />, type: 'link', size: 'small', title: '查看' }}
          />
        </Access>
        <Access accessible={!!true}>
          <PartNumberRuleFormDialog
            title="编辑"
            entityId={`${data.id}-edit`}
            operationType="edit"
            data={data}
            onAfterSubmit={onRefresh}
            buttonProps={{ icon: <EditOutlined />, type: 'link', size: 'small', title: intl.formatMessage({ id: 'AbpUi:Edit' }) }}
          />
        </Access>
        <Access accessible={!!true}>
          {!data.isDefault && (
            <DeleteConfirm title="确定设置为默认规则？" onConfirm={handleSetDefault}>
              <Button size="small" icon={<CheckOutlined />} type="link" title="设为默认" />
            </DeleteConfirm>
          )}
        </Access>
        <Access accessible={!!true}>
          <DeleteConfirm title="确定删除?" onConfirm={handleDelete}>
            <Button
              size="small"
              icon={<DeleteOutlined />}
              type="link"
              title={intl.formatMessage({ id: 'AbpUi:Delete' })}
            />
          </DeleteConfirm>
        </Access>
      </Space>
    );
  };

  // 布尔值渲染器
  const boolRenderer = useMemo(() => (params: any) => (params.value ? '是' : '否'), []);

  // 列定义
  const columnDefs: any = useMemo(
    () => [
      {
        headerName: '名称',
        field: 'name',
        width: 200,
      },
      {
        headerName: '显示名称',
        field: 'displayName',
        width: 200,
      },
      {
        headerName: '规则描述',
        field: 'ruleDescription',
        width: 300,
        hideInSearch: true,
      },
      {
        headerName: '起始编号',
        field: 'numberStart',
        width: 100,
        hideInSearch: true,
      },
      {
        headerName: '编号增量',
        field: 'numberIncrement',
        width: 100,
        hideInSearch: true,
      },
      {
        headerName: '编号进制',
        field: 'numberBinary',
        width: 100,
        hideInSearch: true,
      },
      {
        headerName: '激活',
        field: 'active',
        width: 80,
        type: 'bool',
        cellRenderer: boolRenderer,
      },
      {
        headerName: '默认',
        field: 'isDefault',
        width: 80,
        type: 'bool',
        cellRenderer: boolRenderer,
        hideInSearch: true,
      },
      {
        headerName: intl.formatMessage({ id: 'AbpUi:Actions' }),
        field: 'action',
        width: 200,
        pinned: 'right',
        hideInSearch: true,
        cellRenderer: Options,
        cellRendererParams: { onRefresh },
      },
    ],
    [intl, onRefresh, boolRenderer]
  );

  return (
    <AgGridPlus
      gridRef={gridRef}
      headerTitle="物料料号规则"
      gridKey="appPdm.PartManagement.PartNumberRules"
      request={async (params?: { pageSize: number; current: number; [key: string]: any }) => {
        const data = await PdmPartNumberRuleDefinitionGetListAsync({
          Keyword: params?.filter,
          Active: params?.filter?.active,
          SkipCount: params?.skipCount,
          MaxResultCount: params?.maxResultCount,
          Sorting: params?.sorter,
        } as any);
        return { success: true, data: data.items || [], total: data.totalCount || 0 } as any;
      }}
      rowSelection="multiple"
      rowMultiSelectWithClick={true}
      toolBarRender={() => [
        <Access key="create" accessible={!!true}>
          <PartNumberRuleFormDialog
            title="新建"
            entityId="new-part-number-rule"
            operationType="add"
            onAfterSubmit={onRefresh}
            buttonProps={{
              icon: <PlusOutlined />,
              type: 'primary',
              children: '新建',
            }}
          />
        </Access>,
      ]}
      columnDefs={columnDefs}
    />
  );
};

export default PartNumberRulesPage;

export const routeProps = {
  name: '物料料号规则',
};
