/**
 * 记录单信息表单页
 * 路由: /appPdm/ProjectManagement/RecordInformationList/form?id={id}
 * 新建模式:无id参数
 * 编辑模式:有id参数
 */

import React, { useEffect, useState, useMemo } from 'react';
import { Card, Button, message, Spin } from 'antd';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import { history, useSchemaField, closeTab } from 'umi';
import { useKeepAliveParams, useAttachmentUpload } from '@/hooks';
import { createForm } from '@formily/core';
import { Form } from '@formily/antd-v5';
import { ToolBar } from '@/components';
import {
  RecordInformationGetAsync,
  RecordInformationCreateAsync,
  RecordInformationUpdateAsync,
} from '@/services/pdm/RecordInformation';
import { ProjectGetListAsync } from '@/services/pdm/Project';
import UserSelect from '@/pages/appPdm/_formWidgets/UserSelect';
import ProjectSelect from '@/pages/appPdm/_formWidgets/ProjectSelect';
import TaskTypeSelect from '@/pages/appPdm/_formWidgets/TaskTypeSelect';
import ProjectMilestoneSelect from '@/pages/appPdm/_formWidgets/ProjectMilestoneSelect';
import { formSchema } from './components/schema';
import moment from 'moment';

export const routeProps = {
  name: '记录单信息表单',
};

const RecordInformationFormPage: React.FC = () => {
  const { id: recordId, isActive, hasChanged } = useKeepAliveParams(
    '/appPdm/ProjectManagement/RecordInformationList/form',
    ['id']
  );
  const isEdit = !!recordId;

  // 配置附件上传
  const AttachmentUploadWithConfig = useAttachmentUpload(
    recordId,
    '/api/pdm/project-management/record-forms'
  );

  const SchemaField = useSchemaField({
    UserSelect,
    ProjectSelect,
    TaskTypeSelect,
    ProjectMilestoneSelect,
    MultiAttachmentUpload: AttachmentUploadWithConfig,
  });

  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  // 创建表单实例
  const form = useMemo(
    () => createForm({ validateFirst: true }),
    [recordId]
  );

  // 加载初始数据
  useEffect(() => {
    // 只要页面激活且有 recordId,就加载数据
    if (!isActive) return;

    if (recordId) {
      setLoading(true);
      RecordInformationGetAsync({ id: recordId })
        .then(async res => {
          const formData: any = { ...res };

          // 处理提出时间
          if (res.proposedDate) {
            formData.proposedDate = moment(res.proposedDate);
          }

          // 处理提出人 - 保留原始字段以便编辑时兜底使用
          if (res.proposerUserId) {
            formData['{value:proposerUserId,label:proposerUserName}'] = {
              value: res.proposerUserId,
              label: res.proposerUserName || res.proposerUserId,
              key: res.proposerUserId,
            };
            // 保留原始字段用于兜底
            formData.proposerUserId = res.proposerUserId;
            formData.proposerUserName = res.proposerUserName;
          }

          // 处理参与人员（逗号分隔转数组）
          if (res.participantIds && res.participantNames) {
            const ids = res.participantIds.split(',').filter(Boolean);
            const names = res.participantNames.split(',').filter(Boolean);
            const participants = ids.map((id: string, index: number) => ({
              value: id,
              label: names[index] || id,
              key: id,
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
                projectCode: task.projectCode, // 回显项目编码
                projectName: task.projectName, // 回显项目名称
              };

              // 处理任务类型 - 同时保存复合字段和拆分字段以确保回显
              if (task.taskTypeCode && task.taskTypeName) {
                taskData['{value:taskTypeCode,label:taskTypeName}'] = {
                  value: task.taskTypeCode,
                  label: task.taskTypeName,
                };
                // 保留拆分字段用于兜底
                taskData.taskTypeCode = task.taskTypeCode;
                taskData.taskTypeName = task.taskTypeName;
              }

              // 处理里程碑 - 同时保存复合字段和拆分字段以确保回显
              if (task.milestoneId) {
                taskData['{value:milestoneId,label:milestoneName}'] = {
                  value: task.milestoneId,
                  label: task.milestoneName || task.milestoneId,
                };
                // 保留拆分字段用于兜底
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

          // 处理附件数据 - 转换字段名以匹配前端组件期望的格式
          if (res.attachments && Array.isArray(res.attachments)) {
            formData.attachments = res.attachments.map((att: any) => ({
              id: att.id,
              entityId: att.entityId || res.id,
              entityTypeName: att.entityTypeName || 'RecordInformation',
              name: att.fileName || att.name, // 后端返回 fileName(驼峰),转换为 name
              size: att.fileSize || att.size, // 后端返回 fileSize(驼峰),转换为 size
              type: att.contentType || att.type, // 后端返回 contentType(驼峰),转换为 type
              blobName: att.blobName,
              documentUrl: att.documentUrl,
              uploadTime: att.uploadTime,
            }));
          }

          // 处理项目字段 - 后端返回的 projectId 是项目的 UUID
          // 需要转换为 projectCode,并构造 labelInValue 格式
          if (res.projectId) {
            // 保留原始的 projectId
            formData.projectId = res.projectId;

            try {
              const projectList = await ProjectGetListAsync({ MaxResultCount: 1000 });
              if (projectList.items) {
                const project = projectList.items.find((p: any) => p.id === res.projectId);
                if (project && project.projectCode) {
                  formData['{value:projectCode,label:projectName}'] = {
                    value: project.projectCode,
                    label: project.projectName,
                    id: project.id, // 包含 id 以便提交时使用
                  };
                  formData.projectCode = project.projectCode;
                  formData.projectName = project.projectName;
                }
              }
            } catch (error) {
              console.error('查询项目列表失败:', error);
            }
          }

          // 所有数据处理完成后,统一设置表单初始值
          console.log('=== 表单回显调试 ===');
          console.log('后端返回的完整数据 res:', res);

          // 提出人调试
          console.log('提出人数据:', {
            后端返回_proposerUserId: res.proposerUserId,
            后端返回_proposerUserId类型: typeof res.proposerUserId,
            后端返回_proposerUserName: res.proposerUserName,
            formData复合字段: formData['{value:proposerUserId,label:proposerUserName}'],
            formData拆分_proposerUserId: formData.proposerUserId,
            formData拆分_proposerUserName: formData.proposerUserName,
          });

          // 任务列表调试
          console.log('formData.tasks:', formData.tasks);
          if (formData.tasks && formData.tasks.length > 0) {
            const firstTask = formData.tasks[0];
            console.log('第一个任务数据:', {
              复合字段_任务类型: firstTask['{value:taskTypeCode,label:taskTypeName}'],
              拆分字段_taskTypeCode: firstTask.taskTypeCode,
              拆分字段_taskTypeName: firstTask.taskTypeName,
              复合字段_里程碑: firstTask['{value:milestoneId,label:milestoneName}'],
              拆分字段_milestoneId: firstTask.milestoneId,
              拆分字段_milestoneName: firstTask.milestoneName,
            });
          }

          form.setInitialValues(formData);
          form.setValues(formData);

          // 延迟验证表单值是否正确设置
          setTimeout(() => {
            console.log('=== 表单设置后验证 ===');

            // 验证提出人
            const proposerField = form.getValuesIn('{value:proposerUserId,label:proposerUserName}');
            const proposerUserId = form.getValuesIn('proposerUserId');
            console.log('表单中提出人:', {
              复合字段: proposerField,
              拆分字段_proposerUserId: proposerUserId,
            });

            // 验证任务列表
            const tasks = form.getValuesIn('tasks');
            console.log('表单设置后的 tasks 值:', tasks);
            if (tasks && tasks.length > 0) {
              console.log('表单中第一个任务:', {
                复合字段_任务类型: tasks[0]['{value:taskTypeCode,label:taskTypeName}'],
                拆分字段_taskTypeCode: tasks[0].taskTypeCode,
                复合字段_里程碑: tasks[0]['{value:milestoneId,label:milestoneName}'],
                拆分字段_milestoneId: tasks[0].milestoneId,
              });
            }
          }, 100);
        })
        .catch(() => {
          message.error('加载数据失败');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isActive, recordId]);

  // 返回列表
  const handleBack = (needRefresh: boolean = false) => {
    const currentPath = window.location.pathname;
    const targetPath = needRefresh
      ? '/appPdm/ProjectManagement/RecordInformationList?refresh=true'
      : '/appPdm/ProjectManagement/RecordInformationList';
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

      console.log('=== 表单提交调试信息 ===');
      console.log('完整表单值:', values);
      console.log('项目复合字段:', values['{value:projectCode,label:projectName}']);
      console.log('recordFormType:', values.recordFormType);
      console.log('projectCode:', values.projectCode);
      console.log('projectId:', values.projectId);

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
        subject: values.subject,
        proposedDate: values.proposedDate ? moment(values.proposedDate).format('YYYY-MM-DDTHH:mm:ss') : undefined,
        recordFormType: values.recordFormType || 1,
        eventContent: values.eventContent,
        hasTasks: values.hasTasks || false,
      };

      // 处理项目字段 - Formily 可能会自动拆分复合字段
      // 优先使用拆分后的 projectCode 和 projectName
      const projectField = values['{value:projectCode,label:projectName}'];
      console.log('项目字段处理:', {
        projectField,
        hasValue: projectField && projectField.value,
        projectFieldId: projectField?.id,
        valuesProjectId: values.projectId,
        valuesProjectCode: values.projectCode,
        valuesProjectName: values.projectName
      });

      // 优先级: 直接字段 > 复合字段 > 兜底查询
      if (values.projectCode) {
        // Formily 已经自动拆分了复合字段
        submitData.projectCode = values.projectCode;
        console.log('使用 values.projectCode:', values.projectCode);

        if (values.projectId) {
          // 如果已有 projectId,直接使用
          submitData.projectId = values.projectId;
          console.log('使用 values.projectId:', values.projectId);
        } else {
          // 根据 projectCode 查询 projectId
          console.log('需要查询 projectId, projectCode:', values.projectCode);
          const projectList = await ProjectGetListAsync({ MaxResultCount: 1000 });
          const project = projectList.items?.find((p: any) => p.projectCode === values.projectCode);
          if (project) {
            submitData.projectId = project.id;
            console.log('查询到 projectId:', project.id);
          } else {
            console.warn('未找到匹配的项目!');
          }
        }
      } else if (projectField && projectField.value) {
        // 使用复合字段
        submitData.projectCode = projectField.value;
        console.log('使用复合字段 projectCode:', projectField.value);

        if (projectField.id) {
          submitData.projectId = projectField.id;
          console.log('使用 projectField.id:', projectField.id);
        } else {
          // 查询 projectId
          console.log('需要查询 projectId, projectCode:', projectField.value);
          const projectList = await ProjectGetListAsync({ MaxResultCount: 1000 });
          const project = projectList.items?.find((p: any) => p.projectCode === projectField.value);
          if (project) {
            submitData.projectId = project.id;
            console.log('查询到 projectId:', project.id);
          } else {
            console.warn('未找到匹配的项目!');
          }
        }
      }

      console.log('最终 submitData:', {
        projectCode: submitData.projectCode,
        projectId: submitData.projectId,
        recordFormType: submitData.recordFormType
      });

      // 移除附件字段(附件已通过 API 单独上传)
      // 附件数据不需要在创建/更新时提交
      delete (values as any).attachments;

      // 处理提出人 - 优先使用复合字段,兜底使用原始字段(编辑模式下如果没修改)
      const proposerField = values['{value:proposerUserId,label:proposerUserName}'];
      if (proposerField && proposerField.value) {
        // 复合字段有有效值
        submitData.proposerUserId = proposerField.value;
        submitData.proposerUserName = proposerField.label || proposerField.value;
      } else if (values.proposerUserId) {
        // 编辑模式下如果用户没有重新选择提出人,使用原始数据
        submitData.proposerUserId = values.proposerUserId;
        submitData.proposerUserName = values.proposerUserName || values.proposerUserId;
      }

      // 处理参与人员
      if (values.participantIdsArray && Array.isArray(values.participantIdsArray)) {
        submitData.participantIds = values.participantIdsArray.map((p: any) => p.value).join(',');
        submitData.participantNames = values.participantIdsArray.map((p: any) => p.label).join(',');
      }

      // 处理任务列表
      if (values.tasks && Array.isArray(values.tasks) && values.hasTasks) {
        submitData.tasks = values.tasks.map((task: any) => {
          const taskData: any = {
            id: task.id, // 有id表示更新,无id表示新增
            taskName: task.taskName,
            description: task.description,
            projectId: submitData.projectId, // 使用前面提取的项目ID
            projectCode: submitData.projectCode, // 添加项目编码
            projectName: submitData.projectName, // 添加项目名称
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

          // 处理负责人（逗号分隔转数组）
          if (task.chargeIdsArray && Array.isArray(task.chargeIdsArray)) {
            taskData.chargeIds = task.chargeIdsArray.map((p: any) => p.value).join(',');
            taskData.chargeNames = task.chargeIdsArray.map((p: any) => p.label).join(',');
          }

          // 处理处理人（逗号分隔转数组）
          if (task.processIdsArray && Array.isArray(task.processIdsArray)) {
            taskData.processIds = task.processIdsArray.map((p: any) => p.value).join(',');
            taskData.processNames = task.processIdsArray.map((p: any) => p.label).join(',');
          }

          return taskData;
        });
      }

      if (isEdit) {
        await RecordInformationUpdateAsync({ id: values.id }, submitData);
      } else {
        await RecordInformationCreateAsync(submitData);
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
        title={isEdit ? '编辑记录单信息' : '新建记录单信息'}
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
        <Form form={form} {...formSchema.form}>
          <SchemaField schema={formSchema.schema} />
        </Form>
      </Card>
    </Spin>
  );
};

export default RecordInformationFormPage;
