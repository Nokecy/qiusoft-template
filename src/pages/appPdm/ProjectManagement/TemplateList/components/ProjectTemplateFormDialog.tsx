import { ProjectTemplateCreateAsync, ProjectTemplateUpdateAsync, ProjectTemplateGetAsync } from '@/services/pdm/ProjectTemplate';
import { FormDialog } from '@formily/antd-v5';
import { onFormInit, onFieldValueChange } from '@formily/core';
import { Button, message } from 'antd';
import React from 'react';
import { formId, formSchema } from './schema';
import { useFormSchema, useSchemaField } from 'umi';
import FormLayoutMode from '@/pages/_utils/editMode';
import MilestoneFlowChart from './MilestoneFlowChart';
import MilestoneFlowEditor from './MilestoneFlowEditor';
import ProjectFormSelect from './ProjectFormSelect';
import DocumentExplorer from './DocumentExplorer';
import ProjectCategorySelect from '@/pages/appPdm/_formWidgets/ProjectCategorySelect';
import UserSelect from '@/pages/_formWidgets/UserSelect';
import WorkflowDefinitionSelect from '@/pages/appPdm/ProjectManagement/_formWidgets/WorkflowDefinitionSelect';
import TaskTypeSelect from '@/pages/appPdm/_formWidgets/TaskTypeSelect';
import ProjectRoleSelect from '@/pages/appPdm/_formWidgets/ProjectRoleSelect';

/**
 * 对里程碑进行拓扑排序,按照父子层级关系排列
 * 规则:
 * 1. 没有父级的里程碑排在最前面
 * 2. 有父级的里程碑排在其所有父级之后
 * 3. 同级里程碑保持原有顺序
 */
const topologicalSortMilestones = (milestones: any[]): any[] => {
  if (!milestones || milestones.length === 0) {
    return [];
  }

  // 创建里程碑名称到对象的映射
  const nameToMilestone = new Map<string, any>();
  milestones.forEach(m => {
    if (m.milestoneName) {
      nameToMilestone.set(m.milestoneName, m);
    }
  });

  // 记录已访问和已排序的里程碑
  const visited = new Set<string>();
  const sorted: any[] = [];

  // 深度优先搜索进行拓扑排序
  const dfs = (milestone: any) => {
    if (!milestone || !milestone.milestoneName) return;

    const name = milestone.milestoneName;
    if (visited.has(name)) return;

    visited.add(name);

    // 先处理所有父级里程碑
    if (milestone.parentCodes && Array.isArray(milestone.parentCodes)) {
      milestone.parentCodes.forEach((parentName: string) => {
        const parent = nameToMilestone.get(parentName);
        if (parent && !visited.has(parentName)) {
          dfs(parent);
        }
      });
    }

    // 再将当前里程碑加入结果
    sorted.push(milestone);
  };

  // 遍历所有里程碑进行排序
  milestones.forEach(milestone => {
    dfs(milestone);
  });

  return sorted;
};

const ProjectTemplateFormDialog = (props: any) => {
  const { entityId, title, buttonProps, onAfterSubmit, defaultCategoryCode } = props;

  const schema = useFormSchema(formId, formSchema);
  const SchemaField = useSchemaField({
    MilestoneFlowChart,
    MilestoneFlowEditor,
    ProjectFormSelect,
    DocumentExplorer,
    ProjectCategorySelect,
    UserSelect,
    WorkflowDefinitionSelect,
    TaskTypeSelect,
    ProjectRoleSelect
  });

  const formProps = {
    effects: () => {
      onFormInit(form => {
        if (entityId) {
          ProjectTemplateGetAsync({ id: entityId }).then(res => {
            // 数据映射：将后端返回的templateRoles映射为roles
            const formData: any = { ...res };
            if (res.templateRoles) {
              formData.roles = res.templateRoles;
              delete formData.templateRoles;
            }

            // 里程碑数据映射：将parentMilestones转换为parentCodes
            if (res.milestones && Array.isArray(res.milestones)) {
              // 创建里程碑ID到名称的映射
              const idToNameMap = new Map<string, string>();
              res.milestones.forEach((m: any) => {
                if (m.id && m.milestoneName) {
                  idToNameMap.set(m.id, m.milestoneName);
                }
              });

              const milestonesWithParentCodes = res.milestones.map((m: any) => {
                const milestone = { ...m };
                // 将parentMilestones数组转换为parentCodes数组(里程碑名称列表)
                let parentCodes: string[] = [];
                if (m.parentMilestones && Array.isArray(m.parentMilestones)) {
                  parentCodes = m.parentMilestones
                    .map((pm: any) => {
                      // 优先使用parentMilestoneName,如果为null则通过ID查找
                      if (pm.parentMilestoneName) {
                        return pm.parentMilestoneName;
                      } else if (pm.parentMilestoneId) {
                        return idToNameMap.get(pm.parentMilestoneId);
                      }
                      return null;
                    })
                    .filter((name: string | null | undefined) => name); // 过滤掉null和undefined
                }
                milestone.parentCodes = parentCodes;
                return milestone;
              });

              // 对里程碑进行拓扑排序,按照父子层级关系排列
              formData.milestones = topologicalSortMilestones(milestonesWithParentCodes);
            }

            // 文档数据映射：如果后端返回 parentDocumentName，则转换为 parentId 供前端树控件使用
            if (res.documents && Array.isArray(res.documents)) {
              const nameToIdMap = new Map<string, string>();
              res.documents.forEach((doc: any) => {
                if (doc.id && doc.documentName) {
                  nameToIdMap.set(doc.documentName, doc.id);
                }
              });

              formData.documents = res.documents.map((doc: any) => {
                const converted = { ...doc };

                // 类型兼容：历史数据可能沿用前端 0=文件夹/1=文件；后端语义为 0=File/1=Directory
                // 这里用“是否存在文件信息/是否可下载”做一次兜底判断，确保旧数据与新数据都能正确展示
                const hasFileInfo = !!(
                  (converted.blobName && String(converted.blobName).trim()) ||
                  (converted.fileName && String(converted.fileName).trim()) ||
                  (converted.contentType && String(converted.contentType).trim()) ||
                  (typeof converted.fileSize === 'number' && converted.fileSize > 0)
                );
                const isDownload = converted.isDownload === true;
                if (converted.type === 0) {
                  // serverType=File：若明显不像文件（不可下载且无文件信息），按“文件夹”渲染（兼容旧数据）
                  converted.type = converted.isDownload === false && !hasFileInfo ? 0 : 1;
                } else if (converted.type === 1) {
                  // serverType=Directory：若带文件信息或可下载，按“文件”渲染（兼容旧数据）
                  converted.type = hasFileInfo || isDownload ? 1 : 0;
                }

                if (doc.parentDocumentName && !doc.parentId) {
                  const parentId = nameToIdMap.get(doc.parentDocumentName);
                  if (parentId) {
                    converted.parentId = parentId;
                  }
                }
                return converted;
              });
            }

            form.setInitialValues(formData);
          });
        } else if (defaultCategoryCode) {
          // 新建时,如果有默认分类,设置初始值
          form.setInitialValues({ categoryCode: defaultCategoryCode });
        }
      });

      // 监听里程碑数组变化,自动设置默认值
      onFieldValueChange('milestones', (field) => {
        const milestones = field.value || [];
        console.log('📋 里程碑数组变化:', milestones.map((m: any) => ({
          milestoneName: m.milestoneName,
          responsibleId: m.responsibleId,
          responsibleName: m.responsibleName,
        })));

        if (milestones.length > 0) {
          const lastIndex = milestones.length - 1;
          const lastMilestone = milestones[lastIndex];

          // 检查最后一项是否为新添加的空项
          // 新添加的项通常没有milestoneName,或者sequence为undefined/null/0
          const isNewItem = lastMilestone && (
            !lastMilestone.milestoneName ||
            lastMilestone.sequence === undefined ||
            lastMilestone.sequence === null ||
            lastMilestone.sequence === 0
          );

          if (isNewItem) {
            const prevMilestone = lastIndex > 0 ? milestones[lastIndex - 1] : null;

            // 准备需要设置的默认值
            const defaultValues: any = {};

            // 设置默认值
            if (prevMilestone && prevMilestone.milestoneName) {
              // 不是第一个,父级里程碑名称默认为上一个里程碑名称(使用新的parentCodes数组)
              if (!lastMilestone.parentCodes || lastMilestone.parentCodes.length === 0) {
                defaultValues.parentCodes = [prevMilestone.milestoneName];
              }
              // 设置排序号
              if (!lastMilestone.sequence || lastMilestone.sequence === 0) {
                defaultValues.sequence = (prevMilestone.sequence || 0) + 1;
              }
            } else {
              // 第一个里程碑,排序为1
              if (!lastMilestone.sequence || lastMilestone.sequence === 0) {
                defaultValues.sequence = 1;
              }
            }

            // 使用 setValuesIn 批量设置,避免触发无限循环
            if (Object.keys(defaultValues).length > 0) {
              Object.entries(defaultValues).forEach(([key, value]) => {
                field.form.setValuesIn(`milestones.${lastIndex}.${key}`, value);
              });
            }
          }
        }
      });
    },
  };

  const portalId = `Pdm.ProjectManagement.ProjectTemplate.${entityId || 'new'}`;
  return (
    <FormDialog.Portal id={portalId}>
      <Button
        type={'primary'}
        onClick={() => {
          const formDialog = FormDialog({ title: title, width: 1200 }, portalId, () => {
            return (
              <>
                <FormLayoutMode formId={formId} {...schema.form} editClickAfter={() => formDialog.close()}>
                  <SchemaField schema={schema.schema} />
                </FormLayoutMode>
              </>
            );
          });

          formDialog
            .forConfirm((payload, next) => {
              const values: any = payload.values;
              const hide = message.loading('正在提交...', 0);

              // 数据转换：将前端字段转换为后端API期望的格式
              const transformedValues = { ...values };
              const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

              // 转换角色数据：roles字段直接使用，后端期望的就是roles
              // (后端CreateDTO使用roles，返回DTO使用templateRoles)

              // 转换里程碑数据
              if (transformedValues.milestones && Array.isArray(transformedValues.milestones)) {
                // 构建里程碑映射：名称/临时ID -> 真实ID 或 名称(创建模式)
                const idMap = new Map<string, string>();

                transformedValues.milestones.forEach((m: any) => {
                  const originalId = m.id || m._id;
                  const milestoneName = m.milestoneName;

                  if (milestoneName) {
                    if (values.id) {
                      // 编辑模式：名称映射到真实ID(如果有),否则映射到名称本身(新建里程碑)
                      if (originalId && guidRegex.test(originalId)) {
                        idMap.set(milestoneName, originalId);
                        // 同时建立临时ID的映射
                        if (m._id && m._id !== originalId) {
                          idMap.set(m._id, originalId);
                        }
                      } else {
                        // 新建的里程碑,临时ID映射到名称(后端支持名称查找)
                        idMap.set(milestoneName, milestoneName);
                        if (originalId) {
                          idMap.set(originalId, milestoneName);
                        }
                      }
                    } else {
                      // 创建模式：统一使用名称(后端支持名称查找)
                      idMap.set(milestoneName, milestoneName);
                      if (originalId) {
                        idMap.set(originalId, milestoneName);
                      }
                    }
                  }
                });

                transformedValues.milestones = transformedValues.milestones.map((m: any, index: number) => {
                  // 移除前端辅助字段
                  const { _id, _isNew, formIds, parentCodes, parentMilestones, ...milestone } = m;

                  // 添加必填字段 projectCode（模板创建时为空字符串）
                  milestone.projectCode = '';

                  // 验证 responsibleId 格式
                  if (milestone.responsibleId) {
                    if (!guidRegex.test(milestone.responsibleId)) {
                      console.warn(`警告: responsibleId "${milestone.responsibleId}" 不是有效的 Guid 格式`);
                    }
                  }

                  // 转换父级里程碑：从名称数组转换为ID/名称数组(根据映射解析)
                  if (parentCodes && Array.isArray(parentCodes) && parentCodes.length > 0) {
                    milestone.parentMilestoneIds = parentCodes
                      .map((parentNameOrId: string) => {
                        // 从映射中查找解析后的值(可能是ID或名称)
                        return idMap.get(parentNameOrId) || parentNameOrId;
                      })
                      .filter((id: string) => id); // 过滤掉空值
                  } else {
                    milestone.parentMilestoneIds = [];
                  }

                  // 确保sequence字段被保留
                  if (!milestone.sequence && milestone.sequence !== 0) {
                    milestone.sequence = index + 1; // 使用数组索引作为默认sequence
                  }

                  return milestone;
                });
              }

              // 转换文档数据：避免提交临时 parentId（后端 ParentId 为 Guid?，临时ID会导致层级丢失/解析失败）
              if (transformedValues.documents && Array.isArray(transformedValues.documents)) {
                const idToNameMap = new Map<string, string>();
                transformedValues.documents.forEach((d: any) => {
                  const key = d?.id || d?._id;
                  if (key && d?.documentName) {
                    idToNameMap.set(key, d.documentName);
                  }
                });

                transformedValues.documents = transformedValues.documents
                  .filter((d: any) => d && d.documentName && d.type !== undefined && d.type !== null)
                  .map((d: any) => {
                    const parentId = d.parentId;
                    const isParentGuid = typeof parentId === 'string' && guidRegex.test(parentId);
                    const parentDocumentName =
                      !isParentGuid && typeof parentId === 'string' && parentId !== 'root' ? idToNameMap.get(parentId) : undefined;

                    // 类型映射：前端 0=文件夹/1=文件 -> 后端 1=Directory/0=File
                    const backendType = d.type === 0 ? 1 : 0;

                    return {
                      id: typeof d.id === 'string' && guidRegex.test(d.id) ? d.id : undefined,
                      templateCode: transformedValues.templateCode,
                      projectCode: '',
                      documentName: d.documentName,
                      documentUrl: d.documentUrl || '',
                      blobName: d.blobName || '',
                      fileName: d.fileName || '',
                      contentType: d.contentType || '',
                      fileSize: d.fileSize || 0,
                      parentId: isParentGuid ? parentId : undefined,
                      parentDocumentName: parentDocumentName,
                      isDownload: d.isDownload ?? true,
                      type: backendType,
                      description: d.description || '',
                    };
                  });
              }

              // 转换任务数据
              if (transformedValues.tasks && Array.isArray(transformedValues.tasks)) {
                transformedValues.tasks = transformedValues.tasks.map((t: any) => {
                  // 移除前端辅助字段
                  const { _id, _isNew, ...task } = t;

                  // 添加必填字段 projectCode（模板创建时为空字符串）
                  task.projectCode = '';

                  return task;
                });
              }

              console.log('🚀 提交的数据:', {
                templateCode: transformedValues.templateCode,
                templateName: transformedValues.templateName,
                milestones: transformedValues.milestones?.map((m: any) => ({
                  milestoneName: m.milestoneName,
                  responsibleId: m.responsibleId,
                  responsibleName: m.responsibleName,
                  projectCode: m.projectCode,
                })),
              });

              if (!values.id) {
                return ProjectTemplateCreateAsync(transformedValues)
                  .then(() => {
                    message.success('创建成功');
                    if (onAfterSubmit) onAfterSubmit();
                  })
                  .then(() => {
                    next(payload);
                  })
                  .catch((err) => {
                    const errorMsg = String(err.message || '');
                    // Suppress generic 403 error using case-insensitive regex
                    if (
                      err.data?.status === 403 ||
                      err.response?.status === 403 ||
                      /403|status code 403/i.test(errorMsg)
                    ) {
                      throw err;
                    }
                    message.error('创建失败: ' + (errorMsg || '未知错误'));
                    throw err;
                  })
                  .finally(() => hide());
              } else {
                return ProjectTemplateUpdateAsync({ id: values.id }, transformedValues)
                  .then(() => {
                    message.success('更新成功');
                    if (onAfterSubmit) onAfterSubmit();
                  })
                  .then(() => {
                    next(payload);
                  })
                  .catch((err) => {
                    const errorMsg = String(err.message || '');
                    // Suppress generic 403 error using case-insensitive regex
                    if (
                      err.data?.status === 403 ||
                      err.response?.status === 403 ||
                      /403|status code 403/i.test(errorMsg)
                    ) {
                      throw err;
                    }
                    message.error('更新失败: ' + (errorMsg || '未知错误'));
                    throw err;
                  })
                  .finally(() => hide());
              }
            })
            .open(formProps);
        }}
        {...buttonProps}
      >
        {props.children}
      </Button>
    </FormDialog.Portal>
  );
};

export default ProjectTemplateFormDialog;
