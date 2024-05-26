import React from "react";

interface NodeData {
  id: string;
  type: string;
  label: string;
}

function NodeItem() {
  const nodeData: NodeData = {
    id: "1",
    type: "textNode",
    label: "Sample Node",
  };

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(nodeData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div draggable onDragStart={handleDragStart} className="node-item-wrapper">
      <div className="icon">
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="#8ccee4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 17h6l3 3v-3h2V9h-2M4 4h11v8H9l-3 3v-3H4V4Z"
          />
        </svg>
      </div>
      <div>Message</div>
    </div>
  );
}

export default NodeItem;
