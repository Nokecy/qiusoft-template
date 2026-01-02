import { ICellRendererParams } from 'ag-grid-community';
import { Tag } from 'antd';
import React from 'react';

const OrderStatus = (props: ICellRendererParams) => {
	const { value } = props;

	const renderPickType = text => {
		switch (text) {
			case 5:
				return <Tag color={'red'}>草稿</Tag>;
			case 10:
				return <Tag color={'cyan'}>提交</Tag>;
			case 15:
				return <Tag color={'success'}>审核</Tag>;
			case 20:
				return <Tag color={'geekblue'}>退回修改</Tag>;
			case undefined:
				return '';
			default:
				return <Tag color={'red'}>未知</Tag>;
		}
	};

	return renderPickType(value);
};

const OrderQcType = (props: ICellRendererParams) => {
	const { value } = props;

	const renderPickType = text => {
		switch (text) {
			case 0:
				return '免检';
			case 1:
				return '抽检';
			case 2:
				return '外检';
			case undefined:
				return '';
			default:
				return <Tag color={'red'}>未知</Tag>;
		}
	};

	return renderPickType(value);
};

export { OrderQcType };

export default OrderStatus;
