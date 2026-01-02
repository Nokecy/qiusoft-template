import React, { useRef } from "react";
import { useAccess, useIntl } from "umi";
import InInstructionOrderForm from "@/pages/appWMS/inInstruction/_utils/inInstructionOrderForm";

const SaleReturnInInstructionPage: React.FC<any> = (props: any) => {
    const intl = useIntl();
    const access = useAccess();

    return <InInstructionOrderForm orderType={10} title="退货入库指令"/>
};

export default SaleReturnInInstructionPage;
export const routeProps = {
	name: '创建退货入库指令',
};