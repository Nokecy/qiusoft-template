import React from 'react';
import { FormDialog } from '@formily/antd-v5';
import { message, Button } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { useSchemaField } from 'umi';
import { useAttachmentUpload } from '@/hooks';
import { ProjectIssueConfirmReceiveAsync } from '@/services/pdm/ProjectIssue';
import FormLayoutMode from '@/pages/_utils/editMode';

interface ConfirmReceiveDialogProps {
  issueId: string;
  onSuccess?: () => void;
  buttonProps?: any;
}

/**
 * 确认接收问题对话框
 * 状态：已指派 → 已接收
 */
const ConfirmReceiveDialog: React.FC<ConfirmReceiveDialogProps> = ({
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

  const portalId = `Pdm.ProjectManagement.IssueConfirmReceive.${issueId}`;

  return (
    <FormDialog.Portal id={portalId}>
      <Button
        type="primary"
        icon={<CheckOutlined />}
        onClick={() => {
          const formDialog = FormDialog(
            {
              title: '确认接收',
              width: 720,
            },
            portalId,
            () => {
              return (
                <FormLayoutMode formId="Pdm.ProjectManagement.IssueConfirmReceive" {...formConfig}>
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
                remark: values.remark,
                attachmentIds: attachmentIds && attachmentIds.length > 0 ? attachmentIds : undefined,
              };

              return ProjectIssueConfirmReceiveAsync(dto)
                .then(() => {
                  message.success('确认接收成功');
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
        确认接收
      </Button>
    </FormDialog.Portal>
  );
};

export default ConfirmReceiveDialog;
