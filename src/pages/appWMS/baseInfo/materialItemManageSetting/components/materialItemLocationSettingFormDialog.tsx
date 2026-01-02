import { MaterialItemManagerSettingCreateAsync, MaterialItemManagerSettingGetAsync, MaterialItemManagerSettingUpdateAsync } from '@/services/wms/MaterialItemManagerSetting';
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { Button } from "antd";
import React from "react";
import { formId, formSchema } from "./schema";
import { useFormSchema, useSchemaField } from "umi";
import FormLayoutMode from '@/pages/_utils/editMode';

const MaterialItemLocationSettingFormDialog = (props: any) => {
    const { entityId, title, buttonProps, onAfterSubmit } = props;

    const schema = useFormSchema(formId, formSchema);

    const SchemaField = useSchemaField({});

    const formProps = {
        effects: () => {
            onFormInit((form) => {
                if (entityId) {
                    MaterialItemManagerSettingGetAsync({ id: entityId }).then((setting: any) => {
                        console.log('获取到的设置数据:', setting);
                        console.log('物料数据结构:', setting.materialItem);
                        console.log('物料分类数据结构:', setting.materialItemCategory);
                        console.log('仓库数据结构:', setting.warehouse);

                        // 使用 setFieldState 方法设置 labelInValue 字段

                        // 处理管理员字段 - 使用基本字段 managerId 和 managerName
                        if (setting.managerId) {
                            let managerLabel = setting.managerName || `管理员ID: ${setting.managerId}`;

                            // 如果有Manager对象，优先使用其中的信息
                            if (setting.manager && setting.manager.name) {
                                managerLabel = setting.manager.name;
                            }

                            form.setFieldState("{value:managerId,label:managerName}", state => {
                                state.value = {
                                    value: setting.managerId,
                                    label: managerLabel
                                };
                            });
                            console.log('设置管理员字段:', setting.managerId, managerLabel);
                        }

                        // 处理班组字段
                        if (setting.warehouseTeamId && setting.warehouseTeamId !== '00000000-0000-0000-0000-000000000000') {
                            const teamLabel = setting.warehouseTeamName || `班组ID: ${setting.warehouseTeamId}`;
                            form.setFieldState("{value:warehouseTeamId,label:warehouseTeamName}", state => {
                                state.value = {
                                    value: setting.warehouseTeamId,
                                    label: teamLabel
                                };
                            });
                            console.log('设置班组字段:', setting.warehouseTeamId, teamLabel);
                        }

                        // 处理物料分类字段
                        if (setting.materialItemCategoryId) {
                            let categoryLabel = `分类ID: ${setting.materialItemCategoryId}`;
                            if (setting.materialItemCategory) {
                                if (setting.materialItemCategory.name && setting.materialItemCategory.code) {
                                    categoryLabel = `${setting.materialItemCategory.name}(${setting.materialItemCategory.code})`;
                                } else if (setting.materialItemCategory.name) {
                                    categoryLabel = setting.materialItemCategory.name;
                                } else if (setting.materialItemCategory.code) {
                                    categoryLabel = setting.materialItemCategory.code;
                                }
                            }
                            form.setFieldState("{value:materialItemCategoryId,label:materialItemCategoryName}", state => {
                                state.value = {
                                    value: setting.materialItemCategoryId,
                                    label: categoryLabel
                                };
                            });
                            console.log('设置物料分类字段:', setting.materialItemCategoryId, categoryLabel);
                        }
                        // 处理仓库字段
                        if (setting.wareHouseId) {
                            let warehouseLabel = `仓库ID: ${setting.wareHouseId}`;
                            if (setting.warehouse) {
                                if (setting.warehouse.name && setting.warehouse.code) {
                                    warehouseLabel = `${setting.warehouse.name}(${setting.warehouse.code})`;
                                } else if (setting.warehouse.name) {
                                    warehouseLabel = setting.warehouse.name;
                                } else if (setting.warehouse.code) {
                                    warehouseLabel = setting.warehouse.code;
                                }
                            }
                            form.setFieldState("{value:wareHouseId,label:wareHouseName}", state => {
                                state.value = {
                                    value: setting.wareHouseId,
                                    label: warehouseLabel
                                };
                            });
                            console.log('设置仓库字段:', setting.wareHouseId, warehouseLabel);
                        }

                        // 处理物料字段
                        if (setting.materialItem) {
                            let materialLabel = '';
                            let materialId = '';

                            // 检查不同的物料数据结构
                            if (setting.materialItem.id) {
                                materialId = setting.materialItem.id;
                                materialLabel = `${setting.materialItem.code || ''}(${setting.materialItem.description || ''})`;
                            } else if (setting.materialItem.materialItemId) {
                                materialId = setting.materialItem.materialItemId;
                                materialLabel = `${setting.materialItem.materialItemCode || ''}(${setting.materialItem.materialItemDescription || ''})`;
                            }

                            if (materialId) {
                                form.setFieldState("{value:materialItemId,label:materialItemCode}", state => {
                                    state.value = {
                                        value: materialId,
                                        label: materialLabel
                                    };
                                });
                                console.log('设置物料字段:', materialId, materialLabel);
                            }
                        }

                        // 设置其他非 labelInValue 字段
                        form.setInitialValues({
                            ...setting,
                            // 清除原始ID字段，使用上面设置的对象格式
                            managerId: undefined,
                            warehouseTeamId: undefined,
                            materialItemCategoryId: undefined,
                            wareHouseId: undefined,
                            materialItemId: undefined
                        });
                    })
                }
            })
        }
    };
    const portalId = `WMS.base.materialItemManageSetting${entityId}`
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
                        // 转换labelInValue格式的数据
                        const submitData = { ...values };

                        // 处理管理员字段
                        if (values['{value:managerId,label:managerName}']) {
                            const managerData = values['{value:managerId,label:managerName}'];
                            submitData.managerId = managerData.value;
                            submitData.managerName = managerData.label;
                            delete submitData['{value:managerId,label:managerName}'];
                        }

                        // 处理物料分类字段
                        if (values['{value:materialItemCategoryId,label:materialItemCategoryName}']) {
                            const categoryData = values['{value:materialItemCategoryId,label:materialItemCategoryName}'];
                            submitData.materialItemCategoryId = categoryData.value;
                            delete submitData['{value:materialItemCategoryId,label:materialItemCategoryName}'];
                        }

                        // 处理仓库字段
                        if (values["wareHouseId"]) {
                            const warehouseData = values["wareHouseId"];
                            submitData.Warehouse = {id:warehouseData};
                            delete submitData['"wareHouseId"'];
                        }

                        // 处理物料字段
                        if (values['{value:materialItemId,label:materialItemCode}']) {
                            const materialData = values['{value:materialItemId,label:materialItemCode}'];
                            submitData.materialItemId = materialData.value;
                            delete submitData['{value:materialItemId,label:materialItemCode}'];
                        }

                        // 处理班组字段
                        if (values['{value:warehouseTeamId,label:warehouseTeamName}']) {
                            const teamData = values['{value:warehouseTeamId,label:warehouseTeamName}'];
                            submitData.warehouseTeamId = teamData.value;
                            submitData.warehouseTeamName = teamData.label;
                            delete submitData['{value:warehouseTeamId,label:warehouseTeamName}'];
                        }

                        if (!values.id) {
                            return MaterialItemManagerSettingCreateAsync(submitData).then(() => { if (onAfterSubmit) onAfterSubmit() }).then(() => { next(payload) });
                        } else {
                            return MaterialItemManagerSettingUpdateAsync({ id: values.id }, submitData).then(() => { if (onAfterSubmit) onAfterSubmit() }).then(() => { next(payload) });
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

export default MaterialItemLocationSettingFormDialog
