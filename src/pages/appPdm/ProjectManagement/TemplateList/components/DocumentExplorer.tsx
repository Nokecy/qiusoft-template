import React, { useState, useMemo } from 'react';
import { Tree, Table, Upload, Button, Space, Input, message, Popconfirm, Modal, Form, Switch, Dropdown, MenuProps } from 'antd';
import {
  FolderOutlined,
  FolderOpenOutlined,
  FileOutlined,
  PlusOutlined,
  UploadOutlined,
  DeleteOutlined,
  EditOutlined,
  FolderAddOutlined,
  EyeOutlined,
  DownloadOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { DataNode } from 'antd/es/tree';
import type { ColumnsType } from 'antd/es/table';
import { serverUrl } from '@umijs/max';
import './DocumentExplorer.less';

type FileType = 0 | 1; // 0: 文件夹, 1: 文件

// 支持预览的文件格式
const SUPPORTED_PREVIEW_FORMATS = [
  // 图片格式
  'jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg',
  // PPT格式
  'ppt', 'pptx', 'pps', 'ppsx',
  // Word格式
  'doc', 'docx', 'docm', 'dot', 'dotx',
  // Excel格式
  'xls', 'xlsx', 'xlsm', 'xlsb', 'xlt', 'xltx',
  // PDF格式
  'pdf',
  // 其他微软Office格式
  'odt', 'ods', 'odp', // OpenDocument格式
];

// 微软Office在线预览支持的文件格式
const OFFICE_PREVIEW_FORMATS = [
  'ppt', 'pptx', 'pps', 'ppsx',
  'doc', 'docx', 'docm', 'dot', 'dotx',
  'xls', 'xlsx', 'xlsm', 'xlsb', 'xlt', 'xltx',
  'odt', 'ods', 'odp',
];

// 图片格式（直接预览）
const IMAGE_FORMATS = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];

// PDF格式（直接预览）
const PDF_FORMATS = ['pdf'];

interface DocumentItem {
  id?: string;
  _id?: string; // 前端临时ID
  documentName: string;
  documentUrl?: string;
  blobName?: string; // 文件存储的blobName
  fileName?: string; // 原始文件名
  contentType?: string; // 文件类型
  fileSize?: number; // 文件大小
  parentId?: string;
  isDownload?: boolean;
  type: FileType;
  description?: string;
  children?: DocumentItem[];
}

interface DocumentExplorerProps {
  value?: DocumentItem[];
  onChange?: (value: DocumentItem[]) => void;
  disabled?: boolean; // 禁用编辑功能（查看模式）
}

const DocumentExplorer: React.FC<DocumentExplorerProps> = ({ value = [], onChange, disabled = false }) => {
  const [selectedFolderId, setSelectedFolderId] = useState<string | undefined>();
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [folderModalVisible, setFolderModalVisible] = useState(false);
  const [editingFolder, setEditingFolder] = useState<DocumentItem | null>(null);
  const [folderForm] = Form.useForm();

  // 生成唯一ID
  const generateId = () => `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // 构建树形数据
  const buildTree = (items: DocumentItem[]): DocumentItem[] => {
    const map = new Map<string, DocumentItem>();
    const roots: DocumentItem[] = [];

    // 第一遍遍历：建立映射
    items.forEach(item => {
      const id = item.id || item._id || '';
      map.set(id, { ...item, children: [] });
    });

    // 第二遍遍历：构建父子关系
    items.forEach(item => {
      const id = item.id || item._id || '';
      const node = map.get(id);
      if (!node) return;

      if (item.parentId && map.has(item.parentId)) {
        const parent = map.get(item.parentId);
        if (parent) {
          parent.children = parent.children || [];
          parent.children.push(node);
        }
      } else {
        roots.push(node);
      }
    });

    return roots;
  };

  // 转换为Ant Design Tree数据格式
  const convertToTreeData = (items: DocumentItem[]): DataNode[] => {
    return items
      .filter(item => item.type === 0) // 只显示文件夹
      .map(item => ({
        key: item.id || item._id || '',
        title: item.documentName,
        icon: ({ expanded }: any) => (expanded ? <FolderOpenOutlined /> : <FolderOutlined />),
        children: item.children ? convertToTreeData(item.children) : [],
        isLeaf: !item.children || item.children.filter(c => c.type === 0).length === 0,
      }));
  };

  // 获取当前文件夹下的文件列表
  const getCurrentFolderFiles = (): DocumentItem[] => {
    if (!selectedFolderId) {
      // 根目录：没有parentId的项
      return value.filter(item => !item.parentId);
    }

    // 指定文件夹：parentId匹配的项
    return value.filter(item => item.parentId === selectedFolderId);
  };

  // 树形数据
  const treeData = useMemo(() => {
    const tree = buildTree(value);
    return convertToTreeData(tree);
  }, [value]);

  // 检查文件格式是否支持预览
  const isSupportedPreviewFormat = (record: DocumentItem): boolean => {
    const fileName = record.fileName || record.documentName || '';
    if (!fileName) return false;

    // 获取文件扩展名
    const lastDotIndex = fileName.lastIndexOf('.');
    if (lastDotIndex === -1) return false;

    const extension = fileName.substring(lastDotIndex + 1).toLowerCase();
    return SUPPORTED_PREVIEW_FORMATS.includes(extension);
  };

  // 检查文件是否可以预览/下载
  const canPreviewOrDownload = (record: DocumentItem): boolean => {
    if (record.type !== 1) return false; // 只有文件类型才能预览下载
    // 检查是否有有效的URL或blobName
    return !!(record.documentUrl?.trim() || record.blobName?.trim());
  };

  // 获取文件URL
  const getFileUrl = (record: DocumentItem): string => {
    if (record.documentUrl && record.documentUrl.trim()) {
      const url = record.documentUrl.trim();
      // 如果是相对路径，拼接完整URL
      if (url.startsWith('/')) {
        const apiServerUrl = window.serverUrl?.apiServerUrl || '';
        return apiServerUrl + url;
      }
      // 如果已经是完整URL，直接返回
      return url;
    } else if (record.blobName && record.blobName.trim()) {
      // 使用项目文档上传的下载路由
      const apiServerUrl = window.serverUrl?.apiServerUrl || '';
      return `${apiServerUrl}/api/pdm/project-management/project-document-uploads/${record.blobName}`;
    }
    return '';
  };

  // 获取文件扩展名
  const getFileExtension = (record: DocumentItem): string => {
    const fileName = record.fileName || record.documentName || '';
    const lastDotIndex = fileName.lastIndexOf('.');
    if (lastDotIndex === -1) return '';
    return fileName.substring(lastDotIndex + 1).toLowerCase();
  };

  // 使用微软在线预览
  const handleOfficePreview = (record: DocumentItem) => {
    const url = getFileUrl(record);
    const extension = getFileExtension(record);

    // 检查URL是否可能无法被微软服务访问
    const isLocalhost = url.includes('localhost') || url.includes('127.0.0.1') || url.includes('192.168.');

    if (isLocalhost) {
      Modal.confirm({
        title: '预览提示',
        content: (
          <div>
            <p>检测到文件URL为内网地址，微软在线预览服务无法访问内网地址。</p>
            <p>建议：</p>
            <ul>
              <li>1. 直接下载文件后在本地打开</li>
              <li>2. 或将文件部署到公网可访问的地址</li>
            </ul>
            <p>是否直接下载文件？</p>
          </div>
        ),
        okText: '下载文件',
        cancelText: '取消',
        onOk: () => handleDownload(record),
      });
      return;
    }

    // 确保URL包含文件扩展名
    let previewUrl = url;
    if (!url.toLowerCase().endsWith(`.${extension}`)) {
      previewUrl = url.includes('?') ? `${url}&ext=${extension}` : `${url}?ext=${extension}`;
    }

    const officePreviewUrl = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(previewUrl)}`;
    window.open(officePreviewUrl, '_blank');

    // 延迟提示
    setTimeout(() => {
      message.info({
        content: '如果预览失败，请尝试"直接预览"或下载文件。失败原因可能：1) 文件URL需公网可访问 2) 文件过大(>10MB) 3) 需要认证',
        duration: 8,
      });
    }, 2000);
  };

  // 直接预览（不通过微软服务）
  const handleDirectPreview = (record: DocumentItem) => {
    const url = getFileUrl(record);
    window.open(url, '_blank');
  };

  // 处理文件预览（默认方式）
  const handlePreview = (record: DocumentItem) => {
    // 检查文件格式
    if (!isSupportedPreviewFormat(record)) {
      message.warning('不支持预览此文件格式，仅支持图片、PPT、Word、Excel、PDF格式');
      return;
    }

    const url = getFileUrl(record);
    if (!url) {
      message.warning('该文件没有可用的预览地址');
      return;
    }

    const extension = getFileExtension(record);

    // Office文件默认使用微软在线预览服务
    if (OFFICE_PREVIEW_FORMATS.includes(extension)) {
      handleOfficePreview(record);
    }
    // 图片和PDF直接打开
    else if (IMAGE_FORMATS.includes(extension) || PDF_FORMATS.includes(extension)) {
      window.open(url, '_blank');
    }
    // 其他格式直接打开
    else {
      window.open(url, '_blank');
    }
  };

  // 处理文件下载
  const handleDownload = (record: DocumentItem) => {
    const url = getFileUrl(record);
    if (url) {
      const link = document.createElement('a');
      link.href = url;
      link.download = record.fileName || record.documentName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      message.warning('该文件没有可用的下载地址');
    }
  };

  // 切换下载权限
  const handleToggleDownload = (record: DocumentItem, checked: boolean) => {
    const newValue = value.map(item => {
      if ((item.id || item._id) === (record.id || record._id)) {
        return { ...item, isDownload: checked };
      }
      return item;
    });
    onChange?.(newValue);
  };

  // 表格列定义
  const columns: ColumnsType<DocumentItem> = [
    {
      title: '名称',
      dataIndex: 'documentName',
      key: 'documentName',
      render: (text, record) => (
        <Space>
          {record.type === 0 ? <FolderOutlined style={{ color: '#faad14' }} /> : <FileOutlined style={{ color: '#1890ff' }} />}
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      render: (type) => (type === 0 ? '文件夹' : '文件'),
    },
    {
      title: '允许下载',
      dataIndex: 'isDownload',
      key: 'isDownload',
      width: 100,
      align: 'center',
      render: (isDownload, record) => {
        if (record.type === 0) return '-';
        return (
          <Switch
            checked={isDownload}
            onChange={(checked) => handleToggleDownload(record, checked)}
            size="small"
            disabled={disabled}
          />
        );
      },
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '操作',
      key: 'action',
      width: 250,
      render: (_, record) => (
        <Space size="small">
          {record.type === 1 && (
            <>
              {(() => {
                const extension = getFileExtension(record);
                const isOfficeFile = OFFICE_PREVIEW_FORMATS.includes(extension);
                const isPreviewDisabled = !canPreviewOrDownload(record) || !isSupportedPreviewFormat(record);

                // Office文件显示下拉菜单
                if (isOfficeFile && !isPreviewDisabled) {
                  const menuItems: MenuProps['items'] = [
                    {
                      key: 'online',
                      label: '在线预览',
                      icon: <EyeOutlined />,
                      onClick: () => handleOfficePreview(record),
                    },
                    {
                      key: 'direct',
                      label: '直接预览',
                      icon: <EyeOutlined />,
                      onClick: () => handleDirectPreview(record),
                    },
                  ];

                  return (
                    <Dropdown menu={{ items: menuItems }} trigger={['click']}>
                      <Button
                        type="link"
                        size="small"
                        icon={<EyeOutlined />}
                      >
                        预览 <DownOutlined />
                      </Button>
                    </Dropdown>
                  );
                }

                // 非Office文件或禁用状态显示普通按钮
                return (
                  <Button
                    type="link"
                    size="small"
                    icon={<EyeOutlined />}
                    onClick={() => handlePreview(record)}
                    title={!isSupportedPreviewFormat(record) ? '不支持预览此格式' : '预览'}
                    disabled={isPreviewDisabled}
                  >
                    预览
                  </Button>
                );
              })()}
              <Button
                type="link"
                size="small"
                icon={<DownloadOutlined />}
                onClick={() => handleDownload(record)}
                title="下载"
                disabled={!canPreviewOrDownload(record) || !record.isDownload}
              >
                下载
              </Button>
            </>
          )}
          {/* 查看模式下隐藏编辑和删除按钮 */}
          {!disabled && (
            <>
              {record.type === 0 && (
                <Button
                  type="link"
                  size="small"
                  icon={<EditOutlined />}
                  onClick={() => handleEditFolder(record)}
                >
                  编辑
                </Button>
              )}
              <Popconfirm
                title="确定删除吗?"
                onConfirm={() => handleDelete(record)}
                okText="确定"
                cancelText="取消"
              >
                <Button type="link" danger size="small" icon={<DeleteOutlined />}>
                  删除
                </Button>
              </Popconfirm>
            </>
          )}
        </Space>
      ),
    },
  ];

  // 处理文件夹创建/编辑
  const handleFolderSubmit = () => {
    folderForm.validateFields().then(values => {
      if (editingFolder) {
        // 编辑文件夹
        const newValue = value.map(item => {
          if ((item.id || item._id) === (editingFolder.id || editingFolder._id)) {
            return { ...item, ...values };
          }
          return item;
        });
        onChange?.(newValue);
      } else {
        // 新建文件夹
        const newFolder: DocumentItem = {
          _id: generateId(),
          documentName: values.documentName,
          parentId: selectedFolderId,
          type: 0,
          description: values.description,
          isDownload: false,
          documentUrl: '',
          blobName: '',
        };
        onChange?.([...value, newFolder]);
      }
      setFolderModalVisible(false);
      setEditingFolder(null);
      folderForm.resetFields();
    });
  };

  // 处理编辑文件夹
  const handleEditFolder = (folder: DocumentItem) => {
    setEditingFolder(folder);
    folderForm.setFieldsValue({
      documentName: folder.documentName,
      description: folder.description,
    });
    setFolderModalVisible(true);
  };

  // 处理删除
  const handleDelete = (record: DocumentItem) => {
    const id = record.id || record._id;

    // 如果是文件夹,检查是否有子项
    if (record.type === 0) {
      const hasChildren = value.some(item => item.parentId === id);
      if (hasChildren) {
        message.warning('该文件夹下还有内容,请先删除子项');
        return;
      }
    }

    const newValue = value.filter(item => (item.id || item._id) !== id);
    onChange?.(newValue);
    message.success('删除成功');
  };

  // 处理文件上传
  const handleUploadChange = (info: any) => {
    if (info.file.status === 'done') {
      const response = info.file.response || {};
      console.log('📤 文件上传成功，服务器返回:', response);

      // 根据实际返回的数据结构解析
      // 可能的情况1: 直接返回对象 {blobName, fileName, ...}
      // 可能的情况2: 返回 {data: {blobName, fileName, ...}}
      const fileData = response.data || response;

      // 获取 documentUrl 并拼接完整URL
      let documentUrl = fileData.downloadUrl || fileData.documentUrl || '';
      if (documentUrl && documentUrl.startsWith('/')) {
        const apiServerUrl = window.serverUrl?.apiServerUrl || '';
        documentUrl = apiServerUrl + documentUrl;
      }

      const newFile: DocumentItem = {
        _id: generateId(),
        documentName: info.file.name,
        documentUrl: documentUrl,
        blobName: fileData.blobName || '',
        fileName: fileData.fileName || fileData.originalFileName || info.file.name,
        contentType: fileData.contentType || fileData.mimeType || info.file.type,
        fileSize: fileData.fileSize || fileData.size || info.file.size,
        parentId: selectedFolderId,
        type: 1,
        isDownload: true,
        description: '',
      };

      console.log('📝 创建的文档项:', newFile);
      onChange?.([...value, newFile]);
      message.success(`${info.file.name} 上传成功`);
    } else if (info.file.status === 'error') {
      console.error('❌ 文件上传失败:', info.file.error);
      message.error(`${info.file.name} 上传失败: ${info.file.error?.message || '未知错误'}`);
    }
  };

  // 获取当前文件夹名称
  const getCurrentFolderName = (): string => {
    if (!selectedFolderId) return '根目录';
    const folder = value.find(item => (item.id || item._id) === selectedFolderId);
    return folder ? folder.documentName : '文件夹';
  };

  const currentFiles = getCurrentFolderFiles();

  // 获取上传接口的完整URL
  const getUploadUrl = (): string => {
    const apiServerUrl = window.serverUrl?.apiServerUrl || '';
    return `${apiServerUrl}/api/pdm/project-management/project-document-uploads`;
  };

  return (
    <div className="document-explorer">
      <div className="explorer-container">
        {/* 左侧目录树 */}
        <div className="folder-tree">
          <div className="tree-header">
            <span>文件夹</span>
            {/* 查看模式下隐藏新建文件夹按钮 */}
            {!disabled && (
              <Button
                type="text"
                size="small"
                icon={<FolderAddOutlined />}
                onClick={() => {
                  setEditingFolder(null);
                  folderForm.resetFields();
                  setFolderModalVisible(true);
                }}
              >
                新建文件夹
              </Button>
            )}
          </div>
          <Tree
            showIcon
            expandedKeys={expandedKeys}
            onExpand={(keys) => setExpandedKeys(keys)}
            selectedKeys={selectedFolderId ? [selectedFolderId] : ['root']}
            onSelect={(keys) => {
              const selectedKey = keys?.[0] as string | undefined;
              setSelectedFolderId(selectedKey === 'root' ? undefined : selectedKey);
            }}
            treeData={[
              {
                key: 'root',
                title: '根目录',
                icon: <FolderOutlined />,
                children: treeData,
              },
            ]}
          />
        </div>

        {/* 右侧文件列表 */}
        <div className="file-list">
          <div className="list-header">
            <div className="breadcrumb">
              当前位置: {getCurrentFolderName()}
            </div>
            {/* 查看模式下隐藏上传按钮 */}
            {!disabled && (
              <Space>
                <Upload
                  action={getUploadUrl()}
                  onChange={handleUploadChange}
                  showUploadList={false}
                  withCredentials={true}
                  name="file"
                >
                  <Button icon={<UploadOutlined />}>上传文件</Button>
                </Upload>
              </Space>
            )}
          </div>
          <Table
            dataSource={currentFiles}
            columns={columns}
            rowKey={(record) => record.id || record._id || ''}
            pagination={false}
            size="small"
          />
        </div>
      </div>

      {/* 文件夹编辑对话框 */}
      <Modal
        title={editingFolder ? '编辑文件夹' : '新建文件夹'}
        open={folderModalVisible}
        onOk={handleFolderSubmit}
        onCancel={() => {
          setFolderModalVisible(false);
          setEditingFolder(null);
          folderForm.resetFields();
        }}
        okText="确定"
        cancelText="取消"
      >
        <Form form={folderForm} layout="vertical">
          <Form.Item
            label="文件夹名称"
            name="documentName"
            rules={[{ required: true, message: '请输入文件夹名称' }]}
          >
            <Input placeholder="请输入文件夹名称" />
          </Form.Item>
          <Form.Item label="描述" name="description">
            <Input.TextArea rows={3} placeholder="请输入描述" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DocumentExplorer;
