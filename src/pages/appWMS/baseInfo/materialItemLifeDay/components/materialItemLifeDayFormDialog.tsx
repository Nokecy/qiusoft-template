import { MaterialItemLifeDayGetAsync, MaterialItemLifeDayUpdateMaterialItemLifeDayAsync, MaterialItemLifeDayCreateMaterialItemLifeDayAsync } from '@/services/wms/MaterialItemLifeDay';
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { Button } from "antd";
import React from "react";
import { formId, formSchema } from "./schema";
import { useFormSchema, useSchemaField } from "umi";
import FormLayoutMode from '@/pages/_utils/editMode';


const MaterialLifeDayFormDialog = (props: any) => {
    const { entityId, title, buttonProps, onAfterSubmit } = props;

    const schema = useFormSchema(formId, formSchema);

    const SchemaField = useSchemaField({});

    const formProps = {
        effects: () => {
            onFormInit((form) => {
                if (entityId) {
                    MaterialItemLifeDayGetAsync({ id: entityId }).then((workshiftsInfo) => {
                        console.log('获取到的物料生命周期数据:', workshiftsInfo);
                        
                        // 处理物料选择器字段
                        if (workshiftsInfo.materialItem) {
                            const materialLabel = workshiftsInfo.materialItem.code || `物料ID: ${workshiftsInfo.materialItem.id}`;
                            form.setFieldState("{value:materialItemId,label:materialItemCode}", state => {
                                state.value = {
                                    value: workshiftsInfo.materialItem!.id,
                                    label: materialLabel,
                                    data: workshiftsInfo.materialItem // 保存完整的物料信息
                                };
                            });
                            console.log('设置物料字段:', workshiftsInfo.materialItem.id, materialLabel);
                        }

                        // 设置其他字段
                        form.setInitialValues({
                            ...workshiftsInfo,
                            // 清除原始materialItem字段，避免冲突
                            materialItem: undefined
                        });
                    })
                }
            })
        }
    };
    const portalId = `WMS.base.materialItemLifeDay${entityId}`
    return (
        <FormDialog.Portal id={portalId}>
            <Button type={"primary"} onClick={() => {
                let formDialog = FormDialog({ title: title, width: 960 }, portalId, () => {
                    return (<>
                        <FormLayoutMode formId={formId} {...schema.form} editClickAfter={() => formDialog.close()}>
                            <SchemaField schema={schema.schema} />
                        </FormLayoutMode>
                    </>)
                });

                formDialog
                    .forConfirm((payload, next) => {
                        let values: any = payload.values;
                        if (!values.id) {
                            return MaterialItemLifeDayCreateMaterialItemLifeDayAsync(values).then(() => { if (onAfterSubmit) onAfterSubmit() }).then(() => { next(payload) });
                        } else {
                            return MaterialItemLifeDayUpdateMaterialItemLifeDayAsync({ id: values.id }, values).then(() => { if (onAfterSubmit) onAfterSubmit() }).then(() => { next(payload) });
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

export default MaterialLifeDayFormDialog

