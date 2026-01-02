import React, { useRef } from "react";
import { useAccess, useIntl } from "umi";
import InInstructionOrderForm from "@/pages/appWMS/inInstruction/_utils/inInstructionOrderForm";

const TransactionOrderInInstructionPage: React.FC<any> = (props: any) => {
    const intl = useIntl();
    const access = useAccess();

    return <InInstructionOrderForm orderType={22} title="转库入库指令"/>
};

export default TransactionOrderInInstructionPage;
export const routeProps = {
	name: '创建转库入库指令',
};