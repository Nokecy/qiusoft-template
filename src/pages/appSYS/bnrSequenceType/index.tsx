import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { BNRSequenceTypeDeleteAsync, BNRSequenceTypeGetListAsync } from '@/services/openApi/BNRSequenceType';
import { BNRSequenceType } from "@/services/bnrPermission";
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space } from 'antd';
import React, { useRef } from 'react';
import { Access, useAccess, useIntl } from 'umi';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import SequenceTypeFormDialog from './components/formDialog';
import DeleteConfirm from '@/components/deleteConfirm';

const Options = (props: ICellRendererParams & { onRefresh }) => {
	const { data, api, onRefresh } = props;
	const intl = useIntl();
	const access = useAccess();

	const handleDelete = (id: any) => {
		const hide = message.loading('正在操作,请稍后', 0);
		BNRSequenceTypeDeleteAsync({ id })
			.then(() => {
				onRefresh();
			})
			.finally(() => {
				hide();
			});
	};

	return (
		<Space>
			<Access accessible={access[BNRSequenceType.Update]}>
				<SequenceTypeFormDialog
					title={'条码类型'}
					entityId={data.id}
					onAfterSubmit={() => {
						onRefresh();
					}}
					buttonProps={{
						icon: <EditOutlined />,
						type: 'link',
						headerName: intl.formatMessage({ id: 'AbpUi:Edit' }),
					}}
				/>
			</Access>

			<Access accessible={access[BNRSequenceType.Delete]}>
				<DeleteConfirm title='确定删除?' onConfirm={() => handleDelete(data.id)}>
					<Button size={'small'} icon={<DeleteOutlined />} type={'link'} title={intl.formatMessage({ id: 'AbpUi:Delete' })} />
				</DeleteConfirm>
			</Access>
		</Space>
	);
};

const BNRSequenceTypePage = (props: any) => {
	const gridRef = useRef<GridRef>();
	const intl = useIntl();
	const access = useAccess();

	const onRefresh = () => {
		gridRef.current?.onRefresh();
	};

	return (
		<AgGridPlus
			headerTitle={'条码类型列表'}
			gridRef={gridRef}
			request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
				let data = await BNRSequenceTypeGetListAsync({ Filter: params?.filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
				let requestData: any = { success: true, data: data.items!, total: data.totalCount };
				return requestData;
			}}
			toolBarRender={() => {
				return [
					<Access accessible={access[BNRSequenceType.Create]}>
						<SequenceTypeFormDialog title={'新建'} buttonProps={{ icons: <PlusOutlined /> }} onAfterSubmit={onRefresh}>
							{'新建条码类型'}
						</SequenceTypeFormDialog>
					</Access>,
				];
			}}
		>
			<AgGridColumn field='code' headerName='编码' width={120} />
			<AgGridColumn field='name' headerName='名称' width={150} />
			<AgGridColumn field='description' headerName='描述' flex={1} />

			<AgGridColumn
				field={'action'}
				headerName={intl.formatMessage({ id: 'AbpUi:Actions' })}
				width={150}
				pinned={'right'}
				cellRenderer={(props: any) => {
					return <Options {...props} onRefresh={onRefresh} />;
				}}
				filter={false}
			/>
		</AgGridPlus>
	);
};

export default BNRSequenceTypePage;
export const routeProps = {
	name: '条码类型',
};