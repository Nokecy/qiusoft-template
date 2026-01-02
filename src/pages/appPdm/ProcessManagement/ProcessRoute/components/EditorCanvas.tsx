import React, { useCallback, useRef } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  Connection,
  ConnectionMode,
  NodeTypes,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';

interface EditorCanvasProps {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: any;
  onEdgesChange: any;
  onConnect: (connection: Connection) => void;
  onNodeClick: (event: React.MouseEvent, node: Node) => void;
  onNodeDoubleClick?: (event: React.MouseEvent, node: Node) => void;
  onPaneClick: () => void;
  onDrop?: (event: React.DragEvent, position: { x: number; y: number }) => void;
  nodeTypes?: NodeTypes;
}

/**
 * ReactFlow 编辑器画布组件
 * 提供流程图的可视化编辑功能，支持拖拽放置
 */
const EditorCanvas: React.FC<EditorCanvasProps> = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onNodeClick,
  onNodeDoubleClick,
  onPaneClick,
  onDrop,
  nodeTypes,
}) => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();

  // 拖拽悬停处理
  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // 放置处理
  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!onDrop) return;

      // 获取放置位置并转换为画布坐标
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      onDrop(event, position);
    },
    [onDrop, screenToFlowPosition]
  );

  return (
    <div
      ref={reactFlowWrapper}
      style={{ width: '100%', height: '100%', background: '#fff' }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onNodeDoubleClick={onNodeDoubleClick}
        onPaneClick={onPaneClick}
        connectionMode={ConnectionMode.Loose}
        fitView
        fitViewOptions={{
          padding: 0.3,
          maxZoom: 0.8,
        }}
        defaultViewport={{ x: 0, y: 0, zoom: 0.6 }}
        minZoom={0.2}
        maxZoom={2}
        attributionPosition="bottom-left"
      >
        <Background />
        <Controls />
        <MiniMap
          nodeColor={() => '#1890ff'}
          style={{ height: 120 }}
        />
      </ReactFlow>
    </div>
  );
};

export default EditorCanvas;
