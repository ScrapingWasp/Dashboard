import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateLoginData } from "../../../Redux/Reducers/SignupReducer";
import {
  MdCheck,
  MdCheckCircle,
  MdClose,
  MdHelpOutline,
  MdKeyboardArrowRight,
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
import {
  Button,
  Popover,
  InputNumber,
  Result,
  Tag,
  List,
  Checkbox,
} from "antd";
import StickyBox from "react-sticky-box";
import Pay from "../Payment/Payment";
import Loader from "../../Utility/Loader/Loader";
import toast from "react-hot-toast";
import CardsIcon from "../../Utility/CardsIcon/CardsIcon";
import { getUserProfile } from "../../Utility/Utils";

const defaultTopUpAmount = 5;
const minTopupAmount = defaultTopUpAmount;

const Plans = () => {
  const profileData = useSelector((state) => state?.signup?.loginData);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [step, setStep] = useState("choose_plan"); //choose_plan, payment, completion
  const [topUpDollars, setTopupDollars] = useState(defaultTopUpAmount);
  const [creditsTopUp, setCreditsTopup] = useState(
    dollarsToCredits(defaultTopUpAmount)
  );
  const [planPrices, setplanPrices] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null); //Default: null
  const [clientSecret, setClientSecret] = useState(null);
  const [confirmSetupIntent, setConfirmSetupIntent] = useState(false);
  const [subscriptionUpdate, setSubscriptionUpdate] = useState(false);
  const [isLoadingPaymentMethods, setIsLoadingPaymentMethods] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [showPutNewPaymentMethod, setShowPutNewPaymentMethod] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isLoadingDrySubscription, setIsLoadingDrySubscription] =
    useState(false);
  useState(false);
  const [indexCardRemoving, setIndexCardRemoving] = useState(null);
  const [isLoadingRemovingPaymentMethod, setIsLoadingRemovingPaymentMethod] =
    useState(false);

  useEffect(() => {
    if (!profileData?.token || !profileData?.customerId) {
      window.location.href = "/login";
    }
    console.log("HERE", profileData);
  }, [profileData]);

  useEffect(() => {
    document.title = "Subscription";

    if (!profileData?.token || !profileData?.customerId) {
      window.location.href = "/login";
    }

    (async () => {
      try {
        await handleGetPaymentMethods();
        await getUserProfile(profileData, dispatch, updateLoginData);

        const prices = await axios.get(
          `${process.env.REACT_APP_BACKEND}/prices`,
          {
            headers: {
              Authorization: `Bearer ${profileData?.token}`,
            },
            withCredentials: true,
          }
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

  const handleRemovePaymentMethod = async (paymentMethodId) => {
    try {
      if (isLoadingRemovingPaymentMethod) return;

      setSelectedPaymentMethod(null);
      setIndexCardRemoving(paymentMethodId);

      setIsLoadingRemovingPaymentMethod(true);

      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND}/api/v1/payment_methods/${paymentMethodId}`,
        {
          headers: {
            Authorization: `Bearer ${profileData?.token}`,
          },
          withCredentials: true,
        }
      );

      if (response?.data?.status === "success") {
        toast.success("Payment method removed successfully");
        await handleGetPaymentMethods();
      } else {
        console.log(response.data);
        toast.error("Unable to remove Payment method", { duration: 4000 });
      }

      setIsLoadingRemovingPaymentMethod(false);
    } catch (error) {
      console.error(error);
      setIsLoadingRemovingPaymentMethod(false);

      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("Unable to remove Payment method");
      }
    }
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

  // console.log(getPlans()[1]);

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
    // setIsLoading(true);
    if (!plan?.priceInfo?.id) window.location.reload();

    if (!profileData?.customerId) window.location.href = "/login";

    try {
      const subscription = await axios.post(
        `${process.env.REACT_APP_BACKEND}/subscription`,
        {
          customerId: profileData?.customerId,
          priceId: plan?.priceInfo?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${profileData?.token}`,
          },
          withCredentials: true,
        }
      );

      if (
        subscription?.data?.status === "success" &&
        subscription?.data?.clientSecret &&
        subscription?.data?.state !== "alreadyHaveSubscriptionGivePaymentChoice"
      ) {
        setClientSecret(subscription?.data?.clientSecret);
        // setStep("payment");
        // setIsLoading(false);
      } else if (
        subscription?.data?.status === "success" &&
        subscription?.data?.setupIntentClientSecret &&
        subscription?.data?.state !== "alreadyHaveSubscriptionGivePaymentChoice"
      ) {
        setClientSecret(subscription?.data?.setupIntentClientSecret);
        setConfirmSetupIntent(true);
        // setStep("payment");
        // setIsLoading(false);
      } else if (
        subscription?.data?.status === "success" &&
        subscription?.data?.subscription &&
        subscription?.data?.state !== "alreadyHaveSubscriptionGivePaymentChoice"
      ) {
        console.log(subscription?.data);
        // setStep("completion");
        // setStep("payment");
        // setSubscriptionUpdate(true);
        // setIsLoading(false);
      } else if (
        subscription?.data?.status === "success" &&
        subscription?.data?.state ===
          "alreadyHaveSubscriptionGivePaymentChoice" &&
        subscription?.data?.clientSecret
      ) {
        console.log(subscription?.data);
        setClientSecret(subscription?.data?.clientSecret);
        // setStep("completion");
        // setStep("payment");
        // setSubscriptionUpdate(true);
        // setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      // window.location.reload();
    }
  };

  const createDrySubscription = async (plan) => {
    setIsLoadingDrySubscription(true);

    if (isLoadingDrySubscription) return;

    if (!plan?.priceInfo?.id && selectedPaymentMethod?.id)
      window.location.reload();

    if (!profileData?.customerId) window.location.href = "/login";

    try {
      const subscription = await axios.post(
        `${process.env.REACT_APP_BACKEND}/subscription`,
        {
          customerId: profileData?.customerId,
          priceId: plan?.priceInfo?.id,
          paymentMethodId: selectedPaymentMethod?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${profileData?.token}`,
          },
          withCredentials: true,
        }
      );

      console.log(subscription?.data);

      if (subscription?.data?.status === "success") {
        setStep("completion");
        setSubscriptionUpdate(true);
        setIsLoading(false);
      } //Some erroer happend
      else {
        toast.error("Payment failed, use a different payment method.", {
          duration: 4000,
        });
      }

      setIsLoadingDrySubscription(false);
    } catch (error) {
      console.error(error);
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message, {
          duration: 4000,
        });
      } else {
        toast.error(
          "Unable to create subscription, use a different payment method.",
          { duration: 4000 }
        );
      }
      setIsLoadingDrySubscription(false);
    }
  };

  const handleGetPaymentMethods = async () => {
    if (isLoadingPaymentMethods) return;

    try {
      setIsLoadingPaymentMethods(true);

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND}/api/v1/payment_methods`,
        {
          headers: {
            Authorization: `Bearer ${profileData?.token}`,
          },
          withCredentials: true,
        }
      );

      if (response?.data?.status === "success" && response?.data?.data) {
        setPaymentMethods(response?.data?.data);
      } else {
        toast.error("Unable to get your Payment methods");
        setPaymentMethods([]);
      }

      setIsLoadingPaymentMethods(false);
    } catch (error) {
      console.error(error);
      setIsLoadingPaymentMethods(false);
      setPaymentMethods([]);
      toast.error("Unable to get your Payment methods");
    }
  };

  useEffect(() => {}, [selectedPaymentMethod, clientSecret]);

  const renderCurrentSubscriptionFlag = () => {
    return (
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
    );
  };

  console.log(profileData?.balance?.subscription?.plan);

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
            <tbody>
              <tr className={classes.noTR}>
                {[1, 2, 3, 4].map((_, index) => {
                  if (
                    profileData?.balance?.subscription?.plan === "FREELANCE" &&
                    index === 1
                  ) {
                    return <td>{renderCurrentSubscriptionFlag()}</td>;
                  } else if (
                    profileData?.balance?.subscription?.plan === "STARTUP" &&
                    index === 2
                  ) {
                    return <td>{renderCurrentSubscriptionFlag()}</td>;
                  } else if (
                    profileData?.balance?.subscription?.plan === "BUSINESS" &&
                    index === 3
                  ) {
                    return <td>{renderCurrentSubscriptionFlag()}</td>;
                  } else {
                    return <td></td>;
                  }
                })}
                {/* <td></td>
                <td></td>
                <td></td>
                <td></td> */}
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
                      key={plan?.name}
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
                            style={
                              {
                                // marginBottom: 10,
                                // fontSize: "0.8em",
                                // minHeight: 20,
                              }
                            }>
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
                              setStep("payment");
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
                  <tr key={index}>
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
            </tbody>
          </table>
        </div>
      ) : step === "payment" ? (
        <div>
          <div
            style={{
              fontSize: "0.9em",
              color: GRAY_1,
              width: 470,
              margin: "auto",
              borderBottom: `1px solid ${GENERIC_GRAY}`,
              textAlign: "left",
              marginTop: 60,
            }}>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "1.2em",
                marginBottom: 25,
                color: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
              className={classes.clickPaymentScenario}
              onClick={() => {
                setSelectedPaymentMethod(null);
                setShowPutNewPaymentMethod(true);
                createSubscriptionIntent(selectedPlan);
              }}>
              Pay with a new card
              {!showPutNewPaymentMethod && <MdKeyboardArrowRight />}
            </div>
            {showPutNewPaymentMethod ? (
              !clientSecret ? (
                <div style={{ marginBottom: 25 }}>
                  <Loader size={35} />
                </div>
              ) : (
                <Pay
                  clientSecret={clientSecret}
                  priceId={selectedPlan?.priceInfo?.id}
                  selectedPlan={selectedPlan}
                  setStep={setStep}
                  confirmSetupIntent={confirmSetupIntent}
                  // createDrySubscription={createDrySubscription}
                />
              )
            ) : (
              <></>
            )}
          </div>
          {/* Choose existing payment method */}
          <div
            style={{
              position: "relative",
              fontSize: "0.9em",
              color: GRAY_1,
              width: 470,
              margin: "auto",
              textAlign: "left",
            }}>
            <div
              className={classes.clickPaymentScenario}
              onClick={() => {
                handleGetPaymentMethods();
                setIsLoadingPaymentMethods(true);
                setShowPutNewPaymentMethod(false);
              }}
              style={{
                marginTop: 25,
                fontWeight: "bold",
                fontSize: "1.1em",
                marginBottom: 15,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
              }}>
              Choose a previous payment method
              {showPutNewPaymentMethod && <MdKeyboardArrowRight />}
            </div>
            {paymentMethods?.length <= 0 ? (
              "No payment method found"
            ) : showPutNewPaymentMethod ? (
              <></>
            ) : isLoadingPaymentMethods ? (
              <div style={{ marginBottom: 25 }}>
                <Loader size={35} />
              </div>
            ) : (
              <List
                dataSource={paymentMethods}
                style={{
                  paddingTop: 0,
                }}
                renderItem={(item) => (
                  <List.Item
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}>
                      <Checkbox
                        checked={selectedPaymentMethod?.id === item?.id}
                        onChange={() => {
                          if (selectedPaymentMethod?.id === item?.id)
                            return setSelectedPaymentMethod(null);
                          setSelectedPaymentMethod(item);
                        }}
                        style={{
                          position: "relative",
                          bottom: 4,
                          marginRight: 15,
                        }}
                      />
                      <div style={{ fontWeight: "bold" }}>
                        <CardsIcon
                          style={{ width: 35, height: 35 }}
                          cardName={item?.card?.brand}
                        />
                      </div>
                      <div
                        style={{
                          marginLeft: 15,
                          position: "relative",
                          bottom: 2,
                          fontWeight: 500,
                        }}>
                        •••• •••• •••• {item?.card?.last4}
                      </div>
                      {item?.default && (
                        <Tag
                          style={{
                            marginLeft: 20,
                            position: "relative",
                            bottom: 3,
                          }}>
                          Default
                        </Tag>
                      )}
                    </div>
                    {isLoadingRemovingPaymentMethod &&
                    indexCardRemoving === item?.id ? (
                      <Loader size={23} strokeWidth={3} />
                    ) : (
                      paymentMethods.length > 1 && (
                        <MdClose
                          onClick={() =>
                            isLoadingRemovingPaymentMethod
                              ? {}
                              : handleRemovePaymentMethod(item?.id)
                          }
                          style={{ fontSize: "1.5em" }}
                          className={classes.closeAddPaymentMethod}
                        />
                      )
                    )}
                  </List.Item>
                )}
              />
            )}
          </div>
          {selectedPaymentMethod && (
            <div style={{ width: 470, margin: "auto" }}>
              <Button
                style={{
                  backgroundColor: GREEN,
                  borderColor: GREEN,
                  width: "100%",
                  height: 45,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 25,
                  fontWeight: "bold",
                  color: "white",
                  fontSize: "1.1em",
                }}
                onClick={() =>
                  isLoadingDrySubscription
                    ? {}
                    : createDrySubscription(selectedPlan)
                }
                id="submit">
                {isLoadingDrySubscription ? (
                  <Loader size={30} color="white" />
                ) : (
                  <>
                    {`Pay now - $${selectedPlan?.priceInfo?.price}`}
                    <span
                      style={{
                        fontWeight: "normal",
                        fontSize: "0.8em",
                        marginLeft: 10,
                        position: "relative",
                        bottom: 1,
                      }}>
                      ({selectedPlan?.name} Plan)
                    </span>
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
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
