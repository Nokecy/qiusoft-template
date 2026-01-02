import { ArrayTable } from '@nokecy/qc-ui';
import { useForm } from '@formily/react';
import { observer } from '@formily/reactive-react';
import React from 'react';
import BomItemProfile from './bomItemProfile';
import { ArrayBase } from '@formily/antd-v5';

const BomField = observer((props: any) => {
	const form = useForm();
	//@ts-ignore
	const index = ArrayTable.useIndex!();

	return <BomItemProfile index={index} itemId={form.getFieldState('saleOrderItems')?.value[index]?.id} />;
});

export default BomField;
