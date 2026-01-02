import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { useRef } from 'react';
import { useIntl } from 'umi';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { DocumentReleaseGetDailySummaryListAsync } from '@/services/pdm/DocumentRelease';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

export const routeProps = {
	name: '文档每日发放汇总',
};

const DocumentReleaseDailySummaryPage: React.FC = () => {
	const gridRef = useRef<GridRef>();
	const intl = useIntl();

	return (
		<AgGridPlus
			gridRef={gridRef}
			headerTitle="文档每日发放汇总列表"
			gridKey="appPdm.DocumentManagement.DocumentRelease.DailySummary"
			request={async (params?: { pageSize: number; current: number; [key: string]: any }, _sort, filter) => {
				try {
					// 如果选择了发放日期，将单个日期同时传给起始和结束参数，实现查询单日数据
					// DatePicker 返回的是 dayjs 对象，需要格式化为字符串
					const releasedDate = filter?.ReleasedDate
						? dayjs.isDayjs(filter.ReleasedDate)
							? filter.ReleasedDate.format('YYYY-MM-DD')
							: filter.ReleasedDate
						: undefined;
					const releasedDateFrom = releasedDate ? `${releasedDate} 00:00:00` : undefined;
					const releasedDateTo = releasedDate ? `${releasedDate} 23:59:59` : undefined;
					const data = await DocumentReleaseGetDailySummaryListAsync({
						DocumentNumber: filter?.documentNumber,
						DocumentName: filter?.documentName,
						ReleaseVersion: filter?.releaseVersion,
						IsFirstRelease: filter?.isFirstRelease,
						RecallVersion: filter?.recallVersion,
						SkipCount: params?.skipCount,
						MaxResultCount: params?.maxResultCount,
						Sorting: params?.sorter,
						ReleasedDateFrom: releasedDateFrom,
						ReleasedDateTo: releasedDateTo,
					} as any);
					return { success: true, data: data.items || [], total: data.totalCount || 0 } as any;
				} catch (error) {
					return { success: false, data: [], total: 0 } as any;
				}
			}}
		>
			<AgGridColumn
				field="ReleasedDate"
				headerName="发放日期"
				width={200}
				hideInTable={true}
				searchComponent={DatePicker}
				initialValue={dayjs()}
				formItemProps={{
					tooltip: '选择要查询的发放日期',
				}}
			/>
			<AgGridColumn field="documentNumber" headerName="文档编码" width={150} />
			<AgGridColumn field="documentName" headerName="文档名称" width={200} />
			<AgGridColumn
				field="releaseVersion"
				headerName="发放版本"
				width={120}
				hideInSearch={true}
			/>
			<AgGridColumn
				field="isFirstRelease"
				headerName="首发"
				width={80}
				hideInSearch={true}
				type="booleanColumn"
			/>
			<AgGridColumn
				field="recallVersion"
				headerName="回收版本"
				width={120}
				hideInSearch={true}
			/>
			<AgGridColumn
				field="copies"
				headerName="文件份数"
				width={100}
				hideInSearch={true}
			/>
			<AgGridColumn
				field="releaseNumber"
				headerName="发文号"
				width={150}
				hideInSearch={true}
			/>
			<AgGridColumn
				field="releasedAt"
				headerName="发放时间"
				width={160}
				hideInSearch={true}
				type="dateTimeColumn"
				initialSort="desc"
			/>
			<AgGridColumn
				field="remarks"
				headerName="备注"
				width={200}
				hideInSearch={true}
			/>
		</AgGridPlus>
	);
};

export default DocumentReleaseDailySummaryPage;
