import React from 'react';
import { FormDesigner } from '@nokecy/qc-ui';
import { ProjectFormGetAsync, ProjectFormUpdateAsync } from '@/services/pdm/ProjectForm';
import { FormWidgetComponents } from 'umi';
import { useKeepAliveParams } from '@/hooks';
import { transformToSchema, transformToTreeNode } from '@nokecy/designable-formily-transformer';
import { message } from 'antd';

const ProjectFormDesigner = () => {
  const { id } = useKeepAliveParams(
    '/appPdm/ProjectManagement/Configs/ProjectForm/designer',
    ['id']
  );

  const loadSchema = (engine: any) => {
    if (id) {
      ProjectFormGetAsync({ id })
        .then((data) => {
          try {
            // 安全解析 formContent
            let parsedContent;
            if (data.formContent && typeof data.formContent === 'string' && data.formContent.trim() !== '') {
              parsedContent = JSON.parse(data.formContent);
            }

            // 转换为树节点
            const treeNode = transformToTreeNode(parsedContent);

            // 设置树节点
            if (treeNode) {
              engine.setCurrentTree(treeNode);
            }
          } catch (error) {
            console.error('加载表单内容失败:', error);
            message.error('加载表单内容失败: ' + (error instanceof Error ? error.message : '未知错误'));
          }
        })
        .catch((error) => {
          console.error('获取表单数据失败:', error);
          message.error('获取表单数据失败: ' + (error instanceof Error ? error.message : '未知错误'));
        });
    }
  };

  const saveSchema = (engine: any) => {
    const hide = message.loading('正在操作,请稍后', 0);

    try {
      const currentTree = engine.getCurrentTree();
      if (!currentTree) {
        message.warning('表单设计内容为空');
        hide();
        return;
      }

      const schema = transformToSchema(currentTree);

      if (id) {
        // 先获取完整的表单数据
        ProjectFormGetAsync({ id })
          .then((formData) => {
            if (!formData) {
              throw new Error('无法获取表单数据');
            }

            // 使用完整的表单数据进行更新，只修改 formContent
            return ProjectFormUpdateAsync(
              { id },
              {
                ...formData,
                formContent: JSON.stringify(schema),
              },
            );
          })
          .then(() => {
            message.success('保存成功!');
          })
          .catch((error) => {
            console.error('保存表单失败:', error);
            message.error('保存失败: ' + (error instanceof Error ? error.message : '未知错误'));
          })
          .finally(() => {
            hide();
          });
      } else {
        message.warning('缺少表单ID参数');
        hide();
      }
    } catch (error) {
      console.error('转换表单结构失败:', error);
      message.error('转换表单结构失败: ' + (error instanceof Error ? error.message : '未知错误'));
      hide();
    }
  };

  return <FormDesigner loadSchema={loadSchema} saveSchema={saveSchema} businessComponents={FormWidgetComponents} />;
};

export default ProjectFormDesigner;

export const routeProps = {
  name: '设计项目表单',
};
