import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { MenuItemDeleteAsync, MenuItemGetListAsync } from '@/services/openApi/MenuItem';
import { DeleteOutlined, EditOutlined, DownOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space } from 'antd';
import React, { useRef } from 'react';
import { Access, useAccess, useIntl } from 'umi';
import MenuItemFormDialog from './components/menuItemFormDialog';
import DeleteConfirm from '@/components/deleteConfirm';
import { cloneDeep } from 'lodash';
import { downloadBlob } from "@/_utils";
import ImportUpload from "./components/import";
const flattenTreeDeep = (treeData: any[], childrenName = 'childrens') => {
	const flattenData = (treeData: any[], res: any[], parentId?: any, childrenName = 'childrens') => {
		treeData.forEach(item => {
			res.push({ ...item, id: item.name, parentId: parentId });
			if (item[childrenName] && item[childrenName].length !== 0) {
				flattenData(item[childrenName], res, item['name'], childrenName);
			}
			delete item[childrenName];
		});
		return res;
	};
	let data = cloneDeep(treeData);

	let res: any[] = [];

	flattenData(data, res, null, childrenName);

	console.log('res', res);
	return res;
};

const Options = (props: ICellRendererParams & { onRefresh }) => {
	const { data, api, onRefresh } = props;
	const intl = useIntl();
	const access = useAccess();

	const refresh = () => {
		onRefresh();
	};

	const handleDelete = (name: any) => {
		const hide = message.loading('正在操作,请稍后', 0);
		MenuItemDeleteAsync({ Name: name })
			.then(() => {
				refresh();
			})
			.finally(() => {
				hide();
			});
	};

	return (
		<Space>
			<Access accessible={!!access['DynamicMenuManagement.MenuItem.Update']}>
				<MenuItemFormDialog
					title={'编辑'}
					name={data.name}
					onAfterSubmit={() => {
						refresh();
					}}
					buttonProps={{ icon: <EditOutlined />, type: 'link', title: intl.formatMessage({ id: 'AbpUi:Edit' }) }}
				/>
			</Access>

			<Access accessible={!!access['DynamicMenuManagement.MenuItem.Delete']}>
				<DeleteConfirm title='确定删除?' onConfirm={() => handleDelete(data.id)}>
					<Button size={'small'} icon={<DeleteOutlined />} type={'link'} title={intl.formatMessage({ id: 'AbpUi:Delete' })} />
				</DeleteConfirm>
			</Access>
		</Space>
	);
};

const MenuItemPage: React.FC<any> = (props: any) => {
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
				headerTitle={'应用列表'}
				treeData={true}
				getDataPath={data => {
					return data.hierarchy;
				}}
				treeParentName={'parentName'}
				treeKeyName={'name'}
				autoGroupColumnDef={{
					headerName: '菜单名称',
					minWidth: 300,
				}}
				groupDefaultExpanded={-1}
				request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
					let data = await MenuItemGetListAsync({ Filter: params?.filter, Sorting: params!.sorter ? params!.sorter : 'name asc', SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount, });
					let requestData: any = {
						success: true,
						data: flattenTreeDeep(
							data.items!.filter(x => x.parentName == null),
							'menuItems'
						),
						total: data.totalCount,
					};
					return requestData;
				}}
				toolBarRender={(girdApi, filter) => {
					return [
						<Access accessible={!!access['DynamicMenuManagement.MenuItem.Create']}>
							<MenuItemFormDialog title={'新建'} onAfterSubmit={onRefresh}>
								{'新建'}
							</MenuItemFormDialog>
						</Access>,
						<Access accessible={!!access['DynamicMenuManagement.MenuItem.Import']}>
							<ImportUpload onAfterSubmit={onRefresh} /></Access>,
						<Access accessible={!!access['DynamicMenuManagement.MenuItem.Export']}>
							<Button icon={<DownOutlined />} onClick={() => {
								downloadBlob(`/api/dynamic-menu/menu-item/export?filter=${filter}&MaxResultCount=100000`, "菜单信息.xlsx")
							}}>导出</Button>
						</Access>
					];
				}}
			>
				<AgGridColumn field={'displayName'} headerName={'显示名称'} width={180} />
				<AgGridColumn field={'url'} headerName={'URL'} width={300} />
				<AgGridColumn field={'permission'} headerName={'权限'} flex={1} />
				<AgGridColumn
					field={'action'}
					headerName={intl.formatMessage({ id: 'AbpUi:Actions' })}
					width={120}
					pinned={'right'}
					cellRenderer={Options}
					filter={false}
					cellRendererParams={{ onRefresh }}
				/>
			</AgGridPlus>
		</>
	);
};

export default MenuItemPage;
export const routeProps = {
	name: '菜单列表',
};
