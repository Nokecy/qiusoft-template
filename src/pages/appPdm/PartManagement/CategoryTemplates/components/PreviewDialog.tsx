import {
  CategoryLevelTemplatePreviewGenerationAsync,
  CategoryLevelTemplateExecuteGenerationAsync,
} from '@/services/pdm/CategoryLevelTemplate';
import { AgGridPlus } from '@/components/agGrid';
import { Modal, Button, Statistic, Row, Col, message, Alert, Tag } from 'antd';
import { ExclamationCircleOutlined, CheckCircleOutlined, WarningOutlined } from '@ant-design/icons';
import React, { useState, useMemo, useRef } from 'react';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';

interface PreviewDialogProps {
  templateId: number;
  templateName?: string;
  trigger: React.ReactNode;
  onAfterGenerate?: () => void;
}

type PreviewItemDto = API.BurnAbpPdmPartManagementCategoryTemplatesDtosBatchGenerationPreviewItemDto;

// 冲突状态渲染器
const ConflictRenderer = (props: ICellRendererParams) => {
  const { value, data } = props;
  if (value) {
    return (
      <Tag color="orange" icon={<WarningOutlined />}>
        冲突: {data?.conflictReason || '已存在'}
      </Tag>
    );
  }
  return (
    <Tag color="green" icon={<CheckCircleOutlined />}>
      可创建
    </Tag>
  );
};

// 根据 parentCategoryCode 构建树形数据的 hierarchy（参照物料分类页面）
const transformToTreeData = (items: PreviewItemDto[]): (PreviewItemDto & { hierarchy: string[] })[] => {
  // 构建 categoryCode -> item 的映射
  const codeToItem = new Map<string, PreviewItemDto>();
  (items || []).forEach((item) => {
    if (item.categoryCode) {
      codeToItem.set(item.categoryCode, item);
    }
  });

  // 根据 parentCategoryCode 递归构建 hierarchy 路径（使用 categoryName）
  const buildHierarchy = (item: PreviewItemDto): string[] => {
    const path: string[] = [];
    let current: PreviewItemDto | undefined = item;

    while (current) {
      // 使用 categoryName 作为路径标识（与物料分类页面一致）
      path.unshift(current.categoryName || current.categoryCode || '');
      if (current.parentCategoryCode) {
        current = codeToItem.get(current.parentCategoryCode);
      } else {
        break;
      }
    }

    return path;
  };

  return (items || []).map((item) => ({
    ...item,
    hierarchy: buildHierarchy(item),
  }));
};

const PreviewDialog: React.FC<PreviewDialogProps> = (props) => {
  const { templateId, templateName, trigger, onAfterGenerate } = props;
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [previewData, setPreviewData] = useState<API.BurnAbpPdmPartManagementCategoryTemplatesDtosBatchGenerationPreviewDto | null>(null);
  const gridRef = useRef<GridRef>();

  // 转换为树形数据
  const treeData = useMemo(() => {
    return transformToTreeData(previewData?.items || []);
  }, [previewData?.items]);

  const columnDefs: any = useMemo(
    () => [
      { field: 'categoryCode', headerName: '分类编码', width: 150 },
      { field: 'level', headerName: '层级', width: 80 },
      {
        field: 'isLeaf',
        headerName: '叶子节点',
        width: 100,
        cellRenderer: (params: any) => (params.value ? '是' : '否'),
      },
      {
        field: 'isConflict',
        headerName: '状态',
        width: 150,
        cellRenderer: ConflictRenderer,
      },
    ],
    []
  );

  const handleOpen = async () => {
    setVisible(true);
    setLoading(true);
    try {
      const result = await CategoryLevelTemplatePreviewGenerationAsync({ templateId });
      setPreviewData(result);
    } catch (error) {
      message.error('预览失败');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setVisible(false);
    setPreviewData(null);
  };

  const handleGenerate = async () => {
    if (!previewData || previewData.newCount === 0) {
      message.warning('没有可创建的分类');
      return;
    }

    Modal.confirm({
      title: '确认执行批量生成',
      icon: <ExclamationCircleOutlined />,
      content: (
        <div>
          <p>即将创建 <strong>{previewData.newCount}</strong> 个新分类。</p>
          {previewData.conflictCount && previewData.conflictCount > 0 && (
            <p style={{ color: '#faad14' }}>
              <WarningOutlined /> {previewData.conflictCount} 个冲突项将被跳过
            </p>
          )}
          <p>此操作不可撤销，确定继续吗？</p>
        </div>
      ),
      okText: '确认生成',
      cancelText: '取消',
      onOk: async () => {
        setGenerating(true);
        try {
          const result = await CategoryLevelTemplateExecuteGenerationAsync({ templateId });
          message.success(`批量生成完成！成功: ${result.successCount}, 跳过: ${result.skippedCount}, 失败: ${result.failedCount}`);
          handleClose();
          if (onAfterGenerate) onAfterGenerate();
        } catch (error) {
          message.error('批量生成失败');
        } finally {
          setGenerating(false);
        }
      },
    });
  };

  return (
    <>
      <span onClick={handleOpen}>{trigger}</span>
      <Modal
        title={`预览生成 - ${templateName || '分类层级模板'}`}
        open={visible}
        onCancel={handleClose}
        width={1000}
        footer={[
          <Button key="cancel" onClick={handleClose}>
            取消
          </Button>,
          <Button
            key="generate"
            type="primary"
            loading={generating}
            disabled={loading || !previewData || previewData.newCount === 0}
            onClick={handleGenerate}
          >
            确认生成
          </Button>,
        ]}
      >
        {/* 统计信息 */}
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={8}>
            <Statistic title="总数" value={previewData?.totalCount || 0} />
          </Col>
          <Col span={8}>
            <Statistic
              title="新增"
              value={previewData?.newCount || 0}
              valueStyle={{ color: '#52c41a' }}
              prefix={<CheckCircleOutlined />}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="冲突(将跳过)"
              value={previewData?.conflictCount || 0}
              valueStyle={{ color: previewData?.conflictCount ? '#faad14' : undefined }}
              prefix={previewData?.conflictCount ? <WarningOutlined /> : null}
            />
          </Col>
        </Row>

        {previewData?.conflictCount && previewData.conflictCount > 0 && (
          <Alert
            type="warning"
            message="存在冲突项"
            description={`${previewData.conflictCount} 个分类已存在，执行生成时将跳过这些项。`}
            style={{ marginBottom: 16 }}
            showIcon
          />
        )}

        {/* 预览列表 - 树形显示 */}
        <div style={{ height: 400 }}>
          <AgGridPlus
            gridRef={gridRef}
            headerTitle={false}
            gridKey="appPdm.CategoryTemplates.Preview"
            dataSource={treeData}
            columnDefs={columnDefs}
            pagination={false}
            search={false}
            loading={loading}
            treeData={true}
            treeParentName={'parentCategoryCode'}
            treeKeyName={'categoryCode'}
            getDataPath={(data) => data.hierarchy}
            autoGroupColumnDef={{
              headerName: '分类名称',
              minWidth: 280,
              pinned: 'left',
              cellRendererParams: {
                suppressCount: true,
                innerRenderer: (params: any) => params.data?.categoryName || params.data?.categoryCode || '-',
              },
            }}
            groupDefaultExpanded={-1}
          />
        </div>
      </Modal>
    </>
  );
};

export default PreviewDialog;
