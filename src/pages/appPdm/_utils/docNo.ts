/**
 * DocNo（文档编号）处理工具
 *
 * 背景：部分场景前端用 DocumentSelect 选择文档时，组件的 `value` 是 DocumentId（GUID），
 * 但后端契约要求 `DocNo` 必须是 `DocumentNumber`（业务编号）。
 */

export const isGuidLike = (value?: string) => {
  if (!value) return false;
  const v = value.trim();
  return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(v);
};

const tryParseDocNumberFromLabel = (label?: string) => {
  if (!label) return undefined;
  const first = label.trim().split(/\s+/)[0];
  return first || undefined;
};

export const normalizeDocNoInput = (input: any) => {
  // input 可能是：
  // 1) string：用户手输的文档编号
  // 2) { value, label, documentNumber, id, organizationCode, ... }：DocumentSelect（labelInValue=true）输出
  // 3) undefined/null
  const raw = input;

  const selectedDocumentId =
    raw && typeof raw === 'object' && !Array.isArray(raw) ? (raw.id as string | undefined) ?? (raw.value as string | undefined) : undefined;

  const labelText =
    raw && typeof raw === 'object' && !Array.isArray(raw) ? (raw.label as string | undefined) : undefined;

  const valueText =
    raw && typeof raw === 'object' && !Array.isArray(raw) ? (raw.value as string | undefined) : undefined;

  // 优先 documentNumber；缺失时尝试从 label 解析首段（label 通常为“编号 名称”）；
  // 最后才考虑 value（且必须不是 GUID，避免把 DocumentId 当作 DocNo）。
  const selectedDocumentNumber =
    raw && typeof raw === 'object' && !Array.isArray(raw)
      ? (raw.documentNumber as string | undefined) ||
        tryParseDocNumberFromLabel(labelText) ||
        (!isGuidLike(valueText) ? valueText : undefined)
      : (raw as string | undefined);

  const selectedOrganizationCode =
    raw && typeof raw === 'object' && !Array.isArray(raw) ? (raw.organizationCode as string | undefined) : undefined;

  const docNo = (selectedDocumentNumber ?? '').toString().trim();

  return {
    docNo,
    selectedDocumentId,
    selectedDocumentNumber: docNo || undefined,
    selectedOrganizationCode,
    raw,
  };
};
