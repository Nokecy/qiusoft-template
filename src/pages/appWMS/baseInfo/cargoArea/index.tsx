import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { CargoAreaDeleteAsync, CargoAreaGetListAsync } from '@/services/wms/CargoArea';
import { CargoArea } from '@/services/wmsPermission';
import { DeleteOutlined, EditOutlined, PrinterOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space } from 'antd';
import React, { useRef } from 'react';
import { Access, serverUrl, useAccess, useIntl } from 'umi';
import { UseType, ZoneClass } from '../_utils';
import AreaFormDialog from './components/areaFormDialog';
import DeleteConfirm from "@/components/deleteConfirm";
const Options = (props: ICellRendererParams & { onRefresh }) => {
	const { data, api, onRefresh } = props;
	const intl = useIntl();
	const access = useAccess();

	const handleDelete = (id: any) => {
		const hide = message.loading('正在操作,请稍后', 0);
		return CargoAreaDeleteAsync({ id })
			.then(() => {
				onRefresh();
			})
			.finally(() => {
				hide();
			});
	};

	const print = () => {
		const frameElement = window.open(
			`${serverUrl()}/devExpressReport/print?reportUrl=CargoAreaPrint&code=${data.code}&name=${data.wareHouseName
			}&zoneClass=${data.zoneClass}`,
			'_blank'
		);

		frameElement!.addEventListener('afterprint', function (e) {
			frameElement!.location.href = 'about:blank';
			frameElement!.close();
		});

		frameElement!.addEventListener('load', function (e) {
			if (frameElement!.document.contentType !== 'text/html') frameElement!.print();
		});
	};

	return (
		<Space>
			<Access accessible={access[CargoArea.Update]}>
				<AreaFormDialog
					title={'编辑库区'}
					entityId={data.id}
					onAfterSubmit={onRefresh}
					buttonProps={{
						icon: <EditOutlined />,
						type: 'link',
						title: intl.formatMessage({ id: 'AbpUi:Edit' }),
					}}
				/>
			</Access>

			<Button
				size={'small'}
				icon={<PrinterOutlined />}
				type={'link'}
				title={'打印区域码'}
				onClick={print}
			/>

			<Access accessible={access[CargoArea.Delete]}>
				<DeleteConfirm title='确定删除?' onConfirm={() => handleDelete(data.id)}>
					<Button
						size={'small'}
						icon={<DeleteOutlined />}
						type={'link'}
						title={intl.formatMessage({ id: 'AbpUi:Delete' })}
					/>
				</DeleteConfirm>
			</Access>
		</Space>
	);
};

const CargoAreaPage: React.FC<any> = (props: any) => {
	const gridRef = useRef<GridRef>();
	const intl = useIntl();
	const access = useAccess();

	const onRefresh = () => {
		gridRef.current?.onRefresh();
	};

	return (
		<AgGridPlus
			headerTitle={'货台列表'}
			gridRef={gridRef}
			gridKey="appWMS.baseInfo.cargoArea"
			request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
				let data = await CargoAreaGetListAsync({
					Filter: params?.filter,
					Sorting: params!.sorter,
					SkipCount: params!.skipCount,
					MaxResultCount: params!.maxResultCount,
				});
				let requestData: any = { success: true, data: data.items!, total: data.totalCount };
				return requestData;
			}}
			rowSelection={'single'}
			toolBarRender={() => {
				return [
					<Access accessible={access[CargoArea.Create]}>
						<AreaFormDialog title={'新建'} onAfterSubmit={onRefresh}>
							{'新建货台'}
						</AreaFormDialog>
					</Access>,
				];
			}}
		>
			<AgGridColumn
				field={'factoryZone.name'}
				headerName={intl.formatMessage({ id: 'WMS:FactoryZoneName' })}
				width={120}
			/>
			<AgGridColumn
				field={'code'}
				headerName={intl.formatMessage({ id: 'WMS:Code' })}
				width={120}
			/>
			<AgGridColumn
				field={'zoneClass'}
				headerName={intl.formatMessage({ id: 'WMS:ZoneClass' })}
				width={120}
				cellRenderer={ZoneClass}
			/>
			<AgGridColumn
				field={'useType'}
				headerName={intl.formatMessage({ id: 'WMS:UseType' })}
				width={120}
				cellRenderer={UseType}
			/>
			<AgGridColumn
				field={'address'}
				headerName={intl.formatMessage({ id: 'WMS:Address' })}
				width={120}
			/>
			<AgGridColumn
				field={'warehouseTeam.name'}
				headerName={intl.formatMessage({ id: 'WMS:WareHouseTeamName' })}
				width={120}
			/>
			<AgGridColumn
				field={'remark'}
				headerName={intl.formatMessage({ id: 'WMS:Remark' })}
				width={120}
			/>
			<AgGridColumn
				field={'creationTime'}
				headerName={intl.formatMessage({ id: 'WMS:CreationTime' })}
				width={180}
				type={'dateTimeColumn'}
				initialSort={'desc'}
			/>
			<AgGridColumn
				field={'creator'}
				headerName={intl.formatMessage({ id: 'WMS:Creator' })}
				width={120}
			/>
			<AgGridColumn
				field={'lastModificationTime'}
				headerName={intl.formatMessage({ id: 'WMS:LastModificationTime' })}
				width={180}
				type={'dateTimeColumn'}
			/>
			<AgGridColumn
				field={'lastModifier'}
				headerName={intl.formatMessage({ id: 'WMS:LastModifier' })}
				width={120}
			/>
			<AgGridColumn
				field={'action'}
				headerName={intl.formatMessage({ id: 'AbpUi:Actions' })}
				width={120}
				pinned={'right'}
				cellRenderer={(props: any) => {
					return <Options {...props} onRefresh={onRefresh} />;
				}}
				filter={false}
			/>
		</AgGridPlus>
	);
};

export default CargoAreaPage;

export const routeProps = {
	name: '货台管理',
};
