import React, {  } from "react";
import InInstructionOrderForm from "@/pages/appWMS/inInstruction/_utils/inInstructionOrderForm";

const NoOrderInInstructionPage: React.FC<any> = (props: any) => {

    return <InInstructionOrderForm orderType={25} title="杂入指令" />
};

export default NoOrderInInstructionPage;
export const routeProps = {
	name: '创建杂入指令',
};
