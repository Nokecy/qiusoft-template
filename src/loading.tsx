// @ts-ignore
import React from 'react';
import { PageLoading } from '@ant-design/pro-layout'

const Loading = (props: any) => {

    if (enableOidc) {
        return <PageLoading />;
    }
    return <PageLoading />;
};

export default Loading;