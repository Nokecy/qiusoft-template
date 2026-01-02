import {
  StorageSolutionCreateAsync,
  StorageSolutionUpdateConfigurationAsync,
  StorageSolutionGetAsync,
} from '@/services/pdm/StorageSolution';
import { FormDialog } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { Button } from 'antd';
import React from 'react';
import { formId, formSchema } from './schema';
import { useFormSchema, useSchemaField } from 'umi';
import FormLayoutMode from '@/pages/_utils/editMode';

const StorageSolutionFormDialog = (props: any) => {
  const { entityId, title, buttonProps, onAfterSubmit } = props;

  const schema = useFormSchema(formId, formSchema);
  const SchemaField = useSchemaField();

  const formProps = {
    effects: () => {
      onFormInit(form => {
        if (entityId) {
          StorageSolutionGetAsync({ id: entityId }).then(res => {
            // 将嵌套的 configuration 数据展平
            const flattenedData: any = {
              ...res,
              ...res.configuration,
            };

            // 将字节转换为GB
            if (flattenedData.quotaInBytes) {
              flattenedData.quotaInBytes = flattenedData.quotaInBytes / (1024 * 1024 * 1024);
            }

            form.setInitialValues(flattenedData);
          });
        }
      });
    },
  };

  const portalId = `Pdm.DocumentManagement.StorageSolution.${entityId || 'new'}`;
  return (
    <FormDialog.Portal id={portalId}>
      <Button
        type={'primary'}
        onClick={() => {
          const formDialog = FormDialog({ title: title, width: 800 }, portalId, () => {
            return (
              <>
                <FormLayoutMode formId={formId} {...schema.form} editClickAfter={() => formDialog.close()}>
                  <SchemaField schema={schema.schema} />
                </FormLayoutMode>
              </>
            );
          });

          formDialog
            .forConfirm((payload, next) => {
              const values: any = payload.values;

              // 构建 configuration 对象
              const configuration: any = {
                providerType: values.providerType,
              };

              // 根据不同的存储类型，将对应的配置字段放入 configuration
              const configFields = [
                'fileSystemBasePath',
                'aliyunOssEndpoint', 'aliyunOssAccessKeyId', 'aliyunOssAccessKeySecret',
                'aliyunOssBucketName', 'aliyunOssCreateBucketIfNotExists',
                'azureBlobConnectionString', 'azureBlobContainerName', 'azureBlobCreateContainerIfNotExists',
                'minIOEndpoint', 'minIOAccessKey', 'minIOSecretKey',
                'minIOBucketName', 'minIOUseSSL', 'minIOCreateBucketIfNotExists',
                'amazonS3Region', 'amazonS3AccessKeyId', 'amazonS3SecretAccessKey',
                'amazonS3BucketName', 'amazonS3ServiceUrl', 'amazonS3ForcePathStyle', 'amazonS3CreateBucketIfNotExists',
                'ftpHost', 'ftpPort', 'ftpUsername', 'ftpPassword', 'ftpBasePath',
                'ftpUseSsl', 'ftpUsePassiveMode', 'ftpAcceptAllCertificates', 'ftpTimeoutSeconds', 'ftpCreateBasePathIfNotExists',
                'networkShareUncPath', 'networkShareUsername', 'networkSharePassword',
                'networkShareSubDirectory', 'networkShareCreateSubDirectoryIfNotExists',
              ];

              configFields.forEach(field => {
                if (values[field] !== undefined) {
                  configuration[field] = values[field];
                }
              });

              // 构建提交数据
              const submitData: any = {
                solutionCode: values.solutionCode,
                solutionName: values.solutionName,
                providerType: values.providerType,
                description: values.description,
                configuration: configuration,
                quotaInBytes: values.quotaInBytes ? values.quotaInBytes * 1024 * 1024 * 1024 : undefined, // GB转字节
                quotaWarningThreshold: values.quotaWarningThreshold,
                priority: values.priority,
              };

              if (!values.id) {
                return StorageSolutionCreateAsync(submitData)
                  .then(() => {
                    if (onAfterSubmit) onAfterSubmit();
                  })
                  .then(() => {
                    next(payload);
                  });
              } else {
                // 编辑模式：使用 UpdateConfigurationAsync，只提交配置相关的数据
                const updateConfigData: any = {
                  configuration: configuration,
                  description: values.description,
                  quotaInBytes: values.quotaInBytes ? values.quotaInBytes * 1024 * 1024 * 1024 : undefined,
                  quotaWarningThreshold: values.quotaWarningThreshold,
                  priority: values.priority,
                };

                return StorageSolutionUpdateConfigurationAsync({ id: values.id }, updateConfigData)
                  .then(() => {
                    if (onAfterSubmit) onAfterSubmit();
                  })
                  .then(() => {
                    next(payload);
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
};

export default StorageSolutionFormDialog;
