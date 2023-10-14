import React, { useEffect } from "react";
import { Tabs } from "antd";
import DataExtraction from "../DataExtraction/DataExtraction";
import Screenshots from "../Screenshots/Screenshots";
import { GRAY_2 } from "../../Utility/Colors";

const Keeper = () => {
  useEffect(() => {
    document.title = "ScrapingWasp - Keeper";
  }, []);

  const getTabItems = () => {
    const items = [
      {
        key: "1",
        label: "Data Extraction",
        children: <DataExtraction />,
      },
      {
        key: "2",
        label: "Screenshots",
        children: <Screenshots />,
      },
      //   {
      //     key: "3",
      //     label: "Market analysis",
      //     children: "Content of Tab Pane 3",
      //   },
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
      <Tabs defaultActiveKey="2" onChange={onTabChange} items={getTabItems()} />
    </div>
  );
};

export default Keeper;
