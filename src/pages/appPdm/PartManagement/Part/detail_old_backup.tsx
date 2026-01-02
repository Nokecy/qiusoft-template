/**
 * 物料详情页面 - 制造业PDM系统核心页面
 * 路由: /appPdm/PartManagement/Part/detail?id={partId}
 *
 * 核心功能:
 * - 固定顶部物料核心信息展示
 * - 横向Tab导航快速切换
 * - 8个专业信息区块完整展示
 * - 高信息密度布局优化
 *
 * 设计理念: 高信息密度、快速访问、Tab切换
 */

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
  Card,
  Button,
  Space,
  message,
  Spin,
  Tag,
  Descriptions,
  Table,
  Progress,
  Timeline,
  Image,
  Tooltip,
  Empty,
  Modal,
  Badge,
  Tabs,
  Collapse,
} from 'antd';
import { createForm } from '@formily/core';
import { FormProvider, Field } from '@formily/react';
import { FormLayout, FormItem, Input, FormGrid } from '@formily/antd-v5';
import {
  ArrowLeftOutlined,
  EditOutlined,
  CopyOutlined,
  PrinterOutlined,
  FileTextOutlined,
  FilePdfOutlined,
  FileImageOutlined,
  FileZipOutlined,
  FileExcelOutlined,
  DownloadOutlined,
  DeleteOutlined,
  EyeOutlined,
  InboxOutlined,
  BarChartOutlined,
  TeamOutlined,
  HistoryOutlined,
  SafetyCertificateOutlined,
  PartitionOutlined,
  CloudUploadOutlined,
  ExportOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useLocation, history, Access, useAccess } from 'umi';
import { parse } from 'querystring';
import type { ColumnsType } from 'antd/es/table';
import { PartPermissions } from '@/pages/appPdm/_permissions';
import { PartGetAsync } from '@/services/pdm/Part';
import DeleteConfirm from '@/components/deleteConfirm';
import './detail.less';

export const routeProps = {
  name: '物料详情',
};

// ==================== 类型定义 ====================

/** 物料详情数据 */
interface PartDetailData {
  id: string;
  partNumber: string;
  outCode?: string;
  description: string;
  specification?: string;
  unit: string;
  categoryName: string;
  categoryCode?: string;
  version: string;
  lifecycleStatus: number;
  isCritical: boolean;
  isActive: boolean;
  partType?: number;
  creationTime: string;
  creator: string;
  lastModificationTime?: string;
  lastModifier?: string;
  imageUrl?: string;
  // 技术参数 - 动态属性
  attributeValues?: Array<{
    attributeCode: string;
    attributeName: string;
    attributeValue: string;
    displayText?: string;
    unit?: string;
  }>;
}

/** 库存数据 */
interface InventoryData {
  warehouseCode: string;
  warehouseName: string;
  availableQty: number;
  inTransitQty: number;
  safetyStock: number;
  lockedQty?: number;
  unit: string;
}

/** BOM子项数据 */
interface BomItemData {
  id: string;
  level: number;
  itemNumber: string;
  partNumber: string;
  partName: string;
  specification: string;
  unit: string;
  quantity: number;
  scrapRate: number;
  hasSubstitute: boolean;
  substitutePartNumbers?: string[];
  children?: BomItemData[];
}

/** 关联文档数据 */
interface DocumentData {
  id: string;
  documentType: string;
  documentName: string;
  version: string;
  fileSize: string;
  uploadUser: string;
  uploadTime: string;
  fileExtension: string;
  fileUrl?: string;
  previewUrl?: string;
}

/** 供应商数据 */
interface SupplierData {
  id: string;
  supplierCode: string;
  supplierName: string;
  leadTime: number;
  price: number;
  isPrimary: boolean;
  contactPerson?: string;
  contactPhone?: string;
  lastPurchaseDate?: string;
}

/** 变更历史数据 */
interface ChangeHistoryData {
  id: string;
  version: string;
  changeType: string;
  ecnNumber: string;
  changeContent: string;
  changeUser: string;
  changeTime: string;
  changeReason?: string;
}

/** 质量追溯数据 */
interface QualityRecordData {
  id: string;
  batchNumber: string;
  inspectionType: string;
  inspectionResult: string;
  inspector: string;
  inspectionTime: string;
  defectRate?: number;
  reportUrl?: string;
}

// ==================== 组件实现 ====================

const PartDetailPage: React.FC = () => {
  const location = useLocation();
  const query = parse(location.search.substring(1));
  const partId = query.id as string;
  const access = useAccess();

  // 权限
  const canUpdate = !!(access && (access[PartPermissions.Update] ?? true));
  const canDelete = !!(access && (access[PartPermissions.Delete] ?? true));

  // 状态
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<PartDetailData | null>(null);
  const [activeSection, setActiveSection] = useState('basic');
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewFile, setPreviewFile] = useState<DocumentData | null>(null);

  // ==================== 模拟数据区域 ====================
  // TODO: 替换为实际API调用

  const inventoryData: InventoryData[] = useMemo(() => [
    {
      warehouseCode: 'WH-001',
      warehouseName: '原材料仓库A区',
      availableQty: 1200,
      inTransitQty: 300,
      safetyStock: 500,
      lockedQty: 100,
      unit: '件'
    },
    {
      warehouseCode: 'WH-002',
      warehouseName: '成品仓库B区',
      availableQty: 800,
      inTransitQty: 0,
      safetyStock: 200,
      lockedQty: 50,
      unit: '件'
    },
    {
      warehouseCode: 'WH-003',
      warehouseName: '在制品仓库C区',
      availableQty: 450,
      inTransitQty: 150,
      safetyStock: 300,
      lockedQty: 0,
      unit: '件'
    },
  ], []);

  const bomData: BomItemData[] = useMemo(() => [
    {
      id: '1',
      level: 1,
      itemNumber: '10',
      partNumber: 'P-001-A',
      partName: '高精度主轴组件',
      specification: 'Φ50×200mm',
      unit: '件',
      quantity: 1,
      scrapRate: 0,
      hasSubstitute: false,
      children: [
        {
          id: '1-1',
          level: 2,
          itemNumber: '10.10',
          partNumber: 'P-001-A-01',
          partName: '主轴本体',
          specification: 'Φ50×180mm 40Cr',
          unit: '件',
          quantity: 1,
          scrapRate: 0.02,
          hasSubstitute: true,
          substitutePartNumbers: ['P-001-A-01-ALT1', 'P-001-A-01-ALT2'],
        },
        {
          id: '1-2',
          level: 2,
          itemNumber: '10.20',
          partNumber: 'P-001-A-02',
          partName: '深沟球轴承',
          specification: '6210-2RS SKF',
          unit: '个',
          quantity: 2,
          scrapRate: 0.01,
          hasSubstitute: false,
        },
        {
          id: '1-3',
          level: 2,
          itemNumber: '10.30',
          partNumber: 'P-001-A-03',
          partName: '轴承压盖',
          specification: 'Φ72×10mm Q235',
          unit: '件',
          quantity: 2,
          scrapRate: 0.01,
          hasSubstitute: false,
        },
      ],
    },
    {
      id: '2',
      level: 1,
      itemNumber: '20',
      partNumber: 'P-001-B',
      partName: '铸铁外壳',
      specification: 'HT200 铸造件',
      unit: '件',
      quantity: 1,
      scrapRate: 0.05,
      hasSubstitute: false,
    },
    {
      id: '3',
      level: 1,
      itemNumber: '30',
      partNumber: 'P-001-C',
      partName: '联轴器',
      specification: 'LM1-80 弹性联轴器',
      unit: '套',
      quantity: 1,
      scrapRate: 0,
      hasSubstitute: false,
    },
  ], []);

  const documentData: DocumentData[] = useMemo(() => [
    {
      id: '1',
      documentType: '技术图纸',
      documentName: '主轴总成装配图-V2.0.pdf',
      version: 'V2.0',
      fileSize: '2.5MB',
      uploadUser: '张工程师',
      uploadTime: '2024-01-15 10:30:25',
      fileExtension: 'pdf',
      fileUrl: '#',
      previewUrl: '#'
    },
    {
      id: '2',
      documentType: '3D模型',
      documentName: '主轴零件三维模型.stp',
      version: 'V1.0',
      fileSize: '8.3MB',
      uploadUser: '李设计',
      uploadTime: '2024-01-10 14:20:15',
      fileExtension: 'stp'
    },
    {
      id: '3',
      documentType: '工艺文件',
      documentName: '机加工艺卡片.xlsx',
      version: 'V1.2',
      fileSize: '156KB',
      uploadUser: '王工艺',
      uploadTime: '2024-01-08 09:15:40',
      fileExtension: 'xlsx'
    },
    {
      id: '4',
      documentType: '检验规范',
      documentName: '首件检验指导书.docx',
      version: 'V1.0',
      fileSize: '890KB',
      uploadUser: '赵质检',
      uploadTime: '2024-01-05 16:45:30',
      fileExtension: 'docx'
    },
    {
      id: '5',
      documentType: '技术标准',
      documentName: '表面粗糙度要求说明.pdf',
      version: 'V1.0',
      fileSize: '1.2MB',
      uploadUser: '张工程师',
      uploadTime: '2024-01-03 11:20:00',
      fileExtension: 'pdf'
    },
  ], []);

  const supplierData: SupplierData[] = useMemo(() => [
    {
      id: '1',
      supplierCode: 'SUP-001',
      supplierName: '精密机械制造有限公司',
      leadTime: 7,
      price: 125.50,
      isPrimary: true,
      contactPerson: '刘经理',
      contactPhone: '138-0000-0001',
      lastPurchaseDate: '2024-01-10'
    },
    {
      id: '2',
      supplierCode: 'SUP-002',
      supplierName: '工业配件生产厂',
      leadTime: 10,
      price: 118.00,
      isPrimary: false,
      contactPerson: '陈主管',
      contactPhone: '138-0000-0002',
      lastPurchaseDate: '2023-12-15'
    },
    {
      id: '3',
      supplierCode: 'SUP-003',
      supplierName: '五金制造集团公司',
      leadTime: 14,
      price: 132.00,
      isPrimary: false,
      contactPerson: '王采购',
      contactPhone: '138-0000-0003',
      lastPurchaseDate: '2023-11-20'
    },
  ], []);

  const changeHistoryData: ChangeHistoryData[] = useMemo(() => [
    {
      id: '1',
      version: 'V2.0',
      changeType: '工程变更',
      ecnNumber: 'ECN-2024-001',
      changeContent: '优化轴承配合公差,由H7/k6改为H7/m6,提高装配精度和可靠性',
      changeUser: '张工程师',
      changeTime: '2024-01-15 14:30:00',
      changeReason: '客户反馈装配间隙偏大,影响使用精度'
    },
    {
      id: '2',
      version: 'V1.5',
      changeType: '材料变更',
      ecnNumber: 'ECN-2023-089',
      changeContent: '主轴材料由45#钢改为40Cr合金钢,热处理工艺调整',
      changeUser: '李设计',
      changeTime: '2023-12-20 10:15:00',
      changeReason: '提高强度和耐磨性,延长使用寿命'
    },
    {
      id: '3',
      version: 'V1.0',
      changeType: '新建',
      ecnNumber: 'ECN-2023-056',
      changeContent: '初始版本发布,完成设计审核和工艺评审',
      changeUser: '王工程师',
      changeTime: '2023-10-01 09:00:00',
      changeReason: '新产品开发项目启动'
    },
  ], []);

  const qualityData: QualityRecordData[] = useMemo(() => [
    {
      id: '1',
      batchNumber: 'LOT-2024-001',
      inspectionType: '首件检验',
      inspectionResult: '合格',
      inspector: '质检员A 赵明',
      inspectionTime: '2024-01-18 14:30:15',
      defectRate: 0,
      reportUrl: '#'
    },
    {
      id: '2',
      batchNumber: 'LOT-2024-002',
      inspectionType: '巡检',
      inspectionResult: '合格',
      inspector: '质检员B 钱丽',
      inspectionTime: '2024-01-17 10:15:30',
      defectRate: 0.5,
    },
    {
      id: '3',
      batchNumber: 'LOT-2023-089',
      inspectionType: '出货检验',
      inspectionResult: '不合格',
      inspector: '质检员A 赵明',
      inspectionTime: '2024-01-16 16:45:20',
      defectRate: 8.2,
      reportUrl: '#'
    },
    {
      id: '4',
      batchNumber: 'LOT-2023-088',
      inspectionType: '过程检验',
      inspectionResult: '合格',
      inspector: '质检员C 孙强',
      inspectionTime: '2024-01-15 13:20:10',
      defectRate: 1.2,
    },
  ], []);

  // ==================== 辅助函数 ====================

  /** 获取生命周期状态文本 */
  const getLifecycleText = useCallback((status: number) => {
    const statusMap: Record<number, string> = {
      0: '草稿',
      10: '审批中',
      20: '已发布',
      30: '已拒绝',
      40: '已作废',
      50: '已取消',
    };
    return statusMap[status] || '未知';
  }, []);

  /** 物料类型映射 */
  const getPartTypeText = useCallback((partType?: number) => {
    const typeMap: Record<number, string> = {
      0: '自制件',
      10: '外购件',
      20: '外协件',
      30: '虚拟件',
      40: '配套件',
    };
    return partType !== undefined ? typeMap[partType] || '-' : '-';
  }, []);

  // ==================== 基础信息表单 ====================

  /** 创建基础信息表单 */
  const basicInfoForm = useMemo(() => createForm({
    pattern: 'readPretty', // 设置为阅读态
  }), []);

  useEffect(() => {
    if (data) {
      basicInfoForm.setValues({
        partNumber: data.partNumber,
        description: data.description,
        outCode: data.outCode || undefined,
        categoryName: data.categoryName,
        specification: data.specification || undefined,
        unit: data.unit,
        partType: getPartTypeText(data.partType),
        lifecycleStatus: getLifecycleText(data.lifecycleStatus),
        isCritical: data.isCritical ? '是' : '否',
        isActive: data.isActive ? '启用' : '禁用',
        version: data.version,
        creator: data.creator,
        creationTime: data.creationTime,
        lastModifier: data.lastModifier || undefined,
        lastModificationTime: data.lastModificationTime || undefined,
      });
    }
  }, [data, basicInfoForm, getPartTypeText, getLifecycleText]);

  // ==================== 数据加载 ====================

  /** 加载物料详情 */
  const loadDetail = useCallback(async () => {
    if (!partId) {
      message.error('物料ID参数缺失');
      history.push('/appPdm/PartManagement/Part');
      return;
    }

    setLoading(true);
    try {
      // 调用实际API
      const result = await PartGetAsync({ id: partId });

      // 数据映射处理
      const partData: PartDetailData = {
        id: result.id || partId,
        partNumber: result.partNumber || '',
        outCode: result.outCode,
        description: result.description || '',
        specification: result.specification,
        unit: result.unit || '',
        categoryName: result.categoryName || '',
        categoryCode: result.categoryCode,
        version: result.versionInfo?.version || 'V1.0',
        lifecycleStatus: result.lifecycleStatus ?? 0,
        isCritical: result.isCritical ?? false,
        isActive: result.isActive ?? true,
        partType: result.partType,
        creationTime: result.creationTime || '',
        creator: result.creator || '',
        lastModificationTime: result.lastModificationTime,
        lastModifier: result.lastModifier,
        imageUrl: result.imageUrl,
        attributeValues: result.attributeValues,
      };

      setData(partData);

      // TODO: 并行加载关联数据
      // await Promise.all([
      //   loadInventory(partId),
      //   loadBom(partId),
      //   loadDocuments(partId),
      //   loadSuppliers(partId),
      //   loadChangeHistory(partId),
      //   loadQualityRecords(partId),
      // ]);

    } catch (error) {
      console.error('加载物料详情失败:', error);
      message.error('加载物料详情失败,请稍后重试');
    } finally {
      setLoading(false);
    }
  }, [partId]);

  useEffect(() => {
    loadDetail();
  }, [loadDetail]);

  // ==================== 工具函数 ====================

  /** 生命周期状态映射 */
  const getLifecycleTag = useCallback((status: number) => {
    const statusMap: Record<number, { label: string; color: string }> = {
      0: { label: '草稿', color: 'default' },
      10: { label: '审批中', color: 'processing' },
      20: { label: '已发布', color: 'success' },
      30: { label: '已拒绝', color: 'error' },
      40: { label: '已作废', color: 'default' },
      50: { label: '已取消', color: 'warning' },
    };
    const item = statusMap[status] || { label: '未知', color: 'default' };
    return <Tag color={item.color}>{item.label}</Tag>;
  }, []);

  /** 文档图标 */
  const getDocumentIcon = useCallback((extension: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      pdf: <FilePdfOutlined style={{ color: '#ff4d4f', fontSize: 20 }} />,
      doc: <FileTextOutlined style={{ color: '#1890ff', fontSize: 20 }} />,
      docx: <FileTextOutlined style={{ color: '#1890ff', fontSize: 20 }} />,
      xls: <FileExcelOutlined style={{ color: '#52c41a', fontSize: 20 }} />,
      xlsx: <FileExcelOutlined style={{ color: '#52c41a', fontSize: 20 }} />,
      jpg: <FileImageOutlined style={{ color: '#faad14', fontSize: 20 }} />,
      jpeg: <FileImageOutlined style={{ color: '#faad14', fontSize: 20 }} />,
      png: <FileImageOutlined style={{ color: '#faad14', fontSize: 20 }} />,
      gif: <FileImageOutlined style={{ color: '#faad14', fontSize: 20 }} />,
      zip: <FileZipOutlined style={{ color: '#722ed1', fontSize: 20 }} />,
      rar: <FileZipOutlined style={{ color: '#722ed1', fontSize: 20 }} />,
      stp: <FileTextOutlined style={{ color: '#13c2c2', fontSize: 20 }} />,
      step: <FileTextOutlined style={{ color: '#13c2c2', fontSize: 20 }} />,
      dwg: <FileTextOutlined style={{ color: '#13c2c2', fontSize: 20 }} />,
    };
    return iconMap[extension.toLowerCase()] || <FileTextOutlined style={{ fontSize: 20 }} />;
  }, []);

  /** 库存水位计算 - P1: 完善健康度逻辑 */
  const getStockLevel = useCallback((available: number, safety: number) => {
    if (safety === 0) return { percent: 100, status: 'success' as const };
    const ratio = (available / safety) * 100;
    // P1: 完善健康度逻辑
    if (ratio >= 80) return { percent: Math.min(ratio, 100), status: 'success' as const }; // 绿色
    if (ratio >= 50) return { percent: ratio, status: 'normal' as const }; // 蓝色
    if (ratio >= 30) return { percent: ratio, status: 'exception' as const }; // 黄色
    return { percent: ratio, status: 'exception' as const }; // 红色
  }, []);

  // ==================== 表格列定义 ====================

  /** 库存信息表格列 */
  const inventoryColumns: ColumnsType<InventoryData> = useMemo(() => [
    {
      title: '仓库编码',
      dataIndex: 'warehouseCode',
      width: 120,
      fixed: 'left',
    },
    {
      title: '仓库名称',
      dataIndex: 'warehouseName',
      width: 160,
      ellipsis: { showTitle: true },
    },
    {
      title: '可用量',
      dataIndex: 'availableQty',
      width: 100,
      align: 'right',
      render: (val, record) => (
        <span style={{ fontWeight: 500 }}>{val} {record.unit}</span>
      ),
    },
    {
      title: '在途量',
      dataIndex: 'inTransitQty',
      width: 100,
      align: 'right',
      render: (val, record) => `${val} ${record.unit}`,
    },
    {
      title: '锁定量',
      dataIndex: 'lockedQty',
      width: 100,
      align: 'right',
      render: (val, record) => `${val || 0} ${record.unit}`,
    },
    {
      title: '安全库存',
      dataIndex: 'safetyStock',
      width: 100,
      align: 'right',
      render: (val, record) => `${val} ${record.unit}`,
    },
    {
      title: '库存水位',
      dataIndex: 'availableQty',
      width: 180,
      render: (_, record) => {
        const level = getStockLevel(record.availableQty, record.safetyStock);
        return (
          <Progress
            percent={level.percent}
            status={level.status}
            size="small"
            format={(percent) => `${percent?.toFixed(0)}%`}
          />
        );
      },
    },
  ], [getStockLevel]);

  /** BOM结构表格列 */
  const bomColumns: ColumnsType<BomItemData> = useMemo(() => [
    {
      title: '行号',
      dataIndex: 'itemNumber',
      width: 80,
      fixed: 'left',
    },
    {
      title: '物料编码',
      dataIndex: 'partNumber',
      width: 160,
      fixed: 'left',
      render: (text, record) => (
        <Space size="small">
          <a
            onClick={() => {
              if (record.id === partId) {
                message.info('当前物料');
                return;
              }
              history.push(`/appPdm/PartManagement/Part/detail?id=${record.id}`);
            }}
            style={{ fontWeight: 500 }}
          >
            {text}
          </a>
          {record.hasSubstitute && (
            <Tooltip title={`替代料: ${record.substitutePartNumbers?.join(', ') || '无'}`}>
              <Tag color="orange" style={{ fontSize: 11, padding: '0 4px', margin: 0 }}>替</Tag>
            </Tooltip>
          )}
        </Space>
      ),
    },
    {
      title: '物料名称',
      dataIndex: 'partName',
      width: 180,
      ellipsis: { showTitle: true },
    },
    {
      title: '规格型号',
      dataIndex: 'specification',
      width: 180,
      ellipsis: { showTitle: true },
    },
    {
      title: '单位',
      dataIndex: 'unit',
      width: 60,
      align: 'center',
    },
    {
      title: '用量',
      dataIndex: 'quantity',
      width: 80,
      align: 'right',
      render: (val) => <span style={{ fontWeight: 500 }}>{val}</span>,
    },
    {
      title: '损耗率',
      dataIndex: 'scrapRate',
      width: 90,
      align: 'right',
      render: (val) => {
        const percent = (val * 100).toFixed(1);
        const color = val > 0.05 ? '#ff4d4f' : val > 0.02 ? '#faad14' : '#52c41a';
        return <span style={{ color }}>{percent}%</span>;
      },
    },
  ], [partId]);

  /** 关联文档表格列 */
  const documentColumns: ColumnsType<DocumentData> = useMemo(() => [
    {
      title: '文档类型',
      dataIndex: 'documentType',
      width: 120,
      render: (text, record) => (
        <Space size="small">
          {getDocumentIcon(record.fileExtension)}
          <span style={{ fontSize: 12 }}>{text}</span>
        </Space>
      ),
    },
    {
      title: '文档名称',
      dataIndex: 'documentName',
      width: 280,
      ellipsis: { showTitle: true },
      render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>,
    },
    {
      title: '版本',
      dataIndex: 'version',
      width: 80,
      render: (text) => <Tag>{text}</Tag>,
    },
    {
      title: '文件大小',
      dataIndex: 'fileSize',
      width: 100,
    },
    {
      title: '上传人',
      dataIndex: 'uploadUser',
      width: 120,
    },
    {
      title: '上传时间',
      dataIndex: 'uploadTime',
      width: 160,
    },
    {
      title: '操作',
      key: 'action',
      width: 140,
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="预览">
            <Button
              type="link"
              size="small"
              icon={<EyeOutlined />}
              onClick={() => {
                setPreviewFile(record);
                setPreviewVisible(true);
              }}
            />
          </Tooltip>
          <Tooltip title="下载">
            <Button
              type="link"
              size="small"
              icon={<DownloadOutlined />}
              onClick={() => message.success(`下载: ${record.documentName}`)}
            />
          </Tooltip>
          <Access accessible={canDelete}>
            <DeleteConfirm
              title="确定删除该文档?"
              onConfirm={() => message.success('删除成功')}
            >
              <Tooltip title="删除">
                <Button type="link" size="small" danger icon={<DeleteOutlined />} />
              </Tooltip>
            </DeleteConfirm>
          </Access>
        </Space>
      ),
    },
  ], [canDelete, getDocumentIcon]);

  /** 供应商信息表格列 */
  const supplierColumns: ColumnsType<SupplierData> = useMemo(() => [
    {
      title: '供应商编码',
      dataIndex: 'supplierCode',
      width: 130,
      fixed: 'left',
    },
    {
      title: '供应商名称',
      dataIndex: 'supplierName',
      width: 200,
      ellipsis: { showTitle: true },
      render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>,
    },
    {
      title: '供货周期',
      dataIndex: 'leadTime',
      width: 100,
      align: 'center',
      render: (val) => `${val} 天`,
    },
    {
      title: '采购价格',
      dataIndex: 'price',
      width: 120,
      align: 'right',
      render: (val) => <span style={{ color: '#1890ff', fontWeight: 500 }}>¥{val.toFixed(2)}</span>,
    },
    {
      title: '主供应商',
      dataIndex: 'isPrimary',
      width: 100,
      align: 'center',
      render: (val) => (
        val ? <Badge status="success" text="主供应商" /> : <Tag>备用</Tag>
      ),
    },
    {
      title: '联系人',
      dataIndex: 'contactPerson',
      width: 100,
    },
    {
      title: '联系电话',
      dataIndex: 'contactPhone',
      width: 130,
    },
    {
      title: '最近采购日期',
      dataIndex: 'lastPurchaseDate',
      width: 120,
    },
  ], []);

  /** 质量追溯表格列 */
  const qualityColumns: ColumnsType<QualityRecordData> = useMemo(() => [
    {
      title: '检验批次',
      dataIndex: 'batchNumber',
      width: 140,
      fixed: 'left',
      render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>,
    },
    {
      title: '检验类型',
      dataIndex: 'inspectionType',
      width: 120,
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: '检验结果',
      dataIndex: 'inspectionResult',
      width: 100,
      align: 'center',
      render: (val) => (
        <Badge
          status={val === '合格' ? 'success' : 'error'}
          text={val}
        />
      ),
    },
    {
      title: '不良率',
      dataIndex: 'defectRate',
      width: 100,
      align: 'right',
      render: (val) => {
        if (val === undefined || val === null) return '-';
        const color = val === 0 ? '#52c41a' : val < 3 ? '#faad14' : '#ff4d4f';
        return <span style={{ color, fontWeight: 500 }}>{val.toFixed(1)}%</span>;
      },
    },
    {
      title: '检验人',
      dataIndex: 'inspector',
      width: 140,
    },
    {
      title: '检验时间',
      dataIndex: 'inspectionTime',
      width: 160,
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      fixed: 'right',
      render: (_, record) => (
        record.reportUrl ? (
          <Button
            type="link"
            size="small"
            icon={<FileTextOutlined />}
            onClick={() => message.info('查看检验报告')}
          >
            报告
          </Button>
        ) : null
      ),
    },
  ], []);

  // ==================== 事件处理 ====================

  /** 返回列表 */
  const handleBack = useCallback(() => {
    history.push('/appPdm/PartManagement/Part');
  }, []);

  /** 编辑物料 */
  const handleEdit = useCallback(() => {
    message.info('编辑功能待实现 - 将打开编辑表单');
    // TODO: 打开编辑表单
  }, []);

  /** 复制物料 */
  const handleCopy = useCallback(() => {
    message.info('复制功能待实现 - 将创建副本');
    // TODO: 复制物料逻辑
  }, []);

  /** 打印页面 */
  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  /** 导出BOM */
  const handleExportBom = useCallback(() => {
    message.success('导出BOM Excel功能待实现');
    // TODO: 导出BOM Excel
  }, []);

  /** 上传文档 */
  const handleUploadDocument = useCallback(() => {
    message.info('上传文档功能待实现');
    // TODO: 打开文档上传对话框
  }, []);

  /** 批量下载文档 */
  const handleBatchDownload = useCallback(() => {
    message.success('批量下载功能待实现');
    // TODO: 批量下载选中文档
  }, []);

  // ==================== 渲染 ====================

  if (!data && loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Spin size="large" tip="加载中..." />
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Empty description="未找到物料数据" />
      </div>
    );
  }

  return (
    <div className="part-detail-container">
      {/* ==================== 固定顶部 - 物料核心信息 ==================== */}
      <div className="part-detail-header">
        <div className="part-detail-header-content">
          {/* 物料图片 */}
          <div className="part-detail-image">
            <Image
              src={data.imageUrl}
              width={80}
              height={80}
              style={{ borderRadius: 4, border: '1px solid #e8e8e8', objectFit: 'cover' }}
              fallback="data:image/png;base64,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"
              preview={{
                mask: '查看大图'
              }}
            />
          </div>

          {/* 核心信息 */}
          <div className="part-detail-info">
            <div className="part-detail-title">
              <h2>{data.partNumber}</h2>
              <Space size="small">
                {getLifecycleTag(data.lifecycleStatus)}
                {data.isCritical && <Tag color="red">关键物料</Tag>}
                {!data.isActive && <Tag color="default">已禁用</Tag>}
              </Space>
            </div>
            <div className="part-detail-meta">
              <Space split="|" size="small">
                <span><strong>名称:</strong> {data.description}</span>
                {data.specification && <span><strong>规格:</strong> {data.specification}</span>}
                <span><strong>类别:</strong> {data.categoryName}</span>
                <span><strong>单位:</strong> {data.unit}</span>
                <span><strong>版本:</strong> {data.version}</span>
                <span><strong>类型:</strong> {getPartTypeText(data.partType)}</span>
              </Space>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== 主内容区 - Tab布局 ==================== */}
      <div className="part-detail-body">
        <Spin spinning={loading}>
          <Tabs
            activeKey={activeSection}
            onChange={setActiveSection}
            type="card"
            size="large"
            className="part-detail-tabs"
            tabBarExtraContent={{
              right: (
                <Space>
                  <Button onClick={handleBack} icon={<ArrowLeftOutlined />}>
                    返回
                  </Button>
                  <Access accessible={canUpdate}>
                    <Button type="primary" icon={<EditOutlined />} onClick={handleEdit}>
                      编辑
                    </Button>
                  </Access>
                  <Button icon={<CopyOutlined />} onClick={handleCopy}>
                    复制
                  </Button>
                  <Button icon={<PrinterOutlined />} onClick={handlePrint}>
                    打印
                  </Button>
                </Space>
              )
            }}
            items={[
              // ==================== 1. 基础信息 ====================
              {
                key: 'basic',
                label: (
                  <Space size="small">
                    <FileTextOutlined />
                    <span>基础信息</span>
                  </Space>
                ),
                children: (
                  <Card
                    size="small"
                    title="基础信息"
                    bordered={false}
                    className="part-detail-card part-detail-basic-info"
                  >
                    <FormProvider form={basicInfoForm}>
                      <FormLayout labelCol={6} wrapperCol={18}>
                        <Collapse
                          defaultActiveKey={['basic', 'status', 'create']}
                          ghost
                          bordered={false}
                        >
                          {/* 基本属性 */}
                          <Collapse.Panel
                            key="basic"
                            header="基本属性"
                          >
                            <FormGrid columns={2} strictAutoFit>
                              <Field
                                name="partNumber"
                                title="物料编码"
                                component={[Input]}
                                decorator={[FormItem]}
                              />
                              <Field
                                name="description"
                                title="物料名称"
                                component={[Input]}
                                decorator={[FormItem]}
                              />
                              <Field
                                name="outCode"
                                title="外部编码"
                                component={[Input, { placeholder: '未设置' }]}
                                decorator={[FormItem]}
                              />
                              <Field
                                name="categoryName"
                                title="物料类别"
                                component={[Input]}
                                decorator={[FormItem]}
                              />
                              <Field
                                name="specification"
                                title="规格型号"
                                component={[Input, { placeholder: '未设置' }]}
                                decorator={[FormItem]}
                              />
                              <Field
                                name="unit"
                                title="计量单位"
                                component={[Input]}
                                decorator={[FormItem]}
                              />
                              <Field
                                name="partType"
                                title="物料类型"
                                component={[Input]}
                                decorator={[FormItem]}
                              />
                            </FormGrid>
                          </Collapse.Panel>

                          {/* 状态信息 */}
                          <Collapse.Panel
                            key="status"
                            header="状态信息"
                          >
                            <FormGrid columns={2} strictAutoFit>
                              <Field
                                name="lifecycleStatus"
                                title="生命周期"
                                component={[Input]}
                                decorator={[FormItem]}
                              />
                              <Field
                                name="isCritical"
                                title="关键物料"
                                component={[Input]}
                                decorator={[FormItem]}
                              />
                              <Field
                                name="isActive"
                                title="启用状态"
                                component={[Input]}
                                decorator={[FormItem]}
                              />
                              <Field
                                name="version"
                                title="当前版本"
                                component={[Input]}
                                decorator={[FormItem]}
                              />
                            </FormGrid>
                          </Collapse.Panel>

                          {/* 创建修改信息 */}
                          <Collapse.Panel
                            key="create"
                            header="创建修改信息"
                          >
                            <FormGrid columns={2} strictAutoFit>
                              <Field
                                name="creator"
                                title="创建人"
                                component={[Input]}
                                decorator={[FormItem]}
                              />
                              <Field
                                name="creationTime"
                                title="创建时间"
                                component={[Input]}
                                decorator={[FormItem]}
                              />
                              <Field
                                name="lastModifier"
                                title="最后修改人"
                                component={[Input, { placeholder: '未设置' }]}
                                decorator={[FormItem]}
                              />
                              <Field
                                name="lastModificationTime"
                                title="最后修改时间"
                                component={[Input, { placeholder: '未设置' }]}
                                decorator={[FormItem]}
                              />
                            </FormGrid>
                          </Collapse.Panel>
                        </Collapse>
                      </FormLayout>
                    </FormProvider>
                  </Card>
                ),
              },
              // ==================== 2. 技术参数 ====================
              {
                key: 'technical',
                label: (
                  <Space size="small">
                    <BarChartOutlined />
                    <span>技术参数</span>
                    {data.attributeValues && data.attributeValues.length > 0 && (
                      <Badge count={data.attributeValues.length} showZero color="processing" />
                    )}
                  </Space>
                ),
                children: (
                  <Card
                    size="small"
                    title="技术参数"
                    bordered={false}
                    className="part-detail-card"
                  >
                    {data.attributeValues && data.attributeValues.length > 0 ? (
                      <Descriptions
                        column={3}
                        size="small"
                        bordered
                        labelStyle={{
                          width: 120,
                          fontSize: 12,
                          backgroundColor: '#fafafa',
                          fontWeight: 500,
                          padding: '8px 12px'
                        }}
                        contentStyle={{
                          fontSize: 12,
                          padding: '8px 12px'
                        }}
                      >
                        {data.attributeValues.map((attr) => (
                          <Descriptions.Item key={attr.attributeCode} label={attr.attributeName}>
                            {attr.displayText || attr.attributeValue}
                            {attr.unit && <span style={{ marginLeft: 4, color: '#8c8c8c' }}>{attr.unit}</span>}
                          </Descriptions.Item>
                        ))}
                      </Descriptions>
                    ) : (
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="暂无技术参数"
                        style={{ padding: '40px 0' }}
                      />
                    )}
                  </Card>
                ),
              },
              // ==================== 3. 库存信息 ====================
              {
                key: 'inventory',
                label: (
                  <Space size="small">
                    <InboxOutlined />
                    <span>库存信息</span>
                    {inventoryData.length > 0 && (
                      <Badge count={inventoryData.length} showZero color="processing" />
                    )}
                  </Space>
                ),
                children: (
                  <Card
                    size="small"
                    title="库存信息"
                    bordered={false}
                    className="part-detail-card"
                  >
                    {inventoryData.length > 0 ? (
                      <Table
                        dataSource={inventoryData}
                        columns={inventoryColumns}
                        pagination={false}
                        size="small"
                        rowKey="warehouseCode"
                        scroll={{ x: 900 }}
                      />
                    ) : (
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="暂无库存数据"
                        style={{ padding: '40px 0' }}
                      />
                    )}
                  </Card>
                ),
              },
              // ==================== 4. BOM结构 ====================
              {
                key: 'bom',
                label: (
                  <Space size="small">
                    <PartitionOutlined />
                    <span>BOM结构</span>
                    {bomData.length > 0 && (
                      <Badge count={bomData.length} showZero color="processing" />
                    )}
                  </Space>
                ),
                children: (
                  <Card
                    size="small"
                    title="BOM结构"
                    bordered={false}
                    className="part-detail-card"
                    extra={
                      <Space size="small">
                        <Button
                          size="small"
                          type="link"
                          icon={<ExportOutlined />}
                          onClick={handleExportBom}
                        >
                          导出Excel
                        </Button>
                      </Space>
                    }
                  >
                    {bomData.length > 0 ? (
                      <Table
                        dataSource={bomData}
                        columns={bomColumns}
                        pagination={false}
                        size="small"
                        rowKey="id"
                        expandable={{
                          defaultExpandAllRows: true,
                          indentSize: 20,
                        }}
                        scroll={{ x: 1000 }}
                      />
                    ) : (
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="暂无BOM数据"
                        style={{ padding: '40px 0' }}
                      />
                    )}
                  </Card>
                ),
              },
              // ==================== 5. 关联文档 ====================
              {
                key: 'documents',
                label: (
                  <Space size="small">
                    <FileTextOutlined />
                    <span>关联文档</span>
                    {documentData.length > 0 && (
                      <Badge count={documentData.length} showZero color="processing" />
                    )}
                  </Space>
                ),
                children: (
                  <Card
                    size="small"
                    title="关联文档"
                    bordered={false}
                    className="part-detail-card"
                    extra={
                      <Space size="small">
                        <Button
                          size="small"
                          type="link"
                          onClick={handleBatchDownload}
                        >
                          批量下载
                        </Button>
                        <Access accessible={canUpdate}>
                          <Button
                            size="small"
                            type="primary"
                            icon={<CloudUploadOutlined />}
                            onClick={handleUploadDocument}
                          >
                            上传文档
                          </Button>
                        </Access>
                      </Space>
                    }
                  >
                    {documentData.length > 0 ? (
                      <Table
                        dataSource={documentData}
                        columns={documentColumns}
                        pagination={{
                          pageSize: 10,
                          showSizeChanger: true,
                          showQuickJumper: true,
                          showTotal: (total) => `共 ${total} 条`,
                          size: 'small'
                        }}
                        size="small"
                        rowKey="id"
                        scroll={{ x: 1200 }}
                      />
                    ) : (
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="暂无关联文档"
                        style={{ padding: '40px 0' }}
                      />
                    )}
                  </Card>
                ),
              },
              // ==================== 6. 供应商信息 ====================
              {
                key: 'suppliers',
                label: (
                  <Space size="small">
                    <TeamOutlined />
                    <span>供应商</span>
                    {supplierData.length > 0 && (
                      <Badge count={supplierData.length} showZero color="processing" />
                    )}
                  </Space>
                ),
                children: (
                  <Card
                    size="small"
                    title="供应商信息"
                    bordered={false}
                    className="part-detail-card"
                  >
                    {supplierData.length > 0 ? (
                      <Table
                        dataSource={supplierData}
                        columns={supplierColumns}
                        pagination={false}
                        size="small"
                        rowKey="id"
                        scroll={{ x: 1100 }}
                      />
                    ) : (
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="暂无供应商数据"
                        style={{ padding: '40px 0' }}
                      />
                    )}
                  </Card>
                ),
              },
              // ==================== 7. 变更历史 ====================
              {
                key: 'changes',
                label: (
                  <Space size="small">
                    <HistoryOutlined />
                    <span>变更历史</span>
                    {changeHistoryData.length > 0 && (
                      <Badge count={changeHistoryData.length} showZero color="processing" />
                    )}
                  </Space>
                ),
                children: (
                  <Card
                    size="small"
                    title="变更历史"
                    bordered={false}
                    className="part-detail-card part-detail-timeline"
                  >
                    {changeHistoryData.length > 0 ? (
                      <Timeline
                        items={changeHistoryData.map((item) => ({
                          color: 'blue',
                          children: (
                            <div>
                              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 6 }}>
                                <Tag color="blue">{item.version}</Tag>
                                <Tag color="cyan">{item.changeType}</Tag>
                                <span style={{ marginLeft: 8, color: '#1890ff' }}>{item.ecnNumber}</span>
                              </div>
                              <div style={{ fontSize: 12, color: '#262626', marginBottom: 4, fontWeight: 500 }}>
                                {item.changeContent}
                              </div>
                              {item.changeReason && (
                                <div style={{ fontSize: 12, color: '#8c8c8c', marginBottom: 4 }}>
                                  变更原因: {item.changeReason}
                                </div>
                              )}
                              <div style={{ fontSize: 12, color: '#8c8c8c' }}>
                                {item.changeUser} · {item.changeTime}
                              </div>
                            </div>
                          ),
                        }))}
                      />
                    ) : (
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="暂无变更历史"
                        style={{ padding: '40px 0' }}
                      />
                    )}
                  </Card>
                ),
              },
              // ==================== 8. 质量追溯 ====================
              {
                key: 'quality',
                label: (
                  <Space size="small">
                    <SafetyCertificateOutlined />
                    <span>质量追溯</span>
                    {qualityData.length > 0 && (
                      <Badge count={qualityData.length} showZero color="processing" />
                    )}
                  </Space>
                ),
                children: (
                  <Card
                    size="small"
                    title="质量追溯"
                    bordered={false}
                    className="part-detail-card"
                  >
                    {qualityData.length > 0 ? (
                      <Table
                        dataSource={qualityData}
                        columns={qualityColumns}
                        pagination={{
                          pageSize: 10,
                          showSizeChanger: true,
                          showQuickJumper: true,
                          showTotal: (total) => `共 ${total} 条`,
                          size: 'small'
                        }}
                        size="small"
                        rowKey="id"
                        scroll={{ x: 1000 }}
                      />
                    ) : (
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="暂无质量追溯数据"
                        style={{ padding: '40px 0' }}
                      />
                    )}
                  </Card>
                ),
              },
            ]}
          />
        </Spin>
      </div>

      {/* ==================== 文档预览Modal ==================== */}
      <Modal
        title={`文档预览 - ${previewFile?.documentName || ''}`}
        open={previewVisible}
        onCancel={() => {
          setPreviewVisible(false);
          setPreviewFile(null);
        }}
        footer={[
          <Button key="download" icon={<DownloadOutlined />} onClick={() => message.success('下载功能待实现')}>
            下载
          </Button>,
          <Button key="close" onClick={() => setPreviewVisible(false)}>
            关闭
          </Button>,
        ]}
        width={1000}
        style={{ top: 20 }}
        bodyStyle={{ padding: 16, maxHeight: 'calc(100vh - 200px)', overflow: 'auto' }}
      >
        {previewFile && (
          <div style={{ textAlign: 'center' }}>
            {/* TODO: 根据文件类型实现不同的预览方式 */}
            {(['jpg', 'jpeg', 'png', 'gif'].includes(previewFile.fileExtension.toLowerCase())) ? (
              <Image src={previewFile.previewUrl || previewFile.fileUrl} alt={previewFile.documentName} />
            ) : (
              <Empty description={`暂不支持 .${previewFile.fileExtension} 格式的在线预览,请下载后查看`} />
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PartDetailPage;
