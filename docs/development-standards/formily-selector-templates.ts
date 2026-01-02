/**
 * Formily 选择器字段代码模板
 * 
 * 使用说明：
 * 1. 复制对应的模板代码
 * 2. 替换 fieldCode、fieldName、SelectComponent 等占位符
 * 3. 根据实际需求调整验证规则和组件属性
 */

// ==================== Schema 配置模板 ====================

/**
 * 基础选择器字段模板
 * 替换：fieldCode, fieldName, SelectComponent, 显示名称
 */
export const basicSelectorFieldTemplate = {
  "{value:fieldCode,label:fieldName}": {
    "type": "string",
    "title": "显示名称",
    "x-decorator": "FormItem",
    "x-component": "SelectComponent",
    "x-validator": [
      {
        "required": true,
        "message": "请选择显示名称"
      }
    ],
    "x-component-props": {
      "labelInValue": true,
      "placeholder": "请选择...",
      "showSearch": true,
      "allowClear": true
    },
    "x-decorator-props": {},
    "name": "{value:fieldCode,label:fieldName}",
    "x-designable-id": "uniqueId",
    "x-index": 0
  }
};

/**
 * 线体选择器模板
 */
export const lineSelectTemplate = {
  "{value:lineCode,label:lineName}": {
    "type": "string",
    "title": "线体编码",
    "x-decorator": "FormItem",
    "x-component": "WorkLineSelect",
    "x-validator": [
      {
        "required": true,
        "message": "请选择线体编码"
      }
    ],
    "x-component-props": {
      "labelInValue": true
    },
    "name": "{value:lineCode,label:lineName}"
  }
};

/**
 * 部门选择器模板
 */
export const departSelectTemplate = {
  "{value:departCode,label:departName}": {
    "type": "string",
    "title": "部门信息",
    "x-decorator": "FormItem",
    "x-component": "DeptSelect",
    "x-validator": [
      {
        "required": true,
        "message": "请选择部门"
      }
    ],
    "x-component-props": {
      "labelInValue": true
    },
    "name": "{value:departCode,label:departName}"
  }
};

/**
 * 班组选择器模板
 */
export const workTeamSelectTemplate = {
  "{value:workTeamCode,label:workTeamName}": {
    "type": "string",
    "title": "班组选择",
    "x-decorator": "FormItem",
    "x-component": "WorkTeamSelect",
    "x-component-props": {
      "labelInValue": true
    },
    "name": "{value:workTeamCode,label:workTeamName}"
  }
};

// ==================== 数据处理模板 ====================

/**
 * 注意：使用 {value:fieldCode,label:fieldName} 格式的字段
 * Formily 会自动处理提交时的数据转换，无需手动编写转换逻辑
 *
 * 表单提交时会自动将复合字段拆分为独立的 fieldCode 和 fieldName 字段
 */

/**
 * 自动数据转换说明
 *
 * 提交时自动转换：
 * {value:lineCode,label:lineName} → lineCode: "LINE001", lineName: "生产线1"
 *
 * 无需手动编写以下代码：
 * if (values['{value:lineCode,label:lineName}']) {
 *   const lineData = values['{value:lineCode,label:lineName}'];
 *   values.lineCode = lineData.value;
 *   values.lineName = lineData.label;
 * }
 */

/**
 * 数据回填模板
 * 在 onFormInit 回调中使用
 */
export const dataBackfillTemplate = `
// 处理单个字段回填
if (configInfo.fieldCode && configInfo.fieldName) {
  configInfo['{value:fieldCode,label:fieldName}'] = {
    value: configInfo.fieldCode,
    label: configInfo.fieldName
  };
}

// 处理数组中的字段回填
if (configInfo.items && Array.isArray(configInfo.items)) {
  configInfo.items = configInfo.items.map((item: any) => {
    const processedItem = { ...item };
    
    // 处理字段回填
    if (processedItem.fieldCode && processedItem.fieldName) {
      processedItem['{value:fieldCode,label:fieldName}'] = {
        value: processedItem.fieldCode,
        label: processedItem.fieldName
      };
    }
    
    return processedItem;
  });
}
`;

// ==================== 完整的 FormDialog 模板 ====================

export const completeFormDialogTemplate = `
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { Button } from "antd";
import React from "react";
import { useFormSchema, useSchemaField } from "umi";
import { formId, formSchema } from "./schema";
import {
    EntityCreateAsync,
    EntityGetAsync,
    EntityUpdateAsync
} from "@/services/path/Entity";

const EntityFormDialog = (props: any) => {
    const { entityId, title, buttonProps, onAfterSubmit } = props;
    const schema = useFormSchema(formId, formSchema);
    const SchemaField = useSchemaField({});

    const formProps = {
        effects: () => {
            onFormInit(async (form) => {
                if (entityId) {
                    let configInfo = await EntityGetAsync({ id: entityId });
                    
                    // 处理数据回填
                    if (configInfo.fieldCode && configInfo.fieldName) {
                        configInfo['{value:fieldCode,label:fieldName}'] = {
                            value: configInfo.fieldCode,
                            label: configInfo.fieldName
                        };
                    }
                    
                    form.setValues(configInfo);
                }
            })
        }
    };
    
    const portalId = \`EntityFormDialog\${entityId}\`;
    
    return (
        <FormDialog.Portal id={portalId}>
            <Button type={"primary"} onClick={() => {
                let formDialog = FormDialog({ title: title, width: 1200 }, portalId, () => {
                    return (
                        <FormLayout {...schema.form}>
                            <SchemaField schema={schema.schema}></SchemaField>
                        </FormLayout>
                    )
                });

                formDialog
                    .forConfirm((payload, next) => {
                        let values: any = payload.values;

                        // 无需手动数据转换，Formily 自动处理 {value:code,label:name} 格式

                        if (!values.id) {
                            return EntityCreateAsync(values).then(() => {
                                if (onAfterSubmit) onAfterSubmit();
                                next(payload)
                            });
                        } else {
                            return EntityUpdateAsync({ id: values?.id }, values).then(() => {
                                if (onAfterSubmit) onAfterSubmit();
                                next(payload)
                            });
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
}

export default EntityFormDialog;
`;

// ==================== 使用示例 ====================

/**
 * 使用示例：线体工序配置
 */
export const lineWorkProcedureConfigExample = {
  // Schema 中的字段配置
  schema: {
    "{value:lineCode,label:lineName}": {
      "type": "string",
      "title": "线体编码",
      "x-decorator": "FormItem",
      "x-component": "WorkLineSelect",
      "x-validator": [
        {
          "required": true,
          "message": "请选择线体编码"
        }
      ],
      "x-component-props": {
        "labelInValue": true
      },
      "name": "{value:lineCode,label:lineName}"
    }
  },
  
  // FormDialog 中的数据处理
  dataTransform: `
    // 提交时：无需手动转换，Formily 自动处理
    // 表单会自动将 {value:lineCode,label:lineName} 拆分为 lineCode 和 lineName 字段

    // 回填时转换
    if (configInfo.lineCode && configInfo.lineName) {
      configInfo['{value:lineCode,label:lineName}'] = {
        value: configInfo.lineCode,
        label: configInfo.lineName
      };
    }
  `
};
