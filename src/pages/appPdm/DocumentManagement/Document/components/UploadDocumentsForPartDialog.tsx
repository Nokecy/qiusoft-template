import { DocumentBatchBatchCreateDocumentsAndLinkPartsAsync } from '@/services/pdm/DocumentBatch';
import { DocumentTypeGetListAsync } from '@/services/pdm/DocumentType';
import { DocumentLibraryGetListAsync } from '@/services/pdm/DocumentLibrary';
import { FormDialog, FormLayout, ArrayTable, FormGrid } from '@formily/antd-v5';
import { onFormInit } from '@formily/core';
import { Button, message } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import React from 'react';
import { createSchemaField } from '@formily/react';
import {
  FormItem,
  Input,
  Select,
  NumberPicker,
  Checkbox,
} from '@formily/antd-v5';
import DocumentLibrarySelectButton from '../../DocumentLibrary/components/DocumentLibrarySelectButton';
import FileUploadWithChunks from './FileUploadWithChunks';
import PartSelect from '@/pages/appPdm/_utils/PartSelect';

// 文件角色枚举
enum DocumentFileRole {
  Primary = 0, // 主文档
  Secondary = 1, // 次要文档
}

// 关系用途枚举
enum RelationUsage {
  Reference = 10, // 参考
  Design = 20, // 设计
  Manufacturing = 30, // 制造
  Assembly = 40, // 装配
  Testing = 50, // 测试
  Maintenance = 60, // 维护
  Quality = 70, // 质量
  Packaging = 80, // 包装
  Documentation = 90, // 文档
  Other = 999, // 其他
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
    FormGrid,
    Input,
    Select,
    NumberPicker,
    ArrayTable,
    FileUploadWithChunks,
    DocumentLibrarySelectButton,
    PartSelect,
    Checkbox,
  },
});

// 表单配置
const formConfig = {
  labelCol: 6,
  wrapperCol: 18,
};

const UploadDocumentsForPartDialog = (props: any) => {
  const { title, buttonProps, onAfterSubmit } = props;

  const handleOpenDialog = async () => {
    // 显示加载提示
    const hide = message.loading('正在加载数据...', 0);

    try {
      // 加载文档类型和文档库数据
      const [typeRes, libraryRes] = await Promise.all([
        DocumentTypeGetListAsync({ MaxResultCount: 1000, SkipCount: 0 }),
        DocumentLibraryGetListAsync({ MaxResultCount: 1000, SkipCount: 0 }),
      ]);

      // 文档类型选项
      const documentTypeOptions =
        typeRes.items?.map((item: any) => ({
          label: item.typeName,
          value: item.id,
        })) || [];

      // 文档库选项
      const documentLibraryOptions =
        libraryRes.items?.map((item: any) => ({
          label: item.libraryName,
          value: item.id,
        })) || [];

      // 安全等级选项
      const securityLevelOptions = [
        { label: '公开', value: 0 },
        { label: '内部', value: 1 },
        { label: '机密', value: 2 },
        { label: '绝密', value: 3 },
      ];

      // 隐藏加载提示
      hide();

      const portalId = `Pdm.DocumentManagement.Document.UploadForPart`;

      // 用于保存表单实例
      let currentForm: any = null;

      const formDialog = FormDialog({ title: title || '按物料和文件上传文档', width: 1800 }, portalId, () => {
        return (
          <FormLayout {...formConfig}>
            {/* 文档列表 */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ marginBottom: 12, fontWeight: 600 }}>文档列表</div>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                  if (currentForm) {
                    const documents = currentForm.values.documents || [];
                    documents.unshift({
                      usage: RelationUsage.Reference,
                      isPrimary: false,
                      securityLevel: 0,
                      primaryFile: [],
                      secondaryFiles: [],
                    });
                    currentForm.setValues({ documents: [...documents] });
                  }
                }}
              >
                添加文档
              </Button>
            </div>

            <SchemaField>
              <SchemaField.Array
                name="documents"
                x-component="ArrayTable"
                x-component-props={{
                  gridKey: 'Pdm.DocumentManagement.Document.UploadForPart.Documents',
                  pagination: false,
                  scroll: { x: 1400, y: 400 },
                }}
              >
                <SchemaField.Object>
                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: '序号', width: 60, align: 'center', fixed: 'left' }}
                  >
                    <SchemaField.Void x-component="ArrayTable.Index" />
                  </SchemaField.Void>

                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: '文档编号', width: 150, fixed: 'left' }}
                  >
                    <SchemaField.String
                      name="documentNumber"
                      required
                      x-decorator="FormItem"
                      x-component="Input"
                      x-component-props={{ placeholder: '请输入文档编号' }}
                    />
                  </SchemaField.Void>

                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: '文档名称', width: 180 }}
                  >
                    <SchemaField.String
                      name="documentName"
                      required
                      x-decorator="FormItem"
                      x-component="Input"
                      x-component-props={{ placeholder: '请输入文档名称' }}
                    />
                  </SchemaField.Void>

                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: '文档类型', width: 150 }}
                  >
                    <SchemaField.String
                      name="documentTypeId"
                      required
                      x-decorator="FormItem"
                      x-component="Select"
                      x-component-props={{
                        placeholder: '请选择',
                        options: documentTypeOptions,
                        showSearch: true,
                        filterOption: (input: string, option: any) =>
                          (option?.label ?? '').toLowerCase().includes(input.toLowerCase()),
                      }}
                    />
                  </SchemaField.Void>

                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: '存储库', width: 180 }}
                  >
                    <SchemaField.String
                      name="storageLibraryId"
                      required
                      x-decorator="FormItem"
                      x-component="DocumentLibrarySelectButton"
                      x-component-props={{
                        placeholder: '请选择存储库',
                        libraryType: 1,
                      }}
                    />
                  </SchemaField.Void>

                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: '回收库', width: 180 }}
                  >
                    <SchemaField.String
                      name="recycleLibraryId"
                      x-decorator="FormItem"
                      x-component="DocumentLibrarySelectButton"
                      x-component-props={{
                        placeholder: '请选择回收库',
                        libraryType: 2,
                      }}
                    />
                  </SchemaField.Void>

                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: '安全等级', width: 120 }}
                  >
                    <SchemaField.Number
                      name="securityLevel"
                      x-decorator="FormItem"
                      x-component="Select"
                      x-component-props={{
                        placeholder: '请选择',
                        options: securityLevelOptions,
                      }}
                    />
                  </SchemaField.Void>

                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: '关键字', width: 150 }}
                  >
                    <SchemaField.String
                      name="keywords"
                      x-decorator="FormItem"
                      x-component="Input"
                      x-component-props={{ placeholder: '请输入关键字' }}
                    />
                  </SchemaField.Void>

                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: '描述', width: 200 }}
                  >
                    <SchemaField.String
                      name="description"
                      x-decorator="FormItem"
                      x-component="Input"
                      x-component-props={{ placeholder: '请输入描述' }}
                    />
                  </SchemaField.Void>

                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: '允许编码不一致', width: 130, align: 'center' }}
                  >
                    <SchemaField.Boolean
                      name="allowCodeInconsistency"
                      x-decorator="FormItem"
                      x-component="Checkbox"
                      default={false}
                    />
                  </SchemaField.Void>

                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: '主文档', width: 200, align: 'left' }}
                  >
                    <SchemaField.Array
                      name="primaryFile"
                      x-decorator="FormItem"
                      x-component="FileUploadWithChunks"
                      x-component-props={{
                        hidePercent: true,
                        maxCount: 1,
                        inline: true,
                      }}
                    />
                  </SchemaField.Void>

                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: '次要文档', width: 220, align: 'left' }}
                  >
                    <SchemaField.Array
                      name="secondaryFiles"
                      x-decorator="FormItem"
                      x-component="FileUploadWithChunks"
                      x-component-props={{
                        hidePercent: true,
                        maxCount: 10,
                        inline: true,
                      }}
                    />
                  </SchemaField.Void>

                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{
                      title: '操作',
                      width: 80,
                      align: 'center',
                      fixed: 'right',
                    }}
                  >
                    <SchemaField.Void x-component="ArrayTable.Remove" />
                  </SchemaField.Void>
                </SchemaField.Object>
              </SchemaField.Array>
            </SchemaField>

            {/* 物料列表 */}
            <div
              style={{
                marginTop: 24,
                marginBottom: 16,
                borderTop: '1px solid #f0f0f0',
                paddingTop: 16,
              }}
            >
              <div style={{ marginBottom: 12, fontWeight: 600 }}>物料列表</div>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                  if (currentForm) {
                    const parts = currentForm.values.parts || [];
                    parts.unshift({
                      isPrimary: false,
                    });
                    currentForm.setValues({ parts: [...parts] });
                  }
                }}
              >
                添加物料
              </Button>
            </div>

            <SchemaField>
              <SchemaField.Array
                name="parts"
                x-component="ArrayTable"
                x-component-props={{
                  gridKey: 'Pdm.DocumentManagement.Document.UploadForPart.Parts',
                  pagination: false,
                  scroll: { x: 600, y: 200 },
                }}
              >
                <SchemaField.Object>
                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: '序号', width: 60, align: 'center', fixed: 'left' }}
                  >
                    <SchemaField.Void x-component="ArrayTable.Index" />
                  </SchemaField.Void>

                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: '物料编码', width: 300, fixed: 'left' }}
                  >
                    <SchemaField.String
                      name="partNumber"
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

                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: '图号', width: 150 }}
                  >
                    <SchemaField.String
                      name="drawingNumber"
                      x-decorator="FormItem"
                      x-component="Input"
                      x-component-props={{ placeholder: '请输入图号' }}
                    />
                  </SchemaField.Void>

                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: '用途', width: 150 }}
                  >
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

                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{ title: '是否主要', width: 100, align: 'center' }}
                  >
                    <SchemaField.Boolean
                      name="isPrimary"
                      x-decorator="FormItem"
                      x-component="Checkbox"
                      x-reactions={{
                        fulfill: {
                          run: `{{
                            const parts = $form.values.parts || [];
                            const currentIndex = $self.path.segments[1];

                            if ($self.value === true) {
                              parts.forEach((part, index) => {
                                if (index !== currentIndex && part && part.isPrimary) {
                                  $form.setValuesIn(\`parts.\${index}.isPrimary\`, false);
                                }
                              });
                            }
                          }}`,
                        },
                      }}
                    />
                  </SchemaField.Void>

                  <SchemaField.Void
                    x-component="ArrayTable.Column"
                    x-component-props={{
                      title: '操作',
                      width: 80,
                      align: 'center',
                      fixed: 'right',
                    }}
                  >
                    <SchemaField.Void x-component="ArrayTable.Remove" />
                  </SchemaField.Void>
                </SchemaField.Object>
              </SchemaField.Array>
            </SchemaField>
          </FormLayout>
        );
      });

      // 表单初始化
      const formProps = {
        effects: () => {
          onFormInit(form => {
            currentForm = form;
            form.setInitialValues({
              parts: [],
              documents: [],
            });
          });
        },
      };

      formDialog
        .forConfirm(async (payload, next) => {
          const values: any = payload.values;

          try {
            const parts = values.parts || [];
            const documents = values.documents || [];

            if (parts.length === 0) {
              message.error('请至少添加一个物料');
              throw new Error('无物料');
            }

            if (documents.length === 0) {
              message.error('请至少添加一条文档数据');
              throw new Error('无数据');
            }

            // 构建文档数据：主文档 + 次要文档
            const documentsData = documents.map((doc: any) => {
              const primaryFile = doc.primaryFile || [];
              const secondaryFiles = doc.secondaryFiles || [];

              const tempFileUploads: any[] = [];

              // 主文档
              if (primaryFile.length > 0 && primaryFile[0].uploadId) {
                tempFileUploads.push({
                  uploadId: primaryFile[0].uploadId,
                  fileRole: DocumentFileRole.Primary,
                });
              }

              // 次要文档
              secondaryFiles.forEach((file: any) => {
                if (file && file.uploadId) {
                  tempFileUploads.push({
                    uploadId: file.uploadId,
                    fileRole: DocumentFileRole.Secondary,
                  });
                }
              });

              return {
                documentNumber: doc.documentNumber,
                documentName: doc.documentName,
                documentTypeId: doc.documentTypeId,
                storageLibraryId: doc.storageLibraryId,
                recycleLibraryId: doc.recycleLibraryId || undefined,
                securityLevel:
                  doc.securityLevel !== undefined ? doc.securityLevel : 0,
                keywords: doc.keywords || '',
                description: doc.description || '',
                allowCodeInconsistency: doc.allowCodeInconsistency || false,
                tempFileUploads:
                  tempFileUploads.length > 0 ? tempFileUploads : undefined,
              };
            });

            // 构建物料关联配置
            const partLinkConfigs = parts.map((part: any) => ({
              partNumber: part.partNumber,
              drawingNumber: part.drawingNumber || undefined,
              usage:
                part.usage !== undefined ? part.usage : RelationUsage.Reference,
              isPrimary: part.isPrimary || false,
            }));

            // 批量创建文档并关联物料
            const hide = message.loading(
              `正在为 ${parts.length} 个物料创建 ${documentsData.length} 个文档...`,
              0,
            );
            try {
              const result = await DocumentBatchBatchCreateDocumentsAndLinkPartsAsync(
                {
                  partLinkConfigs: partLinkConfigs,
                  documents: documentsData,
                },
              );

              hide();

              if (result.isSuccess) {
                const fileCount = documentsData.filter(
                  (doc: any) => doc.tempFileUploads,
                ).length;
                message.success(
                  `成功创建 ${result.createdDocumentsCount || 0} 个文档，` +
                  `为 ${result.totalParts || 0} 个物料建立了 ${result.createdLinksCount || 0} 个关联` +
                  (fileCount > 0 ? ` (含文件 ${fileCount} 个)` : ''),
                );
                if (onAfterSubmit) onAfterSubmit();
                next(payload);
              } else {
                const errorMessages = (result.errors || [])
                  .map((err: any) => {
                    const docNumber = err.documentNumber || '未知文档';
                    return `${docNumber}: ${err.errorMessage || '未知错误'}`;
                  })
                  .join('\n');

                message.error({
                  content: (
                    <div>
                      <div>批量创建失败:</div>
                      <div
                        style={{
                          maxHeight: 200,
                          overflow: 'auto',
                          marginTop: 8,
                          whiteSpace: 'pre-wrap',
                        }}
                      >
                        {errorMessages || '批量创建失败'}
                      </div>
                    </div>
                  ),
                  duration: 10,
                });
                // 不调用 next，阻止对话框关闭
                return;
              }
            } catch (error) {
              hide();
              console.error('提交失败:', error);
              const errorMessage = (error as Error).message;
              if (errorMessage !== '无物料' && errorMessage !== '无数据') {
                message.error('提交失败，请重试');
              }
              // 抛出错误阻止对话框关闭，同时重置按钮禁用状态
              throw error;
            }
          } catch (error) {
            console.error('处理失败:', error);
            const errorMessage = (error as Error).message;
            if (errorMessage === '无物料') {
              message.error('请至少添加一个物料');
            } else if (errorMessage === '无数据') {
              message.error('请至少添加一条文档数据');
            }
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

  const portalId = `Pdm.DocumentManagement.Document.UploadForPart`;
  return (
    <FormDialog.Portal id={portalId}>
      <Button type={'default'} onClick={handleOpenDialog} {...buttonProps}>
        {props.children}
      </Button>
    </FormDialog.Portal>
  );
};

export default UploadDocumentsForPartDialog;

