import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { MaterialItemManagerSettingDeleteAsync, MaterialItemManagerSettingGetListAsync } from '@/services/wms/MaterialItemManagerSetting';
import { MaterialItems } from '@/services/wmsPermission';
import { CloudUploadOutlined, DeleteOutlined, DownOutlined, EditOutlined } from '@ant-design/icons';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space } from 'antd';
import React, { useRef } from 'react';
import { Access, useAccess, useIntl } from 'umi';
import MaterialItemLocationSettingFormDialog from './components/materialItemLocationSettingFormDialog';
import BulkReplaceFormDialog from './components/bulkReplaceFormDialog';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import DeleteConfirm from '@/components/deleteConfirm';
import ImportPublic from '@/components/importPublic';
import { downloadBlob } from '@/_utils';

const Options = (props: ICellRendererParams & { onRefresh }) => {
	const { data, api, onRefresh } = props;
	const intl = useIntl();
	const access = useAccess();

	const refresh = () => {
		onRefresh();
	};

	const handleDelete = (id: any) => {
		const hide = message.loading('正在操作,请稍后', 0);
		return MaterialItemManagerSettingDeleteAsync({ id })
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
				<MaterialItemLocationSettingFormDialog
					title={'编辑物料管理人设置'}
					entityId={data.id}
					onAfterSubmit={() => {
						refresh();
					}}
					buttonProps={{ icon: <EditOutlined />, type: 'link', title: intl.formatMessage({ id: 'AbpUi:Edit' }) }}
				/>
			</Access>
			{/* <Access accessible={access[MaterialItems.Create]}>
                <BulkReplaceFormDialog title={"批量替换管理人"} entityId={data.id} onAfterSubmit={() => { refresh(); }} buttonProps={{ icon: <RetweetOutlined />, type: "link", title: "批量替换管理人" }} />
            </Access> */}
			<Access accessible={access[MaterialItems.Delete]}>
				<DeleteConfirm title='确定删除?' onConfirm={() => handleDelete(data.id)}>
					<Button size={'small'} icon={<DeleteOutlined />} type={'link'} title={intl.formatMessage({ id: 'AbpUi:Delete' })} />
				</DeleteConfirm>
			</Access>
		</Space>
	);
};

const MaterialItemLocationSettingPage: React.FC<any> = (props: any) => {
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
				headerTitle={'物料管理人设置'}
				gridKey="appWMS.baseInfo.materialItemManageSetting"
				request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
					let data = await MaterialItemManagerSettingGetListAsync({
						Filter: params?.filter,
						Sorting: params!.sorter,
						SkipCount: params!.skipCount,
						MaxResultCount: params!.maxResultCount,
					});
					let requestData: any = { success: true, data: data.items!, total: data.totalCount };
					return requestData;
				}}
				toolBarRender={(gridApi, filter, _, page) => {

					const { skipCount, maxResultCount } = page || {};

					return [
						<Access accessible={access[MaterialItems.Create]}>
							<MaterialItemLocationSettingFormDialog title={'新建物料管理人'} onAfterSubmit={onRefresh}>
								新建
							</MaterialItemLocationSettingFormDialog>
						</Access>,

						<ImportPublic onAfterSubmit={onRefresh} icon={<CloudUploadOutlined />} title='物料管理人' downUrl='/api/wms/material-manager-setting/import-template' uploadUrl='/api/wms/material-manager-setting/import'>
							批量上传
						</ImportPublic>,

						<Access accessible={access[MaterialItems.Create]}>
							<BulkReplaceFormDialog title={'批量替换管理人'} onClick={onRefresh}>
								批量替换管理人
							</BulkReplaceFormDialog>
						</Access>,

						<Access key="export" accessible={!!access[MaterialItems.Export]}>
							<Button
								key="eOrderMaterialReservation"
								icon={<DownOutlined />}
								onClick={() => {
									downloadBlob(`/api/wms/material-manager-setting/export?filter=${filter}&SkipCount=${skipCount}&MaxResultCount=${maxResultCount}`, '物料管理人信息.xlsx');
								}}
							>
								导出
							</Button>
						</Access>,
					];
				}}
			>
				<AgGridColumn field={'warehouse.name'} headerName={intl.formatMessage({ id: 'WMS:WareHouseName' })} width={180} queryField={'warehouse.Name'} flex={1}/>
				<AgGridColumn field={'materialItem.code'} headerName={intl.formatMessage({ id: 'WMS:MaterialItemCode' })} width={120} queryField={'materialItem.Code'} />
				<AgGridColumn field={'materialItem.outCode'} headerName={intl.formatMessage({ id: 'WMS:MaterialItemOutCode' })} width={120} queryField={'materialItem.OutCode'} />
				{/* <AgGridColumn field={'material.description'} headerName={intl.formatMessage({ id: 'WMS:MaterialItemDescript' })} width={180} hideInSearch /> */}
				<AgGridColumn field={'managerName'} headerName={intl.formatMessage({ id: 'WMS:ManagerName' })} width={120} />
				<AgGridColumn field={'materialItemCategory.code'} headerName={'物料分类编码'} width={120} />
				<AgGridColumn field={'materialItemCategory.name'} headerName={'物料分类名称'} width={120} />

				<AgGridColumn field={'creationTime'} headerName={intl.formatMessage({ id: 'WMS:CreationTime' })} width={180} type={'dateTimeColumn'} initialSort={'desc'} />
				<AgGridColumn field={'creator'} headerName={intl.formatMessage({ id: 'WMS:Creator' })} width={120} />
				<AgGridColumn field={'lastModificationTime'} headerName={intl.formatMessage({ id: 'WMS:LastModificationTime' })} width={180} type={'dateTimeColumn'} />
				<AgGridColumn field={'lastModifier'} headerName={intl.formatMessage({ id: 'WMS:LastModifier' })} width={120} />
				<AgGridColumn
					field={'action'}
					headerName={intl.formatMessage({ id: 'AbpUi:Actions' })}
					width={120}
					pinned={'right'}
					filter={false}
					cellRenderer={Options}
					cellRendererParams={{ onRefresh }}
				/>
			</AgGridPlus>
		</>
	);
};

export default MaterialItemLocationSettingPage;

export const routeProps = {
	name: '物料管理人',
};
