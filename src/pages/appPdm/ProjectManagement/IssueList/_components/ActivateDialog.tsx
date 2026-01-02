import React from 'react';
import { Button, message } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { FormDialog } from '@formily/antd-v5';
import { useSchemaField } from 'umi';
import { useAttachmentUpload } from '@/hooks';
import { ProjectIssueActivateAsync } from '@/services/pdm/ProjectIssue';
import FormLayoutMode from '@/pages/_utils/editMode';

interface ActivateDialogProps {
  issueId: string;
  onSuccess: () => void;
  buttonProps?: any;
}

/**
 * 激活问题对话框
 * 状态：已关闭 → 打开（创建新执行周期）
 */
const ActivateDialog: React.FC<ActivateDialogProps> = ({
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
      activationReason: {
        type: 'string',
        title: '激活原因',
        required: true,
        'x-decorator': 'FormItem',
        'x-component': 'Input.TextArea',
        'x-component-props': {
          placeholder: '请说明重新激活此问题的原因',
          rows: 6,
          maxLength: 500,
          showCount: true,
        },
        'x-validator': [
          { required: true, message: '请输入激活原因' },
        ],
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

  const portalId = `Pdm.ProjectManagement.IssueActivate.${issueId}`;

  return (
    <FormDialog.Portal id={portalId}>
      <Button
        type="primary"
        icon={<ReloadOutlined />}
        onClick={() => {
          const formDialog = FormDialog(
            {
              title: '激活问题',
              width: 720,
            },
            portalId,
            () => {
              return (
                <FormLayoutMode formId="Pdm.ProjectManagement.IssueActivate" {...formConfig}>
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
                activationReason: values.activationReason,
                remark: values.remark,
                attachmentIds: attachmentIds && attachmentIds.length > 0 ? attachmentIds : undefined,
              };

              return ProjectIssueActivateAsync(dto)
                .then(() => {
                  message.success('问题已激活，开始新的执行周期');
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
        激活
      </Button>
    </FormDialog.Portal>
  );
};

export default ActivateDialog;
