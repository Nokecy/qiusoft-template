/**
 * 版本选择器组件 - 可复用
 * 用于 BOM 主列表、抽屉、详情页面的版本切换
 */

import React, { useEffect, useState } from 'react';
import { Select, Tag, Space, Spin, Empty, message } from 'antd';
import dayjs from 'dayjs';
import { BomVersionGetByMaterialCodeAsync } from '@/services/pdm/BomVersion';
import { bomVersionStatusMap, CommonVersionStatusEnum } from '../_enums/bomEnums';

interface VersionSelectorProps {
  materialCode: string;
  currentVersion: string;
  onChange: (version: string) => void;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  placeholder?: string;
  size?: 'large' | 'middle' | 'small';
}

const VersionSelector: React.FC<VersionSelectorProps> = ({
  materialCode,
  currentVersion,
  onChange,
  className,
  style,
  disabled = false,
  placeholder = '选择物料版本',
  size = 'middle',
}) => {
  const [versions, setVersions] = useState<API.BurnAbpPdmBomManagementBomVersionsBomVersionDto[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (materialCode) {
      loadVersions();
    }
  }, [materialCode]);

  const loadVersions = async () => {
    if (!materialCode) return;

    setLoading(true);
    try {
      const data = await BomVersionGetByMaterialCodeAsync({
        materialCode: materialCode,
      });

      const versionList = data.items || [];
      setVersions(versionList);

      // 如果当前版本不存在，自动选择第一个激活版本
      if (versionList.length > 0 && !currentVersion) {
        const activeVersion = versionList.find((v) => (v.status as unknown as number) === CommonVersionStatusEnum.Released); // 已发布状态为 20
        const defaultVersion = activeVersion || versionList[0];
        onChange(defaultVersion.version || '');
      }
    } catch (error) {
      console.error('加载版本列表失败:', error);
      message.error('加载版本列表失败');
    } finally {
      setLoading(false);
    }
  };

  if (versions.length === 0 && !loading) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无版本" style={{ marginTop: 8 }} />;
  }

  return (
    <Spin spinning={loading}>
      <Select
        value={currentVersion || undefined}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled || loading}
        size={size}
        className={className}
        style={style}
        options={versions.map((version) => {
          const statusInfo = bomVersionStatusMap.find((s) => s.value === version.status);
          return {
            label: (
              <Space size="small">
                <span>{version.version}</span>
                <Tag
                  color={statusInfo?.color}
                  style={{
                    marginRight: 0,
                  }}
                >
                  {statusInfo?.label || '未知'}
                </Tag>
                <span style={{ fontSize: 12, color: '#999' }}>
                  {version.effectiveDate ? dayjs(version.effectiveDate).format('YYYY-MM-DD') : '待生效'}
                  {version.expiryDate ? ` ~ ${dayjs(version.expiryDate).format('YYYY-MM-DD')}` : ' ~ 至今'}
                </span>
              </Space>
            ),
            value: version.version || '',
          };
        })}
      />
    </Spin>
  );
};

export default VersionSelector;
