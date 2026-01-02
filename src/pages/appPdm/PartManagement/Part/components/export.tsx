import { Button, message } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import React from 'react';
import { downloadBlob } from '@/_utils';

interface ExportProps {
    categoryId?: string;
}

const Export: React.FC<ExportProps> = (props) => {
    const { categoryId } = props;

    const handleExport = () => {
        const hide = message.loading('正在导出，请稍候...', 0);

        const url = categoryId
            ? `/api/pdm/part/export?categoryId=${encodeURIComponent(categoryId)}`
            : '/api/pdm/part/export';

        downloadBlob(url, '物料导出.xlsx')
            .then(() => {
                message.success('导出成功');
            })
            .catch(() => {
                message.error('导出失败');
            })
            .finally(() => {
                hide();
            });
    };

    return (
        <Button icon={<ExportOutlined />} onClick={handleExport}>
            导出
        </Button>
    );
};

export default Export;
