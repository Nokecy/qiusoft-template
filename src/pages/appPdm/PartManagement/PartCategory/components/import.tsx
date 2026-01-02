import ImportPublic from '@/components/importPublic';
import React from 'react';

const Import = (props: any) => {
    const { onAfterSubmit } = props;
    return (
        <ImportPublic
            title="物料分类"
            downUrl="/api/pdm/category-import/import-template"
            uploadUrl="/api/pdm/category-import/import"
            onAfterSubmit={onAfterSubmit}
        />
    );
};

export default Import;
