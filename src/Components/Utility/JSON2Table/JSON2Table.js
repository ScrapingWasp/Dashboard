import React from "react";

// Function to flatten a deeply nested object
const flattenObject = (obj, parent = "", res = {}) => {
  for (let key in obj) {
    let propName = parent ? `${parent}.${key}` : key;
    if (typeof obj[key] === "object") {
      flattenObject(obj[key], propName, res);
    } else {
      res[propName] = obj[key];
    }
  }
  return res;
};

const JSON2Table = ({ data }) => {
  // Flatten each object in the data array
  const flattenedData = data.map((d) => flattenObject(d));

  // Get unique headers
  const headers = Array.from(
    new Set(
      flattenedData.reduce((acc, cur) => [...acc, ...Object.keys(cur)], [])
    )
  );

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {flattenedData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {headers.map((header, colIndex) => (
              <td key={colIndex}>{row[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default JSON2Table;
