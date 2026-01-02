/**
 * 工程文件通知单表单页
 * 路由: /appPdm/ChangeManagement/EngineeringFileNotice/form?id={id}
 */

import React, { useEffect, useState, useRef } from 'react';
import { Card, Button, message, Spin, Upload } from 'antd';
import { SaveOutlined, UploadOutlined } from '@ant-design/icons';
import { history, closeTab } from 'umi';
import { createForm } from '@formily/core';
import { FormProvider, createSchemaField } from '@formily/react';
import { FormLayout, FormItem, Input, NumberPicker, Switch, FormGrid, Select } from '@formily/antd-v5';
import type { ISchema } from '@formily/json-schema';
import { ToolBar } from '@/components';
import { useModel } from '@umijs/max';
import {
  EngineeringFileNotificationGetAsync,
  EngineeringFileNotificationCreateAsync,
  EngineeringFileNotificationUpdateAsync,
} from '@/services/pdm/EngineeringFileNotification';
import DocumentTypeSelect from '@/pages/appPdm/DocumentManagement/Document/components/DocumentTypeSelect';
import DocumentSelect from '@/pages/appPdm/_formWidgets/DocumentSelect';
import AttachmentUpload from '@/components/AttachmentUpload';
import UserSelect from '@/pages/appPdm/_formWidgets/UserSelect';
import PartSelect from '@/pages/appPdm/_utils/PartSelect';
import { archiveTypeOptions, ArchiveType } from './_enums';
import { useKeepAliveParams } from '@/hooks';
import { isGuidLike, normalizeDocNoInput } from '@/pages/appPdm/_utils/docNo';

// 创建 SchemaField 并注册组件
const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    NumberPicker,
    Switch,
    FormGrid,
    Select,
    DocumentTypeSelect,
    DocumentSelect,
    AttachmentUpload,
    UserSelect,
    PartSelect,
  },
});

export const routeProps = {
  name: '工程文件通知单表单',
};

const formLayout = {
  labelCol: 6,
  wrapperCol: 18,
  labelWidth: 120,
  feedbackLayout: 'none' as const,
};

const EngineeringFileNotificationFormPage: React.FC = () => {
  const query = useKeepAliveParams('/appPdm/ChangeManagement/EngineeringFileNotice/form');
  const recordId = query.id as string;
  const isEdit = !!recordId;
  const previousIdRef = useRef<string | undefined>();

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fileToken, setFileToken] = useState<string>('');
  const { initialState } = useModel('@@initialState');

  const currentOrganizationCode =
    (initialState as any)?.configuration?.currentUser?.extraProperties?.OrganizationCode ||
    (initialState as any)?.configuration?.currentUser?.extraProperties?.organizationCode ||
    (initialState as any)?.profile?.extraProperties?.OrganizationCode ||
    (initialState as any)?.profile?.extraProperties?.organizationCode ||
    (initialState as any)?.profile?.organizationCode;

  const form = React.useMemo(
    () => createForm({ validateFirst: true }),
    []
  );

  // 加载数据
  const loadFormData = async (id: string) => {
    setLoading(true);
    try {
      const data = await EngineeringFileNotificationGetAsync({ id });
      const initialValues: any = {
        partNo:
          data.archiveType === ArchiveType.FirstArchive && data.partNo
            ? { value: data.partNo, label: data.partName || data.partNo }
            : data.partNo,
        partName: data.partName,
        docNo:
          data.archiveType !== ArchiveType.FirstArchive && data.docNo
            ? {
              value: (data as any).targetDocumentId ?? data.docNo,
              id: (data as any).targetDocumentId ?? undefined,
              label: data.docNo,
              documentNumber: data.docNo,
            }
            : data.docNo,
        docName: data.docName,
        docVersion: data.docVersion,
        docType: data.docType,
        changePage: data.changePage,
        changeVersion: data.changeVersion,
        archiveType: data.archiveType,
        modifyContent: data.modifyContent,
        hwOrderNumber: data.hwOrderNumber,
        note: data.note,
        category: data.category,
        categoryPath: data.categoryPath,
        expirationPath: data.expirationPath,
        description: data.description,
        documentTypeId:
          data.documentTypeId && (data as any).documentTypeName
            ? { value: data.documentTypeId, label: (data as any).documentTypeName }
            : data.documentTypeId,
        auditCraftUser: data.auditCraftUserCode
          ? { value: data.auditCraftUserCode, label: data.auditCraftUserName }
          : undefined,
      };

      form.setInitialValues(initialValues);
      setFileToken(data.fileToken || '');
    } catch (error) {
      message.error('加载数据失败');
    } finally {
      setLoading(false);
    }
  };

  // URL参数监听
  useEffect(() => {
    const currentId = query?.id as string;

    if (currentId && currentId !== previousIdRef.current) {
      previousIdRef.current = currentId;
      loadFormData(currentId);
    } else if (!currentId) {
      previousIdRef.current = undefined;
      form.reset();
    }
  }, [query.id]);

  // 返回列表
  const handleBack = () => {
    const currentPath = window.location.pathname;
    history.push('/appPdm/ChangeManagement/EngineeringFileNotice');
    setTimeout(() => {
      closeTab(currentPath);
    }, 150);
  };

  // 提交表单
  const handleSubmit = async () => {
    if (submitting) return;

    try {
      setSubmitting(true);
      const values = await form.submit();

      const { docNo, selectedDocumentId, selectedDocumentNumber, selectedOrganizationCode } = normalizeDocNoInput(values.docNo);

      let resolvedPartNo = typeof values.partNo === 'object' ? values.partNo?.value : values.partNo;
      let resolvedPartName = values.partName;
      if (!resolvedPartName && typeof values.partNo === 'object') {
        resolvedPartName = values.partNo?.label;
      }

      // 有些场景下字段被禁用/未联动写入时，兜底从所选文档带出主物料信息
      if ((!resolvedPartNo || !resolvedPartName) && values.docNo && typeof values.docNo === 'object') {
        const primaryPartLink = (values.docNo as any)?.primaryPartLink;
        if (!resolvedPartNo) resolvedPartNo = primaryPartLink?.partNumber;
        if (!resolvedPartName) resolvedPartName = primaryPartLink?.partName;
      }

      // ChangeArchive 场景：后端契约要求 DocNo = DocumentNumber（业务编号），不能传 DocumentId（GUID）
      if (values.archiveType === ArchiveType.ChangeArchive) {
        if (!docNo) {
          message.error('变更归档必须选择目标文档（DocNo 不能为空）');
          return;
        }
        if (isGuidLike(docNo)) {
          message.error('DocNo 需要传文档编号（DocumentNumber），不能传文档Id（GUID）');
          return;
        }
        // 组织一致性校验：仅在能取到组织上下文时校验，避免误伤
        if (currentOrganizationCode && selectedOrganizationCode && currentOrganizationCode !== selectedOrganizationCode) {
          message.error(`所选文档组织(${selectedOrganizationCode})与当前组织(${currentOrganizationCode})不一致，请重新选择`);
          return;
        }
      }

      console.log('[EngineeringFileNotice] 归档关键字段:', {
        archiveType: values.archiveType,
        docNo,
        selectedDocumentId,
        selectedDocumentNumber,
        organizationCode: currentOrganizationCode,
      });

      const submitData = {
        partNo: resolvedPartNo,
        partName: resolvedPartName,
        docNo, // 使用处理后的 docNo 字符串（DocumentNumber）
        targetDocumentId: isGuidLike(selectedDocumentId) ? selectedDocumentId : null,
        docName: values.docName,
        docVersion: values.docVersion,
        documentTypeId: values.documentTypeId?.value ?? values.documentTypeId,
        documentTypeName: values.documentTypeId?.label,
        changePage: values.changePage,
        changeVersion: values.changeVersion,
        archiveType: values.archiveType,
        modifyContent: values.modifyContent,
        hwOrderNumber: values.hwOrderNumber,
        note: values.note,
        category: values.category,
        categoryPath: values.categoryPath,
        expirationPath: values.expirationPath,
        description: values.description,
        auditCraftUserCode: values.auditCraftUser?.value,
        auditCraftUserName: values.auditCraftUser?.label,
        uploadId: values.attachment?.uploadId, // 使用UploadId提交附件
      };

      if (isEdit) {
        await EngineeringFileNotificationUpdateAsync({ id: recordId }, submitData as any);
        message.success('更新成功');
      } else {
        await EngineeringFileNotificationCreateAsync(submitData as any);
        message.success('创建成功');
      }
      handleBack();
    } catch (error) {
      message.error('操作失败');
    } finally {
      setSubmitting(false);
    }
  };

  // 表单Schema
  const schema: ISchema = React.useMemo(() => ({
    type: 'object',
    properties: {
      grid: {
        type: 'void',
        'x-component': 'FormGrid',
        'x-component-props': { maxColumns: 4, strictAutoFit: true },
        properties: {
          col1: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              archiveType: {
                type: 'number',
                title: '归档类型',
                required: true,
                'x-decorator': 'FormItem',
                'x-component': 'Select',
                'x-component-props': {
                  placeholder: '请输入归档类型',
                  options: archiveTypeOptions,
                  disabled: isEdit,
                },
                'x-reactions': [
                  {
                    target: 'partNo',
                    effects: ['onFieldValueChange'],
                    when: '{{$self.value !== 0}}',
                    fulfill: {
                      state: {
                        value: undefined,
                      },
                    },
                  },
                  {
                    target: 'partName',
                    effects: ['onFieldValueChange'],
                    when: '{{$self.value !== 0}}',
                    fulfill: {
                      state: {
                        value: undefined,
                      },
                    },
                  },
                ],
              },
            },
          },
          col2: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              docNo: {
                type: 'string',
                title: '文档编码',
                'x-decorator': 'FormItem',
                // 非首次归档(1/2)：下拉选择已有文档；首次归档(0)/未选择：手工输入
                'x-component': '{{ $form.values?.archiveType !== 0 && $form.values?.archiveType != null ? "DocumentSelect" : "Input" }}',
                'x-component-props': {
                  placeholder: '{{ $form.values?.archiveType !== 0 && $form.values?.archiveType != null ? "请搜索并选择已有文档" : "请输入文档编码" }}',
                  labelInValue: true,
                  publishState: 1,
                },
                'x-reactions': [
                  // 非首次归档时必填（需要选择已有文档）
                  {
                    dependencies: ['archiveType'],
                    fulfill: {
                      state: {
                        required: '{{$deps[0] !== 0}}',
                      },
                    },
                  },
                  // 选择文档后自动填充：文档名称、文档类型、文档版本(version+revision)、主物料信息（产品编码/名称）
                  {
                    target: 'docName',
                    effects: ['onFieldValueChange'],
                    fulfill: {
                      state: {
                        value: '{{typeof $self.value === "object" ? $self.value?.documentName : $form.values?.docName}}'
                      }
                    }
                  },
                  {
                    target: 'docVersion',
                    effects: ['onFieldValueChange'],
                    fulfill: {
                      state: {
                        // 文档版本改为手动输入，不从所选文档自动带出
                        value: '{{$form.values?.docVersion}}'
                      }
                    }
                  },
                  {
                    target: 'documentTypeId',
                    effects: ['onFieldValueChange'],
                    fulfill: {
                      state: {
                        value: '{{typeof $self.value === "object" ? $self.value?.documentTypeId : $form.values?.documentTypeId}}'
                      }
                    }
                  },
                  {
                    target: 'partNo',
                    effects: ['onFieldValueChange'],
                    fulfill: {
                      state: {
                        value: '{{typeof $self.value === "object" ? $self.value?.primaryPartLink?.partNumber : $form.values?.partNo}}'
                      }
                    }
                  },
                  {
                    target: 'partName',
                    effects: ['onFieldValueChange'],
                    fulfill: {
                      state: {
                        value: '{{typeof $self.value === "object" ? $self.value?.primaryPartLink?.partName : $form.values?.partName}}'
                      }
                    }
                  }
                ],
              },
            },
          },
          col3: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              docName: {
                type: 'string',
                title: '文档名称',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入文档名称' },
                'x-reactions': {
                  dependencies: ['archiveType'],
                  fulfill: {
                    state: {
                      pattern: "{{$deps[0] !== 0 ? 'disabled' : 'editable'}}",
                    },
                  },
                },
              },
            },
          },
          col4: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              documentTypeId: {
                type: 'string',
                title: '文档类型',
                required: true,
                'x-decorator': 'FormItem',
                'x-component': 'DocumentTypeSelect',
                'x-component-props': { placeholder: '请选择文档类型', labelInValue: true },
                'x-reactions': {
                  dependencies: ['archiveType'],
                  fulfill: {
                    state: {
                      pattern: "{{$deps[0] !== 0 ? 'disabled' : 'editable'}}",
                    },
                  },
                },
              },
            },
          },
          col5: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              docVersion: {
                type: 'string',
                title: '文档版本',
                required: true,
                'x-decorator': 'FormItem',
                // 文档版本统一手动输入
                'x-component': 'Input',
                'x-component-props': {
                  placeholder: '请输入版本',
                  options: [
                    { label: 'A', value: 'A' },
                    { label: 'B', value: 'B' },
                    { label: 'C', value: 'C' },
                    { label: 'D', value: 'D' },
                    { label: 'E', value: 'E' },
                    { label: 'F', value: 'F' },
                    { label: 'G', value: 'G' },
                    { label: 'H', value: 'H' },
                    { label: 'I', value: 'I' },
                    { label: 'J', value: 'J' },
                    { label: 'K', value: 'K' },
                    { label: 'L', value: 'L' },
                    { label: 'M', value: 'M' },
                    { label: 'N', value: 'N' },
                    { label: 'O', value: 'O' },
                    { label: 'P', value: 'P' },
                    { label: 'Q', value: 'Q' },
                    { label: 'R', value: 'R' },
                    { label: 'S', value: 'S' },
                    { label: 'T', value: 'T' },
                    { label: 'U', value: 'U' },
                    { label: 'V', value: 'V' },
                    { label: 'W', value: 'W' },
                    { label: 'X', value: 'X' },
                    { label: 'Y', value: 'Y' },
                    { label: 'Z', value: 'Z' },
                  ],
                },
              },
            },
          },
          col6: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              partNo: {
                type: 'string',
                title: '物料编码',
                required: true,
                'x-decorator': 'FormItem',
                'x-component': '{{ $form.values?.archiveType === 0 ? "PartSelect" : "Input" }}',
                'x-component-props': {
                  placeholder:
                    '{{ $form.values?.archiveType === 0 ? "请选择物料" : "请输入物料编码" }}',
                },
                'x-reactions': [
                  {
                    dependencies: ['archiveType'],
                    fulfill: {
                      state: {
                        pattern: "{{$deps[0] !== 0 ? 'disabled' : 'editable'}}",
                      },
                    },
                  },
                  {
                    target: 'partName',
                    effects: ['onFieldValueChange'],
                    fulfill: {
                      state: {
                        value:
                          '{{ $form.values?.archiveType === 0 && typeof $self.value === "object" ? ($self.value?.label || $self.value?.description || $form.values?.partName) : $form.values?.partName }}',
                      },
                    },
                  },
                ],
              },
            },
          },
          col7: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              partName: {
                type: 'string',
                title: '物料名称',
                required: true,
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入物料名称' },
                'x-reactions': {
                  fulfill: {
                    state: {
                      pattern: 'disabled',
                    },
                  },
                },
              },
            },
          },
          col8: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              hwOrderNumber: {
                type: 'string',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                title: '华为单据号',
                'x-component-props': { placeholder: '请输入华为单据号' },
                'x-reactions': {
                  dependencies: ['archiveType'],
                  fulfill: {
                    state: {
                      visible: '{{$deps[0] !== 0}}',
                      required: '{{$deps[0] !== 0}}',
                    },
                  },
                },
              },
            },
          },
          col9: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              changePage: {
                type: 'string',
                title: '更改页码',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': { placeholder: '请输入更改页码' },
              },
            },
          },
          col10: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 4 },
            properties: {
              modifyContent: {
                type: 'string',
                title: '修订内容',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': { rows: 4, placeholder: '修订内容' },
                'x-reactions': {
                  dependencies: ['archiveType'],
                  fulfill: {
                    state: {
                      visible: '{{$deps[0] !== 0}}',
                      required: '{{$deps[0] !== 0}}',
                    },
                  },
                },
              },
            },
          },
          colAudit: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              auditCraftUser: {
                type: 'string',
                title: '工艺审批人',
                required: true,
                'x-decorator': 'FormItem',
                'x-component': 'UserSelect',
                'x-component-props': {
                  placeholder: '请选择审核人',
                  labelInValue: true,
                  labelField: 'name',
                  valueField: 'userName',
                },
              },
            },
          },
          col11: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 4 },
            properties: {
              note: {
                type: 'string',
                title: '备注',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': { rows: 4, placeholder: '备注' },
              },
            },
          },
          col12: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 4 },
            properties: {
              attachment: {
                type: 'object',
                title: '文件',
                required: true,
                'x-decorator': 'FormItem',
                'x-component': 'AttachmentUpload',
                'x-component-props': {
                  maxSize: 50,
                  description: '单击或将文件拖到该区域以上传',
                },
                'x-reactions': [],
              },
            },
          },
        },
      },
    }
  }), [isEdit]);

  return (
    <div style={{ minHeight: '100vh', overflow: 'auto', padding: '16px' }}>
      <Spin spinning={loading}>
        <Card
          headStyle={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            backgroundColor: '#fff',
          }}
          title="工程文件通知单"
        >
          <FormProvider form={form}>
            <FormLayout {...formLayout}>
              <SchemaField schema={schema} />
            </FormLayout>
          </FormProvider>
        </Card>

        <ToolBar>
          <Button onClick={handleBack} disabled={submitting}>
            返回
          </Button>
          <Button type="primary" icon={<SaveOutlined />} onClick={handleSubmit} loading={submitting}>
            保存
          </Button>
        </ToolBar>
      </Spin>
    </div>
  );
};

export default EngineeringFileNotificationFormPage;
