import classes from "./Pricing.module.css";
import {
  BASIC_RADIUS,
  GRAY_2,
  PRIMARY,
  PRIMARY_DILUTED,
  SECONDARY,
} from "../Utility/Colors";
import { HighlightWord } from "../Utility/HighlightWord";
import {
  getPlansFeaturesList,
  getPlansList,
} from "../Utility/Plans/Conversions";
import { Button } from "antd";

const Pricing = () => {
  const getPlans = () => {
    const originalPlans = getPlansList();

    return originalPlans;
  };

  const getFeatures = () => {
    return getPlansFeaturesList();
  };

  return (
    <div style={{ marginTop: "8.5em" }}>
      <div
        style={{
          fontWeight: "bolder",
          fontSize: "2em",
          marginBottom: "2.5em",
        }}>
        Simple, transparent and {HighlightWord("low pricing.")}
      </div>

      <table className={classes.tablePricing}>
        <tr className={classes.noTR}>
          <td></td>
          <td></td>
          <td>
            <div
              style={{
                color: "black",
                fontWeight: 600,
                backgroundColor: SECONDARY,
                borderTopLeftRadius: BASIC_RADIUS,
                borderTopRightRadius: BASIC_RADIUS,
                height: "80%",
                width: "80%",
                margin: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                top: 7,
                fontSize: "0.9em",
              }}>
              Recommended
            </div>
          </td>
          <td></td>
        </tr>
        <tr>
          <td
            style={{
              borderLeftColor: "white",
              borderTopColor: "white",
            }}></td>
          {getPlans().map((plan, index) => {
            return (
              <td
                style={{
                  paddingBottom: "1em",
                  paddingTop: "1em",
                  backgroundColor: "white",
                  borderColor: "#f0f0f0",
                }}>
                <div
                  style={{
                    textAlign: "left",
                    width: "80%",
                    margin: "auto",
                  }}>
                  <div
                    style={{
                      border: `1px solid ${plan.color}`,
                      backgroundColor: plan.color,
                      height: 4,
                    }}></div>
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.3em",
                      marginBottom: "1em",
                      color: "black",
                      marginTop: 10,
                    }}>
                    {plan.name}
                  </div>
                  <div style={{ marginBottom: 30 }}>
                    <span
                      style={{
                        fontWeight: "bolder",
                        fontSize: "2em",
                        color: PRIMARY,
                      }}>
                      ${plan.price}
                    </span>
                    {/* Suffix */}
                    <span style={{ color: GRAY_2, fontSize: "0.9em" }}>
                      {" "}
                      /month
                    </span>
                  </div>
                  <div>
                    <div
                      style={{
                        marginBottom: 10,
                        fontSize: "0.8em",
                        minHeight: 20,
                      }}></div>
                    <Button
                      onClick={() => {}}
                      style={{
                        width: "100%",
                        height: 40,
                        backgroundColor: PRIMARY_DILUTED,
                        borderColor: PRIMARY_DILUTED,
                        color: "white",
                        fontWeight: 600,
                      }}>
                      Choose plan
                    </Button>
                  </div>
                </div>
              </td>
            );
          })}
        </tr>

        {getFeatures().map((feature, index) => {
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
              {/* <td style={{ fontWeight: 600, fontSize: "1.1em" }}>
                    {feature.topup}
                  </td> */}
              <td style={{ fontWeight: 600, fontSize: "1.1em" }}>
                {feature.freelance}
              </td>
              <td
                style={{
                  fontWeight: 600,
                  fontSize: "1.1em",
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
