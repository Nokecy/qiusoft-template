import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import {
  ProjectGetListAsync,
  ProjectDeleteAsync,
  ProjectStartAsync,
  ProjectPauseAsync,
  ProjectResumeAsync,
  ProjectCompleteAsync,
  ProjectCancelAsync,
  ProjectArchiveAsync
} from '@/services/pdm/Project';
import { ProjectCategoryGetTreeAsync } from '@/services/pdm/ProjectCategory';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  InboxOutlined,
  AppstoreOutlined,
  BarsOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space, Dropdown, Tag, Row, Col, Card, Tree, Tabs, Spin, Pagination, Empty } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Access, useAccess, useIntl, useNavigate } from 'umi';
// import ProjectFormDialog from './components/ProjectFormDialog'; // 已改为页面跳转方式
import ProjectCard from './components/ProjectCard';
import DeleteConfirm from '@/components/deleteConfirm';
import CollapsibleSidebar from '@/components/CollapsibleSidebar';
import { ProjectPermissions } from '@/pages/appPdm/_permissions';
import type { DefaultOptionType } from 'antd/es/select';
import './index.less';

type TreeNode = {
  title: string;
  key: string;
  children?: TreeNode[];
  categoryCode?: string;
  items?: any[];
};

// 状态枚举 - 与后端 BurnAbpPdmProjectsProjectStatus 保持一致
const ProjectStatus = {
  Planning: 0,      // 计划中
  InProgress: 10,   // 进行中
  Paused: 20,       // 已暂停
  Completed: 30,    // 已完成
  Cancelled: 40,    // 已取消
};

const projectStatusEnum = [
  { label: '计划中', value: ProjectStatus.Planning, color: 'default' },
  { label: '进行中', value: ProjectStatus.InProgress, color: 'processing' },
  { label: '已暂停', value: ProjectStatus.Paused, color: 'warning' },
  { label: '已完成', value: ProjectStatus.Completed, color: 'success' },
  { label: '已取消', value: ProjectStatus.Cancelled, color: 'error' },
];

// 状态渲染
const StatusRender = (props: ICellRendererParams) => {
  const { value } = props;
  const status = projectStatusEnum.find(s => s.value === value);
  return status ? <Tag color={status.color}>{status.label}</Tag> : <Tag>{value}</Tag>;
};

// 项目编码渲染（点击进入复制编辑页）- 需要通过cellRendererParams传入navigate函数
const CodeRender = (props: ICellRendererParams & { navigate?: any }) => {
  const { data, value, navigate } = props;

  const handleClick = () => {
    if (data?.id && navigate) {
      navigate(`/appPdm/ProjectManagement/ProjectList/Detail?id=${data.id}`);
    }
  };

  return (
    <Button
      type="link"
      size="small"
      style={{ padding: 0, height: 'auto' }}
      onClick={handleClick}
    >
      {value}
    </Button>
  );
};

// 操作列渲染
const Options = (props: ICellRendererParams & { onRefresh: () => void }) => {
  const { data, onRefresh } = props;
  const intl = useIntl();
  const access = useAccess();
  const navigate = useNavigate();

  const canUpdate = !!(access && access[ProjectPermissions.Update]);
  const canDelete = !!(access && access[ProjectPermissions.Delete]);

  const handleDelete = (id: any) => {
    const hide = message.loading('正在操作,请稍后', 0);
    return ProjectDeleteAsync({ id }).then(() => onRefresh()).finally(() => hide());
  };

  const handleAction = (id: any, action: any, actionName: string) => {
    const hide = message.loading('正在操作,请稍后', 0);
    return action({ id })
      .then(() => {
        message.success(`${actionName}成功`);
        onRefresh();
      })
      .finally(() => hide());
  };

  const getActionMenuItems = () => {
    const items = [];
    const status = data.status;

    if (status === ProjectStatus.Planning) {
      items.push({
        key: 'start',
        label: '启动项目',
        icon: <PlayCircleOutlined />,
        onClick: () => handleAction(data.id, ProjectStartAsync, '启动'),
      });
    }

    if (status === ProjectStatus.InProgress) {
      items.push({
        key: 'pause',
        label: '暂停项目',
        icon: <PauseCircleOutlined />,
        onClick: () => handleAction(data.id, ProjectPauseAsync, '暂停'),
      });
      items.push({
        key: 'complete',
        label: '完成项目',
        icon: <CheckCircleOutlined />,
        onClick: () => handleAction(data.id, ProjectCompleteAsync, '完成'),
      });
    }

    if (status === ProjectStatus.Paused) {
      items.push({
        key: 'resume',
        label: '恢复项目',
        icon: <PlayCircleOutlined />,
        onClick: () => handleAction(data.id, ProjectResumeAsync, '恢复'),
      });
    }

    if ([ProjectStatus.Planning, ProjectStatus.InProgress, ProjectStatus.Paused].includes(status)) {
      items.push({
        key: 'cancel',
        label: '取消项目',
        icon: <CloseCircleOutlined />,
        onClick: () => handleAction(data.id, ProjectCancelAsync, '取消'),
      });
    }

    if (status === ProjectStatus.Completed) {
      items.push({
        key: 'archive',
        label: '归档项目',
        icon: <InboxOutlined />,
        onClick: () => handleAction(data.id, ProjectArchiveAsync, '归档'),
      });
    }

    return items;
  };

  const actionItems = getActionMenuItems();

  return (
    <Space>
      <Access accessible={canUpdate}>
        <Button
          size={'small'}
          icon={<EditOutlined />}
          type={'link'}
          title={intl.formatMessage({ id: 'AbpUi:Edit' })}
          onClick={() => navigate(`/appPdm/ProjectManagement/ProjectList/Edit?id=${data.id}`)}
        />
      </Access>

      {actionItems.length > 0 && (
        <Access accessible={canUpdate}>
          <Dropdown menu={{ items: actionItems }} placement="bottomRight">
            <Button size={'small'} type={'link'}>
              操作
            </Button>
          </Dropdown>
        </Access>
      )}

      <Access accessible={canDelete}>
        <DeleteConfirm title="确定删除?" onConfirm={() => {
          console.log('🚀 列表视图删除按钮 onConfirm 被触发', data.id);
          return handleDelete(data.id);
        }}>
          <Button size={'small'} icon={<DeleteOutlined />} type={'link'} title={intl.formatMessage({ id: 'AbpUi:Delete' })} />
        </DeleteConfirm>
      </Access>
    </Space>
  );
};

// 树数据转换函数
const toTreeData = (items?: any[]): TreeNode[] => {
  if (!items || !items.length) return [];
  return items.map(node => {
    // 构建显示文本：名称 (编码)
    let title = '-';
    if (node.name && node.code) {
      title = `${node.name} (${node.code})`;
    } else if (node.name) {
      title = node.name;
    } else if (node.code) {
      title = node.code;
    }

    return {
      title,
      key: node.code as string,
      categoryCode: node.code,
      children: toTreeData(node.children),
    };
  });
};

const ProjectPage: React.FC<any> = () => {
  const gridRef = useRef<GridRef>();
  const intl = useIntl();
  const access = useAccess();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<string>('all');
  const [treeData, setTreeData] = useState<TreeNode[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card'); // 视图模式：卡片或列表
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 12 });
  const canCreate = !!(access && access[ProjectPermissions.Create]);

  // 加载分类树数据
  const loadCategoryTree = () => {
    ProjectCategoryGetTreeAsync()
      .then(res => {
        const tree = toTreeData(res);
        setTreeData(tree);
        // 默认展开所有节点
        const allKeys = getAllKeys(tree);
        setExpandedKeys(allKeys);
        message.success('刷新成功');
      })
      .catch(() => {
        message.error('加载分类树失败');
      });
  };

  // 加载项目分类树
  useEffect(() => {
    loadCategoryTree();
  }, []);

  const getAllKeys = (nodes: TreeNode[]): string[] => {
    let keys: string[] = [];
    nodes.forEach(node => {
      keys.push(node.key);
      if (node.children && node.children.length > 0) {
        keys = keys.concat(getAllKeys(node.children));
      }
    });
    return keys;
  };

  // 加载项目数据（用于卡片视图）
  const loadProjects = async (page = 1, pageSize = 12) => {
    setLoading(true);
    try {
      // 构建筛选条件
      let filter = '';

      // 添加分类筛选
      if (selectedCategory && selectedCategory !== 'all') {
        filter = filter ? `${filter},projectCategoryCode=${selectedCategory}` : `projectCategoryCode=${selectedCategory}`;
      }

      // 添加Tab状态筛选
      if (activeTab === 'planning') {
        filter = filter ? `${filter},status=${ProjectStatus.Planning}` : `status=${ProjectStatus.Planning}`;
      } else if (activeTab === 'inProgress') {
        filter = filter ? `${filter},status=${ProjectStatus.InProgress}` : `status=${ProjectStatus.InProgress}`;
      } else if (activeTab === 'completed') {
        filter = filter ? `${filter},status=${ProjectStatus.Completed}` : `status=${ProjectStatus.Completed}`;
      } else if (activeTab === 'my') {
        filter = filter ? `${filter},isMyProject=true` : `isMyProject=true`;
      }

      const data = await ProjectGetListAsync({
        Filter: filter,
        SkipCount: (page - 1) * pageSize,
        MaxResultCount: pageSize,
        Sorting: 'creationTime desc',
      } as any);

      setProjects(data.items || []);
      setTotal(data.totalCount || 0);
      setPagination({ current: page, pageSize });
    } catch (error) {
      message.error('加载项目数据失败');
    } finally {
      setLoading(false);
    }
  };

  // 当分类或Tab切换时刷新列表
  useEffect(() => {
    if (viewMode === 'card') {
      loadProjects(1, pagination.pageSize);
    } else {
      gridRef.current?.onRefresh();
    }
  }, [selectedCategory, activeTab, viewMode]);

  const onRefresh = () => {
    if (viewMode === 'card') {
      loadProjects(pagination.current, pagination.pageSize);
    } else {
      gridRef.current?.onRefresh();
    }
  };

  // Tab配置
  const tabItems = [
    { key: 'all', label: '全部项目' },
    { key: 'my', label: '我的项目' },
    { key: 'planning', label: '未开始', status: ProjectStatus.Planning },
    { key: 'inProgress', label: '进行中', status: ProjectStatus.InProgress },
    { key: 'completed', label: '已完成', status: ProjectStatus.Completed },
  ];

  // 处理删除操作
  const handleDelete = (id: any) => {
    const hide = message.loading('正在操作,请稍后', 0);
    return ProjectDeleteAsync({ id })
      .then(() => {
        message.success('删除成功');
        onRefresh();
      })
      .finally(() => hide());
  };

  // 处理项目操作（启动、暂停、完成等）
  const handleAction = (id: any, actionType: string, actionName: string) => {
    const hide = message.loading('正在操作,请稍后', 0);

    const actionMap: Record<string, any> = {
      start: ProjectStartAsync,
      pause: ProjectPauseAsync,
      resume: ProjectResumeAsync,
      complete: ProjectCompleteAsync,
      cancel: ProjectCancelAsync,
      archive: ProjectArchiveAsync,
    };

    const action = actionMap[actionType];
    if (!action) return;

    return action({ id })
      .then(() => {
        message.success(`${actionName}成功`);
        onRefresh();
      })
      .finally(() => hide());
  };

  // 检查选中的分类是否可以创建项目（必须选择叶子节点且不能选择"全部"）
  const checkCategoryForCreate = (): boolean => {
    // 未选择或选择"全部"时不允许创建
    if (!selectedCategory || selectedCategory === 'all') {
      message.warning('请先选择具体的项目分类');
      return false;
    }

    // 递归查找选中的节点
    const findNode = (nodes: TreeNode[], key: string): TreeNode | null => {
      for (const node of nodes) {
        if (node.key === key) {
          return node;
        }
        if (node.children) {
          const found = findNode(node.children, key);
          if (found) return found;
        }
      }
      return null;
    };

    const selectedNode = findNode(treeData, selectedCategory);

    // 如果找到节点且该节点有子节点，则不允许创建
    if (selectedNode && selectedNode.children && selectedNode.children.length > 0) {
      message.warning('只能在叶子节点分类下创建项目，请选择更具体的分类');
      return false;
    }

    return true;
  };

  // 处理新建项目按钮点击
  const handleCreateProject = () => {
    if (!checkCategoryForCreate()) {
      return;
    }
    const categoryParam = selectedCategory && selectedCategory !== 'all' ? `projectCategoryCode=${selectedCategory}` : '';
    navigate(`/appPdm/ProjectManagement/ProjectList/Edit${categoryParam ? '?' + categoryParam : ''}`);
  };

  return (
    <div style={{ height: 'calc(100vh - 120px)', display: 'flex', overflow: 'hidden' }}>
      {/* 左侧分类树 */}
      <div style={{ flexShrink: 0 }}>
        <CollapsibleSidebar
          title="项目分类"
          storageKey="project-management-category-collapsed"
          extra={
            <Button
              type="text"
              size="small"
              icon={<ReloadOutlined />}
              onClick={loadCategoryTree}
              title="刷新分类"
            />
          }
        >
          <Tree
            showLine
            defaultExpandAll
            expandedKeys={expandedKeys}
            onExpand={(keys) => setExpandedKeys(keys as string[])}
            selectedKeys={selectedCategory ? [selectedCategory] : []}
            onSelect={(keys) => {
              const key = keys[0] as string;
              if (key) {
                setSelectedCategory(key);
              }
            }}
            treeData={[
              {
                title: '全部',
                key: 'all',
              },
              ...treeData
            ]}
          />
        </CollapsibleSidebar>
      </div>

      {/* 右侧主内容区 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', marginLeft: 16 }}>
        <div style={{ flex: '0 0 auto', marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={tabItems}
            style={{ flex: 1 }}
          />
          <Space>
            <Button
              type={viewMode === 'card' ? 'primary' : 'default'}
              icon={<AppstoreOutlined />}
              onClick={() => setViewMode('card')}
            >
              卡片视图
            </Button>
            <Button
              type={viewMode === 'list' ? 'primary' : 'default'}
              icon={<BarsOutlined />}
              onClick={() => setViewMode('list')}
            >
              列表视图
            </Button>
          </Space>
        </div>

        <div style={{ flex: '1 1 auto', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {viewMode === 'card' ? (
            <Card
              size="small"
              style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
              bodyStyle={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '12px' }}
              title={
                <Space>
                  <span>项目列表</span>
                  <Tag color="blue">{total} 个项目</Tag>
                </Space>
              }
              extra={
                <Space>
                  <Button
                    icon={<ReloadOutlined />}
                    onClick={onRefresh}
                  >
                    刷新
                  </Button>
                  <Access accessible={canCreate}>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={handleCreateProject}
                    >
                      新建
                    </Button>
                  </Access>
                </Space>
              }
            >
              <Spin spinning={loading} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ flex: 1, overflowY: 'auto', marginBottom: 8 }}>
                  {projects.length > 0 ? (
                    <Row gutter={[16, 16]}>
                      {projects.map((project) => (
                        <Col key={project.id} xs={24} sm={12} md={12} lg={8} xl={6}>
                          <ProjectCard
                            data={project}
                            onRefresh={onRefresh}
                            onDelete={handleDelete}
                            onAction={handleAction}
                          />
                        </Col>
                      ))}
                    </Row>
                  ) : (
                    <Empty description="暂无项目数据" style={{ padding: '60px 0' }} />
                  )}
                </div>
                {total > 0 && (
                  <div style={{
                    flex: '0 0 auto',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    paddingTop: 12,
                    paddingRight: 8,
                    borderTop: '1px solid #f0f0f0'
                  }}>
                    <Pagination
                      current={pagination.current}
                      pageSize={pagination.pageSize}
                      total={total}
                      showSizeChanger
                      showQuickJumper
                      showTotal={(total) => `共 ${total} 条`}
                      onChange={(page, pageSize) => loadProjects(page, pageSize)}
                      pageSizeOptions={['12', '24', '36', '48']}
                    />
                  </div>
                )}
              </Spin>
            </Card>
          ) : (
            <AgGridPlus
              gridRef={gridRef}
              headerTitle={'项目管理'}
              gridKey="appPdm.ProjectManagement.Project"
              request={async (params?: { pageSize: number; current: number; [key: string]: any }) => {
                // 构建筛选条件
                let filter = params?.filter || '';

                // 添加分类筛选
                if (selectedCategory && selectedCategory !== 'all') {
                  filter = filter ? `${filter},projectCategoryCode=${selectedCategory}` : `projectCategoryCode=${selectedCategory}`;
                }

                // 添加Tab状态筛选
                const currentTab = tabItems.find(t => t.key === activeTab);
                if (currentTab && currentTab.status !== undefined) {
                  filter = filter ? `${filter},status=${currentTab.status}` : `status=${currentTab.status}`;
                } else if (activeTab === 'my') {
                  // 我的项目：筛选当前用户为项目经理的项目
                  filter = filter ? `${filter},isMyProject=true` : `isMyProject=true`;
                }

                const data = await ProjectGetListAsync(
                  {
                    Filter: filter,
                    SkipCount: params?.skipCount,
                    MaxResultCount: params?.maxResultCount,
                    Sorting: params?.sorter,
                  } as any,
                );
                return { success: true, data: data.items || [], total: data.totalCount || 0 } as any;
              }}
              rowSelection={'multiple'}
              rowMultiSelectWithClick={true}
              toolBarRender={() => {
                return [
                  <Access accessible={canCreate}>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={handleCreateProject}
                    >
                      新建
                    </Button>
                  </Access>,
                ];
              }}
            >
              <AgGridColumn field={'projectCode'} headerName={'项目编码'} width={150} cellRenderer={CodeRender} cellRendererParams={{ navigate }} />
              <AgGridColumn field={'projectName'} headerName={'项目名称'} width={200} />
              <AgGridColumn field={'shortName'} headerName={'项目简称'} width={150} hideInSearch={true} />
              <AgGridColumn field={'projectCategoryCode'} headerName={'项目分类编码'} width={150} hideInSearch={true} />
              <AgGridColumn field={'materialCode'} headerName={'关联物料编码'} width={150} hideInSearch={true} />
              <AgGridColumn field={'materialName'} headerName={'关联物料名称'} width={150} hideInSearch={true} />
              <AgGridColumn field={'projectManagerName'} headerName={'项目经理'} width={120} hideInSearch={true} />
              <AgGridColumn field={'status'} headerName={'状态'} width={100} hideInSearch={true} cellRenderer={StatusRender} valueEnum={projectStatusEnum} />
              <AgGridColumn field={'plannedStartDate'} headerName={'计划开始日期'} width={120} hideInSearch={true} />
              <AgGridColumn field={'plannedEndDate'} headerName={'计划结束日期'} width={120} hideInSearch={true} />
              <AgGridColumn field={'actualStartDate'} headerName={'实际开始日期'} width={120} hideInSearch={true} />
              <AgGridColumn field={'actualEndDate'} headerName={'实际结束日期'} width={120} hideInSearch={true} />
              <AgGridColumn field={'priority'} headerName={'优先级'} width={100} hideInSearch={true} />
              <AgGridColumn
                field={'action'}
                headerName={intl.formatMessage({ id: 'AbpUi:Actions' })}
                width={180}
                pinned={'right'}
                filter={false}
                sortable={false}
                cellRenderer={Options}
                cellRendererParams={{ onRefresh }}
              />
            </AgGridPlus>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;

export const routeProps = {
  name: '项目管理',
};
