import React from "react";
import NodeItem from "../NodeItem/NodeItem";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import SettingsPanel from "../SettingsPanel/SettingsPanel";

function NodesPanel() {
  const selectedNode = useSelector((state: RootState) => state.flow.selectedNode)
  return (
    <div className="node-panel-wrapper">
      { selectedNode ?  <SettingsPanel /> : <NodeItem />  }
    </div>
  );
}

export default NodesPanel;
