import React, { useState } from "react";
import {
  MdArrowBackIos,
  MdInsertDriveFile,
  MdSchema,
  MdCalendarMonth,
} from "react-icons/md";
import { Tag } from "antd";
import {
  CORAL_RED,
  GENERIC_GRAY,
  GRAY_2,
  GREEN,
  PRIMARY_DILUTED,
  SECONDARY,
} from "../../Utility/Colors";
import classes from "./DADescription.module.css";
import { addContextedCodeLine } from "../../Utility/HighlightWord";
import JSONViewer from "../../Utility/JSONViewer/JSONViewer";

const DADescription = () => {
  const [activeDataSwitch, setActiveDataSwitch] = useState("structured_data");

  const debugJSON = {
    "person": {
        "name": "John Doe",
        "age": 30,
        "isStudent": false,
        "subjects": [
            "Mathematics",
            "Physics",
            "Chemistry"
        ],
        "address": {
            "street": "123 Main St",
            "city": "Anytown",
            "state": "CA",
            "country": {
                "name": "United States",
                "code": "US",
                "regions": [
                    {
                        "name": "Northeast",
                        "states": ["New York", "Massachusetts", "Pennsylvania"]
                    },
                    {
                        "name": "West",
                        "states": ["California", "Nevada", "Hawaii"]
                    }
                ]
            }
        },
        "contacts": [
            {
                "type": "email",
                "value": "john.doe@example.com"
            },
            {
                "type": "phone",
                "value": "+1 (234) 567-8901"
            }
        ],
        "projects": [
            {
                "name": "Project One",
                "status": "completed",
                "details": {
                    "start_date": "2022-01-01",
                    "end_date": "2022-06-01",
                    "team_members": [
                        {
                            "name": "Alice",
                            "role": "Developer"
                        },
                        {
                            "name": "Bob",
                            "role": "Tester"
                        }
                    ]
                }
            },
            {
                "name": "Project Two",
                "status": "ongoing",
                "details": {
                    "start_date": "2022-05-01",
                    "expected_end_date": "2023-01-01",
                    "team_members": [
                        {
                            "name": "Charlie",
                            "role": "Developer"
                        },
                        {
                            "name": "Eve",
                            "role": "Designer"
                        }
                    ]
                }
            }
        ]
    }
}


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
      <div className={classes.dataSwitch}>
        <div style={getActiveDataSwitchStyle("raw_data")}>
          <MdInsertDriveFile style={{ fontSize: "1.3em", marginRight: 5 }} />{" "}
          <div>Raw Data</div>
        </div>
        <div style={getActiveDataSwitchStyle("structured_data")}>
          <MdSchema style={{ fontSize: "1.3em", marginRight: 5 }} />{" "}
          <div>Structured data</div>
        </div>
      </div>

      {/* Switch screen */}
      <div style={{ border: "1px solid black" }}>
        <div>
          <JSONViewer value={debugJSON} />
        </div>
      </div>
    </div>
  );
};

export default DADescription;
