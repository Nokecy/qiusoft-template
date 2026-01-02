/**
 * PropertyBinding示例模板库
 * 提供各种常见场景的模板示例
 */

import { AtlTemplate, ElementType, BindingMode, LayoutType, DataSourceType, BarcodeType, TextAlignment } from '../types';

/**
 * 示例数据
 */
export const EXAMPLE_DATA = {
  basicText: {
    customer: {
      id: 'C001',
      name: '张三',
      phone: '13800138000',
      address: '北京市朝阳区xxx街道xxx号',
    },
    order: {
      code: 'ORD20240115001',
      date: '2024-01-15T14:30:00',
      status: 'completed',
      quantity: 15,
    },
  },
  barcode: {
    product: {
      code: '1234567890128',
      name: '产品A',
      price: 99.99,
    },
  },
  table: {
    items: [
      { name: '产品A', quantity: 10, price: 99.99 },
      { name: '产品B', quantity: 5, price: 199.99 },
      { name: '产品C', quantity: 8, price: 149.99 },
    ],
  },
};

/**
 * 1. 基础文本标签示例
 */
export const basicTextTemplate: AtlTemplate = {
  version: '1.0',
  metadata: {
    name: '基础文本标签',
    description: '演示静态文本和简单数据绑定',
    tags: ['基础', '文本', 'Static', 'DataPath'],
  },
  canvas: {
    width: 100,
    height: 60,
    dpi: 300,
    backgroundColor: '#FFFFFF',
  },
  layoutType: LayoutType.Report,
  dataSources: {},
  elements: [
    // 静态标题
    {
      id: 'title',
      type: ElementType.Text,
      position: { x: 10, y: 10 },
      size: { width: 80, height: 10 },
      zIndex: 1,
      visible: { mode: BindingMode.Static, staticValue: true },
      properties: {
        text: {
          mode: BindingMode.Static,
          staticValue: '客户信息卡',
          description: '静态标题文本',
        },
        font: { family: 'Arial', size: 14, bold: true },
        alignment: TextAlignment.Center,
      },
    },
    // 客户名称（数据绑定）
    {
      id: 'customerName',
      type: ElementType.Text,
      position: { x: 10, y: 25 },
      size: { width: 80, height: 8 },
      zIndex: 1,
      visible: { mode: BindingMode.Static, staticValue: true },
      properties: {
        text: {
          mode: BindingMode.DataPath,
          dataPath: 'customer.name',
          fallbackValue: '未知客户',
          description: '客户姓名',
        },
        font: { family: 'Arial', size: 12 },
      },
    },
    // 客户电话
    {
      id: 'customerPhone',
      type: ElementType.Text,
      position: { x: 10, y: 35 },
      size: { width: 80, height: 8 },
      zIndex: 1,
      visible: { mode: BindingMode.Static, staticValue: true },
      properties: {
        text: {
          mode: BindingMode.Expression,
          expression: "concat('电话: ', customer.phone)",
          fallbackValue: '电话: 未提供',
          description: '格式化的电话号码',
        },
        font: { family: 'Arial', size: 10 },
      },
    },
  ],
  variables: EXAMPLE_DATA.basicText,
};

/**
 * 2. 动态条码标签示例
 */
export const barcodeTemplate: AtlTemplate = {
  version: '1.0',
  metadata: {
    name: '动态条码标签',
    description: '演示条码内容绑定和条件显示',
    tags: ['条码', 'Barcode', 'Expression', '条件显示'],
  },
  canvas: {
    width: 100,
    height: 80,
    dpi: 300,
  },
  layoutType: LayoutType.Report,
  dataSources: {},
  elements: [
    // 产品名称
    {
      id: 'productName',
      type: ElementType.Text,
      position: { x: 10, y: 10 },
      size: { width: 80, height: 10 },
      zIndex: 1,
      visible: { mode: BindingMode.Static, staticValue: true },
      properties: {
        text: {
          mode: BindingMode.DataPath,
          dataPath: 'product.name',
          description: '产品名称',
        },
        font: { family: 'Arial', size: 12, bold: true },
      },
    },
    // 产品条码
    {
      id: 'productBarcode',
      type: ElementType.Barcode,
      position: { x: 10, y: 25 },
      size: { width: 80, height: 30 },
      zIndex: 1,
      visible: { mode: BindingMode.Static, staticValue: true },
      properties: {
        content: {
          mode: BindingMode.DataPath,
          dataPath: 'product.code',
          description: '产品条码内容',
        },
        barcodeType: BarcodeType.Code128,
        showText: true,
      },
    },
    // 价格（带货币符号）
    {
      id: 'productPrice',
      type: ElementType.Text,
      position: { x: 10, y: 60 },
      size: { width: 80, height: 8 },
      zIndex: 1,
      visible: { mode: BindingMode.Static, staticValue: true },
      properties: {
        text: {
          mode: BindingMode.Expression,
          expression: "concat('¥', round(product.price, 2))",
          description: '格式化的价格',
        },
        font: { family: 'Arial', size: 14, bold: true },
        color: '#FF0000',
      },
    },
  ],
  variables: EXAMPLE_DATA.barcode,
};

/**
 * 3. 条件显示标签示例
 */
export const conditionalTemplate: AtlTemplate = {
  version: '1.0',
  metadata: {
    name: '条件显示标签',
    description: '演示基于数据的条件显示',
    tags: ['条件', 'visible', 'Expression'],
  },
  canvas: {
    width: 100,
    height: 60,
    dpi: 300,
  },
  layoutType: LayoutType.Report,
  dataSources: {},
  elements: [
    // 订单号
    {
      id: 'orderCode',
      type: ElementType.Text,
      position: { x: 10, y: 10 },
      size: { width: 80, height: 8 },
      zIndex: 1,
      visible: { mode: BindingMode.Static, staticValue: true },
      properties: {
        text: {
          mode: BindingMode.Expression,
          expression: "concat('订单号: ', order.code)",
        },
        font: { family: 'Arial', size: 10 },
      },
    },
    // 订单日期
    {
      id: 'orderDate',
      type: ElementType.Text,
      position: { x: 10, y: 20 },
      size: { width: 80, height: 8 },
      zIndex: 1,
      visible: { mode: BindingMode.Static, staticValue: true },
      properties: {
        text: {
          mode: BindingMode.DataPath,
          dataPath: 'order.date',
          format: 'yyyy-MM-dd HH:mm',
          description: '订单日期',
        },
        font: { family: 'Arial', size: 10 },
      },
    },
    // 批量订单标识（只在数量>10时显示）
    {
      id: 'bulkOrderBadge',
      type: ElementType.Text,
      position: { x: 10, y: 30 },
      size: { width: 30, height: 8 },
      zIndex: 1,
      visible: {
        mode: BindingMode.Expression,
        expression: 'order.quantity > 10',
        description: '只在订单数量大于10时显示',
      },
      properties: {
        text: {
          mode: BindingMode.Static,
          staticValue: '批量订单',
        },
        font: { family: 'Arial', size: 10, bold: true },
        color: '#FF0000',
      },
    },
    // 已完成标记（只在状态为completed时显示）
    {
      id: 'completedBadge',
      type: ElementType.Text,
      position: { x: 10, y: 40 },
      size: { width: 30, height: 8 },
      zIndex: 1,
      visible: {
        mode: BindingMode.Expression,
        expression: "order.status == 'completed'",
        description: '只在订单状态为已完成时显示',
      },
      properties: {
        text: {
          mode: BindingMode.Static,
          staticValue: '✓ 已完成',
        },
        font: { family: 'Arial', size: 10, bold: true },
        color: '#00AA00',
      },
    },
  ],
  variables: EXAMPLE_DATA.basicText,
};

/**
 * 4. 格式化输出标签示例
 */
export const formattedTemplate: AtlTemplate = {
  version: '1.0',
  metadata: {
    name: '格式化输出标签',
    description: '演示日期、数字、字符串格式化',
    tags: ['格式化', 'format', 'Expression'],
  },
  canvas: {
    width: 100,
    height: 80,
    dpi: 300,
  },
  layoutType: LayoutType.Report,
  dataSources: {},
  elements: [
    // 日期格式化示例
    {
      id: 'dateFormatted',
      type: ElementType.Text,
      position: { x: 10, y: 10 },
      size: { width: 80, height: 8 },
      zIndex: 1,
      visible: { mode: BindingMode.Static, staticValue: true },
      properties: {
        text: {
          mode: BindingMode.DataPath,
          dataPath: 'order.date',
          format: 'yyyy年MM月dd日',
          description: '中文日期格式',
        },
        font: { family: 'Arial', size: 10 },
      },
    },
    // 当前时间
    {
      id: 'currentTime',
      type: ElementType.Text,
      position: { x: 10, y: 20 },
      size: { width: 80, height: 8 },
      zIndex: 1,
      visible: { mode: BindingMode.Static, staticValue: true },
      properties: {
        text: {
          mode: BindingMode.Expression,
          expression: "date_format(now(), 'yyyy-MM-dd HH:mm:ss')",
          description: '当前时间',
        },
        font: { family: 'Arial', size: 10 },
      },
    },
    // 大写客户名
    {
      id: 'upperCustomerName',
      type: ElementType.Text,
      position: { x: 10, y: 30 },
      size: { width: 80, height: 8 },
      zIndex: 1,
      visible: { mode: BindingMode.Static, staticValue: true },
      properties: {
        text: {
          mode: BindingMode.Expression,
          expression: 'upper(customer.name)',
          description: '大写客户名',
        },
        font: { family: 'Arial', size: 10 },
      },
    },
    // 订单编号前6位
    {
      id: 'shortOrderCode',
      type: ElementType.Text,
      position: { x: 10, y: 40 },
      size: { width: 80, height: 8 },
      zIndex: 1,
      visible: { mode: BindingMode.Static, staticValue: true },
      properties: {
        text: {
          mode: BindingMode.Expression,
          expression: "concat('短编号: ', substring(order.code, 0, 6))",
          description: '订单编号前6位',
        },
        font: { family: 'Arial', size: 10 },
      },
    },
  ],
  variables: EXAMPLE_DATA.basicText,
};

/**
 * 5. 计算字段标签示例
 */
export const calculatedTemplate: AtlTemplate = {
  version: '1.0',
  metadata: {
    name: '计算字段标签',
    description: '演示数学计算和条件逻辑',
    tags: ['计算', 'Expression', '数学函数'],
  },
  canvas: {
    width: 100,
    height: 80,
    dpi: 300,
  },
  layoutType: LayoutType.Report,
  dataSources: {},
  elements: [
    // 单价
    {
      id: 'price',
      type: ElementType.Text,
      position: { x: 10, y: 10 },
      size: { width: 80, height: 8 },
      zIndex: 1,
      visible: { mode: BindingMode.Static, staticValue: true },
      properties: {
        text: {
          mode: BindingMode.Expression,
          expression: "concat('单价: ¥', round(product.price, 2))",
        },
        font: { family: 'Arial', size: 10 },
      },
    },
    // 含税价（价格 * 1.13）
    {
      id: 'priceWithTax',
      type: ElementType.Text,
      position: { x: 10, y: 20 },
      size: { width: 80, height: 8 },
      zIndex: 1,
      visible: { mode: BindingMode.Static, staticValue: true },
      properties: {
        text: {
          mode: BindingMode.Expression,
          expression: "concat('含税价: ¥', round(product.price * 1.13, 2))",
          description: '含税价格（13%税率）',
        },
        font: { family: 'Arial', size: 10 },
      },
    },
    // 价格等级判断
    {
      id: 'priceLevel',
      type: ElementType.Text,
      position: { x: 10, y: 30 },
      size: { width: 80, height: 8 },
      zIndex: 1,
      visible: { mode: BindingMode.Static, staticValue: true },
      properties: {
        text: {
          mode: BindingMode.Expression,
          expression: "if(product.price > 150, '高价', if(product.price > 100, '中价', '低价'))",
          description: '价格等级分类',
        },
        font: { family: 'Arial', size: 10 },
      },
    },
    // 最大最小值示例
    {
      id: 'minMaxDemo',
      type: ElementType.Text,
      position: { x: 10, y: 40 },
      size: { width: 80, height: 8 },
      zIndex: 1,
      visible: { mode: BindingMode.Static, staticValue: true },
      properties: {
        text: {
          mode: BindingMode.Expression,
          expression: "concat('限价: ¥', min(product.price, 200))",
          description: '价格不超过200',
        },
        font: { family: 'Arial', size: 10 },
      },
    },
  ],
  variables: EXAMPLE_DATA.barcode,
  computedVariables: {
    taxAmount: 'product.price * 0.13',
    totalPrice: 'product.price + taxAmount',
  },
};

/**
 * 所有示例模板
 */
export const ALL_TEMPLATES = {
  basicText: basicTextTemplate,
  barcode: barcodeTemplate,
  conditional: conditionalTemplate,
  formatted: formattedTemplate,
  calculated: calculatedTemplate,
};

/**
 * 获取模板列表
 */
export const getTemplateList = () => {
  return Object.entries(ALL_TEMPLATES).map(([key, template]) => ({
    key,
    name: template.metadata.name || '未命名',
    description: template.metadata.description || '',
    tags: template.metadata.tags || [],
  }));
};

/**
 * 根据key获取模板
 */
export const getTemplateByKey = (key: string): AtlTemplate | undefined => {
  return ALL_TEMPLATES[key as keyof typeof ALL_TEMPLATES];
};
