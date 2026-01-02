import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { BNRResolveRuleDefinitionDeleteAsync, BNRResolveRuleDefinitionGetListAsync } from '@/services/openApi/BNRResolveRuleDefinition';
import { BNRResolveRuleDefinition } from "@/services/bnrPermission";
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space } from 'antd';
import React, { useRef } from 'react';
import { Access, useAccess, useIntl } from 'umi';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import BarCodeResolveRuleFormDialog from './components/formDialog';
import DeleteConfirm from '@/components/deleteConfirm';
import MockResolveBtn from './components/mockResolveBtn';

const Options = (props: ICellRendererParams & { onRefresh }) => {
	const { data, api, onRefresh } = props;
	const intl = useIntl();
	const access = useAccess();

	const handleDelete = (id: any) => {
		const hide = message.loading('正在操作,请稍后', 0);
		BNRResolveRuleDefinitionDeleteAsync({ id })
			.then(() => {
				onRefresh();
			})
			.finally(() => {
				hide();
			});
	};

	return (
		<Space>
			<Access accessible={access[BNRResolveRuleDefinition.Update]}>
				<BarCodeResolveRuleFormDialog
					title={'条码类型设置'}
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

			<Access accessible={access[BNRResolveRuleDefinition.Mock]}>
				<MockResolveBtn entityId={data.id} />
			</Access>

			<Access accessible={access[BNRResolveRuleDefinition.Delete]}>
				<DeleteConfirm title='确定删除?' onConfirm={() => handleDelete(data.id)}>
					<Button size={'small'} icon={<DeleteOutlined />} type={'link'} title={intl.formatMessage({ id: 'AbpUi:Delete' })} />
				</DeleteConfirm>
			</Access>
		</Space>
	);
};

const BarCodeResolveRulePage: React.FC<any> = (props: any) => {
	const gridRef = useRef<GridRef>();
	const intl = useIntl();
	const access = useAccess();

	const onRefresh = () => {
		gridRef.current?.onRefresh();
	};

	return (
		<AgGridPlus
			headerTitle={'条码解析规则列表'}
			gridRef={gridRef}
			request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
				let data = await BNRResolveRuleDefinitionGetListAsync({ Filter: params?.filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
				let requestData: any = { success: true, data: data.items!, total: data.totalCount };
				return requestData;
			}}
			toolBarRender={() => {
				return [
					<Access accessible={access[BNRResolveRuleDefinition.Create]}>
						<BarCodeResolveRuleFormDialog title={'新建'} buttonProps={{ icons: <PlusOutlined /> }} onAfterSubmit={onRefresh}>
							{'新建条码解析规则'}
						</BarCodeResolveRuleFormDialog>
					</Access>,
				];
			}}
		>
			<AgGridColumn field='name' headerName='名称' width={120} />
			<AgGridColumn field='description' headerName='描述' width={200} />
			<AgGridColumn field='expression' headerName='表达式' width={500} />
			<AgGridColumn field='length' headerName='条码长度' width={120} />

			<AgGridColumn field='barCodeTypeName' headerName='条码类型' width={100} />
			<AgGridColumn field='itemCodePrefix' headerName='编码前缀' width={120} />
			<AgGridColumn field='fixedItemCode' headerName='固定编码' width={120} />

			<AgGridColumn field='itemStart' headerName='编码位置' width={100} />
			<AgGridColumn field='itemLength' headerName='编码长度' width={100} />

			<AgGridColumn field='snStart' headerName='SN位置' width={100} />
			<AgGridColumn field='snLength' headerName='SN长度' width={100} />

			<AgGridColumn field='versionStart' headerName='版本位置' width={100} />
			<AgGridColumn field='versionLength' headerName='版本长度' width={100} />

			<AgGridColumn field='supplierStart' headerName='供应商位置' width={100} />
			<AgGridColumn field='supplierLength' headerName='供应商长度' width={100} />
			
			<AgGridColumn field='quantityStart' headerName='数量位置' width={100} />
			<AgGridColumn field='quantityLength' headerName='数量长度' width={100} />

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

export default BarCodeResolveRulePage;
export const routeProps = {
	name: '条码解析规则列表',
};