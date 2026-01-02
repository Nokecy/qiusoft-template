import React, { useEffect, useState, useCallback } from 'react';
import { Select, Spin } from 'antd';
import { ProcessProcedureGetListAsync } from '@/services/pdm/ProcessProcedure';
import debounce from 'lodash/debounce';

interface ProcessProcedureSelectProps {
  value?: any;
  onChange?: (value: any, option?: any) => void;
  labelInValue?: boolean;
  disabled?: boolean;
  placeholder?: string;
  [key: string]: any;
}

/**
 * 工序选择下拉组件
 * 支持关键字搜索，返回 labelInValue 格式数据
 */
const ProcessProcedureSelect: React.FC<ProcessProcedureSelectProps> = (props) => {
  const {
    value,
    onChange,
    labelInValue = true,
    disabled = false,
    placeholder = '请选择工序',
    ...restProps
  } = props;

  const [options, setOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  // 加载工序数据
  const loadData = useCallback(async (keyword?: string) => {
    setLoading(true);
    try {
      const res = await ProcessProcedureGetListAsync({
        MaxResultCount: 50,
        SkipCount: 0,
        Filter: keyword || '',
      });
      const items = res.items || [];
      setOptions(items.map((item: any) => ({
        value: item.id,
        label: `${item.code} - ${item.name}`,
        code: item.code,
        name: item.name,
        workCenterId: item.workCenterId,
        workCenterCode: item.workCenterCode,
        workCenterName: item.workCenterName,
        raw: item,
      })));
    } catch (error) {
      console.error('加载工序数据失败:', error);
      setOptions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // 初始加载
  useEffect(() => {
    loadData();
  }, [loadData]);

  // 防抖搜索
  const debouncedSearch = useCallback(
    debounce((keyword: string) => {
      loadData(keyword);
    }, 300),
    [loadData]
  );

  const handleSearch = (val: string) => {
    setSearchValue(val);
    debouncedSearch(val);
  };

  const handleChange = (selectedValue: any, option: any) => {
    if (onChange) {
      if (labelInValue && option) {
        // 返回完整的工序信息
        onChange({
          value: option.value,
          label: option.label,
          code: option.code,
          name: option.name,
          workCenterId: option.workCenterId,
          workCenterCode: option.workCenterCode,
          workCenterName: option.workCenterName,
          raw: option.raw,
        }, option);
      } else {
        onChange(selectedValue, option);
      }
    }
  };

  return (
    <Select
      {...restProps}
      value={value}
      onChange={handleChange}
      options={options}
      loading={loading}
      disabled={disabled}
      placeholder={placeholder}
      allowClear
      showSearch
      filterOption={false}
      onSearch={handleSearch}
      notFoundContent={loading ? <Spin size="small" /> : '暂无数据'}
      style={{ width: '100%', ...restProps.style }}
    />
  );
};

//@ts-ignore
ProcessProcedureSelect.GroupName = "PDM";
export default ProcessProcedureSelect;
export { ProcessProcedureSelect };
