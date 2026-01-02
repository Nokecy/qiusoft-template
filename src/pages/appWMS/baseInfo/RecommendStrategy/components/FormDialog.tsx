import { FormDialog, FormLayout, } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { Button, } from "antd";
import React from "react";
import { useFormSchema, useSchemaField } from "umi";
import { formId, formSchema } from "./schema";
import { publicTrim } from "@/components/public";
import FormLayoutMode from '@/pages/_utils/editMode';
import { PutItemRecommendStrategyCreateAsync, PutItemRecommendStrategyGetAsync, PutItemRecommendStrategyUpdateAsync } from '@/services/wms/PutItemRecommendStrategy';


const ModelFormDialog = (props: any) => {
    const { entityId, title, buttonProps, onAfterSubmit } = props;

    const schema = useFormSchema(formId, formSchema);

    const SchemaField = useSchemaField({});

    const formProps = {
        effects: () => {
            onFormInit(async (form) => {
                if (entityId) {
                    let workshiftsInfo = await PutItemRecommendStrategyGetAsync({ id: entityId });
                    const { materialCategoryCodes, warehouseLocationCodes, warehouseZoneCodes } = workshiftsInfo;

                    const splitAndMap = (codes) => {
                        return codes.split(',').map((item) => ({
                            children: item,
                            key: item,
                            value: item
                        }));
                    };

                    let materialItemCategoryCodeArr = [];
                    if (materialCategoryCodes) {
                        materialItemCategoryCodeArr = splitAndMap(materialCategoryCodes);
                    }

                    let warehouseLocationCodeArr = [];
                    if (warehouseLocationCodes) {
                        warehouseLocationCodeArr = splitAndMap(warehouseLocationCodes);
                    }

                    let warehouseZoneCodeArr = [];
                    if (warehouseZoneCodes) {
                        warehouseZoneCodeArr = splitAndMap(warehouseZoneCodes);
                    }


                    form.setInitialValuesIn('materialItemCategoryCodeArr', materialItemCategoryCodeArr)
                    form.setInitialValuesIn('warehouseLocationCodeArr', warehouseLocationCodeArr)
                    form.setInitialValuesIn('warehouseZoneCodeArr', warehouseZoneCodeArr)

                    form.setInitialValues(publicTrim(workshiftsInfo));
                }
            })

        }
    };
    const portalId = `appSettlement.BaseInfo.RecommendStrategy${entityId}`
    return (<FormDialog.Portal id={portalId}>
        <Button type={"primary"} onClick={() => {
            let formDialog1 = FormDialog({ title: title, width: 1260, }, portalId, () => {
                return (
                    <FormLayoutMode formId={formId} {...schema.form} editClickAfter={() => formDialog1.close()}>
                        <SchemaField schema={schema.schema} />
                    </FormLayoutMode>
                )
            });

            formDialog1
                .forConfirm((payload, next) => {
                    let values: any = payload.values;
                    const joinValues = (arr, key) => arr.map(item => item[key]).join(',');
                    if (values.materialItemCategoryCodeArr) {
                        values.materialCategoryCodes = joinValues(values.materialItemCategoryCodeArr, 'children');
                    }
                    if (values.warehouseLocationCodeArr) {
                        values.warehouseLocationCodes = joinValues(values.warehouseLocationCodeArr, 'value');
                    }
                    if (values.warehouseZoneCodeArr) {
                        values.warehouseZoneCodes = joinValues(values.warehouseZoneCodeArr, 'children');
                    }
                    delete values.materialItemCategoryCodeArr;
                    delete values.warehouseLocationCodeArr;
                    delete values.warehouseZoneCodeArr;
                    // console.log('reocrd1 2222', values);

                    if (!values.id) {
                        return PutItemRecommendStrategyCreateAsync(values).then(() => { if (onAfterSubmit) onAfterSubmit(); next(payload) });
                    } else {
                        return PutItemRecommendStrategyUpdateAsync({ id: values?.id }, values).then(() => { if (onAfterSubmit) onAfterSubmit(); next(payload) });
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

export default ModelFormDialog