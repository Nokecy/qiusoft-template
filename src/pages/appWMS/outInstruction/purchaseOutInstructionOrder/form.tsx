import React, { useRef } from "react";
import { useAccess, useIntl } from "umi";
import OutInstructionOrderForm from "@/pages/appWMS/outInstruction/_utils/outInstructionOrderForm";

const PurchaseOutInstructionPage: React.FC<any> = (props: any) => {
    const intl = useIntl();
    const access = useAccess();

    return <OutInstructionOrderForm orderType={15}title="采购退货指令" />
};

export default PurchaseOutInstructionPage;
export const routeProps = {
	name: '创建采购退货指令',
};