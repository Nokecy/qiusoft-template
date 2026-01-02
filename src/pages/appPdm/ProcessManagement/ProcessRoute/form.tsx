import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { message, Spin } from 'antd';
import { history, closeTab, dropByCacheKey } from '@umijs/max';
import { useKeepAliveParams } from '@/hooks';

// D3 Polyfill - 必须在 ReactFlow 之前导入，解决生产构建时 interrupt 函数丢失问题
import './utils/d3Polyfill';

import {
  Node,
  Edge,
  Connection,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
  NodeTypes,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';

import BasicInfoForm from './components/BasicInfoForm';
import Toolbar from './components/Toolbar';
import EditorCanvas from './components/EditorCanvas';
import ActionBar from './components/ActionBar';
import ProcessNode, { ProcessNodeData } from './components/ProcessNode';
import ProcessProcedureSelector from './components/ProcessProcedureSelector';
import ProcessProcedurePanel from './components/ProcessProcedurePanel';
import NodeEditDialog from './components/NodeEditDialog';
import { smartAutoLayout } from './utils/autoLayout';
import { useHistoryManager } from './hooks/useHistoryManager';
import {
  ProcessRouteCreateAsync,
  ProcessRouteGetAsync,
  ProcessRouteUpdateAsync,
  ProcessRouteSubmitAsync,
} from '@/services/pdm/ProcessRoute';

/**
 * 工艺路线编辑器内部组件
 * 必须在 ReactFlowProvider 内部使用
 */
const ProcessRouteEditor: React.FC = () => {
  // 使用 KeepAlive 参数 Hook，自动处理多 Tab 切换时的参数隔离
  const { id: recordId, mode: urlMode, isActive, hasChanged } = useKeepAliveParams(
    '/appPdm/ProcessManagement/ProcessRoute/form',
    ['id', 'mode']
  );
  const mode = urlMode || 'edit'; // view | edit | create
  const isViewMode = mode === 'view';
  const isEditMode = !!recordId;

  // ReactFlow 实例,用于缩放和适应画布
  const reactFlowInstance = useReactFlow();
  // 注册自定义节点类型
  const nodeTypes: NodeTypes = useMemo(
    () => ({
      processNode: ProcessNode,
    }),
    [],
  );

  // ReactFlow 状态管理
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNodes, setSelectedNodes] = useState<Node[]>([]);
  const [connectionMode, setConnectionMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  // 工序选择器对话框状态
  const [selectorVisible, setSelectorVisible] = useState(false);

  // 节点编辑对话框状态
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [editingNode, setEditingNode] = useState<Node<ProcessNodeData> | null>(null);

  // 历史记录管理器
  const {
    pushHistory,
    undo: historyUndo,
    redo: historyRedo,
    canUndo,
    canRedo,
  } = useHistoryManager([], []);

  // 基础信息表单状态
  const [basicInfo, setBasicInfo] = useState<any>({});

  // 加载工艺路线数据 (使用 KeepAlive Hook 自动处理路径匹配)
  useEffect(() => {
    // Hook 已自动处理路径匹配，只有当前页面活跃且参数变化时才执行
    if (!isActive || !hasChanged) {
      return;
    }
    if (recordId) {
      loadProcessRouteData(recordId);
    }
  }, [isActive, hasChanged, recordId]);

  // 加载数据的方法
  const loadProcessRouteData = async (id: string) => {
    setPageLoading(true);
    try {
      const data = await ProcessRouteGetAsync({ id });
      if (data) {
        // 设置基本信息，物料字段转换为 labelInValue 格式以匹配 PartSelect 组件
        setBasicInfo({
          code: data.code,
          name: data.name,
          version: data.version,
          // 物料字段：转换为 labelInValue 格式以便 PartSelect 正确显示
          materialCode: data.materialCode ? {
            value: data.materialCode,
            label: data.materialDescription || data.materialCode,
          } : undefined,
          memo: data.memo,
        });

        // 转换工艺路线明细为画布节点
        const items = data.processRouteItems || [];
        const newNodes: Node<ProcessNodeData>[] = items.map((item: any, index: number) => ({
          id: `node-${item.id || index}`,
          type: 'processNode',
          position: { x: 100 + index * 320, y: 200 },
          data: {
            id: item.id,
            sequence: item.sequence || (index + 1) * 10,
            sort: item.sequence || (index + 1) * 10,
            processProcedure: {
              id: item.currentProcessProcedure?.processProcedureId,
              code: item.currentProcessProcedure?.processProcedureCode,
              name: item.currentProcessProcedure?.processProcedureName,
              workCenterCode: item.currentProcessProcedure?.workCenterCode,
              workCenterName: item.currentProcessProcedure?.workCenterName,
            },
            station: item.station,
            isNeedCheckPrevWp: item.isNeedCheckPrevWp,
            checkPrevQuantity: item.checkPrevQuantity,
            isNeedCheckWp: item.isNeedCheckWp,
            needPicture: item.needPicture,
            workerCount: item.workerCount,
            manuFactureCost: item.manuFactureCost,
            isOutsourced: item.isOutsourced,
            inspectionSchemeCode: item.inspectionSchemeCode,
            inspectionSchemeName: item.inspectionSchemeName,
            sampleSchemeCode: item.sampleSchemeCode,
            sampleSchemeName: item.sampleSchemeName,
            atpFileName: item.atpFileName,
            esopFileName: item.esopFileName,
            memo: item.memo,
            isStartNode: index === 0,
            isEndNode: index === items.length - 1,
          },
        }));

        // 根据前后工序关系生成连接边
        const newEdges: Edge[] = [];
        items.forEach((item: any, index: number) => {
          if (item.nextProcessProcedure?.processProcedureCode) {
            // 找到下一个节点
            const nextIndex = items.findIndex(
              (i: any) => i.currentProcessProcedure?.processProcedureCode === item.nextProcessProcedure?.processProcedureCode
            );
            if (nextIndex !== -1) {
              newEdges.push({
                id: `edge-${index}-${nextIndex}`,
                source: `node-${item.id || index}`,
                target: `node-${items[nextIndex].id || nextIndex}`,
                type: 'smoothstep',
                animated: true,
              });
            }
          } else if (index < items.length - 1) {
            // 如果没有明确的下一工序，按顺序连接
            newEdges.push({
              id: `edge-${index}`,
              source: `node-${item.id || index}`,
              target: `node-${items[index + 1].id || (index + 1)}`,
              type: 'smoothstep',
              animated: true,
            });
          }
        });

        setNodes(newNodes);
        setEdges(newEdges);
      }
    } catch (error) {
      console.error('加载工艺路线数据失败:', error);
      message.error('加载数据失败');
    } finally {
      setPageLoading(false);
    }
  };

  // 监听节点和边的变化,自动保存历史记录
  useEffect(() => {
    if (nodes.length > 0) {
      pushHistory(nodes, edges);
    }
  }, [nodes, edges]);

  // 连接节点处理
  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge(connection, eds));
      message.success('节点连接成功');
    },
    [setEdges],
  );

  // 节点点击处理
  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNodes([node]);
  }, []);

  // 节点双击处理 - 打开编辑对话框
  const onNodeDoubleClick = useCallback((event: React.MouseEvent, node: Node<ProcessNodeData>) => {
    setEditingNode(node);
    setEditDialogVisible(true);
  }, []);

  // 画布点击处理
  const onPaneClick = useCallback(() => {
    setSelectedNodes([]);
  }, []);

  // 工具栏操作处理函数
  const handleAddNode = () => {
    setSelectorVisible(true);
  };

  const handleDeleteSelected = () => {
    if (selectedNodes.length === 0) {
      message.warning('请先选择要删除的节点');
      return;
    }

    // 删除选中的节点
    const selectedNodeIds = selectedNodes.map((node) => node.id);
    setNodes((nds) => nds.filter((node) => !selectedNodeIds.includes(node.id)));
    setEdges((eds) =>
      eds.filter((edge) => !selectedNodeIds.includes(edge.source) && !selectedNodeIds.includes(edge.target)),
    );
    setSelectedNodes([]);
    message.success(`成功删除 ${selectedNodes.length} 个节点`);
  };

  // 工序选择器处理函数 - 横向添加节点
  const handleProcedureSelect = (selectedRows: any[]) => {
    // 计算新节点的位置 - 横向排列
    const existingNodesCount = nodes.length;
    const startX = existingNodesCount > 0 ? 100 + existingNodesCount * 320 : 100;

    // 为每个选中的工序创建节点 - 横向排列
    const newNodes: Node<ProcessNodeData>[] = selectedRows.map((row, index) => {
      const sequence = (existingNodesCount + index + 1) * 10;
      return {
        id: `node-${Date.now()}-${index}`,
        type: 'processNode',
        position: { x: startX + index * 320, y: 200 },
        data: {
          id: row.id,
          sequence,
          processProcedure: {
            id: row.id,
            code: row.code,
            name: row.name,
            workCenterCode: row.workCenterCode,
            workCenterName: row.workCenterName,
          },
          inspectionSchemeCode: row.inspectionSchemeCode,
          inspectionSchemeName: row.inspectionSchemeName,
        },
      };
    });

    setNodes((nds) => [...nds, ...newNodes]);
    setSelectorVisible(false);
    message.success(`成功添加 ${selectedRows.length} 个工序节点`);
  };

  // 拖拽放置处理
  const handleDrop = useCallback(
    (event: React.DragEvent, position: { x: number; y: number }) => {
      const dataStr = event.dataTransfer.getData('application/reactflow');
      if (!dataStr) return;

      try {
        const dragData = JSON.parse(dataStr);
        if (dragData.type !== 'processProcedure') return;

        const procedure = dragData.data;
        const existingNodesCount = nodes.length;
        const sequence = (existingNodesCount + 1) * 10;

        const newNode: Node<ProcessNodeData> = {
          id: `node-${Date.now()}`,
          type: 'processNode',
          position,
          data: {
            id: procedure.id,
            sequence,
            sort: sequence,
            processProcedure: {
              id: procedure.id,
              code: procedure.code,
              name: procedure.name,
              workCenterCode: procedure.workCenterCode,
              workCenterName: procedure.workCenterName,
            },
          },
        };

        setNodes((nds) => [...nds, newNode]);
        message.success(`已添加工序: ${procedure.code} - ${procedure.name}`);
      } catch (error) {
        console.error('拖拽数据解析失败:', error);
      }
    },
    [nodes, setNodes]
  );

  const handleToggleConnectionMode = () => {
    setConnectionMode(!connectionMode);
    message.info(connectionMode ? '已退出连线模式' : '已进入连线模式');
  };

  const handleAutoLayout = () => {
    if (nodes.length === 0) {
      message.warning('当前没有节点需要布局');
      return;
    }

    try {
      // 使用智能自动布局算法
      const layoutedNodes = smartAutoLayout(nodes, edges);
      setNodes(layoutedNodes);
      message.success('自动布局完成');
    } catch (error) {
      console.error('自动布局失败:', error);
      message.error('自动布局失败,请重试');
    }
  };

  const handleFitView = () => {
    if (nodes.length === 0) {
      message.warning('当前没有节点需要适应画布');
      return;
    }

    try {
      reactFlowInstance.fitView({
        padding: 0.2, // 边距占比
        duration: 300, // 动画时长 (毫秒)
      });
      message.success('已适应画布');
    } catch (error) {
      console.error('适应画布失败:', error);
      message.error('适应画布失败');
    }
  };

  const handleZoomIn = () => {
    try {
      reactFlowInstance.zoomIn({ duration: 300 });
    } catch (error) {
      console.error('放大失败:', error);
      message.error('放大失败');
    }
  };

  const handleZoomOut = () => {
    try {
      reactFlowInstance.zoomOut({ duration: 300 });
    } catch (error) {
      console.error('缩小失败:', error);
      message.error('缩小失败');
    }
  };

  const handleUndo = () => {
    if (!canUndo) {
      message.warning('没有可撤销的操作');
      return;
    }

    const historyState = historyUndo();
    if (historyState) {
      setNodes(historyState.nodes);
      setEdges(historyState.edges);
      message.success('撤销成功');
    }
  };

  const handleRedo = () => {
    if (!canRedo) {
      message.warning('没有可重做的操作');
      return;
    }

    const historyState = historyRedo();
    if (historyState) {
      setNodes(historyState.nodes);
      setEdges(historyState.edges);
      message.success('重做成功');
    }
  };

  // 准备保存数据
  const prepareProcessRouteData = (): API.BurnAbpPdmProcessManagementProcessRoutesCreateUpdateProcessRouteDto => {
    // 构建工艺路线明细列表
    const processRouteItems: API.BurnAbpPdmProcessManagementProcessRoutesCreateUpdateProcessRouteItemDto[] =
      nodes.map((node, index) => {
        const nodeData = node.data as ProcessNodeData;

        // 找到前置节点和后置节点
        const incomingEdges = edges.filter((edge) => edge.target === node.id);
        const outgoingEdges = edges.filter((edge) => edge.source === node.id);
        const previousNode = incomingEdges.length > 0 ? nodes.find((n) => n.id === incomingEdges[0].source) : null;
        const nextNode = outgoingEdges.length > 0 ? nodes.find((n) => n.id === outgoingEdges[0].target) : null;

        return {
          sequence: nodeData.sequence,
          currentProcessProcedure: {
            processProcedureCode: nodeData.processProcedure.code,
            processProcedureName: nodeData.processProcedure.name,
            workCenterCode: nodeData.processProcedure.workCenterCode,
            workCenterName: nodeData.processProcedure.workCenterName,
          },
          previousProcessProcedure: previousNode
            ? {
              processProcedureCode: (previousNode.data as ProcessNodeData).processProcedure.code,
              processProcedureName: (previousNode.data as ProcessNodeData).processProcedure.name,
              workCenterCode: (previousNode.data as ProcessNodeData).processProcedure.workCenterCode,
              workCenterName: (previousNode.data as ProcessNodeData).processProcedure.workCenterName,
            }
            : undefined,
          nextProcessProcedure: nextNode
            ? {
              processProcedureCode: (nextNode.data as ProcessNodeData).processProcedure.code,
              processProcedureName: (nextNode.data as ProcessNodeData).processProcedure.name,
              workCenterCode: (nextNode.data as ProcessNodeData).processProcedure.workCenterCode,
              workCenterName: (nextNode.data as ProcessNodeData).processProcedure.workCenterName,
            }
            : undefined,
          inspectionSchemeCode: nodeData.inspectionSchemeCode,
          inspectionSchemeName: nodeData.inspectionSchemeName,
          atpFileName: nodeData.atpFileName,
          esopFileName: nodeData.esopFileName,
          memo: nodeData.memo,
        };
      });

    // 处理物料选择器的值（PartSelect 返回 labelInValue 格式）
    const partNumberValue = basicInfo.materialCode;
    let materialCode = '';
    let materialDescription = '';
    if (partNumberValue) {
      if (typeof partNumberValue === 'object') {
        materialCode = partNumberValue.value || '';
        materialDescription = partNumberValue.label || '';
      } else {
        materialCode = partNumberValue;
      }
    }

    return {
      code: basicInfo.code,
      version: basicInfo.version,
      name: basicInfo.name,
      materialCode,
      materialDescription,
      memo: basicInfo.memo,
      processRouteItems,
    };
  };

  // 操作栏处理函数
  const handleSave = async () => {
    if (!basicInfo.code || !basicInfo.version || !basicInfo.name) {
      message.warning('请填写完整的基本信息');
      return;
    }

    if (nodes.length === 0) {
      message.warning('请至少添加一个工序节点');
      return;
    }

    try {
      setLoading(true);
      const data = prepareProcessRouteData();
      console.log('保存数据 - materialCode:', data.materialCode, 'materialDescription:', data.materialDescription);
      console.log('basicInfo:', basicInfo);
      console.log('basicInfo.materialCode:', basicInfo.materialCode, 'typeof:', typeof basicInfo.materialCode);

      if (isEditMode && recordId) {
        // 编辑模式：调用 Update API
        await ProcessRouteUpdateAsync({ id: recordId }, data);
        message.success('更新成功');
      } else {
        // 新建模式：调用 Create API
        await ProcessRouteCreateAsync(data);
        message.success('保存成功');
      }
      // 关闭当前页面并刷新列表页缓存
      const currentPath = window.location.pathname;
      dropByCacheKey('/appPdm/ProcessManagement/ProcessRoute');
      history.push('/appPdm/ProcessManagement/ProcessRoute');
      setTimeout(() => {
        closeTab(currentPath);
      }, 150);
    } catch (error) {
      console.error('保存失败:', error);
      message.error('保存失败,请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!basicInfo.code || !basicInfo.version || !basicInfo.name) {
      message.warning('请填写完整的基本信息');
      return;
    }

    if (nodes.length === 0) {
      message.warning('请至少添加一个工序节点');
      return;
    }

    try {
      setLoading(true);
      const data = prepareProcessRouteData();

      let routeId: string | number | undefined;
      if (isEditMode && recordId) {
        // 编辑模式：先更新
        await ProcessRouteUpdateAsync({ id: recordId }, data);
        routeId = recordId;
      } else {
        // 新建模式：先保存
        const result = await ProcessRouteCreateAsync(data);
        routeId = result?.id;
      }

      // 再提交
      if (routeId) {
        await ProcessRouteSubmitAsync({ id: routeId });
        message.success('提交成功');
        // 关闭当前页面并刷新列表页缓存
        const currentPath = window.location.pathname;
        dropByCacheKey('/appPdm/ProcessManagement/ProcessRoute');
        history.push('/appPdm/ProcessManagement/ProcessRoute');
        setTimeout(() => {
          closeTab(currentPath);
        }, 150);
      } else {
        message.error('保存成功但提交失败');
      }
    } catch (error) {
      console.error('提交失败:', error);
      message.error('提交失败,请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    history.push('/appPdm/ProcessManagement/ProcessRoute');
  };

  // 节点编辑处理
  const handleNodeSave = (data: Partial<ProcessNodeData>) => {
    if (!editingNode) return;

    // 更新节点数据
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === editingNode.id) {
          return {
            ...node,
            data: {
              ...node.data,
              sort: data.sort,
              sequence: data.sequence || data.sort || node.data.sequence,
              station: data.station,
              processProcedure: data.processProcedure || node.data.processProcedure,
              isNeedCheckPrevWp: data.isNeedCheckPrevWp,
              checkPrevQuantity: data.checkPrevQuantity,
              isNeedCheckWp: data.isNeedCheckWp,
              needPicture: data.needPicture,
              workerCount: data.workerCount,
              manuFactureCost: data.manuFactureCost,
              isOutsourced: data.isOutsourced,
              inspectionSchemeCode: data.inspectionSchemeCode,
              sampleSchemeCode: data.sampleSchemeCode,
              memo: data.memo,
            },
          };
        }
        return node;
      }),
    );

    setEditDialogVisible(false);
    setEditingNode(null);
    message.success('节点更新成功');
  };

  return (
    <Spin spinning={pageLoading} tip="加载中...">
      <div style={{ height: 'calc(100vh - 130px)', padding: 16, background: '#f0f2f5' }}>
        <div
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          {/* 基础信息表单 */}
          <div style={{ height: 180 }}>
            <BasicInfoForm
              initialValues={basicInfo}
              onChange={(values) => setBasicInfo(values)}
              readOnly={isViewMode}
            />
          </div>

          {/* 编辑器工具栏 - 只读模式下隐藏编辑功能 */}
          {!isViewMode && (
            <Toolbar
              onAddNode={handleAddNode}
              onDeleteSelected={handleDeleteSelected}
              onToggleConnectionMode={handleToggleConnectionMode}
              onAutoLayout={handleAutoLayout}
              onFitView={handleFitView}
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
              onUndo={handleUndo}
              onRedo={handleRedo}
              hasSelectedNodes={selectedNodes.length > 0}
              connectionMode={connectionMode}
              canUndo={canUndo}
              canRedo={canRedo}
            />
          )}

          {/* 主编辑区域：左侧工序面板 + 右侧画布 */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              gap: 16,
              minHeight: 0,
            }}
          >
            {/* 左侧工序拖拽面板 - 只在编辑模式显示 */}
            {!isViewMode && (
              <div style={{ width: 280, flexShrink: 0 }}>
                <ProcessProcedurePanel visible={!isViewMode} />
              </div>
            )}

            {/* ReactFlow 编辑器画布 */}
            <div
              style={{
                flex: 1,
                position: 'relative',
                background: '#fafafa',
                border: '1px solid #e8e8e8',
                borderRadius: '2px',
                overflow: 'hidden',
              }}
            >
              <EditorCanvas
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={onNodeClick}
                onNodeDoubleClick={onNodeDoubleClick}
                onPaneClick={onPaneClick}
                onDrop={handleDrop}
                nodeTypes={nodeTypes}
              />
            </div>
          </div>

          {/* 底部操作按钮栏 - 只读模式下隐藏 */}
          {!isViewMode && (
            <ActionBar onSave={handleSave} onSubmit={handleSubmit} onCancel={handleCancel} loading={loading} />
          )}
        </div>

        {/* 工序选择器对话框 */}
        <ProcessProcedureSelector
          visible={selectorVisible}
          onCancel={() => setSelectorVisible(false)}
          onSelect={handleProcedureSelect}
        />

        {/* 节点编辑对话框 */}
        <NodeEditDialog
          visible={editDialogVisible}
          nodeData={editingNode?.data || null}
          existingNodes={nodes.map(n => n.data)}
          readOnly={isViewMode}
          onCancel={() => {
            setEditDialogVisible(false);
            setEditingNode(null);
          }}
          onSave={handleNodeSave}
        />
      </div>
    </Spin>
  );
};

/**
 * 工艺路线管理页面 (外部包装组件)
 * 提供 ReactFlowProvider 上下文
 */
const ProcessRoute: React.FC = () => {
  return (
    <ReactFlowProvider>
      <ProcessRouteEditor />
    </ReactFlowProvider>
  );
};

export default ProcessRoute;

// 路由配置
export const routeProps = {
  name: '工艺路线管理',
};
