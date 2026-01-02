type UnknownRecord = Record<string, unknown>;
type ExecutionLogLike = {
  bookmarkId?: string;
  activityNodeId?: string;
  executeTime?: string;
  createTime?: string;
};
type WorkflowStateLike = {
  bookmarks?: { id?: string; activityId?: string; activityNodeId?: string }[];
};

export function buildActionTargetIdMap(
  exportModel: unknown,
  currentActivityId: string
): Map<string, string> {
  const map = new Map<string, string>();
  if (!exportModel || !currentActivityId) {
    return map;
  }

  const root = unwrapExportModel(exportModel);
  const connections = collectConnections(root);

  connections.forEach((connection) => {
    const sourceId = getConnectionActivityId(connection, 'source');
    const targetId = getConnectionActivityId(connection, 'target');
    const port = getConnectionPort(connection);

    if (!sourceId || !targetId || !port) {
      return;
    }

    if (!equalsIgnoreCase(sourceId, currentActivityId)) {
      return;
    }

    if (!map.has(port)) {
      map.set(port, targetId);
    }
  });

  return map;
}

export function resolveCurrentActivityNodeId(
  executionLogs: unknown,
  activityId: string
): string | undefined {
  const key = String(activityId ?? '').trim();
  if (!key) {
    return undefined;
  }

  const logs = normalizeExecutionLogs(executionLogs);
  const matched = logs.filter(
    (log) => String(log.bookmarkId ?? '').trim() === key && String(log.activityNodeId ?? '').trim()
  );

  if (matched.length === 0) {
    return undefined;
  }

  if (matched.length === 1) {
    return String(matched[0].activityNodeId ?? '').trim() || undefined;
  }

  const latest = matched
    .slice()
    .sort((left, right) => compareTimestamp(left.executeTime ?? left.createTime, right.executeTime ?? right.createTime))
    .at(-1);

  return latest ? String(latest.activityNodeId ?? '').trim() || undefined : undefined;
}

export function resolveCurrentActivityNodeIdFromInstanceExport(
  instanceExport: unknown,
  activityId: string
): string | undefined {
  const key = String(activityId ?? '').trim();
  if (!key) {
    return undefined;
  }

  const workflowState = extractWorkflowState(instanceExport);
  const bookmarks = workflowState?.bookmarks ?? [];
  if (!Array.isArray(bookmarks) || bookmarks.length === 0) {
    return undefined;
  }

  const matched = bookmarks.find((bookmark) => {
    const bookmarkId = String(bookmark?.id ?? '').trim();
    const activityRef = String(bookmark?.activityId ?? '').trim();
    return bookmarkId === key || activityRef === key;
  });

  return matched ? String(matched.activityNodeId ?? '').trim() || undefined : undefined;
}

export function resolveDefinitionIdFromInstanceExport(instanceExport: unknown): string | undefined {
  if (!instanceExport || typeof instanceExport !== 'object') {
    return undefined;
  }

  const record = instanceExport as UnknownRecord;
  const directDefinitionId = getFirstString(record, ['definitionId', 'DefinitionId']);
  if (directDefinitionId) {
    return directDefinitionId;
  }

  const workflowState = extractWorkflowState(instanceExport) as UnknownRecord | undefined;
  if (workflowState) {
    const stateDefinitionId = getFirstString(workflowState, ['definitionId', 'DefinitionId']);
    if (stateDefinitionId) {
      return stateDefinitionId;
    }
  }

  const instance = record.workflowInstance ?? record.instance ?? record.workflowInstanceDto;
  if (isRecord(instance)) {
    const instanceDefinitionId = getFirstString(instance, ['definitionId', 'DefinitionId']);
    if (instanceDefinitionId) {
      return instanceDefinitionId;
    }
  }

  return undefined;
}

export function resolveSingleOutgoingTargetId(
  exportModel: unknown,
  currentActivityId: string
): string | undefined {
  if (!exportModel || !currentActivityId) {
    return undefined;
  }

  const root = unwrapExportModel(exportModel);
  const connections = collectConnections(root);
  const targets = new Set<string>();

  connections.forEach((connection) => {
    const sourceId = getConnectionActivityId(connection, 'source');
    const targetId = getConnectionActivityId(connection, 'target');
    if (!sourceId || !targetId) {
      return;
    }
    if (!equalsIgnoreCase(sourceId, currentActivityId)) {
      return;
    }
    targets.add(targetId);
  });

  if (targets.size !== 1) {
    return undefined;
  }

  return Array.from(targets)[0];
}

export function resolveNextActivityValue(
  action: string,
  actionTargetMap: Map<string, string>,
  enableMapping: boolean,
  fallbackTargetId?: string
): string {
  const actionText = String(action ?? '').trim();
  if (!actionText) {
    return '';
  }

  if (!enableMapping) {
    return actionText;
  }

  return actionTargetMap.get(actionText) ?? fallbackTargetId ?? actionText;
}

export function remapSelectedNextActivityValue(
  value: string,
  actionTargetMap: Map<string, string>,
  enableMapping: boolean,
  fallbackTargetId?: string
): string {
  const current = String(value ?? '').trim();
  if (!current) {
    return '';
  }

  if (!enableMapping) {
    return current;
  }

  return actionTargetMap.get(current) ?? fallbackTargetId ?? current;
}

function normalizeExecutionLogs(value: unknown): ExecutionLogLike[] {
  if (Array.isArray(value)) {
    return value as ExecutionLogLike[];
  }

  if (isRecord(value)) {
    const items = value.items ?? value.Items;
    if (Array.isArray(items)) {
      return items as ExecutionLogLike[];
    }
  }

  return [];
}

function extractWorkflowState(value: unknown): WorkflowStateLike | undefined {
  if (!value || typeof value !== 'object') {
    return undefined;
  }

  const record = value as UnknownRecord;
  const workflowState = record.workflowState ?? record.WorkflowState;
  if (isRecord(workflowState)) {
    return workflowState as WorkflowStateLike;
  }

  const instance = record.workflowInstance ?? record.instance ?? record.workflowInstanceDto;
  if (isRecord(instance)) {
    const state = (instance as UnknownRecord).workflowState ?? (instance as UnknownRecord).WorkflowState;
    if (isRecord(state)) {
      return state as WorkflowStateLike;
    }
  }

  return undefined;
}

function compareTimestamp(left?: string, right?: string): number {
  const leftValue = Date.parse(left ?? '');
  const rightValue = Date.parse(right ?? '');

  if (Number.isNaN(leftValue) && Number.isNaN(rightValue)) {
    return 0;
  }
  if (Number.isNaN(leftValue)) {
    return -1;
  }
  if (Number.isNaN(rightValue)) {
    return 1;
  }
  return leftValue - rightValue;
}

function unwrapExportModel(exportModel: unknown): unknown {
  if (!isRecord(exportModel)) {
    return exportModel;
  }

  return (exportModel.workflowDefinition ?? exportModel.definition ?? exportModel) as unknown;
}

function collectConnections(root: unknown): UnknownRecord[] {
  const result: UnknownRecord[] = [];
  const seen = new Set<unknown>();

  const visit = (value: unknown) => {
    if (!value || typeof value !== 'object') {
      return;
    }

    if (seen.has(value)) {
      return;
    }
    seen.add(value);

    if (Array.isArray(value)) {
      value.forEach(visit);
      return;
    }

    const record = value as UnknownRecord;
    const connections = record.connections ?? record.Connections;

    if (Array.isArray(connections)) {
      connections.forEach((item) => {
        if (isRecord(item)) {
          result.push(item);
        }
      });
    }

    if (isConnectionRecord(record)) {
      result.push(record);
    }

    Object.values(record).forEach(visit);
  };

  visit(root);
  return result;
}

function getConnectionActivityId(
  connection: UnknownRecord,
  side: 'source' | 'target'
): string | undefined {
  const sideValue = connection[side];
  const sideId = getActivityId(sideValue);
  if (sideId) {
    return sideId;
  }

  const directKeyCandidates =
    side === 'source'
      ? ['sourceActivityId', 'sourceId', 'fromActivityId']
      : ['targetActivityId', 'targetId', 'toActivityId'];

  return getFirstString(connection, directKeyCandidates);
}

function getConnectionPort(connection: UnknownRecord): string | undefined {
  const sourceValue = connection.source;
  const sourcePort =
    getFirstString(sourceValue, ['port', 'portName', 'sourcePort', 'outcome']) ??
    getFirstString(connection, ['port', 'sourcePort', 'outcome']);

  return sourcePort;
}

function getActivityId(value: unknown): string | undefined {
  return getFirstString(value, ['activityId', 'activityNodeId', 'nodeId', 'id']);
}

function getFirstString(value: unknown, keys: string[]): string | undefined {
  if (!isRecord(value)) {
    return undefined;
  }

  for (const key of keys) {
    const candidate = value[key];
    if (typeof candidate === 'string' && candidate.trim()) {
      return candidate.trim();
    }
  }

  return undefined;
}

function isConnectionRecord(record: UnknownRecord): boolean {
  if (!record.source || !record.target) {
    return false;
  }

  return Boolean(getActivityId(record.source) || getActivityId(record.target));
}

function isRecord(value: unknown): value is UnknownRecord {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function equalsIgnoreCase(left: string, right: string): boolean {
  return left.localeCompare(right, undefined, { sensitivity: 'accent' }) === 0;
}
