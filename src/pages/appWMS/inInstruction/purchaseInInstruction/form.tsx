import React, { useRef } from "react";
import { useAccess, useIntl } from "umi";
import InInstructionOrderForm from "@/pages/appWMS/inInstruction/_utils/inInstructionOrderForm";

const PurchaseInInstructionOrderPage: React.FC<any> = (props: any) => {
    const intl = useIntl();
    const access = useAccess();

    return <InInstructionOrderForm orderType={5} />
};

export default PurchaseInInstructionOrderPage;
export const routeProps = {
	name: '创建入库指令单',
};