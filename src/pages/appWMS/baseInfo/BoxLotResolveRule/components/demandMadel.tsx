import { AgGridPlus } from "@nokecy/qc-ui"
import { GridRef } from "@nokecy/qc-ui/dist/esm/ag-grid-plus/interface"
import { Modal } from "antd"
import React, { useEffect, useMemo, useRef, useState } from "react"
import BoxLotResolveRuleItemTable from "./boxLotResolveRuleItem"

const DemandMadel = (props: any) => {

    const { changeFun, contrastData } = props
    const gridRef = useRef<GridRef>();

    const [listData, setListData] = useState<any[]>([])

    useEffect(() => {
        setListData([
            { ...contrastData.local, type: '本地数据', id: 1, },
            { ...contrastData.remote, type: '远程数据', id: 2 }
        ])
    }, [contrastData])

    const handleCellStyle = (params, field) => {
        const allRows = params.api.getRenderedNodes().map((node) => node.data);

        if (allRows.length < 2) return null;

        const [firstRow, secondRow] = allRows;
        const isEqual = firstRow[field] === secondRow[field];

        if (!isEqual) {
            return { backgroundColor: '#f8d7da', color: '#721c24' }; // 红色
        }
        return null;
    };


    return (
        <div>
            <Modal title='明细数据' width={1160} destroyOnClose open={props.state} onOk={() => {
                if (changeFun) {
                    changeFun()
                }
            }} onCancel={() => {
                if (changeFun) {
                    changeFun()
                }
            }}>
                    <BoxLotResolveRuleItemTable listData={contrastData || []} />
            </Modal>
        </div>
    )
}

export default DemandMadel