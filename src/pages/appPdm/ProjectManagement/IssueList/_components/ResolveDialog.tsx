import React from 'react';
import { FormDialog } from '@formily/antd-v5';
import { message, Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useSchemaField } from 'umi';
import { useAttachmentUpload } from '@/hooks';
import { ProjectIssueResolveAsync } from '@/services/pdm/ProjectIssue';
import FormLayoutMode from '@/pages/_utils/editMode';

interface ResolveDialogProps {
  issueId: string;
  onSuccess?: () => void;
  buttonProps?: any;
}

/**
 * 解决问题弹窗
 */
const ResolveDialog: React.FC<ResolveDialogProps> = ({
  issueId,
  onSuccess,
  buttonProps = {},
}) => {
  // 配置附件上传
  const AttachmentUploadWithConfig = useAttachmentUpload(
    issueId,
    '/api/pdm/project-management/project-issues'
  );

  const SchemaField = useSchemaField({
    MultiAttachmentUpload: AttachmentUploadWithConfig
  });

  const formConfig = {
    labelCol: 6,
    wrapperCol: 18,
    labelAlign: 'right',
    feedbackLayout: 'terse',
  };

  const schema = {
    type: 'object',
    properties: {
      resolution: {
        type: 'string',
        title: '解决方案',
        required: true,
        'x-decorator': 'FormItem',
        'x-component': 'Input.TextArea',
        'x-component-props': {
          placeholder: '请详细描述解决方案',
          rows: 6,
          maxLength: 1000,
          showCount: true,
        },
      },
      remark: {
        type: 'string',
        title: '备注',
        'x-decorator': 'FormItem',
        'x-component': 'Input.TextArea',
        'x-component-props': {
          placeholder: '请输入备注说明(可选)',
          rows: 4,
          maxLength: 500,
          showCount: true,
        },
      },
      attachments: {
        type: 'array',
        title: '附件',
        'x-decorator': 'FormItem',
        'x-component': 'MultiAttachmentUpload',
        'x-component-props': {
          maxCount: 5,
        },
      },
    },
  };

  const portalId = `Pdm.ProjectManagement.IssueResolve.${issueId}`;

  return (
    <FormDialog.Portal id={portalId}>
      <Button
        type="primary"
        icon={<CheckCircleOutlined />}
        onClick={() => {
          const formDialog = FormDialog(
            {
              title: '解决问题',
              width: 720,
            },
            portalId,
            () => {
              return (
                <FormLayoutMode formId="Pdm.ProjectManagement.IssueResolve" {...formConfig}>
                  <SchemaField schema={schema} />
                </FormLayoutMode>
              );
            },
          );

          formDialog
            .forConfirm((payload, next) => {
              const values: any = payload.values;

              // 从 attachments 数组中提取 blobName，过滤掉无效值
              const attachmentIds = values.attachments
                ? values.attachments
                  .map((att: any) => att.blobName)
                  .filter(Boolean)
                : undefined;

              const dto = {
                id: issueId,
                resolution: values.resolution,
                remark: values.remark,
                attachmentIds: attachmentIds && attachmentIds.length > 0 ? attachmentIds : undefined,
              };

              return ProjectIssueResolveAsync(dto)
                .then(() => {
                  message.success('解决成功');
                  if (onSuccess) onSuccess();
                })
                .then(() => {
                  next(payload);
                });
            })
            .open();
        }}
        {...buttonProps}
      >
        解决
      </Button>
    </FormDialog.Portal>
  );
};

export default ResolveDialog;
