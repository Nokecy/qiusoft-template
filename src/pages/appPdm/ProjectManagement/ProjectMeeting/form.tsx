/**
 * 项目会议表单页
 * 路由: /appPdm/ProjectManagement/ProjectMeeting/form?id={id}
 * 新建模式:无id参数
 * 编辑模式:有id参数
 */

import React, { useEffect, useState, useMemo } from 'react';
import { Card, Button, message, Spin } from 'antd';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import { history, useSchemaField, closeTab } from 'umi';
import { useKeepAliveParams } from '@/hooks';
import { createForm } from '@formily/core';
import { FormProvider } from '@formily/react';
import { ToolBar } from '@/components';
import {
  ProjectMeetingGetAsync,
  ProjectMeetingCreateAsync,
  ProjectMeetingUpdateAsync,
} from '@/services/pdm/ProjectMeeting';
import UserSelect from '@/pages/appPdm/_formWidgets/UserSelect';
import ProjectSelect from '@/pages/appPdm/_formWidgets/ProjectSelect';
import TaskTypeSelect from '@/pages/appPdm/_formWidgets/TaskTypeSelect';
import ProjectMemberSelect from '@/pages/appPdm/_formWidgets/ProjectMemberSelect';
import ProjectMilestoneSelect from '@/pages/appPdm/_formWidgets/ProjectMilestoneSelect';
import { formSchema } from './components/schema';
import moment from 'moment';

export const routeProps = {
  name: '项目会议表单',
};

const ProjectMeetingFormPage: React.FC = () => {
  const { id: meetingId, isActive, hasChanged } = useKeepAliveParams(
    '/appPdm/ProjectManagement/ProjectMeeting/form',
    ['id']
  );
  const isEdit = !!meetingId;

  const SchemaField = useSchemaField({
    UserSelect,
    ProjectSelect,
    TaskTypeSelect,
    ProjectMemberSelect,
    ProjectMilestoneSelect,
  });

  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  // 创建表单实例（简化版，不使用 effects）
  const form = useMemo(
    () => createForm({
      validateFirst: true,
    }),
    [meetingId]
  );

  // 加载初始数据
  useEffect(() => {
    if (!isActive || !hasChanged) return;

    if (meetingId) {
      setLoading(true);
      ProjectMeetingGetAsync({ id: meetingId })
        .then(res => {
          // 转换数据
          const formData: any = { ...res };

          // 处理时间字段
          if (res.startTime) {
            formData.startTime = moment(res.startTime);
          }
          if (res.endTime) {
            formData.endTime = moment(res.endTime);
          }

          // 处理主持人
          if (res.hostId && res.hostName) {
            formData.host = {
              value: res.hostId,
              label: res.hostName,
            };
          }

          // 处理记录人
          if (res.recorderId && res.recorderName) {
            formData.recorder = {
              value: res.recorderId,
              label: res.recorderName,
            };
          }

          // 处理参会人员（逗号分隔转数组）
          if (res.participantIds && res.participantNames) {
            const ids = res.participantIds.split(',').filter(Boolean);
            const names = res.participantNames.split(',').filter(Boolean);
            const participants = ids.map((id: string, index: number) => ({
              value: id,
              label: names[index] || id,
            }));
            formData.participantIdsArray = participants;
          }

          // 处理任务列表
          if (res.tasks && Array.isArray(res.tasks)) {
            formData.tasks = res.tasks.map((task: any) => {
              const taskData: any = {
                id: task.id,
                taskCode: task.taskCode,
                taskName: task.taskName,
                description: task.description,
              };

              // 处理任务类型
              if (task.taskTypeCode && task.taskTypeName) {
                taskData['{value:taskTypeCode,label:taskTypeName}'] = {
                  value: task.taskTypeCode,
                  label: task.taskTypeName,
                };
              }

              // 处理里程碑
              if (task.milestoneId) {
                taskData['{value:milestoneId,label:milestoneName}'] = {
                  value: task.milestoneId,
                  label: task.milestoneName || task.milestoneId,
                };
                taskData.milestoneId = task.milestoneId;
                taskData.milestoneName = task.milestoneName;
              }

              // 处理负责人（逗号分隔转数组）
              if (task.chargeIds && task.chargeNames) {
                const chargeIds = task.chargeIds.split(',').filter(Boolean);
                const chargeNames = task.chargeNames.split(',').filter(Boolean);
                taskData.chargeIdsArray = chargeIds.map((id: string, index: number) => ({
                  value: id,
                  label: chargeNames[index] || id,
                }));
              }

              // 处理处理人（逗号分隔转数组）
              if (task.processIds && task.processNames) {
                const processIds = task.processIds.split(',').filter(Boolean);
                const processNames = task.processNames.split(',').filter(Boolean);
                taskData.processIdsArray = processIds.map((id: string, index: number) => ({
                  value: id,
                  label: processNames[index] || id,
                }));
              }

              return taskData;
            });
          }

          form.setInitialValues(formData);
        })
        .catch(() => {
          message.error('加载数据失败');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isActive, hasChanged, meetingId, form]);

  // 返回列表
  const handleBack = (needRefresh: boolean = false) => {
    const currentPath = window.location.pathname;
    const targetPath = needRefresh
      ? '/appPdm/ProjectManagement/ProjectMeeting?refresh=true'
      : '/appPdm/ProjectManagement/ProjectMeeting';
    history.push(targetPath);
    setTimeout(() => {
      closeTab(currentPath);
    }, 150);
  };

  // 保存
  const handleSave = async () => {
    setSubmitting(true);
    try {
      const values = await form.submit();

      // 如果开启了任务下发,手动验证任务列表
      if (values.hasTasks && values.tasks && Array.isArray(values.tasks)) {
        // 验证所有任务是否都填写了必填字段
        for (let i = 0; i < values.tasks.length; i++) {
          const task = values.tasks[i];

          // 检查任务名称
          if (!task.taskName || !task.taskName.trim()) {
            message.error(`第 ${i + 1} 行任务:请填写任务名称`);
            setSubmitting(false);
            return;
          }

          // 检查任务类型 - Formily会自动将复合字段拆分为 taskTypeCode 和 taskTypeName
          const taskTypeField = task['{value:taskTypeCode,label:taskTypeName}'];
          const taskTypeCode = task.taskTypeCode;

          const hasTaskType = (taskTypeField && (
            // 格式1: labelInValue格式 {value: 'xxx', label: 'xxx'}
            (typeof taskTypeField === 'object' && taskTypeField.value) ||
            // 格式2: 直接字符串值
            (typeof taskTypeField === 'string' && taskTypeField.trim())
          )) || (taskTypeCode && taskTypeCode.trim());

          if (!hasTaskType) {
            message.error(`第 ${i + 1} 行任务:请选择任务类型`);
            setSubmitting(false);
            return;
          }
        }
      }

      // 转换数据
      const submitData: any = {
        meetingName: values.meetingName,
        startTime: values.startTime ? moment(values.startTime).format('YYYY-MM-DDTHH:mm:ss') : undefined,
        endTime: values.endTime ? moment(values.endTime).format('YYYY-MM-DDTHH:mm:ss') : undefined,
        location: values.location,
        hostId: values.host?.value,
        hostName: values.host?.name || values.host?.label,
        recorderId: values.recorder?.value,
        recorderName: values.recorder?.name || values.recorder?.label,
        mainContent: values.mainContent,
        executionContent: values.executionContent,
        projectCode: values.projectCode,
        hasTasks: values.hasTasks || false,
      };

      // 处理参会人员（数组转逗号分隔字符串，必填字段）
      if (values.participantIdsArray && Array.isArray(values.participantIdsArray) && values.participantIdsArray.length > 0) {
        submitData.participantIds = values.participantIdsArray.map((p: any) => p.value).join(',');
        submitData.participantNames = values.participantIdsArray.map((p: any) => p.label).join(',');
      } else {
        // 如果没有参会人员，使用空字符串以满足必填要求
        submitData.participantIds = '';
        submitData.participantNames = '';
      }

      // 处理任务列表
      if (values.tasks && Array.isArray(values.tasks) && values.hasTasks) {
        submitData.tasks = values.tasks.map((task: any) => {
          const taskData: any = {
            id: task.id, // 有id表示更新，无id表示新增
            taskName: task.taskName,
            description: task.description,
            projectCode: values.projectCode, // 使用表单的项目编码
          };

          // 处理任务类型 - Formily会自动拆分复合字段,优先使用拆分后的字段
          const taskTypeField = task['{value:taskTypeCode,label:taskTypeName}'];
          if (task.taskTypeCode) {
            // 优先使用拆分后的字段
            taskData.taskTypeCode = task.taskTypeCode;
            taskData.taskTypeName = task.taskTypeName || task.taskTypeCode;
          } else if (taskTypeField) {
            // 兼容复合字段格式
            if (typeof taskTypeField === 'object') {
              taskData.taskTypeCode = taskTypeField.value;
              taskData.taskTypeName = taskTypeField.label;
            } else {
              taskData.taskTypeCode = taskTypeField;
              taskData.taskTypeName = taskTypeField;
            }
          }

          // 处理里程碑 - 同样优先使用拆分后的字段
          const milestoneField = task['{value:milestoneId,label:milestoneName}'];
          if (task.milestoneId) {
            taskData.milestoneId = task.milestoneId;
            taskData.milestoneName = task.milestoneName || task.milestoneId;
          } else if (milestoneField) {
            if (typeof milestoneField === 'object') {
              taskData.milestoneId = milestoneField.value;
              taskData.milestoneName = milestoneField.label;
            } else {
              taskData.milestoneId = milestoneField;
              taskData.milestoneName = milestoneField;
            }
          }

          // 处理负责人（数组转逗号分隔字符串）
          if (task.chargeIdsArray && Array.isArray(task.chargeIdsArray)) {
            taskData.chargeIds = task.chargeIdsArray.map((p: any) => p.value).join(',');
            taskData.chargeNames = task.chargeIdsArray.map((p: any) => p.label).join(',');
          }

          // 处理处理人（数组转逗号分隔字符串）
          if (task.processIdsArray && Array.isArray(task.processIdsArray)) {
            taskData.processIds = task.processIdsArray.map((p: any) => p.value).join(',');
            taskData.processNames = task.processIdsArray.map((p: any) => p.label).join(',');
          }

          return taskData;
        });
      }

      if (isEdit) {
        await ProjectMeetingUpdateAsync({ id: values.id }, submitData);
      } else {
        await ProjectMeetingCreateAsync(submitData);
      }

      message.success('保存成功');
      handleBack(true);
    } catch (error: any) {
      if (error.message && !error.message.includes('不能为空')) {
        message.error('保存失败');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <Card
        headStyle={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: '#fff',
        }}
        title={isEdit ? '编辑项目会议' : '新建项目会议'}
        extra={
          <ToolBar>
            <Button icon={<ArrowLeftOutlined />} onClick={() => handleBack()}>
              返回
            </Button>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              loading={submitting}
              onClick={handleSave}
            >
              保存
            </Button>
          </ToolBar>
        }
      >
        <FormProvider form={form}>
          <SchemaField schema={formSchema.schema} />
        </FormProvider>
      </Card>
    </Spin>
  );
};

export default ProjectMeetingFormPage;
