import React from 'react';
import { Avatar, Tag, Upload } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { GeneratedListPage, withStandardForm } from '@nokecy/qc-ui';
import {
  EmployeeGetListAsync,
  EmployeeDeleteAsync,
  EmployeeExportAsync,
  EmployeeGetImportTemplateAsync,
  EmployeeGetAsync,
  EmployeeCreateAsync,
  EmployeeUpdateAsync
} from '@/services/common/Employee';
import { Employees } from '@/pages/appCommon/_permissions';
import { formComponents } from 'umi';
import { getGridKey } from '../../_utils';
import DepartmentSelect from '@/pages/appCommon/_utils/DepartmentSelect';
import { formId, formSchema } from './components/schema';

/**
 * 员工管理页面
 * 使用外部schema.ts文件配置，支持完整的Formily功能
 */

// 使用外部schema创建表单对话框
const EmployeeFormDialog = withStandardForm({
  formId,
  externalSchema: {
    form: formSchema.form,
    schema: formSchema.schema
  },
  apiConfig: {
    get: EmployeeGetAsync,
    create: EmployeeCreateAsync,
    update: EmployeeUpdateAsync
  },
  customComponents: formComponents,
  defaultDialogConfig: {
    width: 1000
  }
});

// 列定义
const columnDefs = [
  { headerName: '工号', field: 'code', width: 120 },
  {
    headerName: '用户姓名',
    field: 'name',
    width: 150,
    cellRenderer: (params: any) => {
      const { value, data } = params;
      const avatarUrl = data.avatarBlobName
        ? `/api/file-management/file-descriptor/download/${data.avatarBlobName}`
        : null;

      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Avatar
            size="small"
            src={avatarUrl}
            icon={!avatarUrl && <UserOutlined />}
          />
          <span>{value}</span>
        </div>
      );
    }
  },
  {
    headerName: '性别',
    field: 'sex',
    width: 80,
    hideInSearch: true,
    cellRenderer: (params: any) => {
      const { value } = params;
      if (value === null || value === undefined) return '-';
      return value === 1
        ? <Tag color="blue">男</Tag>
        : <Tag color="pink">女</Tag>;
    }
  },
  {
    headerName: '状态',
    field: 'status',
    width: 90,
    hideInSearch: true,
    cellRenderer: (params: any) => {
      const { value } = params;
      if (!value || value === '1') {
        return <Tag color="green">在职</Tag>;
      }
      return <Tag color="red">离职</Tag>;
    }
  },
  { headerName: '出生日期', field: 'birthday', type: 'dateTimeColumn', width: 120, hideInSearch: true },
  { headerName: '身份证号', field: 'idCode', width: 180, hideInSearch: true },
  { headerName: '邮箱', field: 'email', width: 150 },
  {
    headerName: '婚姻状态',
    field: 'marriage',
    width: 100,
    hideInSearch: true,
    cellRenderer: (params: any) => {
      const { value } = params;
      if (!value) return '-';
      const marriageMap: Record<string, { text: string; color: string }> = {
        'Single': { text: '未婚', color: 'default' },
        'Married': { text: '已婚', color: 'blue' },
        'Divorced': { text: '离异', color: 'orange' },
        'Widowed': { text: '丧偶', color: 'purple' }
      };
      const marriage = marriageMap[value] || { text: value, color: 'default' };
      return <Tag color={marriage.color}>{marriage.text}</Tag>;
    }
  },
  { headerName: '手机号', field: 'mobile', width: 130 },
  { headerName: '联系电话', field: 'tel', width: 130, hideInSearch: true },
  { headerName: '联系地址', field: 'address', width: 200, hideInSearch: true },
  { headerName: '入职日期', field: 'hireDate', type: 'dateTimeColumn', width: 120, hideInSearch: true },
  { headerName: '紧急联系人', field: 'contactMan', width: 120, hideInSearch: true },
  { headerName: '紧急联系电话', field: 'contactTel', width: 140, hideInSearch: true },
  { headerName: '部门编码', field: 'departCode', width: 120, hideInSearch: true },
  { headerName: '创建人', field: 'creator', width: 110, hideInSearch: true },
  { headerName: '创建时间', field: 'creationTime', type: 'dateTimeColumn', width: 150, hideInSearch: true, initialSort: 'desc' },
  { headerName: '修改人', field: 'lastModifier', width: 110, hideInSearch: true },
  { headerName: '修改时间', field: 'lastModificationTime', type: 'dateTimeColumn', width: 150, hideInSearch: true }
];

const EmployeesPage: React.FC = () => {
  return (
    <GeneratedListPage
      title="员工信息"
      gridKey={getGridKey('employees')}
      apiConfig={{
        list: EmployeeGetListAsync,
        delete: EmployeeDeleteAsync,
        export: EmployeeExportAsync,
        getImportTemplate: EmployeeGetImportTemplateAsync
      }}
      permissions={{
        create: Employees.Create,
        update: Employees.Update,
        delete: Employees.Delete,
        import: Employees.Import,
        export: Employees.Export
      }}
      columnDefs={columnDefs}
      formDialog={{
        component: EmployeeFormDialog,
        createTitle: '新建员工',
        editTitle: '编辑员工'
      }}
      importConfig={{
        title: '员工信息',
        downUrl: '/api/common/employees/import-template',
        uploadUrl: '/api/common/employees/import'
      }}
      exportFileName="employees.xlsx"
    />
  );
};

export default EmployeesPage;

export const routeProps = {
    name: '员工信息',
};