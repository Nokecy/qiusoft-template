import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { DocumentTypeGetListAsync } from '@/services/pdm/DocumentType';

const DocumentTypeSelect: React.FC<any> = props => {
  const [options, setOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const res = await DocumentTypeGetListAsync({
          MaxResultCount: 1000,
          SkipCount: 0,
        } as any);

        const typeOptions = (res.items || []).map((item: any) => ({
          label: item.typeName,
          value: item.id,
        }));

        setOptions(typeOptions);
      } catch (error) {
        console.error('加载文档类型失败:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <Select
      {...props}
      loading={loading}
      options={options}
      showSearch
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
    />
  );
};

export default DocumentTypeSelect;
