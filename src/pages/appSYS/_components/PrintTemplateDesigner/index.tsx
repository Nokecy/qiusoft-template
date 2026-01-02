/**
 * 可视化打印模板设计器 - 主组件
 */

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { message, Modal, Tabs, Alert, Empty, Tour } from 'antd';
import type { TourProps } from 'antd';
import {
  AppstoreOutlined,
  DatabaseOutlined,
  FileTextOutlined,
  SettingOutlined,
  ApartmentOutlined,
} from '@ant-design/icons';
import { ToolBar } from './components/ToolBar';
import { Canvas } from './components/Canvas';
import { PropertyPanel } from './components/PropertyPanel';
import { DataSourcePanel } from './components/DataSourcePanel';
import { ElementPanel } from './components/ElementPanel';
import { PaginationVariablePanel } from './components/PaginationVariablePanel';
import { ParameterEditor } from './components/ParameterEditor';
import { DependencyGraphViewer } from './components/DependencyGraphViewer';
import { ValidationStatusBar } from './components/ValidationStatusBar';
import TestPrintDialog from './components/TestPrintDialog';
import ConvertParamsDialog from './components/ConvertParamsDialog';
import { useTemplateState } from './hooks/useTemplateState';
import { exportTemplate, importTemplate, generateUUID, normalizeTemplateElements } from './utils';
import { toTemplateDto, fromTemplateDto, ConversionError } from './utils/dtoConverters';
import { AtlTemplate, PrintTemplateType, SectionType, AtlElement, AtlTemplateWithParameters } from './types';
import type { TemplateParameter } from './types/parameter';
import type { ValidationError } from './types/validation';
import { LabelPrintTemplateGetAsync, LabelPrintTemplateUpdateAtlAsync } from '@/services/openApi/LabelPrintTemplate';
import { TemplateConverterConvertAsync, TemplateConverterValidateAsync } from '@/services/openApi/TemplateConverter';
import { Colors, Spacing, FontSize, BorderRadius } from './constants/designSystem';
import { calculateSectionLayout } from './utils/sectionUtils';

export interface PrintTemplateDesignerProps {
  templateId?: string;  // 模板ID（编辑模式）
  templateName?: string; // 模板名称（用于显示）
  initialTargetLanguage?: number; // 初始打印机语言类型
  paperWidth?: number; // 纸张宽度（如果没有则使用画布宽度）
  paperHeight?: number; // 纸张高度（如果没有则使用画布高度）
  onSave?: (template: AtlTemplate) => void;
  onClose?: () => void;
}

export const PrintTemplateDesigner: React.FC<PrintTemplateDesignerProps> = ({
  templateId,
  templateName,
  initialTargetLanguage,
  paperWidth,
  paperHeight,
  onSave,
  onClose,
}) => {
  const templateState = useTemplateState();

  const {
    template,
    selectedElementId,
    selectedElement,
    setTemplate,
    setSelectedElementId,
    addElement,
    addElementAtPosition,
    removeElement,
    updateElement,
    updateElementProps,
    updateElementPos,
    updateElementSz,
    moveElementUp,
    moveElementDown,
    moveElementToTop,
    moveElementToBottom,
    updateCanvasSize,
    updateCanvasDpi,
    canUndo,
    canRedo,
    undo,
    redo,
    // 参数管理功能
    addParameter,
    updateParameter,
    removeParameter,
    // 依赖图管理功能
    dependencyGraph,
    getDataSourceExecutionOrder,
    // 验证功能
    validationResult,
    validateTemplate: runValidation,
  } = templateState;

  // 左侧面板Tab状态
  const [leftPanelActiveTab, setLeftPanelActiveTab] = useState('elements');

  // 目标打印机语言类型（使用传入的初始值，如果没有则默认ZPL）
  const [targetLanguage, setTargetLanguage] = useState<PrintTemplateType>(
    initialTargetLanguage !== undefined ? (initialTargetLanguage as PrintTemplateType) : PrintTemplateType.ZPL
  );

  // 并发控制戳（用于乐观并发控制）
  const [concurrencyStamp, setConcurrencyStamp] = useState<string>('');

  // 响应式布局：侧边栏宽度状态
  const [leftPanelWidth, setLeftPanelWidth] = useState(320);
  const [rightPanelWidth, setRightPanelWidth] = useState(320);
  const [isResizingLeft, setIsResizingLeft] = useState(false);
  const [isResizingRight, setIsResizingRight] = useState(false);

  // 约束值
  const MIN_LEFT_WIDTH = 280;
  const MAX_LEFT_WIDTH = 500;
  const MIN_RIGHT_WIDTH = 280;
  const MAX_RIGHT_WIDTH = 480;

  // 快捷键帮助面板状态
  const [showShortcutsHelp, setShowShortcutsHelp] = useState(false);

  // Tour引导状态
  const [tourOpen, setTourOpen] = useState(false);

  // 区域选择状态
  const [selectedSection, setSelectedSection] = useState<SectionType | null>(null);

  // 显示区域边界开关状态
  const [showSectionBoundaries, setShowSectionBoundaries] = useState(true);

  // 显示网格边界开关状态
  const [showGridBoundaries, setShowGridBoundaries] = useState(true);

  // 测试打印对话框状态
  const [showTestPrintDialog, setShowTestPrintDialog] = useState(false);

  // 右侧面板Tab状态（用于错误点击导航）
  const [rightPanelActiveTab, setRightPanelActiveTab] = useState('properties');

  /**
   * Tour步骤配置
   */
  const tourSteps: TourProps['steps'] = [
    {
      title: '欢迎使用参数化功能',
      description: '参数化功能允许您为模板定义动态参数和数据源,实现灵活的标签打印。',
      target: null, // 居中显示
    },
    {
      title: '验证状态栏',
      description: '实时显示模板验证结果,帮助您快速发现配置问题。',
      target: () => document.querySelector('[data-tour="validation-bar"]') as HTMLElement,
    },
    {
      title: '参数配置',
      description: '在这里定义模板运行时需要的参数,如订单号、日期等。',
      target: () => document.querySelector('[data-tour="parameters-tab"]') as HTMLElement,
    },
    {
      title: '数据源管理',
      description: '配置数组、API或SQL数据源,支持参数映射和依赖管理。',
      target: () => document.querySelector('[data-tour="datasource-panel"]') as HTMLElement,
    },
    {
      title: '参数映射',
      description: '将模板参数映射到数据源查询参数,实现动态查询。',
      target: () => document.querySelector('[data-tour="parameter-mapping"]') as HTMLElement,
    },
    {
      title: '依赖关系图',
      description: '可视化展示数据源之间的依赖关系和执行顺序。',
      target: () => document.querySelector('[data-tour="dependencies-tab"]') as HTMLElement,
    },
    {
      title: '预览和测试',
      description: '配置完成后,可以预览模板效果并测试数据源查询。',
      target: () => document.querySelector('[data-tour="preview-button"]') as HTMLElement,
    },
    {
      title: '保存模板',
      description: '所有配置完成并验证通过后,记得保存您的模板。',
      target: () => document.querySelector('[data-tour="save-button"]') as HTMLElement,
    },
  ];

  /**
   * Tour结束处理函数
   */
  const handleTourFinish = useCallback(() => {
    localStorage.setItem('template-designer-tour-seen', 'true');
    setTourOpen(false);
  }, []);

  /**
   * 首次访问自动启动Tour
   */
  useEffect(() => {
    const hasSeenTour = localStorage.getItem('template-designer-tour-seen');
    if (!hasSeenTour) {
      // 延迟500ms启动,确保页面元素已完全渲染
      const timer = setTimeout(() => {
        setTourOpen(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  // ========== 自动验证功能 ==========

  /**
   * 防抖计时器引用
   */
  const validationTimerRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * 自动验证 - 模板修改后500ms触发
   */
  useEffect(() => {
    // 清除之前的计时器
    if (validationTimerRef.current) {
      clearTimeout(validationTimerRef.current);
    }

    // 设置新的防抖计时器
    validationTimerRef.current = setTimeout(() => {
      runValidation();
    }, 500);

    // 清理函数
    return () => {
      if (validationTimerRef.current) {
        clearTimeout(validationTimerRef.current);
      }
    };
  }, [template, runValidation]);

  /**
   * 处理验证错误点击 - 导航到相关面板
   */
  const handleValidationErrorClick = useCallback((error: ValidationError) => {
    // 根据错误代码判断应该切换到哪个Tab
    if (error.code?.startsWith('PARAM_')) {
      // 参数相关错误 -> 切换到参数配置Tab
      setRightPanelActiveTab('parameters');
    } else if (error.code?.startsWith('DS_')) {
      // 数据源相关错误 -> 切换到数据源Tab
      setLeftPanelActiveTab('datasource');
    } else if (error.code?.startsWith('DEP_')) {
      // 依赖关系错误 -> 切换到依赖关系Tab
      setRightPanelActiveTab('dependencies');
    }

    // 显示错误详情提示
    message.warning(`${error.message}${error.field ? ` (字段: ${error.field})` : ''}`);
  }, []);

  // ========== 参数管理事件处理 ==========

  /**
   * 添加参数处理函数
   */
  const handleAddParameter = useCallback((param: TemplateParameter) => {
    addParameter(param);
  }, [addParameter]);

  /**
   * 更新参数处理函数
   * ParameterEditor传入完整的TemplateParameter，但Hook期望Partial<TemplateParameter>
   * 这里做类型兼容转换
   */
  const handleUpdateParameter = useCallback((name: string, param: TemplateParameter) => {
    // 将完整参数作为partial更新传递给Hook
    updateParameter(name, param as Partial<TemplateParameter>);
  }, [updateParameter]);

  /**
   * 删除参数处理函数
   */
  const handleRemoveParameter = useCallback((name: string) => {
    removeParameter(name);
  }, [removeParameter]);

  // 加载模板
  useEffect(() => {
    if (templateId) {
      loadTemplate(templateId);
    }
  }, [templateId]);

  // 监听内容区域变化,自动更新画布高度
  useEffect(() => {
    if (!template.sections || !template.sections.contentAreas || template.sections.contentAreas.length === 0) {
      return;
    }

    const layout = calculateSectionLayout(template);

    // 计算需要的总高度 = 页头 + 内容区域总高度 + 页尾
    const requiredHeight = layout.headerHeight + layout.totalContentHeight + layout.footerHeight;

    // 自动调整画布高度以适应内容
    // 如果画布高度不等于所需高度,则更新
    if (template.canvas.height !== requiredHeight) {
      updateCanvasSize(template.canvas.width, requiredHeight);
    }
  }, [template.sections?.contentAreas, template.sections?.header?.height, template.sections?.footer?.height]);

  // 从服务器加载模板
  const loadTemplate = async (id: string) => {
    try {
      console.log('[模板加载] 开始加载模板, ID:', id);

      // 使用 LabelPrintTemplateGetAsync 获取完整的 DTO 对象
      const dto = await LabelPrintTemplateGetAsync({ id });

      if (!dto) {
        throw new Error('未能获取模板数据');
      }

      console.log('[模板加载] 获取到 DTO:', {
        id: dto.id,
        name: dto.name,
        hasContent: !!dto.content,
        contentLength: dto.content?.length,
        concurrencyStamp: dto.concurrencyStamp,
      });

      // 保存 concurrencyStamp 用于后续更新
      if (dto.concurrencyStamp) {
        setConcurrencyStamp(dto.concurrencyStamp);
        console.log('[模板加载] 已保存 concurrencyStamp:', dto.concurrencyStamp);
      }

      // 从 content 字段解析 ATL 模板 JSON
      if (!dto.atlTemplateJson) {
        throw new Error('模板 content 字段为空');
      }

      let atlTemplate: any;
      try {
        // 尝试解析 JSON (可能是嵌套的 JSON 字符串)
        atlTemplate = JSON.parse(dto.atlTemplateJson);
        console.log('[模板加载] 第一次 JSON 解析成功');

        // 检查是否是嵌套的 JSON 字符串
        if (typeof atlTemplate === 'string') {
          console.log('[模板加载] 检测到嵌套 JSON 字符串,进行第二次解析');
          atlTemplate = JSON.parse(atlTemplate);
          console.log('[模板加载] 第二次 JSON 解析成功');
        }
      } catch (parseError) {
        console.error('[模板加载] JSON 解析失败:', parseError);
        throw new Error(`模板 content 字段 JSON 解析失败: ${parseError instanceof Error ? parseError.message : '未知错误'}`);
      }

      console.log('[模板加载] 解析后的 ATL 模板结构:', {
        hasMetadata: !!atlTemplate.metadata,
        hasCanvas: !!atlTemplate.canvas,
        elementCount: atlTemplate.elements?.length || 0,
        hasParameters: !!atlTemplate.parameters,
        hasDataSources: !!atlTemplate.dataSources,
      });

      // 转换DTO为前端格式(处理parameters和dataSources字段)
      const convertedTemplate = fromTemplateDto(atlTemplate, {
        validate: true,       // 验证数据完整性
        provideDefaults: true, // 提供默认值以应对解析失败
        verbose: true,        // 启用详细日志
      });

      // 如果URL参数提供了模板名称,使用它覆盖模板元数据中的名称
      if (templateName) {
        convertedTemplate.metadata.name = templateName;
        console.log('[模板加载] 使用 URL 参数中的模板名称:', templateName);
      }

      // 设置纸张尺寸：如果没有纸张尺寸，使用画布尺寸作为默认值
      if (!convertedTemplate.canvas.paperWidth || !convertedTemplate.canvas.paperHeight) {
        convertedTemplate.canvas.paperWidth = paperWidth || convertedTemplate.canvas.width;
        convertedTemplate.canvas.paperHeight = paperHeight || convertedTemplate.canvas.height;
        console.log('[模板加载] 设置纸张尺寸默认值:', {
          paperWidth: convertedTemplate.canvas.paperWidth,
          paperHeight: convertedTemplate.canvas.paperHeight,
        });
      }

      setTemplate(convertedTemplate);
      console.log('[模板加载] 模板已设置到状态');

      // 如果模板包含参数定义,触发延迟验证
      if (convertedTemplate.parameters && Object.keys(convertedTemplate.parameters).length > 0) {
        console.log('[模板加载] 检测到参数定义,将触发延迟验证');
        setTimeout(() => {
          runValidation();
        }, 100);
      }

      message.success('模板加载成功');
      console.log('[模板加载] 加载流程完成');
    } catch (error) {
      console.error('[模板加载] 加载失败:', error);

      // 友好的错误提示
      if (error instanceof ConversionError) {
        message.error(`模板数据转换失败: ${error.message} (字段: ${error.field})`);
      } else if (error instanceof Error) {
        message.error(`模板加载失败: ${error.message}`);
      } else {
        message.error('模板加载失败,请检查模板数据格式');
      }
    }
  };

  // 保存模板
  const handleSave = async () => {
    try {
      if (templateId) {
        console.log('[模板保存] 开始保存模板, ID:', templateId);

        // 运行验证
        const validation = runValidation();
        console.log('[模板保存] 验证结果:', validation);

        // 检查是否可以保存(允许警告,但不允许错误)
        // 只检查errors数组,不检查valid属性(valid可能因为warnings而为false)
        if (validation.errors && validation.errors.length > 0) {
          message.error('模板验证失败,请先修复错误后再保存');
          console.error('[模板保存] 验证失败,错误列表:', validation.errors);
          return;
        }

        // 如果有警告,给予用户提示
        if (validation.warnings && validation.warnings.length > 0) {
          console.warn('[模板保存] 模板包含警告:', validation.warnings);
        }

        // 检查 concurrencyStamp 是否存在
        if (!concurrencyStamp) {
          throw new Error('缺少 concurrencyStamp,无法保存模板。请重新加载模板后再试。');
        }

        console.log('[模板保存] 使用 concurrencyStamp:', concurrencyStamp);

        // 【关键修复】直接使用模板对象,不进行 DTO 转换
        // 后端 LabelPrintTemplateUpdateAtlAsync 接收的 parameters 和 dataSources 应该是对象,而非字符串
        // toTemplateDto 会将它们序列化为字符串,所以这里跳过转换直接使用原始模板

        // 使用统一的工具函数规范化 elementType
        const templateForSave = normalizeTemplateElements(template) as AtlTemplateWithParameters;

        console.log('[模板保存] 准备保存模板:', {
          hasMetadata: !!templateForSave.metadata,
          hasCanvas: !!templateForSave.canvas,
          elementCount: templateForSave.elements?.length || 0,
          parametersType: typeof templateForSave.parameters,
          dataSourcesType: typeof templateForSave.dataSources,
          parametersCount: templateForSave.parameters ? Object.keys(templateForSave.parameters).length : 0,
          dataSourcesCount: templateForSave.dataSources ? Object.keys(templateForSave.dataSources).length : 0,
        });

        // 使用 LabelPrintTemplateUpdateAtlAsync 保存 ATL 模板
        const result = await LabelPrintTemplateUpdateAtlAsync(
          { id: templateId },
          {
            template: templateForSave as any, // 传入 AtlTemplate 对象(parameters 和 dataSources 为对象)
            targetLanguage: targetLanguage, // 目标打印机语言
            autoConvertToPrinterCode: true, // 自动转换为打印机代码
            concurrencyStamp: concurrencyStamp, // 并发控制戳
          },
        );

        console.log('[模板保存] API 调用成功,返回结果:', {
          id: result?.id,
          name: result?.name,
          newConcurrencyStamp: result?.concurrencyStamp,
        });

        // 更新 concurrencyStamp
        if (result?.concurrencyStamp) {
          setConcurrencyStamp(result.concurrencyStamp);
          console.log('[模板保存] 已更新 concurrencyStamp:', result.concurrencyStamp);
        }

        message.success('模板保存成功');
        console.log('[模板保存] 保存流程完成');
      }

      if (onSave) {
        onSave(template);
      }
    } catch (error) {
      console.error('[模板保存] 保存失败:', error);

      // 友好的错误提示
      if (error instanceof ConversionError) {
        message.error(`模板数据转换失败: ${error.message} (字段: ${error.field})`);
      } else if (error instanceof Error) {
        message.error(`模板保存失败: ${error.message}`);
      } else {
        message.error('模板保存失败,请检查模板数据');
      }
    }
  };

  // 导出模板
  const handleExport = () => {
    try {
      const json = exportTemplate(template);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${template.metadata.name || 'template'}.json`;
      a.click();
      URL.revokeObjectURL(url);
      message.success('模板导出成功');
    } catch (error) {
      message.error('模板导出失败');
      console.error(error);
    }
  };

  // 导入模板
  const handleImport = (newTemplate: AtlTemplate) => {
    setTemplate(newTemplate);
  };


  // 验证模板
  const handleValidate = async () => {
    const hide = message.loading('正在验证模板...', 0);
    try {
      // 使用统一的工具函数规范化 elementType
      const templateCopy = normalizeTemplateElements(template);

      const result = await TemplateConverterValidateAsync({
        template: templateCopy as any,
        targetLanguage: targetLanguage,
      });

      if (result) {
        const { isValid, errors, warnings } = result;

        if (isValid) {
          message.success('模板验证通过！');
        } else {
          Modal.error({
            title: '模板验证失败',
            content: (
              <div>
                {errors && errors.length > 0 && (
                  <div style={{ marginBottom: 16 }}>
                    <h4 style={{ color: '#ff4d4f' }}>错误：</h4>
                    <ul>
                      {errors.map((err, idx) => (
                        <li key={idx} style={{ color: '#ff4d4f' }}>{err}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {warnings && warnings.length > 0 && (
                  <div>
                    <h4 style={{ color: '#faad14' }}>警告：</h4>
                    <ul>
                      {warnings.map((warn, idx) => (
                        <li key={idx} style={{ color: '#faad14' }}>{warn}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ),
            width: 600,
          });
        }
      }
    } catch (error) {
      console.error('验证失败:', error);
      message.error('模板验证失败');
    } finally {
      hide();
    }
  };

  // 转换模板参数对话框状态
  const [showConvertParamsDialog, setShowConvertParamsDialog] = useState(false);
  const [convertParamsData, setConvertParamsData] = useState<Record<string, any>>({});

  // 转换模板
  const handleConvert = async () => {
    // 检查模板是否有参数
    const extTemplate = template as AtlTemplateWithParameters;
    const hasParameters = extTemplate.parameters && Object.keys(extTemplate.parameters).length > 0;

    if (hasParameters) {
      // 如果有参数，显示参数输入对话框
      setShowConvertParamsDialog(true);
      return;
    }

    // 如果没有参数，直接转换
    await performConvert({});
  };

  // 执行转换（传入参数数据）
  const performConvert = async (parameterValues: Record<string, any>) => {
    const hide = message.loading('正在转换模板...', 0);
    try {
      // 使用统一的工具函数规范化 elementType
      const templateCopy = normalizeTemplateElements(template);

      // 打印发送数据用于调试
      console.log('转换请求数据:', JSON.stringify({
        template: templateCopy,
        targetLanguage: targetLanguage,
        data: parameterValues,
      }, null, 2));

      const result = await TemplateConverterConvertAsync({
        template: templateCopy as any,
        targetLanguage: targetLanguage,
        data: parameterValues, // 传递参数值
      });

      if (result && result.printerCode) {
        Modal.info({
          title: '转换结果',
          content: (
            <div>
              <div style={{ marginBottom: 8 }}>
                <strong>语言类型：</strong>
                {result.language === 5 ? 'Report' :
                  result.language === 10 ? 'ZPL' :
                    result.language === 15 ? 'EPL' :
                      result.language === 20 ? 'CPCL' :
                        result.language === 25 ? 'TSPL' : '未知'}
              </div>
              <div style={{ marginBottom: 8 }}>
                <strong>预估字节数：</strong>{result.estimatedBytes} bytes
              </div>
              <div>
                <strong>打印机代码：</strong>
                <pre style={{
                  background: '#f5f5f5',
                  padding: 12,
                  borderRadius: 4,
                  maxHeight: 400,
                  overflow: 'auto',
                  fontSize: 12,
                  fontFamily: 'Consolas, Monaco, monospace',
                }}>
                  {result.printerCode}
                </pre>
              </div>
            </div>
          ),
          width: 800,
        });
      }

      // 转换成功后关闭参数对话框
      setShowConvertParamsDialog(false);
    } catch (error) {
      console.error('转换失败:', error);
      message.error('模板转换失败');
    } finally {
      hide();
    }
  };

  // 删除选中元素
  const handleDelete = () => {
    if (selectedElementId) {
      Modal.confirm({
        title: '确认删除',
        content: '确定要删除选中的元素吗?',
        onOk: () => {
          removeElement(selectedElementId);
          message.success('元素已删除');
        },
      });
    }
  };

  // 更新数据源
  const handleDataSourcesUpdate = (dataSources: Record<string, any>) => {
    setTemplate({
      ...template,
      dataSources,
    });
  };

  // 更新区域配置（页头页尾）
  const handleSectionsUpdate = (sections: any) => {
    setTemplate({
      ...template,
      sections,
    });
  };

  // 选择区域处理函数（实现区域和元素互斥选择）
  const handleSelectSection = (sectionType: SectionType | null) => {
    setSelectedSection(sectionType);
    if (sectionType !== null) {
      // 取消元素选择
      setSelectedElementId(null);
    }
  };

  // 选择元素处理函数（实现元素和区域互斥选择）
  const handleSelectElement = (elementId: string | null) => {
    setSelectedElementId(elementId);
    if (elementId !== null) {
      // 取消区域选择
      setSelectedSection(null);
    }
  };

  // 对齐元素
  const handleAlign = (type: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom') => {
    if (!selectedElementId) {
      message.warning('请先选择要对齐的元素');
      return;
    }

    const selectedEl = template.elements.find(el => el.id === selectedElementId);
    if (!selectedEl) return;

    // 计算画布中心
    const canvasCenterX = template.canvas.width / 2;
    const canvasCenterY = template.canvas.height / 2;

    let newPosition = { ...selectedEl.position };

    switch (type) {
      case 'left':
        newPosition.x = 0;
        break;
      case 'center':
        newPosition.x = canvasCenterX - selectedEl.size.width / 2;
        break;
      case 'right':
        newPosition.x = template.canvas.width - selectedEl.size.width;
        break;
      case 'top':
        newPosition.y = 0;
        break;
      case 'middle':
        newPosition.y = canvasCenterY - selectedEl.size.height / 2;
        break;
      case 'bottom':
        newPosition.y = template.canvas.height - selectedEl.size.height;
        break;
    }

    updateElementPos(selectedElementId, newPosition);
    message.success('对齐成功');
  };

  // 分布元素（需要选中多个元素时才有意义，这里暂时只实现单个元素居中）
  const handleDistribute = (type: 'horizontal' | 'vertical') => {
    if (!selectedElementId) {
      message.warning('请先选择要分布的元素');
      return;
    }

    // 对于单个元素，分布等同于居中
    if (type === 'horizontal') {
      handleAlign('center');
    } else {
      handleAlign('middle');
    }
  };

  // 切换元素锁定状态
  const handleToggleLock = () => {
    if (selectedElementId) {
      const currentElement = selectedElement;
      const newLockedState = !currentElement?.locked;

      updateElement(selectedElementId, {
        locked: newLockedState
      });

      message.success(newLockedState ? '元素已锁定' : '元素已解锁');
    }
  };

  // 切换页头启用状态
  const handleToggleHeader = () => {
    const newSections = { ...template.sections };
    if (newSections.header) {
      // 如果已启用,则禁用
      const headerHeight = newSections.header.height || 0;

      // 1. 删除页头区域的所有元素
      const filteredElements = template.elements.filter(
        (el) => el.section !== SectionType.Header
      );

      // 2. 调整其他元素的Y坐标（向上移动headerHeight）
      const adjustedElements = filteredElements.map((el) => ({
        ...el,
        position: {
          ...el.position,
          y: el.position.y - headerHeight,
        },
      }));

      // 3. 更新模板
      delete newSections.header;
      setTemplate({
        ...template,
        sections: newSections,
        elements: adjustedElements,
      });
      setSelectedSection(null);
      message.success('页头已禁用');
    } else {
      // 如果未启用,则启用并设置默认配置
      const headerHeight = 20;
      newSections.header = {
        height: headerHeight,
        printFrequency: 0, // EveryPage
      };

      // 启用页头时，所有现有元素向下移动headerHeight
      const adjustedElements = template.elements.map((el) => ({
        ...el,
        position: {
          ...el.position,
          y: el.position.y + headerHeight,
        },
      }));

      // 更新模板
      setTemplate({
        ...template,
        sections: newSections,
        elements: adjustedElements,
      });
      message.success('页头已启用');
    }
  };

  // 切换页尾启用状态
  const handleToggleFooter = () => {
    const newSections = { ...template.sections };
    if (newSections.footer) {
      // 如果已启用,则禁用
      // 1. 删除页尾区域的所有元素
      const filteredElements = template.elements.filter(
        (el) => el.section !== SectionType.Footer
      );

      // 2. 更新模板（页尾在底部，不需要调整其他元素的Y坐标）
      delete newSections.footer;
      setTemplate({
        ...template,
        sections: newSections,
        elements: filteredElements,
      });
      setSelectedSection(null);
      message.success('页尾已禁用');
    } else {
      // 如果未启用,则启用并设置默认配置
      newSections.footer = {
        height: 20,
        printFrequency: 0, // EveryPage
      };
      handleSectionsUpdate(newSections);
      message.success('页尾已启用');
    }
  };

  // 处理纸张尺寸变更
  const handlePaperSizeChange = (paperWidth?: number, paperHeight?: number) => {
    setTemplate({
      ...template,
      canvas: {
        ...template.canvas,
        paperWidth,
        paperHeight,
      },
    });
  };

  // 打开测试打印对话框
  const handleTestPrint = () => {
    setShowTestPrintDialog(true);
  };

  // 关闭测试打印对话框
  const handleCloseTestPrint = () => {
    setShowTestPrintDialog(false);
  };

  // 复制的元素数据（使用 useRef 避免状态更新导致重渲染）
  const copiedElementRef = useRef<AtlElement | null>(null);

  // 键盘事件处理
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ? 键显示快捷键帮助
      if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setShowShortcutsHelp(true);
        return;
      }

      // Esc 键关闭快捷键帮助
      if (e.key === 'Escape' && showShortcutsHelp) {
        setShowShortcutsHelp(false);
        return;
      }

      // Ctrl+S 保存
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
        return;
      }


      // Ctrl+Z 撤销
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey && canUndo) {
        e.preventDefault();
        undo();
        return;
      }

      // Ctrl+Y 或 Ctrl+Shift+Z 重做
      if (((e.ctrlKey || e.metaKey) && e.key === 'y') ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z')) {
        if (canRedo) {
          e.preventDefault();
          redo();
        }
        return;
      }

      // Delete键删除元素
      if (e.key === 'Delete' && selectedElementId) {
        const element = template.elements.find(el => el.id === selectedElementId);

        // 检查元素是否被锁定
        if (element?.locked) {
          message.warning('锁定的元素无法删除，请先解锁');
          return;
        }

        // 二次确认删除
        Modal.confirm({
          title: '确认删除',
          content: '确定要删除选中的元素吗？',
          okText: '确定',
          cancelText: '取消',
          onOk: () => {
            removeElement(selectedElementId);
            message.success('元素已删除');
          },
        });
        return;
      }

      // Ctrl+C 复制元素
      if ((e.ctrlKey || e.metaKey) && e.key === 'c' && selectedElementId) {
        const element = template.elements.find(el => el.id === selectedElementId);
        if (element) {
          // 深拷贝元素数据
          copiedElementRef.current = JSON.parse(JSON.stringify(element));
          message.success('元素已复制');
        }
        return;
      }

      // Ctrl+V 粘贴元素
      if ((e.ctrlKey || e.metaKey) && e.key === 'v' && copiedElementRef.current) {
        // 生成新的唯一ID
        const newId = generateUUID();

        // 计算新位置（偏移10mm避免重叠）
        const offsetX = 10;
        const offsetY = 10;
        const newX = Math.min(
          copiedElementRef.current.position.x + offsetX,
          template.canvas.width - copiedElementRef.current.size.width
        );
        const newY = Math.min(
          copiedElementRef.current.position.y + offsetY,
          template.canvas.height - copiedElementRef.current.size.height
        );

        // 创建新元素
        const newElement: AtlElement = {
          ...copiedElementRef.current,
          id: newId,
          position: {
            x: Math.max(0, newX),
            y: Math.max(0, newY),
          },
          // 粘贴的元素层级设为最高
          zIndex: Math.max(...template.elements.map(el => el.zIndex), 0) + 1,
        };

        // 添加元素到模板
        setTemplate({
          ...template,
          elements: [...template.elements, newElement],
        });

        // 自动选中新粘贴的元素
        setSelectedElementId(newId);

        message.success('元素已粘贴');
        return;
      }
    };

    // 添加键盘事件监听
    window.addEventListener('keydown', handleKeyDown);

    // 清理事件监听
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedElementId, template, removeElement, setTemplate, setSelectedElementId, showShortcutsHelp, canUndo, canRedo, undo, redo]);

  // 响应式布局：处理拖动调整侧边栏宽度
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizingLeft) {
        const newWidth = Math.min(Math.max(e.clientX, MIN_LEFT_WIDTH), MAX_LEFT_WIDTH);
        setLeftPanelWidth(newWidth);
      } else if (isResizingRight) {
        const newWidth = Math.min(
          Math.max(window.innerWidth - e.clientX, MIN_RIGHT_WIDTH),
          MAX_RIGHT_WIDTH
        );
        setRightPanelWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizingLeft(false);
      setIsResizingRight(false);
    };

    if (isResizingLeft || isResizingRight) {
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizingLeft, isResizingRight, MIN_LEFT_WIDTH, MAX_LEFT_WIDTH, MIN_RIGHT_WIDTH, MAX_RIGHT_WIDTH]);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: Colors.canvasBg,
      }}
    >
      {/* 工具栏 */}
      <ToolBar
        template={template}
        canUndo={canUndo}
        canRedo={canRedo}
        selectedElementId={selectedElementId}
        targetLanguage={targetLanguage}
        showSectionBoundaries={showSectionBoundaries}
        showGridBoundaries={showGridBoundaries}
        onSave={handleSave}
        onExport={handleExport}
        onImport={handleImport}
        onConvert={handleConvert}
        onValidate={handleValidate}
        onTestPrint={handleTestPrint}
        onShowTour={() => setTourOpen(true)}
        onUndo={undo}
        onRedo={redo}
        onDelete={handleDelete}
        onCanvasSizeChange={updateCanvasSize}
        onDpiChange={updateCanvasDpi}
        onTargetLanguageChange={setTargetLanguage}
        onAlign={handleAlign}
        onDistribute={handleDistribute}
        onToggleHeader={handleToggleHeader}
        onToggleFooter={handleToggleFooter}
        onToggleSectionBoundaries={setShowSectionBoundaries}
        onToggleGridBoundaries={setShowGridBoundaries}
        onPaperSizeChange={handlePaperSizeChange}
      />

      {/* 验证状态栏 */}
      <ValidationStatusBar
        data-tour="validation-bar"
        validationResult={validationResult}
        onErrorClick={handleValidationErrorClick}
      />

      {/* 主工作区 */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* 左侧面板 - Tab切换 */}
        <div
          style={{
            width: leftPanelWidth,
            borderRight: `1px solid ${Colors.border}`,
            display: 'flex',
            flexDirection: 'column',
            background: Colors.sidebarBg,
            position: 'relative',
          }}
        >
          {/* 左侧拖动分隔符 */}
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: 4,
              cursor: 'col-resize',
              background: isResizingLeft ? Colors.info : 'transparent',
              transition: 'background 0.2s',
              zIndex: 10,
            }}
            onMouseDown={() => setIsResizingLeft(true)}
            onMouseEnter={(e) => {
              if (!isResizingLeft) {
                e.currentTarget.style.background = `${Colors.info}33`; // 20% opacity
              }
            }}
            onMouseLeave={(e) => {
              if (!isResizingLeft) {
                e.currentTarget.style.background = 'transparent';
              }
            }}
          />
          <Tabs
            activeKey={leftPanelActiveTab}
            onChange={setLeftPanelActiveTab}
            type="card"
            items={[
              {
                key: 'elements',
                label: (
                  <span>
                    <AppstoreOutlined />
                    元素库
                  </span>
                ),
                children: <ElementPanel onAddElement={addElement} />,
              },
              {
                key: 'datasource',
                label: (
                  <span data-tour="datasource-panel">
                    <DatabaseOutlined />
                    数据源
                  </span>
                ),
                children: (
                  <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
                      <DataSourcePanel
                        dataSources={template.dataSources || {}}
                        onUpdate={handleDataSourcesUpdate}
                        templateParameters={
                          Object.values((template as AtlTemplateWithParameters).parameters || {}) as TemplateParameter[]
                        }
                        templateParametersDict={
                          (template as AtlTemplateWithParameters).parameters || {}
                        }
                      />
                    </div>
                  </div>
                ),
              },
              {
                key: 'pagination',
                label: (
                  <span>
                    <FileTextOutlined />
                    分页变量
                  </span>
                ),
                children: (
                  <div style={{ height: '100%', overflow: 'auto' }}>
                    <PaginationVariablePanel />
                  </div>
                ),
              },
            ]}
            style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
            tabBarStyle={{ marginBottom: 0 }}
          />
        </div>

        {/* 画布 */}
        <Canvas
          width={template.canvas.width}
          height={template.canvas.height}
          dpi={template.canvas.dpi}
          elements={template.elements}
          selectedElementId={selectedElementId}
          sections={template.sections}
          selectedSection={selectedSection}
          showSectionBoundaries={showSectionBoundaries}
          showGridBoundaries={showGridBoundaries}
          onSelectElement={handleSelectElement}
          onSelectSection={handleSelectSection}
          onUpdateElementPosition={updateElementPos}
          onUpdateElementSize={updateElementSz}
          onUpdateElementProperties={updateElementProps}
          onUpdateElement={updateElement}
          onAddElementAtPosition={addElementAtPosition}
          onRemoveElement={removeElement}
          onMoveToTop={(id) => moveElementToTop(id)}
          onMoveToBottom={(id) => moveElementToBottom(id)}
          onMoveUp={(id) => moveElementUp(id)}
          onMoveDown={(id) => moveElementDown(id)}
          bindingContext={template.variables || {}}
          onUpdateSection={(sectionType, config) => {
            const newSections = { ...template.sections };
            switch (sectionType) {
              case SectionType.Header:
                newSections.header = { ...newSections.header, ...config };
                break;
              case SectionType.Content:
                // 特殊处理：如果config包含contentAreas，直接更新contentAreas数组
                if ('contentAreas' in config) {
                  newSections.contentAreas = (config as any).contentAreas;
                } else {
                  // 否则更新传统的单内容区域
                  newSections.content = { ...newSections.content, ...config };
                }
                break;
              case SectionType.Footer:
                newSections.footer = { ...newSections.footer, ...config };
                break;
            }
            handleSectionsUpdate(newSections);
          }}
          onUpdateCanvasHeight={(height) => {
            updateCanvasSize(template.canvas.width, height);
          }}
        />

        {/* 右侧面板 - 属性和参数配置 */}
        <div
          style={{
            width: rightPanelWidth,
            display: 'flex',
            flexDirection: 'column',
            background: Colors.propertyBg,
            position: 'relative',
          }}
        >
          {/* 右侧拖动分隔符 */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: 4,
              cursor: 'col-resize',
              background: isResizingRight ? Colors.info : 'transparent',
              transition: 'background 0.2s',
              zIndex: 10,
            }}
            onMouseDown={() => setIsResizingRight(true)}
            onMouseEnter={(e) => {
              if (!isResizingRight) {
                e.currentTarget.style.background = `${Colors.info}33`; // 20% opacity
              }
            }}
            onMouseLeave={(e) => {
              if (!isResizingRight) {
                e.currentTarget.style.background = 'transparent';
              }
            }}
          />

          <Tabs
            activeKey={rightPanelActiveTab}
            onChange={setRightPanelActiveTab}
            type="card"
            items={[
              {
                key: 'properties',
                label: (
                  <span>
                    <FileTextOutlined />
                    属性面板
                  </span>
                ),
                children: (
                  <PropertyPanel
                    element={selectedElement}
                    elements={template.elements}
                    onUpdateElement={(updates) => selectedElementId && updateElement(selectedElementId, updates)}
                    onUpdateProperties={(properties) => selectedElementId && updateElementProps(selectedElementId, properties)}
                    onUpdatePosition={(position) => selectedElementId && updateElementPos(selectedElementId, position)}
                    onUpdateSize={(size) => selectedElementId && updateElementSz(selectedElementId, size)}
                    onMoveUp={() => selectedElementId && moveElementUp(selectedElementId)}
                    onMoveDown={() => selectedElementId && moveElementDown(selectedElementId)}
                    onMoveToTop={() => selectedElementId && moveElementToTop(selectedElementId)}
                    onMoveToBottom={() => selectedElementId && moveElementToBottom(selectedElementId)}
                    onToggleLock={handleToggleLock}
                    selectedSection={selectedSection}
                    sections={template.sections}
                    dataSources={template.dataSources}
                    onUpdateSection={(sectionType, config) => {
                      console.log('[PropertyPanel] onUpdateSection 被调用:', {
                        sectionType,
                        config,
                        当前sections: template.sections,
                      });

                      const newSections = { ...template.sections };
                      switch (sectionType) {
                        case SectionType.Header:
                          // 使用合并策略而不是完全替换
                          newSections.header = { ...newSections.header, ...config };
                          break;
                        case SectionType.Content:
                          // 使用合并策略而不是完全替换
                          newSections.content = { ...newSections.content, ...config };
                          break;
                        case SectionType.Footer:
                          // 使用合并策略而不是完全替换
                          newSections.footer = { ...newSections.footer, ...config };
                          break;
                      }

                      console.log('[PropertyPanel] 准备更新 sections:', newSections);
                      handleSectionsUpdate(newSections);
                    }}
                    onDisableSection={(sectionType) => {
                      const newSections = { ...template.sections };
                      switch (sectionType) {
                        case SectionType.Header:
                          delete newSections.header;
                          break;
                        case SectionType.Footer:
                          delete newSections.footer;
                          break;
                      }
                      handleSectionsUpdate(newSections);
                      setSelectedSection(null);
                    }}
                    onDeselectSection={() => setSelectedSection(null)}
                    canvasWidth={template.canvas.width}
                    canvasHeight={template.canvas.height}
                    onSectionsChange={handleSectionsUpdate}
                    onElementsChange={(elements) => {
                      console.log('💾 主设计器 onElementsChange 被调用:', {
                        旧元素数量: template.elements.length,
                        新元素数量: elements.length,
                        元素变化: template.elements.length - elements.length
                      });

                      // 找出被删除的元素ID
                      const deletedElementIds = template.elements
                        .filter(el => !elements.find(newEl => newEl.id === el.id))
                        .map(el => el.id);

                      console.log('🗑️ 被删除的元素ID列表:', deletedElementIds);

                      // 同步清理 sections 中 cellTemplate 对这些元素的引用
                      const cleanedSections = template.sections ? {
                        ...template.sections,
                        header: template.sections.header?.labelGridLayout ? {
                          ...template.sections.header,
                          labelGridLayout: {
                            ...template.sections.header.labelGridLayout,
                            cellTemplate: template.sections.header.labelGridLayout.cellTemplate.filter(
                              el => !deletedElementIds.includes(el.id)
                            ),
                          },
                        } : template.sections.header,
                        content: template.sections.content?.labelGridLayout ? {
                          ...template.sections.content,
                          labelGridLayout: {
                            ...template.sections.content.labelGridLayout,
                            cellTemplate: template.sections.content.labelGridLayout.cellTemplate.filter(
                              el => !deletedElementIds.includes(el.id)
                            ),
                          },
                        } : template.sections.content,
                        // 清理 contentAreas 数组中各区域的 cellTemplate
                        contentAreas: template.sections.contentAreas?.map(area => ({
                          ...area,
                          labelGridLayout: area.labelGridLayout ? {
                            ...area.labelGridLayout,
                            cellTemplate: area.labelGridLayout.cellTemplate.filter(
                              el => !deletedElementIds.includes(el.id)
                            ),
                          } : undefined,
                        })),
                        footer: template.sections.footer?.labelGridLayout ? {
                          ...template.sections.footer,
                          labelGridLayout: {
                            ...template.sections.footer.labelGridLayout,
                            cellTemplate: template.sections.footer.labelGridLayout.cellTemplate.filter(
                              el => !deletedElementIds.includes(el.id)
                            ),
                          },
                        } : template.sections.footer,
                      } : template.sections;

                      console.log('✅ 已清理 cellTemplate 中的元素引用');

                      const newTemplate = {
                        ...template,
                        elements,
                        sections: cleanedSections,
                      };

                      console.log('🔄 准备调用 setTemplate:', {
                        新模板元素数量: newTemplate.elements.length,
                        新模板引用: newTemplate !== template ? '新对象' : '相同对象'
                      });

                      setTemplate(newTemplate);

                      console.log('✅ setTemplate 已调用');
                    }}
                    onSectionsAndElementsChange={(sections, elements) => {
                      console.log('🔄 onSectionsAndElementsChange 被调用:', {
                        sections区域数: sections.contentAreas?.length,
                        elements数量: elements.length
                      });

                      // 找出被删除的元素ID
                      const deletedElementIds = template.elements
                        .filter(el => !elements.find(newEl => newEl.id === el.id))
                        .map(el => el.id);

                      // 清理 cellTemplate 引用
                      const cleanedSections = sections ? {
                        ...sections,
                        header: sections.header?.labelGridLayout ? {
                          ...sections.header,
                          labelGridLayout: {
                            ...sections.header.labelGridLayout,
                            cellTemplate: sections.header.labelGridLayout.cellTemplate.filter(
                              el => !deletedElementIds.includes(el.id)
                            ),
                          },
                        } : sections.header,
                        content: sections.content?.labelGridLayout ? {
                          ...sections.content,
                          labelGridLayout: {
                            ...sections.content.labelGridLayout,
                            cellTemplate: sections.content.labelGridLayout.cellTemplate.filter(
                              el => !deletedElementIds.includes(el.id)
                            ),
                          },
                        } : sections.content,
                        contentAreas: sections.contentAreas?.map(area => ({
                          ...area,
                          labelGridLayout: area.labelGridLayout ? {
                            ...area.labelGridLayout,
                            cellTemplate: area.labelGridLayout.cellTemplate.filter(
                              el => !deletedElementIds.includes(el.id)
                            ),
                          } : undefined,
                        })),
                        footer: sections.footer?.labelGridLayout ? {
                          ...sections.footer,
                          labelGridLayout: {
                            ...sections.footer.labelGridLayout,
                            cellTemplate: sections.footer.labelGridLayout.cellTemplate.filter(
                              el => !deletedElementIds.includes(el.id)
                            ),
                          },
                        } : sections.footer,
                      } : sections;

                      // 一次性更新 sections 和 elements
                      const newTemplate = {
                        ...template,
                        sections: cleanedSections,
                        elements,
                      };

                      console.log('✅ 准备一次性更新模板');
                      setTemplate(newTemplate);
                      console.log('✅ 模板已更新');
                    }}
                  />
                ),
              },
              {
                key: 'parameters',
                label: (
                  <span data-tour="parameters-tab">
                    <SettingOutlined />
                    参数配置
                  </span>
                ),
                children: (
                  <div style={{ height: '100%', overflow: 'auto', padding: 16 }}>
                    <Alert
                      message="配置模板参数"
                      description="定义模板运行时需要的参数及其约束条件。参数可用于数据源查询、条件渲染等场景。"
                      type="info"
                      showIcon
                      style={{ marginBottom: 16 }}
                    />
                    <ParameterEditor
                      parameters={(template as AtlTemplateWithParameters).parameters || {}}
                      onAdd={handleAddParameter}
                      onUpdate={handleUpdateParameter}
                      onRemove={handleRemoveParameter}
                    />
                  </div>
                ),
              },
              {
                key: 'dependencies',
                label: (
                  <span data-tour="dependencies-tab">
                    <ApartmentOutlined />
                    依赖关系
                  </span>
                ),
                children: (
                  <div style={{ height: '100%', overflow: 'auto', padding: 16 }}>
                    <Alert
                      message="数据源依赖关系图"
                      description="可视化展示数据源之间的依赖关系,帮助理解数据流向和执行顺序。"
                      type="info"
                      showIcon
                      style={{ marginBottom: 16 }}
                    />
                    {dependencyGraph ? (
                      <DependencyGraphViewer
                        dependencyGraph={dependencyGraph}
                        executionOrder={getDataSourceExecutionOrder().layers}
                      />
                    ) : (
                      <Empty description="暂无数据源依赖关系" />
                    )}
                  </div>
                ),
              },
            ]}
            style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
            tabBarStyle={{ marginBottom: 0 }}
          />
        </div>
      </div>

      {/* 测试打印对话框 */}
      <TestPrintDialog
        open={showTestPrintDialog}
        template={template}
        targetLanguage={targetLanguage}
        onClose={handleCloseTestPrint}
      />

      {/* 转换参数输入对话框 */}
      <ConvertParamsDialog
        open={showConvertParamsDialog}
        template={template as AtlTemplateWithParameters}
        onConfirm={performConvert}
        onClose={() => setShowConvertParamsDialog(false)}
      />

      {/* 快捷键帮助面板 */}
      <Modal
        title="快捷键帮助"
        open={showShortcutsHelp}
        onCancel={() => setShowShortcutsHelp(false)}
        footer={null}
        width={500}
      >
        <div style={{ padding: `${Spacing.md}px 0` }}>
          <div style={{ marginBottom: Spacing.lg }}>
            <div style={{ fontSize: FontSize.sm, fontWeight: 600, marginBottom: Spacing.sm, color: Colors.info }}>
              编辑操作
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: Spacing.sm }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: Colors.textSecondary }}>撤销</span>
                <span style={{ fontFamily: 'monospace', background: Colors.sidebarBg, padding: '2px 8px', borderRadius: BorderRadius.md }}>
                  Ctrl + Z
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: Colors.textSecondary }}>重做</span>
                <span style={{ fontFamily: 'monospace', background: Colors.sidebarBg, padding: '2px 8px', borderRadius: BorderRadius.md }}>
                  Ctrl + Y
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: Colors.textSecondary }}>复制元素</span>
                <span style={{ fontFamily: 'monospace', background: Colors.sidebarBg, padding: '2px 8px', borderRadius: BorderRadius.md }}>
                  Ctrl + C
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: Colors.textSecondary }}>粘贴元素</span>
                <span style={{ fontFamily: 'monospace', background: Colors.sidebarBg, padding: '2px 8px', borderRadius: BorderRadius.md }}>
                  Ctrl + V
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: Colors.textSecondary }}>删除元素</span>
                <span style={{ fontFamily: 'monospace', background: Colors.sidebarBg, padding: '2px 8px', borderRadius: BorderRadius.md }}>
                  Delete
                </span>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: Spacing.lg }}>
            <div style={{ fontSize: FontSize.sm, fontWeight: 600, marginBottom: Spacing.sm, color: Colors.info }}>
              文件操作
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: Spacing.sm }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: Colors.textSecondary }}>保存模板</span>
                <span style={{ fontFamily: 'monospace', background: Colors.sidebarBg, padding: '2px 8px', borderRadius: BorderRadius.md }}>
                  Ctrl + S
                </span>
              </div>
            </div>
          </div>

          <div>
            <div style={{ fontSize: FontSize.sm, fontWeight: 600, marginBottom: Spacing.sm, color: Colors.info }}>
              帮助
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: Spacing.sm }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: Colors.textSecondary }}>显示快捷键帮助</span>
                <span style={{ fontFamily: 'monospace', background: Colors.sidebarBg, padding: '2px 8px', borderRadius: BorderRadius.md }}>
                  ?
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: Colors.textSecondary }}>关闭帮助面板</span>
                <span style={{ fontFamily: 'monospace', background: Colors.sidebarBg, padding: '2px 8px', borderRadius: BorderRadius.md }}>
                  Esc
                </span>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* 功能引导Tour */}
      <Tour
        open={tourOpen}
        onClose={() => setTourOpen(false)}
        onFinish={handleTourFinish}
        steps={tourSteps}
      />
    </div>
  );
};

export default PrintTemplateDesigner;
