import React, { useEffect, useMemo, useState } from 'react';
import { GeneratedListPage, withStandardForm } from '@nokecy/qc-ui';
import {
  MaterialGetListAsync,
  MaterialDeleteAsync,
  MaterialExportAsync,
  MaterialGetImportTemplateAsync,
  MaterialGetAsync,
  MaterialCreateAsync,
  MaterialUpdateAsync
} from '@/services/common/Material';
import { Materials } from '@/pages/appCommon/_permissions';
import { formComponents } from 'umi';
import { getGridKey } from '../../_utils';
import { formId, formSchema } from './components/schema';
import MaterialComFromDisplay from '@/pages/appCommon/_utils/MaterialComFromDisplay';
import { MaterialComFromInfoGetSystemMaterialComFromListAsync } from '@/services/common/MaterialComFromInfo';

/**
 * 物料管理页面
 * 使用外部schema.ts文件配置,支持完整的Formily功能
 */

const effectStatusEnum = [
  { label: "草稿", value: 1, color: '#d9d9d9' },
  { label: "审核中", value: 5, color: '#faad14' },
  { label: "生效", value: 10, color: '#52c41a' },
  { label: "失效", value: 15, color: '#f5222d' }
];

const statusEnum = [
  { label: "正常", value: 1, color: '#52c41a' },
  { label: "停用", value: 4, color: '#faad14' },
  { label: "停用", value: 6, color: '#f5222d' }
];

// 使用外部schema创建表单对话框
const MaterialFormDialog = withStandardForm({
  formId,
  externalSchema: {
    form: formSchema.form,
    schema: formSchema.schema
  },
  apiConfig: {
    get: MaterialGetAsync,
    create: MaterialCreateAsync,
    update: MaterialUpdateAsync
  },
  customComponents: formComponents,
  defaultDialogConfig: {
    width: 1000
  }
});

const MaterialsPage: React.FC = () => {
  const [comeFromList, setComeFromList] = useState<any[]>([]);

  useEffect(() => {
    const getComeFromList = async () => {
      const data = await MaterialComFromInfoGetSystemMaterialComFromListAsync({});
      if (data) {
        setComeFromList(data);
      }
    };
    getComeFromList();
  }, []);

  // 确保 comeFromList 只在数据变化时更新
  const memoizedComeFromList = useMemo(() => comeFromList, [comeFromList]);

  // 列定义
  const columnDefs = [
  { headerName: '物料编码', field: 'code', width: 150 },
  { headerName: '物料外码', field: 'outCode', width: 150, hideInSearch: true },
  { headerName: '物料分类', field: 'classCode', width: 120, hideInSearch: true },
  { headerName: '基本单位', field: 'unitName', width: 120, hideInSearch: true },
  {
    headerName: '来源',
    field: 'comeFrom',
    width: 100,
    hideInSearch: true,
    cellRenderer: (params: any) => {
      return <MaterialComFromDisplay value={params.value} comeFromList={memoizedComeFromList} />;
    }
  },
  { headerName: '规格型号', field: 'specificationModel', width: 150 },
  { headerName: '对外规格型号', field: 'outSpecification', width: 150, hideInSearch: true },
  { headerName: '物料描述', field: 'description', width: 200 },
  { headerName: '对外描述', field: 'outDescription', width: 150, hideInSearch: true },
  { headerName: '英文描述', field: 'engDescription', width: 150, hideInSearch: true },
  { headerName: '工艺路线编码', field: 'craftRouteCode', width: 130, hideInSearch: true },
  { headerName: '节拍', field: 'ct', width: 80, hideInSearch: true },
  { headerName: '颜色代码', field: 'colorCode', width: 100, hideInSearch: true },
  { headerName: '材质编码', field: 'materialPropertyCode', width: 120, hideInSearch: true },
  { headerName: '长度(mm)', field: 'length', width: 100, hideInSearch: true },
  { headerName: '宽度(mm)', field: 'width', width: 100, hideInSearch: true },
  { headerName: '厚度(mm)', field: 'thickness', width: 100, hideInSearch: true },
  { headerName: '面积', field: 'area', width: 80, hideInSearch: true },
  { headerName: '生效状态', field: 'effectStatus', width: 100, valueEnum: effectStatusEnum },
  { headerName: '状态', field: 'status', width: 80, valueEnum: statusEnum },
  { headerName: '创建人', field: 'creator', width: 110, hideInSearch: true },
  { headerName: '创建时间', field: 'creationTime', type: 'dateTimeColumn', width: 150, hideInSearch: true, initialSort: 'desc' },
  { headerName: '修改人', field: 'lastModifier', width: 110, hideInSearch: true },
  { headerName: '修改时间', field: 'lastModificationTime', type: 'dateTimeColumn', width: 150, hideInSearch: true }
];

  return (
    <GeneratedListPage
      title="物料信息"
      gridKey={getGridKey('materials')}
      apiConfig={{
        list: MaterialGetListAsync,
        delete: MaterialDeleteAsync,
        export: MaterialExportAsync,
        getImportTemplate: MaterialGetImportTemplateAsync
      }}
      permissions={{
        create: Materials.Create,
        update: Materials.Update,
        delete: Materials.Delete,
        import: Materials.Import,
        export: Materials.Export
      }}
      columnDefs={columnDefs}
      formDialog={{
        component: MaterialFormDialog,
        createTitle: '新建物料',
        editTitle: '编辑物料'
      }}
      importConfig={{
        title: '物料信息',
        downUrl: '/api/common/materials/import-template',
        uploadUrl: '/api/common/materials/import'
      }}
      exportFileName="materials.xlsx"
    />
  );
};

export default MaterialsPage;

export const routeProps = {
    name: '物料信息',
};