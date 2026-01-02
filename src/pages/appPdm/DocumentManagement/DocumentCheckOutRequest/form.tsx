/**
 * 文档检出申请表单页
 * 路由: /appPdm/DocumentManagement/DocumentCheckOutRequest/form?id={id}
 * 新建模式：无id参数
 * 编辑模式：有id参数
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
  DocumentCheckOutRequestGetAsync,
  DocumentCheckOutRequestCreateAsync,
  DocumentCheckOutRequestUpdateAsync,
  DocumentCheckOutRequestSubmitAsync,
} from '@/services/pdm/DocumentCheckOutRequest';
import UserSelect from '@/pages/appPdm/_formWidgets/UserSelect';
import { formatVersionNumber } from '@/pages/appPdm/DocumentManagement/Document/_utils/documentStatus';
import DocumentSelectDialog from '@/pages/appPdm/DocumentManagement/_components/DocumentSelectDialog';

export const routeProps = {
  name: '文档检出申请表单',
};

// 表单布局配置
const formLayout = {
  labelCol: 6,
  wrapperCol: 18,
  labelWidth: 120,
  feedbackLayout: 'none' as const,
};

const DocumentCheckOutRequestFormPage: React.FC = () => {
  const { id: requestId, isActive, hasChanged } = useKeepAliveParams(
    '/appPdm/DocumentManagement/DocumentCheckOutRequest/form',
    ['id']
  );
  const isEdit = !!requestId;

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
    [requestId]
  );

  // 加载初始数据
  useEffect(() => {
    if (!isActive || !hasChanged) return;

    if (requestId) {
      setLoading(true);
      DocumentCheckOutRequestGetAsync({ id: requestId })
        .then(data => {
          const initialValues: any = {
            id: data.id,
            // UserSelect 使用 labelInValue 格式: {value: code/id, label: name}
            // 处理人使用 processorCode 作为 value
            processorId: data.processorCode ? { value: data.processorCode, label: data.processorName } : undefined,
            // 申请检出人使用 applicantId (Guid) 作为 value
            applicantId: data.applicantId ? { value: data.applicantId, label: data.applicantName } : undefined,
            reason: data.reason,
            remark: data.remark,
          };

          form.setInitialValues(initialValues);

          // 加载明细列表
          if (data.items && data.items.length > 0) {
            setDocumentItems(data.items.map((item: any, index: number) => ({
              ...item,
              rowId: `row_${index}`,
            })));
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
  const handleBack = () => {
    const currentPath = `${history.location.pathname}${history.location.search || ''}`;
    history.push('/appPdm/DocumentManagement/DocumentCheckOutRequest');
    setTimeout(() => {
      closeTab(currentPath);
    }, 150);
  };

  // 保存数据(提取公共逻辑)
  const saveData = async () => {
    const values = await form.submit();

    // 验证必填字段 - UserSelect 使用 labelInValue 格式
    if (!values.processorId?.value || !values.processorId?.label) {
      message.error('处理人不能为空');
      throw new Error('处理人不能为空');
    }

    if (!values.applicantId?.value || !values.applicantId?.label) {
      message.error('申请检出人不能为空');
      throw new Error('申请检出人不能为空');
    }

    // 验证明细列表
    if (!documentItems || documentItems.length === 0) {
      message.error('请至少添加一条文档检出明细');
      throw new Error('请至少添加一条文档检出明细');
    }

    // 构造提交数据 - 从 labelInValue 中提取 code/id 和 name
    const submitData: any = {
      processorCode: values.processorId.value,
      processorName: values.processorId.label,
      // 申请检出人使用 applicantId (Guid)
      applicantId: values.applicantId.value,
      applicantName: values.applicantId.label,
      reason: values.reason?.trim(),
      remark: values.remark?.trim(),
      items: documentItems.map(item => ({
        id: item.id, // 编辑时需要
        documentNumber: item.documentNumber,
        documentName: item.documentName,
        documentVersion: item.documentVersion,
        documentTypeId: item.documentTypeId, // 文档类型ID（必填）
        documentTypeName: item.documentTypeName, // 文档类型名称（必填）
        fileName: item.fileName,
        partNumber: item.partNumber,
        partName: item.partName,
        drawingNumber: item.drawingNumber,
        changeOrderId: item.changeOrderId,
      })),
    };

    if (isEdit) {
      await DocumentCheckOutRequestUpdateAsync({ id: requestId }, submitData);
    } else {
      await DocumentCheckOutRequestCreateAsync(submitData);
    }
  };

  // 保存
  const handleSave = async () => {
    setSubmitting(true);
    try {
      await saveData();
      message.success('保存成功');
      handleBack();
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
        await DocumentCheckOutRequestSubmitAsync({ id: requestId });
      } else {
        // 新建时需要先保存获取ID，这里简化处理
        message.warning('请先保存后再提交审批');
        return;
      }
      message.success('提交成功');
      handleBack();
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
  const handleDocumentSelected = (selectedRows: any[]) => {
    // 确保 selectedRows 是数组
    if (!Array.isArray(selectedRows) || selectedRows.length === 0) {
      setShowDocumentSelect(false);
      return;
    }

    const newItems = selectedRows.map((doc, index) => {
      // 获取主文档名称：currentRevision.files 中的主要文档
      let mainFileName = '';
      if (doc.currentRevision?.files && Array.isArray(doc.currentRevision.files)) {
        // 查找 fileRole 为 Primary 的文件 (fileRole: 0 = Primary)
        const primaryFile = doc.currentRevision.files.find((f: any) => f.fileRole === 0);
        mainFileName = primaryFile?.fileName || (doc.currentRevision.files[0]?.fileName || '');
      }

      // 获取主要关联物料信息：primaryPartLink
      let partNumber = '';
      let partName = '';
      let drawingNumber = '';
      if (doc.primaryPartLink) {
        partNumber = doc.primaryPartLink.partNumber || '';
        partName = doc.primaryPartLink.partName || '';
        drawingNumber = doc.primaryPartLink.drawingNumber || '';
      }

      return {
        rowId: `row_${Date.now()}_${index}`,
        documentNumber: doc.documentNumber,
        documentName: doc.documentName,
        documentVersion: formatVersionNumber(doc.version, doc.revision),
        documentTypeId: doc.documentTypeId, // 文档类型ID（必填）
        documentTypeName: doc.documentTypeName, // 文档类型名称（必填）
        fileName: mainFileName, // 主文档名称
        partNumber: partNumber, // 主要关联物料编码
        partName: partName, // 主要关联物料名称
        drawingNumber: drawingNumber, // 图号
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
                    title: '申请检出人',
                    required: true,
                    'x-decorator': 'FormItem',
                    'x-component': 'UserSelect',
                    'x-component-props': {
                      placeholder: '请选择申请检出人',
                      labelInValue: true,
                      labelField: 'name',
                      valueField: 'id',  // 申请检出人使用 id (Guid) 作为 value
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

  // 明细列表列定义
  const detailColumnDefs = [
    { field: 'documentNumber', headerName: '文档编码', width: 150 },
    { field: 'documentName', headerName: '文档名称', width: 200 },
    { field: 'documentVersion', headerName: '文档版本', width: 100 },
    { field: 'documentTypeName', headerName: '文档类型', width: 120 },
    { field: 'fileName', headerName: '文件名称', width: 200 },
    { field: 'partNumber', headerName: '物料编码', width: 150 },
    { field: 'partName', headerName: '物料名称', width: 180 },
    { field: 'drawingNumber', headerName: '图号', width: 150 },
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
  ];

  return (
    <Spin spinning={loading}>
      <Card
        headStyle={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: '#fff',
        }}
        title={isEdit ? '编辑文档检出申请' : '新建文档检出申请'}
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
          title="文档检出明细"
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

export default DocumentCheckOutRequestFormPage;
