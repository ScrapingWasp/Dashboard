import { FireFilled } from "@ant-design/icons";
import {
  MdCircle,
  MdPayment,
  MdCheckCircle,
  MdOutlineViewCarousel,
  MdOutlineClose,
} from "react-icons/md";
import { GENERIC_GRAY, MEAN_GRAY, SECONDARY } from "../../Utility/Colors";
import { Divider, Steps, Popover } from "antd";

const genericStepsIconStyle = {
  color: MEAN_GRAY,
  fontSize: "1.1em",
  position: "relative",
  top: 2,
};

const Header = () => {
  return (
    <div
      style={{
        backgroundColor: "white",
      }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: 1048,
          margin: "auto",
          paddingTop: 15,
          alignItems: "flex-start",
        }}>
        <div
          style={{
            flex: 1,
          }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              fontWeight: "bolder",
              fontSize: "1.6em",
            }}>
            <FireFilled style={{ color: SECONDARY }} />{" "}
            <span style={{ paddingLeft: 3 }}>ScrapingWasp</span>
          </div>
        </div>
        {/* Progress */}
        <div
          style={{
            flex: 2,
            position: "relative",
            top: 5,
          }}>
          <div
            style={{
              fontWeight: "bolder",
              marginBottom: 30,
              fontSize: "1.3em",
              letterSpacing: -0.8,
            }}>
            New subscription
          </div>
          <div style={{ transform: "scale(0.9)" }}>
            <Steps
              current={2}
              icons
              items={[
                {
                  title: "Choose plan",
                  icon: <MdCircle style={genericStepsIconStyle} />,
                },
                {
                  title: "Payment",
                  icon: <MdCircle style={genericStepsIconStyle} />,
                },
                {
                  title: "Done",
                  icon: <MdCircle style={genericStepsIconStyle} />,
                },
              ]}
            />
          </div>
        </div>
        {/* Close */}
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
          }}>
          <MdOutlineClose
            style={{
              fontSize: "1.5em",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
