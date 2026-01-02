import { ProjectChangeCreateAsync, ProjectChangeUpdateAsync, ProjectChangeGetAsync } from '@/services/pdm/ProjectChange';
import { FormDialog } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { Button, message } from 'antd';
import React from 'react';
import { formId, formSchema } from './schema';
import { useFormSchema, useSchemaField, request } from 'umi';
import FormLayoutMode from '@/pages/_utils/editMode';
import UserSelect from '@/pages/appPdm/_formWidgets/UserSelect';
import ProjectSelect from '@/pages/appPdm/_formWidgets/ProjectSelect';
import MultiAttachmentUpload from '@/components/MultiAttachmentUpload';
import { v4 as uuidv4 } from 'uuid';

const ProjectChangeFormDialog = (props: any) => {
  const { entityId, title, buttonProps, onAfterSubmit } = props;

  // 为新建记录生成临时 entityId (用于附件上传)
  const tempEntityIdRef = React.useRef<string>();
  if (!tempEntityIdRef.current) {
    tempEntityIdRef.current = uuidv4();
  }
  const currentEntityId = entityId || tempEntityIdRef.current;

  // 创建附件上传配置的包装器组件
  const AttachmentUploadWithConfig = React.useCallback((uploadProps: any) => {
    const effectiveEntityId = uploadProps.entityId || currentEntityId;
    console.log('📎 AttachmentUploadWithConfig 渲染, entityId:', effectiveEntityId, 'uploadProps:', uploadProps);

    // 上传函数 - 使用正确的 API 路由和 FormData
    const uploadFn = React.useCallback(async (file: File) => {
      const uploadEntityId = uploadProps.entityId || currentEntityId;
      console.log('📤 上传文件:', file.name, '到 entityId:', uploadEntityId);

      const formData = new FormData();
      formData.append('file', file);

      const result = await request<any>(`/api/pdm/change-management/change-orders/${uploadEntityId}/documents`, {
        method: 'POST',
        data: formData,
        requestType: 'form', // 关键：触发 multipart/form-data
      });

      console.log('✅ 上传成功:', result);
      return result;
    }, [uploadProps.entityId, currentEntityId]);

    // 下载函数
    const downloadFn = React.useCallback(async (blobName: string) => {
      const downloadEntityId = uploadProps.entityId || currentEntityId;
      const result = await request<Blob>(`/api/pdm/change-management/change-orders/${downloadEntityId}/documents/${blobName}`, {
        method: 'GET',
        responseType: 'blob',
      });
      return result;
    }, [uploadProps.entityId, currentEntityId]);

    // 删除函数
    const deleteFn = React.useCallback(async (blobName: string) => {
      const deleteEntityId = uploadProps.entityId || currentEntityId;
      await request<any>(`/api/pdm/change-management/change-orders/${deleteEntityId}/documents/${blobName}`, {
        method: 'DELETE',
      });
    }, [uploadProps.entityId, currentEntityId]);

    return <MultiAttachmentUpload {...uploadProps} uploadFn={uploadFn} downloadFn={downloadFn} deleteFn={deleteFn} />;
  }, [currentEntityId]);

  const schema = useFormSchema(formId, formSchema);
  const SchemaField = useSchemaField({
    UserSelect,
    ProjectSelect,
    MultiAttachmentUpload: AttachmentUploadWithConfig
  });

  const formProps = {
    effects: () => {
      onFormInit(form => {
        if (entityId) {
          ProjectChangeGetAsync({ id: entityId }).then(res => {
            const formData: any = { ...res };

            // 附件数据已经是数组格式,直接使用
            if (res.attachments) {
              formData.attachments = res.attachments;
            }

            // 编辑模式下确保 id 字段被设置
            formData.id = entityId;

            form.setInitialValues(formData);
          });
        }
      });
    },
  };

  const portalId = `Pdm.ProjectManagement.ProjectChange.${entityId || 'new'}`;
  return (
    <FormDialog.Portal id={portalId}>
      <Button
        type={'primary'}
        onClick={() => {
          const formDialog = FormDialog({ title: title, width: 720 }, portalId, () => {
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

              // 移除附件字段，提交时不包含
              const submitData: any = { ...values };
              const attachments = submitData.attachments || [];
              delete submitData.attachments;

              try {
                let savedEntityId = entityId;

                // 创建或更新实体
                if (!values.id) {
                  // 新建时确保使用临时 ID
                  submitData.id = currentEntityId;
                  const createResult = await ProjectChangeCreateAsync(submitData);
                  savedEntityId = createResult.id;
                  message.success('创建成功');
                } else {
                  await ProjectChangeUpdateAsync({ id: values.id }, submitData);
                  savedEntityId = values.id;
                  message.success('更新成功');
                }

                if (onAfterSubmit) onAfterSubmit();
                next(payload);
              } catch (error) {
                console.error('保存失败:', error);
                // 错误已由全局拦截器处理
              }
            })
            .forOpen((payload, next) => {
              // 确保新建模式下表单的 id 字段被设置为临时 ID
              if (!entityId) {
                next({
                  initialValues: {
                    id: currentEntityId,
                  },
                });
              } else {
                next();
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

export default ProjectChangeFormDialog;
