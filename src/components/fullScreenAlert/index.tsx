import React, { useState, useRef, useEffect } from 'react';
import { useThrottleEffect } from 'ahooks';
import './index.less';

/**
 * 全部闪烁警告
 * @param props
 * @returns
 */
const FullScreenAlert = (props: any) => {
	const { active: activeProps, type, onChange } = props;
	const clearRef = useRef<any>();
	const [active, setActive] = useState(activeProps ? activeProps : false);

	useEffect(() => {
		if (clearRef.current) {
			clearTimeout(clearRef.current);
		}
		if (activeProps) {
			setActive(activeProps);

			clearRef.current = setTimeout(() => {
				setActive(false);

				onChange && onChange(false);
			}, 1000 * 3);
		}
	});

	return <div className={active ? `alertOverlay alert-active ${type == 'error' ? 'errorOverlay' : ''}` : ''} {...props} />;
};

export default FullScreenAlert;
