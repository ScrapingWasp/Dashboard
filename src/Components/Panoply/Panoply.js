import {
  MdFindInPage,
  MdTravelExplore,
  MdOutlineScreenshotMonitor,
} from "react-icons/md";
import { GRAY_1, GRAY_2 } from "../Utility/Colors";

const serviceIconStyle = {
  color: GRAY_1,
  fontSize: "2.1em",
};

const services = [
  {
    title: "General web scraping",
    description:
      "Scrape any website, no matter how complex and how restricted.",
    icon: <MdTravelExplore style={serviceIconStyle} />,
  },
  {
    title: "Data extraction",
    description: "Extract structured data from any website at a glance.",
    icon: <MdFindInPage style={serviceIconStyle} />,
  },
  {
    title: "Screenshots",
    description: "Take screenshots of any website's page at any time.",
    icon: <MdOutlineScreenshotMonitor style={serviceIconStyle} />,
  },
];

const Panoply = () => {
  return (
    <div
      style={{
        margin: "auto",
        display: "flex",
        flexDirection: "row",
        width: "70%",
        paddingTop: "8em",
        alignItems: "center",
        justifyContent: "center",
      }}>
      {services.map((service) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "2.5em",
              marginLeft: "1em",
              height: 80,
            }}>
            <div>{service.icon}</div>
            <div
              style={{
                textAlign: "left",
                marginLeft: "0.5em",
              }}>
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "1em",
                  color: GRAY_2,
                  marginBottom: "0.4em",
                }}>
                {service.title}
              </div>
              <div style={{ color: GRAY_1, fontSize: "0.95em" }}>
                {service.description}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Panoply;
