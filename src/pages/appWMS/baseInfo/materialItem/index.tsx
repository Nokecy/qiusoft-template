import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { MaterialItemDeleteAsync, MaterialItemGetListAsync } from '@/services/wms/MaterialItem';
import { MaterialItems } from '@/services/wmsPermission';
import { DeleteOutlined, EditOutlined, DownOutlined, CloudUploadOutlined } from '@ant-design/icons';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space } from 'antd';
import React, { useRef, useState } from 'react';
import { Access, useAccess, useIntl, useModel } from 'umi';
import NumberFormatting from '../_utils/numberFormatting';
import MaterialFormDialog from './components/materialItemFormDialog';
import MaterialItemQuery from './components/materialltemQuery';
import Import from './components/import';
import { LoopType, PickType } from '../_utils';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { downloadBlob } from '@/_utils';
import DeleteConfirm from "@/components/deleteConfirm";
import ImportPublic from '@/components/importPublic';
import { getExtendTableData } from '@/pages/_utils/editMode/itemConfiguration';

const Options = (props: ICellRendererParams & { onRefresh }) => {
	const { data, api, onRefresh } = props;
	const intl = useIntl();
	const access = useAccess();

	const refresh = () => {
		onRefresh();
	};

	const handleDelete = (id: any) => {
		const hide = message.loading('正在操作,请稍后', 0);
		return MaterialItemDeleteAsync({ id })
			.then(() => {
				refresh();
			})
			.finally(() => {
				hide();
			});
	};

	return (
		<Space>
			<Access accessible={access[MaterialItems.Update]}>
				<MaterialFormDialog
					title={'编辑物料'}
					entityId={data.id}
					onAfterSubmit={() => {
						refresh();
					}}
					buttonProps={{ icon: <EditOutlined />, type: 'link', title: intl.formatMessage({ id: 'AbpUi:Edit' }) }}
				/>
			</Access>

			<Access accessible={access[MaterialItems.Delete]}>
				<DeleteConfirm title='确定删除?' onConfirm={() => handleDelete(data.id)}>
					<Button size={'small'} icon={<DeleteOutlined />} type={'link'} title={intl.formatMessage({ id: 'AbpUi:Delete' })} />
				</DeleteConfirm>
			</Access>
		</Space>
	);
};

const MaterialPage: React.FC<any> = (props: any) => {
	const gridRef = useRef<GridRef>();
	const intl = useIntl();
	const access = useAccess();
	const [maxResultCount, setMaxResultCount] = useState(200);

	const onRefresh = () => {
		gridRef.current?.onRefresh();
	};

	const extendData = getExtendTableData('WMS', 'MaterialItem');

	const renderExtendData = () => extendData.map((item, index) => <AgGridColumn key={index} {...item} />);

	console.log('record1 wms', extendData)

	return (
		<>
			<AgGridPlus
				gridRef={gridRef}
				headerTitle={'物料列表'}
				gridKey='appWMS.baseInfo.materialItem'
				request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
					setMaxResultCount(params!.maxResultCount)
					let data = await MaterialItemGetListAsync({ Filter: params?.filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
					let requestData: any = { success: true, data: data.items!, total: data.totalCount };
					return requestData;
				}}
				toolBarRender={(gridApi, filter) => {
					return [
						<Access accessible={access[MaterialItems.Create]}>
							<MaterialFormDialog title={"新建"} onAfterSubmit={onRefresh}>新建</MaterialFormDialog>
						</Access>,
						<Access accessible={access[MaterialItems.Create]}>
							<ImportPublic onAfterSubmit={onRefresh} icon={<CloudUploadOutlined />} title='物料' downUrl='/api/wms/materialItem/import-template' uploadUrl='/api/wms/materialItem/import'>
								批量上传
							</ImportPublic>
						</Access>,
						<Access accessible={access[MaterialItems.Import]}>
							<Import onAfterSubmit={onRefresh} />
						</Access>,
						<Button
							icon={<DownOutlined />}
							onClick={() => {
								downloadBlob(`/api/wms/materialItem/export?filter=${filter}&maxResultCount=${maxResultCount}`, '物料信息.xlsx');
							}}
						>
							导出
						</Button>,
					];
				}}
			>
				<AgGridColumn field={'materialItemCategory.name'} headerName={'物料分类'} width={120} />
				<AgGridColumn field={'code'} headerName={intl.formatMessage({ id: 'WMS:Code' })} width={120} />
				<AgGridColumn field={'outCode'} headerName={intl.formatMessage({ id: 'WMS:OutCode' })} width={120} />
				<AgGridColumn field={'description'} headerName={intl.formatMessage({ id: 'WMS:Descript' })} width={150} />
				<AgGridColumn field={'lotAttrEnable'} headerName={intl.formatMessage({ id: 'WMS:LotAttrEnable' })} width={100} type={'bool'} searchComponent={MaterialItemQuery} />
				<AgGridColumn field={'lotAttr.name'} headerName={intl.formatMessage({ id: 'WMS:LotAttrName' })} width={120} />
				<AgGridColumn field={'isExpensive'} headerName={intl.formatMessage({ id: 'WMS:IsExpensive' })} width={80} type={'bool'} />
				<AgGridColumn field={'materialStoreSetting.takeBox'} headerName={intl.formatMessage({ id: 'WMS:TakeBox' })} width={60} type={'bool'} />
				<AgGridColumn field={'materialStoreSetting.preRegisteredModel'} headerName={intl.formatMessage({ id: 'WMS:PreRegisteredModel' })} width={90} hideInSearch={true} cellRenderer={NumberFormatting} />
				<AgGridColumn field={'materialStoreSetting.pickType'} headerName={intl.formatMessage({ id: 'WMS:PickType' })} width={100} cellRenderer={PickType} />
				<AgGridColumn field={'materialStoreSetting.loopType'} headerName={'滚动类型'} cellRenderer={LoopType} width={90} />
				<AgGridColumn field={'materialStoreSetting.loopLotAttrName'} headerName={'滚动批次属性'} width={120} hideInSearch={true} />
				<AgGridColumn field={'materialStoreSetting.loopTimes'} headerName={intl.formatMessage({ id: 'WMS:LoopTimes' })} width={80} hideInSearch={true} />
				<AgGridColumn field={'materialStoreSetting.max'} headerName={intl.formatMessage({ id: 'WMS:Max' })} width={80} hideInSearch={true} />
				<AgGridColumn field={'materialStoreSetting.loopNum'} headerName={intl.formatMessage({ id: 'WMS:LoopNum' })} width={80} hideInSearch={true} />
				<AgGridColumn field={'materialStoreSetting.overdueWarningDays'} headerName={intl.formatMessage({ id: 'WMS:OverdueWarningDays' })} width={100} hideInSearch={true} />
				<AgGridColumn field={'memo'} headerName={intl.formatMessage({ id: 'WMS:Memo' })} width={200} />
				<AgGridColumn field={'creationTime'} headerName={intl.formatMessage({ id: 'WMS:CreationTime' })} width={150} type={'dateTimeColumn'} initialSort={'desc'} />
				<AgGridColumn field={'creator'} headerName={intl.formatMessage({ id: 'WMS:Creator' })} width={120} />
				<AgGridColumn field={'lastModificationTime'} headerName={intl.formatMessage({ id: 'WMS:LastModificationTime' })} width={150} type={'dateTimeColumn'} />
				<AgGridColumn field={'lastModifier'} headerName={intl.formatMessage({ id: 'WMS:LastModifier' })} width={120} />
				<AgGridColumn field={'action'} headerName={intl.formatMessage({ id: 'AbpUi:Actions' })} width={120} pinned={'right'} filter={false} sortable={false} cellRenderer={Options} cellRendererParams={{ onRefresh }} />
				{
					renderExtendData()
				}
			</AgGridPlus>
		</>
	);
};

export default MaterialPage;

export const routeProps = {
	name: '物料管理',
};