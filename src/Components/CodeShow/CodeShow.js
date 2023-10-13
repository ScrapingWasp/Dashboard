import { GRAY_1, GRAY_2, LIGHT_GRAY } from "../Utility/Colors";
import {
  HighlightWord,
  addContextedCodeLine,
  apiRequestLine,
} from "../Utility/HighlightWord";
import { CodeBlock, dracula } from "react-code-blocks";
import { MdOutlineArrowDownward } from "react-icons/md";

const CodeShow = () => {
  return (
    <div
      style={{
        border: `1px solid ${LIGHT_GRAY}`,
        backgroundColor: LIGHT_GRAY,
        width: "100%",
        marginTop: "3em",
        paddingTop: "3em",
        paddingBottom: "3em",
      }}>
      <div
        style={{
          fontWeight: "bolder",
          fontSize: "2em",
          marginBottom: "3em",
        }}>
        Straight to the {HighlightWord("Point.")}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "80%",
          margin: "auto",
          justifyContent: "space-between",
        }}>
        <div
          style={{
            textAlign: "left",
          }}>
          <div style={{ fontWeight: "bold", fontSize: "1.3em", color: GRAY_2 }}>
            Make a simple request
          </div>
          <div
            style={{
              width: "80%",
              marginTop: "1em",
              color: GRAY_1,
            }}>
            Effortlessly initiate a basic request to seamlessly retrieve data,
            utilizing user-friendly interface.
          </div>
        </div>
        <div
          style={{
            width: "90%",
            position: "relative",
            bottom: "15px",
          }}>
          {apiRequestLine({
            url: "https://api.scrapingwasp.ai/v1/",
            predicate: "POST",
          })}
          {addContextedCodeLine({
            code: `{"url": "https://www.pnp.co.za/c/pnpbase"}`,
            context: "Body",
          })}

          <div>
            <MdOutlineArrowDownward style={{ fontSize: "2em" }} />
          </div>
          <CodeBlock
            text={`   {
        "url": "https://httpbin.org/",
        "page": \`<!DOCTYPE html><html lang="en"><head>...\`
   }`}
            language={"javascript"}
            showLineNumbers={false}
            theme={dracula}
            wrapLines={true}
            codeContainerStyle={{
              textAlign: "left",
              paddingLeft: 0,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeShow;
