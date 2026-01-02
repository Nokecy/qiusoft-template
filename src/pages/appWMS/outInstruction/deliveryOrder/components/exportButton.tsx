import { DeliveryOrderGetDeliveryExportProviderList, DeliveryOrderExportAsync } from "@/services/wms/DeliveryOrder";
import { Menu, Dropdown, Button, message, Space, Tooltip } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import React, { useState } from "react";
import { useIntl, useRequest } from 'umi';
import { saveAs } from "@/_utils";

const ExportButton = (props: any) => {
    const { deliveryOrderNo } = props;
    const intl = useIntl();

    const { loading, data: providers, run } = useRequest(DeliveryOrderGetDeliveryExportProviderList, { formatResult: (res) => res });

    function handleMenuClick(e) {
        let provider = providers?.filter((item) => item.vlaue === e.key)[0];
        DeliveryOrderExportAsync({ providerName: e.key, deliveryOrderNo: deliveryOrderNo }, { responseType: "blob" })
            //@ts-ignore
            .then(blob => { saveAs(blob, `${provider?.downLoadName}`); });
    }

    const menu = (
        <Menu
            onClick={handleMenuClick}
            //@ts-ignore
            items={providers?.map(x => { return { label: x.label, key: x.vlaue } })}
        />
    );

    return (<>
        <Dropdown overlay={menu}>
            <Button>
                <Space>
                    导出
                    <DownOutlined />
                </Space>
            </Button>
        </Dropdown>
    </>);
}

export default ExportButton