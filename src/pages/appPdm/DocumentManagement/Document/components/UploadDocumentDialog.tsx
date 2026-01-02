import { DocumentCreateAsync } from '@/services/pdm/Document';
import { DocumentTypeGetActiveTypesAsync } from '@/services/pdm/DocumentType';
import { PartGetListAsync } from '@/services/pdm/Part';
import { FormDialog, FormLayout } from '@formily/antd-v5';
import { onFormInit, onFieldReact } from '@formily/core';
import { Button, message } from 'antd';
import React from 'react';
import { createSchemaField } from '@formily/react';
import {
  FormItem,
  Input,
  Select,
  Checkbox,
  FormGrid,
  ArrayTable,
} from '@formily/antd-v5';
import DocumentLibrarySelect from '../../DocumentLibrary/components/DocumentLibrarySelect';
import FileUploadWithChunks from './FileUploadWithChunks';
import PartSelect from '@/pages/appPdm/_utils/PartSelect';

// 文件角色枚举
enum DocumentFileRole {
  Primary = 0,    // 主文档
  Secondary = 1,  // 次要文档
}

// 关系用途枚举
enum RelationUsage {
  Reference = 10,      // 参考
  Design = 20,         // 设计
  Manufacturing = 30,  // 制造
  Assembly = 40,       // 装配
  Testing = 50,        // 测试
  Maintenance = 60,    // 维护
  Quality = 70,        // 质量
  Packaging = 80,      // 包装
  Documentation = 90,  // 文档
  Other = 999,         // 其他
}

// 关系用途选项
const relationUsageOptions = [
  { label: '参考', value: RelationUsage.Reference },
  { label: '设计', value: RelationUsage.Design },
  { label: '制造', value: RelationUsage.Manufacturing },
  { label: '装配', value: RelationUsage.Assembly },
  { label: '测试', value: RelationUsage.Testing },
  { label: '维护', value: RelationUsage.Maintenance },
  { label: '质量', value: RelationUsage.Quality },
  { label: '包装', value: RelationUsage.Packaging },
  { label: '文档', value: RelationUsage.Documentation },
  { label: '其他', value: RelationUsage.Other },
];

// 创建 SchemaField 组件
const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Select,
    Checkbox,
    FormGrid,
    DocumentLibrarySelect,
    FileUploadWithChunks,
    PartSelect,
    ArrayTable,
  },
});

// 表单配置
const formConfig = {
  labelWidth: 100,
  feedbackLayout: 'none',
};

const UploadDocumentDialog = (props: any) => {
  const { title, buttonProps, onAfterSubmit } = props;

  const handleOpenDialog = async () => {
    // 显示加载提示
    const hide = message.loading('正在加载数据...', 0);

    try {
      // 加载文档类型数据
      const typeRes = await DocumentTypeGetActiveTypesAsync();

      // 构建文档类型选项
      const documentTypeOptions = typeRes.map((item: any) => ({
        label: item.typeName,
        value: item.id,
      }));

      // 隐藏加载提示
      hide();

      const portalId = `Pdm.DocumentManagement.Document.Upload`;

      // 打开对话框
      const formDialog = FormDialog({ title: title || '上传文档', width: 900 }, portalId, () => {
        return (
          <FormLayout {...formConfig}>
            <SchemaField>
              <SchemaField.Void
                x-component="FormGrid"
                x-component-props={{ maxColumns: 2, strictAutoFit: true }}
              >
                <SchemaField.String
                  name="documentNumber"
                  title="文档编号"
                  required
                  x-decorator="FormItem"
                  x-component="Input"
                  x-component-props={{ placeholder: '请输入文档编号' }}
                />
                <SchemaField.String
                  name="documentName"
                  title="文档名称"
                  required
                  x-decorator="FormItem"
                  x-component="Input"
                  x-component-props={{ placeholder: '请输入文档名称' }}
                />
                <SchemaField.String
                  name="documentTypeId"
                  title="文档类型"
                  required
                  x-decorator="FormItem"
                  x-component="Select"
                  x-component-props={{
                    placeholder: '请选择文档类型',
                    options: documentTypeOptions,
                  }}
                />
                <SchemaField.String
                  name="storageLibraryId"
                  title="存储库"
                  required
                  x-decorator="FormItem"
                  x-component="DocumentLibrarySelect"
                  x-component-props={{
                    placeholder: '请选择存储库',
                    libraryType: 1,
                  }}
                />
                <SchemaField.String
                  name="recycleLibraryId"
                  title="回收库"
                  x-decorator="FormItem"
                  x-component="DocumentLibrarySelect"
                  x-component-props={{
                    placeholder: '请选择回收库',
                    libraryType: 2,
                  }}
                />
                <SchemaField.Number
                  name="securityLevel"
                  title="安全等级"
                  x-decorator="FormItem"
                  x-component="Select"
                  x-component-props={{
                    placeholder: '请选择安全等级',
                    options: [
                      { label: '公开', value: 0 },
                      { label: '内部', value: 1 },
                      { label: '机密', value: 2 },
                      { label: '绝密', value: 3 },
                    ],
                  }}
                />
                <SchemaField.String
                  name="description"
                  title="描述"
                  x-decorator="FormItem"
                  x-decorator-props={{ gridSpan: 2 }}
                  x-component="Input.TextArea"
                  x-component-props={{
                    placeholder: '请输入描述',
                    rows: 3,
                  }}
                />
                <SchemaField.Boolean
                  name="allowCodeInconsistency"
                  title="允许编码不一致"
                  x-decorator="FormItem"
                  x-decorator-props={{ gridSpan: 2 }}
                  x-component="Checkbox"
                  default={false}
                />
                <SchemaField.Array
                  name="primaryFile"
                  title="主文档"
                  x-decorator="FormItem"
                  x-decorator-props={{ gridSpan: 2 }}
                  x-component="FileUploadWithChunks"
                  x-component-props={{
                    hidePercent: false,
                    maxCount: 1,
                    inline: true,
                  }}
                />
                <SchemaField.Array
                  name="secondaryFiles"
                  title="次要文档"
                  x-decorator="FormItem"
                  x-decorator-props={{ gridSpan: 2 }}
                  x-component="FileUploadWithChunks"
                  x-component-props={{
                    hidePercent: false,
                    maxCount: 10,
                    inline: true,
                  }}
                />
                <SchemaField.Array
                  name="partLinks"
                  title="物料关联"
                  x-decorator="FormItem"
                  x-decorator-props={{ gridSpan: 2 }}
                  x-component="ArrayTable"
                >
                  <SchemaField.Object>
                    <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '物料编码', width: 250 }}>
                      <SchemaField.String
                        name="partCode"
                        required
                        x-decorator="FormItem"
                        x-component="PartSelect"
                        x-component-props={{
                          placeholder: '请选择物料',
                          useCode: true,
                          labelInValue: false,
                        }}
                      />
                    </SchemaField.Void>
                    <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '图号', width: 150 }}>
                      <SchemaField.String
                        name="drawingNumber"
                        x-decorator="FormItem"
                        x-component="Input"
                        x-component-props={{
                          placeholder: '请输入图号',
                        }}
                      />
                    </SchemaField.Void>
                    <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '用途', width: 150 }}>
                      <SchemaField.Number
                        name="usage"
                        required
                        x-decorator="FormItem"
                        x-component="Select"
                        x-component-props={{
                          placeholder: '请选择用途',
                          options: relationUsageOptions,
                        }}
                      />
                    </SchemaField.Void>
                    <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '主要', width: 80, align: 'center' }}>
                      <SchemaField.Boolean
                        name="isPrimary"
                        x-decorator="FormItem"
                        x-component="Checkbox"
                        x-reactions={{
                          fulfill: {
                            run: `{{
                              const partLinks = $form.values.partLinks || [];
                              const currentIndex = $self.path.segments[1];

                              if ($self.value === true) {
                                partLinks.forEach((link, index) => {
                                  if (index !== currentIndex && link && link.isPrimary) {
                                    $form.setValuesIn(\`partLinks.\${index}.isPrimary\`, false);
                                  }
                                });
                              }
                            }}`
                          }
                        }}
                      />
                    </SchemaField.Void>
                    <SchemaField.Void x-component="ArrayTable.Column" x-component-props={{ title: '操作', width: 80, align: 'center' }}>
                      <SchemaField.Void x-component="ArrayTable.Remove" />
                    </SchemaField.Void>
                  </SchemaField.Object>
                  <SchemaField.Void
                    x-component="ArrayTable.Addition"
                    title="添加物料关联"
                  />
                </SchemaField.Array>
              </SchemaField.Void>
            </SchemaField>
          </FormLayout>
        );
      });

      // 表单初始化
      const formProps = {
        effects: () => {
          onFormInit(form => {
            form.setInitialValues({
              securityLevel: 0,
              allowCodeInconsistency: false,
            });
          });

          // 监听主文档上传，进行编码一致性校验
          onFieldReact('primaryFile', async (field) => {
            const form = field.form;
            const allowCodeInconsistency = form.values.allowCodeInconsistency;

            // 如果允许编码不一致，跳过校验
            if (allowCodeInconsistency === true) {
              return;
            }

            const primaryFile = field.value || [];
            if (primaryFile.length === 0) {
              return;
            }

            // 获取主文档文件名
            const fileName = primaryFile[0]?.name || '';
            if (!fileName) {
              return;
            }

            // 移除文件扩展名
            const fileNameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.')) || fileName;

            // 获取主要物料
            const partLinks = form.values.partLinks || [];
            const primaryPartLink = partLinks.find((link: any) => link.isPrimary === true);

            // 获取文档类型名称
            const documentTypeId = form.values.documentTypeId;
            const selectedType = documentTypeOptions.find((opt: any) => opt.value === documentTypeId);
            const documentTypeName = selectedType?.label || '';

            // 如果有主要物料和文档类型，进行校验
            if (primaryPartLink && documentTypeName) {
              const partCode = primaryPartLink.partCode;

              try {
                // 查询物料信息获取物料名称
                const partRes = await PartGetListAsync({
                  Filter: `PartNumber=${partCode}`,
                  MaxResultCount: 1,
                  SkipCount: 0,
                });

                if (partRes.items && partRes.items.length > 0) {
                  const partName = partRes.items[0].partName || '';

                  // 检查文件名是否包含物料名称和文档类型名称
                  const containsPartName = fileNameWithoutExt.includes(partName);
                  const containsDocTypeName = fileNameWithoutExt.includes(documentTypeName);

                  if (!containsPartName || !containsDocTypeName) {
                    let errorMsg = '主文档文件名不符合规范，应包含：';
                    if (!containsPartName) {
                      errorMsg += `\n- 主要物料名称: ${partName}`;
                    }
                    if (!containsDocTypeName) {
                      errorMsg += `\n- 文档类型名称: ${documentTypeName}`;
                    }

                    message.warning({
                      content: errorMsg,
                      duration: 5,
                    });
                  }
                }
              } catch (error) {
                console.error('查询物料信息失败:', error);
              }
            }
          });
        },
      };

      formDialog
        .forConfirm(async (payload, next) => {
          const values: any = payload.values;

          try {
            // 处理主文档和次要文档
            const primaryFile = values.primaryFile || [];
            const secondaryFiles = values.secondaryFiles || [];

            // 构建临时文件上传信息数组
            const tempFileUploads: any[] = [];

            // 添加主文档(如果有)
            if (primaryFile.length > 0 && primaryFile[0].uploadId) {
              tempFileUploads.push({
                uploadId: primaryFile[0].uploadId,
                fileRole: DocumentFileRole.Primary,
              });
            }

            // 添加次要文档
            secondaryFiles.forEach((file: any) => {
              if (file.uploadId) {
                tempFileUploads.push({
                  uploadId: file.uploadId,
                  fileRole: DocumentFileRole.Secondary,
                });
              }
            });

            // 处理物料关联记录
            const partLinks = (values.partLinks || []).map((link: any) => ({
              partCode: link.partCode,
              usage: link.usage,
              isPrimary: link.isPrimary || false,
            }));

            const hide = message.loading('正在创建文档...', 0);
            try {
              // 创建文档，自动转移临时文件
              await DocumentCreateAsync({
                documentNumber: values.documentNumber,
                documentName: values.documentName,
                documentTypeId: values.documentTypeId,
                storageLibraryId: values.storageLibraryId,
                recycleLibraryId: values.recycleLibraryId || undefined,
                securityLevel: values.securityLevel !== undefined ? values.securityLevel : 0,
                description: values.description || '',
                allowCodeInconsistency: values.allowCodeInconsistency || false,
                tempFileUploads: tempFileUploads.length > 0 ? tempFileUploads : undefined,
                partLinks: partLinks.length > 0 ? partLinks : undefined,
              });
              hide();
              message.success('文档创建成功');
              if (onAfterSubmit) onAfterSubmit();
              next(payload);
            } catch (error) {
              hide();
              console.error('提交失败:', error);
              const errorMessage = (error as Error).message;
              message.error(`提交失败: ${errorMessage || '请重试'}`);
              // 抛出错误阻止对话框关闭，同时重置按钮禁用状态
              throw error;
            }
          } catch (error) {
            console.error('处理失败:', error);
            // 抛出错误阻止对话框关闭，同时重置按钮禁用状态
            throw error;
          }
        })
        .open(formProps);
    } catch (error) {
      hide();
      message.error('加载数据失败，请重试');
      console.error('加载数据失败:', error);
    }
  };

  const portalId = `Pdm.DocumentManagement.Document.Upload`;
  return (
    <FormDialog.Portal id={portalId}>
      <Button
        type={'primary'}
        onClick={handleOpenDialog}
        {...buttonProps}
      >
        {props.children}
      </Button>
    </FormDialog.Portal>
  );
};

export default UploadDocumentDialog;
