import { ICellRendererParams } from 'ag-grid-community';
import { useControllableValue } from 'ahooks';
import { Select, SelectProps } from 'antd';
import { SelectValue } from 'antd/lib/select';
import React from 'react';

const ShipmentOrderType = (props: ICellRendererParams) => {
	const { value } = props;

	const renderPickType = text => {
		switch (text) {
			case 5:
				return '销售订单';
			case 10:
				return '采购退货';
			case 15:
				return '生产领料';
			case 20:
				return '其他出库';
			default:
				return '未知';
		}
	};

	return renderPickType(value);
};
const OrderType = (props: ICellRendererParams) => {
	const { value } = props;

	const renderReceiptType = text => {
		switch (text) {
			case 5:
				return '销售出库';
			case 6:
				return '生产退回出库';
			case 10:
				return '领料出库';
			case 11:
				return '出库杂出';
			case 15:
				return '退货出库';
			default:
				return '未知';
		}
	};

	return renderReceiptType(value);
};
const ShipmentOrderTypeSelect = (props: SelectProps<any>) => {
	const [state, setState] = useControllableValue<SelectValue>(props);

	return (
		<Select
			style={{ width: '100%' }}
			filterOption={false}
			showSearch
			{...props}
			value={state}
			onChange={e => {
				setState(e);
			}}
		>
			<Select.Option value={5} title={'销售出库'}>
				销售出库
			</Select.Option>
			<Select.Option value={6} title={'车间返工'}>
				车间返工
			</Select.Option>
			<Select.Option value={7} title={'成品杂出'}>
				成品杂出
			</Select.Option>
			<Select.Option value={10} title={'生产领料'}>
				生产领料
			</Select.Option>
			<Select.Option value={11} title={'原料杂出'}>
				原料杂出
			</Select.Option>
			<Select.Option value={15} title={'供应商退货'}>
				供应商退货
			</Select.Option>
		</Select>
	);
};

export { ShipmentOrderType };
export { OrderType };
export default ShipmentOrderTypeSelect;
