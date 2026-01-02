import { ProjectFormCreateAsync, ProjectFormUpdateAsync, ProjectFormGetAsync } from '@/services/pdm/ProjectForm';
import { FormSchemaCreateAsync } from '@/services/openApi/FormSchema';
import { FormDialog } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { Button, message } from 'antd';
import React from 'react';
import { formId, formSchema } from './schema';
import { useFormSchema, useSchemaField } from 'umi';
import FormLayoutMode from '@/pages/_utils/editMode';
import { ScenarioSelector } from '@/pages/appSYS/_components/DynamicSchema';
import { FormSchemaSourceType } from '@/pages/appSYS/dynamic-schema/_enums';

const ProjectFormFormDialog = (props: any) => {
  const { entityId, title, buttonProps, onAfterSubmit } = props;

  const schema = useFormSchema(formId, formSchema);
  // 注册 ScenarioSelector 组件
  const SchemaField = useSchemaField({
    ScenarioSelector,
  });

  const formProps = {
    effects: () => {
      onFormInit(form => {
        if (entityId) {
          ProjectFormGetAsync({ id: entityId }).then(res => {
            form.setInitialValues(res);
          });
        }
      });
    },
  };

  const portalId = `Pdm.ProjectManagement.ProjectForm.${entityId || 'new'}`;
  return (
    <FormDialog.Portal id={portalId}>
      <Button
        type={'primary'}
        onClick={() => {
          const formDialog = FormDialog({ title: title, width: 900 }, portalId, () => {
            return (
              <>
                <FormLayoutMode formId={formId} {...schema.form} editClickAfter={() => formDialog.close()}>
                  <SchemaField schema={schema.schema} />
                </FormLayoutMode>
              </>
            );
          });

          formDialog
            .forConfirm(async (payload, next) => {
              const values: any = payload.values;
              const hide = message.loading('正在提交...', 0);

              try {
                // 数据转换：添加后端必填字段
                const transformedValues = {
                  ...values,
                  // formContent 是后端必填字段，如果不存在则设置为空 JSON 对象
                  formContent: values.formContent || '{}',
                };

                if (!values.id) {
                  // 【新建流程】
                  // 1. 生成唯一的 scenarioKey (格式: pdm:timestamp)
                  const scenarioKey = values.scenarioKey || `pdm:${Date.now()}`;
                  transformedValues.scenarioKey = scenarioKey;

                  console.log('[ProjectForm新建] 生成scenarioKey:', scenarioKey);

                  // 2. 创建 ProjectForm
                  const projectFormResult = await ProjectFormCreateAsync(transformedValues);
                  console.log('[ProjectForm新建] ProjectForm创建成功:', projectFormResult);

                  // 3. 同步创建 FormSchema (独立表单)
                  try {
                    const formSchemaData = {
                      sourceType: FormSchemaSourceType.Standalone, // 独立表单
                      scenarioKey: scenarioKey,
                      schemaJson: '{}', // 初始空Schema
                      remarks: `项目表单: ${values.formName}`,
                    };
                    console.log('[ProjectForm新建] 创建FormSchema:', formSchemaData);

                    const formSchemaResult = await FormSchemaCreateAsync(formSchemaData);
                    console.log('[ProjectForm新建] FormSchema创建成功:', formSchemaResult);
                  } catch (schemaError: any) {
                    console.error('[ProjectForm新建] FormSchema创建失败:', schemaError);
                    // FormSchema创建失败不阻断流程,仅警告
                    message.warning('项目表单创建成功,但动态表单Schema创建失败,请稍后手动关联');
                  }

                  message.success('创建成功');
                  if (onAfterSubmit) onAfterSubmit();
                  next(payload);
                } else {
                  // 【编辑流程】
                  await ProjectFormUpdateAsync({ id: values.id }, transformedValues);
                  message.success('更新成功');
                  if (onAfterSubmit) onAfterSubmit();
                  next(payload);
                }
              } catch (err: any) {
                message.error(!values.id ? `创建失败: ${err.message || '未知错误'}` : `更新失败: ${err.message || '未知错误'}`);
                throw err;
              } finally {
                hide();
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

export default ProjectFormFormDialog;
