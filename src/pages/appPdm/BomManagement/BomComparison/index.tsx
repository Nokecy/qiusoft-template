import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { BomGetListAsync, BomCompareBomVersionsAsync } from '@/services/pdm/Bom';
import { SwapOutlined, EyeOutlined, FileExcelOutlined, DiffOutlined, BranchesOutlined } from '@ant-design/icons';
import { Card, Row, Col, Statistic, Button, Space, Tag, Tooltip, message, Empty, Spin, Tabs } from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'umi';
import * as XLSX from 'xlsx';
import type {
  BurnAbpPdmBomManagementBomDifferenceDto,
  BurnAbpPdmBomManagementBomItemDifferenceDto,
  BurnAbpPdmBomManagementFieldChangeDetail,
} from '@/services/pdm/typings';
import VersionComparator from '../_components/VersionComparator';
import CrossBomComparator from '../_components/CrossBomComparator';
import FieldChangesModal from './components/FieldChangesModal';
import StructuralChangesModal from './components/StructuralChangesModal';

// 差异类型枚举
const DifferenceType = {
  Added: 1,
  Deleted: 2,
  Modified: 3,
  Relocated: 4,
  Unchanged: 5,
} as const;

// 差异类型标签配置
const differenceTypeConfig = {
  [DifferenceType.Added]: { label: '新增', icon: '✅', color: '#52c41a', bg: '#e6f7e6' },
  [DifferenceType.Deleted]: { label: '删除', icon: '❌', color: '#ff4d4f', bg: '#fde7e7' },
  [DifferenceType.Modified]: { label: '修改', icon: '✏️', color: '#faad14', bg: '#fff9e6' },
  [DifferenceType.Relocated]: { label: '位置变更', icon: '🔄', color: '#1890ff', bg: '#e6f3ff' },
  [DifferenceType.Unchanged]: { label: '无变化', icon: '⚪', color: '#8c8c8c', bg: '#ffffff' },
};

// 比对模式
type CompareMode = 'version' | 'cross';

const BomComparison: React.FC = () => {
  const intl = useIntl();
  const [compareMode, setCompareMode] = useState<CompareMode>('version');
  const [loading, setLoading] = useState(false);
  const [comparisonData, setComparisonData] = useState<BurnAbpPdmBomManagementBomDifferenceDto | null>(null);
  const [selectedBom, setSelectedBom] = useState<any>(null);
  const [sourceVersion, setSourceVersion] = useState<string>('');
  const [targetVersion, setTargetVersion] = useState<string>('');
  const [includeUnchanged, setIncludeUnchanged] = useState(false);

  // 字段变更详情弹窗状态
  const [fieldChangesVisible, setFieldChangesVisible] = useState(false);
  const [currentDifferenceItem, setCurrentDifferenceItem] = useState<BurnAbpPdmBomManagementBomItemDifferenceDto | null>(null);

  // 位置变更详情弹窗状态
  const [structuralChangesVisible, setStructuralChangesVisible] = useState(false);

  // 执行版本比对操作
  const handleCompare = async () => {
    if (!selectedBom) {
      message.warning('请先选择要比对的BOM');
      return;
    }
    if (!sourceVersion || !targetVersion) {
      message.warning('请选择源版本和目标版本');
      return;
    }
    if (sourceVersion === targetVersion) {
      message.warning('源版本和目标版本不能相同');
      return;
    }

    setLoading(true);
    try {
      const result = await BomCompareBomVersionsAsync({
        bomId: selectedBom.id,
        sourceVersion,
        targetVersion,
        includeUnchanged,
      });
      setComparisonData(result);
      message.success('比对完成');
    } catch (error) {
      message.error('比对失败,请重试');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 导出Excel
  const handleExportExcel = () => {
    if (!comparisonData || !comparisonData.differences) {
      message.warning('没有可导出的数据');
      return;
    }

    try {
      const exportData = comparisonData.differences.map(item => {
        const typeConfig = differenceTypeConfig[item.differenceType as keyof typeof differenceTypeConfig];
        const status = typeConfig ? typeConfig.label : '';

        const materialName = item.sourceItem?.childMaterialDescription || item.targetItem?.childMaterialDescription || '';

        return {
          '状态': status,
          '物料编码': item.childMaterialCode || '',
          '物料名称': materialName,
          '源版本-数量': item.sourceItem?.quantity || '',
          '源版本-单位': item.sourceItem?.unitOfMeasure || '',
          '源版本-版本': item.sourceItem?.childMaterialEditionNo || '',
          '源版本-层级': item.sourceItem?.levelCode || '',
          '目标版本-数量': item.targetItem?.quantity || '',
          '目标版本-单位': item.targetItem?.unitOfMeasure || '',
          '目标版本-版本': item.targetItem?.childMaterialEditionNo || '',
          '目标版本-层级': item.targetItem?.levelCode || '',
          '结构变化': item.isStructuralChange ? '是' : '否'
        };
      });

      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'BOM版本差异');

      // 设置列宽
      worksheet['!cols'] = [
        { wch: 10 }, { wch: 15 }, { wch: 20 },
        { wch: 10 }, { wch: 8 }, { wch: 10 }, { wch: 8 },
        { wch: 10 }, { wch: 8 }, { wch: 10 }, { wch: 8 },
        { wch: 10 }
      ];

      const fileName = `BOM版本差异_${selectedBom?.materialCode || 'BOM'}_${sourceVersion}_vs_${targetVersion}_${new Date().toISOString().slice(0, 10)}.xlsx`;
      XLSX.writeFile(workbook, fileName);
      message.success('导出成功');
    } catch (error) {
      console.error('导出失败:', error);
      message.error('导出失败');
    }
  };

  // 查看字段变更详情
  const handleViewFieldChanges = (item: BurnAbpPdmBomManagementBomItemDifferenceDto) => {
    setCurrentDifferenceItem(item);
    setFieldChangesVisible(true);
  };

  // 查看位置变更详情
  const handleViewStructuralChanges = (item: BurnAbpPdmBomManagementBomItemDifferenceDto) => {
    setCurrentDifferenceItem(item);
    setStructuralChangesVisible(true);
  };

  // 差异类型渲染器
  const differenceTypeRenderer = (params: any) => {
    const type = params.value;
    const config = differenceTypeConfig[type as keyof typeof differenceTypeConfig];
    if (!config) return null;

    return (
      <Tag color={config.color} style={{ marginLeft: 0 }}>
        <span style={{ marginRight: 4 }}>{config.icon}</span>
        {config.label}
      </Tag>
    );
  };

  // 操作列渲染器
  const actionRenderer = (params: any) => {
    const item = params.data as BurnAbpPdmBomManagementBomItemDifferenceDto;
    const type = item.differenceType;

    if (type === DifferenceType.Added || type === DifferenceType.Deleted || type === DifferenceType.Unchanged) {
      return null;
    }

    return (
      <Space size="small">
        {type === DifferenceType.Modified && (
          <Tooltip title="查看字段变更详情">
            <Button
              size="small"
              type="link"
              icon={<EyeOutlined />}
              onClick={() => handleViewFieldChanges(item)}
            >
              {item.fieldChanges?.length || 0} 个字段变化
            </Button>
          </Tooltip>
        )}
        {type === DifferenceType.Relocated && (
          <Tooltip title="查看位置变更详情">
            <Button
              size="small"
              type="link"
              icon={<SwapOutlined />}
              onClick={() => handleViewStructuralChanges(item)}
            >
              查看位置变化
            </Button>
          </Tooltip>
        )}
      </Space>
    );
  };

  // 源版本数据渲染器
  const sourceDataRenderer = (params: any) => {
    const item = params.data as BurnAbpPdmBomManagementBomItemDifferenceDto;
    const sourceItem = item.sourceItem;

    if (!sourceItem) return <span style={{ color: '#999' }}>-</span>;

    return (
      <Space direction="vertical" size={0}>
        <span>
          数量: {sourceItem.quantity} {sourceItem.unitOfMeasure}
        </span>
        {sourceItem.childMaterialEditionNo && (
          <span style={{ fontSize: 12, color: '#666' }}>
            版本: {sourceItem.childMaterialEditionNo}
          </span>
        )}
        {sourceItem.levelCode && (
          <span style={{ fontSize: 12, color: '#1890ff' }}>
            层级: {sourceItem.levelCode}
          </span>
        )}
      </Space>
    );
  };

  // 目标版本数据渲染器
  const targetDataRenderer = (params: any) => {
    const item = params.data as BurnAbpPdmBomManagementBomItemDifferenceDto;
    const targetItem = item.targetItem;

    if (!targetItem) return <span style={{ color: '#999' }}>-</span>;

    return (
      <Space direction="vertical" size={0}>
        <span>
          数量: {targetItem.quantity} {targetItem.unitOfMeasure}
        </span>
        {targetItem.childMaterialEditionNo && (
          <span style={{ fontSize: 12, color: '#666' }}>
            版本: {targetItem.childMaterialEditionNo}
          </span>
        )}
        {targetItem.levelCode && (
          <span style={{ fontSize: 12, color: '#1890ff' }}>
            层级: {targetItem.levelCode}
          </span>
        )}
      </Space>
    );
  };

  // 行样式设置
  const getRowStyle = (params: any) => {
    const item = params.data as BurnAbpPdmBomManagementBomItemDifferenceDto;
    const config = differenceTypeConfig[item.differenceType as keyof typeof differenceTypeConfig];
    return config ? { background: config.bg } : {};
  };

  // 切换比对模式时清空数据
  const handleModeChange = (mode: string) => {
    setCompareMode(mode as CompareMode);
    setComparisonData(null);
    setSelectedBom(null);
    setSourceVersion('');
    setTargetVersion('');
  };

  // 版本比对内容
  const renderVersionComparison = () => (
    <>
      {/* 版本比对器 */}
      <VersionComparator
        onBomSelect={setSelectedBom}
        onSourceVersionChange={setSourceVersion}
        onTargetVersionChange={setTargetVersion}
        onIncludeUnchangedChange={setIncludeUnchanged}
        onCompare={handleCompare}
        loading={loading}
      />

      {/* 差异统计卡片 */}
      {comparisonData && (
        <Card style={{ marginBottom: 16 }} bodyStyle={{ padding: '16px 24px' }}>
          <Row gutter={16}>
            <Col span={3}>
              <Statistic
                title="新增子项"
                value={comparisonData.statistics?.addedCount || 0}
                valueStyle={{ color: '#52c41a' }}
                prefix="✅"
              />
            </Col>
            <Col span={3}>
              <Statistic
                title="删除子项"
                value={comparisonData.statistics?.deletedCount || 0}
                valueStyle={{ color: '#ff4d4f' }}
                prefix="❌"
              />
            </Col>
            <Col span={3}>
              <Statistic
                title="修改子项"
                value={comparisonData.statistics?.modifiedCount || 0}
                valueStyle={{ color: '#faad14' }}
                prefix="✏️"
              />
            </Col>
            <Col span={3}>
              <Statistic
                title="位置变更"
                value={comparisonData.statistics?.relocatedCount || 0}
                valueStyle={{ color: '#1890ff' }}
                prefix="🔄"
              />
            </Col>
            {includeUnchanged && (
              <Col span={3}>
                <Statistic
                  title="无变化"
                  value={comparisonData.statistics?.unchangedCount || 0}
                  valueStyle={{ color: '#8c8c8c' }}
                  prefix="⚪"
                />
              </Col>
            )}
            <Col span={includeUnchanged ? 3 : 4}>
              <Statistic
                title="总差异数"
                value={comparisonData.statistics?.totalDifferences || 0}
                valueStyle={{ color: '#1890ff' }}
              />
            </Col>
            <Col span={includeUnchanged ? 3 : 4}>
              <Statistic
                title="总子项数"
                value={comparisonData.statistics?.totalItems || 0}
              />
            </Col>
          </Row>
        </Card>
      )}

      {/* 差异详情列表 */}
      {comparisonData ? (
        <Card
          title="差异详情列表"
          style={{ height: 'calc(100vh - 420px)', minHeight: 400 }}
          bodyStyle={{ height: 'calc(100% - 57px)', padding: 0 }}
          extra={
            <Button icon={<FileExcelOutlined />} onClick={handleExportExcel}>
              导出Excel
            </Button>
          }
        >
          <div style={{ height: '100%' }}>
            <AgGridPlus
              gridKey="appPdm.BomManagement.BomComparison"
              dataSource={comparisonData.differences || []}
              rowHeight={60}
              getRowStyle={getRowStyle}
              toolBarRender={false}
            >
              <AgGridColumn
                field="differenceType"
                headerName="状态"
                width={120}
                cellRenderer={differenceTypeRenderer}
                pinned="left"
              />
              <AgGridColumn
                field="childMaterialCode"
                headerName="物料编码"
                width={160}
                pinned="left"
              />
              <AgGridColumn
                field="childMaterialName"
                headerName="物料名称"
                width={200}
              />
              <AgGridColumn
                field="sourceItem"
                headerName={`源版本 (${comparisonData.sourceVersion?.version})`}
                width={200}
                cellRenderer={sourceDataRenderer}
              />
              <AgGridColumn
                field="targetItem"
                headerName={`目标版本 (${comparisonData.targetVersion?.version})`}
                width={200}
                cellRenderer={targetDataRenderer}
              />
              <AgGridColumn
                field="isStructuralChange"
                headerName="结构变化"
                width={100}
                cellRenderer={(params: any) => (
                  params.value ? <Tag color="blue">是</Tag> : <Tag>否</Tag>
                )}
              />
              <AgGridColumn
                field="action"
                headerName="操作"
                width={200}
                pinned="right"
                cellRenderer={actionRenderer}
              />
            </AgGridPlus>
          </div>
        </Card>
      ) : (
        <Card style={{ minHeight: 400 }}>
          <Empty
            description="请选择BOM和版本后点击比对按钮开始比对"
            style={{ marginTop: 80 }}
          />
        </Card>
      )}
    </>
  );

  return (
    <div>
      {/* 模式切换 Tabs */}
      <Tabs
        activeKey={compareMode}
        onChange={handleModeChange}
        style={{ marginBottom: 16, background: '#fff', padding: '16px 24px', borderRadius: 8 }}
        items={[
          {
            key: 'version',
            label: (
              <span>
                <DiffOutlined />
                BOM版本差异比较
              </span>
            ),
            children: renderVersionComparison(),
          },
          {
            key: 'cross',
            label: (
              <span>
                <BranchesOutlined />
                BOM结构对照
              </span>
            ),
            children: <CrossBomComparator />,
          },
        ]}
      />

      {/* 字段变更详情弹窗 */}
      {fieldChangesVisible && currentDifferenceItem && (
        <FieldChangesModal
          visible={fieldChangesVisible}
          differenceItem={currentDifferenceItem}
          sourceVersion={comparisonData?.sourceVersion?.version || ''}
          targetVersion={comparisonData?.targetVersion?.version || ''}
          onClose={() => setFieldChangesVisible(false)}
        />
      )}

      {/* 位置变更详情弹窗 */}
      {structuralChangesVisible && currentDifferenceItem && (
        <StructuralChangesModal
          visible={structuralChangesVisible}
          differenceItem={currentDifferenceItem}
          sourceVersion={comparisonData?.sourceVersion?.version || ''}
          targetVersion={comparisonData?.targetVersion?.version || ''}
          onClose={() => setStructuralChangesVisible(false)}
        />
      )}
    </div>
  );
};

export default BomComparison;

export const routeProps = {
  name: 'BOM比对',
};

