import { AgGridPlus } from "@nokecy/qc-ui";
import { Modal, List, Button } from "antd";
import React, { useRef } from "react";
import { createRoot } from "react-dom/client";

let modalInstance: any = null;

// 创建错误展示的 Modal
const showErrorModal = (errors: any[]) => {
    if (modalInstance) {
        modalInstance.destroy(); // 先销毁旧的，防止重复弹窗
    }

    const div = document.createElement("div");
    document.body.appendChild(div);
    const root = createRoot(div);

    modalInstance = Modal.error({
        title: "表单错误",
        width: 900,
        content: (
            <AgGridPlus
                dataSource={errors}
                search={false}
                columnDefs={[
                    {
                        headerName: "错误信息",
                        field: "message",
                        flex: 1,
                    },
                ]}

                toolBarRender={(gridApi, filter) => {
                    return [
                        <Button type="primary" onClick={() => {
                            gridApi?.exportDataAsExcel();
                        }}>导出</Button>
                    ];
                }}
            >
            </AgGridPlus>
        ),
        onOk: () => {
            modalInstance.destroy();
            root.unmount();
            document.body.removeChild(div);
        },
    });
};


export default showErrorModal;
