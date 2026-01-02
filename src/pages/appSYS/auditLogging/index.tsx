import { AgGridPlus } from "@/components/agGrid";
import { AuditLoggingGetListAsync, AuditLoggingGetAsync } from '@/services/openApi/AuditLogging';
import { EyeOutlined } from "@ant-design/icons";
import { Space, Tag, Drawer, Button, Descriptions, Tabs } from "antd";
import React, { useRef, useMemo, useState } from "react";
import { useIntl } from "umi";
import { GridRef } from "@nokecy/qc-ui/dist/esm/ag-grid-plus/interface";
import { ICellRendererParams } from "ag-grid-community";
import dayjs from 'dayjs';

const { TabPane } = Tabs;

// HTTP方法枚举
const httpMethodEnum = [
    { label: "GET", value: "GET", color: '#52c41a' },
    { label: "POST", value: "POST", color: '#1890ff' },
    { label: "PUT", value: "PUT", color: '#faad14' },
    { label: "DELETE", value: "DELETE", color: '#f5222d' },
    { label: "PATCH", value: "PATCH", color: '#722ed1' },
];

// 状态码类型
const getStatusColor = (code?: number) => {
    if (!code) return 'default';
    if (code >= 200 && code < 300) return 'success';
    if (code >= 300 && code < 400) return 'processing';
    if (code >= 400 && code < 500) return 'warning';
    if (code >= 500) return 'error';
    return 'default';
};

// 详情抽屉组件
const DetailDrawer = ({ id, open, onClose }: { id?: string, open: boolean, onClose: () => void }) => {
    const [loading, setLoading] = useState(false);
    const [detail, setDetail] = useState<API.BurnAbpSystemHostAuditLoggingsDtosAuditLogDetailDto>();

    React.useEffect(() => {
        if (open && id) {
            setLoading(true);
            AuditLoggingGetAsync({ id }).then(res => {
                setDetail(res);
            }).finally(() => {
                setLoading(false);
            });
        }
    }, [open, id]);

    return (
        <Drawer
            title="审计日志详情"
            placement="right"
            width={800}
            open={open}
            onClose={onClose}
            loading={loading}
        >
            {detail && (
                <Tabs defaultActiveKey="basic">
                    <TabPane tab="基本信息" key="basic">
                        <Descriptions column={2} bordered size="small">
                            <Descriptions.Item label="应用名称" span={2}>{detail.applicationName}</Descriptions.Item>
                            <Descriptions.Item label="用户名">{detail.userName}</Descriptions.Item>
                            <Descriptions.Item label="用户ID">{detail.userId}</Descriptions.Item>
                            <Descriptions.Item label="租户名称">{detail.tenantName}</Descriptions.Item>
                            <Descriptions.Item label="租户ID">{detail.tenantId}</Descriptions.Item>
                            <Descriptions.Item label="客户端名称">{detail.clientName}</Descriptions.Item>
                            <Descriptions.Item label="客户端ID">{detail.clientId}</Descriptions.Item>
                            <Descriptions.Item label="客户端IP">{detail.clientIpAddress}</Descriptions.Item>
                            <Descriptions.Item label="关联ID">{detail.correlationId}</Descriptions.Item>
                            <Descriptions.Item label="浏览器信息" span={2}>{detail.browserInfo}</Descriptions.Item>
                            <Descriptions.Item label="HTTP方法">{detail.httpMethod}</Descriptions.Item>
                            <Descriptions.Item label="状态码">
                                <Tag color={getStatusColor(detail.httpStatusCode)}>{detail.httpStatusCode}</Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="URL" span={2}>{detail.url}</Descriptions.Item>
                            <Descriptions.Item label="执行时间">{dayjs(detail.executionTime).format('YYYY-MM-DD HH:mm')}</Descriptions.Item>
                            <Descriptions.Item label="执行时长">{detail.executionDuration} ms</Descriptions.Item>
                            <Descriptions.Item label="是否异常">
                                <Tag color={detail.hasException ? 'error' : 'success'}>
                                    {detail.hasException ? '是' : '否'}
                                </Tag>
                            </Descriptions.Item>
                            {detail.exceptions && (
                                <Descriptions.Item label="异常信息" span={2}>
                                    <pre style={{ whiteSpace: 'pre-wrap', maxHeight: 300, overflow: 'auto' }}>
                                        {detail.exceptions}
                                    </pre>
                                </Descriptions.Item>
                            )}
                            {detail.comments && (
                                <Descriptions.Item label="备注" span={2}>{detail.comments}</Descriptions.Item>
                            )}
                        </Descriptions>
                    </TabPane>
                    {detail.actions && detail.actions.length > 0 && (
                        <TabPane tab={`Actions (${detail.actions.length})`} key="actions">
                            {detail.actions.map((action, index) => (
                                <Descriptions key={index} column={2} bordered size="small" style={{ marginBottom: 16 }}>
                                    <Descriptions.Item label="服务名称" span={2}>{action.serviceName}</Descriptions.Item>
                                    <Descriptions.Item label="方法名称" span={2}>{action.methodName}</Descriptions.Item>
                                    <Descriptions.Item label="执行时间">{dayjs(action.executionTime).format('YYYY-MM-DD HH:mm')}</Descriptions.Item>
                                    <Descriptions.Item label="执行时长">{action.executionDuration} ms</Descriptions.Item>
                                    {action.parameters && (
                                        <Descriptions.Item label="参数" span={2}>
                                            <pre style={{ whiteSpace: 'pre-wrap', maxHeight: 200, overflow: 'auto' }}>
                                                {action.parameters}
                                            </pre>
                                        </Descriptions.Item>
                                    )}
                                </Descriptions>
                            ))}
                        </TabPane>
                    )}
                    {detail.entityChanges && detail.entityChanges.length > 0 && (
                        <TabPane tab={`实体变更 (${detail.entityChanges.length})`} key="entityChanges">
                            {detail.entityChanges.map((change, index) => (
                                <Descriptions key={index} column={2} bordered size="small" style={{ marginBottom: 16 }}>
                                    <Descriptions.Item label="实体类型" span={2}>{change.entityTypeFullName}</Descriptions.Item>
                                    <Descriptions.Item label="实体ID">{change.entityId}</Descriptions.Item>
                                    <Descriptions.Item label="变更类型">
                                        <Tag>{change.changeTypeText}</Tag>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="变更时间" span={2}>
                                        {dayjs(change.changeTime).format('YYYY-MM-DD HH:mm')}
                                    </Descriptions.Item>
                                    {change.propertyChanges && change.propertyChanges.length > 0 && (
                                        <Descriptions.Item label="属性变更" span={2}>
                                            {change.propertyChanges.map((prop, pIndex) => (
                                                <div key={pIndex} style={{ marginBottom: 8 }}>
                                                    <strong>{prop.propertyName}:</strong> {prop.originalValue} → {prop.newValue}
                                                </div>
                                            ))}
                                        </Descriptions.Item>
                                    )}
                                </Descriptions>
                            ))}
                        </TabPane>
                    )}
                </Tabs>
            )}
        </Drawer>
    );
};

// 操作列组件
const Options = (props: ICellRendererParams & { onRefresh: () => void }) => {
    const { data } = props;
    const [detailOpen, setDetailOpen] = useState(false);

    return (
        <>
            <Space>
                <Button
                    icon={<EyeOutlined />}
                    type="link"
                    size="small"
                    onClick={() => setDetailOpen(true)}
                >
                    详情
                </Button>
            </Space>
            <DetailDrawer
                id={data.id}
                open={detailOpen}
                onClose={() => setDetailOpen(false)}
            />
        </>
    );
};

const AuditLoggingPage = () => {
    const intl = useIntl();
    const gridRef = useRef<GridRef>();

    const onRefresh = () => {
        gridRef.current?.onRefresh();
    };

    const columnDefs: any = useMemo(() => [
        {
            headerName: "执行时间",
            field: "executionTime",
            width: 180,
            hideInTable: true,
            searchComponent: 'DateRangePicker',
        },
        {
            headerName: "执行时间",
            field: "executionTime",
            width: 180,
            cellRenderer: ({ value }: any) => value ? dayjs(value).format('YYYY-MM-DD HH:mm') : '',
            initialSort: 'desc',
            hideInSearch: true,
        },
        {
            headerName: "应用名称",
            field: "applicationName",
            width: 150,
        },
        {
            headerName: "用户名",
            field: "userName",
            width: 120,
        },
        {
            headerName: "客户端IP",
            field: "clientIpAddress",
            width: 140,
        },
        {
            headerName: "HTTP方法",
            field: "httpMethod",
            width: 120,
            valueEnum: httpMethodEnum,
            cellRenderer: (params: any) => {
                const method = httpMethodEnum.find(m => m.value === params.value);
                return method ? <Tag color={method.color}>{method.label}</Tag> : params.value;
            }
        },
        {
            headerName: "状态码",
            field: "httpStatusCode",
            width: 100,
            hideInSearch: true,
            cellRenderer: (params: any) => {
                return <Tag color={getStatusColor(params.value)}>{params.value}</Tag>;
            }
        },
        {
            headerName: "URL",
            field: "url",
            flex: 1,
            minWidth: 200,
        },
        {
            headerName: "执行时长(ms)",
            field: "executionDuration",
            width: 130,
            hideInSearch: true,
        },
        {
            headerName: "是否异常",
            field: "hasException",
            width: 100,
            valueEnum: [
                { label: "是", value: true, color: '#f5222d' },
                { label: "否", value: false, color: '#52c41a' }
            ],
            cellRenderer: (params: any) => {
                return <Tag color={params.value ? 'error' : 'success'}>{params.value ? '是' : '否'}</Tag>;
            }
        },
        {
            headerName: intl.formatMessage({ id: "AbpUi:Actions" }),
            field: "action",
            width: 100,
            pinned: 'right',
            hideInSearch: true,
            cellRenderer: (props: any) => <Options {...props} />,
            cellRendererParams: { onRefresh }
        }
    ], [intl, onRefresh]);

    return (
        <AgGridPlus
            gridRef={gridRef}
            gridKey="sys-audit-logging-list"
            request={async (params, sort, filter) => {
                const data = await AuditLoggingGetListAsync({
                    StartTime: filter?.executionTime?.[0],
                    EndTime: filter?.executionTime?.[1],
                    Url: filter?.url,
                    UserName: filter?.userName,
                    ApplicationName: filter?.applicationName,
                    HttpMethod: filter?.httpMethod,
                    HasException: filter?.hasException,
                    ClientIpAddress: filter?.clientIpAddress,
                    Sorting: params?.sorter,
                    SkipCount: params?.skipCount,
                    MaxResultCount: params?.maxResultCount
                });
                return { success: true, data: data.items || [], total: data.totalCount || 0 };
            }}
            headerTitle="审计日志"
            columnDefs={columnDefs}
        />
    );
};

export default AuditLoggingPage;

export const routeProps = {
    name: '审计日志',
};
