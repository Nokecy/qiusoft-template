import { ProjectCreateAsync, ProjectUpdateAsync, ProjectGetAsync } from '@/services/pdm/Project';
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { Button, message, Spin, Alert } from 'antd';
import React from 'react';
import { useSchemaField } from 'umi';
import { useDynamicSchema } from '@@/plugin-dynamicSchema';
import ProjectTemplateSelector from './ProjectTemplateSelector';
import ProjectCategorySelect from '../../Configs/ProjectCategory/components/ProjectCategorySelect';

const ProjectFormDialog = (props: any) => {
  const { entityId, title, buttonProps, onAfterSubmit, selectedCategory } = props;

  // 使用 DynamicSchema 系统加载项目表单 Schema
  const {
    schema: dynamicSchema,
    formConfig,
    loading: schemaLoading,
    error: schemaError,
    source: schemaSource,
  } = useDynamicSchema('project:create-edit');

  const SchemaField = useSchemaField({ ProjectTemplateSelector, ProjectCategorySelect });

  const formProps = {
    effects: () => {
      onFormInit(form => {
        if (entityId) {
          ProjectGetAsync({ id: entityId }).then(res => {
            form.setInitialValues(res);
          });
        } else if (selectedCategory) {
          // 新建时，如果已选择分类，自动填充分类编码
          form.setInitialValues({ projectCategoryCode: selectedCategory });
        }
      });
    },
  };

  const portalId = `Pdm.ProjectManagement.Project.${entityId || 'new'}`;
  return (
    <FormDialog.Portal id={portalId}>
      <Button
        type={'primary'}
        onClick={() => {
          // 新建时检查是否已选择项目分类
          if (!entityId && !selectedCategory) {
            message.warning('请先选择项目分类');
            return;
          }

          const formDialog = FormDialog({ title: title, width: 820 }, portalId, () => {
            // Schema 加载中
            if (schemaLoading) {
              return (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <Spin size="large" tip="加载表单配置中..." />
                </div>
              );
            }

            // Schema 加载失败
            if (schemaError) {
              return (
                <Alert
                  message="表单加载失败"
                  description={schemaError.message || '无法加载项目表单配置'}
                  type="error"
                  showIcon
                />
              );
            }

            return (
              <FormLayout {...formConfig}>
                <SchemaField schema={dynamicSchema} />
                {/* 开发模式显示 Schema 来源 */}
                {process.env.NODE_ENV === 'development' && (
                  <Alert
                    message={`Schema 来源: ${schemaSource === 'backend' ? '后端配置' : '内置定义'}`}
                    type="info"
                    showIcon
                    closable
                    style={{ marginTop: 16 }}
                  />
                )}
              </FormLayout>
            );
          });

          formDialog
            .forConfirm((payload, next) => {
              const values: any = payload.values;

              // 处理模板数据：将 _templateData 中的数据提取到顶层
              const submitData = { ...values };
              if (submitData._templateData) {
                // 将模板数据合并到顶层
                if (submitData._templateData.milestones) {
                  submitData.milestones = submitData._templateData.milestones;
                }
                if (submitData._templateData.documents) {
                  submitData.documents = submitData._templateData.documents;
                }
                if (submitData._templateData.tasks) {
                  submitData.tasks = submitData._templateData.tasks;
                }
                // 删除临时字段
                delete submitData._templateData;
              }

              if (!values.id) {
                return ProjectCreateAsync(submitData)
                  .then(() => {
                    if (onAfterSubmit) onAfterSubmit();
                  })
                  .then(() => {
                    next(payload);
                  });
              } else {
                return ProjectUpdateAsync({ id: values.id }, submitData)
                  .then(() => {
                    if (onAfterSubmit) onAfterSubmit();
                  })
                  .then(() => {
                    next(payload);
                  });
              }
            })
            .open(formProps);
        }}
        {...buttonProps}
      >
        {props.children}
      </Button>
    </FormDialog.Portal>
  );
};

export default ProjectFormDialog;
