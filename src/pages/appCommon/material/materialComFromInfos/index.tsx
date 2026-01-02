import React from 'react';
import { Tag } from 'antd';
import { GeneratedListPage, withStandardForm } from '@nokecy/qc-ui';
import {
  MaterialComFromInfoGetListAsync,
  MaterialComFromInfoDeleteAsync,
  MaterialComFromInfoGetAsync,
  MaterialComFromInfoCreateAsync,
  MaterialComFromInfoUpdateAsync
} from '@/services/common/MaterialComFromInfo';
import { MaterialComFromInfos } from '@/pages/appCommon/_permissions';
import { formComponents } from 'umi';
import { getGridKey } from '../../_utils';
import { formId, formSchema } from './components/schema';

/**
 * 物料来源信息页面
 * 使用外部schema.ts文件配置，支持完整的Formily功能
 */

const comeFromTypeEnum = [
  { label: "采购", value: 1, color: '#1890ff' },
  { label: "生产", value: 2, color: '#52c41a' },
  { label: "虚拟", value: 3, color: '#faad14' },
  { label: "外协", value: 4, color: '#f5222d' },
  { label: "计划", value: 5, color: '#722ed1' },
  { label: "费用", value: 6, color: '#fa8c16' },
  { label: "来料", value: 7, color: '#13c2c2' },
  { label: "模型", value: 8, color: '#eb2f96' },
  { label: "发货", value: 9, color: '#52c41a' },
  { label: "特征", value: 10, color: '#1890ff' },
  { label: "选配", value: 11, color: '#faad14' },
  { label: "选一", value: 12, color: '#f5222d' }
];

// 使用外部schema创建表单对话框
const MaterialComFromInfoFormDialog = withStandardForm({
  formId,
  externalSchema: {
    form: formSchema.form,
    schema: formSchema.schema
  },
  apiConfig: {
    get: MaterialComFromInfoGetAsync,
    create: MaterialComFromInfoCreateAsync,
    update: MaterialComFromInfoUpdateAsync
  },
  customComponents: formComponents,
  defaultDialogConfig: {
    width: 700
  }
});

// 列定义
const columnDefs = [
  { headerName: '来源编码', field: 'comFromCode', width: 150 },
  { headerName: '来源名称', field: 'comFromName', width: 200 },
  {
    headerName: '来源类型',
    field: 'comeFromTypeCode',
    width: 120,
    cellRenderer: (params: any) => {
      const { value } = params;
      if (!value && value !== 0) return '-';

      const enumItem = comeFromTypeEnum.find(item => item.value === value);
      if (enumItem) {
        return <Tag color={enumItem.color}>{enumItem.label}</Tag>;
      }
      return value;
    }
  },
  { headerName: '来源类型名称', field: 'comeFromTypeName', width: 150, hideInSearch: true },
  { headerName: '创建人', field: 'creator', width: 110, hideInSearch: true },
  { headerName: '创建时间', field: 'creationTime', type: 'dateTimeColumn', width: 150, hideInSearch: true, initialSort: 'desc' },
  { headerName: '修改人', field: 'lastModifier', width: 110, hideInSearch: true },
  { headerName: '修改时间', field: 'lastModificationTime', type: 'dateTimeColumn', width: 150, hideInSearch: true }
];

const MaterialComFromInfosPage: React.FC = () => {
  return (
    <GeneratedListPage
      title="物料来源信息"
      gridKey={getGridKey('materialComFromInfos')}
      apiConfig={{
        list: MaterialComFromInfoGetListAsync,
        delete: MaterialComFromInfoDeleteAsync
      }}
      permissions={{
        create: MaterialComFromInfos.Create,
        update: MaterialComFromInfos.Update,
        delete: MaterialComFromInfos.Delete
      }}
      columnDefs={columnDefs}
      formDialog={{
        component: MaterialComFromInfoFormDialog,
        createTitle: '新建物料来源信息',
        editTitle: '编辑物料来源信息'
      }}
      enableImportExport={false}
    />
  );
};

export default MaterialComFromInfosPage;

export const routeProps = {
    name: '物料来源信息',
};