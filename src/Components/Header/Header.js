import { FireFilled } from "@ant-design/icons";
import { Button, Space } from "antd";
import { GREEN_2, PRIMARY, SECONDARY, RED_2 } from "../Utility/Colors";
import classes from "./Header.module.css";

const options = [
  {
    title: "Docs",
    link: "https://docs.scrapingwasp.ai/",
  },
  {
    title: "Pricing",
    link: "https://scrapingwasp.ai/pricing/",
  },
];

const Header = () => {
  return (
    <div className={classes.fixedHeader}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: 1048,
          margin: "auto",
          marginTop: "2em",
          paddingTop: "0.6em",
        }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
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

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: "4em",
              alignItems: "center",
            }}>
            {options.map((option) => {
              return (
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.1em",
                    marginRight: "1em",
                    cursor: "pointer",
                  }}>
                  <a href={option.link} className={classes.headerOption}>
                    {option.title}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}>
          <div style={{ marginRight: 25, fontWeight: "bold" }}>Log in</div>
          <Button
            style={{
              backgroundColor: PRIMARY,
              fontWeight: "bold",
              fontSize: "1em",
              height: 45,
              cursor: "pointer",
            }}
            type="primary">
            Sign up for free
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
