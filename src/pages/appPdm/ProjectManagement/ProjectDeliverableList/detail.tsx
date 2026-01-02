import React, { useEffect, useMemo, useState } from 'react';
import { Card, Button, Spin, Result, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { history, closeTab } from 'umi';
import { useKeepAliveParams } from '@/hooks';
import { createForm } from '@formily/core';
import { FormProvider } from '@formily/react';
import FormLayoutMode from '@/pages/_utils/editMode';
import { ToolBar } from '@/components';
import { useFormSchema } from '@@/plugin-formSchema';
import { useSchemaField } from '@@/plugin-formSchema';
import { formId, formSchema } from './components/schema';
import { ProjectDeliverableGetAsync } from '@/services/pdm/ProjectDeliverable';
import UserSelect from '@/pages/appPdm/_formWidgets/UserSelect';
import ProjectSelect from '@/pages/appPdm/_formWidgets/ProjectSelect';

const ProjectDeliverableDetail: React.FC = () => {
  const { id: deliverableId, isActive, hasChanged } = useKeepAliveParams(
    '/appPdm/ProjectManagement/ProjectDeliverableList/detail',
    ['id']
  );

  const [loading, setLoading] = useState(true);
  const schema = useFormSchema(formId, formSchema);

  // 注册自定义组件
  const SchemaField = useSchemaField({
    UserSelect,
    ProjectSelect,
  });

  // 创建只读表单
  const [form] = useState(() =>
    createForm({
      pattern: 'readPretty',
    })
  );

  // 返回列表
  const handleBack = () => {
    const currentPath = window.location.pathname;
    history.push('/appPdm/ProjectManagement/ProjectDeliverableList');
    setTimeout(() => {
      closeTab(currentPath);
    }, 150);
  };

  // 加载数据
  useEffect(() => {
    if (!isActive || !hasChanged) return;

    const loadData = async () => {
      if (!deliverableId) {
        message.error('缺少ID参数');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await ProjectDeliverableGetAsync({ id: deliverableId });

        // 处理复合字段
        const formData: any = {
          ...data,
          // 项目复合字段
          '{value:projectCode,label:projectName}':
            data.projectCode && data.projectName
              ? { value: data.projectCode, label: data.projectName }
              : undefined,
          // 负责人复合字段
          '{value:responsibleUserId,label:responsibleUserName}':
            data.responsibleUserId && data.responsibleUserName
              ? { value: data.responsibleUserId, label: data.responsibleUserName }
              : undefined,
        };

        form.setInitialValues(formData);
        setLoading(false);
      } catch (err: any) {
        message.error(err.message || '加载数据失败');
        setLoading(false);
      }
    };

    loadData();
  }, [isActive, hasChanged, deliverableId, form]);

  return (
    <Spin spinning={loading}>
      <Card
        headStyle={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: '#fff',
        }}
        title="成果详情"
        extra={
          <ToolBar>
            <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
              返回
            </Button>
          </ToolBar>
        }
      >
        <FormProvider form={form}>
          <FormLayoutMode formId={formId} {...schema.form}>
            <SchemaField schema={schema.schema} />
          </FormLayoutMode>
        </FormProvider>
      </Card>
    </Spin>
  );
};

export default ProjectDeliverableDetail;

export const routeProps = {
  name: '成果详情',
};
