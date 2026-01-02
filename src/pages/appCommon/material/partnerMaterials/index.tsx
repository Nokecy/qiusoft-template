import React from 'react';
import { GeneratedListPage, withStandardForm } from '@nokecy/qc-ui';
import { 
  PartnerMaterialGetListAsync, 
  PartnerMaterialDeleteAsync, 
  PartnerMaterialExportAsync,
  PartnerMaterialGetImportTemplateAsync,
  PartnerMaterialGetAsync,
  PartnerMaterialCreateAsync,
  PartnerMaterialUpdateAsync
} from '@/services/common/PartnerMaterial';
import { PartnerMaterials } from '@/pages/appCommon/_permissions';
import { formComponents } from 'umi';
import { getGridKey } from '../../_utils';
import { CustomerSelect, SupplierSelect } from '../../_utils';
import { formId, formSchema } from './components/schema';

/**
 * 伙伴物料管理页面
 * 使用外部schema.ts文件配置，支持完整的Formily功能
 */

const typeEnum = [
  { label: "客户", value: "Customer", color: '#52c41a' },
  { label: "供应商", value: "Supplier", color: '#1890ff' }
];

// 使用外部schema创建表单对话框
const PartnerMaterialFormDialog = withStandardForm({
  formId,
  externalSchema: {
    form: formSchema.form,
    schema: formSchema.schema
  },
  customComponents: {
    CustomerSelect,
    SupplierSelect
  },
  apiConfig: {
    get: PartnerMaterialGetAsync,
    create: PartnerMaterialCreateAsync,
    update: PartnerMaterialUpdateAsync
  },
  customComponents: formComponents,
  defaultDialogConfig: {
    width: 800
  }
});

// 列定义
const columnDefs = [
  { headerName: '类型', field: 'type', width: 100, valueEnum: typeEnum },
  { headerName: '客户编码', field: 'customerCode', width: 120, hideInSearch: true },
  { headerName: '供应商编码', field: 'supplierCode', width: 120, hideInSearch: true },
  { headerName: '物料编码', field: 'materialCode', width: 150 },
  { headerName: '物料外部编码', field: 'materialOutCode', width: 150 },
  { headerName: '物料描述', field: 'materialDescription', width: 200 },
  { headerName: '物料规格型号', field: 'materialSpecificationModel', width: 150, hideInSearch: true },
  { headerName: '单位名称', field: 'unitName', width: 100, hideInSearch: true },
  { headerName: '创建时间', field: 'creationTime', type: 'dateTimeColumn', width: 150, hideInSearch: true, initialSort: 'desc' },
  { headerName: '修改时间', field: 'lastModificationTime', type: 'dateTimeColumn', width: 150, hideInSearch: true }
];

const PartnerMaterialsPage: React.FC = () => {
  return (
    <GeneratedListPage
      title="伙伴物料"
      gridKey={getGridKey('partnerMaterials')}
      apiConfig={{
        list: PartnerMaterialGetListAsync,
        delete: PartnerMaterialDeleteAsync,
        export: PartnerMaterialExportAsync,
        getImportTemplate: PartnerMaterialGetImportTemplateAsync
      }}
      permissions={{
        create: PartnerMaterials.Create,
        update: PartnerMaterials.Update,
        delete: PartnerMaterials.Delete,
        import: PartnerMaterials.Import,
        export: PartnerMaterials.Export
      }}
      columnDefs={columnDefs}
      formDialog={{
        component: PartnerMaterialFormDialog,
        createTitle: '新建伙伴物料',
        editTitle: '编辑伙伴物料'
      }}
      importConfig={{
        title: '伙伴物料',
        downUrl: '/api/common/partner-materials/import-template',
        uploadUrl: '/api/common/partner-materials/import'
      }}
      exportFileName="partnerMaterials.xlsx"
    />
  );
};

export default PartnerMaterialsPage;

export const routeProps = {
    name: '伙伴物料',
};