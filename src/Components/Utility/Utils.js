export const calculateDiffPercentage = (obj1, obj2) => {
  let diffPercentages = {};

  const calculateDiff = (path, value1, value2) => {
    if (
      typeof value1 === "number" &&
      typeof value2 === "number" &&
      value1 !== 0
    ) {
      // Compute the percentage difference for numeric values
      diffPercentages[path] = ((value2 - value1) / Math.abs(value1)) * 100;
    } else if (typeof value1 === "object" && typeof value2 === "object") {
      // Recursive call for nested objects
      for (let key in value1) {
        calculateDiff(path ? `${path}.${key}` : key, value1[key], value2[key]);
      }
    }
  };

  calculateDiff("", obj1, obj2);

  return diffPercentages;
};

export function beautifyHtml(html, indentSize = 2) {
  let indent = 0;
  const tokens = html.split(/(<(?:\/?[a-zA-Z]+).*?>)/g).filter(Boolean);
  const indents = [""];

  for (let i = 1; i < 100; i++) {
    indents.push(indents[i - 1] + " ".repeat(indentSize));
  }

  const formattedHtml = tokens
    .map((token) => {
      if (/^<\/.*?>$/.test(token)) {
        indent--;
      }

      let line = indents[indent] + token;

      if (/^<[^/].*?>$/.test(token) && !/^<.*?\/>$/.test(token)) {
        indent++;
      }

      return line;
    })
    .join("\n");

  return formattedHtml;
}
