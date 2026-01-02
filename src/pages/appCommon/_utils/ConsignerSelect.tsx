import React from 'react';
import { Select } from 'antd';

// 临时的ConsignerSelect组件，用于解决编译错误
const ConsignerSelect: React.FC<any> = (props) => {
	return <Select {...props} options={[]} placeholder="请选择" />;
};

export default ConsignerSelect;