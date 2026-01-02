/**
 * 物料料号申请单详情页
 * 路由: /appPdm/PartManagement/PartApplicationRequest/detail?id={id}
 * 使用 Formily 表单阅读态展示
 */

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Card, Button, Space, message, Spin, Tag } from 'antd';
import {
  ArrowLeftOutlined,
  EditOutlined,
  SendOutlined,
  CloseCircleOutlined,
  FileAddOutlined,
  RedoOutlined,
} from '@ant-design/icons';
import { history, Access, useAccess, useSchemaField } from 'umi';
import { useKeepAliveParams } from '@/hooks';
import { createForm } from '@formily/core';
import { FormProvider } from '@formily/react';
import { FormLayout } from '@formily/antd-v5';
import type { ISchema } from '@formily/json-schema';
import { ToolBar } from '@/components';
import {
  PartApplicationRequestGetAsync,
  PartApplicationRequestSubmitAsync,
  PartApplicationRequestCancelAsync
} from '@/services/pdm/PartApplicationRequest';
import { PartCategoryAttributeGetByCategoryIdAsync } from '@/services/pdm/PartCategoryAttribute';
import type { BurnAbpPdmApplicationContractsPartManagementApplicationsDtosPartApplicationRequestDto } from '@/services/pdm/typings';
import { PartApplicationRequestPermissions } from '@/pages/appPdm/_permissions';
import { partApplicationRequestStatusEnum, PartApplicationRequestStatus } from './_enums';
import DeleteConfirm from '@/components/deleteConfirm';
import PartCategoryTreeSelect from '../PartCategory/components/PartCategoryTreeSelect';
import UnitSelect from '@/pages/appCommon/_utils/UnitSelect';
import MaterialComFromSelect from '@/pages/appCommon/_utils/MaterialComFromSelect';
import WorkflowExecutionCorrelationList from '@/pages/appWorkflow/_utils/workflowExecutionCorrelationList';
import WorkflowInstanceInfo from '@/pages/appWorkflow/_utils/workflowInstanceInfo';
import dayjs from 'dayjs';

export const routeProps = {
  name: '物料料号申请单详情',
};

// 表单布局配置
const formLayout = {
  labelCol: 6,
  wrapperCol: 18,
  labelWidth: 100,
  feedbackLayout: 'none' as const,
};

const PartApplicationRequestDetailPage: React.FC = () => {
  const { params, isActive, hasChanged } = useKeepAliveParams('/appPdm/PartManagement/PartApplicationRequest/detail');
  const requestId = params.id as string;
  const access = useAccess();

  const SchemaField = useSchemaField({
    PartCategoryTreeSelect,
    UnitSelect,
    MaterialComFromSelect,
  });

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<BurnAbpPdmApplicationContractsPartManagementApplicationsDtosPartApplicationRequestDto | null>(
    null
  );
  const [categoryAttributes, setCategoryAttributes] = useState<
    API.BurnAbpPdmPartManagementPartCategoriesDtosPartCategoryAttributeDto[]
  >([]);
  const [loadingAttributes, setLoadingAttributes] = useState(false);

  const canCreate = !!(access && (access[PartApplicationRequestPermissions.Create] ?? true));
  const canUpdate = !!(access && (access[PartApplicationRequestPermissions.Update] ?? true));
  const canSubmit = !!(access && (access[PartApplicationRequestPermissions.Submit] ?? true));
  const canCancel = !!(access && (access[PartApplicationRequestPermissions.Cancel] ?? true));
  const canCreatePart = !!(
    access && (access[PartApplicationRequestPermissions.CreatePartFromApprovedRequest] ?? true)
  );

  // 创建只读表单实例
  const form = useMemo(() => createForm({ readPretty: true }), []);

  // 加载分类属性
  const loadCategoryAttributes = useCallback(async (categoryId: number) => {
    if (!categoryId) {
      setCategoryAttributes([]);
      return;
    }

    setLoadingAttributes(true);
    try {
      const attrs = await PartCategoryAttributeGetByCategoryIdAsync({
        categoryId: categoryId.toString(),
      });
      setCategoryAttributes(attrs || []);
    } catch (error) {
      message.error('加载分类属性失败');
      setCategoryAttributes([]);
    } finally {
      setLoadingAttributes(false);
    }
  }, []);

  // 加载详情数据
  const loadDetail = useCallback(async () => {
    if (!requestId) {
      message.error('参数缺失');
      history.push('/appPdm/PartManagement/PartApplicationRequest');
      return;
    }

    setLoading(true);
    try {
      const result = await PartApplicationRequestGetAsync({ id: requestId });
      setData(result);

      // 设置表单初始值
      const initialValues: any = {
        requestNumber: result.requestNumber,
        requestDate: result.requestDate ? dayjs(result.requestDate).format('YYYY-MM-DD') : '-',
        requestReason: result.requestReason,
        status: result.status,
        creator: result.creator,
        creationTime: result.creationTime
          ? dayjs(result.creationTime).format('YYYY-MM-DD HH:mm:ss')
          : '-',
        approvedPartNumber: result.approvedPartNumber,
        createdPartId: result.createdPartId,
        categoryId: result.categoryId,
        partInfoDescription: result.partInfo?.description,
        partInfoSpecification: result.partInfo?.specification,
        partInfoUnit: result.partInfo?.unit,
        partInfoIsCritical: result.partInfo?.isCritical,
        partInfoPartType: result.partInfo?.partType,
        partInfoOutCode: result.partInfo?.outCode,
        partInfoCategoryCode: result.partInfo?.categoryCode,
        partInfoUnitCode: result.partInfo?.unitCode,
        partInfoComeFrom: result.partInfo?.comeFrom,
        partInfoEanCode: result.partInfo?.eanCode,
        partInfoUpcCode: result.partInfo?.upcCode,
        partInfoEngDescription: result.partInfo?.engDescription,
        partInfoOutDescription: result.partInfo?.outDescription,
        partInfoOutSpecification: result.partInfo?.outSpecification,
      };

      // 加载分类属性值
      if (result.attributeValues && result.attributeValues.length > 0) {
        result.attributeValues.forEach((attr) => {
          initialValues[`attr_${attr.attributeCode}`] = attr.displayText || attr.attributeValue;
        });
      }

      form.setInitialValues(initialValues);

      // 加载分类属性定义
      if (result.categoryId) {
        await loadCategoryAttributes(result.categoryId);
      }
    } catch (error) {
      message.error('加载失败');
    } finally {
      setLoading(false);
    }
  }, [requestId, form, loadCategoryAttributes]);

  useEffect(() => {
    if (!isActive || !hasChanged) return;
    loadDetail();
  }, [loadDetail, isActive, hasChanged]);

  // 返回列表
  const handleBack = () => {
    history.push('/appPdm/PartManagement/PartApplicationRequest');
  };

  // 编辑
  const handleEdit = () => {
    history.push(`/appPdm/PartManagement/PartApplicationRequest/form?id=${requestId}`);
  };

  // 提交审批
  const handleSubmit = async () => {
    const hide = message.loading('正在提交...', 0);
    try {
      await PartApplicationRequestSubmitAsync({ id: requestId });
      message.success('提交成功');
      loadDetail();
    } catch (error) {
      message.error('提交失败');
    } finally {
      hide();
    }
  };

  // 取消申请
  const handleCancel = async () => {
    const hide = message.loading('正在取消...', 0);
    try {
      await PartApplicationRequestCancelAsync({ id: requestId });
      message.success('取消成功');
      loadDetail();
    } catch (error) {
      message.error('取消失败');
    } finally {
      hide();
    }
  };

  // 重新发起（复制数据到表单页）
  const handleRestart = () => {
    history.push(`/appPdm/PartManagement/PartApplicationRequest/form?copyFrom=${requestId}`);
  };

  // 从已批准的申请单创建物料
  const handleCreatePart = async () => {
    const hide = message.loading('正在创建物料...', 0);
    try {
      const partId = await PartApplicationRequestCreatePartFromApprovedRequestAsync({
        id: requestId,
      });
      message.success(`物料创建成功，物料ID: ${partId}`);
      loadDetail();
    } catch (error) {
      message.error('创建物料失败');
    } finally {
      hide();
    }
  };

  // 获取状态标签
  const getStatusTag = (status?: number) => {
    const statusItem = partApplicationRequestStatusEnum.find((item) => item.value === status);
    if (!statusItem) return <Tag>未知</Tag>;
    return <Tag color={statusItem.color}>{statusItem.label}</Tag>;
  };

  // 根据数据类型生成字段组件配置
  const getFieldComponent = (dataType: number) => {
    switch (dataType) {
      case 1: // String
        return { component: 'Input', props: {} };
      case 3: // Integer
        return { component: 'NumberPicker', props: { precision: 0 } };
      case 4: // Decimal
        return { component: 'NumberPicker', props: { precision: 2 } };
      case 5: // Boolean
        return { component: 'Switch', props: {} };
      case 6: // DateTime
        return { component: 'DatePicker', props: { showTime: true } };
      case 8: // Text
        return { component: 'Input.TextArea', props: { rows: 3 } };
      default:
        return { component: 'Input', props: {} };
    }
  };

  // 构造动态分类属性字段
  const buildAttributeFields = useCallback(() => {
    if (!categoryAttributes || categoryAttributes.length === 0) {
      return {};
    }

    const fields: any = {};
    categoryAttributes.forEach((attr, index) => {
      const fieldConfig = getFieldComponent(attr.dataType || 1);
      fields[`attr_col_${index}`] = {
        type: 'void',
        'x-component': 'FormGrid.GridColumn',
        'x-component-props': { gridSpan: 2 },
        properties: {
          [`attr_${attr.attributeCode}`]: {
            type: attr.dataType === 3 || attr.dataType === 4 ? 'number' : 'string',
            title: attr.displayName || attr.attributeCode,
            'x-decorator': 'FormItem',
            'x-component': fieldConfig.component,
            'x-component-props': {
              ...fieldConfig.props,
            },
          },
        },
      };
    });
    return fields;
  }, [categoryAttributes]);

  // 物料类型文本映射
  const getPartTypeText = (partType?: number) => {
    const typeMap: Record<number, string> = {
      0: '自制件',
      10: '外购件',
      20: '外协件',
      30: '虚拟件',
      40: '配套件',
    };
    return partType !== undefined ? typeMap[partType] || '-' : '-';
  };

  // 动态构造表单 Schema
  const schema: ISchema = useMemo(() => {
    const attributeFields = buildAttributeFields();
    const hasAttributes = Object.keys(attributeFields).length > 0;

    return {
      type: 'object',
      properties: {
        grid: {
          type: 'void',
          'x-component': 'FormGrid',
          'x-component-props': { maxColumns: 4, strictAutoFit: true },
          properties: {
            // 基本信息区域
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
            col1: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                requestNumber: {
                  type: 'string',
                  title: '申请单号',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                },
              },
            },
            col2: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                requestDate: {
                  type: 'string',
                  title: '申请日期',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                },
              },
            },
            col3: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                status: {
                  type: 'string',
                  title: '状态',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                  'x-content': data ? getStatusTag(data.status) : '-',
                },
              },
            },
            col4: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 4 },
              properties: {
                requestReason: {
                  type: 'string',
                  title: '申请理由',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input.TextArea',
                  'x-component-props': { rows: 3 },
                },
              },
            },
            col5: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                creator: {
                  type: 'string',
                  title: '创建人',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                },
              },
            },
            col6: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                creationTime: {
                  type: 'string',
                  title: '创建时间',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                },
              },
            },
            ...(data?.approvedPartNumber
              ? {
                  col7: {
                    type: 'void',
                    'x-component': 'FormGrid.GridColumn',
                    'x-component-props': { gridSpan: 2 },
                    properties: {
                      approvedPartNumber: {
                        type: 'string',
                        title: '批准物料编号',
                        'x-decorator': 'FormItem',
                        'x-component': 'Input',
                      },
                    },
                  },
                }
              : {}),
            ...(data?.createdPartId
              ? {
                  col8: {
                    type: 'void',
                    'x-component': 'FormGrid.GridColumn',
                    'x-component-props': { gridSpan: 2 },
                    properties: {
                      createdPartId: {
                        type: 'number',
                        title: '创建的物料ID',
                        'x-decorator': 'FormItem',
                        'x-component': 'NumberPicker',
                      },
                    },
                  },
                }
              : {}),
            // 物料基本信息分隔线
            divider1: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 4 },
              properties: {
                divider: {
                  type: 'void',
                  'x-component': 'FormDivider',
                  'x-component-props': {
                    orientation: 'left',
                    children: '物料基本信息',
                    style: { marginTop: 5, marginBottom: 5 },
                  },
                },
              },
            },
            col9: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 4 },
              properties: {
                partInfoDescription: {
                  type: 'string',
                  title: '物料描述',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input.TextArea',
                  'x-component-props': { rows: 2 },
                },
              },
            },
            col10: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                partInfoSpecification: {
                  type: 'string',
                  title: '规格型号',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                },
              },
            },
            col11: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 1 },
              properties: {
                partInfoUnit: {
                  type: 'string',
                  title: '单位',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                },
              },
            },
            col12: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 1 },
              properties: {
                partInfoIsCritical: {
                  type: 'boolean',
                  title: '关键物料',
                  'x-decorator': 'FormItem',
                  'x-component': 'Switch',
                },
              },
            },
            ...(data?.partInfo?.partType !== undefined
              ? {
                  col13: {
                    type: 'void',
                    'x-component': 'FormGrid.GridColumn',
                    'x-component-props': { gridSpan: 2 },
                    properties: {
                      partInfoPartType: {
                        type: 'string',
                        title: '物料类型',
                        'x-decorator': 'FormItem',
                        'x-component': 'Input',
                        'x-content': getPartTypeText(data?.partInfo?.partType),
                      },
                    },
                  },
                }
              : {}),
            // MES对接信息分隔线
            ...(data?.partInfo?.outCode ||
            data?.partInfo?.categoryCode ||
            data?.partInfo?.unitCode ||
            data?.partInfo?.comeFrom
              ? {
                  dividerMes: {
                    type: 'void',
                    'x-component': 'FormGrid.GridColumn',
                    'x-component-props': { gridSpan: 4 },
                    properties: {
                      divider: {
                        type: 'void',
                        'x-component': 'FormDivider',
                        'x-component-props': {
                          orientation: 'left',
                          children: 'MES对接信息',
                          style: { marginTop: 5, marginBottom: 5 },
                        },
                      },
                    },
                  },
                }
              : {}),
            ...(data?.partInfo?.outCode
              ? {
                  col14: {
                    type: 'void',
                    'x-component': 'FormGrid.GridColumn',
                    'x-component-props': { gridSpan: 2 },
                    properties: {
                      partInfoOutCode: {
                        type: 'string',
                        title: '外部编码',
                        'x-decorator': 'FormItem',
                        'x-component': 'Input',
                      },
                    },
                  },
                }
              : {}),
            ...(data?.partInfo?.categoryCode
              ? {
                  col15: {
                    type: 'void',
                    'x-component': 'FormGrid.GridColumn',
                    'x-component-props': { gridSpan: 2 },
                    properties: {
                      partInfoCategoryCode: {
                        type: 'string',
                        title: '类别代码',
                        'x-decorator': 'FormItem',
                        'x-component': 'Input',
                      },
                    },
                  },
                }
              : {}),
            ...(data?.partInfo?.unitCode
              ? {
                  col16: {
                    type: 'void',
                    'x-component': 'FormGrid.GridColumn',
                    'x-component-props': { gridSpan: 2 },
                    properties: {
                      partInfoUnitCode: {
                        type: 'string',
                        title: '计量单位代码',
                        'x-decorator': 'FormItem',
                        'x-component': 'Input',
                      },
                    },
                  },
                }
              : {}),
            ...(data?.partInfo?.comeFrom
              ? {
                  col17: {
                    type: 'void',
                    'x-component': 'FormGrid.GridColumn',
                    'x-component-props': { gridSpan: 2 },
                    properties: {
                      partInfoComeFrom: {
                        type: 'string',
                        title: '来源标志',
                        'x-decorator': 'FormItem',
                        'x-component': 'Input',
                      },
                    },
                  },
                }
              : {}),
            // 条码信息分隔线
            ...(data?.partInfo?.eanCode || data?.partInfo?.upcCode
              ? {
                  dividerBarcode: {
                    type: 'void',
                    'x-component': 'FormGrid.GridColumn',
                    'x-component-props': { gridSpan: 4 },
                    properties: {
                      divider: {
                        type: 'void',
                        'x-component': 'FormDivider',
                        'x-component-props': {
                          orientation: 'left',
                          children: '条码信息',
                          style: { marginTop: 5, marginBottom: 5 },
                        },
                      },
                    },
                  },
                }
              : {}),
            ...(data?.partInfo?.eanCode
              ? {
                  col18: {
                    type: 'void',
                    'x-component': 'FormGrid.GridColumn',
                    'x-component-props': { gridSpan: 2 },
                    properties: {
                      partInfoEanCode: {
                        type: 'string',
                        title: 'EAN条码',
                        'x-decorator': 'FormItem',
                        'x-component': 'Input',
                      },
                    },
                  },
                }
              : {}),
            ...(data?.partInfo?.upcCode
              ? {
                  col19: {
                    type: 'void',
                    'x-component': 'FormGrid.GridColumn',
                    'x-component-props': { gridSpan: 2 },
                    properties: {
                      partInfoUpcCode: {
                        type: 'string',
                        title: 'UPC条码',
                        'x-decorator': 'FormItem',
                        'x-component': 'Input',
                      },
                    },
                  },
                }
              : {}),
            // 扩展信息分隔线
            ...(data?.partInfo?.engDescription ||
            data?.partInfo?.outDescription ||
            data?.partInfo?.outSpecification
              ? {
                  dividerExt: {
                    type: 'void',
                    'x-component': 'FormGrid.GridColumn',
                    'x-component-props': { gridSpan: 4 },
                    properties: {
                      divider: {
                        type: 'void',
                        'x-component': 'FormDivider',
                        'x-component-props': {
                          orientation: 'left',
                          children: '扩展信息',
                          style: { marginTop: 5, marginBottom: 5 },
                        },
                      },
                    },
                  },
                }
              : {}),
            ...(data?.partInfo?.engDescription
              ? {
                  col20: {
                    type: 'void',
                    'x-component': 'FormGrid.GridColumn',
                    'x-component-props': { gridSpan: 4 },
                    properties: {
                      partInfoEngDescription: {
                        type: 'string',
                        title: '英文描述',
                        'x-decorator': 'FormItem',
                        'x-component': 'Input.TextArea',
                        'x-component-props': { rows: 2 },
                      },
                    },
                  },
                }
              : {}),
            ...(data?.partInfo?.outDescription
              ? {
                  col21: {
                    type: 'void',
                    'x-component': 'FormGrid.GridColumn',
                    'x-component-props': { gridSpan: 4 },
                    properties: {
                      partInfoOutDescription: {
                        type: 'string',
                        title: '外部描述',
                        'x-decorator': 'FormItem',
                        'x-component': 'Input.TextArea',
                        'x-component-props': { rows: 2 },
                      },
                    },
                  },
                }
              : {}),
            ...(data?.partInfo?.outSpecification
              ? {
                  col22: {
                    type: 'void',
                    'x-component': 'FormGrid.GridColumn',
                    'x-component-props': { gridSpan: 4 },
                    properties: {
                      partInfoOutSpecification: {
                        type: 'string',
                        title: '外部规格',
                        'x-decorator': 'FormItem',
                        'x-component': 'Input',
                      },
                    },
                  },
                }
              : {}),
            // 分类属性分隔线
            ...(hasAttributes
              ? {
                  divider2: {
                    type: 'void',
                    'x-component': 'FormGrid.GridColumn',
                    'x-component-props': { gridSpan: 4 },
                    properties: {
                      divider: {
                        type: 'void',
                        'x-component': 'FormDivider',
                        'x-component-props': {
                          orientation: 'left',
                          children: '物料属性值',
                          style: { marginTop: 5, marginBottom: 5 },
                        },
                      },
                    },
                  },
                }
              : {}),
            // 动态分类属性字段
            ...attributeFields,
          },
        },
      },
    };
  }, [data, buildAttributeFields, categoryAttributes]);

  const isPending = data?.status === PartApplicationRequestStatus.Pending;
  const isInReview = data?.status === PartApplicationRequestStatus.UnderReview;
  const isApproved = data?.status === PartApplicationRequestStatus.Approved;
  const isCancelled = data?.status === PartApplicationRequestStatus.Cancelled;

  return (
    <div style={{ height: '100%', overflow: 'auto', padding: '16px' }}>
      <Spin spinning={loading}>
        {/* 流程实例信息 */}
        {data?.workflowInstanceId && (
          <WorkflowInstanceInfo
            workflowInstanceId={data.workflowInstanceId}
            correlationData={{ creator: data.creator }}
          />
        )}

        {/* 表单详情 */}
        {data && (
          <Card title="物料料号申请单详情">
            <Spin spinning={loadingAttributes} tip="加载分类属性中...">
              <FormProvider form={form}>
                <FormLayout {...formLayout}>
                  <SchemaField schema={schema} />
                </FormLayout>
              </FormProvider>
            </Spin>
          </Card>
        )}

        {/* 工作流执行列表 */}
        {data?.workflowInstanceId && (
          <WorkflowExecutionCorrelationList
            hideSearch={true}
            workflowData={{
              correlationId: data.id as string,
              workflowDefinitionId: '' // 可以从data中获取，如果有的话
            }}
          />
        )}

        {/* 底部操作栏 */}
        <ToolBar>
          <Button onClick={handleBack}>
            返回
          </Button>
          {isPending && (
            <Access accessible={canUpdate}>
              <Button icon={<EditOutlined />} onClick={handleEdit}>
                编辑
              </Button>
            </Access>
          )}
          {isPending && (
            <Access accessible={canSubmit}>
              <DeleteConfirm title="确定提交审批?" onConfirm={handleSubmit}>
                <Button type="primary" icon={<SendOutlined />}>
                  提交审批
                </Button>
              </DeleteConfirm>
            </Access>
          )}
          {isInReview && (
            <Access accessible={canCancel}>
              <DeleteConfirm title="确定取消申请?" onConfirm={handleCancel}>
                <Button danger icon={<CloseCircleOutlined />}>
                  取消申请
                </Button>
              </DeleteConfirm>
            </Access>
          )}
          {isApproved && !data?.createdPartId && (
            <Access accessible={canCreatePart}>
              <DeleteConfirm title="确定从此申请单创建物料?" onConfirm={handleCreatePart}>
                <Button type="primary" icon={<FileAddOutlined />}>
                  创建物料
                </Button>
              </DeleteConfirm>
            </Access>
          )}
          {isCancelled && (
            <Access accessible={canCreate}>
              <Button icon={<RedoOutlined />} onClick={handleRestart}>
                重新发起
              </Button>
            </Access>
          )}
        </ToolBar>
      </Spin>
    </div>
  );
};

export default PartApplicationRequestDetailPage;
