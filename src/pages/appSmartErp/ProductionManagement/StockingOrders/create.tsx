import { MaterialGetByCodeAsync, MaterialGetMaterialAttributeListAsync } from '@/services/common/Material';
import { StockingOrderCreateAsync } from '@/services/smarterp/StockingOrder';
import { CustomerGetByCodeAsync } from '@/services/common/Customer';
import { WarehouseGetByCodeAsync } from '@/services/common/Warehouse';
import { Form } from '@formily/antd-v5';
import { createForm, onFieldInputValueChange, onFieldValueChange, onFormSubmitValidateFailed } from '@formily/core';
import { Button, message, Spin } from 'antd';
import React, { useMemo, useState } from 'react';
import { history, useFormSchema, useSchemaField, useMutation, closeTab } from 'umi';
import { formId, formSchema } from './components/schema';
import ToolBar from '@/components/toolBar';
import {
    CustomerSelect
} from '@/pages/appCommon/_utils';
import { MaterialSelect, UnitSelect } from '@/pages/appCommon/_utils';
import AttributeField from '@/pages/appSmartErp/_utils/attributeField';

const StockingOrderCreatePage = () => {
    let [loading, setLoading] = useState(false);

    const schema = useFormSchema(formId, formSchema);
    const SchemaField = useSchemaField({
        CustomerSelect: (props: any) => <CustomerSelect {...props} useCode={true} />,
        MaterialSelect: (props: any) => <MaterialSelect {...props} useCode={true} />,
        UnitSelect: (props: any) => <UnitSelect {...props} useCode={true} />,
        AttributeFieldSelect: AttributeField
    });

    const { isLoading, mutateAsync: createAsync } = useMutation((formValues: any) => {
        return StockingOrderCreateAsync(formValues);
    }, {});

    const handleSubmit = formValues => {
        // 转换 attributes 中的 value 为字符串
        if (formValues.items && Array.isArray(formValues.items)) {
            formValues.items.forEach(item => {
                if (item.attributes && Array.isArray(item.attributes)) {
                    item.attributes = item.attributes.map(attr => ({
                        ...attr,
                        value: String(attr.value)
                    }));
                }
            });
        }

        return createAsync(formValues).then(() => {
            handleBack();
        });
    };

    const handleBack = () => {
        closeTab(history.location.pathname);
        history.push('/appSmartErp/ProductionManagement/StockingOrders');
    };

    const form = useMemo(
        () =>
            createForm({
                initialValues: {
                    productionDate: new Date().toISOString().split('T')[0]
                },
                effects: () => {
                    // 物料选择联动 - 使用正确的字段路径
                    onFieldValueChange('items.*.{value:materialCode,label:materialName}', async (field) => {
                        const materialData = field.value;

                        if (!materialData?.value) return;

                        const fieldPath = field.address?.toString() || '';
                        const indexMatch = fieldPath.match(/items\.(\d+)/);
                        const currentIndex = indexMatch ? parseInt(indexMatch[1]) : 0;

                        setLoading(true);

                        try {
                            const material = await MaterialGetByCodeAsync({ code: materialData.value });

                            if (material) {
                                // 使用正确的 Formily API 更新物料相关字段
                                form.setValuesIn(`items.${currentIndex}.materialOutCode`, material.outCode);
                                form.setValuesIn(`items.${currentIndex}.materialDescription`, material.description);
                                form.setValuesIn(`items.${currentIndex}.unitName`, material.unitName);

                                // 延迟后自动触发特性按钮点击
                                setTimeout(async () => {
                                    try {
                                        if (!material.id) return;
                                        const attributeResponse = await MaterialGetMaterialAttributeListAsync({
                                            materialId: material.id
                                        });

                                        const attributeSchema = attributeResponse.items || [];

                                        if (attributeSchema.length > 0) {
                                            // 物料有特性时，自动点击特性按钮
                                            const attributeButton = document.getElementById(`attribute${currentIndex}`);
                                            if (attributeButton) {
                                                attributeButton.click();
                                            }
                                        }
                                    } catch (attrError) {
                                        // 获取特性失败，不影响主流程
                                        console.warn('获取物料特性失败:', attrError);
                                    }
                                }, 800); // 延迟800ms，确保字段更新完成
                            }
                        } catch (error) {
                            message.error('获取物料信息失败');
                        } finally {
                            setLoading(false);
                        }
                    });

                    onFormSubmitValidateFailed(() => {
                        message.error('请完善必填信息')
                    });
                },
            }),
        []
    );

    return (
        <Spin spinning={isLoading || loading} tip={'加载中'}>
            <Form form={form} {...schema.form}>
                <SchemaField schema={schema.schema}></SchemaField>

                <ToolBar>
                    <Button onClick={handleBack}>返回</Button>
                    <Button type="primary" loading={isLoading} onClick={() => {
                        form.submit().then((values) => {
                            handleSubmit(values);
                        }).catch((error) => {
                            console.error('表单验证失败:', error);
                        });
                    }}>
                        提交
                    </Button>
                </ToolBar>
            </Form>
        </Spin>
    );
};

export default StockingOrderCreatePage;
export const routeProps = {
    name: '创建备货单',
};
