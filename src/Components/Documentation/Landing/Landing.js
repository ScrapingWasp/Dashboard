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
import { HighlightWord } from "../../Utility/HighlightWord";
import { MdArrowForward } from "react-icons/md";

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
          title={"Get your API Keys"}
          subtitle="Learn How to Obtain Your API Keys."
          description="Explore ScrapingWasp's powerful APIs by getting your API keys. Follow our straightforward guide to navigate through the account dashboard, locate your keys, and keep them safely for your application development and integration tasks."
          otherComponent={null}
          apiDocAppender={null}
          youtubeVideoId={"dRJVKoYhisM"}
          previousPage={{
            name: "Create your account",
            href: "/docs/setup",
          }}
          nextPage={{
            name: "Make your first request",
            href: "/docs/helloworld",
          }}
        />
      );
    } else if (selectedChildRef === "/docs/helloworld") {
      return (
        <ScriptureBuilder
          title={"Make your first request"}
          subtitle="Learn How to Make Your First API Request with ScrapingWasp"
          description="Embark on your journey by making your first API request seamlessly. This guide will walk you through crafting and sending your initial request, helping you to interact with ScrapingWasp, and explore the robust capabilities of our API in a straightforward manner."
          otherComponent={null}
          apiDocAppender={null}
          youtubeVideoId={"dRJVKoYhisM"}
          previousPage={{
            name: "Get your API Keys",
            href: "/docs/apikeys",
          }}
          nextPage={{
            name: "General web scraping API",
            href: "/docs/webscraping",
          }}
        />
      );
    } else if (selectedChildRef === "/docs/webscraping") {
      return (
        <ScriptureBuilder
          title={"General Web Scraping API"}
          subtitle="Learn How to Scrape any website at Low Cost"
          description="Discover cost-effective approaches to web scraping without compromising quality. This guide unveils how you can extract valuable data from any website while keeping your expenditures in check, ensuring you gather the insights you need without breaking the bank."
          otherComponent={null}
          apiDocAppender={null}
          youtubeVideoId={"dRJVKoYhisM"}
          previousPage={{
            name: "Make your first request",
            href: "/docs/helloworld",
          }}
          nextPage={{
            name: "Data extraction API",
            href: "/docs/extraction",
          }}
        />
      );
    } else if (selectedChildRef === "/docs/extraction") {
      return (
        <ScriptureBuilder
          title={"Data Extraction API"}
          subtitle="Learn How to Tranform any website's page into Structured data."
          description="Unlock the secrets to converting website pages into organized, structured data. This guide takes you through a step-by-step process of transforming raw web page content into a structured format, making it easy to analyze, visualize, and leverage the information effectively in your projects or applications."
          otherComponent={null}
          apiDocAppender={null}
          youtubeVideoId={"dRJVKoYhisM"}
          previousPage={{
            name: "General web scraping API",
            href: "/docs/webscraping",
          }}
          nextPage={{
            name: "Screenshots API",
            href: "/docs/screenshots",
          }}
        />
      );
    } else if (selectedChildRef === "/docs/screenshots") {
      return (
        <ScriptureBuilder
          title={"Screenshots API"}
          subtitle="Learn How to Take Screenshots any website's page at Ease."
          description="Explore the straightforward methods to effortlessly capture screenshots of any website page. This guide introduces you to easy-to-follow steps and tips, enabling you to obtain clear and precise screenshots of web pages, which you can utilize for documentation, analysis, or sharing visual data seamlessly."
          otherComponent={null}
          apiDocAppender={null}
          youtubeVideoId={"dRJVKoYhisM"}
          previousPage={{
            name: "General web scraping API",
            href: "/docs/webscraping",
          }}
        />
      );
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
            justifyContent: "space-between",
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
          <div
            style={{
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              color: PRIMARY_DILUTED,
            }}
            className={classes.backToPortalButton}>
            Go to Dashboard{" "}
            <MdArrowForward
              style={{
                position: "relative",
                marginLeft: 10,
              }}
            />
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
