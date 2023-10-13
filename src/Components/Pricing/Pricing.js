import { MdCheck } from "react-icons/md";
import classes from "./Pricing.module.css";
import {
  BASIC_RADIUS,
  DARK_GREEN,
  GRAY_1,
  GRAY_2,
  GREEN,
  LIGHT_GREEN,
  PRIMARY,
  SECONDARY,
} from "../Utility/Colors";
import { HighlightWord } from "../Utility/HighlightWord";

const plans = [
  {
    name: "Freelance",
    price: 29,
  },
  {
    name: "Startup",
    price: 99,
  },
  {
    name: "Business",
    price: 259,
  },
];

const checkFeature = () => {
  return <MdCheck style={{ color: GREEN, fontSize: "2em" }} />;
};

const features = [
  {
    name: "API credits",
    freelance: "250,000",
    startup: "1,500,0000",
    business: "4,000,000",
  },
  {
    name: "Concurrent requests",
    freelance: 10,
    startup: 50,
    business: 100,
  },
  {
    name: "General web scraping",
    freelance: checkFeature(),
    startup: checkFeature(),
    business: checkFeature(),
  },
  {
    name: "Data extraction",
    freelance: checkFeature(),
    startup: checkFeature(),
    business: checkFeature(),
  },
  {
    name: "Content monitoring",
    freelance: <></>,
    startup: checkFeature(),
    business: checkFeature(),
  },
  {
    name: "Screenshots",
    freelance: checkFeature(),
    startup: checkFeature(),
    business: checkFeature(),
  },
  {
    name: "Priority email support",
    freelance: <></>,
    startup: checkFeature(),
    business: checkFeature(),
  },
];

const Pricing = () => {
  return (
    <div style={{ marginTop: "7.5em" }}>
      <div
        style={{
          fontWeight: "bolder",
          fontSize: "2em",
          marginBottom: "2em",
        }}>
        Simple, transparent and {HighlightWord("low pricing.")}
      </div>
      <table className={classes.tablePricing}>
        <tr className={classes.noTR}>
          <td></td>
          <td></td>
          <td
            style={{
              backgroundColor: SECONDARY,
              borderTopLeftRadius: BASIC_RADIUS,
              borderTopRightRadius: BASIC_RADIUS,
            }}>
            <div
              style={{
                color: "black",
                fontWeight: "bold",
              }}>
              Recommended
            </div>
          </td>
          <td></td>
        </tr>
        <tr>
          <td
            style={{ borderLeftColor: "white", borderTopColor: "white" }}></td>
          {plans.map((plan, index) => {
            return (
              <td
                style={{
                  paddingBottom: "1em",
                  paddingTop: "1em",
                  backgroundColor: index === 1 ? "black" : "white",
                  borderColor: index === 1 ? "black" : "#f0f0f0",
                }}>
                <div>
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.3em",
                      marginBottom: "0.5em",
                      color: index === 1 ? "white" : "black",
                    }}>
                    {plan.name}
                  </div>
                  <div>
                    <span
                      style={{
                        fontWeight: "bolder",
                        fontSize: "2em",
                        color: index === 1 ? "white" : PRIMARY,
                      }}>
                      ${plan.price}
                    </span>
                    <span style={{ color: index === 1 ? "white" : GRAY_2 }}>
                      {" "}
                      /month
                    </span>
                  </div>
                </div>
              </td>
            );
          })}
        </tr>

        {features.map((feature, index) => {
          return (
            <tr>
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
              <td style={{ fontWeight: 600, fontSize: "1.1em" }}>
                {feature.freelance}
              </td>
              <td
                style={{
                  fontWeight: 600,
                  fontSize: "1.1em",
                  backgroundColor: "black",
                  borderColor: "black",
                  color: "white",
                }}>
                {feature.startup}
              </td>
              <td style={{ fontWeight: 600, fontSize: "1.1em" }}>
                {feature.business}
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Pricing;
