import React from 'react';
import { Button, message } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import { FormDialog } from '@formily/antd-v5';
import { useSchemaField } from 'umi';
import { useAttachmentUpload } from '@/hooks';
import { ProjectIssueStartProcessingAsync } from '@/services/pdm/ProjectIssue';
import FormLayoutMode from '@/pages/_utils/editMode';

interface StartProcessingDialogProps {
  issueId: string;
  onSuccess: () => void;
  buttonProps?: any;
}

/**
 * 开始处理对话框
 * 状态：已接收 → 处理中
 */
const StartProcessingDialog: React.FC<StartProcessingDialogProps> = ({
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

  const portalId = `Pdm.ProjectManagement.IssueStartProcessing.${issueId}`;

  return (
    <FormDialog.Portal id={portalId}>
      <Button
        type="primary"
        icon={<PlayCircleOutlined />}
        onClick={() => {
          const formDialog = FormDialog(
            {
              title: '开始处理',
              width: 720,
            },
            portalId,
            () => {
              return (
                <FormLayoutMode formId="Pdm.ProjectManagement.IssueStartProcessing" {...formConfig}>
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

              return ProjectIssueStartProcessingAsync(dto)
                .then(() => {
                  message.success('已开始处理');
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
        开始处理
      </Button>
    </FormDialog.Portal>
  );
};

export default StartProcessingDialog;
