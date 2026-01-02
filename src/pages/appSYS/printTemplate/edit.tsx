import PrintDesigner from "@/components/printDesigner";
import React from "react";
import { serverUrl } from "umi";
import { useKeepAliveParams } from '@/hooks';

const IndexPage = (props: any) => {
    const { id } = useKeepAliveParams(
        '/appSYS/printTemplate/edit',
        ['id']
    );

    return <PrintDesigner name={id} baseUrl={serverUrl()} />;
}

export default IndexPage;

export const routeProps = {
	name: '编辑打印模板',
};
