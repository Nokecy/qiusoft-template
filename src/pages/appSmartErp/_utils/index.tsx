import { Tag } from 'antd';
import React from 'react';

// 销售管理组件
export { default as SaleManSelect } from './saleManSelect';

// 其他工具组件
export { default as BomField } from './bomField';
export { default as AttributeField } from './attributeField';

// 枚举和工具函数
export * from './enum';

const renderCustomerStatus = ({ value }) => {
	switch (value) {
		case '10':
			return <Tag color={'cyan'}>临时</Tag>;
		case '20':
			return <Tag color={'geekblue'}>正式</Tag>;
		case '30':
			return <Tag color={'orange'}>关闭</Tag>;
		case '40':
			return <Tag color={'success'}>报价客户</Tag>;
		default:
			return <span>{value || ''}</span>;
	}
};

const renderOrderType = ({ value }) => {
	switch (value) {
		case '10':
			return <Tag color={'cyan'}>普通订单</Tag>;
		case '20':
			return <Tag color={'geekblue'}>一揽子订单</Tag>;
		case '30':
			return <Tag color={'orange'}>维修订单</Tag>;
		case '40':
			return <Tag color={'success'}>ATO模式</Tag>;
		case '50':
			return <Tag color={'success'}>金额订单</Tag>;
		case '60':
			return <Tag color={'success'}>内部订单</Tag>;
		case '70':
			return <Tag color={'success'}>样品订单</Tag>;
		default:
			return <span>{value || ''}</span>;
	}
};

const renderPriceIsTax = ({ value }) => {
	switch (value) {
		case '0':
			return <Tag color={'green'}>含税</Tag>;
		case '1':
			return <Tag color={'orange'}>不含税</Tag>;
		default:
			return <span>{value || ''}</span>;
	}
};

const renderOrderStatus = ({ value }) => {
	switch (value) {
		case 'B1':
			return <Tag color={'cyan'}>草稿</Tag>;
		case 'D1':
			return <Tag color={'geekblue'}>审核通过</Tag>;
		case '30':
			return <Tag color={'orange'}>关闭</Tag>;
		case '40':
			return <Tag color={'success'}>报价客户</Tag>;
		default:
			return <span>{value || ''}</span>;
	}
};

export { renderCustomerStatus, renderOrderStatus, renderPriceIsTax, renderOrderType };
