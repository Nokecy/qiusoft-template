// appCommon模块表格键值映射
export const getGridKey = (name: string): string => {
    const gridKeyMap: Record<string, string> = {
        // 仓储档案管理
        'warehouses': 'Common.Warehouses',
        'locations': 'Common.Locations',
        
        // 供应链管理
        'customers': 'Common.Customers',
        'customerContacts': 'Common.CustomerContacts',
        'suppliers': 'Common.Suppliers',
        'supplierContacts': 'Common.SupplierContacts',
        
        // 部门管理
        'departments': 'Common.Departments',
        'employees': 'Common.Employees',
        'workShops': 'Common.WorkShops',
        'workCenters': 'Common.WorkCenters',
        'workLines': 'Common.WorkLines',
        
        // 物料管理
        'materialComFromInfos': 'Common.MaterialComFromInfos',
        'unitGroups': 'Common.UnitGroups',
        'units': 'Common.Units',
        'materialClasses': 'Common.MaterialClasses',
        'materials': 'Common.Materials',
        'partnerMaterials': 'Common.PartnerMaterials',
        'assets': 'Common.Assets',
    };
    
    return gridKeyMap[name] || `Common.${name}`;
};