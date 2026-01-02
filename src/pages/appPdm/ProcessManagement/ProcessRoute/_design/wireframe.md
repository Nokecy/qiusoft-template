# 工艺路线创建页面 UI/UX 设计方案

## 文档信息

- **项目名称**: 工艺路线管理系统
- **模块路径**: `appPdm/ProcessManagement/ProcessRoute`
- **设计版本**: v1.0
- **创建日期**: 2025-11-28
- **框架技术**: React 18 + UmiJS 4 + Ant Design 5
- **设计师**: Claude (UI/UX Design Agent)

---

## 1. 业务需求分析

### 1.1 核心功能

工艺路线编辑器是一个**流程图式的可视化设计工具**,用于定义产品制造过程中的工序流程和工序之间的前后关系。

**关键业务特征**:
- 工艺路线由多个工序节点组成,节点之间通过连线表示工序的前后关系
- 每个节点代表一个工序(ProcessProcedure),包含工序信息、检验方案、ATP/ESOP文件等详细信息
- 支持单个节点编辑,然后统一提交整个工艺路线
- 节点之间存在明确的前后关系: previousProcessProcedure → currentProcessProcedure → nextProcessProcedure

### 1.2 数据结构分析

```typescript
// 工艺路线主体
type ProcessRouteDto = {
  code: string;              // 工艺路线编码
  version: string;           // 版本号
  name: string;              // 工艺路线名称
  memo?: string;             // 备注
  processRouteItems: ProcessRouteItemDto[];  // 工艺路线节点列表
}

// 工艺路线节点 (单个工序节点)
type ProcessRouteItemDto = {
  sequence: number;          // 序号
  previousProcessProcedure: ProcessProcedureItemDto;  // 前置工序
  currentProcessProcedure: ProcessProcedureItemDto;   // 当前工序
  nextProcessProcedure: ProcessProcedureItemDto;      // 后续工序
  inspectionSchemeCode?: string;   // 检验方案编码
  inspectionSchemeName?: string;   // 检验方案名称
  atpFileName?: string;            // ATP 文件名
  esopFileName?: string;           // ESOP 文件名
  memo?: string;                   // 备注
}

// 工序信息
type ProcessProcedureItemDto = {
  id: number;
  code: string;                    // 工序编码
  name: string;                    // 工序名称
  workCenterCode?: string;         // 工作中心编码
  workCenterName?: string;         // 工作中心名称
  processProcedureCode?: string;   // 工序编码
  processProcedureName?: string;   // 工序名称
}
```

### 1.3 用户场景

**主要用户**: 工艺工程师

**核心工作流程**:
1. 创建新的工艺路线,填写基本信息(编码、版本、名称)
2. 在画布上添加工序节点,通过连线定义工序的前后关系
3. 点击节点编辑详细信息(检验方案、ATP/ESOP文件等)
4. 调整工序顺序和关系,直到工艺路线设计完成
5. 统一提交整个工艺路线

---

## 2. 技术选型建议

### 2.1 流程图库选型

经过对比分析,推荐使用 **ReactFlow**:

**ReactFlow 优势**:
- ✅ React 生态原生支持,与项目技术栈完美集成
- ✅ 优秀的性能表现和稳定性
- ✅ 丰富的内置功能: 拖拽、缩放、自动布局、节点连接
- ✅ 高度可定制化的节点和连线样式
- ✅ 完善的类型定义和 TypeScript 支持
- ✅ 活跃的社区和详尽的文档
- ✅ MIT 开源协议,免费商用

**替代方案对比**:

| 特性 | ReactFlow | AntV X6 | LogicFlow |
|------|-----------|---------|-----------|
| React 集成 | 原生支持 | 需要封装 | 需要封装 |
| 易用性 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| 性能 | 优秀 | 优秀 | 良好 |
| 自定义能力 | 极强 | 极强 | 中等 |
| 社区活跃度 | 极高 | 高 | 中等 |
| 学习成本 | 低 | 中 | 低 |

**安装依赖**:
```bash
yarn add reactflow
```

### 2.2 辅助技术栈

- **状态管理**: 使用 React Hooks (useState, useReducer)
- **表单管理**: Formily (@formily/antd-v5) - 项目标准
- **UI 组件**: Ant Design 5 - 项目标准
- **图标库**: @ant-design/icons
- **工具函数**: lodash, dayjs

---

## 3. 页面整体布局设计

### 3.1 布局架构

采用**双区域布局**设计,分为工具栏区域和主编辑区域:

```
┌─────────────────────────────────────────────────────────────────┐
│  页面头部 (Page Header)                                          │
│  - 面包屑导航                                                     │
│  - 页面标题: 创建工艺路线 / 编辑工艺路线                           │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│  基本信息卡片 (Basic Info Card)                                  │
│  - 工艺路线编码、版本号、名称、备注                                │
│  - 折叠/展开控制                                                  │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│  工艺路线编辑器 (Process Route Editor)                           │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  顶部工具栏 (Toolbar)                                      │  │
│  │  ┌────────────────────┐  ┌────────────────────────────┐  │  │
│  │  │ 节点操作区          │  │ 画布操作区                  │  │  │
│  │  │ - 添加工序节点      │  │ - 自动布局                  │  │  │
│  │  │ - 删除节点          │  │ - 缩放适应                  │  │  │
│  │  │ - 节点连线          │  │ - 放大/缩小                 │  │  │
│  │  └────────────────────┘  └────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  画布区域 (Canvas)                                         │  │
│  │                                                            │  │
│  │   ┌───────┐      ┌───────┐      ┌───────┐                │  │
│  │   │ 节点1  │─────▶│ 节点2  │─────▶│ 节点3  │                │  │
│  │   │工序信息│      │工序信息│      │工序信息│                │  │
│  │   └───────┘      └───────┘      └───────┘                │  │
│  │                                                            │  │
│  │   [支持拖拽、缩放、平移]                                    │  │
│  │   [支持节点拖拽连线]                                        │  │
│  │                                                            │  │
│  └───────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  底部状态栏 (Status Bar)                                   │  │
│  │  - 节点数量统计                                             │  │
│  │  │ - 缩放比例显示                                            │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│  底部操作栏 (Action Bar)                                         │
│  - [保存草稿] [提交] [取消]                                       │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 布局尺寸规范

```typescript
const layoutConfig = {
  pageHeader: {
    height: '64px',
    padding: '16px 24px',
  },
  basicInfoCard: {
    minHeight: '120px',
    maxHeight: '280px',  // 展开状态
    collapsedHeight: '60px',
    margin: '16px 24px',
  },
  editorContainer: {
    margin: '0 24px',
    minHeight: 'calc(100vh - 400px)',
  },
  toolbar: {
    height: '56px',
    padding: '12px 16px',
    background: '#fafafa',
    borderBottom: '1px solid #d9d9d9',
  },
  canvas: {
    minHeight: '600px',
    background: '#f5f5f5',
  },
  statusBar: {
    height: '40px',
    padding: '8px 16px',
    background: '#fafafa',
    borderTop: '1px solid #d9d9d9',
  },
  actionBar: {
    height: '64px',
    padding: '12px 24px',
    background: '#ffffff',
    borderTop: '1px solid #d9d9d9',
    position: 'sticky',
    bottom: 0,
  },
};
```

---

## 4. 组件设计规范

### 4.1 基本信息卡片 (BasicInfoCard)

**功能**: 展示和编辑工艺路线的基本信息

**组件结构**:
```tsx
<Card
  title="基本信息"
  extra={<Button type="link">折叠/展开</Button>}
  className="basic-info-card"
>
  <Form layout="inline">
    <Row gutter={16}>
      <Col span={8}>
        <Form.Item label="工艺路线编码" required>
          <Input placeholder="请输入编码" maxLength={50} />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label="版本号" required>
          <Input placeholder="请输入版本号" maxLength={20} />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label="工艺路线名称" required>
          <Input placeholder="请输入名称" maxLength={100} />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item label="备注">
          <Input.TextArea placeholder="请输入备注" rows={3} maxLength={500} />
        </Form.Item>
      </Col>
    </Row>
  </Form>
</Card>
```

**交互行为**:
- 默认展开状态,显示所有表单字段
- 点击"折叠"按钮,收起为单行显示 (仅显示编码、版本、名称)
- 表单验证: 编码、版本、名称为必填项
- 输入限制: 编码50字符、版本20字符、名称100字符、备注500字符

### 4.2 顶部工具栏 (Toolbar)

**功能**: 提供节点操作和画布控制功能

**组件结构**:
```tsx
<div className="editor-toolbar">
  <Space size="middle">
    {/* 节点操作区 */}
    <Space.Compact>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAddNode}
      >
        添加工序
      </Button>
      <Button
        icon={<DeleteOutlined />}
        onClick={handleDeleteSelected}
        disabled={!hasSelectedNodes}
      >
        删除节点
      </Button>
      <Button
        icon={<LinkOutlined />}
        onClick={toggleConnectionMode}
      >
        {connectionMode ? '取消连线' : '连线模式'}
      </Button>
    </Space.Compact>

    <Divider type="vertical" />

    {/* 画布操作区 */}
    <Space.Compact>
      <Button
        icon={<DeploymentUnitOutlined />}
        onClick={handleAutoLayout}
      >
        自动布局
      </Button>
      <Button
        icon={<FullscreenOutlined />}
        onClick={handleFitView}
      >
        缩放适应
      </Button>
      <Button
        icon={<ZoomInOutlined />}
        onClick={handleZoomIn}
      />
      <Button
        icon={<ZoomOutOutlined />}
        onClick={handleZoomOut}
      />
    </Space.Compact>

    <Divider type="vertical" />

    {/* 视图控制区 */}
    <Space.Compact>
      <Button
        icon={<UndoOutlined />}
        onClick={handleUndo}
        disabled={!canUndo}
      >
        撤销
      </Button>
      <Button
        icon={<RedoOutlined />}
        onClick={handleRedo}
        disabled={!canRedo}
      >
        重做
      </Button>
    </Space.Compact>
  </Space>
</div>
```

**按钮功能说明**:

| 按钮 | 图标 | 功能描述 | 快捷键 |
|------|------|---------|--------|
| 添加工序 | PlusOutlined | 打开工序选择器,添加新节点到画布 | Ctrl+N |
| 删除节点 | DeleteOutlined | 删除选中的节点和相关连线 | Delete |
| 连线模式 | LinkOutlined | 切换连线模式,点击两个节点创建连接 | L |
| 自动布局 | DeploymentUnitOutlined | 自动排列节点为树形布局 | Ctrl+L |
| 缩放适应 | FullscreenOutlined | 缩放画布以适应所有节点 | Ctrl+0 |
| 放大 | ZoomInOutlined | 放大画布视图 | Ctrl++ |
| 缩小 | ZoomOutOutlined | 缩小画布视图 | Ctrl+- |
| 撤销 | UndoOutlined | 撤销上一步操作 | Ctrl+Z |
| 重做 | RedoOutlined | 重做被撤销的操作 | Ctrl+Y |

### 4.3 工序节点 (ProcessNode)

**功能**: 在画布上展示单个工序信息

**节点结构设计**:

```
┌─────────────────────────────────────┐
│  ● 工序: OP010 - 下料              │  ← 节点头部 (可拖拽)
├─────────────────────────────────────┤
│  工作中心: WC001 - 冲压车间         │  ← 基本信息
│  检验方案: INS001                   │
│  序号: 10                           │
├─────────────────────────────────────┤
│  📎 ATP   📋 ESOP   🔍 详情        │  ← 快捷操作
└─────────────────────────────────────┘
     ↓ (连接点)
```

**节点状态视觉设计**:

| 状态 | 边框颜色 | 背景色 | 说明 |
|------|----------|--------|------|
| 默认 | #d9d9d9 | #ffffff | 正常状态 |
| 选中 | #1890ff | #e6f7ff | 当前选中 |
| 悬停 | #40a9ff | #f0f5ff | 鼠标悬停 |
| 错误 | #ff4d4f | #fff1f0 | 数据验证失败 |
| 起始节点 | #52c41a | #f6ffed | 工艺路线起点 |
| 结束节点 | #faad14 | #fffbe6 | 工艺路线终点 |

**节点组件实现**:

```tsx
interface ProcessNodeData {
  id: string;
  sequence: number;
  processProcedure: {
    code: string;
    name: string;
    workCenterCode?: string;
    workCenterName?: string;
  };
  inspectionSchemeCode?: string;
  inspectionSchemeName?: string;
  atpFileName?: string;
  esopFileName?: string;
  memo?: string;
  isStartNode?: boolean;
  isEndNode?: boolean;
}

const ProcessNode: React.FC<NodeProps<ProcessNodeData>> = ({ data, selected }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={classNames('process-node', {
        'selected': selected,
        'hovered': hovered,
        'start-node': data.isStartNode,
        'end-node': data.isEndNode,
      })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* 节点头部 */}
      <div className="node-header">
        <div className="node-indicator">●</div>
        <div className="node-title">
          工序: {data.processProcedure.code} - {data.processProcedure.name}
        </div>
      </div>

      {/* 节点内容 */}
      <div className="node-content">
        {data.processProcedure.workCenterCode && (
          <div className="node-info-row">
            <span className="info-label">工作中心:</span>
            <span className="info-value">
              {data.processProcedure.workCenterCode} - {data.processProcedure.workCenterName}
            </span>
          </div>
        )}
        {data.inspectionSchemeCode && (
          <div className="node-info-row">
            <span className="info-label">检验方案:</span>
            <span className="info-value">{data.inspectionSchemeCode}</span>
          </div>
        )}
        <div className="node-info-row">
          <span className="info-label">序号:</span>
          <span className="info-value">{data.sequence}</span>
        </div>
      </div>

      {/* 节点操作 */}
      <div className="node-actions">
        <Space size="small">
          {data.atpFileName && (
            <Tooltip title={`ATP: ${data.atpFileName}`}>
              <Button type="text" size="small" icon={<PaperClipOutlined />} />
            </Tooltip>
          )}
          {data.esopFileName && (
            <Tooltip title={`ESOP: ${data.esopFileName}`}>
              <Button type="text" size="small" icon={<FileTextOutlined />} />
            </Tooltip>
          )}
          <Tooltip title="编辑详情">
            <Button
              type="text"
              size="small"
              icon={<EyeOutlined />}
              onClick={() => handleEditNode(data)}
            />
          </Tooltip>
        </Space>
      </div>

      {/* ReactFlow 连接点 */}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};
```

**节点样式定义**:

```scss
.process-node {
  width: 280px;
  min-height: 140px;
  border: 2px solid #d9d9d9;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;

  &.selected {
    border-color: #1890ff;
    background: #e6f7ff;
    box-shadow: 0 4px 12px rgba(24, 144, 255, 0.3);
  }

  &.hovered {
    border-color: #40a9ff;
    background: #f0f5ff;
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(64, 169, 255, 0.3);
  }

  &.start-node {
    border-color: #52c41a;
    background: #f6ffed;
  }

  &.end-node {
    border-color: #faad14;
    background: #fffbe6;
  }

  .node-header {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    background: linear-gradient(135deg, #f5f5f5 0%, #fafafa 100%);
    border-bottom: 1px solid #e8e8e8;
    border-radius: 6px 6px 0 0;
    cursor: move;

    .node-indicator {
      color: #1890ff;
      font-size: 16px;
      margin-right: 8px;
    }

    .node-title {
      flex: 1;
      font-weight: 500;
      font-size: 14px;
      color: #262626;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .node-content {
    padding: 12px 16px;

    .node-info-row {
      display: flex;
      margin-bottom: 8px;
      font-size: 12px;

      &:last-child {
        margin-bottom: 0;
      }

      .info-label {
        color: #8c8c8c;
        margin-right: 8px;
        min-width: 70px;
      }

      .info-value {
        color: #262626;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .node-actions {
    padding: 8px 16px;
    border-top: 1px solid #f0f0f0;
    display: flex;
    justify-content: center;
  }
}
```

### 4.4 连线样式 (Edge)

**连线类型**: 使用 ReactFlow 的 `BezierEdge` (贝塞尔曲线)

**连线样式定义**:

```tsx
const edgeStyles = {
  default: {
    stroke: '#b1b1b7',
    strokeWidth: 2,
  },
  selected: {
    stroke: '#1890ff',
    strokeWidth: 3,
  },
  animated: {
    stroke: '#1890ff',
    strokeWidth: 2,
    strokeDasharray: '5,5',
    animation: 'dashdraw 0.5s linear infinite',
  },
};

const customEdge: EdgeTypes = {
  default: (props) => (
    <BezierEdge
      {...props}
      style={{
        ...edgeStyles.default,
        ...(props.selected ? edgeStyles.selected : {}),
      }}
      markerEnd={{
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: props.selected ? '#1890ff' : '#b1b1b7',
      }}
      label={
        <EdgeLabelRenderer>
          <div className="edge-label">
            <Button
              type="text"
              size="small"
              danger
              icon={<CloseOutlined />}
              onClick={() => handleDeleteEdge(props.id)}
            />
          </div>
        </EdgeLabelRenderer>
      }
    />
  ),
};
```

**连线交互**:
- 默认状态: 灰色实线,箭头指向下一个节点
- 选中状态: 蓝色加粗,显示删除按钮
- 悬停状态: 高亮显示,提示前后关系
- 连接限制: 一个节点最多一个输入,一个输出 (线性流程)

### 4.5 底部状态栏 (StatusBar)

**功能**: 显示画布状态和统计信息

```tsx
<div className="status-bar">
  <Space split={<Divider type="vertical" />}>
    <span>节点数量: {nodes.length}</span>
    <span>连接数量: {edges.length}</span>
    <span>缩放比例: {(zoom * 100).toFixed(0)}%</span>
    <span>画布位置: X: {position.x.toFixed(0)}, Y: {position.y.toFixed(0)}</span>
    {hasUnsavedChanges && (
      <Tag color="warning" icon={<ExclamationCircleOutlined />}>
        未保存
      </Tag>
    )}
  </Space>
</div>
```

### 4.6 底部操作栏 (ActionBar)

**功能**: 提供页面级操作按钮

```tsx
<div className="action-bar">
  <Row justify="space-between">
    <Col>
      <Space>
        <Button onClick={handleCancel}>取消</Button>
        <Button onClick={handleSaveDraft}>保存草稿</Button>
      </Space>
    </Col>
    <Col>
      <Space>
        <Button type="primary" onClick={handleSubmit} loading={submitting}>
          提交工艺路线
        </Button>
      </Space>
    </Col>
  </Row>
</div>
```

---

## 5. 节点编辑表单设计

### 5.1 节点详情编辑对话框

**触发方式**:
- 双击节点
- 点击节点的"详情"图标
- 点击工具栏"添加工序"按钮

**对话框结构**:

```tsx
<FormDialog
  title={entityId ? '编辑工序节点' : '添加工序节点'}
  width={900}
  maskClosable={false}
>
  <FormLayout labelCol={6} wrapperCol={18}>
    <Tabs defaultActiveKey="basic">
      {/* 基本信息 Tab */}
      <TabPane tab="基本信息" key="basic">
        <SchemaField>
          <SchemaField.Number
            title="序号"
            name="sequence"
            required
            x-component="NumberPicker"
            x-component-props={{
              placeholder: '请输入序号',
              min: 1,
              precision: 0,
            }}
          />

          <SchemaField.String
            title="工序信息"
            name="{value:processProcedureCode,label:processProcedureName}"
            required
            x-component="ProcessProcedureSelect"
            x-component-props={{
              placeholder: '请选择工序',
              useCode: true,
            }}
          />

          <SchemaField.String
            title="工作中心"
            name="{value:workCenterCode,label:workCenterName}"
            x-component="WorkCenterSelect"
            x-component-props={{
              placeholder: '请选择工作中心',
              useCode: true,
            }}
          />
        </SchemaField>
      </TabPane>

      {/* 检验信息 Tab */}
      <TabPane tab="检验信息" key="inspection">
        <SchemaField>
          <SchemaField.String
            title="检验方案"
            name="{value:inspectionSchemeCode,label:inspectionSchemeName}"
            x-component="InspectionSchemeSelect"
            x-component-props={{
              placeholder: '请选择检验方案',
              useCode: true,
            }}
          />
        </SchemaField>
      </TabPane>

      {/* 文档附件 Tab */}
      <TabPane tab="文档附件" key="documents">
        <SchemaField>
          <SchemaField.String
            title="ATP 文件"
            name="atpFileName"
            x-component="Input"
            x-component-props={{
              placeholder: '请输入ATP文件名',
              maxLength: 200,
              addonAfter: (
                <Button type="link" size="small" icon={<UploadOutlined />}>
                  上传
                </Button>
              ),
            }}
          />

          <SchemaField.String
            title="ESOP 文件"
            name="esopFileName"
            x-component="Input"
            x-component-props={{
              placeholder: '请输入ESOP文件名',
              maxLength: 200,
              addonAfter: (
                <Button type="link" size="small" icon={<UploadOutlined />}>
                  上传
                </Button>
              ),
            }}
          />
        </SchemaField>
      </TabPane>

      {/* 备注信息 Tab */}
      <TabPane tab="备注信息" key="memo">
        <SchemaField>
          <SchemaField.String
            title="备注"
            name="memo"
            x-component="Input.TextArea"
            x-component-props={{
              placeholder: '请输入备注信息',
              rows: 6,
              maxLength: 500,
            }}
          />
        </SchemaField>
      </TabPane>
    </Tabs>
  </FormLayout>
</FormDialog>
```

### 5.2 表单验证规则

```typescript
const validationRules = {
  sequence: {
    required: true,
    message: '请输入序号',
    validator: (value: number) => {
      if (value < 1) {
        return '序号必须大于0';
      }
      // 检查序号是否重复
      const existingSequences = nodes.map(n => n.data.sequence);
      if (existingSequences.includes(value) && !isEditing) {
        return '序号已存在,请使用其他序号';
      }
      return true;
    },
  },
  processProcedureCode: {
    required: true,
    message: '请选择工序',
  },
  inspectionSchemeCode: {
    validator: (value: string, values: any) => {
      // 如果选择了检验方案,必须填写完整信息
      if (value && !values.inspectionSchemeName) {
        return '检验方案信息不完整';
      }
      return true;
    },
  },
};
```

---

## 6. 交互流程设计

### 6.1 创建工艺路线完整流程

```mermaid
graph TD
    A[进入创建页面] --> B[填写基本信息]
    B --> C[点击"添加工序"按钮]
    C --> D[打开工序选择器]
    D --> E[选择工序信息]
    E --> F[填写节点详细信息]
    F --> G{验证通过?}
    G -->|是| H[节点添加到画布]
    G -->|否| F
    H --> I{继续添加节点?}
    I -->|是| C
    I -->|否| J[拖拽节点调整位置]
    J --> K[连接节点建立前后关系]
    K --> L{流程设计完成?}
    L -->|否| J
    L -->|是| M[点击"提交"按钮]
    M --> N[验证工艺路线完整性]
    N --> O{验证通过?}
    O -->|否| P[显示错误提示]
    P --> J
    O -->|是| Q[调用API创建工艺路线]
    Q --> R{创建成功?}
    R -->|是| S[提示成功并跳转到列表页]
    R -->|否| T[显示错误信息]
    T --> M
```

### 6.2 添加节点交互流程

**用户操作流程**:

1. **触发添加**
   - 点击工具栏"添加工序"按钮
   - 键盘快捷键: `Ctrl + N`

2. **选择工序**
   - 打开节点编辑对话框
   - 填写序号 (自动递增建议)
   - 从下拉列表选择工序信息
   - 系统自动填充工作中心信息

3. **补充详细信息**
   - 切换到"检验信息"标签,选择检验方案
   - 切换到"文档附件"标签,上传ATP/ESOP文件
   - 切换到"备注信息"标签,填写备注

4. **确认添加**
   - 点击"确定"按钮
   - 系统验证表单数据
   - 节点添加到画布中心位置
   - 自动聚焦到新添加的节点

**自动化优化**:
- 序号自动递增: 默认值为 `当前最大序号 + 10`
- 位置智能计算: 新节点自动排列在最后一个节点下方
- 关系自动建立: 可选择自动连接到上一个节点

### 6.3 节点连接交互流程

**连线模式**:

1. **方式一: 拖拽连线 (推荐)**
   - 鼠标悬停在节点上,显示连接点
   - 从源节点的底部连接点拖拽到目标节点的顶部连接点
   - 释放鼠标,创建连线
   - 系统自动更新节点的前后关系

2. **方式二: 连线模式**
   - 点击工具栏"连线模式"按钮
   - 依次点击两个节点 (源节点 → 目标节点)
   - 系统创建连线并退出连线模式

**连接规则**:
- ✅ 允许: 正常的线性流程 (A → B → C)
- ✅ 允许: 分支流程 (A → B, A → C)
- ❌ 禁止: 循环连接 (A → B → A)
- ❌ 禁止: 重复连接 (A → B 已存在,再次创建 A → B)

**视觉反馈**:
- 拖拽中: 显示半透明引导线
- 悬停在有效目标节点: 目标节点高亮显示绿色
- 悬停在无效目标节点: 目标节点显示红色禁止图标
- 连接成功: 连线动画效果,节点闪烁确认

### 6.4 自动布局算法

**布局策略**: 使用 Dagre 算法实现树形自动布局

```typescript
import dagre from 'dagre';

const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  // 设置布局方向和节点间距
  dagreGraph.setGraph({
    rankdir: 'TB',      // 从上到下
    nodesep: 60,        // 节点水平间距
    ranksep: 100,       // 节点垂直间距
    marginx: 40,
    marginy: 40,
  });

  // 添加节点到布局图
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, {
      width: 280,       // 节点宽度
      height: 140,      // 节点高度
    });
  });

  // 添加边到布局图
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // 执行布局计算
  dagre.layout(dagreGraph);

  // 应用计算结果到节点
  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - 140,  // 中心对齐
        y: nodeWithPosition.y - 70,
      },
    };
  });

  return layoutedNodes;
};
```

**触发时机**:
- 手动触发: 点击工具栏"自动布局"按钮
- 自动触发: 首次加载时自动执行一次布局

### 6.5 数据提交流程

**提交前验证**:

```typescript
const validateProcessRoute = (
  basicInfo: BasicInfoFormData,
  nodes: Node[],
  edges: Edge[]
): ValidationResult => {
  const errors: string[] = [];

  // 1. 基本信息验证
  if (!basicInfo.code || !basicInfo.version || !basicInfo.name) {
    errors.push('请填写完整的基本信息');
  }

  // 2. 节点数量验证
  if (nodes.length === 0) {
    errors.push('工艺路线至少需要包含一个工序节点');
  }

  // 3. 节点完整性验证
  nodes.forEach((node, index) => {
    if (!node.data.processProcedureCode) {
      errors.push(`节点 ${index + 1} 缺少工序信息`);
    }
    if (!node.data.sequence || node.data.sequence < 1) {
      errors.push(`节点 ${index + 1} 序号无效`);
    }
  });

  // 4. 序号唯一性验证
  const sequences = nodes.map(n => n.data.sequence);
  const duplicates = sequences.filter((s, i) => sequences.indexOf(s) !== i);
  if (duplicates.length > 0) {
    errors.push(`存在重复的序号: ${duplicates.join(', ')}`);
  }

  // 5. 连接完整性验证
  if (nodes.length > 1 && edges.length === 0) {
    errors.push('多个节点之间必须建立连接关系');
  }

  // 6. 拓扑结构验证
  const { hasLoop, disconnectedNodes } = validateTopology(nodes, edges);
  if (hasLoop) {
    errors.push('工艺路线中存在循环连接,请检查并修正');
  }
  if (disconnectedNodes.length > 0) {
    errors.push(`存在未连接的节点: ${disconnectedNodes.join(', ')}`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};
```

**数据转换逻辑**:

```typescript
const convertToDTO = (
  basicInfo: BasicInfoFormData,
  nodes: Node<ProcessNodeData>[],
  edges: Edge[]
): API.BurnAbpPdmProcessManagementProcessRoutesCreateUpdateProcessRouteDto => {
  // 构建节点映射关系
  const nodeMap = new Map(nodes.map(n => [n.id, n]));

  // 构建边映射关系
  const edgeMap = new Map<string, { prev?: string; next?: string }>();
  edges.forEach(edge => {
    // 记录每个节点的前驱和后继
    edgeMap.set(edge.target, {
      ...edgeMap.get(edge.target),
      prev: edge.source,
    });
    edgeMap.set(edge.source, {
      ...edgeMap.get(edge.source),
      next: edge.target,
    });
  });

  // 转换为 ProcessRouteItem 列表
  const processRouteItems = nodes.map(node => {
    const relations = edgeMap.get(node.id);
    const prevNode = relations?.prev ? nodeMap.get(relations.prev) : undefined;
    const nextNode = relations?.next ? nodeMap.get(relations.next) : undefined;

    return {
      sequence: node.data.sequence,
      previousProcessProcedure: prevNode ? {
        id: prevNode.data.processProcedure.id,
        code: prevNode.data.processProcedure.code,
        name: prevNode.data.processProcedure.name,
        workCenterCode: prevNode.data.processProcedure.workCenterCode,
        workCenterName: prevNode.data.processProcedure.workCenterName,
      } : undefined,
      currentProcessProcedure: {
        id: node.data.processProcedure.id,
        code: node.data.processProcedure.code,
        name: node.data.processProcedure.name,
        workCenterCode: node.data.processProcedure.workCenterCode,
        workCenterName: node.data.processProcedure.workCenterName,
      },
      nextProcessProcedure: nextNode ? {
        id: nextNode.data.processProcedure.id,
        code: nextNode.data.processProcedure.code,
        name: nextNode.data.processProcedure.name,
        workCenterCode: nextNode.data.processProcedure.workCenterCode,
        workCenterName: nextNode.data.processProcedure.workCenterName,
      } : undefined,
      inspectionSchemeCode: node.data.inspectionSchemeCode,
      inspectionSchemeName: node.data.inspectionSchemeName,
      atpFileName: node.data.atpFileName,
      esopFileName: node.data.esopFileName,
      memo: node.data.memo,
    } as API.BurnAbpPdmProcessManagementProcessRoutesCreateUpdateProcessRouteItemDto;
  });

  return {
    code: basicInfo.code,
    version: basicInfo.version,
    name: basicInfo.name,
    memo: basicInfo.memo,
    processRouteItems,
  };
};
```

**提交处理**:

```typescript
const handleSubmit = async () => {
  try {
    setSubmitting(true);

    // 1. 验证数据
    const validation = validateProcessRoute(basicInfo, nodes, edges);
    if (!validation.valid) {
      Modal.error({
        title: '数据验证失败',
        content: (
          <ul>
            {validation.errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        ),
      });
      return;
    }

    // 2. 转换数据
    const dto = convertToDTO(basicInfo, nodes, edges);

    // 3. 调用API
    const result = entityId
      ? await ProcessRouteUpdateAsync({ id: entityId }, dto)
      : await ProcessRouteCreateAsync(dto);

    // 4. 成功反馈
    message.success(entityId ? '更新成功' : '创建成功');

    // 5. 跳转到列表页
    history.push('/appPdm/ProcessManagement/ProcessRoute');

  } catch (error) {
    console.error('提交失败:', error);
    message.error('提交失败,请检查网络连接或联系管理员');
  } finally {
    setSubmitting(false);
  }
};
```

---

## 7. 状态管理设计

### 7.1 状态结构定义

```typescript
interface ProcessRouteEditorState {
  // 基本信息
  basicInfo: {
    code: string;
    version: string;
    name: string;
    memo?: string;
  };

  // ReactFlow 状态
  nodes: Node<ProcessNodeData>[];
  edges: Edge[];

  // 编辑状态
  selectedNodes: string[];
  selectedEdges: string[];

  // 视图状态
  viewport: {
    x: number;
    y: number;
    zoom: number;
  };

  // 操作模式
  connectionMode: boolean;

  // 历史记录 (撤销/重做)
  history: {
    past: HistoryState[];
    present: HistoryState;
    future: HistoryState[];
  };

  // 未保存更改标记
  hasUnsavedChanges: boolean;

  // 加载状态
  loading: boolean;
  submitting: boolean;
}

interface HistoryState {
  nodes: Node<ProcessNodeData>[];
  edges: Edge[];
  basicInfo: BasicInfo;
}
```

### 7.2 状态管理方案

**使用 useReducer + Context 模式**:

```typescript
// Actions
type EditorAction =
  | { type: 'SET_BASIC_INFO'; payload: Partial<BasicInfo> }
  | { type: 'ADD_NODE'; payload: Node<ProcessNodeData> }
  | { type: 'UPDATE_NODE'; payload: { id: string; data: Partial<ProcessNodeData> } }
  | { type: 'DELETE_NODE'; payload: string }
  | { type: 'ADD_EDGE'; payload: Edge }
  | { type: 'DELETE_EDGE'; payload: string }
  | { type: 'SET_NODES'; payload: Node<ProcessNodeData>[] }
  | { type: 'SET_EDGES'; payload: Edge[] }
  | { type: 'TOGGLE_CONNECTION_MODE' }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'RESET' };

// Reducer
const editorReducer = (
  state: ProcessRouteEditorState,
  action: EditorAction
): ProcessRouteEditorState => {
  switch (action.type) {
    case 'SET_BASIC_INFO':
      return {
        ...state,
        basicInfo: { ...state.basicInfo, ...action.payload },
        hasUnsavedChanges: true,
      };

    case 'ADD_NODE':
      return {
        ...state,
        nodes: [...state.nodes, action.payload],
        hasUnsavedChanges: true,
        history: addToHistory(state.history, state),
      };

    case 'UPDATE_NODE':
      return {
        ...state,
        nodes: state.nodes.map(node =>
          node.id === action.payload.id
            ? { ...node, data: { ...node.data, ...action.payload.data } }
            : node
        ),
        hasUnsavedChanges: true,
        history: addToHistory(state.history, state),
      };

    case 'DELETE_NODE':
      return {
        ...state,
        nodes: state.nodes.filter(node => node.id !== action.payload),
        edges: state.edges.filter(
          edge => edge.source !== action.payload && edge.target !== action.payload
        ),
        hasUnsavedChanges: true,
        history: addToHistory(state.history, state),
      };

    case 'ADD_EDGE':
      return {
        ...state,
        edges: [...state.edges, action.payload],
        hasUnsavedChanges: true,
        history: addToHistory(state.history, state),
      };

    case 'DELETE_EDGE':
      return {
        ...state,
        edges: state.edges.filter(edge => edge.id !== action.payload),
        hasUnsavedChanges: true,
        history: addToHistory(state.history, state),
      };

    case 'UNDO':
      return undoAction(state);

    case 'REDO':
      return redoAction(state);

    default:
      return state;
  }
};

// Context Provider
const ProcessRouteEditorContext = createContext<{
  state: ProcessRouteEditorState;
  dispatch: React.Dispatch<EditorAction>;
} | null>(null);

export const ProcessRouteEditorProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(editorReducer, initialState);

  return (
    <ProcessRouteEditorContext.Provider value={{ state, dispatch }}>
      {children}
    </ProcessRouteEditorContext.Provider>
  );
};
```

---

## 8. 性能优化策略

### 8.1 ReactFlow 性能优化

```typescript
// 1. 启用节点虚拟化 (大量节点时)
<ReactFlow
  nodes={nodes}
  edges={edges}
  nodesDraggable={true}
  nodesConnectable={true}
  elementsSelectable={true}
  panOnDrag={true}
  zoomOnScroll={true}
  minZoom={0.5}
  maxZoom={2}
  fitView
  // 性能优化配置
  elevateNodesOnSelect={false}  // 禁用选中时提升层级
  onlyRenderVisibleElements={true}  // 只渲染可见元素
>
  <Background />
  <Controls />
  <MiniMap />
</ReactFlow>

// 2. 使用 useMemo 缓存节点和边
const memoizedNodes = useMemo(() => nodes, [nodes]);
const memoizedEdges = useMemo(() => edges, [edges]);

// 3. 使用 useCallback 缓存事件处理函数
const onNodesChange = useCallback(
  (changes: NodeChange[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  },
  []
);

const onEdgesChange = useCallback(
  (changes: EdgeChange[]) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  },
  []
);
```

### 8.2 表单性能优化

```typescript
// 使用 Formily 的懒加载和按需渲染
const SchemaField = useMemo(
  () => createSchemaField({
    components: {
      FormItem,
      Input,
      NumberPicker,
      // ... 其他组件
    },
  }),
  []  // 只创建一次
);

// 使用 FormConsumer 实现按需更新
<FormConsumer>
  {(form) => {
    // 只订阅需要的字段变化
    const values = form.getValuesIn('inspectionSchemeCode');
    return <InspectionInfoDisplay data={values} />;
  }}
</FormConsumer>
```

### 8.3 数据加载优化

```typescript
// 使用 SWR 进行数据缓存和重新验证
import useSWR from 'swr';

const useProcessProcedureList = () => {
  const { data, error, isLoading } = useSWR(
    '/api/pdm/process-procedure',
    ProcessProcedureGetListAsync,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,  // 60秒内不重复请求
    }
  );

  return {
    procedures: data?.items || [],
    isLoading,
    isError: error,
  };
};
```

---

## 9. 响应式设计

### 9.1 断点定义

```typescript
const breakpoints = {
  xs: '< 576px',    // 手机竖屏
  sm: '≥ 576px',    // 手机横屏
  md: '≥ 768px',    // 平板竖屏
  lg: '≥ 992px',    // 平板横屏
  xl: '≥ 1200px',   // 桌面
  xxl: '≥ 1600px',  // 大屏
};
```

### 9.2 响应式布局调整

```scss
// 桌面端 (推荐使用环境)
@media (min-width: 1200px) {
  .process-route-editor {
    .basic-info-card {
      margin: 16px 24px;
    }

    .editor-container {
      margin: 0 24px;
      height: calc(100vh - 400px);
    }

    .process-node {
      width: 280px;
    }
  }
}

// 平板端
@media (min-width: 768px) and (max-width: 1199px) {
  .process-route-editor {
    .basic-info-card {
      margin: 12px 16px;
    }

    .editor-container {
      margin: 0 16px;
      height: calc(100vh - 360px);
    }

    .process-node {
      width: 240px;
    }

    .toolbar {
      .ant-space {
        flex-wrap: wrap;
      }
    }
  }
}

// 手机端 (不推荐,建议提示切换到桌面端)
@media (max-width: 767px) {
  .process-route-editor {
    .mobile-warning {
      display: block;
      padding: 16px;
      background: #fff7e6;
      border: 1px solid #ffd666;
      border-radius: 4px;
      margin: 16px;
    }

    .editor-container {
      display: none;  // 隐藏编辑器
    }
  }
}
```

---

## 10. 辅助功能设计

### 10.1 工序选择器组件

**功能**: 快速选择工序并填充节点信息

```tsx
interface ProcessProcedureSelectDialogProps {
  onSelect: (procedure: ProcessProcedureDto) => void;
}

const ProcessProcedureSelectDialog: React.FC<ProcessProcedureSelectDialogProps> = ({
  onSelect,
}) => {
  const [visible, setVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>();

  return (
    <Modal
      title="选择工序"
      open={visible}
      width={900}
      onCancel={() => setVisible(false)}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        {/* 搜索框 */}
        <Input.Search
          placeholder="搜索工序编码或名称"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
        />

        {/* 分类筛选 */}
        <ProcessProcedureCategorySelect
          value={selectedCategory}
          onChange={setSelectedCategory}
          placeholder="按分类筛选"
          allowClear
        />

        {/* 工序列表 */}
        <Table
          dataSource={filteredProcedures}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          onRow={(record) => ({
            onClick: () => {
              onSelect(record);
              setVisible(false);
            },
          })}
          columns={[
            { title: '工序编码', dataIndex: 'code', width: 120 },
            { title: '工序名称', dataIndex: 'name', width: 150 },
            { title: '工作中心', dataIndex: 'workCenterName', width: 150 },
            { title: '分类', dataIndex: 'processProcedureCategoryName', width: 120 },
          ]}
        />
      </Space>
    </Modal>
  );
};
```

### 10.2 快捷键支持

```typescript
const keyboardShortcuts = {
  'Ctrl+N': '添加新节点',
  'Delete': '删除选中节点',
  'Ctrl+Z': '撤销',
  'Ctrl+Y': '重做',
  'Ctrl+S': '保存草稿',
  'Ctrl+Enter': '提交工艺路线',
  'Ctrl+L': '自动布局',
  'Ctrl+0': '缩放适应',
  'Ctrl++': '放大',
  'Ctrl+-': '缩小',
  'Escape': '取消当前操作',
};

// 快捷键实现
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'n':
          e.preventDefault();
          handleAddNode();
          break;
        case 'z':
          e.preventDefault();
          handleUndo();
          break;
        case 'y':
          e.preventDefault();
          handleRedo();
          break;
        case 's':
          e.preventDefault();
          handleSaveDraft();
          break;
        case 'l':
          e.preventDefault();
          handleAutoLayout();
          break;
        // ... 其他快捷键
      }
    } else if (e.key === 'Delete') {
      handleDeleteSelected();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, []);
```

### 10.3 提示和帮助

**首次使用引导**:

```tsx
const FirstTimeGuideTour = () => {
  const steps = [
    {
      title: '欢迎使用工艺路线编辑器',
      description: '这是一个可视化的工艺流程设计工具',
      target: '.editor-container',
    },
    {
      title: '填写基本信息',
      description: '首先填写工艺路线的编码、版本和名称',
      target: '.basic-info-card',
    },
    {
      title: '添加工序节点',
      description: '点击"添加工序"按钮,选择工序并添加到画布',
      target: '.toolbar .add-node-button',
    },
    {
      title: '连接节点',
      description: '拖拽节点的连接点,建立工序之间的前后关系',
      target: '.process-node',
    },
    {
      title: '编辑节点详情',
      description: '双击节点可以编辑检验方案、文档附件等详细信息',
      target: '.process-node',
    },
    {
      title: '提交工艺路线',
      description: '设计完成后,点击"提交"按钮保存工艺路线',
      target: '.action-bar',
    },
  ];

  return (
    <Tour
      steps={steps}
      open={showTour}
      onClose={() => setShowTour(false)}
    />
  );
};
```

**空状态提示**:

```tsx
const EmptyCanvas = () => (
  <div className="empty-canvas">
    <Empty
      image={<DeploymentUnitOutlined style={{ fontSize: 64, color: '#bfbfbf' }} />}
      description={
        <Space direction="vertical" size="large">
          <div>
            <Text type="secondary">还没有添加工序节点</Text>
          </div>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddNode}>
            添加第一个工序
          </Button>
        </Space>
      }
    />
  </div>
);
```

---

## 11. 错误处理和验证

### 11.1 实时验证规则

```typescript
// 节点验证
const validateNode = (node: Node<ProcessNodeData>): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!node.data.sequence || node.data.sequence < 1) {
    errors.push({
      field: 'sequence',
      message: '序号必须大于0',
      severity: 'error',
    });
  }

  if (!node.data.processProcedure?.code) {
    errors.push({
      field: 'processProcedureCode',
      message: '必须选择工序',
      severity: 'error',
    });
  }

  if (node.data.inspectionSchemeCode && !node.data.inspectionSchemeName) {
    errors.push({
      field: 'inspectionScheme',
      message: '检验方案信息不完整',
      severity: 'warning',
    });
  }

  return errors;
};

// 拓扑结构验证
const validateTopology = (
  nodes: Node[],
  edges: Edge[]
): TopologyValidation => {
  // 检测循环
  const hasLoop = detectCycle(nodes, edges);

  // 检测孤立节点
  const disconnectedNodes = nodes
    .filter(node => {
      const hasIncoming = edges.some(e => e.target === node.id);
      const hasOutgoing = edges.some(e => e.source === node.id);
      return nodes.length > 1 && !hasIncoming && !hasOutgoing;
    })
    .map(n => n.data.processProcedure.code);

  // 检测多起点/多终点
  const startNodes = nodes.filter(node =>
    !edges.some(e => e.target === node.id)
  );
  const endNodes = nodes.filter(node =>
    !edges.some(e => e.source === node.id)
  );

  return {
    hasLoop,
    disconnectedNodes,
    multipleStarts: startNodes.length > 1,
    multipleEnds: endNodes.length > 1,
    startNodes: startNodes.map(n => n.data.processProcedure.code),
    endNodes: endNodes.map(n => n.data.processProcedure.code),
  };
};
```

### 11.2 错误提示UI

```tsx
// 节点错误标记
const ProcessNodeWithValidation: React.FC<NodeProps> = (props) => {
  const errors = validateNode(props);
  const hasError = errors.some(e => e.severity === 'error');
  const hasWarning = errors.some(e => e.severity === 'warning');

  return (
    <div className={classNames('process-node', {
      'has-error': hasError,
      'has-warning': hasWarning,
    })}>
      <ProcessNode {...props} />
      {(hasError || hasWarning) && (
        <div className="validation-indicator">
          <Tooltip
            title={
              <ul>
                {errors.map((error, index) => (
                  <li key={index}>{error.message}</li>
                ))}
              </ul>
            }
          >
            {hasError ? (
              <CloseCircleFilled style={{ color: '#ff4d4f' }} />
            ) : (
              <ExclamationCircleFilled style={{ color: '#faad14' }} />
            )}
          </Tooltip>
        </div>
      )}
    </div>
  );
};

// 全局验证面板
const ValidationPanel: React.FC = () => {
  const { nodes, edges } = useReactFlow();
  const validation = validateTopology(nodes, edges);

  const hasIssues =
    validation.hasLoop ||
    validation.disconnectedNodes.length > 0 ||
    validation.multipleStarts ||
    validation.multipleEnds;

  if (!hasIssues) return null;

  return (
    <Alert
      message="工艺路线结构问题"
      type="warning"
      showIcon
      closable
      description={
        <ul>
          {validation.hasLoop && <li>存在循环连接</li>}
          {validation.disconnectedNodes.length > 0 && (
            <li>存在孤立节点: {validation.disconnectedNodes.join(', ')}</li>
          )}
          {validation.multipleStarts && (
            <li>存在多个起点: {validation.startNodes.join(', ')}</li>
          )}
          {validation.multipleEnds && (
            <li>存在多个终点: {validation.endNodes.join(', ')}</li>
          )}
        </ul>
      }
      style={{ marginBottom: 16 }}
    />
  );
};
```

---

## 12. 下一步实施计划

### 12.1 开发阶段划分

**阶段一: 基础架构搭建 (1-2天)**
- [x] 设计方案评审和确认
- [ ] 安装 ReactFlow 依赖
- [ ] 创建页面基础结构和路由配置
- [ ] 搭建基本布局框架 (Header, Card, Editor, ActionBar)
- [ ] 配置状态管理 (Context + Reducer)

**阶段二: 核心功能开发 (3-4天)**
- [ ] 实现基本信息表单 (BasicInfoCard)
- [ ] 实现工具栏组件 (Toolbar)
- [ ] 实现工序节点组件 (ProcessNode)
- [ ] 实现节点添加和删除功能
- [ ] 实现节点拖拽和连接功能
- [ ] 实现节点编辑表单对话框

**阶段三: 高级功能开发 (2-3天)**
- [ ] 实现自动布局功能 (Dagre)
- [ ] 实现撤销/重做功能
- [ ] 实现数据验证逻辑
- [ ] 实现数据提交和API对接
- [ ] 实现工序选择器组件

**阶段四: 优化和测试 (2-3天)**
- [ ] 性能优化 (虚拟化、缓存、懒加载)
- [ ] 响应式布局调整
- [ ] 快捷键支持
- [ ] 错误处理完善
- [ ] 用户体验优化 (引导、提示、空状态)
- [ ] 功能测试和Bug修复

**阶段五: 文档和发布 (1天)**
- [ ] 编写用户使用文档
- [ ] 编写开发者文档
- [ ] 代码审查和优化
- [ ] 部署到测试环境
- [ ] 用户验收测试

### 12.2 技术风险评估

| 风险点 | 风险等级 | 应对措施 |
|--------|----------|---------|
| ReactFlow 学习曲线 | 中 | 提前研读官方文档,参考示例代码 |
| 复杂拓扑结构验证 | 高 | 使用图算法库 (graphlib),编写完善的测试用例 |
| 大量节点性能问题 | 中 | 启用虚拟化渲染,优化渲染逻辑 |
| 数据转换逻辑复杂 | 中 | 编写清晰的转换函数,添加详细注释 |
| 移动端适配困难 | 低 | 优先支持桌面端,移动端显示提示信息 |

### 12.3 后续优化方向

**功能增强**:
- [ ] 支持工艺路线模板功能
- [ ] 支持批量导入工序
- [ ] 支持工艺路线版本对比
- [ ] 支持工艺路线复制和克隆
- [ ] 支持协同编辑 (多人同时编辑)

**用户体验**:
- [ ] 支持节点样式自定义
- [ ] 支持画布主题切换 (明亮/暗黑)
- [ ] 支持导出为图片或PDF
- [ ] 支持拖拽排序节点序号
- [ ] 支持搜索和高亮节点

**技术优化**:
- [ ] 使用 Web Worker 处理复杂计算
- [ ] 实现离线编辑功能 (IndexedDB)
- [ ] 集成单元测试和E2E测试
- [ ] 性能监控和错误追踪

---

## 13. 附录

### 13.1 关键依赖版本

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "umi": "^4.0.0",
    "antd": "^5.0.0",
    "@formily/antd-v5": "^1.0.0",
    "@formily/react": "^2.0.0",
    "@formily/core": "^2.0.0",
    "reactflow": "^11.10.0",
    "@ant-design/icons": "^5.0.0",
    "dagre": "^0.8.5",
    "lodash": "^4.17.21",
    "dayjs": "^1.11.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/dagre": "^0.7.48",
    "@types/lodash": "^4.14.0",
    "typescript": "^5.0.0"
  }
}
```

### 13.2 参考资源

**官方文档**:
- ReactFlow: https://reactflow.dev/
- Ant Design: https://ant.design/
- Formily: https://formilyjs.org/
- Dagre: https://github.com/dagrejs/dagre

**设计参考**:
- 阿里云工作流设计器
- AWS Step Functions 可视化编辑器
- Draw.io 流程图工具

### 13.3 设计决策记录

**为什么选择 ReactFlow 而不是 AntV X6?**
- ReactFlow 与 React 生态更加原生集成,使用体验更流畅
- ReactFlow 的 API 设计更简洁,学习曲线更平缓
- ReactFlow 社区更活跃,文档更完善
- ReactFlow 的 TypeScript 支持更好

**为什么采用双区域布局?**
- 基本信息和编辑器分离,职责清晰
- 支持折叠基本信息卡片,最大化编辑器空间
- 符合用户从上到下的操作习惯

**为什么使用 Dagre 自动布局?**
- Dagre 是成熟的图布局算法,专门处理有向无环图
- 与 ReactFlow 集成良好,官方推荐使用
- 布局效果美观,适合展示工艺流程

---

## 结语

本设计方案完整定义了工艺路线创建页面的UI/UX设计,涵盖了布局、组件、交互、状态管理、性能优化等各个方面。设计遵循了 Ant Design 设计语言和项目现有规范,确保了设计的一致性和可实施性。

**设计亮点**:
1. ✅ 直观的可视化编辑体验,类似流程图工具
2. ✅ 完善的交互设计,支持拖拽、连接、自动布局
3. ✅ 强大的数据验证,确保工艺路线的完整性和正确性
4. ✅ 良好的性能优化,支持大量节点的流畅操作
5. ✅ 友好的用户体验,提供引导、提示、快捷键等辅助功能

**实施建议**:
- 按照阶段划分逐步实施,每个阶段完成后进行测试和评审
- 与后端团队密切配合,确保API接口的一致性
- 收集用户反馈,持续优化用户体验
- 建立完善的测试用例,确保功能稳定性

期待这个设计方案能够帮助开发团队高效实施工艺路线编辑器功能! 🎉
