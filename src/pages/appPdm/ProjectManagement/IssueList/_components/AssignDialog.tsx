import React from 'react';
import { FormDialog } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { message, Button } from 'antd';
import { UserSwitchOutlined } from '@ant-design/icons';
import { useSchemaField } from 'umi';
import { useAttachmentUpload } from '@/hooks';
import UserSelect from '@/pages/appPdm/_formWidgets/UserSelect';
import { ProjectIssueAssignAsync } from '@/services/pdm/ProjectIssue';
import FormLayoutMode from '@/pages/_utils/editMode';

interface AssignDialogProps {
  issueId: string;
  currentHandler?: string;
  handlerCode?: string;
  handlerName?: string;
  onSuccess?: () => void;
  buttonProps?: any;
}

/**
 * 指派问题对话框
 */
const AssignDialog: React.FC<AssignDialogProps> = ({
  issueId,
  currentHandler,
  handlerCode,
  handlerName,
  onSuccess,
  buttonProps = {},
}) => {
  // 配置附件上传
  const AttachmentUploadWithConfig = useAttachmentUpload(
    issueId,
    '/api/pdm/project-management/project-issues'
  );

  const SchemaField = useSchemaField({
    UserSelect,
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
      handler: {
        type: 'object',
        title: '处理人',
        required: true,
        'x-decorator': 'FormItem',
        'x-component': 'UserSelect',
        'x-component-props': {
          placeholder: '请选择处理人',
          valueField: 'userName',
          labelInValue: true, // 返回 {label, value} 格式
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

  const formProps = {
    effects: () => {
      onFormInit(form => {
        // 设置默认值 - 如果有 handlerCode，构造 labelInValue 格式
        if (handlerCode) {
          form.setInitialValues({
            handler: {
              value: handlerCode,
              label: handlerName || handlerCode,
            },
          });
        }
      });
    },
  };

  const portalId = `Pdm.ProjectManagement.IssueAssign.${issueId}`;

  return (
    <FormDialog.Portal id={portalId}>
      <Button
        type="primary"
        icon={<UserSwitchOutlined />}
        onClick={() => {
          const formDialog = FormDialog(
            {
              title: '指派问题',
              width: 720,
            },
            portalId,
            () => {
              return (
                <FormLayoutMode formId="Pdm.ProjectManagement.IssueAssign" {...formConfig}>
                  <SchemaField schema={schema} />
                </FormLayoutMode>
              );
            },
          );

          formDialog
            .forConfirm((payload, next) => {
              const values: any = payload.values;

              // handler 是 labelInValue 格式: {label: '姓名 工号', value: 'userName'}
              const handler = values.handler || {};

              // 从 attachments 数组中提取 blobName，过滤掉无效值
              const attachmentIds = values.attachments
                ? values.attachments
                  .map((att: any) => att.blobName)
                  .filter(Boolean)
                : undefined; // 如果没有附件，传 undefined 而不是空数组

              const dto = {
                id: issueId,
                handlerCode: handler.value || '', // userName (工号)
                handlerName: handler.label || handler.value || '', // 姓名 工号
                remark: values.remark,
                attachmentIds: attachmentIds && attachmentIds.length > 0 ? attachmentIds : undefined,
              };

              return ProjectIssueAssignAsync(dto)
                .then(() => {
                  message.success('指派成功');
                  if (onSuccess) onSuccess();
                })
                .then(() => {
                  next(payload);
                });
            })
            .open(formProps);
        }}
        {...buttonProps}
      >
        指派
      </Button>
    </FormDialog.Portal>
  );
};

export default AssignDialog;
