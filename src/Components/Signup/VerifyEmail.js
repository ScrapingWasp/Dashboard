import React, { useEffect, useState } from "react";
import { Button, Result } from "antd";
import {
  BASIC_RADIUS,
  GENERIC_GRAY,
  GRAY_2,
  GREEN,
  PRIMARY,
  SECONDARY,
} from "../Utility/Colors";
import { MdEmail } from "react-icons/md";
import { FireFilled } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Utility/Loader/Loader";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { updateVerificationEmailData } from "../../Redux/Reducers/SignupReducer";

const VerifyEmail = () => {
  const { token } = useParams();
  const verifyEmailData = useSelector((state) => state.signup.verifyEmailData);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationToken, setVerificationToken] = useState(token);
  const [successfulVerification, setSuccessfulVerification] = useState(false);
  const [isCheckingVerificationToken, setIsCheckingVerificationToken] =
    useState(true);
  const dispatch = useDispatch();

  console.log("verifyEmailData", verifyEmailData);

  useEffect(() => {
    if (token) {
      setVerificationToken(token);
      setIsCheckingVerificationToken(true);

      (async () => {
        try {
          const checkToken = await axios.post(
            `${process.env.REACT_APP_BACKEND}/api/v1/verifyEmail`,
            {
              token,
            }
          );

          if (checkToken?.data?.status === "success") {
            setSuccessfulVerification(true);
            dispatch(updateVerificationEmailData({}));
            toast.success("Account successfully verified.", {
              duration: 5000,
            });
            setTimeout(() => {
              window.location.href = "/login";
            }, 3000);
          } else if (checkToken?.data?.status === "fail") {
            toast.error(checkToken?.data?.message, { duration: 5000 });
            setVerificationToken(null);
            setIsCheckingVerificationToken(false);
          } else {
            toast.error("Unable to confirm your email.", { duration: 5000 });
            setVerificationToken(null);
            setIsCheckingVerificationToken(false);
          }
        } catch (error) {
          console.error(error);
          toast.error("Unable to confirm your email.", { duration: 5000 });
          setVerificationToken(null);
          setIsCheckingVerificationToken(false);
        }
      })();
    } else {
      setIsCheckingVerificationToken(false);
    }
  }, [token]);

  useEffect(() => {
    if (!verifyEmailData?.email && !token) {
      window.location.href = "/";
    }
  }, [verifyEmailData]);

  const handleResentVerificationEmail = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const email = await axios.post(
        `${process.env.REACT_APP_BACKEND}/api/v1/resendVerificationEmail`,
        {
          email: verifyEmailData?.email,
        }
      );

      if (email?.data?.status === "success") {
        toast.success("Verification email sent successfully.", {
          duration: 5000,
        });
      } else if (email?.data?.status === "fail") {
        toast.error(email?.data?.message, {
          duration: 5000,
        });

        if (!verifyEmailData?.email) {
          window.location.href = "/login";
        }
      } else {
        toast.error("Something went wrong. Please try again.", {
          duration: 5000,
        });
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.", {
        duration: 5000,
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      {isCheckingVerificationToken ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "12%",
          }}>
          {verificationToken && (
            <div
              style={{
                fontWeight: "bold",
                fontSize: "1.4em",
                marginBottom: 50,
              }}>
              {successfulVerification
                ? "Account successfully verified. You will be taken to login now."
                : "Confirming your email, please wait..."}
            </div>
          )}
          {!successfulVerification && <Loader color={GREEN} />}
        </div>
      ) : !verifyEmailData?.email ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "12%",
          }}>
          <Loader />
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              fontWeight: "bolder",
              fontSize: "1.4em",
              margin: "auto",
              paddingTop: "5%",
            }}>
            <FireFilled style={{ color: SECONDARY }} />{" "}
            <span style={{ paddingLeft: 3 }}>ScrapingWasp</span>
          </div>
          <div
            style={{
              border: `1px solid ${GENERIC_GRAY}`,
              width: 500,
              height: 410,
              marginTop: "4%",
              borderRadius: BASIC_RADIUS,
            }}>
            <Result
              icon={null}
              status="success"
              title={
                <div style={{ textAlign: "left", color: GRAY_2 }}>
                  <div
                    style={{
                      color: "black",
                      marginBottom: 20,
                      fontWeight: "bold",
                      fontSize: "1.3em",
                      letterSpacing: -1,
                      display: "flex",
                      alignItems: "center",
                    }}>
                    <MdEmail
                      style={{
                        fontSize: "1em",
                        color: GRAY_2,
                        marginRight: 10,
                      }}
                    />
                    Please check your email
                  </div>
                  <div
                    style={{ fontSize: 16, marginBottom: 15, lineHeight: 1.5 }}>
                    Confirm your email address to get started with ScrapingWasp.
                  </div>
                  <div style={{ fontSize: 16, lineHeight: 1.5 }}>
                    We've sent a confirmation link to{" "}
                    <strong style={{ color: PRIMARY }}>
                      {verifyEmailData?.email}
                    </strong>
                    . If you do not receive anything right away, please check
                    your spam folder or contact our support
                  </div>
                </div>
              }
              extra={[
                <Button
                  onClick={handleResentVerificationEmail}
                  style={{
                    fontWeight: "bold",
                    height: 45,
                    fontSize: "1.1em",
                    width: "100%",
                    marginTop: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  key="console">
                  {isLoading ? (
                    <Loader size={25} />
                  ) : (
                    "Resend verification email"
                  )}
                </Button>,
              ]}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default VerifyEmail;
