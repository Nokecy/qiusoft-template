import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'umi';
import { 
  Card, 
  Descriptions, 
  Button, 
  Space, 
  message, 
  Modal,
  Spin
} from 'antd';
import { 
  ArrowLeftOutlined, 
  PlusOutlined, 
  MinusCircleOutlined, 
  EditOutlined
} from '@ant-design/icons';
import { AgGridPlus } from '@/components/agGrid';
import { Access } from '@@/plugin-access';
import { DeleteConfirm } from '@/components/DeleteConfirm';
import {
  AttributeGroupGetAsync,
  AttributeGroupGetAttributesInGroupAsync,
  AttributeGroupBatchAddAttributesToGroupAsync,
  AttributeGroupBatchRemoveAttributesFromGroupAsync
} from '@/services/common/AttributeGroup';
import { AttributeGetListAsync } from '@/services/common/Attribute';
import { AttributeGroups } from '@/pages/appCommon/_permissions';
import { getGridKey } from '../../_utils';
import AttributeSelectModal from './components/AttributeSelectModal';
import './detail.less';

const { confirm } = Modal;

interface AttributeGroupDetailProps {}

// 数据类型枚举
const dataTypeEnum = [
  { label: "文本", value: 0, color: '#1890ff' },
  { label: "数字", value: 1, color: '#52c41a' },
  { label: "日期", value: 2, color: '#722ed1' },
  { label: "布尔", value: 3, color: '#fa8c16' },
  { label: "枚举", value: 4, color: '#eb2f96' }
];

const AttributeGroupDetail: React.FC<AttributeGroupDetailProps> = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const gridRef = useRef<any>(null);
  
  const [loading, setLoading] = useState(false);
  const [attributeGroup, setAttributeGroup] = useState<any>(null);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [selectModalVisible, setSelectModalVisible] = useState(false);

  // 加载特性组基础信息
  const loadAttributeGroup = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      const response = await AttributeGroupGetAsync({ id });
      setAttributeGroup(response);
    } catch (error) {
      message.error('加载特性组信息失败');
      console.error('Load attribute group error:', error);
    } finally {
      setLoading(false);
    }
  };

  // 刷新特性列表
  const refreshAttributeList = () => {
    if (gridRef.current) {
      gridRef.current.reload();
    }
  };

  // 添加特性到特性组
  const handleAddAttributes = async (attributeIds: string[]) => {
    if (!id || attributeIds.length === 0) return;

    try {
      await AttributeGroupBatchAddAttributesToGroupAsync(
        { attributeGroupId: id },
        attributeIds
      );
      message.success(`成功添加 ${attributeIds.length} 个特性`);
      refreshAttributeList();
      setSelectModalVisible(false);
    } catch (error) {
      message.error('添加特性失败');
      console.error('Add attributes error:', error);
    }
  };

  // 从特性组移除特性
  const handleRemoveAttributes = () => {
    if (selectedRows.length === 0) {
      message.warning('请选择要移除的特性');
      return;
    }

    confirm({
      title: '确认移除特性',
      content: `确定要从特性组中移除选中的 ${selectedRows.length} 个特性吗？`,
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        try {
          const attributeIds = selectedRows.map(row => row.id);
          await AttributeGroupBatchRemoveAttributesFromGroupAsync(
            { attributeGroupId: id! },
            attributeIds
          );
          message.success(`成功移除 ${selectedRows.length} 个特性`);
          refreshAttributeList();
          setSelectedRows([]);
        } catch (error) {
          message.error('移除特性失败');
          console.error('Remove attributes error:', error);
        }
      }
    });
  };

  // 返回列表页面
  const handleBack = () => {
    navigate('/appCommon/material/attributeGroups');
  };

  // 编辑特性组
  const handleEdit = () => {
    // 这里可以打开编辑对话框或跳转到编辑页面
    message.info('编辑功能待实现');
  };

  useEffect(() => {
    loadAttributeGroup();
  }, [id]);

  // 特性列表列定义
  const columnDefs = [
    { headerName: '特性名称', field: 'name', width: 150, checkboxSelection: true },
    { headerName: '显示名称', field: 'displayName', width: 150 },
    { headerName: '数据类型', field: 'dataType', width: 100, valueEnum: dataTypeEnum },
    { headerName: '单位', field: 'unit', width: 100 },
    { headerName: '描述', field: 'description', width: 200 },
    { headerName: '默认值', field: 'defaultValue', width: 120 },
    { headerName: '是否必填', field: 'isRequired', width: 100 },
    { headerName: '是否启用', field: 'isEnabled', width: 100 },
    { headerName: '排序顺序', field: 'sortOrder', width: 100 }
  ];

  return (
    <div className="attribute-group-detail">
      <Spin spinning={loading}>
        {/* 页面头部 */}
        <Card className="detail-header" size="small">
          <div className="header-content">
            <div className="header-left">
              <Button 
                type="text" 
                icon={<ArrowLeftOutlined />} 
                onClick={handleBack}
                className="back-button"
              >
                返回列表
              </Button>
              <div className="page-title">
                <h2>特性组详情</h2>
                <span className="subtitle">管理特性组下的特性信息</span>
              </div>
            </div>
            <div className="header-right">
              <Space>
                <Access accessible={!!AttributeGroups.Update}>
                  <Button 
                    type="primary" 
                    icon={<EditOutlined />}
                    onClick={handleEdit}
                  >
                    编辑特性组
                  </Button>
                </Access>
              </Space>
            </div>
          </div>
        </Card>

        {/* 特性组基础信息 */}
        <Card 
          title="基础信息" 
          className="info-card"
          size="small"
        >
          <Descriptions column={2} size="middle">
            <Descriptions.Item label="特性组编码">
              <span className="info-value">{attributeGroup?.code}</span>
            </Descriptions.Item>
            <Descriptions.Item label="特性组名称">
              <span className="info-value">{attributeGroup?.displayName}</span>
            </Descriptions.Item>
            <Descriptions.Item label="排序顺序">
              <span className="info-value">{attributeGroup?.sortOrder}</span>
            </Descriptions.Item>
            <Descriptions.Item label="创建时间">
              <span className="info-value">{attributeGroup?.creationTime}</span>
            </Descriptions.Item>
            <Descriptions.Item label="描述" span={2}>
              <span className="info-value description">
                {attributeGroup?.description || '无描述信息'}
              </span>
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {/* 特性列表管理 */}
        <Card 
          title="特性管理" 
          className="attributes-card"
          size="small"
          extra={
            <Space>
              <span className="selection-info">
                {selectedRows.length > 0 && `已选择 ${selectedRows.length} 个特性`}
              </span>
              <Access accessible={!!AttributeGroups.Update}>
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />}
                  onClick={() => setSelectModalVisible(true)}
                >
                  添加特性
                </Button>
              </Access>
              <Access accessible={!!AttributeGroups.Delete}>
                <Button 
                  danger 
                  icon={<MinusCircleOutlined />}
                  disabled={selectedRows.length === 0}
                  onClick={handleRemoveAttributes}
                >
                  移除特性 ({selectedRows.length})
                </Button>
              </Access>
            </Space>
          }
        >
          <AgGridPlus
            gridRef={gridRef}
            headerTitle="特性组下的特性列表"
            gridKey={getGridKey(`attributeGroupAttributes_${id}`)}
            request={async (params: any) => {
              if (!id) return { success: false, data: [], total: 0 };
              
              try {
                const response = await AttributeGroupGetAttributesInGroupAsync({
                  attributeGroupId: id,
                  PageSize: params?.maxResultCount,
                  Filter: params?.filter,
                  MaxResultCount: params?.maxResultCount,
                  SkipCount: params?.skipCount,
                  Sorting: params?.sorter
                });
                
                return {
                  success: true,
                  data: response.items || [],
                  total: response.totalCount || 0
                };
              } catch (error) {
                console.error('Load attributes error:', error);
                return { success: false, data: [], total: 0 };
              }
            }}
            columnDefs={columnDefs}
            onSelectionChanged={(selectedRows: any[]) => {
              setSelectedRows(selectedRows);
            }}
            rowSelection={{
              type: 'checkbox',
              enableSelectAll: true
            }}
            searchable={true}
            pagination={true}
            sizeToFit={true}
          />
        </Card>
      </Spin>

      {/* 添加特性对话框 */}
      <AttributeSelectModal
        visible={selectModalVisible}
        onCancel={() => setSelectModalVisible(false)}
        onConfirm={handleAddAttributes}
        attributeGroupId={id}
        excludeAttributeIds={[]} // 可以传入已存在的特性ID来排除重复
      />
    </div>
  );
};

export default AttributeGroupDetail;

export const routeProps = {
  name: '特性组详情',
};