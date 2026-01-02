import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { OverduePushRuleDeleteAsync, OverduePushRuleGetListAsync } from '@/services/wms/OverduePushRule';
import { OverduePushRule } from '@/services/wmsPermission';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message,   Space } from 'antd';
import React, { useRef } from 'react';
import { Access, useAccess, useIntl } from 'umi';
import OverduePushRuleFormDialog from './components/overduePushRuleFormDialog';
import UserSelect from '@/pages/appSYS/users/components/userSelect';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import DeleteConfirm from "@/components/deleteConfirm";
const Options = (props: ICellRendererParams & { onRefresh }) => {
	const { data, api, onRefresh } = props;
	const intl = useIntl();
	const access = useAccess();

	const refresh = () => {
		onRefresh();
	};

	const handleDelete = (id: any) => {
		const hide = message.loading('正在操作,请稍后', 0);
		return OverduePushRuleDeleteAsync({ id })
			.then(() => {
				refresh();
			})
			.finally(() => {
				hide();
			});
	};

	return (
		<Space>
			<Access accessible={access[OverduePushRule.Update]}>
				<OverduePushRuleFormDialog
					title={'编辑超期预警规则'}
					entityId={data.id}
					onAfterSubmit={() => {
						refresh();
					}}
					buttonProps={{ icon: <EditOutlined />, type: 'link', title: intl.formatMessage({ id: 'AbpUi:Edit' }) }}
				/>
			</Access>

			<Access accessible={access[OverduePushRule.Delete]}>
				<DeleteConfirm title='确定删除?' onConfirm={() => handleDelete(data.id)}>
					<Button size={'small'} icon={<DeleteOutlined />} type={'link'} title={intl.formatMessage({ id: 'AbpUi:Delete' })} />
				</DeleteConfirm>
			</Access>
		</Space>
	);
};

const OverduePushRulePage: React.FC<any> = (props: any) => {
	const gridRef = useRef<GridRef>();
	const intl = useIntl();
	const access = useAccess();

	const onRefresh = () => {
		gridRef.current?.onRefresh();
	};

	return (
		<>
			<AgGridPlus
				gridRef={gridRef}
				headerTitle={'超期预警规则列表'}
				gridKey='appWMS.baseInfo.overduePushRule'
				request={async (params?: { pageSize: number; current: number; [key: string]: any }) => {
					let data = await OverduePushRuleGetListAsync({ Filter: params?.filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
					let requestData: any = { success: true, data: data.items!, total: data.totalCount };
					return requestData;
				}}
				toolBarRender={girdApi => {
					return [
						<Access accessible={access[OverduePushRule.Create]}>
							<OverduePushRuleFormDialog title={'新建'} onAfterSubmit={onRefresh}>
								{'新建超期预警规则'}
							</OverduePushRuleFormDialog>
						</Access>,
					];
				}}
			>
				<AgGridColumn field={'name'} headerName={intl.formatMessage({ id: 'WMS:Name' })} width={180} />
				<AgGridColumn field={'lastDays'} headerName={intl.formatMessage({ id: 'WMS:LastDays' })} width={180} hideInSearch={true} />
				<AgGridColumn field={'intervalDays'} headerName={intl.formatMessage({ id: 'WMS:IntervalDays' })} width={180} hideInSearch={true} />
				<AgGridColumn field={'pusherName'} headerName={intl.formatMessage({ id: 'WMS:PusherName' })} flex={1} searchComponent={UserSelect} queryField='pusherId' searchComponentProps={{ showId: true }} />
				<AgGridColumn field={'action'} headerName={intl.formatMessage({ id: 'AbpUi:Actions' })} width={120} pinned={'right'} filter={false} sortable={false} cellRenderer={Options} cellRendererParams={{ onRefresh }} />
			</AgGridPlus>
		</>
	);
};

export default OverduePushRulePage;

export const routeProps = {
	name: '超期预警规则',
};