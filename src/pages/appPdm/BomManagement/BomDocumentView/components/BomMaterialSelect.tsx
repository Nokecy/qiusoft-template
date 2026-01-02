/**
 * BOM物料选择器组件
 * 从BOM列表获取物料编码选项，只显示已有BOM的物料
 * 使用 DialogSelect 支持弹框表格选择
 */

import { DialogSelect } from '@/components';
import { BomGetListAsync } from '@/services/pdm/Bom';
import { useControllableValue, useRequest } from 'ahooks';
import { Select as AntSelect } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import React from 'react';

const { Option } = AntSelect;

/**
 * 获取BOM列表数据
 */
const getData = ({ Filter, SkipCount, MaxResultCount, Sorting }: any) => {
    return BomGetListAsync({
        Filter: Filter ? Filter : undefined,
        SkipCount: SkipCount ? SkipCount : 0,
        MaxResultCount: MaxResultCount ? MaxResultCount : 300,
        Sorting: Sorting ? Sorting : undefined,
    });
};

interface BomMaterialSelectProps extends SelectProps<any> {
    /** 是否返回物料编码（默认true），false则返回BOM ID */
    useCode?: boolean;
    /** 是否启用联动 */
    enableLinkage?: boolean;
    /** 选择BOM后的回调 */
    onBomSelect?: (bom: any) => void;
    /** 是否使用自动完成模式 */
    useAutoComplete?: boolean;
}

/**
 * BOM物料选择器组件
 * 支持弹框表格选择，显示已有BOM的物料列表
 */
const BomMaterialSelect = (
    props: BomMaterialSelectProps,
    ref: React.Ref<any>
) => {
    const {
        useCode = true,
        enableLinkage = false,
        onBomSelect,
        useAutoComplete = false,
        ...restProps
    } = props;

    const [state, setState] = useControllableValue<SelectValue>(props);

    const { data, loading, run, cancel } = useRequest(getData, {
        debounceMaxWait: 500,
        manual: true,
    });

    const handleChange = (value: any, option: any) => {
        setState(value);

        // 如果启用联动且有回调，则触发联动逻辑
        if (enableLinkage && onBomSelect && value) {
            const materialCode = typeof value === 'object' ? value.value : value;
            const selectedBom = data?.items?.find((bom) =>
                useCode ? bom.materialCode === materialCode : bom.id === materialCode
            );
            if (selectedBom) {
                onBomSelect(selectedBom);
            }
        }
    };

    return (
        <span ref={ref}>
            <DialogSelect
                placeholder="请选择BOM物料"
                style={{ width: '100%' }}
                showSearch
                labelInValue
                filterOption={false}
                {...restProps}
                onSearch={(value) => {
                    // 使用正确的Filter格式进行模糊搜索
                    run({ Filter: `materialCode=*${value}*||materialDescription=*${value}*` });
                }}
                onDropdownVisibleChange={(visible) => {
                    visible && run({});
                }}
                loading={loading}
                onBlur={cancel}
                value={JSON.stringify(state) === '{}' ? undefined : state}
                onChange={handleChange}
                valueField={useCode ? 'materialCode' : 'id'}
                labelField="materialDescription"
                request={getData}
                useAutoComplete={useAutoComplete}
                columnDefs={[
                    { field: 'materialCode', headerName: '物料编码', width: 150 },
                    { field: 'materialDescription', headerName: '物料描述', width: 200 },
                    { field: 'topMaterialCode', headerName: '顶层物料', width: 150 },
                    { field: 'engineerName', headerName: '工程师', width: 100 },
                    { field: 'remark', headerName: '备注', flex: 1 },
                ]}
            >
                {data?.items?.map((bom) => (
                    <Option key={bom.id} value={useCode ? bom.materialCode! : bom.id!}>
                        {`${bom.materialCode} - ${bom.materialDescription || ''}`}
                    </Option>
                ))}
            </DialogSelect>
        </span>
    );
};

export default React.forwardRef(BomMaterialSelect);
