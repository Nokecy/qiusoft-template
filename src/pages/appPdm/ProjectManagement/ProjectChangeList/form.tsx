/**
 * 项目变更单表单页
 * 路由: /appPdm/ProjectManagement/ProjectChangeList/form?id={id}
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
  ProjectChangeGetAsync,
  ProjectChangeCreateAsync,
  ProjectChangeUpdateAsync,
} from '@/services/pdm/ProjectChange';
import UserSelect from '@/pages/appPdm/_formWidgets/UserSelect';
import ProjectSelect from '@/pages/appPdm/_formWidgets/ProjectSelect';
import { formSchema } from './components/schema';
import moment from 'moment';

export const routeProps = {
  name: '项目变更单表单',
};

const ProjectChangeFormPage: React.FC = () => {
  const { id: changeId, isActive, hasChanged } = useKeepAliveParams(
    '/appPdm/ProjectManagement/ProjectChangeList/form',
    ['id']
  );
  const isEdit = !!changeId;

  // 配置附件上传
  const AttachmentUploadWithConfig = useAttachmentUpload(
    changeId,
    '/api/pdm/change-management/change-orders'
  );

  const SchemaField = useSchemaField({
    UserSelect,
    ProjectSelect,
    MultiAttachmentUpload: AttachmentUploadWithConfig,
  });

  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  // 创建表单实例
  const form = useMemo(
    () => createForm({ validateFirst: true }),
    [changeId]
  );

  // 加载初始数据
  useEffect(() => {
    if (!isActive || !hasChanged) return;

    if (changeId) {
      setLoading(true);
      ProjectChangeGetAsync({ id: changeId })
        .then(res => {
          console.log('=== 加载项目变更单数据 ===');
          console.log('后端返回数据:', res);
          console.log('ownerCode:', res.ownerCode);
          console.log('ownerName:', res.ownerName);

          const formData: any = { ...res };

          // 处理负责人字段 - 构建 labelInValue 格式，并保留原始字段用于兜底
          if (res.ownerCode) {
            formData['{value:ownerCode,label:ownerName}'] = {
              value: res.ownerCode,
              label: res.ownerName || res.ownerCode,
            };
            // 保留原始字段用于兜底（编辑模式下如果用户没有重新选择负责人）
            formData.ownerCode = res.ownerCode;
            formData.ownerName = res.ownerName;
          }

          // 处理计划实施日期 - 转换为 moment 对象
          if (res.plannedImplementationDate) {
            formData.plannedImplementationDate = moment(res.plannedImplementationDate);
          }

          // 处理附件数据 - 转换字段名以匹配前端组件期望的格式
          if (res.attachments && Array.isArray(res.attachments)) {
            formData.attachments = res.attachments.map((att: any) => ({
              id: att.id,
              entityId: att.entityId || res.id,
              entityTypeName: att.entityTypeName || 'ProjectChange',
              name: att.fileName || att.name, // 后端返回 fileName(驼峰),转换为 name
              size: att.fileSize || att.size, // 后端返回 fileSize(驼峰),转换为 size
              type: att.contentType || att.type, // 后端返回 contentType(驼峰),转换为 type
              blobName: att.blobName,
              documentUrl: att.documentUrl,
              uploadTime: att.uploadTime,
            }));
          }

          // 所有数据处理完成后，统一设置表单初始值
          form.setInitialValues(formData);
          form.setValues(formData); // ← 关键：同时设置当前值，确保 Select 组件正确匹配
        })
        .catch(() => {
          message.error('加载数据失败');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isActive, hasChanged, changeId, form]);

  // 返回列表
  const handleBack = (needRefresh: boolean = false) => {
    const currentPath = window.location.pathname;
    const targetPath = needRefresh
      ? '/appPdm/ProjectManagement/ProjectChangeList?refresh=true'
      : '/appPdm/ProjectManagement/ProjectChangeList';
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

      console.log('=== 项目变更单表单提交调试信息 ===');
      console.log('完整表单值:', values);
      console.log('负责人复合字段:', values['{value:ownerCode,label:ownerName}']);
      console.log('负责人原始字段 ownerCode:', values.ownerCode);
      console.log('负责人原始字段 ownerName:', values.ownerName);

      // 转换数据
      const submitData: any = {
        name: values.name,
        changeType: values.changeType,
        description: values.description,
        reason: values.reason,
        impactAnalysis: values.impactAnalysis, // 影响分析字段
        priority: values.priority,
        status: values.status,
        projectCode: values.projectCode,
      };

      // 处理负责人 - 优先使用复合字段，兜底使用原始字段（编辑模式下如果没修改）
      const ownerField = values['{value:ownerCode,label:ownerName}'];
      if (ownerField && ownerField.value) {
        // 复合字段有有效值
        submitData.ownerCode = ownerField.value;
        submitData.ownerName = ownerField.label || ownerField.value;
        console.log('✓ 使用复合字段:', submitData.ownerCode, submitData.ownerName);
      } else if (values.ownerCode) {
        // 编辑模式下如果用户没有重新选择负责人，使用原始数据
        submitData.ownerCode = values.ownerCode;
        submitData.ownerName = values.ownerName || values.ownerCode;
        console.log('✓ 使用原始字段:', submitData.ownerCode, submitData.ownerName);
      } else {
        console.warn('⚠️ 未找到负责人数据');
      }

      // 处理计划实施日期 - 转换为 ISO 字符串格式
      if (values.plannedImplementationDate) {
        submitData.plannedImplementationDate = moment(values.plannedImplementationDate).format('YYYY-MM-DDTHH:mm:ss');
      }

      // 移除附件字段(附件已通过 API 单独上传)
      // 附件数据不需要在创建/更新时提交
      delete (values as any).attachments;

      console.log('最终提交数据:', submitData);

      if (isEdit) {
        await ProjectChangeUpdateAsync({ id: values.id }, submitData);
      } else {
        await ProjectChangeCreateAsync(submitData);
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
        title={isEdit ? '编辑项目变更单' : '新建项目变更单'}
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

export default ProjectChangeFormPage;
