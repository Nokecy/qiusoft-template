/**
 * 项目任务表单页
 * 路由: /appPdm/ProjectManagement/TaskList/form?id={id}
 * 新建模式:无id参数
 * 编辑模式:有id参数
 */

import React, { useEffect, useState, useMemo } from 'react';
import { Card, Button, message, Spin } from 'antd';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import { history, useSchemaField, closeTab, useSearchParams } from 'umi';
import { useKeepAliveParams, useAttachmentUpload } from '@/hooks';
import { createForm } from '@formily/core';
import { FormProvider } from '@formily/react';
import { ToolBar } from '@/components';
import {
  ProjectTaskGetAsync,
  ProjectTaskCreateAsync,
  ProjectTaskUpdateAsync,
} from '@/services/pdm/ProjectTask';
import { ProjectIssueDeleteAsync } from '@/services/pdm/ProjectIssue';
import UserSelect from '@/pages/appPdm/_formWidgets/UserSelect';
import ProjectSelect from '@/pages/appPdm/_formWidgets/ProjectSelect';
import TaskTypeSelect from '@/pages/appPdm/_formWidgets/TaskTypeSelect';
import ProjectMilestoneSelect from '@/pages/appPdm/_formWidgets/ProjectMilestoneSelect';
import ProjectMemberSelect from '@/pages/appPdm/_formWidgets/ProjectMemberSelect';
import ProjectTaskSelect from '@/pages/appPdm/_formWidgets/ProjectTaskSelect';
import IssueTypeSelect from '@/pages/appPdm/_formWidgets/IssueTypeSelect';
import { formSchema } from './components/schema';
import moment from 'moment';

export const routeProps = {
  name: '项目任务表单',
};

const ProjectTaskFormPage: React.FC = () => {
  const { id: taskId, isActive, hasChanged } = useKeepAliveParams(
    '/appPdm/ProjectManagement/TaskList/form',
    ['id']
  );
  const isEdit = !!taskId;
  const [searchParams] = useSearchParams();

  // 获取从问题转换的参数
  const fromIssue = searchParams.get('fromIssue') === 'true';
  const issueIdToDelete = searchParams.get('issueId') || '';
  const issueCode = searchParams.get('issueCode') || '';

  // 配置附件上传
  const AttachmentUploadWithConfig = useAttachmentUpload(
    taskId,
    '/api/pdm/project-management/project-tasks'
  );

  const SchemaField = useSchemaField({
    UserSelect,
    ProjectSelect,
    TaskTypeSelect,
    ProjectMilestoneSelect,
    ProjectMemberSelect,
    ProjectTaskSelect,
    IssueTypeSelect,
    MultiAttachmentUpload: AttachmentUploadWithConfig,
  });

  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  // 创建表单实例 - 只创建一次,不依赖 taskId
  const form = useMemo(
    () => createForm({ validateFirst: true }),
    []
  );

  // 加载初始数据
  useEffect(() => {
    if (!isActive) return;

    // 对于从问题转换的情况,不检查 hasChanged,因为这是新建场景
    if (!fromIssue && !hasChanged) return;

    const loadData = async () => {
      if (taskId) {
        // 编辑模式:加载现有任务数据
        setLoading(true);
        ProjectTaskGetAsync({ id: taskId })
          .then(res => {
            const formData: any = { ...res };

            // 处理任务类型 - 只设置复合字段(labelInValue格式)
            if (res.taskTypeCode) {
              formData['{value:taskTypeCode,label:taskTypeName}'] = {
                value: res.taskTypeCode,
                label: res.taskTypeName || res.taskTypeCode,
              };
            }

            // 处理里程碑 - 只设置复合字段(labelInValue格式)
            if (res.milestoneId) {
              formData['{value:milestoneId,label:milestoneName}'] = {
                value: res.milestoneId,
                label: res.milestoneName || res.milestoneId,
              };
            }

            // 处理计划开始时间
            if (res.plannedStartTime) {
              formData.plannedStartTime = moment(res.plannedStartTime);
            }

            // 处理计划结束时间
            if (res.plannedEndTime) {
              formData.plannedEndTime = moment(res.plannedEndTime);
            }

            // 处理负责人（逗号分隔转数组）
            if (res.chargeIds && res.chargeNames) {
              const chargeIds = res.chargeIds.split(',').filter(Boolean);
              const chargeNames = res.chargeNames.split(',').filter(Boolean);
              formData.chargeIdsArray = chargeIds.map((id: string, index: number) => ({
                value: id,
                label: chargeNames[index] || id,
              }));
            }

            // 处理处理人（逗号分隔转数组）
            if (res.processIds && res.processNames) {
              const processIds = res.processIds.split(',').filter(Boolean);
              const processNames = res.processNames.split(',').filter(Boolean);
              formData.processIdsArray = processIds.map((id: string, index: number) => ({
                value: id,
                label: processNames[index] || id,
              }));
            }

            // 处理附件数据 - 后端返回的已经是数组格式,需要映射 contentType -> type
            if (res.attachments) {
              formData.attachments = res.attachments.map((att: any) => ({
                ...att,
                id: att.blobName, // 使用 blobName 作为唯一标识
                name: att.fileName,
                size: att.fileSize,
                type: att.contentType, // 映射 contentType 到 type
              }));
            }

            // 处理风险数据 - 后端 name -> 前端 title
            if (res.risks && Array.isArray(res.risks)) {
              formData.risks = res.risks.map((risk: any) => ({
                ...risk,
                title: risk.name || risk.title, // name → title
              }));
            }

            // 处理问题数据 - 后端 name -> 前端 title
            if (res.issues && Array.isArray(res.issues)) {
              formData.issues = res.issues.map((issue: any) => ({
                ...issue,
                title: issue.name || issue.title, // name → title
              }));
            }

            // 处理成果数据 - 后端 deliverableName -> 前端 name
            if (res.deliverables && Array.isArray(res.deliverables)) {
              formData.deliverables = res.deliverables.map((d: any) => ({
                ...d,
                name: d.deliverableName || d.name, // deliverableName → name
              }));
            }

            form.setInitialValues(formData);
          })
          .catch(() => {
            message.error('加载数据失败');
          })
          .finally(() => {
            setLoading(false);
          });
      } else if (fromIssue && !taskId) {
        // 新建模式:从问题转换,设置初始值
        setLoading(true);
        try {
          console.log('开始从问题转换,读取URL参数');
          const formData: any = {};

          // 从URL参数读取问题数据
          const projectCode = searchParams.get('projectCode');
          const taskName = searchParams.get('taskName');
          const description = searchParams.get('description');
          const remark = searchParams.get('remark');
          const milestoneId = searchParams.get('milestoneId');
          const milestoneName = searchParams.get('milestoneName');
          const expectedEndDate = searchParams.get('expectedEndDate');
          const chargeIdsArrayStr = searchParams.get('chargeIdsArray');

          console.log('URL参数:', {
            projectCode,
            taskName,
            description,
            remark,
            milestoneId,
            milestoneName,
            expectedEndDate,
            chargeIdsArrayStr
          });

          // 先设置项目编码,让 ProjectMilestoneSelect 加载对应项目的里程碑选项
          if (projectCode) {
            console.log('设置项目编码:', projectCode);
            form.setFieldState('projectCode', state => {
              state.value = projectCode;
            });
            formData.projectCode = projectCode;

            // 等待 ProjectMilestoneSelect 加载选项
            await new Promise(resolve => setTimeout(resolve, 500));
          }

          if (taskName) {
            formData.taskName = taskName;
          }

          if (description) {
            formData.description = description;
          }

          if (remark) {
            formData.remark = remark;
          }

          // 处理里程碑字段(labelInValue格式)
          if (milestoneId && milestoneName) {
            formData['{value:milestoneId,label:milestoneName}'] = {
              value: milestoneId,
              label: milestoneName,
            };
          }

          // 设置期望结束日期
          if (expectedEndDate) {
            formData.expectedEndDate = expectedEndDate;
          }

          // 解析负责人数组
          if (chargeIdsArrayStr) {
            try {
              const chargeIdsArray = JSON.parse(chargeIdsArrayStr);
              if (Array.isArray(chargeIdsArray)) {
                // 负责人字段需要提取 value (用户ID)
                const userIds = chargeIdsArray.map((item: any) => item.value);
                formData.chargeIdsArray = userIds;
              }
            } catch (e) {
              console.warn('解析负责人数据失败:', e);
            }
          }

          // 设置表单初始值
          console.log('设置表单初始值:', formData);
          form.setInitialValues(formData);

          // 提示用户这是从问题转换来的
          if (issueCode) {
            message.info(`正在从问题 ${issueCode} 创建任务,请完善任务信息后保存`);
          }
        } catch (error) {
          console.error('设置问题转换初始值失败:', error);
          message.warning('部分问题信息无法自动填充,请手动输入');
        } finally {
          setLoading(false);
        }
      }
    };

    console.log('useEffect执行,条件检查:', { isActive, hasChanged, fromIssue, taskId });
    loadData();
  }, [isActive, hasChanged, taskId, form, fromIssue, searchParams, issueCode]);

  // 返回列表
  const handleBack = (needRefresh: boolean = false) => {
    const currentPath = window.location.pathname;
    const targetPath = needRefresh
      ? '/appPdm/ProjectManagement/TaskList?refresh=true'
      : '/appPdm/ProjectManagement/TaskList';
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

      // 转换数据
      const submitData: any = {
        projectCode: values.projectCode,
        taskName: values.taskName,
        description: values.description,
        urgencyLevel: values.urgencyLevel,
        estimatedHours: values.estimatedHours,
        plannedStartTime: values.plannedStartTime ? moment(values.plannedStartTime).format('YYYY-MM-DDTHH:mm:ss') : undefined,
        plannedEndTime: values.plannedEndTime ? moment(values.plannedEndTime).format('YYYY-MM-DDTHH:mm:ss') : undefined,
      };

      // 移除附件字段(附件已通过 API 单独上传)
      // 附件数据不需要在创建/更新时提交
      delete (values as any).attachments;

      // 处理任务类型 - Formily会自动拆分复合字段,优先使用拆分后的字段
      const taskTypeField = values['{value:taskTypeCode,label:taskTypeName}'];
      if (values.taskTypeCode) {
        // 优先使用拆分后的字段
        submitData.taskTypeCode = values.taskTypeCode;
        submitData.taskTypeName = values.taskTypeName || values.taskTypeCode;
      } else if (taskTypeField) {
        // 兼容复合字段格式
        if (typeof taskTypeField === 'object') {
          submitData.taskTypeCode = taskTypeField.value;
          submitData.taskTypeName = taskTypeField.label;
        } else {
          submitData.taskTypeCode = taskTypeField;
          submitData.taskTypeName = taskTypeField;
        }
      }

      // 处理里程碑 - 同样优先使用拆分后的字段
      const milestoneField = values['{value:milestoneId,label:milestoneName}'];
      if (values.milestoneId) {
        submitData.milestoneId = values.milestoneId;
        submitData.milestoneName = values.milestoneName || values.milestoneId;
      } else if (milestoneField) {
        if (typeof milestoneField === 'object') {
          submitData.milestoneId = milestoneField.value;
          submitData.milestoneName = milestoneField.label;
        } else {
          submitData.milestoneId = milestoneField;
          submitData.milestoneName = milestoneField;
        }
      }

      // 处理负责人（数组转逗号分隔字符串）
      if (values.chargeIdsArray && Array.isArray(values.chargeIdsArray)) {
        submitData.chargeIds = values.chargeIdsArray.map((p: any) => p.value).join(',');
        submitData.chargeNames = values.chargeIdsArray.map((p: any) => p.label).join(',');
      }

      // 处理处理人（数组转逗号分隔字符串）
      if (values.processIdsArray && Array.isArray(values.processIdsArray)) {
        submitData.processIds = values.processIdsArray.map((p: any) => p.value).join(',');
        submitData.processNames = values.processIdsArray.map((p: any) => p.label).join(',');
      }

      if (isEdit) {
        await ProjectTaskUpdateAsync({ id: values.id }, submitData);
        message.success('保存成功');
      } else {
        await ProjectTaskCreateAsync(submitData);

        // 如果是从问题转换来的,删除原问题
        if (fromIssue && issueIdToDelete) {
          try {
            await ProjectIssueDeleteAsync({ id: issueIdToDelete });
            message.success(`任务创建成功,原问题 ${issueCode} 已删除`);
          } catch (error) {
            // 任务已创建成功,但问题删除失败
            console.error('删除原问题失败:', error);
            message.warning(`任务创建成功,但删除原问题失败,请手动删除问题 ${issueCode}`);
          }
        } else {
          message.success('保存成功');
        }
      }

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
        title={isEdit ? '编辑项目任务' : '新建项目任务'}
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

export default ProjectTaskFormPage;
