import ImportPublic from '@/components/importPublic';
import { useControllableValue, useRequest } from 'ahooks';
import { SelectProps, SelectValue } from 'antd/lib/select';
import React, { useEffect } from 'react';
/**
 * ImportPublic
 * @param props { valueField?:any, labelField?:any, api, placeholder}
 * @param ref
 * @returns
 */
const ImportPublicInForm = (props: any, ref) => {
	let { } = props;

	const [state, setState] = useControllableValue<SelectValue>(props);

	return (
		<span ref={ref}>
			<ImportPublic {...props} onAfterSubmit={(res) => {
				setState(res)
			}} />
		</span>
	);
};

export default React.forwardRef(ImportPublicInForm);
