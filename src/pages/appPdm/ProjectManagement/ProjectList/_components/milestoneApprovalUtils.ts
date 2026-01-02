import {
  ElsaWorkflowsApiEndpointsWorkflowDefinitionsListList,
  GetElsaWorkflowsApiEndpointsWorkflowDefinitionsExportExport2,
} from '@/services/workflow/WorkflowDefinitions';

const isDev = process.env.NODE_ENV !== 'production';
const debugLog = (message: string, payload?: unknown) => {
  if (!isDev) return;
  if (payload !== undefined) {
    console.info(message, payload);
  } else {
    console.info(message);
  }
};

export interface ApprovalNode {
  nodeKey: string;
  nodeName: string;
}

type UnknownRecord = Record<string, unknown>;

function findAllActivities(input: unknown): any[] {
  const result: any[] = [];
  const seen = new Set<any>();

  const visit = (value: unknown) => {
    if (!value || typeof value !== 'object') return;
    if (seen.has(value)) return;
    seen.add(value);

    if (Array.isArray(value)) {
      value.forEach(visit);
      return;
    }

    const record = value as UnknownRecord;
    const maybeType = String(record.type ?? record.typeName ?? record.activityType ?? '').trim();
    const maybeId = record.id ?? record.activityId ?? record.activityNodeId;
    if (maybeType && maybeId) {
      result.push(record);
    }

    Object.values(record).forEach(visit);
  };

  visit(input);
  return result;
}

function normalizeNodeKey(activity: any): string {
  const activityId = String(activity?.id || activity?.activityId || activity?.activityNodeId || '').trim();
  if (activityId) return activityId;
  const name = String(activity?.name || '').trim();
  if (name) return name;
  return activityId;
}

function normalizeNodeName(activity: any): string {
  const displayName = String(activity?.displayName || activity?.title || '').trim();
  if (displayName) return displayName;
  const name = String(activity?.name || '').trim();
  if (name) return name;
  return String(activity?.id || activity?.activityId || activity?.activityNodeId || 'ApprovalNode');
}

function isUserTaskType(rawType: string): boolean {
  const type = String(rawType || '').toLowerCase();
  return type.includes('usertask') || type.includes('user-task') || type.includes('approval') || type.includes('advancedusertask');
}

export function pickApprovalNodesFromWorkflowExport(exportModel: any): ApprovalNode[] {
  const model = exportModel?.workflowDefinition ?? exportModel?.definition ?? exportModel;
  const activities = findAllActivities(model);

  const candidates = activities.filter((activity) => {
    const type = String(activity?.type ?? activity?.typeName ?? activity?.activityType ?? '').trim();
    return isUserTaskType(type);
  });

  const nodes = candidates
    .map((activity) => ({
      nodeKey: normalizeNodeKey(activity),
      nodeName: normalizeNodeName(activity),
    }))
    .filter((x) => !!x.nodeKey)
    .filter((x, index, arr) => arr.findIndex((y) => y.nodeKey === x.nodeKey) === index);

  return nodes;
}

async function resolveDefinitionId(input?: string): Promise<string | undefined> {
  if (!input) return undefined;
  const isHexLike = /^[0-9a-fA-F]{8,}$/.test(input);
  if (isHexLike) {
    debugLog('[里程碑审批] 定义ID为十六进制格式', { input });
    return input;
  }

  try {
    const list = await ElsaWorkflowsApiEndpointsWorkflowDefinitionsListList({
      PageSize: 1000,
      Page: 0,
      VersionOptions: 'Latest',
    });
    const match = list?.items?.find((item: any) => item?.isPublished && item?.name === input);
    debugLog('[里程碑审批] 定义ID解析结果', { input, definitionId: match?.definitionId });
    return match?.definitionId as string | undefined;
  } catch (error) {
    debugLog('[里程碑审批] 定义ID解析失败', { input, error });
    return undefined;
  }
}

export async function loadApprovalNodes(workflowDefinitionId?: string): Promise<ApprovalNode[]> {
  if (!workflowDefinitionId) return [];

  try {
    debugLog('[里程碑审批] 开始识别审批节点', { workflowDefinitionId });
    const definitionId = await resolveDefinitionId(workflowDefinitionId);
    if (!definitionId) {
      debugLog('[里程碑审批] 未解析到定义ID', { workflowDefinitionId });
      return [];
    }

    const exportModel = await GetElsaWorkflowsApiEndpointsWorkflowDefinitionsExportExport2({
      definitionId,
    });
    const nodes = pickApprovalNodesFromWorkflowExport(exportModel);
    debugLog('[里程碑审批] 审批节点识别完成', {
      workflowDefinitionId,
      definitionId,
      count: nodes.length,
    });
    return nodes;
  } catch (error) {
    debugLog('[里程碑审批] 审批节点识别失败', { workflowDefinitionId, error });
    return [];
  }
}

export function isApprovalExecutionLog(log: any): boolean {
  if (!log) return false;
  const type = String(log?.activityType ?? '').toLowerCase();
  if (isUserTaskType(type)) {
    return true;
  }

  const name = String(log?.activityName ?? '');
  const displayName = String(log?.activityDisplayName ?? '');
  const hint = `${name} ${displayName}`.toLowerCase();
  return isUserTaskType(hint);
}
