/**
 * 数据源配置面板 V2
 * 使用新的AtlDataSource数据结构，集成增强的测试功能
 *
 * 功能特性:
 * - 自动从useTemplateState Hook获取模板参数
 * - 实时验证数据源配置
 * - 显示验证错误和依赖关系
 * - 集成参数映射和依赖检测
 */

import React, { useState, useCallback, useMemo } from 'react';
import {
  Modal,
  Button,
  Space,
  List,
  message,
  Card,
  Tag,
  Avatar,
  Alert,
  Statistic,
  Row,
  Col,
  Form,
  Input,
  InputNumber,
  Switch,
  DatePicker,
  Divider,
} from 'antd';
import dayjs from 'dayjs';
import {
  PlusOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
  EditOutlined,
  ThunderboltOutlined,
  DatabaseOutlined,
  ApiOutlined,
  CloudServerOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  ExclamationCircleOutlined,
  LinkOutlined,
} from '@ant-design/icons';
import { DataSourceType, AtlDataSource, DataSourceTestResult, AtlDataSourceWithDependency } from '../types';
import {
  TemplateConverterTestDataSourceAsync,
  TemplateConverterTestAllDataSourcesAsync,
} from '@/services/openApi/TemplateConverter';
import { TestResultModal } from './TestResultModal';
import { BatchTestResultModal } from './BatchTestResultModal';
import { DataSourceFormModal } from './DataSourceFormModal';
import {
  getDataSourceTypeName,
  validateDataSource,
  createDefaultDataSource,
  migrateDataSources,
} from '../utils/dataSourceUtils';
import { normalizeTemplateElements } from '../utils';
import { useTemplateState } from '../hooks/useTemplateState';
import type { TemplateParameter } from '../types/parameter';
import { ParameterType } from '../types/parameter';

export interface DataSourcePanelProps {
  /** 数据源字典 */
  dataSources: Record<string, AtlDataSource>;
  /** 数据源更新回调 */
  onUpdate: (dataSources: Record<string, AtlDataSource>) => void;
  /** 模板参数列表(用于参数映射) */
  templateParameters?: TemplateParameter[];
  /** 模板参数字典(用于测试时获取参数定义) */
  templateParametersDict?: Record<string, TemplateParameter>;
}

interface DataSourceListItem extends AtlDataSource {
  key: string; // 用于List的key
}

/**
 * 数据源配置面板组件
 *
 * @example
 * ```tsx
 * <DataSourcePanel
 *   dataSources={template.dataSources}
 *   onUpdate={handleDataSourceUpdate}
 * />
 * ```
 */
export const DataSourcePanel: React.FC<DataSourcePanelProps> = ({
  dataSources,
  onUpdate,
  templateParameters = [],
  templateParametersDict = {},
}) => {
  const [editingSource, setEditingSource] = useState<AtlDataSource | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);

  // 测试结果状态
  const [testResult, setTestResult] = useState<{
    name: string;
    result: DataSourceTestResult;
  } | null>(null);
  const [batchTestResults, setBatchTestResults] = useState<Record<
    string,
    DataSourceTestResult
  > | null>(null);

  // 参数输入对话框状态
  const [paramDialogVisible, setParamDialogVisible] = useState(false);
  const [testingDataSource, setTestingDataSource] = useState<DataSourceListItem | null>(null);
  const [paramForm] = Form.useForm();

  // 警告提示关闭状态
  const [warningAlertClosed, setWarningAlertClosed] = useState(false);

  // 从useTemplateState Hook获取模板状态(仅用于验证和依赖图)
  const {
    validationResult,
    dependencyGraph,
    validateTemplate: triggerValidation,
  } = useTemplateState();

  // 确保数据源已迁移到新格式
  const migratedDataSources = useMemo(() => {
    return migrateDataSources(dataSources);
  }, [dataSources]);

  // 数据源列表
  const dataSourceList: DataSourceListItem[] = useMemo(() => {
    return Object.entries(migratedDataSources).map(([name, ds]) => ({
      key: name,
      ...ds,
      name: ds.name || name, // 确保name字段存在
    }));
  }, [migratedDataSources]);

  // 注意: templateParameters 现在通过 props 传递,不再从 template 中提取

  // 提取数据源需要的参数
  const getDataSourceRequiredParameters = useCallback((dataSource: AtlDataSource): TemplateParameter[] => {
    const dsWithDep = dataSource as AtlDataSourceWithDependency;
    if (!dsWithDep.parameterMappings || Object.keys(dsWithDep.parameterMappings).length === 0) {
      return [];
    }

    // 从参数映射中提取引用的模板参数
    const requiredParams: TemplateParameter[] = [];
    const paramNames = new Set<string>();

    Object.values(dsWithDep.parameterMappings).forEach(expression => {
      // 解析 Scriban 表达式,提取参数名
      // 例如: "{{ $parameters.userId }}" -> "userId"
      const matches = expression.match(/\$parameters\.(\w+)/g);
      if (matches) {
        matches.forEach(match => {
          const paramName = match.replace('$parameters.', '');
          if (!paramNames.has(paramName) && templateParametersDict[paramName]) {
            paramNames.add(paramName);
            requiredParams.push(templateParametersDict[paramName]);
          }
        });
      }
    });

    return requiredParams;
  }, [templateParametersDict]);

  // 数据源验证结果
  const dataSourceValidationResult = useMemo(() => {
    if (!validationResult) return null;

    // 提取与数据源相关的错误
    const dsErrors = validationResult.errors.filter((error: any) =>
      error.type === 'dataSource' || error.category === 'dataSource'
    );

    const dsWarnings = validationResult.warnings?.filter((warning: any) =>
      warning.type === 'dataSource' || warning.category === 'dataSource'
    ) || [];

    return {
      hasErrors: dsErrors.length > 0,
      hasWarnings: dsWarnings.length > 0,
      errors: dsErrors,
      warnings: dsWarnings,
      errorCount: dsErrors.length,
      warningCount: dsWarnings.length,
    };
  }, [validationResult]);

  // 依赖关系统计
  const dependencyStats = useMemo(() => {
    if (!dependencyGraph) {
      return { totalDependencies: 0, hasCycles: false };
    }

    const totalDependencies = Object.values(dependencyGraph.adjacencyList).reduce(
      (sum, deps) => sum + deps.length,
      0
    );

    return {
      totalDependencies,
      hasCycles: dependencyGraph.hasCycle || false,
    };
  }, [dependencyGraph]);

  // 获取数据源的依赖数量
  const getDataSourceDependencyCount = useCallback((dataSourceName: string): number => {
    if (!dependencyGraph || !dependencyGraph.adjacencyList) return 0;
    return dependencyGraph.adjacencyList[dataSourceName]?.length || 0;
  }, [dependencyGraph]);

  // 检查数据源是否有错误
  const hasDataSourceError = useCallback((dataSourceName: string): boolean => {
    if (!dataSourceValidationResult) return false;

    return dataSourceValidationResult.errors.some((error: any) =>
      error.path?.includes(dataSourceName) ||
      error.message?.includes(dataSourceName)
    );
  }, [dataSourceValidationResult]);

  // 添加数据源
  const handleAdd = useCallback(() => {
    const defaultSource = createDefaultDataSource(DataSourceType.Array, '');
    setEditingSource(defaultSource);
    setEditModalVisible(true);
  }, []);

  // 编辑数据源
  const handleEdit = useCallback((record: DataSourceListItem) => {
    setEditingSource(record);
    setEditModalVisible(true);
  }, []);

  // 保存数据源
  const handleSave = useCallback((dataSource: AtlDataSource) => {
    const newDataSources = { ...migratedDataSources };
    const name = dataSource.name!;

    // 检查是否重命名
    if (editingSource && editingSource.name && editingSource.name !== name) {
      // 删除旧名称的数据源
      delete newDataSources[editingSource.name];
    }

    // 保存新数据源
    newDataSources[name] = dataSource;

    onUpdate(newDataSources);
    setEditModalVisible(false);
    setEditingSource(null);
    message.success('数据源已保存');

    // 触发实时验证
    setTimeout(() => {
      triggerValidation();
    }, 100);
  }, [migratedDataSources, editingSource, onUpdate, triggerValidation]);

  // 删除数据源
  const handleDelete = useCallback((name: string) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除数据源"${name}"吗？`,
      okText: '确定',
      cancelText: '取消',
      okType: 'danger',
      onOk: () => {
        const newDataSources = { ...migratedDataSources };
        delete newDataSources[name];
        onUpdate(newDataSources);
        message.success('数据源已删除');

        // 触发实时验证
        setTimeout(() => {
          triggerValidation();
        }, 100);
      },
    });
  }, [migratedDataSources, onUpdate, triggerValidation]);

  // 测试单个数据源
  const handleTest = useCallback(async (record: DataSourceListItem) => {
    // 检查数据源是否需要参数
    const requiredParams = getDataSourceRequiredParameters(record);

    if (requiredParams.length > 0) {
      // 如果需要参数,显示参数输入对话框
      setTestingDataSource(record);
      setParamDialogVisible(true);

      // 设置参数默认值
      const parameterDefaults: Record<string, any> = {};
      requiredParams.forEach(param => {
        if (param.defaultValue !== undefined && param.defaultValue !== null) {
          // 处理日期类型的默认值
          // @ts-ignore - 后端可能返回字符串 'Date' 或 'DateTime'
          if ((param.type === 'Date' || param.type === 'DateTime') && typeof param.defaultValue === 'string') {
            parameterDefaults[`param_${param.name}`] = dayjs(param.defaultValue);
          } else {
            parameterDefaults[`param_${param.name}`] = param.defaultValue;
          }
        }
      });

      paramForm.resetFields();
      paramForm.setFieldsValue(parameterDefaults);
      return;
    }

    // 如果不需要参数,直接测试
    await performTest(record, {});
  }, [getDataSourceRequiredParameters, paramForm]);

  // 执行测试(传入参数数据)
  const performTest = useCallback(async (record: DataSourceListItem, parameterValues: Record<string, any>) => {
    const hide = message.loading('正在测试数据源...', 0);
    try {
      // 构建包含单个数据源的临时模板
      const testTemplate = {
        version: '1.0',
        metadata: { name: 'Test Template' },
        canvas: { width: 100, height: 100, dpi: 300 },
        layoutType: 0,
        dataSources: { [record.name!]: record },
        elements: [],
        // 传递参数值
        parameters: templateParametersDict,
      };

      // 使用统一的工具函数规范化 elementType (虽然 testTemplate 的 elements 是空数组,但保持一致性)
      const normalizedTemplate = normalizeTemplateElements(testTemplate);

      // 使用批量测试API,但只传递一个数据源
      const results = await TemplateConverterTestAllDataSourcesAsync({
        ...normalizedTemplate,
        // 将参数值通过模板传递
        variables: parameterValues,
      } as any);

      hide();

      if (results && results[record.name!]) {
        setTestResult({
          name: record.name!,
          result: results[record.name!],
        });

        // 关闭参数对话框
        setParamDialogVisible(false);
      }
    } catch (error: any) {
      hide();
      message.error(error.message || '数据源测试失败');
    }
  }, [templateParametersDict]);

  // 处理参数对话框提交
  const handleParamSubmit = useCallback(async () => {
    if (!testingDataSource) return;

    try {
      const values = await paramForm.validateFields();
      const requiredParams = getDataSourceRequiredParameters(testingDataSource);

      // 收集参数值
      const parameterValues: Record<string, any> = {};
      requiredParams.forEach(param => {
        const fieldName = `param_${param.name}`;
        if (values[fieldName] !== undefined) {
          let paramValue = values[fieldName];

          // 处理日期类型：转换为ISO字符串
          // @ts-ignore - 后端可能返回字符串 'Date' 或 'DateTime'
          if ((param.type === 'Date' || param.type === 'DateTime') && dayjs.isDayjs(paramValue)) {
            paramValue = paramValue.toISOString();
          }

          parameterValues[param.name] = paramValue;
        }
      });

      console.log('[测试数据源] 参数值:', parameterValues);

      // 执行测试
      await performTest(testingDataSource, parameterValues);
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  }, [testingDataSource, paramForm, getDataSourceRequiredParameters, performTest]);

  // 批量测试所有数据源
  const handleBatchTest = useCallback(async () => {
    if (dataSourceList.length === 0) {
      message.warning('没有可测试的数据源');
      return;
    }

    const hide = message.loading(
      `正在测试 ${dataSourceList.length} 个数据源...`,
      0,
    );

    try {
      // 构建模板对象（只包含数据源）
      const testTemplate = {
        version: '1.0',
        metadata: { name: 'Test Template' },
        canvas: { width: 100, height: 100, dpi: 300 },
        layoutType: 0,
        dataSources: migratedDataSources,
        elements: [],
      };

      // 使用统一的工具函数规范化 elementType (虽然 testTemplate 的 elements 是空数组,但保持一致性)
      const normalizedTemplate = normalizeTemplateElements(testTemplate);

      const results = await TemplateConverterTestAllDataSourcesAsync(
        normalizedTemplate as any,
      );

      hide();

      if (results) {
        setBatchTestResults(results);

        // 统计结果
        const total = Object.keys(results).length;
        const success = Object.values(results).filter((r) => r.success).length;
        const failed = total - success;

        message.success(
          `测试完成：成功 ${success} 个，失败 ${failed} 个`,
          3,
        );
      }
    } catch (error: any) {
      hide();
      message.error(error.message || '批量测试失败');
    }
  }, [dataSourceList.length, migratedDataSources]);

  // 根据数据源类型获取图标
  const getDataSourceIcon = useCallback((type: DataSourceType | undefined) => {
    switch (type) {
      case DataSourceType.Array:
        return <DatabaseOutlined style={{ fontSize: 24, color: '#1890ff' }} />;
      case DataSourceType.Api:
        return <ApiOutlined style={{ fontSize: 24, color: '#52c41a' }} />;
      case DataSourceType.Sql:
        return <CloudServerOutlined style={{ fontSize: 24, color: '#fa8c16' }} />;
      default:
        return <DatabaseOutlined style={{ fontSize: 24, color: '#1890ff' }} />;
    }
  }, []);

  // 根据数据源类型获取Tag颜色
  const getDataSourceColor = useCallback((type: DataSourceType) => {
    switch (type) {
      case DataSourceType.Array:
        return 'blue';
      case DataSourceType.Api:
        return 'green';
      case DataSourceType.Sql:
        return 'orange';
      default:
        return 'blue';
    }
  }, []);

  return (
    <>
      <Card
        title="数据源配置"
        extra={
          <Space>
            {dataSourceList.length > 0 && (
              <Button
                size="small"
                icon={<ThunderboltOutlined />}
                onClick={handleBatchTest}
              >
                批量测试
              </Button>
            )}
            <Button
              type="primary"
              size="small"
              icon={<PlusOutlined />}
              onClick={handleAdd}
            >
              添加数据源
            </Button>
          </Space>
        }
        style={{ marginBottom: 16 }}
      >
        {/* 验证状态摘要 */}
        {dataSourceList.length > 0 && (
          <Row gutter={16} style={{ marginBottom: 16 }}>
            <Col span={8}>
              <Statistic
                title="数据源总数"
                value={dataSourceList.length}
                prefix={<DatabaseOutlined />}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="依赖关系"
                value={dependencyStats.totalDependencies}
                prefix={<LinkOutlined />}
                suffix={dependencyStats.hasCycles ? (
                  <Tag color="error" style={{ marginLeft: 8 }}>循环依赖</Tag>
                ) : null}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="验证状态"
                value={dataSourceValidationResult?.hasErrors ? '错误' : '正常'}
                valueStyle={{
                  color: dataSourceValidationResult?.hasErrors ? '#ff4d4f' : '#52c41a'
                }}
                prefix={
                  dataSourceValidationResult?.hasErrors ? (
                    <ExclamationCircleOutlined />
                  ) : (
                    <CheckCircleOutlined />
                  )
                }
              />
            </Col>
          </Row>
        )}

        {/* 验证错误提示 */}
        {dataSourceValidationResult?.hasErrors && (
          <Alert
            type="error"
            message={`发现 ${dataSourceValidationResult.errorCount} 个错误`}
            description={
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {dataSourceValidationResult.errors.slice(0, 5).map((error: any, idx: number) => (
                  <li key={idx}>{error.message || JSON.stringify(error)}</li>
                ))}
                {dataSourceValidationResult.errorCount > 5 && (
                  <li>... 还有 {dataSourceValidationResult.errorCount - 5} 个错误</li>
                )}
              </ul>
            }
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}

        {/* 循环依赖警告 */}
        {dependencyStats.hasCycles && !warningAlertClosed && (
          <Alert
            type="warning"
            message="检测到循环依赖"
            description="数据源之间存在循环依赖关系，可能导致执行失败"
            showIcon
            icon={<WarningOutlined />}
            closable
            onClose={() => setWarningAlertClosed(true)}
            style={{ marginBottom: 16 }}
          />
        )}

        {/* 数据源列表 */}
        <List
          dataSource={dataSourceList}
          locale={{ emptyText: '暂无数据源' }}
          renderItem={(item) => {
            const hasError = hasDataSourceError(item.name!);
            const depCount = getDataSourceDependencyCount(item.name!);

            return (
              <List.Item
                actions={[
                  <Button
                    key="edit"
                    size="small"
                    type="text"
                    icon={<EditOutlined />}
                    onClick={() => handleEdit(item)}
                    title="编辑"
                  />,
                  <Button
                    key="test"
                    size="small"
                    type="text"
                    icon={<PlayCircleOutlined />}
                    onClick={() => handleTest(item)}
                    title="测试"
                  />,
                  <Button
                    key="delete"
                    size="small"
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(item.name!)}
                    title="删除"
                  />,
                ]}
                style={{
                  backgroundColor: hasError ? '#fff1f0' : undefined,
                  borderLeft: hasError ? '3px solid #ff4d4f' : undefined,
                }}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      icon={getDataSourceIcon(item.type)}
                      style={{ backgroundColor: 'transparent' }}
                    />
                  }
                  title={
                    <Space>
                      <span style={{ fontWeight: 'bold' }}>
                        {item.name}
                        {hasError && (
                          <ExclamationCircleOutlined
                            style={{ color: '#ff4d4f', marginLeft: 8 }}
                          />
                        )}
                      </span>
                      <Tag color={getDataSourceColor(item.type)}>
                        {getDataSourceTypeName(item.type)}
                      </Tag>
                      {depCount > 0 && (
                        <Tag color="cyan" icon={<LinkOutlined />}>
                          {depCount} 个依赖
                        </Tag>
                      )}
                    </Space>
                  }
                />
              </List.Item>
            );
          }}
        />
      </Card>

      {/* 数据源配置表单弹窗 */}
      <DataSourceFormModal
        visible={editModalVisible}
        dataSource={editingSource}
        allDataSources={dataSourceList}
        templateParameters={templateParameters}
        onSave={handleSave}
        onCancel={() => {
          setEditModalVisible(false);
          setEditingSource(null);
        }}
      />

      {/* 单个测试结果弹窗 */}
      {testResult && (
        <TestResultModal
          visible={!!testResult}
          result={testResult.result}
          dataSourceName={testResult.name}
          onClose={() => setTestResult(null)}
        />
      )}

      {/* 批量测试结果弹窗 */}
      {batchTestResults && (
        <BatchTestResultModal
          visible={!!batchTestResults}
          results={batchTestResults}
          onClose={() => setBatchTestResults(null)}
        />
      )}

      {/* 参数输入对话框 */}
      <Modal
        title="输入测试参数"
        open={paramDialogVisible}
        onOk={handleParamSubmit}
        onCancel={() => {
          setParamDialogVisible(false);
          setTestingDataSource(null);
        }}
        width={500}
        okText="确定"
        cancelText="取消"
      >
        <Form
          form={paramForm}
          layout="vertical"
        >
          {/* 提示信息 */}
          {testingDataSource && (
            <div style={{ marginBottom: 16, color: '#666' }}>
              数据源 "<strong>{testingDataSource.name}</strong>" 需要以下参数:
            </div>
          )}

          {/* 参数输入区域 */}
          {testingDataSource && getDataSourceRequiredParameters(testingDataSource).map(param => {
            const fieldName = `param_${param.name}`;
            const isRequired = param.required ?? false;

            // 根据参数类型渲染不同的输入组件
            let inputComponent: React.ReactNode;

            // @ts-ignore - 后端返回的参数类型可能是字符串
            switch (param.type) {
              case 'String':
                inputComponent = (
                  <Input
                    placeholder={`请输入${param.label || param.name}`}
                    maxLength={param.constraints?.maxLength}
                  />
                );
                break;

              case 'Number':
              case 'Integer':
                inputComponent = (
                  <InputNumber
                    placeholder={`请输入${param.label || param.name}`}
                    min={param.constraints?.min}
                    max={param.constraints?.max}
                    precision={param.type === 'Integer' ? 0 : undefined}
                    style={{ width: '100%' }}
                  />
                );
                break;

              case 'Boolean':
                inputComponent = (
                  <Switch
                    checkedChildren="是"
                    unCheckedChildren="否"
                  />
                );
                break;

              case 'Date':
                inputComponent = (
                  <DatePicker
                    placeholder={`请选择${param.label || param.name}`}
                    format="YYYY-MM-DD"
                    style={{ width: '100%' }}
                  />
                );
                break;

              case 'DateTime':
                inputComponent = (
                  <DatePicker
                    showTime
                    placeholder={`请选择${param.label || param.name}`}
                    format="YYYY-MM-DD HH:mm:ss"
                    style={{ width: '100%' }}
                  />
                );
                break;

              default:
                inputComponent = (
                  <Input placeholder={`请输入${param.label || param.name}`} />
                );
            }

            return (
              <Form.Item
                key={param.name}
                name={fieldName}
                label={param.label || param.name}
                rules={[
                  {
                    required: isRequired,
                    message: `请输入${param.label || param.name}`,
                  },
                ]}
                extra={param.description}
                // @ts-ignore - 后端可能返回字符串 'Boolean'
                valuePropName={param.type === 'Boolean' ? 'checked' : 'value'}
              >
                {inputComponent}
              </Form.Item>
            );
          })}
        </Form>
      </Modal>
    </>
  );
};
