/**
 * 物料选择器组件 - 用于BOM子项选择物料
 * 支持搜索、分页、labelInValue模式
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Select, Spin, Empty, Tag, Space } from 'antd';
import type { SelectProps } from 'antd';
import { PartGetListAsync } from '@/services/pdm/Part';
import { debounce } from 'lodash';

interface MaterialSelectProps extends Omit<SelectProps, 'options'> {
  labelInValue?: boolean;
  onChange?: (value: any) => void;
  value?: any;
}

interface MaterialOption {
  value: string;
  label: string;
  partNumber?: string;
  name?: string;
  specification?: string;
  unit?: string;
  partType?: number;
}

const MaterialSelect: React.FC<MaterialSelectProps> = ({
  labelInValue = false,
  value,
  onChange,
  disabled = false,
  placeholder = '请选择物料',
  ...restProps
}) => {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<MaterialOption[]>([]);
  const [searchValue, setSearchValue] = useState('');

  // 加载物料列表
  const loadMaterials = useCallback(async (keyword?: string) => {
    setLoading(true);
    try {
      const result = await PartGetListAsync({
        Filter: keyword || '',
        MaxResultCount: 50,
        SkipCount: 0,
      });

      const materialOptions: MaterialOption[] = (result.items || []).map(item => ({
        value: item.partNumber || '',
        label: `${item.partNumber}`,
        partNumber: item.partNumber,
        description: item.description,
        specification: item.specification,
        unit: item.unit,
        comeFrom: item.comeFrom,
      }));

      setOptions(materialOptions);
    } catch (error) {
      console.error('加载物料失败:', error);
      setOptions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // 防抖搜索
  const debouncedSearch = useCallback(
    debounce((keyword: string) => {
      loadMaterials(keyword);
    }, 300),
    []
  );

  // 初始化加载
  useEffect(() => {
    loadMaterials();
  }, []);

  // 搜索处理
  const handleSearch = (searchText: string) => {
    setSearchValue(searchText);
    if (searchText) {
      debouncedSearch(searchText);
    } else {
      loadMaterials();
    }
  };

  // 值变化处理
  const handleChange = (newValue: any, option: any) => {
    if (labelInValue) {
      // labelInValue模式：返回 {value, label} 对象
      onChange?.(newValue, option);
    } else {
      // 普通模式：返回value，但第二个参数传递完整option信息
      onChange?.(newValue, option);
    }
  };

  return (
    <Select
      {...restProps}
      showSearch
      labelInValue={labelInValue}
      placeholder={placeholder}
      disabled={disabled}
      loading={loading}
      value={value}
      onChange={handleChange}
      onSearch={handleSearch}
      filterOption={false}
      notFoundContent={
        loading ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <Spin size="small" />
          </div>
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={searchValue ? '未找到匹配的物料' : '暂无物料数据'}
          />
        )
      }
      options={options}
      style={{ width: '100%' }}
    />
  );
};

export default MaterialSelect;
