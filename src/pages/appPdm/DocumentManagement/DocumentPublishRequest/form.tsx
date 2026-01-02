/**
 * 文档发布申请单表单页
 * 路由: /appPdm/DocumentManagement/DocumentPublishRequest/form?id={id}
 * 新建模式：无id参数
 * 编辑模式：有id参数
 * 复制模式：copyFrom参数
 */

import React, { useEffect, useState, useMemo } from 'react';
import { Card, Button, message, Space } from 'antd';
import { SaveOutlined, SendOutlined, PlusOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { history, useSchemaField, closeTab } from 'umi';
import { useKeepAliveParams } from '@/hooks';
import { createForm } from '@formily/core';
import { FormProvider } from '@formily/react';
import { FormLayout, FormGrid } from '@formily/antd-v5';
import { ToolBar } from '@/components';
import { AgGridPlus } from '@/components/agGrid';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { ICellRendererParams } from 'ag-grid-community';
import {
  DocumentPublishRequestGetAsync,
  DocumentPublishRequestCreateAsync,
  DocumentPublishRequestUpdateAsync,
  DocumentPublishRequestSubmitAsync,
} from '@/services/pdm/DocumentPublishRequest';
import UserSelect from '@/pages/appPdm/_formWidgets/UserSelect';

import dayjs from 'dayjs';
import DocumentSelectDialog from '@/pages/appPdm/DocumentManagement/_components/DocumentSelectDialog';
import { formatVersionNumber } from '@/pages/appPdm/DocumentManagement/Document/_utils/documentStatus';
import type { ISchema } from '@formily/react';

export const routeProps = {
  name: '文档发布申请单表单',
};

// 表单布局配置
const formLayout = {
  labelCol: 6,
  wrapperCol: 18,
  labelWidth: 120,
  feedbackLayout: 'none' as const,
};

const DocumentPublishRequestFormPage: React.FC = () => {
  const { id: requestId, copyFrom: copyFromId, isActive, hasChanged } = useKeepAliveParams(
    '/appPdm/DocumentManagement/DocumentPublishRequest/form',
    ['id', 'copyFrom']
  );
  const isEdit = !!requestId;
  const isCopy = !!copyFromId;

  const SchemaField = useSchemaField({ UserSelect });
  const [submitting, setSubmitting] = useState(false);
  const [documentItems, setDocumentItems] = useState<any[]>([]);
  const [showDocumentSelect, setShowDocumentSelect] = useState(false);
  const gridRef = React.useRef<GridRef>();

  // 直接定义表单 Schema
  const schema: ISchema = useMemo(() => ({
    type: 'object',
    properties: {
      grid: {
        type: 'void',
        'x-component': 'FormGrid',
        'x-component-props': {
          minColumns: 2,
          maxColumns: 2,
          strictAutoFit: true,
        },
        properties: {
          // 基本信息
          colRequestNumber: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              requestNumber: {
                type: 'string',
                title: '申请单号',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': {
                  placeholder: '系统自动生成',
                  disabled: true,
                },
              },
            },
          },

          colTitle: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              title: {
                type: 'string',
                title: '申请标题',
                required: true,
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': {
                  placeholder: '请输入申请标题',
                  maxLength: 200,
                },
              },
            },
          },

          colApprover: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              approverId: {
                type: 'string',
                title: '审批人',
                required: true,
                'x-decorator': 'FormItem',
                'x-component': 'UserSelect',
                'x-component-props': {
                  placeholder: '请选择审批人',
                  labelInValue: true,
                  labelField: 'name',
                  valueField: 'userName',
                },
              },
            },
          },

          colDescription: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              description: {
                type: 'string',
                title: '描述',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': {
                  placeholder: '请输入描述信息',
                  rows: 3,
                  maxLength: 500,
                },
              },
            },
          },

          colRemark: {
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
                  placeholder: '请输入备注信息',
                  rows: 2,
                  maxLength: 500,
                },
              },
            },
          },
        },
      },
    },
  }), []);

  // 表单配置
  const formConfig = useMemo(() => ({
    labelCol: 6,
    wrapperCol: 18,
    labelWidth: 120,
  }), []);

  // 创建表单实例
  const form = useMemo(
    () => createForm({ validateFirst: true }),
    [requestId]
  );

  // 加载初始数据
  useEffect(() => {
    if (!isActive || !hasChanged) return;

    const loadId = requestId || copyFromId;
    if (loadId) {
      DocumentPublishRequestGetAsync({ id: loadId })
        .then((data) => {
          const initialValues: any = {
            title: data.title,
            description: data.description,
            remark: data.remark,
          };

          // 编辑模式需要包含id和requestNumber，复制模式不包含
          if (isEdit && !isCopy) {
            initialValues.id = data.id;
            initialValues.requestNumber = data.requestNumber;
          }

          // 处理审批人 - UserSelect 使用 labelInValue 格式 {value: code, label: name}
          if (data.approverCode) {
            initialValues.approverId = { value: data.approverCode, label: data.approverName };
          }

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
        });
    }
  }, [isActive, hasChanged, requestId, copyFromId, isEdit, isCopy, form]);

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
    if (!Array.isArray(selectedRows) || selectedRows.length === 0) {
      setShowDocumentSelect(false);
      return;
    }

    const newItems = selectedRows.map((doc, index) => {
      return {
        rowId: `row_${Date.now()}_${index}`,
        documentId: doc.id,
        documentNumber: doc.documentNumber,
        documentName: doc.documentName,
        documentVersion: formatVersionNumber(doc.version, doc.revision),
        documentTypeId: doc.documentTypeId,
        documentTypeName: doc.documentTypeName,
        fileName: doc.fileName,
        partNumber: doc.primaryPartLink?.partNumber || '',
        partName: doc.primaryPartLink?.partName || '',
        drawingNumber: doc.primaryPartLink?.drawingNumber || '',
      };
    });

    setDocumentItems(items => [...items, ...newItems]);
    setShowDocumentSelect(false);
  };



  // 明细列表列定义
  const detailColumnDefs = [
    { field: 'documentNumber', headerName: '文档编码', width: 150 },
    { field: 'documentName', headerName: '文档名称', width: 200 },
    { field: 'documentVersion', headerName: '文档版本', width: 100 },
    { field: 'documentTypeName', headerName: '文档类型', width: 120 },
    { field: 'fileName', headerName: '文件名称', width: 150 },
    { field: 'partNumber', headerName: '物料编码', width: 120 },
    { field: 'partName', headerName: '物料名称', width: 150 },
    { field: 'drawingNumber', headerName: '图号', width: 120 },
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

  // 保存数据(提取公共逻辑)
  const saveData = async () => {
    const values = await form.submit();

    // 验证必填字段
    if (!values.title || !values.title.trim()) {
      message.error('申请标题不能为空');
      throw new Error('申请标题不能为空');
    }

    // 验证明细列表
    if (!documentItems || documentItems.length === 0) {
      message.error('请至少添加一条文档');
      throw new Error('请至少添加一条文档');
    }



    // 构造提交数据 - 从 UserSelect labelInValue 格式中提取值
    const submitData: any = {
      title: values.title?.trim(),
      description: values.description?.trim(),
      remark: values.remark?.trim(),
      approverCode: values.approverId?.value,
      approverName: values.approverId?.label,
      items: documentItems.map(item => ({
        documentId: item.documentId,
        documentNumber: item.documentNumber,
        documentName: item.documentName,
        documentVersion: item.documentVersion,
        documentTypeId: item.documentTypeId,
        documentTypeName: item.documentTypeName,
        fileName: item.fileName,
        partNumber: item.partNumber,
        partName: item.partName,
        drawingNumber: item.drawingNumber,
      })),
    };
    let savedId: string;
    // 复制模式下总是创建新记录
    if (isEdit && !isCopy) {
      await DocumentPublishRequestUpdateAsync({ id: requestId }, submitData);
      savedId = requestId;
    } else {
      const result = await DocumentPublishRequestCreateAsync(submitData);
      savedId = result.id!;
    }

    return savedId;
  };

  // 提交表单
  const handleSubmit = async () => {
    if (submitting) return;

    try {
      setSubmitting(true);
      await saveData();
      message.success(isEdit && !isCopy ? '更新成功' : '创建成功');
      handleBack();
    } catch (error) {
      if (error instanceof Error &&
        !error.message.includes('不能为空') &&
        !error.message.includes('请至少')) {
        message.error(isEdit && !isCopy ? '更新失败' : '创建失败');
      }
    } finally {
      setSubmitting(false);
    }
  };

  // 保存并提交
  const handleSaveAndSubmit = async () => {
    if (submitting) return;

    try {
      setSubmitting(true);
      const savedId = await saveData();
      message.success(isEdit && !isCopy ? '更新成功' : '创建成功');

      // 提交审批
      await DocumentPublishRequestSubmitAsync({ id: savedId });
      message.success('提交成功');

      handleBack();
    } catch (error) {
      if (error instanceof Error &&
        !error.message.includes('不能为空') &&
        !error.message.includes('请至少')) {
        message.error('操作失败');
      }
    } finally {
      setSubmitting(false);
    }
  };

  // 返回列表
  const handleBack = () => {
    const currentPath = `${history.location.pathname}${history.location.search || ''}`;
    history.push('/appPdm/DocumentManagement/DocumentPublishRequest');
    setTimeout(() => {
      closeTab(currentPath);
    }, 150);
  };

  return (
    <div style={{ height: '100%', overflow: 'auto', padding: '16px' }}>
      {/* 表单内容 */}
      <Card
        headStyle={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: '#fff',
        }}
        title={
          isCopy
            ? '重新发起文档发布申请单'
            : isEdit
              ? '编辑文档发布申请单'
              : '新建文档发布申请单'
        }
        extra={
          <ToolBar>
            <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
              返回
            </Button>
            <Button icon={<SaveOutlined />} onClick={handleSubmit} loading={submitting}>
              保存
            </Button>
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleSaveAndSubmit}
              loading={submitting}
            >
              保存并提交
            </Button>
          </ToolBar>
        }
      >
        <FormProvider form={form}>
          <FormLayout {...formConfig}>
            <SchemaField schema={schema} />
          </FormLayout>
        </FormProvider>

        {/* 文档发布明细 */}
        <Card
          title="文档发布项"
          style={{ marginTop: 16 }}
          extra={
            <Button
              type="primary"
              size="small"
              icon={<PlusOutlined />}
              onClick={handleAddDocuments}
            >
              选择文档
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
        title="选择文档（仅显示已批准状态）"
        onCancel={() => setShowDocumentSelect(false)}
        onConfirm={handleDocumentSelected}
      />
    </div>
  );
};

export default DocumentPublishRequestFormPage;
