import React, { useEffect, useState } from 'react';
import { WorkflowItemGetUserWorkItemWaitCount } from '@/services/workflow/WorkflowItem';
import { Outlet, history, useSearchParams } from 'umi'
import { Badge, Layout, Menu } from 'antd';
const { Content, Sider } = Layout;

export default function CorrelationEntityLayout() {
    const [items, setItems] = useState<any>([])
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        WorkflowItemGetUserWorkItemWaitCount().then((res) => {
            const workflowItems = res.map(x => {
                return {
                    key: x.workflowName, label:
                        <div style={{ display: "flex", flex: 1, justifyContent: "space-between" }}>
                            <div>{x.workflowDescription ?? x.workflowName}</div>
                            <Badge count={x.count} size='small' />
                        </div>
                }
            })
            setItems(workflowItems);
        });
    }, [])

    const onItemClick = ({ item, key, keyPath, domEvent }) => {
        history.push(`/appWorkflow/workflowSelf/correlationEntity/correlationList?workflowName=${key}`);
    }

    return (
        <Layout hasSider style={{ height: "100%" }}>
            <Sider theme={"light"} width={220} style={{ height: "100%" }} >
                <div className="demo-logo-vertical" />
                <Menu mode="inline" items={items} onClick={onItemClick} activeKey={searchParams.get("workflowName") || undefined} />
            </Sider>
            <Layout style={{ height: "100%" }}>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}
