import React, { useRef } from "react";
import { useAccess, useIntl } from "umi";
import InInstructionOrderForm from "@/pages/appWMS/inInstruction/_utils/inInstructionOrderForm";

const ServiceReturnInInstructionFormPage: React.FC<any> = (props: any) => {
    const intl = useIntl();
    const access = useAccess();

    return <InInstructionOrderForm orderType={23} title="服务退料入库指令" />
};

export default ServiceReturnInInstructionFormPage;
export const routeProps = {
	name: '创建服务退料入库指令',
};
