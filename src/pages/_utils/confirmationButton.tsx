import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';
import React from 'react';
const { confirm } = Modal;

const confirmationButton = (Submit) => (
    confirm({
        title: '确认提交吗?',
        icon: <ExclamationCircleFilled />,
        content: '请确保信息准确无误，确认正确无误后，请点击“确定”',
        onOk() {
            console.log('OK');
            Submit && Submit()
        },
        onCancel() {
            console.log('Cancel');
        },
    })
);

export default confirmationButton;