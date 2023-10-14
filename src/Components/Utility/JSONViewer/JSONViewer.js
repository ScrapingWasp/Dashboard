import React, { useState, useMemo } from 'react';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import ReactDiffViewer from 'react-diff-viewer-continued';
import prettier from 'prettier/standalone';
import JSONTree from './JSONTree';
        


const JSONViewer = ({ value, oldValue }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  
const prettifyJSON = (json) => JSON.stringify(json, null, 2);


  const oldCode = useMemo(() => (oldValue ? prettifyJSON(oldValue) : ""), [oldValue]);
  const newCode = useMemo(() => (value ? prettifyJSON(value) : ""), [value]);

  return (
    <div style={{ fontFamily: 'Consolas, "Courier New", monospace' }}>
      <button onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? "Collapse" : "Expand"}
      </button>

      {isExpanded ? (
        oldValue && value ? (
          <ReactDiffViewer
            oldValue={oldCode}
            newValue={newCode}
            splitView={true}
          />
        ) : (
          <JSONTree json={value || {}} />
        )
      ) : null}
    </div>
  );
};

export default JSONViewer;
