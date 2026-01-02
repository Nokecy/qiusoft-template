/**
 * 技术图纸更改单详情页
 */

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Card, Button, message, Spin, Tag, Space } from 'antd';
import { ArrowLeftOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { history, closeTab, Access, useAccess, useSchemaField } from 'umi';
import { useKeepAliveParams } from '@/hooks';
import { createForm } from '@formily/core';
import { FormProvider } from '@formily/react';
import { FormLayout } from '@formily/antd-v5';
import type { ISchema } from '@formily/json-schema';
import { ToolBar } from '@/components';
import { AgGridPlus } from '@/components/agGrid';
import { GridRef } from '@nokecy/qc-ui/dist/esm/ag-grid-plus/interface';
import { PartDocumentChangeOrderGetAsync, PartDocumentChangeOrderCloseAsync } from '@/services/pdm/PartDocumentChangeOrder';
import WorkflowExecutionCorrelationList from '@/pages/appWorkflow/_utils/workflowExecutionCorrelationList';
import WorkflowInstanceInfo from '@/pages/appWorkflow/_utils/workflowInstanceInfo';
import { PartDocumentChangeOrderPermissions } from '@/pages/appPdm/_permissions';
import { partDocumentChangeOrderStatusEnum, PartDocumentChangeOrderStatus } from './_enums';
import DeleteConfirm from '@/components/deleteConfirm';
import dayjs from 'dayjs';

export const routeProps = {
  name: '技术图纸更改详情',
};

// 表单布局配置
const formLayout = {
  labelCol: 6,
  wrapperCol: 18,
  labelWidth: 120,
  feedbackLayout: 'none' as const,
};

const PartDocumentChangeOrderDetailPage: React.FC = () => {
  const { params, isActive } = useKeepAliveParams('/appPdm/DocumentManagement/PartDocumentChangeOrder/detail');
  const recordId = params.id as string;
  const access = useAccess();
  const SchemaField = useSchemaField({});

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.BurnAbpPdmDocumentManagementPartDocumentChangeOrdersPartDocumentChangeOrderDto | null>(null);

  const canClose = !!(access && (access[PartDocumentChangeOrderPermissions.Close] ?? true));

  // Grids Referneces
  const itemsGridRef = React.useRef<GridRef>();
  const notesGridRef = React.useRef<GridRef>();
  const implementItemsGridRef = React.useRef<GridRef>();

  // 创建只读表单实例
  const form = useMemo(() => createForm({ readPretty: true }), []);

  // 加载详情数据
  const loadDetail = useCallback(async () => {
    // 如果页面不处于激活状态，不执行加载
    if (!isActive) return;

    if (!recordId) {
      message.error('参数缺失');
      history.push('/appPdm/DocumentManagement/PartDocumentChangeOrder');
      return;
    }

    setLoading(true);
    try {
      const result = await PartDocumentChangeOrderGetAsync({ id: recordId });
      setData(result);

      const initialValues: any = {
        number: result.number || '-',
        // status handled via component
        partNo: result.partNo || '-',
        productLine: result.productLine || '-',
        orderType: result.orderType || '-',
        outsideAttribute: result.outsideAttribute || '-',
        customerChangeNo: result.customerChangeNo || '-',
        effectiveDate: result.effectiveDate ? dayjs(result.effectiveDate).format('YYYY-MM-DD') : '-',
        assignDate: result.assignDate ? dayjs(result.assignDate).format('YYYY-MM-DD') : '-',
        engineer: result.engineer || '-',
        creationTime: result.creationTime ? `创建于 ${dayjs(result.creationTime).format('YYYY-MM-DD HH:mm')}` : '-',
        lastModificationTime: result.lastModificationTime ? dayjs(result.lastModificationTime).format('YYYY-MM-DD HH:mm') : '-',
        changeRemark: result.changeRemark || '-',

        docNo: result.docNo || '-',
        docName: result.docName || '-',
        docVersion: result.docVersion || '-',
        docType: result.docType || '-',
        category: result.category || '-',
        categoryPath: result.categoryPath || '-',
        allowDifferent: result.allowDifferent ? '是' : '否',
        fileCategory: result.fileCategory || '-',

        materielQuantity: result.materielQuantity || '-',
        materielPurchasePeriod: result.materielPurchasePeriod || '-',
        inTransitQuantity: result.inTransitQuantity || '-',
        newMaterielPurchasePeriod: result.newMaterielPurchasePeriod || '-',

        assigneeName: result.assigneeName || '-',
        activityDisplayName: result.activityDisplayName || '-',
        workflowName: result.workflowName || '-',
        activityName: result.activityName || '-',
      };
      form.setInitialValues(initialValues);

    } catch (error) {
      message.error('加载失败');
    } finally {
      setLoading(false);
    }
  }, [recordId, form, isActive]);

  useEffect(() => {
    loadDetail();
  }, [loadDetail]);

  // 返回列表
  const handleBack = () => {
    const currentPath = window.location.pathname;
    history.push('/appPdm/DocumentManagement/PartDocumentChangeOrder');
    setTimeout(() => {
      closeTab(currentPath);
    }, 150);
  };

  // 关闭更改单
  const handleClose = async () => {
    const hide = message.loading('正在关闭...', 0);
    try {
      await PartDocumentChangeOrderCloseAsync({
        id: recordId,
      } as any);
      message.success('关闭成功');
      loadDetail();
    } catch (error) {
      message.error('关闭失败');
    } finally {
      hide();
    }
  };

  // 获取状态标签
  const getStatusTag = (status?: number) => {
    if (status === undefined) return '-';
    const statusItem = partDocumentChangeOrderStatusEnum.find(item => item.value === status);
    return statusItem ? <Tag color={statusItem.color}>{statusItem.label}</Tag> : '-';
  };

  // 判断是否可以关闭
  const isInProgress = data?.orderStatus === PartDocumentChangeOrderStatus.InProgress;
  const isCompleted = data?.orderStatus === PartDocumentChangeOrderStatus.Completed;

  // 表单 Schema 定义
  const schema: ISchema = useMemo(() => {
    return {
      type: 'object',
      properties: {
        grid: {
          type: 'void',
          'x-component': 'FormGrid',
          'x-component-props': { maxColumns: 4, strictAutoFit: true },
          properties: {
            // 基本信息
            dividerBasic: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 4 },
              properties: {
                divider: {
                  type: 'void',
                  'x-component': 'FormDivider',
                  'x-component-props': {
                    orientation: 'left',
                    children: '基本信息',
                  },
                },
              },
            },
            col_number: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                number: { type: 'string', title: '更改单号', 'x-decorator': 'FormItem', 'x-component': 'Input' },
              },
            },
            col_status: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                status: {
                  type: 'void',
                  title: '状态',
                  'x-decorator': 'FormItem',
                  'x-component': 'PreviewText',
                  'x-content': data ? getStatusTag(data.orderStatus) : '-',
                }
              }
            },
            col_partNo: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                partNo: { type: 'string', title: '物料编号', 'x-decorator': 'FormItem', 'x-component': 'Input' },
              },
            },
            col_productLine: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                productLine: { type: 'string', title: '产品线', 'x-decorator': 'FormItem', 'x-component': 'Input' },
              },
            },
            col_orderType: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                orderType: { type: 'string', title: '更改类型', 'x-decorator': 'FormItem', 'x-component': 'Input' },
              },
            },
            col_outsideAttribute: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                outsideAttribute: { type: 'string', title: '外部属性', 'x-decorator': 'FormItem', 'x-component': 'Input' },
              },
            },
            col_customerChangeNo: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                customerChangeNo: { type: 'string', title: '客户变更号', 'x-decorator': 'FormItem', 'x-component': 'Input' },
              },
            },
            col_effectiveDate: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                effectiveDate: { type: 'string', title: '生效日期', 'x-decorator': 'FormItem', 'x-component': 'Input' },
              },
            },
            col_assignDate: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                assignDate: { type: 'string', title: '分配日期', 'x-decorator': 'FormItem', 'x-component': 'Input' },
              },
            },
            col_engineer: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                engineer: { type: 'string', title: '工程师', 'x-decorator': 'FormItem', 'x-component': 'Input' },
              },
            },
            col_creationTime: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                creationTime: { type: 'string', title: '创建人', 'x-decorator': 'FormItem', 'x-component': 'Input' },
              },
            },
            col_lastModificationTime: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                lastModificationTime: { type: 'string', title: '最后修改', 'x-decorator': 'FormItem', 'x-component': 'Input' },
              },
            },
            col_changeRemark: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 4 },
              properties: {
                changeRemark: {
                  type: 'string',
                  title: '变更备注',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input.TextArea',
                  'x-component-props': { rows: 2 },
                },
              },
            },

            // 文档信息
            dividerDoc: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 4 },
              properties: {
                divider: {
                  type: 'void',
                  'x-component': 'FormDivider',
                  'x-component-props': {
                    orientation: 'left',
                    children: '文档信息',
                    style: { marginTop: 5, marginBottom: 5 },
                  },
                },
              },
            },
            col_docNo: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                docNo: { type: 'string', title: '文档编号', 'x-decorator': 'FormItem', 'x-component': 'Input' },
              },
            },
            col_docName: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                docName: { type: 'string', title: '文档名称', 'x-decorator': 'FormItem', 'x-component': 'Input' },
              },
            },
            col_docVersion: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                docVersion: { type: 'string', title: '文档版本', 'x-decorator': 'FormItem', 'x-component': 'Input' },
              },
            },
            col_docType: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                docType: { type: 'string', title: '文档类型', 'x-decorator': 'FormItem', 'x-component': 'Input' },
              },
            },
            col_category: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                category: { type: 'string', title: '分类', 'x-decorator': 'FormItem', 'x-component': 'Input' },
              },
            },
            col_categoryPath: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                categoryPath: { type: 'string', title: '分类路径', 'x-decorator': 'FormItem', 'x-component': 'Input' },
              },
            },
            col_allowDifferent: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                allowDifferent: { type: 'string', title: '允许差异', 'x-decorator': 'FormItem', 'x-component': 'Input' },
              },
            },
            col_fileCategory: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                fileCategory: { type: 'string', title: '文件类别', 'x-decorator': 'FormItem', 'x-component': 'Input' },
              },
            },

            // 物料信息
            dividerMaterial: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 4 },
              properties: {
                divider: {
                  type: 'void',
                  'x-component': 'FormDivider',
                  'x-component-props': {
                    orientation: 'left',
                    children: '物料信息',
                    style: { marginTop: 5, marginBottom: 5 },
                  },
                },
              },
            },
            col_materielQuantity: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                materielQuantity: { type: 'string', title: '物料数量', 'x-decorator': 'FormItem', 'x-component': 'Input' },
              },
            },
            col_materielPurchasePeriod: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                materielPurchasePeriod: { type: 'string', title: '物料采购周期', 'x-decorator': 'FormItem', 'x-component': 'Input' },
              },
            },
            col_inTransitQuantity: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                inTransitQuantity: { type: 'string', title: '在途数量', 'x-decorator': 'FormItem', 'x-component': 'Input' },
              },
            },
            col_newMaterielPurchasePeriod: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                newMaterielPurchasePeriod: { type: 'string', title: '新物料采购周期', 'x-decorator': 'FormItem', 'x-component': 'Input' },
              },
            },

            // 工作流信息
            dividerWorkflow: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 4 },
              properties: {
                divider: {
                  type: 'void',
                  'x-component': 'FormDivider',
                  'x-component-props': {
                    orientation: 'left',
                    children: '工作流信息',
                    style: { marginTop: 5, marginBottom: 5 },
                  },
                },
              },
            },
            col_assigneeName: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                assigneeName: { type: 'string', title: '当前审批人', 'x-decorator': 'FormItem', 'x-component': 'Input' },
              },
            },
            col_activityDisplayName: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                activityDisplayName: { type: 'string', title: '当前节点', 'x-decorator': 'FormItem', 'x-component': 'Input' },
              },
            },
            col_workflowName: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                workflowName: { type: 'string', title: '工作流名称', 'x-decorator': 'FormItem', 'x-component': 'Input' },
              },
            },
            col_activityName: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                activityName: { type: 'string', title: '活动名称', 'x-decorator': 'FormItem', 'x-component': 'Input' },
              },
            },
          },
        },
      },
    };
  }, [data]);

  // 列定义
  const itemsColumns = [
    { title: '序号', width: 80, cellRenderer: (params: any) => params.node.rowIndex + 1 },
    { field: 'content', headerName: '更改内容', flex: 1 },
  ];

  const notesColumns = [
    { field: 'order', headerName: '序号', width: 80 },
    { field: 'note', headerName: '注释内容', flex: 1 },
  ];

  const implementItemsColumns = [
    { field: 'department', headerName: '部门', width: 150 },
    { field: 'content', headerName: '内容', flex: 1 },
    { field: 'result', headerName: '结果', width: 150 },
    { field: 'signature', headerName: '签名', width: 150 },
  ];

  return (
    <div style={{ height: '100%', overflow: 'auto', padding: '16px' }}>
      <Spin spinning={loading}>
        {/* 工作流进度信息 */}
        {data?.workflowInstanceId && (
          <WorkflowInstanceInfo
            workflowInstanceId={data.workflowInstanceId}
            correlationData={{ creator: (data as any)?.creator }}
          />
        )}

        <Card
          title={
            <Space>
              <span>技术图纸更改详情</span>
              {getStatusTag(data?.orderStatus)}
            </Space>
          }
        >
          <FormProvider form={form}>
            <FormLayout {...formLayout}>
              <SchemaField schema={schema} />
            </FormLayout>
          </FormProvider>
        </Card>

        {data?.items && data.items.length > 0 && (
          <Card title="更改项列表" style={{ marginTop: 16 }}>
            <AgGridPlus
              gridRef={itemsGridRef}
              dataSource={data.items}
              columnDefs={itemsColumns}
              pagination={false}
              domLayout="autoHeight"
              toolBarRender={false}
              search={false}
            />
          </Card>
        )}

        {data?.temporaryNotes && data.temporaryNotes.length > 0 && (
          <Card title="临时注释" style={{ marginTop: 16 }}>
            <AgGridPlus
              gridRef={notesGridRef}
              dataSource={data.temporaryNotes}
              columnDefs={notesColumns}
              pagination={false}
              domLayout="autoHeight"
              toolBarRender={false}
              search={false}
            />
          </Card>
        )}

        {data?.implementItems && data.implementItems.length > 0 && (
          <Card title="实施项" style={{ marginTop: 16 }}>
            <AgGridPlus
              gridRef={implementItemsGridRef}
              dataSource={data.implementItems}
              columnDefs={implementItemsColumns}
              pagination={false}
              domLayout="autoHeight"
              toolBarRender={false}
              search={false}
            />
          </Card>
        )}

        {data?.workflowInstanceId && (
          <WorkflowExecutionCorrelationList
            hideSearch={true}
            workflowData={{
              correlationId: data.id as string,
              workflowDefinitionId: data.workflowDefinitionId || ''
            }}
          />
        )}

        <ToolBar>
          <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
            返回
          </Button>
          {(isInProgress || isCompleted) && (
            <Access accessible={canClose}>
              <DeleteConfirm title="确定关闭该更改单?" onConfirm={handleClose}>
                <Button icon={<CloseCircleOutlined />} danger>
                  关闭
                </Button>
              </DeleteConfirm>
            </Access>
          )}
        </ToolBar>
      </Spin>
    </div>
  );
};

export default PartDocumentChangeOrderDetailPage;
