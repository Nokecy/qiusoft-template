import React, {  } from "react";
import { useAccess, useIntl } from "umi";
import OutInstructionOrderForm from "./components/outInstructionOrderForm";
// import OutInstructionOrderForm from "@/pages/appWMS/outInstruction/_utils/outInstructionOrderForm";

const SaleOutInstructionPage: React.FC<any> = (props: any) => {
    const intl = useIntl();
    const access = useAccess();

    return <OutInstructionOrderForm orderType={20} title="转库出库指令"/>
};

export default SaleOutInstructionPage;
export const routeProps = {
	name: '创建转库出库指令',
};