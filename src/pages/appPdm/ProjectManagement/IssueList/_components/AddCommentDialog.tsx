import React from 'react';
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { createSchemaField } from '@formily/react';
import { Input } from '@formily/antd-v5';
import { message } from 'antd';
import { request } from 'umi';
import MultiAttachmentUpload from '@/components/MultiAttachmentUpload';
import { ProjectIssueAddCommentAsync } from '@/services/pdm/ProjectIssue';

/**
 * 添加备注对话框
 */
export const showAddCommentDialog = async (issueId: string, onSuccess?: () => void) => {
  // 附件上传函数
  const uploadFn = async (eid: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return await request<any>(
      `/api/pdm/project-management/project-issues/${eid}/documents`,
      {
        method: 'POST',
        data: formData,
        requestType: 'form',
      }
    );
  };

  // 附件下载函数
  const downloadFn = async (eid: string, blobName: string) => {
    return await request<Blob>(
      `/api/pdm/project-management/project-issues/${eid}/documents/${blobName}`,
      {
        method: 'GET',
        responseType: 'blob',
      }
    );
  };

  // 附件删除函数
  const deleteFn = async (eid: string, blobName: string) => {
    await request<any>(
      `/api/pdm/project-management/project-issues/${eid}/documents/${blobName}`,
      {
        method: 'DELETE',
      }
    );
  };

  // 创建带配置的附件上传组件
  const ConfiguredAttachmentUpload = (props: any) => (
    <MultiAttachmentUpload
      {...props}
      entityId={issueId}
      uploadFn={uploadFn}
      downloadFn={downloadFn}
      deleteFn={deleteFn}
    />
  );

  const SchemaField = createSchemaField({
    components: {
      FormLayout,
      Input,
      MultiAttachmentUpload: ConfiguredAttachmentUpload,
    },
  });

  const dialog = FormDialog(
    { title: '添加备注', width: 700 },
    () => {
      const schema = {
        type: 'object',
        properties: {
          remark: {
            type: 'string',
            title: '备注内容',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Input.TextArea',
            'x-component-props': {
              rows: 6,
              maxLength: 2000,
              showCount: true,
              placeholder: '请输入备注内容',
            },
          },
          attachments: {
            type: 'array',
            title: '附件',
            'x-decorator': 'FormItem',
            'x-component': 'MultiAttachmentUpload',
            'x-component-props': {
              maxCount: 10,
            },
          },
        },
      };

      return (
        <FormLayout labelCol={4} wrapperCol={20}>
          <SchemaField schema={schema} />
        </FormLayout>
      );
    },
  );

  dialog
    .forOpen((payload, next) => {
      next({ initialValues: {} });
    })
    .forConfirm(async (payload, next) => {
      try {
        const values = await payload.submit();

        // 从 attachments 数组中提取 blobName，过滤掉无效值
        const attachmentIds = values.attachments
          ? values.attachments
            .map((att: any) => att.blobName)
            .filter(Boolean)
          : undefined;

        const dto = {
          remark: values.remark,
          attachmentIds: attachmentIds && attachmentIds.length > 0 ? attachmentIds : undefined,
        };

        await ProjectIssueAddCommentAsync({ issueId }, dto);

        message.success('添加备注成功');
        onSuccess?.();
        next(values);
      } catch (error) {
        console.error('添加备注失败:', error);
        message.error('添加备注失败');
        throw error;
      }
    })
    .open();
};
