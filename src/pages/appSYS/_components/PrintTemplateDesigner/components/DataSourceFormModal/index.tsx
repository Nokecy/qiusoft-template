/**
 * DataSourceFormModal - 数据源配置表单弹窗
 *
 * 功能特性:
 * 1. 三个标签页组织: 基本配置、参数映射、依赖关系
 * 2. 支持Array/API/SQL三种数据源类型
 * 3. 集成参数映射编辑器
 * 4. 显示依赖关系和循环依赖检测
 * 5. 保存前完整验证(基本配置+参数映射)
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Modal,
  Form,
  Input,
  Select,
  Tabs,
  Alert,
  Tag,
  Space,
  Typography,
  message,
} from 'antd';
import {
  DatabaseOutlined,
  LinkOutlined,
  PartitionOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import {
  DataSourceType,
  type AtlDataSource,
  type AtlDataSourceWithDependency,
} from '../../types';
import { ArrayDataSourceForm } from '../forms/ArrayDataSourceForm';
import { ApiDataSourceForm } from '../forms/ApiDataSourceForm';
import { SqlDataSourceForm } from '../forms/SqlDataSourceForm';
import { ParameterMappingEditor } from '../ParameterMappingEditor';
import { validateDataSource, getDataSourceTypeName } from '../../utils/dataSourceUtils';
import type {
  DataSourceFormModalProps,
  DataSourceFormData,
  DependencyInfo,
  ValidationResult,
} from './types';
import type { ParameterMapping } from '../../types/dataSourceParameter';
import styles from './styles.module.less';

const { Text, Title } = Typography;

/**
 * 表单配置数据类型(包含UI专用字段)
 */
interface FormConfigData extends Partial<AtlDataSource> {
  /** UI专用: Array类型的JSON字符串 */
  dataJson?: string;
  /** UI专用: API接口地址(别名) */
  apiEndpoint?: string;
}

/**
 * 分析数据源依赖关系
 */
function analyzeDependencies(
  dataSource: AtlDataSourceWithDependency,
  allDataSources: AtlDataSource[]
): DependencyInfo {
  const dependsOnDataSources: string[] = [];
  const dependsOnParameters: string[] = [];

  // 从参数映射中提取依赖
  const paramMappings = dataSource.parameterMappings || {};
  Object.values(paramMappings).forEach((expression: string) => {
    // 提取模板参数引用: $parameters.xxx
    const paramMatches = expression.match(/\$parameters\.([a-zA-Z_][a-zA-Z0-9_]*)/g);
    if (paramMatches) {
      paramMatches.forEach((match) => {
        const paramName = match.replace('$parameters.', '');
        if (!dependsOnParameters.includes(paramName)) {
          dependsOnParameters.push(paramName);
        }
      });
    }

    // 提取数据源引用: $dataSources.xxx.yyy
    const dsMatches = expression.match(/\$dataSources\.([a-zA-Z_][a-zA-Z0-9_]*)/g);
    if (dsMatches) {
      dsMatches.forEach((match) => {
        const dsName = match.replace(/\$dataSources\.([a-zA-Z_][a-zA-Z0-9_]*).*/, '$1');
        if (!dependsOnDataSources.includes(dsName) && dsName !== dataSource.name) {
          dependsOnDataSources.push(dsName);
        }
      });
    }
  });

  // 检测循环依赖
  const hasCircularDependency = detectCircularDependency(
    dataSource.name || '',
    dependsOnDataSources,
    allDataSources
  );

  return {
    dependsOnDataSources,
    dependsOnParameters,
    hasCircularDependency: hasCircularDependency.hasCircular,
    circularPath: hasCircularDependency.path,
  };
}

/**
 * 检测循环依赖
 */
function detectCircularDependency(
  currentDsName: string,
  dependencies: string[],
  allDataSources: AtlDataSource[]
): { hasCircular: boolean; path?: string[] } {
  const visited = new Set<string>();
  const path: string[] = [currentDsName];

  function dfs(dsName: string): boolean {
    if (visited.has(dsName)) {
      if (path.includes(dsName)) {
        // 找到循环
        const circleStart = path.indexOf(dsName);
        return true;
      }
      return false;
    }

    visited.add(dsName);
    path.push(dsName);

    // 查找该数据源的依赖
    const ds = allDataSources.find((d) => d.name === dsName);
    if (ds) {
      // 类型转换: 如果有 parameterMappings 属性,说明是 AtlDataSourceWithDependency
      const dsWithDep = ds as AtlDataSourceWithDependency;
      if (dsWithDep.parameterMappings) {
        const depNames = extractDataSourceDependencies(dsWithDep.parameterMappings);
        for (const depName of depNames) {
          if (dfs(depName)) {
            return true;
          }
        }
      }
    }

    path.pop();
    return false;
  }

  for (const dep of dependencies) {
    if (dfs(dep)) {
      return { hasCircular: true, path };
    }
  }

  return { hasCircular: false };
}

/**
 * 从参数映射中提取数据源依赖
 */
function extractDataSourceDependencies(
  paramMappings: Record<string, string>
): string[] {
  const dependencies: string[] = [];

  Object.values(paramMappings).forEach((expression: string) => {
    const matches = expression.match(/\$dataSources\.([a-zA-Z_][a-zA-Z0-9_]*)/g);
    if (matches) {
      matches.forEach((match) => {
        const dsName = match.replace(/\$dataSources\.([a-zA-Z_][a-zA-Z0-9_]*).*/, '$1');
        if (!dependencies.includes(dsName)) {
          dependencies.push(dsName);
        }
      });
    }
  });

  return dependencies;
}

/**
 * 验证参数映射
 */
function validateParameterMappings(
  paramMappings: Record<string, string>,
  templateParameters: string[],
  availableDataSources: string[]
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  Object.entries(paramMappings).forEach(([paramName, expression]) => {
    if (!expression) {
      warnings.push(`参数 "${paramName}" 未配置映射`);
      return;
    }

    // 验证模板参数引用
    const paramMatches = expression.match(/\$parameters\.([a-zA-Z_][a-zA-Z0-9_]*)/g);
    if (paramMatches) {
      paramMatches.forEach((match) => {
        const refParamName = match.replace('$parameters.', '');
        if (!templateParameters.includes(refParamName)) {
          errors.push(`参数 "${paramName}" 引用的模板参数 "${refParamName}" 不存在`);
        }
      });
    }

    // 验证数据源引用
    const dsMatches = expression.match(/\$dataSources\.([a-zA-Z_][a-zA-Z0-9_]*)/g);
    if (dsMatches) {
      dsMatches.forEach((match) => {
        const refDsName = match.replace(/\$dataSources\.([a-zA-Z_][a-zA-Z0-9_]*).*/, '$1');
        if (!availableDataSources.includes(refDsName)) {
          errors.push(`参数 "${paramName}" 引用的数据源 "${refDsName}" 不存在`);
        }
      });
    }

    // 验证Scriban表达式格式
    if (expression.startsWith('{{') && expression.endsWith('}}')) {
      const content = expression.slice(2, -2).trim();
      if (!content) {
        errors.push(`参数 "${paramName}" 的Scriban表达式内容为空`);
      }
    }
  });

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * DataSourceFormModal组件
 */
export const DataSourceFormModal: React.FC<DataSourceFormModalProps> = ({
  visible,
  dataSource,
  allDataSources,
  templateParameters,
  onSave,
  onCancel,
}) => {
  const [form] = Form.useForm<DataSourceFormData>();
  const [activeTab, setActiveTab] = useState('basic');
  const [currentType, setCurrentType] = useState<DataSourceType>(
    dataSource?.type || DataSourceType.Array
  );
  const [configData, setConfigData] = useState<FormConfigData>({});
  const [parameterMappings, setParameterMappings] = useState<Record<string, string>>({});

  // 初始化表单
  useEffect(() => {
    if (visible && dataSource) {
      form.setFieldsValue({
        name: dataSource.name || '',
        type: dataSource.type || DataSourceType.Array,
      });
      setCurrentType(dataSource.type || DataSourceType.Array);
      setConfigData(dataSource);

      // 尝试从 AtlDataSourceWithDependency 获取 parameterMappings
      const dsWithDep = dataSource as AtlDataSourceWithDependency;
      setParameterMappings(dsWithDep.parameterMappings || {});
      setActiveTab('basic');
    } else if (visible) {
      form.resetFields();
      setCurrentType(DataSourceType.Array);
      setConfigData({});
      setParameterMappings({});
      setActiveTab('basic');
    }
  }, [visible, dataSource, form]);

  // 数据源参数列表
  const dataSourceParameters = useMemo<string[]>(() => {
    if (!dataSource || !dataSource.parameters) return [];
    return dataSource.parameters.map((p) => p.name || '').filter(Boolean);
  }, [dataSource]);

  // 可用的模板参数名称列表
  const availableTemplateParameters = useMemo<string[]>(() => {
    return templateParameters.map((p) => p.name).filter(Boolean);
  }, [templateParameters]);

  // 可用的数据源列表(用于参数映射)
  const availableDataSources = useMemo(() => {
    return allDataSources
      .filter((ds) => ds.name && ds.name !== dataSource?.name)
      .map((ds) => ({
        name: ds.name!,
        fields: ds.parameters?.map((p) => p.name || '').filter(Boolean),
      }));
  }, [allDataSources, dataSource?.name]);

  // 依赖关系信息
  const dependencyInfo = useMemo<DependencyInfo>(() => {
    if (!dataSource) {
      return {
        dependsOnDataSources: [],
        dependsOnParameters: [],
        hasCircularDependency: false,
      };
    }

    // 构建包含当前参数映射的临时数据源对象
    const tempDs: AtlDataSourceWithDependency = {
      ...dataSource,
      parameterMappings,
    };

    return analyzeDependencies(tempDs, allDataSources);
  }, [dataSource, parameterMappings, allDataSources]);

  // 参数映射验证结果
  const mappingValidation = useMemo<ValidationResult>(() => {
    if (dataSourceParameters.length === 0) {
      return { valid: true, errors: [] };
    }

    return validateParameterMappings(
      parameterMappings,
      availableTemplateParameters,
      availableDataSources.map((ds) => ds.name)
    );
  }, [parameterMappings, availableTemplateParameters, availableDataSources, dataSourceParameters]);

  // 类型切换处理
  const handleTypeChange = useCallback((type: DataSourceType) => {
    setCurrentType(type);
    setConfigData({});
  }, []);

  // 配置数据变化
  const handleConfigChange = useCallback((newConfig: FormConfigData) => {
    setConfigData((prev) => ({ ...prev, ...newConfig }));
  }, []);

  // 参数映射更新
  const handleMappingUpdate = useCallback(
    (paramName: string, mapping: ParameterMapping) => {
      setParameterMappings((prev) => ({
        ...prev,
        [paramName]: mapping.referenceExpression,
      }));
    },
    []
  );

  // 参数映射删除
  const handleMappingRemove = useCallback((paramName: string) => {
    setParameterMappings((prev) => {
      const newMappings = { ...prev };
      delete newMappings[paramName];
      return newMappings;
    });
  }, []);

  // 保存处理
  const handleOk = useCallback(async () => {
    try {
      // 1. 验证基础字段
      const baseValues = await form.validateFields();

      // 2. 构建基础数据源对象(不含parameterMappings)
      let finalDataSource: AtlDataSource = {
        name: baseValues.name,
        type: currentType,
        parameters: dataSource?.parameters || [],
      };

      // 3. 根据类型合并配置数据
      switch (currentType) {
        case DataSourceType.Array:
          if (!configData.dataJson) {
            message.error('请输入数组数据');
            return;
          }
          try {
            finalDataSource.data = JSON.parse(configData.dataJson as string);
          } catch (error) {
            message.error('数组数据JSON格式错误');
            return;
          }
          break;

        case DataSourceType.Api:
          const apiUrl = configData.url || configData.apiEndpoint;
          if (!apiUrl) {
            message.error('请输入API接口地址');
            return;
          }

          finalDataSource.url = apiUrl;
          finalDataSource.method = configData.method || 'GET';

          if (configData.headers && typeof configData.headers === 'string') {
            try {
              finalDataSource.headers = JSON.parse(configData.headers);
            } catch {
              finalDataSource.headers = {};
            }
          } else {
            finalDataSource.headers = configData.headers;
          }

          if (configData.auth) {
            finalDataSource.auth = configData.auth;
          }

          finalDataSource.timeoutSeconds = configData.timeoutSeconds ?? 30;

          if (configData.method === 'POST' || configData.method === 'PUT') {
            if (configData.body) {
              finalDataSource.body = configData.body;
            }
            if (configData.contentType) {
              finalDataSource.contentType = configData.contentType;
            }
          }

          finalDataSource.cache = configData.cache;
          break;

        case DataSourceType.Sql:
          if (!configData.connectionString) {
            message.error('请输入数据库连接字符串');
            return;
          }
          if (!configData.query) {
            message.error('请输入SQL查询语句');
            return;
          }

          finalDataSource.connectionString = configData.connectionString;
          finalDataSource.query = configData.query;
          finalDataSource.databaseType = configData.databaseType;
          break;
      }

      // 4. 验证数据源
      const dsValidation = validateDataSource(finalDataSource);
      if (!dsValidation.valid) {
        message.error(dsValidation.errors[0]);
        return;
      }

      // 5. 验证参数映射
      if (!mappingValidation.valid) {
        Modal.error({
          title: '参数映射验证失败',
          content: (
            <div>
              {mappingValidation.errors.map((error, idx) => (
                <div key={idx} style={{ color: '#ff4d4f', marginBottom: 4 }}>
                  • {error}
                </div>
              ))}
            </div>
          ),
        });
        setActiveTab('mapping');
        return;
      }

      // 6. 检查循环依赖
      if (dependencyInfo.hasCircularDependency) {
        Modal.error({
          title: '存在循环依赖',
          content: (
            <div>
              <div style={{ marginBottom: 8 }}>检测到循环依赖,无法保存:</div>
              <div
                style={{
                  fontFamily: 'monospace',
                  background: '#fff1f0',
                  padding: 8,
                  borderRadius: 4,
                  border: '1px solid #ffccc7',
                }}
              >
                {dependencyInfo.circularPath?.join(' → ')}
              </div>
            </div>
          ),
        });
        setActiveTab('dependency');
        return;
      }

      // 7. 添加参数映射并保存
      const finalDataSourceWithDep: AtlDataSource = {
        ...finalDataSource,
        // 通过类型断言添加parameterMappings
        ...(Object.keys(parameterMappings).length > 0
          ? { parameterMappings }
          : {}),
      } as AtlDataSource;

      onSave(finalDataSourceWithDep);
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  }, [
    form,
    currentType,
    configData,
    parameterMappings,
    dataSource?.parameters,
    mappingValidation,
    dependencyInfo,
    onSave,
  ]);

  // 渲染配置表单
  const renderConfigForm = useCallback(() => {
    switch (currentType) {
      case DataSourceType.Array:
        return (
          <ArrayDataSourceForm
            value={configData as AtlDataSource}
            onChange={handleConfigChange}
          />
        );

      case DataSourceType.Api:
        return (
          <ApiDataSourceForm
            value={configData as AtlDataSource}
            onChange={handleConfigChange}
          />
        );

      case DataSourceType.Sql:
        return (
          <SqlDataSourceForm
            value={configData as AtlDataSource}
            onChange={handleConfigChange}
          />
        );

      default:
        return null;
    }
  }, [currentType, configData, handleConfigChange]);

  // 渲染依赖关系标签页
  const renderDependencyTab = useCallback(() => {
    return (
      <div className={styles.tabContent}>
        {/* 循环依赖警告 */}
        {dependencyInfo.hasCircularDependency && (
          <div className={styles.circularWarning}>
            <div className={styles.warningTitle}>
              <ExclamationCircleOutlined />
              检测到循环依赖
            </div>
            <div className={styles.circularPath}>
              {dependencyInfo.circularPath?.join(' → ')}
            </div>
          </div>
        )}

        {/* 验证摘要 */}
        {!dependencyInfo.hasCircularDependency && (
          <div
            className={`${styles.validationSummary} ${
              mappingValidation.valid ? styles.success : styles.error
            }`}
          >
            <div className={styles.summaryHeader}>
              {mappingValidation.valid ? (
                <CheckCircleOutlined className={styles.summaryIcon} />
              ) : (
                <WarningOutlined className={styles.summaryIcon} />
              )}
              <span>
                {mappingValidation.valid
                  ? '依赖关系正常,可以保存'
                  : `发现 ${mappingValidation.errors.length} 个错误`}
              </span>
            </div>
            {!mappingValidation.valid && (
              <div className={styles.summaryText}>
                请在"参数映射"标签页中修复错误
              </div>
            )}
          </div>
        )}

        {/* 依赖的数据源 */}
        <div className={styles.dependencyInfo}>
          <div className={styles.dependencySection}>
            <div className={styles.sectionTitle}>
              <DatabaseOutlined />
              依赖的数据源
            </div>
            {dependencyInfo.dependsOnDataSources.length > 0 ? (
              <div className={styles.tagList}>
                {dependencyInfo.dependsOnDataSources.map((dsName) => (
                  <Tag key={dsName} color="blue">
                    {dsName}
                  </Tag>
                ))}
              </div>
            ) : (
              <div className={styles.emptyText}>无依赖</div>
            )}
          </div>

          {/* 依赖的模板参数 */}
          <div className={styles.dependencySection}>
            <div className={styles.sectionTitle}>
              <LinkOutlined />
              依赖的模板参数
            </div>
            {dependencyInfo.dependsOnParameters.length > 0 ? (
              <div className={styles.tagList}>
                {dependencyInfo.dependsOnParameters.map((paramName) => (
                  <Tag key={paramName} color="green">
                    {paramName}
                  </Tag>
                ))}
              </div>
            ) : (
              <div className={styles.emptyText}>无依赖</div>
            )}
          </div>
        </div>
      </div>
    );
  }, [dependencyInfo, mappingValidation]);

  return (
    <Modal
      title={dataSource?.name ? '编辑数据源' : '添加数据源'}
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      width={1000}
      okText="保存"
      cancelText="取消"
      destroyOnClose
      style={{ top: 20 }}
      className={styles.dataSourceFormModal}
    >
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        type="card"
        items={[
          {
            key: 'basic',
            label: (
              <span>
                <DatabaseOutlined />
                基本配置
              </span>
            ),
            children: (
              <div className={styles.tabContent}>
                <Form form={form} layout="vertical">
                  <Form.Item
                    label="数据源名称"
                    name="name"
                    rules={[
                      { required: true, message: '请输入数据源名称' },
                      {
                        pattern: /^[a-zA-Z_][a-zA-Z0-9_]*$/,
                        message: '名称必须以字母或下划线开头,只能包含字母、数字和下划线',
                      },
                    ]}
                    tooltip="数据源的唯一标识符,在模板中引用时使用"
                  >
                    <Input
                      placeholder="例如: products, orders"
                      disabled={!!dataSource?.name}
                    />
                  </Form.Item>

                  <Form.Item
                    label="数据源类型"
                    name="type"
                    rules={[{ required: true, message: '请选择数据源类型' }]}
                  >
                    <Select onChange={handleTypeChange}>
                      <Select.Option value={DataSourceType.Array}>
                        {getDataSourceTypeName(DataSourceType.Array)} - 静态数据
                      </Select.Option>
                      <Select.Option value={DataSourceType.Api}>
                        {getDataSourceTypeName(DataSourceType.Api)} - REST接口
                      </Select.Option>
                      <Select.Option value={DataSourceType.Sql}>
                        {getDataSourceTypeName(DataSourceType.Sql)} - 数据库查询
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </Form>

                {/* 根据类型显示对应的配置表单 */}
                <div style={{ marginTop: 16 }}>{renderConfigForm()}</div>
              </div>
            ),
          },
          {
            key: 'mapping',
            label: (
              <span>
                <LinkOutlined />
                参数映射
                {!mappingValidation.valid && (
                  <Tag color="error" style={{ marginLeft: 8 }}>
                    {mappingValidation.errors.length}
                  </Tag>
                )}
              </span>
            ),
            children: (
              <div className={styles.tabContent}>
                {dataSourceParameters.length > 0 ? (
                  <>
                    {!mappingValidation.valid && (
                      <Alert
                        type="error"
                        message="参数映射验证失败"
                        description={
                          <ul style={{ margin: 0, paddingLeft: 20 }}>
                            {mappingValidation.errors.map((error, idx) => (
                              <li key={idx}>{error}</li>
                            ))}
                          </ul>
                        }
                        showIcon
                        style={{ marginBottom: 16 }}
                      />
                    )}
                    <ParameterMappingEditor
                      dataSourceId={dataSource?.name || '新数据源'}
                      dataSourceParameters={dataSourceParameters}
                      parameterMappings={parameterMappings}
                      availableTemplateParameters={availableTemplateParameters}
                      availableDataSources={availableDataSources}
                      onUpdate={handleMappingUpdate}
                      onRemove={handleMappingRemove}
                    />
                  </>
                ) : (
                  <Alert
                    type="info"
                    message="此数据源没有参数"
                    description="请在基本配置中添加数据源参数后,再配置参数映射"
                    showIcon
                  />
                )}
              </div>
            ),
          },
          {
            key: 'dependency',
            label: (
              <span>
                <PartitionOutlined />
                依赖关系
                {dependencyInfo.hasCircularDependency && (
                  <Tag color="error" style={{ marginLeft: 8 }}>
                    循环依赖
                  </Tag>
                )}
              </span>
            ),
            children: renderDependencyTab(),
          },
        ]}
      />
    </Modal>
  );
};

export default DataSourceFormModal;
