/**
 * 打印模板设计器 - 使用示例
 *
 * 此文件演示如何在实际页面中使用PrintTemplateDesigner组件
 */

import React, { useState } from 'react';
import { Button, Modal, Space, Card } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { PrintTemplateDesigner } from './index';
import type { AtlTemplate } from './types';

export const PrintTemplateDesignerExample: React.FC = () => {
  const [designerVisible, setDesignerVisible] = useState(false);
  const [currentTemplateId, setCurrentTemplateId] = useState<string>();
  const [savedTemplates, setSavedTemplates] = useState<Array<{
    id: string;
    name: string;
    template: AtlTemplate;
  }>>([]);

  // 新建模板
  const handleCreateTemplate = () => {
    setCurrentTemplateId(undefined);
    setDesignerVisible(true);
  };

  // 编辑模板
  const handleEditTemplate = (id: string) => {
    setCurrentTemplateId(id);
    setDesignerVisible(true);
  };

  // 保存模板回调
  const handleSaveTemplate = (template: AtlTemplate) => {
    console.log('保存的模板:', template);

    // 这里可以调用实际的API保存模板
    // await PrintTemplateInfoCreateAsync({ ... })

    // 模拟保存到本地状态
    if (currentTemplateId) {
      // 更新现有模板
      setSavedTemplates(prev =>
        prev.map(t =>
          t.id === currentTemplateId
            ? { ...t, name: template.metadata.name || '未命名', template }
            : t
        )
      );
    } else {
      // 新建模板
      const newId = `template-${Date.now()}`;
      setSavedTemplates(prev => [
        ...prev,
        {
          id: newId,
          name: template.metadata.name || '未命名模板',
          template,
        },
      ]);
    }

    setDesignerVisible(false);
  };

  return (
    <div style={{ padding: 24 }}>
      <Card
        title="打印模板管理"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreateTemplate}
          >
            新建模板
          </Button>
        }
      >
        {/* 模板列表 */}
        {savedTemplates.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#999' }}>
            暂无模板，点击"新建模板"开始创建
          </div>
        ) : (
          <Space direction="vertical" style={{ width: '100%' }} size="middle">
            {savedTemplates.map((item) => (
              <Card
                key={item.id}
                size="small"
                hoverable
                extra={
                  <Button
                    type="link"
                    icon={<EditOutlined />}
                    onClick={() => handleEditTemplate(item.id)}
                  >
                    编辑
                  </Button>
                }
              >
                <div>
                  <h4>{item.name}</h4>
                  <p style={{ color: '#666', margin: 0 }}>
                    尺寸: {item.template.canvas.width}mm × {item.template.canvas.height}mm
                    {' | '}
                    DPI: {item.template.canvas.dpi}
                    {' | '}
                    元素数量: {item.template.elements.length}
                  </p>
                </div>
              </Card>
            ))}
          </Space>
        )}
      </Card>

      {/* 设计器Modal */}
      <Modal
        title={currentTemplateId ? '编辑模板' : '新建模板'}
        open={designerVisible}
        onCancel={() => setDesignerVisible(false)}
        width="100vw"
        style={{ top: 0, paddingBottom: 0, maxWidth: 'none' }}
        bodyStyle={{ height: '100vh', padding: 0 }}
        footer={null}
        destroyOnClose
      >
        <PrintTemplateDesigner
          templateId={currentTemplateId}
          onSave={handleSaveTemplate}
          onClose={() => setDesignerVisible(false)}
        />
      </Modal>
    </div>
  );
};

export default PrintTemplateDesignerExample;
