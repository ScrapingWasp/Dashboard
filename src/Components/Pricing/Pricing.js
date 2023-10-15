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
import {
  getPlansFeaturesList,
  getPlansList,
} from "../Utility/Plans/Conversions";

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
          {getPlansList().map((plan, index) => {
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

        {getPlansFeaturesList().map((feature, index) => {
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
