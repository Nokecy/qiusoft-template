import { ColDef } from 'ag-grid-community';
import { documentReleaseStatusEnum } from './enums';

export const columnDefs: ColDef[] = [
	{
		field: 'releaseNumber',
		headerName: '发文号',
		width: 150,
		pinned: 'left',
		cellRenderer: 'AgTextBtnCellRenderer',
	},
	{
		field: 'title',
		headerName: '标题',
		width: 200,
	},
	{
		field: 'description',
		headerName: '说明',
		width: 250,
		hideInSearch: true,
	},
	{
		field: 'approverCode',
		headerName: '审批人编码',
		width: 120,
	},
	{
		field: 'approverName',
		headerName: '审批人姓名',
		width: 120,
	},
	{
		field: 'status',
		headerName: '状态',
		width: 100,
		valueEnum: documentReleaseStatusEnum,
	},
	{
		field: 'approvedAt',
		headerName: '审批时间',
		width: 160,
		valueType: 'dateTime',
		hideInSearch: true,
	},
	{
		field: 'releasedAt',
		headerName: '发放时间',
		width: 160,
		valueType: 'dateTime',
		hideInSearch: true,
	},
	{
		field: 'closedAt',
		headerName: '关闭时间',
		width: 160,
		valueType: 'dateTime',
		hideInSearch: true,
	},
	{
		field: 'creationTime',
		headerName: '创建时间',
		width: 160,
		valueType: 'dateTime',
		hideInSearch: true,
		initialSort: 'desc',
	},
];
