import { Tag } from 'antd';
import React from 'react';
import showAttributeDialog from '@/pages/appSmartErp/_utils/attributeField/attributeDialog';
import BomField from '@/pages/appSmartErp/_utils/bomField';

export const converAttributes = attribute => {
	let attributes: API.BurnAbpERPSalesSaleOrderItemAttributeDto[] = [];
	Object.keys(attribute).map(key => {
		attributes.push({ name: key, value: attribute[key] });
	});
	return attributes;
};

export const converAttributeToObject = (attributes: API.BurnAbpERPSalesSaleOrderItemAttributeDto[]) => {
	let initValues = {};
	attributes.map(key => {
		initValues[key.name!] = key.value;
	});
	return initValues;
};

export const renderOrderType = text => {
	switch (text) {
		case '10':
			return <Tag color={'blue'}>普通订单</Tag>;
		case '20':
			return <Tag color={'cyan'}>一揽子订单</Tag>;
		case '30':
			return <Tag color={'geekblue'}>维修订单</Tag>;
		case '40':
			return <Tag color={'magenta'}>ATO模式</Tag>;
		case '50':
			return <Tag color={'purple'}>金额订单</Tag>;
		case '60':
			return <Tag color={'success'}>内部订单</Tag>;
		case '70':
			return <Tag color={'yellow'}>样品订单</Tag>;
		default:
			break;
	}
};

export { BomField, showAttributeDialog };
