/**
 * 文档检入申请表单页
 * 路由: /appPdm/DocumentManagement/DocumentCheckInRequest/form?id={id}
 * 新建模式：无id参数
 * 编辑模式：有id参数
 */

import React, { useEffect, useState } from 'react';
import { Card, Button, Space, message, Spin, Upload, Select } from 'antd';
import { ArrowLeftOutlined, SaveOutlined, SendOutlined, PlusOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
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
  DocumentCheckInRequestGetAsync,
  DocumentCheckInRequestCreateAsync,
  DocumentCheckInRequestUpdateAsync,
  DocumentCheckInRequestSubmitAsync,
  DocumentCheckInRequestValidateBatchCheckInAsync,
} from '@/services/pdm/DocumentCheckInRequest';
import { DocumentChangeOrderGetListAsync } from '@/services/pdm/DocumentChangeOrder';
import EngineeringChangeOrderSelect from '@/pages/appPdm/_formWidgets/EngineeringChangeOrderSelect';
import UserSelect from '@/pages/appPdm/_formWidgets/UserSelect';
import FileUploadWithChunks from '@/pages/appPdm/DocumentManagement/Document/components/FileUploadWithChunks';
import DocumentSelectDialog from '@/pages/appPdm/DocumentManagement/_components/DocumentSelectDialog';

export const routeProps = {
  name: '文档检入申请表单',
};

// 表单布局配置
const formLayout = {
  labelCol: 6,
  wrapperCol: 18,
  labelWidth: 120,
  feedbackLayout: 'none' as const,
};

const DocumentCheckInRequestFormPage: React.FC = () => {
  const { id: requestId, isActive, hasChanged } = useKeepAliveParams(
    '/appPdm/DocumentManagement/DocumentCheckInRequest/form',
    ['id']
  );
  const isEdit = !!requestId;

  const SchemaField = useSchemaField({
    EngineeringChangeOrderSelect,
    UserSelect,
  });

  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [documentItems, setDocumentItems] = useState<any[]>([]);
  const [showDocumentSelect, setShowDocumentSelect] = useState(false);
  const [changeOrderOptions, setChangeOrderOptions] = useState<any[]>([]);
  const [changeOrderLoading, setChangeOrderLoading] = useState(false);
  const gridRef = React.useRef<GridRef>();

  // 创建表单实例
  const form = React.useMemo(
    () => createForm({ validateFirst: true }),
    [requestId]
  );

  // 加载变更单选项数据(只加载一次)
  useEffect(() => {
    setChangeOrderLoading(true);
    DocumentChangeOrderGetListAsync({
      MaxResultCount: 1000,
    })
      .then(res => {
        if (res.items) {
          const opts = res.items.map(item => ({
            label: `${item.changeOrderNumber} - ${item.changeOrderTitle || ''}`,
            value: item.id,
            changeOrderNumber: item.changeOrderNumber,
            changeOrderTitle: item.changeOrderTitle,
          }));
          setChangeOrderOptions(opts);
        }
      })
      .catch(() => {
        message.error('加载变更单列表失败');
      })
      .finally(() => {
        setChangeOrderLoading(false);
      });
  }, []);

  // 加载初始数据
  useEffect(() => {
    if (!isActive || !hasChanged) return;

    if (requestId) {
      setLoading(true);
      DocumentCheckInRequestGetAsync({ id: requestId })
        .then(data => {
          const initialValues: any = {
            id: data.id,
            // UserSelect 使用 labelInValue 格式: {value: code/id, label: name}
            // 处理人使用 processorCode 作为 value
            processorId: data.processorCode ? { value: data.processorCode, label: data.processorName } : undefined,
            // 申请检入人使用 applicantId (Guid) 作为 value
            applicantId: data.applicantId ? { value: data.applicantId, label: data.applicantName } : undefined,
            reason: data.reason,
            remark: data.remark,
          };

          form.setInitialValues(initialValues);

          // 加载明细列表
          if (data.items && data.items.length > 0) {
            setDocumentItems(data.items.map((item: any, index: number) => {
              // 如果存在变更后的文件信息,构造文件对象
              const afterFile = item.afterFileBlobName ? [{
                uid: `file_${index}`,
                name: item.afterFileBlobName,
                fileName: item.afterFileBlobName,
                blobName: item.afterFileBlobName,
                uploadId: item.afterFileBlobName,
                size: item.afterFileSize,
                status: 'done',
              }] : [];

              return {
                ...item,
                rowId: `row_${index}`,
                afterFile,
                // 映射后端字段名到前端使用的字段名
                afterDocumentDescription: item.afterDescription,
                beforeDocumentDescription: item.beforeDescription,
                // 映射物料字段
                beforePartNumber: item.partNumber,
                beforePartName: item.partName,
                beforeDrawingNumber: item.drawingNumber,
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
  }, [isActive, hasChanged, requestId, form]);

  // 返回列表
  const handleBack = (needRefresh: boolean = false) => {
    const currentPath = `${history.location.pathname}${history.location.search || ''}`;
    const targetPath = needRefresh
      ? '/appPdm/DocumentManagement/DocumentCheckInRequest?refresh=true'
      : '/appPdm/DocumentManagement/DocumentCheckInRequest';
    history.push(targetPath);
    setTimeout(() => {
      closeTab(currentPath);
    }, 150);
  };

  // 保存数据(提取公共逻辑)
  const saveData = async () => {
    // 获取最新的表格数据，解决编辑未停止或状态未更新的问题
    gridRef.current?.api?.stopEditing();
    const currentItems: any[] = [];
    gridRef.current?.api?.forEachNode((node: any) => {
      if (node.data) {
        currentItems.push(node.data);
      }
    });

    // 如果表格数据为空(异常情况),降级使用state中的数据
    const itemsToSubmitSource = currentItems.length > 0 ? currentItems : documentItems;
    const values = await form.submit();

    // 验证必填字段 - UserSelect 使用 labelInValue 格式
    if (!values.processorId?.value || !values.processorId?.label) {
      message.error('处理人不能为空');
      throw new Error('处理人不能为空');
    }

    if (!values.applicantId?.value || !values.applicantId?.label) {
      message.error('申请检入人不能为空');
      throw new Error('申请检入人不能为空');
    }

    // 验证明细列表
    if (!itemsToSubmitSource || itemsToSubmitSource.length === 0) {
      message.error('请至少添加一条文档检入明细');
      throw new Error('请至少添加一条文档检入明细');
    }

    // 验证每个明细项的必填字段
    for (let i = 0; i < itemsToSubmitSource.length; i++) {
      const item = itemsToSubmitSource[i];
      // 只有勾选了升级版本时，才验证版本号和文件
      if (item.isVersionUpgrade) {
        if (!item.afterVersion) {
          message.error(`第${i + 1}行: 变更后文档版本不能为空`);
          throw new Error('检入明细中的变更后文档版本不能为空');
        }

        // 检查文件是否上传
        const afterFile = item.afterFile || [];
        if (afterFile.length === 0 || !afterFile[0]) {
          message.error(`第${i + 1}行: 请上传变更后文件`);
          throw new Error('检入明细中的变更后文件不能为空');
        }

        const uploadedFile = afterFile[0];

        // 检查文件上传状态
        if (uploadedFile.status === 'uploading') {
          message.error(`第${i + 1}行: 文件正在上传中,请等待上传完成后再提交`);
          throw new Error('检入明细中有文件正在上传');
        }

        if (uploadedFile.status === 'error') {
          message.error(`第${i + 1}行: 文件上传失败,请重新上传`);
          throw new Error('检入明细中有文件上传失败');
        }

        // 检查是否有 uploadId (参考批量上传的验证方式)
        if (!uploadedFile.uploadId) {
          message.error(`第${i + 1}行: 文件未上传完成或上传ID缺失,请重新上传`);
          throw new Error('检入明细中的文件上传ID缺失');
        }
      }
    }

    // 构造提交数据 - 从 labelInValue 中提取 code/id 和 name
    const submitData: any = {
      processorCode: values.processorId.value,
      processorName: values.processorId.label,
      // 申请检入人使用 applicantId (Guid)
      applicantId: values.applicantId.value,
      applicantName: values.applicantId.label,
      reason: values.reason?.trim(),
      remark: values.remark?.trim(),
      items: itemsToSubmitSource.map(item => {
        // 参考批量上传的文件处理方式
        const afterFile = item.afterFile || [];
        const afterFileUploadId = afterFile.length > 0 && afterFile[0]?.uploadId
          ? afterFile[0].uploadId
          : undefined;
        const afterFileBlobName = afterFile.length > 0 && afterFile[0]?.uploadId ? afterFile[0].uploadId : undefined;
        const afterFileName = afterFile.length > 0 ? (afterFile[0]?.fileName || afterFile[0]?.name) : undefined;

        return {
          id: item.id, // 编辑时需要
          beforeDocumentNumber: item.beforeDocumentNumber,
          beforeDocumentName: item.beforeDocumentName,
          beforeDescription: item.beforeDocumentDescription, // 映射到后端DTO字段名
          beforeDocumentVersion: item.beforeDocumentVersion,
          beforeFileName: item.beforeFileName,
          afterDocumentName: item.afterDocumentName,
          afterDescription: item.afterDocumentDescription, // 映射到后端DTO字段名
          afterVersion: item.afterVersion,
          afterFileName: afterFileName,
          afterFileUploadId: afterFileUploadId,
          partNumber: item.afterPartNumber || item.beforePartNumber,
          partName: item.afterPartName || item.beforePartName,
          drawingNumber: item.afterDrawingNumber || item.beforeDrawingNumber,
          changeOrderId: item.changeOrderId || null, // 空字符串转为null，符合后端Guid?类型
          changeOrderNumber: item.changeOrderNumber,
          modificationDescription: item.modificationDescription,
          isVersionUpgrade: item.isVersionUpgrade ?? false, // 是否升级版本
        };
      }),
    };

    if (isEdit) {
      await DocumentCheckInRequestUpdateAsync({ id: requestId }, submitData);
    } else {
      await DocumentCheckInRequestCreateAsync(submitData);
    }
  };

  // 保存
  const handleSave = async () => {
    setSubmitting(true);
    try {
      await saveData();
      message.success('保存成功');
      handleBack(true); // 保存成功后刷新列表
    } catch (error: any) {
      // 错误信息已在 saveData 中处理
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
      // 保存成功后提交
      if (isEdit) {
        await DocumentCheckInRequestSubmitAsync({ id: requestId });
      } else {
        // 新建时需要先保存获取ID，这里简化处理
        message.warning('请先保存后再提交审批');
        return;
      }
      message.success('提交成功');
      handleBack(true); // 提交成功后刷新列表
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

  // 添加文档
  const handleAddDocuments = () => {
    setShowDocumentSelect(true);
  };

  // 从文档列表选择完成
  const handleDocumentSelected = async (selectedRows: any[]) => {
    // 验证选中的文档是否可以检入
    const documentNumbers = selectedRows.map(doc => doc.documentNumber);

    try {
      const validationResult = await DocumentCheckInRequestValidateBatchCheckInAsync({
        documentNumbers,
      });

      // 过滤出验证成功的文档
      const successDocNumbers = validationResult.successDocuments || [];
      const validDocs = selectedRows.filter(doc =>
        successDocNumbers.includes(doc.documentNumber)
      );

      if (validDocs.length === 0) {
        message.error('所选文档都无法检入，请选择已检出的文档');
        return;
      }

      if (validDocs.length < selectedRows.length) {
        message.warning(`${selectedRows.length - validDocs.length}个文档无法检入，已自动过滤`);
      }

      const newItems = validDocs.map((doc, index) => {
        // 获取主文档名称
        let mainFileName = '';
        if (doc.currentRevision?.files && Array.isArray(doc.currentRevision.files)) {
          const primaryFile = doc.currentRevision.files.find((f: any) => f.fileRole === 0);
          mainFileName = primaryFile?.fileName || (doc.currentRevision.files[0]?.fileName || '');
        }

        // 从主关联物料获取信息
        const partNumber = doc.primaryPartLink?.partNumber || '';
        const partName = doc.primaryPartLink?.partName || '';
        const drawingNumber = doc.primaryPartLink?.drawingNumber || '';

        return {
          rowId: `row_${Date.now()}_${index}`,
          beforeDocumentNumber: doc.documentNumber,
          beforeDocumentName: doc.documentName,
          beforeDocumentDescription: doc.description || '', // 文档描述
          beforeDocumentVersion: doc.version + doc.revision,
          beforeFileName: mainFileName,
          beforeFileType: doc.documentTypeName,
          beforePartNumber: partNumber,
          beforePartName: partName,
          beforeDrawingNumber: drawingNumber,
          // 变更后的信息需要用户填写
          afterDocumentNumber: doc.documentNumber, // 变更后文档编码与变更前相同
          afterDocumentName: doc.documentName, // 默认使用原名称
          afterDocumentDescription: doc.description || '', // 默认使用原描述
          isVersionUpgrade: false, // 默认不升级版本
          afterVersion: doc.version + doc.revision, // 需要用户填写新版本
          afterPartNumber: partNumber,
          afterPartName: partName,
          afterDrawingNumber: drawingNumber,
          changeOrderId: '', // 需要用户选择变更单
          modificationDescription: '',
        };
      });

      setDocumentItems(items => [...items, ...newItems]);
      setShowDocumentSelect(false);
    } catch (error) {
      message.error('验证文档失败');
    }
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
                  processorId: {
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
                  },
                },
              },
              col1a: {
                type: 'void',
                'x-component': 'FormGrid.GridColumn',
                'x-component-props': { gridSpan: 1 },
                properties: {
                  applicantId: {
                    type: 'string',
                    title: '申请检入人',
                    required: true,
                    'x-decorator': 'FormItem',
                    'x-component': 'UserSelect',
                    'x-component-props': {
                      placeholder: '请选择申请检入人',
                      labelInValue: true,
                      labelField: 'name',
                      valueField: 'id',  // 申请检入人使用 id (Guid) 作为 value
                    },
                  },
                },
              },
              col2: {
                type: 'void',
                'x-component': 'FormGrid.GridColumn',
                'x-component-props': { gridSpan: 2 },
                properties: {
                  reason: {
                    type: 'string',
                    title: '申请原因',
                    'x-decorator': 'FormItem',
                    'x-component': 'Input.TextArea',
                    'x-component-props': {
                      placeholder: '请输入申请原因',
                      rows: 2,
                    },
                  },
                },
              },
              col3: {
                type: 'void',
                'x-component': 'FormGrid.GridColumn',
                'x-component-props': { gridSpan: 2 },
                properties: {
                  remark: {
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

  // 明细列表列定义 - 使用useMemo确保响应状态变化
  const detailColumnDefs = React.useMemo(() => [
    { field: 'beforeDocumentNumber', headerName: '文档编码', width: 150 },
    { field: 'beforeDocumentName', headerName: '变更前文档名称', width: 150 },
    { field: 'beforeDocumentDescription', headerName: '变更前文档描述', width: 200 },
    { field: 'beforeDocumentVersion', headerName: '变更前文档版本', width: 120 },
    { field: 'beforeFileName', headerName: '变更前文件', width: 150 },
    { field: 'beforePartNumber', headerName: '物料编码', width: 120 },
    { field: 'beforePartName', headerName: '物料描述', width: 150 },
    { field: 'beforeDrawingNumber', headerName: '物料图号', width: 120 },
    {
      field: 'afterDocumentName',
      headerName: '变更后文档名称',
      width: 150,
      editable: true,
      cellEditor: 'agTextCellEditor',
    },
    {
      field: 'afterDocumentDescription',
      headerName: '变更后文档描述',
      width: 200,
      editable: true,
      cellEditor: 'agTextCellEditor',
    },
    {
      field: 'isVersionUpgrade',
      headerName: '是否升级版本',
      width: 120,
      editable: true,
      cellEditor: 'agCheckboxCellEditor',
      cellRenderer: (params: any) => params.value ? '是' : '否'
    },
    {
      field: 'afterVersion',
      headerName: '变更后文档版本',
      width: 120,
      editable: (params: any) => params.data?.isVersionUpgrade === true,
      cellEditor: 'agTextCellEditor',
      cellStyle: (params: any) => ({
        backgroundColor: params.data?.isVersionUpgrade ? '#fff7e6' : '#f5f5f5',
        color: params.data?.isVersionUpgrade ? 'inherit' : '#999'
      })
    },
    {
      field: 'afterFile',
      headerName: '变更后文件',
      width: 200,
      cellRenderer: (params: ICellRendererParams) => {
        const rowId = params.data?.rowId;
        const isVersionUpgrade = params.data?.isVersionUpgrade === true;
        // 从 documentItems 状态中获取最新的文件列表，而不是从 params.data
        const currentRow = documentItems.find(item => item.rowId === rowId);
        const currentFiles = currentRow?.afterFile || [];

        // 如果未勾选升级版本，显示禁用状态
        if (!isVersionUpgrade) {
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
                // 参考批量上传的文件处理方式
                // FileUploadWithChunks 会在上传完成后自动设置 uploadId 到文件对象中
                const newItems = documentItems.map(item => {
                  if (item.rowId === rowId) {
                    return {
                      ...item,
                      afterFile: fileList,
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
        backgroundColor: params.data?.isVersionUpgrade ? '#fff7e6' : '#f5f5f5'
      })
    },
    {
      field: 'modificationDescription',
      headerName: '修改内容',
      width: 200,
      editable: true,
      cellEditor: 'agLargeTextCellEditor',
      cellEditorPopup: true,
      cellStyle: { backgroundColor: '#fff7e6' } // 必填项高亮
    },
    {
      field: 'changeOrderNumber',
      headerName: '关联变更单号',
      width: 150,
      cellRenderer: (params: ICellRendererParams) => {
        return (
          <Select
            allowClear
            showSearch
            loading={changeOrderLoading}
            placeholder="请选择变更单"
            value={params.data?.changeOrderId}
            options={changeOrderOptions}
            onChange={(value: string, option: any) => {
              const items = documentItems.map(item =>
                item.rowId === params.data.rowId
                  ? { ...item, changeOrderId: value, changeOrderNumber: option?.changeOrderNumber || value }
                  : item
              );
              setDocumentItems(items);
            }}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            style={{ width: '100%' }}
            size="small"
          />
        );
      },
      cellStyle: { backgroundColor: '#fff7e6' } // 必填项高亮
    },
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
  ], [documentItems]); // 依赖 documentItems 确保数据更新时重新渲染

  return (
    <Spin spinning={loading}>
      <Card
        headStyle={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: '#fff',
        }}
        title={isEdit ? '编辑文档检入申请' : '新建文档检入申请'}
        extra={
          <ToolBar>
            <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
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
        <FormProvider form={form}>
          <SchemaField schema={schema} />
        </FormProvider>

        <Card
          title="文档检入明细"
          style={{ marginTop: 16 }}
          extra={
            <Button
              type="primary"
              size="small"
              icon={<PlusOutlined />}
              onClick={handleAddDocuments}
            >
              添加文档
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
              // 单元格值改变时更新documentItems
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
        filter="CheckOutInfo != null"
        onCancel={() => setShowDocumentSelect(false)}
        onConfirm={handleDocumentSelected}
      />
    </Spin>
  );
};

export default DocumentCheckInRequestFormPage;
