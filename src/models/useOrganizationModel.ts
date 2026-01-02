import { useCallback, useMemo, useState } from 'react';
import { OrganizationInfoGetCurrentUserOrganizationsAsync } from '@/services/openApi/OrganizationInfo';

const STORAGE_KEY = '_organizationCode';

export type OrganizationOption = {
    key: string;
    label: string;
    isDefault?: boolean;
};

const normalizeOrganization = (item: any): OrganizationOption => {
    return {
        key: item.code,
        label: item.name,
        isDefault: item.isDefault || item.IsDefault || item.isdefault,
    };
};

const readStoredOrganizationCode = () => {
    const code = localStorage.getItem(STORAGE_KEY);
    return code && code !== 'ALL' ? code : undefined;
};

const resolveOrganizationCode = (
    list: OrganizationOption[],
    currentCode?: string,
) => {
    if (!list.length) {
        return undefined;
    }

    const normalized = currentCode && currentCode !== 'ALL' ? currentCode : undefined;
    if (normalized && list.some(item => item.key === normalized)) {
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
            const res = await OrganizationInfoGetCurrentUserOrganizationsAsync();
            const list = (res || []).map(normalizeOrganization);
            setOrganizationList(list);

            const currentCode = organizationCode || readStoredOrganizationCode();
            const nextCode = resolveOrganizationCode(list, currentCode);
            if (nextCode !== currentCode) {
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
        () => organizationList.find(item => item.key === organizationCode),
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
