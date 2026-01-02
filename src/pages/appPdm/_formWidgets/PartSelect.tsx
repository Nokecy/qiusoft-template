import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { PartGetListAsync } from '@/services/pdm/Part';

/**
 * 物料/零件选择组件
 * 支持搜索物料编码、物料名称
 */
const PartSelect: React.FC<any> = props => {
    const [options, setOptions] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const { onSearch: externalOnSearch, onChange: externalOnChange, ...restProps } = props || {};

    const loadParts = (searchValue?: string) => {
        setLoading(true);
        // 构造搜索过滤条件：物料编号(partNumber)或物料名称(description)
        const filter = searchValue ? `partNumber=*${searchValue}* OR description=*${searchValue}*` : '';

        PartGetListAsync({
            Filter: filter,
            MaxResultCount: 100,
            Sorting: 'creationTime desc',
        })
            .then((res: any) => {
                if (res.items) {
                    const opts = res.items.map((item: any) => ({
                        // label 显示: 物料编号 物料名称
                        label: `${item.partNumber || '-'} ${item.description || ''}`.trim(),
                        // value 返回物料编号（后端期望的是编号而非ID）
                        value: item.partNumber,
                        partNumber: item.partNumber,
                        description: item.description,
                        id: item.id,
                        organizationCode: item.organizationCode,
                        organizationName: item.organizationName,
                        // 其他字段用于自动带出
                        specification: item.specification,
                    }));
                    setOptions(opts);
                }
            })
            .catch((err: any) => {
                console.error('加载物料列表失败:', err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        loadParts();
    }, []);

    return (
        <Select
            {...restProps}
            allowClear
            showSearch
            loading={loading}
            placeholder={restProps.placeholder || '请选择物料'}
            options={options}
            filterOption={false}
            onSearch={(value) => {
                loadParts(value);
                if (externalOnSearch) externalOnSearch(value);
            }}
            onChange={(value, option) => {
                // 调用原始的 onChange
                if (externalOnChange) {
                    externalOnChange(value, option);
                }
            }}
        />
    );
};

export default PartSelect;
export { PartSelect };
