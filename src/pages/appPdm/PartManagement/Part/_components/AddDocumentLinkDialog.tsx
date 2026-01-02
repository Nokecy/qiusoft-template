/**
 * 添加关联文档对话框
 * 用于在物料详情页关联已存在的文档
 * 使用 AgGridPlus 组件
 */
import React, { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import {
  Modal,
  Form,
  Select,
  Radio,
  message,
  Tag,
  Button,
  Space,
  Input,
  Empty,
} from 'antd';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import { AgGridPlus } from '@/components/agGrid';
import type { ColDef, SelectionChangedEvent, GridReadyEvent } from 'ag-grid-community';
import type { AgGridReact } from 'ag-grid-react';
import { DocumentGetListAsync } from '@/services/pdm/Document';
import { PartDocumentLinkCreateAsync } from '@/services/pdm/PartDocumentLink';

// 关联用途枚举
enum RelationUsage {
  Design2D = 10,         // 2D设计图纸
  Design3D = 20,         // 3D设计模型
  WorkInstruction = 30,  // 作业指导书
  InspectionPlan = 40,   // 检验计划
  Certificate = 50,      // 认证证书
  SafetyDataSheet = 60,  // 安全数据表
  PackagingSpec = 70,    // 包装规范
  SupplierDoc = 80,      // 供应商文档
  TechnicalSpec = 90,    // 技术规范
  Other = 999,           // 其他
}

const usageOptions = [
  { label: '2D设计图纸', value: RelationUsage.Design2D },
  { label: '3D设计模型', value: RelationUsage.Design3D },
  { label: '作业指导书', value: RelationUsage.WorkInstruction },
  { label: '检验计划', value: RelationUsage.InspectionPlan },
  { label: '认证证书', value: RelationUsage.Certificate },
  { label: '安全数据表', value: RelationUsage.SafetyDataSheet },
  { label: '包装规范', value: RelationUsage.PackagingSpec },
  { label: '供应商文档', value: RelationUsage.SupplierDoc },
  { label: '技术规范', value: RelationUsage.TechnicalSpec },
  { label: '其他', value: RelationUsage.Other },
];

// 文档状态枚举
enum DocumentState {
  Draft = 0,
  InApproval = 1,
  Approved = 2,
  Released = 3,
  Archived = 4,
  Obsolete = 5,
}

const stateConfig: Record<number, { label: string; color: string }> = {
  [DocumentState.Draft]: { label: '草稿', color: 'orange' },
  [DocumentState.InApproval]: { label: '审批中', color: 'blue' },
  [DocumentState.Approved]: { label: '已批准', color: 'cyan' },
  [DocumentState.Released]: { label: '已发布', color: 'green' },
  [DocumentState.Archived]: { label: '已归档', color: 'purple' },
  [DocumentState.Obsolete]: { label: '已作废', color: 'default' },
};

interface DocumentItem {
  id: string;
  documentNumber: string;
  documentName: string;
  version?: string;
  lifecycleState?: number;
  documentTypeName?: string;
}

interface AddDocumentLinkDialogProps {
  visible: boolean;
  partNumber: string;
  existingDocumentNumbers?: string[]; // 已关联的文档编号
  onCancel: () => void;
  onSuccess: () => void;
}

const AddDocumentLinkDialog: React.FC<AddDocumentLinkDialogProps> = ({
  visible,
  partNumber,
  existingDocumentNumbers = [],
  onCancel,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [documentList, setDocumentList] = useState<DocumentItem[]>([]);
  const [selectedDocuments, setSelectedDocuments] = useState<DocumentItem[]>([]);
  const gridRef = useRef<AgGridReact<DocumentItem>>(null);

  // 使用 useMemo 缓存已关联文档编号集合
  const existingDocSet = useMemo(
    () => new Set(existingDocumentNumbers),
    [existingDocumentNumbers]
  );

  // 加载文档列表
  const loadDocuments = useCallback(async (filter?: string) => {
    setLoading(true);
    try {
      const result = await DocumentGetListAsync({
        Filter: filter,
        MaxResultCount: 50,
        SkipCount: 0,
      });

      // 过滤掉已关联的文档
      const filteredItems = (result.items || [])
        .filter((item: any) => !existingDocSet.has(item.documentNumber))
        .map((item: any) => ({
          id: item.id,
          documentNumber: item.documentNumber,
          documentName: item.documentName,
          version: item.version,
          lifecycleState: item.lifecycleState,
          documentTypeName: item.documentTypeName,
        }));

      setDocumentList(filteredItems);
    } catch (error) {
      console.error('加载文档列表失败:', error);
      message.error('加载文档列表失败');
    } finally {
      setLoading(false);
    }
  }, [existingDocSet]);

  // 打开对话框时加载文档列表 - 移除 loadDocuments 依赖避免无限刷新
  useEffect(() => {
    if (visible) {
      setSelectedDocuments([]);
      setSearchValue('');
      form.resetFields();
      form.setFieldsValue({ usage: RelationUsage.Design2D, isPrimary: false });
      // 直接调用加载
      loadDocuments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, form]);

  // 搜索文档
  const handleSearch = useCallback(() => {
    loadDocuments(searchValue);
  }, [searchValue, loadDocuments]);

  // AgGrid 选择变化
  const handleSelectionChanged = useCallback((event: SelectionChangedEvent<DocumentItem>) => {
    const selectedRows = event.api.getSelectedRows();
    setSelectedDocuments(selectedRows);
  }, []);

  // 移除已选文档
  const handleRemoveSelected = useCallback((documentNumber: string) => {
    setSelectedDocuments((prev) => {
      const newSelected = prev.filter((doc) => doc.documentNumber !== documentNumber);
      // 同步更新主表格的选中状态
      if (gridRef.current?.api) {
        gridRef.current.api.forEachNode((node) => {
          if (node.data?.documentNumber === documentNumber) {
            node.setSelected(false);
          }
        });
      }
      return newSelected;
    });
  }, []);

  // 提交关联
  const handleSubmit = useCallback(async () => {
    if (selectedDocuments.length === 0) {
      message.warning('请至少选择一个文档');
      return;
    }

    try {
      const values = await form.validateFields();
      setSubmitting(true);

      // 逐个创建关联
      const errors: string[] = [];
      for (const doc of selectedDocuments) {
        try {
          await PartDocumentLinkCreateAsync({
            partNumber,
            documentNumber: doc.documentNumber,
            drawingNumber: values.drawingNumber,
            usage: values.usage,
            isPrimary: values.isPrimary,
          });
        } catch (error: any) {
          errors.push(`${doc.documentNumber}: ${error?.message || '关联失败'}`);
        }
      }

      if (errors.length > 0) {
        message.warning(`部分文档关联失败: ${errors.join('; ')}`);
      } else {
        message.success(`成功关联 ${selectedDocuments.length} 个文档`);
      }

      onSuccess();
    } catch (error) {
      console.error('关联文档失败:', error);
      message.error('关联文档失败');
    } finally {
      setSubmitting(false);
    }
  }, [selectedDocuments, partNumber, form, onSuccess]);

  // 主表格列定义
  const columnDefs: ColDef<DocumentItem>[] = useMemo(() => [
    {
      headerName: '文档编号',
      field: 'documentNumber',
      width: 150,
      headerCheckboxSelection: true,
      checkboxSelection: true,
    },
    {
      headerName: '文档名称',
      field: 'documentName',
      flex: 1,
      minWidth: 200,
    },
    {
      headerName: '版本',
      field: 'version',
      width: 80,
      valueFormatter: (params) => params.value || '-',
    },
    {
      headerName: '状态',
      field: 'lifecycleState',
      width: 90,
      cellRenderer: (params: any) => {
        const config = stateConfig[params.value];
        if (!config) return '-';
        return <Tag color={config.color}>{config.label}</Tag>;
      },
    },
    {
      headerName: '文档类型',
      field: 'documentTypeName',
      width: 120,
      valueFormatter: (params) => params.value || '-',
    },
  ], []);

  // 已选文档表格列定义
  const selectedColumnDefs: ColDef<DocumentItem>[] = useMemo(() => [
    {
      headerName: '文档编号',
      field: 'documentNumber',
      width: 150,
    },
    {
      headerName: '文档名称',
      field: 'documentName',
      flex: 1,
      minWidth: 150,
    },
    {
      headerName: '操作',
      width: 70,
      cellRenderer: (params: any) => (
        <Button
          type="link"
          danger
          size="small"
          icon={<DeleteOutlined />}
          onClick={() => handleRemoveSelected(params.data.documentNumber)}
        />
      ),
    },
  ], [handleRemoveSelected]);

  // 表格就绪
  const onGridReady = useCallback((params: GridReadyEvent) => {
    params.api.sizeColumnsToFit();
  }, []);

  return (
    <Modal
      title="添加关联文档"
      open={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      confirmLoading={submitting}
      width={900}
      destroyOnClose
      okText="确认关联"
      cancelText="取消"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* 关联配置 */}
        <Form form={form} layout="inline">
          <Form.Item
            name="usage"
            label="用途"
            rules={[{ required: true, message: '请选择用途' }]}
          >
            <Select style={{ width: 150 }} options={usageOptions} />
          </Form.Item>
          <Form.Item name="isPrimary" label="主要关联">
            <Radio.Group>
              <Radio value={true}>是</Radio>
              <Radio value={false}>否</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="drawingNumber" label="图号">
            <Input placeholder="请输入图号" style={{ width: 200 }} />
          </Form.Item>
        </Form>

        {/* 搜索栏 */}
        <Space>
          <Input
            placeholder="搜索文档编号/名称"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onPressEnter={handleSearch}
            style={{ width: 300 }}
            allowClear
          />
          <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
            搜索
          </Button>
        </Space>

        {/* 文档选择表格 - AgGridPlus */}
        <div>
          <div style={{ marginBottom: 8, color: '#666', fontSize: 12 }}>
            可选文档（已过滤掉当前物料已关联的文档）
          </div>
          <AgGridPlus
            gridRef={gridRef}
            columnDefs={columnDefs}
            rowData={documentList}
            loading={loading}
            rowSelection="multiple"
            suppressRowClickSelection={true}
            onSelectionChanged={handleSelectionChanged}
            onGridReady={onGridReady}
            getRowId={(params) => params.data.documentNumber}
            domLayout="autoHeight"
            style={{ height: 250 }}
            pagination={false}
            noRowsOverlayComponent={() => (
              <Empty description="暂无可关联的文档" />
            )}
          />
        </div>

        {/* 已选文档列表 - AgGridPlus */}
        {selectedDocuments.length > 0 && (
          <div>
            <div style={{ marginBottom: 8, color: '#1890ff', fontWeight: 500 }}>
              已选择 {selectedDocuments.length} 个文档
            </div>
            <AgGridPlus
              columnDefs={selectedColumnDefs}
              rowData={selectedDocuments}
              domLayout="autoHeight"
              style={{ height: 150 }}
              pagination={false}
              getRowId={(params) => params.data.documentNumber}
              headerHeight={32}
              rowHeight={32}
            />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AddDocumentLinkDialog;
