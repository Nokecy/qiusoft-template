import {
  CategoryLevelTemplateAddItemAsync,
  CategoryLevelTemplateUpdateItemAsync,
} from '@/services/pdm/CategoryLevelTemplate';
import { FormDialog } from '@formily/antd-v5';
import { Button } from 'antd';
import React, { useMemo } from 'react';
import { itemFormId, createItemFormSchema } from './itemSchema';
import { useSchemaField } from 'umi';
import FormLayoutMode from '@/pages/_utils/editMode';

interface ItemFormDialogProps {
  templateId: number;
  levelId: number;
  entityId?: number;
  /** 获取初始值的函数，在点击时调用以获取最新数据 */
  getInitialValues?: () => any;
  /** 上一层级的候选项列表，用于配置 allowedParentCodes */
  parentLevelItems?: { itemCode: string; itemName: string }[];
  title?: string;
  buttonProps?: any;
  children?: React.ReactNode;
  onAfterSubmit?: () => void;
}

const ItemFormDialog: React.FC<ItemFormDialogProps> = (props) => {
  const {
    templateId,
    levelId,
    entityId,
    getInitialValues,
    parentLevelItems = [],
    title,
    buttonProps = {},
    children,
    onAfterSubmit,
  } = props;

  // 构建父项选项
  const parentItemOptions = useMemo(() => {
    return parentLevelItems.map((item) => ({
      label: `${item.itemCode} - ${item.itemName}`,
      value: item.itemCode,
    }));
  }, [parentLevelItems]);

  const schema = createItemFormSchema(parentItemOptions);
  const SchemaField = useSchemaField();

  const portalId = `Pdm.CategoryLevelItem.${templateId}.${levelId}.${entityId || 'new'}`;

  return (
    <FormDialog.Portal id={portalId}>
      <Button
        type={'primary'}
        onClick={() => {
          // 在点击时调用函数获取最新数据
          const currentInitialValues = getInitialValues ? getInitialValues() : null;

          const formDialog = FormDialog(
            { title: title || (entityId ? '编辑候选项' : '添加候选项'), width: 680 },
            portalId,
            () => {
              return (
                <FormLayoutMode formId={itemFormId} {...schema.form} editClickAfter={() => formDialog.close()}>
                  <SchemaField schema={schema.schema} />
                </FormLayoutMode>
              );
            }
          );

          formDialog
            .forOpen((payload, next) => {
              // 使用 forOpen 每次打开时设置最新的初始值
              if (entityId && currentInitialValues) {
                next({
                  initialValues: currentInitialValues,
                  effects: (form) => {
                    // 编辑模式下，候选项代码设为只读
                    form.setFieldState('grid.itemCode', (state) => {
                      state.pattern = 'readPretty';
                    });
                  },
                });
              } else {
                next({
                  initialValues: {
                    isCodeParticipant: true,
                    isActive: true,
                    allowCustomVersionNumber: false,
                    sortOrder: 0,
                  },
                });
              }
            })
            .forConfirm((payload, next) => {
              const values: any = payload.values;
              if (!entityId) {
                return CategoryLevelTemplateAddItemAsync({ templateId, levelId }, values)
                  .then(() => {
                    if (onAfterSubmit) onAfterSubmit();
                  })
                  .then(() => {
                    next(payload);
                  });
              } else {
                return CategoryLevelTemplateUpdateItemAsync({ templateId, levelId, itemId: entityId }, values)
                  .then(() => {
                    if (onAfterSubmit) onAfterSubmit();
                  })
                  .then(() => {
                    next(payload);
                  });
              }
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

export default ItemFormDialog;
