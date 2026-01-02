import React, { useEffect, useMemo, useRef } from 'react';
import { useSearchParams, useIntl, GetWorkflowWidgetComponent } from 'umi';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';

const WorkflowCorrelationPage = (props: any) => {
    const gridRef = useRef<GridRef>();
    const intl = useIntl();
    const [searchParams] = useSearchParams();
    const workflowName = searchParams.get("workflowName");

    const WorkflowComponent: any = useMemo(() => {
        if (!workflowName) return undefined;
        const component = GetWorkflowWidgetComponent(workflowName);
        if (!component) {
            return undefined
        }
        return component;
    }, [workflowName])

    if (!WorkflowComponent) {
        return <> </>
    }

    return (
        <>
            <WorkflowComponent workflowName={workflowName || ""} />
        </>
    );
};

export default WorkflowCorrelationPage;
export const routeProps = {
    name: '审批中心'
};
