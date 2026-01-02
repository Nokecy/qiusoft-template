import React, { useMemo, FC } from 'react';
import { useIntl } from 'umi';
import { Button } from 'antd';
import { Checkbox, FormDialog, FormGrid, FormItem, FormLayout, Input, Space } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { WorkflowItemUgring } from '@/services/workflow/WorkflowItem';
import { message } from 'antd/lib';

interface WorkflowReturnOriginatorDialogProps {
  workflowInfo: {
    workflowInstanceId?: string;
    workflowActivityIds?: string[];
  };
  buttonProps?: React.ComponentProps<typeof Button>;
  onConfirm?: () => void;
}

// 任务催办

const WorkflowPressTransactionDialog: FC<WorkflowReturnOriginatorDialogProps> = ({ workflowInfo, buttonProps, onConfirm }) => {
  const intl = useIntl();

  const SchemaField = useMemo(
    () =>
      createSchemaField({
        components: {
          FormItem,
          FormGrid,
          Checkbox,
          Space,
          Input,
        },
      }),
    []
  );

  const formProps = {
    effects: () => {
      onFormInit(() => { });
    },
  };

  const onPress = (workflowPressInfo: any) => {
    return WorkflowItemUgring(workflowPressInfo);
  };

  if (!workflowInfo?.workflowInstanceId) {
    return null;
  }

  const PortalId = 'WorkflowPressTransaction';

  return (
    <FormDialog.Portal id={PortalId}>
      <Button
        type='link'
        onClick={() => {
          const formDialog = FormDialog({ title: '任务催办', width: 480 }, PortalId, (form) => {
            return (
              <FormLayout labelWidth={80}>
                <SchemaField>
                  <SchemaField.String
                    title='催办内容'
                    required
                    name='content'
                    x-decorator='FormItem'
                    x-component='Input.TextArea'
                    x-component-props={{ placeholder: '请输入催办内容,不输入默认显示空' }}
                  />
                </SchemaField>
              </FormLayout>
            );
          });

          formDialog
            .forConfirm((payload, next) => {
              const values = payload.values;
              return onPress({ ...workflowInfo, ...values }).then(() => {
                message.success('催办成功');
                next(payload);
                if (onConfirm) onConfirm();
              });
            })
            .open(formProps);
        }}
        {...buttonProps}
      >
        催办
      </Button>
    </FormDialog.Portal>
  );
};

export default WorkflowPressTransactionDialog;
