import { Button,   message } from 'antd';
import React from 'react';
import { Access, useAccess, useIntl, useMutation } from 'umi';
// import { PickTaskItemDeleteAsync } from '@/services/wms/PickTaskItem';
import DeleteConfirm from "@/components/deleteConfirm";
/**
 * 下架任务手动分配按钮
 * @param props
 * @returns
 */
const PickTaskDeleteBtn = (props: any) => {
	const { deletePickTaskPermissionName, outInstructionOrder, pickTaskItem, onSubmited } = props;
	const intl = useIntl();
	const access = useAccess();

	const pickTaskDelete = (body: any) => {
		// return PickTaskItemDeleteAsync(body);
	};

	const { isLoading, mutateAsync: deletePickTask } = useMutation(pickTaskDelete);

	const handleDelete = (id: any) => {
		const hide = message.loading('正在操作,请稍后', 0);
		deletePickTask({ ids: id })
			.then(() => {
				onSubmited && onSubmited();
			})
			.finally(() => {
				hide();
			});
	};

	return (
		<Access accessible={access[deletePickTaskPermissionName] && pickTaskItem?.pickItemStatus <= 10}>
			<DeleteConfirm title='确定删除?' onConfirm={() => handleDelete([pickTaskItem.id])}>
				<Button loading={isLoading} type={'primary'} danger title={intl.formatMessage({ id: 'AbpUi:Delete' })}>
					删除
				</Button>
			</DeleteConfirm>
		</Access>
	);
};

export default PickTaskDeleteBtn;
