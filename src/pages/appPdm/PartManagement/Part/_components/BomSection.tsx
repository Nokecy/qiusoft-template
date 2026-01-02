/**
 * BOM结构管理组件
 * 负责展示和管理物料的BOM树形结构
 *
 * 更新历史:
 * - 2024: 集成ResizableBomPanel可拖动分隔条
 */

import React from 'react';
import { Button, Space, Badge, Spin, Empty, message } from 'antd';
import { ExportOutlined, PlusOutlined } from '@ant-design/icons';
import { history } from 'umi';
import BomTree from '@/pages/appPdm/BomManagement/_components/BomTree';
import BomItemDetail from '@/pages/appPdm/BomManagement/_components/BomItemDetail';
import BomFormDialog from '@/pages/appPdm/BomManagement/Bom/components/bomFormDialog';
import ResizableBomPanel from '@/pages/appPdm/BomManagement/_components/ResizableBomPanel';
import type { PartDetailData } from '../types';
import type { BurnAbpPdmBomManagementBomsBomItemDto, BurnAbpPdmBomManagementBomsBomDto } from '@/services/pdm/typings';

interface BomSectionProps {
  data: PartDetailData;
  bomData: BurnAbpPdmBomManagementBomsBomDto | null;
  bomVersion: string;
  bomTreeItems: BurnAbpPdmBomManagementBomsBomItemDto[];
  selectedBomItem: BurnAbpPdmBomManagementBomsBomItemDto | null;
  bomLoading: boolean;
  bomTreeRefreshKey: number;
  onBomItemSelect: (item: BurnAbpPdmBomManagementBomsBomItemDto | null) => void;
  onBomDataLoaded: (items: BurnAbpPdmBomManagementBomsBomItemDto[]) => void;
  onBomItemAdd: (parent: BurnAbpPdmBomManagementBomsBomItemDto | null) => void;
  onBomItemEdit: (item: BurnAbpPdmBomManagementBomsBomItemDto) => void;
  onBomItemDelete: (item: BurnAbpPdmBomManagementBomsBomItemDto) => void;
  onBomTreeRefresh: () => void;
  onExportBom: () => void;
  onBomCreated: () => void;
}

const BomSection: React.FC<BomSectionProps> = ({
  data,
  bomData,
  bomVersion,
  bomTreeItems,
  selectedBomItem,
  bomLoading,
  bomTreeRefreshKey,
  onBomItemSelect,
  onBomDataLoaded,
  onBomItemAdd,
  onBomItemEdit,
  onBomItemDelete,
  onBomTreeRefresh,
  onExportBom,
  onBomCreated,
}) => {
  return (
    <div className="detail-section bom-section">
      <div className="section-header">
        <h3>BOM结构 {bomTreeItems.length > 0 && <Badge count={bomTreeItems.length} style={{ backgroundColor: '#722ed1' }} />}</h3>
        <Space size={8}>
          {bomData && (
            <Button
              type="link"
              size="small"
              onClick={() => history.push(`/appPdm/bomManagement/Bom/detail?id=${bomData.id}&version=${bomVersion}`)}
            >
              查看完整BOM
            </Button>
          )}
          <Button type="primary" ghost size="small" icon={<ExportOutlined />} onClick={onExportBom}>导出</Button>
        </Space>
      </div>
      <Spin spinning={bomLoading}>
        {bomData && bomVersion ? (
          <ResizableBomPanel
            leftPanel={
              <BomTree
                key={bomTreeRefreshKey}
                bomId={bomData.id || ''}
                version={bomVersion}
                onSelect={onBomItemSelect}
                loading={bomLoading}
                onDataLoaded={onBomDataLoaded}
                onAdd={onBomItemAdd}
                onDelete={onBomItemDelete}
                onEdit={onBomItemEdit}
                onRefresh={onBomTreeRefresh}
              />
            }
            rightPanel={
              <BomItemDetail
                item={selectedBomItem}
                loading={bomLoading}
                allItems={bomTreeItems}
                onEdit={onBomItemEdit}
                onDelete={onBomItemDelete}
              />
            }
            height="calc(100vh - 200px)"
          />
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={bomLoading ? '加载中...' : '该物料暂无BOM数据'}
            style={{ padding: '60px 0' }}
          >
            {/* 当物料来源类型为生产(2)、虚拟(3)、模型(8)时,显示创建BOM按钮 */}
            {!bomLoading && data?.comeFromType && [2, 3, 8].includes(data.comeFromType) && (
              <BomFormDialog
                title="创建BOM"
                buttonProps={{
                  type: 'primary',
                  icon: <PlusOutlined />,
                }}
                initialValues={{
                  materialCode: data.partNumber,
                  materialDescription: data.description,
                }}
                onAfterSubmit={() => {
                  message.success('BOM创建成功');
                  onBomCreated();
                }}
              >
                创建BOM
              </BomFormDialog>
            )}
          </Empty>
        )}
      </Spin>
    </div>
  );
};

export default BomSection;
