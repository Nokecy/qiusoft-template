import React, { useMemo } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface ReadOnlyArrayTableProps {
  value?: any[];
  columns: ColumnsType<any>;
  pageSize?: number;
}

/**
 * 只读模式的数组表格组件
 * 使用 Ant Design Table 替代 Formily ArrayTable，解决分页显示问题
 */
const ReadOnlyArrayTable: React.FC<ReadOnlyArrayTableProps> = ({
  value = [],
  columns,
  pageSize = 10,
}) => {
  const dataSource = useMemo(() => {
    return Array.isArray(value) ? value : [];
  }, [value]);

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record, index) => record.id || index}
      pagination={{
        pageSize,
        showTotal: (total) => `共 ${total} 条`,
        showSizeChanger: false,
      }}
      scroll={{ x: 'max-content' }}
      size="small"
    />
  );
};

export default ReadOnlyArrayTable;
