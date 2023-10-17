import React, { useState } from "react";
import {
  DARK_GREEN,
  GENERIC_GRAY,
  GRAY_1,
  GRAY_2,
  GREEN,
  LIGHT_GREEN,
  MEAN_LIGHT_GRAY,
  PRIMARY_DILUTED,
} from "../../Utility/Colors";
import classes from "./Drawer.module.css";

const gettingStarted = [
  {
    title: "Setup your account",
    childRef: "/docs/setup",
  },
  {
    title: "Get your API Keys",
    childRef: "/docs/apikeys",
  },
  {
    title: "Make your first request",
    childRef: "/docs/helloworld",
  },
];

const otherApis = [
  {
    title: "General web scraping",
    prefix: "POST",
    prefixBackColor: LIGHT_GREEN,
    prefixColor: "black",
    childRef: "/docs/webscraping",
  },
  {
    title: "Data extraction",
    prefix: "POST",
    prefixBackColor: LIGHT_GREEN,
    prefixColor: "black",
    childRef: "/docs/extraction",
  },
  {
    title: "Screenshots",
    prefix: "POST",
    prefixBackColor: LIGHT_GREEN,
    prefixColor: "black",
    childRef: "/docs/screenshots",
  },
];

const Drawer = ({ selectedChildRef, setSelectedChildRef }) => {
  const AddPreTitle = ({ title }) => {
    return (
      <div
        style={{
          fontWeight: "bold",
          color: GRAY_2,
          fontSize: "0.95em",
          marginBottom: 20,
          marginLeft: 25,
          marginRight: 25,
        }}>
        {title}
      </div>
    );
  };

  const getSelectedOptionStyle = (childRef) => {
    if (childRef === selectedChildRef) {
      return {
        borderColor: PRIMARY_DILUTED,
        backgroundColor: MEAN_LIGHT_GRAY,
        color: PRIMARY_DILUTED,
        fontWeight: 600,
      };
    }
    return {};
  };

  return (
    <div
      style={{
        borderRight: `1px solid ${GENERIC_GRAY}`,
        width: 270,
        height: "97.1vh",
        overflow: "hidden",
        paddingTop: 20,
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        position: "fixed",
      }}>
      {/* Get started */}
      <div
        style={{
          marginTop: 20,
          marginBottom: 35,
          borderBottom: `1px solid ${GENERIC_GRAY}`,
          paddingBottom: 25,
        }}>
        <AddPreTitle title={"Get Started"} />
        {gettingStarted.map((started, index) => {
          return (
            <div
              key={index}
              className={classes.optionChild}
              onClick={() => {
                setSelectedChildRef(started.childRef);
              }}
              style={getSelectedOptionStyle(started.childRef)}>
              {started.title}
            </div>
          );
        })}
      </div>

      {/* APIs */}
      <div
        style={{
          marginBottom: 35,
          paddingBottom: 25,
        }}>
        <AddPreTitle title={"APIs"} />
        {otherApis.map((api, index) => {
          return (
            <div
              key={index}
              className={classes.optionChild}
              onClick={() => {
                setSelectedChildRef(api.childRef);
              }}
              style={getSelectedOptionStyle(api.childRef)}>
              {api.title}
              <div
                className={classes.restPrefix}
                style={{
                  backgroundColor: api.prefixBackColor,
                  color: api.prefixColor,
                  borderColor: api.prefixBackColor,
                }}>
                {api.prefix}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Drawer;
