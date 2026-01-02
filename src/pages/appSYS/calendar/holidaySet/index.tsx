import { AgGridPlus } from '@/components/agGrid';
import DeleteConfirm from '@/components/deleteConfirm';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { DeleteOutlined, EditOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Space, message, Tag } from 'antd';
import { ICellRendererParams } from 'ag-grid-community';
import React, { useRef, useMemo } from 'react';
import { Access, useAccess, useIntl, history } from 'umi';
import {
  HolidaySetDeleteAsync,
  HolidaySetGetListAsync,
} from '@/services/openApi/HolidaySet';
import HolidaySetFormDialog from './components/formDialog';

const Options = (props: ICellRendererParams & { onRefresh: () => void }) => {
  const { data, onRefresh } = props;
  const intl = useIntl();
  const access = useAccess();

  const handleDelete = (id: string) => {
    const hide = message.loading('正在删除,请稍后', 0);
    HolidaySetDeleteAsync({ id })
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

  const handleView = (id: string) => {
    history.push(`/appSYS/calendar/holidaySet/detail?id=${id}`);
  };

  return (
    <Space>
      <Access accessible={true}>
        <Button
          size="small"
          icon={<EyeOutlined />}
          type="link"
          title="查看详情"
          onClick={() => handleView(data.id)}
        >
          查看
        </Button>
      </Access>

      <Access accessible={true}>
        <HolidaySetFormDialog
          title="编辑"
          entityId={data.id}
          onAfterSubmit={onRefresh}
          buttonProps={{
            icon: <EditOutlined />,
            type: 'link',
            size: 'small',
            title: '编辑假期集',
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

const HolidaySetPage = () => {
  const gridRef = useRef<GridRef>();
  const intl = useIntl();
  const access = useAccess();

  const onRefresh = () => {
    gridRef.current?.onRefresh();
  };

  const columnDefs: any = useMemo(
    () => [
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
        headerName: '国家/地区',
        field: 'countryOrRegion',
        width: 150,
        cellRenderer: ({ value }: any) => value || '-',
      },
      {
        headerName: '是否启用',
        field: 'isActive',
        width: 100,
        hideInSearch: true,
        cellRenderer: ({ value }: any) =>
          value ? <Tag color="green">启用</Tag> : <Tag color="red">禁用</Tag>,
      },
      {
        headerName: '假期数量',
        field: 'items',
        width: 120,
        hideInSearch: true,
        cellRenderer: ({ value }: any) =>
          value && value.length > 0 ? `${value.length}个假期` : '-',
      },
      {
        headerName: intl.formatMessage({ id: 'AbpUi:Actions' }),
        field: 'action',
        width: 180,
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
      gridKey="sys-holiday-set-list"
      request={async () => {
        const data = await HolidaySetGetListAsync({});
        return { success: true, data: data || [], total: data?.length || 0 };
      }}
      toolBarRender={() => {
        return [
          <Access accessible={true} key="create">
            <HolidaySetFormDialog
              title="新建"
              buttonProps={{
                icon: <PlusOutlined />,
                type: 'primary',
              }}
              onAfterSubmit={onRefresh}
            >
              新建假期集
            </HolidaySetFormDialog>
          </Access>,
        ];
      }}
      headerTitle="假期集列表"
      columnDefs={columnDefs}
    />
  );
};

export default HolidaySetPage;
export const routeProps = {
  name: '假期集',
};
