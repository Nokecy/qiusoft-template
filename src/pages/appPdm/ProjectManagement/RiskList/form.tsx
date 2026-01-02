/**
 * 项目风险表单页
 * 路由: /appPdm/ProjectManagement/RiskList/form?id={id}
 * 新建模式:无id参数
 * 编辑模式:有id参数
 */

import React, { useEffect, useState, useMemo } from 'react';
import { Card, Button, message, Spin } from 'antd';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import { history, useSchemaField, closeTab } from 'umi';
import { useKeepAliveParams, useAttachmentUpload } from '@/hooks';
import { createForm } from '@formily/core';
import { FormProvider } from '@formily/react';
import { ToolBar } from '@/components';
import {
  ProjectRiskGetAsync,
  ProjectRiskCreateAsync,
  ProjectRiskUpdateAsync,
} from '@/services/pdm/ProjectRisk';
import { ProjectGetListAsync } from '@/services/pdm/Project';
import UserSelect from '@/pages/appPdm/_formWidgets/UserSelect';
import ProjectSelect from '@/pages/appPdm/_formWidgets/ProjectSelect';
import RiskTypeSelect from '@/pages/appPdm/_formWidgets/RiskTypeSelect';
import ProjectMilestoneSelect from '@/pages/appPdm/_formWidgets/ProjectMilestoneSelect';
import { formSchema } from './components/schema';
import moment from 'moment';

export const routeProps = {
  name: '项目风险表单',
};

const ProjectRiskFormPage: React.FC = () => {
  const { id: riskId, isActive, hasChanged } = useKeepAliveParams(
    '/appPdm/ProjectManagement/RiskList/form',
    ['id']
  );
  const isEdit = !!riskId;

  // 配置附件上传
  const AttachmentUploadWithConfig = useAttachmentUpload(
    riskId,
    '/api/pdm/project-management/risks'
  );

  const SchemaField = useSchemaField({
    UserSelect,
    ProjectSelect,
    RiskTypeSelect,
    ProjectMilestoneSelect,
    MultiAttachmentUpload: AttachmentUploadWithConfig,
  });

  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  // 创建表单实例
  const form = useMemo(
    () => createForm({ validateFirst: true }),
    [riskId]
  );

  // 加载初始数据
  useEffect(() => {
    if (!isActive || !hasChanged) return;

    if (riskId) {
      setLoading(true);
      ProjectRiskGetAsync({ id: riskId })
        .then(res => {
          const formData: any = { ...res };

          // 处理项目字段 - 后端返回 projectCode
          if (res.projectCode) {
            // 如果后端同时返回 projectName,直接使用
            if (res.projectName) {
              formData['{value:projectCode,label:projectName}'] = {
                value: res.projectCode,
                label: res.projectName,
              };
            } else {
              // 否则查询项目列表获取名称
              ProjectGetListAsync({ MaxResultCount: 1000 })
                .then(projectList => {
                  const project = projectList.items?.find(p => p.projectCode === res.projectCode);
                  if (project) {
                    formData['{value:projectCode,label:projectName}'] = {
                      value: res.projectCode,
                      label: project.projectName,
                    };
                    form.setValues(formData);
                  }
                })
                .catch(err => {
                  console.error('查询项目列表失败:', err);
                });
            }
          }

          // 处理风险类型 - Formily会自动拆分复合字段,同时设置复合字段和拆分字段
          if (res.riskTypeCode) {
            formData['{value:riskTypeCode,label:riskTypeName}'] = {
              value: res.riskTypeCode,
              label: res.riskTypeName || res.riskTypeCode,
            };
            // 同时设置拆分后的独立字段
            formData.riskTypeCode = res.riskTypeCode;
            formData.riskTypeName = res.riskTypeName;
          }

          // 处理里程碑 - Formily会自动拆分复合字段,同时设置复合字段和拆分字段
          if (res.milestoneId) {
            formData['{value:milestoneId,label:milestoneName}'] = {
              value: res.milestoneId,
              label: res.milestoneName || res.milestoneId,
            };
            // 同时设置拆分后的独立字段
            formData.milestoneId = res.milestoneId;
            formData.milestoneName = res.milestoneName;
          }

          // 处理识别日期
          if (res.identifiedDate) {
            formData.identifiedDate = moment(res.identifiedDate);
          }

          // 处理目标解决日期
          if (res.targetResolutionDate) {
            formData.targetResolutionDate = moment(res.targetResolutionDate);
          }

          // 处理附件数据 - 后端返回的已经是数组格式
          if (res.attachments) {
            formData.attachments = res.attachments;
          }

          // 处理关注人
          if (res.watchers && Array.isArray(res.watchers)) {
            formData.watchUserCodes = res.watchers.map(w => w.userId);
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
  }, [isActive, hasChanged, riskId, form]);

  // 返回列表
  const handleBack = (needRefresh: boolean = false) => {
    const currentPath = window.location.pathname;
    const targetPath = needRefresh
      ? '/appPdm/ProjectManagement/RiskList?refresh=true'
      : '/appPdm/ProjectManagement/RiskList';
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
        name: values.name,
        description: values.description,
        priority: values.priority,
        riskTypeCode: values.riskTypeCode,
        handlerCode: values.handlerCode,
        consequence: values.consequence,
        milestoneId: values.milestoneId,
        milestoneName: values.milestoneName,
        enableReview: values.enableReview,
        identifiedDate: values.identifiedDate ? moment(values.identifiedDate).format('YYYY-MM-DDTHH:mm:ss') : undefined,
        targetResolutionDate: values.targetResolutionDate ? moment(values.targetResolutionDate).format('YYYY-MM-DDTHH:mm:ss') : undefined,
      };

      // 处理关注人
      const watcherUserIds = Array.isArray(values.watchUserCodes)
        ? values.watchUserCodes.map((item: any) => (typeof item === 'object' ? item.value ?? item.userId ?? item.id : item))
        : [];
      submitData.watcherUserIds = watcherUserIds;

      const watcherUsers = Array.isArray(values.watchUserCodes)
        ? values.watchUserCodes
            .map((item: any) => {
              if (typeof item === 'object') {
                const userId = item.value ?? item.userId ?? item.id;
                if (!userId) return null;
                return {
                  userId,
                  userCode: item.userName ?? item.userCode ?? userId,
                  userName: item.label ?? item.name ?? item.userName ?? item.userCode ?? userId,
                };
              }
              return null;
            })
            .filter(Boolean)
        : [];
      if (watcherUsers.length) {
        submitData.watcherUsers = watcherUsers;
      }

      // 移除附件字段(附件已通过 API 单独上传)
      // 附件数据不需要在创建/更新时提交
      delete (values as any).attachments;

      if (isEdit) {
        await ProjectRiskUpdateAsync({ id: values.id }, submitData);
      } else {
        await ProjectRiskCreateAsync(submitData);
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
        title={isEdit ? '编辑项目风险' : '新建项目风险'}
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

export default ProjectRiskFormPage;
