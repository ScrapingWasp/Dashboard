import React, { useState, useEffect } from "react";
import {
  MdCheck,
  MdCheckCircle,
  MdHelpOutline,
  MdOutlineArrowForward,
} from "react-icons/md";
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
import axios from "axios";
import Header from "./Header";
import Promotion from "../../Utility/Plans/Promotion";
import { Button, Popover, InputNumber, Result } from "antd";
import StickyBox from "react-sticky-box";
import Pay from "../Payment/Payment";
import Loader from "../../Utility/Loader/Loader";

const defaultTopUpAmount = 5;
const minTopupAmount = defaultTopUpAmount;

const Plans = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [step, setStep] = useState("choose_plan"); //choose_plan, payment, completion
  const [topUpDollars, setTopupDollars] = useState(defaultTopUpAmount);
  const [creditsTopUp, setCreditsTopup] = useState(
    dollarsToCredits(defaultTopUpAmount)
  );
  const [planPrices, setplanPrices] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [confirmSetupIntent, setConfirmSetupIntent] = useState(false);
  const [subscriptionUpdate, setSubscriptionUpdate] = useState(false);

  useEffect(() => {
    document.title = "ScrapingWasp - Subscription";

    (async () => {
      try {
        const prices = await axios.get(
          `${process.env.REACT_APP_BACKEND}/prices`
        );

        if (prices?.data?.status === "success") {
          setplanPrices(prices?.data?.data);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    })();
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
    // originalPlans.unshift({
    //   name: "Just Top Up",
    //   price: null,
    //   color: TOPUP_COLOR,
    // });

    const completedPlans = originalPlans.map((plan) => {
      plan["priceInfo"] = planPrices.filter(
        (price) => price?.lookupKey?.trim() === plan.name.toLowerCase().trim()
      )?.[0];
      return plan;
    });

    return completedPlans;
  };

  const getFeatures = () => {
    // let originalFeatures = getPlansFeaturesList().map((feature) => {
    //   if (feature.name === "API credits") {
    //     feature["topup"] = (
    //       <div style={{ fontSize: "0.9em", color: GRAY_2, fontWeight: 500 }}>
    //         $1 per {dollarsToCredits(1)} credits
    //       </div>
    //     );
    //     return feature;
    //   } else {
    //     feature["topup"] = <QuestionFeature name={feature.name} />;
    //     return feature;
    //   }
    // });

    return getPlansFeaturesList();
  };

  const isTopUp = (plan) => /just/i.test(plan);

  const onChangeTopUpAmount = (value) => {
    value = value ?? 0;
    setTopupDollars(value);
    setCreditsTopup(dollarsToCredits(value));
  };

  const createSubscriptionIntent = async (plan) => {
    setIsLoading(true);
    if (!plan?.priceInfo?.id) window.location.reload();

    try {
      const subscription = await axios.post(
        `${process.env.REACT_APP_BACKEND}/subscription`,
        {
          customerId: "cus_OpB8EI4Ye59QsJ",
          priceId: plan?.priceInfo?.id,
        }
      );

      if (
        subscription?.data?.status === "success" &&
        subscription?.data?.clientSecret
      ) {
        setClientSecret(subscription?.data?.clientSecret);
        setStep("payment");
        setIsLoading(false);
      } else if (
        subscription?.data?.status === "success" &&
        subscription?.data?.setupIntentClientSecret
      ) {
        setClientSecret(subscription?.data?.setupIntentClientSecret);
        setConfirmSetupIntent(true);
        setIsLoading(false);
      } else if (
        subscription?.data?.status === "success" &&
        subscription?.data?.subscription
      ) {
        setStep("completion");
        setSubscriptionUpdate(true);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      window.location.reload();
    }
  };

  return (
    <div
      style={{
        marginBottom: 100,
      }}>
      <StickyBox offsetTop={0} offsetBottom={20} style={{ zIndex: 100000 }}>
        <Header step={step} />
      </StickyBox>
      {isLoading ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "18%",
          }}>
          <Loader />
        </div>
      ) : !planPrices ? (
        <div>Error loading plans</div>
      ) : step === "choose_plan" ? (
        <div style={{ marginTop: "4.5em" }}>
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
                          onClick={() => {
                            setSelectedPlan(plan);
                            createSubscriptionIntent(plan);
                          }}
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
                  {/* <td style={{ fontWeight: 600, fontSize: "1.1em" }}>
                    {feature.topup}
                  </td> */}
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
      ) : step === "payment" ? (
        <Pay
          clientSecret={clientSecret}
          priceId={selectedPlan?.priceInfo?.id}
          selectedPlan={selectedPlan}
          setStep={setStep}
          confirmSetupIntent={confirmSetupIntent}
        />
      ) : (
        <div style={{ marginTop: 40 }}>
          <Result
            icon={<MdCheckCircle style={{ fontSize: "6em", color: GREEN }} />}
            status="success"
            title={
              <div>
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.5em",
                    marginBottom: 15,
                  }}>
                  ${selectedPlan?.priceInfo?.price}
                </div>
                <div style={{ color: "black", marginBottom: 20 }}>
                  {!selectedPlan?.name ? (
                    "Successfully purchased your plan."
                  ) : subscriptionUpdate ? (
                    <>
                      Successfully updated to{" "}
                      {HighlightWord(`${selectedPlan?.name} Plan.`)}
                    </>
                  ) : (
                    <>
                      Successfully purchased the{" "}
                      {HighlightWord(`${selectedPlan?.name} Plan.`)}
                    </>
                  )}
                </div>
              </div>
            }
            subTitle="We'll email your the invoice having your order details shortly."
            extra={[
              <Button
                style={{
                  borderColor: PRIMARY,
                  backgroundColor: PRIMARY,
                  color: "white",
                  fontWeight: "bold",
                  height: 45,
                  fontSize: "1.1em",
                  width: 200,
                  marginTop: 20,
                }}
                onClick={() => (window.location.href = "/dashboard")}
                key="console">
                Go to Dashboard
              </Button>,
            ]}
          />
        </div>
      )}
    </div>
  );
};

export default Plans;
