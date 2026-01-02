import { ICellRendererParams } from 'ag-grid-community';
import { useBoolean } from 'ahooks';
import { Drawer } from 'antd';
import React from 'react';
import WorkflowInstanceViewer from './workflowInstanceViewer';

const ViewDrawer = (props: ICellRendererParams) => {
	//@ts-ignore
	const { value, data, isTask } = props;
	const [visible, { setFalse, setTrue }] = useBoolean(false);

	return (
		<>
			<a onClick={setTrue}>{value ? value : '无'}</a>
			<Drawer size={'large'} placement='right' closable={false} width={"85%"} destroyOnClose onClose={setFalse} open={visible}>
				<WorkflowInstanceViewer instanceId={isTask ? data.workflowInstanceId : data.id} />
			</Drawer>
		</>
	);
};

export default ViewDrawer;
