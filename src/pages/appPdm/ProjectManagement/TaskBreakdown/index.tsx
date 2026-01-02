import React, { useRef, useState, useCallback, useMemo } from 'react';
import { AgGridPlus } from '@/components/agGrid';
import { ProjectMilestoneGetBreakdownByProjectAsync } from '@/services/pdm/ProjectMilestone';
import { ProjectTaskDeleteAsync } from '@/services/pdm/ProjectTask';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { Button, Card, message, Modal, Select, Space, Tag } from 'antd';
import { useAccess } from 'umi';
import { ReloadOutlined } from '@ant-design/icons';
import ProjectSelect from '@/pages/appPdm/_formWidgets/ProjectSelect';
import { useTaskFormDialog } from './components/TaskFormDialog';
import { flattenBreakdownData, isNodeEditable, isNodeDeletable, type FlatTreeNode } from './_utils/dataTransform';
import { ProjectMilestonePermissions, ProjectTaskPermissions } from '@/pages/appPdm/_permissions';
import type { GetContextMenuItemsParams, MenuItemDef } from 'ag-grid-community';
import type { API } from '@/services/typings';
import dayjs from 'dayjs';

export const routeProps = {
  name: '项目任务分解',
};

/**
 * 任务状态枚举
 */
const TaskStatusEnum = {
  NotStarted: 0,
  InProgress: 1,
  Paused: 2,
  Completed: 3,
  Cancelled: 4,
};

/**
 * 任务状态选项
 */
const taskStatusOptions = [
  { label: '全部', value: undefined },
  { label: '未开始', value: TaskStatusEnum.NotStarted },
  { label: '进行中', value: TaskStatusEnum.InProgress },
  { label: '已暂停', value: TaskStatusEnum.Paused },
  { label: '已完成', value: TaskStatusEnum.Completed },
  { label: '已取消', value: TaskStatusEnum.Cancelled },
];

/**
 * 任务状态标签映射
 */
const taskStatusTagMap: Record<number, { text: string; color: string }> = {
  [TaskStatusEnum.NotStarted]: { text: '未开始', color: 'default' },
  [TaskStatusEnum.InProgress]: { text: '进行中', color: 'processing' },
  [TaskStatusEnum.Paused]: { text: '已暂停', color: 'warning' },
  [TaskStatusEnum.Completed]: { text: '已完成', color: 'success' },
  [TaskStatusEnum.Cancelled]: { text: '已取消', color: 'error' },
};

/**
 * 项目任务分解页面
 */
const TaskBreakdown: React.FC = () => {
  const gridRef = useRef<GridRef>(null);
  const access = useAccess();
  const openTaskFormDialog = useTaskFormDialog();

  // 筛选条件
  const [projectCode, setProjectCode] = useState<string>();
  const [taskStatus, setTaskStatus] = useState<number | undefined>();

  // 数据状态（保留 data 用于右键菜单隐藏按钮渲染）
  const [data, setData] = useState<FlatTreeNode[]>([]);
  const [breakdown, setBreakdown] = useState<API.BurnAbpPdmProjectManagementProjectMilestonesTaskBreakdownDto>();

  // 权限
  const canViewBreakdown = !!(access && access[ProjectMilestonePermissions.ViewBreakdown]);
  const canCreateTask = !!(access && access[ProjectTaskPermissions.Create]);
  const canUpdateTask = !!(access && access[ProjectTaskPermissions.Update]);
  const canDeleteTask = !!(access && access[ProjectTaskPermissions.Delete]);

  /**
   * 刷新表格数据（对齐“物料分类”模式：由 AgGridPlus 内部 request 驱动）
   */
  const loadData = useCallback(() => {
    gridRef.current?.onRefresh?.();
  }, []);

  // 项目或状态变化时刷新数据
  React.useEffect(() => {
    loadData();
  }, [loadData, projectCode, taskStatus]);

  /**
   * 处理删除任务
   */
  const handleDeleteTask = useCallback(async (taskId: string) => {
    try {
      await ProjectTaskDeleteAsync({ id: taskId });
      message.success('删除成功');
      loadData();
    } catch (error: any) {
      message.error(error.message || '删除失败');
    }
  }, [loadData]);

  /**
   * 列定义
   */
  const columnDefs = useMemo(
    () => [
      {
        field: 'nodeType',
        headerName: '类型',
        width: 100,
        cellRenderer: (params: any) => {
          if (params.value === 'milestone') {
            return <Tag color="blue">里程碑</Tag>;
          } else {
            return <Tag color="green">任务</Tag>;
          }
        },
      },
      {
        field: 'status',
        headerName: '状态',
        width: 100,
        cellRenderer: (params: any) => {
          if (params.data?.nodeType === 'task' && params.value !== undefined) {
            const statusInfo = taskStatusTagMap[params.value];
            if (statusInfo) {
              return <Tag color={statusInfo.color}>{statusInfo.text}</Tag>;
            }
          }
          return null;
        },
      },
      {
        field: 'responsiblePerson',
        headerName: '负责人',
        width: 120,
      },
      {
        field: 'plannedStartDate',
        headerName: '计划开始',
        width: 120,
        valueFormatter: (params: any) => {
          return params.value ? dayjs(params.value).format('YYYY-MM-DD') : '';
        },
      },
      {
        field: 'plannedEndDate',
        headerName: '计划结束',
        width: 120,
        valueFormatter: (params: any) => {
          return params.value ? dayjs(params.value).format('YYYY-MM-DD') : '';
        },
      },
      {
        field: 'actualStartDate',
        headerName: '实际开始',
        width: 120,
        valueFormatter: (params: any) => {
          return params.value ? dayjs(params.value).format('YYYY-MM-DD') : '';
        },
      },
      {
        field: 'actualEndDate',
        headerName: '实际结束',
        width: 120,
        valueFormatter: (params: any) => {
          return params.value ? dayjs(params.value).format('YYYY-MM-DD') : '';
        },
      },
      {
        field: 'description',
        headerName: '描述',
        width: 200,
        flex: 1,
      },
    ],
    []
  );

  /**
   * 右键菜单
   */
  const getContextMenuItems = useCallback(
    (params: GetContextMenuItemsParams): (string | MenuItemDef)[] => {
      const { node } = params;
      const nodeData = node?.data as FlatTreeNode | undefined;

      if (!nodeData) return [];

      const menuItems: (string | MenuItemDef)[] = [];

      if (nodeData.nodeType === 'milestone') {
        // 里程碑右键菜单 - 只显示添加子任务
        if (!nodeData.isVirtual && canCreateTask) {
          menuItems.push({
            name: '添加子任务',
            icon: '<span class="ag-icon ag-icon-plus"></span>',
            action: () => {
              // 延迟到右键菜单关闭之后再打开弹窗，避免被 popup 生命周期打断
              setTimeout(() => {
                openTaskFormDialog({
                  title: '新建任务',
                  defaultValues: {
                    projectCode: projectCode,
                    milestoneId: nodeData.id,
                  },
                  onAfterSubmit: loadData,
                });
              }, 0);
            },
          });
        }
      } else if (nodeData.nodeType === 'task') {
        // 任务右键菜单
        // 1. 添加子任务
        if (canCreateTask) {
          menuItems.push({
            name: '添加子任务',
            icon: '<span class="ag-icon ag-icon-plus"></span>',
            action: () => {
              setTimeout(() => {
                openTaskFormDialog({
                  title: '新建任务',
                  defaultValues: {
                    projectCode: projectCode,
                    milestoneId: nodeData.milestoneId,
                    parentCode: nodeData.taskCode,
                  },
                  onAfterSubmit: loadData,
                });
              }, 0);
            },
          });
        }

        // 2. 编辑任务
        if (canUpdateTask && isNodeEditable(nodeData)) {
          menuItems.push({
            name: '编辑任务',
            icon: '<span class="ag-icon ag-icon-edit"></span>',
            action: () => {
              if (!nodeData.id) return;
              setTimeout(() => {
                openTaskFormDialog({
                  title: '编辑任务',
                  entityId: nodeData.id,
                  onAfterSubmit: loadData,
                });
              }, 0);
            },
          });
        }

        // 3. 删除任务
        if (canDeleteTask && isNodeDeletable(nodeData)) {
          if (menuItems.length > 0) {
            menuItems.push('separator');
          }
          menuItems.push({
            name: '删除任务',
            icon: '<span class="ag-icon ag-icon-cancel"></span>',
            action: () => {
              if (!nodeData.id) return;
              // 直接弹出确认框，避免依赖隐藏按钮
              Modal.confirm({
                title: '确定删除此任务？',
                onOk: async () => handleDeleteTask(nodeData.id!),
              });
            },
          });
        }
      }

      return menuItems;
    },
    [canCreateTask, canUpdateTask, canDeleteTask, openTaskFormDialog, projectCode, loadData, handleDeleteTask]
  );

  if (!canViewBreakdown) {
    return <Card>您没有查看任务分解的权限</Card>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* 筛选器 */}
      <Card style={{ marginBottom: 16 }}>
        <Space size="middle">
          <span>项目：</span>
          <ProjectSelect
            style={{ width: 300 }}
            placeholder="请选择项目"
            value={projectCode}
            onChange={(value) => setProjectCode(value)}
            fieldNames={{ label: 'projectName', value: 'projectCode' }}
          />

          <span>任务状态：</span>
          <Select
            style={{ width: 150 }}
            placeholder="全部"
            value={taskStatus}
            onChange={(value) => setTaskStatus(value)}
            options={taskStatusOptions}
            allowClear
          />

          <Button icon={<ReloadOutlined />} onClick={loadData}>
            刷新
          </Button>
        </Space>

        {breakdown && (
          <div style={{ marginTop: 12, color: '#666' }}>
            <Space split="|">
              <span>项目：{breakdown.projectName}</span>
              <span>里程碑数：{breakdown.totalMilestoneCount || 0}</span>
              <span>任务数：{breakdown.totalTaskCount || 0}</span>
            </Space>
          </div>
        )}
      </Card>

      {/* 树形列表 */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <AgGridPlus
          key={`task-breakdown-${projectCode || 'empty'}`}
          gridRef={gridRef}
          headerTitle="任务分解"
          columnDefs={columnDefs}
          treeData={true}
          treeKeyName="id"
          treeParentName="parentId"
          getDataPath={(rowData) => rowData.hierarchy}
          autoGroupColumnDef={{
            headerName: '名称',
            minWidth: 350,
            flex: 1,
            cellRendererParams: {
              suppressCount: true,
              innerRenderer: (params: any) => {
                const row = params.data as FlatTreeNode | undefined;
                if (!row) return params.value;
                if (row.nodeType === 'milestone') {
                  return row.milestoneName || (row as any).name || row.milestoneCode || '-';
                }
                return row.taskName || (row as any).name || row.taskCode || '-';
              },
            },
          }}
          groupDefaultExpanded={-1}
          request={async () => {
            if (!projectCode) {
              setData([]);
              setBreakdown(undefined);
              return { success: true, data: [], total: 0 } as any;
            }

            try {
              const result = await ProjectMilestoneGetBreakdownByProjectAsync({
                ProjectCode: projectCode,
                TaskStatus: taskStatus,
              });

              setBreakdown(result);
              const flatData = flattenBreakdownData(result);
              setData(flatData);

              return {
                success: true,
                data: flatData,
                total: flatData.length,
              } as any;
            } catch (error: any) {
              message.error(error?.message || '加载数据失败');
              setData([]);
              setBreakdown(undefined);
              return { success: true, data: [], total: 0 } as any;
            }
          }}
          search={false}
          hidePagination={true}
          getContextMenuItems={getContextMenuItems}
          defaultColDef={{
            sortable: true,
            resizable: true,
          }}
          toolBarRender={() => []}
          style={{ height: '100%' }}
        />
      </div>

    </div>
  );
};

export default TaskBreakdown;
