import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateLoginData } from "../../Redux/Reducers/SignupReducer";
import { FireFilled } from "@ant-design/icons";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Button, Form, Input } from "antd";
import {
  BASIC_RADIUS,
  GENERIC_GRAY,
  GRAY_1,
  GRAY_2,
  LIGHT_GRAY,
  MEAN_GRAY,
  MEAN_LIGHT_GRAY,
  PRIMARY,
  SECONDARY,
} from "../Utility/Colors";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "../Utility/Loader/Loader";

const basicInputStyle = {
  height: 40,
  fontWeight: 500,
  backgroundColor: MEAN_LIGHT_GRAY,
};

const basicLabelStyle = { fontWeight: 600 };

const Login = () => {
  const loginData = useSelector((state) => state?.signup?.loginData);
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [isSubmitActive, setIsSubmitActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [requiredMark, setRequiredMarkType] = useState("optional");

  useEffect(() => {
    document.title = "Login";
  }, []);

  useEffect(() => {
    if (loginData?.token) {
      window.location.href = "/dashboard";
    }
  }, [loginData]);

  const handleLogin = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);

      const validation = await form.validateFields();

      const { Email: email, Password: password } = form.getFieldsValue();

      const createAccount = await axios.post(
        `${process.env.REACT_APP_BACKEND}/api/v1/login`,
        {
          email,
          password,
        }
      );

      if (createAccount.data?.status === "success") {
        toast.success("Logged in successfully.");
        dispatch(updateLoginData(createAccount?.data?.data));
        window.location.href = "/dashboard";
      } else if (createAccount?.data?.status === "fail") {
        toast.error("Wrong email or password.", {
          duration: 5000,
        });
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
          flexDirection: "column",
          width: 1040,
          margin: "auto",
          paddingTop: "4%",
          paddingBottom: 15,
          alignItems: "center",
        }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            fontWeight: "bolder",
            fontSize: "1.5em",
            margin: "auto",
            paddingTop: "2%",
            marginBottom: "4%",
          }}>
          <FireFilled style={{ color: SECONDARY }} />{" "}
          <span style={{ paddingLeft: 3 }}>ScrapingWasp</span>
        </div>

        <div
          style={{
            border: `1px solid ${GENERIC_GRAY}`,
            height: 450,
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
                marginBottom: 15,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <div>Welcome back!</div>
            </div>
            <div
              onClick={() => (window.location.href = "/signup")}
              style={{
                fontWeight: "normal",
                fontSize: 16,
                color: GRAY_1,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                marginBottom: 40,
              }}>
              New user?{" "}
              <span style={{ fontWeight: 500, color: PRIMARY, marginLeft: 5 }}>
                Sign up
              </span>
              <MdKeyboardArrowRight color={PRIMARY} />
            </div>
            <Form
              form={form}
              layout="vertical"
              initialValues={{
                requiredMarkValue: requiredMark,
              }}
              onSubmitCapture={handleLogin}
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
              requiredMark={false}>
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
                ]}>
                <Input.Password
                  type="password"
                  autoComplete="off"
                  style={basicInputStyle}
                />
              </Form.Item>
              <div style={{ color: PRIMARY, marginTop: 10, cursor: "pointer" }}>
                Forgot your password?
              </div>
              <Form.Item>
                <Button
                  type="primary"
                  style={{
                    height: 45,
                    width: "100%",
                    fontWeight: "bold",
                    fontSize: "1.1em",
                    backgroundColor: PRIMARY,
                    marginTop: 10,
                    opacity: isSubmitActive ? 1 : 0.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  htmlType="submit">
                  {isLoading ? <Loader size={30} color={"white"} /> : "Log in"}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
