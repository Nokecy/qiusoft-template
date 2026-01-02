/**
 * 标签打印模板设计器 - 独立页面
 */

import React from 'react';
import { useSearchParams, history } from '@umijs/max';
import { message } from 'antd';
import { PrintTemplateDesigner } from '@/pages/appSYS/_components/PrintTemplateDesigner';
import type { AtlTemplate } from '@/pages/appSYS/_components/PrintTemplateDesigner/types';

export const routeProps = {
  name: '设计模板',
};

const DesignerPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get('id');
  const templateName = searchParams.get('name');
  const templateType = searchParams.get('templateType');
  const width = searchParams.get('width');
  const height = searchParams.get('height');

  const handleSave = (template: AtlTemplate) => {
    message.success('模板保存成功');
    // 保存成功后返回列表页
    history.back();
  };

  const handleClose = () => {
    // 关闭设计器，返回列表页
    history.back();
  };

  return (
    <PrintTemplateDesigner
      templateId={templateId || undefined}
      templateName={templateName || undefined}
      initialTargetLanguage={templateType ? Number(templateType) : undefined}
      paperWidth={width ? Number(width) : undefined}
      paperHeight={height ? Number(height) : undefined}
      onSave={handleSave}
      onClose={handleClose}
    />
  );
};

export default DesignerPage;
