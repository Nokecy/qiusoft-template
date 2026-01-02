import React, { useRef, useState } from 'react';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { Access, useAccess, useIntl } from '@umijs/max';
import { Button, Space, Tag, message } from 'antd';
import { AgGridPlus } from '@/components/agGrid';
import { ICellRendererParams } from 'ag-grid-community';
import BoxLotResolveRuleFormDialog from './components/formDialog';
import DeleteConfirm from '@/components/deleteConfirm';
import { AuditOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { BoxLotResolveRuleDeleteAsync, BoxLotResolveRuleGetListAsync } from '@/services/wms/BoxLotResolveRule';
import VerifyFormDialog from './components/verifyFormDialog';
import DemandMadel from './components/demandMadel';

/**
 * Lpn箱批次条码解析
 * @returns
 */
const BoxLotResolveRulePage = () => {
    const intl = useIntl();
    const gridRef = useRef<GridRef>();
    const access = useAccess();
    const [selectedRow, setSelectedRow] = useState<any>(undefined);

    const [contrastData, setContrastData] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)

    const onRefresh = () => {
        gridRef.current?.onRefresh();
    };

    const workStatus = (props: any) => {
        const { value } = props;
        const renderLineStatus = text => {
            switch (text) {
                case 0:
                    return <Tag color={'#108ee9'}>未审核</Tag>;
                case 5:
                    return <Tag color={'#2db7f5'}>审核中</Tag>;
                case 10:
                    return <Tag color={'#87d068'}>已审核</Tag>;
                case 15:
                    return <Tag color={'#f50'}>已驳回</Tag>;
                default:
                    return;
            }
        };

        return renderLineStatus(value);
    };

    const Options = (props: ICellRendererParams & { onRefresh }) => {
        const { data, api, onRefresh } = props;
        const intl = useIntl();
        const access = useAccess();

        const refresh = () => {
            onRefresh();
        };

        const handleDelete = (id: any) => {
            const hide = message.loading('正在操作,请稍后', 0);
            return BoxLotResolveRuleDeleteAsync({ id }).then(() => {
                refresh()
            }).finally(() => { hide(); });
        }

        return (
            <Space>
                <Access accessible={true}>
                    <VerifyFormDialog
                        title={'条码测试'}
                        entityId={data.id}
                        onAfterSubmit={() => {
                            refresh();
                        }}
                        buttonProps={{ icon: <AuditOutlined />, type: 'link', headerName: '条码测试' }}
                    />
                </Access>

                <Access accessible={true}>
                    <BoxLotResolveRuleFormDialog
                        title={'编辑'}
                        entityId={data.id}
                        onAfterSubmit={() => {
                            refresh();
                        }}
                        buttonProps={{ icon: <EditOutlined />, type: 'link', headerName: intl.formatMessage({ id: 'AbpUi:Edit' }) }}
                    />
                </Access>

                <Access accessible={true}>
                    <DeleteConfirm title='确定删除?' onConfirm={() => handleDelete(data.id)}>
                        <Button size={'small'} icon={<DeleteOutlined />} type={'link'} title={intl.formatMessage({ id: 'AbpUi:Delete' })} />
                    </DeleteConfirm>
                </Access>
            </Space>
        );
    };

    const columnDefs: any = [
        {
            headerName: "名称",
            field: "name",
            width: 110,
        },
        {
            headerName: "属性分割字符",
            field: "propertiesSplitChars",
            width: 150,
        },
        {
            headerName: "属性解析模式",
            field: "propertyResolveMode",
            width: 120,
            cellRenderer: (params) => {
                return params.value === 0 ? '按排序' : '按KeyName';
            },
        },
        {
            headerName: "是否校验长度",
            field: "validLength",
            width: 80,
            type: "bool",
        },
        {
            headerName: "长度",
            field: "length",
            width: 90,
        },
        {
            headerName: "是否校验属性长度",
            field: "validPropertyLength",
            width: 80,
            type: "bool",
        },
        {
            headerName: "属性长度",
            field: "propertyLength",
            width: 90,
        },
        {
            headerName: "键值分割字符",
            field: "keyValueSplitChars",
            width: 140,
        },
        {
            headerName: "查看",
            field: "action",
            width: 90,
            cellRenderer: (params) => {
                const { value } = params;
                return <a onClick={() => {
                    setContrastData(params.data.items)
                    setIsModalOpen(true)
                }}>查看</a>
            },
        },
        {
            headerName: "备注",
            field: "remark",
            width: 160,
        },
        {
            headerName: "是否启用",
            field: "isEnabled",
            width: 80,
            type: "bool",
            flex: 1
        },
        {
            headerName: "操作",
           field: "operation",
            width: 160,
            pinned: "right",
            filter: false,
            cellRenderer: Options,
            cellRendererParams: { onRefresh },
        },
    ];



    return (
        <>
            <AgGridPlus
                gridRef={gridRef}
                headerTitle='Lpn箱批次条码解析列表'
                gridKey='appWMS.baseInfo.BoxLotResolveRule'
                request={async (params: any) => {
                    let data = await BoxLotResolveRuleGetListAsync({
                        PageSize: params!.maxResultCount,
                        Filter: params?.filter,
                        MaxResultCount: params!.maxResultCount,
                        SkipCount: params!.skipCount,
                        Sorting: params!.sorter!
                    });
                    return {
                        success: true,
                        data: data.items!,
                        total: data.totalCount,
                    };
                }}
                toolBarRender={(gridApi, filter) => {
                    return [
                        <Access accessible={true}>
                            <BoxLotResolveRuleFormDialog title={'新建'} onAfterSubmit={onRefresh}>
                                {'新建'}
                            </BoxLotResolveRuleFormDialog>
                        </Access>,
                    ];
                }}
                columnDefs={columnDefs}
            >
            </AgGridPlus>
            <DemandMadel contrastData={contrastData} state={isModalOpen} changeFun={() => { setIsModalOpen(false) }}></DemandMadel>
        </>
    );
};

export default BoxLotResolveRulePage;
export const routeProps = {
    name: 'Lpn箱批次条码解析',
};
