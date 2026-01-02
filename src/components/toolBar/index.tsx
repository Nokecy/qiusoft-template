import React, { useState } from 'react';
import { Affix, Space } from 'antd';
import './index.less';

const ToolBar = (props: any) => {
	const { children, className, extra, style, renderContent, getTargetContainer, ...restProps } = props;
	return (
		<Affix offsetTop={2} style={style} offsetBottom={2} onChange={affixed => console.log(affixed)} target={getTargetContainer}>
			<div className='antd-tool-bar'>
				<div className={`antd-tool-bar-left`.trim()}>
					<Space>{extra}</Space>
				</div>
				<div className={`antd-tool-bar-right`.trim()}>
					<Space>{children}</Space>
				</div>
			</div>
		</Affix>
	);
};

export default ToolBar;
