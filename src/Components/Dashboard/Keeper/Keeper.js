import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import DataExtraction from "../DataExtraction/DataExtraction";
import Screenshots from "../Screenshots/Screenshots";
import { GRAY_2 } from "../../Utility/Colors";

const Keeper = () => {
  const [selectedDataExtracted, setSelectedDataExtracted] = useState(null);

  useEffect(() => {
    document.title = "Keeper";
  }, []);

  const getTabItems = () => {
    const items = [
      {
        key: "1",
        label: "Data Extraction",
        children: (
          <DataExtraction
            setSelectedDataExtracted={setSelectedDataExtracted}
            selectedDataExtracted={selectedDataExtracted}
          />
        ),
      },
      {
        key: "2",
        label: "Screenshots",
        children: <Screenshots />,
      },
    ];

    return items;
  };

  const onTabChange = (key) => {
    console.log(key);
  };

  return (
    <div
      style={{
        padding: 25,
        paddingLeft: 35,
        paddingRight: 35,
        overflowY: "auto",
      }}>
      <div
        style={{
          fontWeight: "bolder",
          fontSize: "2em",
          textAlign: "left",
          marginBottom: 35,
          color: GRAY_2,
        }}>
        Keeper
      </div>
      <Tabs defaultActiveKey="1" onChange={onTabChange} items={getTabItems()} />
    </div>
  );
};

export default Keeper;
