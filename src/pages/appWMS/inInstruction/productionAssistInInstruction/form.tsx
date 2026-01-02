import React, { useRef } from "react";
import { useAccess, useIntl } from "umi";
import InInstructionOrderForm from "@/pages/appWMS/inInstruction/_utils/inInstructionOrderForm";

const ProductionAssistInInstructionFormPage: React.FC<any> = (props: any) => {
    const intl = useIntl();
    const access = useAccess();

    return <InInstructionOrderForm orderType={21} title="减配入库指令" />
};

export default ProductionAssistInInstructionFormPage;
export const routeProps = {
	name: '创建减配入库指令',
};