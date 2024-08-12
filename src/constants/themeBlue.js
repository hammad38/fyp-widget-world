const darkBlueTheme = {
  'code[class*="language-"]': {
    background: "#1e293b", // Deep dark blue background
    color: "#e2e8f0", // Light grayish text color for readability
    fontSize: "12px",
    fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
  },
  'pre[class*="language-"]': {
    background: "#1e293b", // Deep dark blue background
    color: "#e2e8f0", // Light grayish text color for readability
    fontSize: "12px",
    fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
    padding: "10px",
    overflow: "auto",
  },
  ".token.keyword": {
    color: "#60a5fa", // Bright blue for keywords
    fontWeight: "bold",
  },
  ".token.string": {
    color: "#a3e635", // Lime green for strings
  },
  ".token.number": {
    color: "#f472b6", // Pink for numbers
  },
  ".token.comment": {
    color: "#94a3b8", // Soft gray-blue for comments
    fontStyle: "italic",
  },
  ".token.variable": {
    color: "#fcd34d", // Golden yellow for variables
  },
  ".token.function": {
    color: "#38bdf8", // Sky blue for functions
  },
  ".token.attr-name": {
    color: "#c084fc", // Soft purple for attributes
  },
  ".token.builtin": {
    color: "#fb923c", // Orange for built-in elements
  },
  ".token.tag": {
    color: "#f87171", // Light red for tags
  },
  ".token.selector": {
    color: "#f87171", // Light red for selectors
  },
  ".token.title": {
    color: "#e879f9", // Soft pink for titles
  },
  ".token.symbol": {
    color: "#34d399", // Mint green for symbols
  },
  ".token.attr-value": {
    color: "#fbbf24", // Bright yellow for attribute values
  },
  ".token.bullet": {
    color: "#f472b6", // Pink for bullets and lists
  },
  ".token.section": {
    color: "#8b5cf6", // Soft violet for sections
  },
  ".token.strong": {
    fontWeight: "bold", // Bold for strong emphasis
  },
  ".token.emphasis": {
    fontStyle: "italic", // Italic for emphasis
  },
};

export default darkBlueTheme;
