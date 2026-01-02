/**
 * 文档详情页面 - 工业实用主义设计
 * 路由: /appPdm/DocumentManagement/Document/detail?id={documentId}
 *
 * 设计理念:
 * - 紧凑布局: 左侧固定导航 + 右侧内容区
 * - 高信息密度: 减少装饰性元素,提高数据展示效率
 * - 工业风格: 深色调、高对比度、实用性优先
 * - 快速定位: 侧边导航快速切换各模块
 */

import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
    Button,
    Space,
    message,
    Spin,
    Tag,
    Progress,
    Empty,
    Badge,
    Menu,
    Divider,
    Tooltip,
    Modal,
    Select,
    Alert,
} from 'antd';
import {
    ArrowLeftOutlined,
    FileTextOutlined,
    EyeOutlined,
    RedoOutlined,
    InfoCircleOutlined,
    AppstoreOutlined,
    HistoryOutlined,
    TeamOutlined,
    LockOutlined,
    UnlockOutlined,
    FileOutlined,
    PartitionOutlined,
    UserOutlined,
    ClockCircleOutlined,
    DownloadOutlined,
    BranchesOutlined,
    SafetyCertificateOutlined,
    CheckCircleOutlined,
    FileZipOutlined,
    EditOutlined,
    PlusOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import { history, Access, useAccess, useModel } from 'umi';
import { ICellRendererParams } from 'ag-grid-community';
import dayjs from 'dayjs';
import { useKeepAliveParams } from '@/hooks';
import { DocumentManagementPermissions } from '@/pages/appPdm/_permissions';
import { DocumentGetAsync, DocumentGetVersionAsync, DocumentGetVersionListAsync } from '@/services/pdm/Document';
import {
    DocumentFileDownloadFileAsync,
    DocumentFileDownloadCurrentRevisionFilesAsZipAsync,
    DocumentFileGetFilesAsync,
} from '@/services/pdm/DocumentFile';
import {
    DocumentLifecycleSubmitForApprovalAsync,
    DocumentLifecycleApproveAsync,
    DocumentLifecycleReleaseAsync,
} from '@/services/pdm/DocumentLifecycle';
import { DocumentConversionRetryAsync } from '@/services/pdm/DocumentConversion';
import { PartGetListAsync } from '@/services/pdm/Part';
import DrawingViewer from '@/components/DrawingViewer';
import { AgGridPlus, AgGridColumn } from '@/components/agGrid';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import ForceUnlockDialog from './components/ForceUnlockDialog';
import DiscardRevisionDialog from './components/DiscardRevisionDialog';
import CheckOutDialog from './components/CheckOutDialog';
import CheckInDialog from './components/CheckInDialog';
import VersionSwitcher, { ViewMode } from './components/VersionSwitcher';
import EditWorkingDocumentDialog from './components/EditWorkingDocumentDialog';
import AddFileDialog from './components/AddFileDialog';
import { DocumentFileDeleteFileAsync } from '@/services/pdm/DocumentFile';
import {
    PublishState,
    publishStateConfig,
    revisionStateConfig,
    derivePublishState,
    canCheckOut as canCheckOutFn,
    canCheckIn as canCheckInFn,
    canForceUnlock,
    canDiscardRevision,
    canSubmit as canSubmitFn,
    canApprove as canApproveFn,
    canRelease as canReleaseFn,
    canEdit,
    isUnreleasedDocument,
    formatVersionNumber,
} from './_utils/documentStatus';
import { DocumentFileContentDownloadAsZipAsync, DocumentFileContentGetContentAsync } from '@/services/pdm/DocumentFileContent';

export const routeProps = {
    name: '文档详情',
};

// ==================== 样式定义 ====================

const styles = {
    container: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column' as const,
        background: '#f5f5f5',
        overflow: 'hidden',
    },
    toolbar: {
        height: '48px',
        minHeight: '48px',
        background: '#ffffff',
        borderBottom: '1px solid #d9d9d9',
        padding: '0 12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
    },
    toolbarLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        overflow: 'hidden',
    },
    documentIdentity: {
        display: 'flex',
        alignItems: 'baseline',
        gap: '8px',
        overflow: 'hidden',
    },
    documentCode: {
        fontSize: '15px',
        fontWeight: 600,
        color: '#262626',
        whiteSpace: 'nowrap' as const,
    },
    documentName: {
        fontSize: '13px',
        color: '#595959',
        whiteSpace: 'nowrap' as const,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '300px',
    },
    body: {
        flex: 1,
        display: 'flex',
        overflow: 'hidden',
    },
    sider: {
        width: '160px',
        minWidth: '160px',
        background: '#ffffff',
        borderRight: '1px solid #d9d9d9',
        display: 'flex',
        flexDirection: 'column' as const,
        flexShrink: 0,
    },
    content: {
        flex: 1,
        overflow: 'hidden',
        padding: '12px',
        background: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column' as const,
    },
    section: {
        background: '#ffffff',
        border: '1px solid #e8e8e8',
        borderRadius: '4px',
        padding: '12px 16px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column' as const,
    },
    sectionHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '12px',
        paddingBottom: '8px',
        borderBottom: '1px solid #e8e8e8',
    },
    sectionTitle: {
        margin: 0,
        fontSize: '14px',
        fontWeight: 600,
        color: '#262626',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    titleBar: {
        content: '',
        display: 'inline-block',
        width: '3px',
        height: '14px',
        background: '#1890ff',
        borderRadius: '1px',
        marginRight: '8px',
    },
    infoGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 0,
    },
    infoGridCols2: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 0,
    },
    infoRow: {
        display: 'flex',
        padding: '6px 0',
        borderBottom: '1px dashed #e8e8e8',
    },
    infoLabel: {
        width: '80px',
        minWidth: '80px',
        fontSize: '12px',
        color: '#8c8c8c',
        lineHeight: '22px',
    },
    infoValue: {
        flex: 1,
        fontSize: '13px',
        color: '#262626',
        lineHeight: '22px',
        wordBreak: 'break-all' as const,
    },
    infoValuePrimary: {
        flex: 1,
        fontSize: '13px',
        fontWeight: 600,
        color: '#1890ff',
        lineHeight: '22px',
        wordBreak: 'break-all' as const,
    },
    loading: {
        height: '100%',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
};

// ==================== 类型定义 ====================

interface DocumentDetailData {
    id: string;
    documentNumber: string;
    documentName: string;
    version?: string;
    revision?: string;
    currentRevision?: string | RevisionHistoryData;  // 当前修订版本(可能是字符串或对象)
    currentRevisionId?: string;    // 当前修订ID
    currentRevisionState?: number; // 当前修订状态
    latestVersionId?: string;      // 最新发布版本ID
    publishState?: number;         // 发布状态（后端计算）
    lifecycleState: number;
    isCheckedOut: boolean;
    documentTypeName?: string;
    documentLibraryName?: string;
    securityLevel?: number;
    keywords?: string;
    description?: string;
    organizationCode?: string;
    organizationName?: string;
    companyCode?: string;
    factoryCode?: string;
    creator?: string;
    creationTime?: string;
    lastModifier?: string;
    lastModificationTime?: string;
    checkOutInfo?: {
        checkedOutUserId?: string;
        checkedOutUserName?: string;
        checkedOutTime?: string;
        checkOutComment?: string;
    };
    files?: DocumentFileData[];
    partDocumentLinks?: PartDocumentLinkData[];
    recentConversions?: ConversionTaskData[];
    revisionHistory?: RevisionHistoryData[];
}

// 转换任务摘要（与后端 DocumentConversionSummaryDto 对应）
interface ConversionSummaryData {
    id: string;                   // 转换任务ID
    status: number;               // 转换状态
    drawingType?: number;         // 图纸类型
    targetFormat?: number;        // 目标格式
    progressPercentage?: number;  // 进度百分比
    errorMessage?: string;        // 错误信息
    completedAt?: string;         // 完成时间
}

interface DocumentFileData {
    id: string;
    fileName: string;
    fileRole: number;
    fileSize?: number;
    fileExtension?: string;       // 文件扩展名
    mimeType?: string;            // MIME类型
    creationTime?: string;
    documentRevisionId?: string;  // 所属修订ID
    conversion?: ConversionSummaryData; // 转换任务信息
}

interface PartDocumentLinkData {
    id: string;
    partNumber: string;
    partName: string;
    drawingNumber?: string;
    usage?: number;
    isPrimary: boolean;
    creationTime?: string;
}

interface ConversionTaskData {
    id: string;
    sourceFileName: string;
    sourceFileId?: string;        // 源文件ID，用于 by-file 预览接口
    drawingType: number;
    targetFormat: number;
    status: number;
    progressPercentage?: number;
    creationTime?: string;
    completedAt?: string;
    errorMessage?: string;
}

interface RevisionHistoryData {
    id: string;
    majorVersion?: string | number;  // 主版本号(可能是字符串"A"或数字1)
    minorRevision?: string;          // 次修订版本
    fullVersion?: string;            // 完整版本号
    publishStatus?: number;          // 发布状态（0/1/2：未发布/已发布/已作废）
    state?: number;                  // 状态
    changeRequestId?: string;        // 变更请求ID
    approvalRoute?: string;          // 审批路线
    approvalComment?: string;        // 审批意见
    approvedBy?: string;             // 审批人
    approvedTime?: string;           // 审批时间
    isCurrent: boolean;              // 是否为当前版本
    creationTime?: string;           // 创建时间
    files?: any[];                   // 文件列表
}

// ==================== 枚举配置 ====================

// 文档版本发布状态（版本历史列表使用该字段展示）
enum PublishStatus {
    Unpublished = 0, // 未发布（预留）
    Published = 1,   // 已发布（有效）
    Voided = 2,      // 已作废（不可下载）
}

// 安全级别
const securityLevelConfig: Record<number, string> = {
    0: '公开',
    1: '内部',
    2: '机密',
    3: '绝密',
};

// 文件角色
enum DocumentFileRole {
    Primary = 0,    // 主文档
    Secondary = 1,  // 次要文档
}

const fileRoleConfig: Record<number, { label: string; color: string }> = {
    [DocumentFileRole.Primary]: { label: '主文档', color: 'blue' },
    [DocumentFileRole.Secondary]: { label: '次要文档', color: 'default' },
};

// 转换状态
enum ConversionStatus {
    Pending = 0,
    Converting = 10,
    Completed = 20,
    Failed = 30,
    Cancelled = 40,
}

const conversionStatusConfig: Record<number, { label: string; color: string }> = {
    [ConversionStatus.Pending]: { label: '等待中', color: 'default' },
    [ConversionStatus.Converting]: { label: '转换中', color: 'processing' },
    [ConversionStatus.Completed]: { label: '已完成', color: 'success' },
    [ConversionStatus.Failed]: { label: '失败', color: 'error' },
    [ConversionStatus.Cancelled]: { label: '已取消', color: 'warning' },
};

// 目标格式
enum LightweightFormat {
    ZIP = 1,
    GLB = 2,
    OBJ = 3,
    SVF = 4,
    ImageSequence = 5,
    GLTF = 6,
}

const formatConfig: Record<number, string> = {
    [LightweightFormat.ZIP]: 'ZIP',
    [LightweightFormat.GLB]: 'GLB',
    [LightweightFormat.OBJ]: 'OBJ',
    [LightweightFormat.SVF]: 'SVF',
    [LightweightFormat.ImageSequence]: '图片序列',
    [LightweightFormat.GLTF]: 'GLTF',
};

// 图纸类型
enum DrawingType {
    Unspecified = 0,
    TwoD = 1,
    ThreeD = 2,
}

const drawingTypeConfig: Record<number, { label: string; color: string }> = {
    [DrawingType.Unspecified]: { label: '未指定', color: 'default' },
    [DrawingType.TwoD]: { label: '2D图纸', color: 'blue' },
    [DrawingType.ThreeD]: { label: '3D图纸/模型', color: 'green' },
};

// 关系用途
enum RelationUsage {
    Reference = 10,      // 参考
    Design = 20,         // 设计
    Manufacturing = 30,  // 制造
    Assembly = 40,       // 装配
    Testing = 50,        // 测试
    Maintenance = 60,    // 维护
    Quality = 70,        // 质量
    Packaging = 80,      // 包装
    Documentation = 90,  // 文档
    Other = 999,         // 其他
}

const relationUsageConfig: Record<number, string> = {
    [RelationUsage.Reference]: '参考',
    [RelationUsage.Design]: '设计',
    [RelationUsage.Manufacturing]: '制造',
    [RelationUsage.Assembly]: '装配',
    [RelationUsage.Testing]: '测试',
    [RelationUsage.Maintenance]: '维护',
    [RelationUsage.Quality]: '质量',
    [RelationUsage.Packaging]: '包装',
    [RelationUsage.Documentation]: '文档',
    [RelationUsage.Other]: '其他',
};

// ==================== 导航菜单配置 ====================

const NAV_ITEMS = [
    { key: 'basic', label: '概览', icon: <InfoCircleOutlined /> },
    { key: 'conversions', label: '转换任务', icon: <AppstoreOutlined /> },
    { key: 'partLinks', label: '物料关联', icon: <PartitionOutlined /> },
    { key: 'revisions', label: '版本历史', icon: <BranchesOutlined /> },
    { key: 'organization', label: '组织信息', icon: <TeamOutlined /> },
    { key: 'audit', label: '审计信息', icon: <HistoryOutlined /> },
];

// ==================== 组件实现 ====================

const DocumentDetailPage: React.FC = () => {
    // 使用 KeepAlive 参数 Hook
    const { id: documentId, isActive, hasChanged } = useKeepAliveParams(
        '/appPdm/DocumentManagement/Document/detail',
        ['id']
    );
    const access = useAccess();
    const { initialState } = useModel('@@initialState');
    const currentUserId = initialState?.configuration?.currentUser?.id;

    // 权限检查
    const hasCheckOutPerm = !!(access && (access[DocumentManagementPermissions.CheckOut] ?? true));
    const hasCheckInPerm = !!(access && (access[DocumentManagementPermissions.CheckIn] ?? true));
    const hasDownloadPerm = !!(access && (access[DocumentManagementPermissions.DownloadFile] ?? true));
    const hasSubmitPerm = !!(access && (access[DocumentManagementPermissions.Submit] ?? true));
    const hasApprovePerm = !!(access && (access[DocumentManagementPermissions.Approve] ?? true));
    const hasReleasePerm = !!(access && (access[DocumentManagementPermissions.Release] ?? true));
    const hasForceUnlockPerm = !!(access && (access[DocumentManagementPermissions.ForceUnlock] ?? true));
    const hasDiscardRevisionPerm = !!(access && (access[DocumentManagementPermissions.DiscardRevision] ?? true));
    const hasUpdatePerm = !!(access && (access[DocumentManagementPermissions.Update] ?? true));
    const hasDeleteFilePerm = !!(access && (access[DocumentManagementPermissions.DeleteFile] ?? true));

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DocumentDetailData | null>(null);
    const [activeSection, setActiveSection] = useState('basic');
    const [selectedRevisionId, setSelectedRevisionId] = useState<string | null>(null);

    // 图纸查看器状态
    const [viewerVisible, setViewerVisible] = useState(false);
    const [modelUrl, setModelUrl] = useState('');
    const [currentDrawingType, setCurrentDrawingType] = useState<number>(2);

    // 弹窗状态
    const [forceUnlockVisible, setForceUnlockVisible] = useState(false);
    const [discardRevisionVisible, setDiscardRevisionVisible] = useState(false);
    const [checkOutVisible, setCheckOutVisible] = useState(false);
    const [checkInVisible, setCheckInVisible] = useState(false);
    const [editWorkingVisible, setEditWorkingVisible] = useState(false);
    const [addFileVisible, setAddFileVisible] = useState(false);

    // 版本查看模式
    const [viewMode, setViewMode] = useState<ViewMode>('working');

    // 文件列表 Grid 引用
    const fileGridRef = useRef<GridRef>();

    // ==================== 辅助函数 ====================

    // 格式化日期
    const formatDate = (date: string | undefined) => {
        return date ? dayjs(date).format('YYYY-MM-DD HH:mm:ss') : '-';
    };

    // 格式化文件大小
    const formatFileSize = (size: number | undefined) => {
        if (!size) return '-';
        if (size < 1024) return `${size} B`;
        if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
        return `${(size / 1024 / 1024).toFixed(2)} MB`;
    };

    // 获取生命周期状态配置
    const getLifecycleConfig = (state: number) => {
        return publishStateConfig[state] || { label: '未知', color: 'default' };
    };

    // 获取当前选中的版本数据
    const getSelectedRevision = useCallback((): RevisionHistoryData | null => {
        if (!data || !data.revisionHistory || !selectedRevisionId) {
            // 如果没有选中版本,返回当前版本
            return data?.revisionHistory?.find(r => r.isCurrent) || null;
        }
        return data.revisionHistory.find(r => r.id === selectedRevisionId) || null;
    }, [data, selectedRevisionId]);

    // 判断是否为当前版本
    const isCurrentRevision = useCallback((): boolean => {
        const selectedRevision = getSelectedRevision();
        return selectedRevision?.isCurrent ?? true;
    }, [getSelectedRevision]);

    // ==================== 数据加载 ====================

    // 加载详情数据
    // preserveViewMode: 为 true 时保持当前视图模式，通常在操作后刷新时使用
    const loadDetail = useCallback(async (id: string, preserveViewMode: boolean = false) => {
        if (!id) return;

        setLoading(true);
        try {
            const res = await DocumentGetAsync({ id });

            // 获取文件列表
            // 优先使用 DocumentFileGetFilesAsync，它会自动处理草稿和发布版本的文件
            let versionFiles: any[] = [];
            try {
                const filesRes = await DocumentFileGetFilesAsync({ documentId: res.id! });
                versionFiles = filesRes || [];
            } catch (e) {
                console.error('获取文件列表失败:', e);
                // 如果失败且有 latestVersionId，尝试从版本获取
                if (res.latestVersionId) {
                    try {
                        const versionRes = await DocumentGetVersionAsync({ versionId: res.latestVersionId });
                        versionFiles = versionRes.files || [];
                    } catch (e2) {
                        console.error('获取版本文件失败:', e2);
                    }
                }
            }

            // 获取版本历史 (使用列表查询以获得完整数据)
            let revisionHistory: RevisionHistoryData[] = [];
            try {
                // 使用 DocumentGetVersionListAsync 查询该文档的所有版本
                const historyRes = await DocumentGetVersionListAsync({
                    Filter: `DocumentId = ${res.id}`, // Gridify：字段名建议 PascalCase，Guid 建议加引号
                    // Sorting: 'creationTime desc',      // 按创建时间倒序
                    MaxResultCount: 100,               // 获取足够多的历史记录
                });

                console.log('Version History Response:', historyRes);

                if (historyRes?.items && Array.isArray(historyRes.items)) {
                    revisionHistory = historyRes.items.map(item => ({
                        id: (item as any).id || '',
                        majorVersion: (item as any).version,
                        minorRevision: (item as any).revision,
                        fullVersion: Object.keys(formatConfig).length > 0 ? `${(item as any).version || ''}${(item as any).revision || ''}` : '',
                        publishStatus: (item as any).publishStatus ?? (item as any).publishState ?? (item as any).state,
                        state: (item as any).state,
                        changeRequestId: (item as any).changeRequestId,
                        approvalRoute: (item as any).approvalRoute,
                        approvalComment: (item as any).approvalComment,
                        approvedBy: (item as any).approvedBy,
                        approvedTime: (item as any).approvedTime,
                        isCurrent: (item as any).isCurrent,
                        creationTime: (item as any).creationTime,
                        files: (item as any).files,
                    })) as RevisionHistoryData[];
                }
            } catch (e) {
                console.error('获取版本历史失败:', e);
            }

            // 如果没有获取到历史（或者是新文档），至少包含当前信息作为一条记录
            // 注意：草稿文档没有 latestVersionId，应使用 currentRevisionId
            // 如果都没有（极端情况），使用 'draft' 作为占位符，避免使用文档 ID 去查询版本
            if (revisionHistory.length === 0) {
                const fallbackVersionId = res.latestVersionId || res.currentRevisionId || '__draft__';
                revisionHistory = [{
                    id: fallbackVersionId,
                    majorVersion: res.version,
                    minorRevision: res.revision,
                    fullVersion: `${res.version || ''}${res.revision || ''}`,
                    publishStatus: 0,
                    state: res.currentRevisionState,
                    isCurrent: true,
                    files: versionFiles,
                }];
            } else if (res.latestVersionId && versionFiles.length > 0) {
                // 如果获取到了历史记录，且有最新版本的文件信息，将其合并到对应的历史记录中
                // 列表接口可能只返回版本基本信息，不包含文件列表
                const latestVersionIndex = revisionHistory.findIndex(r => r.id === res.latestVersionId);
                if (latestVersionIndex !== -1) {
                    revisionHistory[latestVersionIndex].files = versionFiles;
                } else {
                    // 如果找不到ById，尝试通过版本匹配(防止ID不一致或版本切换)
                    // 或者默认 latestVersionId 对应的是 isCurrent=true 的那个? 
                    // 不一定，latestVersionId 是"最新发布版本"，currentRevision 是"当前修订"(可能是草稿)
                    // 如果存在 Working Copy (Draft)，latestVersionId 指向的是发布的版本。
                    // versionFiles 来自 DocumentGetVersionAsync({ versionId: res.latestVersionId })，所以它是发布版本的文件。
                }

                // 如果当前文档是草稿状态(Working Copy)，且 revisionHistory 中有对应的记录
                // 我们可能需要额外获取 Draft 的文件? 
                // DocumentGetAsync(res) 如果没有 returning files，那 Draft 的文件怎么拿?
                // 暂时假设 versionFiles 是主要想展示的文件。
                // 如果用户处于 Working Copy，通常 checkOutInfo 存在。
            }

            setData({
                ...res,
                files: versionFiles,
                revisionHistory,
            } as any);

            // 根据签出状态设置默认视图模式：已签出显示工作区，未签出显示最新版本
            // 只有在非保持模式时才重新计算视图模式和选中版本
            if (!preserveViewMode) {
                const defaultViewMode = res.isCheckedOut ? 'working' : 'latest';
                setViewMode(defaultViewMode);

                // 设置默认选中的版本 - 根据视图模式选择
                if (revisionHistory.length > 0) {
                    if (defaultViewMode === 'latest' && res.latestVersionId) {
                        // 最新发布模式：优先选择 latestVersionId 对应的版本
                        const latestReleased = revisionHistory.find((r) => r.id === res.latestVersionId);
                        setSelectedRevisionId(latestReleased?.id || revisionHistory[0].id);
                    } else {
                        // 工作区模式：选择当前版本（isCurrent=true）或回退到第一个
                        const current = revisionHistory.find((r) => r.isCurrent);
                        setSelectedRevisionId(current?.id || revisionHistory[0].id);
                    }
                }
            }
        } catch (error) {
            message.error('加载详情失败');
            console.error('加载详情失败:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    // 监听URL参数变化 (使用 KeepAlive Hook 自动处理路径匹配)
    useEffect(() => {
        // Hook 已自动处理路径匹配
        if (!isActive || !hasChanged) {
            return;
        }
        const currentId = documentId;

        if (!currentId) {
            return;
        }

        // 清空旧数据
        setData(null);

        // 加载新数据
        loadDetail(currentId);
    }, [isActive, hasChanged, documentId, loadDetail]);

    // 监听选中版本变化，如果缺少文件列表则懒加载
    // 注意：对于草稿文档，不需要额外加载，因为 loadDetail 已经通过 DocumentFileGetFilesAsync_2 获取了文件
    useEffect(() => {
        if (!selectedRevisionId || !data?.revisionHistory) return;

        // 如果是占位符 ID（如草稿文档），不发起版本详情请求
        if (selectedRevisionId === '__draft__') {
            return;
        }

        // 如果 selectedRevisionId 等于 currentRevisionId，说明是草稿，不需要重新请求
        // 因为文件已在 loadDetail 中通过 DocumentFileGetFilesAsync_2 获取
        if (selectedRevisionId === data?.currentRevisionId) {
            return;
        }

        const selectedRev = data.revisionHistory.find(r => r.id === selectedRevisionId);
        // 如果文件列表为空（且不是刚刚加载中的状态），尝试获取
        // 只对已发布的版本通过 DocumentGetVersionAsync 获取文件
        if (selectedRev && (!selectedRev.files || selectedRev.files.length === 0)) {
            (async () => {
                try {
                    const detailRes = await DocumentGetVersionAsync({ versionId: selectedRevisionId });
                    if (detailRes.files && detailRes.files.length > 0) {
                        setData(prev => {
                            if (!prev || !prev.revisionHistory) return prev;
                            return {
                                ...prev,
                                revisionHistory: prev.revisionHistory.map(r =>
                                    r.id === selectedRevisionId ? { ...r, files: detailRes.files } : r
                                )
                            };
                        });
                    }
                } catch (e) {
                    console.error("Auto-fetch version files failed", e);
                }
            })();
        }
    }, [selectedRevisionId, data?.revisionHistory, data?.currentRevisionId]);

    // ==================== 事件处理 ====================

    // 返回列表
    const handleBack = () => {
        history.push('/appPdm/DocumentManagement/Document');
    };

    // 签出文档
    // 签出文档 - 打开弹窗
    const handleCheckOut = () => {
        setCheckOutVisible(true);
    };

    // 签入文档 - 打开弹窗
    const handleCheckIn = () => {
        setCheckInVisible(true);
    };

    // 提交审批
    const handleSubmitForApproval = async () => {
        if (!data?.id) return;
        const hide = message.loading('正在提交审批...', 0);
        try {
            await DocumentLifecycleSubmitForApprovalAsync({ id: data.id });
            message.success('提交审批成功');
            loadDetail(data.id, true);
        } catch (error: any) {
            message.error(error?.message || '提交审批失败');
        } finally {
            hide();
        }
    };

    // 批准文档
    const handleApprove = async () => {
        if (!data?.id) return;
        const hide = message.loading('正在批准...', 0);
        try {
            await DocumentLifecycleApproveAsync({ id: data.id });
            message.success('批准成功');
            loadDetail(data.id, true);
        } catch (error: any) {
            message.error(error?.message || '批准失败');
        } finally {
            hide();
        }
    };

    // 发布文档
    const handleRelease = async () => {
        if (!data?.id) return;
        const hide = message.loading('正在发布...', 0);
        try {
            await DocumentLifecycleReleaseAsync({ id: data.id });
            message.success('发布成功');
            loadDetail(data.id, true);
        } catch (error: any) {
            message.error(error?.message || '发布失败');
        } finally {
            hide();
        }
    };

    // 刷新数据（弹窗成功后调用，保持当前视图模式）
    const handleRefresh = () => {
        if (data?.id) {
            loadDetail(data.id, true);
        }
    };

    // 判断是否为本人签出
    const isMyCheckOut = data?.isCheckedOut && data?.checkOutInfo?.checkedOutUserId === currentUserId;

    // 判断是否可以编辑文档（未发布草稿或本人签出都可编辑）
    const canEditDocument = data ? canEdit(data, currentUserId) : false;

    // 删除文件
    const handleDeleteFile = (file: DocumentFileData) => {
        if (!data?.id) return;

        Modal.confirm({
            title: '确认删除文件',
            content: `确定要删除文件 "${file.fileName}" 吗？此操作不可恢复。`,
            okType: 'danger',
            okText: '删除',
            cancelText: '取消',
            onOk: async () => {
                const hide = message.loading('正在删除...', 0);
                try {
                    await DocumentFileDeleteFileAsync({
                        documentId: data.id,
                        fileId: file.sourceDocumentFileId,
                    });
                    message.success('删除成功');
                    handleRefresh();
                } catch (error: any) {
                    message.error(error?.message || '删除失败');
                } finally {
                    hide();
                }
            },
        });
    };

    // 获取操作按钮可见性
    const getActionVisibility = useCallback(() => {
        if (!data) return {};
        const isUnreleased = isUnreleasedDocument(data);
        return {
            canShowCheckOut: !isUnreleased && canCheckOutFn(data),
            canShowCheckIn: canCheckInFn(data, currentUserId),
            canShowSubmit: canSubmitFn(data),
            canShowApprove: canApproveFn(data),
            canShowRelease: canReleaseFn(data),
            canShowForceUnlock: canForceUnlock(data),
            canShowDiscardRevision: canDiscardRevision(data),
        };
    }, [data, currentUserId]);

    // 查看图纸 - 使用 by-file 端点，通过 documentId 和 fileId 访问转换结果
    const handleViewDrawing = (fileId: string, drawingType: number) => {
        if (!data?.id) {
            message.error('文档信息不完整，无法预览');
            return;
        }
        const baseUrl = (window as any).serverUrl?.apiServerUrl || '';
        // 使用新的 by-file 端点：/api/pdm/conversion-files/by-file/{documentId}/{fileId}
        const viewerUrl = `${baseUrl}/api/pdm/conversion-files/by-file/${data.id}/${fileId}`;
        setModelUrl(viewerUrl);
        setCurrentDrawingType(drawingType);
        setViewerVisible(true);
    };

    // 重试转换任务
    const handleRetry = async (conversionId: string) => {
        const hide = message.loading('正在重试转换任务...', 0);
        try {
            await DocumentConversionRetryAsync({ conversionId });
            message.success('重试请求已提交');
            // 重新加载详情数据，保持当前视图模式
            if (documentId) {
                loadDetail(documentId, true);
            }
        } catch (error: any) {
            message.error(error?.message || '重试失败,请重试');
        } finally {
            hide();
        }
    };

    // 下载文件
    const handleDownload = async (file: DocumentFileData) => {
        if (!file.id || !data?.id) {
            message.error('下载失败,文件信息不完整');
            return;
        }

        try {
            message.loading({ content: '正在下载...', key: 'download' });

            const response = await DocumentFileContentGetContentAsync(
                {
                    documentId: data.id,
                    fileId: file.id,
                },
                {
                    responseType: 'blob',
                    getResponse: true,
                }
            );

            let fileName = file.fileName || '下载文件';
            if (response.response?.headers) {
                const contentDisposition = response.response.headers.get('content-disposition');
                if (contentDisposition) {
                    const fileNameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
                    if (fileNameMatch && fileNameMatch[1]) {
                        fileName = fileNameMatch[1].replace(/['"]/g, '');
                        try {
                            fileName = decodeURIComponent(fileName);
                        } catch (e) {
                            console.warn('文件名解码失败:', e);
                        }
                    }
                }
            }

            const blob = new Blob([response.data]);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();

            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            message.success({ content: '下载成功', key: 'download' });
        } catch (error) {
            console.error('下载文件失败:', error);
            message.error({ content: '下载失败,请稍后重试', key: 'download' });
        }
    };

    // 下载所有文件为压缩包
    const handleDownloadAsZip = async () => {
        if (!data?.id) {
            message.error('文档信息不完整,无法下载');
            return;
        }

        // 获取当前选中的版本
        const selectedRevision = getSelectedRevision();
        const selectedRevisionFiles = selectedRevision?.files || [];

        if (selectedRevisionFiles.length === 0) {
            message.warning('当前版本没有文件可以下载');
            return;
        }

        try {
            message.loading({ content: '正在准备下载压缩包...', key: 'zip-download' });

            const response = await DocumentFileContentDownloadAsZipAsync(
                {
                    documentId: data.id,
                },
                {
                    responseType: 'blob',
                    getResponse: true,
                }
            );

            // 从响应头获取文件名
            let fileName = `${data.documentNumber}_${data.documentName || '文档'}.zip`;
            if (response.response?.headers) {
                const contentDisposition = response.response.headers.get('content-disposition');
                if (contentDisposition) {
                    const fileNameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
                    if (fileNameMatch && fileNameMatch[1]) {
                        fileName = fileNameMatch[1].replace(/['"]/g, '');
                        try {
                            fileName = decodeURIComponent(fileName);
                        } catch (e) {
                            console.warn('文件名解码失败:', e);
                        }
                    }
                }
            }

            // 创建下载链接
            const blob = new Blob([response.data]);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();

            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            message.success({ content: `压缩包下载成功 (${selectedRevisionFiles.length} 个文件)`, key: 'zip-download' });
        } catch (error) {
            console.error('下载压缩包失败:', error);
            message.error({ content: '下载压缩包失败,请稍后重试', key: 'zip-download' });
        }
    };

    // ==================== 渲染内容区 ====================

    const renderContent = () => {
        if (!data) return null;
        const lifecycleStateConfig = getLifecycleConfig(data.lifecycleState);

        switch (activeSection) {
            case 'basic':
                return (
                    <div style={styles.section}>
                        <div style={styles.sectionHeader}>
                            <h3 style={styles.sectionTitle}>
                                <span style={styles.titleBar} />
                                基本属性
                            </h3>
                        </div>
                        <div style={styles.infoGrid}>
                            <div style={styles.infoRow}>
                                <span style={styles.infoLabel}>文档编号</span>
                                <span style={styles.infoValuePrimary}>{data.documentNumber}</span>
                            </div>
                            <div style={styles.infoRow}>
                                <span style={styles.infoLabel}>文档名称</span>
                                <span style={styles.infoValue}>{data.documentName}</span>
                            </div>
                            <div style={styles.infoRow}>
                                <span style={styles.infoLabel}>版本</span>
                                <span style={styles.infoValue}>{getSelectedRevision()?.majorVersion || data.version || '-'}</span>
                            </div>
                            <div style={styles.infoRow}>
                                <span style={styles.infoLabel}>修订</span>
                                <span style={styles.infoValue}>{getSelectedRevision()?.minorRevision || data.revision || '-'}</span>
                            </div>
                            <div style={styles.infoRow}>
                                <span style={styles.infoLabel}>当前修订</span>
                                <span style={styles.infoValue}>
                                    {getSelectedRevision()?.fullVersion || (typeof data.currentRevision === 'object'
                                        ? (data.currentRevision as any)?.fullVersion || (data.currentRevision as any)?.minorRevision || '-'
                                        : (data.currentRevision || '-'))}
                                </span>
                            </div>
                            <div style={styles.infoRow}>
                                <span style={styles.infoLabel}>生命周期状态</span>
                                <span style={styles.infoValue}>
                                    <Space size={4}>
                                        {(() => {
                                            // 优先使用选中版本的状态
                                            const selectedRev = getSelectedRevision();
                                            // 如果选中了历史版本，可能需要显示该版本的状态
                                            // 这里假设 RevisionHistoryData.state 对应 publishState 或者是 revisionState? 
                                            // 根据 loadDetail 映射: state: item.state. DTO item.state 是 DocumentState? 
                                            // 让我们查看 RevisionHistoryData 定义: state?: number.

                                            // 如果是当前版本(Initial Load Data)，使用 data.publishState
                                            // 如果是历史版本，通常历史版本已发布，或者处于特定状态。
                                            // 但 API 返回的 VersionDto 只有 state (RevisionState?) 和 publishState?
                                            // detail.tsx loadDetail 映射中: state: item.state.

                                            // 暂时保持原有逻辑，但如果 selectedRev 存在且不是 current，显示其 state
                                            const displayState = selectedRev ? selectedRev.state : data.currentRevisionState;

                                            // 这是一个混合显示。
                                            // Tag 1: Publish State (Lifecycle)
                                            // Tag 2: Revision State (Draft/Approved...)

                                            // 由于后端 DTO 差异，我们可能无法从 VersionList 准确获取 PublishState。
                                            // 我们假设 Revision State 是准确的。

                                            const ps = data.publishState;
                                            const config = ps !== undefined ? publishStateConfig[ps] : { label: '未知', color: 'default' };
                                            return <Tag color={config.color}>{config.label}</Tag>;
                                        })()}

                                        {(() => {
                                            const selectedRev = getSelectedRevision();
                                            const revState = selectedRev ? selectedRev.state : data.currentRevisionState;

                                            if (revState !== undefined) {
                                                return (
                                                    <Tag color={revisionStateConfig[revState]?.color || 'default'}>
                                                        {revisionStateConfig[revState]?.label || '-'}
                                                    </Tag>
                                                );
                                            }
                                            return null;
                                        })()}
                                    </Space>
                                </span>
                            </div>
                            <div style={styles.infoRow}>
                                <span style={styles.infoLabel}>签出状态</span>
                                <span style={styles.infoValue}>
                                    {data.isCheckedOut ? (
                                        <Tag
                                            color={data.checkOutInfo?.checkedOutUserId === currentUserId ? 'blue' : 'orange'}
                                            icon={<LockOutlined />}
                                        >
                                            {data.checkOutInfo?.checkedOutUserId === currentUserId
                                                ? '我的签出'
                                                : `已签出(${data.checkOutInfo?.checkedOutUserName})`}
                                        </Tag>
                                    ) : (
                                        <Tag color="green" icon={<UnlockOutlined />}>未签出</Tag>
                                    )}
                                </span>
                            </div>
                            <div style={styles.infoRow}>
                                <span style={styles.infoLabel}>文档类型</span>
                                <span style={styles.infoValue}>{data.documentTypeName || '-'}</span>
                            </div>
                            <div style={styles.infoRow}>
                                <span style={styles.infoLabel}>文档库</span>
                                <span style={styles.infoValue}>{data.documentLibraryName || '-'}</span>
                            </div>
                            <div style={styles.infoRow}>
                                <span style={styles.infoLabel}>安全级别</span>
                                <span style={styles.infoValue}>
                                    {data.securityLevel !== undefined
                                        ? securityLevelConfig[data.securityLevel] || '-'
                                        : '-'}
                                </span>
                            </div>
                            <div style={styles.infoRow}>
                                <span style={styles.infoLabel}>关键词</span>
                                <span style={styles.infoValue}>{data.keywords || '-'}</span>
                            </div>
                            <div style={{ ...styles.infoRow, gridColumn: '1 / -1' }}>
                                <span style={styles.infoLabel}>描述</span>
                                <span style={styles.infoValue}>{data.description || '-'}</span>
                            </div>
                        </div>
                        {/* 检出详细信息（仅当已签出时显示） */}
                        {data.isCheckedOut && data.checkOutInfo && (
                            <>
                                <Divider style={{ margin: '16px 0' }} />
                                <div style={styles.sectionHeader}>
                                    <h3 style={styles.sectionTitle}>
                                        <span style={styles.titleBar} />
                                        检出详情
                                        {data.checkOutInfo?.checkedOutUserId === currentUserId && (
                                            <Tag color="blue" style={{ marginLeft: 8 }}>我的签出</Tag>
                                        )}
                                    </h3>
                                </div>
                                <div style={styles.infoGridCols2}>
                                    <div style={styles.infoRow}>
                                        <span style={styles.infoLabel}>签出人</span>
                                        <span style={styles.infoValue}>{data.checkOutInfo.checkedOutUserName || '-'}</span>
                                    </div>
                                    <div style={styles.infoRow}>
                                        <span style={styles.infoLabel}>签出时间</span>
                                        <span style={styles.infoValue}>{formatDate(data.checkOutInfo.checkedOutTime)}</span>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* 文件列表区块 */}
                        <Divider style={{ margin: '16px 0' }} />
                        {(() => {
                            const currentFiles = getSelectedRevision()?.files || [];
                            const FileOptionsInner = (props: ICellRendererParams) => {
                                const { data: record } = props;
                                const conversion = record.conversion;
                                const hasCompletedConversion = conversion && conversion.status === ConversionStatus.Completed;
                                return (
                                    <Space>
                                        {hasCompletedConversion && (
                                            <Button
                                                type="link"
                                                size="small"
                                                icon={<EyeOutlined />}
                                                onClick={() => handleViewDrawing(record.id, conversion.drawingType || 2)}
                                            >
                                                预览
                                            </Button>
                                        )}
                                        <Access accessible={hasDownloadPerm}>
                                            <Button
                                                type="link"
                                                size="small"
                                                icon={<DownloadOutlined />}
                                                onClick={() => handleDownload(record)}
                                            >
                                                下载
                                            </Button>
                                        </Access>
                                        {/* 删除按钮 - 工作区且可编辑时可用 */}
                                        {viewMode === 'working' && canEditDocument && (
                                            <Access accessible={hasDeleteFilePerm}>
                                                <Button
                                                    type="link"
                                                    size="small"
                                                    danger
                                                    icon={<DeleteOutlined />}
                                                    onClick={() => handleDeleteFile(record)}
                                                >
                                                    删除
                                                </Button>
                                            </Access>
                                        )}
                                    </Space>
                                );
                            };
                            return (
                                <>
                                    <div style={styles.sectionHeader}>
                                        <h3 style={styles.sectionTitle}>
                                            <span style={styles.titleBar} />
                                            文件列表 <Badge count={currentFiles.length} style={{ backgroundColor: '#13c2c2' }} />
                                        </h3>
                                    </div>
                                    <AgGridPlus
                                        gridRef={fileGridRef}
                                        gridKey="document-detail-files"
                                        dataSource={currentFiles}
                                        pagination={false}
                                        search={false}
                                        rowSelection="multiple"
                                        checkboxSelection={true}
                                        toolBarRender={() => [
                                            // 添加文件按钮 - 工作区且可编辑时可用
                                            viewMode === 'working' && canEditDocument && (
                                                <Button
                                                    key="add-file"
                                                    type="primary"
                                                    icon={<PlusOutlined />}
                                                    onClick={() => setAddFileVisible(true)}
                                                >
                                                    添加文件
                                                </Button>
                                            ),
                                            <Access key="download-zip" accessible={hasDownloadPerm}>
                                                <Button
                                                    type="primary"
                                                    icon={<FileZipOutlined />}
                                                    onClick={handleDownloadAsZip}
                                                >
                                                    下载为压缩包
                                                </Button>
                                            </Access>,
                                        ]}
                                        style={{ height: 300 }}
                                    >
                                        <AgGridColumn field="fileName" headerName="文件名" width={280} />
                                        <AgGridColumn
                                            field="fileRole"
                                            headerName="角色"
                                            width={80}
                                            valueEnum={[
                                                { label: '主文档', value: DocumentFileRole.Primary, color: 'blue' },
                                                { label: '次要', value: DocumentFileRole.Secondary, color: 'default' },
                                            ]}
                                        />
                                        <AgGridColumn
                                            field="fileSize"
                                            headerName="大小"
                                            width={100}
                                            hideInSearch={true}
                                            valueGetter={(params: any) => formatFileSize(params.data?.fileSize)}
                                        />
                                        <AgGridColumn
                                            field="conversion.status"
                                            headerName="转换状态"
                                            width={100}
                                            hideInSearch={true}
                                            cellRenderer={(params: ICellRendererParams) => {
                                                const conversion = params.data?.conversion;
                                                if (!conversion) {
                                                    return <Tag color="default">未转换</Tag>;
                                                }
                                                const statusConfig = conversionStatusConfig[conversion.status];
                                                return <Tag color={statusConfig?.color || 'default'}>{statusConfig?.label || '未知'}</Tag>;
                                            }}
                                        />
                                        <AgGridColumn
                                            field="action"
                                            headerName="操作"
                                            width={180}
                                            pinned="right"
                                            filter={false}
                                            sortable={false}
                                            cellRenderer={FileOptionsInner}
                                        />
                                    </AgGridPlus>
                                </>
                            );
                        })()}
                    </div>
                );


            case 'conversions':
                const ConversionOptions = (props: ICellRendererParams) => {
                    const { data: record } = props;
                    if (record.status === ConversionStatus.Completed) {
                        // 转换任务列表使用原有的 conversionId 方式预览
                        const handleConversionPreview = () => {
                            const baseUrl = (window as any).serverUrl?.apiServerUrl || '';
                            const viewerUrl = `${baseUrl}/api/pdm/conversion-files/${record.id}`;
                            setModelUrl(viewerUrl);
                            setCurrentDrawingType(record.drawingType || 2);
                            setViewerVisible(true);
                        };
                        return (
                            <Button
                                type="link"
                                size="small"
                                icon={<EyeOutlined />}
                                onClick={handleConversionPreview}
                            >
                                预览
                            </Button>
                        );
                    }
                    if (record.status === ConversionStatus.Failed) {
                        return (
                            <Button
                                type="link"
                                size="small"
                                icon={<RedoOutlined />}
                                onClick={() => handleRetry(record.id)}
                            >
                                重试
                            </Button>
                        );
                    }
                    return '-';
                };

                return (
                    <div style={styles.section}>
                        <div style={styles.sectionHeader}>
                            <h3 style={styles.sectionTitle}>
                                <span style={styles.titleBar} />
                                转换任务列表 <Badge count={(data.recentConversions || []).length} style={{ backgroundColor: '#722ed1' }} />
                            </h3>
                        </div>
                        <AgGridPlus
                            gridKey="document-detail-conversions"
                            dataSource={data.recentConversions || []}
                            pagination={false}
                            search={false}
                            toolBarRender={false}
                            style={{ height: 400 }}
                        >
                            <AgGridColumn field="sourceFileName" headerName="源文件" width={200} />
                            <AgGridColumn
                                field="drawingType"
                                headerName="图纸类型"
                                width={120}
                                valueEnum={[
                                    { label: '未指定', value: DrawingType.Unspecified, color: 'default' },
                                    { label: '2D图纸', value: DrawingType.TwoD, color: 'blue' },
                                    { label: '3D图纸/模型', value: DrawingType.ThreeD, color: 'green' },
                                ]}
                            />
                            <AgGridColumn
                                field="targetFormat"
                                headerName="目标格式"
                                width={80}
                                hideInSearch={true}
                                valueGetter={(params: any) => formatConfig[params.data?.targetFormat] || '-'}
                            />
                            <AgGridColumn
                                field="status"
                                headerName="状态"
                                width={100}
                                valueEnum={[
                                    { label: '等待中', value: ConversionStatus.Pending, color: 'default' },
                                    { label: '转换中', value: ConversionStatus.Converting, color: 'processing' },
                                    { label: '已完成', value: ConversionStatus.Completed, color: 'success' },
                                    { label: '失败', value: ConversionStatus.Failed, color: 'error' },
                                    { label: '已取消', value: ConversionStatus.Cancelled, color: 'warning' },
                                ]}
                            />
                            <AgGridColumn
                                field="progressPercentage"
                                headerName="进度"
                                width={120}
                                hideInSearch={true}
                                cellRenderer={(params: ICellRendererParams) => {
                                    const { data: record } = params;
                                    const value = params.value || 0;
                                    if (record.status === ConversionStatus.Completed) {
                                        return <Progress percent={100} size="small" status="success" />;
                                    }
                                    if (record.status === ConversionStatus.Failed) {
                                        return <Progress percent={value} size="small" status="exception" />;
                                    }
                                    if (record.status === ConversionStatus.Converting) {
                                        return <Progress percent={value} size="small" status="active" />;
                                    }
                                    return <Progress percent={0} size="small" />;
                                }}
                            />
                            <AgGridColumn
                                field="creationTime"
                                headerName="创建时间"
                                width={150}
                                hideInSearch={true}
                                valueGetter={(params: any) => formatDate(params.data?.creationTime)}
                            />
                            <AgGridColumn
                                field="completedAt"
                                headerName="完成时间"
                                width={150}
                                hideInSearch={true}
                                valueGetter={(params: any) => formatDate(params.data?.completedAt)}
                            />
                            <AgGridColumn
                                field="errorMessage"
                                headerName="错误信息"
                                width={200}
                                hideInSearch={true}
                                cellRenderer={(params: ICellRendererParams) => (
                                    <span style={{ color: params.value ? 'red' : undefined }}>
                                        {params.value || '-'}
                                    </span>
                                )}
                            />
                            <AgGridColumn
                                field="action"
                                headerName="操作"
                                width={150}
                                pinned="right"
                                filter={false}
                                sortable={false}
                                cellRenderer={ConversionOptions}
                            />
                        </AgGridPlus>
                    </div>
                );

            case 'partLinks':
                // 物料编号列渲染器 - 支持点击跳转到物料详情页
                const PartNumberCellRenderer = (props: ICellRendererParams) => {
                    const { value, data: record } = props;

                    const handleClick = async () => {
                        if (record?.partNumber) {
                            try {
                                // 通过物料编号查询物料ID - 使用精确匹配
                                const result = await PartGetListAsync({
                                    Filter: `partNumber=="${record.partNumber}"`,
                                    MaxResultCount: 1,
                                    SkipCount: 0,
                                });

                                if (result?.items && result.items.length > 0) {
                                    const partId = result.items[0].id;
                                    history.push(`/appPdm/PartManagement/Part/detail?id=${partId}`);
                                } else {
                                    message.warning('未找到该物料信息');
                                }
                            } catch (error) {
                                console.error('查询物料失败:', error);
                                message.error('查询物料失败');
                            }
                        }
                    };

                    return (
                        <a
                            onClick={handleClick}
                            style={{
                                color: '#1890ff',
                                cursor: 'pointer',
                                textDecoration: 'none'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                            onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                        >
                            {value || '-'}
                        </a>
                    );
                };

                return (
                    <div style={styles.section}>
                        <div style={styles.sectionHeader}>
                            <h3 style={styles.sectionTitle}>
                                <span style={styles.titleBar} />
                                物料关联列表 <Badge count={(data.partDocumentLinks || []).length} style={{ backgroundColor: '#faad14' }} />
                            </h3>
                        </div>
                        <AgGridPlus
                            gridKey="document-detail-partLinks"
                            dataSource={data.partDocumentLinks || []}
                            pagination={false}
                            search={false}
                            toolBarRender={false}
                            style={{ height: 400 }}
                        >
                            <AgGridColumn
                                field="partNumber"
                                headerName="物料编号"
                                width={150}
                                cellRenderer={PartNumberCellRenderer}
                            />
                            <AgGridColumn field="partName" headerName="物料名称" width={200} />
                            <AgGridColumn field="drawingNumber" headerName="图号" width={150} />
                            <AgGridColumn
                                field="usage"
                                headerName="用途"
                                width={100}
                                hideInSearch={true}
                                valueGetter={(params: any) => relationUsageConfig[params.data?.usage] || '-'}
                            />
                            <AgGridColumn
                                field="isPrimary"
                                headerName="主要关联"
                                width={100}
                                hideInSearch={true}
                                cellRenderer={(params: ICellRendererParams) => (
                                    params.value ? <Tag color="blue">是</Tag> : <Tag>否</Tag>
                                )}
                            />
                            <AgGridColumn
                                field="creationTime"
                                headerName="创建时间"
                                width={180}
                                hideInSearch={true}
                                valueGetter={(params: any) => formatDate(params.data?.creationTime)}
                            />
                        </AgGridPlus>
                    </div>
                );

            case 'revisions':
                // 安全处理数据,确保所有字段都是基本类型
                const safeRevisionData = (data.revisionHistory || []).map((item: any, index: number) => {
                    // 安全处理files字段 - 只保留数组长度,不保留对象数组
                    let filesCount = 0;
                    if (Array.isArray(item?.files)) {
                        filesCount = item.files.length;
                    }

                    // 辅助函数:安全转换为字符串(保持原值类型)
                    const safeString = (value: any): string | undefined => {
                        if (value === null || value === undefined) return undefined;
                        if (typeof value === 'string') return value;
                        if (typeof value === 'number' || typeof value === 'boolean') return String(value);
                        // 如果是对象或数组,转换为JSON字符串
                        if (typeof value === 'object') {
                            try {
                                return JSON.stringify(value);
                            } catch (e) {
                                console.warn('对象转换字符串失败:', e, value);
                                return String(value);
                            }
                        }
                        return String(value);
                    };

                    // 辅助函数:安全转换为数字
                    const safeNumber = (value: any): number | undefined => {
                        if (value === null || value === undefined) return undefined;
                        if (typeof value === 'number') return value;
                        const num = Number(value);
                        return isNaN(num) ? undefined : num;
                    };

                    // 辅助函数:保持majorVersion原值(字符串或数字)
                    const safeMajorVersion = (value: any): string | number | undefined => {
                        if (value === null || value === undefined) return undefined;
                        if (typeof value === 'string' || typeof value === 'number') return value;
                        // 对象类型转为字符串
                        if (typeof value === 'object') {
                            console.warn('majorVersion为对象类型,转换为字符串:', value);
                            return safeString(value);
                        }
                        // 其他类型转为字符串
                        return String(value);
                    };

                    // 生成唯一ID,避免使用可能为对象的id
                    const safeId = typeof item?.id === 'string' ? item.id : `revision-${index}`;

                    return {
                        id: safeId,
                        majorVersion: safeMajorVersion(item?.majorVersion), // 保持原类型
                        minorRevision: safeString(item?.minorRevision),
                        fullVersion: safeString(item?.fullVersion),
                        publishStatus: safeNumber(item?.publishStatus ?? item?.publishState ?? item?.state),
                        state: safeNumber(item?.state),
                        changeRequestId: safeString(item?.changeRequestId),
                        approvalRoute: safeString(item?.approvalRoute),
                        approvalComment: safeString(item?.approvalComment),
                        approvedBy: safeString(item?.approvedBy),
                        approvedTime: safeString(item?.approvedTime),
                        isCurrent: Boolean(item?.isCurrent),
                        creationTime: safeString(item?.creationTime),
                        filesCount: filesCount, // 只保留数量,不保留对象数组
                    };
                });

                return (
                    <div style={styles.section}>
                        <div style={styles.sectionHeader}>
                            <h3 style={styles.sectionTitle}>
                                <span style={styles.titleBar} />
                                修订历史 <Badge count={safeRevisionData.length} style={{ backgroundColor: '#722ed1' }} />
                            </h3>
                        </div>
                        <AgGridPlus
                            gridKey="document-detail-revisions"
                            dataSource={safeRevisionData}
                            pagination={false}
                            search={false}
                            toolBarRender={false}
                            style={{ height: 400 }}
                        >
                            <AgGridColumn
                                field="fullVersion"
                                headerName="版本号"
                                width={150}
                                cellRenderer={(params: ICellRendererParams) => {
                                    const record = params.data;
                                    try {
                                        let displayVersion = '-';
                                        if (record && typeof record === 'object') {
                                            if (record.fullVersion) {
                                                const val = record.fullVersion;
                                                displayVersion = (typeof val === 'object' ? JSON.stringify(val) : String(val));
                                            } else {
                                                const major = record.majorVersion;
                                                const minor = record.minorRevision;
                                                if (major !== undefined && major !== null) {
                                                    const majorStr = (typeof major === 'object' ? JSON.stringify(major) : String(major));
                                                    displayVersion = majorStr;
                                                    if (minor) {
                                                        const minorStr = (typeof minor === 'object' ? JSON.stringify(minor) : String(minor));
                                                        displayVersion = majorStr + '.' + minorStr;
                                                    }
                                                }
                                            }
                                        }
                                        const isCurrent = record && record.isCurrent === true;
                                        return (
                                            <Space>
                                                <span style={{ fontWeight: isCurrent ? 600 : 400 }}>
                                                    {displayVersion}
                                                </span>
                                                {isCurrent && (
                                                    <Tag color="success" icon={<CheckCircleOutlined />}>
                                                        当前版本
                                                    </Tag>
                                                )}
                                            </Space>
                                        );
                                    } catch (e) {
                                        console.error('版本号渲染错误:', e, record);
                                        return <span>-</span>;
                                    }
                                }}
                            />
                            <AgGridColumn
                                field="majorVersion"
                                headerName="主版本"
                                width={100}
                                hideInSearch={true}
                                valueGetter={(params: any) => {
                                    const value = params.data?.majorVersion;
                                    if (value === undefined || value === null) return '-';
                                    return typeof value === 'object' ? JSON.stringify(value) : String(value);
                                }}
                            />
                            <AgGridColumn
                                field="minorRevision"
                                headerName="次修订"
                                width={100}
                                hideInSearch={true}
                                valueGetter={(params: any) => params.data?.minorRevision || '-'}
                            />
                            <AgGridColumn
                                field="publishStatus"
                                headerName="状态"
                                width={120}
                                valueEnum={[
                                    { label: '未发布（预留）', value: PublishStatus.Unpublished, color: 'default' },
                                    { label: '已发布（有效）', value: PublishStatus.Published, color: 'green' },
                                    { label: '已作废（不可下载）', value: PublishStatus.Voided, color: 'red' },
                                ]}
                            />
                            <AgGridColumn
                                field="changeRequestId"
                                headerName="变更请求ID"
                                width={150}
                                hideInSearch={true}
                            />
                            <AgGridColumn
                                field="approvalComment"
                                headerName="审批意见"
                                width={200}
                                hideInSearch={true}
                            />
                            <AgGridColumn
                                field="approvedBy"
                                headerName="审批人"
                                width={120}
                                hideInSearch={true}
                            />
                            <AgGridColumn
                                field="approvedTime"
                                headerName="审批时间"
                                width={180}
                                hideInSearch={true}
                                valueGetter={(params: any) => {
                                    const value = params.data?.approvedTime;
                                    if (!value) return '-';
                                    return formatDate(value);
                                }}
                            />
                            <AgGridColumn
                                field="creationTime"
                                headerName="创建时间"
                                width={180}
                                hideInSearch={true}
                                valueGetter={(params: any) => {
                                    const value = params.data?.creationTime;
                                    if (!value) return '-';
                                    return formatDate(value);
                                }}
                            />
                            <AgGridColumn
                                field="filesCount"
                                headerName="附件数量"
                                width={100}
                                hideInSearch={true}
                                cellRenderer={(params: ICellRendererParams) => {
                                    const count = params.value || 0;
                                    return count > 0 ? (
                                        <Badge count={count} style={{ backgroundColor: '#13c2c2' }} />
                                    ) : (
                                        <span>-</span>
                                    );
                                }}
                            />
                            <AgGridColumn
                                field="action"
                                headerName="操作"
                                width={120}
                                pinned="right"
                                filter={false}
                                sortable={false}
                                cellRenderer={(params: ICellRendererParams) => {
                                    const record = params.data;
                                    const isSelected = record?.id === selectedRevisionId;

                                    return (
                                        <Button
                                            type={isSelected ? 'primary' : 'link'}
                                            size="small"
                                            icon={<EyeOutlined />}
                                            onClick={() => {
                                                if (record?.id) {
                                                    setSelectedRevisionId(record.id);
                                                    setActiveSection('files');
                                                }
                                            }}
                                            disabled={isSelected}
                                        >
                                            {isSelected ? '当前查看' : '查看版本'}
                                        </Button>
                                    );
                                }}
                            />
                        </AgGridPlus>
                    </div>
                );

            case 'organization':
                return (
                    <div style={styles.section}>
                        <div style={styles.sectionHeader}>
                            <h3 style={styles.sectionTitle}>
                                <span style={styles.titleBar} />
                                组织信息
                            </h3>
                        </div>
                        <div style={styles.infoGridCols2}>
                            <div style={styles.infoRow}>
                                <span style={styles.infoLabel}>组织代码</span>
                                <span style={styles.infoValue}>{data.organizationCode || '-'}</span>
                            </div>
                            <div style={styles.infoRow}>
                                <span style={styles.infoLabel}>组织名称</span>
                                <span style={styles.infoValue}>{data.organizationName || '-'}</span>
                            </div>
                            <div style={styles.infoRow}>
                                <span style={styles.infoLabel}>公司代码</span>
                                <span style={styles.infoValue}>{data.companyCode || '-'}</span>
                            </div>
                            <div style={styles.infoRow}>
                                <span style={styles.infoLabel}>工厂代码</span>
                                <span style={styles.infoValue}>{data.factoryCode || '-'}</span>
                            </div>
                        </div>
                    </div>
                );

            case 'audit':
                return (
                    <div style={styles.section}>
                        <div style={styles.sectionHeader}>
                            <h3 style={styles.sectionTitle}>
                                <span style={styles.titleBar} />
                                审计信息
                            </h3>
                        </div>
                        <div style={styles.infoGridCols2}>
                            <div style={styles.infoRow}>
                                <span style={styles.infoLabel}>创建人</span>
                                <span style={styles.infoValue}>{data.creator || '-'}</span>
                            </div>
                            <div style={styles.infoRow}>
                                <span style={styles.infoLabel}>创建时间</span>
                                <span style={styles.infoValue}>{formatDate(data.creationTime)}</span>
                            </div>
                            <div style={styles.infoRow}>
                                <span style={styles.infoLabel}>最后修改人</span>
                                <span style={styles.infoValue}>{data.lastModifier || '-'}</span>
                            </div>
                            <div style={styles.infoRow}>
                                <span style={styles.infoLabel}>最后修改时间</span>
                                <span style={styles.infoValue}>{formatDate(data.lastModificationTime)}</span>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    // ==================== 主渲染 ====================

    if (!data && loading) {
        return <div style={styles.loading}><Spin size="large" tip="加载中..." /></div>;
    }

    if (!data) {
        return <div style={styles.loading}><Empty description="未找到文档数据" /></div>;
    }

    const lifecycleStateConfig = data.publishState !== undefined
        ? publishStateConfig[data.publishState] || { label: '未知', color: 'default' }
        : { label: '未知', color: 'default' };

    return (
        <div style={styles.container}>
            {/* 顶部工具栏 */}
            <div style={styles.toolbar}>
                <div style={styles.toolbarLeft}>
                    <Button type="text" icon={<ArrowLeftOutlined />} onClick={handleBack}>返回</Button>
                    <Divider type="vertical" />
                    <div style={styles.documentIdentity}>
                        <span style={styles.documentCode}>{data.documentNumber}</span>
                        <span style={styles.documentName}>{data.documentName}</span>
                    </div>
                    <Space size={4}>
                        {data.version && (
                            <Tag color="blue" icon={<BranchesOutlined />}>
                                {data.version}
                            </Tag>
                        )}
                        {data.currentRevision && (
                            <Tag color="cyan">
                                Rev: {typeof data.currentRevision === 'object'
                                    ? (data.currentRevision as any)?.fullVersion || (data.currentRevision as any)?.minorRevision || '-'
                                    : data.currentRevision}
                            </Tag>
                        )}
                        <Tag color={lifecycleStateConfig.color}>{lifecycleStateConfig.label}</Tag>
                        {data.isCheckedOut && (
                            <Tooltip
                                title={
                                    <div>
                                        <div><UserOutlined /> 签出人: {data.checkOutInfo?.checkedOutUserName || '-'}</div>
                                        <div><ClockCircleOutlined /> 签出时间: {formatDate(data.checkOutInfo?.checkedOutTime)}</div>
                                    </div>
                                }
                            >
                                <Tag
                                    color={data.checkOutInfo?.checkedOutUserId === currentUserId ? 'blue' : 'orange'}
                                    icon={<LockOutlined />}
                                >
                                    {data.checkOutInfo?.checkedOutUserId === currentUserId ? '我的签出' : `已签出(${data.checkOutInfo?.checkedOutUserName})`}
                                </Tag>
                            </Tooltip>
                        )}
                        {/* 版本切换控件 */}
                        <Divider type="vertical" />
                        <VersionSwitcher
                            value={viewMode}
                            onChange={(mode) => {
                                setViewMode(mode);
                                // 切换到最新发布时，选中最新已发布版本
                                if (mode === 'latest' && data.revisionHistory) {
                                    // 优先使用 latestVersionId 定位最新发布版本
                                    let latestReleased = data.latestVersionId
                                        ? data.revisionHistory.find((r) => r.id === data.latestVersionId)
                                        : null;
                                    // 如果找不到，回退到 revisionHistory 中的第一个版本（通常是最新的）
                                    if (!latestReleased && data.revisionHistory.length > 0) {
                                        latestReleased = data.revisionHistory[0];
                                    }
                                    if (latestReleased) {
                                        setSelectedRevisionId(latestReleased.id);
                                    }
                                }
                                // 切换到工作区时，选中当前版本
                                if (mode === 'working' && data.revisionHistory) {
                                    const current = data.revisionHistory.find((r) => r.isCurrent);
                                    if (current) {
                                        setSelectedRevisionId(current.id);
                                    }
                                }
                            }}
                            hasWorkingRevision={true}
                            hasReleasedVersion={data.publishState === PublishState.Released || data.publishState === PublishState.Obsolete || !!data.latestVersionId}
                        />
                        {/* 历史版本下拉选择（仅在历史版本模式下显示） */}
                        {viewMode === 'version' && data.revisionHistory && data.revisionHistory.length > 0 && (
                            <Select
                                value={selectedRevisionId}
                                onChange={(value) => setSelectedRevisionId(value)}
                                style={{ width: 180 }}
                                size="small"
                                placeholder="选择历史版本"
                            >
                                {data.revisionHistory.map((revision) => {
                                    const versionLabel = revision.fullVersion ||
                                        `${revision.majorVersion || ''}${revision.minorRevision || ''}` || '-';
                                    const stateLabel = revision.state !== undefined
                                        ? revisionStateConfig[revision.state]?.label || ''
                                        : '';
                                    const currentLabel = revision.isCurrent ? ' (当前)' : '';

                                    return (
                                        <Select.Option key={revision.id} value={revision.id}>
                                            {versionLabel}{currentLabel} {stateLabel && `(${stateLabel})`}
                                        </Select.Option>
                                    );
                                })}
                            </Select>
                        )}
                    </Space>
                </div>
                {/* 操作按钮区域（仅工作区模式下可用） */}
                {viewMode === 'working' && (
                    <Space>
                        {(() => {
                            const visibility = getActionVisibility();
                            return (
                                <>
                                    {/* 签出 */}
                                    {hasCheckOutPerm && visibility.canShowCheckOut && (
                                        <Button
                                            type="primary"
                                            icon={<LockOutlined />}
                                            onClick={handleCheckOut}
                                        >
                                            签出
                                        </Button>
                                    )}

                                    {/* 编辑 - 可编辑时可用（未发布草稿或本人签出） */}
                                    {hasUpdatePerm && canEditDocument && (
                                        <Button
                                            icon={<EditOutlined />}
                                            onClick={() => setEditWorkingVisible(true)}
                                        >
                                            编辑
                                        </Button>
                                    )}

                                    {/* 签入 */}
                                    {hasCheckInPerm && visibility.canShowCheckIn && (
                                        <Button
                                            type="primary"
                                            icon={<UnlockOutlined />}
                                            onClick={handleCheckIn}
                                        >
                                            签入
                                        </Button>
                                    )}

                                    {/* 提交审批 */}
                                    {hasSubmitPerm && visibility.canShowSubmit && (
                                        <Button
                                            icon={<SafetyCertificateOutlined />}
                                            onClick={handleSubmitForApproval}
                                        >
                                            提交审批
                                        </Button>
                                    )}

                                    {/* 批准 */}
                                    {hasApprovePerm && visibility.canShowApprove && (
                                        <Button
                                            type="primary"
                                            icon={<CheckCircleOutlined />}
                                            onClick={handleApprove}
                                        >
                                            批准
                                        </Button>
                                    )}

                                    {/* 发布 */}
                                    {hasReleasePerm && visibility.canShowRelease && (
                                        <Button
                                            type="primary"
                                            style={{ background: '#52c41a', borderColor: '#52c41a' }}
                                            onClick={handleRelease}
                                        >
                                            发布
                                        </Button>
                                    )}

                                    {/* 强制解锁 */}
                                    {hasForceUnlockPerm && visibility.canShowForceUnlock && (
                                        <Tooltip title="强制解锁（管理员）">
                                            <Button
                                                danger
                                                icon={<UnlockOutlined />}
                                                onClick={() => setForceUnlockVisible(true)}
                                            >
                                                强制解锁
                                            </Button>
                                        </Tooltip>
                                    )}

                                    {/* 撤销修订 */}
                                    {hasDiscardRevisionPerm && visibility.canShowDiscardRevision && (
                                        <Tooltip title="撤销修订（丢弃所有变更）">
                                            <Button
                                                danger
                                                onClick={() => setDiscardRevisionVisible(true)}
                                            >
                                                撤销修订
                                            </Button>
                                        </Tooltip>
                                    )}
                                </>
                            );
                        })()}
                    </Space>
                )}
            </div>

            {/* 版本快照提示条（非工作区模式下显示） */}
            {viewMode !== 'working' && (
                <Alert
                    message={
                        viewMode === 'latest'
                            ? '您正在查看最新发布版本，操作已禁用'
                            : '您正在查看历史版本快照，操作已禁用'
                    }
                    type="info"
                    showIcon
                    style={{ margin: '0 12px' }}
                    banner
                />
            )}

            {/* 主内容区 */}
            <div style={styles.body}>
                {/* 左侧导航 */}
                <div style={styles.sider}>
                    {/* 导航菜单 */}
                    <Menu
                        mode="inline"
                        selectedKeys={[activeSection]}
                        onClick={({ key }) => setActiveSection(key)}
                        style={{ flex: 1, borderRight: 'none', overflowY: 'auto' }}
                        items={NAV_ITEMS.map(item => ({
                            key: item.key,
                            icon: item.icon,
                            label: item.label,
                        }))}
                    />
                </div>

                {/* 右侧内容区 */}
                <div style={styles.content}>
                    <Spin spinning={loading}>
                        {renderContent()}
                    </Spin>
                </div>
            </div>

            {/* 图纸查看器 */}
            <DrawingViewer
                visible={viewerVisible}
                modelUrl={modelUrl}
                drawingType={currentDrawingType}
                onClose={() => setViewerVisible(false)}
            />

            {/* 强制解锁弹窗 */}
            {data && (
                <ForceUnlockDialog
                    visible={forceUnlockVisible}
                    document={{
                        id: data.id,
                        documentNumber: data.documentNumber,
                        documentName: data.documentName,
                        checkOutInfo: data.checkOutInfo,
                        currentRevisionFullVersion: formatVersionNumber(data.version, data.revision),
                    }}
                    onClose={() => setForceUnlockVisible(false)}
                    onSuccess={handleRefresh}
                />
            )}

            {/* 撤销修订弹窗 */}
            {data && (
                <DiscardRevisionDialog
                    visible={discardRevisionVisible}
                    document={{
                        id: data.id,
                        documentNumber: data.documentNumber,
                        documentName: data.documentName,
                        latestReleasedFullVersion: formatVersionNumber(data.version, data.revision),
                        currentRevisionFullVersion: formatVersionNumber(data.version, data.revision),
                        workingFileCount: data.files?.length || 0,
                        isCheckedOut: data.isCheckedOut,
                        checkOutInfo: data.checkOutInfo,
                    }}
                    onClose={() => setDiscardRevisionVisible(false)}
                    onSuccess={handleRefresh}
                />
            )}

            {/* 签出弹窗 */}
            {data && (
                <CheckOutDialog
                    visible={checkOutVisible}
                    document={{
                        id: data.id,
                        documentNumber: data.documentNumber,
                        documentName: data.documentName,
                        latestReleasedFullVersion: formatVersionNumber(data.version, data.revision),
                    }}
                    onClose={() => setCheckOutVisible(false)}
                    onSuccess={handleRefresh}
                />
            )}

            {/* 签入弹窗 */}
            {data && (
                <CheckInDialog
                    visible={checkInVisible}
                    document={{
                        id: data.id,
                        documentNumber: data.documentNumber,
                        documentName: data.documentName,
                        currentRevisionFullVersion: formatVersionNumber(data.version, data.revision),
                        workingFileCount: data.files?.length || 0,
                        checkOutInfo: data.checkOutInfo,
                    }}
                    onClose={() => setCheckInVisible(false)}
                    onSuccess={handleRefresh}
                />
            )}

            {/* 编辑工作区文档弹窗 */}
            {data && (
                <EditWorkingDocumentDialog
                    visible={editWorkingVisible}
                    document={{
                        id: data.id,
                        documentNumber: data.documentNumber,
                        documentName: data.documentName,
                        description: data.description,
                        keywords: data.keywords,
                        securityLevel: data.securityLevel,
                    }}
                    onClose={() => setEditWorkingVisible(false)}
                    onSuccess={handleRefresh}
                />
            )}

            {/* 添加文件弹窗 */}
            {data && (
                <AddFileDialog
                    visible={addFileVisible}
                    documentId={data.id}
                    documentNumber={data.documentNumber}
                    onClose={() => setAddFileVisible(false)}
                    onSuccess={handleRefresh}
                />
            )}
        </div>
    );
};

export default DocumentDetailPage;
