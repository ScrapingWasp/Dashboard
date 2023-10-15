import { Button, Result } from "antd";
import {
  BASIC_RADIUS,
  GENERIC_GRAY,
  GRAY_2,
  PRIMARY,
  SECONDARY,
} from "../Utility/Colors";
import { MdEmail } from "react-icons/md";
import { FireFilled } from "@ant-design/icons";

const VerifyEmail = () => {
  return (
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
                  style={{ fontSize: "1em", color: GRAY_2, marginRight: 10 }}
                />
                Please check your email
              </div>
              <div style={{ fontSize: 16, marginBottom: 15, lineHeight: 1.5 }}>
                Confirm your email address to get started with ScrapingWasp.
              </div>
              <div style={{ fontSize: 16, lineHeight: 1.5 }}>
                We've sent a confirmation link to{" "}
                <strong style={{ color: PRIMARY }}>
                  domykanyiktesh01@gmail.com
                </strong>
                . If you do not receive anything right away, please check your
                spam folder or contact our support
              </div>
            </div>
          }
          extra={[
            <Button
              style={{
                fontWeight: "bold",
                height: 45,
                fontSize: "1.1em",
                width: "100%",
                marginTop: 20,
              }}
              key="console">
              Resend verification email
            </Button>,
          ]}
        />
      </div>
    </div>
  );
};

export default VerifyEmail;
