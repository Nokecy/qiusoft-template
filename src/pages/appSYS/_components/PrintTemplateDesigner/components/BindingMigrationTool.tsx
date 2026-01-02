/**
 * PropertyBinding迁移工具组件
 * 用于将旧格式的模板转换为新的PropertyBinding格式
 */

import React, { useState, useMemo } from 'react';
import { Modal, Steps, Alert, Table, Space, Button, Typography, Tag, Collapse, Descriptions, message } from 'antd';
import { CheckCircleOutlined, WarningOutlined, InfoCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { AtlTemplate, BindingMode } from '../types';
import {
  detectLegacyBindings,
  migrateTemplate,
  validateMigration,
  calculateMigrationStats,
  LegacyBindingInfo,
  MigrationStats,
} from '../utils/bindingMigration';

const { Step } = Steps;
const { Text, Title, Paragraph } = Typography;
const { Panel } = Collapse;

interface BindingMigrationToolProps {
  /** 是否显示 */
  visible: boolean;
  /** 原始模板 */
  template: AtlTemplate;
  /** 关闭回调 */
  onClose: () => void;
  /** 转换完成回调 */
  onMigrated: (migratedTemplate: AtlTemplate) => void;
}

/**
 * PropertyBinding迁移工具组件
 */
const BindingMigrationTool: React.FC<BindingMigrationToolProps> = ({
  visible,
  template,
  onClose,
  onMigrated,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [migratedTemplate, setMigratedTemplate] = useState<AtlTemplate | null>(null);
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    errors: string[];
    warnings: string[];
  } | null>(null);

  // 检测旧格式字段
  const legacyBindings = useMemo(() => {
    return detectLegacyBindings(template);
  }, [template]);

  // 计算统计信息
  const stats = useMemo(() => {
    return calculateMigrationStats(legacyBindings);
  }, [legacyBindings]);

  // 重置状态
  const handleReset = () => {
    setCurrentStep(0);
    setMigratedTemplate(null);
    setValidationResult(null);
  };

  // 执行迁移
  const handleMigrate = () => {
    try {
      const migrated = migrateTemplate(template);
      setMigratedTemplate(migrated);

      // 验证迁移结果
      const validation = validateMigration(template, migrated);
      setValidationResult(validation);

      setCurrentStep(2);

      if (validation.isValid) {
        message.success('迁移成功！');
      } else {
        message.warning('迁移完成，但存在一些问题，请检查验证结果');
      }
    } catch (error) {
      message.error(`迁移失败: ${error instanceof Error ? error.message : '未知错误'}`);
      console.error('迁移错误:', error);
    }
  };

  // 应用迁移结果
  const handleApply = () => {
    if (migratedTemplate) {
      onMigrated(migratedTemplate);
      message.success('已应用迁移结果');
      onClose();
      handleReset();
    }
  };

  // 取消
  const handleCancel = () => {
    onClose();
    handleReset();
  };

  // 转换类型标签
  const getConversionTypeTag = (type: string) => {
    const tagConfig: Record<string, { color: string; label: string }> = {
      static: { color: 'default', label: '静态值' },
      dataPath: { color: 'blue', label: '数据路径' },
      expression: { color: 'green', label: '表达式' },
      condition: { color: 'orange', label: '条件' },
    };

    const config = tagConfig[type] || { color: 'default', label: type };
    return <Tag color={config.color}>{config.label}</Tag>;
  };

  // 绑定模式标签
  const getBindingModeTag = (mode: BindingMode) => {
    const modeConfig: Record<BindingMode, { color: string; label: string }> = {
      [BindingMode.Static]: { color: 'default', label: 'Static' },
      [BindingMode.DataPath]: { color: 'blue', label: 'DataPath' },
      [BindingMode.Expression]: { color: 'green', label: 'Expression' },
    };

    const config = modeConfig[mode];
    return <Tag color={config.color}>{config.label}</Tag>;
  };

  // 渲染检测步骤
  const renderDetectStep = () => (
    <div style={{ marginTop: 24 }}>
      {legacyBindings.length === 0 ? (
        <Alert
          message="未发现需要迁移的字段"
          description="当前模板已使用新的PropertyBinding格式，无需迁移。"
          type="success"
          icon={<CheckCircleOutlined />}
          showIcon
        />
      ) : (
        <>
          <Alert
            message={`发现 ${stats.legacyFields} 个需要迁移的字段`}
            description="点击下一步查看转换预览"
            type="warning"
            icon={<WarningOutlined />}
            showIcon
            style={{ marginBottom: 16 }}
          />

          <Descriptions title="统计信息" bordered size="small" column={2}>
            <Descriptions.Item label="总字段数">{stats.totalFields}</Descriptions.Item>
            <Descriptions.Item label="需要迁移">{stats.legacyFields}</Descriptions.Item>
            <Descriptions.Item label="静态值">{stats.byType.static || 0}</Descriptions.Item>
            <Descriptions.Item label="数据路径">{stats.byType.dataPath || 0}</Descriptions.Item>
            <Descriptions.Item label="表达式">{stats.byType.expression || 0}</Descriptions.Item>
            <Descriptions.Item label="条件">{stats.byType.condition || 0}</Descriptions.Item>
          </Descriptions>
        </>
      )}
    </div>
  );

  // 渲染预览步骤
  const renderPreviewStep = () => (
    <div style={{ marginTop: 24 }}>
      <Alert
        message="转换预览"
        description="以下是将要进行的转换操作，请仔细检查"
        type="info"
        icon={<InfoCircleOutlined />}
        showIcon
        style={{ marginBottom: 16 }}
      />

      <Table
        dataSource={legacyBindings}
        rowKey={(record) => `${record.elementId}-${record.property}`}
        pagination={{ pageSize: 10 }}
        size="small"
        columns={[
          {
            title: '元素ID',
            dataIndex: 'elementId',
            width: 120,
            render: (text: string) => <Text code>{text}</Text>,
          },
          {
            title: '元素类型',
            dataIndex: 'elementType',
            width: 100,
          },
          {
            title: '属性',
            dataIndex: 'property',
            width: 150,
            render: (text: string) => <Text strong>{text}</Text>,
          },
          {
            title: '旧值',
            dataIndex: 'oldValue',
            width: 200,
            render: (value: any) => (
              <Text ellipsis={{ tooltip: JSON.stringify(value, null, 2) }} style={{ maxWidth: 180 }}>
                {typeof value === 'string' ? value : JSON.stringify(value)}
              </Text>
            ),
          },
          {
            title: '转换类型',
            dataIndex: 'conversionType',
            width: 100,
            render: (type: string) => getConversionTypeTag(type),
          },
          {
            title: '新值预览',
            dataIndex: 'newValue',
            render: (value: any) => (
              <Collapse ghost>
                <Panel header="查看详情" key="1">
                  <Descriptions size="small" column={1} bordered>
                    <Descriptions.Item label="模式">
                      {getBindingModeTag(value.mode)}
                    </Descriptions.Item>
                    {value.staticValue !== undefined && (
                      <Descriptions.Item label="静态值">
                        <Text code>{JSON.stringify(value.staticValue)}</Text>
                      </Descriptions.Item>
                    )}
                    {value.dataPath && (
                      <Descriptions.Item label="数据路径">
                        <Text code>{value.dataPath}</Text>
                      </Descriptions.Item>
                    )}
                    {value.expression && (
                      <Descriptions.Item label="表达式">
                        <Text code>{value.expression}</Text>
                      </Descriptions.Item>
                    )}
                    {value.description && (
                      <Descriptions.Item label="说明">{value.description}</Descriptions.Item>
                    )}
                  </Descriptions>
                </Panel>
              </Collapse>
            ),
          },
        ]}
      />
    </div>
  );

  // 渲染执行步骤
  const renderExecuteStep = () => (
    <div style={{ marginTop: 24 }}>
      {validationResult && (
        <>
          {validationResult.isValid ? (
            <Alert
              message="迁移成功"
              description="所有字段已成功转换为PropertyBinding格式"
              type="success"
              icon={<CheckCircleOutlined />}
              showIcon
              style={{ marginBottom: 16 }}
            />
          ) : (
            <Alert
              message="迁移完成（有警告）"
              description="迁移已完成，但发现一些问题，请检查下方详情"
              type="warning"
              icon={<WarningOutlined />}
              showIcon
              style={{ marginBottom: 16 }}
            />
          )}

          {validationResult.errors.length > 0 && (
            <Alert
              message="错误信息"
              description={
                <ul>
                  {validationResult.errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              }
              type="error"
              style={{ marginBottom: 16 }}
            />
          )}

          {validationResult.warnings.length > 0 && (
            <Alert
              message="警告信息"
              description={
                <ul>
                  {validationResult.warnings.map((warning, index) => (
                    <li key={index}>{warning}</li>
                  ))}
                </ul>
              }
              type="warning"
              style={{ marginBottom: 16 }}
            />
          )}

          <Descriptions title="迁移结果" bordered size="small" column={2}>
            <Descriptions.Item label="原始元素数">
              {template.elements.length}
            </Descriptions.Item>
            <Descriptions.Item label="迁移后元素数">
              {migratedTemplate?.elements.length || 0}
            </Descriptions.Item>
            <Descriptions.Item label="迁移字段数">{stats.totalFields}</Descriptions.Item>
            <Descriptions.Item label="成功迁移">
              {validationResult.isValid ? stats.totalFields : '部分'}
            </Descriptions.Item>
          </Descriptions>
        </>
      )}
    </div>
  );

  // 步骤内容
  const stepContent = [
    renderDetectStep(),
    renderPreviewStep(),
    renderExecuteStep(),
  ];

  return (
    <Modal
      title="PropertyBinding迁移工具"
      open={visible}
      onCancel={handleCancel}
      width={1000}
      footer={null}
      destroyOnClose
    >
      <div style={{ padding: '16px 0' }}>
        <Paragraph>
          此工具用于将旧格式的模板转换为新的PropertyBinding格式。转换过程包括：
        </Paragraph>
        <ul>
          <li>将string类型的text/content字段转换为PropertyBinding.Static</li>
          <li>将 &#123;&#123; variable &#125;&#125; 模板语法转换为DataPath或Expression</li>
          <li>将condition字段转换为visible的PropertyBinding</li>
          <li>将旧的dataBinding字段迁移到对应的properties字段</li>
        </ul>

        <Steps current={currentStep} style={{ marginTop: 24 }}>
          <Step title="检测" description="检测旧格式字段" />
          <Step title="预览" description="查看转换结果" />
          <Step title="执行" description="应用转换" />
        </Steps>

        {stepContent[currentStep]}

        <Space style={{ marginTop: 24, width: '100%', justifyContent: 'flex-end' }}>
          {currentStep === 0 && (
            <>
              <Button onClick={handleCancel}>取消</Button>
              <Button
                type="primary"
                disabled={legacyBindings.length === 0}
                onClick={() => setCurrentStep(1)}
              >
                下一步
              </Button>
            </>
          )}

          {currentStep === 1 && (
            <>
              <Button onClick={() => setCurrentStep(0)}>上一步</Button>
              <Button type="primary" icon={<SyncOutlined />} onClick={handleMigrate}>
                开始转换
              </Button>
            </>
          )}

          {currentStep === 2 && (
            <>
              <Button onClick={handleReset}>重新开始</Button>
              <Button type="primary" onClick={handleApply}>
                应用转换结果
              </Button>
            </>
          )}
        </Space>
      </div>
    </Modal>
  );
};

export default BindingMigrationTool;
