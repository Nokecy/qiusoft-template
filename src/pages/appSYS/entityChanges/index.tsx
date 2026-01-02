import { AgGridPlus } from "@/components/agGrid";
import { AuditLoggingGetEntityChangesAsync, AuditLoggingGetEntityChangeAsync } from '@/services/openApi/AuditLogging';
import { EyeOutlined } from "@ant-design/icons";
import { Space, Tag, Drawer, Button, Descriptions } from "antd";
import React, { useRef, useMemo, useState } from "react";
import { useIntl } from "umi";
import { GridRef } from "@nokecy/qc-ui/dist/esm/ag-grid-plus/interface";
import { ICellRendererParams } from "ag-grid-community";
import dayjs from 'dayjs';

// 变更类型枚举
const changeTypeEnum = [
    { label: "创建", value: 0, color: '#52c41a' },
    { label: "更新", value: 1, color: '#1890ff' },
    { label: "删除", value: 2, color: '#f5222d' },
];

// 详情抽屉组件
const DetailDrawer = ({ id, open, onClose }: { id?: string, open: boolean, onClose: () => void }) => {
    const [loading, setLoading] = useState(false);
    const [detail, setDetail] = useState<API.BurnAbpSystemHostAuditLoggingsDtosEntityChangeDto>();

    React.useEffect(() => {
        if (open && id) {
            setLoading(true);
            AuditLoggingGetEntityChangeAsync({ id }).then(res => {
                setDetail(res);
            }).finally(() => {
                setLoading(false);
            });
        }
    }, [open, id]);

    return (
        <Drawer
            title="实体变更详情"
            placement="right"
            width={700}
            open={open}
            onClose={onClose}
            loading={loading}
        >
            {detail && (
                <>
                    <Descriptions column={2} bordered size="small" style={{ marginBottom: 16 }}>
                        <Descriptions.Item label="实体类型" span={2}>{detail.entityTypeFullName}</Descriptions.Item>
                        <Descriptions.Item label="实体ID" span={2}>{detail.entityId}</Descriptions.Item>
                        <Descriptions.Item label="变更类型">
                            <Tag color={changeTypeEnum.find(t => t.value === detail.changeType)?.color}>
                                {detail.changeTypeText}
                            </Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label="变更时间">
                            {dayjs(detail.changeTime).format('YYYY-MM-DD HH:mm')}
                        </Descriptions.Item>
                        <Descriptions.Item label="审计日志ID" span={2}>{detail.auditLogId}</Descriptions.Item>
                        <Descriptions.Item label="租户ID" span={2}>{detail.entityTenantId}</Descriptions.Item>
                    </Descriptions>

                    {detail.propertyChanges && detail.propertyChanges.length > 0 && (
                        <>
                            <h3 style={{ marginTop: 24, marginBottom: 16 }}>属性变更</h3>
                            {detail.propertyChanges.map((prop, index) => (
                                <Descriptions key={index} column={1} bordered size="small" style={{ marginBottom: 16 }}>
                                    <Descriptions.Item label="属性名称">{prop.propertyName}</Descriptions.Item>
                                    <Descriptions.Item label="属性类型">{prop.propertyTypeFullName}</Descriptions.Item>
                                    <Descriptions.Item label="原值">
                                        <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{prop.originalValue || '(空)'}</pre>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="新值">
                                        <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{prop.newValue || '(空)'}</pre>
                                    </Descriptions.Item>
                                </Descriptions>
                            ))}
                        </>
                    )}
                </>
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

const EntityChangesPage = () => {
    const intl = useIntl();
    const gridRef = useRef<GridRef>();

    const onRefresh = () => {
        gridRef.current?.onRefresh();
    };

    const columnDefs: any = useMemo(() => [
        {
            headerName: "变更时间",
            field: "changeTime",
            width: 180,
            hideInTable: true,
            searchComponent: 'DateRangePicker',
        },
        {
            headerName: "变更时间",
            field: "changeTime",
            width: 180,
            cellRenderer: ({ value }: any) => value ? dayjs(value).format('YYYY-MM-DD HH:mm') : '',
            initialSort: 'desc',
            hideInSearch: true,
        },
        {
            headerName: "实体类型",
            field: "entityTypeFullName",
            flex: 1,
            minWidth: 200,
        },
        {
            headerName: "实体ID",
            field: "entityId",
            width: 250,
        },
        {
            headerName: "变更类型",
            field: "changeType",
            width: 120,
            valueEnum: changeTypeEnum,
            cellRenderer: (params: any) => {
                const type = changeTypeEnum.find(t => t.value === params.value);
                return type ? <Tag color={type.color}>{type.label}</Tag> : params.data?.changeTypeText;
            }
        },
        {
            headerName: "审计日志ID",
            field: "auditLogId",
            width: 250,
            hideInTable: true,
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
            gridKey="sys-entity-changes-list"
            request={async (params, sort, filter) => {
                const data = await AuditLoggingGetEntityChangesAsync({
                    StartTime: filter?.changeTime?.[0],
                    EndTime: filter?.changeTime?.[1],
                    EntityId: filter?.entityId,
                    EntityTypeFullName: filter?.entityTypeFullName,
                    ChangeType: filter?.changeType,
                    AuditLogId: filter?.auditLogId,
                    Sorting: params?.sorter,
                    SkipCount: params?.skipCount,
                    MaxResultCount: params?.maxResultCount
                });
                return { success: true, data: data.items || [], total: data.totalCount || 0 };
            }}
            headerTitle="实体变更历史"
            columnDefs={columnDefs}
        />
    );
};

export default EntityChangesPage;

export const routeProps = {
    name: '实体变更历史',
};
