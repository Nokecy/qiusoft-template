import { Button, Space, message, Modal } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Access, useAccess } from 'umi';
import DeleteConfirm from '@/components/deleteConfirm';
import {
	DocumentReleaseAddRecipientAsync,
	DocumentReleaseRemoveRecipientAsync,
} from '@/services/pdm/DocumentRelease';
import { DocumentReleasePermissions } from '../_permissions';

interface RecipientManagementProps {
	releaseId: string;
	onRefresh: () => void;
}

const RecipientManagement: React.FC<RecipientManagementProps> = ({ releaseId, onRefresh }) => {
	const access = useAccess();
	const [loading, setLoading] = useState(false);

	// 添加接收人
	const handleAddRecipient = async () => {
		// TODO: 弹出用户选择对话框
		// 这里需要集成用户选择组件
		message.info('请集成用户选择组件');
	};

	// 删除接收人
	const handleRemoveRecipient = async (recipientId: string) => {
		try {
			setLoading(true);
			await DocumentReleaseRemoveRecipientAsync({ id: releaseId, recipientId });
			message.success('删除成功');
			onRefresh();
		} catch (error) {
			console.error('删除失败:', error);
			message.error('删除失败');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Space>
			<Access accessible={!!access[DocumentReleasePermissions.AddRecipient]}>
				<Button
					type="primary"
					size="small"
					icon={<PlusOutlined />}
					onClick={handleAddRecipient}
					loading={loading}
				>
					添加接收人
				</Button>
			</Access>
		</Space>
	);
};

export default RecipientManagement;
