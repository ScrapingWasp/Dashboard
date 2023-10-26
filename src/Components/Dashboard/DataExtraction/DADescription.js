import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  MdArrowBackIos,
  MdInsertDriveFile,
  MdSchema,
  MdCalendarMonth,
  MdContentCopy,
  MdOutlineDone,
} from "react-icons/md";
import { Tag, Typography } from "antd";
import {
  BASIC_RADIUS,
  CORAL_RED,
  GENERIC_GRAY,
  GRAY_2,
  GREEN,
  PRIMARY,
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
import {
  beautifyHtml,
  capitalize,
  formatDateGeneric,
} from "../../Utility/Utils";
import Loader from "../../Utility/Loader/Loader";
import toast from "react-hot-toast";
import axios from "axios";

const DADescription = ({ setShowDescription, descriptionDataLoaded }) => {
  const profileData = useSelector((state) => state?.signup?.loginData);
  const [isLoading, setIsLoading] = useState(false);
  const [activeDataSwitch, setActiveDataSwitch] = useState(
    descriptionDataLoaded?.data?.structured ? "structured_data" : "raw_data"
  );
  const [rawData, setRawData] = useState(
    descriptionDataLoaded?.data?.structured
      ? descriptionDataLoaded?.data?.structured
      : descriptionDataLoaded?.data?.raw
  );
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

  useEffect(() => {}, [rawData, activeDataSwitch]);

  const getStatusColors = (status) => {
    status = capitalize(status).replace("_", " ");
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

  const handleGetRawOrStructuredData = async (format) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND}/api/v1/profile/scraping/${descriptionDataLoaded?.id}/${format}`,
        {
          headers: {
            Authorization: `Bearer ${profileData?.token}`,
          },
          withCredentials: true,
        }
      );

      if (response?.data?.status === "success") {
        setRawData(
          format === "raw"
            ? response?.data?.data?.scrapes[0]?.data?.raw
            : response?.data?.data?.scrapes[0]?.data?.structured
        );
        setIsLoading(false);
      } else {
        toast.error("Failed to get the scrapped data.", {
          duration: 4000,
        });
        setRawData(null);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to get the scrapped data.", { duration: 4000 });
      setIsLoading(false);
    }
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
            <div>{descriptionDataLoaded?.job_name}</div>
          </div>
          {/* Status */}
          <div>
            <Tag
              color={getStatusColors(descriptionDataLoaded?.status).color}
              style={{
                color: getStatusColors(descriptionDataLoaded?.status).textColor,
                fontSize: "1.1em",
                height: 30,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              key={`${descriptionDataLoaded?.id}-status`}>
              {capitalize(descriptionDataLoaded?.status)}
            </Tag>
          </div>
        </div>

        <div
          style={{
            width: "70%",
            marginTop: 25,
          }}>
          {addContextedCodeLine({
            code: descriptionDataLoaded?.url,
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
          {formatDateGeneric(new Date(descriptionDataLoaded?.createdAt))}
        </div>
      </div>

      {/* Data swicth */}
      <div className={classes.dataSwitch}>
        <div>
          <div
            style={getActiveDataSwitchStyle("raw_data")}
            onClick={() => {
              setActiveDataSwitch("raw_data");
              handleGetRawOrStructuredData("raw");
            }}>
            <MdInsertDriveFile style={{ fontSize: "1.3em", marginRight: 5 }} />{" "}
            <div>Raw Data</div>
          </div>
          <div
            style={getActiveDataSwitchStyle("structured_data")}
            onClick={() => {
              setActiveDataSwitch("structured_data");
              handleGetRawOrStructuredData("structured");
            }}>
            <MdSchema style={{ fontSize: "1.3em", marginRight: 5 }} />{" "}
            <div>Structured data</div>
          </div>
        </div>
        <div>
          <Typography.Text
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
            copyable={{
              icon: [
                <MdContentCopy
                  color={PRIMARY}
                  style={{ fontSize: "1.8em" }}
                  key="copy-icon"
                />,
                <MdOutlineDone
                  style={{
                    fontSize: "1.8em",
                    position: "relative",
                    color: GREEN,
                  }}
                  key="copied-icon"
                />,
              ],
              tooltips: [
                activeDataSwitch === "raw_data"
                  ? "Copy raw data"
                  : "Copy structured data",
                "Copied!",
              ],
              text: JSON.stringify(rawData),
            }}></Typography.Text>
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
          {isLoading ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 350,
              }}>
              <Loader />
            </div>
          ) : !rawData ? (
            <div>Error loading your data, please try refreshing</div>
          ) : activeDataSwitch === "structured_data" ? (
            <JSONViewer value={rawData} />
          ) : (
            <div
              style={{
                wordWrap: "break-word",
                overflowX: "hidden",
                padding: 25,
              }}>
              {/* <CodeBlock
                text={beautifyHtml(rawData, 5)}
                language={"html"}
                showLineNumbers={false}
                theme={atomOneLight}
                wrapLines={true}
                // wrapLongLines
                codeContainerStyle={{
                  textAlign: "left",
                  paddingLeft: 15,
                  paddingRight: 15,
                }}
              /> */}
              {rawData}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DADescription;
