import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, Table, Space, Descriptions, Tabs, message } from 'antd';
import { EyeOutlined, CheckOutlined } from '@ant-design/icons';
import { ProjectTemplateGetListAsync, ProjectTemplateGetAsync } from '@/services/pdm/ProjectTemplate';
import type { API } from '@/services/pdm/typings';

interface ProjectTemplateSelectModalProps {
  visible: boolean;
  onCancel: () => void;
  onSelect: (template: API.BurnAbpPdmProjectManagementProjectTemplatesProjectTemplateDto) => void;
}

const ProjectTemplateSelectModal: React.FC<ProjectTemplateSelectModalProps> = ({
  visible,
  onCancel,
  onSelect,
}) => {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [templates, setTemplates] = useState<API.BurnAbpPdmProjectManagementProjectTemplatesProjectTemplateDto[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<API.BurnAbpPdmProjectManagementProjectTemplatesProjectTemplateDto | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  // 加载项目模板列表
  const loadTemplates = async () => {
    setLoading(true);
    try {
      const res = await ProjectTemplateGetListAsync({
        MaxResultCount: 1000,
        SkipCount: 0,
        Filter: searchText,
      });
      setTemplates(res.items || []);
    } catch (error) {
      message.error('加载项目模板失败');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (visible) {
      loadTemplates();
    } else {
      // 关闭时重置状态
      setSearchText('');
      setSelectedTemplate(null);
    }
  }, [visible, searchText]);

  // 查看模板详情
  const handleViewDetail = async (record: API.BurnAbpPdmProjectManagementProjectTemplatesProjectTemplateDto) => {
    if (!record.id) return;

    setDetailLoading(true);
    try {
      const detail = await ProjectTemplateGetAsync({ id: record.id });
      setSelectedTemplate(detail);
    } catch (error) {
      message.error('加载模板详情失败');
      console.error(error);
    } finally {
      setDetailLoading(false);
    }
  };

  // 确认选择模板
  const handleConfirmSelect = () => {
    if (!selectedTemplate) {
      message.warning('请先选择一个项目模板');
      return;
    }
    onSelect(selectedTemplate);
  };

  const columns = [
    {
      title: '模板编码',
      dataIndex: 'templateCode',
      key: 'templateCode',
      width: 150,
    },
    {
      title: '模板名称',
      dataIndex: 'templateName',
      key: 'templateName',
      width: 200,
    },
    {
      title: '项目分类编码',
      dataIndex: 'categoryCode',
      key: 'categoryCode',
      width: 150,
    },
    {
      title: '是否启用',
      dataIndex: 'isActive',
      key: 'isActive',
      width: 100,
      render: (isActive: boolean) => (isActive ? '是' : '否'),
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      render: (_: any, record: API.BurnAbpPdmProjectManagementProjectTemplatesProjectTemplateDto) => (
        <Space>
          <Button
            type="link"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => handleViewDetail(record)}
          >
            查看
          </Button>
          <Button
            type="primary"
            size="small"
            icon={<CheckOutlined />}
            onClick={() => {
              setSelectedTemplate(record);
              handleViewDetail(record);
            }}
          >
            选择
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Modal
      title="选择项目模板"
      open={visible}
      onCancel={onCancel}
      width={1200}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          取消
        </Button>,
        <Button
          key="confirm"
          type="primary"
          onClick={handleConfirmSelect}
          disabled={!selectedTemplate}
        >
          确认选择
        </Button>,
      ]}
    >
      <Space direction="vertical" style={{ width: '100%' }} size="middle">
        <Input.Search
          placeholder="搜索模板编码、名称"
          allowClear
          onSearch={(value) => setSearchText(value)}
          style={{ width: 300 }}
        />

        <Table
          loading={loading}
          columns={columns}
          dataSource={templates}
          rowKey="id"
          size="small"
          pagination={{
            pageSize: 5,
            showSizeChanger: false,
            showTotal: (total) => `共 ${total} 条`,
          }}
          rowClassName={(record) =>
            record.id === selectedTemplate?.id ? 'ant-table-row-selected' : ''
          }
        />

        {selectedTemplate && (
          <div style={{ marginTop: 16 }}>
            <h4>模板详情</h4>
            <Tabs
              items={[
                {
                  key: 'basic',
                  label: '基本信息',
                  children: (
                    <Descriptions bordered size="small" column={2}>
                      <Descriptions.Item label="模板编码">
                        {selectedTemplate.templateCode}
                      </Descriptions.Item>
                      <Descriptions.Item label="模板名称">
                        {selectedTemplate.templateName}
                      </Descriptions.Item>
                      <Descriptions.Item label="项目分类编码">
                        {selectedTemplate.categoryCode}
                      </Descriptions.Item>
                      <Descriptions.Item label="是否启用">
                        {selectedTemplate.isActive ? '是' : '否'}
                      </Descriptions.Item>
                      <Descriptions.Item label="默认执行第一阶段">
                        {selectedTemplate.executeFirstPhaseByDefault ? '是' : '否'}
                      </Descriptions.Item>
                      <Descriptions.Item label="描述" span={2}>
                        {selectedTemplate.description}
                      </Descriptions.Item>
                    </Descriptions>
                  ),
                },
                {
                  key: 'roles',
                  label: `角色 (${selectedTemplate.templateRoles?.length || 0})`,
                  children: (
                    <Table
                      size="small"
                      dataSource={selectedTemplate.templateRoles || []}
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
                  label: `里程碑 (${selectedTemplate.milestones?.length || 0})`,
                  children: (
                    <Table
                      size="small"
                      dataSource={selectedTemplate.milestones || []}
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
                  label: `文档 (${selectedTemplate.documents?.length || 0})`,
                  children: (
                    <Table
                      size="small"
                      dataSource={selectedTemplate.documents || []}
                      rowKey={(record, index) => `document-${index}`}
                      pagination={false}
                      columns={[
                        { title: '文档名称', dataIndex: 'documentName', key: 'documentName', width: 150 },
                        { title: '文档类型', dataIndex: 'documentType', key: 'documentType', width: 100 },
                        { title: '所属里程碑', dataIndex: 'milestoneId', key: 'milestoneId', width: 150 },
                        { title: '描述', dataIndex: 'description', key: 'description', ellipsis: true },
                      ]}
                    />
                  ),
                },
                {
                  key: 'tasks',
                  label: `任务 (${selectedTemplate.tasks?.length || 0})`,
                  children: (
                    <Table
                      size="small"
                      dataSource={selectedTemplate.tasks || []}
                      rowKey={(record, index) => `task-${index}`}
                      pagination={false}
                      columns={[
                        { title: '任务名称', dataIndex: 'taskName', key: 'taskName', width: 150 },
                        { title: '任务类型编码', dataIndex: 'taskTypeCode', key: 'taskTypeCode', width: 120 },
                        { title: '所属里程碑', dataIndex: 'milestoneId', key: 'milestoneId', width: 150 },
                        { title: '计划工期(天)', dataIndex: 'plannedDuration', key: 'plannedDuration', width: 120 },
                        { title: '描述', dataIndex: 'description', key: 'description', ellipsis: true },
                      ]}
                    />
                  ),
                },
              ]}
            />
          </div>
        )}
      </Space>
    </Modal>
  );
};

export default ProjectTemplateSelectModal;
