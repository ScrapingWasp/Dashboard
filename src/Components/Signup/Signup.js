import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateVerificationEmailData,
  updateLoginData,
} from "../../Redux/Reducers/SignupReducer";
import { FireFilled } from "@ant-design/icons";
import { MdKeyboardArrowRight, MdOutlineDone } from "react-icons/md";
import { Button, Form, Input, List } from "antd";
import {
  BASIC_RADIUS,
  GENERIC_GRAY,
  GRAY_1,
  GRAY_2,
  GREEN,
  LIGHT_GRAY,
  MEAN_GRAY,
  MEAN_LIGHT_GRAY,
  PRIMARY,
  SECONDARY,
} from "../Utility/Colors";
import PasswordStrengthBar from "react-password-strength-bar";
import { HighlightWord } from "../Utility/HighlightWord";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "../Utility/Loader/Loader";

const data = [
  "1500 free credits after sign up",
  "20+ concurrent requests for free",
  "Limitless data retention",
  "Extremely fast support",
];

const basicInputStyle = {
  height: 40,
  fontWeight: 500,
  backgroundColor: MEAN_LIGHT_GRAY,
};

const basicLabelStyle = { fontWeight: 600 };

const Signup = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [password, setPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitActive, setIsSubmitActive] = useState(false);
  const [requiredMark, setRequiredMarkType] = useState("optional");

  const handleFormSubmit = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);

      const validation = await form.validateFields();

      const {
        Firstname: firstname,
        Lastname: lastname,
        Email: email,
        Password: password,
      } = form.getFieldsValue();

      const createAccount = await axios.post(
        `${process.env.REACT_APP_BACKEND}/api/v1/signup`,
        {
          firstname,
          lastname,
          email,
          password,
        }
      );

      dispatch(updateLoginData({}));

      if (createAccount.data?.status === "success") {
        toast.success("Account successfully created!");
        dispatch(updateVerificationEmailData(createAccount?.data?.data));
        window.location.href = "/verifyEmail";
      } else if (createAccount?.data?.status === "fail") {
        toast.error(createAccount?.data?.message, { duration: 5000 });
      } //error
      else {
        toast.error("An unexpected error occured, please try again.", {
          duration: 5000,
        });
      }
      setIsLoading(false);
    } catch (error) {
      toast.error("An unexpected error occured, please try again.", {
        duration: 5000,
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Signup";
  }, []);

  return (
    <div
      style={{
        overflowX: "hidden",
        backgroundColor: LIGHT_GRAY,
        height: "100vh",
      }}>
      <div
        style={{
          display: "flex",
          width: 1040,
          justifyContent: "center",
          margin: "auto",
          paddingTop: "5%",
          paddingBottom: 15,
        }}>
        <div
          style={{
            flex: 1,
            textAlign: "left",
            color: GRAY_2,
            paddingRight: 50,
          }}>
          <div
            onClick={() => (window.location.href = "/")}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              fontWeight: "bolder",
              fontSize: "1.2em",
              margin: "auto",
              paddingTop: "3%",
              cursor: "pointer",
            }}>
            <FireFilled style={{ color: SECONDARY }} />{" "}
            <span style={{ paddingLeft: 3 }}>ScrapingWasp</span>
          </div>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "1.9em",
              letterSpacing: -1,
              marginTop: 28,
            }}>
            Get started with {HighlightWord("free credits.")}
          </div>
          <div
            style={{
              fontSize: "0.85em",
              width: "70%",
              marginTop: 20,
              lineHeight: 1.5,
            }}>
            Take advantage of ScrapingWasp's powerful data APIs. You can always
            upgrade later.
          </div>
          <List
            bordered
            dataSource={data}
            renderItem={(item) => (
              <List.Item
                style={{
                  paddingLeft: 0,
                  border: "none",
                  fontWeight: 500,
                  paddingBottom: 5,
                }}>
                <MdOutlineDone
                  style={{
                    fontSize: "1.4em",
                    position: "relative",
                    top: 5,
                    marginRight: 5,
                    color: GREEN,
                  }}
                />{" "}
                {item}
              </List.Item>
            )}
            style={{
              border: "none",
              marginTop: 30,
            }}
          />
        </div>
        <div
          style={{
            border: `1px solid ${GENERIC_GRAY}`,
            height: 550,
            width: 400,
            padding: 30,
            textAlign: "left",
            borderRadius: BASIC_RADIUS,
            boxShadow: `2px 3px 5px ${MEAN_GRAY}`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            color: GRAY_2,
            backgroundColor: "white",
          }}>
          <div>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "1.7em",
                marginBottom: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <div>Sign up for free</div>
              <div
                onClick={() => (window.location.href = "/login")}
                style={{
                  fontWeight: "normal",
                  fontSize: 17,
                  color: GRAY_1,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}>
                Or{" "}
                <span
                  style={{ fontWeight: 500, color: PRIMARY, marginLeft: 5 }}>
                  Login
                </span>
                <MdKeyboardArrowRight color={PRIMARY} />
              </div>
            </div>
            <div style={{ fontWeight: 500, marginBottom: 30 }}>
              No credit card required
            </div>
            <Form
              form={form}
              layout="vertical"
              initialValues={{
                requiredMarkValue: requiredMark,
              }}
              onValuesChange={async () => {
                try {
                  await form.validateFields({
                    validateOnly: true,
                  });
                  setIsSubmitActive(true);
                } catch (error) {
                  if (error?.errorFields?.length <= 0) {
                    setIsSubmitActive(true);
                  } else {
                    setIsSubmitActive(false);
                  }
                }
              }}
              onSubmitCapture={handleFormSubmit}
              requiredMark={false}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}>
                <Form.Item
                  label="Firstname"
                  name="Firstname"
                  style={basicLabelStyle}
                  rules={[
                    {
                      required: true,
                      message: "Missing firstname",
                    },
                    {
                      min: 1,
                      message: "Must be at least 1 character",
                    },
                  ]}>
                  <Input style={basicInputStyle} />
                </Form.Item>
                <Form.Item
                  label="Lastname"
                  name="Lastname"
                  style={basicLabelStyle}
                  rules={[
                    {
                      required: true,
                      message: "Missing lastname",
                    },
                    {
                      min: 1,
                      message: "Must be at least 1 character",
                    },
                  ]}>
                  <Input autoComplete="off" style={basicInputStyle} />
                </Form.Item>
              </div>
              <Form.Item
                label="Email"
                name="Email"
                style={basicLabelStyle}
                rules={[
                  { required: true, message: "Please enter your email" },
                  {
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address",
                  },
                  { max: 256, message: "Email should be max 256 characters!" },
                  {
                    pattern: /^\S+@\S+$/i,
                    message: "Email should not contain spaces",
                  },
                ]}>
                <Input
                  type="email"
                  autoComplete="off"
                  style={basicInputStyle}
                />
              </Form.Item>
              <Form.Item
                label="Password"
                name="Password"
                style={basicLabelStyle}
                rules={[
                  {
                    required: true,
                    message: "Please enter your password",
                  },
                  {
                    min: 8,
                    message: "Must be at least 8 characters",
                  },
                ]}>
                <Input.Password
                  type="password"
                  autoComplete="off"
                  style={basicInputStyle}
                  value={password ?? ""}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>
              <PasswordStrengthBar password={password ?? ""} />
              <Form.Item>
                <Button
                  disabled={!isSubmitActive}
                  type="primary"
                  style={{
                    height: 45,
                    width: "100%",
                    fontWeight: "bold",
                    fontSize: "1.1em",
                    backgroundColor: PRIMARY,
                    color: "white",
                    marginTop: 10,
                    opacity: isSubmitActive ? 1 : 0.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  htmlType="submit">
                  {isLoading ? <Loader size={30} color={"white"} /> : "Sign up"}
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div
            style={{
              fontSize: "0.8em",
              color: GRAY_1,
              lineHeight: 1.5,
            }}>
            By signing up, you agree to ScrapingWasp's{" "}
            <span style={{ color: PRIMARY }}>Privacy Policy</span> and{" "}
            <span style={{ color: PRIMARY }}>Terms of Use.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
