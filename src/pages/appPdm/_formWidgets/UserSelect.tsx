import React, { useEffect, useState, useMemo } from 'react';
import { Select } from 'antd';
import { IdentityUserProGetListAsync } from '@/services/openApi/IdentityUserPro';

const UserSelect: React.FC<any> = props => {
  const { labelField, valueField, ...restProps } = props;
  const [options, setOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const loadUsers = (searchValue?: string) => {
    setLoading(true);
    const filter = searchValue ? `name=*${searchValue}* OR userName=*${searchValue}*` : '';
    IdentityUserProGetListAsync({ Filter: filter, MaxResultCount: 100 })
      .then(res => {
        if (res.items) {
          const opts = res.items.map(item => ({
            // label 显示:
            // - 如果设置了 labelField='name', 只显示姓名
            // - 否则显示: 姓名 工号(例如:朱志远 2008)
            label: labelField === 'name'
              ? (item.name || item.userName || '-')
              : `${item.name || item.userName || '-'} ${item.userName || ''}`.trim(),
            // value 根据 valueField 属性返回 userName(工号/Code) 或 id(GUID)
            value: valueField === 'userName' ? item.userName : item.id,
            userName: item.userName,
            name: item.name,
            id: item.id,
          }));
          setOptions(opts);
        }
      })
      .catch(error => {
        console.error('UserSelect 加载用户列表失败:', error);
        setOptions([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadUsers();
  }, [props.valueField]);

  // 处理初始值：如果是 labelInValue 格式且选项中没有对应值，添加临时选项
  // 使用 useMemo 来避免重复计算和死循环
  const enrichedOptions = useMemo(() => {
    const currentOptions = [...options];

    if (props.value && props.labelInValue) {
      const currentValue = props.value;

      // 单选模式
      if (typeof currentValue === 'object' && currentValue.value && currentValue.label) {
        const exists = currentOptions.some(opt => opt.value === currentValue.value);
        if (!exists) {
          currentOptions.unshift({ value: currentValue.value, label: currentValue.label });
        }
      }
    } else if (props.value && props.mode === 'multiple' && Array.isArray(props.value)) {
      // 多选模式
      props.value.forEach((item: any) => {
        if (typeof item === 'object' && item.value && item.label) {
          const exists = currentOptions.some(opt => opt.value === item.value);
          if (!exists) {
            currentOptions.unshift({ value: item.value, label: item.label });
          }
        }
      });
    }

    return currentOptions;
  }, [options, props.value, props.labelInValue, props.mode]);

  return (
    <Select
      allowClear
      showSearch
      loading={loading}
      placeholder={props.placeholder || '请选择用户'}
      options={enrichedOptions}
      onSearch={(value) => {
        loadUsers(value);
      }}
      onChange={(value, option) => {
        // 调用原始的 onChange
        if (restProps.onChange) {
          restProps.onChange(value, option);
        }
      }}
      filterOption={false}
      {...restProps}
    />
  );
};

//@ts-ignore
UserSelect.GroupName = "PDM";
export default UserSelect;
export { UserSelect };
