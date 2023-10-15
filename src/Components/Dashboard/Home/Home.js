import React, { useState } from "react";
import Billing from "../Billing/Billing";
import Drawer from "../Drawer/Drawer";
import Keeper from "../Keeper/Keeper";
import Landing from "../Landing/Landing";
import classes from "./Home.module.css";

const HomeDashboard = () => {
  const getCorrectScreen = () => {
    const link = window.location.pathname.split("/");

    if (link[link.length - 1] === "") {
      link.pop();
    }

    const routeBare = link.join("/");

    if (routeBare === "/dashboard") {
      return "dashboard";
    } else if (routeBare === "/dashboard/keeper") {
      return "keeper";
    } else if (routeBare === "/dashboard/billing") {
      return "billing";
    } else {
      return "dashboard";
    }
  };

  const [currentScreen, setCurrentScreen] = useState("dashboard");

  const getCurrentScreen = () => {
    const screen = getCorrectScreen();

    if (screen !== currentScreen) {
      setCurrentScreen(screen);
    }

    if (currentScreen === "dashboard") {
      return <Landing />;
    } else if (currentScreen === "keeper") {
      return <Keeper />;
    }
    return <Billing />;
  };

  return (
    <div className={classes.mainNodeWithDrawer}>
      <div>
        <Drawer />
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
          overflowY: "auto",
          marginLeft: 250,
          paddingBottom: 100,
        }}>
        {getCurrentScreen()}
      </div>
    </div>
  );
};

export default HomeDashboard;
