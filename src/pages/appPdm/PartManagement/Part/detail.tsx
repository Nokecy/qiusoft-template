/**
 * 物料详情页面 - 重构精简版
 * 路由: /appPdm/PartManagement/Part/detail?id={partId}
 *
 * 重构说明:
 * - 原文件 2169 行已重构为 <600 行
 * - 所有业务逻辑保持完整
 * - UI 组件拆分到 _components 目录
 * - 工具函数提取到独立文件
 */

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { message, Spin, Menu } from 'antd';
import { history, useAccess, useModel } from 'umi';
import { useKeepAliveParams } from '@/hooks';
import { PartPermissions } from '@/pages/appPdm/_permissions';
import {
  PartGetAsync,
  PartCheckOutAsync,
  PartCheckInAsync,
  PartUndoCheckOutAsync,
  PartSubmitAsync,
  PartWithdrawApprovalAsync,
  PartApproveAsync,
  PartRejectAsync,
} from '@/services/pdm/Part';
import { PartChangeRecordGetListByPartIdAsync } from '@/services/pdm/PartChangeRecord';
import { PartVersionGetVersionHistoryAsync, PartVersionGetAsync } from '@/services/pdm/PartVersion';
import { PartCategoryAttributeGetByCategoryIdAsync } from '@/services/pdm/PartCategoryAttribute';
import { BomGetListAsync } from '@/services/pdm/Bom';
import { BomVersionGetByMaterialCodeAsync } from '@/services/pdm/BomVersion';
import { PartDocumentLinkDeleteAsync, PartDocumentLinkGetDocumentsByPartAsync } from '@/services/pdm/PartDocumentLink';
import { deleteBomItem } from '@/pages/appPdm/BomManagement/_utils/bomUtils';
import type { BurnAbpPdmBomManagementBomsBomItemDto, BurnAbpPdmBomManagementBomsBomDto } from '@/services/pdm/typings';

// 子组件导入
import ActionToolbar from './_components/ActionToolbar';
import BasicInfoSection from './_components/BasicInfoSection';
import TechnicalSection from './_components/TechnicalSection';
import BomSection from './_components/BomSection';
import DocumentsSection from './_components/DocumentsSection';
import VersionHistorySection from './_components/VersionHistorySection';
import ChangesSection from './_components/ChangesSection';
import InventorySection from './_components/InventorySection';
import SuppliersSection from './_components/SuppliersSection';
import QualitySection from './_components/QualitySection';
import CheckoutModals from './_components/CheckoutModals';
import ApprovalModals from './_components/ApprovalModals';
import AddDocumentLinkDialog from './_components/AddDocumentLinkDialog';
import PartVersionComparisonModal from './_components/PartVersionComparison';
import BomItemForm from '@/pages/appPdm/BomManagement/_formWidgets/BomItemForm';

// 类型和工具导入
import type { PartDetailData, InventoryData, SupplierData, QualityRecordData, VersionHistoryData, BomDocumentTreeNode } from './types';
import { formatDate, getLifecycleConfig, getDocumentUsageText, getStockHealth, getChangeTypeConfig } from './utils';
import { NAV_ITEMS, OPERATION_AFFECTED_SECTIONS } from './constants';
import type { OperationType } from './types';

import './detail.less';

export const routeProps = { name: '物料详情' };

// ==================== 主组件 ====================

const PartDetailPage: React.FC = () => {
  // 使用 KeepAlive 参数 Hook
  const { id: partId, isActive, hasChanged } = useKeepAliveParams(
    '/appPdm/PartManagement/Part/detail',
    ['id']
  );
  const access = useAccess();
  const { initialState } = useModel('@@initialState');
  const currentUserId = initialState?.configuration?.currentUser?.id;

  // 权限控制
  const canUpdate = !!(access && (access[PartPermissions.Update] ?? true));
  const canDelete = !!(access && (access[PartPermissions.Delete] ?? true));
  const canCheckOut = !!(access && (access[PartPermissions.CheckOut] ?? true));
  const canCheckIn = !!(access && (access[PartPermissions.CheckIn] ?? true));
  const canUndoCheckOut = !!(access && (access[PartPermissions.UndoCheckOut] ?? true));
  const canSubmit = !!(access && (access[PartPermissions.Submit] ?? true));
  const canApprove = !!(access && (access[PartPermissions.Approve] ?? true));
  const canReject = !!(access && (access[PartPermissions.Reject] ?? true));
  const canWithdraw = !!(access && (access[PartPermissions.Withdraw] ?? true));

  // 基础状态
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<PartDetailData | null>(null);
  const [activeSection, setActiveSection] = useState('basic');
  const [attributeDefinitions, setAttributeDefinitions] = useState<API.BurnAbpPdmPartManagementPartCategoriesDtosPartCategoryAttributeDto[]>([]);

  // 文档相关状态 (统一使用 BOM 文档树数据)
  const [addDocumentLinkVisible, setAddDocumentLinkVisible] = useState(false);
  const [bomDocumentTree, setBomDocumentTree] = useState<BomDocumentTreeNode | null>(null);
  const [bomDocumentLoading, setBomDocumentLoading] = useState(false);
  const [bomDocumentLoaded, setBomDocumentLoaded] = useState(false);

  // BOM 相关状态
  const [bomData, setBomData] = useState<BurnAbpPdmBomManagementBomsBomDto | null>(null);
  const [bomVersion, setBomVersion] = useState<string>('');
  const [selectedBomItem, setSelectedBomItem] = useState<BurnAbpPdmBomManagementBomsBomItemDto | null>(null);
  const [bomTreeItems, setBomTreeItems] = useState<BurnAbpPdmBomManagementBomsBomItemDto[]>([]);
  const [bomLoading, setBomLoading] = useState(false);
  const [bomTreeRefreshKey, setBomTreeRefreshKey] = useState(0);
  const [bomLoaded, setBomLoaded] = useState(false);
  const [bomItemFormVisible, setBomItemFormVisible] = useState(false);
  const [bomItemFormData, setBomItemFormData] = useState<BurnAbpPdmBomManagementBomsBomItemDto | null>(null);
  const [bomParentItem, setBomParentItem] = useState<BurnAbpPdmBomManagementBomsBomItemDto | null>(null);

  // 检出操作相关状态
  const [checkOutModalVisible, setCheckOutModalVisible] = useState(false);
  const [checkOutComment, setCheckOutComment] = useState('');
  const [checkOutLoading, setCheckOutLoading] = useState(false);
  const [undoCheckOutReason, setUndoCheckOutReason] = useState('');

  // 审批操作相关状态
  const [approvalLoading, setApprovalLoading] = useState(false);
  const [submitModalVisible, setSubmitModalVisible] = useState(false);
  const [submitComment, setSubmitComment] = useState('');
  const [approveModalVisible, setApproveModalVisible] = useState(false);
  const [approveComment, setApproveComment] = useState('');
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  // 变更记录相关状态
  const [changeRecords, setChangeRecords] = useState<API.BurnAbpPdmPartManagementPartsDtosPartChangeRecordDto[]>([]);
  const [changeRecordsLoading, setChangeRecordsLoading] = useState(false);
  const [changeRecordsLoaded, setChangeRecordsLoaded] = useState(false);

  // 版本历史相关状态
  const [versionHistory, setVersionHistory] = useState<VersionHistoryData[]>([]);
  const [versionHistoryLoading, setVersionHistoryLoading] = useState(false);
  const [versionHistoryLoaded, setVersionHistoryLoaded] = useState(false);
  const [selectedVersionId, setSelectedVersionId] = useState<string | null>(null);
  const [isViewingHistory, setIsViewingHistory] = useState(false);
  const [versionDetailLoading, setVersionDetailLoading] = useState(false);
  const [originalVersion, setOriginalVersion] = useState<string>('');

  // 版本对比弹窗状态
  const [versionComparisonVisible, setVersionComparisonVisible] = useState(false);
  const [comparisonSourceVersion, setComparisonSourceVersion] = useState<string>('');

  // 版本选项生成
  const versionOptions = useMemo(() => {
    return versionHistory.map(v => ({
      label: `${v.version}${v.isCurrent ? ' (当前)' : ''}${v.versionDate ? ` - ${formatDate(v.versionDate)?.split(' ')[0] || ''}` : ''}`,
      value: v.version,
    }));
  }, [versionHistory]);

  // ==================== 模拟数据 (开发中功能使用) ====================

  const inventoryData: InventoryData[] = useMemo(() => [
    { warehouseCode: 'WH-001', warehouseName: '原材料仓库A区', availableQty: 1200, inTransitQty: 300, safetyStock: 500, lockedQty: 100, unit: '件' },
    { warehouseCode: 'WH-002', warehouseName: '成品仓库B区', availableQty: 800, inTransitQty: 0, safetyStock: 200, lockedQty: 50, unit: '件' },
  ], []);

  const supplierData: SupplierData[] = useMemo(() => [
    { id: '1', supplierCode: 'SUP-001', supplierName: '精密机械制造有限公司', leadTime: 7, price: 125.50, isPrimary: true, contactPerson: '刘经理', contactPhone: '138-0000-0001', lastPurchaseDate: '2024-01-10' },
    { id: '2', supplierCode: 'SUP-002', supplierName: '工业配件生产厂', leadTime: 10, price: 118.00, isPrimary: false, contactPerson: '陈主管', contactPhone: '138-0000-0002', lastPurchaseDate: '2023-12-15' },
  ], []);

  const qualityData: QualityRecordData[] = useMemo(() => [
    { id: '1', batchNumber: 'LOT-2024-001', inspectionType: '首件检验', inspectionResult: '合格', inspector: '质检员A', inspectionTime: '2024-01-18 14:30', defectRate: 0 },
    { id: '2', batchNumber: 'LOT-2024-002', inspectionType: '巡检', inspectionResult: '合格', inspector: '质检员B', inspectionTime: '2024-01-17 10:15', defectRate: 0.5 },
  ], []);

  // ==================== 数据加载 ====================

  const loadDetail = useCallback(async (id: string) => {
    if (!id) { message.error('物料ID参数缺失'); history.push('/appPdm/PartManagement/Part'); return; }
    setLoading(true);
    try {
      const result = await PartGetAsync({ id });
      const vi = result.versionInfo;
      const cs = result.currentSpecification;
      const dim = cs?.dimension;
      setData({
        id: result.id || id, partNumber: result.partNumber || '', outCode: result.outCode,
        drawingNumber: vi?.drawingNumber ?? result.drawingNumber, description: result.description || '',
        engDescription: result.engDescription, outDescription: result.outDescription,
        specification: result.specification, outSpecification: result.outSpecification,
        unit: result.unit || '', unitCode: result.unitCode,
        productSeriesId: vi?.productSeriesId ?? result.productSeriesId,
        productSeriesCode: vi?.productSeriesCode ?? result.productSeriesCode,
        productSeriesName: vi?.productSeriesName ?? result.productSeriesName,
        categoryName: result.categoryName || '', categoryCode: result.categoryCode,
        version: vi?.version || 'V1.0', lifecycleStatus: result.lifecycleStatus ?? 0,
        isCritical: result.isCritical ?? false, isActive: result.isActive ?? true,
        comeFrom: result.comeFrom, comeFromName: result.comeFromName, comeFromType: result.comeFromType,
        eanCode: result.eanCode, upcCode: result.upcCode,
        creationTime: result.creationTime || '', creator: result.creator || '',
        lastModificationTime: result.lastModificationTime, lastModifier: result.lastModifier,
        imageUrl: result.imageUrl, material: cs?.material, surfaceTreatment: cs?.surfaceTreatment,
        color: cs?.color, length: dim?.length, width: dim?.width, height: dim?.height,
        weight: dim?.weight, diameter: dim?.diameter, volume: dim?.volume,
        attributeValues: result.attributeValues, isCheckedOut: result.isCheckedOut,
        checkOutInfo: result.checkOutInfo,
      });
      setOriginalVersion(vi?.version || 'V1.0');
      if (result.categoryId) {
        try {
          const attrs = await PartCategoryAttributeGetByCategoryIdAsync({ categoryId: result.categoryId });
          setAttributeDefinitions(attrs || []);
        } catch (e) { console.error('加载属性定义失败:', e); }
      }
    } catch (error) { console.error('加载物料详情失败:', error); message.error('加载物料详情失败'); }
    finally { setLoading(false); }
  }, []);

  const previousIdRef = React.useRef<string | undefined>(undefined);

  useEffect(() => {
    // 使用 KeepAlive Hook 自动处理路径匹配
    if (!isActive || !hasChanged) {
      return;
    }
    const currentId = partId;
    if (currentId && currentId !== previousIdRef.current) {
      previousIdRef.current = currentId; loadDetail(currentId);
      setBomLoaded(false); setBomData(null); setBomVersion(''); setSelectedBomItem(null); setBomTreeItems([]);
      setBomDocumentLoaded(false); setBomDocumentTree(null);
      setChangeRecordsLoaded(false); setChangeRecords([]);
      setVersionHistoryLoaded(false); setVersionHistory([]); setSelectedVersionId(null);
      setIsViewingHistory(false); setOriginalVersion('');
    } else if (!currentId && previousIdRef.current) {
      previousIdRef.current = undefined; setData(null);
    }
  }, [isActive, hasChanged, partId, loadDetail]);

  // ==================== 统一数据刷新 ====================

  const refreshAfterOperation = useCallback(async (operationType: OperationType, successMessage: string) => {
    if (!data?.id) return;
    try {
      await loadDetail(data.id);
      const affectedSections = OPERATION_AFFECTED_SECTIONS[operationType];
      if (affectedSections.includes('versions')) setVersionHistoryLoaded(false);
      if (affectedSections.includes('changes')) setChangeRecordsLoaded(false);
      message.success(successMessage);
    } catch (error) {
      console.error('刷新数据失败:', error);
      const affectedSections = OPERATION_AFFECTED_SECTIONS[operationType];
      if (affectedSections.includes('versions')) setVersionHistoryLoaded(false);
      if (affectedSections.includes('changes')) setChangeRecordsLoaded(false);
    }
  }, [data?.id, loadDetail]);

  // ==================== 文档数据加载 ====================

  const handleAddDocumentLink = useCallback(() => setAddDocumentLinkVisible(true), []);

  // 加载 BOM 文档树数据
  const loadBomDocumentTree = useCallback(async (partNumber: string) => {
    if (!partNumber) return;
    setBomDocumentLoading(true);
    try {
      const result = await PartDocumentLinkGetDocumentsByPartAsync({
        PartNumber: partNumber,
        IncludeBomChildren: true,
      });
      if (!result) {
        setBomDocumentTree(null);
        setBomDocumentLoaded(true);
        return;
      }
      // 转换 API 响应为前端类型
      const transformNode = (apiNode: any): BomDocumentTreeNode => ({
        bomItemId: apiNode.bomItemId,
        bomPath: apiNode.bomPath,
        partNumber: apiNode.partNumber,
        partName: apiNode.partName,
        documents: apiNode.documents?.map((doc: any) => ({
          link: doc.link,
          document: doc.document,
        })),
        children: apiNode.children?.map(transformNode),
      });
      setBomDocumentTree(transformNode(result));
      setBomDocumentLoaded(true);
    } catch (error) {
      console.error('加载 BOM 文档树失败:', error);
      setBomDocumentTree(null);
      setBomDocumentLoaded(false);
    } finally {
      setBomDocumentLoading(false);
    }
  }, []);

  const handleAddDocumentLinkSuccess = useCallback(() => {
    setAddDocumentLinkVisible(false);
    if (data?.partNumber) {
      // 刷新文档树数据
      setBomDocumentLoaded(false);
      setBomDocumentTree(null);
      loadBomDocumentTree(data.partNumber);
    }
  }, [data?.partNumber, loadBomDocumentTree]);

  const handleDeleteDocumentLink = useCallback(async (linkId: string) => {
    const hide = message.loading('正在解除关联...', 0);
    try {
      await PartDocumentLinkDeleteAsync({ id: linkId });
      message.success('解除关联成功');
      if (data?.partNumber) {
        // 刷新文档树数据
        setBomDocumentLoaded(false);
        setBomDocumentTree(null);
        loadBomDocumentTree(data.partNumber);
      }
    } catch (error) { console.error('解除关联失败:', error); message.error('解除关联失败'); }
    finally { hide(); }
  }, [data?.partNumber, loadBomDocumentTree]);

  const handleLoadBomDocuments = useCallback(() => {
    if (data?.partNumber && !bomDocumentLoaded && !bomDocumentLoading) {
      loadBomDocumentTree(data.partNumber);
    }
  }, [data?.partNumber, bomDocumentLoaded, bomDocumentLoading, loadBomDocumentTree]);

  // ==================== BOM 数据加载 ====================

  const loadBomData = useCallback(async (materialCode: string, partVersion?: string) => {
    if (!materialCode) return;
    setBomLoading(true);
    try {
      const bomList = await BomGetListAsync({ MaxResultCount: 500, SkipCount: 0 });
      const matchedBom = bomList.items?.find((bom) => bom.materialCode === materialCode);
      if (matchedBom) {
        setBomData(matchedBom);
        const versionResult = await BomVersionGetByMaterialCodeAsync({ materialCode });
        const versions = versionResult?.items || [];
        if (versions.length > 0) {
          const matchedVer = partVersion ? versions.find((v: any) => v.version === partVersion) : null;
          const activeVer = versions.find((v: any) => v.status === 1);
          const selectedVer = matchedVer || activeVer || versions[0];
          setBomVersion(selectedVer.version || 'V1.0');
        } else { setBomVersion('V1.0'); }
      } else { setBomData(null); setBomVersion(''); }
    } catch (error) { console.error('加载BOM数据失败:', error); setBomData(null); setBomVersion(''); }
    finally { setBomLoading(false); setBomLoaded(true); }
  }, []);

  const handleBomItemSelect = useCallback((item: BurnAbpPdmBomManagementBomsBomItemDto | null) => {
    setSelectedBomItem(item);
  }, []);

  const handleBomDataLoaded = useCallback((items: BurnAbpPdmBomManagementBomsBomItemDto[]) => {
    setBomTreeItems(items);
  }, []);

  const handleBomTreeRefresh = useCallback(() => {
    setBomTreeRefreshKey(prev => prev + 1);
  }, []);

  const handleBomItemEdit = useCallback((item: BurnAbpPdmBomManagementBomsBomItemDto) => {
    setBomItemFormData(item);
    setBomParentItem(null);
    setBomItemFormVisible(true);
  }, []);

  const handleBomItemAdd = useCallback((parent: BurnAbpPdmBomManagementBomsBomItemDto | null) => {
    setBomItemFormData(null);
    setBomParentItem(parent);
    setBomItemFormVisible(true);
  }, []);

  const handleBomItemDelete = useCallback(async (item: BurnAbpPdmBomManagementBomsBomItemDto) => {
    if (!bomVersion) {
      message.error('BOM版本信息缺失');
      return;
    }
    const result = await deleteBomItem(item.id!, bomVersion);
    if (result.success) {
      setSelectedBomItem(null);
      handleBomTreeRefresh();
      message.success('删除成功');
    }
  }, [bomVersion, handleBomTreeRefresh]);

  const handleExportBom = useCallback(() => message.success('导出BOM功能待实现'), []);

  useEffect(() => {
    if (activeSection === 'bom' && data?.partNumber && !bomLoaded && !bomLoading) {
      loadBomData(data.partNumber, data.version);
    }
  }, [activeSection, data?.partNumber, data?.version, bomLoaded, bomLoading, loadBomData]);

  // ==================== 变更记录数据加载 ====================

  const loadChangeRecords = useCallback(async (partId: string) => {
    if (!partId) return;
    setChangeRecordsLoading(true);
    try {
      const result = await PartChangeRecordGetListByPartIdAsync({ partId });
      setChangeRecords(result || []);
    } catch (error) { console.error('加载变更记录失败:', error); setChangeRecords([]); }
    finally { setChangeRecordsLoading(false); setChangeRecordsLoaded(true); }
  }, []);

  useEffect(() => {
    if (activeSection === 'changes' && data?.id && !changeRecordsLoaded && !changeRecordsLoading) {
      loadChangeRecords(data.id);
    }
  }, [activeSection, data?.id, changeRecordsLoaded, changeRecordsLoading, loadChangeRecords]);

  // ==================== 版本历史数据加载 ====================

  const loadVersionHistory = useCallback(async (partId: string) => {
    if (!partId) return;
    setVersionHistoryLoading(true);
    try {
      const versionList = await PartVersionGetVersionHistoryAsync({ partId: Number(partId) });
      const versions: VersionHistoryData[] = (versionList || []).map(v => ({
        id: String(v.id || ''), version: v.version || '', versionDate: v.effectiveDate || v.creationTime,
        versionReason: v.versionReason, isCurrent: originalVersion === v.version,
        lifecycleStatus: v.status === 1 ? 20 : v.status === 0 ? 0 : 20, createdBy: undefined,
        creationTime: v.creationTime, releasedBy: v.releasedBy, releaseDate: v.releaseDate || v.effectiveDate,
      }));
      versions.sort((a, b) => {
        const vNumA = parseFloat(a.version.replace(/[^0-9.]/g, '')) || 0;
        const vNumB = parseFloat(b.version.replace(/[^0-9.]/g, '')) || 0;
        return vNumB - vNumA;
      });
      setVersionHistory(versions);
    } catch (error) { console.error('加载版本历史失败:', error); setVersionHistory([]); }
    finally { setVersionHistoryLoading(false); setVersionHistoryLoaded(true); }
  }, [originalVersion]);

  const loadVersionDetail = useCallback(async (versionId: number, version: string) => {
    if (!versionId) return;
    setVersionDetailLoading(true);
    try {
      const result = await PartVersionGetAsync({ id: versionId });
      if (result) {
        const cs = result.currentSpecification;
        const dim = cs?.dimension;
        setData({
          id: String(result.partId || ''), partNumber: result.partNumber || '', outCode: result.outCode,
          drawingNumber: result.drawingNumber, description: result.description || '',
          engDescription: result.engDescription, outDescription: result.outDescription,
          specification: result.specification, outSpecification: result.outSpecification,
          unit: result.unit || '', unitCode: result.unitCode,
          productSeriesId: result.productSeriesId, productSeriesCode: result.productSeriesCode,
          productSeriesName: result.productSeriesName, categoryName: result.categoryName || '',
          categoryCode: result.categoryCode, version: result.version || version,
          lifecycleStatus: result.status === 1 ? 20 : result.status === 0 ? 0 : 20,
          isCritical: result.isCritical ?? false, isActive: true,
          comeFrom: result.comeFrom, comeFromName: result.comeFromName,
          eanCode: result.eanCode, upcCode: result.upcCode,
          creationTime: result.creationTime || '', creator: '',
          lastModificationTime: result.lastModificationTime, lastModifier: undefined, imageUrl: undefined,
          material: cs?.material, surfaceTreatment: cs?.surfaceTreatment, color: cs?.color,
          length: dim?.length, width: dim?.width, height: dim?.height,
          weight: dim?.weight, diameter: dim?.diameter, volume: dim?.volume,
          attributeValues: result.attributeValues,
          isCheckedOut: data?.isCheckedOut ?? false, checkOutInfo: data?.checkOutInfo,
        });
        const loadedVersion = result.version || version;
        setIsViewingHistory(loadedVersion !== originalVersion);
        setSelectedVersionId(String(result.id || ''));
        if (bomLoaded) {
          setBomLoaded(false); setBomData(null); setBomVersion('');
          setSelectedBomItem(null); setBomTreeItems([]);
          if (activeSection === 'bom' && result.partNumber) {
            await loadBomData(result.partNumber, result.version || version);
          }
        }
        message.success(`已切换到版本 ${version}`);
      }
    } catch (error) { console.error('加载版本详情失败:', error); message.error('加载版本详情失败'); }
    finally { setVersionDetailLoading(false); }
  }, [originalVersion, bomLoaded, activeSection, loadBomData, data?.isCheckedOut, data?.checkOutInfo]);

  const handleBackToCurrentVersion = useCallback(async () => {
    if (partId) {
      setIsViewingHistory(false); setSelectedVersionId(null);
      await loadDetail(partId);
      if (bomLoaded) {
        setBomLoaded(false); setBomData(null); setBomVersion('');
        setSelectedBomItem(null); setBomTreeItems([]);
      }
      message.success('已返回当前版本');
    }
  }, [partId, loadDetail, bomLoaded]);

  const handleVersionChange = useCallback((version: string) => {
    const selectedVersion = versionHistory.find(v => v.version === version);
    if (!selectedVersion) return;
    const versionId = Number(selectedVersion.id);
    if (versionId) loadVersionDetail(versionId, version);
  }, [versionHistory, loadVersionDetail]);

  useEffect(() => {
    if (data?.id && originalVersion && !versionHistoryLoaded && !versionHistoryLoading) {
      loadVersionHistory(data.id);
    }
  }, [data?.id, originalVersion, versionHistoryLoaded, versionHistoryLoading, loadVersionHistory]);

  // ==================== 检出操作 ====================

  const handleCheckOut = useCallback(async () => {
    if (!data?.id) return;
    setCheckOutLoading(true);
    try {
      await PartCheckOutAsync({ id: data.id }, { comment: checkOutComment });
      setCheckOutModalVisible(false); setCheckOutComment('');
      await refreshAfterOperation('checkout', '检出成功');
    } catch (error) { console.error('检出失败:', error); message.error('检出失败'); }
    finally { setCheckOutLoading(false); }
  }, [data?.id, checkOutComment, refreshAfterOperation]);

  const handleCheckIn = useCallback(async () => {
    if (!data?.id) return;
    setCheckOutLoading(true);
    try {
      await PartCheckInAsync({ id: data.id });
      await refreshAfterOperation('checkin', '检入成功');
    } catch (error) { console.error('检入失败:', error); message.error('检入失败'); }
    finally { setCheckOutLoading(false); }
  }, [data?.id, refreshAfterOperation]);

  const handleUndoCheckOut = useCallback(async () => {
    if (!data?.id) return;
    setCheckOutLoading(true);
    try {
      await PartUndoCheckOutAsync({ id: data.id }, { reason: undoCheckOutReason });
      setUndoCheckOutReason('');
      await refreshAfterOperation('undo_checkout', '撤销检出成功');
    } catch (error) { console.error('撤销检出失败:', error); message.error('撤销检出失败'); }
    finally { setCheckOutLoading(false); }
  }, [data?.id, undoCheckOutReason, refreshAfterOperation]);

  // ==================== 审批操作 ====================

  const handleSubmitApproval = useCallback(async () => {
    if (!data?.id) return;
    setApprovalLoading(true);
    try {
      await PartSubmitAsync({ id: data.id }, { comment: submitComment });
      setSubmitModalVisible(false); setSubmitComment('');
      await refreshAfterOperation('submit', '提交审批成功');
    } catch (error: any) { console.error('提交审批失败:', error); message.error(error?.message || '提交审批失败'); }
    finally { setApprovalLoading(false); }
  }, [data?.id, submitComment, refreshAfterOperation]);

  const handleWithdrawApproval = useCallback(async () => {
    if (!data?.id) return;
    setApprovalLoading(true);
    try {
      await PartWithdrawApprovalAsync({ id: data.id });
      await refreshAfterOperation('withdraw', '撤回审批成功');
    } catch (error: any) { console.error('撤回审批失败:', error); message.error(error?.message || '撤回审批失败'); }
    finally { setApprovalLoading(false); }
  }, [data?.id, refreshAfterOperation]);

  const handleApprove = useCallback(async () => {
    if (!data?.id) return;
    setApprovalLoading(true);
    try {
      await PartApproveAsync({ id: data.id }, { comment: approveComment });
      setApproveModalVisible(false); setApproveComment('');
      await refreshAfterOperation('approve', '审批通过成功');
    } catch (error: any) { console.error('审批通过失败:', error); message.error(error?.message || '审批通过失败'); }
    finally { setApprovalLoading(false); }
  }, [data?.id, approveComment, refreshAfterOperation]);

  const handleReject = useCallback(async () => {
    if (!data?.id || !rejectReason.trim()) { if (!rejectReason.trim()) message.warning('请输入拒绝原因'); return; }
    setApprovalLoading(true);
    try {
      await PartRejectAsync({ id: data.id }, { reason: rejectReason });
      setRejectModalVisible(false); setRejectReason('');
      await refreshAfterOperation('reject', '审批拒绝成功');
    } catch (error: any) { console.error('审批拒绝失败:', error); message.error(error?.message || '审批拒绝失败'); }
    finally { setApprovalLoading(false); }
  }, [data?.id, rejectReason, refreshAfterOperation]);

  // ==================== 导航处理 ====================

  const handleBack = useCallback(() => history.push('/appPdm/PartManagement/Part'), []);
  const handleEdit = useCallback(() => {
    if (partId) history.push(`/appPdm/PartManagement/Part/form?id=${partId}`);
  }, [partId]);

  // ==================== 渲染内容区 ====================

  const renderContent = () => {
    if (!data) return null;
    const sections: Record<string, JSX.Element> = {
      basic: <BasicInfoSection data={data} attributeDefinitions={attributeDefinitions} formatDate={formatDate} />,
      technical: <TechnicalSection data={data} attributeDefinitions={attributeDefinitions} />,
      bom: <BomSection data={data} bomData={bomData} bomVersion={bomVersion} bomTreeItems={bomTreeItems}
        selectedBomItem={selectedBomItem} bomLoading={bomLoading} bomTreeRefreshKey={bomTreeRefreshKey}
        onBomItemSelect={handleBomItemSelect} onBomDataLoaded={handleBomDataLoaded}
        onBomItemAdd={handleBomItemAdd} onBomItemEdit={handleBomItemEdit} onBomItemDelete={handleBomItemDelete}
        onBomTreeRefresh={handleBomTreeRefresh} onExportBom={handleExportBom}
        onBomCreated={() => { if (data?.partNumber) { setBomLoaded(false); loadBomData(data.partNumber, data.version); } }} />,
      documents: <DocumentsSection
        bomDocumentTree={bomDocumentTree} bomDocumentLoading={bomDocumentLoading}
        canUpdate={canUpdate} formatDate={formatDate}
        getDocumentUsageText={getDocumentUsageText} onAddDocumentLink={handleAddDocumentLink}
        onLoadBomDocuments={handleLoadBomDocuments} />,
      versions: <VersionHistorySection versionHistory={versionHistory} versionHistoryLoading={versionHistoryLoading}
        versionDetailLoading={versionDetailLoading} isViewingHistory={isViewingHistory}
        selectedVersionId={selectedVersionId} formatDate={formatDate} getLifecycleConfig={getLifecycleConfig}
        onBackToCurrentVersion={handleBackToCurrentVersion} onVersionCompare={() => setVersionComparisonVisible(true)}
        onVersionCompareWith={(v) => { setComparisonSourceVersion(v); setVersionComparisonVisible(true); }}
        onLoadVersionDetail={loadVersionDetail} />,
      changes: <ChangesSection changeRecords={changeRecords} changeRecordsLoading={changeRecordsLoading}
        formatDate={formatDate} getChangeTypeConfig={getChangeTypeConfig} />,
      inventory: <InventorySection inventoryData={inventoryData} getStockHealth={getStockHealth} />,
      suppliers: <SuppliersSection supplierData={supplierData} />,
      quality: <QualitySection qualityData={qualityData} />,
    };
    return sections[activeSection] || null;
  };

  // ==================== 主渲染 ====================

  return (
    <div className="part-detail-compact">
      <ActionToolbar
        data={data}
        versionHistory={versionHistory}
        versionOptions={versionOptions}
        versionHistoryLoading={versionHistoryLoading}
        versionDetailLoading={versionDetailLoading}
        isViewingHistory={isViewingHistory}
        canUpdate={canUpdate}
        canCheckOut={canCheckOut}
        canCheckIn={canCheckIn}
        canUndoCheckOut={canUndoCheckOut}
        canSubmit={canSubmit}
        canApprove={canApprove}
        canReject={canReject}
        canWithdraw={canWithdraw}
        currentUserId={currentUserId}
        checkOutLoading={checkOutLoading}
        approvalLoading={approvalLoading}
        undoCheckOutReason={undoCheckOutReason}
        getLifecycleConfig={getLifecycleConfig}
        formatDate={formatDate}
        onBack={handleBack}
        onEdit={handleEdit}
        onVersionChange={handleVersionChange}
        onBackToCurrentVersion={handleBackToCurrentVersion}
        onCheckOutClick={() => setCheckOutModalVisible(true)}
        onCheckIn={handleCheckIn}
        onUndoCheckOut={handleUndoCheckOut}
        onUndoCheckOutReasonChange={setUndoCheckOutReason}
        onSubmit={() => setSubmitModalVisible(true)}
        onWithdraw={handleWithdrawApproval}
        onApprove={() => setApproveModalVisible(true)}
        onReject={() => setRejectModalVisible(true)}
      />

      <div className="detail-body">
        <div className="detail-sider">
          <div className="detail-nav">
          <Menu
            mode="inline"
            selectedKeys={[activeSection]}
            items={NAV_ITEMS.map(item => ({
              key: item.key,
              icon: item.icon,
              label: item.label,
              disabled: item.developing,
            }))}
            onClick={({ key }) => setActiveSection(key)}
            style={{ borderRight: 0 }}
          />
          </div>
        </div>

        <div className="detail-content">
          <Spin spinning={loading}>
            {renderContent()}
          </Spin>
        </div>
      </div>

      <CheckoutModals checkOutModalVisible={checkOutModalVisible} checkOutComment={checkOutComment}
        checkOutLoading={checkOutLoading}
        onCheckOutModalClose={() => { setCheckOutModalVisible(false); setCheckOutComment(''); }}
        onCheckOutCommentChange={setCheckOutComment} onCheckOut={handleCheckOut} />

      <ApprovalModals submitModalVisible={submitModalVisible} submitComment={submitComment}
        onSubmitModalClose={() => { setSubmitModalVisible(false); setSubmitComment(''); }}
        onSubmitCommentChange={setSubmitComment} onSubmit={handleSubmitApproval}
        approveModalVisible={approveModalVisible} approveComment={approveComment}
        onApproveModalClose={() => { setApproveModalVisible(false); setApproveComment(''); }}
        onApproveCommentChange={setApproveComment} onApprove={handleApprove}
        rejectModalVisible={rejectModalVisible} rejectReason={rejectReason}
        onRejectModalClose={() => { setRejectModalVisible(false); setRejectReason(''); }}
        onRejectReasonChange={setRejectReason} onReject={handleReject} approvalLoading={approvalLoading} />

      <AddDocumentLinkDialog visible={addDocumentLinkVisible} partNumber={data?.partNumber || ''}
        onCancel={() => setAddDocumentLinkVisible(false)} onSuccess={handleAddDocumentLinkSuccess} />

      {data && (
        <PartVersionComparisonModal
          visible={versionComparisonVisible}
          onClose={() => {
            setVersionComparisonVisible(false);
            setComparisonSourceVersion('');
          }}
          partId={Number(data.id)}
          partNumber={data.partNumber}
          partName={data.description}
          versionHistory={versionHistory.map(v => ({
            id: v.id,
            version: v.version,
            versionDate: v.versionDate,
            effectiveDate: v.versionDate,
            isCurrent: v.isCurrent,
            isDraft: false,
            lifecycleStatus: v.lifecycleStatus,
          }))}
          currentVersion={data.version}
          hasDraft={data.lifecycleStatus === 1}
        />
      )}

      {bomData && (
        <BomItemForm
          visible={bomItemFormVisible}
          bomData={bomData}
          treeItems={bomTreeItems}
          data={bomItemFormData}
          parentItem={bomParentItem}
          version={bomVersion}
          onClose={() => {
            setBomItemFormVisible(false);
            setBomItemFormData(null);
            setBomParentItem(null);
          }}
          onSuccess={() => {
            setBomItemFormVisible(false);
            setBomItemFormData(null);
            setBomParentItem(null);
            setSelectedBomItem(null);
            handleBomTreeRefresh();
          }}
        />
      )}
    </div>
  );
};

export default PartDetailPage;
