import React, { useState } from 'react';
import ProCard from '@ant-design/pro-card';

const Card = (props: any) => {
	return <ProCard headerBordered={false} collapsible {...props} headStyle={{ paddingTop: 8, paddingBottom: 8, ...props.headStyle }} />;
};

export default Card;
