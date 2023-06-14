import React, { Component, useState } from "react";
import '../styles/componentescss.css';


export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: "",
      users: [],
      usersD: [],
      currentPage: 1,
      showConfirmationDialog: false,
      msgRemoved: "",
      activeTab: "activeUsers",
    };
    this.showConfirmationDialog = this.showConfirmationDialog.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:5000/users", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Handle the retrieved user data
        console.log(data); // Or perform other operations with the data
        this.setState({ users: data.data });
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error(error);
      });
    fetch("http://localhost:5000/usersD", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Handle the retrieved user data
        console.log(data); // Or perform other operations with the data
        this.setState({ usersD: data.data });
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error(error);
      });
  }

  // Method to show the confirmation dialog
  showConfirmationDialog() {
    this.setState({ showConfirmationDialog: true });
  }
  
  // Method to hide the confirmation dialog
  hideConfirmationDialog() {
    this.setState({ showConfirmationDialog: false });
  }
  

  deactivateUser(id){
    console.log("id", id)
    const base_url = "http://localhost:5000/user"
    const url = `${base_url}?id=${id}`;
    console.log(url)
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'ok') {
          console.log('Document deleted:', data.data);
          this.setState({ msgRemoved: "User Was Deactivated" });
  
        } else {
          console.log('Error:', data.data);
          // Handle the error case appropriately
        }
      })
      .catch((error) => {
        console.log('Error:', error);
        // Handle any network or fetch-related errors
      });
  }

  activateUser(id){
    console.log("id", id)
    const base_url = "http://localhost:5000/userD"
    const url = `${base_url}?id=${id}`;
    console.log(url)
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'ok') {
          console.log('Document deleted:', data.data);
          this.setState({ msgRemoved: "User Was Activated" });
  
        } else {
          console.log('Error:', data.data);
          // Handle the error case appropriately
        }
      })
      .catch((error) => {
        console.log('Error:', error);
        // Handle any network or fetch-related errors
      });
  }

  
  handlePageChange(pageNumber){
    this.setState({ currentPage: pageNumber });
  };

  handleTabChange(tab) {
    this.setState({ activeTab: tab });
  }

  render() {
    const { users, usersD, currentPage, activeTab } = this.state;
    const usersPerPage = 15;

    // Calculate the total number of pages
    const totalPages = Math.ceil(users.length / usersPerPage);
    const totalPagesD = Math.ceil(usersD.length / usersPerPage);

    // Calculate the start and end index based on the current page
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = currentPage * usersPerPage;

    // Extract the users for the current page
    const currentPageUsers = users.slice(startIndex, endIndex);
    const currentPageUsersD = usersD.slice(startIndex, endIndex);

    return (
        <div class="container">
        <div class="row">
          <div class="card d-flex border shadow-0 custom-card">
            <div class="m-4">
            {this.state.msgRemoved === "" ?
              <>
              <div className="tab-buttons">
              <button
              className={`btn btn-outline-light btn-dark col-md-6 tab-button ${activeTab === "activeUsers" ? "active" : ""}`}
              style={{"font-size": "1.5rem"}}
              onClick={() => this.handleTabChange("activeUsers")}
              >
              Active Users
              </button>
              <button
              className={`btn btn-outline-light btn-dark col-md-6 tab-button ${activeTab === "deactivatedUsers" ? "active" : ""}`}
              style={{"font-size": "1.5rem"}}
              onClick={() => this.handleTabChange("deactivatedUsers")}
              >
              Deactivated Users
              </button>
              </div>
              {this.state.activeTab === "activeUsers" ? (
                <>
                <br />
                <h2>Active Users Content</h2>
                <div
                  class="card-body"
                  style={{ maxHeight: "400px", overflowY: "auto" }}
                >
                  {currentPageUsers.length === 0 ? (
                    <div class="relatorio-vazio">
                      <br />
                      <h5 class="text-secondary justify-content-md-center">
                        There are no Users
                      </h5>
                    </div>
                  ) : (
                    <>
                      <table class="table">
                        <thead>
                          <tr>
                            <th>Nickname</th>
                            <th>Email</th>
                            <th>Type</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentPageUsers.map((user) => (
                            <tr key={user._id}>
                              <td>{user.nickname}</td>
                              <td>{user.email}</td>
                              <td>{user.type}</td>
                              <td>
                              {this.state.showConfirmationDialog  && this.state.confirmationDialogId === user._id  ? (
                                
                                <div className="confirmation-dialog">
                                  <h6>Are you sure you want to Deactivate this User?</h6>
                                  <div>
                                    <button className="btn btn-danger" onClick={() => this.deactivateUser(user._id)}>
                                      Confirm
                                    </button>&nbsp;
                                    <button className="btn btn-secondary" onClick={() => this.hideConfirmationDialog()}>
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              )
                            :
                            (<div className="col-md-auto">
                            <a href="#" className="btn btn-light border text-danger icon-hover-danger" onClick={() => { this.setState({ remove: "user" , confirmationDialogId: user._id}); this.showConfirmationDialog();}}>
                            Deactivate
                            </a>
                            </div>
                            )
                            }
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div>
                        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                          <button
                            key={pageNumber}
                            onClick={() => this.handlePageChange(pageNumber)}
                            className={`btn btn-light border pagination-button ${pageNumber === currentPage ? "active" : ""}`}
                          >
                            {pageNumber}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                </>

                ):(
                  <>
                  <br />
                  <h2>Deactivated Users Content</h2>
                    <div
                      class="card-body"
                      style={{ maxHeight: "400px", overflowY: "auto" }}
                    >
                      {currentPageUsersD.length === 0 ? (
                        <div class="relatorio-vazio">
                          <br />
                          <h5 class="text-secondary justify-content-md-center">
                            There are no Users
                          </h5>
                        </div>
                      ) : (
                        <>
                          <table class="table">
                            <thead>
                              <tr>
                                <th>Nickname</th>
                                <th>Email</th>
                                <th>Type</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentPageUsersD.map((user) => (
                                <tr key={user._id}>
                                  <td>{user.nickname}</td>
                                  <td>{user.email}</td>
                                  <td>{user.type}</td>
                                  <td>
                                  {this.state.showConfirmationDialog  && this.state.confirmationDialogId === user._id  ? (
                                    
                                    <div className="confirmation-dialog">
                                      <h6>Are you sure you want to Activate this User?</h6>
                                      <div>
                                        <button className="btn btn-danger" onClick={() => this.activateUser(user._id)}>
                                          Confirm
                                        </button>&nbsp;
                                        <button className="btn btn-secondary" onClick={() => this.hideConfirmationDialog()}>
                                          Cancel
                                        </button>
                                      </div>
                                    </div>
                                  )
                                :
                                (<div className="col-md-auto">
                                <a href="#" className="btn btn-light border text-danger icon-hover-danger" onClick={() => { this.setState({ remove: "user" , confirmationDialogId: user._id}); this.showConfirmationDialog();}}>
                                Activate
                                </a>
                                </div>
                                )
                                }
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <div>
                            {Array.from({ length: totalPagesD }, (_, index) => index + 1).map((pageNumber) => (
                              <button
                                key={pageNumber}
                                onClick={() => this.handlePageChange(pageNumber)}
                                className={`btn btn-light border pagination-button ${pageNumber === currentPage ? "active" : ""}`}
                              >
                                {pageNumber}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}
                </>
              :
                  <div class="card d-flex border shadow-0 custom-card">
                      <div class="m-4">
                      <div class="carrinho-vazio">
                      <br></br>
                          <h4 class="text-secondary justify-content-md-center">{this.state.msgRemoved}!</h4>
                      </div>
                      <div>
                      <a type="submit" className="btn btn-outline-light btn-dark col-md-3 botaoPerfil" href="/user/admin">Back </a>
                      </div>
                      </div>
                  </div>
               }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
