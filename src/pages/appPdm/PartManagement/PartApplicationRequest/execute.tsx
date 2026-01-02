/**
 * 物料料号申请单工作流审批页
 * 路由: /appPdm/PartManagement/PartApplicationRequest/execute?definitionId={definitionId}&correlationId={correlationId}&activityId={activityId}&workflowInstanceId={workflowInstanceId}&workItemId={workItemId}
 */

import React, { useEffect, useMemo, useState } from 'react';
import { Card, Button, Space, message, Spin } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { history, useSchemaField, closeTab } from 'umi';
import { createForm } from '@formily/core';
import { FormProvider, observer } from '@formily/react';
import { FormLayout } from '@formily/antd-v5';
import type { ISchema } from '@formily/json-schema';
import { observable } from '@formily/reactive';
import { ToolBar } from '@/components';
import {
  PartApplicationRequestGetAsync,
  PartApplicationRequestExecuteWorkflowAsync,
} from '@/services/pdm/PartApplicationRequest';
import { PartCategoryAttributeGetByCategoryIdAsync } from '@/services/pdm/PartCategoryAttribute';
import { PartCategoryGetAsync } from '@/services/pdm/PartCategory';
import WorkflowInstanceInfo from '@/pages/appWorkflow/_utils/workflowInstanceInfo';
import WorkflowExecutionForm from '@/pages/appWorkflow/_utils/workflowExecutionForm';
import WorkflowExecutionCorrelationList from '@/pages/appWorkflow/_utils/workflowExecutionCorrelationList';
import WorkItemAssignDialog from '@/pages/appWorkflow/_utils/workItemAssignDialog';
import { useWorkflow } from '@/hooks/useWorkflow';
import { useKeepAliveParams } from '@/hooks';

export const routeProps = {
  name: '物料料号申请单审批',
};

// 表单布局配置
const formLayout = {
  labelCol: 6,
  wrapperCol: 18,
  labelWidth: 100,
  feedbackLayout: 'none' as const,
};

const PartApplicationRequestExecutePage: React.FC = () => {
  const { params } = useKeepAliveParams('/appPdm/PartManagement/PartApplicationRequest/execute', ['definitionId', 'correlationId', 'activityId', 'workflowInstanceId', 'workItemId']);
  const { definitionId, correlationId, activityId, workflowInstanceId, workItemId } = params;

  // 创建 SchemaField（不传递组件，所有字段都是只读的）
  const SchemaField = useSchemaField();

  // 分类属性状态
  const [categoryAttributes, setCategoryAttributes] = useState<API.BurnAbpPdmPartManagementPartCategoriesDtosPartCategoryAttributeDto[]>([]);
  const [loadingAttributes, setLoadingAttributes] = useState(false);
  const [loading, setLoading] = useState(false);

  // 获取工作流信息
  const workflowInfo = useWorkflow(workflowInstanceId, activityId, correlationId);
  const $workflowInfo = useMemo(() => observable({
    currentActivityName: '',
    executionActivityNames: [] as string[]
  }), []);

  // 更新工作流信息
  useEffect(() => {
    if (workflowInfo.executionLogs) {
      $workflowInfo.currentActivityName = workflowInfo.currentActivityName || '';
      $workflowInfo.executionActivityNames = workflowInfo.executionLogs?.map((x: any) => x.activityName) || [];
    }
  }, [workflowInfo, $workflowInfo]);

  // 创建表单实例
  const form = React.useMemo(
    () => createForm({ validateFirst: true }),
    []
  );

  // 加载初始数据
  useEffect(() => {
    if (correlationId) {
      setLoading(true);
      PartApplicationRequestGetAsync({ id: correlationId as string })
        .then(async data => {
          const initialValues: any = {
            id: data.id,
            categoryId: data.categoryId,
            categoryName: '', // 新增：用于显示分类名称
            requestReason: data.requestReason,
            partInfoDescription: data.partInfo?.description,
            partInfoSpecification: data.partInfo?.specification,
            partInfoUnit: data.partInfo?.unit,
            partInfoIsCritical: data.partInfo?.isCritical,
            partInfoOutCode: data.partInfo?.outCode,
            partInfoCategoryCode: data.partInfo?.categoryCode,
            partInfoUnitCode: data.partInfo?.unitCode,
            partInfoComeFrom: data.partInfo?.comeFrom,
            partInfoEanCode: data.partInfo?.eanCode,
            partInfoUpcCode: data.partInfo?.upcCode,
            partInfoEngDescription: data.partInfo?.engDescription,
            partInfoOutDescription: data.partInfo?.outDescription,
            partInfoOutSpecification: data.partInfo?.outSpecification,
          };

          // 获取分类名称用于显示
          if (data.categoryId) {
            try {
              const category = await PartCategoryGetAsync({ id: data.categoryId });
              initialValues.categoryName = category.name || '';
            } catch (error) {
              console.error('获取分类名称失败:', error);
              initialValues.categoryName = '';
            }
          }

          // 加载分类属性值
          if (data.attributeValues && data.attributeValues.length > 0) {
            data.attributeValues.forEach(attr => {
              initialValues[`attr_${attr.attributeCode}`] = attr.attributeValue;
            });
          }

          form.setInitialValues(initialValues);

          // 加载分类属性
          if (data.categoryId) {
            await loadCategoryAttributes(data.categoryId);
          }
        })
        .catch(() => {
          message.error('加载数据失败');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [correlationId, form]);

  // 加载分类属性
  const loadCategoryAttributes = async (categoryId: string) => {
    if (!categoryId) {
      setCategoryAttributes([]);
      return;
    }

    setLoadingAttributes(true);
    try {
      const attrs = await PartCategoryAttributeGetByCategoryIdAsync({ categoryId });
      setCategoryAttributes(attrs || []);
    } catch (error) {
      message.error('加载分类属性失败');
      setCategoryAttributes([]);
    } finally {
      setLoadingAttributes(false);
    }
  };

  // 返回列表
  const handleBack = () => {
    const currentPath = window.location.pathname;
    history.push('/appPdm/PartManagement/PartApplicationRequest');
    setTimeout(() => {
      closeTab(currentPath);
    }, 150);
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
  const buildAttributeFields = () => {
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
            required: attr.isRequired,
            'x-decorator': 'FormItem',
            'x-component': fieldConfig.component,
            'x-component-props': {
              placeholder: `请输入${attr.displayName || attr.attributeCode}`,
              ...fieldConfig.props,
            },
            'x-reactions': {
              fulfill: {
                state: {
                  pattern: 'readPretty'
                }
              }
            },
          },
        },
      };
    });
    return fields;
  };

  // 提交工作流审批
  const handleSubmit = async () => {
    try {
      await form.validate();
      const values = form.values;

      // 检查工作流输入
      if (!values.workflowInput) {
        message.error('请填写审批意见');
        return;
      }

      // 构造分类属性值数组
      const attributeValues = categoryAttributes.map(attr => {
        const value = values[`attr_${attr.attributeCode}`];
        return {
          attributeCode: attr.attributeCode!,
          attributeValue: value !== null && value !== undefined ? String(value) : '',
        };
      });

      // 处理单位字段
      let unitCode = values.partInfoUnitCode?.trim();
      let unitName = values.partInfoUnit;

      if (typeof values.partInfoUnit === 'object' && values.partInfoUnit?.value) {
        unitCode = values.partInfoUnit.value;
        unitName = values.partInfoUnit.label;
      }

      // 处理来源字段
      const comeFromValue = typeof values.partInfoComeFrom === 'object' && values.partInfoComeFrom?.value
        ? values.partInfoComeFrom.value
        : values.partInfoComeFrom;

      const submitData = {
        categoryId: values.categoryId,
        requestReason: values.requestReason,
        partInfo: {
          description: values.partInfoDescription?.trim(),
          specification: values.partInfoSpecification?.trim(),
          unit: unitName,
          unitCode: unitCode,
          isCritical: values.partInfoIsCritical || false,
          outCode: values.partInfoOutCode?.trim(),
          categoryCode: values.partInfoCategoryCode?.trim(),
          comeFrom: comeFromValue,
          eanCode: values.partInfoEanCode?.trim(),
          upcCode: values.partInfoUpcCode?.trim(),
          engDescription: values.partInfoEngDescription?.trim(),
          outDescription: values.partInfoOutDescription?.trim(),
          outSpecification: values.partInfoOutSpecification?.trim(),
        },
        attributeValues,
        workflowInput: values.workflowInput, // 添加工作流输入
      };

      await PartApplicationRequestExecuteWorkflowAsync(
        { id: correlationId as string },
        submitData as any
      );

      message.success('审批提交成功');
      handleBack();
    } catch (error) {
      console.error('审批提交失败:', error);
      message.error('审批提交失败');
    }
  };

  // 动态构造表单 Schema - 使用4列网格布局
  const schema: ISchema = React.useMemo(() => {
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
            // 基本信息区域 - 审批时只读
            col1: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                categoryName: {
                  type: 'string',
                  title: '物料分类',
                  required: true,
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                  'x-component-props': {
                    placeholder: '请选择物料分类',
                  },
                  'x-reactions': {
                    fulfill: {
                      state: {
                        pattern: 'readPretty'
                      }
                    }
                  },
                },
              },
            },
            col2: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 4 },
              properties: {
                requestReason: {
                  type: 'string',
                  title: '申请理由',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input.TextArea',
                  'x-component-props': { rows: 3, placeholder: '请输入申请理由' },
                  'x-reactions': {
                    fulfill: {
                      state: {
                        pattern: 'readPretty'
                      }
                    }
                  },
                },
              },
            },
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
                  },
                },
              },
            },
            col3: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 4 },
              properties: {
                partInfoDescription: {
                  type: 'string',
                  title: '物料描述',
                  required: true,
                  'x-decorator': 'FormItem',
                  'x-component': 'Input.TextArea',
                  'x-component-props': { rows: 2, placeholder: '请输入物料用途描述' },
                  'x-reactions': {
                    fulfill: {
                      state: {
                        pattern: 'readPretty'
                      }
                    }
                  },
                },
              },
            },
            col4: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                partInfoSpecification: {
                  type: 'string',
                  title: '规格型号',
                  required: true,
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                  'x-component-props': { placeholder: '请输入规格型号' },
                  'x-reactions': {
                    fulfill: {
                      state: {
                        pattern: 'readPretty'
                      }
                    }
                  },
                },
              },
            },
            col5: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 1 },
              properties: {
                partInfoUnit: {
                  type: 'string',
                  title: '单位',
                  required: true,
                  'x-decorator': 'FormItem',
                  'x-component': 'UnitSelect',
                  'x-component-props': { placeholder: '请选择单位', useCode: true },
                  'x-reactions': {
                    fulfill: {
                      state: {
                        pattern: 'readPretty'
                      }
                    }
                  },
                },
              },
            },
            col6: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 1 },
              properties: {
                partInfoIsCritical: {
                  type: 'boolean',
                  title: '关键物料',
                  'x-decorator': 'FormItem',
                  'x-component': 'Switch',
                  'x-component-props': {},
                  'x-reactions': {
                    fulfill: {
                      state: {
                        pattern: 'readPretty'
                      }
                    }
                  },
                },
              },
            },
            // MES对接信息分隔线
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
            col7: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 1 },
              properties: {
                partInfoOutCode: {
                  type: 'string',
                  title: '外部编码',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                  'x-component-props': { placeholder: '请输入外部编码' },
                  'x-reactions': {
                    fulfill: {
                      state: {
                        pattern: 'readPretty'
                      }
                    }
                  },
                },
              },
            },
            col8: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 1 },
              properties: {
                partInfoComeFrom: {
                  type: 'string',
                  title: '来源',
                  required: true,
                  'x-decorator': 'FormItem',
                  'x-component': 'MaterialComFromSelect',
                  'x-component-props': { placeholder: '请选择来源', useCode: true },
                  'x-reactions': {
                    fulfill: {
                      state: {
                        pattern: 'readPretty'
                      }
                    }
                  },
                },
              },
            },
            // 条码信息分隔线
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
            col11: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                partInfoEanCode: {
                  type: 'string',
                  title: 'EAN条码',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                  'x-component-props': { placeholder: '请输入EAN条码' },
                  'x-reactions': {
                    fulfill: {
                      state: {
                        pattern: 'readPretty'
                      }
                    }
                  },
                },
              },
            },
            col12: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 2 },
              properties: {
                partInfoUpcCode: {
                  type: 'string',
                  title: 'UPC条码',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                  'x-component-props': { placeholder: '请输入UPC条码' },
                  'x-reactions': {
                    fulfill: {
                      state: {
                        pattern: 'readPretty'
                      }
                    }
                  },
                },
              },
            },
            // 扩展信息分隔线
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
            col13: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 4 },
              properties: {
                partInfoEngDescription: {
                  type: 'string',
                  title: '英文描述',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input.TextArea',
                  'x-component-props': { rows: 2, placeholder: '请输入英文描述' },
                  'x-reactions': {
                    fulfill: {
                      state: {
                        pattern: 'readPretty'
                      }
                    }
                  },
                },
              },
            },
            col14: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 4 },
              properties: {
                partInfoOutDescription: {
                  type: 'string',
                  title: '外部描述',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input.TextArea',
                  'x-component-props': { rows: 2, placeholder: '请输入外部描述' },
                  'x-reactions': {
                    fulfill: {
                      state: {
                        pattern: 'readPretty'
                      }
                    }
                  },
                },
              },
            },
            col15: {
              type: 'void',
              'x-component': 'FormGrid.GridColumn',
              'x-component-props': { gridSpan: 4 },
              properties: {
                partInfoOutSpecification: {
                  type: 'string',
                  title: '外部规格',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                  'x-component-props': { placeholder: '请输入外部规格' },
                  'x-reactions': {
                    fulfill: {
                      state: {
                        pattern: 'readPretty'
                      }
                    }
                  },
                },
              },
            },
            // 分类属性分隔线
            ...(hasAttributes ? {
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
                      children: '分类属性',
                      style: { marginTop: 5, marginBottom: 5 },
                    },
                  },
                },
              },
            } : {}),
            // 动态分类属性字段
            ...attributeFields,
          },
        },
      }
    }
  }, [categoryAttributes]);

  return (
    <div style={{ height: '100%', overflow: 'auto', padding: '16px' }}>
      {/* 工作流进度信息 */}
      <WorkflowInstanceInfo
        workflowInstanceId={workflowInstanceId as string}
        correlationData={{ ...form.values, activityId }}
        steps={[]}
        currentActivityName={workflowInfo.currentActivityName}
      />

      {/* 表单内容 */}
      <Card title="申请信息" style={{ marginBottom: 16 }}>
        <Spin spinning={loading || loadingAttributes} tip="加载中...">
          <FormProvider form={form}>
            <FormLayout {...formLayout}>
              <SchemaField schema={schema} scope={{ $workflowInfo }} />
            </FormLayout>
          </FormProvider>
        </Spin>
      </Card>

      {/* 工作流执行表单（审批意见） */}
      <WorkflowExecutionForm
        form={form}
        workflowInstanceId={workflowInstanceId as string}
        definitionId={definitionId as string}
        activityId={activityId as string}
        currentActivityName={workflowInfo.currentActivityName}
      />

      {/* 工作流关联列表 */}
      <WorkflowExecutionCorrelationList
        hideSearch={true}
        workflowData={{
          correlationId: correlationId as string,
          workflowDefinitionId: definitionId as string
        }}
      />

      {/* 底部按钮栏 */}
      <ToolBar>
        <Button onClick={handleBack}>
          返回
        </Button>
        <WorkItemAssignDialog workflowInfo={{ workItemId }} />
        <Button type="primary" onClick={handleSubmit}>
          提交
        </Button>
      </ToolBar>
    </div>
  );
};

export default observer(PartApplicationRequestExecutePage);
