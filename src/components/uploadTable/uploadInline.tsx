import React, { } from 'react';
import { serverUrl } from 'umi'
import xlsx from "./image/excel.png"
import txt from "./image/text.png"
import pdf from "./image/pdf.png"
import png from "./image/png.png"
import docx from "./image/doc.png"
const AttachmentPanel = (props: any, ref) => {
    const { value } = props;

    

    const fileSuffixName = (fileName = "") => {
        fileName = fileName.toString();
        // 需要渲染的图片
        let imgPath = {
            // 图片的引入方式为require('@/image/txt.jpg')最佳
            txt,
            xlsx: xlsx,
            pdf,
            jpg: png,
            png: png,
            docx: docx,
            defaultIcon:txt,
        },
            i = fileName.lastIndexOf("."),
            key = fileName.substring(i + 1).toLowerCase();

        key = imgPath[key] ? imgPath[key] : imgPath.defaultIcon;

        return <img src={key} width={28} height={28} />;
    }

    return (
        <span ref={ref} >
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {value?.map(item => <div key={item.id} style={{ display: 'flex',  alignItems: 'center' }} onClick={(event) => {
                        event.stopPropagation();
                        event.preventDefault()
                    }}>
                        <a target={"_blank"} onClick={(event) => { event.stopPropagation(); }} href={`${serverUrl()}/api/attachmentManage/temp-blob/download/${item.id}`} title={item.name} rel="noreferrer">{fileSuffixName(item.name)}</a>
                        
                    </div>)}
                </div>
        </span>)
}
export default React.forwardRef(AttachmentPanel);