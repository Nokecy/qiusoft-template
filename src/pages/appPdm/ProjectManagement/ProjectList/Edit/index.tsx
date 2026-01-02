import React, { useEffect, useMemo, useRef } from 'react';
import { history } from 'umi';
import { useKeepAliveParams } from '@/hooks';
import { Card, Button, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { createForm, onFieldValueChange } from '@formily/core';
import { FormProvider } from '@formily/react';
import { useFormSchema, useSchemaField } from 'umi';
import FormLayoutMode from '@/pages/_utils/editMode';
import { formId, formSchema } from './schema';
import './index.less';
import {
  ProjectCreateAsync,
  ProjectUpdateAsync,
  ProjectGetAsync
} from '@/services/pdm/Project';
import { ProjectTaskAddRisksAsync, ProjectTaskGetRisksAsync } from '@/services/pdm/ProjectTask';
import ProjectCategorySelect from '../../../_formWidgets/ProjectCategorySelect';
import MaterialSelect from '../../../BomManagement/_components/MaterialSelect';
import ProjectTemplateSelect from '../../../_formWidgets/ProjectTemplateSelect';
import ProjectSelect from '../../../_formWidgets/ProjectSelect';
import UserSelect from '../../../_formWidgets/UserSelect';
import ProjectRoleSelect from '../../../_formWidgets/ProjectRoleSelect';
import TaskTypeSelect from '../../../_formWidgets/TaskTypeSelect';
import RiskTypeSelect from '../../../_formWidgets/RiskTypeSelect';
import MilestoneFlowChart from '../../TemplateList/components/MilestoneFlowChart';
import MilestoneFlowEditor from '../../TemplateList/components/MilestoneFlowEditor';
import DocumentExplorer from '../../TemplateList/components/DocumentExplorer';
import ProjectFormSelect from '../../TemplateList/components/ProjectFormSelect';
import ProjectImageUpload from '../../../_formWidgets/ProjectImageUpload';
import ProjectTaskManager from '../../TemplateList/components/ProjectTaskManager';
import WorkflowDefinitionSelect from '@/pages/appPdm/ProjectManagement/_formWidgets/WorkflowDefinitionSelect';
import { normalizeToRelativePath } from '@/pages/appPdm/_utils/url';

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

const ProjectEdit: React.FC = () => {
  const { params, id: entityId, mode, isActive, hasChanged } = useKeepAliveParams(
    '/appPdm/ProjectManagement/ProjectList/Edit',
    ['id', 'projectCategoryCode', 'mode']
  );
  // 从 params 中获取 projectCategoryCode（该属性不在 UseKeepAliveParamsResult 的便捷属性中）
  const defaultProjectCategoryCode = params.projectCategoryCode;
  const isViewMode = mode === 'view';

  // 返回上一页
  const handleGoBack = () => {
    history.back();
  };

  // 使用 ref 记录当前页面的 entityId，防止被其他页面的 URL 变化影响
  const currentEntityIdRef = useRef(entityId);

  // 使用 ref 标记组件是否已挂载和活跃
  const isMountedRef = useRef(true);
  const isPageActiveRef = useRef(true);

  useEffect(() => {
    // 组件挂载时设置为活跃
    isPageActiveRef.current = true;
    isMountedRef.current = true;

    return () => {
      // 组件卸载时标记为非活跃
      isPageActiveRef.current = false;
      isMountedRef.current = false;
    };
  }, []);

  const schema = useFormSchema(formId, formSchema);
  const SchemaField = useSchemaField({
    ProjectCategorySelect,
    MaterialSelect,
    ProjectTemplateSelect,
    ProjectSelect,
    UserSelect,
    ProjectRoleSelect,
    TaskTypeSelect,
    RiskTypeSelect,
    MilestoneFlowChart,
    MilestoneFlowEditor,
    DocumentExplorer,
    ProjectFormSelect,
    ProjectImageUpload,
    ProjectTaskManager,
    WorkflowDefinitionSelect,
  });

  // 使用 useMemo 确保表单实例稳定，避免多个页面间的 effects 相互干扰
  const form = useMemo(() => {
    return createForm({
      // 查看模式设置为只读
      pattern: isViewMode ? 'readPretty' : 'editable',
      effects: () => {
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
    });
  }, [isViewMode]);

  // 【BUG修复】单独处理新建项目时从路由带入的项目分类
  // 这个逻辑需要独立于 KeepAlive 的 isActive/hasChanged 判断
  useEffect(() => {
    // 只在新建模式下（没有entityId）且有默认分类时设置
    if (!entityId && defaultProjectCategoryCode) {
      console.log('🔵 [项目编辑] 新建项目，设置默认项目分类:', defaultProjectCategoryCode);
      // 使用 setTimeout 确保表单已经初始化完成
      setTimeout(() => {
        form.setValues({ projectCategoryCode: defaultProjectCategoryCode });
      }, 0);
    }
  }, [entityId, defaultProjectCategoryCode, form]);

  // 将数据加载逻辑移到 useEffect 中，确保与组件生命周期正确绑定
  useEffect(() => {
    // 【KeepAlive 修复】只在页面激活且参数变化时加载数据
    if (!isActive || !hasChanged) {
      console.log('🔵 [项目编辑] 页面未激活或参数未变化，跳过数据加载');
      return;
    }

    const loadData = async () => {
      // 【关键修复】只在页面活跃且 entityId 未变化时执行
      if (!isPageActiveRef.current || !isMountedRef.current) {
        console.log('🔵 [项目编辑] 页面未活跃，跳过数据加载');
        return;
      }

      // 检查 entityId 是否是当前页面的ID（防止被其他页面的URL变化影响）
      if (entityId !== currentEntityIdRef.current) {
        console.log('🔵 [项目编辑] entityId已变化，这可能是其他页面的操作，跳过');
        return;
      }

      if (entityId) {
        try {
          // 【DEBUG】添加日志确认调用的是正确的API
          console.log('🔵 [项目编辑] 准备调用 ProjectGetAsync，entityId:', entityId);
          console.log('🔵 [项目编辑] 调用堆栈:', new Error().stack);

          // 加载项目数据
          const res = await ProjectGetAsync({ id: entityId });

          console.log('📦 [项目编辑] 步骤1: 后端返回的原始数据', {
            milestones: res.milestones,
            milestonesCount: res.milestones?.length
          });

          // 创建formData对象(和模板页面保持一致)
          const formData: any = { ...res };

          // 【BUG修复】将项目负责人转换为labelInValue格式，以便UserSelect能正确回显
          if (res.projectManagerId) {
            (formData as any)['{value:projectManagerId,label:projectManagerName}'] = {
              value: res.projectManagerId,
              label: res.projectManagerName || res.projectManagerId,
            };
            console.log('✅ 项目负责人回显设置:', formData['{value:projectManagerId,label:projectManagerName}']);
          }

          // 创建用户ID到姓名的映射(用于风险和问题的处理人回显)
          const userIdToNameMap = new Map<string, string>();
          if (res.teamMembers && Array.isArray(res.teamMembers)) {
            res.teamMembers.forEach((member: any) => {
              if (member.userId && member.userName) {
                userIdToNameMap.set(member.userId, member.userName);
              }
            });
          }

          // 转换里程碑数据:将parentMilestones对象数组转换为parentCodes名称数组
          if (res.milestones && Array.isArray(res.milestones)) {
            console.log('📦 [项目编辑] 步骤2: 开始处理里程碑数据');

            // 创建里程碑ID到名称的映射
            const idToNameMap = new Map<string, string>();
            res.milestones.forEach((m: any) => {
              if (m.id && m.milestoneName) {
                idToNameMap.set(m.id, m.milestoneName);
              }
            });
            console.log('📦 [项目编辑] 步骤3: ID到名称映射表', Array.from(idToNameMap.entries()));

            const milestonesWithParentCodes = res.milestones.map((milestone: any) => {
              console.log(`📦 [项目编辑] 处理里程碑: ${milestone.milestoneName}`, {
                id: milestone.id,
                parentMilestones: milestone.parentMilestones
              });

              // 如果parentMilestones存在,根据ID查找名称
              let parentCodes: string[] = [];
              if (milestone.parentMilestones && Array.isArray(milestone.parentMilestones)) {
                parentCodes = milestone.parentMilestones
                  .map((pm: any) => {
                    console.log(`  🔍 处理父级里程碑:`, pm);
                    // 优先使用parentMilestoneName,如果为null则通过ID查找
                    if (pm.parentMilestoneName) {
                      console.log(`    ✅ 使用 parentMilestoneName: ${pm.parentMilestoneName}`);
                      return pm.parentMilestoneName;
                    } else if (pm.parentMilestoneId) {
                      const name = idToNameMap.get(pm.parentMilestoneId);
                      console.log(`    🔍 通过ID查找: ${pm.parentMilestoneId} → ${name}`);
                      return name;
                    }
                    console.log(`    ⚠️ 没有找到父级里程碑信息`);
                    return null;
                  })
                  .filter((name: string | null | undefined) => name); // 过滤掉null和undefined
              }
              console.log(`  ✅ 转换后的 parentCodes:`, parentCodes);

              // 后端是单值 formId（里程碑与表单一对一），编辑页也使用单值 formId
              const formId = milestone.formId || (milestone.form && milestone.form.id);

              return {
                ...milestone,
                parentCodes,
                formId,
              };
            });

            console.log('📦 [项目编辑] 步骤4: 转换后的里程碑数据', milestonesWithParentCodes.map(m => ({
              milestoneName: m.milestoneName,
              parentCodes: m.parentCodes,
              id: m.id
            })));

            // 对里程碑进行拓扑排序,按照父子层级关系排列
            formData.milestones = topologicalSortMilestones(milestonesWithParentCodes);

            console.log('📦 [项目编辑] 步骤5: 拓扑排序后的里程碑', formData.milestones.map(m => ({
              milestoneName: m.milestoneName,
              parentCodes: m.parentCodes
            })));
          }

          // 合并文档和文件数据（参考提交逻辑的处理方式）
          const allDocuments: any[] = [];

          // 递归展平文档树结构（仅用于从后端加载的数据）
          const flattenDocuments = (docs: any[], parentId?: string): any[] => {
            const result: any[] = [];
            docs.forEach(doc => {
              // 创建文档副本，转换树形结构为扁平结构
              const flatDoc = {
                ...doc,
                // 从 children 中的第一个元素移除 children 字段，设置正确的 parentId
                parentId: parentId || doc.parentId,
              };
              // 移除 children 字段，因为我们要展平
              delete flatDoc.children;

              result.push(flatDoc);

              // 递归处理子文档，传入当前文档的 id 作为 parentId
              if (doc.children && Array.isArray(doc.children) && doc.children.length > 0) {
                const childDocs = flattenDocuments(doc.children, doc.id);
                result.push(...childDocs);
              }
            });
            return result;
          };

          // 检查文档数据来源：
          // 1. 如果有 children 字段，说明是从后端加载的树形结构，需要展平
          // 2. 如果没有 children 字段或已经是扁平数组（如从模板带过来的），直接使用
          const hasTreeStructure = res.documents && res.documents.some((doc: any) =>
            doc.children && Array.isArray(doc.children)
          );

          // 文档类型兼容：后端 FileType（0=File,1=Directory），前端 DocumentExplorer（0=文件夹,1=文件）
          // 使用“是否存在文件信息/是否可下载”做兜底判断，兼容历史数据与不同来源的数据结构
          const normalizeDocumentTypeForExplorer = (doc: any) => {
            const hasFileInfo = !!(
              (doc?.blobName && String(doc.blobName).trim()) ||
              (doc?.fileName && String(doc.fileName).trim()) ||
              (doc?.contentType && String(doc.contentType).trim()) ||
              (typeof doc?.fileSize === 'number' && doc.fileSize > 0)
            );
            const isDownload = doc?.isDownload === true;

            if (doc?.type === 0) {
              // serverType=File：若明显不像文件（不可下载且无文件信息），按“文件夹”渲染（兼容旧数据）
              return doc?.isDownload === false && !hasFileInfo ? 0 : 1;
            }
            if (doc?.type === 1) {
              // serverType=Directory：若带文件信息或可下载，按“文件”渲染（兼容旧数据）
              return hasFileInfo || isDownload ? 1 : 0;
            }

            // 兜底：没有 type 时按是否有文件信息判断
            return hasFileInfo || isDownload ? 1 : 0;
          };

          if (res.documents && Array.isArray(res.documents)) {
            if (hasTreeStructure) {
              // 从后端加载的树形结构，需要展平
              console.log('📦 [文档] 检测到树形结构，进行展平处理');
              const flatDocs = flattenDocuments(res.documents);
              allDocuments.push(...flatDocs.map((d: any) => ({ ...d, type: normalizeDocumentTypeForExplorer(d) })));
            } else {
              // 已经是扁平结构（如从模板带过来的临时数据），直接使用
              console.log('📦 [文档] 检测到扁平结构，直接使用');
              allDocuments.push(...res.documents.map((d: any) => ({ ...d, type: normalizeDocumentTypeForExplorer(d) })));
            }
          }

          // 添加文件（上传的文件）- 需要映射字段名
          if (res.files && Array.isArray(res.files)) {
            const mappedFiles = res.files.map((file: any) => ({
              id: file.id,
              _id: file.id, // 使用后端返回的真实ID
              documentName: file.fileName || file.originalFileName, // 映射 fileName -> documentName
              documentUrl: file.fileUrl, // 映射 fileUrl -> documentUrl
              blobName: file.blobName,
              fileName: file.originalFileName || file.fileName,
              contentType: file.contentType,
              fileSize: file.fileSize,
              parentId: file.parentId,
              type: 1, // 文件类型固定为 1
              isDownload: file.isDownload !== undefined ? file.isDownload : true,
              description: file.description || '',
            }));
            console.log('📦 [文件映射] 后端返回的files:', res.files);
            console.log('📦 [文件映射] 映射后的文件:', mappedFiles);
            allDocuments.push(...mappedFiles);
          }

          // 将合并后的数据设置到 formData
          if (allDocuments.length > 0) {
            formData.documents = allDocuments;
          }

          // 处理风险数据:为handlerCode添加对应的handlerName
          if (res.risks && Array.isArray(res.risks)) {
            formData.risks = res.risks.map((risk: any) => {
              const handlerName = risk.handlerCode
                ? userIdToNameMap.get(risk.handlerCode)
                : undefined;

              return {
                ...risk,
                handlerName,
              };
            });
          }

          // 处理问题数据:为handlerCode添加对应的handlerName
          if (res.issues && Array.isArray(res.issues)) {
            formData.issues = res.issues.map((issue: any) => {
              const handlerName = issue.handlerCode
                ? userIdToNameMap.get(issue.handlerCode)
                : undefined;

              return {
                ...issue,
                handlerName,
              };
            });
          }

          // 处理任务数据:将JSON字符串转换为数组，并加载关联的风险
          if (res.tasks && Array.isArray(res.tasks)) {
            formData.tasks = await Promise.all(res.tasks.map(async (task: any) => {
              const transformedTask = { ...task };

              // chargeIds: JSON字符串 -> 数组
              if (transformedTask.chargeIds) {
                try {
                  const parsed = JSON.parse(transformedTask.chargeIds);
                  transformedTask.chargeIds = Array.isArray(parsed) ? parsed : [];
                  console.log(`✅ 任务 ${transformedTask.taskName} chargeIds 解析:`, transformedTask.chargeIds);
                } catch (e) {
                  console.warn(`❌ 任务 ${transformedTask.taskName} chargeIds 解析失败:`, e, '原始值:', transformedTask.chargeIds);
                  transformedTask.chargeIds = [];
                }
              } else {
                console.log(`⚠️ 任务 ${transformedTask.taskName} chargeIds 为空`);
                transformedTask.chargeIds = [];
              }

              // processIds: JSON字符串 -> 数组
              if (transformedTask.processIds) {
                try {
                  const parsed = JSON.parse(transformedTask.processIds);
                  transformedTask.processIds = Array.isArray(parsed) ? parsed : [];
                  console.log(`✅ 任务 ${transformedTask.taskName} processIds 解析:`, transformedTask.processIds);
                } catch (e) {
                  console.warn(`❌ 任务 ${transformedTask.taskName} processIds 解析失败:`, e, '原始值:', transformedTask.processIds);
                  transformedTask.processIds = [];
                }
              } else {
                console.log(`⚠️ 任务 ${transformedTask.taskName} processIds 为空`);
                transformedTask.processIds = [];
              }

              // 加载任务关联的风险ID
              if (transformedTask.id) {
                try {
                  const taskRisks = await ProjectTaskGetRisksAsync({ taskId: transformedTask.id });
                  if (taskRisks && Array.isArray(taskRisks)) {
                    transformedTask.riskIds = taskRisks.map((risk: any) => risk.riskId);
                  }
                } catch (e) {
                  console.warn(`加载任务 ${transformedTask.taskName} 的风险关联失败:`, e);
                  transformedTask.riskIds = [];
                }
              }

              return transformedTask;
            }));
          }

          console.log('📦 [项目编辑] 步骤6: 最终设置到表单的数据', {
            milestones: formData.milestones?.map((m: any) => ({
              milestoneName: m.milestoneName,
              parentCodes: m.parentCodes
            })),
            documentsCount: formData.documents?.length,
            documents: formData.documents?.map((d: any) => ({
              documentName: d.documentName,
              type: d.type,
              blobName: d.blobName
            })),
            risksCount: formData.risks?.length,
            issuesCount: formData.issues?.length,
          });

          form.setInitialValues(formData);
          form.setValues(formData); // ← 关键：同时设置当前值，确保 Select 组件正确匹配
        } catch (error) {
          console.error('加载项目数据失败:', error);
          message.error('加载数据失败');
        }
      }
    };

    loadData();
  }, [isActive, hasChanged, entityId, form]);

  const getPageTitle = () => {
    if (isViewMode) return '查看项目';
    return entityId ? '编辑项目' : '新建项目';
  };

  const handleSubmit = async () => {
    try {
      const values = await form.submit();

      // 数据转换
      const transformedValues: any = { ...(values as any) };

      // 【BUG修复】处理项目负责人复合字段：优先使用复合字段，兜底使用原始字段
      const projectManagerField = (values as any)['{value:projectManagerId,label:projectManagerName}'];
      if (projectManagerField && projectManagerField.value) {
        // 复合字段有有效值（用户选择了新的负责人）
        transformedValues.projectManagerId = projectManagerField.value;
        transformedValues.projectManagerName = projectManagerField.label || projectManagerField.value;
        console.log('✓ 项目负责人使用复合字段:', transformedValues.projectManagerId, transformedValues.projectManagerName);
      } else if ((values as any).projectManagerId) {
        // 编辑模式下如果用户没有重新选择负责人，使用原始数据
        transformedValues.projectManagerId = (values as any).projectManagerId;
        transformedValues.projectManagerName = (values as any).projectManagerName || (values as any).projectManagerId;
        console.log('✓ 项目负责人使用原始字段:', transformedValues.projectManagerId, transformedValues.projectManagerName);
      } else {
        console.warn('⚠️ 未找到项目负责人数据');
      }
      // 删除复合字段，避免提交到后端
      delete transformedValues['{value:projectManagerId,label:projectManagerName}'];


      // 清理函数：移除临时ID和内部字段（参考项目模板的实现）
      const cleanItem = (item: any) => {
        if (!item) return item;

        const cleaned = { ...item };
        delete cleaned._id;
        delete cleaned._isNew;

        // 检查并清理 id 字段
        if (cleaned.id !== undefined && typeof cleaned.id === 'string') {
          // 检查是否为临时ID或非标准Guid格式
          const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
          if (cleaned.id.startsWith('temp_') || !guidRegex.test(cleaned.id)) {
            delete cleaned.id;
          }
        }

        return cleaned;
      };

      // 处理里程碑数据
      if (transformedValues.milestones && Array.isArray(transformedValues.milestones)) {
        const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

        // 生成UUID v4 GUID的辅助函数
        const generateGuid = () => {
          return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          });
        };

        // 第一步：为没有有效ID的里程碑分配新的GUID(创建模式)或保留现有ID(编辑模式)
        const idMap = new Map<string, string>(); // 临时ID/名称 -> 真实/新GUID 的映射

        transformedValues.milestones.forEach((milestone: any) => {
          const originalId = milestone.id || milestone._id;

          // 如果没有有效GUID,生成新的
          if (!originalId || !guidRegex.test(originalId)) {
            const newGuid = generateGuid();
            milestone.id = newGuid;
            // 建立临时ID到新GUID的映射
            if (originalId) {
              idMap.set(originalId, newGuid);
            }
            // 建立里程碑名称到GUID的映射(用于名称引用)
            if (milestone.milestoneName) {
              idMap.set(milestone.milestoneName, newGuid);
            }
          } else {
            // 已有有效ID,保留并建立名称映射
            if (milestone.milestoneName) {
              idMap.set(milestone.milestoneName, originalId);
            }
          }
        });

        // 第二步：清理里程碑数据并转换字段
        const processedMilestones = transformedValues.milestones.map((milestone) => {
          const newMilestone = cleanItem(milestone);

          // formId：保持单值（后端期望单值字段）
          if (!newMilestone.formId || (typeof newMilestone.formId === 'string' && newMilestone.formId.trim() === '')) {
            newMilestone.formId = null;
          }


          return newMilestone;
        });

        // 第三步：处理父级里程碑关系,将parentCodes名称数组转换为parentMilestones对象数组
        transformedValues.milestones = processedMilestones.map(newMilestone => {
          // 使用parentCodes(名称数组)而不是parentMilestoneIds
          if (newMilestone.parentCodes && Array.isArray(newMilestone.parentCodes)) {
            const parentMilestones: any[] = [];

            newMilestone.parentCodes.forEach((parentNameOrId: string) => {
              if (!parentNameOrId) return;

              let resolvedParentId: string | null = null;

              // 情况1：已经是有效的GUID(兼容编辑模式)
              if (guidRegex.test(parentNameOrId)) {
                resolvedParentId = parentNameOrId;
              }
              // 情况2：是里程碑名称,从idMap中查找对应的新生成的GUID
              else {
                resolvedParentId = idMap.get(parentNameOrId) || null;
              }

              // 只添加成功解析的父级关系,同时传递ID和名称给后端
              // 后端会优先使用名称查找,ID作为备选方案
              if (resolvedParentId && guidRegex.test(resolvedParentId)) {
                parentMilestones.push({
                  parentMilestoneId: resolvedParentId,
                  parentMilestoneName: parentNameOrId // 保留名称,后端可以用来验证或作为备选查找
                });
              }
            });

            newMilestone.parentMilestones = parentMilestones;
            delete newMilestone.parentCodes; // 删除前端使用的名称数组
          } else {
            // 如果没有父级里程碑,设置为空数组
            newMilestone.parentMilestones = [];
            delete newMilestone.parentCodes;
          }

          // 确保删除旧的parentMilestoneIds字段(如果存在)
          delete newMilestone.parentMilestoneIds;

          return newMilestone;
        });
      }

      // 清理团队成员并去重
      if (transformedValues.teamMembers && Array.isArray(transformedValues.teamMembers)) {
        // 先清理每个成员
        const cleanedMembers = transformedValues.teamMembers.map(cleanItem);

        // 使用 Map 按 ID 去重(保留最后一个相同ID的记录)
        const memberMap = new Map<string, any>();
        const membersWithoutId: any[] = []; // 存储没有ID的新成员

        cleanedMembers.forEach(member => {
          if (member.id) {
            // 如果是有效ID,添加到Map中(相同ID会被覆盖)
            memberMap.set(member.id, member);
          } else {
            // 没有ID的新成员直接保留
            membersWithoutId.push(member);
          }
        });

        // 合并去重后的成员和新成员
        transformedValues.teamMembers = [...Array.from(memberMap.values()), ...membersWithoutId];

        console.log('🔍 团队成员去重前:', cleanedMembers.length, '去重后:', transformedValues.teamMembers.length);
        console.log('🔍 团队成员数据详情:', JSON.stringify(transformedValues.teamMembers, null, 2));
      }

      // 清理任务并去重
      if (transformedValues.tasks && Array.isArray(transformedValues.tasks)) {
        const cleanedTasks = transformedValues.tasks.map(cleanItem);

        // 使用 Map 按 ID 去重
        const taskMap = new Map<string, any>();
        const tasksWithoutId: any[] = [];

        cleanedTasks.forEach(task => {
          if (task.id) {
            taskMap.set(task.id, task);
          } else {
            tasksWithoutId.push(task);
          }
        });

        transformedValues.tasks = [...Array.from(taskMap.values()), ...tasksWithoutId];

        // 保存任务的风险关联信息（用于后续处理）
        const taskRiskMap = new Map<string, string[]>();

        // 转换任务的负责人和处理人字段：数组 -> JSON字符串
        transformedValues.tasks = transformedValues.tasks.map((task: any) => {
          const transformedTask = { ...task };

          // 保存 riskIds（如果存在且为数组）
          if (transformedTask.riskIds && Array.isArray(transformedTask.riskIds) && transformedTask.riskIds.length > 0) {
            // 使用任务ID或临时标识作为key
            const taskKey = transformedTask.id || transformedTask.taskCode || transformedTask.taskName;
            if (taskKey) {
              taskRiskMap.set(taskKey, transformedTask.riskIds);
            }
          }

          // 移除 riskIds 字段（后端 DTO 不支持）
          delete transformedTask.riskIds;

          // chargeIds: 数组 -> JSON字符串
          if (transformedTask.chargeIds && Array.isArray(transformedTask.chargeIds)) {
            console.log(`📤 任务 ${transformedTask.taskName} chargeIds 保存前:`, transformedTask.chargeIds);
            transformedTask.chargeIds = JSON.stringify(transformedTask.chargeIds);
            console.log(`📤 任务 ${transformedTask.taskName} chargeIds 转换后:`, transformedTask.chargeIds);
            // 移除chargeNames,由后端自动填充
            delete transformedTask.chargeNames;
          } else if (transformedTask.chargeIds === undefined || transformedTask.chargeIds === null) {
            // 如果字段为空，也要转换为空数组的JSON字符串
            transformedTask.chargeIds = '[]';
            delete transformedTask.chargeNames;
          }

          // processIds: 数组 -> JSON字符串
          if (transformedTask.processIds && Array.isArray(transformedTask.processIds)) {
            console.log(`📤 任务 ${transformedTask.taskName} processIds 保存前:`, transformedTask.processIds);
            transformedTask.processIds = JSON.stringify(transformedTask.processIds);
            console.log(`📤 任务 ${transformedTask.taskName} processIds 转换后:`, transformedTask.processIds);
            // 移除processNames,由后端自动填充
            delete transformedTask.processNames;
          } else if (transformedTask.processIds === undefined || transformedTask.processIds === null) {
            // 如果字段为空，也要转换为空数组的JSON字符串
            transformedTask.processIds = '[]';
            delete transformedTask.processNames;
          }

          return transformedTask;
        });

        // 过滤无效任务（必须有任务名称和任务类型编码）
        transformedValues.tasks = transformedValues.tasks.filter((t: any) => {
          return t.taskName && t.taskTypeCode && t.taskTypeName;
        });

        console.log('🔍 任务去重前:', cleanedTasks.length, '去重后:', transformedValues.tasks.length);
        console.log('🔍 任务风险关联信息:', Array.from(taskRiskMap.entries()));

        // 将任务风险关联信息存储到变量中，供提交后使用
        (transformedValues as any)._taskRiskMap = taskRiskMap;
      }

      // 合并文件和文档数据（后端统一在Documents集合中处理）
      const allDocuments: any[] = [];

      // 添加文档（没有BlobName的引用/链接）
      if (transformedValues.documents && Array.isArray(transformedValues.documents)) {
        allDocuments.push(...transformedValues.documents);
      }

      // 添加文件（有BlobName的上传文件）
      if (transformedValues.files && Array.isArray(transformedValues.files)) {
        allDocuments.push(...transformedValues.files);
      }

      // 清理合并后的文档并处理父级ID映射
      if (allDocuments.length > 0) {
        transformedValues.documents = allDocuments.map(doc => {
          const cleanedDoc = cleanItem(doc);
          const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

          // 处理 parentId：root / 临时ID / 非Guid字符串 -> 统一转换为 parentDocumentName（后端支持），避免层级丢失
          if (cleanedDoc.parentId === 'root') {
            cleanedDoc.parentId = undefined;
          } else if (cleanedDoc.parentId && typeof cleanedDoc.parentId === 'string') {
            const parentIdStr = cleanedDoc.parentId;
            const isGuid = guidRegex.test(parentIdStr);
            if (!isGuid) {
              const parentDoc = allDocuments.find((d: any) => (d.id || d._id) === parentIdStr);
              if (parentDoc?.documentName) {
                cleanedDoc.parentDocumentName = parentDoc.documentName;
              }
              cleanedDoc.parentId = undefined;
            }
          }

          // 类型映射：前端 0=文件夹/1=文件 -> 后端 1=Directory/0=File（否则后端无法按“先目录后文件”建立层级）
          if (cleanedDoc.type === 0 || cleanedDoc.type === 1) {
            cleanedDoc.type = cleanedDoc.type === 0 ? 1 : 0;
          }

          return cleanedDoc;
        });
      }

      // 删除files字段，后端UpdateProjectDto不需要这个字段
      delete transformedValues.files;

      // 清理风险并去重
      if (transformedValues.risks && Array.isArray(transformedValues.risks)) {
        const cleanedRisks = transformedValues.risks.map(cleanItem);

        // 使用 Map 按 ID 去重
        const riskMap = new Map<string, any>();
        const risksWithoutId: any[] = [];

        cleanedRisks.forEach(risk => {
          if (risk.id) {
            riskMap.set(risk.id, risk);
          } else {
            risksWithoutId.push(risk);
          }
        });

        transformedValues.risks = [...Array.from(riskMap.values()), ...risksWithoutId];

        console.log('🔍 风险去重前:', cleanedRisks.length, '去重后:', transformedValues.risks.length);
      }

      // 清理问题并去重
      if (transformedValues.issues && Array.isArray(transformedValues.issues)) {
        const cleanedIssues = transformedValues.issues.map(cleanItem);

        // 使用 Map 按 ID 去重
        const issueMap = new Map<string, any>();
        const issuesWithoutId: any[] = [];

        cleanedIssues.forEach(issue => {
          if (issue.id) {
            issueMap.set(issue.id, issue);
          } else {
            issuesWithoutId.push(issue);
          }
        });

        transformedValues.issues = [...Array.from(issueMap.values()), ...issuesWithoutId];

        console.log('🔍 问题去重前:', cleanedIssues.length, '去重后:', transformedValues.issues.length);
      }

      console.log('🚀 提交前的原始数据:', JSON.stringify(values, null, 2));
      console.log('🚀 清理后的项目数据:', JSON.stringify(transformedValues, null, 2));
      console.log('🚀 里程碑数据:', JSON.stringify(transformedValues.milestones, null, 2));

      const hide = message.loading('正在提交...', 0);

      try {
        // 保存任务风险关联信息
        const taskRiskMap = (transformedValues as any)._taskRiskMap;
        delete (transformedValues as any)._taskRiskMap; // 删除临时字段

        if ('projectImageUrl' in transformedValues) {
          transformedValues.projectImageUrl = normalizeToRelativePath(transformedValues.projectImageUrl);
        }

        let savedProject: any = null;

        if (!entityId) {
          savedProject = await ProjectCreateAsync(transformedValues);
          message.success('创建成功');
        } else {
          savedProject = await ProjectUpdateAsync({ id: entityId }, transformedValues);
          message.success('更新成功');
        }

        // 处理任务风险关联
        if (taskRiskMap && taskRiskMap.size > 0) {
          try {
            // 重新获取项目数据，确保获取到任务ID
            const projectId = savedProject?.id || entityId;
            if (projectId) {
              const projectData = await ProjectGetAsync({ id: projectId });

              if (projectData?.tasks && Array.isArray(projectData.tasks)) {
                // 遍历任务，处理风险关联
                for (const task of projectData.tasks) {
                  // 尝试通过不同的key匹配任务
                  const taskKey = task.id || task.taskCode || task.taskName;
                  const riskIds = taskRiskMap.get(taskKey);

                  if (riskIds && riskIds.length > 0 && task.id) {
                    // 调用批量关联风险接口
                    await ProjectTaskAddRisksAsync({
                      taskId: task.id,
                      riskIds: riskIds
                    });
                    console.log(`✅ 任务 ${task.taskName} 关联风险成功:`, riskIds);
                  }
                }
                console.log('✅ 所有任务风险关联处理完成');
              }
            }
          } catch (riskErr: any) {
            console.error('❌ 任务风险关联失败:', riskErr);
            message.warning('项目保存成功，但部分任务风险关联失败: ' + (riskErr.message || '未知错误'));
          }
        }

        // 返回上一页
        setTimeout(() => {
          history.back();
        }, 500);
      } catch (err: any) {
        message.error((entityId ? '更新失败: ' : '创建失败: ') + (err.message || '未知错误'));
      } finally {
        hide();
      }
    } catch (err: any) {
      // 表单验证错误，已自动显示
      console.error('表单验证错误:', err);
    }
  };

  return (
    <Card
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button
            icon={<ArrowLeftOutlined />}
            type="text"
            onClick={handleGoBack}
            style={{ marginRight: 16 }}
          />
          {getPageTitle()}
        </div>
      }
      extra={
        isViewMode ? (
          <Button onClick={handleGoBack}>关闭</Button>
        ) : (
          <div>
            <Button onClick={handleGoBack} style={{ marginRight: 8 }}>
              取消
            </Button>
            <Button type="primary" onClick={handleSubmit}>
              保存
            </Button>
          </div>
        )
      }
    >
      <FormProvider form={form}>
        <FormLayoutMode formId={formId} {...schema.form}>
          <SchemaField schema={schema.schema} />
        </FormLayoutMode>
      </FormProvider>
    </Card>
  );
};

export default ProjectEdit;

export const routeProps = {
  name: '项目编辑',
};
