import { ICellRendererParams } from 'ag-grid-community';
import { Tag } from 'antd';
import React from 'react';

const DeliveryOrderStatus = (props: ICellRendererParams) => {
	const { value } = props;

	const renderPickType = text => {
		switch (text) {
			case -999:
				return <Tag color="red">待排产</Tag>;
			case 5:
				return <Tag color="red">等待处理</Tag>;
			case 6:
				return <Tag color="red">预占失败</Tag>;
			case 7:
				return <Tag color="red">部分预占失败</Tag>;
			case 10:
				return <Tag color="lime">生成下架指令</Tag>;
			case 15:
				return <Tag color="orange">下架中</Tag>;
			case 18:
				return <Tag color="orange">部分交付</Tag>;
			case 19:
				return <Tag color="orange">欠料交付</Tag>;
			case 20:
				return <Tag color="green">下架完成</Tag>;
			case 21:
				return <Tag color="blue">待复核</Tag>;
			case 22:
				return <Tag color="blue">复核中</Tag>;
			case 23:
				return <Tag color="green">复核完成</Tag>;
			case 25:
				return <Tag color="cyan">发运中</Tag>;
			case 30:
				return <Tag color="success">发运完成</Tag>;
			default:
				return '未知';
		}
	};	

	return renderPickType(value);
};

export default DeliveryOrderStatus;
