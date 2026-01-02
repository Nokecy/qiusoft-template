import { ICellRendererParams } from "ag-grid-enterprise";
import { useControllableValue } from 'ahooks';
import { Select, SelectProps, Tag } from 'antd';
import { SelectValue } from 'antd/lib/select';
import React from 'react';
import { InstructionCallBackStatusEnum, callBackStatusOptions, instructionCallBackStatusEnum } from './instructionCallBackStatusEnum';

const { Option } = Select;

const InstructionCallBackStatus = (props: ICellRendererParams) => {
    const { value } = props;

    const statusConfig = instructionCallBackStatusEnum.find(item => item.value === value);
    if (statusConfig) {
        return <Tag color={statusConfig.color}>{statusConfig.label}</Tag>;
    }
    
    return <Tag color='#f5222d'>未知</Tag>;
};

const InstructionCallBackStatusSelect = (props: SelectProps<any>) => {
	const [state, setState] = useControllableValue<SelectValue>(props);

	return (
		<Select
			style={{ width: '100%' }}
			filterOption={false}
			{...props}
			value={state}
			onChange={setState}
		>
			{callBackStatusOptions.map((i: any) => (
				<Option key={i.value} value={i.value}>{i.label}</Option>
			))}
		</Select>
	);
};

export { InstructionCallBackStatus, InstructionCallBackStatusSelect };
export default InstructionCallBackStatusSelect;