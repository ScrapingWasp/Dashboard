import React, { useState } from "react";
import { FireFilled, InfoCircleOutlined } from "@ant-design/icons";
import { MdKeyboardArrowRight, MdOutlineDone } from "react-icons/md";
import { Button, Form, Input, Radio, Tag, List } from "antd";
import {
  BASIC_RADIUS,
  COOL_GRAY,
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

const Login = () => {
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState("optional");
  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  return (
    <div style={{ overflowX: "hidden", backgroundColor: LIGHT_GRAY }}>
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
              onValuesChange={onRequiredTypeChange}
              requiredMark={false}>
              <Form.Item
                label="Email"
                name="Email"
                style={basicLabelStyle}
                required>
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
                required>
                <Input.Password
                  type="password"
                  autoComplete="off"
                  style={basicInputStyle}
                />
                <div
                  style={{ color: PRIMARY, marginTop: 10, cursor: "pointer" }}>
                  Forgot your password?
                </div>
              </Form.Item>
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
                  }}
                  htmlType="submit">
                  Log in
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
