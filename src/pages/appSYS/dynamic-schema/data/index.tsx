/**
 * 动态数据管理页面
 * 根据 applicationName 参数显示对应应用的数据列表
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
// import { ListConfigGetByKeyAsync } from '@/services/openApi/ListConfig';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space, Tag, Card, Empty, Spin } from 'antd';
import React, { useRef, useMemo, useEffect, useState, useCallback } from 'react';
import { Access, useAccess, useIntl, history } from 'umi';
import { useKeepAliveParams } from '@/hooks';
import dayjs from 'dayjs';
import StatisticsCards from './_components/StatisticsCards';
import DataFormDialog from './_components/FormDialog';
import { ImportDialog, ExportDialog } from '@/pages/appSYS/_components/DynamicDataImportExportDialog';

// 状态标签映射
const statusTagMap: Record<string, { text: string; color: string }> = {
  draft: { text: '草稿', color: 'default' },
  pending: { text: '待审批', color: 'warning' },
  approved: { text: '已通过', color: 'success' },
  rejected: { text: '已拒绝', color: 'error' },
};

// 操作列渲染
const Options = (
  props: ICellRendererParams & {
    onRefresh: () => void;
    applicationNameRef: React.MutableRefObject<string>;
    appInfoRef: React.MutableRefObject<any>;
  }
) => {
  const { data, onRefresh, applicationNameRef, appInfoRef } = props;
  const applicationName = applicationNameRef.current;
  const appInfo = appInfoRef.current;
  const intl = useIntl();
  const access = useAccess();
  const canUpdate = !!(access && (access['DynamicSchema.DynamicData.Update'] ?? true));
  const canDelete = !!(access && (access['DynamicSchema.DynamicData.Delete'] ?? true));

  // 工作流状态判断
  const workflowStatus = data.workflowStatus;
  const isWorkflowEnabled = appInfo?.workflowEnabled;

  // 草稿状态（未提交）：可编辑、可删除
  const isDraft = workflowStatus === undefined || workflowStatus === null || workflowStatus === 0;
  // 已拒绝：可编辑、可删除
  const isRejected = workflowStatus === 5;

  // 是否可以编辑（未启用工作流，或草稿/已拒绝状态）
  const canEdit = !isWorkflowEnabled || isDraft || isRejected;
  // 是否可以删除（未启用工作流，或草稿/已拒绝状态）
  const canDeleteRow = !isWorkflowEnabled || isDraft || isRejected;

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

  // 查看详情
  const handleViewDetail = () => {
    history.push(
      `/appSYS/dynamic-schema/data/detail?id=${data.id}&applicationName=${applicationName}`
    );
  };

  return (
    <Space>
      <Button
        size="small"
        icon={<EyeOutlined />}
        type="link"
        title="查看"
        onClick={handleViewDetail}
      />
      {canEdit && (
        <Access accessible={canUpdate}>
          <DataFormDialog
            title="编辑数据"
            entityId={data.id}
            applicationName={applicationName}
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
const CURRENT_PAGE_PATH = '/appSYS/dynamic-schema/data';

const DynamicDataListPage: React.FC = () => {
  const gridRef = useRef<GridRef>();
  const intl = useIntl();
  const access = useAccess();
  const canCreate = !!(access && (access['DynamicSchema.DynamicData.Create'] ?? true));
  const canBatchDelete = !!(access && (access['DynamicSchema.DynamicData.Delete'] ?? true));

  // 使用 Hook 获取路由参数
  const { params, isActive } = useKeepAliveParams(CURRENT_PAGE_PATH, ['applicationName']);
  const applicationName = params.applicationName || '';

  // 使用 ref 存储最新的 applicationName，避免闭包问题
  const applicationNameRef = useRef<string>(applicationName);
  if (isActive && applicationName) {
    applicationNameRef.current = applicationName;
  }

  // 状态
  const [loading, setLoading] = useState(true);
  const [appInfo, setAppInfo] = useState<any>(null);
  const [primaryEntity, setPrimaryEntity] = useState<any>(null);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [statistics, setStatistics] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  // 使用 ref 存储 appInfo
  const appInfoRef = useRef<any>(null);
  if (appInfo) {
    appInfoRef.current = appInfo;
  }

  // 记录上一次的applicationName，用于检测变化
  const prevApplicationNameRef = React.useRef<string | null>(null);

  // 加载应用信息和列表配置，支持KeepAlive模式
  useEffect(() => {
    // 只有当前路由匹配时才加载数据
    if (!isActive) return;

    // 首次加载或applicationName变化时重新加载
    if (applicationName !== prevApplicationNameRef.current) {
      prevApplicationNameRef.current = applicationName;

      if (!applicationName) {
        setLoading(false);
        return;
      }

      console.log('[DynamicData] 开始加载应用信息, applicationName:', applicationName);

      setLoading(true);
      // 重置状态
      setAppInfo(null);
      setPrimaryEntity(null);
      setStatistics({ total: 0, pending: 0, approved: 0, rejected: 0 });

      // 第一步：从列表中找到应用ID
      DynamicApplicationGetListAsync({ MaxResultCount: 1000 })
        .then((res) => {
          console.log('[DynamicData] 获取应用列表成功, 总数:', res.items?.length);
          console.log('[DynamicData] 应用列表:', res.items?.map((item: any) => item.name));

          const appFromList = res.items?.find((item: any) => item.name === applicationName);
          console.log('[DynamicData] 从列表中匹配到的应用:', appFromList);

          if (!appFromList?.id) {
            console.warn('[DynamicData] 未找到匹配的应用或应用无ID:', applicationName);
            setLoading(false);
            return;
          }

          // 第二步：根据ID获取应用完整详情（包含实体和字段）
          return DynamicApplicationGetAsync({ id: appFromList.id })
            .then((appDetail) => {
              console.log('[DynamicData] 获取应用详情成功:', appDetail);
              console.log('[DynamicData] 应用实体列表:', appDetail.entities);

              setAppInfo(appDetail);

              // 找到主实体 (role = 0 表示 Primary)
              const primary = appDetail.entities?.find((e: any) => e.role === 0);
              console.log('[DynamicData] 主实体 (role=0):', primary);
              console.log('[DynamicData] 主实体字段:', primary?.fields);

              setPrimaryEntity(primary);
              // 刷新表格数据
              gridRef.current?.onRefresh();
            })
            .catch((err) => {
              console.error('[DynamicData] 获取应用详情失败:', err);
            });
        })
        .catch((err) => {
          console.error('[DynamicData] 获取应用列表失败:', err);
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

  // 字段类型到列定义的映射
  const fieldDataTypeMap: Record<number, { width: number; hideInSearch: boolean; renderer?: string }> = {
    0: { width: 150, hideInSearch: false }, // String
    1: { width: 100, hideInSearch: true },  // Int
    2: { width: 100, hideInSearch: true },  // Long
    3: { width: 120, hideInSearch: true },  // Decimal
    4: { width: 80, hideInSearch: false },  // Boolean
    5: { width: 160, hideInSearch: false, renderer: 'datetime' }, // DateTime
    6: { width: 280, hideInSearch: true },  // Guid
    7: { width: 100, hideInSearch: false }, // Enum
    8: { width: 200, hideInSearch: true },  // Json
    9: { width: 200, hideInSearch: true },  // Text
    10: { width: 100, hideInSearch: true }, // Binary
    11: { width: 100, hideInSearch: true }, // Double
    12: { width: 100, hideInSearch: true }, // Float
    13: { width: 80, hideInSearch: true },  // Byte
    14: { width: 80, hideInSearch: true },  // Short
    15: { width: 150, hideInSearch: false }, // Reference
  };

  // 从实体字段构建列定义
  const columnDefs = useMemo(() => {
    console.log('[DynamicData] 开始构建列定义');
    console.log('[DynamicData] primaryEntity:', primaryEntity);

    const columns: any[] = [];

    // 从实体字段动态生成列定义
    if (primaryEntity?.fields && primaryEntity.fields.length > 0) {
      // 从实体字段动态生成列定义
      console.log('[DynamicData] 使用 primaryEntity.fields 构建列');
      console.log('[DynamicData] 字段数量:', primaryEntity.fields.length);
      // 按 displayOrder 排序
      const sortedFields = [...primaryEntity.fields].sort(
        (a: any, b: any) => (a.displayOrder || 0) - (b.displayOrder || 0)
      );

      sortedFields.forEach((field: any) => {
        // 跳过不可见字段
        if (field.isVisible === false) return;

        const typeConfig = fieldDataTypeMap[field.dataType] || { width: 150, hideInSearch: false };
        const colDef: any = {
          field: field.name,
          headerName: field.displayName || field.name,
          width: typeConfig.width,
          hideInSearch: typeConfig.hideInSearch,
          sortable: true,
        };

        // 根据数据类型设置渲染器
        if (field.dataType === 5) {
          // DateTime
          colDef.cellRenderer = ({ value }: any) =>
            value ? dayjs(value).format('YYYY-MM-DD HH:mm') : '-';
        } else if (field.dataType === 4) {
          // Boolean
          colDef.cellRenderer = ({ value }: any) => (
            <Tag color={value ? 'green' : 'default'}>{value ? '是' : '否'}</Tag>
          );
        } else if (field.dataType === 3 || field.dataType === 11 || field.dataType === 12) {
          // Decimal, Double, Float - 数值格式化
          colDef.cellRenderer = ({ value }: any) =>
            value !== undefined && value !== null ? Number(value).toLocaleString() : '-';
        }

        columns.push(colDef);
      });
    } else {
      // 默认列 - 当没有配置和字段定义时使用
      console.log('[DynamicData] 使用默认列定义');
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
          hideInSearch: true,
          initialSort: 'desc',
          cellRenderer: ({ value }: any) =>
            value ? dayjs(value).format('YYYY-MM-DD HH:mm') : '-',
        }
      );
    }

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

    // 添加审计属性列
    const auditColumns = [
      {
        field: 'creatorId',
        headerName: '创建人ID',
        width: 280,
        hideInSearch: true,
        hide: true, // 默认隐藏
      },
      {
        field: 'creationTime',
        headerName: '创建时间',
        width: 160,
        hideInSearch: true,
        initialSort: 'desc',
        cellRenderer: ({ value }: any) =>
          value ? dayjs(value).format('YYYY-MM-DD HH:mm') : '-',
      },
      {
        field: 'lastModifierId',
        headerName: '修改人ID',
        width: 280,
        hideInSearch: true,
        hide: true, // 默认隐藏
      },
      {
        field: 'lastModificationTime',
        headerName: '修改时间',
        width: 160,
        hideInSearch: true,
        cellRenderer: ({ value }: any) =>
          value ? dayjs(value).format('YYYY-MM-DD HH:mm') : '-',
      },
    ];

    // 添加审计列（如果还没有）
    auditColumns.forEach((auditCol) => {
      if (!columns.find((c) => c.field === auditCol.field)) {
        columns.push(auditCol);
      }
    });

    // 添加操作列
    columns.push({
      field: 'action',
      headerName: intl.formatMessage({ id: 'AbpUi:Actions' }),
      width: 140,
      pinned: 'right',
      filter: false,
      sortable: false,
      cellRenderer: Options,
      cellRendererParams: { onRefresh, applicationNameRef, appInfoRef },
    });

    console.log('[DynamicData] 最终列定义:', columns);
    return columns;
  }, [primaryEntity, appInfo, intl, onRefresh]);

  // 没有应用名称参数
  if (!applicationName) {
    return (
      <Card>
        <Empty
          description="请从动态应用列表中选择一个应用进入数据管理"
          style={{ padding: '60px 0' }}
        >
          <Button type="primary" href="/appSYS/dynamic-schema/applications">
            前往应用列表
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
      {/* 统计卡片 */}
      <StatisticsCards
        total={statistics.total}
        pending={statistics.pending}
        approved={statistics.approved}
        rejected={statistics.rejected}
      />

      {/* 数据表格 */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <AgGridPlus
          gridRef={gridRef}
          headerTitle={`${applicationName} - 数据管理`}
          gridKey={`appSYS.dynamic-schema.data.${applicationName}`}
          request={async (params?: any) => {
            // 使用 ref 获取最新的 applicationName，避免 KeepAlive 切换时闭包问题
            const currentApplicationName = applicationNameRef.current;
            if (!currentApplicationName) {
              return { success: true, data: [], total: 0 } as any;
            }
            try {
              const data = await DynamicDataGetListAsync({
                applicationName: currentApplicationName,
                Filter: params?.filter,
                SkipCount: params?.skipCount,
                MaxResultCount: params?.maxResultCount,
                Sorting: params?.sorter,
              } as any);

              // 更新统计数据
              setStatistics((prev) => ({
                ...prev,
                total: data.totalCount || 0,
              }));

              // 转换数据格式：将 data 和 extraProperties 合并
              const items = (data.items || []).map((item: any) => ({
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

              return { success: true, data: items, total: data.totalCount || 0 } as any;
            } catch (error) {
              message.error('加载数据失败');
              return { success: false, data: [], total: 0 } as any;
            }
          }}
          rowSelection="multiple"
          rowMultiSelectWithClick={true}
          onSelectionChanged={(e) => setSelectedRows(e.api.getSelectedRows())}
          columnDefs={columnDefs}
          toolBarRender={() => [
            <Access key="create" accessible={canCreate}>
              <DataFormDialog
                title="新建数据"
                applicationName={applicationName}
                onAfterSubmit={onRefresh}
                buttonProps={{ icon: <PlusOutlined /> }}
              >
                新建
              </DataFormDialog>
            </Access>,
            <Button key="refresh" icon={<ReloadOutlined />} onClick={onRefresh}>
              刷新
            </Button>,
            appInfo?.id && primaryEntity?.id && (
              <ExportDialog
                key="export"
                applicationId={appInfo.id}
                entityDefinitionId={primaryEntity.id}
                applicationName={applicationName}
                getSelectedIds={() => selectedRows.map((row: any) => row.id)}
              />
            ),
            appInfo?.id && primaryEntity?.id && (
              <ImportDialog
                key="import"
                applicationId={appInfo.id}
                entityDefinitionId={primaryEntity.id}
                applicationName={applicationName}
                onAfterImport={onRefresh}
              />
            ),
            <Access key="batchDelete" accessible={canBatchDelete}>
              <DeleteConfirm
                title="确定删除选中的数据?"
                onConfirm={handleBatchDelete}
              >
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

export default DynamicDataListPage;

export const routeProps = {
  name: '数据管理',
};
