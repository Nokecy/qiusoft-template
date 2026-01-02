/**
 * BOM 子项添加/编辑表单 - Formily Schema 模式
 */

import React, { useCallback, useEffect, useState } from 'react';
import { Modal, message, Spin } from 'antd';
import { createForm, onFieldValueChange } from '@formily/core';
import { FormProvider, FormConsumer, useForm } from '@formily/react';
import { FormLayout } from '@formily/antd-v5';
import { useSchemaField } from 'umi';
import type { ISchema } from '@formily/json-schema';
import type {
  BurnAbpPdmBomManagementBomsBomItemDto,
  BurnAbpPdmBomManagementBomsBomDto,
} from '@/services/pdm/typings';
import { BomAddItemAsync, BomUpdateItemAsync } from '@/services/pdm/Bom';
import MaterialSelect from '../_components/MaterialSelect';
import UnitSelect from '@/pages/appCommon/_utils/UnitSelect';
import MaterialComFromSelect from '@/pages/appCommon/_utils/MaterialComFromSelect';
import { BomVersionGetByMaterialCodeAsync } from '@/services/pdm/BomVersion';
import dayjs from 'dayjs';

interface BomItemFormProps {
  visible: boolean;
  bomData?: BurnAbpPdmBomManagementBomsBomDto | null;
  treeItems?: BurnAbpPdmBomManagementBomsBomItemDto[];
  data?: BurnAbpPdmBomManagementBomsBomItemDto | null;
  parentItem?: BurnAbpPdmBomManagementBomsBomItemDto | null;
  version: string;
  onClose: () => void;
  onSuccess: () => void;
}

const BomItemForm: React.FC<BomItemFormProps> = ({
  visible,
  bomData,
  treeItems = [],
  data,
  parentItem,
  version,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] = React.useState(false);

  // 创建自定义 MaterialSelect 组件,处理选择后自动填充物料信息
  const CustomMaterialSelect = (props: any) => {
    const { value, onChange, ...rest } = props;
    const form = useForm();

    const handleChange = (val: any, option: any) => {
      // 【重要】先设置 data，再触发 onChange
      // 因为 onChange 会触发 onFieldValueChange effect，
      // 在 effect 中需要读取 field.data，所以必须先设置好数据
      const materialField = form.query('childMaterialCode').take();
      if (materialField) {
        materialField.setData({
          description: option?.description,
          unit: option?.unit,
          comeFrom: option?.comeFrom,
        });
      }

      // 触发值变化（会同步触发 onFieldValueChange effect）
      onChange?.(val);
    };

    return <MaterialSelect {...rest} value={value} onChange={handleChange} />;
  };

  const SchemaField = useSchemaField({
    MaterialSelect: CustomMaterialSelect,
    UnitSelect,
    MaterialComFromSelect,
  });

  const form = React.useMemo(
    () =>
      createForm({
        validateFirst: true,
        initialValues: data
          ? {
            childMaterialCode: data.childMaterialCode,
            childMaterialDescription: data.childMaterialDescription,
            childMaterialEditionNo: data.childMaterialEditionNo,
            quantity: data.quantity,
            unitOfMeasure: data.unitOfMeasure ? { value: data.unitOfMeasure, label: data.unitOfMeasure } : undefined,
            materialComeFrom: data.materialComeFrom ? { value: data.materialComeFrom, label: data.materialComeFrom } : undefined,
            parentItemId: data.parentItemId,
          }
          : {
            parentItemId: parentItem?.id || undefined,
          },
        effects: () => {
          // 监听子项物料编码变化，自动填充相关信息
          onFieldValueChange('childMaterialCode', async (field) => {
            const form = field.form;
            const materialCode = field.value;
            const materialData = field.data || {};

            console.log('[Formily Effects] 物料编码变化:', materialCode, '物料数据:', materialData);

            // 1. 自动填充物料描述
            const descriptionField = form.query('childMaterialDescription').take();
            if (descriptionField) {
              descriptionField.setValue(materialData.description || '');
            }

            // 2. 自动填充单位
            const unitField = form.query('unitOfMeasure').take();
            if (unitField && materialData.unit) {
              unitField.setValue({
                value: materialData.unit,
                label: materialData.unit
              });
              console.log('[Formily Effects] 自动填充单位:', materialData.unit);
            }

            // 3. 自动填充物料来源
            const comeFromField = form.query('materialComeFrom').take();
            if (comeFromField && materialData.comeFrom) {
              comeFromField.setValue({
                value: materialData.comeFrom,
                label: materialData.comeFrom
              });
              console.log('[Formily Effects] 自动填充物料来源:', materialData.comeFrom);
            }

            // 4. 加载版本列表
            const versionField = form.query('childMaterialEditionNo').take();
            if (!versionField) return;

            if (materialCode) {
              versionField.setLoading(true);
              try {
                const data = await BomVersionGetByMaterialCodeAsync({ materialCode });
                const options = data.items?.map(v => ({
                  label: v.version,
                  value: v.version
                })) || [];

                console.log('[Formily Effects] 版本列表加载成功:', options.length, '个版本');
                versionField.setDataSource(options);

                // 如果没有可用版本，禁用字段
                if (options.length === 0) {
                  versionField.setComponentProps({
                    placeholder: '该物料暂无版本',
                    disabled: true,
                  });
                } else {
                  versionField.setComponentProps({
                    placeholder: '请选择版本',
                    disabled: false,
                  });
                }
              } catch (error) {
                console.error('[Formily Effects] 加载版本列表失败:', error);
                versionField.setDataSource([]);
                versionField.setComponentProps({
                  placeholder: '加载失败',
                  disabled: true,
                });
              } finally {
                versionField.setLoading(false);
              }
            } else {
              // 物料编码为空时，清空所有相关字段
              if (descriptionField) descriptionField.setValue('');
              if (unitField) unitField.setValue(undefined);
              if (comeFromField) comeFromField.setValue(undefined);

              versionField.setDataSource([]);
              versionField.setValue(undefined);
              versionField.setComponentProps({
                placeholder: '请先选择子项物料',
                disabled: true,
              });
            }
          });
        },
      }),
    [data, parentItem, visible]
  );

  // BOM 子项表单 Schema
  const itemSchema: ISchema = {
    type: 'object',
    properties: {
      grid: {
        type: 'void',
        'x-component': 'FormGrid',
        'x-component-props': {
          maxColumns: 2,
          strictAutoFit: true,
          columnGap: 16,
        },
        properties: {
          col1: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            properties: {
              childMaterialCode: {
                type: 'string',
                title: '子项物料编码',
                'x-decorator': 'FormItem',
                'x-component': 'MaterialSelect',
                'x-pattern': data ? 'readPretty' : 'editable',
                'x-component-props': {
                  placeholder: '请选择子项物料',
                },
                'x-validator': [{ required: true, message: '请选择子项物料' }],
              },
            },
          },
          col2: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            properties: {
              childMaterialDescription: {
                type: 'string',
                title: '子项物料描述',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-pattern': 'readPretty',
                'x-component-props': {
                  placeholder: '自动带出',
                },
              },
            },
          },
          col3: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            properties: {
              quantity: {
                type: 'number',
                title: '数量',
                'x-decorator': 'FormItem',
                'x-component': 'NumberPicker',
                'x-component-props': {
                  min: 0,
                  precision: 2,
                  placeholder: '请输入数量',
                  style: { width: '100%' },
                },
                'x-validator': [
                  { required: true, message: '请输入数量' },
                  { pattern: /^[0-9]+(\.[0-9]{1,2})?$/, message: '数量格式不正确' },
                ],
              },
            },
          },
          col4: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            properties: {
              unitOfMeasure: {
                type: 'string',
                title: '单位',
                'x-decorator': 'FormItem',
                'x-component': 'UnitSelect',
                'x-pattern': 'readPretty',
                'x-component-props': {
                  useCode: true,
                  placeholder: '自动带出',
                },
                'x-validator': [{ required: true, message: '请选择单位' }],
              },
            },
          },
          col5: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            properties: {
              childMaterialEditionNo: {
                type: 'string',
                title: '子项物料版本',
                'x-decorator': 'FormItem',
                'x-component': 'Select',
                'x-component-props': {
                  placeholder: '请先选择子项物料',
                  disabled: true,
                  style: { width: '100%' },
                },
              },
            },
          },
          col6: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            properties: {
              materialComeFrom: {
                type: 'string',
                title: '物料来源',
                'x-decorator': 'FormItem',
                'x-component': 'MaterialComFromSelect',
                'x-pattern': 'readPretty',
                'x-component-props': {
                  useCode: true,
                  placeholder: '自动带出',
                },
              },
            },
          },
          col7: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': {
              gridSpan: 2,
            },
            properties: {
              parentItemId: {
                type: 'string',
                title: '父级子项',
                'x-decorator': 'FormItem',
                'x-component': 'TreeSelect',
                'x-component-props': {
                  placeholder: '留空表示顶层子项',
                  treeData: buildParentItemOptions(treeItems, data?.id),
                },
              },
            },
          },
        },
      },
    },
  };

  // 提交表单
  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);
      const values = await form.submit();

      // 处理复合字段
      const unitValue = typeof values.unitOfMeasure === 'object' ? values.unitOfMeasure?.value : values.unitOfMeasure;
      const comeFromValue = typeof values.materialComeFrom === 'object' ? values.materialComeFrom?.value : values.materialComeFrom;

      if (data?.id) {
        // 编辑模式
        const submitData: any = {
          bomItemId: data.id,
          bomVersion: version,
          quantity: values.quantity,
          childMaterialCode: values.childMaterialCode,
          childMaterialEditionNo: values.childMaterialEditionNo,
          unitOfMeasure: unitValue,
          materialComeFrom: comeFromValue,
          affectSubsequentVersions: false,
        };

        await BomUpdateItemAsync(submitData);
        message.success('更新成功');
      } else {
        // 新增模式
        const submitData: any = {
          bomId: bomData?.id,
          bomVersion: version,
          childMaterialCode: values.childMaterialCode,
          childMaterialDescription: values.childMaterialDescription || '',
          childMaterialEditionNo: values.childMaterialEditionNo,
          quantity: values.quantity,
          unitOfMeasure: unitValue,
          materialComeFrom: comeFromValue,
          parentItemId: values.parentItemId ? Number(values.parentItemId) : undefined,
        };

        await BomAddItemAsync(submitData);
        message.success('添加成功');
      }

      form.reset();
      onSuccess();
      onClose();
    } catch (error) {
      console.error('提交失败:', error);
      message.error('提交失败,请检查表单');
    } finally {
      setLoading(false);
    }
  }, [form, data, bomData, version, onSuccess, onClose]);

  const handleCancel = () => {
    form.reset();
    onClose();
  };

  return (
    <Modal
      title={data ? '编辑子项' : '添加子项'}
      open={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
      confirmLoading={loading}
      width={800}
      okText="保存"
      cancelText="取消"
    >
      <Spin spinning={loading}>
        <FormProvider form={form}>
          <FormLayout labelWidth={120} labelAlign="right" feedbackLayout="terse">
            <div style={{ padding: '16px 0' }}>
              <SchemaField schema={itemSchema} />
            </div>
          </FormLayout>
          <FormConsumer>{() => null}</FormConsumer>
        </FormProvider>
      </Spin>
    </Modal>
  );
};

/**
 * 构建父级子项选项树
 */
function buildParentItemOptions(
  items: BurnAbpPdmBomManagementBomsBomItemDto[],
  excludeId?: string
): any[] {
  return items
    .filter((item) => item.id !== excludeId)
    .map((item) => ({
      title: `${item.childMaterialCode} ${item.childMaterialName || ''}`,
      value: item.id,
      key: item.id,
      disabled: excludeId === item.id,
    }));
}

export { BomItemForm };
export default BomItemForm;
