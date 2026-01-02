import { AgGridPlus ,AgGridColumn} from "@/components/agGrid";
import { StockBinBoxInfoGetListByTraceIdAsync } from "@/services/wms/StockBinBoxInfo";
import { Card } from "antd";
import { sumBy } from "lodash";
import React from "react";
import { useAccess, useIntl, useRequest } from "umi";

const Profile = (props: any) => {
  const { traceId } = props;
  const intl = useIntl();

  const { data, loading } = useRequest(
    () => {
      return StockBinBoxInfoGetListByTraceIdAsync({ traceId: traceId });
    },
    { formatResult: (ret) => ret }
  );
  const access = useAccess();
  return (
    <Card bordered={false} loading={loading}>
      <AgGridPlus dataSource={data} style={{ height: 600 }}
        pinnedBottomRowData={[{ qty: sumBy(data, x => x.qty!) }]}>
        <AgGridColumn field={"boxNumber"} headerName={intl.formatMessage({ id: "WMS:BoxNumber" })} />
        <AgGridColumn field={"qty"} headerName={intl.formatMessage({ id: "WMS:Qty" })} hideInSearch type={"numericColumn"} />
        <AgGridColumn field={"parentTraceId"} headerName={intl.formatMessage({ id: "WMS:ParentTraceId" })} width={300} />
        <AgGridColumn field={"warehouseZoneCode"} headerName={intl.formatMessage({ id: "WMS:WarehouseZoneCode" })} width={120} />
        <AgGridColumn field={"warehouseZoneType"} headerName={intl.formatMessage({ id: "WMS:WareHouseZoneType" })} width={120} />
        <AgGridColumn field={"wareHouseLocationCode"} headerName={intl.formatMessage({ id: "WMS:WareHouseLocationCode" })} width={150} />
        <AgGridColumn field={"materialItem.code"} headerName={intl.formatMessage({ id: "WMS:MaterialCode" })} width={120} />
        <AgGridColumn field={"materialItem.outCode"} headerName={intl.formatMessage({ id: "WMS:MaterialOutCode" })} width={120} />
        <AgGridColumn field={"materialItem.description"} headerName={intl.formatMessage({ id: "WMS:MaterialDescript" })} width={150} />
        <AgGridColumn field={"businessLotNumber"} headerName={intl.formatMessage({ id: "WMS:BusinessLotNumber" })} width={300} />
        <AgGridColumn field={"putDate"} headerName={intl.formatMessage({ id: "WMS:PutDate" })} width={150} type={"dateColumn"} />
        <AgGridColumn field={"productionDate"} headerName={intl.formatMessage({ id: "WMS:ProductionDate" })} width={150} type={"dateColumn"} />
      </AgGridPlus>
    </Card>
  );
};
//总计 时间  参考://appWMSDelivery/assignMaterial/order/profile
export default Profile;
