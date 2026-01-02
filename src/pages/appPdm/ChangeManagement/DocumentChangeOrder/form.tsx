/**
 * 文档变更单表单页
 * 路由: /appPdm/ChangeManagement/DocumentChangeOrder/form?id={id}
 * 新建模式:无id参数
 * 编辑模式:有id参数
 */

import React, { useEffect, useState } from 'react';
import { Card, Button, Space, message, Spin } from 'antd';
import { ArrowLeftOutlined, SaveOutlined, SendOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { history, useSchemaField, closeTab } from 'umi';
import { useKeepAliveParams } from '@/hooks';
import { createForm } from '@formily/core';
import { FormProvider } from '@formily/react';
import { FormLayout, FormGrid } from '@formily/antd-v5';
import type { ISchema } from '@formily/json-schema';
import { ToolBar } from '@/components';
import { AgGridPlus } from '@/components/agGrid';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import {
  DocumentChangeOrderGetAsync,
  DocumentChangeOrderCreateAsync,
  DocumentChangeOrderUpdateAsync,
  DocumentChangeOrderSubmitForApprovalAsync,
  DocumentChangeOrderAddAffectedDocumentAsync,
  DocumentChangeOrderRemoveAffectedDocumentAsync,
} from '@/services/pdm/DocumentChangeOrder';
import UserSelect from '@/pages/appPdm/_formWidgets/UserSelect';
import FileUploadWithChunks from '@/pages/appPdm/DocumentManagement/Document/components/FileUploadWithChunks';
import dayjs from 'dayjs';
import DocumentSelectDialog from '@/pages/appPdm/DocumentManagement/_components/DocumentSelectDialog';
import { formatVersionNumber } from '@/pages/appPdm/DocumentManagement/Document/_utils/documentStatus';

export const routeProps = {
  name: '文档变更单表单',
};

// 表单布局配置
const formLayout = {
  labelCol: 6,
  wrapperCol: 18,
  labelWidth: 120,
  feedbackLayout: 'none' as const,
};

const DocumentChangeOrderFormPage: React.FC = () => {
  const { id: orderId, isActive, hasChanged } = useKeepAliveParams(
    '/appPdm/ChangeManagement/DocumentChangeOrder/form',
    ['id']
  );
  const isEdit = !!orderId;

  const SchemaField = useSchemaField({
    UserSelect,
  });

  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [documentItems, setDocumentItems] = useState<any[]>([]);
  const [showDocumentSelect, setShowDocumentSelect] = useState(false);
  const gridRef = React.useRef<GridRef>();

  // 创建表单实例
  const form = React.useMemo(
    () => createForm({ validateFirst: true }),
    [orderId]
  );

  // 加载初始数据
  useEffect(() => {
    if (!isActive || !hasChanged) return;

    if (orderId) {
      setLoading(true);
      DocumentChangeOrderGetAsync({ id: orderId })
        .then(data => {
          const initialValues: any = {
            id: data.id,
            title: data.title,
            assignedToUserId: data.assignedToUserId,
            assignedToUserName: data.assignedToUserName,
            changeReason: data.changeReason,
            remarks: data.remarks,
          };

          form.setInitialValues(initialValues);

          // 加载明细列表
          if (data.items && data.items.length > 0) {
            setDocumentItems(data.items.map((item: any, index: number) => {
              // 如果存在变更后的文件信息,构造文件对象
              const changeAfterFile = item.changeAfterFileBlobName ? [{
                uid: `file_${index}`,
                name: item.changeAfterFileBlobName,
                fileName: item.changeAfterFileBlobName,
                blobName: item.changeAfterFileBlobName,
                uploadId: item.changeAfterFileBlobName,
                size: item.changeAfterFileSize,
                status: 'done',
              }] : [];

              return {
                id: item.id,
                changeOrderId: item.changeOrderId,
                documentId: item.documentId,
                documentNumber: item.documentNumber,
                documentName: item.documentName,
                documentDescription: item.documentDescription,
                documentType: item.documentType,
                currentVersion: item.currentVersion,
                partCode: item.partCode,
                partDrawingNumber: item.partDrawingNumber,
                partName: item.partName,
                partDescription: item.partDescription,
                beforeChangeFileId: item.beforeChangeFileId,
                afterChangeFileName: item.afterChangeFileName,
                afterChangeFileDescription: item.afterChangeFileDescription,
                isUpgradeRequired: item.isUpgradeRequired,
                versionAfterUpgrade: item.versionAfterUpgrade,
                internalStorage: item.internalStorage,
                externalStorage: item.externalStorage,
                productHandlingOpinion: item.productHandlingOpinion,
                changeAfterDescription: item.changeAfterDescription,
                relatedOrderNumber: item.relatedOrderNumber,
                changeAfterFileBlobName: item.changeAfterFileBlobName,
                changeAfterFileSize: item.changeAfterFileSize,
                isApplied: item.isApplied,
                appliedAt: item.appliedAt,
                rowId: `row_${index}`,
                changeAfterFile,
              };
            }));
          }
        })
        .catch(() => {
          message.error('加载数据失败');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isActive, hasChanged, orderId, form]);

  // 返回列表
  const handleBack = (needRefresh: boolean = false) => {
    const currentPath = window.location.pathname;
    const targetPath = needRefresh
      ? '/appPdm/ChangeManagement/DocumentChangeOrder?refresh=true'
      : '/appPdm/ChangeManagement/DocumentChangeOrder';
    history.push(targetPath);
    setTimeout(() => {
      closeTab(currentPath);
    }, 150);
  };

  // 保存数据(提取公共逻辑)
  const saveData = async () => {
    const values = await form.submit();

    // 验证必填字段
    if (!values.title) {
      message.error('变更主题不能为空');
      throw new Error('变更主题不能为空');
    }

    if (!values.assignedToUserName) {
      message.error('处理人不能为空');
      throw new Error('处理人不能为空');
    }

    if (!values.changeReason) {
      message.error('变更原因不能为空');
      throw new Error('变更原因不能为空');
    }

    // 验证明细列表
    if (!documentItems || documentItems.length === 0) {
      message.error('请至少添加一条文档变更明细');
      throw new Error('请至少添加一条文档变更明细');
    }

    // 验证每个明细项的必填字段和文件上传
    for (let i = 0; i < documentItems.length; i++) {
      const item = documentItems[i];

      // 只有勾选了升级版本时，才验证版本号和文件
      if (item.isUpgradeRequired) {
        if (!item.versionAfterUpgrade) {
          message.error(`第${i + 1}行: 变更后版本不能为空`);
          throw new Error('变更后版本不能为空');
        }

        // 校验版本格式：大写字母 + 非负整数
        const versionPattern = /^[A-Z]\d+$/;
        if (!versionPattern.test(item.versionAfterUpgrade)) {
          message.error(`第${i + 1}行: 版本格式错误，请输入大写字母+非负整数，如: A1, B2, C45`);
          throw new Error('版本格式错误');
        }

        // 检查文件是否上传
        const changeAfterFile = item.changeAfterFile || [];
        if (changeAfterFile.length === 0 || !changeAfterFile[0]) {
          message.error(`第${i + 1}行: 请上传变更后文件`);
          throw new Error('变更后文件不能为空');
        }

        const uploadedFile = changeAfterFile[0];

        // 检查文件上传状态
        if (uploadedFile.status === 'uploading') {
          message.error(`第${i + 1}行: 文件正在上传中,请等待上传完成后再提交`);
          throw new Error('文件正在上传');
        }

        if (uploadedFile.status === 'error') {
          message.error(`第${i + 1}行: 文件上传失败,请重新上传`);
          throw new Error('文件上传失败');
        }

        // 检查是否有 uploadId
        if (!uploadedFile.uploadId) {
          message.error(`第${i + 1}行: 文件未上传完成或上传ID缺失,请重新上传`);
          throw new Error('文件上传ID缺失');
        }
      }
    }

    // 构造提交数据
    const submitData: any = {
      title: values.title,
      assignedToUserCode: values.assignedToUserCode,
      assignedToUserName: values.assignedToUserName,
      changeReason: values.changeReason?.trim(),
      remarks: values.remarks?.trim(),
      items: documentItems.map(item => {
        const changeAfterFile = item.changeAfterFile || [];
        const changeAfterFileUploadId = changeAfterFile.length > 0 && changeAfterFile[0]?.uploadId
          ? changeAfterFile[0].uploadId
          : undefined;

        return {
          documentId: item.documentId,
          documentNumber: item.documentNumber,
          documentName: item.documentName,
          documentDescription: item.documentDescription,
          documentType: item.documentType,
          currentVersion: item.currentVersion,
          partCode: item.partCode,
          partDrawingNumber: item.partDrawingNumber,
          partName: item.partName,
          partDescription: item.partDescription,
          beforeChangeFileId: item.beforeChangeFileId,
          afterChangeFileName: item.afterChangeFileName,
          afterChangeFileDescription: item.afterChangeFileDescription,
          isUpgradeRequired: item.isUpgradeRequired || false,
          versionAfterUpgrade: item.versionAfterUpgrade,
          internalStorage: item.internalStorage,
          externalStorage: item.externalStorage,
          productHandlingOpinion: item.productHandlingOpinion,
          relatedOrderNumber: item.relatedOrderNumber,
          changeAfterDescription: item.changeAfterDescription,
          changeAfterFileUploadId: changeAfterFileUploadId,
        };
      }),
    };

    console.log('DocumentChangeOrder - 提交数据:', submitData);

    if (isEdit) {
      await DocumentChangeOrderUpdateAsync({ id: orderId }, {
        title: submitData.title,
        assignedToUserCode: submitData.assignedToUserCode,
        assignedToUserName: submitData.assignedToUserName,
        changeReason: submitData.changeReason,
        remarks: submitData.remarks,
      });

      // 编辑模式下,需要同步明细项
      // 这里简化处理,实际可能需要调用添加/移除明细项的API
    } else {
      await DocumentChangeOrderCreateAsync(submitData);
    }
  };

  // 保存
  const handleSave = async () => {
    setSubmitting(true);
    try {
      await saveData();
      message.success('保存成功');
      handleBack(true);
    } catch (error: any) {
      if (error.message && !error.message.includes('不能为空')) {
        message.error('保存失败');
      }
    } finally {
      setSubmitting(false);
    }
  };

  // 保存并提交
  const handleSaveAndSubmit = async () => {
    setSubmitting(true);
    try {
      await saveData();
      if (isEdit) {
        await DocumentChangeOrderSubmitForApprovalAsync({ id: orderId });
      } else {
        message.warning('请先保存后再提交审批');
        return;
      }
      message.success('提交成功');
      handleBack(true);
    } catch (error: any) {
      if (error.message && !error.message.includes('不能为空')) {
        message.error('操作失败');
      }
    } finally {
      setSubmitting(false);
    }
  };

  // 删除明细行
  const handleDeleteRow = (rowId: string) => {
    setDocumentItems(items => items.filter(item => item.rowId !== rowId));
  };

  // 添加文档(批量)
  const handleAddDocuments = () => {
    setShowDocumentSelect(true);
  };

  // 从文档列表选择完成
  const handleDocumentSelected = async (selectedRows: any[]) => {
    const newItems = selectedRows.map((doc, index) => {
      // 获取主文档文件信息（变更前文件）
      let beforeChangeFileId = '';
      let beforeChangeFileName = '';
      if (doc.currentRevision?.files && Array.isArray(doc.currentRevision.files)) {
        // 查找 fileRole 为 Primary 的文件 (fileRole: 0 = Primary)
        const primaryFile = doc.currentRevision.files.find((f: any) => f.fileRole === 0);
        const targetFile = primaryFile || doc.currentRevision.files[0];
        if (targetFile) {
          beforeChangeFileId = targetFile.id || '';
          beforeChangeFileName = targetFile.fileName || '';
        }
      }

      // 从主关联物料获取信息
      const partCode = doc.primaryPartLink?.partNumber || '';
      const partName = doc.primaryPartLink?.partName || '';
      const partDrawingNumber = doc.primaryPartLink?.drawingNumber || '';

      return {
        rowId: `row_${Date.now()}_${index}`,
        documentId: doc.id,
        documentNumber: doc.documentNumber,
        documentName: doc.documentName,
        documentDescription: doc.description || '',
        documentType: doc.documentTypeName || '',
        currentVersion: formatVersionNumber(doc.version, doc.revision),
        partCode: partCode,
        partDrawingNumber: partDrawingNumber,
        partName: partName,
        partDescription: '',
        beforeChangeFileId: beforeChangeFileId, // 变更前文件ID
        beforeChangeFileName: beforeChangeFileName, // 变更前文件名称（用于显示）
        afterChangeFileName: '', // 变更后文件名称，用户填写
        afterChangeFileDescription: '', // 变更后文件描述，用户填写
        isUpgradeRequired: false,
        versionAfterUpgrade: '', // 变更后文档版本，用户填写
        internalStorage: '',
        externalStorage: '',
        productHandlingOpinion: '',
        relatedOrderNumber: '',
        changeAfterDescription: '',
      };
    });

    setDocumentItems(items => [...items, ...newItems]);
    setShowDocumentSelect(false);
  };

  // Schema定义
  const schema: ISchema = {
    type: 'object',
    properties: {
      layout: {
        type: 'void',
        'x-component': 'FormLayout',
        'x-component-props': formLayout,
        properties: {
          grid: {
            type: 'void',
            'x-component': 'FormGrid',
            'x-component-props': {
              maxColumns: 2,
              minColumns: 1,
              columnGap: 24,
              strictAutoFit: true,
            },
            properties: {
              col1: {
                type: 'void',
                'x-component': 'FormGrid.GridColumn',
                'x-component-props': { gridSpan: 1 },
                properties: {
                  title: {
                    type: 'string',
                    title: '变更主题',
                    required: true,
                    'x-decorator': 'FormItem',
                    'x-component': 'Input',
                    'x-component-props': {
                      placeholder: '请输入变更主题',
                    },
                  },
                },
              },
              col4: {
                type: 'void',
                'x-component': 'FormGrid.GridColumn',
                'x-component-props': { gridSpan: 1 },
                properties: {
                  '{value:assignedToUserCode,label:assignedToUserName}': {
                    type: 'string',
                    title: '处理人',
                    required: true,
                    'x-decorator': 'FormItem',
                    'x-component': 'UserSelect',
                    'x-component-props': {
                      placeholder: '请选择处理人',
                      labelInValue: true,
                      labelField: 'name',
                      valueField: 'userName',
                    },
                    name: '{value:assignedToUserCode,label:assignedToUserName}',
                  },
                },
              },
              col_changeReason: {
                type: 'void',
                'x-component': 'FormGrid.GridColumn',
                'x-component-props': { gridSpan: 2 },
                properties: {
                  changeReason: {
                    type: 'string',
                    title: '变更原因',
                    required: true,
                    'x-decorator': 'FormItem',
                    'x-component': 'Input.TextArea',
                    'x-component-props': {
                      placeholder: '请输入变更原因',
                      rows: 2,
                    },
                  },
                },
              },
              col5: {
                type: 'void',
                'x-component': 'FormGrid.GridColumn',
                'x-component-props': { gridSpan: 2 },
                properties: {
                  remarks: {
                    type: 'string',
                    title: '备注',
                    'x-decorator': 'FormItem',
                    'x-component': 'Input.TextArea',
                    'x-component-props': {
                      placeholder: '请输入备注',
                      rows: 2,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  // 明细列表列定义
  // 列顺序：变更前文档信息 + 物料信息 → 版本变更 → 变更后文档信息 → 库存处理 → 其他
  const detailColumnDefs = React.useMemo(() => [
    // === 变更前文档信息 ===
    { field: 'documentNumber', headerName: '文档编码', width: 150 },
    { field: 'documentName', headerName: '变更前文档名称', width: 180 },
    { field: 'documentDescription', headerName: '变更前文档描述', width: 180 },
    { field: 'currentVersion', headerName: '变更前文档版本', width: 130 },
    {
      field: 'beforeChangeFileName',
      headerName: '变更前文件',
      width: 200,
      cellRenderer: (params: any) => {
        return params.value || '-';
      }
    },
    // === 关联物料信息 ===
    { field: 'partCode', headerName: '物料编码', width: 120 },
    { field: 'partDrawingNumber', headerName: '物料图号', width: 120 },
    { field: 'partName', headerName: '物料描述', width: 150 },
    // === 变更后文件名称/描述 ===
    {
      field: 'afterChangeFileName',
      headerName: '变更后文件名称',
      width: 180,
      editable: true,
      cellEditor: 'agTextCellEditor',
      cellStyle: { backgroundColor: '#fff7e6' }
    },
    {
      field: 'afterChangeFileDescription',
      headerName: '变更后文件描述',
      width: 180,
      editable: true,
      cellEditor: 'agTextCellEditor',
      cellStyle: { backgroundColor: '#fff7e6' }
    },
    // === 版本变更信息 ===
    {
      field: 'isUpgradeRequired',
      headerName: '是否升级版本',
      width: 120,
      editable: true,
      cellEditor: 'agCheckboxCellEditor',
      cellRenderer: (params: any) => params.value ? '是' : '否'
    },
    {
      field: 'versionAfterUpgrade',
      headerName: '变更后版本',
      width: 130,
      editable: (params: any) => params.data?.isUpgradeRequired === true,
      cellEditor: 'agTextCellEditor',
      cellStyle: (params: any) => ({
        backgroundColor: params.data?.isUpgradeRequired ? '#fff7e6' : '#f5f5f5',
        color: params.data?.isUpgradeRequired ? 'inherit' : '#999'
      }),
      valueSetter: (params: any) => {
        const newValue = params.newValue?.trim();
        // 允许清空
        if (!newValue) {
          params.data.versionAfterUpgrade = '';
          return true;
        }
        // 校验规则：大写字母 + 非负整数，如 A1, B2, C45
        const versionPattern = /^[A-Z]\d+$/;
        if (!versionPattern.test(newValue)) {
          message.error('版本格式错误，请输入大写字母+非负整数，如: A1, B2, C45');
          return false;
        }
        params.data.versionAfterUpgrade = newValue;
        return true;
      }
    },
    // === 变更后文件 ===
    {
      field: 'changeAfterFile',
      headerName: '变更后文件',
      width: 200,
      cellRenderer: (params: ICellRendererParams) => {
        const rowId = params.data?.rowId;
        const isUpgradeRequired = params.data?.isUpgradeRequired === true;
        const currentRow = documentItems.find(item => item.rowId === rowId);
        const currentFiles = currentRow?.changeAfterFile || [];

        // 如果未勾选升级版本，显示禁用状态
        if (!isUpgradeRequired) {
          return (
            <div style={{ color: '#999', padding: '4px 0' }}>
              <span>请先勾选'是否升级版本'</span>
            </div>
          );
        }

        return (
          <div onClick={(e) => e.stopPropagation()}>
            <FileUploadWithChunks
              inline
              maxCount={1}
              hidePercent={true}
              value={currentFiles}
              onChange={(fileList: any[]) => {
                const newItems = documentItems.map(item => {
                  if (item.rowId === rowId) {
                    return {
                      ...item,
                      changeAfterFile: fileList,
                    };
                  }
                  return item;
                });

                setDocumentItems(newItems);
              }}
            />
          </div>
        );
      },
      cellStyle: (params: any) => ({
        backgroundColor: params.data?.isUpgradeRequired ? '#fff7e6' : '#f5f5f5'
      })
    },
    // === 库存处理信息 ===
    {
      field: 'internalStorage',
      headerName: '内部库存',
      width: 120,
      editable: true,
      cellEditor: 'agTextCellEditor',
      cellStyle: { backgroundColor: '#fff7e6' }
    },
    {
      field: 'externalStorage',
      headerName: '外部库存',
      width: 120,
      editable: true,
      cellEditor: 'agTextCellEditor',
      cellStyle: { backgroundColor: '#fff7e6' }
    },
    {
      field: 'productHandlingOpinion',
      headerName: '制品处理意见',
      width: 150,
      editable: true,
      cellEditor: 'agLargeTextCellEditor',
      cellEditorPopup: true,
      cellStyle: { backgroundColor: '#fff7e6' }
    },
    // === 其他信息 ===
    {
      field: 'relatedOrderNumber',
      headerName: '关联单号',
      width: 150,
      editable: true,
      cellEditor: 'agTextCellEditor',
      cellStyle: { backgroundColor: '#fff7e6' }
    },
    {
      field: 'changeAfterDescription',
      headerName: '更改说明',
      width: 200,
      editable: true,
      cellEditor: 'agLargeTextCellEditor',
      cellEditorPopup: true,
      cellStyle: { backgroundColor: '#fff7e6' }
    },
    // === 操作列 ===
    {
      field: 'action',
      headerName: '操作',
      width: 80,
      pinned: 'right',
      cellRenderer: (params: ICellRendererParams) => (
        <Button
          size="small"
          type="link"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDeleteRow(params.data.rowId)}
        >
          删除
        </Button>
      ),
    },
  ], [documentItems]);

  return (
    <Spin spinning={loading}>
      <Card
        headStyle={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: '#fff',
        }}
        title={isEdit ? '编辑文档变更单' : '新建文档变更单'}
        extra={
          <ToolBar>
            <Button icon={<ArrowLeftOutlined />} onClick={() => handleBack()}>
              返回
            </Button>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              loading={submitting}
              onClick={handleSave}
            >
              保存
            </Button>
            <Button
              type="primary"
              icon={<SendOutlined />}
              loading={submitting}
              onClick={handleSaveAndSubmit}
            >
              保存并提交
            </Button>
          </ToolBar>
        }
      >
        {/* 基本信息 */}
        <Card title="基本信息" type="inner" style={{ marginBottom: 16 }}>
          <FormProvider form={form}>
            <SchemaField schema={schema} />
          </FormProvider>
        </Card>

        {/* 文档变更明细 */}
        <Card
          title="文档变更明细"
          type="inner"
          extra={
            <Button
              type="primary"
              size="small"
              icon={<PlusOutlined />}
              onClick={handleAddDocuments}
            >
              批量添加
            </Button>
          }
        >
          <AgGridPlus
            gridRef={gridRef}
            dataSource={documentItems}
            columnDefs={detailColumnDefs}
            pagination={false}
            domLayout="autoHeight"
            toolBarRender={false}
            search={false}
            onCellValueChanged={(event: any) => {
              const updatedItems = documentItems.map(item =>
                item.rowId === event.data.rowId ? event.data : item
              );
              setDocumentItems(updatedItems);
            }}
          />
        </Card>
      </Card>

            <DocumentSelectDialog
        open={showDocumentSelect}
        title="选择文档"
        onCancel={() => setShowDocumentSelect(false)}
        onConfirm={handleDocumentSelected}
      />
    </Spin>
  );
};

export default DocumentChangeOrderFormPage;
