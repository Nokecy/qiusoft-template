/**
 * 文档变更单 - 快速新建对话框
 * 只能添加单个明细,所有字段平铺
 */
import { FormDialog, FormLayout } from '@formily/antd-v5';
import type { ISchema } from '@formily/json-schema';
import { onFormInit, onFieldValueChange } from '@formily/core';
import { DocumentChangeOrderCreateAsync } from '@/services/pdm/DocumentChangeOrder';
import { DocumentGetAsync } from '@/services/pdm/Document';
import { message } from 'antd';
import { useSchemaField } from '@@/plugin-formSchema';

interface QuickCreateDialogProps {
  onSuccess?: () => void;
}

// Schema 定义 - 所有字段平铺
const createSchema = (): ISchema => ({
  type: 'object',
  properties: {
    grid: {
      type: 'void',
      'x-component': 'FormGrid',
      'x-component-props': {
        maxColumns: 2,
        minColumns: 1,
        columnGap: 24,
        strictAutoFit: true,
      },
      properties: {
        // ========== 基本信息区域 ==========
        basicInfoTitle: {
          type: 'void',
          'x-component': 'FormGrid.GridColumn',
          'x-component-props': { gridSpan: 2 },
          'x-content': '基本信息',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            asterisk: false,
            colon: false,
            style: { fontWeight: 'bold', fontSize: '14px', marginBottom: '8px' },
          },
        },
        title: {
          type: 'string',
          title: '变更主题',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-decorator-props': {
            gridSpan: 2,
          },
          'x-component-props': {
            placeholder: '请输入变更主题',
            maxLength: 200,
          },
        },
        '{value:assignedToUserCode,label:assignedToUserName}': {
          type: 'string',
          title: '处理人',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'UserSelect',
          'x-decorator-props': {
            gridSpan: 2,
          },
          'x-component-props': {
            placeholder: '请选择处理人',
            labelInValue: true,
            labelField: 'name',
            valueField: 'userName',
          },
          name: '{value:assignedToUserCode,label:assignedToUserName}',
        },
        changeReason: {
          type: 'string',
          title: '变更原因',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'Input.TextArea',
          'x-decorator-props': {
            gridSpan: 2,
          },
          'x-component-props': {
            placeholder: '请输入变更原因',
            rows: 2,
            maxLength: 500,
          },
        },
        remarks: {
          type: 'string',
          title: '备注',
          'x-decorator': 'FormItem',
          'x-component': 'Input.TextArea',
          'x-decorator-props': {
            gridSpan: 2,
          },
          'x-component-props': {
            placeholder: '请输入备注',
            rows: 2,
            maxLength: 500,
          },
        },

        // ========== 文档明细信息区域 ==========
        detailInfoTitle: {
          type: 'void',
          'x-component': 'FormGrid.GridColumn',
          'x-component-props': { gridSpan: 2 },
          'x-content': '文档变更明细',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            asterisk: false,
            colon: false,
            style: { fontWeight: 'bold', fontSize: '14px', marginBottom: '8px', marginTop: '16px' },
          },
        },
        '{value:documentId,label:documentNumber}': {
          type: 'string',
          title: '文档编码',
          required: true,
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            gridSpan: 1,
          },
          'x-component': 'DocumentSelect',
          'x-component-props': {
            placeholder: '请选择文档',
            labelInValue: true,
          },
        },
        documentName: {
          type: 'string',
          title: '文档名称',
          required: true,
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            gridSpan: 1,
          },
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '自动带出',
            readOnly: true,
          },
        },
        documentDescription: {
          type: 'string',
          title: '文档描述',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            gridSpan: 2,
          },
          'x-component': 'Input.TextArea',
          'x-component-props': {
            placeholder: '自动带出',
            readOnly: true,
            rows: 2,
          },
        },
        documentType: {
          type: 'string',
          title: '文档类型',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            gridSpan: 1,
          },
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '自动带出',
            readOnly: true,
          },
        },
        currentVersion: {
          type: 'string',
          title: '当前版本',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            gridSpan: 1,
          },
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '自动带出',
            readOnly: true,
          },
        },

        afterChangeFileName: {
          type: 'string',
          title: '变更后文件名称',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            gridSpan: 1,
          },
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '请输入变更后文件名称',
            maxLength: 200,
          },
        },
        afterChangeFileDescription: {
          type: 'string',
          title: '变更后文件描述',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            gridSpan: 2,
          },
          'x-component': 'Input.TextArea',
          'x-component-props': {
            placeholder: '请输入变更后文件描述',
            rows: 2,
            maxLength: 500,
          },
        },
        changeAfterFile: {
          type: 'array',
          title: '变更后文件',
          required: true,
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            gridSpan: 2,
          },
          'x-component': 'FileUploadWithChunks',
          'x-component-props': {
            maxCount: 1,
          },
        },

        // ========== 物料信息区域 ==========
        partInfoTitle: {
          type: 'void',
          'x-component': 'FormGrid.GridColumn',
          'x-component-props': { gridSpan: 2 },
          'x-content': '物料信息',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            asterisk: false,
            colon: false,
            style: { fontWeight: 'bold', fontSize: '14px', marginBottom: '8px', marginTop: '16px' },
          },
        },
        partCode: {
          type: 'string',
          title: '物料编码',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            gridSpan: 1,
          },
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '自动带出',
            readOnly: true,
          },
        },
        partDrawingNumber: {
          type: 'string',
          title: '物料图号',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            gridSpan: 1,
          },
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '自动带出',
            readOnly: true,
          },
        },
        partName: {
          type: 'string',
          title: '物料名称',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            gridSpan: 1,
          },
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '自动带出',
            readOnly: true,
          },
        },
        partDescription: {
          type: 'string',
          title: '物料描述',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            gridSpan: 1,
          },
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '自动带出',
            readOnly: true,
          },
        },

        // ========== 变更信息区域 ==========
        changeInfoTitle: {
          type: 'void',
          'x-component': 'FormGrid.GridColumn',
          'x-component-props': { gridSpan: 2 },
          'x-content': '变更信息',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            asterisk: false,
            colon: false,
            style: { fontWeight: 'bold', fontSize: '14px', marginBottom: '8px', marginTop: '16px' },
          },
        },
        isUpgradeRequired: {
          type: 'boolean',
          title: '是否升级版本',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            gridSpan: 1,
          },
          'x-component': 'Switch',
          'x-component-props': {
            checkedChildren: '是',
            unCheckedChildren: '否',
          },
        },
        versionAfterUpgrade: {
          type: 'string',
          title: '变更后文档版本',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            gridSpan: 1,
          },
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '请输入变更后文档版本',
            maxLength: 50,
          },
          'x-reactions': {
            dependencies: ['isUpgradeRequired'],
            fulfill: {
              state: {
                visible: '{{$deps[0] === true}}',
              },
            },
          },
        },
        internalStorage: {
          type: 'string',
          title: '内部库存',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            gridSpan: 1,
          },
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '请输入内部库存',
            maxLength: 100,
          },
        },
        externalStorage: {
          type: 'string',
          title: '外部库存',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            gridSpan: 1,
          },
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '请输入外部库存',
            maxLength: 100,
          },
        },
        productHandlingOpinion: {
          type: 'string',
          title: '制品处理意见',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            gridSpan: 2,
          },
          'x-component': 'Input.TextArea',
          'x-component-props': {
            placeholder: '请输入制品处理意见',
            rows: 2,
            maxLength: 500,
          },
        },
        relatedOrderNumber: {
          type: 'string',
          title: '关联单号',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            gridSpan: 2,
          },
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '请输入关联单号',
            maxLength: 100,
          },
        },
        changeAfterDescription: {
          type: 'string',
          title: '更改说明',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            gridSpan: 2,
          },
          'x-component': 'Input.TextArea',
          'x-component-props': {
            placeholder: '请输入更改说明',
            rows: 2,
            maxLength: 500,
          },
        },
      },
    },
  },
});

/**
 * 打开快速新建对话框
 */
export const openQuickCreateDialog = (props: QuickCreateDialogProps) => {
  const portalId = 'Pdm.ChangeManagement.DocumentChangeOrder.QuickCreate';
  const schema = createSchema();

  const formDialog = FormDialog(
    {
      title: '快速新建文档变更单',
      width: 1000,
    },
    portalId,
    () => {
      const SchemaField = useSchemaField();

      return (
        <FormLayout labelWidth={120} labelAlign="right" wrapperAlign="left">
          <SchemaField schema={schema} />
        </FormLayout>
      );
    }
  );

  // 表单配置
  const formProps = {
    effects: () => {
      // 表单初始化
      onFormInit((form) => {
        form.setInitialValues({});
      });

      // 监听文档选择变化，自动填充相关字段
      onFieldValueChange('grid.{value:documentId,label:documentNumber}', async (field) => {
        const form = field.form;
        const documentId = field.value?.value || field.value;

        if (documentId) {
          try {
            // 查询文档详情，自动带出字段
            const doc = await DocumentGetAsync({ id: documentId });

            // 自动填充文档字段
            form.setFieldState('grid.documentName', (state: any) => {
              state.value = doc.documentName || '';
            });
            form.setFieldState('grid.documentDescription', (state: any) => {
              state.value = doc.description || '';
            });
            form.setFieldState('grid.documentType', (state: any) => {
              state.value = doc.documentTypeName || '';
            });
            form.setFieldState('grid.currentVersion', (state: any) => {
              state.value = doc.version || '';
            });
            // 自动填充物料字段
            if (doc.primaryPartLink) {
              form.setFieldState('grid.partCode', (state: any) => {
                state.value = doc.primaryPartLink.partNumber || '';
              });
              form.setFieldState('grid.partDrawingNumber', (state: any) => {
                state.value = doc.primaryPartLink.drawingNumber || '';
              });
              form.setFieldState('grid.partName', (state: any) => {
                state.value = doc.primaryPartLink.partName || '';
              });
              form.setFieldState('grid.partDescription', (state: any) => {
                state.value = doc.primaryPartLink.partDescription || doc.primaryPartLink.partName || '';
              });
            }
          } catch (error) {
            console.error('查询文档信息失败:', error);
            message.error('查询文档信息失败');
          }
        }
      });
    },
  };

  formDialog
    .forConfirm(async (payload, next) => {
      const values: any = payload.values;

      // 验证必填字段
      if (!values.title) {
        message.error('变更主题不能为空');
        throw new Error('变更主题不能为空');
      }

      if (!values.assignedToUserName) {
        message.error('处理人不能为空');
        throw new Error('处理人不能为空');
      }

      if (!values.changeReason) {
        message.error('变更原因不能为空');
        throw new Error('变更原因不能为空');
      }

      if (!values.documentId) {
        message.error('请选择文档');
        throw new Error('文档不能为空');
      }

      // 验证文件上传
      const changeAfterFile = values.changeAfterFile || [];
      if (changeAfterFile.length === 0 || !changeAfterFile[0]) {
        message.error('请上传变更后文件');
        throw new Error('变更后文件不能为空');
      }

      const uploadedFile = changeAfterFile[0];

      // 检查文件上传状态
      if (uploadedFile.status === 'uploading') {
        message.error('文件正在上传中,请等待上传完成后再提交');
        throw new Error('文件正在上传');
      }

      if (uploadedFile.status === 'error') {
        message.error('文件上传失败,请重新上传');
        throw new Error('文件上传失败');
      }

      // 检查是否有 uploadId
      if (!uploadedFile.uploadId) {
        message.error('文件未上传完成或上传ID缺失,请重新上传');
        throw new Error('文件上传ID缺失');
      }

      // 构造提交数据
      const submitData: any = {
        title: values.title,
        assignedToUserCode: values.assignedToUserCode,
        assignedToUserName: values.assignedToUserName,
        changeReason: values.changeReason?.trim(),
        remarks: values.remarks?.trim(),
        items: [
          {
            documentId: values.documentId,
            documentNumber: values.documentNumber,
            documentName: values.documentName,
            documentDescription: values.documentDescription || '',
            documentType: values.documentType || '',
            currentVersion: values.currentVersion || '',
            partCode: values.partCode || '',
            partDrawingNumber: values.partDrawingNumber || '',
            partName: values.partName || '',
            partDescription: values.partDescription || '',
            beforeChangeFileId: '', // 快速新建暂不支持变更前文件
            afterChangeFileName: values.afterChangeFileName || '',
            afterChangeFileDescription: values.afterChangeFileDescription || '',
            isUpgradeRequired: values.isUpgradeRequired || false,
            versionAfterUpgrade: values.versionAfterUpgrade || '',
            internalStorage: values.internalStorage || '',
            externalStorage: values.externalStorage || '',
            productHandlingOpinion: values.productHandlingOpinion || '',
            changeAfterDescription: values.changeAfterDescription || '',
            relatedOrderNumber: values.relatedOrderNumber || '',
            changeAfterFileUploadId: uploadedFile.uploadId,
          },
        ],
      };

      try {
        const hide = message.loading('正在创建文档变更单...', 0);

        await DocumentChangeOrderCreateAsync(submitData);

        hide();
        message.success('快速新建成功');

        if (props.onSuccess) {
          props.onSuccess();
        }

        next(values);
      } catch (error: any) {
        console.error('快速新建失败:', error);
        message.error(error?.message || '快速新建失败,请重试');
        throw error;
      }
    })
    .open(formProps);
};

export default openQuickCreateDialog;
