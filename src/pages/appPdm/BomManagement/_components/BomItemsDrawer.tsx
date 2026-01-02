/**
 * BOM 子项清单侧滑抽屉
 * 显示选中 BOM 的所有子项，支持版本切换和快速操作
 */

import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  Drawer,
  Button,
  Space,
  Card,
  Row,
  Col,
  Divider,
  Text,
  Tag,
  Tooltip,
  Modal,
  Input,
  Spin,
  message,
} from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  CopyOutlined,
  ExportOutlined,
  EyeOutlined,
  ReloadOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Access, useAccess, history } from 'umi';
import dayjs from 'dayjs';
import { AgGridPlus } from '@/components/agGrid';
import type { ColDef } from 'ag-grid-community';
import type {
  BurnAbpPdmBomManagementBomsBomDto,
  BurnAbpPdmBomManagementBomsBomItemDto,
} from '@/services/pdm/typings';
import { BOM_PERMISSIONS } from '../_permissions';
import { bomItemActivationStatusMap } from '../_enums/bomEnums';
import {
  fetchBomTree,
  deleteBomItem,
  copyBomVersion,
  countBomItems,
} from '../_utils/bomUtils';
import VersionSelector from './VersionSelector';
import BomItemForm from '../_formWidgets/BomItemForm';

interface BomItemsDrawerProps {
  visible: boolean;
  bomData: BurnAbpPdmBomManagementBomsBomDto | null;
  onClose: () => void;
}

const BomItemsDrawer: React.FC<BomItemsDrawerProps> = ({ visible, bomData, onClose }) => {
  const access = useAccess();
  const gridRef = useRef<any>();

  const [currentVersion, setCurrentVersion] = useState<string>('');
  const [items, setItems] = useState<BurnAbpPdmBomManagementBomsBomItemDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState<BurnAbpPdmBomManagementBomsBomItemDto[]>([]);
  const [itemFormVisible, setItemFormVisible] = useState(false);
  const [itemFormData, setItemFormData] = useState<BurnAbpPdmBomManagementBomsBomItemDto | null>(null);

  // 表格列定义
  const columnDefs: ColDef[] = [
    {
      field: 'childMaterialCode',
      headerName: '物料编码',
      width: 140,
      pinned: 'left',
      cellRenderer: (params: any) => {
        const level = params.data.levelCode || 'L1';
        const indent = (parseInt(level.substring(1)) - 1) * 20;
        return (
          <span style={{ paddingLeft: indent }}>
            {params.value}
          </span>
        );
      },
    },
    {
      field: 'childMaterialName',
      headerName: '物料名称',
      width: 180,
    },
    {
      field: 'childMaterialDescription',
      headerName: '物料描述',
      width: 200,
      hideInSearch: true,
    },
    {
      field: 'quantity',
      headerName: '数量',
      width: 100,
      hideInSearch: true,
      valueFormatter: (params: any) => params.value?.toFixed(2),
    },
    {
      field: 'unitOfMeasure',
      headerName: '单位',
      width: 80,
      hideInSearch: true,
    },
    {
      field: 'levelCode',
      headerName: '层级',
      width: 80,
      hideInSearch: true,
    },
    {
      field: 'sequence',
      headerName: '序号',
      width: 80,
      hideInSearch: true,
    },
    {
      field: 'activationStatus',
      headerName: '状态',
      width: 100,
      valueEnum: bomItemActivationStatusMap,
    },
    {
      field: 'effectiveDate',
      headerName: '生效日期',
      width: 120,
      hideInSearch: true,
      valueFormatter: (params: any) =>
        params.value ? dayjs(params.value).format('YYYY-MM-DD') : '-',
    },
    {
      field: 'expiryDate',
      headerName: '失效日期',
      width: 120,
      hideInSearch: true,
      valueFormatter: (params: any) =>
        params.value ? dayjs(params.value).format('YYYY-MM-DD') : '-',
    },
  ];

  // 加载子项数据
  const loadItems = useCallback(async (version: string) => {
    if (!bomData?.id || !version) return;

    setLoading(true);
    try {
      const result = await fetchBomTree({
        bomId: bomData.id,
        materialEditionNo: version,
      });

      if (result.success) {
        setItems(result.data);
      }
    } finally {
      setLoading(false);
    }
  }, [bomData]);

  // 初始化
  useEffect(() => {
    if (visible && bomData) {
      setCurrentVersion('');
      setItems([]);
      setSelectedRows([]);
    }
  }, [visible, bomData]);

  // 版本切换
  const handleVersionChange = useCallback(
    (version: string) => {
      setCurrentVersion(version);
      loadItems(version);
    },
    [loadItems]
  );

  // 刷新
  const handleRefresh = useCallback(() => {
    if (currentVersion) {
      loadItems(currentVersion);
    }
  }, [currentVersion, loadItems]);

  // 查看详情
  const handleViewDetail = () => {
    if (!bomData) return;
    onClose();
    history.push(
      `/appPdm/bomManagement/detail?id=${bomData.id}&version=${currentVersion}`
    );
  };

  // 删除子项
  const handleDeleteItem = async (item: BurnAbpPdmBomManagementBomsBomItemDto) => {
    Modal.confirm({
      title: '删除子项',
      content: `确认删除 "${item.childMaterialName}" 吗？`,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        const result = await deleteBomItem(item.id!, currentVersion);
        if (result.success) {
          handleRefresh();
        }
      },
    });
  };

  // 添加子项
  const handleAddItem = useCallback(() => {
    setItemFormData(null);
    setItemFormVisible(true);
  }, []);

  // 编辑子项
  const handleEditItem = useCallback((item: BurnAbpPdmBomManagementBomsBomItemDto) => {
    setItemFormData(item);
    setItemFormVisible(true);
  }, []);

  // 批量删除
  const handleBatchDelete = () => {
    if (selectedRows.length === 0) {
      message.warning('请先选择要删除的子项');
      return;
    }

    Modal.confirm({
      title: '批量删除',
      content: `确认删除选中的 ${selectedRows.length} 个子项吗？`,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        try {
          for (const item of selectedRows) {
            await deleteBomItem(item.id!, currentVersion);
          }
          message.success('批��删除成功');
          handleRefresh();
          setSelectedRows([]);
        } catch (error) {
          message.error('批量删除失败');
        }
      },
    });
  };

  // 复制版本
  const handleCopyVersion = () => {
    Modal.confirm({
      title: '复制 BOM 版本',
      content: (
        <Input
          placeholder="请输入新版本号"
          id="new-version-input"
        />
      ),
      okText: '复制',
      cancelText: '取消',
      onOk: async () => {
        const newVersion = (document.getElementById('new-version-input') as HTMLInputElement)?.value;
        if (!newVersion) {
          message.warning('请输入新版本号');
          return;
        }

        const result = await copyBomVersion(
          bomData!.id,
          currentVersion,
          newVersion
        );
        if (result.success) {
          handleVersionChange(newVersion);
        }
      },
    });
  };

  // 统计信息
  const statistics = countBomItems(items);

  return (
    <Drawer
      title={
        <Space>
          <span>{bomData?.materialName}</span>
          <Text type="secondary">({bomData?.materialCode})</Text>
          <Tag color="blue">BOM 子项清单</Tag>
        </Space>
      }
      width="85%"
      placement="right"
      onClose={onClose}
      open={visible}
      destroyOnClose
      extra={
        <Tooltip title="刷新">
          <Button
            icon={<ReloadOutlined />}
            onClick={handleRefresh}
            loading={loading}
          />
        </Tooltip>
      }
    >
      <Spin spinning={loading}>
        <Space direction="vertical" style={{ width: '100%' }} size="middle">
          {/* 版本选择区域 */}
          <Card size="small">
            <Row justify="space-between" align="middle">
              <Col span={16}>
                <Space>
                  <Text strong>版本选择:</Text>
                  <VersionSelector
                    materialCode={bomData?.materialCode || ''}
                    currentVersion={currentVersion}
                    onChange={handleVersionChange}
                    style={{ width: 350 }}
                  />
                </Space>
              </Col>
              <Col span={8} style={{ textAlign: 'right' }}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  最后更新: {dayjs().subtract(2, 'hour').fromNow()}
                </Text>
              </Col>
            </Row>
          </Card>

          {/* 工具栏 */}
          <Card size="small">
            <Space wrap>
              <Access accessible={!!access[BOM_PERMISSIONS.DEFAULT]}>
                <Button
                  type="primary"
                  icon={<EyeOutlined />}
                  onClick={handleViewDetail}
                  disabled={!currentVersion}
                >
                  查看详情
                </Button>
              </Access>
              <Access accessible={!!access[BOM_PERMISSIONS.ADD_ITEM]}>
                <Button
                  icon={<PlusOutlined />}
                  disabled={!currentVersion}
                  onClick={handleAddItem}
                >
                  添加子项
                </Button>
              </Access>
              <Access accessible={!!access[BOM_PERMISSIONS.DELETE_ITEM]}>
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  disabled={selectedRows.length === 0}
                  onClick={handleBatchDelete}
                >
                  批量删除 {selectedRows.length > 0 && `(${selectedRows.length})`}
                </Button>
              </Access>
              <Access accessible={!!access[BOM_PERMISSIONS.CREATE_VERSION]}>
                <Button
                  icon={<CopyOutlined />}
                  onClick={handleCopyVersion}
                  disabled={!currentVersion}
                >
                  复制版本
                </Button>
              </Access>
              <Button icon={<ExportOutlined />} disabled={!currentVersion}>
                导出
              </Button>
            </Space>
          </Card>

          {/* 子项列表 */}
          {currentVersion ? (
            <AgGridPlus
              gridRef={gridRef}
              gridKey="bom-items-drawer"
              dataSource={items}
              columnDefs={columnDefs}
              loading={loading}
              rowSelection="multiple"
              onSelectionChanged={(rows: BurnAbpPdmBomManagementBomsBomItemDto[]) =>
                setSelectedRows(rows)
              }
              pagination={false}
              height="calc(100vh - 450px)"
              rowActions={{
                width: 120,
                actions: [
                  {
                    key: 'edit',
                    icon: <EditOutlined />,
                    tooltip: '编辑',
                    onClick: (record: BurnAbpPdmBomManagementBomsBomItemDto) =>
                      handleEditItem(record),
                    visible: !!access[BOM_PERMISSIONS.UPDATE],
                  },
                  {
                    key: 'delete',
                    icon: <DeleteOutlined />,
                    tooltip: '删除',
                    danger: true,
                    onClick: (record: BurnAbpPdmBomManagementBomsBomItemDto) =>
                      handleDeleteItem(record),
                    visible: !!access[BOM_PERMISSIONS.DELETE_ITEM],
                  },
                ],
              }}
            />
          ) : (
            <Card>
              <Text type="secondary">请先选择版本</Text>
            </Card>
          )}

          {/* 底部统计 */}
          <Card size="small">
            <Space split={<Divider type="vertical" />}>
              <Text>📊 总计: {statistics.total} 个子项</Text>
              <Text>🟢 激活: {statistics.active} 个</Text>
              <Text>⚪ 草稿: {statistics.draft} 个</Text>
              <Text>🔴 停用: {statistics.inactive} 个</Text>
              <Text>📏 最大层级: L{statistics.maxLevel}</Text>
            </Space>
          </Card>
        </Space>
      </Spin>

      {/* BOM 子项表单 */}
      <BomItemForm
        visible={itemFormVisible}
        bomData={bomData}
        treeItems={items}
        data={itemFormData}
        version={currentVersion}
        onClose={() => {
          setItemFormVisible(false);
          setItemFormData(null);
        }}
        onSuccess={() => {
          handleRefresh();
        }}
      />
    </Drawer>
  );
};

export default BomItemsDrawer;
