import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, history, closeTab, dropByCacheKey } from 'umi';
import { useKeepAliveParams } from '@/hooks';
import { Card, Button, message, Spin } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { createForm } from '@formily/core';
import { FormProvider } from '@formily/react';
import { useFormSchema, useSchemaField } from 'umi';
import FormLayoutMode from '@/pages/_utils/editMode';
import MilestoneFlowChart from '../components/MilestoneFlowChart';
import MilestoneFlowEditor from '../components/MilestoneFlowEditor';
import ProjectFormSelect from '../components/ProjectFormSelect';
import DocumentExplorer from '../components/DocumentExplorer';
import ProjectCategorySelect from '../../../_formWidgets/ProjectCategorySelect';
import ProjectTaskManager from '../components/ProjectTaskManager';
import { formId, formSchema } from '../components/schema';
import './index.less';
import {
  ProjectTemplateCreateAsync,
  ProjectTemplateUpdateAsync,
  ProjectTemplateGetAsync
} from '@/services/pdm/ProjectTemplate';
import { onFieldValueChange } from '@formily/core';

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

const ProjectTemplateEdit: React.FC = () => {
  const navigate = useNavigate();
  const { params, isActive, hasChanged } = useKeepAliveParams(
    '/appPdm/ProjectManagement/TemplateList/Edit',
    ['id', 'categoryCode', 'mode']
  );
  // 从 params 中提取参数（categoryCode 不是便捷属性，需要从 params 中获取）
  const entityId = params.id;
  const defaultCategoryCode = params.categoryCode;
  const mode = params.mode;
  const isViewMode = mode === 'view';

  // 返回上一页并关闭当前标签
  const handleGoBack = () => {
    const currentPath = window.location.pathname;
    // 清除列表页缓存，确保跳转后会重新加载数据
    dropByCacheKey('/appPdm/ProjectManagement/TemplateList');
    history.push('/appPdm/ProjectManagement/TemplateList');
    setTimeout(() => {
      closeTab(currentPath);
    }, 150);
  };

  // 【新增】使用 state 控制表单重新挂载，解决 ArrayTable 渲染缓存问题
  const [formKey, setFormKey] = useState(0);
  // 【新增】保存加载的表单数据
  const [loadedData, setLoadedData] = useState<any>(null);
  // 【新增】标记数据是否已加载
  const [isDataLoaded, setIsDataLoaded] = useState(false);

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
    MilestoneFlowChart,
    MilestoneFlowEditor,
    ProjectFormSelect,
    DocumentExplorer,
    ProjectCategorySelect,
    ProjectTaskManager
  });

  // 使用 useMemo 确保表单实例稳定，避免多个页面间的 effects 相互干扰
  // 【修改】添加 formKey 作为依赖，当 formKey 变化时重新创建表单
  // 【关键】只有在 isDataLoaded 为 true 时才创建表单，确保 loadedData 已经准备好
  const form = useMemo(() => {
    // 如果数据还没加载完成，返回一个空表单（不会被使用）
    if (!isDataLoaded) {
      console.log('🟡 [创建表单] 数据未加载，跳过创建');
      return createForm();
    }

    console.log('🟡 [创建表单] formKey:', formKey, 'loadedData.templateRoles:', loadedData?.templateRoles);
    const formInstance = createForm({
      // 查看模式设置为只读
      pattern: isViewMode ? 'readPretty' : 'editable',
      // 【修改】如果有 loadedData，作为初始值传入
      initialValues: loadedData || {},
      effects: () => {
        // 监听里程碑数组变化,自动设置默认值
        // 只在编辑模式下启用,查看模式不需要
        if (!isViewMode) {
          let previousLength = 0;

          onFieldValueChange('milestones', (field) => {
            const milestones = field.value || [];

            // 检测到数组长度增加（新增了里程碑）
            if (milestones.length > previousLength) {
              const lastIndex = milestones.length - 1;
              const lastMilestone = milestones[lastIndex];
              const prevMilestone = lastIndex > 0 ? milestones[lastIndex - 1] : null;

              // 如果是新增的项（没有 milestoneName）且有前一个里程碑
              if (lastMilestone && !lastMilestone.milestoneName && prevMilestone && prevMilestone.milestoneName) {
                // 检查是否需要设置默认值
                const needsDefaultValue = !lastMilestone.parentCodes || lastMilestone.parentCodes.length === 0;

                if (needsDefaultValue) {
                  // 使用 setTimeout 避免与 ArrayTable 的内部逻辑冲突
                  setTimeout(() => {
                    field.form.setFieldState(`milestones.${lastIndex}.parentCodes`, state => {
                      state.value = [prevMilestone.milestoneName];
                    });
                  }, 0);
                }
              }
            }

            // 更新长度记录
            previousLength = milestones.length;
          });
        }
      },
    });

    // 【调试】打印创建后的表单值
    console.log('🟡 [创建表单] formInstance.values.templateRoles:', formInstance.values?.templateRoles);
    console.log('🟡 [创建表单] formInstance.values 完整对象:', JSON.stringify(formInstance.values, null, 2));

    // 【调试】延迟检查 field 的值
    setTimeout(() => {
      const field = formInstance.query('templateRoles').take();
      console.log('🟣 [延迟检查] templateRoles field:', field);
      console.log('🟣 [延迟检查] templateRoles field.value:', field?.value);
    }, 100);

    return formInstance;
  }, [isViewMode, formKey, loadedData, isDataLoaded]);

  // 将数据加载逻辑移到 useEffect 中，确保与组件生命周期正确绑定
  useEffect(() => {
    // 【KeepAlive 修复】只在页面激活且参数变化时加载数据
    if (!isActive || !hasChanged) {
      console.log('🟢 [项目模板编辑] 页面未激活或参数未变化，跳过数据加载');
      return;
    }

    const loadData = async () => {
      // 【关键修复】只在页面活跃且 entityId 未变化时执行
      if (!isPageActiveRef.current || !isMountedRef.current) {
        console.log('🟢 [项目模板编辑] 页面未活跃，跳过数据加载');
        return;
      }

      // 检查 entityId 是否是当前页面的ID（防止被其他页面的URL变化影响）
      if (entityId !== currentEntityIdRef.current) {
        console.log('🟢 [项目模板编辑] entityId已变化，这可能是其他页面的操作，跳过');
        return;
      }

      if (entityId) {
        try {
          // 【DEBUG】添加日志确认调用的是正确的API
          console.log('🟢 [项目模板编辑] 准备调用 ProjectTemplateGetAsync，entityId:', entityId);
          console.log('🟢 [项目模板编辑] 调用堆栈:', new Error().stack);

          // 加载模板数据
          const res = await ProjectTemplateGetAsync({ id: entityId });

          // 【修复】不转换字段名，直接使用后端返回的 templateRoles
          console.log('🔴 [项目模板编辑] 原始 templateRoles:', res.templateRoles);

          const formData: any = {
            ...res,
            // 不做任何转换，保持后端字段名
          };

          // 【关键修复】为 templateRoles 添加唯一 _id，解决 AgGrid 只显示一行的问题
          // AgGrid 使用 getRowId 返回 data._id || data.id 作为行标识
          // 如果所有行的 id 都是 undefined，AgGrid 会把它们当作同一行
          if (res.templateRoles && Array.isArray(res.templateRoles)) {
            console.log('🟢🟢🟢 [_id修复] 开始为 templateRoles 添加 _id');
            formData.templateRoles = res.templateRoles.map((role: any, index: number) => ({
              ...role,
              _id: role.roleId || `role_${index}`, // 使用 roleId 作为唯一标识
            }));
            console.log('🟢🟢🟢 [_id修复] 添加 _id 后的 templateRoles:', formData.templateRoles);
          }

          // 转换里程碑数据:将parentMilestones对象数组转换为parentCodes名称数组
          if (res.milestones && Array.isArray(res.milestones)) {
            // 创建里程碑ID到名称的映射
            const idToNameMap = new Map<string, string>();
            res.milestones.forEach((m: any) => {
              if (m.id && m.milestoneName) {
                idToNameMap.set(m.id, m.milestoneName);
              }
            });

            const milestonesWithParentCodes = res.milestones.map((milestone: any) => {

              // 如果parentMilestones存在,根据ID查找名称
              let parentCodes: string[] = [];
              if (milestone.parentMilestones && Array.isArray(milestone.parentMilestones)) {
                parentCodes = milestone.parentMilestones
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

              // formId字段直接使用,后端API已支持formId字段
              // 无需转换

              return {
                ...milestone,
                parentCodes,
              };
            });

            // 对里程碑进行拓扑排序,按照父子层级关系排列
            formData.milestones = topologicalSortMilestones(milestonesWithParentCodes);
          }

          // 转换文档数据：将parentDocumentName转换为parentId
          if (res.documents && Array.isArray(res.documents)) {
            // 第一步：建立文档名称到ID的映射
            const nameToIdMap = new Map<string, string>();
            res.documents.forEach((doc: any) => {
              if (doc.id && doc.documentName) {
                nameToIdMap.set(doc.documentName, doc.id);
              }
            });

            // 第二步：为每个文档设置parentId
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

              // 如果有parentDocumentName，通过名称查找parentId
              if (doc.parentDocumentName) {
                const parentId = nameToIdMap.get(doc.parentDocumentName);
                if (parentId) {
                  converted.parentId = parentId;
                }
                // 删除临时字段
                delete converted.parentDocumentName;
              }

              return converted;
            });
          }

          // 【修复】直接设置数据和 formKey，让 React 批量更新
          console.log('🔴 [项目模板编辑] 准备设置 formData.templateRoles:', formData.templateRoles);

          // 【关键修复】同步更新所有状态，避免 useMemo 多次触发导致 ArrayTable 渲染问题
          setLoadedData(formData);
          setFormKey(prev => prev + 1);
          setIsDataLoaded(true);
          console.log('🔴 [项目模板编辑] 已设置数据并触发表单重新挂载');
        } catch (error) {
          console.error('加载项目模板数据失败:', error);
          message.error('加载数据失败');
        }
      } else if (defaultCategoryCode) {
        // 【修复】同步更新状态
        setLoadedData({ categoryCode: defaultCategoryCode });
        setFormKey(prev => prev + 1);
        setIsDataLoaded(true);
      } else {
        // 新建模式，没有初始数据
        setIsDataLoaded(true);
      }
    };

    loadData();
  }, [isActive, hasChanged, entityId, defaultCategoryCode]);

  const handleSubmit = async () => {
    const values = await form.submit();

    // 数据转换：将前端字段转换为后端API期望的格式
    const transformedValues = { ...values };

    // 转换项目角色数据 - 后端提交时使用 roles 字段
    if (transformedValues.templateRoles && Array.isArray(transformedValues.templateRoles)) {
      transformedValues.roles = transformedValues.templateRoles
        .filter((r: any) => r && r.roleId) // 过滤掉空对象或没有 roleId 的项
        .map((r: any) => ({
          roleId: r.roleId,
          isRequired: r.isRequired ?? false,
        }));
      // 删除 templateRoles 字段（后端提交不需要）
      delete transformedValues.templateRoles;
    }

    // 转换里程碑数据
    if (transformedValues.milestones && Array.isArray(transformedValues.milestones)) {
      const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

      // 构建里程碑映射：名称/临时ID -> 真实ID 或 名称(创建模式)
      const idMap = new Map<string, string>();

      transformedValues.milestones.forEach((m: any) => {
        const originalId = m.id || m._id;
        const milestoneName = m.milestoneName;

        if (milestoneName) {
          if (entityId) {
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
        const { _id, _isNew, parentCodes, parentMilestones, ...milestone } = m;

        // formId字段直接保留,后端API已支持formId字段（一对一关系）
        // 无需转换为forms数组

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

        // 验证 responsibleId 格式
        if (milestone.responsibleId) {
          const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
          if (!guidRegex.test(milestone.responsibleId)) {
            console.warn(`警告: responsibleId "${milestone.responsibleId}" 不是有效的 Guid 格式`);
          }
        }


        // 确保sequence字段被保留
        if (!milestone.sequence && milestone.sequence !== 0) {
          milestone.sequence = index + 1; // 使用数组索引作为默认sequence
        }

        return milestone;
      });
    }

    // 转换文档数据
    if (transformedValues.documents && Array.isArray(transformedValues.documents)) {
      // 第一步：为所有文档（文件夹和文件）建立临时ID到真实ID的映射
      // 同时建立文档名称到真实ID的映射，用于处理新建的文件夹
      const idMapping = new Map<string, string>();
      const nameToIdMapping = new Map<string, string>();

      transformedValues.documents.forEach((d: any) => {
        const itemName = d.documentName;

        // 如果有真实ID（已保存过的项），建立映射
        if (d.id) {
          if (d._id && d._id.startsWith('temp_')) {
            idMapping.set(d._id, d.id); // 临时ID -> 真实ID
          }
          nameToIdMapping.set(itemName, d.id); // 名称 -> 真实ID
        }
      });

      // 第二步：构建临时ID到文档名称的映射（用于后续排序和父子关系处理）
      const tempIdToNameMap = new Map<string, string>();
      transformedValues.documents.forEach((d: any) => {
        const tempId = d._id || d.id;
        if (tempId) {
          tempIdToNameMap.set(tempId, d.documentName);
        }
      });

      // 第三步：转换文档数据，替换parentId中的临时ID
      const convertedDocuments = transformedValues.documents.map((d: any) => {
        const { _id, children, ...document } = d;

        // 处理parentId：优先使用真实ID，如果找不到则保持原值（让后端处理）
        let finalParentId = document.parentId;

        // 只有在parentId是临时ID且我们有真实ID映射时才进行转换
        if (finalParentId && typeof finalParentId === 'string' && finalParentId.startsWith('temp_')) {
          // 临时ID：尝试从映射中查找真实ID
          const realId = idMapping.get(finalParentId);
          if (realId) {
            finalParentId = realId;
          } else {
            // 找不到映射，尝试通过父文件夹名称查找
            const parentDoc = transformedValues.documents.find(
              (item: any) => (item.id || item._id) === finalParentId
            );
            if (parentDoc && nameToIdMapping.has(parentDoc.documentName)) {
              finalParentId = nameToIdMapping.get(parentDoc.documentName);
            }
            // 如果是第一次保存（所有项都是临时ID），保持原值，让后端处理
            // 后端会按照文档名称建立映射并正确设置层级关系
            // 注意：保持原值而不是设为undefined，这样后端可以通过名称找到父文件夹
          }
        }

        // 处理parentDocumentName：如果parentId是临时ID，查找对应的文档名称
        let parentDocumentName = undefined;
        if (finalParentId && typeof finalParentId === 'string' && finalParentId.startsWith('temp_')) {
          const parentDoc = transformedValues.documents.find(
            (item: any) => (item.id || item._id) === finalParentId
          );
          if (parentDoc) {
            parentDocumentName = parentDoc.documentName;
            // 由于parentId是临时ID无法被后端解析，设为undefined，使用parentDocumentName代替
            finalParentId = undefined;
          }
        }

        // 保留所有API需要的字段,包括blobName、fileName等
        const converted = {
          id: document.id, // 保留真实ID（如果存在）
          documentName: document.documentName,
          documentUrl: document.documentUrl || '',
          blobName: document.blobName || '',
          fileName: document.fileName || '',
          contentType: document.contentType || '',
          fileSize: document.fileSize || 0,
          parentId: finalParentId,
          parentDocumentName: parentDocumentName, // 新增：父文档名称
          isDownload: document.isDownload ?? true,
          // 类型映射：前端 0=文件夹/1=文件 -> 后端 1=Directory/0=File
          type: document.type === 0 ? 1 : 0,
          description: document.description || '',
        };
        return converted;
      });

      transformedValues.documents = convertedDocuments;
    }

    // 转换任务数据 - 过滤无效任务
    if (transformedValues.tasks && Array.isArray(transformedValues.tasks)) {
      // 建立里程碑名称到ID的映射（用于任务关联里程碑）
      const milestoneNameToIdMap = new Map<string, string>();

      if (transformedValues.milestones && Array.isArray(transformedValues.milestones)) {
        transformedValues.milestones.forEach((m: any) => {
          if (m.milestoneName) {
            // 编辑模式：优先使用真实ID，否则使用名称（创建模式）
            const milestoneId = m.id || m.milestoneName;
            milestoneNameToIdMap.set(m.milestoneName, milestoneId);
          }
        });
      }

      transformedValues.tasks = transformedValues.tasks
        .filter((t: any) => {
          // 过滤条件：必须有任务名称和任务类型编码
          return t.taskName && t.taskTypeCode && t.taskTypeName;
        })
        .map((t: any) => {
          const task: any = {
            taskName: t.taskName,
            taskTypeCode: t.taskTypeCode,
            taskTypeName: t.taskTypeName,
          };

          // 可选字段
          if (t.description) task.description = t.description;

          // 修复：通过里程碑名称映射获取正确的ID
          if (t.milestoneName) {
            task.milestoneName = t.milestoneName;
            // 尝试从映射中获取里程碑ID
            const mappedId = milestoneNameToIdMap.get(t.milestoneName);
            if (mappedId) {
              task.milestoneId = mappedId;
            } else if (t.milestoneId) {
              // 如果映射失败，保留原值（可能是编辑已保存的任务）
              task.milestoneId = t.milestoneId;
            }
          } else if (t.milestoneId) {
            // 没有名称但有ID（旧数据兼容）
            task.milestoneId = t.milestoneId;
          }

          if (t.estimatedHours !== undefined && t.estimatedHours !== null) {
            task.estimatedHours = t.estimatedHours;
          }
          if (t.urgencyLevel !== undefined && t.urgencyLevel !== null) {
            task.urgencyLevel = t.urgencyLevel;
          }

          return task;
        });
    }

    const hide = message.loading('正在提交...', 0);

    try {
      if (!entityId) {
        await ProjectTemplateCreateAsync(transformedValues);
        message.success('创建成功');
      } else {
        await ProjectTemplateUpdateAsync({ id: entityId }, transformedValues);
        message.success('更新成功');
      }
      // 返回列表页并关闭当前标签
      const currentPath = window.location.pathname;
      // 清除列表页缓存，确保跳转后会重新加载数据
      dropByCacheKey('/appPdm/ProjectManagement/TemplateList');
      history.push('/appPdm/ProjectManagement/TemplateList');
      setTimeout(() => {
        closeTab(currentPath);
      }, 150);
    } catch (err: any) {
      const errorMsg = String(err.message || '');
      // Suppress generic 403 error using case-insensitive regex
      if (
        err.data?.status === 403 ||
        err.response?.status === 403 ||
        /403|status code 403/i.test(errorMsg)
      ) {
        // Do nothing, specific error should be handled globally or displayed elsewhere
      } else {
        message.error((entityId ? '更新失败: ' : '创建失败: ') + (errorMsg || '未知错误'));
      }
    } finally {
      hide();
    }
  };

  const getPageTitle = () => {
    if (isViewMode) return '查看项目模板';
    return entityId ? '编辑项目模板' : '新建项目模板';
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
      {!isDataLoaded ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" tip="加载数据中..." />
        </div>
      ) : (
        <FormProvider form={form} key={formKey}>
          <FormLayoutMode formId={formId} {...schema.form}>
            <SchemaField schema={schema.schema} />
          </FormLayoutMode>
        </FormProvider>
      )}
    </Card>
  );
};

export default ProjectTemplateEdit;

export const routeProps = {
  name: '项目模板编辑',
};
