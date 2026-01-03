import { ICellRendererParams } from 'ag-grid-community';
import { Tag } from 'antd';
import React from 'react';

const WorkflowItemStatusRender = (params: ICellRendererParams) => {
	switch (params.value) {
		case 0:
			return <Tag color={'success'}>等待处理</Tag>;
		case 1:
			return <Tag color={'success'}>完成</Tag>;
		case 2:
			return <Tag color={'success'}>超时完成</Tag>;
		case 3:
			return <Tag color={'success'}>取消</Tag>;
	}
};

export default WorkflowItemStatusRender;
