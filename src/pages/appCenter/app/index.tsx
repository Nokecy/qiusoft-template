/**
 * 应用数据页
 * 展示统计卡片和数据列表，支持 CRUD 操作
 */
import { AgGridPlus } from '@/components/agGrid';
import DeleteConfirm from '@/components/deleteConfirm';
import {
  DynamicDataGetListAsync,
  DynamicDataDeleteAsync,
  DynamicDataBatchDeleteAsync,
} from '@/services/openApi/DynamicData';
import {
  DynamicApplicationGetListAsync,
  DynamicApplicationGetAsync,
} from '@/services/openApi/DynamicApplication';
import { WorkflowStatusTextRender } from '@/pages/appWorkflow/_utils/workflowStatusRender';
import { DynamicDataWorkflowSubmitAsync } from '@/services/openApi/DynamicDataWorkflow';
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  ReloadOutlined,
  SendOutlined,
} from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space, Tag, Card, Empty, Spin, Popconfirm } from 'antd';
import React, { useRef, useMemo, useEffect, useState, useCallback } from 'react';
import { Access, useAccess, useIntl, history } from 'umi';
import { useKeepAliveParams } from '@/hooks';
import dayjs from 'dayjs';
import StatisticCards from '../_components/StatisticCards';
import DataFormDialog from '../_components/DataFormDialog';
// TODO: DynamicDataImportExportDialog 组件尚未实现，暂时注释
// import { ImportDialog, ExportDialog } from '@/pages/appSYS/_components/DynamicDataImportExportDialog';
import useAppStatistics from '../_hooks/useAppStatistics';
import type { AppInfo, EntityInfo, DynamicDataItem } from '../_types';
import { fieldDataTypeConfig } from '../_types';

// 操作列渲染
const Options = (
  props: ICellRendererParams & {
    onRefresh: () => void;
    applicationNameRef: React.MutableRefObject<string>;
    primaryEntityRef: React.MutableRefObject<EntityInfo | null>;
    appInfoRef: React.MutableRefObject<AppInfo | null>;
  }
) => {
  const { data, onRefresh, applicationNameRef, primaryEntityRef, appInfoRef } = props;
  const applicationName = applicationNameRef.current;
  const primaryEntity = primaryEntityRef.current;
  const appInfo = appInfoRef.current;
  const intl = useIntl();
  const access = useAccess();
  const canUpdate = !!(access && (access['DynamicSchema.DynamicData.Update'] ?? true));
  const canDelete = !!(access && (access['DynamicSchema.DynamicData.Delete'] ?? true));

  // 工作流状态判断
  const workflowStatus = data.workflowStatus;
  const isWorkflowEnabled = appInfo?.workflowEnabled;

  // 草稿状态（未提交）：可编辑、可删除、可提交
  const isDraft = workflowStatus === undefined || workflowStatus === null || workflowStatus === 0;
  // 已拒绝：可编辑、可删除、可重新提交
  const isRejected = workflowStatus === 5;

  // 是否可以编辑（未启用工作流，或草稿/已拒绝状态）
  const canEdit = !isWorkflowEnabled || isDraft || isRejected;
  // 是否可以删除（未启用工作流，或草稿/已拒绝状态）
  const canDeleteRow = !isWorkflowEnabled || isDraft || isRejected;
  // 是否可以提交（启用工作流且为草稿或已拒绝状态）
  const canSubmit = isWorkflowEnabled && (isDraft || isRejected);

  // 删除数据
  const handleDelete = async () => {
    const hide = message.loading('正在删除...', 0);
    try {
      await DynamicDataDeleteAsync({ id: data.id, applicationName });
      message.success('删除成功');
      onRefresh();
    } catch (error) {
      message.error('删除失败');
    } finally {
      hide();
    }
  };

  // 提交工作流
  const handleSubmit = async () => {
    if (!appInfo?.id) {
      message.error('应用信息不存在');
      return;
    }
    const hide = message.loading('正在提交...', 0);
    try {
      await DynamicDataWorkflowSubmitAsync({
        applicationId: appInfo.id,
        dataRowId: data.id,
      });
      message.success('提交成功');
      onRefresh();
    } catch (error) {
      message.error('提交失败');
    } finally {
      hide();
    }
  };

  // 查看详情
  const handleView = () => {
    history.push(`/appCenter/app/detail?name=${applicationName}&id=${data.id}`);
  };

  return (
    <Space>
      {canSubmit && (
        <Popconfirm
          title="提交确认"
          description="确定要提交此数据吗？提交后将进入审批流程。"
          onConfirm={handleSubmit}
          okText="确定"
          cancelText="取消"
        >
          <Button
            size="small"
            icon={<SendOutlined />}
            type="link"
            title="提交"
          />
        </Popconfirm>
      )}
      <Button
        size="small"
        icon={<EyeOutlined />}
        type="link"
        title="查看"
        onClick={handleView}
      />
      {canEdit && (
        <Access accessible={canUpdate}>
          <DataFormDialog
            title="编辑数据"
            entityId={data.id}
            applicationName={applicationName}
            primaryEntity={primaryEntity}
            onAfterSubmit={onRefresh}
            buttonProps={{ size: 'small', icon: <EditOutlined />, type: 'link', title: '编辑' }}
          />
        </Access>
      )}
      {canDeleteRow && (
        <Access accessible={canDelete}>
          <DeleteConfirm title="确定删除该数据?" onConfirm={handleDelete}>
            <Button
              size="small"
              icon={<DeleteOutlined />}
              type="link"
              danger
              title={intl.formatMessage({ id: 'AbpUi:Delete' })}
            />
          </DeleteConfirm>
        </Access>
      )}
    </Space>
  );
};

// 当前页面的路由路径
const CURRENT_PAGE_PATH = '/appCenter/app';

const AppDataPage: React.FC = () => {
  const gridRef = useRef<GridRef>();
  const intl = useIntl();
  const access = useAccess();
  const canCreate = !!(access && (access['DynamicSchema.DynamicData.Create'] ?? true));
  const canBatchDelete = !!(access && (access['DynamicSchema.DynamicData.Delete'] ?? true));

  // 使用 Hook 获取路由参数
  const { params, isActive } = useKeepAliveParams(CURRENT_PAGE_PATH, ['name']);
  const applicationName = params.name || '';

  // 使用 ref 存储最新的 applicationName，避免闭包问题
  const applicationNameRef = useRef<string>(applicationName);
  if (isActive && applicationName) {
    applicationNameRef.current = applicationName;
  }

  // 状态
  const [loading, setLoading] = useState(true);
  const [appInfo, setAppInfo] = useState<AppInfo | null>(null);
  const [primaryEntity, setPrimaryEntity] = useState<EntityInfo | null>(null);
  const [dataList, setDataList] = useState<DynamicDataItem[]>([]);
  const [serverTotal, setServerTotal] = useState(0);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  // 使用 ref 存储 primaryEntity
  const primaryEntityRef = useRef<EntityInfo | null>(null);
  if (primaryEntity) {
    primaryEntityRef.current = primaryEntity;
  }

  // 使用 ref 存储 appInfo
  const appInfoRef = useRef<AppInfo | null>(null);
  if (appInfo) {
    appInfoRef.current = appInfo;
  }

  // 计算统计数据
  const statistics = useAppStatistics({ dataList, serverTotal });

  // 记录上一次的applicationName，用于检测变化
  const prevApplicationNameRef = useRef<string | null>(null);

  // 加载应用信息
  useEffect(() => {
    if (!isActive) return;

    if (applicationName !== prevApplicationNameRef.current) {
      prevApplicationNameRef.current = applicationName;

      if (!applicationName) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setAppInfo(null);
      setPrimaryEntity(null);
      setDataList([]);

      // 第一步：从列表中找到应用ID
      DynamicApplicationGetListAsync({ MaxResultCount: 1000 })
        .then((res) => {
          const appFromList = res.items?.find((item: any) => item.name === applicationName);

          if (!appFromList?.id) {
            message.error('应用不存在或已禁用');
            setLoading(false);
            return;
          }

          // 第二步：根据ID获取应用完整详情
          return DynamicApplicationGetAsync({ id: appFromList.id })
            .then((appDetail) => {
              setAppInfo(appDetail);
              // 找到主实体 (role = 0 表示 Primary)
              const primary = appDetail.entities?.find((e: any) => e.role === 0);
              setPrimaryEntity(primary);
              // 刷新表格数据
              gridRef.current?.onRefresh();
            })
            .catch(() => {
              message.error('加载应用详情失败');
            });
        })
        .catch(() => {
          message.error('加载应用列表失败');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [applicationName, isActive]);

  const onRefresh = useCallback(() => gridRef.current?.onRefresh(), []);

  // 批量删除
  const handleBatchDelete = async () => {
    if (selectedRows.length === 0) {
      message.warning('请先选择要删除的数据');
      return;
    }

    const hide = message.loading(`正在删除 ${selectedRows.length} 条数据...`, 0);
    try {
      await DynamicDataBatchDeleteAsync(
        { applicationName },
        { ids: selectedRows.map((row: any) => row.id) }
      );
      message.success(`成功删除 ${selectedRows.length} 条数据`);
      setSelectedRows([]);
      onRefresh();
    } catch (error) {
      message.error('批量删除失败');
    } finally {
      hide();
    }
  };

  // 返回应用中心
  const handleGoBack = () => {
    history.push('/appCenter');
  };

  // 从实体字段构建列定义
  const columnDefs = useMemo(() => {
    const columns: any[] = [];

    if (primaryEntity?.fields && primaryEntity.fields.length > 0) {
      const sortedFields = [...primaryEntity.fields].sort(
        (a: any, b: any) => (a.displayOrder || 0) - (b.displayOrder || 0)
      );

      sortedFields.forEach((field: any) => {
        if (field.isVisible === false) return;

        const typeConfig = fieldDataTypeConfig[field.dataType] || { width: 150, hideInSearch: false };
        const colDef: any = {
          field: field.name,
          headerName: field.displayName || field.name,
          width: typeConfig.width,
          hideInSearch: typeConfig.hideInSearch,
          sortable: true,
        };

        // 根据数据类型设置渲染器和列类型
        if (field.dataType === 5) {
          // DateTime 类型：设置列类型为 dateTimeColumn，搜索自动使用日期选择器
          colDef.type = 'dateTimeColumn';
          colDef.cellRenderer = ({ value }: any) =>
            value ? dayjs(value).format('YYYY-MM-DD HH:mm') : '-';
        } else if (field.dataType === 4) {
          colDef.cellRenderer = ({ value }: any) => (
            <Tag color={value ? 'green' : 'default'}>{value ? '是' : '否'}</Tag>
          );
        } else if (field.dataType === 3 || field.dataType === 11 || field.dataType === 12) {
          colDef.cellRenderer = ({ value }: any) =>
            value !== undefined && value !== null ? Number(value).toLocaleString() : '-';
        }

        columns.push(colDef);
      });
    } else {
      // 默认列
      columns.push(
        {
          field: 'id',
          headerName: 'ID',
          width: 280,
          hideInSearch: true,
        },
        {
          field: 'creationTime',
          headerName: '创建时间',
          width: 160,
          type: 'dateTimeColumn',
          hideInSearch: true,
          initialSort: 'desc',
        }
      );
    }

    // 添加审计列
    const auditColumns = [
      {
        field: 'creationTime',
        headerName: '创建时间',
        width: 160,
        type: 'dateTimeColumn',
        hideInSearch: true,
        initialSort: 'desc',
      },
      {
        field: 'lastModificationTime',
        headerName: '修改时间',
        width: 160,
        type: 'dateTimeColumn',
        hideInSearch: true,
      },
    ];

    auditColumns.forEach((auditCol) => {
      if (!columns.find((c) => c.field === auditCol.field)) {
        columns.push(auditCol);
      }
    });

    // 添加工作流相关列（仅当启用工作流时）
    if (appInfo?.workflowEnabled) {
      const workflowColumns = [
        {
          field: 'workflowStatus',
          headerName: '流程状态',
          width: 100,
          hideInSearch: true,
          cellRenderer: (params: any) => <WorkflowStatusTextRender value={params.value} data={params.data} />,
        },
        {
          field: 'currentActivityName',
          headerName: '当前节点',
          width: 120,
          hideInSearch: true,
        },
        {
          field: 'currentAssigneeName',
          headerName: '当前审批人',
          width: 120,
          hideInSearch: true,
        },
        {
          field: 'creator',
          headerName: '创建人',
          width: 100,
          hideInSearch: true,
        },
      ];
      columns.push(...workflowColumns);
    }

    // 添加操作列
    columns.push({
      field: 'action',
      headerName: intl.formatMessage({ id: 'AbpUi:Actions' }),
      width: 120,
      pinned: 'right',
      filter: false,
      sortable: false,
      cellRenderer: Options,
      cellRendererParams: { onRefresh, applicationNameRef, primaryEntityRef, appInfoRef },
    });

    return columns;
  }, [primaryEntity, appInfo, intl, onRefresh]);

  // 没有应用名称参数
  if (!applicationName) {
    return (
      <Card>
        <Empty
          description="请从应用中心选择一个应用"
          style={{ padding: '60px 0' }}
        >
          <Button type="primary" onClick={handleGoBack}>
            返回应用中心
          </Button>
        </Empty>
      </Card>
    );
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <Spin size="large" tip="加载中..." />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* 顶部导航栏 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 16,
          gap: 12,
        }}
      >
        <Button icon={<ArrowLeftOutlined />} onClick={handleGoBack}>
          返回应用中心
        </Button>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>
          {appInfo?.displayName || applicationName}
        </h2>
      </div>

      {/* 统计卡片 */}
      <StatisticCards
        total={statistics.total}
        todayCount={statistics.todayCount}
        weekCount={statistics.weekCount}
        monthCount={statistics.monthCount}
      />

      {/* 数据表格 */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <AgGridPlus
          gridRef={gridRef}
          headerTitle="数据列表"
          gridKey={`appCenter.app.${applicationName}`}
          request={async (params?: any, _sort?: any, filter?: Record<string, any>) => {
            const currentApplicationName = applicationNameRef.current;
            if (!currentApplicationName) {
              return { success: true, data: [], total: 0 } as any;
            }
            try {
              // 构建 Filters 参数：转换为 ASP.NET Core 字典绑定格式 Filters[Key]=Value
              const filtersParams: Record<string, any> = {};
              if (filter) {
                Object.keys(filter).forEach((key) => {
                  const value = filter[key];
                  if (value !== undefined && value !== null && value !== '') {
                    filtersParams[`Filters[${key}]`] = value;
                  }
                });
              }

              const data = await DynamicDataGetListAsync({
                applicationName: currentApplicationName,
                SkipCount: params?.skipCount,
                MaxResultCount: params?.maxResultCount,
                Sorting: params?.sorter,
                ...filtersParams,
              } as any);

              const totalCount = data.totalCount || 0;

              // 转换数据格式
              const items: DynamicDataItem[] = (data.items || []).map((item: any) => ({
                id: item.id,
                creationTime: item.creationTime,
                lastModificationTime: item.lastModificationTime,
                workflowStatus: item.workflowStatus,
                currentActivityName: item.currentActivityName,
                currentAssigneeName: item.currentAssigneeName,
                creator: item.creator,
                ...item.data,
                ...item.extraProperties,
              }));

              // 更新数据列表和服务端总数用于统计
              setDataList(items);
              setServerTotal(totalCount);

              return { success: true, data: items, total: totalCount } as any;
            } catch (error) {
              message.error('加载数据失败');
              return { success: false, data: [], total: 0 } as any;
            }
          }}
          rowSelection="multiple"
          rowMultiSelectWithClick={true}
          onSelectionChanged={(e) => setSelectedRows(e.api.getSelectedRows())}
          columnDefs={columnDefs}
          toolBarRender={(gridApi) => [
            <Access key="create" accessible={canCreate}>
              <DataFormDialog
                title="新建数据"
                applicationName={applicationName}
                primaryEntity={primaryEntity}
                onAfterSubmit={onRefresh}
                buttonProps={{ icon: <PlusOutlined /> }}
              >
                新建
              </DataFormDialog>
            </Access>,
            <Button key="refresh" icon={<ReloadOutlined />} onClick={onRefresh}>
              刷新
            </Button>,
            // TODO: DynamicDataImportExportDialog 组件尚未实现，暂时注释
            // appInfo?.id && primaryEntity?.id && (
            //   <ExportDialog
            //     key="export"
            //     applicationId={appInfo.id}
            //     entityDefinitionId={primaryEntity.id}
            //     applicationName={applicationName}
            //     getSelectedIds={() => selectedRows.map((row: any) => row.id)}
            //   />
            // ),
            // appInfo?.id && primaryEntity?.id && (
            //   <ImportDialog
            //     key="import"
            //     applicationId={appInfo.id}
            //     entityDefinitionId={primaryEntity.id}
            //     applicationName={applicationName}
            //     onAfterImport={onRefresh}
            //   />
            // ),
            <Access key="batchDelete" accessible={canBatchDelete}>
              <DeleteConfirm title="确定删除选中的数据?" onConfirm={handleBatchDelete}>
                <Button icon={<DeleteOutlined />} danger>
                  批量删除
                </Button>
              </DeleteConfirm>
            </Access>,
          ]}
        />
      </div>
    </div>
  );
};

export default AppDataPage;

export const routeProps = {
  name: '应用数据',
};
