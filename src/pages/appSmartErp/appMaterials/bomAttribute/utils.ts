// 复用现有的特性处理工具函数

// 树状数据转换函数（参考 attributeProfile.tsx）
export function toTree(data: any[]) {
  // 删除所有 children，以防止多次调用
  data.forEach(function (item) {
    delete item.children;
  });

  // 将数据存储为以 id 为 KEY 的 map 索引数据列
  let map: any = {};
  data.forEach(function (item) {
    map[item.id] = item;
  });

  let val: any[] = [];
  data.forEach(function (item) {
    // 以当前遍历项的parentId，去map对象中找到索引的id
    let parent = map[item.parentId];
    // 如果找到索引，那么说明此项不在顶级当中，那么需要把此项添加到对应的父级中
    if (parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      // 如果没有在map中找到对应的索引ID，那么直接把当前的item添加到val结果集中，作为顶级
      val.push(item);
    }
  });
  return val;
}

export const converAttributes = (attribute: any) => {
  let attributes: any[] = [];
  Object.keys(attribute).map(key => {
    // 只处理特性字段（以 attribute_ 开头的字段）
    if (key.startsWith('attribute_')) {
      const attributeName = key.replace('attribute_', '');
      attributes.push({ name: attributeName, value: attribute[key] });
    }
  });
  return attributes;
};

export const converAttributeToObject = (attributes: any[]) => {
  let initValues: any = {};
  if (attributes && Array.isArray(attributes)) {
    attributes.map(attr => {
      if (attr.name) {
        initValues[`attribute_${attr.name}`] = attr.value;
      }
    });
  }
  return initValues;
};

// 从表单值中提取特性数据
export const extractAttributeValues = (formValues: any) => {
  const attributeValues: any = {};
  
  Object.keys(formValues).forEach(key => {
    if (key.startsWith('attribute_')) {
      const attributeName = key.replace('attribute_', '');
      attributeValues[attributeName] = formValues[key];
    }
  });
  
  return attributeValues;
};

// 表格列定义（参考 attributeProfile.tsx）
export const bomResultColumnDefs = [
  {
    field: 'materialOutCode',
    headerName: '外部编码',
    width: 150,
    cellRenderer: (params: any) => {
      return params.value || params.data.materialCode || '';
    }
  },
  {
    field: 'materialDescription',
    headerName: '物料描述',
    width: 300,
    flex: 1 // 自适应宽度
  },
  {
    field: 'level',
    headerName: '层级',
    width: 80,
    hideInSearch: true,
    cellRenderer: (params: any) => {
      return params.value || '';
    }
  },
  {
    field: 'unitUsage',
    headerName: '单料用量',
    width: 120,
    hideInSearch: true,
    cellRenderer: (params: any) => {
      return params.value ? Number(params.value).toFixed(4) : '0.0000';
    }
  },
  {
    field: 'orderUsage',
    headerName: '订单用量',
    width: 120,
    hideInSearch: true,
    cellRenderer: (params: any) => {
      return params.value ? Number(params.value).toFixed(4) : '0.0000';
    }
  },
  {
    field: 'memo',
    headerName: '备注',
    width: 200,
    cellRenderer: (params: any) => {
      return params.value || '';
    }
  }
];