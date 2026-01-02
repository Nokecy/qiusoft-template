import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import React, { useRef } from 'react';
import { useIntl } from 'umi';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { InstructionPendRecordType } from './components/instructionPendRecordType';
import { Button, Space } from 'antd';
import { ICellRendererParams } from 'ag-grid-community';
import { RedoOutlined } from '@ant-design/icons';
import { Access, useAccess } from 'umi';
import { OutInstructionPendRecordInfo } from '@/services/wmsPermission';
import { InstructionPendRecordInfoGetListAsync, InstructionPendRecordInfoReTryDataRecordAsync } from '@/services/wms/InstructionPendRecordInfo';

const Options = (props: ICellRendererParams & { onRefresh }) => {
	const { data, onRefresh } = props;
	const access = useAccess();
	return (
		<Space>
			{data.isError ? (
				<Access accessible={access[OutInstructionPendRecordInfo.ReTry]}>
					<Button
						type={'link'}
						style={{ width: 30 }}
						icon={<RedoOutlined />}
						onClick={() => {
							InstructionPendRecordInfoReTryDataRecordAsync({ id: data.id }).then(() => {
								onRefresh();
							});
						}}
					></Button>
				</Access>
			) : null}
		</Space>
	);
};

const InstructionPendRecordInfoPage: React.FC<any> = () => {
	const gridRef = useRef<GridRef>();
	const intl = useIntl();

	const onRefresh = () => {
		gridRef.current?.onRefresh();
	};

	return (
		<>
			<AgGridPlus
				gridRef={gridRef}
				headerTitle={'外部指令来源'}
				gridKey="appWMS.instructionPendRecord.instructionPendRecordInfo"
				request={async (params?: { pageSize: number; current: number;[key: string]: any }) => {
					let data = await InstructionPendRecordInfoGetListAsync({
						Filter: params?.filter,
						Sorting: params!.sorter,
						SkipCount: params!.skipCount,
						MaxResultCount: params!.maxResultCount,
					});
					let requestData: any = { success: true, data: data.items!, total: data.totalCount };
					return requestData;
				}}
			>
				<AgGridColumn field={'sourceOrderNo'} headerName={intl.formatMessage({ id: 'WMS:SourceOrderNo' })} width={150} />
				<AgGridColumn field={'type'} headerName='类型' width={120} cellRenderer={InstructionPendRecordType} />
				<AgGridColumn field={'providerName'} headerName='提供者名称' width={180} />
				<AgGridColumn field={'isHandle'} headerName='是否处理' width={120} type='bool' />
				<AgGridColumn field={'isError'} headerName='是否错误' width={120} type='bool' />
				<AgGridColumn field={'errorMsg'} headerName='错误原因' width={200} />
				<AgGridColumn field={'creationTime'} headerName={intl.formatMessage({ id: 'WMS:CreationTime' })} width={160} type={'dateTimeColumn'} initialSort={'desc'} />
				<AgGridColumn field={'creator'} headerName={intl.formatMessage({ id: 'WMS:Creator' })} width={110} />
				<AgGridColumn field={'lastModificationTime'} headerName={intl.formatMessage({ id: 'WMS:LastModificationTime' })} width={160} type={'dateTimeColumn'} />
				<AgGridColumn field={'lastModifier'} headerName={intl.formatMessage({ id: 'WMS:LastModifier' })} flex={1} width={110} />
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
		</>
	);
};

export default InstructionPendRecordInfoPage;
export const routeProps = {
	name: '外部指令列表',
};