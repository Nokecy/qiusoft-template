import React from 'react';
import { FormDialog } from '@formily/antd-v5';
import { message, Button } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useSchemaField } from 'umi';
import { useAttachmentUpload } from '@/hooks';
import { ProjectIssueCloseAsync } from '@/services/pdm/ProjectIssue';
import FormLayoutMode from '@/pages/_utils/editMode';

interface CloseDialogProps {
  issueId: string;
  onSuccess?: () => void;
  buttonProps?: any;
}

/**
 * 关闭问题弹窗
 */
const CloseDialog: React.FC<CloseDialogProps> = ({
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
        title: '关闭原因',
        'x-decorator': 'FormItem',
        'x-component': 'Input.TextArea',
        'x-component-props': {
          placeholder: '请输入关闭原因(可选)',
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

  const portalId = `Pdm.ProjectManagement.IssueClose.${issueId}`;

  return (
    <FormDialog.Portal id={portalId}>
      <Button
        type="primary"
        danger
        icon={<CloseCircleOutlined />}
        onClick={() => {
          const formDialog = FormDialog(
            {
              title: '关闭问题',
              width: 720,
            },
            portalId,
            () => {
              return (
                <FormLayoutMode formId="Pdm.ProjectManagement.IssueClose" {...formConfig}>
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

              return ProjectIssueCloseAsync(dto)
                .then(() => {
                  message.success('关闭成功');
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
        关闭
      </Button>
    </FormDialog.Portal>
  );
};

export default CloseDialog;
