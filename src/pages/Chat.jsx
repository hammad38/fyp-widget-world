import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FiCopy } from "react-icons/fi";
import { contentDataChat } from "../constants/content";
import "./CodeEditor.css"; // Assuming you have this CSS file

const ImageComponent = ({ src }) => (
  <div className="image-container">
    <img src={src} alt="Placeholder Image" className="image" />
  </div>
);

const CodeEditor = () => {
  const [copied, setCopied] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (id) => {
    setCopied(true);
    setCopiedId(id);
    setTimeout(() => {
      setCopied(false);
      setCopiedId(null);
    }, 1500);
  };

  return (
    <div className="editor-container">
      {/* Render all images at the top */}
      <h1 className="section-title">Chat App UI</h1>
      <div className="images-row">
        {contentDataChat.map((content) => (
          <ImageComponent key={content.id} src={content.image} />
        ))}
      </div>

      {/* Render description text */}
      <div className="description">
        <h2 className="description-title">About the UI</h2>
        <p>
          This is a sleek and modern Chat App UI designed in Flutter. The
          interface is clean and user-friendly, making it easy to connect and
          communicate with others.
        </p>
        <h2 className="description-title">Features</h2>
        <p>
          Elegant and intuitive design Custom fonts for a unique look using the
          google_fonts package High-quality SVG icons and images with the
          flutter_svg package Download the Packages: You can download the
          flutter_svg and google_fonts packages from{" "}
          <a href="https://pub.dev/" target="_blank">
            {" "}
            pub.dev
          </a>
          .
        </p>
      </div>

      {/* Render each section with image and code */}
      {contentDataChat.map((content) => (
        <div key={content.id} className="section">
          <div className="section-header">
            <h1 className="section-title">{content.title}</h1>
          </div>

          <div className="section-content">
            <div className="image-column">
              <ImageComponent src={content.image} />
            </div>
            <div className="code-column">
              <div className="relative">
                {copied && copiedId === content.id && (
                  <div className="copied-notice">Copied!</div>
                )}
                <div className="code-header">
                  <span className="code-title">{content.title}</span>
                  <CopyToClipboard
                    text={content.code}
                    onCopy={() => handleCopy(content.id)}
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
                    style={{ ...nightOwl, fontSize: "10px", padding: "10px" }}
                    showLineNumbers
                    wrapLines
                  >
                    {content.code}
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

export default CodeEditor;
