import React, { useRef } from "react";
import { useAccess, useIntl } from "umi";
import InInstructionOrderForm from "@/pages/appWMS/inInstruction/_utils/inInstructionOrderForm";

const NoOrderInInstructionPage: React.FC<any> = (props: any) => {
    const intl = useIntl();
    const access = useAccess();

    return <InInstructionOrderForm orderType={20} title="退料入库指令" />
};

export default NoOrderInInstructionPage;
export const routeProps = {
	name: '创建退料入库指令',
};
