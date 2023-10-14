import React, { useState } from "react";
import { Button, Progress, Popover } from "antd";
import {
  BASIC_RADIUS,
  CORAL_RED,
  GENERIC_GRAY,
  GRAY_1,
  GRAY_2,
  GREEN,
  PRIMARY,
  PRIMARY_DILUTED,
  SECONDARY,
} from "../../Utility/Colors";
import {
  MdCircle,
  MdCheck,
  MdOutlineCircle,
  MdHelpOutline,
  MdEmail,
  MdOutlineOpenInNew,
  MdAdd,
} from "react-icons/md";
import classes from "./Billing.module.css";

const checkFeature = () => {
  return <MdCheck style={{ color: GREEN, fontSize: "2em" }} />;
};

const emailUs = () => {
  return (
    <a
      href="mailto:dominique@scrapingwasp.com"
      style={{
        display: "flex",
        alignItems: "center",
        fontWeight: 400,
        cursor: "pointer",
        color: PRIMARY_DILUTED,
        textDecoration: "none",
      }}>
      <MdEmail
        style={{
          position: "relative",
          fontSize: "1.2em",
          marginRight: 5,
          color: PRIMARY_DILUTED,
        }}
      />{" "}
      <div>Email us</div>
      <MdOutlineOpenInNew
        style={{
          position: "relative",
          fontSize: "0.9em",
          marginLeft: 5,
          top: 1,
          color: PRIMARY_DILUTED,
        }}
      />
    </a>
  );
};

const features = [
  {
    name: "API credits",
    freelance: "250,000",
    startup: "1,500,0000",
    business: "4,000,000",
    description:
      "Your API credits are only valid for one month, left overs are not kept on the next month.",
  },
  {
    name: "Concurrent requests",
    freelance: 10,
    startup: 50,
    business: 100,
    description: "The number of requests that can be sent at the same time.",
  },
  {
    name: "General web scraping",
    freelance: checkFeature(),
    startup: checkFeature(),
    business: checkFeature(),
    description:
      "Scrape any website, no matter how complex and how restricted.",
  },
  {
    name: "Data extraction",
    freelance: checkFeature(),
    startup: checkFeature(),
    business: checkFeature(),
    description: "Extract structured data from any website at a glance.",
  },
  //   {
  //     name: "Content monitoring",
  //     freelance: <></>,
  //     startup: checkFeature(),
  //     business: checkFeature(),
  //     description: "Monitor any website for changes in content.",
  //   },
  {
    name: "Screenshots",
    freelance: checkFeature(),
    startup: checkFeature(),
    business: checkFeature(),
    description: "Take screenshots of any website's page at any time.",
  },
  {
    name: "Priority email support",
    freelance: emailUs(),
    startup: emailUs(),
    business: emailUs(),
    description: "Whenever you need help, we will be glad to assist promptly.",
  },
];

const Billing = () => {
  const [currentPlan, setCurrentPlan] = useState("freelance");

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
        Billing
      </div>
      {/* Usage */}
      <div>
        <div
          style={{
            textAlign: "left",
            fontWeight: "bold",
            fontSize: "1.3em",
            marginBottom: 25,
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
              size={["100%", 30]}
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

      {/* Current subscription */}
      <div>
        <div
          style={{
            textAlign: "left",
            fontWeight: "bold",
            fontSize: "1.3em",
            marginTop: 75,
            marginBottom: 25,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}>
          <div>Current subscription</div>
          <Button
            style={{
              fontWeight: "bold",
              height: 38,
              backgroundColor: PRIMARY,
              color: "white",
              marginLeft: 25,
            }}>
            Upgrade
          </Button>
        </div>
        {/* Plan */}
        <div
          style={{
            border: `1px solid ${GENERIC_GRAY}`,
            textAlign: "left",
            borderRadius: BASIC_RADIUS,
          }}>
          <div
            style={{
              borderBottom: `1px solid ${GENERIC_GRAY}`,
              display: "flex",
              alignItems: "center",
              padding: 15,
              marginBottom: 10,
            }}>
            <MdOutlineCircle style={{ color: SECONDARY, marginRight: 10 }} />
            <div style={{ fontWeight: "bolder" }}>Freelance plan</div>
          </div>
          <div className={classes.subscriptionFeaturesContainer}>
            {features.map((feature, index) => {
              const value = feature[currentPlan];

              return (
                <div>
                  <div>
                    {feature.name}{" "}
                    <Popover
                      trigger={"click"}
                      content={feature.description}
                      title={feature.name}
                      overlayStyle={{ width: "200px" }}>
                      <MdHelpOutline
                        style={{
                          position: "relative",
                          top: 1,
                          marginLeft: 5,
                          cursor: "pointer",
                        }}
                      />
                    </Popover>
                  </div>
                  <div>{value}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Payment methods */}
        <div
          style={{
            border: `1px solid ${GENERIC_GRAY}`,
            textAlign: "left",
            borderRadius: BASIC_RADIUS,
            marginTop: 45,
          }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: 15,
              marginBottom: 10,
              justifyContent: "space-between",
            }}>
            <div style={{ fontWeight: "bold" }}>Payment methods</div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: PRIMARY_DILUTED,
                fontWeight: 600,
                cursor: "pointer",
              }}>
              <MdAdd /> Add new
            </div>
          </div>
          {/* Cards */}
          <div style={{ padding: 15 }}>
            <div style={{ marginBottom: 25, fontSize: "0.9em", color: GRAY_1 }}>
              No payment method found
            </div>
          </div>
        </div>

        {/* Danger */}
        <div
          style={{
            border: `1px solid ${GENERIC_GRAY}`,
            textAlign: "left",
            borderRadius: BASIC_RADIUS,
            marginTop: 45,
          }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: 15,
              marginBottom: 10,
              justifyContent: "space-between",
            }}>
            <div style={{ fontWeight: "bold", color: CORAL_RED }}>
              Danger Zone
            </div>
          </div>
          {/* Cancel sunscription */}
          <div style={{ padding: 15, marginBottom: 25 }}>
            <Button>Cancel subscription</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
