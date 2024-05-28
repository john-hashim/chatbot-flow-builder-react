import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Node, Edge } from "reactflow";

interface FlowState {
  nodes: Node[];
  edges: Edge[];
}

const initialState: FlowState = {
  nodes: [
    {
      id: "1",
      position: { x: 200, y: 300 },
      data: { label: "Sample message" },
      type: "textNode",
    },
  ],
  edges: [],
};

const flowSlice = createSlice({
  name: "flow",
  initialState,
  reducers: {
    addNode(state, action: PayloadAction<Node>) {
      state.nodes.push(action.payload);
    },
    addEdge(state, action: PayloadAction<Edge>) {
      state.edges.push(action.payload);
    },
  },
});

export const { addNode, addEdge } = flowSlice.actions;
export default flowSlice.reducer;
