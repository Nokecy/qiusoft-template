import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { DocumentGetListAsync } from '@/services/pdm/Document';

/**
 * 文档选择组件
 * - 支持搜索文档编码、文档名称
 * - 下拉展示：文档编码 文档名称（version+revision）
 */
const DocumentSelect: React.FC<any> = (props) => {
  const [options, setOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const { onChange: externalOnChange, onSearch: externalOnSearch, publishState, ...restProps } = props || {};

  const loadDocuments = (searchValue?: string) => {
    setLoading(true);

    // 构造筛选条件（ABP Dynamic Filter 语法）
    // - field=*value 表示模糊匹配
    // - | 表示 OR
    // - , 表示 AND
    const filterParts: string[] = [];

    if (searchValue) {
      const keyword = String(searchValue).trim();
      if (keyword) {
        filterParts.push(`(documentNumber=*${keyword}*|documentName=*${keyword}*)`);
      }
    }

    if (publishState !== undefined && publishState !== null && publishState !== '') {
      filterParts.push(`publishState=${publishState}`);
    }

    const filter = filterParts.length > 0 ? filterParts.join(',') : undefined;

    DocumentGetListAsync({
      Filter: filter,
      MaxResultCount: 100,
      Sorting: 'creationTime desc',
    })
      .then((res) => {
        if (res.items) {
          const opts = res.items.map((item) => {
            const versionText = `${item.version || ''}${item.revision || ''}`.trim();
            const versionSuffix = versionText ? `（${versionText}）` : '';

            return {
              // label 显示：文档编码 文档名称（version+revision）
              label: `${item.documentNumber || '-'} ${item.documentName || ''}${versionSuffix ? ` ${versionSuffix}` : ''}`.trim(),
              // value 返回文档ID
              value: item.id,
              documentNumber: item.documentNumber,
              documentName: item.documentName,
              id: item.id,
              organizationCode: item.organizationCode,
              organizationName: item.organizationName,
              // 其他字段用于自动带出
              documentTypeId: item.documentTypeId,
              documentTypeName: item.documentTypeName,
              version: item.version,
              revision: item.revision,
              primaryPartLink: item.primaryPartLink,
            };
          });
          setOptions(opts);
        }
      })
      .catch((err) => {
        console.error('加载文档列表失败:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  return (
    <Select
      {...restProps}
      allowClear
      showSearch
      loading={loading}
      placeholder={restProps.placeholder || '请选择文档'}
      options={options}
      filterOption={false}
      onSearch={(value) => {
        loadDocuments(value);
        if (externalOnSearch) externalOnSearch(value);
      }}
      onChange={(value, option: any) => {
        // 当 labelInValue 时，Antd 只返回 { value, label }
        // 这里把 option 中的其他属性（如 documentTypeId, version）合并进去，方便上层联动
        let enhancedValue = value;
        if (value && typeof value === 'object' && !Array.isArray(value) && option) {
          enhancedValue = { ...value, ...option };
          delete enhancedValue.key;
        }

        if (externalOnChange) externalOnChange(enhancedValue, option);
      }}
    />
  );
};

export default DocumentSelect;
export { DocumentSelect };

