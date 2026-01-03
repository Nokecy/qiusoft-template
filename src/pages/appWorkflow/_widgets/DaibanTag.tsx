import React, { useEffect, useState } from 'react';
import { BarChartOutlined } from '@ant-design/icons';
import snapShot from './images/daibanTag.png';
import { createFromIconfontCN } from '@ant-design/icons';
import { iconfontUrl } from "../../../../config/defaultSettings";
import { WorkflowItemGetSelfItemCount } from "@/services/workflow/WorkflowItem";
import { history, closeTab, dropByCacheKey } from "umi";
let IconFont = createFromIconfontCN({
    scriptUrl: iconfontUrl
});
const IconCom = (props: any) => {
    const { background, text, icon, value, onClick } = props
    return (<div onClick={onClick} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background, color: '#fff', borderRadius: '5px', padding: 16, margin: 8, cursor: 'pointer' }}>
        <IconFont type={icon} style={{ marginRight: 0, fontSize: 36 }} />
        <div style={{ fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', lineHeight: '12px', marginLeft: 8 }}>
            <span style={{ fontSize: 36, lineHeight: "100%" }}>{value || 0}</span>
            <span style={{ fontSize: 14, paddingTop: 8 }}>{text}</span>
        </div>
    </div>
    );
};
const DaibanTag = (props: any) => {
    const [data, setData]: any = useState(undefined)
    useEffect(() => {
        WorkflowItemGetSelfItemCount({}).then((res: any) => {
            setData(res)
        })
    }, [])
    return (<div style={{ display: 'flex', background: '#fff', height: '100%', justifyContent: 'center' }}>
        <IconCom background={"#1890ff"} value={data?.pendingTaskCount} text={"我的待办"} icon={"icon-daibanliucheng"} onClick={() => {
            history.push(`/appWorkflow/workflowSelf/doing`);
        }} />
        <IconCom background={"#9F0dC7"} value={data?.copyInstanceCount} text={"抄送给我的流程"} icon={"icon-qiandinghetong"} onClick={() => {
            history.push(`/appWorkflow/workflowSelf/copyToUser`);
        }} />
        <IconCom background={"#58bc58"} value={data?.finishTaskCount} text={"我的完成"} icon={"icon-yiwanchengliucheng"} onClick={() => {
            history.push(`/appWorkflow/workflowSelf/done`);
        }} />
        <IconCom background={"#f60"} value={data?.startInstanceCount} text={"我发起的流程"} icon={"icon-faqiliucheng"} onClick={() => {
            history.push(`/appWorkflow/workflowSelf/mine`);
        }} />
    </div>);
};

export default {
    name: 'DaibanTag',
    description: '待办事宜',
    tags: ['workflow'],
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