import { ICellRendererParams } from 'ag-grid-community';
import { useBoolean } from 'ahooks';
import { Drawer } from 'antd';
import React from 'react';
import Profile from './profile';

const ShipmentOrderProfileDrawer = (props: ICellRendererParams) => {
    const { value, data } = props;
    const [visible, { setFalse, setTrue }] = useBoolean(false);
    return (<>
        <a onClick={setTrue}>
            {value}
        </a>
        <Drawer size={'large'} placement="right" closable={false} width={1200} destroyOnClose
            onClose={setFalse}
            open={visible}
        >
            <Profile traceId={data.traceId} />
        </Drawer>
    </>);
};

export default ShipmentOrderProfileDrawer;