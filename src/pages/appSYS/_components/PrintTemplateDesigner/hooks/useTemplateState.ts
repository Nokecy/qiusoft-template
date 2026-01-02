/**
 * 模板状态管理Hook
 */

import { useState, useCallback } from 'react';
import {
  AtlTemplate,
  AtlTemplateWithParameters,
  AtlElement,
  ElementType,
  AtlDataSource,
  AtlDataSourceWithDependency,
  SectionType,
} from '../types';
import {
  createEmptyTemplate,
  createElement,
  updateElementPosition,
  updateElementSize,
  updateElementProperties,
  deleteElement,
  adjustZIndex,
} from '../utils';

// 参数化功能类型导入
import type { TemplateParameter } from '../types/parameter';
import type { ParameterMapping } from '../types/dataSourceParameter';
import type { DependencyGraph, TopologicalSortResult } from '../types/dependency';
import type { ValidationResult } from '../types/validation';

// 验证工具导入
import { validateParameter, validateAllParameters } from '../utils/validators/parameterValidators';
import { validateDataSource, validateAllDataSources } from '../utils/validators/dataSourceValidators';
import { buildDependencyGraph, topologicalSort } from '../utils/validators/dependencyAnalyzer';
import { validateTemplate } from '../utils/validators/templateValidator';

export interface UseTemplateStateReturn {
  // ========== 现有元素管理功能 ==========
  template: AtlTemplate;
  selectedElementId: string | null;
  selectedElement: AtlElement | null;
  setTemplate: (template: AtlTemplate) => void;
  setSelectedElementId: (id: string | null) => void;
  addElement: (type: ElementType) => void;
  addElementAtPosition: (type: ElementType, position?: { x: number; y: number }, options?: { section?: SectionType; sectionId?: string }) => void;
  removeElement: (elementId: string) => void;
  updateElement: (elementId: string, updates: Partial<AtlElement>) => void;
  updateElementPos: (elementId: string, position: { x: number; y: number }) => void;
  updateElementSz: (elementId: string, size: { width: number; height: number }) => void;
  updateElementProps: (elementId: string, properties: Record<string, any>) => void;
  moveElementUp: (elementId: string) => void;
  moveElementDown: (elementId: string) => void;
  moveElementToTop: (elementId: string) => void;
  moveElementToBottom: (elementId: string) => void;
  updateCanvasSize: (width: number, height: number) => void;
  updateCanvasDpi: (dpi: number) => void;
  reset: () => void;
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;

  // ========== 参数管理功能 ==========

  /**
   * 添加模板参数
   * @param parameter - 参数定义对象
   */
  addParameter: (parameter: TemplateParameter) => void;

  /**
   * 更新模板参数
   * @param name - 参数名称
   * @param updates - 更新的字段
   */
  updateParameter: (name: string, updates: Partial<TemplateParameter>) => void;

  /**
   * 删除模板参数
   * @param name - 参数名称
   */
  removeParameter: (name: string) => void;

  /**
   * 批量设置模板参数
   * @param parameters - 参数定义字典
   */
  setParameters: (parameters: Record<string, TemplateParameter>) => void;

  // ========== 数据源管理功能 ==========

  /**
   * 添加数据源
   * @param dataSource - 数据源定义对象
   */
  addDataSource: (dataSource: AtlDataSource) => void;

  /**
   * 更新数据源
   * @param id - 数据源ID(名称)
   * @param updates - 更新的字段
   */
  updateDataSource: (id: string, updates: Partial<AtlDataSource>) => void;

  /**
   * 删除数据源
   * @param id - 数据源ID(名称)
   */
  removeDataSource: (id: string) => void;

  /**
   * 批量设置数据源
   * @param dataSources - 数据源定义字典
   */
  setDataSources: (dataSources: Record<string, AtlDataSource>) => void;

  /**
   * 更新数据源参数映射
   * @param dataSourceId - 数据源ID(名称)
   * @param parameterName - 参数名称
   * @param mapping - 参数映射配置
   */
  updateDataSourceParameterMapping: (
    dataSourceId: string,
    parameterName: string,
    mapping: ParameterMapping
  ) => void;

  // ========== 依赖图管理功能 ==========

  /**
   * 重新构建依赖关系图
   * 从数据源配置中自动构建依赖图
   */
  rebuildDependencyGraph: () => void;

  /**
   * 获取数据源执行顺序
   * 返回拓扑排序结果,包含执行层级和循环检测
   */
  getDataSourceExecutionOrder: () => TopologicalSortResult;

  // ========== 验证功能 ==========

  /**
   * 验证整个模板
   * 包括参数、数据源、依赖关系的综合验证
   */
  validateTemplate: () => ValidationResult;

  /**
   * 单独验证参数定义
   */
  validateParameters: () => ValidationResult;

  /**
   * 单独验证数据源配置
   */
  validateDataSources: () => ValidationResult;

  /**
   * 单独验证依赖关系
   */
  validateDependencies: () => ValidationResult;

  // ========== 新增状态字段 ==========

  /**
   * 当前模板的验证结果
   */
  validationResult: ValidationResult | null;

  /**
   * 当前依赖关系图
   */
  dependencyGraph: DependencyGraph | null;

  /**
   * 数据源执行顺序(扁平化的名称数组)
   */
  dataSourceExecutionOrder: string[] | null;
}

export function useTemplateState(initialTemplate?: AtlTemplate): UseTemplateStateReturn {
  const [template, setTemplate] = useState<AtlTemplate>(
    initialTemplate || createEmptyTemplate(),
  );
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);

  // 撤销/重做栈
  const [history, setHistory] = useState<AtlTemplate[]>([template]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // ========== 参数化功能新增状态 ==========

  /**
   * 当前模板的验证结果
   */
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);

  /**
   * 当前依赖关系图
   */
  const [dependencyGraph, setDependencyGraph] = useState<DependencyGraph | null>(null);

  /**
   * 数据源执行顺序(扁平化的名称数组)
   */
  const [dataSourceExecutionOrder, setDataSourceExecutionOrder] = useState<string[] | null>(null);

  // 辅助函数：同步更新 cellTemplate 中的元素
  const syncCellTemplateElement = useCallback((
    sections: AtlTemplate['sections'],
    elementId: string,
    updater: (element: AtlElement) => AtlElement
  ) => {
    if (!sections) return sections;

    const updateCellTemplate = (cellTemplate?: AtlElement[]) => {
      if (!cellTemplate) return cellTemplate;
      return cellTemplate.map(el => el.id === elementId ? updater(el) : el);
    };

    return {
      ...sections,
      header: sections.header ? {
        ...sections.header,
        labelGridLayout: sections.header.labelGridLayout ? {
          ...sections.header.labelGridLayout,
          cellTemplate: updateCellTemplate(sections.header.labelGridLayout.cellTemplate),
        } : undefined,
      } : undefined,
      content: sections.content ? {
        ...sections.content,
        labelGridLayout: sections.content.labelGridLayout ? {
          ...sections.content.labelGridLayout,
          cellTemplate: updateCellTemplate(sections.content.labelGridLayout.cellTemplate),
        } : undefined,
      } : undefined,
      // 同步 contentAreas 数组中各区域的 cellTemplate
      contentAreas: sections.contentAreas?.map(area => ({
        ...area,
        labelGridLayout: area.labelGridLayout ? {
          ...area.labelGridLayout,
          cellTemplate: updateCellTemplate(area.labelGridLayout.cellTemplate),
        } : undefined,
      })),
      footer: sections.footer ? {
        ...sections.footer,
        labelGridLayout: sections.footer.labelGridLayout ? {
          ...sections.footer.labelGridLayout,
          cellTemplate: updateCellTemplate(sections.footer.labelGridLayout.cellTemplate),
        } : undefined,
      } : undefined,
    };
  }, []);

  // 保存历史记录
  const saveHistory = useCallback((newTemplate: AtlTemplate) => {
    console.log('📚 saveHistory 被调用:', {
      新模板元素数量: newTemplate.elements.length,
      当前historyIndex: historyIndex
    });

    // 先更新模板状态
    console.log('📚 准备调用 setTemplate');
    setTemplate(newTemplate);
    console.log('📚 setTemplate 已调用');

    // 再更新历史记录
    setHistory((prev) => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(newTemplate);
      // 限制历史记录数量
      if (newHistory.length > 50) {
        newHistory.shift();
        setHistoryIndex(historyIndex);
      } else {
        setHistoryIndex(historyIndex + 1);
      }
      console.log('📚 历史记录已更新, 新长度:', newHistory.length);
      return newHistory;
    });
  }, [historyIndex]);

  // 获取选中的元素
  const selectedElement = template.elements.find((el) => el.id === selectedElementId) || null;

  // ========== 参数化功能辅助函数 ==========

  /**
   * 自动重新构建依赖图并更新执行顺序
   * 在数据源或参数修改后自动调用
   */
  const autoRebuildDependencyGraph = useCallback(() => {
    if (!template.dataSources || Object.keys(template.dataSources).length === 0) {
      setDependencyGraph(null);
      setDataSourceExecutionOrder(null);
      return;
    }

    try {
      // 类型断言以兼容验证工具的类型定义
      const graph = buildDependencyGraph(template.dataSources as Record<string, any>);
      setDependencyGraph(graph);

      const sortResult = topologicalSort(graph);
      if (sortResult.success) {
        // 将二维数组layers扁平化为一维数组
        const flatOrder = sortResult.layers.flat();
        setDataSourceExecutionOrder(flatOrder);
      } else {
        setDataSourceExecutionOrder(null);
      }
    } catch (error) {
      console.error('自动构建依赖图失败:', error);
      setDependencyGraph(null);
      setDataSourceExecutionOrder(null);
    }
  }, [template.dataSources]);

  /**
   * 自动运行验证
   * 在模板修改后自动调用,但不阻塞操作
   */
  const autoValidate = useCallback(() => {
    try {
      const result = validateTemplate(template as any);
      setValidationResult(result);
    } catch (error) {
      console.error('自动验证失败:', error);
      setValidationResult(null);
    }
  }, [template]);

  // 在指定位置添加元素
  const addElementAtPosition = useCallback(
    (type: ElementType, position?: { x: number; y: number }, options?: { section?: SectionType; sectionId?: string }) => {
      const newElement = createElement(type, position, options);
      const newTemplate = {
        ...template,
        elements: [...template.elements, newElement],
      };
      saveHistory(newTemplate);
      setSelectedElementId(newElement.id);
    },
    [template, saveHistory],
  );

  // 添加元素（默认位置）
  const addElement = useCallback(
    (type: ElementType) => {
      addElementAtPosition(type, { x: 10, y: 10 });
    },
    [addElementAtPosition],
  );

  // 删除元素
  const removeElement = useCallback(
    (elementId: string) => {
      // 清理 sections 中 cellTemplate 对该元素的引用
      const cleanedSections = template.sections ? {
        ...template.sections,
        header: template.sections.header ? {
          ...template.sections.header,
          labelGridLayout: template.sections.header.labelGridLayout ? {
            ...template.sections.header.labelGridLayout,
            cellTemplate: template.sections.header.labelGridLayout.cellTemplate.filter(
              (el) => el.id !== elementId
            ),
          } : undefined,
        } : undefined,
        content: template.sections.content ? {
          ...template.sections.content,
          labelGridLayout: template.sections.content.labelGridLayout ? {
            ...template.sections.content.labelGridLayout,
            cellTemplate: template.sections.content.labelGridLayout.cellTemplate.filter(
              (el) => el.id !== elementId
            ),
          } : undefined,
        } : undefined,
        // 清理 contentAreas 数组中各区域的 cellTemplate
        contentAreas: template.sections.contentAreas?.map(area => ({
          ...area,
          labelGridLayout: area.labelGridLayout ? {
            ...area.labelGridLayout,
            cellTemplate: area.labelGridLayout.cellTemplate.filter(
              (el) => el.id !== elementId
            ),
          } : undefined,
        })),
        footer: template.sections.footer ? {
          ...template.sections.footer,
          labelGridLayout: template.sections.footer.labelGridLayout ? {
            ...template.sections.footer.labelGridLayout,
            cellTemplate: template.sections.footer.labelGridLayout.cellTemplate.filter(
              (el) => el.id !== elementId
            ),
          } : undefined,
        } : undefined,
      } : undefined;

      const newTemplate = {
        ...template,
        elements: deleteElement(template.elements, elementId),
        sections: cleanedSections,
      };
      saveHistory(newTemplate);
      if (selectedElementId === elementId) {
        setSelectedElementId(null);
      }
    },
    [template, selectedElementId, saveHistory],
  );

  // 更新元素
  const updateElement = useCallback(
    (elementId: string, updates: Partial<AtlElement>) => {
      const updatedElements = template.elements.map((el) =>
        el.id === elementId
          ? {
              ...el,
              ...updates,
              // ✅ 深度合并 properties,避免丢失字段
              properties: updates.properties
                ? { ...el.properties, ...updates.properties }
                : el.properties
            }
          : el,
      );

      // 同步更新 cellTemplate 中的元素
      const syncedSections = syncCellTemplateElement(
        template.sections,
        elementId,
        (el) => ({
          ...el,
          ...updates,
          // 同样深度合并 properties
          properties: updates.properties
            ? { ...el.properties, ...updates.properties }
            : el.properties
        })
      );

      const newTemplate = {
        ...template,
        elements: updatedElements,
        sections: syncedSections,
      };
      saveHistory(newTemplate);
    },
    [template, saveHistory, syncCellTemplateElement],
  );

  // 更新元素位置
  const updateElementPos = useCallback(
    (elementId: string, position: { x: number; y: number }) => {
      const updatedElements = updateElementPosition(template.elements, elementId, position);

      // 同步更新 cellTemplate 中的元素位置
      const syncedSections = syncCellTemplateElement(
        template.sections,
        elementId,
        (el) => ({ ...el, position })
      );

      const newTemplate = {
        ...template,
        elements: updatedElements,
        sections: syncedSections,
      };
      saveHistory(newTemplate);
    },
    [template, saveHistory, syncCellTemplateElement],
  );

  // 更新元素尺寸
  const updateElementSz = useCallback(
    (elementId: string, size: { width: number; height: number }) => {
      console.log('📦 [useTemplateState] updateElementSz 被调用:', { elementId, size });

      const updatedElements = updateElementSize(template.elements, elementId, size);
      console.log('📦 [useTemplateState] 更新后的 element.size:',
        updatedElements.find(el => el.id === elementId)?.size
      );

      // 同步更新 cellTemplate 中的元素尺寸
      const syncedSections = syncCellTemplateElement(
        template.sections,
        elementId,
        (el) => ({ ...el, size })
      );

      const newTemplate = {
        ...template,
        elements: updatedElements,
        sections: syncedSections,
      };
      saveHistory(newTemplate);
    },
    [template, saveHistory, syncCellTemplateElement],
  );

  // 更新元素属性
  const updateElementProps = useCallback(
    (elementId: string, properties: Record<string, any>) => {
      const updatedElements = updateElementProperties(template.elements, elementId, properties);

      // 同步更新 cellTemplate 中的元素属性
      const syncedSections = syncCellTemplateElement(
        template.sections,
        elementId,
        (el) => ({ ...el, properties: { ...el.properties, ...properties } })
      );

      const newTemplate = {
        ...template,
        elements: updatedElements,
        sections: syncedSections,
      };
      saveHistory(newTemplate);
    },
    [template, saveHistory, syncCellTemplateElement],
  );

  // 层级调整
  const moveElementUp = useCallback(
    (elementId: string) => {
      const newTemplate = {
        ...template,
        elements: adjustZIndex(template.elements, elementId, 'up'),
      };
      saveHistory(newTemplate);
    },
    [template, saveHistory],
  );

  const moveElementDown = useCallback(
    (elementId: string) => {
      const newTemplate = {
        ...template,
        elements: adjustZIndex(template.elements, elementId, 'down'),
      };
      saveHistory(newTemplate);
    },
    [template, saveHistory],
  );

  const moveElementToTop = useCallback(
    (elementId: string) => {
      const newTemplate = {
        ...template,
        elements: adjustZIndex(template.elements, elementId, 'top'),
      };
      saveHistory(newTemplate);
    },
    [template, saveHistory],
  );

  const moveElementToBottom = useCallback(
    (elementId: string) => {
      const newTemplate = {
        ...template,
        elements: adjustZIndex(template.elements, elementId, 'bottom'),
      };
      saveHistory(newTemplate);
    },
    [template, saveHistory],
  );

  // 更新画布尺寸
  const updateCanvasSize = useCallback(
    (width: number, height: number) => {
      const newTemplate = {
        ...template,
        canvas: {
          ...template.canvas,
          width,
          height,
        },
      };
      saveHistory(newTemplate);
    },
    [template, saveHistory],
  );

  // 更新画布DPI
  const updateCanvasDpi = useCallback(
    (dpi: number) => {
      const newTemplate = {
        ...template,
        canvas: {
          ...template.canvas,
          dpi,
        },
      };
      saveHistory(newTemplate);
    },
    [template, saveHistory],
  );

  // 重置
  const reset = useCallback(() => {
    const emptyTemplate = createEmptyTemplate();
    setTemplate(emptyTemplate);
    setHistory([emptyTemplate]);
    setHistoryIndex(0);
    setSelectedElementId(null);
  }, []);

  // 撤销
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setTemplate(history[historyIndex - 1]);
    }
  }, [history, historyIndex]);

  // 重做
  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setTemplate(history[historyIndex + 1]);
    }
  }, [history, historyIndex]);

  // ========== 参数管理功能实现 ==========

  /**
   * 添加模板参数
   */
  const addParameter = useCallback(
    (parameter: TemplateParameter) => {
      const extTemplate = template as AtlTemplateWithParameters;
      const newTemplate: AtlTemplateWithParameters = {
        ...template,
        parameters: {
          ...(extTemplate.parameters || {}),
          [parameter.name]: parameter,
        },
      };
      saveHistory(newTemplate as AtlTemplate);
      // 自动验证
      autoValidate();
    },
    [template, saveHistory, autoValidate]
  );

  /**
   * 更新模板参数
   */
  const updateParameter = useCallback(
    (name: string, updates: Partial<TemplateParameter>) => {
      const extTemplate = template as AtlTemplateWithParameters;
      if (!extTemplate.parameters || !extTemplate.parameters[name]) {
        console.warn(`参数 "${name}" 不存在,无法更新`);
        return;
      }

      const newTemplate: AtlTemplateWithParameters = {
        ...template,
        parameters: {
          ...extTemplate.parameters,
          [name]: {
            ...extTemplate.parameters[name],
            ...updates,
          } as TemplateParameter,
        },
      };
      saveHistory(newTemplate as AtlTemplate);
      // 自动验证
      autoValidate();
    },
    [template, saveHistory, autoValidate]
  );

  /**
   * 删除模板参数
   */
  const removeParameter = useCallback(
    (name: string) => {
      const extTemplate = template as AtlTemplateWithParameters;
      if (!extTemplate.parameters) {
        return;
      }

      const { [name]: removed, ...remainingParams } = extTemplate.parameters;

      const newTemplate: AtlTemplateWithParameters = {
        ...template,
        parameters: remainingParams,
      };
      saveHistory(newTemplate as AtlTemplate);
      // 自动验证
      autoValidate();
    },
    [template, saveHistory, autoValidate]
  );

  /**
   * 批量设置模板参数
   */
  const setParameters = useCallback(
    (parameters: Record<string, TemplateParameter>) => {
      const newTemplate: AtlTemplateWithParameters = {
        ...template,
        parameters,
      };
      saveHistory(newTemplate as AtlTemplate);
      // 自动验证
      autoValidate();
    },
    [template, saveHistory, autoValidate]
  );

  // ========== 数据源管理功能实现 ==========

  /**
   * 添加数据源
   */
  const addDataSource = useCallback(
    (dataSource: AtlDataSource) => {
      const dataSourceName = dataSource.name || `dataSource_${Date.now()}`;
      const newTemplate = {
        ...template,
        dataSources: {
          ...(template.dataSources || {}),
          [dataSourceName]: {
            ...dataSource,
            name: dataSourceName,
          },
        },
      };
      saveHistory(newTemplate);
      // 自动重建依赖图
      autoRebuildDependencyGraph();
      // 自动验证
      autoValidate();
    },
    [template, saveHistory, autoRebuildDependencyGraph, autoValidate]
  );

  /**
   * 更新数据源
   */
  const updateDataSource = useCallback(
    (id: string, updates: Partial<AtlDataSource>) => {
      if (!template.dataSources || !template.dataSources[id]) {
        console.warn(`数据源 "${id}" 不存在,无法更新`);
        return;
      }

      const newTemplate = {
        ...template,
        dataSources: {
          ...template.dataSources,
          [id]: {
            ...template.dataSources[id],
            ...updates,
          },
        },
      };
      saveHistory(newTemplate);
      // 自动重建依赖图
      autoRebuildDependencyGraph();
      // 自动验证
      autoValidate();
    },
    [template, saveHistory, autoRebuildDependencyGraph, autoValidate]
  );

  /**
   * 删除数据源
   */
  const removeDataSource = useCallback(
    (id: string) => {
      if (!template.dataSources) {
        return;
      }

      const { [id]: removed, ...remainingDataSources } = template.dataSources;

      const newTemplate = {
        ...template,
        dataSources: remainingDataSources,
      };
      saveHistory(newTemplate);
      // 自动重建依赖图
      autoRebuildDependencyGraph();
      // 自动验证
      autoValidate();
    },
    [template, saveHistory, autoRebuildDependencyGraph, autoValidate]
  );

  /**
   * 批量设置数据源
   */
  const setDataSources = useCallback(
    (dataSources: Record<string, AtlDataSource>) => {
      const newTemplate = {
        ...template,
        dataSources,
      };
      saveHistory(newTemplate);
      // 自动重建依赖图
      autoRebuildDependencyGraph();
      // 自动验证
      autoValidate();
    },
    [template, saveHistory, autoRebuildDependencyGraph, autoValidate]
  );

  /**
   * 更新数据源参数映射
   */
  const updateDataSourceParameterMapping = useCallback(
    (dataSourceId: string, parameterName: string, mapping: ParameterMapping) => {
      if (!template.dataSources || !template.dataSources[dataSourceId]) {
        console.warn(`数据源 "${dataSourceId}" 不存在,无法更新参数映射`);
        return;
      }

      const dataSource = template.dataSources[dataSourceId];
      const currentMappings = (dataSource as any).parameterMappings || {};

      const newTemplate = {
        ...template,
        dataSources: {
          ...template.dataSources,
          [dataSourceId]: {
            ...dataSource,
            parameterMappings: {
              ...currentMappings,
              [parameterName]: mapping.referenceExpression,
            },
          } as AtlDataSource,
        },
      };
      saveHistory(newTemplate);
      // 自动重建依赖图(参数映射可能影响依赖关系)
      autoRebuildDependencyGraph();
      // 自动验证
      autoValidate();
    },
    [template, saveHistory, autoRebuildDependencyGraph, autoValidate]
  );

  // ========== 依赖图管理功能实现 ==========

  /**
   * 重新构建依赖关系图
   */
  const rebuildDependencyGraph = useCallback(() => {
    autoRebuildDependencyGraph();
  }, [autoRebuildDependencyGraph]);

  /**
   * 获取数据源执行顺序
   */
  const getDataSourceExecutionOrder = useCallback((): TopologicalSortResult => {
    if (!template.dataSources || Object.keys(template.dataSources).length === 0) {
      return {
        success: true,
        layers: [],
        hasCycle: false,
        metadata: {
          sortedCount: 0,
          totalCount: 0,
          executionTime: 0,
        },
      };
    }

    // 类型断言以兼容验证工具的类型定义
    const graph = dependencyGraph || buildDependencyGraph(template.dataSources as Record<string, any>);
    return topologicalSort(graph);
  }, [template.dataSources, dependencyGraph]);

  // ========== 验证功能实现 ==========

  /**
   * 验证整个模板
   */
  const validateTemplateFunc = useCallback((): ValidationResult => {
    const result = validateTemplate(template as any);
    setValidationResult(result);
    return result;
  }, [template]);

  /**
   * 单独验证参数定义
   */
  const validateParametersFunc = useCallback((): ValidationResult => {
    const extTemplate = template as AtlTemplateWithParameters;
    if (!extTemplate.parameters || Object.keys(extTemplate.parameters).length === 0) {
      return {
        valid: true,
        errors: [],
        warnings: [],
        summary: {
          errorCount: 0,
          warningCount: 0,
          infoCount: 0,
          totalChecks: 0,
          passRate: 1,
        },
      };
    }

    const batchResult = validateAllParameters(extTemplate.parameters);

    // 将批量结果转换为ValidationResult格式
    const allErrors: any[] = [];
    const allWarnings: any[] = [];

    Object.values(batchResult.results).forEach((paramResult) => {
      allErrors.push(...paramResult.errors);
      if (paramResult.warnings) {
        allWarnings.push(...paramResult.warnings);
      }
    });

    return {
      valid: batchResult.valid,
      errors: allErrors,
      warnings: allWarnings,
      summary: {
        errorCount: batchResult.totalErrors,
        warningCount: batchResult.totalWarnings,
        infoCount: 0,
        totalChecks: batchResult.parameterCount,
        passRate: batchResult.valid ? 1 : 0,
      },
    };
  }, [template]);

  /**
   * 单独验证数据源配置
   */
  const validateDataSourcesFunc = useCallback((): ValidationResult => {
    if (!template.dataSources || Object.keys(template.dataSources).length === 0) {
      return {
        valid: true,
        errors: [],
        warnings: [],
        summary: {
          errorCount: 0,
          warningCount: 0,
          infoCount: 0,
          totalChecks: 0,
          passRate: 1,
        },
      };
    }

    const batchResult = validateAllDataSources(template.dataSources as any);

    // 将批量结果转换为ValidationResult格式
    const allErrors: any[] = [];
    const allWarnings: any[] = [];

    Object.values(batchResult.results).forEach((dsResult) => {
      allErrors.push(...dsResult.errors);
      if (dsResult.warnings) {
        allWarnings.push(...dsResult.warnings);
      }
    });

    return {
      valid: batchResult.valid,
      errors: allErrors,
      warnings: allWarnings,
      summary: {
        errorCount: batchResult.totalErrors,
        warningCount: batchResult.totalWarnings,
        infoCount: 0,
        totalChecks: batchResult.dataSourceCount,
        passRate: batchResult.valid ? 1 : 0,
      },
    };
  }, [template.dataSources]);

  /**
   * 单独验证依赖关系
   */
  const validateDependenciesFunc = useCallback((): ValidationResult => {
    if (!template.dataSources || Object.keys(template.dataSources).length === 0) {
      return {
        valid: true,
        errors: [],
        warnings: [],
        summary: {
          errorCount: 0,
          warningCount: 0,
          infoCount: 0,
          totalChecks: 0,
          passRate: 1,
        },
      };
    }

    // 使用templateValidator中的依赖验证函数
    const { validateTemplateDependencies } = require('../utils/validators/templateValidator');
    return validateTemplateDependencies(template as any);
  }, [template]);

  return {
    // ========== 现有元素管理功能 ==========
    template,
    selectedElementId,
    selectedElement,
    setTemplate: useCallback((newTemplate: AtlTemplate) => {
      saveHistory(newTemplate);
    }, [saveHistory]),
    setSelectedElementId,
    addElement,
    addElementAtPosition,
    removeElement,
    updateElement,
    updateElementPos,
    updateElementSz,
    updateElementProps,
    moveElementUp,
    moveElementDown,
    moveElementToTop,
    moveElementToBottom,
    updateCanvasSize,
    updateCanvasDpi,
    reset,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1,
    undo,
    redo,

    // ========== 参数管理功能 ==========
    addParameter,
    updateParameter,
    removeParameter,
    setParameters,

    // ========== 数据源管理功能 ==========
    addDataSource,
    updateDataSource,
    removeDataSource,
    setDataSources,
    updateDataSourceParameterMapping,

    // ========== 依赖图管理功能 ==========
    rebuildDependencyGraph,
    getDataSourceExecutionOrder,

    // ========== 验证功能 ==========
    validateTemplate: validateTemplateFunc,
    validateParameters: validateParametersFunc,
    validateDataSources: validateDataSourcesFunc,
    validateDependencies: validateDependenciesFunc,

    // ========== 新增状态字段 ==========
    validationResult,
    dependencyGraph,
    dataSourceExecutionOrder,
  };
}
