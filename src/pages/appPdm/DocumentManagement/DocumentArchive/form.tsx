import React from 'react';
import FormModal from './components/formModal';
import { useKeepAliveParams } from '@/hooks';

export const routeProps = { name: '文档归档表单' };

const DocumentArchiveFormPage: React.FC = () => {
	const query = useKeepAliveParams('/appPdm/DocumentManagement/DocumentArchive/form');

	return <FormModal query={query} isNew={!query.id} />;
};

export default DocumentArchiveFormPage;
