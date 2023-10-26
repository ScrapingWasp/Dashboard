import React, { useMemo, useState } from "react";
import { MdRemove, MdAdd } from "react-icons/md";
import {
  BASIC_RADIUS,
  CORAL_RED,
  GRAY_2,
  GREEN,
  PRIMARY_DILUTED,
} from "../Colors";

const basicExpandCollapseIconStyles = {
  border: "1px solid black",
  position: "relative",
  top: 3,
  borderRadius: 3,
};

const explandIcon = (color) => (
  <MdAdd
    color={color}
    style={{ ...basicExpandCollapseIconStyles, color, borderColor: color }}
  />
);

const collapseIcon = (color) => (
  <MdRemove
    color={color}
    style={{ ...basicExpandCollapseIconStyles, color, borderColor: color }}
  />
);

const getTypeLabel = (value) => {
  if (Array.isArray(value)) {
    return "Array";
  } else if (typeof value === "object" && value !== null) {
    return "Object";
  } else {
    return typeof value;
  }
};

const JSONTree = ({ json, depth = 0 }) => {
  const [collapsedKeys, setCollapsedKeys] = useState(new Set());

  const toggleKey = (key) => {
    const newCollapsedKeys = new Set(collapsedKeys);
    if (collapsedKeys.has(key)) {
      newCollapsedKeys.delete(key);
    } else {
      newCollapsedKeys.add(key);
    }
    setCollapsedKeys(newCollapsedKeys);
  };

  const isArray = Array.isArray(json);

  const getColorByType = (value) => {
    switch (typeof value) {
      case "number":
        return "#098658"; // Green
      case "string":
        return "#a31515"; // Red
      case "boolean":
        return "#1e1e1e"; // Dark Gray
      default:
        return value === null ? "#1e1e1e" : "black"; // Dark Gray for null
    }
  };

  const keys = useMemo(() => Object.keys(json), [json]);

  return (
    <div
      style={{
        paddingLeft: depth === 0 ? 0 : 10,
        fontFamily: 'Consolas, "Courier New", monospace',
      }}>
      <div
        style={{
          borderLeft: depth > 0 ? "1px dashed #ddd" : "none",
          paddingLeft: depth === 0 ? 0 : 10,
        }}>
        <span
          style={{
            color: "#1e1e1e",
            position: "relative",
            left: -15,
            backgroundColor: "white",
            height: 20,
            display: "inline-block",
            paddingBottom: 3,
          }}>
          {isArray ? "[" : "{"}
        </span>
        <div style={{ marginLeft: 15 }}>
          {keys.map((key, index, array) => {
            const value = json[key];
            const isObject =
              typeof value === "object" &&
              value !== null &&
              !Array.isArray(value);
            const isNestedArray = Array.isArray(value);
            const isLast = index === array.length - 1;

            return (
              <div key={key} style={{ margin: "3px 0" }}>
                <strong style={{ color: "#000080" }}>
                  <span
                    onClick={() => toggleKey(key)}
                    style={{
                      cursor: "pointer",
                      color: "#1e1e1e",
                      marginRight: 5,
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.color = PRIMARY_DILUTED)
                    }
                    onMouseOut={(e) => (e.target.style.color = "#1e1e1e")}>
                    {isObject || isNestedArray
                      ? collapsedKeys.has(key)
                        ? explandIcon(GREEN)
                        : collapseIcon(GRAY_2)
                      : ""}
                  </span>
                  {isArray ? `[${key}]: ` : `${key}: `}
                  {(isObject || isNestedArray) && (
                    <span
                      style={{
                        color: isObject ? GREEN : CORAL_RED,
                        fontStyle: "italic",
                        fontWeight: 600,
                        fontSize: "0.9em",
                      }}>
                      {getTypeLabel(value)} ({isNestedArray ? value.length : 1})
                    </span>
                  )}
                </strong>
                {isObject || isNestedArray ? (
                  collapsedKeys.has(key) ? (
                    <span style={{ color: "#1e1e1e" }}>
                      {isNestedArray ? "[...]" : "{...}"}
                    </span>
                  ) : (
                    <JSONTree json={value} depth={depth + 1} />
                  )
                ) : (
                  <span
                    style={{
                      color: getColorByType(value),
                    }}>
                    {JSON.stringify(value)}
                  </span>
                )}
                {!isLast && ","}
              </div>
            );
          })}
        </div>
        <span
          style={{
            color: "#1e1e1e",
            position: "relative",
            left: -15,
            backgroundColor: "white",
            height: 20,
            display: "inline-block",
            paddingTop: 3,
          }}>
          {isArray ? "]" : "}"}
        </span>
      </div>
    </div>
  );
};

export default JSONTree;
