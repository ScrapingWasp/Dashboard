import React, { useEffect } from "react";
import { MdAccountCircle } from "react-icons/md";
import {
  BASIC_RADIUS,
  COOL_GRAY,
  CORAL_RED,
  GENERIC_GRAY,
  GRAY_1,
  GRAY_2,
  GREEN,
  LIGHT_GRAY,
  PRIMARY,
  PRIMARY_DILUTED,
} from "../../Utility/Colors";
import { Button, Progress, Space } from "antd";
import classes from "./Landing.module.css";
import {
  MdCircle,
  MdContentCopy,
  MdCode,
  MdArrowForward,
} from "react-icons/md";

const getStarted = [
  {
    title: "General web scraping",
    description: "Learn how to scrape data from any website.",
    href: "/getstarted/general",
    beta: false,
  },
  {
    title: "Data extraction",
    description: "Learn how to extract data from a website.",
    href: "/getstarted/extraction",
    beta: false,
  },
  {
    title: "Screenshots",
    description: "Learn how to take screenshots of any website's page.",
    href: "/getstarted/screenshots",
    beta: false,
  },
  // {
  //   title: "Market analysis",
  //   description: "Unlock intelligence from a website data over time.",
  //   href: "/getstarted/analysis",
  //   beta: true,
  // },
];

const getAPIKeysCreds = () => {
  return [
    {
      name: "User Id",
      value: "ui_323443323",
    },
    {
      name: "API Key",
      value: "ak_323443323",
    },
  ];
};

const Landing = () => {
  useEffect(() => {
    document.title = "ScrapingWasp - Dashboard";
  }, []);

  return (
    <div
      style={{
        padding: 25,
        paddingLeft: 35,
        paddingRight: 35,
        display: "flex",
        overflowY: "auto",
      }}>
      <div style={{ flex: 1 }}>
        {/* Profile */}
        <div style={{ marginBottom: 40 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}>
            <MdAccountCircle
              style={{ fontSize: "4em", marginRight: 5, color: GRAY_1 }}
            />
            <div
              style={{
                textAlign: "left",
              }}>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "1.2em",
                  color: GRAY_2,
                  display: "flex",
                  alignItems: "center",
                }}>
                <div>Dominique Kanyik</div>
                <div
                  style={{
                    border: `1px solid ${GREEN}`,
                    backgroundColor: GREEN,
                    color: "white",
                    fontSize: "0.8em",
                    padding: 3,
                    paddingLeft: 10,
                    paddingRight: 10,
                    borderRadius: BASIC_RADIUS + 50,
                    marginLeft: 20,
                  }}>
                  Freelance
                </div>
              </div>
              <div
                style={{
                  fontSize: "0.8em",
                  color: GRAY_2,
                  display: "flex",
                  marginTop: 5,
                  alignItems: "center",
                }}>
                crystal_clear •{" "}
                <div style={{ marginLeft: 5 }}>domykanyiktesh01@gmail.com</div>
              </div>
            </div>
          </div>
        </div>

        {/* Get started */}
        <div
          style={{
            textAlign: "left",
            fontWeight: "bold",
            fontSize: "1.4em",
            marginBottom: 25,
          }}>
          Get started with ScrapingWasp
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}>
          {getStarted.map((item, index) => {
            return (
              <div key={index} className={classes.onboardingChild}>
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}>
                    <div>{item.title}</div>
                    {item?.beta && (
                      <div
                        style={{
                          backgroundColor: CORAL_RED,
                          fontWeight: "normal",
                          color: "white",
                          fontSize: "0.8em",
                          padding: 3,
                          paddingLeft: 7,
                          paddingRight: 7,
                          borderRadius: BASIC_RADIUS + 10,
                        }}>
                        Beta
                      </div>
                    )}
                  </div>
                  <div>{item.description}</div>
                </div>
                <div>
                  <Button
                    style={{
                      height: 40,
                      backgroundColor: PRIMARY_DILUTED,
                      borderColor: PRIMARY_DILUTED,
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "0.9em",
                    }}>
                    Show me how
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Usage */}
        <div
          style={{
            textAlign: "left",
            fontWeight: "bold",
            fontSize: "1.3em",
            marginBottom: 25,
            marginTop: 65,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <div>Usage</div>
          <div
            style={{
              fontWeight: "normal",
              fontSize: "0.7em",
              color: GRAY_2,
            }}>
            Billing period: Oct 8, 2023 - Nov 2, 2023
          </div>
        </div>
        <div style={{ textAlign: "left" }}>
          <div>
            <Progress
              percent={88}
              size={["100%", 35]}
              strokeColor={GREEN}
              showInfo={false}
            />

            <div style={{ marginTop: 25 }}>
              {/* Used */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 20,
                }}>
                <MdCircle color={GENERIC_GRAY} style={{ marginRight: 10 }} />
                <div style={{ fontSize: "0.9em" }}>
                  Used - <strong>100 credits</strong>
                </div>
              </div>
              {/* Remaining */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}>
                <MdCircle color={GREEN} style={{ marginRight: 10 }} />
                <div style={{ fontSize: "0.9em" }}>
                  Remaining - <strong>4000 credits</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          width: 250,
        }}>
        <div
          style={{
            border: `1px solid ${GENERIC_GRAY}`,
            textAlign: "left",
            padding: 10,
            marginTop: 153,
            paddingBottom: 20,
            paddingTop: 15,
            borderRadius: BASIC_RADIUS,
            backgroundColor: LIGHT_GRAY,
          }}>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "1em",
              color: GRAY_2,
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
            }}>
            <MdCode size={20} style={{ marginRight: 4 }} />
            Your API Keys
          </div>
          <div>
            {/* User id */}
            {getAPIKeysCreds().map((creds, index) => {
              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 15,
                    justifyContent: "space-between",
                  }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}>
                    <div
                      style={{
                        fontWeight: 600,
                        color: GRAY_2,
                        fontSize: "0.9em",
                        marginRight: 10,
                      }}>
                      {creds.name}
                    </div>
                    <div
                      style={{
                        border: `1px solid ${COOL_GRAY}`,
                        backgroundColor: COOL_GRAY,
                        borderRadius: BASIC_RADIUS,
                        padding: 5,
                        fontSize: "0.9em",
                      }}>
                      {creds.value}
                    </div>
                  </div>
                  <MdContentCopy />
                </div>
              );
            })}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontWeight: 600,
              fontSize: "0.9em",
              marginTop: 25,
              color: PRIMARY,
            }}>
            View docs{" "}
            <MdArrowForward
              style={{ position: "relative", top: 1, marginLeft: 10 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
