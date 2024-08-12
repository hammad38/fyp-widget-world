import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./myWidgets.css";
import Header from "./Header";
import Footer from "./Footer";

const MyWidgets = () => {
  const { authData } = useContext(AuthContext);
  const [widgets, setWidgets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWidgets = async () => {
      try {
        const response = await axios.get(
          "https://nodejs-fyp-production.up.railway.app/my-widgets",
          {
            headers: {
              Authorization: `Bearer ${authData.token}`,
            },
          }
        );
        setWidgets(response.data);
      } catch (error) {
        console.error("Error fetching widgets:", error);
        alert("Failed to fetch widgets. Please try again.");
      }
    };

    fetchWidgets();
  }, [authData.token]);

  const handleUpdate = (id) => {
    navigate(`/UpdateWidget/${id}`);
  };

  const handleDeleteWidget = async (id) => {
    try {
      await axios.delete(
        `https://nodejs-fyp-production.up.railway.app/widgets/${id}`,
        {
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        }
      );
      setWidgets(widgets.filter((widget) => widget._id !== id));
      alert("Widget deleted successfully");
    } catch (error) {
      console.error(
        "Error deleting widget:",
        error.response ? error.response.data : error.message
      );
      alert("Failed to delete widget. Please try again.");
    }
  };

  return (
    // <Header />
    <div className="dashboard-container">
      <Header />

      <h2 className="dashboard-title">My Widgets</h2>
      <div className="widgets-table">
        <div className="widgets-table-header">
          <div className="header-item">Widget Name</div>
          <div className="header-item">Status</div>
          <div className="header-item">Category</div>
          <div className="header-item">Image</div>
          <div className="header-item">Date</div>
          <div className="header-item">Actions</div>
        </div>
        {widgets.map((widget) => (
          <div key={widget._id} className="widgets-table-row">
            <div className="row-item">{widget.widgetName}</div>
            {/* <div className="row-item widget-status pending">
              {widget.status}
            </div> */}
            <div
              className={`widget-status row-item ${widget.status.toLowerCase()}`}
            >
              {widget.status}
            </div>
            <div className="row-item">{widget.category}</div>
            <div className="row-item">
              <img
                src={`https://nodejs-fyp-production.up.railway.app${widget.Image}`}
                alt={widget.widgetName}
                className="row-item-image"
              />
            </div>
            <div className="row-item">
              {new Date(widget.uploadDate).toLocaleDateString()}
            </div>
            <div className="row-item actions-cell">
              <button
                onClick={() => handleUpdate(widget._id)}
                className="action-button update-button"
              >
                Update
              </button>
              <button
                onClick={() => handleDeleteWidget(widget._id)}
                className="action-button delete-button"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="explore-widget-mywidget">
        <button>Explore More Widgets</button>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default MyWidgets;
