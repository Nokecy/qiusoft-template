import React from 'react';
import FormModal from './components/formModal';
import { useKeepAliveParams } from '@/hooks';

/**
 * 技术图纸更改单表单页
 * 路由: /appPdm/DocumentManagement/PartDocumentChangeOrder/form?id={id}
 * 用于创建和编辑技术图纸更改单
 */
const PartDocumentChangeOrderFormPage = () => {
	const query = useKeepAliveParams('/appPdm/DocumentManagement/PartDocumentChangeOrder/form');

	return <FormModal query={query} isNew={true} />;
};

export default PartDocumentChangeOrderFormPage;
export const routeProps = {
	name: '技术图纸更改表单',
};
