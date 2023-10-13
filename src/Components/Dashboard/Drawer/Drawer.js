import { FireFilled, HomeFilled } from "@ant-design/icons";
import {
  MdAccountCircle,
  MdKeyboardArrowDown,
  MdStorage,
  MdCreditCard,
  MdHelpOutline,
  MdInsertDriveFile,
  MdLogout,
} from "react-icons/md";
import classes from "./Drawer.module.css";
import {
  BASIC_RADIUS,
  COOL_GRAY,
  GENERIC_GRAY,
  GRAY_1,
  GRAY_2,
  GREEN,
  LIGHT_GRAY,
  PRIMARY,
  SECONDARY,
} from "../../Utility/Colors";
import { Button, Progress, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

const optionsIconStyle = { fontSize: "1.1em", marginRight: 15, color: GRAY_2 };

const options = [
  {
    name: "Home",
    icon: <HomeFilled style={optionsIconStyle} />,
    href: "/dashboard",
  },
  {
    name: "Keeper",
    icon: <MdStorage style={optionsIconStyle} />,
    href: "/storage",
  },
  {
    name: "Billing",
    icon: <MdCreditCard style={optionsIconStyle} />,
    href: "/billing",
  },
];

const documentations = [
  {
    name: "Documentation",
    icon: <MdInsertDriveFile style={optionsIconStyle} />,
    href: "/documentation",
  },
  {
    name: "Getting started",
    icon: <MdHelpOutline style={optionsIconStyle} />,
    href: "/getstarted",
  },
];

const activateOption = (href) => {
  if (window.location.pathname === href) {
    return {
      color: "#00509d",
      backgroundColor: "#fafafa",
      borderLeft: "5px solid #00509d",
    };
  } else return {};
};

const Drawer = () => {
  const getProfileDropdown = () => {
    const profile = (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}>
        <MdAccountCircle
          style={{ fontSize: "2.5em", marginRight: 5, color: GRAY_1 }}
        />
        <div>
          <div style={{ fontWeight: 600, fontSize: "0.9em", color: GRAY_2 }}>
            Dominique Kanyik
          </div>
          <div style={{ fontSize: "0.9em", color: PRIMARY }}>crystal_clear</div>
        </div>
      </div>
    );

    const data = [
      {
        label: (
          <div
            style={{
              fontWeight: "bold",
              color: GRAY_2,
              fontSize: "1.2em",
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 10,
            }}>
            <div>Your Account</div>
            <div
              style={{
                border: `1px solid ${GREEN}`,
                backgroundColor: GREEN,
                color: "white",
                fontSize: "0.7em",
                padding: 3,
                borderRadius: BASIC_RADIUS,
              }}>
              Freelance
            </div>
          </div>
        ),
        disabled: true,
        style: {
          cursor: "default",
        },
        key: "0",
      },
      {
        label: profile,
        key: "1",
        disabled: true,
        style: {
          cursor: "default",
        },
      },
      {
        type: "divider",
      },
      {
        label: (
          <div className={classes.optionsContainer}>
            <div className={classes.optionSignout}>
              <MdLogout style={optionsIconStyle} />
              <span>Sign out</span>
            </div>
          </div>
        ),
        key: "3",
      },
    ];

    return data;
  };

  return (
    <div
      style={{
        borderRight: `1px solid ${GENERIC_GRAY}`,
        width: 250,
        height: "97.1vh",
        overflow: "hidden",
        paddingTop: 20,
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}>
      {/* Part 1 */}
      <div>
        <div
          style={{
            paddingLeft: 15,
            paddingRight: 15,
          }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              fontWeight: "bolder",
              fontSize: "1.3em",
            }}>
            <FireFilled style={{ color: SECONDARY }} />{" "}
            <span style={{ paddingLeft: 3 }}>ScrapingWasp</span>
          </div>
        </div>
        {/* Profile */}
        <Dropdown
          menu={{
            items: getProfileDropdown(),
          }}
          trigger={["click"]}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 25,
              border: `1px solid ${COOL_GRAY}`,
              backgroundColor: COOL_GRAY,
              padding: 5,
              paddingLeft: 10,
              paddingRight: 10,
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: BASIC_RADIUS + 5,
              cursor: "pointer",
              marginBottom: 25,
              marginLeft: 15,
              marginRight: 15,
            }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}>
              <MdAccountCircle
                style={{ fontSize: "2.5em", marginRight: 5, color: GRAY_1 }}
              />
              <div>
                <div
                  style={{ fontWeight: 600, fontSize: "0.9em", color: GRAY_2 }}>
                  Dominique
                </div>
                <div style={{ color: GRAY_2, fontSize: "0.7em" }}>
                  Personal account
                </div>
              </div>
            </div>
            <MdKeyboardArrowDown />
          </div>
        </Dropdown>
        {/* Elements */}
        <div className={classes.optionsContainer}>
          {options.map((option, index) => {
            return (
              <div
                className={classes.optionChild}
                style={activateOption(option.href)}>
                {option.icon}
                <span>{option.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Part 2 */}
      <div>
        {/* Docs */}
        <div className={classes.docsContainer}>
          {documentations.map((option, index) => {
            return (
              <div
                className={classes.optionChild}
                style={activateOption(option.href)}>
                {option.icon}
                <span>{option.name}</span>
              </div>
            );
          })}
        </div>
        {/* Summary */}
        <div
          style={{
            paddingLeft: 15,
            paddingRight: 15,
            borderTop: `1px solid ${GENERIC_GRAY}`,
            height: 180,
            paddingTop: 25,
          }}>
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "0.8em",
              }}>
              <div style={{ fontWeight: "bold", color: GRAY_2 }}>Credits</div>
              <div style={{ fontWeight: 500 }}>12% used</div>
            </div>
            <Progress strokeColor={GREEN} percent={88} showInfo={false} />
            <div
              style={{
                fontSize: "0.8em",
                color: GRAY_2,
              }}>
              Credits resets on Dec 15
            </div>
          </div>

          <Button
            style={{
              fontWeight: "bolder",
              width: "100%",
              height: 50,
              marginTop: 25,
              backgroundColor: PRIMARY,
              color: "white",
            }}>
            Upgrade
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
