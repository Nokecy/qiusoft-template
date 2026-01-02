/**
 * MultiPagePreview 组件
 * 用于预览支持页头页尾的多页模板渲染效果
 */

import React, { useState, useEffect } from 'react';
import {
  Modal,
  Spin,
  Alert,
  Space,
  Button,
  Tabs,
  Image,
  Pagination,
  Typography,
  Row,
  Col,
  Card,
  Empty,
} from 'antd';
import {
  DownloadOutlined,
  PrinterOutlined,
  EyeOutlined,
  AppstoreOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import type { AtlTemplate, PageRenderResult, MultiPageRenderOutput } from '../types';

const { Text, Title } = Typography;

export interface MultiPagePreviewProps {
  visible: boolean;
  template: AtlTemplate;
  sampleData?: Record<string, any>;
  onClose: () => void;
}

/**
 * MultiPagePreview - 多页预览组件
 * 提供单页视图和网格视图两种预览模式
 */
export const MultiPagePreview: React.FC<MultiPagePreviewProps> = ({
  visible,
  template,
  sampleData,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pages, setPages] = useState<PageRenderResult[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'single' | 'grid'>('single');

  // 当对话框打开时，加载预览数据
  useEffect(() => {
    if (visible) {
      loadPreview();
    }
  }, [visible, template]);

  /**
   * 加载预览数据
   */
  const loadPreview = async () => {
    setLoading(true);
    setError(null);

    try {
      // TODO: 调用真实的 API 获取多页渲染结果
      // const result = await LabelPrintTemplateRenderMultiPageAsync({
      //   template,
      //   dataSources: sampleData || {},
      // });
      // setPages(result.pages);

      // 暂时使用模拟数据
      const mockPages: PageRenderResult[] = Array.from({ length: 3 }, (_, i) => ({
        pageNumber: i + 1,
        imageBase64: '', // 实际应该是 Base64 图片数据
        mimeType: 'image/png',
        width: 800,
        height: 600,
        hasHeader: !!template.sections?.header,
        hasFooter: !!template.sections?.footer,
      }));

      setPages(mockPages);
      setCurrentPage(1);
    } catch (err: any) {
      setError(err.message || '加载预览失败');
    } finally {
      setLoading(false);
    }
  };

  /**
   * 导出为 PDF
   */
  const handleExportPDF = async () => {
    try {
      // TODO: 实现 PDF 导出功能
      console.log('导出 PDF');
    } catch (err: any) {
      setError(err.message || '导出失败');
    }
  };

  /**
   * 打印全部页面
   */
  const handlePrintAll = () => {
    // TODO: 实现打印功能
    console.log('打印全部页面');
  };

  /**
   * 渲染单页视图
   */
  const renderSingleView = () => {
    if (pages.length === 0) {
      return (
        <Empty
          description="暂无预览数据"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      );
    }

    const page = pages[currentPage - 1];

    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* 页面信息 */}
          <div>
            <Text strong>
              第 {page.pageNumber} 页 / 共 {pages.length} 页
            </Text>
            {page.hasHeader && (
              <Text type="secondary" style={{ marginLeft: 16 }}>
                含页头
              </Text>
            )}
            {page.hasFooter && (
              <Text type="secondary" style={{ marginLeft: 8 }}>
                含页尾
              </Text>
            )}
          </div>

          {/* 图片预览 */}
          {page.imageBase64 ? (
            <Image
              src={`data:${page.mimeType};base64,${page.imageBase64}`}
              alt={`第 ${page.pageNumber} 页`}
              style={{
                maxWidth: '100%',
                maxHeight: '60vh',
                border: '1px solid #d9d9d9',
              }}
              preview={{
                mask: <EyeOutlined />,
              }}
            />
          ) : (
            <div
              style={{
                width: page.width,
                height: page.height,
                maxWidth: '100%',
                maxHeight: '60vh',
                border: '1px dashed #d9d9d9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                backgroundColor: '#fafafa',
              }}
            >
              <Text type="secondary">页面预览图</Text>
            </div>
          )}

          {/* 分页器 */}
          <Pagination
            current={currentPage}
            total={pages.length}
            pageSize={1}
            onChange={setCurrentPage}
            showSizeChanger={false}
            showQuickJumper
            showTotal={(total) => `共 ${total} 页`}
          />
        </Space>
      </div>
    );
  };

  /**
   * 渲染网格视图
   */
  const renderGridView = () => {
    if (pages.length === 0) {
      return (
        <Empty
          description="暂无预览数据"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      );
    }

    return (
      <div style={{ padding: '20px', maxHeight: '70vh', overflowY: 'auto' }}>
        <Row gutter={[16, 16]}>
          {pages.map((page) => (
            <Col key={page.pageNumber} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                onClick={() => {
                  setViewMode('single');
                  setCurrentPage(page.pageNumber);
                }}
                cover={
                  page.imageBase64 ? (
                    <img
                      src={`data:${page.mimeType};base64,${page.imageBase64}`}
                      alt={`第 ${page.pageNumber} 页`}
                      style={{ width: '100%', height: 'auto' }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: 200,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#fafafa',
                        border: '1px dashed #d9d9d9',
                      }}
                    >
                      <Text type="secondary">预览图</Text>
                    </div>
                  )
                }
              >
                <Card.Meta
                  title={`第 ${page.pageNumber} 页`}
                  description={
                    <Space size="small">
                      {page.hasHeader && <Text type="secondary">页头</Text>}
                      {page.hasFooter && <Text type="secondary">页尾</Text>}
                    </Space>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  };

  // Tab 项配置
  const tabItems = [
    {
      key: 'single',
      label: (
        <Space>
          <FileTextOutlined />
          <span>单页视图</span>
        </Space>
      ),
      icon: <FileTextOutlined />,
    },
    {
      key: 'grid',
      label: (
        <Space>
          <AppstoreOutlined />
          <span>网格视图</span>
        </Space>
      ),
      icon: <AppstoreOutlined />,
    },
  ];

  return (
    <Modal
      title={
        <Space>
          <FileTextOutlined />
          <span>多页预览</span>
          {template.sections?.header && (
            <Text type="secondary" style={{ fontSize: 12 }}>
              （启用页头）
            </Text>
          )}
          {template.sections?.footer && (
            <Text type="secondary" style={{ fontSize: 12 }}>
              （启用页尾）
            </Text>
          )}
        </Space>
      }
      open={visible}
      onCancel={onClose}
      width="90%"
      style={{ top: 20 }}
      footer={
        <Space>
          {/* 视图切换 */}
          <Tabs
            activeKey={viewMode}
            onChange={(key) => setViewMode(key as 'single' | 'grid')}
            items={tabItems}
            size="small"
            style={{ marginRight: 'auto' }}
          />

          {/* 操作按钮 */}
          <Space>
            <Button
              icon={<DownloadOutlined />}
              onClick={handleExportPDF}
              disabled={loading || pages.length === 0}
            >
              导出PDF
            </Button>
            <Button
              type="primary"
              icon={<PrinterOutlined />}
              onClick={handlePrintAll}
              disabled={loading || pages.length === 0}
            >
              打印全部
            </Button>
            <Button onClick={onClose}>关闭</Button>
          </Space>
        </Space>
      }
    >
      <Spin spinning={loading} tip="正在生成预览...">
        {/* 错误提示 */}
        {error && (
          <Alert
            message="预览失败"
            description={error}
            type="error"
            showIcon
            closable
            onClose={() => setError(null)}
            style={{ marginBottom: 16 }}
          />
        )}

        {/* 功能提示 */}
        {!loading && !error && pages.length > 0 && (
          <Alert
            message="预览说明"
            description={
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                <li>单页视图：逐页查看详细内容，支持缩放和导航</li>
                <li>网格视图：总览所有页面，点击可切换到单页视图</li>
                <li>页头页尾会根据配置的打印频率在对应页面显示</li>
              </ul>
            }
            type="info"
            showIcon
            closable
            style={{ marginBottom: 16 }}
          />
        )}

        {/* 渲染内容 */}
        {!loading && !error && (
          viewMode === 'single' ? renderSingleView() : renderGridView()
        )}

        {/* 加载中占位 */}
        {loading && (
          <div style={{ minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Space direction="vertical" align="center">
              <Spin size="large" />
              <Text type="secondary">正在渲染多页预览...</Text>
            </Space>
          </div>
        )}
      </Spin>
    </Modal>
  );
};
