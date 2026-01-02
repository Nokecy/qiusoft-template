import { ICellRendererParams } from 'ag-grid-community';
import React from 'react';
import moment from 'dayjs';

const dayCom = (props: ICellRendererParams) => {
    const { value, } = props;
    const day = moment(moment().format('YYYY-MM-DD')).diff(moment(value).format('YYYY-MM-DD'), 'day');
    return (<>
        {day === 0 ? 1 : day}
    </>
    );
};

export default dayCom;