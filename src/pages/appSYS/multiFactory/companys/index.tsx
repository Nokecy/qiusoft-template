import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { CompanyInfoGetListAsync, CompanyInfoDeleteAsync } from '@/services/openApi/CompanyInfo';
import { Companys } from '@/services/factoryPermission';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import DeleteConfirm from '@/components/deleteConfirm';
import { Button, message, Space } from 'antd';
import React, { useRef } from 'react';
import { Access, useAccess, useIntl } from 'umi';
import FormDialog from './components/FormDialog';

const Options = (props: any) => {
	const { data, onRefresh } = props;
	const intl = useIntl();
	const access = useAccess();

	const refresh = onRefresh;

	const handleDelete = (id: any) => {
		const hide = message.loading('正在操作,请稍后', 0);
		CompanyInfoDeleteAsync({ id })
			.then(() => {
				message.success('删除成功');
				refresh();
			})
			.catch((error) => {
				message.error('删除失败: ' + (error.message || '未知错误'));
			})
			.finally(() => {
				hide();
			});
	};

	return (
		<Space>
			<Access accessible={!!access[Companys.Update]}>
				<FormDialog
					title={'编辑公司'}
					entityId={data.id}
					onAfterSubmit={() => {
						refresh();
					}}
					buttonProps={{ icon: <EditOutlined />, type: 'link', title: intl.formatMessage({ id: 'AbpUi:Edit' }) }}
				/>
			</Access>

			<Access accessible={!!access[Companys.Delete]}>
				<DeleteConfirm title='确定删除?' onConfirm={() => handleDelete(data.id)}>
					<Button size={'small'} icon={<DeleteOutlined />} type={'link'} title={intl.formatMessage({ id: 'AbpUi:Delete' })} />
				</DeleteConfirm>
			</Access>
		</Space>
	);
};

const MaterialPage: React.FC<any> = (props: any) => {
	const intl = useIntl();
	const access = useAccess();
	const gridRef = useRef<GridRef>();
	const onRefresh = () => {
		gridRef.current?.onRefresh();
	};
	return (
		<AgGridPlus
			headerTitle={'公司列表'}
			gridKey="multiFactory-companys-list"
			gridRef={gridRef}
			request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
				let data = await CompanyInfoGetListAsync({ Filter: params?.filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
				let requestData: any = { success: true, data: data.items!, total: data.totalCount };
				return requestData;
			}}
			rowSelection={'multiple'}
			rowMultiSelectWithClick={true}
			toolBarRender={() => {
				return [
					<Access key="create" accessible={!!access[Companys.Create]}>
						<FormDialog title={'新建公司'} onAfterSubmit={onRefresh} buttonProps={{ icon: <PlusOutlined /> }}>
							新建
						</FormDialog>
					</Access>,
				];
			}}
		>
				<AgGridColumn field={'code'} headerName={'编码'} width={120} />
				<AgGridColumn field={'chinaName'} headerName={'中文名称'} width={120} />
				<AgGridColumn field={'englishName'} headerName={'英文名称'} width={120} />
				<AgGridColumn field={'addr'} headerName={'地址'} flex={1} />
				<AgGridColumn field={'invoiceAddr'} headerName={'发票地址'} width={120} />
				<AgGridColumn field={'tel'} headerName={'电话'} width={120} />
				<AgGridColumn field={'websit'} headerName={'网址'} width={120} />
				<AgGridColumn field={'email'} headerName={'邮箱'} />
				<AgGridColumn
					field={'action'}
					headerName={intl.formatMessage({ id: 'AbpUi:Actions' })}
					pinned={'right'}
					width={120}
					cellRenderer={Options}
					filter={false}
					cellRendererParams={{ onRefresh }}
				/>
		</AgGridPlus>
	);
};

export default MaterialPage;
export const routeProps = {
	name: '公司',
};
