import { AgGridPlus } from '@/components/agGrid';
import DeleteConfirm from '@/components/deleteConfirm';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { DeleteOutlined, EditOutlined, PlusOutlined, EyeOutlined, StarOutlined } from '@ant-design/icons';
import { Button, Space, message, Tag, Popconfirm } from 'antd';
import { ICellRendererParams } from 'ag-grid-community';
import dayjs from 'dayjs';
import React, { useRef, useMemo } from 'react';
import { Access, useAccess, useIntl, history } from 'umi';
import {
  CalendarDefinitionDeleteAsync,
  CalendarDefinitionGetListAsync,
  CalendarDefinitionSetAsDefaultAsync,
} from '@/services/openApi/CalendarDefinition';
import CalendarDefinitionFormDialog from './components/formDialog';

const Options = (props: ICellRendererParams & { onRefresh: () => void }) => {
  const { data, onRefresh } = props;
  const intl = useIntl();
  const access = useAccess();

  const handleDelete = (id: string) => {
    const hide = message.loading('正在删除,请稍后', 0);
    CalendarDefinitionDeleteAsync({ id })
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

  const handleSetDefault = (id: string) => {
    const hide = message.loading('正在设置默认日历,请稍后', 0);
    CalendarDefinitionSetAsDefaultAsync({ id })
      .then(() => {
        message.success('设置默认日历成功');
        onRefresh();
      })
      .catch(() => {
        message.error('设置默认日历失败');
      })
      .finally(() => {
        hide();
      });
  };

  const handleViewDetail = (id: string) => {
    history.push(`/appSYS/calendar/calendarDefinition/detail?id=${id}`);
  };

  return (
    <Space>
      <Access accessible={true}>
        <Button
          size="small"
          icon={<EyeOutlined />}
          type="link"
          onClick={() => handleViewDetail(data.id)}
          title="查看日历"
        >
          查看
        </Button>
      </Access>

      <Access accessible={true}>
        <CalendarDefinitionFormDialog
          title="编辑"
          entityId={data.id}
          onAfterSubmit={onRefresh}
          buttonProps={{
            icon: <EditOutlined />,
            type: 'link',
            size: 'small',
            title: '编辑日历定义',
          }}
        />
      </Access>

      {!data.isDefault && (
        <Access accessible={true}>
          <Popconfirm
            title="确定将此日历设为默认?"
            onConfirm={() => handleSetDefault(data.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button
              size="small"
              icon={<StarOutlined />}
              type="link"
              title="设为默认日历"
            />
          </Popconfirm>
        </Access>
      )}

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

const CalendarDefinitionPage = () => {
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
        cellRenderer: ({ value, data }: any) => (
          <Button
            type="link"
            size="small"
            onClick={() => history.push(`/appSYS/calendar/calendarDefinition/detail?id=${data.id}`)}
            style={{ padding: 0 }}
          >
            {value}
          </Button>
        ),
      },
      {
        headerName: '描述',
        field: 'description',
        flex: 1,
        width: 200,
        cellRenderer: ({ value }: any) => value || '-',
      },
      {
        headerName: '是否默认',
        field: 'isDefault',
        width: 100,
        hideInSearch: true,
        cellRenderer: ({ value }: any) =>
          value ? <Tag color="green">是</Tag> : <Tag>否</Tag>,
      },
      {
        headerName: '假期集',
        field: 'holidaySetId',
        width: 120,
        hideInSearch: true,
        cellRenderer: ({ value }: any) => (value ? '已设置' : '-'),
      },
      {
        headerName: '工作日配置',
        field: 'workdayConfigures',
        width: 150,
        hideInSearch: true,
        cellRenderer: ({ value }: any) =>
          value && value.length > 0 ? `${value.length}个配置` : '-',
      },
      {
        headerName: intl.formatMessage({ id: 'AbpUi:Actions' }),
        field: 'action',
        width: 200,
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
      gridKey="sys-calendar-definition-list"
      request={async (params?: {
        maxResultCount: number;
        skipCount: number;
        [key: string]: any;
      }) => {
        const data = await CalendarDefinitionGetListAsync({
          MaxResultCount: params!.maxResultCount,
          SkipCount: params!.skipCount,
          Sorting: params!.sorter,
        });
        return { success: true, data: data.items || [], total: data.totalCount || 0 };
      }}
      toolBarRender={() => {
        return [
          <Access accessible={true} key="create">
            <CalendarDefinitionFormDialog
              title="新建"
              buttonProps={{
                icon: <PlusOutlined />,
                type: 'primary',
              }}
              onAfterSubmit={onRefresh}
            >
              新建日历定义
            </CalendarDefinitionFormDialog>
          </Access>,
        ];
      }}
      headerTitle="日历定义列表"
      columnDefs={columnDefs}
    />
  );
};

export default CalendarDefinitionPage;
export const routeProps = {
  name: '日历定义',
};
