import DayCom from '../stockBin/components/dayCompany';
import React, { useEffect, useRef, useState } from 'react';
import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import { Button, Modal, DatePicker } from 'antd';
import { StockBinInfoDelayStockBinAsync, } from '@/services/wms/StockBinInfo';
import { useIntl } from 'umi';
import { useBoolean } from 'ahooks';
import { GridApi } from 'ag-grid-community';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { IsOpenSelect, IsRoHS } from '../stockBin/components/select';
import QualityStatusSelect, { QualityStatus } from '../stockBin/components/qualityStatus';
import { Space } from '@formily/antd-v5';
import moment from 'dayjs';
const TraceIdInfoFormDialog = (props: any) => {
    const gridRef = useRef<GridRef>();
    const { selectRows, buttonProps, onAfterSubmit } = props;
    const intl = useIntl();
    const [gridApi, setGridApi] = useState<GridApi | undefined>();
    const [modalVisible, { setFalse: hide, setTrue: show }] = useBoolean();
    const [dataSource, setDataSource] = useState(selectRows)
    useEffect(() => {
        setDataSource(selectRows)
    }, [modalVisible])
    return (
        <Space>
            <Button type={'primary'} onClick={show} {...buttonProps}>
                {props.children}
            </Button>
            <Modal
                width={1240}
                title={props.children}
                open={modalVisible}
                maskClosable={false}
                destroyOnClose
                onCancel={() => {
                    hide();
                }}
                onOk={async () => {
                    //存在用户点编辑后不失去焦点不能保存数据的问题,所以
                    await gridApi?.selectAll()
                    gridApi?.stopEditing();
                    let ls: any = gridApi?.getSelectedRows();

                    StockBinInfoDelayStockBinAsync(
                        ls.map(i => ({ id: i.id, expiryDate: moment(i.expiryDate).format('YYYY-MM-DD') }))
                    ).then(value => {
                        hide();
                        if (onAfterSubmit) onAfterSubmit(value);
                    });
                }}
            >
                <AgGridPlus
                    gridRef={gridRef}
                    hideTool
                    search={false}
                    gridKey='appWMS.stock.timeOutStockBin.modelTable'
                    dataSource={dataSource || []}
                    onGridReady={gridReadEvent => {
                        setGridApi(gridReadEvent.api);
                    }}
                    style={{ height: 600 }}
                >
                    <AgGridColumn field='wareHouse.code' headerName={intl.formatMessage({ id: 'WMS:WareHouseCode' })} width={120} ></AgGridColumn>
                    <AgGridColumn field='wareHouse.name' headerName={intl.formatMessage({ id: 'WMS:WareHouseName' })} width={150}></AgGridColumn>
                    <AgGridColumn field='warehouseZoneCode' headerName={intl.formatMessage({ id: 'WMS:WarehouseZoneCode' })} width={120}></AgGridColumn>
                    <AgGridColumn field='wareHouseLocationCode' headerName={intl.formatMessage({ id: 'WMS:WareHouseLocationCode' })} width={150}></AgGridColumn>
                    <AgGridColumn field='traceId' headerName={intl.formatMessage({ id: 'WMS:TraceId' })} width={180}></AgGridColumn>
                    <AgGridColumn field='traceId' headerName={'箱号'} width={150}></AgGridColumn>
                    <AgGridColumn field='materialItem.code' headerName={intl.formatMessage({ id: 'WMS:MaterialCode' })} width={180}></AgGridColumn>
                    <AgGridColumn field='materialItem.outCode' headerName={intl.formatMessage({ id: 'WMS:MaterialOutCode' })} width={120}></AgGridColumn>
                    <AgGridColumn field='materialItem.description' headerName={intl.formatMessage({ id: 'WMS:MaterialDescript' })} width={120}></AgGridColumn>
                    <AgGridColumn field='businessLotNumber' headerName={intl.formatMessage({ id: 'WMS:BusinessLotNumber' })} width={120}></AgGridColumn>
                    <AgGridColumn field='acProperty' headerName={intl.formatMessage({ id: 'WMS:AcProperty' })} width={120}></AgGridColumn>
                    <AgGridColumn field='realRightCode' headerName={intl.formatMessage({ id: 'WMS:RealRightCode' })} width={120}></AgGridColumn>

                    <AgGridColumn field='qty' headerName={intl.formatMessage({ id: 'WMS:Qty' })} width={100} hideInSearch={true}></AgGridColumn>
                    <AgGridColumn field='availableQuantity' headerName={intl.formatMessage({ id: 'WMS:AvailableQuantity' })} width={100} hideInSearch={true}></AgGridColumn>
                    <AgGridColumn field='putDate' headerName={intl.formatMessage({ id: 'WMS:PutDate' })} type={'dateTimeColumn'} width={180}></AgGridColumn>
                    <AgGridColumn field='productionDate' headerName={intl.formatMessage({ id: 'WMS:ProductionDate' })} type={'dateTimeColumn'} width={180}></AgGridColumn>
                    {/* 入库日期 */}
                    <AgGridColumn field='expiryDate' headerName={intl.formatMessage({ id: 'WMS:ExpiryDate' })} type={'dateColumn'} width={180}
                        pinned='right'

                        cellRenderer={data => <DatePicker value={moment(data?.value)} onChange={(value) => {
                            let arr = dataSource.map(i => {
                                if (i.id == data.data.id) {
                                    i.expiryDate = value?.format('YYYY-MM-DD')
                                }
                                return i
                            })
                            setDataSource(arr)
                        }} />}
                        cellStyle={({ }) => {
                            return { backgroundColor: '#20c77c' }
                        }}
                    ></AgGridColumn>
                    <AgGridColumn field='putDate' hideInSearch headerName={'库龄'} width={100} cellRenderer={DayCom}></AgGridColumn>
                    {/* 库龄 (按入库日期格式化) */}
                    <AgGridColumn field={'isOpen'} headerName={intl.formatMessage({ id: 'WMS:IsOpen' })} width={80} type={'bool'} searchComponent={IsOpenSelect}></AgGridColumn>
                    <AgGridColumn field={'qualityStatus'} headerName={intl.formatMessage({ id: 'WMS:QualityStatus' })} width={100} cellRenderer={QualityStatus} searchComponent={QualityStatusSelect}></AgGridColumn>
                    <AgGridColumn field={'isRoHS'} headerName={intl.formatMessage({ id: 'WMS:IsRoHS' })} width={100} type={'bool'} searchComponent={IsRoHS} />
                </AgGridPlus>
            </Modal>
        </Space>
    );
};

export default TraceIdInfoFormDialog;
