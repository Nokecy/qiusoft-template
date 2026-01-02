import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { WareHouseDeleteAsync, WareHouseGetListAsync, WareHouseCreateVirtualZoneAsync } from '@/services/wms/WareHouse';
import { WareHouse } from '@/services/wmsPermission';
import { CloudUploadOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space } from 'antd';
import React, { useRef } from 'react';
import { Access, useAccess, useIntl } from 'umi';
import CustomerFormDialog from './components/wareHouseFormDialog';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import DeleteConfirm from "@/components/deleteConfirm";
import { DownOutlined } from '@ant-design/icons';
import { downloadBlob } from '@/_utils';
import ImportPublic from '@/components/importPublic';
import { wareHouseTypeEnum, WareHouseTypeSelect, warehousePropertyTypeEnum, WarehousePropertyTypeSelect } from '@/pages/appWMS/_utils';

const Options = (props: ICellRendererParams & { onRefresh }) => {
	const { data, api, onRefresh } = props;
	const intl = useIntl();
	const access = useAccess();

	const refresh = () => {
		onRefresh();
	};

	const handleDelete = (id: any) => {
		const hide = message.loading('正在操作,请稍后', 0);
		return WareHouseDeleteAsync({ id })
			.then(() => {
				refresh();
			})
			.finally(() => {
				hide();
			});
	};

	return (
		<Space>
			<Access accessible={access[WareHouse.Update]}>
				<CustomerFormDialog
					title={'编辑库房'}
					entityId={data.id}
					onAfterSubmit={() => {
						refresh();
					}}
					buttonProps={{ icon: <EditOutlined />, type: 'link', title: intl.formatMessage({ id: 'AbpUi:Edit' }) }}
				/>
			</Access>

			<Access accessible={access[WareHouse.Delete]}>
				<DeleteConfirm title='确定删除?' onConfirm={() => handleDelete(data.id)}>
					<Button size={'small'} icon={<DeleteOutlined />} type={'link'} title={intl.formatMessage({ id: 'AbpUi:Delete' })} />
				</DeleteConfirm>
			</Access>
		</Space>
	);
};

const WareHousePage: React.FC<any> = (props: any) => {
	const gridRef = useRef<GridRef>();
	const intl = useIntl();
	const access = useAccess();

	const onRefresh = () => {
		gridRef.current?.onRefresh();
	};

	const createVirtualZone = () => {
		const hide = message.loading('正在操作,请稍后', 0);
		return WareHouseCreateVirtualZoneAsync({}).finally(() => {
			hide();
		});
	};

	return (
		<>
			<AgGridPlus
				gridRef={gridRef}
				headerTitle={'仓库列表'}
				gridKey='appWMS.baseInfo.wareHouse'
				request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
					let data = await WareHouseGetListAsync({ Filter: params?.filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
					let requestData: any = { success: true, data: data.items!, total: data.totalCount };
					return requestData;
				}}
				toolBarRender={(gridApi, filter) => {
					return [
						<Access accessible={access[WareHouse.Create]}>
							<CustomerFormDialog title={'新建库房'} onAfterSubmit={onRefresh}>
								{'新建库房'}
							</CustomerFormDialog>
						</Access>,

						<Access accessible={access[WareHouse.Create]}>
							<DeleteConfirm title='是否创建虚拟库位' onConfirm={() => createVirtualZone()}>
								<Button icon={<PlusOutlined />} title={'创建虚拟库位'}>{'创建虚拟库位'}</Button>
							</DeleteConfirm>
						</Access>,

						<Access accessible={access[WareHouse.Create]}>
							<ImportPublic onAfterSubmit={onRefresh} icon={<CloudUploadOutlined />} title='库房' downUrl='/api/wms/warehouse/import-template' uploadUrl='/api/wms/warehouse/import'>
								批量上传
							</ImportPublic>
						</Access>,

						<Access accessible={access[WareHouse.Export]}>
							<Button
								icon={<DownOutlined />}
								onClick={() => {
									downloadBlob(`/api/wms/warehouse/export?filter=${filter}`, '库房信息.xlsx');
								}}
							>
								导出
							</Button>
						</Access>,
					];
				}}
			>
				<AgGridColumn field={'code'} headerName={intl.formatMessage({ id: 'WMS:WareHouseCode' })} width={100} />
				<AgGridColumn field={'name'} headerName={intl.formatMessage({ id: 'WMS:Name' })} width={200} />
				{/* <AgGridColumn field={'factoryZone.name'} headerName={intl.formatMessage({ id: 'WMS:FactoryZoneName' })} width={130} /> */}
				<AgGridColumn field={'wareHouseType'} headerName={intl.formatMessage({ id: 'WMS:WareHouseType' })} width={80} valueEnum={wareHouseTypeEnum} searchComponent={WareHouseTypeSelect} />
				<AgGridColumn field={'warehousePropertyType'} headerName={"属性类型"} width={80} valueEnum={warehousePropertyTypeEnum} searchComponent={WarehousePropertyTypeSelect} />
				<AgGridColumn field={'needRealRightCode'} headerName={'需要物权'} width={100} type={'bool'} />
				<AgGridColumn field={'address'} headerName={intl.formatMessage({ id: 'WMS:Address' })} width={150} />
				<AgGridColumn field={'contact'} headerName={intl.formatMessage({ id: 'WMS:Contact' })} width={100} />
				<AgGridColumn field={'tel'} headerName={intl.formatMessage({ id: 'WMS:Tel' })} width={120} />
				<AgGridColumn field={'memo'} headerName={intl.formatMessage({ id: 'WMS:Memo' })} />

				<AgGridColumn field={'creationTime'} headerName={intl.formatMessage({ id: 'WMS:CreationTime' })} width={180} type={'dateTimeColumn'} initialSort={'desc'} />
				<AgGridColumn field={'creator'} headerName={intl.formatMessage({ id: 'WMS:Creator' })} width={120} />
				<AgGridColumn field={'lastModificationTime'} headerName={intl.formatMessage({ id: 'WMS:LastModificationTime' })} width={180} type={'dateTimeColumn'} />
				<AgGridColumn field={'lastModifier'} headerName={intl.formatMessage({ id: 'WMS:LastModifier' })} width={120} />

				<AgGridColumn field={'action'} headerName={intl.formatMessage({ id: 'AbpUi:Actions' })} width={130} pinned={'right'} filter={false} sortable={false} cellRenderer={Options} cellRendererParams={{ onRefresh }} />
			</AgGridPlus>
		</>
	);
};

export default WareHousePage;

export const routeProps = {
	name: '库房管理',
};