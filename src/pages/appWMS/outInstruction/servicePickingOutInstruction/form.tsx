import React, { useRef } from "react";
import { useAccess, useIntl } from "umi";
import OutInstructionOrderForm from "@/pages/appWMS/outInstruction/_utils/outInstructionOrderForm";

const ServiceMaterialOutInstructionFormPage: React.FC<any> = (props: any) => {
    const intl = useIntl();
    const access = useAccess();

    return <OutInstructionOrderForm orderType={12} title="服务领料出库指令"/>
};

export default ServiceMaterialOutInstructionFormPage;
export const routeProps = {
	name: '创建服务领料出库指令',
};
