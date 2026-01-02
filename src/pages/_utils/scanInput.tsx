import { Input } from '@formily/antd-v5';
import { useControllableValue, useSafeState, useInterval } from 'ahooks';
import { debounce } from 'lodash';
import React, { useMemo, useState } from 'react';

const ScanInput = (props: any) => {
	const { onPressEnter: onPressEnterProp } = props;
	const [state, setState] = useControllableValue<any>(props);

	const onKeyDown = e => {
		if (e.ctrlKey && e.keyCode === 67) {
			// Ctrl+C
			e.preventDefault();
		}

		if (e.ctrlKey && e.keyCode === 86) {
			// Ctrl+V
			e.preventDefault();
		}
	};

	const onContextMenu = event => {
		event.preventDefault();
	};

	const onPressEnter = () => {
		onPressEnterProp && onPressEnterProp(state);

		setState(undefined);
	};

	return <Input {...props} onKeyDown={onKeyDown} onContextMenu={onContextMenu} onPressEnter={onPressEnter} value={state} />;
};

export default ScanInput;
