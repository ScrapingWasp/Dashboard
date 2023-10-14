import React, { useState } from "react";
import {
  MdArrowBackIos,
  MdInsertDriveFile,
  MdSchema,
  MdCalendarMonth,
  MdContentCopy,
} from "react-icons/md";
import { Tag } from "antd";
import {
  BASIC_RADIUS,
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
import {
  CodeBlock,
  dracula,
  solarizedLight,
  a11yLight,
  atomOneLight,
} from "react-code-blocks";
import { beautifyHtml } from "../../Utility/Utils";

const DADescription = ({ setShowDescription }) => {
  const [activeDataSwitch, setActiveDataSwitch] = useState("structured_data");
  const debugJSONOld = {
    person: {
      name: "John Doe",
      age: 40,
      isStudent: false,
      subjects: ["Mathematics", "Physics", "Chemistry"],
      address: {
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        country: {
          name: "United States",
          code: "US",
          regions: [
            {
              name: "Northeast",
              states: ["New York", "Massachusetts", "Pennsylvania"],
            },
            {
              name: "West",
              states: ["California", "Nevada", "Hawaii"],
            },
          ],
        },
      },
      contacts: [
        {
          type: "email",
          value: "john.doe@example.com",
        },
        {
          type: "phone",
          value: "+1 (234) 567-8901",
        },
      ],
      projects: [
        {
          name: "Project One",
          status: "completed",
          details: {
            start_date: "2022-01-01",
            end_date: "2022-06-01",
            team_members: [
              {
                name: "Jessica",
                role: "Developer",
              },
              {
                name: "Bob",
                role: "Tester",
              },
            ],
          },
        },
        {
          name: "Project Two",
          status: "ongoing",
          details: {
            start_date: "2022-05-01",
            expected_end_date: "2023-01-01",
            team_members: [
              {
                name: "Charlie",
                role: "Chef",
              },
              {
                name: "Eve",
                role: "Designer",
              },
            ],
          },
        },
      ],
    },
  };
  const debugJSON = {
    person: {
      name: "John Doe",
      age: 30,
      isStudent: false,
      subjects: ["Mathematics", "Physics", "Chemistry"],
      address: {
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        country: {
          name: "United States",
          code: "US",
          regions: [
            {
              name: "Northeast",
              states: ["New York", "Massachusetts", "Pennsylvania"],
            },
            {
              name: "West",
              states: ["California", "Nevada", "Hawaii"],
            },
          ],
        },
      },
      contacts: [
        {
          type: "email",
          value: "john.doe@example.com",
        },
        {
          type: "phone",
          value: "+1 (234) 567-8901",
        },
      ],
      projects: [
        {
          name: "Project One",
          status: "completed",
          details: {
            start_date: "2022-01-01",
            end_date: "2022-06-01",
            team_members: [
              {
                name: "Alice",
                role: "Developer",
              },
              {
                name: "Bob",
                role: "Tester",
              },
            ],
          },
        },
        {
          name: "Project Two",
          status: "ongoing",
          details: {
            start_date: "2022-05-01",
            expected_end_date: "2023-01-01",
            team_members: [
              {
                name: "Charlie",
                role: "Developer",
              },
              {
                name: "Eve",
                role: "Designer",
              },
            ],
          },
        },
      ],
    },
  };
  const debugHTML = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Complex Test Page</title><style>body{font-family:Arial,sans-serif;margin:0;padding:0;}.header,.footer{background-color:#4CAF50;color:white;padding:15px;text-align:center;}nav ul{padding:0;list-style-type:none;overflow:hidden;background-color:#333;}li{float:left;}li a{display:block;color:white;text-align:center;padding:14px 16px;text-decoration:none;}li a:hover{background-color:#ddd;color:black;}</style></head><body><div class="header"><h1>Explore the World of Web Development</h1><p>Dive deep into various aspects, including frontend, backend, and full-stack development.</p></div><nav><ul><li><a href="#home">Home</a></li><li><a href="#about">About</a></li><li><a href="#services">Services</a></li><li><a href="#contact">Contact</a></li></ul></nav><main><article><h2>Frontend Development</h2><p>The frontend of a website is the part that users interact with. Everything that you see when you’re navigating around the Internet, from fonts and colors to dropdown menus and sliders, is a combo of HTML, CSS, and JavaScript being controlled by your computer’s browser.</p></article><section><h3>Backend Development</h3><p>Backend development refers to server-side development. Backend development works in tandem with the front end to deliver the final product to the end user. While front-end developers are responsible for client-side programming, back-end developers have to deal with the server-side.</p><code><?php $text = "Backend developers ensure that the server, the database, and the server-side applications function smoothly."; echo "<p>" . $text . "</p>";?></code></section><aside><h4>Full-stack Development</h4><p>A full-stack web developer is a technology expert who can work on both in the front end & back-end of any application. The person should be familiar with each layer of a 3-tier model. The 3-tier model includes The Presentation layer (Mainly related to the UI/UX of the application frontend), Business Logic Layer (Backend part of any application), and the database Layer.</p></aside></main><footer class="footer"><p>&copy; 2023 Complex Web Page. All rights reserved.</p></footer><script>document.querySelectorAll('nav ul li a').forEach(function(el){el.addEventListener('click',function(ev){ev.preventDefault();alert('This link is disabled for the demo!');});});</script></body></html>
`;

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
      <div className={classes.dataSwitch}>
        <div>
          <div
            style={getActiveDataSwitchStyle("raw_data")}
            onClick={() => setActiveDataSwitch("raw_data")}>
            <MdInsertDriveFile style={{ fontSize: "1.3em", marginRight: 5 }} />{" "}
            <div>Raw Data</div>
          </div>
          <div
            style={getActiveDataSwitchStyle("structured_data")}
            onClick={() => setActiveDataSwitch("structured_data")}>
            <MdSchema style={{ fontSize: "1.3em", marginRight: 5 }} />{" "}
            <div>Structured data</div>
          </div>
        </div>
        <div>
          <MdContentCopy
            className={classes.copyData}
            style={{ fontSize: "1.8em" }}
          />
        </div>
      </div>

      {/* Switch screen */}
      <div
        style={{
          border: "1px solid #d0d5e9",
          paddingTop: 5,
          paddingBottom: 5,
          borderRadius: BASIC_RADIUS,
          marginTop: 5,
        }}>
        <div>
          {activeDataSwitch === "structured_data" ? (
            <JSONViewer value={debugJSON} />
          ) : (
            <div>
              <CodeBlock
                text={beautifyHtml(debugHTML, 5)}
                language={"html"}
                showLineNumbers={false}
                theme={atomOneLight}
                wrapLines={true}
                wrapLongLines
                codeContainerStyle={{
                  textAlign: "left",
                  paddingLeft: 15,
                  paddingRight: 15,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DADescription;
