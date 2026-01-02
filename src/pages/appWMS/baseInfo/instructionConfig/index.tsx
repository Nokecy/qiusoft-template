import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { InstructionConfig } from '@/services/wmsPermission';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import { Button, message, Space, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import { Access, useAccess, useIntl } from 'umi';
import InstructionConfigFormDialog from './components/FormDialog';
import DeleteConfirm from '@/components/deleteConfirm';
import { InstructionConfigDeleteAsync, InstructionConfigGetListAsync } from '@/services/wms/InstructionConfig';
import { isArray } from 'lodash';
const Options = (props: ICellRendererParams & { onRefresh }) => {
	const { data, api, onRefresh } = props;
	const intl = useIntl();
	const access = useAccess();

	const refresh = () => {
		onRefresh();
	};

	const handleDelete = (id: any) => {
		const hide = message.loading('正在操作,请稍后', 0);
		return InstructionConfigDeleteAsync({ id })
			.then(() => {
				refresh();
			})
			.finally(() => {
				hide();
			});
	};

	return (
		<Space>
			<Access accessible={!!access[InstructionConfig.Update]}>
				<InstructionConfigFormDialog
					title={'编辑'}
					entityId={data.id}
					onAfterSubmit={() => {
						refresh();
					}}
					buttonProps={{ icon: <EditOutlined />, type: 'link', headerName: intl.formatMessage({ id: 'AbpUi:Edit' }) }}
				/>
			</Access>

			<Access accessible={!!access[InstructionConfig.Delete]}>
				<DeleteConfirm title='确定删除?' onConfirm={() => handleDelete(data.id)}>
					<Button size={'small'} icon={<DeleteOutlined />} type={'link'} title={intl.formatMessage({ id: 'AbpUi:Delete' })} />
				</DeleteConfirm>
			</Access>
		</Space>
	);
};

const InstructionConfigPage: React.FC<any> = (props: any) => {
	const gridRef = useRef<GridRef>();
	const gridRef2 = useRef<GridRef>();
	const intl = useIntl();
	const access = useAccess();

	const onRefresh = () => {
		gridRef.current?.onRefresh();
	};

	const [selectedRow, setSelectedRow]: any = useState(undefined);

	return (
		<>
			<AgGridPlus
				gridRef={gridRef}
				headerTitle={'出入库指令配置列表'}
				gridKey='appWMS.baseInfo.instructionConfig'
				onRowSelected={event => {
					if (event.node.isSelected()) {
						if (event.event) {
							setSelectedRow(event.data);
						}
					}
				}}
				rowSelection={'single'}
				request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
					let data = await InstructionConfigGetListAsync({ Filter: params!.filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
					let requestData: any = { success: true, data: data.items!, total: data.totalCount };
					return requestData;
				}}
				toolBarRender={gridApi => {
					return [
						<Access accessible={!!access[InstructionConfig.Create]}>
							<InstructionConfigFormDialog title={'新建配置'} onAfterSubmit={onRefresh}>
								{'新建配置'}
							</InstructionConfigFormDialog>
						</Access>,
					];
				}}
			>
				<AgGridColumn field={'providerCode'} headerName={'提供者编码'} width={140} />
				<AgGridColumn field={'providerName'} headerName={'提供者名称'} width={140} />
				<AgGridColumn field={'type'} headerName={'类型'} width={100} cellRenderer={({ value }) => {
					switch (value) {
						case 5:
							return <Tag color='cyan'>出库</Tag>;
						case 10:
							return <Tag color='blue'>入库</Tag>;
						default:
							return '未知';
					}
				}} />
				<AgGridColumn field={'isAuto'} headerName={'自动指令'} width={100} type={'bool'} />
				<AgGridColumn field={'isLessCloseAutoDistribution'} headerName={'欠料交付'} width={100} type={'bool'} />
				<AgGridColumn field={'putAutoDistribution'} headerName={'自动分发'} width={100} type={'bool'} />
				<AgGridColumn
					field={'preRegisteredModel'}
					headerName={'预占模式'}
					width={130}
					cellRenderer={({ value }) => {
						switch (value) {
							case 5:
								return <Tag color='cyan'>按LPN预占</Tag>;
							case 10:
								return <Tag color='warning'>按ITEM预占</Tag>;
							case 15:
								return <Tag color="error">按批次预占</Tag>;
							default:
								return '无';
						}
					}}
				/>
				<AgGridColumn field={'wareHouses'} headerName={'生效库房'} width={150} cellRenderer={({ value }) => {
					try {
						const match = value.split(',')
						if (match && isArray(match)) {
							return match.map((item) => {
								return <Tag>{item}</Tag>;
							})
						} else {
							return value
						}
					} catch (error) {

					}
				}} />

				<AgGridColumn field={'isEnable'} headerName={'是否启用'} width={100} type={'bool'} />
				<AgGridColumn field={'needCallBack'} headerName={'是否需要回传'} width={100} type={'bool'} />

				<AgGridColumn field={'allowOverIssuance'} headerName={'是否允许超发'} width={100} type={'bool'} />
				<AgGridColumn field={'generateOutInstructionDemand'} headerName={'是否生成出库需求'} width={100} type={'bool'} />
				<AgGridColumn field={'allowableOverIssuanceCoefficient'} headerName={'允许超发系数'} width={100} />
				<AgGridColumn field={'allowUnderIssuance'} headerName={'是否允许欠料'} width={100} type={'bool'} />
				<AgGridColumn field={'validateSourceOrderNo'} headerName={'是否验证来源订单'} width={100} type={'bool'} />
				<AgGridColumn field={'isAutoGenShortageOrderOnUnderIssuance'} headerName={'欠料发运是否自动生成欠料单'} width={100} type={'bool'} />

				<AgGridColumn field={'isTransferOutOrderAutoGenInOrder'} headerName={'是否生成入库单'} width={100} type={'bool'} />
				<AgGridColumn field={'transferInOrderProviderName'} headerName={'入库单提供者名称'} width={140} />
				<AgGridColumn field={'transferInOrderProviderDescribe'} headerName={'入库单提供者编码'} width={140} />

				<AgGridColumn field={'memo'} headerName={'备注'} />

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

export default InstructionConfigPage;

export const routeProps = {
	name: '出入库指令配置',
};
