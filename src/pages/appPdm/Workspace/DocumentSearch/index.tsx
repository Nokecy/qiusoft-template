import { DocumentGetListAsync } from '@/services/pdm/Document';
import { DocumentFileDownloadCurrentRevisionFilesAsZipAsync, DocumentFileGetFilesAsync } from '@/services/pdm/DocumentFile';
import { DocumentTypeGetActiveTypesAsync } from '@/services/pdm/DocumentType';
import { DocumentLibraryGetListAsync } from '@/services/pdm/DocumentLibrary';
import { PartGetListAsync } from '@/services/pdm/Part';
import DrawingViewer from '@/components/DrawingViewer';
import {
  SearchOutlined,
  FileTextOutlined,
  AppstoreOutlined,
  EyeOutlined,
  ClockCircleOutlined,
  FolderOutlined,
  TagOutlined,
  HistoryOutlined,
  FilterOutlined,
  UnorderedListOutlined,
  AppstoreFilled,
  SortAscendingOutlined,
  UserOutlined,
  ClearOutlined,
  DownOutlined,
  UpOutlined,
  LockOutlined,
  DownloadOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import {
  Button,
  Select,
  Input,
  Empty,
  Pagination,
  Tag,
  Spin,
  Space,
  Typography,
  Segmented,
  Tooltip,
  Dropdown,
  Divider,
  TreeSelect,
  message,
} from 'antd';
import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { history, useSearchParams } from 'umi';
import dayjs from 'dayjs';
import './index.less';

const { Text } = Typography;

// 搜索类型枚举
enum SearchType {
  Document = 'document',
  Part = 'part',
}

// 视图类型
type ViewType = 'list' | 'card';

// 排序类型
type SortType = 'updateTime' | 'createTime' | 'code' | 'name';

// 文档发布状态枚举（匹配后端 publishState）
enum DocumentPublishState {
  Unreleased = 0,  // 未发布
  Released = 1,    // 已发布
  Obsolete = 2,    // 已作废
}

const documentStateEnum: Record<number, { label: string; color: string }> = {
  [DocumentPublishState.Unreleased]: { label: '未发布', color: '#d4b106' },
  [DocumentPublishState.Released]: { label: '已发布', color: '#389e0d' },
  [DocumentPublishState.Obsolete]: { label: '已作废', color: '#8c8c8c' },
};

// 物料生命周期状态枚举
const partStateEnum: Record<number, { label: string; color: string }> = {
  0: { label: '草稿', color: '#d4b106' },
  10: { label: '审批中', color: '#1677ff' },
  20: { label: '已发布', color: '#389e0d' },
  30: { label: '已拒绝', color: '#cf1322' },
  40: { label: '已作废', color: '#8c8c8c' },
  50: { label: '已取消', color: '#d46b08' },
};

// 搜索结果项接口
interface SearchResultItem {
  id: string;
  type: SearchType;
  title: string;
  code: string;
  version?: string;
  specification?: string;
  summary: string;
  category: string;
  status: number;
  statusLabel: string;
  statusColor: string;
  updateTime: string;
  createTime: string;
  creator?: string;
  hasPreview?: boolean;
}

// 搜索历史存储 key
const SEARCH_HISTORY_KEY = 'pdm_unified_search_history';
const VIEW_PREFERENCE_KEY = 'pdm_search_view_preference';

// 获取搜索历史
const getSearchHistory = (): { keyword: string; type: SearchType }[] => {
  try {
    const history = localStorage.getItem(SEARCH_HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch {
    return [];
  }
};

// 保存搜索历史
const saveSearchHistory = (keyword: string, type: SearchType) => {
  if (!keyword.trim()) return;
  try {
    const history = getSearchHistory();
    const newItem = { keyword: keyword.trim(), type };
    const filteredHistory = history.filter(
      (item) => !(item.keyword === newItem.keyword && item.type === newItem.type),
    );
    const newHistory = [newItem, ...filteredHistory].slice(0, 10);
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
  } catch {
    // 忽略存储错误
  }
};

// 清除搜索历史
const clearSearchHistory = () => {
  try {
    localStorage.removeItem(SEARCH_HISTORY_KEY);
  } catch {
    // 忽略错误
  }
};

// 获取视图偏好
const getViewPreference = (): ViewType => {
  try {
    return (localStorage.getItem(VIEW_PREFERENCE_KEY) as ViewType) || 'list';
  } catch {
    return 'list';
  }
};

// 保存视图偏好
const saveViewPreference = (view: ViewType) => {
  try {
    localStorage.setItem(VIEW_PREFERENCE_KEY, view);
  } catch {
    // 忽略错误
  }
};

// 高亮关键词
const highlightKeyword = (text: string, keyword: string): React.ReactNode => {
  if (!keyword || !text) return text;
  const regex = new RegExp(`(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part, index) =>
    regex.test(part) ? (
      <mark key={index} className="search-highlight">
        {part}
      </mark>
    ) : (
      part
    ),
  );
};

// 排序选项
const sortOptions = [
  { key: 'updateTime', label: '最近更新', icon: <ClockCircleOutlined /> },
  { key: 'createTime', label: '创建时间', icon: <ClockCircleOutlined /> },
  { key: 'code', label: '编码排序', icon: <SortAscendingOutlined /> },
  { key: 'name', label: '名称排序', icon: <SortAscendingOutlined /> },
];

const DocumentSearchPage: React.FC = () => {
  // URL Query 参数
  const [searchParams, setSearchParams] = useSearchParams();

  // 基础状态
  const [searchType, setSearchType] = useState<SearchType>(
    (searchParams.get('type') as SearchType) || SearchType.Document,
  );
  const [keyword, setKeyword] = useState(searchParams.get('q') || '');
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [total, setTotal] = useState(0);
  const [duration, setDuration] = useState(0);
  const [pageIndex, setPageIndex] = useState(Number(searchParams.get('page')) || 1);
  const [pageSize] = useState(20);
  const [searchHistory, setSearchHistory] = useState<{ keyword: string; type: SearchType }[]>([]);
  const [viewType, setViewType] = useState<ViewType>(getViewPreference);
  const [sortType, setSortType] = useState<SortType>(
    (searchParams.get('sort') as SortType) || 'updateTime',
  );
  const [statusFilter, setStatusFilter] = useState<string>(searchParams.get('status') || 'all');
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

  // 预览状态
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [previewDrawingType, setPreviewDrawingType] = useState<number>(2);

  // 高级搜索状态
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [documentTypeId, setDocumentTypeId] = useState<string | undefined>(
    searchParams.get('typeId') || undefined,
  );
  const [libraryId, setLibraryId] = useState<string | undefined>(
    searchParams.get('libraryId') || undefined,
  );
  const [securityLevel, setSecurityLevel] = useState<string | undefined>(
    searchParams.get('securityLevel') || undefined,
  );
  const [checkedOutFilter, setCheckedOutFilter] = useState<string | undefined>(
    searchParams.get('checkedOut') || undefined,
  );

  // 字典数据
  const [documentTypes, setDocumentTypes] = useState<{ id: string; name: string }[]>([]);
  const [documentLibraries, setDocumentLibraries] = useState<any[]>([]);
  const [loadingDicts, setLoadingDicts] = useState(false);

  const inputRef = useRef<any>(null);

  // 密级选项
  const securityLevelOptions = [
    { label: '公开', value: '0' },
    { label: '内部', value: '1' },
    { label: '保密', value: '2' },
    { label: '机密', value: '3' },
  ];

  // 检出状态选项
  const checkedOutOptions = [
    { label: '全部', value: '' },
    { label: '已检出', value: 'true' },
    { label: '未检出', value: 'false' },
  ];

  // 状态筛选选项
  const statusOptions = useMemo(() => {
    if (searchType === SearchType.Document) {
      return [
        { label: '全部', value: 'all' },
        { label: '未发布', value: '0' },
        { label: '已发布', value: '1' },
        { label: '已作废', value: '2' },
      ];
    }
    return [
      { label: '全部', value: 'all' },
      { label: '草稿', value: '0' },
      { label: '审批中', value: '10' },
      { label: '已发布', value: '20' },
      { label: '已作废', value: '40' },
    ];
  }, [searchType]);

  // 加载字典数据
  useEffect(() => {
    const loadDicts = async () => {
      if (searchType !== SearchType.Document) return;
      setLoadingDicts(true);
      try {
        const [typesRes, librariesRes] = await Promise.all([
          DocumentTypeGetActiveTypesAsync(),
          DocumentLibraryGetListAsync({ MaxResultCount: 1000 } as any),
        ]);
        setDocumentTypes(
          (typesRes || []).map((t: any) => ({ id: t.id, name: t.name || t.typeName })),
        );
        // 构建树结构
        const libs = (librariesRes?.items || []).map((lib: any) => ({
          value: lib.id,
          title: lib.name || lib.libraryName,
          parentId: lib.parentLibraryId,
        }));
        setDocumentLibraries(buildLibraryTree(libs));
      } catch (error) {
        console.error('加载字典数据失败:', error);
      } finally {
        setLoadingDicts(false);
      }
    };
    loadDicts();
  }, [searchType]);

  // 构建文档库树结构
  const buildLibraryTree = (items: any[]): any[] => {
    const itemMap = new Map<string, any>();
    const roots: any[] = [];
    items.forEach((item) => {
      itemMap.set(item.value, { ...item, children: [] });
    });
    items.forEach((item) => {
      const node = itemMap.get(item.value)!;
      if (item.parentId && itemMap.has(item.parentId)) {
        itemMap.get(item.parentId)!.children.push(node);
      } else {
        roots.push(node);
      }
    });
    // 移除空的 children 数组
    const cleanTree = (nodes: any[]): any[] =>
      nodes.map((n) => ({
        ...n,
        children: n.children.length > 0 ? cleanTree(n.children) : undefined,
      }));
    return cleanTree(roots);
  };

  // URL 同步 - 更新 URL
  const updateURLParams = useCallback(
    (params: Record<string, string | undefined>) => {
      const newParams = new URLSearchParams(searchParams.toString());
      Object.entries(params).forEach(([key, value]) => {
        if (value && value !== 'all' && value !== '') {
          newParams.set(key, value);
        } else {
          newParams.delete(key);
        }
      });
      setSearchParams(newParams, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  // 加载搜索历史
  useEffect(() => {
    setSearchHistory(getSearchHistory());
  }, []);

  // 初始状态聚焦输入框
  useEffect(() => {
    if (!hasSearched && inputRef.current) {
      inputRef.current.focus();
    }
  }, [hasSearched]);

  // URL 初始化搜索（如果 URL 带有 q 参数）
  useEffect(() => {
    const q = searchParams.get('q');
    if (q && !hasSearched) {
      handleSearch(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 获取排序字段
  const getSortingField = useCallback(
    (sort: SortType) => {
      const sortMap: Record<SortType, string> = {
        updateTime: 'lastModificationTime desc',
        createTime: 'creationTime desc',
        code: searchType === SearchType.Document ? 'documentNumber asc' : 'partNumber asc',
        name: searchType === SearchType.Document ? 'documentName asc' : 'description asc',
      };
      return sortMap[sort];
    },
    [searchType],
  );

  // 执行搜索的核心函数
  const executeSearch = useCallback(
    async (
      searchKeyword: string,
      type: SearchType,
      page: number,
      sort: SortType = sortType,
      status: string = statusFilter,
    ) => {
      if (!searchKeyword.trim()) return;

      setIsSearching(true);
      setPageIndex(page);
      const startTime = Date.now();

      try {
        const skipCount = (page - 1) * pageSize;

        // 构建筛选条件 - 使用 ABP Dynamic Filter 语法
        // 格式: field=*value 表示模糊匹配, | 表示 OR, , 表示 AND
        const nameField = type === SearchType.Document ? 'documentName' : 'description';
        const codeField = type === SearchType.Document ? 'documentNumber' : 'partNumber';
        const keyword = searchKeyword.trim();

        // 基础条件：关键词搜索（如果有关键词）
        let filterParts: string[] = [];
        if (keyword) {
          filterParts.push(`(${nameField}=*${keyword}|${codeField}=*${keyword})`);
        }

        // 添加状态筛选
        if (status !== 'all') {
          const statusField = type === SearchType.Document ? 'publishState' : 'lifecycleStatus';
          filterParts.push(`${statusField}=${status}`);
        }

        // 文档类型筛选（仅文档模式）
        if (type === SearchType.Document && documentTypeId) {
          filterParts.push(`documentTypeId=${documentTypeId}`);
        }

        // 文档库筛选（仅文档模式）
        if (type === SearchType.Document && libraryId) {
          filterParts.push(`storageLibraryId=${libraryId}`);
        }

        // 密级筛选（仅文档模式）
        if (type === SearchType.Document && securityLevel) {
          filterParts.push(`securityLevel=${securityLevel}`);
        }

        // 检出状态筛选（仅文档模式）
        if (type === SearchType.Document && checkedOutFilter) {
          filterParts.push(`isCheckedOut=${checkedOutFilter}`);
        }

        // 如果没有任何筛选条件，至少要有一个条件才能查询
        const filter = filterParts.length > 0 ? filterParts.join(',') : undefined;

        let items: SearchResultItem[] = [];
        let totalCount = 0;

        if (type === SearchType.Document) {
          const data = await DocumentGetListAsync({
            Filter: filter,
            SkipCount: skipCount,
            MaxResultCount: pageSize,
            Sorting: getSortingField(sort),
          } as any);

          items = (data.items || []).map((item: any) => {
            const stateInfo = documentStateEnum[item.publishState] || {
              label: '未知',
              color: '#8c8c8c',
            };
            return {
              id: item.id,
              type: SearchType.Document,
              title: item.documentName || '-',
              code: item.documentNumber || '-',
              version: item.version || '-',
              summary: item.description || '',
              category: item.documentTypeName || '-',
              status: item.publishState,
              statusLabel: stateInfo.label,
              statusColor: stateInfo.color,
              updateTime: item.lastModificationTime,
              createTime: item.creationTime,
              creator: item.creator,
              hasPreview: true,
            };
          });
          totalCount = data.totalCount || 0;
        } else {
          const data = await PartGetListAsync({
            Filter: filter,
            SkipCount: skipCount,
            MaxResultCount: pageSize,
            Sorting: getSortingField(sort),
          } as any);

          items = (data.items || []).map((item: any) => {
            const stateInfo = partStateEnum[item.lifecycleStatus] || {
              label: '未知',
              color: '#8c8c8c',
            };
            return {
              id: item.id,
              type: SearchType.Part,
              title: item.description || item.partNumber || '-',
              code: item.partNumber || '-',
              version: item.versionInfo?.version || '-',
              specification: item.specification,
              summary: `${item.specification || '-'} | ${item.unit || '-'}`,
              category: item.categoryName || '-',
              status: item.lifecycleStatus,
              statusLabel: stateInfo.label,
              statusColor: stateInfo.color,
              updateTime: item.lastModificationTime,
              createTime: item.creationTime,
              creator: item.creatorName,
            };
          });
          totalCount = data.totalCount || 0;
        }

        setResults(items);
        setTotal(totalCount);
        setHasSearched(true);
        setDuration(Date.now() - startTime);

        // 保存搜索历史
        saveSearchHistory(searchKeyword, type);
        setSearchHistory(getSearchHistory());

        // 更新 URL 参数
        updateURLParams({
          q: searchKeyword,
          type: type !== SearchType.Document ? type : undefined,
          status,
          sort,
          page: page > 1 ? String(page) : undefined,
          typeId: documentTypeId,
          libraryId,
          securityLevel,
          checkedOut: checkedOutFilter,
        });
      } catch (error) {
        console.error('搜索失败:', error);
        setResults([]);
        setTotal(0);
      } finally {
        setIsSearching(false);
      }
    },
    [pageSize, sortType, statusFilter, getSortingField, updateURLParams, documentTypeId, libraryId, securityLevel, checkedOutFilter],
  );

  // 执行搜索（使用当前状态）
  const handleSearch = useCallback(
    async (page = 1) => {
      await executeSearch(keyword, searchType, page, sortType, statusFilter);
    },
    [keyword, searchType, sortType, statusFilter, executeSearch],
  );

  // 处理键盘事件
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(1);
    } else if (e.key === 'Escape') {
      setKeyword('');
    }
  };

  // 点击搜索历史
  const handleHistoryClick = async (item: { keyword: string; type: SearchType }) => {
    setKeyword(item.keyword);
    setSearchType(item.type);
    await executeSearch(item.keyword, item.type, 1);
  };

  // 清除搜索历史
  const handleClearHistory = () => {
    clearSearchHistory();
    setSearchHistory([]);
  };

  // 重置搜索条件
  const handleReset = () => {
    setKeyword('');
    setStatusFilter('all');
    setDocumentTypeId(undefined);
    setLibraryId(undefined);
    setSecurityLevel(undefined);
    setCheckedOutFilter(undefined);
    setHasSearched(false);
    setResults([]);
    setTotal(0);
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  // 下载 ZIP
  const handleDownloadZip = async (documentId: string) => {
    const hide = message.loading('正在准备下载...', 0);
    try {
      const result = await DocumentFileDownloadCurrentRevisionFilesAsZipAsync({
        documentId,
      });
      if (result?.downloadUrl) {
        window.open(result.downloadUrl, '_blank');
        message.success('下载已开始');
      }
    } catch (error: any) {
      message.error(error?.message || '下载失败');
    } finally {
      hide();
    }
  };

  // 查看详情
  const handleViewDetail = (item: SearchResultItem) => {
    if (item.type === SearchType.Document) {
      history.push(`/appPdm/DocumentManagement/Document/detail?id=${item.id}`);
    } else {
      history.push(`/appPdm/PartManagement/Part/detail?id=${item.id}`);
    }
  };

  // 切换搜索类型
  const handleSearchTypeChange = (type: SearchType) => {
    setSearchType(type);
    setStatusFilter('all');
    if (hasSearched && keyword.trim()) {
      executeSearch(keyword, type, 1, sortType, 'all');
    }
  };

  // 切换视图
  const handleViewChange = (view: ViewType) => {
    setViewType(view);
    saveViewPreference(view);
  };

  // 切换排序
  const handleSortChange = (sort: SortType) => {
    setSortType(sort);
    if (hasSearched && keyword.trim()) {
      executeSearch(keyword, searchType, 1, sort, statusFilter);
    }
  };

  // 切换状态筛选
  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
    if (hasSearched && keyword.trim()) {
      executeSearch(keyword, searchType, 1, sortType, status);
    }
  };

  // 分页变化
  const handlePageChange = (page: number) => {
    handleSearch(page);
  };

  // 预览文档
  const handlePreview = async (item: SearchResultItem) => {
    if (!item.hasPreview) {
      message.info('此文档暂无可预览内容');
      return;
    }

    const hide = message.loading('正在加载预览...', 0);
    try {
      // 获取文档的文件列表，找到主文档（fileRole === 0）
      const files = await DocumentFileGetFilesAsync({ documentId: item.id });
      const primaryFile = files?.find((f: any) => f.fileRole === 0);

      if (!primaryFile?.id) {
        message.info('此文档暂无可预览文件');
        return;
      }

      // 检查是否有转换任务
      const conversionId = primaryFile.conversion?.id;
      if (!conversionId) {
        message.info('此文件暂无转换结果，无法预览');
        return;
      }

      const baseUrl = (window as any).serverUrl?.apiServerUrl || '';
      // 使用 conversionId 构建预览 URL
      const viewerUrl = `${baseUrl}/api/pdm/conversion-files/${conversionId}`;
      setPreviewUrl(viewerUrl);
      setPreviewDrawingType(primaryFile.conversion?.drawingType || 2);
      setPreviewVisible(true);
    } catch (error: any) {
      message.error(error?.message || '加载预览失败');
    } finally {
      hide();
    }
  };

  // 渲染列表视图项
  const renderListItem = (item: SearchResultItem) => (
    <div
      key={item.id}
      className={`result-list-item ${hoveredItemId === item.id ? 'hovered' : ''}`}
      onClick={() => handleViewDetail(item)}
      onMouseEnter={() => setHoveredItemId(item.id)}
      onMouseLeave={() => setHoveredItemId(null)}
    >
      <div className="item-icon">
        {item.type === SearchType.Document ? <FileTextOutlined /> : <AppstoreOutlined />}
      </div>
      <div className="item-code">{highlightKeyword(item.code, keyword)}</div>
      <div className="item-title">{highlightKeyword(item.title, keyword)}</div>
      <div className="item-version">
        <Text type="secondary">{item.version}</Text>
      </div>
      <div className="item-category">
        <FolderOutlined className="item-category-icon" />
        <Text type="secondary">{item.category}</Text>
      </div>
      <div className="item-status">
        <Tag color={item.statusColor} className="status-tag">
          {item.statusLabel}
        </Tag>
      </div>
      <div className="item-time">
        <Text type="secondary">
          {item.updateTime
            ? dayjs(item.updateTime).format('MM-DD HH:mm')
            : item.createTime
              ? dayjs(item.createTime).format('MM-DD HH:mm')
              : '-'}
        </Text>
      </div>
      <div className="item-creator">
        <UserOutlined className="item-creator-icon" />
        <Text type="secondary">{item.creator || '-'}</Text>
      </div>
      <div className="item-actions">
        <Space size={0}>
          {item.type === SearchType.Document && item.hasPreview && (
            <Tooltip title="预览">
              <Button
                type="text"
                size="small"
                icon={<PlayCircleOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePreview(item);
                }}
              />
            </Tooltip>
          )}
          <Tooltip title="查看详情">
            <Button
              type="text"
              size="small"
              icon={<EyeOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                handleViewDetail(item);
              }}
            />
          </Tooltip>
          {item.type === SearchType.Document && (
            <Tooltip title="下载 ZIP">
              <Button
                type="text"
                size="small"
                icon={<DownloadOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownloadZip(item.id);
                }}
              />
            </Tooltip>
          )}
        </Space>
      </div>
    </div>
  );

  // 渲染卡片视图项
  const renderCardItem = (item: SearchResultItem) => (
    <div
      key={item.id}
      className={`result-card-item ${hoveredItemId === item.id ? 'hovered' : ''}`}
      onClick={() => handleViewDetail(item)}
      onMouseEnter={() => setHoveredItemId(item.id)}
      onMouseLeave={() => setHoveredItemId(null)}
    >
      <div className="card-header">
        <div className="card-icon">
          {item.type === SearchType.Document ? <FileTextOutlined /> : <AppstoreOutlined />}
        </div>
        <div className="card-title-area">
          <div className="card-code">{highlightKeyword(item.code, keyword)}</div>
          <div className="card-title">{highlightKeyword(item.title, keyword)}</div>
        </div>
        <Tag color={item.statusColor} className="card-status">
          {item.statusLabel}
        </Tag>
      </div>
      <div className="card-meta">
        <span className="meta-item">
          <TagOutlined />
          {item.version}
        </span>
        <span className="meta-item">
          <FolderOutlined />
          {item.category}
        </span>
      </div>
      {item.summary && <div className="card-summary">{item.summary}</div>}
      <div className="card-footer">
        <span className="footer-item">
          <ClockCircleOutlined />
          {item.updateTime
            ? dayjs(item.updateTime).format('YYYY-MM-DD HH:mm')
            : item.createTime
              ? dayjs(item.createTime).format('YYYY-MM-DD HH:mm')
              : '-'}
        </span>
        {item.creator && (
          <span className="footer-item">
            <UserOutlined />
            {item.creator}
          </span>
        )}
      </div>
      {item.type === SearchType.Document && item.hasPreview && (
        <div className="card-preview-overlay">
          <Button
            type="primary"
            icon={<PlayCircleOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              handlePreview(item);
            }}
          >
            预览
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div className="document-search-page">
      {/* 搜索头部 */}
      <div className="search-header">
        <div className="search-bar">
          <div className="search-input-group">
            <Select
              value={searchType}
              onChange={handleSearchTypeChange}
              className="search-type-select"
              dropdownMatchSelectWidth={false}
              options={[
                {
                  value: SearchType.Document,
                  label: (
                    <span className="type-option">
                      <FileTextOutlined />
                      文档
                    </span>
                  ),
                },
                {
                  value: SearchType.Part,
                  label: (
                    <span className="type-option">
                      <AppstoreOutlined />
                      物料
                    </span>
                  ),
                },
              ]}
            />
            <Input
              ref={inputRef}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                searchType === SearchType.Document
                  ? '输入文档编号或名称搜索...'
                  : '输入物料编码或描述搜索...'
              }
              className="search-input"
              allowClear
            />
            <Button
              type="primary"
              icon={<SearchOutlined />}
              loading={isSearching}
              onClick={() => handleSearch(1)}
              className="search-btn"
            >
              搜索
            </Button>
          </div>
          {searchType === SearchType.Document && (
            <Button
              type="link"
              size="small"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="advanced-toggle-btn"
            >
              {showAdvanced ? <UpOutlined /> : <DownOutlined />}
              {showAdvanced ? '收起高级' : '展开高级'}
            </Button>
          )}
        </div>

        {/* 高级搜索条件 */}
        {searchType === SearchType.Document && showAdvanced && (
          <div className="advanced-search">
            <Space wrap size={[16, 8]}>
              <Select
                placeholder="文档类型"
                allowClear
                showSearch
                optionFilterProp="label"
                value={documentTypeId}
                onChange={setDocumentTypeId}
                loading={loadingDicts}
                style={{ width: 160 }}
                options={documentTypes.map((t) => ({ label: t.name, value: t.id }))}
              />
              <TreeSelect
                placeholder="存储库"
                allowClear
                showSearch
                treeNodeFilterProp="title"
                value={libraryId}
                onChange={setLibraryId}
                loading={loadingDicts}
                treeData={documentLibraries}
                style={{ width: 180 }}
              />
              <Select
                placeholder="密级"
                allowClear
                value={securityLevel}
                onChange={setSecurityLevel}
                style={{ width: 100 }}
                options={securityLevelOptions}
              />
              <Select
                placeholder="检出状态"
                allowClear
                value={checkedOutFilter}
                onChange={setCheckedOutFilter}
                style={{ width: 120 }}
                options={checkedOutOptions}
              />
              <Button icon={<ClearOutlined />} onClick={handleReset}>
                重置
              </Button>
            </Space>
          </div>
        )}

        {/* 搜索历史 */}
        {searchHistory.length > 0 && !hasSearched && (
          <div className="search-history">
            <div className="history-header">
              <span className="history-label">
                <HistoryOutlined />
                最近搜索
              </span>
              <Button
                type="link"
                size="small"
                icon={<ClearOutlined />}
                onClick={handleClearHistory}
                className="clear-btn"
              >
                清除
              </Button>
            </div>
            <div className="history-tags">
              {searchHistory.slice(0, 8).map((item, index) => (
                <Tag
                  key={index}
                  className="history-tag"
                  onClick={() => handleHistoryClick(item)}
                  icon={
                    item.type === SearchType.Document ? <FileTextOutlined /> : <AppstoreOutlined />
                  }
                >
                  {item.keyword}
                </Tag>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 搜索结果区域 */}
      {hasSearched && (
        <div className="search-results">
          {/* 工具栏 */}
          <div className="results-toolbar">
            <div className="toolbar-left">
              <span className="results-stats">
                找到 <strong>{total}</strong> 条结果
                <span className="duration">({(duration / 1000).toFixed(2)}s)</span>
              </span>
              <Divider type="vertical" />
              <Segmented
                size="small"
                value={statusFilter}
                onChange={(v) => handleStatusFilterChange(v as string)}
                options={statusOptions}
                className="status-filter"
              />
            </div>
            <div className="toolbar-right">
              <Dropdown
                menu={{
                  items: sortOptions.map((opt) => ({
                    key: opt.key,
                    label: (
                      <Space>
                        {opt.icon}
                        {opt.label}
                      </Space>
                    ),
                  })),
                  selectedKeys: [sortType],
                  onClick: ({ key }) => handleSortChange(key as SortType),
                }}
                trigger={['click']}
              >
                <Button size="small" icon={<SortAscendingOutlined />}>
                  {sortOptions.find((o) => o.key === sortType)?.label}
                </Button>
              </Dropdown>
              <Segmented
                size="small"
                value={viewType}
                onChange={(v) => handleViewChange(v as ViewType)}
                options={[
                  { value: 'list', icon: <UnorderedListOutlined />, title: '列表视图' },
                  { value: 'card', icon: <AppstoreFilled />, title: '卡片视图' },
                ]}
                className="view-switch"
              />
            </div>
          </div>

          {/* 结果列表 */}
          <Spin spinning={isSearching}>
            {results.length > 0 ? (
              <>
                {viewType === 'list' ? (
                  <div className="results-list-view">
                    <div className="list-header">
                      <div className="header-icon"></div>
                      <div className="header-code">编码</div>
                      <div className="header-title">名称</div>
                      <div className="header-version">版本</div>
                      <div className="header-category">分类</div>
                      <div className="header-status">状态</div>
                      <div className="header-time">更新时间</div>
                      <div className="header-creator">创建人</div>
                      <div className="header-actions">操作</div>
                    </div>
                    <div className="list-body">{results.map(renderListItem)}</div>
                  </div>
                ) : (
                  <div className="results-card-view">{results.map(renderCardItem)}</div>
                )}
              </>
            ) : (
              <div className="empty-state">
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={
                    <span>
                      未找到与 "<strong>{keyword}</strong>" 相关的
                      {searchType === SearchType.Document ? '文档' : '物料'}
                    </span>
                  }
                />
              </div>
            )}
          </Spin>

          {/* 分页器 */}
          {total > pageSize && (
            <div className="results-pagination">
              <Pagination
                current={pageIndex}
                total={total}
                pageSize={pageSize}
                onChange={handlePageChange}
                showSizeChanger={false}
                showQuickJumper
                showTotal={(total) => `共 ${total} 条`}
                size="small"
              />
            </div>
          )}
        </div>
      )}

      {/* 空状态引导 */}
      {!hasSearched && (
        <div className="search-guide">
          <div className="guide-content">
            <SearchOutlined className="guide-icon" />
            <div className="guide-title">统一搜索</div>
            <div className="guide-desc">
              快速搜索文档和物料，支持编号、名称等多种搜索方式
            </div>
            <div className="guide-tips">
              <div className="tip-item">
                <FileTextOutlined />
                <span>搜索技术文档、规范文档、设计文档等</span>
              </div>
              <div className="tip-item">
                <AppstoreOutlined />
                <span>搜索物料编码、物料描述、规格型号等</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 文档预览 */}
      <DrawingViewer
        visible={previewVisible}
        onClose={() => setPreviewVisible(false)}
        modelUrl={previewUrl}
        drawingType={previewDrawingType}
      />
    </div>
  );
};

export default DocumentSearchPage;

export const routeProps = {
  name: '统一搜索',
};
