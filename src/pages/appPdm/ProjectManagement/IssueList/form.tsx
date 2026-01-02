import React, { useEffect, useState } from 'react';
import { Card, Button, message, Spin, Space } from 'antd';
import { history } from 'umi';
import { Form } from '@formily/antd-v5';
import { createForm } from '@formily/core';
import { useFormSchema, useSchemaField } from 'umi';
import { useKeepAliveParams } from '@/hooks';
import {
  ProjectIssueCreateAsync,
  ProjectIssueUpdateAsync,
  ProjectIssueGetAsync
} from '@/services/pdm/ProjectIssue';
import {
  UserWatchCreateAsync,
  UserWatchGetListByTargetCodeAsync,
  UserWatchDeleteAsync
} from '@/services/pdm/UserWatch';
import { formId, formSchema } from './components/schema';
import UserSelect from '@/pages/appPdm/_formWidgets/UserSelect';
import IssueTypeSelect from '@/pages/appPdm/_formWidgets/IssueTypeSelect';
import ProjectSelect from '@/pages/appPdm/_formWidgets/ProjectSelect';
import ProjectTaskSelect from '@/pages/appPdm/_formWidgets/ProjectTaskSelect';
import ProjectMilestoneSelect from '@/pages/appPdm/_formWidgets/ProjectMilestoneSelect';

const ProjectIssueFormPage: React.FC = () => {
  const { id: issueId, isActive, hasChanged } = useKeepAliveParams(
    '/appPdm/ProjectManagement/IssueList/form',
    ['id']
  );
  const [loading, setLoading] = useState(false);
  const [form] = useState(() => createForm());

  const schema = useFormSchema(formId, formSchema);
  const SchemaField = useSchemaField({
    UserSelect,
    IssueTypeSelect,
    ProjectSelect,
    ProjectTaskSelect,
    ProjectMilestoneSelect,
  });

  // 加载数据
  useEffect(() => {
    if (!isActive || !hasChanged) return;

    const loadData = async () => {
      if (!issueId) return;

      setLoading(true);
      try {
        const res = await ProjectIssueGetAsync({ id: issueId });
        const formData: any = { ...res };

        // 先设置项目编码,这样ProjectMilestoneSelect才能加载对应项目的里程碑选项
        if (formData.projectCode) {
          form.setFieldState('projectCode', state => {
            state.value = formData.projectCode;
          });
          // 等待ProjectMilestoneSelect加载options
          await new Promise(resolve => setTimeout(resolve, 500));
        }

        // 转换里程碑字段为 labelInValue 格式
        if (formData.milestoneId) {
          if (formData.milestoneName) {
            // 如果后端返回了milestoneName,直接使用
            formData['{value:milestoneId,label:milestoneName}'] = {
              value: formData.milestoneId,
              label: formData.milestoneName,
            };
          } else {
            // 如果后端没有返回milestoneName,尝试从API获取
            console.warn('后端未返回milestoneName,尝试从API获取:', formData.milestoneId);
            try {
              const { ProjectMilestoneGetAsync } = await import('@/services/pdm/ProjectMilestone');
              const milestone = await ProjectMilestoneGetAsync({ id: formData.milestoneId });
              formData['{value:milestoneId,label:milestoneName}'] = {
                value: formData.milestoneId,
                label: milestone.milestoneName || formData.milestoneId,
              };
            } catch (err) {
              console.error('获取里程碑信息失败:', err);
              // 如果获取失败,使用ID作为label
              formData['{value:milestoneId,label:milestoneName}'] = {
                value: formData.milestoneId,
                label: formData.milestoneId,
              };
            }
          }
          // 删除原始字段,避免冲突
          delete formData.milestoneId;
          delete formData.milestoneName;
        }

        // 加载关注人列表
        if (formData.issueCode) {
          try {
            const watchList = await UserWatchGetListByTargetCodeAsync({
              targetCode: formData.issueCode,
              PageSize: 1000,
            });
            formData.watchUserCodes = watchList.items?.map((w: any) => w.userId) || [];
          } catch (e) {
            console.warn('加载关注人失败:', e);
            formData.watchUserCodes = [];
          }
        }

        // 设置所有初始值
        form.setInitialValues(formData);
      } catch (error) {
        console.error('加载问题数据失败:', error);
        message.error('加载问题数据失败');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [isActive, hasChanged, issueId, form]);

  // 提交表单
  const handleSubmit = async () => {
    const values: any = await form.submit();
    const hide = message.loading('正在提交...', 0);

    try {
      // 提取watchUserCodes并从提交数据中移除
      const watchUserCodes = values.watchUserCodes || [];
      const transformedValues = { ...values };
      delete transformedValues.watchUserCodes;

      let issueCode: string;

      if (!values.id) {
        // 创建问题
        const createdIssue = await ProjectIssueCreateAsync(transformedValues);
        issueCode = createdIssue.issueCode;
        message.success('创建成功');
      } else {
        // 更新问题
        await ProjectIssueUpdateAsync({ id: values.id }, transformedValues);
        issueCode = values.issueCode;
        message.success('更新成功');
      }

      // 处理关注人
      if (issueCode) {
        try {
          // 获取现有关注人列表
          const existingWatchList = await UserWatchGetListByTargetCodeAsync({
            targetCode: issueCode,
            PageSize: 1000,
          });
          const existingUserIds = existingWatchList.items?.map((w: any) => w.userId) || [];

          // 找出需要删除的关注记录
          const toDelete = existingWatchList.items?.filter(
            (w: any) => !watchUserCodes.includes(w.userId)
          ) || [];

          // 找出需要新增的关注人
          const toAdd = watchUserCodes.filter(
            (userId: string) => !existingUserIds.includes(userId)
          );

          // 删除不再关注的记录
          for (const watch of toDelete) {
            if (watch.id) {
              await UserWatchDeleteAsync({ id: watch.id });
            }
          }

          // 添加新的关注记录
          for (const userId of toAdd) {
            await UserWatchCreateAsync({
              userId: userId,
              targetType: 2, // 2 = Issue
              targetCode: issueCode,
              remark: '',
            });
          }
        } catch (err) {
          console.warn('处理关注人失败:', err);
        }
      }

      // 返回列表页
      history.push('/appPdm/ProjectManagement/IssueList');
    } catch (err: any) {
      message.error(`${values.id ? '更新' : '创建'}失败: ${err.message || '未知错误'}`);
    } finally {
      hide();
    }
  };

  return (
    <div style={{ padding: 24, background: '#f0f2f5' }}>
      <Card
        title={issueId ? '编辑问题' : '新建问题'}
        bordered={false}
        extra={
          <Space>
            <Button onClick={() => history.push('/appPdm/ProjectManagement/IssueList')}>取消</Button>
            <Button type="primary" onClick={handleSubmit} loading={loading}>
              提交
            </Button>
          </Space>
        }
      >
        <Spin spinning={loading}>
          <Form form={form} {...schema.form}>
            <SchemaField schema={schema.schema} />
          </Form>
        </Spin>
      </Card>
    </div>
  );
};

export default ProjectIssueFormPage;

export const routeProps = {
  name: '问题表单',
};
