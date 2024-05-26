import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  BackgroundVariant,
  XYPosition,
  Edge,
  Connection,
} from "reactflow";

import "reactflow/dist/style.css";

const initialNodes = [
  { id: "1", position: { x: 200, y: 300 }, data: { label: "Sample message" } },
];

function FlowArea() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = (params: Edge | Connection) =>
    setEdges((eds) => addEdge(params, eds));

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const nodeData = JSON.parse(
      event.dataTransfer.getData("application/reactflow")
    );
    // manually adjust x and y based on the accurate position
    const position: XYPosition = {
      x: event.clientX - 65,
      y: event.clientY - 65,
    };
    const newNode = {
      id: `${nodes.length + 1}`,
      position,
      data: { label: "New Message" },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  const onDragOver = (event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      style={{ width: "100%", height: "100%" }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}

export default FlowArea;
