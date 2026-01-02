import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { EngineeringChangeOrderGetListAsync } from '@/services/pdm/EngineeringChangeOrder';

const EngineeringChangeOrderSelect: React.FC<any> = props => {
  const [options, setOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    // 只获取已批准的变更单
    EngineeringChangeOrderGetListAsync({
      MaxResultCount: 1000,
      Filter: 'Status == 3', // 假设3是已批准状态,需要根据实际情况调整
    })
      .then(res => {
        if (mounted && res.items) {
          const opts = res.items.map(item => ({
            label: `${item.changeOrderNumber} - ${item.changeOrderTitle || ''}`,
            value: item.id,
            changeOrderNumber: item.changeOrderNumber,
            changeOrderTitle: item.changeOrderTitle,
          }));
          setOptions(opts);
        }
      })
      .catch(() => {
        // 如果过滤条件不支持,获取全部
        EngineeringChangeOrderGetListAsync({ MaxResultCount: 1000 })
          .then(res => {
            if (mounted && res.items) {
              const opts = res.items.map(item => ({
                label: `${item.changeOrderNumber} - ${item.changeOrderTitle || ''}`,
                value: item.id,
                changeOrderNumber: item.changeOrderNumber,
                changeOrderTitle: item.changeOrderTitle,
              }));
              setOptions(opts);
            }
          })
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Select
      allowClear
      showSearch
      loading={loading}
      placeholder={props.placeholder || '请选择变更单'}
      options={options}
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      {...props}
    />
  );
};

//@ts-ignore
EngineeringChangeOrderSelect.GroupName = "PDM";
export default EngineeringChangeOrderSelect;
export { EngineeringChangeOrderSelect };
