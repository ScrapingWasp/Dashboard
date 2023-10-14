import React from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import prettier from "prettier/standalone";
import htmlParser from "prettier/parser-html";

const CodeBlock = ({ codeString, language }) => {
  const languageParserMap = {
    html: htmlParser,
    //... add more language-parser mappings as needed
  };

  const selectedParser = languageParserMap[language];

  const formattedCode = prettier.format(codeString, {
    parser: language,
    plugins: [selectedParser],
  });

  return (
    <SyntaxHighlighter language={language} style={docco}>
      {formattedCode}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
