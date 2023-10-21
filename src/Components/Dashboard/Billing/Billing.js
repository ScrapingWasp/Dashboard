import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateLoginData } from "../../../Redux/Reducers/SignupReducer";
import { Button, Progress, Popover, Skeleton, List, Tag } from "antd";
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
  MdClose,
} from "react-icons/md";
import classes from "./Billing.module.css";
import {
  capitalize,
  formatBillingDetails,
  getPercentageUsed,
  getUserProfile,
} from "../../Utility/Utils";
import AddPaymentMethod from "../AddPaymentMethod/AddPaymentMethod";
import ModalWrapper from "../../Utility/Modal/Modal";
import axios from "axios";
import Loader from "../../Utility/Loader/Loader";
import toast from "react-hot-toast";
import CardsIcon from "../../Utility/CardsIcon/CardsIcon";
import { HighlightWord } from "../../Utility/HighlightWord";

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
    free: "1500",
    freelance: "250,000",
    startup: "1,500,0000",
    business: "4,000,000",
    description:
      "Your API credits are only valid for one month, left overs are not kept on the next month.",
  },
  {
    name: "Concurrent requests",
    free: 5,
    freelance: 10,
    startup: 50,
    business: 100,
    description: "The number of requests that can be sent at the same time.",
  },
  {
    name: "General web scraping",
    free: checkFeature(),
    freelance: checkFeature(),
    startup: checkFeature(),
    business: checkFeature(),
    description:
      "Scrape any website, no matter how complex and how restricted.",
  },
  {
    name: "Data extraction",
    free: checkFeature(),
    freelance: checkFeature(),
    startup: checkFeature(),
    business: checkFeature(),
    description: "Extract structured data from any website at a glance.",
  },
  {
    name: "Screenshots",
    free: checkFeature(),
    freelance: checkFeature(),
    startup: checkFeature(),
    business: checkFeature(),
    description: "Take screenshots of any website's page at any time.",
  },
  {
    name: "Priority email support",
    free: checkFeature(),
    freelance: emailUs(),
    startup: emailUs(),
    business: emailUs(),
    description: "Whenever you need help, we will be glad to assist promptly.",
  },
];

const Billing = () => {
  const profileData = useSelector((state) => state?.signup?.loginData);
  const dispatch = useDispatch();

  const [showAddPaymentMethod, setShowAddPaymentMethod] = useState(false);
  const [isLoadingBeforePaymentMethod, setIsLoadingBeforePaymentMethod] =
    useState(false);
  const [paymentMethodAddToken, setPaymentMethodAddToken] = useState(null);
  const [isLoadingPaymentMethods, setIsLoadingPaymentMethods] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isLoadingRemovingPaymentMethod, setIsLoadingRemovingPaymentMethod] =
    useState(false);
  const [indexCardRemoving, setIndexCardRemoving] = useState(null);
  const [isLoadingCancellingSubscription, setIsLoadingCancellingSubscription] =
    useState(false);
  const [showCancelSubscription, setShowCancelSubscription] = useState(false);

  const [currentPlan, setCurrentPlan] = useState(null);

  useEffect(() => {
    document.title = "Billing";

    if (profileData?.balance?.subscription?.plan) {
      setCurrentPlan(
        profileData?.balance?.subscription?.plan?.toLowerCase().trim()
      );
    } else if (profileData?.balance?.credits) {
      setCurrentPlan("free");
    }

    (async () => {
      await handleGetPaymentMethods();
    })();
  }, []);

  useEffect(() => {}, [profileData]);

  const doesHaveSubscription = () =>
    profileData?.balance?.subscription?.expirationDate;

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

  const handleGetTokenForAddingPaymentMethod = async () => {
    try {
      if (isLoadingBeforePaymentMethod) return;

      setIsLoadingBeforePaymentMethod(true);

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND}/api/v1/addcard_intent`,
        {
          headers: {
            Authorization: `Bearer ${profileData?.token}`,
          },
          withCredentials: true,
        }
      );

      if (response?.data?.status === "success" && response?.data?.data) {
        setPaymentMethodAddToken(response?.data?.data);
        setPaymentMethodAddToken(response?.data?.data);
        setShowAddPaymentMethod(true);
      } else {
        toast.error("Unable to add Payment methods");
        setPaymentMethodAddToken(null);
      }

      setIsLoadingBeforePaymentMethod(false);
    } catch (error) {
      console.error(error);
      setIsLoadingBeforePaymentMethod(false);
      setPaymentMethodAddToken(null);
      toast.error("Unable to add Payment methods");
    }
  };

  const handleSuccessPaymentMethodAddition = async () => {
    setShowAddPaymentMethod(false);
    setPaymentMethodAddToken(null);
    await handleGetPaymentMethods();
  };

  const handleRemovePaymentMethod = async (paymentMethodId) => {
    try {
      if (isLoadingRemovingPaymentMethod) return;

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
        toast.error(response?.data?.message, { duration: 4000 });
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

  const handleCancelSubscription = async () => {
    if (isLoadingCancellingSubscription) return;

    setIsLoadingCancellingSubscription(true);
    try {
      const cancel = await axios.post(
        `${process.env.REACT_APP_BACKEND}/api/v1/cancelSubscription`,
        {},
        {
          headers: {
            Authorization: `Bearer ${profileData?.token}`,
          },
          withCredentials: true,
        }
      );

      if (cancel?.data?.status === "success") {
        toast.success("Subscription cancelled successfully");
        await getUserProfile(profileData, dispatch, updateLoginData);
      } else {
        toast.error(cancel?.data?.message, { duration: 4000 });
      }
      setIsLoadingCancellingSubscription(false);
      setShowCancelSubscription(false);
    } catch (error) {
      console.error(error);
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("Unable to cancel subscription", { duration: 4000 });
      }
      setIsLoadingCancellingSubscription(false);
      setShowCancelSubscription(false);
    }
  };

  return (
    <div
      style={{
        padding: 25,
        paddingLeft: 35,
        paddingRight: 35,
        overflowY: "auto",
      }}>
      {/* Cancel subscription */}
      <ModalWrapper
        child={
          <div style={{ width: 450, padding: 25, paddingTop: 20 }}>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "1.3em",
                marginBottom: 35,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <span>Cancel Subscription</span>
              {!isLoadingCancellingSubscription && (
                <MdClose
                  onClick={() => setShowCancelSubscription(false)}
                  style={{ fontSize: "1.3em" }}
                  className={classes.closeAddPaymentMethod}
                />
              )}
            </div>
            <div style={{ lineHeight: 1.5 }}>
              We understand that circumstances change. If you decide to cancel
              your subscription, please know that{" "}
              {HighlightWord(`you're always welcome back`)}. Are you sure you'd
              like to proceed with the cancellation?
            </div>
            <div
              style={{
                marginTop: 65,
                display: "flex",
                alignItems: "center",
              }}>
              <Button
                onClick={handleCancelSubscription}
                style={{
                  height: 50,
                  fontWeight: "bold",
                  flex: 1,
                  fontSize: "0.9em",
                  backgroundColor: CORAL_RED,
                  borderColor: CORAL_RED,
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                {isLoadingCancellingSubscription ? (
                  <Loader size={30} strokeWidth={3} color={"white"} />
                ) : (
                  "Yes, cancel my subscription"
                )}
              </Button>
              <div style={{ width: 15 }}></div>
              {!isLoadingCancellingSubscription && (
                <Button
                  onClick={() => setShowCancelSubscription(false)}
                  style={{
                    height: 50,
                    fontWeight: "bold",
                    flex: 1,
                    fontSize: "1.1em",
                  }}>
                  Abort, Stay!
                </Button>
              )}
            </div>
          </div>
        }
        show={showCancelSubscription}
        setShow={setShowCancelSubscription}
      />
      {/* Add payment method */}
      <ModalWrapper
        child={
          <div style={{ width: 450, padding: 25, paddingTop: 20 }}>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "1.3em",
                marginBottom: 35,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <span>Add new payment method</span>
              <MdClose
                onClick={() => setShowAddPaymentMethod(false)}
                style={{ fontSize: "1.3em" }}
                className={classes.closeAddPaymentMethod}
              />
            </div>
            <AddPaymentMethod
              callback={handleSuccessPaymentMethodAddition}
              clientSecret={paymentMethodAddToken}
            />
          </div>
        }
        show={showAddPaymentMethod}
        setShow={setShowAddPaymentMethod}
      />
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
            {doesHaveSubscription()
              ? formatBillingDetails(profileData?.balance?.subscription)
                  .billing_period
              : "No subscriptions."}
          </div>
        </div>
        <div style={{ textAlign: "left" }}>
          <div>
            <Progress
              percent={getPercentageUsed(profileData).notUsed}
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
                  Used -{" "}
                  <strong>
                    {profileData?.balance?.usedCredits ?? 0} credits
                  </strong>
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
                  Remaining -{" "}
                  <strong>{profileData?.balance?.credits ?? 0} credits</strong>
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
            onClick={() => (window.location.href = "/plans")}
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
        {!currentPlan ? (
          <div>
            <Skeleton active style={{ width: "100%", height: 200 }} />
          </div>
        ) : (
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
              <div style={{ fontWeight: "bolder" }}>
                {capitalize(currentPlan).trim()} plan
              </div>
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
        )}

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
              onClick={() => handleGetTokenForAddingPaymentMethod()}
              style={{
                display: "flex",
                alignItems: "center",
                color: PRIMARY_DILUTED,
                fontWeight: 600,
                cursor: "pointer",
              }}>
              {isLoadingBeforePaymentMethod ? (
                <Loader size={23} strokeWidth={3} />
              ) : (
                <>
                  <MdAdd /> Add new
                </>
              )}
            </div>
          </div>
          {/* Cards */}
          <div style={{ padding: 15 }}>
            <div style={{ marginBottom: 25, fontSize: "0.9em", color: GRAY_1 }}>
              {paymentMethods?.length <= 0 ? (
                "No payment method found"
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
                      }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}>
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
            {isLoadingCancellingSubscription ? (
              <Loader size={30} strokeWidth={3} color={CORAL_RED} />
            ) : (
              <Button
                disabled={!doesHaveSubscription()}
                onClick={() =>
                  !doesHaveSubscription() ? {} : setShowCancelSubscription(true)
                }
                type="default">
                Cancel subscription
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
