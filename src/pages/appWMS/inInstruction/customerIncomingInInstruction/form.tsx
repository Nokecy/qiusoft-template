import React, { useRef } from "react";
import { useAccess, useIntl } from "umi";
import InInstructionOrderForm from "@/pages/appWMS/inInstruction/_utils/inInstructionOrderForm";

const NoOrderInInstructionPage: React.FC<any> = (props: any) => {
    const intl = useIntl();
    const access = useAccess();

    return <InInstructionOrderForm orderType={6} title="客供入库指令" />
};

export default NoOrderInInstructionPage;
export const routeProps = {
	name: '创建客供入库指令',
};
