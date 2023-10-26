import React, { useState, useMemo } from "react";
import ReactDiffViewer from "react-diff-viewer-continued";
import JSONTree from "./JSONTree";

const JSONViewer = ({ value, oldValue }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const prettifyJSON = (json) => JSON.stringify(json, null, 2);

  const oldCode = useMemo(
    () => (oldValue ? prettifyJSON(oldValue) : ""),
    [oldValue]
  );
  const newCode = useMemo(() => (value ? prettifyJSON(value) : ""), [value]);

  return (
    <div
      style={{
        fontFamily: 'Consolas, "Courier New", monospace',
        paddingLeft: 20,
        paddingRight: 20,
        wordWrap: "break-word",
      }}>
      {isExpanded ? (
        oldValue && value ? (
          <ReactDiffViewer
            oldValue={oldCode}
            newValue={newCode}
            splitView={true}
          />
        ) : (
          <JSONTree json={value || {}} depth={10} />
        )
      ) : null}
    </div>
  );
};

export default JSONViewer;
