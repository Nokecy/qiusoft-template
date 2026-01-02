import React, { useEffect, useMemo, useRef } from 'react';
import { useNavigate, history, closeTab } from 'umi';
import { useKeepAliveParams } from '@/hooks';
import { Card, Button, message, Spin, Modal, Space } from 'antd';
import { ArrowLeftOutlined, CheckOutlined } from '@ant-design/icons';
import { createForm, onFieldValueChange } from '@formily/core';
import { FormProvider } from '@formily/react';
import { useFormSchema, useSchemaField } from 'umi';
import { ToolBar } from '@/components';
import FormLayoutMode from '@/pages/_utils/editMode';
import { formId, formSchema } from './schema';
import './index.less';
import {
  ProjectUpdateAsync,
  ProjectGetAsync
} from '@/services/pdm/Project';
import { ProjectTaskDeleteAsync } from '@/services/pdm/ProjectTask';
import { ProjectMilestoneCompleteAsync } from '@/services/pdm/ProjectMilestone';
import { openMilestoneApprovalRouteDialog } from '../_components/MilestoneApprovalRouteDialog';
import ProjectCategorySelect from '../../../_formWidgets/ProjectCategorySelect';
import MaterialSelect from '../../../BomManagement/_components/MaterialSelect';
import ProjectTemplateSelect from '../../../_formWidgets/ProjectTemplateSelect';
import ProjectSelect from '../../../_formWidgets/ProjectSelect';
import UserSelect from '../../../_formWidgets/UserSelect';
import ProjectRoleSelect from '../../../_formWidgets/ProjectRoleSelect';
import TaskTypeSelect from '../../../_formWidgets/TaskTypeSelect';
import RiskTypeSelect from '../../../_formWidgets/RiskTypeSelect';
import MilestoneFlowChart from '../../TemplateList/components/MilestoneFlowChart';
import MilestoneFlowEditor from '../../TemplateList/components/MilestoneFlowEditor';
import DocumentExplorer from '../../TemplateList/components/DocumentExplorer';
import ProjectFormSelect from '../../TemplateList/components/ProjectFormSelect';
import ProjectImageUpload from '../../../_formWidgets/ProjectImageUpload';
import CompleteMilestoneButtonSimple from '../_components/CompleteMilestoneButtonSimple';
import CurrentMilestoneCard from '../_components/CurrentMilestoneCard';
import MilestoneFormDisplay from '../_components/MilestoneFormDisplay';
import MilestoneApprovalDisplay from '../_components/MilestoneApprovalDisplay';
import MilestoneFlowChartHorizontal from '../_components/MilestoneFlowChartHorizontal';
import MilestoneList from '../_components/MilestoneList';
import ArrayDataContainer from './_components/ArrayDataContainer';
import StickyContainer from './_components/StickyContainer';
import ListHeaderWithAddButton from '../_components/ListHeaderWithAddButton';
import ProjectTaskFormDialog from '../../TaskList/components/ProjectTaskFormDialog';
import ProjectRiskFormDialog from '../../RiskList/components/ProjectRiskFormDialog';
import ProjectIssueFormDialog from '../../IssueList/components/ProjectIssueFormDialog';
import CollapsibleSection from '../_components/CollapsibleSection';
import ReadOnlyArrayTableComponent from './_components/ReadOnlyArrayTable';
import { Tag } from 'antd';
import ProjectEntityList from './_components/ProjectEntityList';

/**
 * 对里程碑进行拓扑排序,按照父子层级关系排列
 * 规则:
 * 1. 没有父级的里程碑排在最前面
 * 2. 有父级的里程碑排在其所有父级之后
 * 3. 同级里程碑保持原有顺序
 */
const topologicalSortMilestones = (milestones: any[]): any[] => {
  if (!milestones || milestones.length === 0) {
    return [];
  }

  // 创建里程碑名称到对象的映射
  const nameToMilestone = new Map<string, any>();
  milestones.forEach(m => {
    if (m.milestoneName) {
      nameToMilestone.set(m.milestoneName, m);
    }
  });

  // 记录已访问和已排序的里程碑
  const visited = new Set<string>();
  const sorted: any[] = [];

  // 深度优先搜索进行拓扑排序
  const dfs = (milestone: any) => {
    if (!milestone || !milestone.milestoneName) return;

    const name = milestone.milestoneName;
    if (visited.has(name)) return;

    visited.add(name);

    // 先处理所有父级里程碑
    if (milestone.parentCodes && Array.isArray(milestone.parentCodes)) {
      milestone.parentCodes.forEach((parentName: string) => {
        const parent = nameToMilestone.get(parentName);
        if (parent && !visited.has(parentName)) {
          dfs(parent);
        }
      });
    }

    // 再将当前里程碑加入结果
    sorted.push(milestone);
  };

  // 遍历所有里程碑进行排序
  milestones.forEach(milestone => {
    dfs(milestone);
  });

  return sorted;
};

const ProjectDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id: entityId, projectCategoryCode: defaultProjectCategoryCode, isActive, hasChanged } = useKeepAliveParams(
    '/appPdm/ProjectManagement/ProjectList/Detail',
    ['id', 'projectCategoryCode']
  );

  const [loading, setLoading] = React.useState(false);

  // 返回上一页
  const handleGoBack = () => {
    const currentPath = window.location.pathname;
    history.push('/appPdm/ProjectManagement/ProjectList');
    setTimeout(() => {
      closeTab(currentPath);
    }, 150);
  };

  // 使用 ref 记录当前页面的 entityId，防止被其他页面的 URL 变化影响
  const currentEntityIdRef = useRef(entityId);

  // 使用 ref 标记组件是否已挂载和活跃
  const isMountedRef = useRef(true);
  const isPageActiveRef = useRef(true);

  useEffect(() => {
    // 组件挂载时设置为活跃
    isPageActiveRef.current = true;
    isMountedRef.current = true;

    return () => {
      // 组件卸载时标记为非活跃
      isPageActiveRef.current = false;
      isMountedRef.current = false;
    };
  }, []);

  // 注入 Tab 栏 sticky 样式
  useEffect(() => {
    const styleId = 'project-detail-sticky-tab-style';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        .project-detail-sticky-tab > .ant-tabs-nav {
          position: sticky !important;
          top: 0 !important;
          z-index: 100 !important;
          background: #fff !important;
          padding-top: 8px !important;
          margin-bottom: 0 !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const schema = useFormSchema(formId, formSchema);

  // 用于触发 FormDialog 的 ref
  const taskDialogButtonRef = React.useRef<any>(null);
  const riskDialogButtonRef = React.useRef<any>(null);
  const issueDialogButtonRef = React.useRef<any>(null);

  const SchemaField = useSchemaField({
    ProjectCategorySelect,
    MaterialSelect,
    ProjectTemplateSelect,
    ProjectSelect,
    UserSelect,
    ProjectRoleSelect,
    TaskTypeSelect,
    RiskTypeSelect,
    MilestoneFlowChart: (props: any) => {
      console.log('[Debug] MilestoneFlowChart 使用 MilestoneFlowChartHorizontal 渲染', props);
      return (
        <MilestoneFlowChartHorizontal
          {...props}
          currentMilestoneId={form.values.currentMilestoneId}
          selectedMilestoneId={form.values.selectedMilestoneId}
          onMilestoneClick={(milestoneId: string) => {
            // 更新选中的里程碑ID（用于筛选任务/风险/问题）
            // 注意：不修改 currentMilestoneId，保持当前里程碑Card固定
            form.setFieldState('selectedMilestoneId', (state) => {
              state.value = milestoneId;
            });
          }}
        />
      );
    },
    CompleteMilestoneButtonSimple,
    CurrentMilestoneCard,
    MilestoneFormDisplay,
    MilestoneApprovalDisplay,
    ArrayDataContainer,
    StickyContainer,
    DocumentExplorer,
    ProjectFormSelect,
    ProjectImageUpload,
    // 里程碑列表组件 - 用于任务Tab左侧
    MilestoneList: (props: any) => {
      return (
        <MilestoneList
          {...props}
          onMilestoneSelect={(milestoneId: string) => {
            // 更新任务Tab的里程碑筛选字段
            form.setFieldState('taskMilestoneFilter', (state) => {
              state.value = milestoneId;
            });
          }}
        />
      );
    },
    // 只读数组表格组件
    ReadOnlyArrayTable: (props: any) => {
      const { value, tableType } = props;

      // 根据不同类型定义列配置
      let columns: any[] = [];

      if (tableType === 'filteredTasks') {
        columns = [
          {
            title: '任务名称',
            dataIndex: 'taskName',
            key: 'taskName',
            width: 150,
            render: (_: any, record: any) => {
              if (!record?.id) return record?.taskName || '-';
              return (
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/appPdm/ProjectManagement/TaskList/detail?id=${record.id}`);
                  }}
                >
                  {record.taskName}
                </a>
              );
            },
          },
          { title: '任务类型', dataIndex: 'taskTypeName', key: 'taskTypeName', width: 120 },
          { title: '任务描述', dataIndex: 'description', key: 'description', width: 200 },
          { title: '预计工时(小时)', dataIndex: 'estimatedHours', key: 'estimatedHours', width: 120 },
          { title: '关联里程碑', dataIndex: 'milestoneName', key: 'milestoneName', width: 180 },
        ];
        return <ReadOnlyArrayTableComponent value={value} columns={columns} />;
      }

      if (tableType === 'risks') {
        columns = [
          {
            title: '风险名称',
            dataIndex: 'name',
            key: 'name',
            width: 150,
            render: (_: any, record: any) => {
              if (!record?.id) return record?.name || '-';
              return (
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/appPdm/ProjectManagement/RiskList/detail?id=${record.id}`);
                  }}
                >
                  {record.name}
                </a>
              );
            },
          },
          { title: '风险类型', dataIndex: 'riskTypeName', key: 'riskTypeName', width: 120 },
          { title: '处理人', dataIndex: 'handlerName', key: 'handlerName', width: 120 },
          { title: '风险描述', dataIndex: 'description', key: 'description', width: 200 },
          { title: '关联里程碑', dataIndex: 'milestoneName', key: 'milestoneName', width: 180 },
        ];
        return <ReadOnlyArrayTableComponent value={value} columns={columns} />;
      }

      if (tableType === 'issues') {
        columns = [
          {
            title: '问题名称',
            dataIndex: 'name',
            key: 'name',
            width: 150,
            render: (_: any, record: any) => {
              if (!record?.id) return record?.name || '-';
              return (
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/appPdm/ProjectManagement/IssueList/detail?id=${record.id}`);
                  }}
                >
                  {record.name}
                </a>
              );
            },
          },
          { title: '问题类型', dataIndex: 'issueTypeName', key: 'issueTypeName', width: 120 },
          { title: '处理人', dataIndex: 'handlerName', key: 'handlerName', width: 120 },
          { title: '问题描述', dataIndex: 'remark', key: 'remark', width: 200 },
          { title: '关联里程碑', dataIndex: 'milestoneName', key: 'milestoneName', width: 180 },
        ];
        return <ReadOnlyArrayTableComponent value={value} columns={columns} />;
      }

      if (tableType === 'teamMembers') {
        columns = [
          { title: '成员姓名', dataIndex: 'userName', key: 'userName', width: 150 },
          { title: '项目角色', dataIndex: 'projectRoleName', key: 'projectRoleName', width: 150 },
          { title: '备注', dataIndex: 'remark', key: 'remark', width: 200 },
        ];
      } else if (tableType === 'milestones') {
        columns = [
          { title: '里程碑名称', dataIndex: 'milestoneName', key: 'milestoneName', width: 200 },
          { title: '责任人', dataIndex: 'responsibleName', key: 'responsibleName', width: 150 },
          {
            title: '是否需要审批',
            dataIndex: 'isApproval',
            key: 'isApproval',
            width: 120,
            render: (val: boolean) => val ? '是' : '否'
          },
        ];
      } else if (tableType === 'tasks') {
        columns = [
          {
            title: '任务名称',
            dataIndex: 'taskName',
            key: 'taskName',
            width: 150,
            render: (_: any, record: any) => {
              if (!record?.id) return record?.taskName || '-';
              return (
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/appPdm/ProjectManagement/TaskList/detail?id=${record.id}`);
                  }}
                >
                  {record.taskName}
                </a>
              );
            },
          },
          { title: '任务类型', dataIndex: 'taskTypeName', key: 'taskTypeName', width: 120 },
          { title: '任务描述', dataIndex: 'description', key: 'description', width: 200 },
          { title: '预计工时(小时)', dataIndex: 'estimatedHours', key: 'estimatedHours', width: 120 },
          { title: '关联里程碑', dataIndex: 'milestoneName', key: 'milestoneName', width: 180 },
        ];
      }

      return <ReadOnlyArrayTableComponent value={value} columns={columns} />;
    },
    ListHeaderWithAddButton: (props: any) => {
      // 根据 title 区分不同的列表
      let onAdd: (() => void) | undefined = undefined;
      let dialogButtonRef: React.RefObject<any> | null = null;

      if (props.title === '项目任务') {
        dialogButtonRef = taskDialogButtonRef;
        onAdd = () => taskDialogButtonRef.current?.click?.();
      } else if (props.title === '项目风险') {
        dialogButtonRef = riskDialogButtonRef;
        onAdd = () => riskDialogButtonRef.current?.click?.();
      } else if (props.title === '项目问题') {
        dialogButtonRef = issueDialogButtonRef;
        onAdd = () => issueDialogButtonRef.current?.click?.();
      }

      return (
        <ListHeaderWithAddButton
          {...props}
          onAdd={onAdd}
        />
      );
    },
    // 可折叠区块组件 - 用于任务/风险/问题列表
    CollapsibleSection: (props: any) => {
      let onAdd: (() => void) | undefined = undefined;

      if (props.title === '项目任务') {
        onAdd = () => taskDialogButtonRef.current?.click?.();
      } else if (props.title === '项目风险') {
        onAdd = () => riskDialogButtonRef.current?.click?.();
      } else if (props.title === '项目问题') {
        onAdd = () => issueDialogButtonRef.current?.click?.();
      }

      return (
        <CollapsibleSection
          {...props}
          onAdd={onAdd}
        />
      );
    },
    // 里程碑流程图（简单版本，用于里程碑Tab）
    MilestoneFlowChartSimple: MilestoneFlowChart,
    // 里程碑流程编辑器（与项目模板一致）
    MilestoneFlowEditor: MilestoneFlowEditor,
    // 卡片列表组件 - 用于项目详情Tab中的任务/风险/问题展示
    // 所有字段在同一行显示，与原表格列一致
    CardList: (props: any) => {
      const { value, cardType } = props;
      const dataSource = Array.isArray(value) ? value : [];

      if (dataSource.length === 0) {
        return (
          <div style={{
            padding: '20px',
            textAlign: 'center',
            color: '#999',
            backgroundColor: '#fafafa',
            borderRadius: '8px'
          }}>
            暂无数据
          </div>
        );
      }

      // 卡片行样式 - 圆角简约
      const rowStyle: React.CSSProperties = {
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '10px 16px',
        marginBottom: '8px',
        border: '1px solid #e8e8e8',
        cursor: 'pointer',
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
      };

      // 列样式
      const colStyle = (width: string | number): React.CSSProperties => ({
        width: typeof width === 'number' ? `${width}px` : width,
        flexShrink: 0,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        fontSize: '13px',
      });

      const flexColStyle: React.CSSProperties = {
        flex: 1,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        fontSize: '13px',
        color: '#666',
      };
      // 表头样式
      const headerStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '8px 16px',
        backgroundColor: '#fafafa',
        borderRadius: '8px 8px 0 0',
        borderBottom: '1px solid #e8e8e8',
        fontWeight: 500,
        fontSize: '13px',
        color: '#666',
      };

      if (cardType === 'tasks') {
        return (
          <div>
            {/* 表头 */}
            <div style={headerStyle}>
              <div style={colStyle(150)}>任务名称</div>
              <div style={colStyle(100)}>任务类型</div>
              <div style={flexColStyle}>任务描述</div>
              <div style={colStyle(100)}>预计工时</div>
              <div style={colStyle(120)}>关联里程碑</div>
            </div>
            {dataSource.map((record: any, index: number) => (
              <div
                key={record.id || index}
                style={rowStyle}
                onClick={() => {
                  if (record.id) navigate(`/appPdm/ProjectManagement/TaskList/detail?id=${record.id}`);
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'; e.currentTarget.style.borderColor = '#1890ff'; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#e8e8e8'; }}
              >
                <div style={{ ...colStyle(150), fontWeight: 500, color: '#1890ff' }}>{record.taskName || '-'}</div>
                <div style={colStyle(100)}>{record.taskTypeName || '-'}</div>
                <div style={flexColStyle} title={record.description}>{record.description || '-'}</div>
                <div style={colStyle(100)}>{record.estimatedHours ? `${record.estimatedHours}小时` : '-'}</div>
                <div style={colStyle(120)}>{record.milestoneName || '-'}</div>
              </div>
            ))}
          </div>
        );
      }

      if (cardType === 'risks') {
        return (
          <div>
            {/* 表头 */}
            <div style={headerStyle}>
              <div style={colStyle(150)}>风险名称</div>
              <div style={colStyle(100)}>风险类型</div>
              <div style={colStyle(100)}>处理人</div>
              <div style={flexColStyle}>风险描述</div>
              <div style={colStyle(120)}>关联里程碑</div>
            </div>
            {dataSource.map((record: any, index: number) => (
              <div
                key={record.id || index}
                style={rowStyle}
                onClick={() => {
                  if (record.id) navigate(`/appPdm/ProjectManagement/RiskList/detail?id=${record.id}`);
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'; e.currentTarget.style.borderColor = '#fa8c16'; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#e8e8e8'; }}
              >
                <div style={{ ...colStyle(150), fontWeight: 500, color: '#fa8c16' }}>{record.name || '-'}</div>
                <div style={colStyle(100)}>{record.riskTypeName || '-'}</div>
                <div style={colStyle(100)}>{record.handlerName || '-'}</div>
                <div style={flexColStyle} title={record.description}>{record.description || '-'}</div>
                <div style={colStyle(120)}>{record.milestoneName || '-'}</div>
              </div>
            ))}
          </div>
        );
      }

      if (cardType === 'issues') {
        return (
          <div>
            {/* 表头 */}
            <div style={headerStyle}>
              <div style={colStyle(150)}>问题名称</div>
              <div style={colStyle(100)}>问题类型</div>
              <div style={colStyle(100)}>处理人</div>
              <div style={flexColStyle}>问题描述</div>
              <div style={colStyle(120)}>关联里程碑</div>
            </div>
            {dataSource.map((record: any, index: number) => (
              <div
                key={record.id || index}
                style={rowStyle}
                onClick={() => {
                  if (record.id) navigate(`/appPdm/ProjectManagement/IssueList/detail?id=${record.id}`);
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'; e.currentTarget.style.borderColor = '#f5222d'; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#e8e8e8'; }}
              >
                <div style={{ ...colStyle(150), fontWeight: 500, color: '#f5222d' }}>{record.name || '-'}</div>
                <div style={colStyle(100)}>{record.issueTypeName || '-'}</div>
                <div style={colStyle(100)}>{record.handlerName || '-'}</div>
                <div style={flexColStyle} title={record.remark}>{record.remark || '-'}</div>
                <div style={colStyle(120)}>{record.milestoneName || '-'}</div>
              </div>
            ))}
          </div>
        );
      }

      return null;
    },
    // 项目任务CRUD表格
    ProjectTaskCRUDTable: (props: any) => {
      const { value } = props;
      const dataSource = Array.isArray(value) ? value : [];

      // 新建任务对话框按钮的ref
      const createTaskButtonRef = React.useRef<any>(null);
      // 当前编辑的任务ID
      const [editTaskId, setEditTaskId] = React.useState<string | null>(null);

      // 获取当前项目相关信息
      const projectId = form.values.id;
      const projectCode = form.values.projectCode;
      const currentMilestoneId = form.values.taskMilestoneFilter || form.values.currentMilestoneId;
      const milestones = form.values.milestones || [];
      const currentMilestone = milestones.find((m: any) => m?.id === currentMilestoneId);

      // 刷新数据
      const refreshData = () => {
        setTimeout(() => {
          window.location.reload();
        }, 500);
      };

      const columns = [
        {
          title: '任务名称',
          dataIndex: 'taskName',
          key: 'taskName',
          width: 150,
          render: (_: any, record: any) => {
            if (!record?.id) return record?.taskName || '-';
            return (
              <a
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/appPdm/ProjectManagement/TaskList/detail?id=${record.id}`);
                }}
              >
                {record.taskName}
              </a>
            );
          },
        },
        { title: '任务类型', dataIndex: 'taskTypeName', key: 'taskTypeName', width: 120 },
        { title: '任务描述', dataIndex: 'description', key: 'description', width: 200 },
        { title: '预计工时(小时)', dataIndex: 'estimatedHours', key: 'estimatedHours', width: 120 },
        { title: '关联里程碑', dataIndex: 'milestoneName', key: 'milestoneName', width: 180 },
        {
          title: '操作',
          key: 'operations',
          width: 100,
          render: (_: any, record: any) => {
            if (!record?.id) return null;
            return (
              <Space size="small">
                <ProjectTaskFormDialog
                  entityId={record.id}
                  title="编辑任务"
                  buttonProps={{ type: 'link', size: 'small', style: { padding: 0 } }}
                  onAfterSubmit={refreshData}
                >
                  编辑
                </ProjectTaskFormDialog>
                <a
                  style={{ color: '#ff4d4f' }}
                  onClick={() => {
                    Modal.confirm({
                      title: '确认删除',
                      content: '确定要删除该任务吗？删除后无法恢复。',
                      okText: '确认',
                      cancelText: '取消',
                      okType: 'danger',
                      onOk: async () => {
                        try {
                          await ProjectTaskDeleteAsync({ id: record.id });
                          message.success('删除成功');
                          refreshData();
                        } catch (error) {
                          message.error('删除失败');
                        }
                      },
                    });
                  }}
                >
                  删除
                </a>
              </Space>
            );
          },
        },
      ];

      return (
        <div>
          {/* 操作按钮区域 */}
          <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-end' }}>
            <ProjectTaskFormDialog
              title="新建任务"
              buttonProps={{ type: 'primary' }}
              defaultValues={{
                projectId,
                projectCode,
                milestoneId: currentMilestoneId,
                milestoneName: currentMilestone?.milestoneName,
              }}
              onAfterSubmit={refreshData}
            >
              新建任务
            </ProjectTaskFormDialog>
          </div>
          {/* 表格 */}
          <ReadOnlyArrayTableComponent value={dataSource} columns={columns} />
        </div>
      );
    },
  });

  // 存储原始的完整数据（用于里程碑筛选）
  const fullDataRef = React.useRef<{
    tasks: any[];
    risks: any[];
    issues: any[];
  }>({
    tasks: [],
    risks: [],
    issues: [],
  });

  // 使用 useMemo 确保表单实例稳定，避免多个页面间的 effects 相互干扰
  const form = useMemo(() => {
    return createForm({
      // 页面整体为只读模式（仅里程碑关联表单通过 readOnly=false 设置为可编辑）
      pattern: 'readPretty',
      effects: () => {
        // 监听 selectedMilestoneId 变化，动态过滤任务/风险/问题数据
        // 注意：监听的是 selectedMilestoneId（用户点击的里程碑），而非 currentMilestoneId（项目当前里程碑）
        onFieldValueChange('selectedMilestoneId', (field) => {
          const selectedMilestoneId = field.value;

          // 获取原始完整数据
          const { tasks, risks, issues } = fullDataRef.current;

          if (!selectedMilestoneId) {
            // 如果没有选择里程碑，显示全部数据
            field.form.setFieldState('filteredTasks', (state) => {
              state.value = tasks;
            });
            field.form.setFieldState('filteredRisks', (state) => {
              state.value = risks;
            });
            field.form.setFieldState('filteredIssues', (state) => {
              state.value = issues;
            });
          } else {
            // 过滤出选中里程碑的数据
            const filteredTasks = tasks.filter((task: any) => task.milestoneId === selectedMilestoneId);
            const filteredRisks = risks.filter((risk: any) => risk.milestoneId === selectedMilestoneId);
            const filteredIssues = issues.filter((issue: any) => issue.milestoneId === selectedMilestoneId);

            field.form.setFieldState('filteredTasks', (state) => {
              state.value = filteredTasks;
            });
            field.form.setFieldState('filteredRisks', (state) => {
              state.value = filteredRisks;
            });
            field.form.setFieldState('filteredIssues', (state) => {
              state.value = filteredIssues;
            });
          }
        });

        // 监听 taskMilestoneFilter 变化，动态过滤任务Tab的任务列表
        onFieldValueChange('taskMilestoneFilter', (field) => {
          const filterMilestoneId = field.value;
          const allTasks = fullDataRef.current.tasks || [];

          if (!filterMilestoneId) {
            field.form.setFieldState('tasks', (state) => {
              state.value = allTasks;
              // 合并 pagination 配置，保留原有配置
              state.componentProps = {
                ...(state.componentProps || {}),
                pagination: {
                  ...(state.componentProps?.pagination || {}),
                  pageSize: 10,
                  total: allTasks.length,
                  showTotal: (total: number) => `共 ${total} 条`,
                },
              };
            });
          } else {
            const filteredTasks = allTasks.filter((task: any) => task.milestoneId === filterMilestoneId);

            field.form.setFieldState('tasks', (state) => {
              state.value = filteredTasks;
              // 合并 pagination 配置，保留原有配置
              state.componentProps = {
                ...(state.componentProps || {}),
                pagination: {
                  ...(state.componentProps?.pagination || {}),
                  pageSize: 10,
                  total: filteredTasks.length,
                  showTotal: (total: number) => `共 ${total} 条`,
                },
              };
            });
          }
        });
      },
    });
  }, []);

  // 将数据加载逻辑移到 useEffect 中，确保与组件生命周期正确绑定
  useEffect(() => {
    // 【KeepAlive 修复】只在页面激活且参数变化时加载数据
    if (!isActive || !hasChanged) {
      console.log('🔵 [项目详情] 页面未激活或参数未变化，跳过数据加载');
      return;
    }

    const loadData = async () => {
      // 【关键修复】只在页面活跃且 entityId 未变化时执行
      if (!isPageActiveRef.current || !isMountedRef.current) {
        console.log('🔵 [项目详情] 页面未活跃，跳过数据加载');
        return;
      }

      // 检查 entityId 是否是当前页面的ID（防止被其他页面的URL变化影响）
      if (entityId !== currentEntityIdRef.current) {
        console.log('🔵 [项目详情] entityId已变化，这可能是其他页面的操作，跳过');
        return;
      }

      if (entityId) {
        setLoading(true);
        try {
          // 加载项目数据
          const res = await ProjectGetAsync({ id: entityId });

          // 再次检查页面是否还活跃
          if (!isPageActiveRef.current || !isMountedRef.current) {
            return;
          }

          // 创建formData对象(和模板页面保持一致)
          const formData: any = { ...res };

          // 创建用户ID到姓名的映射(用于风险和问题的处理人回显)
          const userIdToNameMap = new Map<string, string>();
          if (res.teamMembers && Array.isArray(res.teamMembers)) {
            res.teamMembers.forEach((member: any) => {
              if (member.userId && member.userName) {
                userIdToNameMap.set(member.userId, member.userName);
              }
            });
          }

          // 转换里程碑数据:将parentMilestones对象数组转换为parentCodes名称数组
          if (res.milestones && Array.isArray(res.milestones)) {
            // 创建里程碑ID到名称的映射
            const idToNameMap = new Map<string, string>();
            res.milestones.forEach((m: any) => {
              if (m.id && m.milestoneName) {
                idToNameMap.set(m.id, m.milestoneName);
              }
            });

            const milestonesWithParentCodes = res.milestones.map((milestone: any) => {
              // 如果parentMilestones存在,根据ID查找名称
              let parentCodes: string[] = [];
              if (milestone.parentMilestones && Array.isArray(milestone.parentMilestones)) {
                parentCodes = milestone.parentMilestones
                  .map((pm: any) => {
                    // 优先使用parentMilestoneName,如果为null则通过ID查找
                    if (pm.parentMilestoneName) {
                      return pm.parentMilestoneName;
                    } else if (pm.parentMilestoneId) {
                      const name = idToNameMap.get(pm.parentMilestoneId);
                      return name;
                    }
                    return null;
                  })
                  .filter((name: string | null | undefined) => name); // 过滤掉null和undefined
              }

              // 转换formId为formIds数组(后端是单数字段,前端schema定义的是复数数组)
              const milestoneFormId = milestone.formId || (milestone.form && milestone.form.id);
              const formIds = milestoneFormId ? [milestoneFormId] : [];

              return {
                ...milestone,
                parentCodes,
                formIds,  // 用于编辑时的表单选择器
              };
            });

            // 对里程碑进行拓扑排序,按照父子层级关系排列
            formData.milestones = topologicalSortMilestones(milestonesWithParentCodes);
          }

          // 合并文档和文件数据（参考提交逻辑的处理方式）
          const allDocuments: any[] = [];

          // 递归展平文档树结构（仅用于从后端加载的数据）
          const flattenDocuments = (docs: any[], parentId?: string): any[] => {
            const result: any[] = [];
            docs.forEach(doc => {
              // 创建文档副本，转换树形结构为扁平结构
              const flatDoc = {
                ...doc,
                // 从 children 中的第一个元素移除 children 字段，设置正确的 parentId
                parentId: parentId || doc.parentId,
              };
              // 移除 children 字段，因为我们要展平
              delete flatDoc.children;

              result.push(flatDoc);

              // 递归处理子文档，传入当前文档的 id 作为 parentId
              if (doc.children && Array.isArray(doc.children) && doc.children.length > 0) {
                const childDocs = flattenDocuments(doc.children, doc.id);
                result.push(...childDocs);
              }
            });
            return result;
          };

          // 检查文档数据来源：
          // 1. 如果有 children 字段，说明是从后端加载的树形结构，需要展平
          // 2. 如果没有 children 字段或已经是扁平数组（如从模板带过来的），直接使用
          const hasTreeStructure = res.documents && res.documents.some((doc: any) =>
            doc.children && Array.isArray(doc.children)
          );

          if (res.documents && Array.isArray(res.documents)) {
            if (hasTreeStructure) {
              // 从后端加载的树形结构，需要展平
              console.log('📦 [文档] 检测到树形结构，进行展平处理');
              const flatDocs = flattenDocuments(res.documents);
              allDocuments.push(...flatDocs);
            } else {
              // 已经是扁平结构（如从模板带过来的临时数据），直接使用
              console.log('📦 [文档] 检测到扁平结构，直接使用');
              allDocuments.push(...res.documents);
            }
          }

          // 添加文件（上传的文件）
          if (res.files && Array.isArray(res.files)) {
            allDocuments.push(...res.files);
          }

          // 将合并后的数据设置到 formData
          if (allDocuments.length > 0) {
            formData.documents = allDocuments;
          }

          // 处理风险数据:为handlerCode添加对应的handlerName
          if (res.risks && Array.isArray(res.risks)) {
            formData.risks = res.risks.map((risk: any) => {
              const handlerName = risk.handlerCode
                ? userIdToNameMap.get(risk.handlerCode)
                : undefined;
              return {
                ...risk,
                handlerName,
              };
            });
          }

          // 处理问题数据:为handlerCode添加对应的handlerName
          if (res.issues && Array.isArray(res.issues)) {
            formData.issues = res.issues.map((issue: any) => {
              const handlerName = issue.handlerCode
                ? userIdToNameMap.get(issue.handlerCode)
                : undefined;
              return {
                ...issue,
                handlerName,
              };
            });
          }

          // 保存原始完整数据到 ref（用于后续里程碑筛选）
          fullDataRef.current = {
            tasks: formData.tasks || [],
            risks: formData.risks || [],
            issues: formData.issues || [],
          };

          // 初始化筛选后的数据字段（用于项目详情Tab显示）
          formData.selectedMilestoneId = res.currentMilestoneId;

          // 根据当前里程碑过滤数据
          if (res.currentMilestoneId) {
            formData.filteredTasks = formData.tasks.filter((task: any) =>
              task.milestoneId === res.currentMilestoneId
            );
            formData.filteredRisks = formData.risks.filter((risk: any) =>
              risk.milestoneId === res.currentMilestoneId
            );
            formData.filteredIssues = formData.issues.filter((issue: any) =>
              issue.milestoneId === res.currentMilestoneId
            );
          } else {
            formData.filteredTasks = formData.tasks || [];
            formData.filteredRisks = formData.risks || [];
            formData.filteredIssues = formData.issues || [];
          }

          // 初始化任务Tab的里程碑筛选为当前里程碑
          formData.taskMilestoneFilter = res.currentMilestoneId || '';

          form.setInitialValues(formData);

          // 手动触发初始筛选
          if (res.currentMilestoneId) {
            setTimeout(() => {
              const allTasks = fullDataRef.current.tasks || [];
              const filteredTasks = allTasks.filter((task: any) => task.milestoneId === res.currentMilestoneId);

              // 设置数据和分页配置
              form.setFieldState('tasks', (state) => {
                state.value = filteredTasks;
                state.componentProps = {
                  ...(state.componentProps || {}),
                  pagination: {
                    ...(state.componentProps?.pagination || {}),
                    pageSize: 10,
                    total: filteredTasks.length,
                    showTotal: (total: number) => `共 ${total} 条`,
                  },
                };
                console.log('[分页修复] tasks 初始筛选后设置完成');
              });
            }, 150);
          }
        } catch (error) {
          console.error('加载项目数据失败:', error);
          message.error('加载数据失败');
        } finally {
          setLoading(false);
        }
      } else if (defaultProjectCategoryCode) {
        form.setInitialValues({ projectCategoryCode: defaultProjectCategoryCode });
        setLoading(false);
      }
    };

    loadData();
  }, [isActive, hasChanged, entityId, defaultProjectCategoryCode, form]);

  // 完成里程碑
  const handleCompleteMilestone = async (milestone: any) => {
    if (!milestone || !milestone.id) {
      message.warning('里程碑ID不存在，无法完成');
      return;
    }

    // 审批里程碑：直接弹出“节点审批人”选择弹窗，不再叠加二次确认弹窗
    if (milestone.isApproval) {
      try {
        const approvers = await openMilestoneApprovalRouteDialog({
          milestoneName: milestone.milestoneName,
          workflowDefinitionId: milestone.workflowDefinitionId,
        });
        if (!approvers) return;
        await ProjectMilestoneCompleteAsync({ id: milestone.id }, { approvers });
        message.success('已提交审批');
        setTimeout(() => {
          window.location.reload();
        }, 300);
      } catch (err: any) {
        message.error('提交审批失败: ' + (err?.message || '未知错误'));
        console.error('提交审批失败:', err);
      }
      return;
    }

    Modal.confirm({
      title: '确认完成里程碑',
      content: `确定要完成里程碑"${milestone.milestoneName}"吗？`,
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        try {
          if (milestone.isApproval) {
            const approvers = await openMilestoneApprovalRouteDialog({
              milestoneName: milestone.milestoneName,
              workflowDefinitionId: milestone.workflowDefinitionId,
            });
            if (!approvers) return;
            await ProjectMilestoneCompleteAsync({ id: milestone.id }, { approvers });
          } else {
            await ProjectMilestoneCompleteAsync({ id: milestone.id });
          }
          message.success('里程碑已完成');
          // 刷新页面
          setTimeout(() => {
            window.location.reload();
          }, 500);
        } catch (err: any) {
          message.error('完成里程碑失败: ' + (err.message || '未知错误'));
          console.error('完成里程碑失败:', err);
        }
      },
    });
  };

  // 获取执行中的里程碑
  const inProgressMilestones = useMemo(() => {
    const milestones = form.values.milestones || [];
    return milestones.filter((m: any) => m?.status === 10); // status=10 执行中
  }, [form.values.milestones]);


  return (
    <Spin spinning={loading}>
      <Card
        className="project-detail-page"
        headStyle={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: '#fff',
        }}
        title="项目详情"
        extra={
          <ToolBar>
            <Button icon={<ArrowLeftOutlined />} onClick={handleGoBack}>
              返回
            </Button>
            {/* 完成/提交按钮 - 项目状态不为30(已完成)时显示 */}
            {form.values.status !== 30 && inProgressMilestones.map((milestone: any, index: number) => (
              <Button
                key={milestone.id || index}
                type="primary"
                icon={<CheckOutlined />}
                onClick={() => handleCompleteMilestone(milestone)}
                disabled={
                  !!milestone?.isApproval &&
                  !!milestone?.workflowInstanceId &&
                  milestone?.workflowStatus !== undefined &&
                  milestone?.workflowStatus !== null &&
                  milestone?.workflowStatus !== 0 &&
                  milestone?.workflowStatus !== 5
                }
              >
                {(
                  !!milestone?.isApproval &&
                  !!milestone?.workflowInstanceId &&
                  milestone?.workflowStatus !== undefined &&
                  milestone?.workflowStatus !== null &&
                  milestone?.workflowStatus !== 0 &&
                  milestone?.workflowStatus !== 5
                )
                  ? '审批中'
                  : (milestone.isApproval ? '提交' : '完成')
                }: {milestone.milestoneName}
              </Button>
            ))}
          </ToolBar>
        }
      >
        <FormProvider form={form}>
          <FormLayoutMode formId={formId} {...schema.form}>
            <SchemaField schema={schema.schema} />
          </FormLayoutMode>
        </FormProvider>

        {/* 隐藏的 FormDialog 组件 - 用于新建任务/风险/问题 */}
        <div style={{ display: 'none' }}>
          <ProjectTaskFormDialog
            getDefaultValues={() => ({
              projectCode: form.values.projectCode,
              '{value:milestoneId,label:milestoneName}': form.values.selectedMilestoneId ? {
                value: form.values.selectedMilestoneId,
                label: form.values.milestones?.find((m: any) => m.id === form.values.selectedMilestoneId)?.milestoneName
              } : undefined
            })}
            title="新建任务"
            onAfterSubmit={async () => {
              // 刷新数据
              if (entityId) {
                const res = await ProjectGetAsync({ id: entityId });
                fullDataRef.current.tasks = res.tasks || [];
                // 重新筛选
                const selectedMilestoneId = form.values.selectedMilestoneId;
                if (selectedMilestoneId) {
                  form.setFieldState('filteredTasks', (state) => {
                    state.value = res.tasks.filter((task: any) => task.milestoneId === selectedMilestoneId);
                  });
                }
              }
            }}
            buttonProps={{ ref: taskDialogButtonRef }}
          >
            新建任务
          </ProjectTaskFormDialog>

          <ProjectRiskFormDialog
            getDefaultValues={() => ({
              projectCode: form.values.projectCode,
              milestoneId: form.values.selectedMilestoneId
            })}
            title="新建风险"
            onAfterSubmit={async () => {
              // 刷新数据
              if (entityId) {
                const res = await ProjectGetAsync({ id: entityId });
                fullDataRef.current.risks = res.risks || [];
                // 重新筛选
                const selectedMilestoneId = form.values.selectedMilestoneId;
                if (selectedMilestoneId) {
                  form.setFieldState('filteredRisks', (state) => {
                    state.value = res.risks.filter((risk: any) => risk.milestoneId === selectedMilestoneId);
                  });
                }
              }
            }}
            buttonProps={{ ref: riskDialogButtonRef }}
          >
            新建风险
          </ProjectRiskFormDialog>

          <ProjectIssueFormDialog
            getDefaultValues={() => ({
              projectCode: form.values.projectCode,
              milestoneId: form.values.selectedMilestoneId
            })}
            title="新建问题"
            onAfterSubmit={async () => {
              // 刷新数据
              if (entityId) {
                const res = await ProjectGetAsync({ id: entityId });
                fullDataRef.current.issues = res.issues || [];
                // 重新筛选
                const selectedMilestoneId = form.values.selectedMilestoneId;
                if (selectedMilestoneId) {
                  form.setFieldState('filteredIssues', (state) => {
                    state.value = res.issues.filter((issue: any) => issue.milestoneId === selectedMilestoneId);
                  });
                }
              }
            }}
            buttonProps={{ ref: issueDialogButtonRef }}
          >
            新建问题
          </ProjectIssueFormDialog>
        </div>
      </Card>
    </Spin>
  );
};

export default ProjectDetail;

export const routeProps = {
  name: '项目详情',
};
