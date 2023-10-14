import React, { useState } from "react";
import { FireFilled } from "@ant-design/icons";
import Drawer from "../Drawer/Drawer";
import classes from "./Landing.module.css";
import { GENERIC_GRAY, SECONDARY } from "../../Utility/Colors";

const Landing = () => {
  const [selectedChild, setSelectedChild] = useState(<div>setup</div>);

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
            selectedChild={selectedChild}
            setSelectedChild={setSelectedChild}
          />
        </div>
        <div
          style={{
            width: "100%",
            height: "100%",
            overflowY: "auto",
          }}>
          {selectedChild}
        </div>
      </div>
    </div>
  );
};

export default Landing;
