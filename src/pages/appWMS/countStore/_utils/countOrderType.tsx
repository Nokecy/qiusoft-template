import { ICellRendererParams } from 'ag-grid-community';
import { Tag } from 'antd';
import React, { useState } from 'react';

const CountOrderType = (props: ICellRendererParams) => {
	const { value } = props;

	const renderCountOrderTypeType = text => {
		switch (text) {
			case 5:
				return <Tag color={'processing'}>指令盘点</Tag>;
			case 10:
				return <Tag color={'success'}>循环盘点</Tag>;
			case 15:
				return <Tag color={'cyan'}>冻结盘点</Tag>;
			case 20:
				return <Tag color={'yellow'}>主动盘点</Tag>;
			case 25:
				return <Tag color={'error'}>退库盘点</Tag>;
			case undefined:
				return '';
			default:
				return '未知';
		}
	};

	return renderCountOrderTypeType(value);
};

export default CountOrderType;
