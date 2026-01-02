import React, { useState, useRef, useEffect } from 'react';
import { Modal, message, Card, Space, Button, Tag, Input, Statistic } from 'antd';
import { SearchOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { AgGridPlus } from '@/components/agGrid';
import { AttributeGetListAsync } from '@/services/common/Attribute';
import { AttributeGroupIsAttributeInGroupAsync } from '@/services/common/AttributeGroup';
import { getGridKey } from '../../../_utils';

const { Search } = Input;

interface AttributeSelectModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: (attributeIds: string[]) => void;
  attributeGroupId?: string;
  excludeAttributeIds?: string[];
}

// 数据类型枚举
const dataTypeEnum = [
  { label: "文本", value: 0, color: '#1890ff' },
  { label: "数字", value: 1, color: '#52c41a' },
  { label: "日期", value: 2, color: '#722ed1' },
  { label: "布尔", value: 3, color: '#fa8c16' },
  { label: "枚举", value: 4, color: '#eb2f96' }
];

const AttributeSelectModal: React.FC<AttributeSelectModalProps> = ({
  visible,
  onCancel,
  onConfirm,
  attributeGroupId,
  excludeAttributeIds = []
}) => {
  const gridRef = useRef<any>(null);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  // 重置状态
  const resetState = () => {
    setSelectedRows([]);
    setSearchKeyword('');
  };

  // 确认选择
  const handleConfirm = () => {
    if (selectedRows.length === 0) {
      message.warning('请选择要添加的特性');
      return;
    }

    const attributeIds = selectedRows.map(row => row.id);
    onConfirm(attributeIds);
    resetState();
  };

  // 取消操作
  const handleCancel = () => {
    onCancel();
    resetState();
  };

  // 搜索处理
  const handleSearch = (value: string) => {
    setSearchKeyword(value);
    if (gridRef.current) {
      gridRef.current.reload();
    }
  };

  // 清除搜索
  const handleClearSearch = () => {
    setSearchKeyword('');
    if (gridRef.current) {
      gridRef.current.reload();
    }
  };

  // 检查特性是否已在特性组中
  const checkAttributeExists = async (attributeId: string): Promise<boolean> => {
    if (!attributeGroupId) return false;
    
    try {
      const exists = await AttributeGroupIsAttributeInGroupAsync({
        attributeGroupId,
        attributeId
      });
      return exists;
    } catch (error) {
      console.error('Check attribute exists error:', error);
      return false;
    }
  };

  // 列定义
  const columnDefs = [
    { 
      headerName: '选择', 
      field: 'select',
      width: 80,
      cellRenderer: (params: any) => {
        return params.data.exists ? (
          <Tag color="success" icon={<CheckCircleOutlined />}>已存在</Tag>
        ) : null;
      }
    },
    { headerName: '特性名称', field: 'name', width: 150 },
    { headerName: '显示名称', field: 'displayName', width: 150 },
    { 
      headerName: '数据类型', 
      field: 'dataType', 
      width: 100,
      cellRenderer: (params: any) => {
        const dataType = dataTypeEnum.find(type => type.value === params.value);
        return dataType ? (
          <Tag color={dataType.color}>{dataType.label}</Tag>
        ) : params.value;
      }
    },
    { headerName: '单位', field: 'unit', width: 100 },
    { headerName: '描述', field: 'description', width: 200 },
    { headerName: '是否必填', field: 'isRequired', width: 100 },
    { headerName: '是否启用', field: 'isEnabled', width: 100 }
  ];

  useEffect(() => {
    if (visible) {
      resetState();
    }
  }, [visible]);

  return (
    <Modal
      title="选择特性"
      visible={visible}
      onCancel={handleCancel}
      onOk={handleConfirm}
      width={1200}
      okText={`确定添加${selectedRows.length > 0 ? ` (${selectedRows.length})` : ''}`}
      cancelText="取消"
      confirmLoading={loading}
      destroyOnClose={true}
      maskClosable={false}
    >
      <div style={{ marginBottom: 16 }}>
        <Card size="small">
          <Space style={{ width: '100%', justifyContent: 'space-between' }}>
            <Space>
              <Search
                placeholder="搜索特性名称或显示名称"
                allowClear
                style={{ width: 300 }}
                onSearch={handleSearch}
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              {searchKeyword && (
                <Button onClick={handleClearSearch}>清除搜索</Button>
              )}
            </Space>
            <Space>
              <Statistic
                title="已选择"
                value={selectedRows.length}
                suffix="个特性"
                style={{ minWidth: 100 }}
              />
            </Space>
          </Space>
        </Card>
      </div>

      <AgGridPlus
        gridRef={gridRef}
        headerTitle="可选特性列表"
        gridKey={getGridKey('attributeSelectModal')}
        request={async (params: any) => {
          try {
            const response = await AttributeGetListAsync({
              PageSize: params?.maxResultCount || 20,
              Filter: searchKeyword || params?.filter,
              MaxResultCount: params?.maxResultCount || 20,
              SkipCount: params?.skipCount || 0,
              Sorting: params?.sorter || 'creationTime desc'
            });

            // 检查每个特性是否已在特性组中
            const itemsWithExistsFlag = await Promise.all(
              (response.items || []).map(async (item: any) => {
                const exists = await checkAttributeExists(item.id);
                return {
                  ...item,
                  exists
                };
              })
            );

            return {
              success: true,
              data: itemsWithExistsFlag,
              total: response.totalCount || 0
            };
          } catch (error) {
            console.error('Load attributes error:', error);
            return { success: false, data: [], total: 0 };
          }
        }}
        columnDefs={columnDefs}
        onSelectionChanged={(selectedRows: any[]) => {
          // 过滤掉已存在的特性
          const validSelection = selectedRows.filter(row => !row.exists);
          setSelectedRows(validSelection);
          
          if (validSelection.length !== selectedRows.length) {
            message.warning(`${selectedRows.length - validSelection.length} 个特性已存在于特性组中，已自动取消选择`);
          }
        }}
        rowSelection={{
          type: 'checkbox',
          enableSelectAll: true,
          // 禁用已存在的行
          getCheckboxProps: (record: any) => ({
            disabled: record.exists,
            name: record.name,
          }),
        }}
        searchable={false} // 使用自定义搜索
        pagination={true}
        sizeToFit={true}
        height="400px"
      />

      <div style={{ marginTop: 16, padding: '8px 0' }}>
        <Space>
          <span style={{ color: '#666' }}>
            提示：已存在于特性组中的特性无法选择
          </span>
          {selectedRows.length > 0 && (
            <Tag color="blue">
              已选择 {selectedRows.length} 个特性
            </Tag>
          )}
        </Space>
      </div>
    </Modal>
  );
};

export default AttributeSelectModal;