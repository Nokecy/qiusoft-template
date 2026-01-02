import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import {
  ProjectTemplateGetListAsync,
  ProjectTemplateDeleteAsync,
  ProjectTemplateActivateAsync,
  ProjectTemplateDeactivateAsync
} from '@/services/pdm/ProjectTemplate';
import { ProjectCategoryGetTreeAsync } from '@/services/pdm/ProjectCategory';
import { CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space, Tag, Row, Col, Tree } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Access, useAccess, useIntl, useNavigate } from 'umi';
import DeleteConfirm from '@/components/deleteConfirm';
import CollapsibleSidebar from '@/components/CollapsibleSidebar';
import { ProjectTemplatePermissions } from '@/pages/appPdm/_permissions';

type TreeNode = {
  title: string;
  key: string;
  children?: TreeNode[];
  categoryCode?: string;
  items?: any[];
};

// 状态渲染
const StatusRender = (props: ICellRendererParams) => {
  const { value } = props;
  return value ? (
    <Tag color="success">启用</Tag>
  ) : (
    <Tag color="default">停用</Tag>
  );
};

// 操作列渲染
const Options = (props: ICellRendererParams & { onRefresh: () => void }) => {
  const { data, onRefresh } = props;
  const intl = useIntl();
  const access = useAccess();
  const navigate = useNavigate();

  const canUpdate = !!(access && access[ProjectTemplatePermissions.Update]);
  const canDelete = !!(access && access[ProjectTemplatePermissions.Delete]);

  const handleDelete = (id: any) => {
    const hide = message.loading('正在操作,请稍后', 0);
    return ProjectTemplateDeleteAsync({ id }).then(() => onRefresh()).finally(() => hide());
  };

  const handleToggleActive = (id: any, isActive: boolean) => {
    const hide = message.loading('正在操作,请稍后', 0);
    const action = isActive ? ProjectTemplateDeactivateAsync : ProjectTemplateActivateAsync;
    return action({ id }).then(() => {
      message.success('操作成功');
      onRefresh();
    }).finally(() => hide());
  };

  const handleEdit = (id: any) => {
    navigate(`/appPdm/ProjectManagement/TemplateList/Edit?id=${id}`);
  };

  const handleView = (id: any) => {
    navigate(`/appPdm/ProjectManagement/TemplateList/Edit?id=${id}&mode=view`);
  };

  return (
    <Space>
      <Button
        size={'small'}
        icon={<EyeOutlined />}
        type={'link'}
        title="查看"
        onClick={() => handleView(data.id)}
      />

      <Access accessible={canUpdate}>
        <Button
          size={'small'}
          icon={<EditOutlined />}
          type={'link'}
          title={intl.formatMessage({ id: 'AbpUi:Edit' })}
          onClick={() => handleEdit(data.id)}
        />
      </Access>

      <Access accessible={canUpdate}>
        {data.isActive ? (
          <Button
            size={'small'}
            icon={<CloseOutlined />}
            type={'link'}
            title="停用"
            onClick={() => handleToggleActive(data.id, true)}
          />
        ) : (
          <Button
            size={'small'}
            icon={<CheckOutlined />}
            type={'link'}
            title="启用"
            onClick={() => handleToggleActive(data.id, false)}
          />
        )}
      </Access>

      <Access accessible={canDelete}>
        <DeleteConfirm title="确定删除?" onConfirm={() => handleDelete(data.id)}>
          <Button size={'small'} icon={<DeleteOutlined />} type={'link'} title={intl.formatMessage({ id: 'AbpUi:Delete' })} />
        </DeleteConfirm>
      </Access>
    </Space>
  );
};

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

const ProjectTemplatePage: React.FC<any> = () => {
  const gridRef = useRef<GridRef>();
  const intl = useIntl();
  const access = useAccess();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [treeData, setTreeData] = useState<TreeNode[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const canCreate = !!(access && access[ProjectTemplatePermissions.Create]);

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

  useEffect(() => {
    gridRef.current?.onRefresh();
  }, [selectedCategory]);

  const onRefresh = () => {
    gridRef.current?.onRefresh();
  };

  // 检查选中的分类是否可以创建模板(必须选择叶子节点且不能选择"全部")
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

    // 如果找到节点且该节点有子节点,则不允许创建
    if (selectedNode && selectedNode.children && selectedNode.children.length > 0) {
      message.warning('只能在叶子节点分类下创建模板,请选择更具体的分类');
      return false;
    }

    return true;
  };

  // 处理新建模板按钮点击
  const handleCreateTemplate = () => {
    if (!checkCategoryForCreate()) {
      return;
    }
    const categoryParam = selectedCategory && selectedCategory !== 'all' ? `categoryCode=${selectedCategory}` : '';
    navigate(`/appPdm/ProjectManagement/TemplateList/Edit${categoryParam ? '?' + categoryParam : ''}`);
  };

  return (
    <Row gutter={16} style={{ height: '100%' }}>
      <Col flex="none">
        <CollapsibleSidebar
          title="项目分类"
          storageKey="project-template-category-collapsed"
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
      </Col>
      <Col flex="auto">
        <AgGridPlus
          gridRef={gridRef}
          headerTitle={'项目模板'}
          gridKey="appPdm.ProjectManagement.ProjectTemplate"
          request={async (params?: { pageSize: number; current: number; [key: string]: any }) => {
            // 构建筛选条件
            let filter = params?.filter || '';
            if (selectedCategory && selectedCategory !== 'all') {
              filter = filter ? `${filter},categoryCode=${selectedCategory}` : `categoryCode=${selectedCategory}`;
            }

            const data = await ProjectTemplateGetListAsync(
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
                  onClick={handleCreateTemplate}
                >
                  新建
                </Button>
              </Access>,
            ];
          }}
        >
          <AgGridColumn field={'templateCode'} headerName={'模板编码'} width={150} />
          <AgGridColumn field={'templateName'} headerName={'模板名称'} width={200} />
          <AgGridColumn field={'categoryCode'} headerName={'项目分类'} width={150} hideInSearch={true} />
          <AgGridColumn field={'isActive'} headerName={'状态'} width={100} hideInSearch={true} cellRenderer={StatusRender} />
          <AgGridColumn field={'description'} headerName={'描述'} width={220} hideInSearch={true} flex={1} />
          <AgGridColumn
            field={'action'}
            headerName={intl.formatMessage({ id: 'AbpUi:Actions' })}
            width={150}
            pinned={'right'}
            filter={false}
            sortable={false}
            cellRenderer={Options}
            cellRendererParams={{ onRefresh }}
          />
        </AgGridPlus>
      </Col>
    </Row>
  );
};

export default ProjectTemplatePage;

export const routeProps = {
  name: '项目模板管理',
};
