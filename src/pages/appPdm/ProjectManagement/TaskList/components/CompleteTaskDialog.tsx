import React, { useState } from 'react';
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { Button, message } from 'antd';
import {
  ProjectTaskCompleteTaskAsync,
  ProjectTaskGetExecutionRecordsAsync,
} from '@/services/pdm/ProjectTask';
import { DatePicker, FormItem, Input } from '@formily/antd-v5';
import dayjs from 'dayjs';
import { createSchemaField } from '@formily/react';
import { onFormInit, onFieldValueChange } from '@formily/core';

const SchemaField = createSchemaField({
  components: {
    DatePicker,
    FormItem,
    Input,
  },
});

interface CompleteTaskDialogProps {
  taskId: string;
  taskData?: any;
  onSuccess?: () => void;
  buttonProps?: any;
}

const CompleteTaskDialog: React.FC<CompleteTaskDialogProps> = ({
  taskId,
  taskData,
  onSuccess,
  buttonProps,
}) => {
  const [actualStartTime, setActualStartTime] = useState<any>(null);

  const schema = {
    type: 'object',
    properties: {
      actualStartTime: {
        type: 'string',
        title: '实际开始时间',
        required: true,
        'x-decorator': 'FormItem',
        'x-component': 'DatePicker',
        'x-component-props': {
          showTime: true,
          format: 'YYYY-MM-DD HH:mm:ss',
          placeholder: '请选择实际开始时间',
          style: { width: '100%' },
        },
        'x-pattern': 'readPretty',
      },
      actualEndTime: {
        type: 'string',
        title: '实际完成时间',
        required: true,
        'x-decorator': 'FormItem',
        'x-component': 'DatePicker',
        'x-component-props': {
          showTime: true,
          format: 'YYYY-MM-DD HH:mm:ss',
          placeholder: '请选择实际完成时间',
          style: { width: '100%' },
        },
        'x-reactions': {
          dependencies: ['actualStartTime'],
          fulfill: {
            state: {
              componentProps: {
                disabledDate: '{{(current) => $deps[0] && current && current.isBefore($deps[0], "day")}}',
              },
            },
          },
        },
      },
      remark: {
        type: 'string',
        title: '完成说明',
        'x-decorator': 'FormItem',
        'x-component': 'Input.TextArea',
        'x-component-props': {
          placeholder: '请输入完成说明',
          rows: 4,
        },
      },
    },
  };

  const portalId = `ProjectTask.CompleteTask.${taskId}`;

  const handleClick = async () => {
    // 先获取任务的实际开始时间
    let startTime = null;

    try {
      console.log('CompleteTask - taskData:', taskData);
      console.log('CompleteTask - actualStartDate:', taskData?.actualStartDate);

      // 优先使用 taskData 中的 actualStartDate
      if (taskData?.actualStartDate) {
        startTime = dayjs(taskData.actualStartDate);
      } else {
        // 如果 taskData 没有，从执行记录中获取
        const records = await ProjectTaskGetExecutionRecordsAsync({ taskId });
        console.log('CompleteTask - execution records:', records);
        const startRecord = records?.find((r: any) => r.recordType === 2);
        console.log('CompleteTask - start record:', startRecord);
        if (startRecord && startRecord.operationTime) {
          startTime = dayjs(startRecord.operationTime);
        }
      }

      console.log('CompleteTask - final startTime:', startTime);

      if (!startTime) {
        message.warning('任务尚未开始，请先开始任务');
        return;
      }
    } catch (error) {
      console.error('CompleteTask - error:', error);
      message.error('加载任务开始时间失败');
      return;
    }

    // 创建表单对话框
    const formDialog = FormDialog(
      {
        title: '完成任务',
        width: 600,
      },
      portalId,
      (form) => {
        // 在表单渲染时设置初始值
        form.setInitialValues({
          actualStartTime: startTime,
          actualEndTime: dayjs(),
        });

        return (
          <FormLayout labelCol={6} wrapperCol={18}>
            <SchemaField schema={schema} />
          </FormLayout>
        );
      },
    );

    formDialog
      .forConfirm(async (payload, next) => {
        const hide = message.loading('正在完成任务...', 0);
        try {
          // 验证结束时间不能早于开始时间
          const startTime = dayjs(payload.values.actualStartTime);
          const endTime = dayjs(payload.values.actualEndTime);

          if (endTime.isBefore(startTime)) {
            message.error('实际完成时间不能早于实际开始时间');
            hide();
            return;
          }

          // 转换日期格式为 ISO 字符串
          const actualStartTime = startTime.format('YYYY-MM-DDTHH:mm:ss');
          const actualEndTime = endTime.format('YYYY-MM-DDTHH:mm:ss');

          const requestData = {
            taskId,
            actualStartTime,
            actualEndTime,
            remark: payload.values.remark || '',
          };

          console.log('CompleteTask - Request Data:', requestData);

          await ProjectTaskCompleteTaskAsync(requestData);

          message.success('任务已完成');
          onSuccess?.();
          await next();
        } catch (error: any) {
          message.error(`完成任务失败: ${error.message || '未知错误'}`);
          throw error;
        } finally {
          hide();
        }
      })
      .open();
  };

  return (
    <FormDialog.Portal id={portalId}>
      <Button {...buttonProps} onClick={handleClick} />
    </FormDialog.Portal>
  );
};

export default CompleteTaskDialog;
