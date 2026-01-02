/**
 * 标签管理 - 标签打印模板列表页面
 */

import React, { useRef } from 'react';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { Access, useAccess, useIntl, history } from '@umijs/max';
import { Button, Space, message } from 'antd';
import { AgGridPlus } from '@/components/agGrid';
import { ICellRendererParams } from 'ag-grid-community';
import LabelPrintTemplateFormDialog from './components/formDialog';
import DeleteConfirm from '@/components/deleteConfirm';
import { DeleteOutlined, EditOutlined, FormatPainterOutlined, DownloadOutlined } from '@ant-design/icons';
import {
  LabelPrintTemplateGetListAsync,
  LabelPrintTemplateCreateAsync,
  LabelPrintTemplateUpdateAsync,
  LabelPrintTemplateDeleteAsync,
  LabelPrintTemplateGetAsync,
} from '@/services/openApi/LabelPrintTemplate';
import { LabelPrintTemplate as LabelPrintTemplatePermission } from '../../_permissions/labelManagement';
import ImportPublic from '@/components/importPublic';

export const routeProps = {
  name: '标签打印模板',
};

// 模板类型枚举
const templateTypeEnum = [
  { label: 'Report', value: 5, color: 'blue' },
  { label: 'ZPL', value: 10, color: 'green' },
  { label: 'EPL', value: 15, color: 'orange' },
  { label: 'CPCL', value: 20, color: 'purple' },
  { label: 'TSPL', value: 25, color: 'red' },
];

const LabelPrintTemplatePage = () => {
  const intl = useIntl();
  const gridRef = useRef<GridRef>();
  const access = useAccess();

  const onRefresh = () => {
    gridRef.current?.onRefresh();
  };

  const Options = (props: ICellRendererParams & { onRefresh: () => void }) => {
    const { data, onRefresh } = props;

    const refresh = () => {
      onRefresh();
    };

    const handleDelete = (id: any) => {
      const hide = message.loading('正在删除，请稍后', 0);
      return LabelPrintTemplateDeleteAsync({ id })
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
        <Access accessible={!!access[LabelPrintTemplatePermission.Update]}>
          <LabelPrintTemplateFormDialog
            getRequest={LabelPrintTemplateGetAsync}
            createRequest={LabelPrintTemplateCreateAsync}
            updateRequest={LabelPrintTemplateUpdateAsync}
            title="编辑标签打印模板"
            entityId={data.id}
            onAfterSubmit={refresh}
            buttonProps={{
              icon: <EditOutlined />,
              type: 'link',
              size: 'small',
            }}
          />
        </Access>

        <Access accessible={!!access[LabelPrintTemplatePermission.Update]}>
          <Button
            type="link"
            size="small"
            icon={<FormatPainterOutlined />}
            onClick={() => {
              if (data.templateType !== 5) {
                // 构建URL参数，传递打印机语言和纸张尺寸
                const params = new URLSearchParams({
                  id: data.id,
                  name: data.name,
                  templateType: String(data.templateType || 10), // 默认ZPL
                });

                // 如果有纸张尺寸参数，添加到URL
                if (data.width) {
                  params.append('width', String(data.width));
                }
                if (data.height) {
                  params.append('height', String(data.height));
                }

                history.push(`/appSYS/labelManagement/labelPrintTemplate/designer?${params.toString()}`);
              } else {
                history.push('/appSYS/printTemplate/edit?id=' + data.id);
              }
            }}
          />
        </Access>

        <Access accessible={!!access[LabelPrintTemplatePermission.Delete]}>
          <DeleteConfirm title="确定删除此标签打印模板?" onConfirm={() => handleDelete(data.id)}>
            <Button size="small" icon={<DeleteOutlined />} type="link" danger />
          </DeleteConfirm>
        </Access>

        {data.templateType === 5 && (
          <>
            <Button
              type="link"
              size="small"
              icon={<DownloadOutlined />}
              onClick={() => {
                window.open(`${window?.serverUrl?.apiServerUrl}/api/PrintTemplateManagement/printTemplateInfo/${data.id}/export`);
              }}
              title="导出"
            />

            <ImportPublic
              onAfterSubmit={onRefresh}
              method="PUT"
              type="link"
              children=" "
              title="模板"
              downUrl=""
              uploadUrl={`/api/PrintTemplateManagement/printTemplateInfo/${data.id}/import`}
            />
          </>
        )}
      </Space>
    );
  };

  const columnDefs: any = [
    { headerName: '编码', field: 'code', width: 150 },
    { headerName: '名称', field: 'name', width: 150 },
    { headerName: '宽度', field: 'width', width: 100, hideInSearch: true },
    { headerName: '高度', field: 'height', width: 100, hideInSearch: true },
    { headerName: '模板类型', field: 'templateType', width: 120, valueEnum: templateTypeEnum },
    { headerName: '模板内容', field: 'content', width: 200, flex: 1 },
    {
      headerName: '创建时间',
      field: 'creationTime',
      width: 180,
      type: 'dateTimeColumn',
      hideInSearch: true,
      initialSort: 'desc',
    },
    {
      headerName: '最后修改时间',
      field: 'lastModificationTime',
      width: 180,
      type: 'dateTimeColumn',
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
      headerTitle="标签打印模板列表"
      gridKey="label-management.label-print-template"
      request={async (params: any) => {
        const data = await LabelPrintTemplateGetListAsync({
          PageSize: params!.maxResultCount,
          Filter: params?.filter,
          MaxResultCount: params!.maxResultCount,
          SkipCount: params!.skipCount,
          Sorting: params!.sorter!,
        });
        return {
          success: true,
          data: data.items!,
          total: data.totalCount,
        };
      }}
      toolBarRender={() => [
        <Access key="create" accessible={!!access[LabelPrintTemplatePermission.Create]}>
          <LabelPrintTemplateFormDialog
            createRequest={LabelPrintTemplateCreateAsync}
            updateRequest={LabelPrintTemplateUpdateAsync}
            title="新建标签打印模板"
            onAfterSubmit={onRefresh}
          >
            新建
          </LabelPrintTemplateFormDialog>
        </Access>,
      ]}
      columnDefs={columnDefs}
    />
  );
};

export default LabelPrintTemplatePage;
