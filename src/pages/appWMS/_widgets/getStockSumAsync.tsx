
import React, { useEffect, useState } from 'react';
import { BarChartOutlined } from '@ant-design/icons';
import snapShot from '@/pages/appWMS/_widgets/images/total.png';
import { createFromIconfontCN } from '@ant-design/icons';
import { iconfontUrl } from "../../../../config/defaultSettings";
import { StockGetStockSumAsync } from "@/services/wms/Stock";
import { history, } from "umi";
let IconFont = createFromIconfontCN({
    scriptUrl: iconfontUrl
});
const colorRgb = function (str) {
    // 16进制颜色值的正则
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    // 把颜色值变成小写
    let color = str.toLowerCase();
    if (reg.test(color)) {
        // 如果只有三位的值，需变成六位，如：#fff => #ffffff
        if (color.length === 4) {
            let colorNew = "#";
            for (var i = 1; i < 4; i += 1) {
                colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
            }
            color = colorNew;
        }
        // 处理六位的颜色值，转为RGB
        let colorChange: any = [];
        for (var i = 1; i < 7; i += 2) {
            colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
        }
        return "RGB(" + colorChange.join(",") + ")";
    } else {
        return color;
    }
}
const colorToBack = (str, num) => {
    let arr = str.split(",");
    arr[1] = arr[1] * 1 + num;
    return arr.join(",")
}
const IconCom = (props: any) => {
    const { background, text, icon, value, onClick } = props
    return (<div onClick={onClick} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: "space-between", background, color: '#fff', borderRadius: '5px', padding: 16, margin: 8, cursor: 'pointer' }}>
        <div style={{ width: '50px', height: '50px', background: colorToBack(colorRgb(background), 20), borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconFont type={icon} style={{ marginRight: 0, fontSize: 36, flex: 1 }} />
        </div>
        <div style={{ fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', lineHeight: '12px', marginLeft: 8 }}>
            <span style={{ fontSize: 14, paddingTop: 8 }}>{text}</span>
            <span style={{ fontSize: 14, lineHeight: "100%", marginTop: 8 }}>{value || 0}</span>
        </div>
    </div>
    );
};
const DaibanTag = (props: any) => {
    const [data, setData]: any = useState(undefined)
    useEffect(() => {
        StockGetStockSumAsync({}).then((res: any) => {
            setData(res)
        })
    }, [])

    return (<div style={{ display: 'flex', background: '#fff', height: '100%', justifyContent: 'center' }}>
        <IconCom background={"#002e9b"} value={data?.codeSumQuantity} text={"编码总数"} icon={"icon-jishuwendang"} onClick={() => {
            // history.push(`/appWorkflow/workflowSelf/doing`);
        }} />
        <IconCom background={"#ff770f"} value={data?.stockSumQuantity} text={"库存总数"} icon={"icon-jishuwendang"} onClick={() => {
        }} />
        <IconCom background={"#1890ff"} value={data?.newCodeSumQuantity} text={"较昨日新增编码数量"} icon={"icon-jishuwendang"} onClick={() => {
            // history.push(`/appWorkflow/workflowSelf/done`);
        }} />
        <IconCom background={"#fac03d"} value={data?.newStockSumQuantity} text={"较昨日新增库存数量"} icon={"icon-jishuwendang"} onClick={() => {
            // history.push(`/appWorkflow/workflowSelf/mine`);
        }} />

    </div>);
};

export default {
    name: 'GetStockSumAsync',
    description: '库存数量统计',
    tags: ['WMS'],
    component: DaibanTag,
    configComponent: null,
    maxLength: 1,
    snapShot,
    icon: <BarChartOutlined />,
    iconBackground: '#f00',
    size: {
        defaultWidth: 12,
        defaultHeight: 2,
        maxWidth: 12,
        maxHeight: 16,
        minWidth: 12,
        minHeight: 3,
    },
} 