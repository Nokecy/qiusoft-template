import React, { useEffect, useMemo } from 'react';
import { Modal, message } from 'antd';
import { createForm } from '@formily/core';
import { FormProvider } from '@formily/react';
import { FormLayout, FormGrid, FormItem, Input, NumberPicker, Switch } from '@formily/antd-v5';
import { useSchemaField } from '@umijs/max';
import { ProcessProcedureSelect } from '@/pages/appPdm/_formWidgets/ProcessProcedureSelect';
import { ProcessNodeData } from './ProcessNode';

interface NodeEditDialogProps {
  visible: boolean;
  nodeData?: ProcessNodeData | null;
  existingNodes?: ProcessNodeData[]; // 现有节点列表，用于自动计算序号
  readOnly?: boolean; // 只读模式
  onCancel: () => void;
  onSave: (data: Partial<ProcessNodeData>) => void;
}

/**
 * 区块标题组件
 */
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      marginBottom: 16,
      marginTop: 16,
      fontWeight: 'bold',
      borderLeft: '4px solid #1890ff',
      paddingLeft: 8,
      fontSize: 14,
    }}
  >
    {children}
  </div>
);

/**
 * 节点编辑对话框
 * 编辑工序节点的详细信息
 */
const NodeEditDialog: React.FC<NodeEditDialogProps> = ({ visible, nodeData, existingNodes = [], readOnly = false, onCancel, onSave }) => {
  const SchemaField = useSchemaField({
    SectionTitle,
    FormGrid,
    FormItem,
    Input,
    NumberPicker,
    Switch,
    ProcessProcedureSelect,
  });

  // 计算下一个可用的序号（基于现有节点的最大序号 + 10）
  const getNextSort = () => {
    if (existingNodes.length === 0) return 10;
    const maxSort = Math.max(...existingNodes.map(n => n.sort || n.sequence || 0));
    return maxSort + 10;
  };

  // 创建表单实例
  const form = useMemo(() => createForm(), []);

  // 准备初始值
  useEffect(() => {
    if (visible) {
      if (nodeData) {
        // 编辑模式：使用现有数据
        const initialValues = {
          sort: nodeData.sort || nodeData.sequence,
          station: nodeData.station,
          processProcedure: nodeData.processProcedure
            ? {
                value: nodeData.processProcedure.id,
                label: `${nodeData.processProcedure.code} - ${nodeData.processProcedure.name}`,
                code: nodeData.processProcedure.code,
                name: nodeData.processProcedure.name,
                workCenterCode: nodeData.processProcedure.workCenterCode,
                workCenterName: nodeData.processProcedure.workCenterName,
              }
            : undefined,
          workCenter: nodeData.processProcedure?.workCenterCode
            ? `${nodeData.processProcedure.workCenterCode} - ${nodeData.processProcedure.workCenterName}`
            : '',
          isNeedCheckPrevWp: nodeData.isNeedCheckPrevWp || false,
          checkPrevQuantity: nodeData.checkPrevQuantity,
          isNeedCheckWp: nodeData.isNeedCheckWp || false,
          needPicture: nodeData.needPicture || false,
          workerCount: nodeData.workerCount,
          manuFactureCost: nodeData.manuFactureCost,
          isOutsourced: nodeData.isOutsourced || false,
          inspectionSchemeCode: nodeData.inspectionSchemeCode,
          sampleSchemeCode: nodeData.sampleSchemeCode,
          memo: nodeData.memo,
        };
        form.setInitialValues(initialValues);
        form.reset();
      } else {
        // 新增模式：自动计算序号
        const initialValues = {
          sort: getNextSort(),
          isNeedCheckPrevWp: false,
          isNeedCheckWp: false,
          needPicture: false,
          isOutsourced: false,
        };
        form.setInitialValues(initialValues);
        form.reset();
      }

      // 设置只读模式
      if (readOnly) {
        form.setPattern('readPretty');
      } else {
        form.setPattern('editable');
      }
    }
  }, [visible, nodeData, form, readOnly]);

  // 提交处理
  const handleOk = async () => {
    try {
      await form.validate();
      const values = form.values;

      // 转换工序数据格式
      const processProcedureData = values.processProcedure;
      const saveData: Partial<ProcessNodeData> = {
        ...values,
        sort: values.sort,
        sequence: values.sort,
        processProcedure: processProcedureData ? {
          id: processProcedureData.value || processProcedureData.raw?.id,
          code: processProcedureData.code || processProcedureData.raw?.code,
          name: processProcedureData.name || processProcedureData.raw?.name,
          workCenterCode: processProcedureData.workCenterCode || processProcedureData.raw?.workCenterCode,
          workCenterName: processProcedureData.workCenterName || processProcedureData.raw?.workCenterName,
        } : nodeData?.processProcedure,
      };

      onSave(saveData);
      message.success('保存成功');
    } catch (error) {
      console.error('表单验证失败:', error);
      message.error('请检查表单填写');
    }
  };

  return (
    <Modal
      title={readOnly ? '查看工序节点' : (nodeData ? '编辑工序节点' : '添加工序节点')}
      open={visible}
      onCancel={onCancel}
      onOk={readOnly ? undefined : handleOk}
      width={800}
      destroyOnClose
      footer={readOnly ? null : undefined}
    >
      <FormProvider form={form}>
        <FormLayout labelWidth={120} feedbackLayout="none">
          <SchemaField>
            <SchemaField.Void x-component="SectionTitle" x-content="基础信息" />
            <SchemaField.Void
              x-component="FormGrid"
              x-component-props={{ maxColumns: 2, minColumns: 1, strictAutoFit: true }}
            >
              <SchemaField.Number
                title="序号"
                name="sort"
                required
                x-decorator="FormItem"
                x-component="NumberPicker"
                x-pattern="readPretty"
                x-component-props={{
                  placeholder: '序号自动生成',
                  min: 1,
                  precision: 0,
                  style: { width: '100%' },
                }}
              />
              <SchemaField.String
                title="工位"
                name="station"
                x-decorator="FormItem"
                x-component="Input"
                x-component-props={{ placeholder: '请输入工位' }}
              />
              <SchemaField.String
                title="工序"
                name="processProcedure"
                required
                x-decorator="FormItem"
                x-component="ProcessProcedureSelect"
                x-component-props={{
                  placeholder: '请选择工序',
                  labelInValue: true,
                }}
                x-validator={[{ required: true, message: '请选择工序' }]}
                x-reactions={{
                  fulfill: {
                    run: `
                      if ($self.value) {
                        const workCenterCode = $self.value.workCenterCode || '';
                        const workCenterName = $self.value.workCenterName || '';
                        $form.setFieldState('workCenter', state => {
                          state.value = workCenterCode && workCenterName
                            ? workCenterCode + ' - ' + workCenterName
                            : '';
                        });
                      }
                    `,
                  },
                }}
              />
              <SchemaField.String
                title="工作中心"
                name="workCenter"
                x-decorator="FormItem"
                x-component="Input"
                x-pattern="readPretty"
              />
            </SchemaField.Void>

            <SchemaField.Void x-component="SectionTitle" x-content="控制要求" />
            <SchemaField.Void
              x-component="FormGrid"
              x-component-props={{ maxColumns: 4, minColumns: 1, strictAutoFit: true }}
            >
              <SchemaField.Boolean
                title="检查前工序"
                name="isNeedCheckPrevWp"
                x-decorator="FormItem"
                x-component="Switch"
              />
              <SchemaField.Number
                title="检查数量"
                name="checkPrevQuantity"
                x-decorator="FormItem"
                x-component="NumberPicker"
                x-component-props={{ min: 0, style: { width: '100%' } }}
              />
              <SchemaField.Boolean
                title="检查本工序"
                name="isNeedCheckWp"
                x-decorator="FormItem"
                x-component="Switch"
              />
              <SchemaField.Boolean
                title="需要拍照"
                name="needPicture"
                x-decorator="FormItem"
                x-component="Switch"
              />
            </SchemaField.Void>

            <SchemaField.Void x-component="SectionTitle" x-content="资源与成本" />
            <SchemaField.Void
              x-component="FormGrid"
              x-component-props={{ maxColumns: 3, minColumns: 1, strictAutoFit: true }}
            >
              <SchemaField.Number
                title="工人数量"
                name="workerCount"
                x-decorator="FormItem"
                x-component="NumberPicker"
                x-component-props={{ min: 0, style: { width: '100%' } }}
              />
              <SchemaField.Number
                title="制造成本"
                name="manuFactureCost"
                x-decorator="FormItem"
                x-component="NumberPicker"
                x-component-props={{ min: 0, prefix: '￥', style: { width: '100%' } }}
              />
              <SchemaField.Boolean
                title="是否外协"
                name="isOutsourced"
                x-decorator="FormItem"
                x-component="Switch"
              />
            </SchemaField.Void>

            <SchemaField.Void x-component="SectionTitle" x-content="质量要求" />
            <SchemaField.Void
              x-component="FormGrid"
              x-component-props={{ maxColumns: 2, minColumns: 1, strictAutoFit: true }}
            >
              <SchemaField.String
                title="检验方案"
                name="inspectionSchemeCode"
                x-decorator="FormItem"
                x-component="Input"
                x-component-props={{ placeholder: '请输入检验方案编码' }}
              />
              <SchemaField.String
                title="抽样方案"
                name="sampleSchemeCode"
                x-decorator="FormItem"
                x-component="Input"
                x-component-props={{ placeholder: '请输入抽样方案编码' }}
              />
            </SchemaField.Void>

            <SchemaField.Void x-component="SectionTitle" x-content="其他" />
            <SchemaField.String
              title="备注"
              name="memo"
              x-decorator="FormItem"
              x-component="Input.TextArea"
              x-component-props={{ placeholder: '请输入备注', rows: 3, maxLength: 500 }}
            />
          </SchemaField>
        </FormLayout>
      </FormProvider>
    </Modal>
  );
};

export default NodeEditDialog;
