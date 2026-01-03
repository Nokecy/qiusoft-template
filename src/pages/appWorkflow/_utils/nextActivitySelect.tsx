import { GetElsaWorkflowsApiEndpointsWorkflowDefinitionsExportExport2 } from '@/services/workflow/WorkflowDefinitions';
import { GetElsaWorkflowsApiEndpointsWorkflowInstancesExportExport2 } from '@/services/workflow/WorkflowInstances';
import { WorkflowExecutionLogGetListByInstance } from '@/services/workflow/WorkflowExecutionLog';
import { WorkflowUserActionGetActionListByActivity } from '@/services/workflow/WorkflowUserAction';
import {
    buildActionTargetIdMap,
    resolveCurrentActivityNodeId,
    resolveCurrentActivityNodeIdFromInstanceExport,
    resolveDefinitionIdFromInstanceExport,
    resolveNextActivityValue,
    remapSelectedNextActivityValue,
    resolveSingleOutgoingTargetId
} from './nextActivityMapping';
import { Radio } from '@formily/antd-v5';
import { useControllableValue, useRequest } from 'ahooks';
import { SelectValue } from 'antd/lib/select';
import React, { useEffect, useMemo } from 'react';

/**
 * 下一步节点选择
 * @param props 
 * @param ref 
 * @returns 
 */
type NextActivitySelectProps = {
    workflowInstanceId: string;
    activityId: string;
    definitionId?: string;
    onItemChange?: (item) => void;
    enableActionTargetMapping?: boolean;
};

const NextActivitySelect = (props: NextActivitySelectProps, ref) => {
    const { workflowInstanceId, activityId, definitionId, onItemChange, enableActionTargetMapping } = props;
    const enableMapping = Boolean(enableActionTargetMapping);

    const getData = () => {
        return WorkflowUserActionGetActionListByActivity({
            workflowInstanceId: workflowInstanceId,
            activityId: activityId
        });
    };

    const getExecutionLogs = () => {
        if (!workflowInstanceId || !enableMapping) {
            return Promise.resolve(undefined);
        }

        return WorkflowExecutionLogGetListByInstance({ instanceId: workflowInstanceId });
    };

    const getInstanceExport = () => {
        if (!workflowInstanceId || !enableMapping) {
            return Promise.resolve(undefined);
        }

        return GetElsaWorkflowsApiEndpointsWorkflowInstancesExportExport2({
            id: workflowInstanceId,
            ids: [workflowInstanceId],
            includeBookmarks: true,
            includeActivityExecutionLog: false,
            includeWorkflowExecutionLog: false
        });
    };

    const [state, setState] = useControllableValue<SelectValue>(props);

    const { data } = useRequest(getData, { debounceMaxWait: 500, refreshDeps: [workflowInstanceId, activityId] });
    const { data: executionLogs } = useRequest(getExecutionLogs, {
        debounceMaxWait: 500,
        refreshDeps: [workflowInstanceId],
        ready: !!workflowInstanceId && enableMapping
    });
    const { data: instanceExport } = useRequest(getInstanceExport, {
        debounceMaxWait: 500,
        refreshDeps: [workflowInstanceId],
        ready: !!workflowInstanceId && enableMapping
    });

    const resolvedDefinitionId = useMemo(() => {
        if (!enableMapping) {
            return definitionId;
        }
        return definitionId ?? resolveDefinitionIdFromInstanceExport(instanceExport);
    }, [definitionId, instanceExport, enableMapping]);

    const getDefinitionExport = () => {
        if (!resolvedDefinitionId || !enableMapping) {
            return Promise.resolve(undefined);
        }

        return GetElsaWorkflowsApiEndpointsWorkflowDefinitionsExportExport2({
            definitionId: resolvedDefinitionId
        });
    };

    const { data: definitionExport } = useRequest(getDefinitionExport, {
        debounceMaxWait: 500,
        refreshDeps: [resolvedDefinitionId],
        ready: !!resolvedDefinitionId && enableMapping
    });

    const currentNodeId = useMemo(
        () => {
            if (!enableMapping) {
                return activityId;
            }
            return (
                resolveCurrentActivityNodeIdFromInstanceExport(instanceExport, activityId) ??
                resolveCurrentActivityNodeId(executionLogs, activityId) ??
                activityId
            );
        },
        [instanceExport, executionLogs, activityId, enableMapping]
    );

    const actionTargetMap = useMemo(
        () => buildActionTargetIdMap(definitionExport, currentNodeId),
        [definitionExport, currentNodeId]
    );

    const fallbackTargetId = useMemo(
        () => (enableMapping ? resolveSingleOutgoingTargetId(definitionExport, currentNodeId) : undefined),
        [definitionExport, currentNodeId, enableMapping]
    );

    const resolveValue = (action?: string) => {
        return resolveNextActivityValue(action ?? '', actionTargetMap, enableMapping, fallbackTargetId);
    };

    const options = useMemo(() => {
        const items = (data ?? [])
            .map(item => {
                const action = String(item?.action ?? '').trim();
                if (!action) {
                    return null;
                }

                const value = resolveValue(action);
                if (!value) {
                    return null;
                }

                return { value, label: action };
            })
            .filter((item): item is { value: string; label: string } => Boolean(item));

        return items;
    }, [data, actionTargetMap]);

    const valueToAction = useMemo(() => {
        const map = new Map<string, { action?: string; actorSelectionMode?: number }>();
        (data ?? []).forEach(item => {
            const value = resolveValue(item?.action);
            if (!value || map.has(value)) {
                return;
            }
            map.set(value, item);
        });
        return map;
    }, [data, actionTargetMap, fallbackTargetId]);

    useEffect(() => {
        if (data?.length == 1) {
            const value = resolveValue(data[0].action);
            if (value) {
                setState(value);
            }
        }
    }, [data, actionTargetMap])

    useEffect(() => {
        if (!enableMapping) {
            return;
        }

        if (typeof state !== 'string') {
            return;
        }

        const remapped = remapSelectedNextActivityValue(state, actionTargetMap, enableMapping, fallbackTargetId);
        if (remapped && remapped !== state) {
            setState(remapped);
        }
    }, [actionTargetMap, enableMapping, state, fallbackTargetId]);

    return (
        <span ref={ref}>
            <Radio.Group
                value={state}
                onChange={e => {
                    const value = e.target.value;
                    setState(value);

                    const matched = valueToAction.get(value) ?? data?.find(x => x.action == value);
                    onItemChange && onItemChange(matched)
                }}
                options={options}>
            </Radio.Group>
        </span>
    );
};

export default React.forwardRef(NextActivitySelect);
