import { ISchema } from '@formily/react';

export const formId: string = 'Pdm.StorageSolution';

export const form: Record<string, any> = {
  labelWidth: 100,
  feedbackLayout: 'none',
};

export const formSchema: { form: Record<string, any>; schema: ISchema } = {
  form: {
    labelCol: 6,
    wrapperCol: 16,
    labelWidth: '100px',
    feedbackLayout: 'none',
  },
  schema: {
    type: 'object',
    properties: {
      grid: {
        type: 'void',
        'x-component': 'FormGrid',
        'x-component-props': { maxColumns: 2, strictAutoFit: true },
        properties: {
          // 第一行：方案编码、方案名称
          col1: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              solutionCode: {
                type: 'string',
                title: '方案编码',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入方案编码' },
                required: true,
                name: 'solutionCode',
                'x-reactions': {
                  fulfill: {
                    state: {
                      pattern: '{{$form.values.id ? "readPretty" : "editable"}}',
                    },
                  },
                },
              },
            },
          },
          col2: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              solutionName: {
                type: 'string',
                title: '方案名称',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入方案名称' },
                required: true,
                name: 'solutionName',
                'x-reactions': {
                  fulfill: {
                    state: {
                      pattern: '{{$form.values.id ? "readPretty" : "editable"}}',
                    },
                  },
                },
              },
            },
          },

          // 第二行：存储类型
          col3: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              providerType: {
                type: 'number',
                title: '存储类型',
                'x-decorator': 'FormItem',
                'x-component': 'Select',
                'x-component-props': {
                  placeholder: '请选择存储类型',
                  options: [
                    { label: '本地文件系统', value: 1 },
                    { label: '阿里云OSS', value: 2 },
                    { label: 'Azure Blob', value: 3 },
                    { label: 'AWS S3', value: 4 },
                    { label: 'MinIO', value: 5 },
                    { label: 'FTP', value: 6 },
                    { label: '网络共享文件夹', value: 7 },
                  ],
                },
                required: true,
                name: 'providerType',
                'x-reactions': {
                  fulfill: {
                    state: {
                      pattern: '{{$form.values.id ? "readPretty" : "editable"}}',
                    },
                  },
                },
              },
            },
          },

          // ========== 本地文件系统字段 (providerType = 1) ==========
          colFileSystemBasePath: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            'x-reactions': {
              fulfill: {
                state: {
                  visible: '{{$form.values.providerType === 1}}',
                },
              },
            },
            properties: {
              fileSystemBasePath: {
                type: 'string',
                title: '基础路径',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入基础路径' },
                name: 'fileSystemBasePath',
              },
            },
          },

          // ========== 阿里云OSS字段 (storageType = 1) ==========
          colAliyunOssEndpoint: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            'x-reactions': {
              fulfill: {
                state: {
                  visible: '{{$form.values.providerType === 2}}',
                },
              },
            },
            properties: {
              aliyunOssEndpoint: {
                type: 'string',
                title: '端点地址',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入端点地址' },
                name: 'aliyunOssEndpoint',
              },
            },
          },
          colAliyunOssAccessKeyId: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            'x-reactions': {
              fulfill: {
                state: {
                  visible: '{{$form.values.providerType === 2}}',
                },
              },
            },
            properties: {
              aliyunOssAccessKeyId: {
                type: 'string',
                title: '访问密钥ID',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入访问密钥ID' },
                name: 'aliyunOssAccessKeyId',
              },
            },
          },
          colAliyunOssAccessKeySecret: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            'x-reactions': {
              fulfill: {
                state: {
                  visible: '{{$form.values.providerType === 2}}',
                },
              },
            },
            properties: {
              aliyunOssAccessKeySecret: {
                type: 'string',
                title: '访问密钥',
                'x-decorator': 'FormItem',
                'x-component': 'Input.Password',
                'x-component-props': { placeholder: '请输入访问密钥' },
                name: 'aliyunOssAccessKeySecret',
              },
            },
          },
          colAliyunOssBucketName: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            'x-reactions': {
              fulfill: {
                state: {
                  visible: '{{$form.values.providerType === 2}}',
                },
              },
            },
            properties: {
              aliyunOssBucketName: {
                type: 'string',
                title: '存储桶名称',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入存储桶名称' },
                name: 'aliyunOssBucketName',
              },
            },
          },
          colAliyunOssCreateBucket: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            'x-reactions': {
              fulfill: {
                state: {
                  visible: '{{$form.values.providerType === 2}}',
                },
              },
            },
            properties: {
              aliyunOssCreateBucketIfNotExists: {
                type: 'boolean',
                title: '自动创建存储桶',
                'x-decorator': 'FormItem',
                'x-component': 'Switch',
                name: 'aliyunOssCreateBucketIfNotExists',
                default: false,
              },
            },
          },

          // ========== Azure Blob字段 (storageType = 2) ==========
          colAzureBlobConnectionString: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            'x-reactions': {
              fulfill: {
                state: {
                  visible: '{{$form.values.providerType === 3}}',
                },
              },
            },
            properties: {
              azureBlobConnectionString: {
                type: 'string',
                title: '连接字符串',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': { placeholder: '请输入连接字符串', rows: 2 },
                name: 'azureBlobConnectionString',
              },
            },
          },
          colAzureBlobContainerName: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            'x-reactions': {
              fulfill: {
                state: {
                  visible: '{{$form.values.providerType === 3}}',
                },
              },
            },
            properties: {
              azureBlobContainerName: {
                type: 'string',
                title: '容器名称',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入容器名称' },
                name: 'azureBlobContainerName',
              },
            },
          },
          colAzureBlobCreateContainer: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            'x-reactions': {
              fulfill: {
                state: {
                  visible: '{{$form.values.providerType === 3}}',
                },
              },
            },
            properties: {
              azureBlobCreateContainerIfNotExists: {
                type: 'boolean',
                title: '自动创建容器',
                'x-decorator': 'FormItem',
                'x-component': 'Switch',
                name: 'azureBlobCreateContainerIfNotExists',
                default: false,
              },
            },
          },

          // ========== MinIO字段 (providerType = 5) ==========
          colMinIOEndpoint: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            'x-reactions': {
              fulfill: {
                state: {
                  visible: '{{$form.values.providerType === 5}}',
                },
              },
            },
            properties: {
              minIOEndpoint: {
                type: 'string',
                title: '端点地址',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入端点地址' },
                name: 'minIOEndpoint',
              },
            },
          },
          colMinIOAccessKey: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            'x-reactions': {
              fulfill: {
                state: {
                  visible: '{{$form.values.providerType === 5}}',
                },
              },
            },
            properties: {
              minIOAccessKey: {
                type: 'string',
                title: '访问密钥',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入访问密钥' },
                name: 'minIOAccessKey',
              },
            },
          },
          colMinIOSecretKey: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            'x-reactions': {
              fulfill: {
                state: {
                  visible: '{{$form.values.providerType === 5}}',
                },
              },
            },
            properties: {
              minIOSecretKey: {
                type: 'string',
                title: '密钥',
                'x-decorator': 'FormItem',
                'x-component': 'Input.Password',
                'x-component-props': { placeholder: '请输入密钥' },
                name: 'minIOSecretKey',
              },
            },
          },
          colMinIOBucketName: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            'x-reactions': {
              fulfill: {
                state: {
                  visible: '{{$form.values.providerType === 5}}',
                },
              },
            },
            properties: {
              minIOBucketName: {
                type: 'string',
                title: '存储桶名称',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入存储桶名称' },
                name: 'minIOBucketName',
              },
            },
          },
          colMinIOUseSSL: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            'x-reactions': {
              fulfill: {
                state: {
                  visible: '{{$form.values.providerType === 5}}',
                },
              },
            },
            properties: {
              minIOUseSSL: {
                type: 'boolean',
                title: '使用SSL',
                'x-decorator': 'FormItem',
                'x-component': 'Switch',
                name: 'minIOUseSSL',
                default: true,
              },
            },
          },
          colMinIOCreateBucket: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            'x-reactions': {
              fulfill: {
                state: {
                  visible: '{{$form.values.providerType === 5}}',
                },
              },
            },
            properties: {
              minIOCreateBucketIfNotExists: {
                type: 'boolean',
                title: '自动创建存储桶',
                'x-decorator': 'FormItem',
                'x-component': 'Switch',
                name: 'minIOCreateBucketIfNotExists',
                default: false,
              },
            },
          },

          // ========== AWS S3字段 (storageType = 4) ==========
          colAmazonS3Region: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            'x-reactions': {
              fulfill: {
                state: {
                  visible: '{{$form.values.providerType === 4}}',
                },
              },
            },
            properties: {
              amazonS3Region: {
                type: 'string',
                title: '区域',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入区域' },
                name: 'amazonS3Region',
              },
            },
          },
          colAmazonS3AccessKeyId: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            'x-reactions': {
              fulfill: {
                state: {
                  visible: '{{$form.values.providerType === 4}}',
                },
              },
            },
            properties: {
              amazonS3AccessKeyId: {
                type: 'string',
                title: '访问密钥ID',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入访问密钥ID' },
                name: 'amazonS3AccessKeyId',
              },
            },
          },
          colAmazonS3SecretAccessKey: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            'x-reactions': {
              fulfill: {
                state: {
                  visible: '{{$form.values.providerType === 4}}',
                },
              },
            },
            properties: {
              amazonS3SecretAccessKey: {
                type: 'string',
                title: '访问密钥',
                'x-decorator': 'FormItem',
                'x-component': 'Input.Password',
                'x-component-props': { placeholder: '请输入访问密钥' },
                name: 'amazonS3SecretAccessKey',
              },
            },
          },
          colAmazonS3BucketName: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            'x-reactions': {
              fulfill: {
                state: {
                  visible: '{{$form.values.providerType === 4}}',
                },
              },
            },
            properties: {
              amazonS3BucketName: {
                type: 'string',
                title: '存储桶名称',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入存储桶名称' },
                name: 'amazonS3BucketName',
              },
            },
          },
          colAmazonS3ServiceUrl: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            'x-reactions': {
              fulfill: {
                state: {
                  visible: '{{$form.values.providerType === 4}}',
                },
              },
            },
            properties: {
              amazonS3ServiceUrl: {
                type: 'string',
                title: '服务URL',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入服务URL' },
                name: 'amazonS3ServiceUrl',
              },
            },
          },
          colAmazonS3ForcePathStyle: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            'x-reactions': {
              fulfill: {
                state: {
                  visible: '{{$form.values.providerType === 4}}',
                },
              },
            },
            properties: {
              amazonS3ForcePathStyle: {
                type: 'boolean',
                title: '强制路径风格',
                'x-decorator': 'FormItem',
                'x-component': 'Switch',
                name: 'amazonS3ForcePathStyle',
                default: false,
              },
            },
          },
          colAmazonS3CreateBucket: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            'x-reactions': {
              fulfill: {
                state: {
                  visible: '{{$form.values.providerType === 4}}',
                },
              },
            },
            properties: {
              amazonS3CreateBucketIfNotExists: {
                type: 'boolean',
                title: '自动创建存储桶',
                'x-decorator': 'FormItem',
                'x-component': 'Switch',
                name: 'amazonS3CreateBucketIfNotExists',
                default: false,
              },
            },
          },

          // ========== FTP字段 (providerType = 6) ==========
          colFtpHost: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            'x-reactions': {
              fulfill: {
                state: {
                  visible: '{{$form.values.providerType === 6}}',
                },
              },
            },
            properties: {
              ftpHost: {
                type: 'string',
                title: 'FTP主机地址',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入FTP主机地址' },
                name: 'ftpHost',
              },
            },
          },
          colFtpPort: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            'x-reactions': {
              fulfill: {
                state: {
                  visible: '{{$form.values.providerType === 6}}',
                },
              },
            },
            properties: {
              ftpPort: {
                type: 'number',
                title: 'FTP端口',
                'x-decorator': 'FormItem',
                'x-component': 'NumberPicker',
                'x-component-props': {
                  placeholder: '请输入FTP端口',
                  min: 1,
                  max: 65535,
                  precision: 0,
                },
                name: 'ftpPort',
                default: 21,
              },
            },
          },
          colFtpUsername: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            'x-reactions': {
              fulfill: {
                state: {
                  visible: '{{$form.values.providerType === 6}}',
                },
              },
            },
            properties: {
              ftpUsername: {
                type: 'string',
                title: 'FTP用户名',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入FTP用户名' },
                name: 'ftpUsername',
              },
            },
          },
          colFtpPassword: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            'x-reactions': {
              fulfill: {
                state: {
                  visible: '{{$form.values.providerType === 6}}',
                },
              },
            },
            properties: {
              ftpPassword: {
                type: 'string',
                title: 'FTP密码',
                'x-decorator': 'FormItem',
                'x-component': 'Input.Password',
                'x-component-props': { placeholder: '请输入FTP密码' },
                name: 'ftpPassword',
              },
            },
          },
          colFtpBasePath: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            'x-reactions': {
              fulfill: {
                state: {
                  visible: '{{$form.values.providerType === 6}}',
                },
              },
            },
            properties: {
              ftpBasePath: {
                type: 'string',
                title: 'FTP基础路径',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入FTP基础路径' },
                name: 'ftpBasePath',
              },
            },
          },
          colFtpUseSsl: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            'x-reactions': {
              fulfill: {
                state: {
                  visible: '{{$form.values.providerType === 6}}',
                },
              },
            },
            properties: {
              ftpUseSsl: {
                type: 'boolean',
                title: '使用SSL/TLS',
                'x-decorator': 'FormItem',
                'x-component': 'Switch',
                name: 'ftpUseSsl',
                default: false,
              },
            },
          },
          colFtpUsePassiveMode: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            'x-reactions': {
              fulfill: {
                state: {
                  visible: '{{$form.values.providerType === 6}}',
                },
              },
            },
            properties: {
              ftpUsePassiveMode: {
                type: 'boolean',
                title: '被动模式',
                'x-decorator': 'FormItem',
                'x-component': 'Switch',
                name: 'ftpUsePassiveMode',
                default: true,
              },
            },
          },
          colFtpAcceptAllCertificates: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            'x-reactions': {
              fulfill: {
                state: {
                  visible: '{{$form.values.providerType === 6}}',
                },
              },
            },
            properties: {
              ftpAcceptAllCertificates: {
                type: 'boolean',
                title: '接受所有证书',
                'x-decorator': 'FormItem',
                'x-component': 'Switch',
                name: 'ftpAcceptAllCertificates',
                default: false,
              },
            },
          },
          colFtpTimeoutSeconds: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            'x-reactions': {
              fulfill: {
                state: {
                  visible: '{{$form.values.providerType === 6}}',
                },
              },
            },
            properties: {
              ftpTimeoutSeconds: {
                type: 'number',
                title: '超时时间(秒)',
                'x-decorator': 'FormItem',
                'x-component': 'NumberPicker',
                'x-component-props': {
                  placeholder: '请输入超时时间',
                  min: 1,
                  precision: 0,
                },
                name: 'ftpTimeoutSeconds',
                default: 30,
              },
            },
          },
          colFtpCreateBasePath: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            'x-reactions': {
              fulfill: {
                state: {
                  visible: '{{$form.values.providerType === 6}}',
                },
              },
            },
            properties: {
              ftpCreateBasePathIfNotExists: {
                type: 'boolean',
                title: '自动创建基础路径',
                'x-decorator': 'FormItem',
                'x-component': 'Switch',
                name: 'ftpCreateBasePathIfNotExists',
                default: false,
              },
            },
          },

          // ========== 网络共享文件夹字段 (providerType = 7) ==========
          colNetworkShareUncPath: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            'x-reactions': {
              fulfill: {
                state: {
                  visible: '{{$form.values.providerType === 7}}',
                },
              },
            },
            properties: {
              networkShareUncPath: {
                type: 'string',
                title: 'UNC路径',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入UNC路径，如：\\\\server\\share' },
                name: 'networkShareUncPath',
              },
            },
          },
          colNetworkShareUsername: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            'x-reactions': {
              fulfill: {
                state: {
                  visible: '{{$form.values.providerType === 7}}',
                },
              },
            },
            properties: {
              networkShareUsername: {
                type: 'string',
                title: '用户名',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入用户名' },
                name: 'networkShareUsername',
              },
            },
          },
          colNetworkSharePassword: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            'x-reactions': {
              fulfill: {
                state: {
                  visible: '{{$form.values.providerType === 7}}',
                },
              },
            },
            properties: {
              networkSharePassword: {
                type: 'string',
                title: '密码',
                'x-decorator': 'FormItem',
                'x-component': 'Input.Password',
                'x-component-props': { placeholder: '请输入密码' },
                name: 'networkSharePassword',
              },
            },
          },
          colNetworkShareSubDirectory: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            'x-reactions': {
              fulfill: {
                state: {
                  visible: '{{$form.values.providerType === 7}}',
                },
              },
            },
            properties: {
              networkShareSubDirectory: {
                type: 'string',
                title: '子目录',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入子目录（可选）' },
                name: 'networkShareSubDirectory',
              },
            },
          },
          colNetworkShareCreateSubDirectory: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            'x-reactions': {
              fulfill: {
                state: {
                  visible: '{{$form.values.providerType === 7}}',
                },
              },
            },
            properties: {
              networkShareCreateSubDirectoryIfNotExists: {
                type: 'boolean',
                title: '自动创建子目录',
                'x-decorator': 'FormItem',
                'x-component': 'Switch',
                name: 'networkShareCreateSubDirectoryIfNotExists',
                default: false,
              },
            },
          },

          // ========== 通用字段：优先级、描述 ==========
          colPriority: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              priority: {
                type: 'number',
                title: '优先级',
                'x-decorator': 'FormItem',
                'x-component': 'NumberPicker',
                'x-component-props': {
                  placeholder: '请输入优先级',
                  min: 0,
                  precision: 0,
                },
                name: 'priority',
                default: 0,
              },
            },
          },
          colQuota: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              quotaInBytes: {
                type: 'number',
                title: '存储配额(GB)',
                'x-decorator': 'FormItem',
                'x-component': 'NumberPicker',
                'x-component-props': {
                  placeholder: '请输入存储配额(GB)',
                  min: 0,
                  precision: 2,
                },
                name: 'quotaInBytes',
              },
            },
          },
          colDescription: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              description: {
                type: 'string',
                title: '描述',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': {
                  placeholder: '请输入描述',
                  rows: 3,
                },
                name: 'description',
              },
            },
          },
        },
      },
    },
  },
};
