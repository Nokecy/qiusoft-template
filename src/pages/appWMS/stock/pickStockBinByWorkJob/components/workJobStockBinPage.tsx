import { AgGridColumn, AgGridPlus } from '@/components/agGrid';
import React, { useEffect, useRef, useState } from 'react';
import { Access, useAccess, useIntl } from 'umi';
import { StockBinInfoGetListAsync } from '@/services/wms/StockBinInfo';
import { sumBy } from 'lodash';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { LotAttrItemGetListAsync } from '@/services/wms/LotAttrItem';

const WorkJobStockBinPage = (props: any) => {
    const { workJobCode } = props;
    const gridRef = useRef<GridRef>();
    const intl = useIntl();

    const [data, setData] = useState([]);
    const [cols, setCols] = useState([]);

    useEffect(() => {
        LotAttrItemGetListAsync({}).then((res: any) => {
            setCols(res.items);
        });
    }, [0]);

    return (
        <AgGridPlus
            gridRef={gridRef}
            params={{ workJobCode }}
            search={false}
            gridKey="WMS.appWMSStock.TimeOutStockBin.workJobStockBin"
            request={async (params) => {
                if (params.workJobCode) {
                    const filter = params!.filter ? `${params!.filter},qty>0` : `taskOrder = ${params.workJobCode} , qty>0`;
                    let data: any = await StockBinInfoGetListAsync({ Filter: filter, Sorting: params!.sorter, SkipCount: params!.skipCount, MaxResultCount: params!.maxResultCount });
                    let requestData: any = { success: true, data: data.items!, total: data.totalCount };
                    setData(data.items);
                    return requestData;
                } else {
                    return { success: true, data: [], total: 0 };
                }
            }}
            headerTitle={'库位列表'}
            pinnedBottomRowData={[
                {
                    qty: sumBy(data, (x: any) => x.qty! * 1),
                    preRegisteredQuantity: sumBy(data, (x: any) => x.preRegisteredQuantity! * 1),
                    availableQuantity: sumBy(data, (x: any) => x.availableQuantity! * 1),
                },
            ]}
        >
            <AgGridColumn field={'wareHouse.code'} headerName={intl.formatMessage({ id: 'WMS:WareHouseCode' })} width={100} ></AgGridColumn>
            <AgGridColumn field={'wareHouse.name'} headerName={intl.formatMessage({ id: 'WMS:WareHouseName' })} width={150} hideInSearch></AgGridColumn>
            <AgGridColumn field={'warehouseZone.code'} headerName={intl.formatMessage({ id: 'WMS:WareHouseZoneCode' })} width={100} hideInSearch></AgGridColumn>
            <AgGridColumn field={'wareHouseLocationCode'} headerName={intl.formatMessage({ id: 'WMS:WareHouseLocationCode' })} width={150}></AgGridColumn>
            <AgGridColumn field={'traceId'} headerName={intl.formatMessage({ id: 'WMS:TraceId' })} width={150}></AgGridColumn>
            <AgGridColumn field={'materialItem.outCode'} headerName={intl.formatMessage({ id: 'WMS:MaterialItemOutCode' })} width={120}></AgGridColumn>
            <AgGridColumn field={'materialItem.code'} headerName={intl.formatMessage({ id: 'WMS:MaterialItemCode' })} width={120}></AgGridColumn>
            <AgGridColumn field={'materialItem.description'} headerName={intl.formatMessage({ id: 'WMS:MaterialItemDescript' })} width={150} hideInSearch></AgGridColumn>
            <AgGridColumn field={'sourceOrderNo'} headerName={'来源单号'} width={180}></AgGridColumn>
            <AgGridColumn field={'contractNo'} headerName={'合同号'} width={180}></AgGridColumn>
            <AgGridColumn field={'taskOrder'} headerName={'任务令'} width={180}></AgGridColumn>
            <AgGridColumn field={'version'} headerName={'版本'} width={80}></AgGridColumn>
            <AgGridColumn field={'acProperty'} headerName={'AC属性'} width={80}></AgGridColumn>
            {cols.map((item: any) => {
                const field = item.field.replace(item.field[0], item.field[0].toLowerCase());
                return <AgGridColumn key={`lotProperty.${field}`} field={`lotProperty.${field}`} headerName={item?.label} type={item?.type} width={120}></AgGridColumn>;
            })}
            <AgGridColumn field={'realRightCode'} headerName={'物权'} width={100}></AgGridColumn>
            <AgGridColumn field={'internalLotNumber'} headerName={intl.formatMessage({ id: 'WMS:InternalLotNumber' })} width={150}></AgGridColumn>
            <AgGridColumn field={'businessLotNumber'} headerName={intl.formatMessage({ id: 'WMS:BusinessLotNumber' })} width={140}></AgGridColumn>
            <AgGridColumn field={'putDate'} headerName={intl.formatMessage({ id: 'WMS:PutDate' })} width={100} type={'dateColumn'} initialSort={'desc'}></AgGridColumn>
            <AgGridColumn field={'productionDate'} headerName={intl.formatMessage({ id: 'WMS:ProductionDate' })} width={100} type={'dateColumn'} initialSort={'desc'}></AgGridColumn>
            <AgGridColumn field={'dateCode'} headerName={intl.formatMessage({ id: 'WMS:DateCode' })} width={80}></AgGridColumn>
            <AgGridColumn field={'expiryDate'} headerName={intl.formatMessage({ id: 'WMS:ExpiryDate' })} width={100} type={'dateColumn'} initialSort={'desc'}></AgGridColumn>
            <AgGridColumn field={'expiryCount'} headerName={intl.formatMessage({ id: 'WMS:ExpiryCount' })} width={80}></AgGridColumn>
            <AgGridColumn
                field={'overdueWarningDate'}
                headerName={intl.formatMessage({ id: 'WMS:OverdueWarningDate' })}
                width={110}
                type={'dateColumn'}
                initialSort={'desc'}
            ></AgGridColumn>
            <AgGridColumn field={'qty'} headerName={intl.formatMessage({ id: 'WMS:Qty' })} width={100}  hideInSearch></AgGridColumn>
            <AgGridColumn
                field={'preRegisteredQuantity'}
                headerName={intl.formatMessage({ id: 'WMS:PreRegisteredQuantity' })}
                hideInSearch
                width={100}
                
            ></AgGridColumn>
            <AgGridColumn field={'availableQuantity'} headerName={intl.formatMessage({ id: 'WMS:AvailableQuantity' })} hideInSearch width={100} ></AgGridColumn>
            <AgGridColumn field={'openTime'} headerName={intl.formatMessage({ id: 'WMS:OpenTime' })} width={150} type={'dateTimeColumn'} initialSort={'desc'}></AgGridColumn>
            <AgGridColumn field="creator" headerName="创建人" width={90} />
			<AgGridColumn field="creationDate" headerName="创建时间" width={140} type="dateTimeColumn" />
			<AgGridColumn field="lastUpdator" headerName="最后修改人" width={90} />
			<AgGridColumn field="lastUpdateDate" headerName="最后修改时间" width={140} type="dateTimeColumn" />
        </AgGridPlus>
    );
};

export default WorkJobStockBinPage;