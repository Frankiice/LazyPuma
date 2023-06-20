import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import "../styles/componentescss.css";
import "../scripts/scripts.js";
import { FaBootstrap } from "react-icons/fa";
import { FaSearch } from "react-icons/fa"
import {useState, useEffect} from 'react';
import axios from 'axios';
import 'bootstrap';

class Notification extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        notifications: [], // Array to store the notifications
        isNotificationHovered: false
      };
    }

    componentDidMount() {
      fetch("http://localhost:5000/user/userData", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          token: window.localStorage.getItem("token"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          
          this.setState({ nickname: data.data.nickname, id_consumidor: data.data._id, lat_user:data.data.lat, lon_user: data.data.lon});
          fetch(`http://localhost:5000/notifications/${data.data._id}`)
            .then((response) => response.json())
            .then((data1) => {
              console.log(data1, "NotificationsData");
              this.setState({ notifications: data1 });
            })
            .catch((error) => {
              console.error(error);
            });
        });
    }
  
    // Function to add a new notification to the state
    addNotification(notification) {
      this.setState((prevState) => ({
        notifications: [...prevState.notifications, notification]
      }));
    }
  
    render() {
      const { notifications, isNotificationHovered } = this.state;
  
      return (
        <div className="btn-wrapper px-3" style={{ position: 'relative' }}>
          <button className="btn btn-outline-light col-md-12 dropdown-toggle" id="notificationDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ padding: '0.375rem 1.75rem' }}>
            <i className="bi bi-bell-fill" style={{ fontSize: '1rem', marginRight: '0.5rem' }}></i>
            Notifications
            <span className="badge bg-dark text-white ms-1 rounded-pill">{notifications.length}</span>
          </button>
          {/* Dropdown content */}
          <div
            className={`dropdown-menu ${isNotificationHovered ? 'show' : ''}`}
            onMouseEnter={() => this.setState({ isNotificationHovered: true })}
            onMouseLeave={() => this.setState({ isNotificationHovered: false })}
          >
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <div key={index} className="notification-item">
                  {notification.mensagem}
                </div>
              ))
            ) : (
              <div className="notification-item">No notifications!</div>
            )}
          </div>
        </div>
      );
    }
  }
  
  export default Notification;