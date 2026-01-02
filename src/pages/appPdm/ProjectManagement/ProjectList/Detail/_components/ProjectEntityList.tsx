import React from 'react';
import { List, Typography, Space, Tag } from 'antd';
import { useNavigate } from 'umi';

type EntityType = 'task' | 'issue' | 'risk';

interface ProjectEntityListProps {
  type: EntityType;
  value?: any[];
}

const getTitle = (type: EntityType, record: any) => {
  if (type === 'task') return record?.taskName || record?.taskCode || '-';
  if (type === 'issue') return record?.name || record?.issueCode || '-';
  return record?.name || record?.riskCode || '-';
};

const getDescription = (type: EntityType, record: any) => {
  if (type === 'task') return record?.description || '';
  if (type === 'issue') return record?.remark || record?.description || '';
  return record?.description || '';
};

const getLink = (type: EntityType, record: any) => {
  const id = record?.id;
  if (!id) return undefined;
  if (type === 'task') return `/appPdm/ProjectManagement/TaskList/detail?id=${id}`;
  if (type === 'issue') return `/appPdm/ProjectManagement/IssueList/detail?id=${id}`;
  return `/appPdm/ProjectManagement/RiskList/detail?id=${id}`;
};

const getEditLink = (type: EntityType, record: any) => {
  const id = record?.id;
  if (!id) return undefined;
  if (type === 'task') return `/appPdm/ProjectManagement/TaskList/form?id=${id}`;
  if (type === 'issue') return `/appPdm/ProjectManagement/IssueList/form?id=${id}`;
  return `/appPdm/ProjectManagement/RiskList/form?id=${id}`;
};

const ProjectEntityList: React.FC<ProjectEntityListProps> = ({ type, value }) => {
  const navigate = useNavigate();
  const dataSource = Array.isArray(value) ? value : [];

  return (
    <List
      size="small"
      split
      dataSource={dataSource}
      locale={{ emptyText: '暂无数据' }}
      renderItem={(record: any) => {
        const link = getLink(type, record);
        const editLink = getEditLink(type, record);
        const title = getTitle(type, record);
        const description = getDescription(type, record);

        return (
          <List.Item
            actions={
              editLink
                ? [
                    <Typography.Link key="edit" onClick={() => navigate(editLink)}>
                      编辑
                    </Typography.Link>,
                  ]
                : undefined
            }
          >
            <List.Item.Meta
              title={
                link ? (
                  <Typography.Link onClick={() => navigate(link)}>{title}</Typography.Link>
                ) : (
                  <span>{title}</span>
                )
              }
              description={
                <Space size={8} wrap>
                  {description ? <Typography.Text type="secondary">{description}</Typography.Text> : null}
                  {type === 'task' && record?.taskTypeName ? <Tag>{record.taskTypeName}</Tag> : null}
                  {type !== 'task' && record?.handlerName ? <Tag>{record.handlerName}</Tag> : null}
                  {type === 'risk' && (record?.riskTypeName || record?.riskTypeCode) ? (
                    <Tag>{record.riskTypeName || record.riskTypeCode}</Tag>
                  ) : null}
                </Space>
              }
            />
          </List.Item>
        );
      }}
    />
  );
};

export default ProjectEntityList;
