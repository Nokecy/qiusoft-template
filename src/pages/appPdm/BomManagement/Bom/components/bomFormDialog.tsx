import { BomCreateAsync } from '@/services/pdm/Bom';
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { Button, Spin } from 'antd';
import React from 'react';
import { useDynamicSchema } from '@@/plugin-dynamicSchema';
import { useSchemaField } from '@@/plugin-formSchema';
import MaterialSelect from '../../_components/MaterialSelect';
import { useForm } from '@formily/react';

interface Props {
  title: string;
  buttonProps?: any;
  onAfterSubmit?: () => void;
  initialValues?: Record<string, any>;
}

const BomFormDialog: React.FC<Props> = ({ title, buttonProps, onAfterSubmit, initialValues, children }) => {
  const { schema, formConfig, loading } = useDynamicSchema('bom:dialog');

  // 创建自定义 MaterialSelect 组件,处理选择后自动填充描述
  const CustomMaterialSelect = (props: any) => {
    const { value, onChange, ...rest } = props;
    const form = useForm();

    const handleChange = (val: any, option: any) => {
      onChange?.(val);
      // 自动填充物料描述
      if (option?.description) {
        form.setFieldState('materialDescription', (state) => {
          state.value = option.description;
        });
      }
    };

    return <MaterialSelect {...rest} value={value} onChange={handleChange} />;
  };

  const SchemaField = useSchemaField({ MaterialSelect: CustomMaterialSelect });

  const portalId = 'Pdm.BomManagement.Bom.Create';

  return (
    <FormDialog.Portal id={portalId}>
      <Button
        type={'primary'}
        onClick={() => {
          const formDialog = FormDialog({ title, width: 720 }, portalId, () => {
            if (loading) {
              return <Spin tip="加载表单配置中..." />;
            }
            return (
              <FormLayout {...formConfig}>
                <SchemaField schema={schema} />
              </FormLayout>
            );
          });

          formDialog
            .forOpen((payload, next) => {
              // 设置初始值
              if (initialValues) {
                next({ initialValues });
              } else {
                next(payload);
              }
            })
            .forConfirm((payload, next) => {
              const values: API.BurnAbpPdmBomManagementBomsCreateBomDto = payload.values;
              return BomCreateAsync(values)
                .then(() => {
                  onAfterSubmit && onAfterSubmit();
                })
                .then(() => next(payload));
            })
            .open();
        }}
        {...buttonProps}
      >
        {children}
      </Button>
    </FormDialog.Portal>
  );
};

export default BomFormDialog;

