/**
 * 合理化建议表单页
 * 路由: /appPdm/ProjectManagement/RationalizationProposalList/form?id={id}
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
  RationalizationProposalGetAsync,
  RationalizationProposalCreateAsync,
  RationalizationProposalUpdateAsync,
} from '@/services/pdm/RationalizationProposal';
import { ProjectGetListAsync } from '@/services/pdm/Project';
import UserSelect from '@/pages/appPdm/_formWidgets/UserSelect';
import ProjectSelect from '@/pages/appPdm/_formWidgets/ProjectSelect';
import TaskTypeSelect from '@/pages/appPdm/_formWidgets/TaskTypeSelect';
import ProjectMilestoneSelect from '@/pages/appPdm/_formWidgets/ProjectMilestoneSelect';
import { formSchema } from './components/schema';
import moment from 'moment';

export const routeProps = {
  name: '合理化建议表单',
};

const RationalizationProposalFormPage: React.FC = () => {
  const { id: proposalId, isActive, hasChanged } = useKeepAliveParams(
    '/appPdm/ProjectManagement/RationalizationProposalList/form',
    ['id']
  );
  const isEdit = !!proposalId;

  // 配置附件上传
  const AttachmentUploadWithConfig = useAttachmentUpload(
    proposalId,
    '/api/pdm/project-management/rationalization-proposals'
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
    [proposalId]
  );

  // 加载初始数据
  useEffect(() => {
    if (!isActive || !hasChanged) return;

    if (proposalId) {
      setLoading(true);
      RationalizationProposalGetAsync({ id: proposalId })
        .then(res => {
          const formData: any = { ...res };

          // 处理提出时间
          if (res.proposedDate) {
            formData.proposedDate = moment(res.proposedDate);
          }

          // 处理提出人
          if (res.proposerUserId) {
            formData['{value:proposerUserId,label:proposerUserName}'] = {
              value: res.proposerUserId,
              label: res.proposerUserName || res.proposerUserId,
            };
          }

          // 处理参与人员（逗号分隔转数组）
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

              // 处理任务类型 - 同时设置复合字段和拆分字段
              if (task.taskTypeCode) {
                taskData['{value:taskTypeCode,label:taskTypeName}'] = {
                  value: task.taskTypeCode,
                  label: task.taskTypeName || task.taskTypeCode,
                };
                // 同时设置拆分字段，以防 Formily 自动拆分
                taskData.taskTypeCode = task.taskTypeCode;
                taskData.taskTypeName = task.taskTypeName || task.taskTypeCode;
              }

              // 处理里程碑 - 同时设置复合字段和拆分字段
              if (task.milestoneId) {
                taskData['{value:milestoneId,label:milestoneName}'] = {
                  value: task.milestoneId,
                  label: task.milestoneName || task.milestoneId,
                };
                // 同时设置拆分字段
                taskData.milestoneId = task.milestoneId;
                taskData.milestoneName = task.milestoneName || task.milestoneId;
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
              entityTypeName: att.entityTypeName || 'RationalizationProposal',
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
          // 如果 projectId 为 null,尝试从任务列表中提取 projectCode
          let projectCodeToQuery = null;

          if (res.projectId) {
            projectCodeToQuery = 'byId';
          } else if (res.tasks && res.tasks.length > 0 && res.tasks[0].projectCode) {
            // 从第一个任务中获取 projectCode
            projectCodeToQuery = res.tasks[0].projectCode;
            console.log('从任务中提取 projectCode:', projectCodeToQuery);
          }

          if (projectCodeToQuery) {
            ProjectGetListAsync({ MaxResultCount: 1000 })
              .then(projectList => {
                if (projectList.items) {
                  let project;

                  if (projectCodeToQuery === 'byId') {
                    // 通过 projectId 查找
                    project = projectList.items.find((p: any) => p.id === res.projectId);
                  } else {
                    // 通过 projectCode 查找
                    project = projectList.items.find((p: any) => p.projectCode === projectCodeToQuery);
                  }

                  if (project && project.projectCode) {
                    formData['{value:projectCode,label:projectName}'] = {
                      value: project.projectCode,
                      label: project.projectName,
                    };
                    formData.projectCode = project.projectCode;
                    formData.projectId = project.id;
                    // 项目数据加载完成后再设置表单值
                    form.setInitialValues(formData);
                    form.setValues(formData);
                  }
                }
              })
              .catch(error => {
                console.error('查询项目列表失败:', error);
                // 即使项目查询失败，也要设置其他表单数据
                form.setInitialValues(formData);
                form.setValues(formData);
              });
          } else {
            // 没有项目ID时直接设置表单值
            form.setInitialValues(formData);
            form.setValues(formData);
          }
        })
        .catch(() => {
          message.error('加载数据失败');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isActive, hasChanged, proposalId, form]);

  // 返回列表
  const handleBack = (needRefresh: boolean = false) => {
    const currentPath = window.location.pathname;
    const targetPath = needRefresh
      ? '/appPdm/ProjectManagement/RationalizationProposalList?refresh=true'
      : '/appPdm/ProjectManagement/RationalizationProposalList';
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
        proposalTitle: values.proposalTitle,
        proposedDate: values.proposedDate ? moment(values.proposedDate).format('YYYY-MM-DDTHH:mm:ss') : undefined,
        description: values.description,
        hasTasks: values.hasTasks || false,
      };

      // 处理项目字段 - 后端需要 projectId (UUID)
      // ProjectSelect 组件使用 labelInValue:true，返回对象包含 id, projectCode, projectName
      if (values.projectId) {
        // 优先使用直接的 projectId 字段
        submitData.projectId = values.projectId;
      } else if (values['{value:projectCode,label:projectName}']) {
        // 从复合字段中提取 projectId
        const projectField = values['{value:projectCode,label:projectName}'];
        if (typeof projectField === 'object' && projectField.id) {
          submitData.projectId = projectField.id;
        }
      }

      // 移除附件字段(附件已通过 API 单独上传)
      // 附件数据不需要在创建/更新时提交
      delete (values as any).attachments;

      // 处理提出人 - Formily会自动拆分复合字段
      if (values.proposerUserId) {
        // 优先使用拆分后的字段
        submitData.proposerUserId = values.proposerUserId;
        submitData.proposerUserName = values.proposerUserName || values.proposerUserId;
      } else if (values['{value:proposerUserId,label:proposerUserName}']) {
        // 兼容复合字段格式
        const proposerField = values['{value:proposerUserId,label:proposerUserName}'];
        if (typeof proposerField === 'object') {
          submitData.proposerUserId = proposerField.value;
          submitData.proposerUserName = proposerField.label;
        } else {
          submitData.proposerUserId = proposerField;
          submitData.proposerUserName = proposerField;
        }
      }

      // 处理参与人员
      if (values.participantIdsArray && Array.isArray(values.participantIdsArray)) {
        submitData.participantIds = values.participantIdsArray.map((p: any) => p.value).join(',');
        submitData.participantNames = values.participantIdsArray.map((p: any) => p.label).join(',');
      }

      // 处理任务列表
      if (values.tasks && Array.isArray(values.tasks) && values.hasTasks) {
        // 获取项目编码（任务 DTO 需要 projectCode 字符串）
        let projectCodeForTask: string | undefined;
        if (values.projectCode) {
          projectCodeForTask = values.projectCode;
        } else if (values['{value:projectCode,label:projectName}']) {
          const projectField = values['{value:projectCode,label:projectName}'];
          projectCodeForTask = typeof projectField === 'object' ? projectField.value : projectField;
        }

        submitData.tasks = values.tasks.map((task: any) => {
          const taskData: any = {
            id: task.id, // 有id表示更新，无id表示新增
            taskName: task.taskName,
            description: task.description,
            projectCode: projectCodeForTask, // 任务需要 projectCode (字符串)
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
        await RationalizationProposalUpdateAsync({ id: values.id }, submitData);
      } else {
        await RationalizationProposalCreateAsync(submitData);
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
        title={isEdit ? '编辑合理化建议' : '新建合理化建议'}
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

export default RationalizationProposalFormPage;
