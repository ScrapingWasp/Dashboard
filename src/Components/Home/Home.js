import React, { useEffect } from "react";
import { Button } from "antd";
import Header from "../Header/Header";
import { PRIMARY } from "../Utility/Colors";
import Panoply from "../Panoply/Panoply";
import CodeShow from "../CodeShow/CodeShow";
import { HighlightWord } from "../Utility/HighlightWord";
import Pricing from "../Pricing/Pricing";
import Promotion from "../Utility/Plans/Promotion";

const Home = () => {
  useEffect(() => {
    document.title = "ScrapingWasp - Own the data";
  }, []);

  return (
    <div
      style={{
        margin: "auto",
        marginBottom: "10em",
        overflowX: "hidden",
      }}>
      <Header />
      <div
        style={{
          width: "60%",
          margin: "auto",
          marginTop: "1em",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <div style={{ marginTop: "8.5em" }}>
          <Promotion />
        </div>
        <div
          style={{
            fontWeight: "bold",
            fontSize: "4em",
            marginTop: "0.5em",
          }}>
          Develop robust data pipelines. Quickly.
        </div>
        <div
          style={{
            fontSize: "1.2em",
            width: 650,
            marginTop: "2em",
            lineHeight: 1.5,
          }}>
          ScrapingWasp allows developers to build reliable data pipelines in
          minutes and at a {HighlightWord("low cost")}.
        </div>

        <div
          style={{
            width: 510,
            display: "flex",
            justifyContent: "space-between",
            marginTop: "3em",
          }}>
          <Button
            onClick={() => (window.location.href = "/signup")}
            style={{
              backgroundColor: PRIMARY,
              fontWeight: "bold",
              fontSize: "1.3em",
              height: 50,
              width: 240,
              cursor: "pointer",
            }}
            type="primary">
            Signup for free
          </Button>
          <Button
            onClick={() => (window.location.href = "/docs")}
            style={{
              backgroundColor: "#fff",
              fontWeight: "bold",
              fontSize: "1.3em",
              height: 50,
              width: 240,
              cursor: "pointer",
            }}>
            Docs
          </Button>
        </div>
      </div>

      <Panoply />

      <CodeShow />

      <Pricing />
    </div>
  );
};

export default Home;
