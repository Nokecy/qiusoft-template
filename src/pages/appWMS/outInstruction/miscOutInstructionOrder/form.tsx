import React, { useRef } from "react";
import { useAccess, useIntl } from "umi";
import OutInstructionOrderForm from "./components/outInstructionOrderForm";
// import OutInstructionOrderForm from "@/pages/appWMS/outInstruction/_utils/outInstructionOrderForm";

const MiscOutInstructionPage: React.FC<any> = (props: any) => {
    const intl = useIntl();
    const access = useAccess();

    return <OutInstructionOrderForm orderType={11} title="原料杂出指令"/>
};

export default MiscOutInstructionPage;
export const routeProps = {
	name: '创建原料杂出指令',
};