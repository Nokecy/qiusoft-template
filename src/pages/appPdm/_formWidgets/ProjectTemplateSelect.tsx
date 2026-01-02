import React, { useEffect, useState } from 'react';
import { Select, message, Modal, Button, Space, Descriptions, Tabs, Table } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { ProjectTemplateGetListAsync, ProjectTemplateGetAsync } from '@/services/pdm/ProjectTemplate';
import type { DefaultOptionType } from 'antd/es/select';
import { useForm } from '@formily/react';

interface ProjectTemplateSelectProps {
  value?: any;
  onChange?: (value: any, option?: any) => void;
  [key: string]: any;
}

/**
 * 项目模板下拉选择组件
 * 数据源为项目模板列表
 * 选择模板后会自动将模板数据带入表单
 */
const ProjectTemplateSelect: React.FC<ProjectTemplateSelectProps> = (props) => {
  const { value, onChange, ...restProps } = props;
  const [options, setOptions] = useState<DefaultOptionType[]>([]);
  const [loading, setLoading] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewData, setPreviewData] = useState<any>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const form = useForm();

  // 加载模板数据
  const loadData = async () => {
    setLoading(true);
    try {
      const res = await ProjectTemplateGetListAsync({
        MaxResultCount: 1000, // 加载所有数据
        SkipCount: 0,
      });
      const opts = (res.items || []).map((item: any) => ({
        value: item.templateCode,
        label: `${item.templateCode} - ${item.templateName}`,
        key: item.id,
        data: item,
      }));
      setOptions(opts);
    } catch (error) {
      console.error('加载项目模板失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // 查看模板详情
  const handlePreview = async (templateId: string) => {
    setPreviewLoading(true);
    setPreviewVisible(true);
    try {
      const detail = await ProjectTemplateGetAsync({ id: templateId });
      setPreviewData(detail);
    } catch (error) {
      message.error('加载模板详情失败');
      console.error(error);
    } finally {
      setPreviewLoading(false);
    }
  };

  // 选择模板后自动填充数据
  const handleChange = async (selectedValue: any, option: any) => {
    if (onChange) {
      onChange(selectedValue, option);
    }

    if (!selectedValue || !option) return;

    try {
      // 获取模板详情
      const templateId = option.key;
      const template = await ProjectTemplateGetAsync({ id: templateId });

      console.log('🔍 [模板选择] 步骤1: 后端返回的完整模板数据', template);
      console.log('🔍 [模板选择] 步骤2: templateRoles原始数据', {
        exists: !!template.templateRoles,
        isArray: Array.isArray(template.templateRoles),
        length: template.templateRoles?.length,
        data: template.templateRoles
      });

      // 自动填充模板数据到表单
      const updates: any = {};

      // 【新增】声明里程碑ID映射表,供后续任务使用
      let oldMilestoneIdToTempIdMap: Map<string, string> | null = null;

      // 1. 团队成员（从模板角色转换）
      // Formily会自动处理复合字段,直接赋值projectRoleCode和projectRoleName即可
      if (template.templateRoles && template.templateRoles.length > 0) {
        const baseTimestamp = Date.now();
        updates.teamMembers = template.templateRoles.map((role, index) => {
          // 【修复】为每个团队成员生成临时ID,确保ArrayTable可以正确渲染所有行
          const tempId = `temp_member_${baseTimestamp}_${index}`;
          return {
            id: tempId, // 临时ID,用于ArrayTable渲染
            _id: tempId, // 备用临时ID字段
            _isNew: true, // 标记为新建
            projectRoleCode: role.roleCode || role.roleId,
            projectRoleName: role.roleName || role.roleCode || role.roleId,
            // userId 和 userName 需要用户手动填写
          };
        });

        console.log('👥 从模板加载的团队成员(已生成临时ID):', updates.teamMembers.map(m => ({
          id: m.id,
          roleCode: m.projectRoleCode,
          roleName: m.projectRoleName
        })));
      }

      // 2. 里程碑
      // 【重要】从模板加载时,不保留任何ID引用,只使用名称建立关系
      // 这样可以避免模板ID污染,后端会根据名称重新建立关系
      if (template.milestones && template.milestones.length > 0) {
        // 建立里程碑ID到名称的映射表(用于查找父级里程碑名称)
        const idToNameMap = new Map<string, string>();
        template.milestones.forEach(milestone => {
          if (milestone.id && milestone.milestoneName) {
            idToNameMap.set(milestone.id, milestone.milestoneName);
          }
        });

        // 【新增】建立模板里程碑ID到新临时ID的映射表(用于任务关联里程碑)
        const milestoneTimestamp = Date.now();
        const tempMap = new Map<string, string>();
        template.milestones.forEach((milestone, index) => {
          if (milestone.id) {
            const tempId = `temp_milestone_${milestoneTimestamp}_${index}`;
            tempMap.set(milestone.id, tempId);
          }
        });
        oldMilestoneIdToTempIdMap = tempMap;  // 赋值给外部变量

        // 转换为表单数据格式
        updates.milestones = template.milestones.map((milestone, index) => {
          // 【关键】将 parentMilestones 数组转换为 parentCodes (父级里程碑名称数组)
          // 不使用 parentMilestoneIds,避免保留模板中的ID引用
          let parentCodes: string[] = [];
          if (milestone.parentMilestones && milestone.parentMilestones.length > 0) {
            parentCodes = milestone.parentMilestones
              .map((pm: any) => {
                // 优先使用parentMilestoneName,如果没有则通过ID查找
                if (pm.parentMilestoneName) {
                  return pm.parentMilestoneName;
                }
                if (pm.parentMilestoneId) {
                  return idToNameMap.get(pm.parentMilestoneId) || null;
                }
                return null;
              })
              .filter(Boolean) as string[];
          }

          // 后端API返回的是 formId（一对一关系），项目编辑页里程碑使用单值 formId
          const formId = milestone.formId || (milestone.form && milestone.form.id);

          // 【修复】为列表项生成临时ID,确保ArrayTable可以正确渲染
          const tempId = `temp_milestone_${milestoneTimestamp}_${index}`;

          return {
            id: tempId, // 临时ID,用于ArrayTable渲染和关联选择
            _id: tempId, // 备用临时ID字段
            milestoneName: milestone.milestoneName,
            isApproval: milestone.isApproval || false,
            workflowDefinitionId: milestone.workflowDefinitionId,
            parentCodes: parentCodes, // 使用名称数组,不使用ID数组
            formId: formId, // 单值 formId
            sequence: milestone.sequence || index + 1, // 保留序号
            // responsibleId 和 responsibleName 需要用户手动填写
          };
        });

        console.log('📍 从模板加载的里程碑(已生成临时ID):', updates.milestones.map(m => ({
          id: m.id,
          _id: m._id,
          name: m.milestoneName,
          parentCodes: m.parentCodes, // 父级名称数组,不是ID
          formId: m.formId,
          sequence: m.sequence,
        })));

        console.log('🗺️ 里程碑ID映射表(模板ID→临时ID):', Array.from(tempMap.entries()).map(([oldId, newId]) => ({
          oldId: oldId.substring(0, 8) + '...',
          newId
        })));
      }

      // 3. 任务
      // Formily会自动处理复合字段,直接赋值taskTypeCode和taskTypeName即可
      if (template.tasks && template.tasks.length > 0) {
        const taskTimestamp = Date.now();
        updates.tasks = template.tasks.map((task, index) => {
          // 【修复】为每个任务生成临时ID
          const tempId = `temp_task_${taskTimestamp}_${index}`;

          // 【关键修复】将模板任务的milestoneId转换为新的临时ID
          let milestoneId: string | undefined = undefined;
          if (task.milestoneId && oldMilestoneIdToTempIdMap) {
            milestoneId = oldMilestoneIdToTempIdMap.get(task.milestoneId);
            if (!milestoneId) {
              console.warn(`⚠️ [任务] ${task.taskName}: 模板milestoneId=${task.milestoneId}未在映射表中找到`);
            }
          }

          return {
            id: tempId, // 临时ID,用于ArrayTable渲染
            _id: tempId, // 备用临时ID字段
            _isNew: true, // 标记为新建
            taskCode: task.taskCode,
            taskName: task.taskName,
            taskTypeCode: task.taskTypeCode,
            taskTypeName: task.taskTypeName,
            description: task.description,
            estimatedHours: task.estimatedHours,
            parentCode: task.parentCode, // 父级任务编码
            frontMountedCode: task.frontMountedCode, // 前置任务编码
            rearMountedCode: task.rearMountedCode, // 后置任务编码
            milestoneId: milestoneId, // 【新增】关联到新的临时里程碑ID
          };
        });

        console.log('📋 从模板加载的任务(已生成临时ID):', updates.tasks.map(t => ({
          id: t.id,
          name: t.taskName,
          typeCode: t.taskTypeCode,
          milestoneId: t.milestoneId  // 【新增】显示关联的里程碑ID
        })));
      }

      // 4. 文档 - 【重要】清理所有ID引用,使用临时ID建立父子关系
      if (template.documents && template.documents.length > 0) {
        console.log('📁 [文档] 模板原始文档数据:', template.documents.map(d => ({
          id: d.id,
          name: d.documentName,
          parentId: d.parentId,
          type: d.type,
          blobName: d.blobName
        })));

        // 第一步: 为每个文档生成临时ID,并建立映射
        const baseTimestamp = Date.now();
        const oldIdToTempIdMap = new Map<string, string>();

        template.documents.forEach((doc, index) => {
          const tempId = `temp_doc_${baseTimestamp}_${index}`;
          if (doc.id) {
            oldIdToTempIdMap.set(doc.id, tempId);
          }
        });

        console.log('📁 [文档] 模板文档总数:', template.documents.length);
        console.log('📁 [文档] ID映射表大小:', oldIdToTempIdMap.size);
        console.log('📁 [文档] ID映射表:', Array.from(oldIdToTempIdMap.entries()).map(([oldId, newId]) => ({
          oldId: oldId.substring(0, 8) + '...',
          newId: newId
        })));

        // 第二步: 转换文档数据,使用临时ID建立父子关系
        updates.documents = template.documents.map((doc, index) => {
          const tempId = `temp_doc_${baseTimestamp}_${index}`;

          // 【关键】将模板的 parentId 转换为新的临时 parentId
          let newParentId: string | undefined = undefined;
          if (doc.parentId) {
            if (oldIdToTempIdMap.has(doc.parentId)) {
              newParentId = oldIdToTempIdMap.get(doc.parentId);
              console.log(`✅ [文档] ${doc.documentName}: 找到父级映射`);
              console.log(`   旧parentId: ${doc.parentId.substring(0, 8)}...`);
              console.log(`   新parentId: ${newParentId}`);
            } else {
              console.warn(`⚠️ [文档] ${doc.documentName}: parentId=${doc.parentId.substring(0, 8)}... 未在映射表中找到`);
              console.warn(`   当前映射表中的所有旧ID:`, Array.from(oldIdToTempIdMap.keys()).map(id => id.substring(0, 8) + '...'));
            }
          } else {
            console.log(`📁 [文档] ${doc.documentName}: 无父级 (根节点)`);
          }

          return {
            _id: tempId, // 前端临时ID
            documentName: doc.documentName,
            documentUrl: doc.documentUrl || '',
            blobName: doc.blobName || '',
            fileName: doc.fileName || doc.documentName,
            contentType: doc.contentType || '',
            fileSize: doc.fileSize || 0,
            parentId: newParentId, // 使用新的临时parentId,不是parentDocumentName!
            isDownload: doc.isDownload !== false,
            type: doc.type,
            description: doc.description || '',
          };
        });

        console.log('📁 从模板加载的文档(已清理ID,使用临时ID):', updates.documents.map(d => ({
          _id: d._id,
          name: d.documentName,
          type: d.type,
          parentId: d.parentId, // 新的临时parentId
          blobName: d.blobName,
        })));
      }

      // 5. 项目描述
      if (template.description) {
        updates.description = template.description;
      }

      // 6. 项目分类编码 - 不从模板获取，完全由URL传入控制
      // 已移除模板分类编码逻辑

      // 批量更新表单
      console.log('🔍 [模板选择] 步骤3: 准备更新到表单的数据', {
        teamMembersCount: updates.teamMembers?.length,
        teamMembers: updates.teamMembers,
        milestonesCount: updates.milestones?.length,
        tasksCount: updates.tasks?.length,
        documentsCount: updates.documents?.length,
      });

      form.setValues(updates);

      console.log('🔍 [模板选择] 步骤4: 表单更新后的值', {
        teamMembersCount: form.values.teamMembers?.length,
        teamMembers: form.values.teamMembers
      });

      message.success(`已加载项目模板：${template.templateName || selectedValue}`);
    } catch (error) {
      console.error('加载项目模板数据失败:', error);
      message.error('加载项目模板数据失败');
    }
  };

  return (
    <>
      <Space.Compact style={{ width: '100%' }}>
        <Select
          {...restProps}
          value={value}
          onChange={handleChange}
          options={options}
          loading={loading}
          placeholder="请选择项目模板"
          allowClear
          showSearch
          filterOption={(input, option) =>
            (option?.label ?? '').toString().toLowerCase().includes(input.toLowerCase())
          }
          style={{ flex: 1 }}
        />
        {value && (
          <Button
            icon={<EyeOutlined />}
            onClick={() => {
              const selectedOption = options.find(opt => opt.value === value);
              if (selectedOption) {
                handlePreview(selectedOption.key as string);
              }
            }}
          >
            查看
          </Button>
        )}
      </Space.Compact>

      <Modal
        title="项目模板详情"
        open={previewVisible}
        onCancel={() => {
          setPreviewVisible(false);
          setPreviewData(null);
        }}
        footer={[
          <Button key="close" onClick={() => setPreviewVisible(false)}>
            关闭
          </Button>,
        ]}
        width={1000}
      >
        {previewLoading ? (
          <div style={{ textAlign: 'center', padding: '50px 0' }}>加载中...</div>
        ) : previewData ? (
          <Tabs
            items={[
              {
                key: 'basic',
                label: '基本信息',
                children: (
                  <Descriptions bordered size="small" column={2}>
                    <Descriptions.Item label="模板编码">
                      {previewData.templateCode}
                    </Descriptions.Item>
                    <Descriptions.Item label="模板名称">
                      {previewData.templateName}
                    </Descriptions.Item>
                    <Descriptions.Item label="项目分类编码">
                      {previewData.categoryCode}
                    </Descriptions.Item>
                    <Descriptions.Item label="是否启用">
                      {previewData.isActive ? '是' : '否'}
                    </Descriptions.Item>
                    <Descriptions.Item label="描述" span={2}>
                      {previewData.description}
                    </Descriptions.Item>
                  </Descriptions>
                ),
              },
              {
                key: 'roles',
                label: `角色 (${previewData.templateRoles?.length || 0})`,
                children: (
                  <Table
                    size="small"
                    dataSource={previewData.templateRoles || []}
                    rowKey="roleId"
                    pagination={false}
                    columns={[
                      { title: '角色ID', dataIndex: 'roleId', key: 'roleId' },
                      {
                        title: '是否必需',
                        dataIndex: 'isRequired',
                        key: 'isRequired',
                        render: (val: boolean) => (val ? '是' : '否'),
                      },
                    ]}
                  />
                ),
              },
              {
                key: 'milestones',
                label: `里程碑 (${previewData.milestones?.length || 0})`,
                children: (
                  <Table
                    size="small"
                    dataSource={previewData.milestones || []}
                    rowKey={(record, index) => `milestone-${index}`}
                    pagination={false}
                    columns={[
                      { title: '里程碑名称', dataIndex: 'milestoneName', key: 'milestoneName', width: 150 },
                      { title: '描述', dataIndex: 'description', key: 'description', ellipsis: true },
                      { title: '排序', dataIndex: 'sortOrder', key: 'sortOrder', width: 80 },
                      { title: '计划工期(天)', dataIndex: 'plannedDuration', key: 'plannedDuration', width: 120 },
                    ]}
                  />
                ),
              },
              {
                key: 'documents',
                label: `文档 (${previewData.documents?.length || 0})`,
                children: (
                  <Table
                    size="small"
                    dataSource={previewData.documents || []}
                    rowKey={(record, index) => `document-${index}`}
                    pagination={false}
                    columns={[
                      { title: '文档名称', dataIndex: 'documentName', key: 'documentName', width: 150 },
                      { title: '文档类型', dataIndex: 'documentType', key: 'documentType', width: 100 },
                      { title: '描述', dataIndex: 'description', key: 'description', ellipsis: true },
                    ]}
                  />
                ),
              },
              {
                key: 'tasks',
                label: `任务 (${previewData.tasks?.length || 0})`,
                children: (
                  <Table
                    size="small"
                    dataSource={previewData.tasks || []}
                    rowKey={(record, index) => `task-${index}`}
                    pagination={false}
                    columns={[
                      { title: '任务名称', dataIndex: 'taskName', key: 'taskName', width: 150 },
                      { title: '任务类型编码', dataIndex: 'taskTypeCode', key: 'taskTypeCode', width: 120 },
                      { title: '计划工期(天)', dataIndex: 'plannedDuration', key: 'plannedDuration', width: 120 },
                      { title: '描述', dataIndex: 'description', key: 'description', ellipsis: true },
                    ]}
                  />
                ),
              },
            ]}
          />
        ) : null}
      </Modal>
    </>
  );
};

//@ts-ignore
ProjectTemplateSelect.GroupName = "PDM";
export default ProjectTemplateSelect;
export { ProjectTemplateSelect };
