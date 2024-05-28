import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Node, Edge } from "reactflow";
import { NodeData } from "../../components/NodeItem/NodeItem";

interface FlowState {
  nodes: Node[];
  edges: Edge[];
  selectedNode: NodeData | null;
}

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
      state.selectedNode = null;
    },
    updateNodeLabel(
      state,
      action: PayloadAction<{ id: string; label: string }>
    ) {
      const node = state.nodes.find((n) => n.id === action.payload.id);
      if (node) {
        node.data.label = action.payload.label;
      }
    },
  },
});

export const {
  addNode,
  setNodes,
  addEdge,
  setEdges,
  setSelectedNode,
  clearSelectedNode,
  updateNodeLabel
} = flowSlice.actions;
export default flowSlice.reducer;
