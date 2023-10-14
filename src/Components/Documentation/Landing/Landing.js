import React, { useState } from "react";
import { FireFilled } from "@ant-design/icons";
import Drawer from "../Drawer/Drawer";
import classes from "./Landing.module.css";
import { GENERIC_GRAY, SECONDARY } from "../../Utility/Colors";
import ScriptureBuilder from "../../Utility/Documentation/ScriptureBuilder";

const Landing = () => {
  const [selectedChildRef, setSelectedChildRef] = useState("/docs/setup");

  const getSelectedChildComponent = () => {
    if (selectedChildRef === "/docs/setup") {
      return <ScriptureBuilder />;
    } else if (selectedChildRef === "/docs/apikeys") {
      return <div>API keys</div>;
    } else if (selectedChildRef === "/docs/helloworld") {
      return <div>Make first request</div>;
    } else if (selectedChildRef === "/docs/webscraping") {
      return <div>General web scraping</div>;
    } else if (selectedChildRef === "/docs/extraction") {
      return <div>Data extraction</div>;
    } else if (selectedChildRef === "/docs/screenshots") {
      return <div>Screenshots</div>;
    } else {
      return <div>setup</div>;
    }
  };

  return (
    <div className={classes.mainDocParent}>
      <div
        style={{
          borderBottom: `1px solid ${GENERIC_GRAY}`,
          height: 70,
        }}>
        <div
          style={{
            paddingLeft: 25,
            paddingRight: 35,
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              fontWeight: "bolder",
              fontSize: "1.3em",
            }}>
            <FireFilled style={{ color: SECONDARY }} />{" "}
            <span style={{ paddingLeft: 3 }}>ScrapingWasp</span>
          </div>
        </div>
      </div>
      <div className={classes.mainNodeWithDrawer}>
        <div>
          <Drawer
            selectedChildRef={selectedChildRef}
            setSelectedChildRef={setSelectedChildRef}
          />
        </div>
        <div
          style={{
            width: "100%",
            height: "100%",
            overflowY: "auto",
          }}>
          {getSelectedChildComponent(selectedChildRef)}
        </div>
      </div>
    </div>
  );
};

export default Landing;
