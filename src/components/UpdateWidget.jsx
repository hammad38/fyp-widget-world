import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import AuthContext from "../context/AuthContext";
import "./createWidget.css"; // Import the CSS file

const UpdateWidget = () => {
  const { id } = useParams();
  const { authData } = useContext(AuthContext);
  const [widgetName, setWidgetName] = useState("");
  const [code, setCode] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWidget = async () => {
      try {
        const response = await axios.get(
          `https://nodejs-fyp-production.up.railway.app/my-widgets/${id}`,
          {
            headers: {
              Authorization: `Bearer ${authData.token}`,
            },
          }
        );
        const widget = response.data;
        setWidgetName(widget.widgetName);
        setCode(widget.code);
        setCategory(widget.category);
        setImage(widget.Image);
      } catch (error) {
        console.error("Error fetching widget details:", error);
        alert("Failed to fetch widget details. Please try again.");
      }
    };

    fetchWidget();
  }, [id, authData.token]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpdateWidget = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("widgetName", widgetName);
    formData.append("code", code);
    formData.append("category", category);
    if (image instanceof File) {
      formData.append("image", image);
    } else {
      formData.append("imageUrl", image);
    }

    try {
      await axios.put(
        `https://nodejs-fyp-production.up.railway.app/widgets/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authData.token}`,
          },
        }
      );
      alert("Widget updated successfully");
      navigate("/MyWidgets");
    } catch (error) {
      console.error("Error updating widget:", error);
      alert("Failed to update widget. Please try again.");
    }
  };

  return (
    <div className="widget-2-container">
      <div className="widget-2">
        <div className="widget-4">Update Widget</div>
        <form onSubmit={handleUpdateWidget}>
          <div className="widget-5">
            <input
              type="text"
              value={widgetName}
              onChange={(e) => setWidgetName(e.target.value)}
              placeholder="Widget Name"
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
              placeholder="Image URL"
              required
            />
            <label>Image URL</label>
          </div>

          <div className="widget-5">
            <input
              className="create-widget"
              type="submit"
              value="Update Widget"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateWidget;
