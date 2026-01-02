import React, { useRef } from "react";
import { useAccess, useIntl } from "umi";
import OutInstructionOrderForm from "@/pages/appWMS/outInstruction/_utils/outInstructionOrderForm";

const MiscOutInstructionPage: React.FC<any> = (props: any) => {
    const intl = useIntl();
    const access = useAccess();

    return <OutInstructionOrderForm orderType={10}title="领料出库指令"/>
};

export default MiscOutInstructionPage;
export const routeProps = {
	name: '创建领料出库指令',
};