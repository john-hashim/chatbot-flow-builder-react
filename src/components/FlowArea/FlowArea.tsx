import ReactFlow, {
  Background,
  BackgroundVariant,
  XYPosition,
  Edge,
  Connection,
  MarkerType,
  Node,
  applyNodeChanges,
  applyEdgeChanges,
  EdgeChange,
  NodeChange
} from "reactflow";

import "reactflow/dist/style.css";
import { NodeData } from "../NodeItem/NodeItem";
import TextNode from "../TextNode/TextNode";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { addEdge, addNode, clearSelectedNode, setNodes, setEdges } from "../../store/slices/flowSlices";

const nodeTypes = {
  textNode: TextNode,
  /*
  Other types of nodes can add here in below format
  [key: string]: ComponentType<NodeProps>
  eg: dropdownNode: DropdownNode 
  */
};

function FlowArea() {
  // getting values of node and edges from RootScope using selectors
  const nodes = useSelector((state: RootState) => state.flow.nodes);
  const edges = useSelector((state: RootState) => state.flow.edges);
  const dispatch = useDispatch<AppDispatch>();

  const onConnect = (params: Edge | Connection) => {
    // Dispatch addEdge action and params are of type Edge as defined in Rootstate
    dispatch(
      addEdge({
        ...params,
        id: `${new Date().getTime()}xw`,
        markerStart: { type: MarkerType.ArrowClosed },
      } as Edge)
    );
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    // Getting data from dragged node
    const nodeData: NodeData = JSON.parse(
      event.dataTransfer.getData("application/reactflow")
    );
    // manually adjust x and y based on the accurate position
    const position: XYPosition = {
      x: event.clientX - 65,
      y: event.clientY - 65,
    };

    if (nodeData.type === "textNode") {
      // Creating a new node which is type 'Node'
      const newNode: Node = {
        id: `${nodes.length + 1}`,
        position,
        data: { // this data will passed to the custom nodes,
          label: `Message ${nodes.length + 1}`,
          id: `${nodes.length + 1}`
        },
        type: nodeData.type,
      };
      // Dispatching addNode action on Droping the node
      dispatch(addNode(newNode));
    } // nodes with different types can append here inside else or else if condition
  };

  const onDragOver = (event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onBackgroundClick = () => {
    dispatch(clearSelectedNode());  // Dispatch action to clear selected node
  };

  const onNodesChange = (changes: NodeChange[]) => {
      dispatch(setNodes(applyNodeChanges(changes, nodes)));
  };

  const onEdgesChange = (changes:EdgeChange[]) => {
      dispatch(setEdges(applyEdgeChanges(changes, edges)));
  };


  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      style={{ width: "100%", height: "100%" }}
      onClick={onBackgroundClick} 
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes} 
      >
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}

export default FlowArea;
