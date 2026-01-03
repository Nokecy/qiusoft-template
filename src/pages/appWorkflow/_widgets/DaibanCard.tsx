import React, { useEffect, useState } from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import { iconfontUrl } from "../../../../config/defaultSettings";
import { BarChartOutlined } from '@ant-design/icons';
import { Button, Card, List } from 'antd';
import moment from 'dayjs';
import { WorkflowItemGetSelfList } from '@/services/workflow/WorkflowItem';
import { WorkflowDefinitionSettingGetByDefinitionId } from "@/services/workflow/WorkflowDefinitionSetting";
import snapShot from './images/daibanCard.png';
import { history, closeTab, dropByCacheKey } from "umi";
import { AnyKindOfDictionary } from 'lodash';

let IconFont = createFromIconfontCN({
    scriptUrl: iconfontUrl
});
const WaittingIconComForPlan = (props: any) => {
    const { text, icon } = props;
    const [data, setData] = useState([]);

    useEffect(() => {
        let filter = "(status = 0)";
        WorkflowItemGetSelfList({ Filter: filter }).then((res: any) => {
            setData(res.items)
        })
    }, [])

    const executeWorkflow = async (row) => {
        const setting: any = await WorkflowDefinitionSettingGetByDefinitionId({ definitionId: row.workflowDefinitionId });
        if (setting.isCustomForm) {
            dropByCacheKey(window.location.pathname)
            closeTab(`/appWorkflow/workflowForm/customerForm`);
            history.push(`/appWorkflow/workflowForm/customerForm?definitionId=${row.workflowDefinitionId}&workflowInstanceId=${row.workflowInstanceId}&formName=${setting.defaultForm}&correlationId=${row.correlationId}`);
        } else {
            dropByCacheKey(window.location.pathname)
            closeTab(setting?.defaultForm);
            history.push(`${setting.defaultForm!}?definitionId=${row.workflowDefinitionId}&correlationId=${row.correlationId}`);
        }
    }
    const endDate = moment().format('YYYY-MM-DD');
    const formatdate = (date) => {
        const startDate = moment(date).format('YYYY-MM-DD');
        let num = moment(endDate).diff(startDate, 'day')
        if (!num) {
            return '今天';
        }
        if (num > 365) {
            return '一年前';
        }
        if (num > 180) {
            return '半年前';
        }
        if (num > 90) {
            return '三个月前';
        }
        if (num > 30) {
            return '一个月前';
        }
        if (num > 7) {
            return '一周前';
        }
        return num + '天前'
    }

    return (<div>
        <Card bordered={false} style={{ height: "100%" }} bodyStyle={{ height: props.height - 55, padding: "0 24", overflowY: 'auto' }}
            title={<div style={{ display: 'flex', alignItems: 'center', maxWidth: 150, borderRadius: '5px', padding: 4 }}>
                <IconFont type={icon} style={{ marginRight: 0, fontSize: 24, color: '#1890ff' }} />
                <div style={{ fontSize: 14, fontWeight: '700', display: 'flex', alignItems: 'center', lineHeight: '12px', marginLeft: 8 }}>
                    <div> {text}</div>
                    <div style={{ marginLeft: 8, borderRadius: '50%', width: 20, lineHeight: '20px', background: '#ddd', color: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center', boxSizing: 'border-box' }}>{data.length}</div>
                </div>
            </div>}
            extra={null}>
            <List
                dataSource={data}
                renderItem={(item: any) => {
                    return (
                        <List.Item
                            key={item.id}
                            onClick={() => {
                            }}
                        >
                            <List.Item.Meta
                                title={<div style={{ display: 'flex', alignItems: "center", justifyContent: 'center' }}>
                                    <h3>{item.workflowName}</h3>
                                    <div style={{ paddingLeft: 16, fontSize: 12 }}>
                                        <span style={{ border: '1px solid #1890ff', padding: '2px 4px', margin: "0 8px", color: '#1890ff', background: 'rgb(24, 207, 255,0.3)' }}>{item.activityDisplayName}</span>
                                        <span style={{ border: '1px solid #1890ff', padding: '2px 4px', margin: "0 8px", color: '#1890ff', background: 'rgb(24, 207, 255,0.3)' }}>{formatdate(item.createTime)}</span>
                                    </div>
                                    <div style={{ flex: 1, fontSize: 12 }}>
                                        <span>{item.title}</span>
                                    </div>
                                </div>}
                                description={
                                    <div style={{ display: 'flex' }}>
                                        <div style={{ flex: 1 }}>
                                            提交时间:{moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}
                                            提交人:{item.assigneeName}
                                        </div>
                                        <Button type='primary' size='small' onClick={executeWorkflow.bind(null, item)}>办理</Button>
                                    </div>
                                }
                            />
                        </List.Item>
                    );
                }}
            />
        </Card>
    </div>


    );
};

const DaibanCard = (props: any) => {
    return (<WaittingIconComForPlan  {...props} text={"待办事宜"} icon={"icon-jinxiaocun"} />);
};
export default {
    name: 'DaibanCard',
    description: '待办事宜',
    tags: ['workflow'],
    component: DaibanCard,
    configComponent: null,
    maxLength: 1,
    snapShot,
    icon: <BarChartOutlined />,
    iconBackground: '#f00',
    size: {
        defaultWidth: 24,
        defaultHeight: 8,
        maxWidth: 12,
        maxHeight: 16,
        minWidth: 1,
        minHeight: 1,
    },
} 
