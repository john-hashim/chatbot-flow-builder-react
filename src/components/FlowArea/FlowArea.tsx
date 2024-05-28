import ReactFlow, {
  Background,
  BackgroundVariant,
  XYPosition,
  Edge,
  Connection,
  MarkerType,
  Node,
} from "reactflow";

import "reactflow/dist/style.css";
import { NodeData } from "../NodeItem/NodeItem";
import TextNode from "../TextNode/TextNode";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { addEdge, addNode } from "../../store/slices/flowSlices";

const nodeTypes = {
  textNode: TextNode,
  /*
  Other types of nodes can add here in below format
  [key: string]: ComponentType<NodeProps>
  eg: dropdownNode: DropdownNode 
  */
};

function FlowArea() {
  const nodes = useSelector((state: RootState) => state.flow.nodes);
  const edges = useSelector((state: RootState) => state.flow.edges);
  const dispatch = useDispatch<AppDispatch>();

  const onConnect = (params: Edge | Connection) => {
    dispatch(
      addEdge({
        ...params,
        markerStart: { type: MarkerType.ArrowClosed },
      } as Edge)
    );
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const nodeData: NodeData = JSON.parse(
      event.dataTransfer.getData("application/reactflow")
    );
    // manually adjust x and y based on the accurate position
    const position: XYPosition = {
      x: event.clientX - 65,
      y: event.clientY - 65,
    };

    if (nodeData.type === "textNode") {
      const newNode: Node = {
        id: `${nodes.length + 1}`,
        position,
        data: { label: "New Message" },
        type: nodeData.type,
      };
      dispatch(addNode(newNode));
    } // nodes with different types can append here inside else or else if condition
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
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}

export default FlowArea;
