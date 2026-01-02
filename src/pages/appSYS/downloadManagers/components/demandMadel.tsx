import { Button, Modal } from "antd"
import React, { } from "react"
import { DownloadOutlined } from '@ant-design/icons';
import QRCode from "qrcode.react";

const DemandMadel = (props: any) => {

    const { changeFun, codeText } = props
    //下载二维码
    const handleDownLoadQRCode = () => {
        let Qr: any = document.getElementById('qrCode');
        let canvasUrl = Qr.toDataURL('image/png');
        let myBlob = dataURLtoBlob(canvasUrl);
        let myUrl = URL.createObjectURL(myBlob);
        downloadFile(myUrl, `${codeText}.png`);
    };

    const downloadFile = (url, name) => {
        let a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', name);
        a.setAttribute('target', '_blank');
        let clickEvent = document.createEvent('MouseEvents');
        clickEvent.initEvent('click', true, true);
        a.dispatchEvent(clickEvent);
    };

    const dataURLtoBlob = (dataurl) => {
        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    };
    return (
        <div>
            <Modal title='二维码' width={460} open={props.state} footer={
                <Button
                    type="primary"
                    icon={<DownloadOutlined />}
                    onClick={() => {
                        handleDownLoadQRCode()
                    }}
                >
                    下载二维码
                </Button>
            } onCancel={() => {
                if (changeFun) {
                    changeFun()
                }
            }}>

                <QRCode
                    id={'qrCode'}
                    style={{ marginLeft: '140px' }}
                    value={codeText || '-'}
                    level="H"
                />
            </Modal>
        </div>
    )
}

export default DemandMadel