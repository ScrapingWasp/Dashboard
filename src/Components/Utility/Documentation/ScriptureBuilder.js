import { COOL_GRAY, GENERIC_GRAY, GRAY_1, GRAY_2 } from "../Colors";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import YoutubeEmbed from "../YoutubeEmbed/YoutubeEmbed";
import classes from "./ScriptureBuilder.module.css";

// {
//     title: "API Section 1",
//     description: "Description for API section 1...",
//     requests: [
//       {
//         requestCode: "GET /api/endpoint1",
//         postRequestDescription: "Description after request code 1...",
//       },
//       {
//         requestCode: "POST /api/endpoint2",
//         postRequestDescription: "Description after request code 2...",
//       },
//     ],
//   },

const APIRequestSection = ({ section }) => {
  return (
    <div>
      <h3>{section.title}</h3>
      {section.description && <p>{section.description}</p>}
      {section.requests &&
        section.requests.map((request, index) => (
          <div key={index}>
            <code>{request.requestCode}</code>
            {request.postRequestDescription && (
              <p>{request.postRequestDescription}</p>
            )}
          </div>
        ))}
    </div>
  );
};

const ScriptureBuilder = ({
  title = "YOUR TITLE HERE",
  subtitle = "Your subtitle here",
  description = "A short and concise description here",
  otherComponent = null,
  apiDocAppender = [
    {
      title: "API request 1",
      description: null,
      requests: null,
      postRequestDescription: null,
    },
  ],
  youtubeVideoId = null,
  nextPage = null,
  previousPage = null,
}) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
        }}>
        <div
          style={{
            textAlign: "left",
            paddingLeft: 35,
            paddingRight: 35,
            paddingTop: 35,
            color: GRAY_2,
            lineHeight: 1.5,
            flex: 1,
          }}>
          <div style={{ width: "85%" }}>
            <div
              style={{
                fontWeight: "bolder",
                fontSize: "1.8em",
                letterSpacing: -1,
              }}>
              {title}
            </div>
            <div
              style={{
                fontWeight: 500,
                fontSize: "1.4em",
                marginBottom: 25,
              }}>
              {subtitle}
            </div>
            <div>{description}</div>
            <div>{otherComponent}</div>
            {apiDocAppender &&
              apiDocAppender.map((section, index) => (
                <APIRequestSection key={index} section={section} />
              ))}
          </div>

          {/* Pages */}
          {(previousPage || nextPage) && (
            <div
              style={{
                borderTop: `1px solid ${GENERIC_GRAY}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "15%",
                paddingTop: 13,
                width: "85%",
              }}
              className={classes.pagesOptions}>
              <div>
                {previousPage && previousPage?.href && previousPage?.name && (
                  <>
                    <MdKeyboardArrowLeft /> {previousPage?.name}
                  </>
                )}
              </div>
              <div>
                {nextPage && nextPage?.href && nextPage?.name && (
                  <>
                    {nextPage?.name} <MdKeyboardArrowRight />
                  </>
                )}
              </div>
            </div>
          )}
        </div>
        {/* Right content */}
        <div
          style={{
            width: 300,
            paddingTop: 35,
            paddingRight: 35,
          }}>
          {youtubeVideoId && (
            <div
              style={{
                textAlign: "left",
                fontWeight: 600,
                fontSize: "0.9em",
                color: GRAY_1,
              }}>
              <div style={{ marginBottom: 15 }}>Or watch the quick video</div>
              <YoutubeEmbed embedId={youtubeVideoId} width={640} height={360} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScriptureBuilder;
