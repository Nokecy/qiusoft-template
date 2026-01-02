import React, {  } from "react";
import { useAccess, useIntl } from "umi";
import OutInstructionOrderForm from "./components/outInstructionOrderForm";
// import OutInstructionOrderForm from "@/pages/appWMS/outInstruction/_utils/outInstructionOrderForm";

const SaleOutInstructionPage: React.FC<any> = (props: any) => {
    const intl = useIntl();
    const access = useAccess();

    return <OutInstructionOrderForm orderType={5} title="销售出库指令"/>
};

export default SaleOutInstructionPage;
export const routeProps = {
	name: '创建销售出库指令',
};