import React, { useEffect, useState } from 'react';
import { Timeline, Spin, Empty, Tag } from 'antd';
import { ProjectTaskGetExecutionRecordsAsync } from '@/services/pdm/ProjectTask';
import dayjs from 'dayjs';

interface TaskExecutionRecordsProps {
  taskId: string;
}

// 记录类型枚举映射 - BurnAbpPdmProjectsTaskExecutionRecordType
const recordTypeMap = {
  0: { label: '创建', color: 'blue' },
  1: { label: '指派', color: 'orange' },
  2: { label: '开始', color: 'green' },
  3: { label: '完成', color: 'success' },
  4: { label: '取消', color: 'default' },
  5: { label: '修改', color: 'purple' },
  6: { label: '备注', color: 'cyan' },
  7: { label: '暂停', color: 'warning' },
  8: { label: '恢复', color: 'processing' },
};

const TaskExecutionRecords: React.FC<TaskExecutionRecordsProps> = ({ taskId }) => {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const loadRecords = async () => {
    if (!taskId) return;
    setLoading(true);
    try {
      const data = await ProjectTaskGetExecutionRecordsAsync({ taskId });
      setRecords(data || []);
    } catch (error) {
      console.error('加载执行记录失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecords();
  }, [taskId]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px 0' }}>
        <Spin />
      </div>
    );
  }

  if (!records || records.length === 0) {
    return <Empty description="暂无执行记录" />;
  }

  return (
    <Timeline
      items={records.map((record) => {
        const recordType =
          recordTypeMap[record.recordType as keyof typeof recordTypeMap] ||
          recordTypeMap[0];

        // 构建描述文本
        let description = '';
        if (record.recordType === 1) {
          // 指派记录
          description = `${record.fromUserName || record.operatorName} 指派给 ${
            record.toUserName
          }`;
        } else {
          description = record.operatorName || '-';
        }

        // 备注信息
        const remarkText = record.remark ? `: ${record.remark}` : '';

        return {
          color: recordType.color,
          children: (
            <div>
              <div style={{ marginBottom: 4 }}>
                <Tag color={recordType.color}>{recordType.label}</Tag>
                <span style={{ marginLeft: 8 }}>{description}</span>
              </div>
              {record.remark && (
                <div style={{ color: '#666', fontSize: 12, marginBottom: 4 }}>
                  备注: {record.remark}
                </div>
              )}
              <div style={{ color: '#999', fontSize: 12 }}>
                {record.operationTime
                  ? dayjs(record.operationTime).format('YYYY-MM-DD HH:mm:ss')
                  : '-'}
              </div>
            </div>
          ),
        };
      })}
    />
  );
};

export default TaskExecutionRecords;
