import { Button, message } from 'antd';
import React from 'react';
import { Access, useAccess, useIntl, useMutation } from 'umi';
import { PickTaskItemReleasePickTaskAsync } from '@/services/wms/PickTaskItem';

/**
 * 下架任务释放按钮
 * @param props
 * @returns
 */
const PickTaskReleaseBtn = (props: any) => {
	const { releasePickTaskPermissionName, pickTaskItem, onSubmited } = props;
	const intl = useIntl();
	const access = useAccess();

	const pickTaskRelease = (body: string[]) => {
		return PickTaskItemReleasePickTaskAsync(body);
	};

	const { isLoading, mutateAsync: releasePickTask } = useMutation(pickTaskRelease);

	const release = (id: any) => {
		const hide = message.loading('正在操作,请稍后', 0);
		releasePickTask([id])
			.then(() => {
				onSubmited && onSubmited();
			})
			.finally(() => {
				hide();
			});
	};

	return (
		<Access accessible={access[releasePickTaskPermissionName] && pickTaskItem?.pickItemStatus < 15}>
			<Button
				type={'primary'}
				loading={isLoading}
				onClick={() => {
					release(pickTaskItem.id);
				}}
			>
				释放预占
			</Button>
		</Access>
	);
};

export default PickTaskReleaseBtn;
