import { useCallback, useMemo, useState } from 'react';
import { OrganizationInfoGetCurrentUserOrganizationsAsync } from '@/services/openApi/OrganizationInfo';

const STORAGE_KEY = '_organizationCode';

export type OrganizationOption = {
    key: string;
    label: string;
    isDefault?: boolean;
};

const normalizeOrganization = (item: any): OrganizationOption => {
    const key =
        item?.code ??
        item?.organizationCode ??
        item?.orgCode ??
        item?.OrganizationCode ??
        item?.Code ??
        item?.id ??
        item?.Id;
    const label = item?.name ?? item?.organizationName ?? item?.displayName ?? item?.Name;
    return {
        key: key ? String(key) : '',
        label: label ? String(label) : '',
        isDefault: item?.isDefault || item?.IsDefault || item?.isdefault,
    };
};

const readStoredOrganizationCode = () => {
    const code = localStorage.getItem(STORAGE_KEY);
    return code && code !== 'ALL' ? code : undefined;
};

const resolveOrganizationCode = (
    list: OrganizationOption[],
    currentCode?: string,
    /** 是否保留当前值（即使不在列表中） */
    preserveCurrentCode?: boolean,
) => {
    if (!list.length) {
        return currentCode; // 列表为空时保留当前值
    }

    const normalized = currentCode && currentCode !== 'ALL' ? currentCode : undefined;
    if (normalized) {
        // 先精确匹配
        if (list.some(item => item.key === normalized)) {
            return normalized;
        }
        // 再尝试不区分大小写匹配（兼容不同 API 返回的 code 格式差异）
        const matchedItem = list.find(item =>
            item.key.toLowerCase() === normalized.toLowerCase()
        );
        if (matchedItem) {
            return matchedItem.key; // 返回列表中实际的 key
        }
    }

    // 如果需要保留当前值且当前值存在，即使不在列表中也保留
    // 这确保登录时选择的组织不会被覆盖
    if (preserveCurrentCode && normalized) {
        return normalized;
    }

    const defaultOrg = list.find(item => item.isDefault);
    return (defaultOrg || list[0])?.key;
};

export default function useOrganizationModel() {
    const [organizationCode, setOrganizationCodeState] = useState<string | undefined>(
        () => readStoredOrganizationCode(),
    );
    const [organizationList, setOrganizationList] = useState<OrganizationOption[]>([]);
    const [loading, setLoading] = useState(false);

    const setOrganizationCode = useCallback((code?: string) => {
        const nextCode = code && code !== 'ALL' ? code : undefined;
        if (nextCode) {
            localStorage.setItem(STORAGE_KEY, nextCode);
        } else {
            localStorage.removeItem(STORAGE_KEY);
        }
        setOrganizationCodeState(nextCode);
    }, []);

    const loadOrganizations = useCallback(async () => {
        setLoading(true);
        try {
            const res = await OrganizationInfoGetCurrentUserOrganizationsAsync({
                headers: { 'x-skip-organization': '1' },
            });
            const list = (res || []).map(normalizeOrganization).filter(item => item.key);
            const seen = new Set<string>();
            const uniqueList = list.filter(item => {
                if (seen.has(item.key)) {
                    return false;
                }
                seen.add(item.key);
                return true;
            });
            setOrganizationList(uniqueList);

            // 优先使用 localStorage 中的值，确保登录时选择的组织不会丢失
            const storedCode = readStoredOrganizationCode();
            const currentCode = storedCode || organizationCode;
            // 首次加载时保留 localStorage 中的值（即使不在列表中）
            const nextCode = resolveOrganizationCode(uniqueList, currentCode, !!storedCode);

            // 如果状态与应该使用的值不同，更新状态
            if (nextCode && nextCode !== organizationCode) {
                setOrganizationCode(nextCode);
            } else if (!organizationCode && nextCode) {
                // 如果状态为空但有值需要设置
                setOrganizationCode(nextCode);
            }

            return list;
        } catch (error) {
            console.error('Failed to load organizations:', error);
            return [];
        } finally {
            setLoading(false);
        }
    }, [organizationCode, setOrganizationCode]);

    const selectedOrganization = useMemo(
        () => {
            if (!organizationCode) return undefined;
            // 先精确匹配
            const exactMatch = organizationList.find(item => item.key === organizationCode);
            if (exactMatch) return exactMatch;
            // 再尝试不区分大小写匹配
            return organizationList.find(item =>
                item.key.toLowerCase() === organizationCode.toLowerCase()
            );
        },
        [organizationList, organizationCode],
    );

    return {
        organizationCode,
        organizationList,
        selectedOrganization,
        loading,
        loadOrganizations,
        setOrganizationCode,
    };
}
