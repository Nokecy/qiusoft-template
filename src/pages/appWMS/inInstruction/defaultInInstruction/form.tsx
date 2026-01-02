import React, {  } from "react";
// import InInstructionOrderForm from "./components/inInstructionOrderForm";
import InInstructionOrderForm from "@/pages/appWMS/inInstruction/_utils/inInstructionOrderForm";

const NoOrderInInstructionPage: React.FC<any> = (props: any) => {

    return <InInstructionOrderForm orderType={0} title="期初指令" />
};

export default NoOrderInInstructionPage;
export const routeProps = {
	name: '创建期指令',
};
