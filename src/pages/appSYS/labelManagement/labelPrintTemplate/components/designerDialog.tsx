/**
 * 标签打印模板设计器对话框
 */

import React, { useState } from 'react';
import { Modal, Button, message } from 'antd';
import { EditOutlined, FormatPainterOutlined } from '@ant-design/icons';
import { PrintTemplateDesigner } from '@/pages/appSYS/_components/PrintTemplateDesigner';
import type { AtlTemplate } from '@/pages/appSYS/_components/PrintTemplateDesigner/types';

export interface DesignerDialogProps {
  templateId?: string;
  title?: string;
  buttonProps?: any;
  children?: React.ReactNode;
  onAfterSave?: () => void;
}

const DesignerDialog: React.FC<DesignerDialogProps> = ({
  templateId,
  title = '设计模板',
  buttonProps,
  children = '设计',
  onAfterSave,
}) => {
  const [visible, setVisible] = useState(false);

  const handleOpen = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const handleSave = (template: AtlTemplate) => {
    message.success('模板保存成功');
    handleClose();
    if (onAfterSave) {
      onAfterSave();
    }
  };

  return (
    <>
      <Button
        type="primary"
        icon={<FormatPainterOutlined />}
        onClick={handleOpen}
        {...buttonProps}
      >
        {children}
      </Button>

      <Modal
        title={title}
        open={visible}
        onCancel={handleClose}
        footer={null}
        width="100%"
        style={{ top: 0, paddingBottom: 0 }}
        bodyStyle={{ height: 'calc(100vh - 55px)', padding: 0 }}
        destroyOnClose
      >
        <PrintTemplateDesigner
          templateId={templateId}
          onSave={handleSave}
          onClose={handleClose}
        />
      </Modal>
    </>
  );
};

export default DesignerDialog;
