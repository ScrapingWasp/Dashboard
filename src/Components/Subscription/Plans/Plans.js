import React, { useState, useEffect } from "react";
import { MdCheck, MdHelpOutline, MdOutlineArrowForward } from "react-icons/md";
import classes from "./Plans.module.css";
import {
  BASIC_RADIUS,
  COOL_GRAY,
  CORAL_RED,
  DARK_GREEN,
  GENERIC_GRAY,
  GRAY_1,
  GRAY_2,
  GREEN,
  LIGHT_GREEN,
  MEAN_LIGHT_GRAY,
  PRIMARY,
  PRIMARY_COUSIN,
  PRIMARY_DILUTED,
  SECONDARY,
  TOPUP_COLOR,
} from "../../Utility/Colors";
import { HighlightWord } from "../../Utility/HighlightWord";
import {
  dollarsToCredits,
  getPlansFeaturesList,
  getPlansList,
  parseNumbers,
} from "../../Utility/Plans/Conversions";
import Header from "./Header";
import Promotion from "../../Utility/Plans/Promotion";
import { Button, Popover, InputNumber } from "antd";
import StickyBox from "react-sticky-box";

const defaultTopUpAmount = 5;
const minTopupAmount = defaultTopUpAmount;

const Plans = () => {
  const [topUpDollars, setTopupDollars] = useState(defaultTopUpAmount);
  const [creditsTopUp, setCreditsTopup] = useState(
    dollarsToCredits(defaultTopUpAmount)
  );

  useEffect(() => {
    document.title = "ScrapingWasp - Subscription";
  }, []);

  const QuestionFeature = ({ name }) => {
    return (
      <Popover
        trigger={"click"}
        content={"Same as for your current plan."}
        title={name}
        overlayStyle={{ width: "200px" }}>
        <MdHelpOutline
          style={{ color: GRAY_1, fontSize: "1.2em", cursor: "pointer" }}
        />
      </Popover>
    );
  };

  const getPlans = () => {
    const originalPlans = getPlansList();
    originalPlans.unshift({
      name: "Just Top Up",
      price: null,
      color: TOPUP_COLOR,
    });
    return originalPlans;
  };

  const getFeatures = () => {
    let originalFeatures = getPlansFeaturesList().map((feature) => {
      if (feature.name === "API credits") {
        feature["topup"] = (
          <div style={{ fontSize: "0.9em", color: GRAY_2, fontWeight: 500 }}>
            $1 per {dollarsToCredits(1)} credits
          </div>
        );
        return feature;
      } else {
        feature["topup"] = <QuestionFeature name={feature.name} />;
        return feature;
      }
    });

    return originalFeatures;
  };

  const isTopUp = (plan) => /just/i.test(plan);

  const onChangeTopUpAmount = (value) => {
    value = value ?? 0;
    setTopupDollars(value);
    setCreditsTopup(dollarsToCredits(value));
  };

  return (
    <div
      style={{
        marginBottom: 100,
      }}>
      <StickyBox offsetTop={0} offsetBottom={20}>
        <Header />
      </StickyBox>
      <div style={{ marginTop: "3.5em" }}>
        <Promotion />

        <table className={classes.tablePricing}>
          <tr className={classes.noTR}>
            <td></td>
            <td></td>
            <td>
              <div
                style={{
                  color: "black",
                  fontWeight: 600,
                  backgroundColor: MEAN_LIGHT_GRAY,
                  borderTopLeftRadius: BASIC_RADIUS,
                  borderTopRightRadius: BASIC_RADIUS,
                  height: "80%",
                  width: "80%",
                  margin: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  top: 7,
                  fontSize: "0.85em",
                }}>
                Current plan
              </div>
            </td>
            <td></td>
          </tr>
          <tr>
            <td
              style={{
                borderLeftColor: "white",
                borderTopColor: "white",
              }}></td>
            {getPlans().map((plan, index) => {
              return (
                <td
                  style={{
                    paddingBottom: "1em",
                    paddingTop: "1em",
                    backgroundColor: "white",
                    borderColor: "#f0f0f0",
                  }}>
                  <div
                    style={{
                      textAlign: "left",
                      width: "80%",
                      margin: "auto",
                    }}>
                    <div
                      style={{
                        border: `1px solid ${plan.color}`,
                        backgroundColor: plan.color,
                        height: 4,
                      }}></div>
                    <div
                      style={{
                        fontWeight: "bold",
                        fontSize: "1.3em",
                        marginBottom: "1em",
                        color: "black",
                        marginTop: 10,
                      }}>
                      {plan.name}
                    </div>
                    <div style={{ marginBottom: 30 }}>
                      {isTopUp(plan.name) ? (
                        <div>
                          <InputNumber
                            prefix={"$"}
                            min={minTopupAmount}
                            max={1000}
                            defaultValue={topUpDollars}
                            onChange={onChangeTopUpAmount}
                            style={{
                              fontSize: "1em",
                              width: "100%",
                            }}
                          />
                        </div>
                      ) : (
                        <span
                          style={{
                            fontWeight: "bolder",
                            fontSize: "1.4em",
                            color: PRIMARY,
                          }}>
                          ${plan.price}
                        </span>
                      )}
                      {/* Suffix */}
                      <span style={{ color: GRAY_2, fontSize: "0.9em" }}>
                        {" "}
                        {isTopUp(plan.name) ? "" : "/month"}
                      </span>
                    </div>
                    <div>
                      <div
                        style={{
                          marginBottom: 10,
                          fontSize: "0.8em",
                          minHeight: 20,
                        }}>
                        {isTopUp(plan.name) ? (
                          topUpDollars >= minTopupAmount ? (
                            <>
                              You get{" "}
                              <strong style={{ color: GREEN }}>
                                {parseNumbers(creditsTopUp)} credits
                              </strong>
                            </>
                          ) : (
                            <span>Minimum is ${minTopupAmount}</span>
                          )
                        ) : (
                          <></>
                        )}
                      </div>
                      <Button
                        style={{
                          width: "100%",
                          height: 40,
                          backgroundColor: isTopUp(plan.name)
                            ? GREEN
                            : PRIMARY_DILUTED,
                          borderColor: isTopUp(plan.name)
                            ? GREEN
                            : PRIMARY_DILUTED,
                          color: "white",
                          fontWeight: 600,
                        }}>
                        {isTopUp(plan.name) ? "Top up" : "Choose plan"}
                      </Button>
                    </div>
                  </div>
                </td>
              );
            })}
          </tr>

          {getFeatures().map((feature, index) => {
            return (
              <tr>
                <td
                  style={{
                    textAlign: "left",
                    width: 220,
                    fontWeight: "bold",
                    color: GRAY_2,
                    fontSize: "1em",
                    borderLeftColor: "white",
                    borderTopColor: "white",
                    borderBottomColor: "white",
                  }}>
                  {feature.name}
                </td>
                <td style={{ fontWeight: 600, fontSize: "1.1em" }}>
                  {feature.topup}
                </td>
                <td style={{ fontWeight: 600, fontSize: "1.1em" }}>
                  {feature.freelance}
                </td>
                <td
                  style={{
                    fontWeight: 600,
                    fontSize: "1.1em",
                  }}>
                  {feature.startup}
                </td>
                <td style={{ fontWeight: 600, fontSize: "1.1em" }}>
                  {feature.business}
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default Plans;
