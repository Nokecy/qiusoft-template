import React, { useState, useEffect } from 'react';
import { Card, Form, Select, Button, Alert, Descriptions, Tag, List, Space, Spin, message, Radio, TreeSelect } from 'antd';
import { BugOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import {
    DocumentAuthorizationDiagnoseDocumentAsync,
    DocumentAuthorizationDiagnoseLibraryAsync
} from '@/services/pdm/DocumentAuthorization';
import { DocumentLibraryGetListAsync } from '@/services/pdm/DocumentLibrary';
import { IdentityRoleProGetListAsync } from '@/services/openApi/IdentityRolePro';
import { IdentityUserProGetListAsync } from '@/services/openApi/IdentityUserPro';
import { OrganizationUnitGetTreeListAsync } from '@/services/openApi/OrganizationUnit';
import { OrganizationInfoGetOrganizationsByUserNameAsync } from '@/services/openApi/OrganizationInfo';
import { UserGetRolesAsync } from '@/services/openApi/User';
import DocumentSelect from '@/pages/appPdm/_formWidgets/DocumentSelect';
import {
    PermissionActionGroups,
    ResourceTypes,
    PrincipalTypes,
    PrincipalTypeOptions,
    SecurityLevelOptions
} from '../constants';

/** 简单的文档库树选择组件（不依赖Formily） */
const SimpleLibraryTreeSelect: React.FC<any> = (props) => {
    const [treeData, setTreeData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        DocumentLibraryGetListAsync({ SkipCount: 0, MaxResultCount: 10000 } as any)
            .then(res => {
                const activeItems = (res.items || []).filter((item: any) => item.isActive === true);
                // 构建树形结构
                const map = new Map();
                const roots: any[] = [];
                activeItems.forEach((item: any) => {
                    map.set(item.id, {
                        value: item.id,
                        title: item.libraryName || item.libraryCode || '-',
                        key: item.id,
                        children: []
                    });
                });
                activeItems.forEach((item: any) => {
                    const node = map.get(item.id);
                    if (item.parentLibraryId && map.has(item.parentLibraryId)) {
                        map.get(item.parentLibraryId).children.push(node);
                    } else {
                        roots.push(node);
                    }
                });
                setTreeData(roots);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <TreeSelect
            {...props}
            allowClear
            showSearch
            loading={loading}
            treeDefaultExpandAll
            treeData={treeData}
            filterTreeNode={(input: string, treeNode: any) =>
                treeNode.title.toLowerCase().includes(input.toLowerCase())
            }
        />
    );
};

/** 角色选择组件 */
const RoleSelect: React.FC<any> = (props) => {
    const { data, loading, run } = useRequest(
        async (filter?: string) => {
            const res = await IdentityRoleProGetListAsync({
                Filter: filter,
                SkipCount: 0,
                MaxResultCount: 100,
            });
            return res.items || [];
        },
        { manual: true }
    );

    return (
        <Select
            {...props}
            showSearch
            filterOption={false}
            loading={loading}
            onSearch={(value) => run(value)}
            onDropdownVisibleChange={(visible) => visible && run()}
            options={(data || []).map((item: any) => ({
                value: item.name,
                label: item.name,
            }))}
        />
    );
};

/** 用户选择组件 */
const UserSelect: React.FC<any> = (props) => {
    const { data, loading, run } = useRequest(
        async (filter?: string) => {
            const res = await IdentityUserProGetListAsync({
                Filter: filter ? `(name=*${filter}) | (userName=*${filter})` : '',
                SkipCount: 0,
                MaxResultCount: 100,
            });
            return res.items || [];
        },
        { manual: true }
    );

    return (
        <Select
            {...props}
            showSearch
            filterOption={false}
            loading={loading}
            onSearch={(value) => run(value)}
            onDropdownVisibleChange={(visible) => visible && run()}
            options={(data || []).map((item: any) => ({
                value: item.userName,
                label: `${item.userName} / ${item.name || ''}`,
                id: item.id, // 扩展：保留ID以便后续查询
            }))}
        />
    );
};

/** 部门选择组件 */
const OrgSelect: React.FC<any> = (props) => {
    const { data, loading, run } = useRequest(
        async () => {
            const res = await OrganizationUnitGetTreeListAsync({});
            // 展平树形数据为列表
            const flatten = (items: any[]): any[] => {
                return items.flatMap(item => [
                    item,
                    ...(item.children ? flatten(item.children) : [])
                ]);
            };
            return flatten(res.items || []);
        },
        { manual: true }
    );

    return (
        <Select
            {...props}
            showSearch
            filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            loading={loading}
            onDropdownVisibleChange={(visible) => visible && run()}
            options={(data || []).map((item: any) => ({
                value: item.code,
                label: item.title || item.displayName,
            }))}
        />
    );
};

interface DiagnosticResult {
    isAllowed: boolean;
    matchedRule: string;
    evidence: Array<{
        kind?: string;
        detail?: string;
        resourceId?: string;
    }>;
}

/** 权限诊断Tab组件 */
const DiagnosticsTab: React.FC = () => {
    const [form] = Form.useForm();

    // 状态
    const [resourceType, setResourceType] = useState<number>(ResourceTypes.Document);
    const [selectedResource, setSelectedResource] = useState<{ id: string; name: string } | null>(null);
    const [principalType, setPrincipalType] = useState<number>(PrincipalTypes.User);
    const [autoInfo, setAutoInfo] = useState<{ userId?: string; roleCodes?: string; ouCodes?: string }>({});
    const [fetchingAutoInfo, setFetchingAutoInfo] = useState(false);
    const [diagnosing, setDiagnosing] = useState(false);
    const [result, setResult] = useState<DiagnosticResult | null>(null);

    // 所有动作选项
    const allActionOptions = Object.values(PermissionActionGroups)
        .flatMap((group: any) => group.actions.map((a: any) => ({
            value: a.value,
            label: `${group.label} - ${a.label}`,
        })));

    // 资源类型变化
    const handleResourceTypeChange = (value: number) => {
        setResourceType(value);
        setSelectedResource(null);
        setResult(null);
    };

    // 文档选择变化
    const handleDocumentChange = (value: any, record: any) => {
        if (value && record) {
            setSelectedResource({
                id: record.id || value,
                name: `${record.documentNumber || '-'} ${record.documentName || ''}`,
            });
        } else {
            setSelectedResource(null);
        }
        setResult(null);
    };

    // 文档库选择变化
    const handleLibraryChange = (value: string, node: any) => {
        if (value && node) {
            setSelectedResource({
                id: value,
                name: node.title || value,
            });
        } else {
            setSelectedResource(null);
        }
        setResult(null);
    };

    // 主体类型变化
    const handlePrincipalTypeChange = (type: number) => {
        setPrincipalType(type);
        form.setFieldValue('principalKey', undefined);
        setAutoInfo({});
        setResult(null);
    };

    // 用户选择变化时，自动获取角色和组织
    const handleUserChange = async (userName: string, option: any) => {
        if (!userName) {
            setAutoInfo({});
            return;
        }

        setFetchingAutoInfo(true);
        try {
            const [rolesRes, orgsRes] = await Promise.all([
                UserGetRolesAsync({ id: option.id }),
                OrganizationInfoGetOrganizationsByUserNameAsync({ userName })
            ]);

            const roleCodes = (rolesRes.items || []).map((r: any) => r.name).join(',');
            const ouCodes = (orgsRes || []).map((o: any) => o.code).join(',');

            setAutoInfo({ userId: option.id, roleCodes, ouCodes });
            message.success(`已自动关联用户及其角色、组织信息`);
        } catch (error) {
            console.error('自动获取用户信息失败:', error);
            message.error('自动获取用户关联角色或组织失败');
        } finally {
            setFetchingAutoInfo(false);
        }
    };

    // 执行诊断
    const handleDiagnose = async () => {
        if (!selectedResource) {
            message.warning('请先选择诊断对象');
            return;
        }

        try {
            const values = await form.validateFields();

            setDiagnosing(true);

            // 构造诊断主体参数
            const diagParams: any = {
                permissionAction: values.action,
                userMaxSecurityLevel: values.userMaxSecurityLevel,
            };

            if (principalType === PrincipalTypes.User) {
                diagParams.userId = autoInfo.userId; // 使用自动获取到的真实 ID
                diagParams.roleCodes = autoInfo.roleCodes;
                diagParams.organizationUnitCodes = autoInfo.ouCodes;
            } else if (principalType === PrincipalTypes.Role) {
                // 如果是多选数组，转换为逗号分隔字符串
                diagParams.roleCodes = Array.isArray(values.principalKey)
                    ? values.principalKey.join(',')
                    : values.principalKey;
            } else if (principalType === PrincipalTypes.OU) {
                // 如果是多选数组，转换为逗号分隔字符串
                diagParams.organizationUnitCodes = Array.isArray(values.principalKey)
                    ? values.principalKey.join(',')
                    : values.principalKey;
            }

            if (resourceType === ResourceTypes.Document) {
                const response = await DocumentAuthorizationDiagnoseDocumentAsync({
                    documentId: selectedResource.id,
                    ...diagParams,
                });

                setResult({
                    isAllowed: response.isAllowed ?? false,
                    matchedRule: response.matchedRule || '未知规则',
                    evidence: (response.evidence || []) as DiagnosticResult['evidence'],
                });
            } else if (resourceType === ResourceTypes.Library) {
                const response = await DocumentAuthorizationDiagnoseLibraryAsync({
                    libraryId: selectedResource.id,
                    ...diagParams,
                });

                setResult({
                    isAllowed: response.isAllowed ?? false,
                    matchedRule: response.matchedRule || '未知规则',
                    evidence: (response.evidence || []) as DiagnosticResult['evidence'],
                });
            }
        } catch (error) {
            console.error('诊断失败:', error);
            message.error('诊断失败');
        } finally {
            setDiagnosing(false);
        }
    };

    // 获取证据类型图标
    const getEvidenceIcon = (kind: string) => {
        const iconMap: Record<string, string> = {
            acl: '📋',
            collaborator: '👥',
            author: '✍️',
            ou: '🏢',
            security: '🔒',
        };
        return iconMap[kind.toLowerCase()] || '📌';
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 280px)', minHeight: 500 }}>
            {/* 诊断表单 */}
            <Card title="权限诊断" size="small" style={{ marginBottom: 16 }}>
                <Form form={form} layout="vertical">
                    <Form.Item label="诊断对象类型">
                        <Radio.Group
                            value={resourceType}
                            onChange={(e) => handleResourceTypeChange(e.target.value)}
                            options={[
                                { value: ResourceTypes.Document, label: '文档' },
                                { value: ResourceTypes.Library, label: '文档库' },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item label="选择诊断对象" required>
                        {resourceType === ResourceTypes.Document ? (
                            <DocumentSelect
                                style={{ width: 400 }}
                                placeholder="搜索并选择文档..."
                                onChange={handleDocumentChange}
                            />
                        ) : (
                            <SimpleLibraryTreeSelect
                                style={{ width: 400 }}
                                placeholder="选择文档库..."
                                onChange={handleLibraryChange}
                            />
                        )}
                        {selectedResource && (
                            <Alert
                                message={`已选择: ${selectedResource.name}`}
                                type="success"
                                showIcon
                                style={{ marginTop: 8 }}
                            />
                        )}
                    </Form.Item>

                    <div style={{ display: 'flex', gap: 16 }}>
                        <Form.Item
                            name="principalType"
                            label="主体类型"
                            initialValue={PrincipalTypes.User}
                        >
                            <Radio.Group
                                options={PrincipalTypeOptions}
                                onChange={(e) => handlePrincipalTypeChange(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item
                            name="principalKey"
                            label="选择主体"
                            extra={principalType === PrincipalTypes.User && autoInfo.roleCodes ? `自动属性: 角色[${autoInfo.roleCodes}], 组织[${autoInfo.ouCodes || '无'}]` : '留空表示诊断当前登录用户或不限制主体'}
                        >
                            <Spin spinning={fetchingAutoInfo} size="small">
                                {principalType === PrincipalTypes.Role && (
                                    <RoleSelect style={{ width: 400 }} placeholder="搜索并选择角色..." />
                                )}
                                {principalType === PrincipalTypes.User && (
                                    <UserSelect style={{ width: 400 }} placeholder="搜索并选择用户..." onChange={handleUserChange} />
                                )}
                                {principalType === PrincipalTypes.OU && (
                                    <OrgSelect style={{ width: 400 }} placeholder="搜索并选择部门..." />
                                )}
                            </Spin>
                        </Form.Item>
                    </div>

                    <div style={{ display: 'flex', gap: 16 }}>
                        <Form.Item
                            name="action"
                            label="诊断动作"
                            rules={[{ required: true, message: '请选择要诊断的动作' }]}
                        >
                            <Select
                                placeholder="选择要诊断的动作..."
                                style={{ width: 400 }}
                                options={allActionOptions}
                            />
                        </Form.Item>

                        <Form.Item
                            name="userMaxSecurityLevel"
                            label="用户最高密级"
                            initialValue={4}
                        >
                            <Select
                                style={{ width: 120 }}
                                options={SecurityLevelOptions}
                            />
                        </Form.Item>
                    </div>

                    <Form.Item>
                        <Button
                            type="primary"
                            icon={<BugOutlined />}
                            onClick={handleDiagnose}
                            loading={diagnosing}
                            disabled={!selectedResource}
                        >
                            开始诊断
                        </Button>
                    </Form.Item>
                </Form>
            </Card>

            {/* 诊断结果 */}
            <Card title="诊断结果" size="small" style={{ flex: 1 }}>
                <Spin spinning={diagnosing}>
                    {result ? (
                        <div>
                            {/* 结论 */}
                            <Descriptions bordered size="small" column={1} style={{ marginBottom: 16 }}>
                                <Descriptions.Item label="结论">
                                    <Tag color={result.isAllowed ? 'success' : 'error'} style={{ fontSize: 16, padding: '4px 12px' }}>
                                        {result.isAllowed ? '✅ 允许' : '❌ 拒绝'}
                                    </Tag>
                                </Descriptions.Item>
                                <Descriptions.Item label="命中规则">
                                    <Tag color="blue">{result.matchedRule}</Tag>
                                </Descriptions.Item>
                            </Descriptions>

                            {/* 证据链 */}
                            <div>
                                <h4 style={{ marginBottom: 8 }}>证据链：</h4>
                                {result.evidence.length > 0 ? (
                                    <List
                                        size="small"
                                        bordered
                                        dataSource={result.evidence}
                                        renderItem={(item, index) => (
                                            <List.Item>
                                                <Space>
                                                    <span>{getEvidenceIcon(item.kind || '')}</span>
                                                    <Tag color="default">{item.kind || '-'}</Tag>
                                                    <span>{item.detail || '-'}</span>
                                                    {item.resourceId && (
                                                        <Tag color="purple">资源: {item.resourceId}</Tag>
                                                    )}
                                                </Space>
                                            </List.Item>
                                        )}
                                    />
                                ) : (
                                    <Alert message="无证据信息" type="info" />
                                )}
                            </div>
                        </div>
                    ) : (
                        <Alert
                            message="请配置诊断参数并点击开始诊断"
                            description="诊断功能可以帮助您快速定位权限问题，例如：为什么看不到文档？为什么不能下载？为什么不能发布？"
                            type="info"
                            showIcon
                        />
                    )}
                </Spin>
            </Card>
        </div>
    );
};

export default DiagnosticsTab;
