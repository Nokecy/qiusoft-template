import { FormDialog, FormLayout, } from '@formily/antd-v5';
import { onFormInit, } from '@formily/core';
import { Button, message, } from "antd";
import React, { } from "react";
import { useFormSchema, useSchemaField } from "umi";
import { formId, formSchema } from "./outInstructionTaskItemFileSchema";
import { MaterialPickItemBoxDetailUpdateAttachmentsAsync } from '@/services/wms/MaterialPickItemBoxDetail';

/**
 * 箱明细文件上传窗口
 * @param props 
 * @returns 
 */
const OutInstructionTaskItemFileFormDialog = (props: any) => {
    const { entityId, title, buttonProps, onAfterSubmit, data, type, fileData } = props;

    const schema = useFormSchema(formId, formSchema);

    const SchemaField = useSchemaField({});

    const formProps = {
        effects: () => {
            onFormInit(async (form) => {
                if (entityId) {

                    if (type === 1) {
                        form.setValuesIn('attachments', data.attachmentsNormal || [])
                    } else if (type === 2) {
                        form.setValuesIn('attachments', data.attachmentsAbnormal || [])
                    }


                }
            })

        }
    };

    function hasDuplicateFileNames(array) {
        const fileNames = new Set();

        for (const item of array) {
            if (fileNames.has(item.fileName)) {
                return true;
            }
            fileNames.add(item.fileName);
        }

        return false;
    }

    const portalId = `appMMS.projectInfo.MouldDesignTaskItemFile.${entityId}.${type}`
    return (<FormDialog.Portal id={portalId}>
        <Button type={"primary"} onClick={() => {
            let formDialog1 = FormDialog({ title: title, width: 1160, }, portalId, () => {
                return (
                    <FormLayout {...schema.form}>
                        <SchemaField schema={schema.schema}></SchemaField>
                    </FormLayout>
                )
            });

            formDialog1
                .forConfirm((payload, next) => {
                    let values: any = payload.values;

                    try {
                        const oppositeAttachments = type === 1 ? data.attachmentsAbnormal : data.attachmentsNormal

                        values.attachments.map(item => {
                            item.attachmentType = type
                        });

                        values.attachmentsCopy = [...oppositeAttachments, ...values.attachments]
                        values.attachmentsCopy.map(item => {
                            item.fileName = item.fileName ? item.fileName : item.name
                            item.contentType = item.contentType ? item.contentType : item.type
                            item.size = item.size
                            item.blobName = item.blobName ? item.blobName : item.fileName
                        });
                    } catch {

                    }
                    return MaterialPickItemBoxDetailUpdateAttachmentsAsync({ id: entityId }, { attachments: values.attachmentsCopy }).then(() => { if (onAfterSubmit) onAfterSubmit(); next(payload) });
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

export default OutInstructionTaskItemFileFormDialog