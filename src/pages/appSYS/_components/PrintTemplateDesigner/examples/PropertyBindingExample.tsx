/**
 * PropertyBinding使用示例
 * 展示PropertyBindingEditor和BindingDebugPanel的各种用法
 */

import React, { useState } from 'react';
import { Card, Space, Tabs, Layout, Typography, Divider } from 'antd';
import { PropertyBindingEditor } from '../components/PropertyBindingEditor';
import { BindingDebugPanel } from '../components/BindingDebugPanel';
import { BindingMode, PropertyBinding, AtlTemplate, ElementType } from '../types';

const { TabPane } = Tabs;
const { Sider, Content } = Layout;
const { Title, Paragraph, Text } = Typography;

/**
 * 示例1: 基本使用
 */
export const BasicExample: React.FC = () => {
  const [binding, setBinding] = useState<PropertyBinding>({
    mode: BindingMode.Static,
    staticValue: 'Hello World',
  });

  return (
    <Card title="示例1: 基本使用" style={{ marginBottom: 16 }}>
      <Paragraph>
        这是最简单的用法,只需要提供value和onChange属性。
      </Paragraph>
      <PropertyBindingEditor
        value={binding}
        onChange={setBinding}
        valueType="string"
      />
      <Divider />
      <Text strong>当前绑定值:</Text>
      <pre>{JSON.stringify(binding, null, 2)}</pre>
    </Card>
  );
};

/**
 * 示例2: 数据路径模式
 */
export const DataPathExample: React.FC = () => {
  const [binding, setBinding] = useState<PropertyBinding>({
    mode: BindingMode.DataPath,
    dataPath: 'order.customerName',
  });

  // 示例数据源
  const dataSources = {
    order: {
      id: 12345,
      customerName: '张三',
      totalAmount: 199.99,
      createDate: '2024-01-15',
      status: 'pending',
      items: [
        { productName: '商品A', quantity: 2, price: 50.00 },
        { productName: '商品B', quantity: 1, price: 99.99 },
      ]
    },
    company: {
      name: '示例公司',
      address: '北京市朝阳区',
      phone: '010-12345678',
    }
  };

  return (
    <Card title="示例2: 数据路径模式" style={{ marginBottom: 16 }}>
      <Paragraph>
        提供dataSources属性后,数据路径模式会显示智能提示,包括完整路径和数据类型。
      </Paragraph>
      <PropertyBindingEditor
        value={binding}
        onChange={setBinding}
        valueType="string"
        dataSources={dataSources}
      />
      <Divider />
      <Space direction="vertical" style={{ width: '100%' }}>
        <Text strong>当前绑定值:</Text>
        <pre>{JSON.stringify(binding, null, 2)}</pre>
        <Text strong>可用的数据路径:</Text>
        <ul>
          <li>order.id (number)</li>
          <li>order.customerName (string)</li>
          <li>order.totalAmount (number)</li>
          <li>order.createDate (string)</li>
          <li>order.status (string)</li>
          <li>order.items (array)</li>
          <li>company.name (string)</li>
          <li>company.address (string)</li>
          <li>company.phone (string)</li>
        </ul>
      </Space>
    </Card>
  );
};

/**
 * 示例3: 表达式模式
 */
export const ExpressionExample: React.FC = () => {
  const [binding, setBinding] = useState<PropertyBinding>({
    mode: BindingMode.Expression,
    expression: 'upper(customer.name)',
  });

  // 示例数据
  const sampleData = {
    customer: {
      name: '张三',
      level: 'VIP',
      points: 1580,
    },
    order: {
      quantity: 15,
      amount: 299.50,
    },
  };

  return (
    <Card title="示例3: 表达式模式" style={{ marginBottom: 16 }}>
      <Paragraph>
        表达式模式支持函数调用和条件判断,提供函数帮助器和实时预览功能。
      </Paragraph>
      <PropertyBindingEditor
        value={binding}
        onChange={setBinding}
        valueType="string"
        showPreview={true}
        sampleData={sampleData}
      />
      <Divider />
      <Space direction="vertical" style={{ width: '100%' }}>
        <Text strong>当前绑定值:</Text>
        <pre>{JSON.stringify(binding, null, 2)}</pre>
        <Text strong>常用表达式示例:</Text>
        <ul>
          <li><code>upper(customer.name)</code> - 转换为大写</li>
          <li><code>if(customer.level == 'VIP', '尊贵客户', '普通客户')</code> - 条件判断</li>
          <li><code>concat(customer.name, ' (', customer.level, ')')</code> - 拼接字符串</li>
          <li><code>format(order.amount, '¥{{0:F2}}')</code> - 格式化金额</li>
        </ul>
      </Space>
    </Card>
  );
};

/**
 * 示例4: 格式化和回退值
 */
export const FormatExample: React.FC = () => {
  const [binding, setBinding] = useState<PropertyBinding>({
    mode: BindingMode.DataPath,
    dataPath: 'order.amount',
    format: '¥{0:F2}',
    fallbackValue: '¥0.00',
  });

  return (
    <Card title="示例4: 格式化和回退值" style={{ marginBottom: 16 }}>
      <Paragraph>
        数据路径和表达式模式支持格式化字符串和回退值配置。
      </Paragraph>
      <PropertyBindingEditor
        value={binding}
        onChange={setBinding}
        valueType="number"
        showFormat={true}
        showFallback={true}
      />
      <Divider />
      <Space direction="vertical" style={{ width: '100%' }}>
        <Text strong>当前绑定值:</Text>
        <pre>{JSON.stringify(binding, null, 2)}</pre>
        <Text strong>格式化说明:</Text>
        <ul>
          <li><code>¥{{0:F2}}</code> - 货币格式,保留两位小数</li>
          <li><code>{{0:yyyy-MM-dd}}</code> - 日期格式</li>
          <li><code>{{0:P2}}</code> - 百分比格式</li>
          <li><code>{{0:N0}}</code> - 千分位格式</li>
        </ul>
        <Text strong>回退值说明:</Text>
        <Paragraph>
          当数据路径不存在或表达式执行失败时,将使用回退值作为默认显示。
        </Paragraph>
      </Space>
    </Card>
  );
};

/**
 * 示例5: 调试面板
 */
export const DebugPanelExample: React.FC = () => {
  // 创建示例模板
  const template: AtlTemplate = {
    version: '1.0',
    metadata: {
      name: '示例模板',
      description: '用于演示调试面板',
      created: new Date().toISOString(),
      modified: new Date().toISOString(),
    },
    canvas: {
      width: 100,
      height: 50,
      dpi: 300,
    },
    layoutType: 0,
    dataSources: {},
    elements: [
      {
        id: 'element1',
        type: ElementType.Text,
        position: { x: 10, y: 10 },
        size: { width: 50, height: 10 },
        properties: {
          text: {
            mode: BindingMode.DataPath,
            dataPath: 'customer.name',
          },
          font: { family: 'Arial', size: 12 },
        },
        zIndex: 1,
        visible: { mode: BindingMode.Static, staticValue: true },
      },
      {
        id: 'element2',
        type: ElementType.Text,
        position: { x: 10, y: 25 },
        size: { width: 50, height: 10 },
        properties: {
          text: {
            mode: BindingMode.Expression,
            expression: 'upper(order.status',  // 故意写错,缺少右括号
          },
          font: { family: 'Arial', size: 12 },
        },
        zIndex: 2,
        visible: { mode: BindingMode.Static, staticValue: true },
      },
      {
        id: 'element3',
        type: ElementType.Barcode,
        position: { x: 10, y: 40 },
        size: { width: 60, height: 20 },
        properties: {
          content: {
            mode: BindingMode.DataPath,
            dataPath: 'order.barcode',
            fallbackValue: 'NO-BARCODE',
          },
          barcodeType: 0,
        },
        zIndex: 3,
        visible: {
          mode: BindingMode.Expression,
          expression: 'order.needBarcode == true',
        },
      },
    ],
  };

  return (
    <Card title="示例5: 调试面板" style={{ marginBottom: 16 }}>
      <Paragraph>
        调试面板可以展示模板中所有PropertyBinding的验证状态,帮助快速定位问题。
      </Paragraph>
      <Layout style={{ minHeight: 500 }}>
        <Content style={{ padding: 16, background: '#f0f2f5' }}>
          <Card size="small" title="模板信息">
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <Text strong>模板名称:</Text> {template.metadata.name}
              </div>
              <div>
                <Text strong>元素数量:</Text> {template.elements.length}
              </div>
              <div>
                <Text strong>画布大小:</Text> {template.canvas.width} x {template.canvas.height} mm
              </div>
              <Divider />
              <Text type="secondary">
                提示: 示例中element2的表达式故意写错了(缺少右括号),调试面板会显示错误信息。
              </Text>
            </Space>
          </Card>
        </Content>
        <Sider width={500} theme="light" style={{ padding: 8 }}>
          <BindingDebugPanel
            template={template}
            onSelectElement={(elementId) => {
              console.log('选中元素:', elementId);
              // 在实际应用中,这里会定位到对应的元素
            }}
          />
        </Sider>
      </Layout>
    </Card>
  );
};

/**
 * 完整示例页面
 */
export const PropertyBindingExamples: React.FC = () => {
  return (
    <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
      <Title level={2}>PropertyBinding 使用示例</Title>
      <Paragraph>
        本页面展示了PropertyBindingEditor和BindingDebugPanel组件的各种使用方式。
      </Paragraph>

      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="基本使用" key="1">
          <BasicExample />
        </TabPane>
        <TabPane tab="数据路径" key="2">
          <DataPathExample />
        </TabPane>
        <TabPane tab="表达式" key="3">
          <ExpressionExample />
        </TabPane>
        <TabPane tab="格式化" key="4">
          <FormatExample />
        </TabPane>
        <TabPane tab="调试面板" key="5">
          <DebugPanelExample />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default PropertyBindingExamples;
