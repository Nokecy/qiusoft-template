import { ExcludeCompareSettingCreateAsync, ExcludeCompareSettingGetAsync, ExcludeCompareSettingUpdateAsync } from '@/services/wms/ExcludeCompareSetting';
import { FormDialog, FormGrid, FormItem, FormLayout, FormTab, Input, Select, Space, NumberPicker, Checkbox } from '@formily/antd-v5';
import { isField, onFieldInputValueChange, onFieldValueChange, onFormInit, onFormValuesChange } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { Button } from "antd";
import React, { useMemo } from "react";
import compareSettingTypeSelect from './compareSettingTypeSelect';

const CompareSettingFromDialog = (props: any) => {
    const { entityId, title, buttonProps, onAfterSubmit } = props;
    const SchemaField = useMemo(() => createSchemaField({
        components: {
            FormTab, FormItem, FormGrid, Space, Input, Select, NumberPicker, Checkbox, compareSettingTypeSelect
        },
    }), [])

    const formProps = {
        effects: () => {
            onFormInit(async (form) => {
                if (entityId) {
                    let compareSetting: any = await ExcludeCompareSettingGetAsync({ id: entityId });
                    form.setInitialValues({ ...compareSetting });
                } else {
                    let a: any = {}
                    form.setInitialValues(a)
                }
            })
        }
    };

    const portalId = `compareSetting${entityId}`
    return (<FormDialog.Portal id={portalId}>
        <Button type={"primary"} onClick={() => {
            let formDialog = FormDialog({ title: title, width: 760 }, portalId, () => {
                return (
                    <FormLayout labelWidth={150} feedbackLayout={'none'} shallow={false}>
                        <SchemaField>
                            <SchemaField.Void x-component={"FormGrid"} x-component-props={{ maxColumns: [1], strictAutoFit: true }}>
                                <SchemaField.String title={"排除类型"} required name={"excludeType"} x-decorator="FormItem" x-component={"compareSettingTypeSelect"} x-component-props={{ placeholder: "请输入类型" }} />
                                <SchemaField.String title={"排除值"} required name={"excludeValue"} x-decorator="FormItem" x-component={"Input"} x-component-props={{ placeholder: "请输入排除值" }} />
                                <SchemaField.String title={"启用"} required name={"enableFlag"} x-decorator="FormItem" x-component={"Checkbox"} default={true} />
                            </SchemaField.Void>
                        </SchemaField>
                    </FormLayout>)
            });
            formDialog
                .forConfirm((payload, next) => {
                    let values: any = payload.values
                    if (!values.id) {
                        return ExcludeCompareSettingCreateAsync(values).then(() => { if (onAfterSubmit) onAfterSubmit(); next(payload) });
                    } else {
                        return ExcludeCompareSettingUpdateAsync({ id: values.id }, values).then(() => { if (onAfterSubmit) onAfterSubmit(); next(payload) });
                    }
                }).open(formProps);
        }}
            {...buttonProps}>
            {props.children}
        </Button>
    </FormDialog.Portal >
    );
}

export default CompareSettingFromDialog;