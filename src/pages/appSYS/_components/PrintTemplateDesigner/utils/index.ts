/**
 * 打印模板设计器工具函数
 */

import { v4 as uuidv4 } from 'uuid';
import {
  AtlTemplate,
  AtlElement,
  ElementType,
  LayoutType,
  TextProperties,
  MultilineTextProperties,
  BarcodeProperties,
  BarcodeType,
  ImageProperties,
  TextAlignment,
  TextPosition,
  BorderStyle,
  VerticalAlignment,
  QRCodeProperties,
  DataMatrixProperties,
  LineProperties,
  ShapeProperties,
  ShapeType,
  TriangleDirection,
  PropertyBinding,
  BindingMode,
  ElementProperties,
  GridLayoutMode,
} from '../types';

/**
 * 生成UUID - 使用 uuid 库确保跨浏览器兼容性
 */
export function generateUUID(): string {
  return uuidv4();
}

/**
 * Property binding helper utilities
 */
export const createStaticBinding = (value: any): PropertyBinding => ({
  mode: BindingMode.Static,
  staticValue: value,
});

export const createDataPathBinding = (path: string, fallback?: any): PropertyBinding => ({
  mode: BindingMode.DataPath,
  dataPath: path,
  fallbackValue: fallback,
});

export const createExpressionBinding = (expression: string, fallback?: any): PropertyBinding => ({
  mode: BindingMode.Expression,
  expression,
  fallbackValue: fallback,
});

/**
 * 双属性模式辅助函数：获取有效的文本绑定
 * 优先返回textBinding，如果没有则将text包装为PropertyBinding
 */
export const getEffectiveTextBinding = (props: TextProperties | MultilineTextProperties | undefined): PropertyBinding => {
  if (!props) {
    return createStaticBinding('');
  }
  if (props.textBinding) {
    return props.textBinding;
  }
  return createStaticBinding(props.text || '');
};

/**
 * 双属性模式辅助函数：获取有效的内容绑定
 * 优先返回contentBinding，如果没有则将content包装为PropertyBinding
 */
export const getEffectiveContentBinding = (
  props: BarcodeProperties | QRCodeProperties | DataMatrixProperties | { content?: string; contentBinding?: PropertyBinding } | undefined
): PropertyBinding => {
  if (!props) {
    return createStaticBinding('');
  }
  if ('contentBinding' in props && props.contentBinding) {
    return props.contentBinding;
  }
  return createStaticBinding(('content' in props ? props.content : undefined) || '');
};

/**
 * 双属性模式辅助函数：获取有效的图片源绑定
 * 优先返回sourceBinding，如果没有则将source包装为PropertyBinding
 */
export const getEffectiveSourceBinding = (props: ImageProperties | undefined): PropertyBinding => {
  if (!props) {
    return createStaticBinding('');
  }
  if (props.sourceBinding) {
    return props.sourceBinding;
  }
  return createStaticBinding(props.source || '');
};

export const ensurePropertyBinding = (
  value: any,
  valueType: 'string' | 'number' | 'boolean' | 'any' = 'string',
): PropertyBinding => {
  if (value && typeof value === 'object' && 'mode' in value) {
    return value as PropertyBinding;
  }

  let normalized = value;
  if (normalized === undefined || normalized === null) {
    switch (valueType) {
      case 'number':
        normalized = 0;
        break;
      case 'boolean':
        normalized = false;
        break;
      case 'any':
        normalized = null;
        break;
      case 'string':
      default:
        normalized = '';
        break;
    }
  }

  return createStaticBinding(normalized);
};

/**
 * Normalize element properties to use PropertyBinding objects
 */
export function normalizeElementProperties<T extends ElementProperties>(properties: T): T {
  const clone: any = { ...properties };

  // 处理textBinding（双属性模式）
  if (clone.textBinding !== undefined) {
    clone.textBinding = ensurePropertyBinding(clone.textBinding, 'string');
  }

  // 处理contentBinding（双属性模式）
  if (clone.contentBinding !== undefined && !Array.isArray(clone.contentBinding)) {
    clone.contentBinding = ensurePropertyBinding(clone.contentBinding, 'string');
  }

  // 处理sourceBinding（双属性模式）
  if (clone.sourceBinding !== undefined) {
    clone.sourceBinding = ensurePropertyBinding(clone.sourceBinding, 'string');
  }

  // 处理表格单元格（双属性模式）
  if (clone.cells) {
    clone.cells = clone.cells.map((row: any[]) =>
      row.map((cell) => ({
        ...cell,
        contentBinding: ensurePropertyBinding(cell.contentBinding, 'string'),
      })),
    );
  }

  return clone;
}


function getValueByPath(source: Record<string, any>, path: string): any {
  if (!path) {
    return undefined;
  }

  const segments = path.match(/[^.\[\]]+/g) || [];
  let current: any = source;

  for (const segment of segments) {
    if (Array.isArray(current)) {
      const index = Number(segment);
      if (Number.isNaN(index) || index < 0 || index >= current.length) {
        return undefined;
      }
      current = current[index];
      continue;
    }

    if (current && typeof current === 'object' && segment in current) {
      current = current[segment];
    } else {
      return undefined;
    }
  }

  return current;
}

function getDefaultValue(valueType: 'string' | 'number' | 'boolean' | 'any') {
  switch (valueType) {
    case 'number':
      return 0;
    case 'boolean':
      return false;
    case 'any':
      return null;
    case 'string':
    default:
      return '';
  }
}

export function resolveBindingValue(
  value: PropertyBinding | any,
  context: Record<string, any> = {},
  valueType: 'string' | 'number' | 'boolean' | 'any' = 'string',
  options?: {
    /** 设计器模式：当数据路径无数据时显示占位符 */
    showPlaceholder?: boolean;
  },
) {
  if (value && typeof value === 'object' && 'mode' in value) {
    const binding = value as PropertyBinding;

    switch (binding.mode) {
      case BindingMode.Static:
        return binding.staticValue ?? getDefaultValue(valueType);

      case BindingMode.DataPath: {
        const result = binding.dataPath ? getValueByPath(context, binding.dataPath) : undefined;
        if (result !== undefined && result !== null) {
          return result;
        }
        if (binding.fallbackValue !== undefined) {
          return binding.fallbackValue;
        }

        // 设计器模式：显示绑定路径占位符
        if (options?.showPlaceholder && binding.dataPath) {
          return `[${binding.dataPath}]`;
        }

        return getDefaultValue(valueType);
      }

      case BindingMode.Expression: {
        const expression = binding.expression ?? '';
        const pattern = /\{\{\s*(.+?)\s*\}\}/g;
        let hasMatches = false;
        const replaced = expression.replace(pattern, (match, inner) => {
          hasMatches = true;
          const pathPart = inner.split('|')[0].trim();
          const resolved = getValueByPath(context, pathPart);
          return resolved !== undefined && resolved !== null ? String(resolved) : '';
        });

        if (hasMatches) {
          if (replaced && replaced !== expression) {
            return replaced;
          }
        }

        if (binding.fallbackValue !== undefined) {
          return binding.fallbackValue;
        }

        // 设计器模式：如果表达式包含绑定但没有数据，显示原始表达式
        if (options?.showPlaceholder && hasMatches) {
          return expression;
        }

        return expression;
      }

      default:
        return getDefaultValue(valueType);
    }
  }

  if (value === undefined || value === null) {
    return getDefaultValue(valueType);
  }

  return value;
}


export function createEmptyTemplate(): AtlTemplate {
  return {
    version: '1.0',
    metadata: {
      name: '新模板',
      description: '',
      created: new Date().toISOString(),
      modified: new Date().toISOString(),
      author: 'admin',
      templateVersion: '1.0.0',
      tags: [],
    },
    canvas: {
      width: 100,
      height: 50,
      dpi: 300,
      backgroundColor: '#FFFFFF',
    },
    layoutType: LayoutType.Report,
    dataSources: {},
    elements: [],
    variables: {},
    // ✅ 多内容区域模式：默认创建一个内容区域
    sections: {
      contentAreas: [
        {
          id: generateUUID(),
          name: '默认内容区域',
          yPositionMode: 1, // YPositionMode.AfterPrevious - 自动跟随页头
          spacingAfterPrevious: 0, // 紧跟页头，无间距
          height: 50,
          printFrequency: 0, // SectionPrintFrequency.EveryPage
          followLoopPagination: false,
          elementIds: [],
          labelGridLayout: {
            mode: GridLayoutMode.Fixed,
            rows: createStaticBinding(3),
            columns: createStaticBinding(2),
            labelWidth: 50,
            labelHeight: 30,
            spacingX: 2,
            spacingY: 2,
            offsetX: 0,
            offsetY: 0,
            dataSourceName: '',
            cellTemplate: [],
            cellVariable: 'cell',
            indexVariable: 'index',
            rowVariable: 'row',
            columnVariable: 'col',
          },
        },
      ],
    },
  };
}

/**
 * 获取元素默认属性
 */

export function getDefaultElementProperties(type: ElementType): ElementProperties {
  let properties: ElementProperties;

  switch (type) {
    case ElementType.Text:
      properties = {
        elementType: 'text',
        textBinding: createStaticBinding('文本内容'),
        font: {
          family: 'Arial',
          size: 8,
          bold: false,
          italic: false,
          underline: false,
        },
        alignment: TextAlignment.Left,
        color: '#000000',
        backgroundColor: 'transparent',
        rotation: 0,
        forceGraphicMode: false,
      } as TextProperties;
      break;

    case ElementType.MultilineText:
      properties = {
        elementType: 'multilineText',
        textBinding: createStaticBinding('多行文本内容\\n支持换行显示'),
        font: {
          family: 'Arial',
          size: 8,
          bold: false,
          italic: false,
          underline: false,
        },
        alignment: TextAlignment.Left,
        color: '#000000',
        backgroundColor: 'transparent',
        rotation: 0,
        autoWrap: true,
        maxLines: 0,
        lineHeight: 1.2,
        breakWords: false,
        ellipsis: false,
      } as MultilineTextProperties;
      break;

    case ElementType.Barcode:
      properties = {
        elementType: 'barcode',
        contentBinding: createStaticBinding('1234567890'),
        barcodeType: BarcodeType.Code128,
        height: 10,
        showText: true,
        textPosition: TextPosition.Below,
        moduleWidth: 2,
        rotation: 0,
      } as BarcodeProperties;
      break;

    case ElementType.Image:
      properties = {
        elementType: 'image',
        sourceBinding: createStaticBinding(''),
        maintainAspectRatio: true,  // 默认保持宽高比（后端兼容）
        fitMode: 0,
        rotation: 0,
      } as ImageProperties;
      break;

    case ElementType.Table: {
      const rows = 3;
      const cols = 3;
      const cells = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => ({
          contentBinding: createStaticBinding(''),
          rowSpan: 1,
          colSpan: 1,
          merged: false,
        })),
      );

      properties = {
        elementType: 'table',
        rows,
        columns: cols,
        cells,
        rowHeights: Array(rows).fill(10),
        colWidths: Array(cols).fill(30),
        showBorders: true,
        borderStyle: BorderStyle.Solid,
        borderWidth: 0.5,
        borderColor: '#000000',
        cellPadding: 1,
        font: {
          family: 'Arial',
          size: 10,
        },
        alignment: TextAlignment.Left,
        verticalAlignment: VerticalAlignment.Middle,
      } as TableProperties;
      break;
    }

    case ElementType.QRCode:
      properties = {
        elementType: 'qrCode',
        contentBinding: createStaticBinding('https://example.com'),
        errorCorrectionLevel: 2,
        moduleSize: 3,
        foregroundColor: '#000000',
        backgroundColor: '#FFFFFF',
      } as QRCodeProperties;
      break;

    case ElementType.DataMatrix:
      properties = {
        elementType: 'dataMatrix',
        contentBinding: createStaticBinding('DATA123'),
        moduleSize: 3,
        foregroundColor: '#000000',
        backgroundColor: '#FFFFFF',
      } as DataMatrixProperties;
      break;

    case ElementType.Line:
      properties = {
        elementType: 'line',
        startX: 0,
        startY: 0,
        endX: 50,
        endY: 0,
        strokeWidth: 1,
        strokeColor: '#000000',
        strokeStyle: BorderStyle.Solid,
      } as LineProperties;
      break;

    case ElementType.Shape:
      properties = {
        elementType: 'shape',
        shapeType: ShapeType.Rectangle,
        fillColor: '#FFFFFF',
        strokeColor: '#000000',
        strokeWidth: 1,
        borderRadius: 0,
        triangleDirection: TriangleDirection.Up,
      } as ShapeProperties;
      break;

    default:
      properties = {
        elementType: 'text',
        textBinding: createStaticBinding('新元素'),
        font: {
          family: 'Arial',
          size: 12,
          bold: false,
          italic: false,
          underline: false,
        },
        alignment: TextAlignment.Left,
        color: '#000000',
        backgroundColor: '#FFFFFF',
        rotation: 0,
        forceGraphicMode: false,
      } as TextProperties;
      break;
  }

  return normalizeElementProperties(properties);
}


export function createElement(
  type: ElementType,
  position: { x: number; y: number } = { x: 10, y: 10 },
  options?: {
    section?: SectionType;
    sectionId?: string;
  },
): AtlElement {
  const id = generateUUID();

  // 根据类型设置默认尺寸
  let defaultSize = { width: 12, height: 10 };
  switch (type) {
    case ElementType.Text:
      defaultSize = { width: 12, height: 10 };
      break;
    case ElementType.MultilineText:
      defaultSize = { width: 12, height: 30 };
      break;
    case ElementType.Barcode:
      defaultSize = { width: 60, height: 30 };
      break;
    case ElementType.Image:
      defaultSize = { width: 30, height: 30 };
      break;
    case ElementType.Shape:
      defaultSize = { width: 40, height: 40 };
      break;
    case ElementType.Table:
      defaultSize = { width: 80, height: 40 };
      break;
    case ElementType.QRCode:
      defaultSize = { width: 30, height: 30 };
      break;
    case ElementType.DataMatrix:
      defaultSize = { width: 25, height: 25 };
      break;
    case ElementType.Line:
      defaultSize = { width: 50, height: 2 };
      break;
  }

  return {
    id,
    type,
    position,
    size: defaultSize,
    properties: getDefaultElementProperties(type),
    zIndex: 0,
    visible: createStaticBinding(true),
    // 初始化 section 和 sectionId 字段
    section: options?.section ?? SectionType.Content,
    sectionId: options?.sectionId ?? null,
  };
}

/**
 * 更新元素位置
 */
export function updateElementPosition(
  elements: AtlElement[],
  elementId: string,
  position: { x: number; y: number },
): AtlElement[] {
  return elements.map((el) =>
    el.id === elementId ? { ...el, position } : el,
  );
}

/**
 * 更新元素尺寸
 */
export function updateElementSize(
  elements: AtlElement[],
  elementId: string,
  size: { width: number; height: number },
): AtlElement[] {
  return elements.map((el) =>
    el.id === elementId ? { ...el, size } : el,
  );
}

/**
 * 更新元素属性
 */
export function updateElementProperties(
  elements: AtlElement[],
  elementId: string,
  properties: Partial<any>,
): AtlElement[] {
  return elements.map((el) =>
    el.id === elementId
      ? { ...el, properties: { ...el.properties, ...properties } }
      : el,
  );
}

/**
 * 删除元素
 */
export function deleteElement(
  elements: AtlElement[],
  elementId: string,
): AtlElement[] {
  return elements.filter((el) => el.id !== elementId);
}

/**
 * 调整元素层级
 */
export function adjustZIndex(
  elements: AtlElement[],
  elementId: string,
  direction: 'up' | 'down' | 'top' | 'bottom',
): AtlElement[] {
  const element = elements.find((el) => el.id === elementId);
  if (!element) return elements;

  const sortedElements = [...elements].sort((a, b) => a.zIndex - b.zIndex);
  const currentIndex = sortedElements.findIndex((el) => el.id === elementId);

  let newElements = [...elements];

  switch (direction) {
    case 'up':
      if (currentIndex < sortedElements.length - 1) {
        const nextElement = sortedElements[currentIndex + 1];
        newElements = newElements.map((el) => {
          if (el.id === elementId) return { ...el, zIndex: nextElement.zIndex };
          if (el.id === nextElement.id) return { ...el, zIndex: element.zIndex };
          return el;
        });
      }
      break;

    case 'down':
      if (currentIndex > 0) {
        const prevElement = sortedElements[currentIndex - 1];
        newElements = newElements.map((el) => {
          if (el.id === elementId) return { ...el, zIndex: prevElement.zIndex };
          if (el.id === prevElement.id) return { ...el, zIndex: element.zIndex };
          return el;
        });
      }
      break;

    case 'top':
      const maxZIndex = Math.max(...elements.map((el) => el.zIndex));
      newElements = newElements.map((el) =>
        el.id === elementId ? { ...el, zIndex: maxZIndex + 1 } : el,
      );
      break;

    case 'bottom':
      const minZIndex = Math.min(...elements.map((el) => el.zIndex));
      // 确保 zIndex 至少为 1，避免负数导致元素被遮挡
      const newBottomZIndex = Math.max(1, minZIndex - 1);
      newElements = newElements.map((el) =>
        el.id === elementId ? { ...el, zIndex: newBottomZIndex } : el,
      );
      break;
  }

  return newElements;
}

/**
 * 毫米转像素
 */
export function mmToPx(mm: number, dpi: number = 300): number {
  return Math.round((mm / 25.4) * dpi);
}

/**
 * 像素转毫米
 */
export function pxToMm(px: number, dpi: number = 300): number {
  return Math.round((px * 25.4) / dpi * 100) / 100;
}

/**
 * 磅转像素（用于字体大小）
 * 标准换算关系：1磅(pt) = 1/72 英寸，1英寸 = DPI 像素
 * 因此：1pt = (DPI / 72) px
 *
 * @param pt 磅值
 * @param dpi DPI设置（默认203）
 * @returns 像素值
 */
export function ptToPx(pt: number, dpi: number = 300): number {
  return (pt / 72) * dpi;
}

/**
 * 导出模板为JSON字符串
 */
export function exportTemplate(template: AtlTemplate): string {
  return JSON.stringify(template, null, 2);
}

/**
 * 从JSON字符串导入模板
 */
export function importTemplate(json: string): AtlTemplate {
  try {
    const template = JSON.parse(json);
    // 验证基本结构
    if (!template.version || !template.canvas || !Array.isArray(template.elements)) {
      throw new Error('无效的模板格式');
    }

    // 自动迁移旧格式数据到PropertyBinding格式
    return migrateVisibleFields(template);
  } catch (error) {
    throw new Error('模板解析失败: ' + (error as Error).message);
  }
}

/**
 * 辅助函数：判断是否是 PropertyBinding 对象
 */
function isPropertyBinding(value: any): boolean {
  return value && typeof value === 'object' && 'mode' in value && 'staticValue' in value;
}

/**
 * 迁移模板中的所有字段到PropertyBinding格式
 * 处理visible、properties中的text/content/source、表格cells、网格布局等字段
 * 同时处理旧版 labelGridLayout 到新版 sections.content.labelGridLayout 的迁移
 */
function migrateVisibleFields(template: AtlTemplate): AtlTemplate {
  // 创建深拷贝避免修改原对象
  const migratedTemplate = JSON.parse(JSON.stringify(template)) as AtlTemplate;

  migratedTemplate.elements = migratedTemplate.elements.map(element => {
    const migratedElement = { ...element };

    // 处理visible字段 - 如果不是PropertyBinding对象，转换为PropertyBinding
    if (element.visible !== undefined && !isPropertyBinding(element.visible)) {
      migratedElement.visible = createStaticBinding(element.visible);
    }

    // 处理 properties 中的绑定字段（双属性模式迁移）
    if (element.properties) {
      const props: any = { ...element.properties };

      // 迁移 text 字段到 textBinding（双属性模式）
      if (props.text !== undefined) {
        if (isPropertyBinding(props.text)) {
          // 如果是PropertyBinding对象，移到textBinding
          props.textBinding = props.text;
          delete props.text;
        } else {
          // 如果是简单值，保留为基础属性
          props.text = props.text;
        }
      }

      // 迁移 content 字段到 contentBinding（双属性模式）
      if (props.content !== undefined) {
        if (isPropertyBinding(props.content)) {
          // 如果是PropertyBinding对象，移到contentBinding
          props.contentBinding = props.content;
          delete props.content;
        } else {
          // 如果是简单值，保留为基础属性
          props.content = props.content;
        }
      }

      // 迁移 source 字段到 sourceBinding（双属性模式）
      if (props.source !== undefined) {
        if (isPropertyBinding(props.source)) {
          // 如果是PropertyBinding对象，移到sourceBinding
          props.sourceBinding = props.source;
          delete props.source;
        } else {
          // 如果是简单值，保留为基础属性
          props.source = props.source;
        }
      }

      // 迁移表格单元格内容（双属性模式）
      if (props.cells && Array.isArray(props.cells)) {
        props.cells = props.cells.map((row: any[]) =>
          row.map(cell => {
            const newCell = { ...cell };
            if (cell.content !== undefined) {
              if (isPropertyBinding(cell.content)) {
                // 如果是PropertyBinding对象，移到contentBinding
                newCell.contentBinding = cell.content;
                delete newCell.content;
              } else {
                // 如果是简单值，保留为基础属性
                newCell.content = cell.content;
              }
            }
            return newCell;
          })
        );
      }

      migratedElement.properties = props;
    }

    return migratedElement;
  });

  // ✅ 新增：迁移旧版 labelGridLayout 到新版 sections.content.labelGridLayout
  if (migratedTemplate.labelGridLayout && !migratedTemplate.sections?.content?.labelGridLayout) {
    const oldGridLayout = migratedTemplate.labelGridLayout;

    // 确保 rows 和 columns 是 PropertyBinding 格式
    if (oldGridLayout.rows !== undefined && !isPropertyBinding(oldGridLayout.rows)) {
      oldGridLayout.rows = createStaticBinding(oldGridLayout.rows);
    }
    if (oldGridLayout.columns !== undefined && !isPropertyBinding(oldGridLayout.columns)) {
      oldGridLayout.columns = createStaticBinding(oldGridLayout.columns);
    }

    // 初始化 sections 结构
    if (!migratedTemplate.sections) {
      migratedTemplate.sections = {};
    }

    // 迁移到 content 区域
    if (!migratedTemplate.sections.content) {
      migratedTemplate.sections.content = {
        printFrequency: 0, // SectionPrintFrequency.EveryPage
        followLoopPagination: true,
      };
    }

    // 复制 labelGridLayout 到 content 区域
    migratedTemplate.sections.content.labelGridLayout = oldGridLayout;

    // 删除旧的 labelGridLayout（可选，保留以向后兼容）
    // delete migratedTemplate.labelGridLayout;
  }

  // 迁移 sections 中各区域的 labelGridLayout 中的 rows 和 columns
  if (migratedTemplate.sections) {
    ['header', 'content', 'footer'].forEach((sectionKey) => {
      const section = (migratedTemplate.sections as any)?.[sectionKey];
      if (section?.labelGridLayout) {
        const layout = section.labelGridLayout;

        if (layout.rows !== undefined && !isPropertyBinding(layout.rows)) {
          layout.rows = createStaticBinding(layout.rows);
        }

        if (layout.columns !== undefined && !isPropertyBinding(layout.columns)) {
          layout.columns = createStaticBinding(layout.columns);
        }
      }
    });
  }

  return migratedTemplate;
}

/**
 * 获取元素类型显示名称
 */
export function getElementTypeName(type: ElementType): string {
  const typeNames = {
    [ElementType.Text]: '文本',
    [ElementType.MultilineText]: '多行文本',
    [ElementType.Barcode]: '条码',
    [ElementType.Image]: '图片',
    [ElementType.Shape]: '图形',
    [ElementType.Table]: '表格',
    [ElementType.QRCode]: '二维码',
    [ElementType.DataMatrix]: '数据矩阵码',
    [ElementType.Line]: '线条',
  };
  return typeNames[type] || '未知';
}

/**
 * 验证数据绑定表达式
 */
export function validateDataBinding(expression: string): boolean {
  if (!expression) return true;
  // 简单验证：检查是否符合 {{ variable }} 格式
  const pattern = /\{\{\s*[\w.[\]]+\s*\}\}/;
  return pattern.test(expression);
}

/**
 * 规范化模板元素的 elementType 属性
 * 用于在发送给后端前确保 elementType 正确且不重复
 *
 * @param template 模板对象
 * @returns 规范化后的模板副本
 */
export function normalizeTemplateElements(template: AtlTemplate): AtlTemplate {
  return {
    ...template,
    elements: template.elements.map(el => {
      // 先移除可能存在的 elementType 属性
      const { elementType: _, ...restProperties } = el.properties;

      // 计算正确的 elementType
      const correctElementType =
        el.type === 1 ? 'text' :
        el.type === 2 ? 'multilineText' :
        el.type === 3 ? 'barcode' :
        el.type === 4 ? 'image' :
        el.type === 5 ? 'shape' :
        el.type === 6 ? 'table' :
        el.type === 7 ? 'qrCode' :
        el.type === 8 ? 'dataMatrix' :
        el.type === 9 ? 'line' : 'unknown';

      return {
        ...el,
        properties: {
          // elementType 必须是第一个属性
          elementType: correctElementType,
          ...restProperties,
        }
      };
    })
  };
}

// 导出验证工具
export * from './bindingValidator';
