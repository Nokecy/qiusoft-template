import { BomGetListAsync } from '@/services/pdm/Bom';
import { BomVersionGetByMaterialCodeAsync } from '@/services/pdm/BomVersion';
import { SwapOutlined, SearchOutlined } from '@ant-design/icons';
import { Card, Row, Col, Button, Space, Checkbox, Select, Input, DatePicker, Statistic, Tooltip } from 'antd';
import React, { useState, useEffect } from 'react';
import VersionSelector from './VersionSelector';
import dayjs from 'dayjs';
import { debounce } from 'lodash';

interface VersionComparatorProps {
  onBomSelect: (bom: any) => void;
  onSourceVersionChange: (version: string) => void;
  onTargetVersionChange: (version: string) => void;
  onIncludeUnchangedChange: (include: boolean) => void;
  onCompare: () => void;
  loading?: boolean;
}

const VersionComparator: React.FC<VersionComparatorProps> = ({
  onBomSelect,
  onSourceVersionChange,
  onTargetVersionChange,
  onIncludeUnchangedChange,
  onCompare,
  loading,
}) => {
  const [selectedBom, setSelectedBom] = useState<any>(null);
  const [sourceVersion, setSourceVersion] = useState<string>('');
  const [targetVersion, setTargetVersion] = useState<string>('');
  const [includeUnchanged, setIncludeUnchanged] = useState(false);
  const [sourceVersionInfo, setSourceVersionInfo] = useState<any>(null);
  const [targetVersionInfo, setTargetVersionInfo] = useState<any>(null);
  const [versionList, setVersionList] = useState<any[]>([]);

  // BOM搜索相关
  const [bomOptions, setBomOptions] = useState<any[]>([]);
  const [bomSearchLoading, setBomSearchLoading] = useState(false);
  const [bomSearchValue, setBomSearchValue] = useState<string>('');

  // 加载BOM列表
  const loadBomList = async (searchKeyword?: string) => {
    setBomSearchLoading(true);
    try {
      const result = await BomGetListAsync({
        Filter: searchKeyword || undefined,
        MaxResultCount: 20,
      });
      const options = (result.items || []).map((item: any) => ({
        label: `${item.materialCode}${item.materialDescription ? ' - ' + item.materialDescription : ''}`,
        value: item.id,
        data: item,
      }));
      setBomOptions(options);
    } catch (error) {
      console.error('加载BOM列表失败:', error);
    } finally {
      setBomSearchLoading(false);
    }
  };

  // 初始加载
  useEffect(() => {
    loadBomList();
  }, []);

  // BOM选择变化
  const handleBomChange = async (value: number) => {
    const option = bomOptions.find(opt => opt.value === value);
    if (option) {
      setSelectedBom(option.data);
      onBomSelect(option.data);
      // 清空版本选择
      setSourceVersion('');
      setTargetVersion('');
      setSourceVersionInfo(null);
      setTargetVersionInfo(null);
      onSourceVersionChange('');
      onTargetVersionChange('');

      // 加载该物料的所有版本
      try {
        const result = await BomVersionGetByMaterialCodeAsync({
          materialCode: option.data.materialCode,
        });
        setVersionList(result.items || []);
      } catch (error) {
        console.error('加载版本列表失败:', error);
      }
    }
  };

  // 源版本变化
  const handleSourceVersionChange = (version: string) => {
    setSourceVersion(version);
    onSourceVersionChange(version);
    // 查找版本信息
    const versionInfo = versionList.find(v => v.version === version);
    setSourceVersionInfo(versionInfo);
  };

  // 目标版本变化
  const handleTargetVersionChange = (version: string) => {
    setTargetVersion(version);
    onTargetVersionChange(version);
    // 查找版本信息
    const versionInfo = versionList.find(v => v.version === version);
    setTargetVersionInfo(versionInfo);
  };

  // 包含无变化项变化
  const handleIncludeUnchangedChange = (checked: boolean) => {
    setIncludeUnchanged(checked);
    onIncludeUnchangedChange(checked);
  };

  // 防抖搜索
  const debouncedSearch = React.useCallback(
    debounce((value: string) => {
      loadBomList(value);
    }, 500),
    []
  );

  // BOM搜索
  const handleBomSearch = (value: string) => {
    setBomSearchValue(value);
    debouncedSearch(value);
  };

  return (
    <Card style={{ marginBottom: 16 }}>
      <Row gutter={16} align="middle">
        {/* BOM选择 */}
        <Col span={8}>
          <Space direction="vertical" style={{ width: '100%' }} size={4}>
            <label style={{ fontSize: 12, color: '#666' }}>选择BOM物料</label>
            <Select
              showSearch
              placeholder="请选择BOM物料"
              style={{ width: '100%' }}
              options={bomOptions}
              loading={bomSearchLoading}
              filterOption={false}
              onSearch={handleBomSearch}
              onChange={handleBomChange}
              value={selectedBom?.id}
              notFoundContent={bomSearchLoading ? '加载中...' : '未找到匹配的BOM'}
            />
          </Space>
        </Col>

        {/* 源版本选择 */}
        <Col span={6}>
          <Space direction="vertical" style={{ width: '100%' }} size={4}>
            <label style={{ fontSize: 12, color: '#666' }}>源版本</label>
            <VersionSelector
              materialCode={selectedBom?.materialCode}
              currentVersion={sourceVersion}
              onChange={handleSourceVersionChange}
              disabled={!selectedBom}
              placeholder="选择源版本"
              style={{ width: '100%' }}
            />
            {sourceVersionInfo && (
              <div style={{ fontSize: 12, color: '#999' }}>
                生效: {sourceVersionInfo.effectiveDate ? dayjs(sourceVersionInfo.effectiveDate).format('YYYY-MM-DD') : '-'}
              </div>
            )}
          </Space>
        </Col>

        {/* 中间交换按钮 */}
        <Col span={1} style={{ textAlign: 'center' }}>
          <Tooltip title="互换源版本和目标版本">
            <Button
              type="text"
              icon={<SwapOutlined style={{ fontSize: 20 }} />}
              onClick={() => {
                // 交换版本
                const tempVersion = sourceVersion;
                const tempVersionInfo = sourceVersionInfo;
                setSourceVersion(targetVersion);
                setSourceVersionInfo(targetVersionInfo);
                setTargetVersion(tempVersion);
                setTargetVersionInfo(tempVersionInfo);
                onSourceVersionChange(targetVersion);
                onTargetVersionChange(tempVersion);
              }}
              disabled={!sourceVersion && !targetVersion}
              style={{ color: '#1890ff' }}
            />
          </Tooltip>
        </Col>

        {/* 目标版本选择 */}
        <Col span={6}>
          <Space direction="vertical" style={{ width: '100%' }} size={4}>
            <label style={{ fontSize: 12, color: '#666' }}>目标版本</label>
            <VersionSelector
              materialCode={selectedBom?.materialCode}
              currentVersion={targetVersion}
              onChange={handleTargetVersionChange}
              disabled={!selectedBom}
              placeholder="选择目标版本"
              style={{ width: '100%' }}
            />
            {targetVersionInfo && (
              <div style={{ fontSize: 12, color: '#999' }}>
                生效: {targetVersionInfo.effectiveDate ? dayjs(targetVersionInfo.effectiveDate).format('YYYY-MM-DD') : '-'}
              </div>
            )}
          </Space>
        </Col>

        {/* 操作按钮区 */}
        <Col span={3}>
          <Space direction="vertical" style={{ width: '100%' }} size={8}>
            <Checkbox
              checked={includeUnchanged}
              onChange={e => handleIncludeUnchangedChange(e.target.checked)}
            >
              包含无变化项
            </Checkbox>
            <Button
              type="primary"
              icon={<SwapOutlined />}
              block
              loading={loading}
              disabled={!selectedBom || !sourceVersion || !targetVersion}
              onClick={onCompare}
            >
              开始比对
            </Button>
          </Space>
        </Col>
      </Row>

      {/* 版本信息摘要 */}
      {selectedBom && (
        <div style={{ marginTop: 16, padding: '12px 16px', background: '#fafafa', borderRadius: 4 }}>
          <Space size={24}>
            <span style={{ color: '#666' }}>
              <strong>物料编码:</strong> {selectedBom.materialCode}
            </span>
            <span style={{ color: '#666' }}>
              <strong>物料描述:</strong> {selectedBom.materialDescription}
            </span>

          </Space>
        </div>
      )}
    </Card>
  );
};

export default VersionComparator;
