import React, { useState } from 'react';
import { Button, Input, Space, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { connect, mapProps, useField, useForm } from '@formily/react';
import ProjectTemplateSelectModal from './ProjectTemplateSelectModal';
import type { API } from '@/services/pdm/typings';

interface ProjectTemplateSelectorProps {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

const ProjectTemplateSelector: React.FC<ProjectTemplateSelectorProps> = ({
  value,
  onChange,
  disabled,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTemplateName, setSelectedTemplateName] = useState<string>('');
  const form = useForm();
  const field = useField();

  // 处理模板选择
  const handleTemplateSelect = (template: API.BurnAbpPdmProjectManagementProjectTemplatesProjectTemplateDto) => {
    if (onChange && template.templateCode) {
      onChange(template.templateCode);
      setSelectedTemplateName(template.templateName || '');

      // 将完整的模板对象保存到表单的 data 中，供其他逻辑使用
      // 使用 setFieldState 将模板数据存储在字段的 data 属性中
      field.setData(template);

      // 自动填充相关字段
      form.setValues({
        projectCategoryCode: template.categoryCode,
        description: template.description,
      });

      // 将模板的角色、里程碑、文档、任务数据保存到隐藏字段
      // 这些数据需要在提交时一起发送给后端
      form.setValues({
        _templateData: {
          roles: template.templateRoles,
          milestones: template.milestones,
          documents: template.documents,
          tasks: template.tasks,
        },
      });
    }
    setModalVisible(false);
  };

  return (
    <>
      <Space.Compact style={{ width: '100%' }}>
        <Input
          value={value}
          placeholder="请选择项目模板"
          readOnly
          disabled={disabled}
          suffix={selectedTemplateName && <Tag color="blue">{selectedTemplateName}</Tag>}
        />
        <Button
          icon={<SearchOutlined />}
          onClick={() => setModalVisible(true)}
          disabled={disabled}
        >
          选择模板
        </Button>
      </Space.Compact>

      <ProjectTemplateSelectModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSelect={handleTemplateSelect}
      />
    </>
  );
};

// 使用 Formily 的 connect 和 mapProps 连接组件
export default connect(
  ProjectTemplateSelector,
  mapProps({
    value: 'value',
    onChange: 'onChange',
  })
);
