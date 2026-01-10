import { Modal, Table, Button, Space } from "antd";
import React from "react";
import type { ColumnsType } from 'antd/es/table';

let modalInstance: any = null;

// 创建错误展示的 Modal
const showErrorModal = (errors: any[]) => {
    if (modalInstance) {
        modalInstance.destroy(); // 先销毁旧的，防止重复弹窗
    }

    // 智能检测：判断是否有任何错误包含 members 字段（向后兼容）
    const hasMembersField = errors.some(error => error.members && error.members.length > 0);

    // 为表格添加序号
    const dataSource = errors.map((error, index) => ({
        ...error,
        key: index,
        index: index + 1,
    }));

    // 动态构建列定义
    const columns: ColumnsType<any> = [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            width: 80,
            align: 'center',
        },
        {
            title: '错误信息',
            dataIndex: 'message',
            key: 'message',
            ellipsis: {
                showTitle: true,
            },
            width: hasMembersField ? '60%' : '100%',
        },
    ];

    // 只有当存在 members 信息时才添加 "相关字段" 列
    if (hasMembersField) {
        columns.push({
            title: '相关字段',
            dataIndex: 'members',
            key: 'members',
            width: '40%',
            render: (members: string[]) => members ? members.join(', ') : '',
        });
    }

    // 导出为文本文件（简化版，不依赖外部库）
    const handleExport = () => {
        const header = hasMembersField
            ? '序号\t错误信息\t相关字段\n'
            : '序号\t错误信息\n';

        const rows = dataSource.map(item => {
            const fields = [
                item.index,
                item.message,
            ];
            if (hasMembersField) {
                fields.push(item.members ? item.members.join(', ') : '');
            }
            return fields.join('\t');
        }).join('\n');

        const content = header + rows;
        const blob = new Blob(['\ufeff' + content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `导入错误_${new Date().toLocaleString('zh-CN').replace(/[/:]/g, '-')}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    modalInstance = Modal.error({
        title: (
            <Space>
                <span>验证错误 (共 {errors.length} 条)</span>
                <Button
                    type="primary"
                    size="small"
                    onClick={handleExport}
                    style={{ marginLeft: 'auto' }}
                >
                    导出错误列表
                </Button>
            </Space>
        ),
        width: 1000,
        icon: null,
        content: (
            <div style={{ marginTop: 16 }}>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `共 ${total} 条`,
                    }}
                    scroll={{ y: 400 }}
                    size="small"
                />
            </div>
        ),
        okText: '关闭',
        onOk: () => {
            modalInstance.destroy();
        },
    });
};


export default showErrorModal;
