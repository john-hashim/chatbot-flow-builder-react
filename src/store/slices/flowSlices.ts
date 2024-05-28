import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Node, Edge } from "reactflow";
import { NodeData } from "../../components/NodeItem/NodeItem";

/*
Managing state as whole object in our app using redux
Creating state interface for the initial State
*/
interface FlowState {
  nodes: Node[];
  edges: Edge[];
  selectedNode: NodeData | null;
}

/*
Defining initial state
Adding one node when the app loads
and selectedNode is null because no node is selected on initialization
*/
const initialState: FlowState = {
  nodes: [
    {
      id: "1",
      position: { x: 200, y: 300 },
      data: { label: "Message 1", id: "1" },
      type: "textNode",
    },
  ],
  edges: [],
  selectedNode: null,
};

const flowSlice = createSlice({
  name: "flow",
  initialState,
  reducers: {
    addNode(state, action: PayloadAction<Node>) {
      state.nodes.push(action.payload);
    },
    setNodes(state, action: PayloadAction<Node[]>) {
      state.nodes = action.payload;
    },
    addEdge(state, action: PayloadAction<Edge>) {
      state.edges.push(action.payload);
    },
    setEdges(state, action: PayloadAction<Edge[]>) {
      state.edges = action.payload;
    },
    setSelectedNode(state, action: PayloadAction<NodeData>) {
      state.selectedNode = action.payload;
    },
    clearSelectedNode(state) {
      state.selectedNode = null; // unselect the selected node on background click or back btn click
    },
    updateNodeLabel(
      state,
      action: PayloadAction<{ id: string; label: string }>
    ) {
      const node = state.nodes.find((n) => n.id === action.payload.id); // Finding the currently selecting node and updating value
      if (node) {
        node.data.label = action.payload.label;
      }
    },
  },
});

/*
Actions for updating state 
*/
export const {
  addNode, // Action for adding a node which will dispatch on droping the node in react flow
  setNodes, 
  addEdge, // Action for connecting a edge
  setEdges,
  setSelectedNode, // Action for selecting a node for edit
  clearSelectedNode,
  updateNodeLabel // Which will update state of existing node while updating
} = flowSlice.actions;

export default flowSlice.reducer;
