import React, { useMemo, useState } from 'react';
import { Table, Tag, Space, Typography, Radio, Empty, Tooltip } from 'antd';
import { WarningOutlined, FilterOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { BurnAbpPdmPartManagementPartVersionsComparisonFieldChangeDto } from '@/services/pdm/typings';
import { DifferenceType, differenceTypeConfig, type DifferenceTypeValue } from './usePartVersionComparison';

const { Text } = Typography;

interface ComparisonTableProps {
  fieldChanges: BurnAbpPdmPartManagementPartVersionsComparisonFieldChangeDto[] | undefined;
  sourceVersion?: string;
  targetVersion?: string;
  loading?: boolean;
}

// 筛选类型
type FilterType = 'all' | 'changed' | 'critical';

const ComparisonTable: React.FC<ComparisonTableProps> = ({
  fieldChanges = [],
  sourceVersion,
  targetVersion,
  loading = false,
}) => {
  const [filterType, setFilterType] = useState<FilterType>('changed');

  // 按分类分组数据
  const groupedData = useMemo(() => {
    if (!fieldChanges?.length) return [];

    // 根据筛选条件过滤
    let filtered = fieldChanges;
    if (filterType === 'changed') {
      filtered = fieldChanges.filter(item => item.differenceType !== DifferenceType.Unchanged);
    } else if (filterType === 'critical') {
      filtered = fieldChanges.filter(item => item.isCritical);
    }

    // 按分类分组
    const categoryMap = new Map<string, BurnAbpPdmPartManagementPartVersionsComparisonFieldChangeDto[]>();
    filtered.forEach(item => {
      const category = item.category || '其他';
      if (!categoryMap.has(category)) {
        categoryMap.set(category, []);
      }
      categoryMap.get(category)!.push(item);
    });

    // 转换为数组并排序（基础属性 > 规格信息 > 动态属性 > 其他）
    const categoryOrder = ['基础属性', '规格信息', '动态属性'];
    const result: { category: string; items: BurnAbpPdmPartManagementPartVersionsComparisonFieldChangeDto[] }[] = [];

    categoryOrder.forEach(cat => {
      if (categoryMap.has(cat)) {
        result.push({ category: cat, items: categoryMap.get(cat)! });
        categoryMap.delete(cat);
      }
    });

    // 添加剩余分类
    categoryMap.forEach((items, category) => {
      result.push({ category, items });
    });

    return result;
  }, [fieldChanges, filterType]);

  // 统计数量
  const stats = useMemo(() => {
    const total = fieldChanges?.length || 0;
    const changed = fieldChanges?.filter(item => item.differenceType !== DifferenceType.Unchanged).length || 0;
    const critical = fieldChanges?.filter(item => item.isCritical).length || 0;
    return { total, changed, critical };
  }, [fieldChanges]);

  // 表格列定义
  const columns: ColumnsType<BurnAbpPdmPartManagementPartVersionsComparisonFieldChangeDto> = [
    {
      title: '状态',
      dataIndex: 'differenceType',
      key: 'differenceType',
      width: 100,
      render: (type: DifferenceTypeValue) => {
        const config = differenceTypeConfig[type];
        if (!config) return null;
        return (
          <Tag color={config.color} style={{ marginLeft: 0 }}>
            <span style={{ marginRight: 4 }}>{config.icon}</span>
            {config.label}
          </Tag>
        );
      },
    },
    {
      title: '字段名称',
      dataIndex: 'displayName',
      key: 'displayName',
      width: 180,
      render: (text: string, record) => (
        <Space>
          {record.isCritical && (
            <Tooltip title="关键字段">
              <WarningOutlined style={{ color: '#faad14' }} />
            </Tooltip>
          )}
          <Text strong={record.isCritical}>{text || record.fieldName}</Text>
        </Space>
      ),
    },
    {
      title: `源版本 (${sourceVersion || '-'})`,
      dataIndex: 'sourceValue',
      key: 'sourceValue',
      width: 200,
      ellipsis: true,
      render: (text: string, record) => (
        <Tooltip title={text || '-'}>
          <Text
            type={record.differenceType === DifferenceType.Removed ? 'danger' : undefined}
            delete={record.differenceType === DifferenceType.Removed}
            style={{
              maxWidth: 180,
              display: 'inline-block',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {text || '-'}
          </Text>
        </Tooltip>
      ),
    },
    {
      title: `目标版本 (${targetVersion || '-'})`,
      dataIndex: 'targetValue',
      key: 'targetValue',
      width: 200,
      ellipsis: true,
      render: (text: string, record) => (
        <Tooltip title={text || '-'}>
          <Text
            type={record.differenceType === DifferenceType.Added ? 'success' : undefined}
            strong={record.differenceType === DifferenceType.Modified}
            style={{
              maxWidth: 180,
              display: 'inline-block',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {text || '-'}
          </Text>
        </Tooltip>
      ),
    },
    {
      title: '关键字段',
      dataIndex: 'isCritical',
      key: 'isCritical',
      width: 100,
      align: 'center',
      render: (isCritical: boolean) =>
        isCritical ? <Tag color="orange">关键</Tag> : <Tag>普通</Tag>,
    },
  ];

  // 行样式
  const getRowClassName = (record: BurnAbpPdmPartManagementPartVersionsComparisonFieldChangeDto) => {
    const config = differenceTypeConfig[record.differenceType as DifferenceTypeValue];
    if (record.isCritical) return 'critical-field-row';
    return config ? `difference-type-${record.differenceType}` : '';
  };

  // 分类标题渲染
  const categoryNameMap: Record<string, string> = {
    '基础属性': 'Basic - 基础属性',
    '规格信息': 'Specification - 规格信息',
    '动态属性': 'Attribute - 动态属性',
  };

  return (
    <div className="comparison-table-wrapper">
      {/* 筛选工具栏 */}
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Space>
          <FilterOutlined style={{ color: '#1890ff' }} />
          <Radio.Group value={filterType} onChange={e => setFilterType(e.target.value)} buttonStyle="solid" size="small">
            <Radio.Button value="all">
              全部 ({stats.total})
            </Radio.Button>
            <Radio.Button value="changed">
              仅差异 ({stats.changed})
            </Radio.Button>
            <Radio.Button value="critical">
              仅关键 ({stats.critical})
            </Radio.Button>
          </Radio.Group>
        </Space>
      </div>

      {/* 分组表格 */}
      {groupedData.length > 0 ? (
        groupedData.map(group => (
          <div key={group.category} style={{ marginBottom: 16 }}>
            <div style={{
              padding: '8px 12px',
              background: '#f5f5f5',
              borderRadius: '4px 4px 0 0',
              borderBottom: '1px solid #e8e8e8',
            }}>
              <Text strong>{categoryNameMap[group.category] || group.category}</Text>
              <Text type="secondary" style={{ marginLeft: 8 }}>({group.items.length} 项)</Text>
            </div>
            <Table
              dataSource={group.items}
              columns={columns}
              rowKey="fieldName"
              pagination={false}
              size="small"
              bordered
              loading={loading}
              rowClassName={getRowClassName}
              scroll={{ y: 300 }}
            />
          </div>
        ))
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={loading ? '加载中...' : filterType === 'all' ? '暂无对比数据' : '无符合条件的数据'}
        />
      )}

      {/* 图例说明 */}
      <div style={{ marginTop: 16, padding: 12, background: '#fafafa', borderRadius: 4 }}>
        <Space size={24} wrap>
          <Space>
            <Tag color="#faad14">✏️ 修改</Tag>
            <Text type="secondary">= 值已变更</Text>
          </Space>
          <Space>
            <Tag color="#52c41a">✅ 新增</Tag>
            <Text type="secondary">= 目标版本新增</Text>
          </Space>
          <Space>
            <Tag color="#ff4d4f">❌ 删除</Tag>
            <Text type="secondary">= 目标版本删除</Text>
          </Space>
          <Space>
            <WarningOutlined style={{ color: '#faad14' }} />
            <Text type="secondary">= 关键字段变化</Text>
          </Space>
        </Space>
      </div>

      <style>
        {`
          .critical-field-row {
            background-color: #fff9e6 !important;
          }
          .critical-field-row:hover td {
            background-color: #fff7d6 !important;
          }
          .difference-type-1 {
            background-color: #fffbe6 !important;
          }
          .difference-type-2 {
            background-color: #f6ffed !important;
          }
          .difference-type-3 {
            background-color: #fff2f0 !important;
          }
        `}
      </style>
    </div>
  );
};

export default ComparisonTable;
