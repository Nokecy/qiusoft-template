import React from "react";
interface person {
    status:number,
    statusDescription:string
}

const GeneralStatusRender = (props: person) => {
    const {status,statusDescription} = props

    const colorarr = ['#D5D1C9', 'orange','#1677FF', '#199b00'];
    return (
        <div>
            <span className="appSettlement-badge-status" style={{ backgroundColor: colorarr[status-1], color: colorarr[status-1] }}></span>
            <span className="" style={{ marginLeft: 10 }}>{statusDescription}</span>
        </div>
    );
}

export default GeneralStatusRender