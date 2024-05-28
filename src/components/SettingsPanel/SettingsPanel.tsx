import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { updateNodeLabel, clearSelectedNode } from "../../store/slices/flowSlices";

function SettingsPanel() {
  const selectedNode = useSelector(
    (state: RootState) => state.flow.selectedNode
  );
  const dispatch = useDispatch();
  const nodes = useSelector((state: RootState) => state.flow.nodes);
  const selectedNodeValue = nodes.filter(
    (node) => node.id === selectedNode?.id
  )[0];

  const changeSelectedValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (selectedNode) {
      // Changing the value of selected node
      dispatch(updateNodeLabel({ id: selectedNode.id, label: e.target.value }));
    }
  };

  const onBackBtn = () => {
    dispatch(clearSelectedNode()); // Dispatch action to clear selected node
  };

  return (
    <div className="settings-wrapper">
      <div className="settings-header">
        <svg
          onClick={onBackBtn}
          style={{ cursor: "pointer" }}
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 12h14M5 12l4-4m-4 4 4 4"
          />
        </svg>
        Message
      </div>
      <div className="input-wrapper">
        <div className="sub-heading">Text</div>
        <textarea
          value={selectedNodeValue ? selectedNodeValue.data.label : ""}
          onChange={changeSelectedValue}
          rows={4}
          className="settings-textarea"
        />
      </div>
    </div>
  );
}

export default SettingsPanel;
