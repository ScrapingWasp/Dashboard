import React, { useState } from "react";
import { FireFilled } from "@ant-design/icons";
import Drawer from "../Drawer/Drawer";
import classes from "./Landing.module.css";
import {
  GENERIC_GRAY,
  PRIMARY,
  PRIMARY_DILUTED,
  SECONDARY,
} from "../../Utility/Colors";
import ScriptureBuilder from "../../Utility/Documentation/ScriptureBuilder";
import { Button } from "antd";
import { dollarsToCredits } from "../../Utility/Plans/Conversions";
import { HighlightWord } from "../../Utility/HighlightWord";

const Landing = () => {
  const [selectedChildRef, setSelectedChildRef] = useState("/docs/setup");

  const getSelectedChildComponent = () => {
    if (selectedChildRef === "/docs/setup") {
      return (
        <ScriptureBuilder
          title={"Create your account"}
          subtitle="Learn how to create your account and get started."
          description={
            'Quickly get started by creating your account in just a few easy steps. Simply click the "Sign up for free" button below to gain instant access to all that ScrapingWasp has to offer.'
          }
          otherComponent={
            <div>
              <div style={{ marginTop: 35, marginBottom: 20 }}>
                You get {HighlightWord("1500 free credits")} for creating an
                account.
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                }}>
                <Button
                  onClick={() => window.open("/", "_blank")}
                  style={{
                    backgroundColor: PRIMARY,
                    fontWeight: "bold",
                    fontSize: "1em",
                    height: 45,
                    width: 200,
                    cursor: "pointer",
                    marginTop: 25,
                  }}
                  type="primary">
                  Signup for free
                </Button>
                <div style={{ marginLeft: 20 }}>
                  Or{" "}
                  <span
                    onClick={() => window.open("/", "_blank")}
                    style={{
                      fontWeight: "bold",
                      color: PRIMARY_DILUTED,
                      cursor: "pointer",
                    }}>
                    Login
                  </span>
                </div>
              </div>
            </div>
          }
          apiDocAppender={null}
          youtubeVideoId={"dRJVKoYhisM"}
          nextPage={{
            name: "Get your API Keys",
            href: "/docs/apikeys",
          }}
        />
      );
    } else if (selectedChildRef === "/docs/apikeys") {
      return (
        <ScriptureBuilder
          title={"Create your account"}
          subtitle="Learn how to create your account and get started."
          description="Get started quickly by learning how to create and set up your account in a few easy steps. This simple guide will show you how to sign up and get ready to explore our features and services with ease."
          otherComponent={
            <Button
              style={{
                backgroundColor: PRIMARY,
                fontWeight: "bold",
                fontSize: "1em",
                height: 45,
                width: 200,
                cursor: "pointer",
                marginTop: 25,
              }}
              type="primary">
              Signup for free
            </Button>
          }
          apiDocAppender={[
            {
              title: "API Section 1",
              description: "Description for API section 1...",
              requests: [
                {
                  requestCode: "GET /api/endpoint1",
                  postRequestDescription: "Description after request code 1...",
                },
                {
                  requestCode: "POST /api/endpoint2",
                  postRequestDescription: "Description after request code 2...",
                },
              ],
            },
          ]}
          youtubeVideoId={"dRJVKoYhisM"}
        />
      );
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
            marginLeft: 270,
          }}>
          {getSelectedChildComponent(selectedChildRef)}
        </div>
      </div>
    </div>
  );
};

export default Landing;
