import { ICellRendererParams } from 'ag-grid-community';

const InstructionPendRecordType = (props: ICellRendererParams) => {
	const { value } = props;

	const orderType = text => {
		switch (text) {
			case 0:
				return '入库指令';
			case 1:
				return '出库指令';
			default:
				return '未知';
		}
	};

	return orderType(value);
};

export { InstructionPendRecordType };
