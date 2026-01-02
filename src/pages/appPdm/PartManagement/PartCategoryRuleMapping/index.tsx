import React, { useRef, useMemo } from 'react';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { Access, useAccess, useIntl } from 'umi';
import { Button, message, Space } from 'antd';
import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { ICellRendererParams } from 'ag-grid-community';
import { PlusOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import {
  PartCategoryRuleMappingGetListAsync,
  PartCategoryRuleMappingDeleteAsync,
} from '@/services/pdm/PartCategoryRuleMapping';
import PartCategoryRuleMappingFormDialog from './components/formDialog';
import DeleteConfirm from '@/components/deleteConfirm';

/**
 * 物料分类规则映射管理
 */
const PartCategoryRuleMappingPage: React.FC = () => {
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
        await PartCategoryRuleMappingDeleteAsync({ id: data.id });
        message.success('删除成功');
        onRefresh();
      } catch (error) {
        message.error('删除失败');
      } finally {
        hide();
      }
    };

    return (
      <Space>
        <Access accessible={!!true}>
          <PartCategoryRuleMappingFormDialog
            title="查看"
            entityId={`${data.id}-view`}
            data={data}
            onAfterSubmit={onRefresh}
            isView={true}
            buttonProps={{ icon: <EyeOutlined />, type: 'link', size: 'small', title: '查看' }}
          />
        </Access>
        <Access accessible={!!true}>
          <PartCategoryRuleMappingFormDialog
            title="编辑"
            entityId={`${data.id}-edit`}
            operationType="edit"
            data={data}
            onAfterSubmit={onRefresh}
            buttonProps={{ icon: <EditOutlined />, type: 'link', size: 'small', title: intl.formatMessage({ id: 'AbpUi:Edit' }) }}
          />
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

  return (
    <AgGridPlus
      gridRef={gridRef}
      headerTitle="物料分类规则映射"
      gridKey="appPdm.PartManagement.PartCategoryRuleMapping"
      request={async (params?: { pageSize: number; current: number; [key: string]: any }) => {
        const data = await PartCategoryRuleMappingGetListAsync({
          Filter: params?.filter,
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
          <PartCategoryRuleMappingFormDialog
            title="新建"
            entityId="new-part-category-rule-mapping"
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
    >
      <AgGridColumn field="categoryCode" headerName="物料分类编码" width={180} />
      <AgGridColumn field="categoryName" headerName="物料分类名称" width={200} />
      <AgGridColumn field="ruleName" headerName="规则名称" width={180} />
      <AgGridColumn field="ruleDisplayName" headerName="规则显示名称" width={200} hideInSearch={true} />
      <AgGridColumn field="priority" headerName="优先级" width={100} hideInSearch={true} />
      <AgGridColumn
        field="action"
        headerName={intl.formatMessage({ id: 'AbpUi:Actions' })}
        width={180}
        pinned="right"
        filter={false}
        sortable={false}
        cellRenderer={Options}
        cellRendererParams={{ onRefresh }}
      />
    </AgGridPlus>
  );
};

export default PartCategoryRuleMappingPage;

export const routeProps = {
  name: '物料分类规则映射',
};
