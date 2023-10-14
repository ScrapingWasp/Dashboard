import React, { useState } from "react";
import {
  MdArrowBackIos,
  MdCalendarMonth,
  MdContentCopy,
  MdImage,
  MdOutlineFileDownload,
} from "react-icons/md";
import { Tag, Image } from "antd";
import {
  BASIC_RADIUS,
  CORAL_RED,
  GENERIC_GRAY,
  GRAY_2,
  GREEN,
  PRIMARY_DILUTED,
  SECONDARY,
} from "../../Utility/Colors";
import classes from "./SCDescription.module.css";
import { addContextedCodeLine } from "../../Utility/HighlightWord";
import LoadableImage from "../../Utility/LoadableImage";

const SCDescription = ({ setShowDescription }) => {
  const [activeDataSwitch, setActiveDataSwitch] = useState("structured_data");

  const getStatusColors = (status) => {
    let color;
    let textColor = "white";

    if (status === "In Progress") {
      color = GRAY_2;
    } else if (status === "Completed") {
      color = GREEN;
    } else if (status === "Pending") {
      color = SECONDARY;
      textColor = "black";
    } else if (status === "Failed") {
      color = CORAL_RED;
    } else {
      color = GRAY_2;
    }
    return {
      color,
      textColor,
    };
  };

  const getActiveDataSwitchStyle = (dataSwitch) => {
    if (dataSwitch === activeDataSwitch) {
      return {
        backgroundColor: PRIMARY_DILUTED,
        color: "#fff",
      };
    }
    return {};
  };

  return (
    <div style={{}}>
      {/* Header */}
      <div
        style={{
          borderBottom: `1px solid ${GENERIC_GRAY}`,
          paddingBottom: 15,
        }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          {/* Job name */}
          <div
            className={classes.jobNameContainer}
            onClick={() => setShowDescription(false)}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              fontWeight: "bolder",
              fontSize: "1.4em",
            }}>
            <MdArrowBackIos />
            <div>Job name</div>
          </div>
          {/* Status */}
          <div>
            <Tag
              color={getStatusColors("Completed").color}
              style={{
                color: getStatusColors("Completed").textColor,
                fontSize: "1.1em",
                height: 30,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              key={"Completed"}>
              {"Completed"}
            </Tag>
          </div>
        </div>

        <div
          style={{
            width: "70%",
            marginTop: 25,
          }}>
          {addContextedCodeLine({
            code: "https://coolors.co/palette/8ecae6-219ebc-023047-ffb703-fb8500",
            context: "Url",
          })}
        </div>

        <div
          style={{
            fontWeight: 600,
            color: GRAY_2,
            display: "flex",
            alignItems: "center",
          }}>
          <MdCalendarMonth style={{ fontSize: "1.2em", marginRight: 4 }} /> Nov
          08, 2023 at 22:03
        </div>
      </div>

      {/* Data swicth */}
      <div className={classes.scHeader}>
        <div>
          <div>
            <MdImage style={{ fontSize: "1.3em", marginRight: 5 }} />{" "}
            <div>5 Images</div>
          </div>
        </div>
        <div>
          <MdOutlineFileDownload
            className={classes.copyData}
            style={{ fontSize: "2em" }}
          />
        </div>
      </div>

      {/* Switch screen */}
      <div
        style={{
          borderRadius: BASIC_RADIUS,
          marginTop: 10,
          display: "flex",
          flexWrap: "wrap",
        }}
        className={classes.imageShowerContainer}>
        {[1, 2, 3, 4, 5].map((image, index) => {
          return (
            <div>
              <div className={classes.imageChildContainer}>
                <LoadableImage width={200} src="https://picsum.photos/2800" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SCDescription;
