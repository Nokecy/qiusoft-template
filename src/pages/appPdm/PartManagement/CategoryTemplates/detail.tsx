import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { history, useAccess, useIntl, Access } from 'umi';
import { useKeepAliveParams } from '@/hooks';
import {
  CategoryLevelTemplateGetAsync,
  CategoryLevelTemplateDeleteLevelAsync,
  CategoryLevelTemplateDeleteItemAsync,
} from '@/services/pdm/CategoryLevelTemplate';
import { AgGridPlus } from '@/components/agGrid';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import {
  Card,
  Descriptions,
  Button,
  Space,
  List,
  Tag,
  Typography,
  message,
  Spin,
  Empty,
} from 'antd';
import {
  ArrowLeftOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import DeleteConfirm from '@/components/deleteConfirm';
import { CategoryLevelTemplatePermissions } from '@/pages/appPdm/_permissions';
import TemplateFormDialog from './components/TemplateFormDialog';
import LevelFormDialog from './components/LevelFormDialog';
import ItemFormDialog from './components/ItemFormDialog';
import PreviewDialog from './components/PreviewDialog';
import { versionNumberStyleOptions } from './_enums';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

// 类型定义
type TemplateDto = API.BurnAbpPdmPartManagementCategoryTemplatesDtosCategoryLevelTemplateDto;
type LevelDto = API.BurnAbpPdmPartManagementCategoryTemplatesDtosCategoryLevelDto;
type ItemDto = API.BurnAbpPdmPartManagementCategoryTemplatesDtosCategoryLevelItemDto;

// 候选项操作列
const ItemOptions = (props: ICellRendererParams & {
  templateId: number;
  levelId: number;
  parentLevelItems: ItemDto[];
  onRefresh: () => void;
}) => {
  const { data, node, api, templateId, levelId, parentLevelItems, onRefresh } = props;
  const intl = useIntl();
  const access = useAccess();

  const canUpdate = !!(access && (access[CategoryLevelTemplatePermissions.Update] ?? true));
  const canDelete = !!(access && (access[CategoryLevelTemplatePermissions.Delete] ?? true));

  // 获取最新的行数据（从 AG-Grid API）
  const getLatestData = () => {
    // 优先从 node 获取最新数据，如果 node 不存在则使用 props.data
    return node?.data || data;
  };

  const handleDelete = async () => {
    const currentData = getLatestData();
    const hide = message.loading('正在删除...', 0);
    try {
      await CategoryLevelTemplateDeleteItemAsync({ templateId, levelId, itemId: currentData.id });
      message.success('删除成功');
      onRefresh();
    } catch (error) {
      message.error('删除失败');
    } finally {
      hide();
    }
  };

  return (
    <Space>
      <Access accessible={canUpdate}>
        <ItemFormDialog
          templateId={templateId}
          levelId={levelId}
          entityId={data.id}
          getInitialValues={getLatestData}
          parentLevelItems={parentLevelItems}
          onAfterSubmit={onRefresh}
          buttonProps={{ icon: <EditOutlined />, type: 'link', size: 'small', title: intl.formatMessage({ id: 'AbpUi:Edit' }) }}
        />
      </Access>
      <Access accessible={canDelete}>
        <DeleteConfirm title="确定删除此候选项?" onConfirm={handleDelete}>
          <Button size={'small'} icon={<DeleteOutlined />} type={'link'} title={intl.formatMessage({ id: 'AbpUi:Delete' })} />
        </DeleteConfirm>
      </Access>
    </Space>
  );
};

const CategoryTemplateDetailPage: React.FC = () => {
  const { params, isActive, hasChanged } = useKeepAliveParams('/appPdm/PartManagement/CategoryTemplates/detail');
  const intl = useIntl();
  const access = useAccess();
  const gridRef = useRef<GridRef>();

  // 状态
  const [loading, setLoading] = useState(false);
  const [templateData, setTemplateData] = useState<TemplateDto | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<LevelDto | null>(null);
  const [previousId, setPreviousId] = useState<string>('');

  // 权限
  const canUpdate = !!(access && (access[CategoryLevelTemplatePermissions.Update] ?? true));
  const canDelete = !!(access && (access[CategoryLevelTemplatePermissions.Delete] ?? true));
  const canGenerate = !!(access && (access[CategoryLevelTemplatePermissions.Generate] ?? true));

  // 加载模板详情
  const loadTemplate = useCallback(async (id: string, keepSelectedLevel: boolean = false) => {
    if (!id) {
      message.error('参数缺失');
      history.push('/appPdm/PartManagement/CategoryTemplates');
      return;
    }

    setLoading(true);
    try {
      const result = await CategoryLevelTemplateGetAsync({ id: Number(id) });
      setTemplateData(result);

      // 处理层级选择
      if (result?.levels && result.levels.length > 0) {
        const sortedLevels = [...result.levels].sort((a, b) => (a.levelOrder || 0) - (b.levelOrder || 0));

        if (keepSelectedLevel && selectedLevel) {
          // 刷新时保持当前选中的层级，从新数据中找到对应的层级
          const currentLevel = sortedLevels.find((l) => l.id === selectedLevel.id);
          if (currentLevel) {
            setSelectedLevel(currentLevel);
          } else {
            // 如果当前选中的层级已被删除，则选中第一个
            setSelectedLevel(sortedLevels[0]);
          }
        } else {
          // 首次加载时默认选中第一个层级
          setSelectedLevel(sortedLevels[0]);
        }
      } else {
        setSelectedLevel(null);
      }
    } catch (error) {
      message.error('加载模板详情失败');
    } finally {
      setLoading(false);
    }
  }, [selectedLevel]);

  // 监听 URL 参数变化 (KeepAlive 多 Tab 支持)
  useEffect(() => {
    const id = params.id as string;

    if (!isActive || !hasChanged) return;

    if (id && id !== previousId) {
      setPreviousId(id);
      loadTemplate(id);
    }
  }, [params, loadTemplate, previousId, isActive, hasChanged]);

  // 刷新数据（保持当前选中的层级）
  const handleRefresh = useCallback(() => {
    const id = params.id as string;
    if (id) {
      loadTemplate(id, true);
    }
  }, [params, loadTemplate]);

  // 获取排序后的层级列表
  const sortedLevels = useMemo(() => {
    if (!templateData?.levels) return [];
    return [...templateData.levels].sort((a, b) => (a.levelOrder || 0) - (b.levelOrder || 0));
  }, [templateData?.levels]);

  // 获取上一层级的候选项（用于配置 allowedParentCodes）
  const parentLevelItems = useMemo((): ItemDto[] => {
    if (!selectedLevel || !sortedLevels.length) return [];
    const currentIndex = sortedLevels.findIndex((l) => l.id === selectedLevel.id);
    if (currentIndex <= 0) return [];
    const parentLevel = sortedLevels[currentIndex - 1];
    return parentLevel?.items || [];
  }, [selectedLevel, sortedLevels]);

  // 候选项列定义
  const columnDefs: any = useMemo(
    () => [
      { field: 'itemCode', headerName: '代码', width: 120 },
      { field: 'itemName', headerName: '名称', width: 150 },
      {
        field: 'allowedParentCodes',
        headerName: '允许的父项',
        width: 200,
        cellRenderer: (params: any) => {
          const codes = params.value as string[] | undefined;
          if (!codes || codes.length === 0) return <Tag color="green">全部</Tag>;
          return codes.map((code) => <Tag key={code}>{code}</Tag>);
        },
      },
      { field: 'sortOrder', headerName: '排序', width: 80, hideInSearch: true },
      { field: 'partNumberPrefix', headerName: '物料号前缀', width: 120 },
      {
        field: 'isCodeParticipant',
        headerName: '参与编码',
        width: 100,
        hideInSearch: true,
        cellRenderer: (params: any) => (params.value ? <Tag color="blue">是</Tag> : <Tag>否</Tag>),
      },
      { field: 'codeSeparator', headerName: '分隔符', width: 80, hideInSearch: true },
      {
        field: 'isActive',
        headerName: '启用',
        width: 80,
        cellRenderer: (params: any) => (params.value ? <Tag color="green">是</Tag> : <Tag color="red">否</Tag>),
      },
      {
        field: 'versionNumberStyle',
        headerName: '版本号样式',
        width: 120,
        hideInSearch: true,
        cellRenderer: (params: any) => {
          const option = versionNumberStyleOptions.find((o) => o.value === params.value);
          return option?.label || '-';
        },
      },
      { field: 'memo', headerName: '备注', width: 150, hideInSearch: true },
      {
        field: 'action',
        headerName: intl.formatMessage({ id: 'AbpUi:Actions' }),
        width: 120,
        pinned: 'right',
        filter: false,
        sortable: false,
        cellRenderer: ItemOptions,
        cellRendererParams: {
          templateId: templateData?.id,
          levelId: selectedLevel?.id,
          parentLevelItems,
          onRefresh: handleRefresh,
        },
      },
    ],
    [intl, templateData?.id, selectedLevel?.id, parentLevelItems, handleRefresh]
  );

  // 删除层级
  const handleDeleteLevel = async (levelId: number) => {
    if (!templateData?.id) return;
    const hide = message.loading('正在删除...', 0);
    try {
      await CategoryLevelTemplateDeleteLevelAsync({ templateId: templateData.id, levelId });
      message.success('删除成功');
      handleRefresh();
    } catch (error) {
      message.error('删除失败');
    } finally {
      hide();
    }
  };

  // 返回列表
  const handleBack = () => {
    history.push('/appPdm/PartManagement/CategoryTemplates');
  };

  if (loading && !templateData) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!templateData) {
    return (
      <div style={{ padding: 24 }}>
        <Empty description="模板不存在" />
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Button type="primary" onClick={handleBack}>
            返回列表
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 16, height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 顶部操作栏 */}
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Space>
          <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
            返回列表
          </Button>
          <Title level={4} style={{ margin: 0 }}>
            {templateData.templateName}
          </Title>
          {templateData.isActive ? <Tag color="green">启用</Tag> : <Tag color="red">禁用</Tag>}
        </Space>
        <Space>
          <Access accessible={canUpdate}>
            <TemplateFormDialog
              entityId={templateData.id}
              onAfterSubmit={handleRefresh}
              buttonProps={{ icon: <EditOutlined /> }}
            >
              编辑模板
            </TemplateFormDialog>
          </Access>
          <Access accessible={canGenerate}>
            <PreviewDialog
              templateId={templateData.id!}
              templateName={templateData.templateName}
              onAfterGenerate={handleRefresh}
              trigger={
                <Button type="primary" icon={<ThunderboltOutlined />}>
                  预览生成
                </Button>
              }
            />
          </Access>
        </Space>
      </div>

      {/* 模板基本信息 */}
      <Card size="small" style={{ marginBottom: 16 }}>
        <Descriptions column={4} size="small">
          <Descriptions.Item label="模板描述">{templateData.description || '-'}</Descriptions.Item>
          <Descriptions.Item label="默认分隔符">{templateData.defaultSeparator || '-'}</Descriptions.Item>
          <Descriptions.Item label="创建时间">
            {templateData.creationTime ? dayjs(templateData.creationTime).format('YYYY-MM-DD HH:mm') : '-'}
          </Descriptions.Item>
          <Descriptions.Item label="最后修改">
            {templateData.lastModificationTime ? dayjs(templateData.lastModificationTime).format('YYYY-MM-DD HH:mm') : '-'}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {/* 主体区域：左侧层级列表 + 右侧候选项列表 */}
      <div style={{ display: 'flex', gap: 16, flex: 1, minHeight: 0 }}>
        {/* 左侧：层级定义列表 */}
        <div
          style={{
            width: 320,
            minWidth: 280,
            border: '1px solid #f0f0f0',
            borderRadius: 6,
            backgroundColor: '#fafafa',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              padding: '12px 16px',
              borderBottom: '1px solid #e8e8e8',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text strong>层级定义</Text>
            <Access accessible={canUpdate}>
              <LevelFormDialog
                templateId={templateData.id!}
                onAfterSubmit={handleRefresh}
                buttonProps={{ icon: <PlusOutlined />, size: 'small', type: 'primary' }}
              >
                添加层级
              </LevelFormDialog>
            </Access>
          </div>
          <div style={{ flex: 1, overflow: 'auto', padding: '8px 0' }}>
            {sortedLevels.length === 0 ? (
              <Empty description="暂无层级定义" style={{ marginTop: 40 }} />
            ) : (
              <List
                dataSource={sortedLevels}
                renderItem={(level) => (
                  <List.Item
                    style={{
                      padding: '8px 16px',
                      cursor: 'pointer',
                      backgroundColor: selectedLevel?.id === level.id ? '#e6f7ff' : 'transparent',
                      borderLeft: selectedLevel?.id === level.id ? '3px solid #1890ff' : '3px solid transparent',
                    }}
                    onClick={() => setSelectedLevel(level)}
                    actions={[
                      <Access key="edit" accessible={canUpdate}>
                        <LevelFormDialog
                          templateId={templateData.id!}
                          entityId={level.id}
                          initialValues={level}
                          onAfterSubmit={handleRefresh}
                          buttonProps={{ icon: <EditOutlined />, type: 'link', size: 'small' }}
                        />
                      </Access>,
                      <Access key="delete" accessible={canDelete}>
                        <DeleteConfirm
                          title="删除层级将同时删除其下所有候选项，确定删除?"
                          onConfirm={() => handleDeleteLevel(level.id!)}
                        >
                          <Button icon={<DeleteOutlined />} type="link" size="small" danger />
                        </DeleteConfirm>
                      </Access>,
                    ]}
                  >
                    <List.Item.Meta
                      title={
                        <Space>
                          <Tag color="blue">第{level.levelOrder}级</Tag>
                          <Text>{level.levelName}</Text>
                        </Space>
                      }
                      description={
                        <Space size="small">
                          <Text type="secondary">
                            候选项: {level.items?.length || 0}
                          </Text>
                          {level.isCodeParticipant && <Tag>参与编码</Tag>}
                        </Space>
                      }
                    />
                  </List.Item>
                )}
              />
            )}
          </div>
        </div>

        {/* 右侧：候选项列表 */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {selectedLevel ? (
            <AgGridPlus
              gridRef={gridRef}
              headerTitle={`${selectedLevel.levelName} - 候选项列表`}
              gridKey={`appPdm.CategoryTemplates.Items.${selectedLevel.id}`}
              dataSource={selectedLevel.items || []}
              columnDefs={columnDefs}
              pagination={false}
              rowSelection={false}
              toolBarRender={() => [
                <Access key="add" accessible={canUpdate}>
                  <ItemFormDialog
                    templateId={templateData.id!}
                    levelId={selectedLevel.id!}
                    parentLevelItems={parentLevelItems}
                    onAfterSubmit={handleRefresh}
                    buttonProps={{ icon: <PlusOutlined /> }}
                  >
                    添加候选项
                  </ItemFormDialog>
                </Access>,
              ]}
            />
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                border: '1px solid #f0f0f0',
                borderRadius: 6,
                backgroundColor: '#fafafa',
              }}
            >
              <Empty description="请选择左侧层级查看候选项" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryTemplateDetailPage;

export const routeProps = {
  name: '模板详情',
};
