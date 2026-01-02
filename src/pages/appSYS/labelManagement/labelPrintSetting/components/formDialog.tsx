import { FormDialog, FormLayout, Alert, FormCollapse } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { Button, message } from 'antd';
import React from 'react';
import { useFormSchema, useSchemaField } from 'umi';
import { formId, formSchema } from './schema';
import { fromApiFormat, toApiFormat, validateConversion } from './ruleConverter';
import { RuleBuilderWrapper } from './RuleBuilderWrapper';
import PrintFeatureSelect from '../../_utils/printFeatureSelect';
import CustomerSelect from '@/pages/appCommon/_utils/CustomerSelect';

const LabelPrintSettingFormDialog = (props: any) => {
  const { entityId, title, buttonProps, onAfterSubmit, getRequest, createRequest, updateRequest } =
    props;

  const schema = useFormSchema(formId, formSchema);
  const SchemaField = useSchemaField({
    Alert,
    FormCollapse,
    RuleBuilderWrapper,
    PrintFeatureSelect,
    CustomerSelect,
  });

  const formProps = {
    effects: () => {
      onFormInit(async (form) => {
        if (entityId) {
          try {
            // 1. 加载后端数据
            const data = await getRequest({ id: entityId });
            console.log('🔄 编辑模式 - 后端返回数据:', data);
            console.log('🔄 后端 dimensionRuleGroup:', data.dimensionRuleGroup);

            // 2. 类型转换: 后端 API 格式 → 前端格式
            if (data.dimensionRuleGroup) {
              const convertedRuleGroup = fromApiFormat(data.dimensionRuleGroup);
              console.log('✅ 转换后的规则组:', convertedRuleGroup);

              // 3. 验证转换结果
              if (!validateConversion(convertedRuleGroup)) {
                console.error('❌ 规则数据转换验证失败', data.dimensionRuleGroup);
                message.warning('规则数据格式异常,已自动清空规则配置');
                data.dimensionRuleGroup = undefined;
              } else {
                console.log('✅ 规则数据验证通过');
                data.dimensionRuleGroup = convertedRuleGroup;
              }
            } else {
              console.log('ℹ️ 无规则配置数据');
            }

            // 4. 设置表单初始值
            console.log('📝 设置表单初始值:', data);
            form.setInitialValues(data);
          } catch (error: any) {
            console.error('加载打印设置失败:', error);
            message.error(error?.message || '加载数据失败');
          }
        }
      });
    },
  };

  const portalId = `labelManagement.labelPrintSetting.${entityId}`;

  return (
    <FormDialog.Portal id={portalId}>
      <Button
        type="primary"
        onClick={() => {
          const formDialog = FormDialog({ title: title, width: 1200 }, portalId, () => {
            return (
              <FormLayout {...schema.form}>
                <SchemaField schema={schema.schema} />
              </FormLayout>
            );
          });

          formDialog
            .forConfirm(async (payload, next) => {
              try {
                const values: any = payload.values;

                // ==================== 类型转换: 前端格式 → 后端 API 格式 ====================
                if (values.dimensionRuleGroup) {
                  // 1. 验证前端数据
                  if (!validateConversion(values.dimensionRuleGroup)) {
                    message.error('规则配置数据格式错误,请检查后重试');
                    return;
                  }

                  // 2. 转换为后端 API 格式
                  const apiRuleGroup = toApiFormat(values.dimensionRuleGroup);
                  values.dimensionRuleGroup = apiRuleGroup;

                  // 3. 打印日志 (开发环境)
                  if (process.env.NODE_ENV === 'development') {
                    console.log('前端规则数据:', payload.values.dimensionRuleGroup);
                    console.log('后端 API 格式:', apiRuleGroup);
                  }
                }

                // ==================== 调用 API 保存数据 ====================
                if (!values.id) {
                  // 新增
                  await createRequest(values);
                  message.success('创建成功');
                } else {
                  // 更新
                  await updateRequest({ id: values?.id }, values);
                  message.success('更新成功');
                }

                // 刷新列表
                if (onAfterSubmit) onAfterSubmit();

                // 关闭对话框
                return next(payload);
              } catch (error: any) {
                console.error('保存打印设置失败:', error);
                message.error(error?.message || '保存失败');
              }
            })
            .open(formProps);
        }}
        {...buttonProps}
      >
        {props.children}
      </Button>
    </FormDialog.Portal>
  );
};

export default LabelPrintSettingFormDialog;
