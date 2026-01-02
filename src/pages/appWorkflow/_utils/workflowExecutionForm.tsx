import React, { useEffect, useMemo } from 'react';
import { useSchemaField } from 'umi';
import { ArrayTableIndex } from '@nokecy/qc-ui';
import { isVoidField, isField, onFormInit, onFieldValueChange } from '@formily/core';
import { FormProvider } from '@formily/react';
import { ActivityLeftSelect, NextActivitySelect } from '@/pages/appWorkflow/_utils';
import { FormLayout } from '@formily/antd-v5';


/**
 * 流程审批执行表单SchemaField
 * @param props
 * @returns
 */
const WorkflowExecutionForm = (props: any) => {
    const { form, workflowInstanceId, definitionId, activityId, currentActivityName, enableActionTargetMapping, hideNextAssignUser } = props;

    const SchemaField = useSchemaField({ ArrayTableIndex, ActivityLeftSelect, NextActivitySelect });

    useEffect(() => {
        const executeCardField = form.query('executeCard').take();
        if (isVoidField(executeCardField)) {
            executeCardField.setComponentProps({
                title: `${currentActivityName}`,
            })
        }

    }, [currentActivityName])

    const executeTypeChange = (e) => {
        const type = e.target.value;
        form.setFieldState("!(workflowInput.*)", (state) => {
            state.readPretty = type !== 5
        })
    }

    return (
        <FormProvider form={form} >
            <FormLayout labelWidth={100} feedbackLayout='none'>
                <SchemaField>
                    <SchemaField.Void name={"executeCard"} x-component={"Card"} x-component-props={{
                        title: "审批意见",
                        "style": {
                            "margin": "10px 0px 0px 0px"
                        }
                    }}>
                        <SchemaField.Object name={"workflowInput"}>

                            <SchemaField.String title={'activityId'} x-hidden={true} default={activityId} required name={'activityId'} x-decorator='FormItem' x-component={'Input'} />

                            <SchemaField.String title={'操作'} default={5} required name={'executeType'} x-decorator='FormItem' x-component={'Radio.Group'}
                                x-component-props={{
                                    onChange: executeTypeChange
                                }}
                                enum={[
                                    { value: 5, label: "通过" },
                                    { value: 15, label: "退回上一步" },
                                    { value: 11, label: "协办" },
                                    { value: 25, label: "退回指定节点" },
                                    { value: 20, label: "拒绝" },
                                    { value: 30, label: "终止" },
                                ]}
                            />

                            <SchemaField.String title={'下一步节点'} required name={'nextActivity'} x-decorator='FormItem' x-component={'NextActivitySelect'}
                                x-component-props={{
                                    workflowInstanceId: workflowInstanceId,
                                    activityId: activityId,
                                    definitionId: definitionId,
                                    enableActionTargetMapping: enableActionTargetMapping,
                                    onItemChange: (item) => {
                                        form.setValuesIn('actorSelectionMode', item?.actorSelectionMode);
                                    }
                                }}
                                x-reactions={{
                                    dependencies: ["workflowInput.executeType"],
                                    fulfill: {
                                        state: {
                                            visible: "{{ $deps[0] == 5 }}"
                                        }
                                    }
                                }} />

                            {hideNextAssignUser ? null : (
                                <SchemaField.String
                                    title={'下一步处理人'}
                                    required
                                    name={'nextAssignUser'}
                                    x-decorator='FormItem'
                                    x-component={'UserSelect'}
                                    x-component-props={{ showId: false, labelInValue: false }}
                                    x-reactions={field => {
                                        const actorSelectionMode = field.form.getValuesIn('actorSelectionMode');
                                        field.visible = actorSelectionMode == 5;
                                    }}
                                />
                            )}
                            <SchemaField.String
                                title={'协办人'}
                                required
                                name={'assignUser'}
                                x-decorator='FormItem'
                                x-component={'UserSelect'}
                                x-component-props={{ showId: false, labelInValue: false }}
                                x-reactions={{
                                    dependencies: ["workflowInput.executeType"],
                                    fulfill: {
                                        state: {
                                            visible: "{{ $deps[0] == 11 }}"
                                        }
                                    }
                                }}
                            />

                            <SchemaField.String required name="backActivity" x-decorator="FormItem" title="退回节点" x-component="ActivityLeftSelect"
                                x-component-props={{
                                    definitionId: definitionId,
                                    activityId: activityId,
                                    labelInValue: false
                                }}
                                x-validator={[{ required: true, message: "节点必须填写" }]}
                                x-reactions={{
                                    dependencies: ["workflowInput.executeType"],
                                    fulfill: {
                                        state: {
                                            visible: "{{ $deps[0] == 25 }}"
                                        }
                                    }
                                }}
                            />

                            <SchemaField.String
                                title={'抄送人'}
                                name={'copyToUsers'}
                                x-decorator='FormItem'
                                x-component={'XUserSelect'}
                                x-component-props={{
                                    placeholder: '请选择抄送人',
                                    mode: 'multiple',
                                    labelInValue: false
                                }}
                            />

                            <SchemaField.String
                                title={'处理意见'}
                                name={'message'}
                                x-decorator='FormItem'
                                x-component={'Input.TextArea'}
                                x-component-props={{ placeholder: '请输入处理意见,不输入默认显示空' }}
                                x-reactions={{
                                    dependencies: ["workflowInput.executeType"],
                                    fulfill: {
                                        state: {
                                            required: "{{ $deps[0] == 15 || $deps[0] == 20 || $deps[0] == 25 || $deps[0] == 30 }}"
                                        }
                                    }
                                }}
                            />
                        </SchemaField.Object>
                    </SchemaField.Void>
                </SchemaField>
            </FormLayout>
        </FormProvider>
    );
};

export default WorkflowExecutionForm;
