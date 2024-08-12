import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import "./adminWidgetList.css"; // Import the CSS file
import Header from "./Header";

const AdminWidgetList = () => {
  const { authData } = useContext(AuthContext);
  const [widgets, setWidgets] = useState([]);

  if (!authData || !authData.token) {
    return <p>You need to be logged in to view this page.</p>; // Or redirect to login
  }

  useEffect(() => {
    const fetchWidgets = async () => {
      const response = await axios.get(
        "https://nodejs-fyp-production.up.railway.app/widgets"
      );
      setWidgets(response.data);
    };

    fetchWidgets();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.put(
        `https://nodejs-fyp-production.up.railway.app/admin/widgets/${id}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        }
      );
      alert("Widget approved");
      setWidgets(widgets.filter((widget) => widget._id !== id));
    } catch (error) {
      alert("Error Approving Widget or Only Admin Can Approve!");
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(
        `https://nodejs-fyp-production.up.railway.app/admin/widgets/${id}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        }
      );
      alert("Widget rejected");
      setWidgets(widgets.filter((widget) => widget._id !== id));
    } catch (error) {
      alert("Error rejecting Widget or Only Admin Can Reject!");
    }
  };

  return (
    <div className="admin-container">
      <Header />
      <h1 className="admin-title">Pending Widget Approvals</h1>
      <ul className="widget-list">
        {widgets.map((widget) => (
          <li key={widget._id} className="widget-item">
            <div className="widget-info">
              <h2 className="widget-name">{widget.widgetName}</h2>
              <p className="widget-category">Category: {widget.category}</p>
              <p className="widget-owner">Owner: {widget.owner.username}</p>
              <p className="widget-date">
                Date: {new Date().toLocaleDateString()}
              </p>

              <p className={`widget-status ${widget.status.toLowerCase()}`}>
                Status: {widget.status}
              </p>
            </div>
            <div className="widget-actions">
              <button
                onClick={() => handleApprove(widget._id)}
                className="action-button approve-button"
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(widget._id)}
                className="action-button reject-button"
              >
                Reject
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminWidgetList;
