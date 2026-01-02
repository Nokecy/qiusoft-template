/**
 * 物料料号申请单表单页
 * 路由: /appPdm/PartManagement/PartApplicationRequest/form?id={id}
 * 新建模式：无id参数
 * 编辑模式：有id参数
 */

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Card, Button, Space, message, Spin, Result, Tag, Tooltip } from 'antd';
import { ArrowLeftOutlined, SaveOutlined, SendOutlined } from '@ant-design/icons';
import { history, useSchemaField, closeTab } from 'umi';
import { useDynamicSchema } from '@@/plugin-dynamicSchema';
import { useKeepAliveParams } from '@/hooks';
import { createForm } from '@formily/core';
import { FormProvider } from '@formily/react';
import { FormLayout } from '@formily/antd-v5';
import type { ISchema } from '@formily/json-schema';
import { ToolBar } from '@/components';
import {
  PartApplicationRequestGetAsync,
  PartApplicationRequestCreateAsync,
  PartApplicationRequestUpdateAsync,
  PartApplicationRequestSubmitAsync,
} from '@/services/pdm/PartApplicationRequest';
import { PartCategoryAttributeGetByCategoryIdAsync } from '@/services/pdm/PartCategoryAttribute';
import PartCategoryTreeSelect from '../PartCategory/components/PartCategoryTreeSelect';
import ProductSeriesTreeSelect from '../ProductSeries/components/ProductSeriesTreeSelect';
import UnitSelect from '@/pages/appCommon/_utils/UnitSelect';
import MaterialComFromSelect from '@/pages/appCommon/_utils/MaterialComFromSelect';

export const routeProps = {
  name: '物料料号申请单表单',
};

const PartApplicationRequestFormPage: React.FC = () => {
  const { id: requestId, copyFrom: copyFromId, isActive, hasChanged } = useKeepAliveParams(
    '/appPdm/PartManagement/PartApplicationRequest/form',
    ['id', 'copyFrom']
  );
  const isEdit = !!requestId;
  const isCopy = !!copyFromId;

  // 获取动态 Schema（优先使用后端 Schema，否则使用内置）
  const {
    schema: baseSchema,
    formConfig,
    source: schemaSource,
    loading: schemaLoading,
    error: schemaError,
  } = useDynamicSchema('partApplicationRequest:form');

  const SchemaField = useSchemaField({
    PartCategoryTreeSelect,
    ProductSeriesTreeSelect,
    UnitSelect,
    MaterialComFromSelect,
  });

  // 分类属性状态
  const [categoryAttributes, setCategoryAttributes] = useState<API.BurnAbpPdmPartManagementPartCategoriesDtosPartCategoryAttributeDto[]>([]);
  const [loadingAttributes, setLoadingAttributes] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // 创建表单实例
  const form = useMemo(
    () => createForm({ validateFirst: true }),
    [requestId]
  );

  // 加载分类属性
  const loadCategoryAttributes = useCallback(async (categoryId: string) => {
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
  }, []);

  // 加载初始数据
  useEffect(() => {
    if (!isActive || !hasChanged) return;

    const loadId = requestId || copyFromId;
    if (loadId) {
      PartApplicationRequestGetAsync({ id: loadId })
        .then(data => {
          const initialValues: any = {
            productSeriesId: data.productSeriesId,
            categoryId: data.categoryId,
            requestReason: data.requestReason,
            partInfoDescription: data.partInfo?.description,
            partInfoSpecification: data.partInfo?.specification,
            partInfoUnit: data.partInfo?.unitName,
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

          // 编辑模式需要包含id,复制模式不包含
          if (isEdit && !isCopy) {
            initialValues.id = data.id;
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
            loadCategoryAttributes(data.categoryId);
          }
        })
        .catch(() => {
          message.error('加载数据失败');
        });
    }
  }, [isActive, hasChanged, requestId, copyFromId, isEdit, isCopy, form, loadCategoryAttributes]);

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
          },
        },
      };
    });
    return fields;
  };

  // 保存数据(提取公共逻辑)
  const saveData = async () => {
    const values = await form.submit();

    // 验证必填字段
    if (!values.partInfoDescription || !values.partInfoDescription.trim()) {
      message.error('物料描述不能为空');
      throw new Error('物料描述不能为空');
    }

    // 构造分类属性值数组
    const attributeValues = categoryAttributes.map(attr => {
      const value = values[`attr_${attr.attributeCode}`];
      return {
        attributeCode: attr.attributeCode!,
        // 确保 attributeValue 为字符串类型
        attributeValue: value !== null && value !== undefined ? String(value) : '',
      };
    });

    // 处理单位字段：如果是对象则提取 value 和 label，否则直接使用
    let unitCode = values.partInfoUnitCode?.trim();
    let unitName = values.partInfoUnit;

    if (typeof values.partInfoUnit === 'object' && values.partInfoUnit?.value) {
      unitCode = values.partInfoUnit.value;
      unitName = values.partInfoUnit.label;
    }

    // 处理来源字段：如果是对象则提取 value，否则直接使用
    const comeFromValue = typeof values.partInfoComeFrom === 'object' && values.partInfoComeFrom?.value
      ? values.partInfoComeFrom.value
      : values.partInfoComeFrom;

    const submitData = {
      productSeriesId: values.productSeriesId,
      categoryId: values.categoryId,
      requestReason: values.requestReason,
      partInfo: {
        description: values.partInfoDescription?.trim(),
        specification: values.partInfoSpecification?.trim(),
        unitName: unitName,
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
    };

    let savedId: string;
    // 复制模式下总是创建新记录，即使有id参数也忽略
    if (isEdit && !isCopy) {
      await PartApplicationRequestUpdateAsync({ id: requestId }, submitData as any);
      savedId = requestId;
    } else {
      const result = await PartApplicationRequestCreateAsync(submitData as any);
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
      if (error instanceof Error && error.message !== '物料描述不能为空') {
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
      await PartApplicationRequestSubmitAsync({ id: savedId });
      message.success('提交成功');

      handleBack();
    } catch (error) {
      if (error instanceof Error && error.message !== '物料描述不能为空') {
        message.error('操作失败');
      }
    } finally {
      setSubmitting(false);
    }
  };

  // 动态构造表单 Schema - 基于动态 Schema 合并分类属性
  const schema: ISchema = useMemo(() => {
    const attributeFields = buildAttributeFields();
    const hasAttributes = Object.keys(attributeFields).length > 0;

    // 深拷贝基础 Schema
    const mergedSchema = JSON.parse(JSON.stringify(baseSchema));

    // 获取 grid 属性对象
    const gridProperties = mergedSchema.properties?.grid?.properties;
    if (!gridProperties) {
      return mergedSchema;
    }

    // 动态处理物料分类字段的 onChange
    const categoryField = gridProperties.colCategory?.properties?.categoryId;
    if (categoryField) {
      categoryField['x-component-props'] = {
        ...categoryField['x-component-props'],
        onChange: (value: string) => {
          loadCategoryAttributes(value);
        },
      };
    }

    // 添加分类属性分隔线和动态字段
    if (hasAttributes) {
      gridProperties.divider_attributes = {
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
      };
    }

    // 合并动态分类属性字段
    Object.assign(gridProperties, attributeFields);

    return mergedSchema;
  }, [baseSchema, categoryAttributes, loadCategoryAttributes]);

  // 返回列表
  const handleBack = () => {
    const currentPath = window.location.pathname;
    history.push('/appPdm/PartManagement/PartApplicationRequest');
    setTimeout(() => {
      closeTab(currentPath);
    }, 150);
  };

  // Schema 加载中
  if (schemaLoading) {
    return (
      <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spin size="large" tip="加载表单配置中..." />
      </div>
    );
  }

  // Schema 加载错误
  if (schemaError) {
    return (
      <div style={{ height: '100%', padding: '16px' }}>
        <Result
          status="error"
          title="表单配置加载失败"
          subTitle={schemaError.message}
          extra={[
            <Button key="back" onClick={handleBack}>
              返回列表
            </Button>,
          ]}
        />
      </div>
    );
  }

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
          <Space>
            <span>{isCopy ? '重新发起物料料号申请单' : (isEdit ? '编辑物料料号申请单' : '新建物料料号申请单')}</span>
            {schemaSource === 'backend' && (
              <Tooltip title="使用后端动态配置">
                <Tag color="green">动态</Tag>
              </Tooltip>
            )}
          </Space>
        }
      >
        <Spin spinning={loadingAttributes} tip="加载分类属性中...">
          <FormProvider form={form}>
            <FormLayout {...formConfig}>
              <SchemaField schema={schema} />
            </FormLayout>
          </FormProvider>
        </Spin>
      </Card>

      {/* 底部操作栏 */}
      <ToolBar>
        <Button onClick={handleBack} disabled={submitting}>
          返回
        </Button>
        <Button icon={<SaveOutlined />} onClick={handleSubmit} loading={submitting}>
          保存
        </Button>
        <Button type="primary" icon={<SendOutlined />} onClick={handleSaveAndSubmit} loading={submitting}>
          保存并提交
        </Button>
      </ToolBar>
    </div>
  );
};

export default PartApplicationRequestFormPage;
