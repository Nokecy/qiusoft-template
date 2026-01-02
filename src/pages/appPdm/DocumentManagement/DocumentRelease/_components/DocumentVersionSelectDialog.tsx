import { Modal, message } from 'antd';
import { AgGridPlus, GridPlusContext, useSchemeManager } from '@/components/agGrid';
import { useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef } from 'ag-grid-community';
import { DocumentGetVersionListAsync } from '@/services/pdm/Document';

interface DocumentVersionSelectDialogProps {
	visible: boolean;
	onCancel: () => void;
	onConfirm: (documents: any[]) => void;
}

/**
 * 文档版本选择对话框
 * 使用专门的文档版本接口 DocumentGetVersionListAsync
 */
const DocumentVersionSelectDialog: React.FC<DocumentVersionSelectDialogProps> = ({
	visible,
	onCancel,
	onConfirm,
}) => {
	const gridRef = useRef<AgGridReact>(null);
	const [selectedRows, setSelectedRows] = useState<any[]>([]);

	// 创建方案管理器
	const schemeManager = useSchemeManager({
		gridKey: 'document-version-select-dialog',
	});

	const columnDefs: ColDef[] = [
		{
			field: 'documentNumber',
			headerName: '文档编号',
			width: 150,
			checkboxSelection: true,
			headerCheckboxSelection: true,
		},
		{
			field: 'documentName',
			headerName: '文档名称',
			width: 200,
		},
		{
			field: 'version',
			headerName: '版本',
			width: 100,
		},
		{
			field: 'revision',
			headerName: '修订',
			width: 100,
		},
		{
			field: 'documentTypeName',
			headerName: '文档类型',
			width: 120,
		},
		{
			field: 'status',
			headerName: '状态',
			width: 100,
		},
		{
			field: 'creationTime',
			headerName: '创建时间',
			width: 160,
			type: 'dateTimeColumn',
		},
	];

	const handleConfirm = () => {
		if (selectedRows.length === 0) {
			message.warning('请至少选择一个文档版本');
			return;
		}

		onConfirm(selectedRows);
		onCancel();
	};

	return (
		<Modal
			title="选择文档版本"
			open={visible}
			onCancel={onCancel}
			onOk={handleConfirm}
			width={1200}
			destroyOnClose
			style={{ top: 20 }}
			bodyStyle={{ height: 600, padding: '16px' }}
		>
			<GridPlusContext.Provider value={schemeManager}>
				<div style={{ height: '100%' }}>
					<AgGridPlus
						gridRef={gridRef}
						gridKey="document-version-select-dialog"
						request={async (params: any) => {
							const data = await DocumentGetVersionListAsync({
								Filter: params?.filter,
								SkipCount: params?.skipCount,
								MaxResultCount: params?.maxResultCount,
								Sorting: params?.sorter,
							});
							return {
								success: true,
								data: data.items || [],
								total: data.totalCount || 0,
							};
						}}
						columnDefs={columnDefs}
						rowSelection="multiple"
						onSelectionChanged={(event: any) => {
							const selectedNodes = event.api.getSelectedNodes();
							setSelectedRows(selectedNodes.map((node: any) => node.data));
						}}
					/>
				</div>
			</GridPlusContext.Provider>
		</Modal>
	);
};

export default DocumentVersionSelectDialog;
