import React from "react";
import { useModel, history,closeTab, } from "umi";

const AppLogo: React.FC<any> = (props: any) => {
    const { initialState } = useModel('@@initialState');

    return <img src={initialState ? initialState?.branding?.logoUrl : ""} style={{ height: 28, width: 28 }} onClick={() =>{
        closeTab('/dashboard')
        history.push('/dashboard')}} />
}

export default AppLogo;
