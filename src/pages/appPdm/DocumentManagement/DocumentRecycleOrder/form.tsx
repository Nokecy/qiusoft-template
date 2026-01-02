/**
 * 文档回收单表单页
 * 路由: /appPdm/DocumentManagement/DocumentRecycleOrder/form?id={id}
 * 新建模式：无id参数
 * 编辑模式：有id参数
 *
 * 参考 DocumentRelease/form.tsx 重构，使用 Formily ArrayTable 作为明细列表
 */

import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { Card, Button, message, Spin } from 'antd';
import { ArrowLeftOutlined, SaveOutlined, SendOutlined, PlusOutlined } from '@ant-design/icons';
import { history, useSchemaField, closeTab } from 'umi';
import { useKeepAliveParams } from '@/hooks';
import { createForm } from '@formily/core';
import { FormProvider } from '@formily/react';
import { FormLayout, FormGrid, ArrayTable } from '@formily/antd-v5';
import type { ISchema } from '@formily/json-schema';
import { ToolBar } from '@/components';
import {
  DocumentRecycleOrderGetAsync,
  DocumentRecycleOrderCreateAsync,
  DocumentRecycleOrderUpdateAsync,
  DocumentRecycleOrderSubmitAsync,
} from '@/services/pdm/DocumentRecycleOrder';
import { DocumentGetVersionAsync, DocumentGetVersionListAsync } from '@/services/pdm/Document';
import UserSelect from '@/pages/appPdm/_formWidgets/UserSelect';
import UserOrgSelect from '@/pages/appPdm/_formWidgets/UserOrgSelect';
import dayjs from 'dayjs';
import DocumentSelectDialog from '@/pages/appPdm/DocumentManagement/_components/DocumentSelectDialog';
import { formatVersionNumber } from '@/pages/appPdm/DocumentManagement/Document/_utils/documentStatus';

type UserSnapshotDto = API.BurnAbpPdmDocumentManagementRecycleOrdersUserSnapshotDto;
type LabelInValue = { value: string; label: string };

const toUserSnapshots = (value: any): UserSnapshotDto[] => {
  if (!value) return [];
  const arr = Array.isArray(value) ? value : [value];
  return arr
    .map((v: any) => {
      if (!v) return null;
      if (typeof v === 'string') return { userId: v, userName: v };
      if (v.userId && v.userName) return { userId: v.userId, userName: v.userName };
      if (v.value) return { userId: v.value, userName: v.label || '' };
      return null;
    })
    .filter(Boolean);
};

const toLabelInValueArray = (users: UserSnapshotDto[]): LabelInValue[] => {
  return (users || []).map(u => ({ value: u.userId, label: u.userName }));
};

export const routeProps = {
  name: '文档回收单表单',
};

// 表单布局配置
const formLayout = {
  labelCol: 6,
  wrapperCol: 18,
  labelWidth: 120,
  feedbackLayout: 'none' as const,
};

const DocumentRecycleOrderFormPage: React.FC = () => {
  const { id: orderId, isActive, hasChanged } = useKeepAliveParams(
    '/appPdm/DocumentManagement/DocumentRecycleOrder/form',
    ['id']
  );
  const isEdit = !!orderId;

  const SchemaField = useSchemaField({
    UserSelect,
    UserOrgSelect,
    ArrayTable,
  });

  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDocumentSelect, setShowDocumentSelect] = useState(false);
  const [versionOptionsByDocumentId, setVersionOptionsByDocumentId] = useState<Record<string, { value: string; versionId: string }[]>>({});
  const loadingVersionIdsRef = useRef<Set<string>>(new Set());

  // 创建表单实例
  const form = useMemo(
    () => createForm({ validateFirst: true }),
    [orderId]
  );

  const getAllowedUsers = useCallback((recycleUsers: any) => {
    return toLabelInValueArray(toUserSnapshots(recycleUsers));
  }, []);

  const getVersionLabel = (version: any) => {
    if (version?.fullVersion) return version.fullVersion;
    return formatVersionNumber(version?.version, version?.revision);
  };

  const getVersionOptions = useCallback(
    (documentId?: string) => {
      if (!documentId) return [];
      return versionOptionsByDocumentId[documentId] || [];
    },
    [versionOptionsByDocumentId]
  );

  const updateRecycleVersionOptions = useCallback(
    (documentId: string, options: { value: string; versionId: string }[]) => {
      const rows = form.values?.documents || [];
      rows.forEach((row: any, index: number) => {
        if (row?.documentId !== documentId) return;
        const selectOptions = options.map((item) => ({
          label: item.value,
          value: item.value,
        }));
        form.setFieldState(`documents.${index}.recycleVersion`, (state) => {
          state.componentProps = {
            ...(state.componentProps || {}),
            options: selectOptions,
            disabled: selectOptions.length === 0,
          };
        });
      });
    },
    [form]
  );

  const loadVersionOptions = useCallback(async (documentId: string) => {
    if (!documentId) return;
    if (versionOptionsByDocumentId[documentId]) return;
    if (loadingVersionIdsRef.current.has(documentId)) return;

    loadingVersionIdsRef.current.add(documentId);
    try {
      const result = await DocumentGetVersionListAsync({
        Filter: `documentId = ${documentId},publishStatus=1`,
        SkipCount: 0,
        MaxResultCount: 200,
      });

      const options = (result.items || [])
        .map((item) => ({
          value: getVersionLabel(item),
          versionId: item.id || '',
        }))
        .filter((item) => item.value);

      setVersionOptionsByDocumentId((prev) => ({
        ...prev,
        [documentId]: options,
      }));
      updateRecycleVersionOptions(documentId, options);

      if (options.length > 0) {
        const current = form.values?.documents || [];
        const next = current.map((item: any) => {
          if (item.documentId !== documentId) return item;
          // 如果当前已有值且在选项中，保持不变；否则默认选中最新版本
          const matched = options.find((option) => option.value === item.recycleVersion);
          if (matched) {
            return {
              ...item,
              documentVersionId: matched.versionId || item.documentVersionId,
            };
          }
          // 默认选中第一个（通常是最新）
          // return {
          //   ...item,
          //   recycleVersion: options[0].value,
          //   documentVersionId: options[0].versionId,
          // };
          return item;
        });
        form.setValues({ documents: next });
      }
    } catch (error) {
      setVersionOptionsByDocumentId((prev) => ({
        ...prev,
        [documentId]: [],
      }));
    } finally {
      loadingVersionIdsRef.current.delete(documentId);
    }
  }, [versionOptionsByDocumentId, form, getVersionLabel, updateRecycleVersionOptions]);

  // 加载初始数据
  useEffect(() => {
    if (!isActive || !hasChanged) return;

    if (orderId) {
      setLoading(true);
      DocumentRecycleOrderGetAsync({ id: orderId })
        .then(data => {
          const initialValues: any = {
            id: data.id,
            approverCode: data.approverCode ? { value: data.approverCode, label: data.approverName || data.approverCode } : undefined,
            recycleUsers: toLabelInValueArray(data.recycleUsers || []),
            recycleTime: data.recycleTime ? dayjs(data.recycleTime) : undefined,
            remarks: data.remarks,
          };

          form.setInitialValues(initialValues);

          // 加载明细列表
          if (data.items && data.items.length > 0) {
            const items = data.items.map((item: any, index: number) => ({
              ...item,
              rowId: `row_${index}`,
              expectedRecycleTime: item.expectedRecycleTime ? dayjs(item.expectedRecycleTime) : null,
              excludeUsers: toLabelInValueArray(item.excludeUsers || []),
            }));
            form.setValues({ documents: items });

            // 加载版本选项
            items.forEach((item) => {
              if (item.documentId) {
                const options = getVersionOptions(item.documentId);
                if (options.length > 0) {
                  updateRecycleVersionOptions(item.documentId, options);
                }
              }
            });
            items
              .filter((item) => item.documentId)
              .forEach((item) => loadVersionOptions(item.documentId));

            // 如果有documentVersionId但没有documentId（理论上不应该，但防守一下），可以像DocumentRelease那样处理
            // 这里暂且假设都有documentId
          }
        })
        .catch(() => {
          message.error('加载数据失败');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isActive, hasChanged, orderId, form, loadVersionOptions, getVersionOptions, updateRecycleVersionOptions]);

  // 返回列表
  const handleBack = () => {
    const currentPath = `${history.location.pathname}${history.location.search || ''}`;
    history.push('/appPdm/DocumentManagement/DocumentRecycleOrder');
    setTimeout(() => {
      closeTab(currentPath);
    }, 150);
  };

  // 保存数据(提取公共逻辑)
  const saveData = async () => {
    const values = await form.submit();

    // 验证必填字段
    if (!values.approverCode) {
      message.error('审核人不能为空');
      throw new Error('审核人不能为空');
    }

    const recycleUsers = toUserSnapshots(values.recycleUsers);
    if (!recycleUsers || recycleUsers.length === 0) {
      message.error('回收对象不能为空');
      throw new Error('回收对象不能为空');
    }

    if (!values.recycleTime) {
      message.error('回收时间不能为空');
      throw new Error('回收时间不能为空');
    }

    // 验证明细列表
    const documents = values.documents || [];
    if (documents.length === 0) {
      message.error('请至少添加一条文档回收明细');
      throw new Error('请至少添加一条文档回收明细');
    }

    // 构造提交数据
    const submitData: any = {
      approverCode: values.approverCode?.value || values.approverCode,
      approverName: values.approverCode?.label || values.approverCode,
      recycleUsers,
      recycleTime: values.recycleTime ? dayjs(values.recycleTime).format('YYYY-MM-DD') : undefined,
      remarks: values.remarks?.trim(),
      items: documents.map((item: any) => ({
        documentId: item.documentId,
        quantity: item.quantity || 1,
        recycleVersion: item.recycleVersion || item.documentVersion,
        excludeUsers: toUserSnapshots(item.excludeUsers),
        expectedRecycleTime: item.expectedRecycleTime ? dayjs(item.expectedRecycleTime).format('YYYY-MM-DD') : undefined,
        remarks: item.remarks,
      })),
    };

    let result;
    if (isEdit) {
      result = await DocumentRecycleOrderUpdateAsync({ id: orderId }, submitData);
    } else {
      result = await DocumentRecycleOrderCreateAsync(submitData);
    }

    return result;
  };

  // 保存
  const handleSave = async () => {
    setSubmitting(true);
    try {
      await saveData();
      message.success('保存成功');
      handleBack();
    } catch (error: any) {
      if (error.message && !error.message.includes('不能为空') && !error.message.includes('请至少')) {
        message.error('保存失败');
      }
    } finally {
      setSubmitting(false);
    }
  };

  // 保存并提交
  const handleSaveAndSubmit = async () => {
    setSubmitting(true);
    try {
      const result = await saveData();
      if (result && result.id) {
        await DocumentRecycleOrderSubmitAsync({ id: result.id });
        message.success('提交成功');
        handleBack();
      } else if (isEdit) {
        await DocumentRecycleOrderSubmitAsync({ id: orderId });
        message.success('提交成功');
        handleBack();
      } else {
        message.warning('保存失败，无法提交');
      }
    } catch (error: any) {
      if (error.message && !error.message.includes('不能为空') && !error.message.includes('请至少')) {
        message.error('操作失败');
      }
    } finally {
      setSubmitting(false);
    }
  };

  // 添加文档
  const handleAddDocuments = () => {
    setShowDocumentSelect(true);
  };

  // 从文档列表选择完成
  const handleDocumentSelected = useCallback((selectedRows: any[]) => {
    if (!Array.isArray(selectedRows) || selectedRows.length === 0) {
      setShowDocumentSelect(false);
      return;
    }

    const newItems = selectedRows.map((doc, index) => ({
      rowId: `row_${Date.now()}_${index}`,
      documentId: doc.id,
      documentNumber: doc.documentNumber,
      documentName: doc.documentName,
      documentVersion: formatVersionNumber(doc.version, doc.revision),
      recycleVersion: formatVersionNumber(doc.version, doc.revision),
      quantity: 1,
      excludeUsers: [],
      expectedRecycleTime: null,
      remarks: '',
    }));

    const current = form.values?.documents || [];
    form.setValues({ documents: [...current, ...newItems] });
    setShowDocumentSelect(false);
    message.success(`已添加 ${selectedRows.length} 个文档`);

    selectedRows.forEach((doc) => {
      if (doc?.id) {
        loadVersionOptions(doc.id);
      }
    });
  }, [form, loadVersionOptions]);

  // Schema定义
  const schema: ISchema = useMemo(() => ({
    type: 'object',
    properties: {
      grid: {
        type: 'void',
        'x-component': 'FormGrid',
        'x-component-props': {
          minColumns: 2,
          maxColumns: 2,
          strictAutoFit: true,
          rowGap: 8,
        },
        properties: {
          colApprover: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              approverCode: {
                type: 'string',
                title: '审核人',
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
          colRecycleUsers: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              recycleUsers: {
                type: 'array',
                title: '回收对象',
                required: true,
                'x-decorator': 'FormItem',
                'x-component': 'UserOrgSelect',
                'x-component-props': {
                  placeholder: '请选择回收对象(多选)',
                  mode: 'multiple',
                  labelInValue: true,
                  labelField: 'name',
                  onChange: (val: any) => {
                    const allowedIds = new Set(
                      toUserSnapshots(val).map((item) => item.userId)
                    );
                    const current = form.values?.documents || [];
                    const next = current.map((item: any) => {
                      const before: UserSnapshotDto[] = toUserSnapshots(item.excludeUsers);
                      const after = before.filter((u) => allowedIds.has(u.userId));
                      return before.length === after.length
                        ? item
                        : { ...item, excludeUsers: toLabelInValueArray(after) };
                    });
                    form.setValues({ documents: next });
                  },
                },
              },
            },
          },
          colRecycleTime: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 1 },
            properties: {
              recycleTime: {
                type: 'string',
                title: '回收时间',
                required: true,
                'x-decorator': 'FormItem',
                'x-component': 'DatePicker',
                'x-component-props': {
                  placeholder: '请选择回收时间',
                  style: { width: '100%' },
                },
              },
            },
          },
          colRemarks: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
            'x-component-props': { gridSpan: 2 },
            properties: {
              remarks: {
                type: 'string',
                title: '备注',
                'x-decorator': 'FormItem',
                'x-component': 'Input.TextArea',
                'x-component-props': {
                  placeholder: '请输入备注',
                  rows: 2,
                },
              },
            },
          },
        },
      },
    },
  }), [form]);

  // 明细 Schema 定义
  const documentsSchema: ISchema = useMemo(() => ({
    type: 'object',
    properties: {
      documents: {
        type: 'array',
        title: '文档回收明细',
        'x-decorator': 'FormItem',
        'x-component': 'ArrayTable',
        'x-component-props': {
          gridKey: 'documentRecycleOrder.documents',
          pagination: false,
        },
        items: {
          type: 'object',
          properties: {
            documentId: {
              type: 'string',
              'x-decorator': 'FormItem',
              'x-component': 'Input',
              'x-hidden': true,
            },
            rowId: {
              type: 'string',
              'x-decorator': 'FormItem',
              'x-component': 'Input',
              'x-hidden': true,
            },
            col1: {
              type: 'void',
              'x-component': 'ArrayTable.Column',
              'x-component-props': { title: '文档编码', width: 150 },
              properties: {
                documentNumber: {
                  type: 'string',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                  'x-component-props': { disabled: true },
                },
              },
            },
            col2: {
              type: 'void',
              'x-component': 'ArrayTable.Column',
              'x-component-props': { title: '文档名称', width: 200 },
              properties: {
                documentName: {
                  type: 'string',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                  'x-component-props': { disabled: true },
                },
              },
            },
            col3: {
              type: 'void',
              'x-component': 'ArrayTable.Column',
              'x-component-props': { title: '文档版本', width: 100 },
              properties: {
                documentVersion: {
                  type: 'string',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                  'x-component-props': { disabled: true },
                },
              },
            },
            col4: {
              type: 'void',
              'x-component': 'ArrayTable.Column',
              'x-component-props': { title: '份数', width: 80 },
              properties: {
                quantity: {
                  type: 'number',
                  'x-decorator': 'FormItem',
                  'x-component': 'NumberPicker',
                  'x-component-props': { min: 1 },
                },
              },
            },
            col5: {
              type: 'void',
              'x-component': 'ArrayTable.Column',
              'x-component-props': { title: '回收版本', width: 120 },
              properties: {
                recycleVersion: {
                  type: 'string',
                  'x-decorator': 'FormItem',
                  'x-component': 'Select',
                  'x-component-props': {
                    placeholder: '请选择',
                  },
                },
              },
            },
            col6: {
              type: 'void',
              'x-component': 'ArrayTable.Column',
              'x-component-props': { title: '预计回收时间', width: 150 },
              properties: {
                expectedRecycleTime: {
                  type: 'string',
                  'x-decorator': 'FormItem',
                  'x-component': 'DatePicker',
                  'x-component-props': { style: { width: '100%' } },
                },
              },
            },
            col7: {
              type: 'void',
              'x-component': 'ArrayTable.Column',
              'x-component-props': { title: '不回收对象', width: 220 },
              properties: {
                excludeUsers: {
                  type: 'array',
                  'x-decorator': 'FormItem',
                  'x-component': 'UserSelect',
                  'x-component-props': {
                    mode: 'multiple',
                    labelInValue: true,
                    labelField: 'name',
                    placeholder: '请选择',
                    options: '{{getAllowedUsers($form.values.recycleUsers)}}',
                    maxTagCount: 1,
                    maxTagPlaceholder: (omittedValues: any[]) => `+${omittedValues.length}人`,
                  },
                },
              },
            },
            col8: {
              type: 'void',
              'x-component': 'ArrayTable.Column',
              'x-component-props': { title: '备注', width: 150 },
              properties: {
                remarks: {
                  type: 'string',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                },
              },
            },
            col9: {
              type: 'void',
              'x-component': 'ArrayTable.Column',
              'x-component-props': { title: '操作', width: 80, fixed: 'right' },
              properties: {
                remove: {
                  type: 'void',
                  'x-component': 'ArrayTable.Remove',
                },
              },
            },
          },
        },
      },
    },
  }), [getAllowedUsers]);

  return (
    <Spin spinning={loading}>
      <div style={{ height: '100%', overflow: 'auto', padding: '16px' }}>
        <Card
          headStyle={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            backgroundColor: '#fff',
          }}
          title={isEdit ? '编辑文档回收单' : '新建文档回收单'}
          extra={
            <ToolBar>
              <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
                返回
              </Button>
              <Button
                icon={<SaveOutlined />}
                loading={submitting}
                onClick={handleSave}
              >
                保存
              </Button>
              <Button
                type="primary"
                icon={<SendOutlined />}
                loading={submitting}
                onClick={handleSaveAndSubmit}
              >
                保存并提交
              </Button>
            </ToolBar>
          }
        >
          <FormProvider form={form}>
            <FormLayout {...formLayout}>
              <SchemaField schema={schema} scope={{ getAllowedUsers }} />
            </FormLayout>

            {/* 文档回收明细 */}
            <Card
              title="文档回收明细"
              style={{ marginTop: 16 }}
              extra={
                <Button
                  type="primary"
                  size="small"
                  icon={<PlusOutlined />}
                  onClick={handleAddDocuments}
                >
                  添加文档
                </Button>
              }
            >
              <SchemaField schema={documentsSchema} scope={{ getAllowedUsers }} />
            </Card>
          </FormProvider>
        </Card>

        <DocumentSelectDialog
          open={showDocumentSelect}
          title="选择文档"
          onCancel={() => setShowDocumentSelect(false)}
          onConfirm={handleDocumentSelected}
        />
      </div>
    </Spin>
  );
};

export default DocumentRecycleOrderFormPage;
