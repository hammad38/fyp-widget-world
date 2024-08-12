import React, { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FiCopy } from "react-icons/fi";
import "./WidgetCategory.css";
import fallBackImage from "../assets/default-fallback-image.png";

const WidgetCategory = ({ category, categoryName }) => {
  const [widgets, setWidgets] = useState([]);
  const [copied, setCopied] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    fetch("https://nodejs-fyp-production.up.railway.app/approvedwidgets")
      .then((response) => response.json())
      .then((data) => {
        const filteredWidgets = data.filter(
          (widget) => widget.approved && widget.category === category
        );
        setWidgets(filteredWidgets);
      })
      .catch((error) => console.error("Error fetching widgets:", error));
  }, [category]);

  const handleCopy = (id) => {
    setCopied(true);
    setCopiedId(id);
    setTimeout(() => {
      setCopied(false);
      setCopiedId(null);
    }, 1500);
  };

  return (
    <div className="editor-container-widget">
      <h1 className="section-title-widget">{categoryName}</h1>
      {widgets.length === 0 && <p>Loading widgets, please wait...</p>}
      {widgets.map((widget) => (
        <div key={widget._id} className="section">
          <div className="section-header">
            <h1 className="section-title">{widget.widgetName}</h1>
          </div>

          <div className="section-content">
            <div className="image-column">
              <img
                src={
                  widget.Image && widget.Image.startsWith("http")
                    ? widget.Image
                    : `https://nodejs-fyp-production.up.railway.app${widget.Image}`
                }
                alt={widget.widgetName}
                className="image"
                style={{ width: "auto", height: "auto" }}
                onError={(e) => {
                  setTimeout(() => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src =
                      "https://clarionhealthcare.com/wp-content/uploads/2020/12/default-fallback-image.png"; // Ensure this path is correct
                  }, 100); // Add a small delay to prevent blinking
                }}
              />
            </div>
            <div className="code-column">
              <div className="relative">
                {copied && copiedId === widget._id && (
                  <div className="copied-notice">Copied!</div>
                )}
                <div className="code-header">
                  <span className="code-title">{widget.widgetName}</span>
                  <CopyToClipboard
                    text={widget.code}
                    onCopy={() => handleCopy(widget._id)}
                  >
                    <button className="copy-button">
                      <FiCopy />
                      <span>Copy Code</span>
                    </button>
                  </CopyToClipboard>
                </div>
                <div className="code-container">
                  <SyntaxHighlighter
                    language="dart"
                    style={{ ...nightOwl, fontSize: "8px", padding: "10px" }}
                    showLineNumbers
                    wrapLines
                    wrapLongLines
                    startingLineNumber={5}
                    lineNumberStyle={{ color: "#999" }}
                    customStyle={{
                      backgroundColor: "#0c1422",
                      borderRadius: "5px",
                    }}
                  >
                    {widget.code}
                  </SyntaxHighlighter>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WidgetCategory;
