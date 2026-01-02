import React from 'react';
import { Tabs, Alert, Card } from 'antd';
import { SafetyOutlined, FileProtectOutlined, TeamOutlined, BugOutlined, BookOutlined } from '@ant-design/icons';
import { useAccess } from 'umi';
import { DocumentAuthorizationPermissions } from '@/pages/appPdm/_permissions';
import LibraryAclTab from './components/LibraryAclTab';
import DocumentAclTab from './components/DocumentAclTab';
import CollaboratorTab from './components/CollaboratorTab';
import DiagnosticsTab from './components/DiagnosticsTab';
import TemplateTab from './components/TemplateTab';

/**
 * 文档授权管理页面
 * 
 * 功能：
 * 1. 库授权 - 管理文档库的ACL规则
 * 2. 文档授权 - 管理单个文档的ACL规则
 * 3. 协作者 - 管理文档的协作者（Editor/Reviewer/Reader）
 * 4. 权限诊断 - 诊断用户对文档/库的权限
 */
const DocumentAuthorizationPage: React.FC = () => {
    const access = useAccess();

    const canManageLibraryAcl = access?.[DocumentAuthorizationPermissions.ManageLibraryAcl] ?? true;
    const canManageDocumentAcl = access?.[DocumentAuthorizationPermissions.ManageDocumentAcl] ?? true;
    const canManageCollaborators = access?.[DocumentAuthorizationPermissions.ManageCollaborators] ?? true;
    const canManageTemplates = access?.[DocumentAuthorizationPermissions.ManageTemplates] ?? true;
    const canDiagnostics = access?.[DocumentAuthorizationPermissions.Diagnostics] ?? true;

    const tabItems = [
        {
            key: 'library',
            label: (
                <span>
                    <SafetyOutlined />
                    库授权
                </span>
            ),
            children: <LibraryAclTab />,
            disabled: !canManageLibraryAcl,
        },
        {
            key: 'document',
            label: (
                <span>
                    <FileProtectOutlined />
                    文档授权
                </span>
            ),
            children: <DocumentAclTab />,
            disabled: !canManageDocumentAcl,
        },
        {
            key: 'collaborator',
            label: (
                <span>
                    <TeamOutlined />
                    协作者
                </span>
            ),
            children: <CollaboratorTab />,
            disabled: !canManageCollaborators,
        },
        {
            key: 'template',
            label: (
                <span>
                    <BookOutlined />
                    授权模板
                </span>
            ),
            children: <TemplateTab />,
            disabled: !canManageTemplates,
        },
        {
            key: 'diagnostics',
            label: (
                <span>
                    <BugOutlined />
                    权限诊断
                </span>
            ),
            children: <DiagnosticsTab />,
            disabled: !canDiagnostics,
        },
    ];

    return (
        <div style={{ padding: 24, background: '#f5f5f5', minHeight: '100%' }}>
            {/* 策略说明 */}
            <Alert
                message="授权策略说明"
                description={
                    <ul style={{ margin: 0, paddingLeft: 20 }}>
                        <li><strong>默认不可见</strong>：非作者/非协作者/无ACL的用户无法访问文档</li>
                        <li><strong>Deny优先</strong>：显式拒绝规则优先于允许规则</li>
                        <li><strong>作者权限</strong>：作者拥有除授权管理外的所有权限，不受密级限制</li>
                        <li><strong>继承规则</strong>：子库/文档会继承父库的ACL规则，但可以被本节点规则覆盖</li>
                    </ul>
                }
                type="info"
                showIcon
                closable
                style={{ marginBottom: 16 }}
            />

            {/* Tab页 */}
            <Card bodyStyle={{ padding: 0 }}>
                <Tabs
                    defaultActiveKey="library"
                    items={tabItems}
                    tabBarStyle={{ padding: '0 16px', marginBottom: 0 }}
                    style={{ minHeight: 500 }}
                />
            </Card>
        </div>
    );
};

export default DocumentAuthorizationPage;

export const routeProps = {
    name: '文档授权管理',
};
