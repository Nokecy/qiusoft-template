import { AgGridPlus } from '@/components/agGrid';
import DeleteConfirm from '@/components/deleteConfirm';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Space, message, Tag } from 'antd';
import { ICellRendererParams } from 'ag-grid-community';
import dayjs from 'dayjs';
import React, { useRef, useMemo } from 'react';
import { Access, useAccess, useIntl } from 'umi';
import {
  WorkdayConfigureDeleteAsync,
  WorkdayConfigureGetListAsync,
} from '@/services/openApi/WorkdayConfigure';
import WorkdayConfigureFormDialog from './components/formDialog';

const Options = (props: ICellRendererParams & { onRefresh: () => void }) => {
  const { data, onRefresh } = props;
  const intl = useIntl();
  const access = useAccess();

  const handleDelete = (id: string) => {
    const hide = message.loading('正在删除,请稍后', 0);
    WorkdayConfigureDeleteAsync({ id })
      .then(() => {
        message.success('删除成功');
        onRefresh();
      })
      .catch(() => {
        message.error('删除失败');
      })
      .finally(() => {
        hide();
      });
  };

  return (
    <Space>
      <Access accessible={true}>
        <WorkdayConfigureFormDialog
          title="编辑"
          entityId={data.id}
          onAfterSubmit={onRefresh}
          buttonProps={{
            icon: <EditOutlined />,
            type: 'link',
            size: 'small',
            title: '编辑工作日配置',
          }}
        />
      </Access>

      <Access accessible={true}>
        <DeleteConfirm title="确定删除?" onConfirm={() => handleDelete(data.id)}>
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

const WorkdayConfigurePage = () => {
  const gridRef = useRef<GridRef>();
  const intl = useIntl();
  const access = useAccess();

  const onRefresh = () => {
    gridRef.current?.onRefresh();
  };

  const columnDefs: any = useMemo(
    () => [
      {
        headerName: '编码',
        field: 'code',
        width: 150,
      },
      {
        headerName: '名称',
        field: 'name',
        width: 200,
      },
      {
        headerName: '描述',
        field: 'description',
        flex: 1,
        width: 200,
        cellRenderer: ({ value }: any) => value || '-',
      },
      {
        headerName: '是否激活',
        field: 'isActive',
        width: 100,
        hideInSearch: true,
        cellRenderer: ({ value }: any) =>
          value ? <Tag color="green">激活</Tag> : <Tag color="red">未激活</Tag>,
      },
      {
        headerName: '创建时间',
        field: 'creationTime',
        width: 160,
        initialSort: 'desc',
        hideInSearch: true,
        cellRenderer: ({ value }: any) =>
          value ? dayjs(value).format('YYYY-MM-DD HH:mm') : '',
      },
      {
        headerName: intl.formatMessage({ id: 'AbpUi:Actions' }),
        field: 'action',
        width: 120,
        pinned: 'right',
        cellRenderer: (props: any) => <Options {...props} />,
        cellRendererParams: { onRefresh },
      },
    ],
    [intl, onRefresh],
  );

  return (
    <AgGridPlus
      gridRef={gridRef}
      gridKey="sys-workday-configure-list"
      request={async (params?: {
        maxResultCount: number;
        skipCount: number;
        [key: string]: any;
      }) => {
        const data = await WorkdayConfigureGetListAsync({
          MaxResultCount: params!.maxResultCount,
          SkipCount: params!.skipCount,
          Sorting: params!.sorter,
          Filter: params?.filter,
        });
        return { success: true, data: data.items || [], total: data.totalCount || 0 };
      }}
      toolBarRender={() => {
        return [
          <Access accessible={true} key="create">
            <WorkdayConfigureFormDialog
              title="新建"
              buttonProps={{
                icon: <PlusOutlined />,
                type: 'primary',
              }}
              onAfterSubmit={onRefresh}
            >
              新建工作日配置
            </WorkdayConfigureFormDialog>
          </Access>,
        ];
      }}
      headerTitle="工作日配置列表"
      columnDefs={columnDefs}
    />
  );
};

export default WorkdayConfigurePage;
export const routeProps = {
  name: '工作日配置',
};
