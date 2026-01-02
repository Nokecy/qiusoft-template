import React from "react";
import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
const { confirm } = Modal;

const DeleteConfirm = (props: any) => {
    const { onConfirm, title, content, children } = props;

    const showPromiseConfirm = (e: any) => {
        console.log('🚀 DeleteConfirm showPromiseConfirm 被点击', e);
        // 如果onConfirm需要事件参数,在这里传递
        confirm({
            title: title,
            icon: <ExclamationCircleFilled />,
            content: `危险操作,为防止误触发,${title}`,
            onOk() {
                console.log('🚀 DeleteConfirm Modal 确定按钮被点击');
                return new Promise((resolve, reject) => {
                    // 将原始点击事件传递给onConfirm回调
                    console.log('🚀 准备调用 onConfirm 回调函数');
                    const result = onConfirm(e);
                    console.log('🚀 onConfirm 返回结果:', result);
                    // 如果返回的是Promise,等待完成
                    if (result && typeof result.then === 'function') {
                        result.then(resolve).catch((error: any) => {
                            console.error('Oops errors!', error);
                            reject();
                        });
                    } else {
                        // 如果不是Promise,直接resolve
                        resolve(result);
                    }
                }).catch(() => console.log('Oops errors!'));
            },
            onCancel() {
                console.log('🚀 DeleteConfirm Modal 取消按钮被点击');
            },
        });
    };

    return (
        <span onClick={showPromiseConfirm}>{children}</span>
    );
}

export default DeleteConfirm
