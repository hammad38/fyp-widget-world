import React, { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";

const PublishWidget = () => {
  const { authData } = useContext(AuthContext);
  const [widgetName, setWidgetName] = useState("");
  const [code, setCode] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null); // Store image file instead of URL
  const navigate = useNavigate();

  // Handle case where authData is null or token is not available
  if (!authData || !authData.token) {
    return <p>You need to be logged in to create a widget.</p>; // Or redirect to login
  }

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Set the selected image file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("widgetName", widgetName);
    formData.append("code", code);
    formData.append("category", category);
    formData.append("image", image); // Append the image file

    try {
      await axios.post(
        "https://nodejs-fyp-production.up.railway.app/widgets",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Required for file uploads
            Authorization: `Bearer ${authData.token}`,
          },
        }
      );
      navigate("/MyWidgets");
      alert("Widget created successfully and pending approval");
    } catch (error) {
      console.error(
        "Error creating widget:",
        error.response ? error.response.data : error.message
      );
      alert("Error creating widget");
    }
  };
  return (
    <div className="widget-2-container">
      <Header />
      <div className="widget-2">
        <div className="widget-4">Create Widget</div>
        <form onSubmit={handleSubmit}>
          <div className="widget-5">
            <input
              type="text"
              placeholder="Widget Name"
              value={widgetName}
              onChange={(e) => setWidgetName(e.target.value)}
              required
            />
            <label>Widget Name</label>
          </div>

          <div className="widget-5">
            <textarea
              placeholder="Enter your code here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            ></textarea>
            <label>Code</label>
            <div className="code-preview">
              <SyntaxHighlighter
                language="dart"
                style={{ ...nightOwl, fontSize: "12px", padding: "10px" }}
                showLineNumbers
                wrapLines
                wrapLongLines
                lineNumberStyle={{ color: "#999" }}
                customStyle={{
                  backgroundColor: "#0c1422",
                  borderRadius: "5px",
                  marginTop: "15px",
                  maxHeight: "200px",
                  overflowY: "auto",
                }}
              >
                {code}
              </SyntaxHighlighter>
            </div>
          </div>

          <div className="widget-5">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="animations">Animations</option>
              <option value="appBar">App Bar</option>
              <option value="bottomSheet">Bottom Sheet</option>
              <option value="button">Button</option>
              <option value="card">Card</option>
              <option value="carousel">Carousel</option>
              <option value="datepicker">Datepicker</option>
              <option value="dialog">Dialog</option>
              <option value="drawer">Drawer</option>
              <option value="dropdown">Dropdown</option>
              <option value="expansion tile">Expansion Tile</option>
              <option value="list tile">List Tile</option>
              <option value="list view">List View</option>
              <option value="loading indicator">Loading Indicator</option>
              <option value="mixed">Mixed</option>
              <option value="nav bar">Navigation Bar</option>
              <option value="neumorphic">Neumorphic</option>
              <option value="search-bar">Search Bar</option>
              <option value="sliders">Sliders</option>
              <option value="snackbars">Snackbars</option>
              <option value="social buttons">Social Buttons</option>
              <option value="input fields">Input Fields</option>
              <option value="animations">Animations</option>
            </select>

            <label>Category</label>
          </div>

          <div className="widget-5">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
            <label>Image URL</label>
          </div>

          <div className="widget-5">
            <input
              className="create-widget"
              type="submit"
              value="Publish Your Widget"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default PublishWidget;
