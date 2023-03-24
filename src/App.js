// Bootstarp package link 
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min";

import "../node_modules/jquery/dist/jquery.min.js";

import './App.css';
import {BrowserRouter  as Router, Routes, Route, Navigate } from 'react-router-dom';
import dataService from "./Service/dataService";
import React, { Component, Suspense } from "react";


const DefaultLayout = React.lazy(() => import("./Components/Layout/DefaultLayout"))
const Login = React.lazy(() => import("./Pages/Login/Login"))

const loading = (
  <div className="text-center">
    <div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
)

class App extends Component {

  render() {

    let userLoggedIn = dataService.isUserLoggedIn()
    let targetPage
    if(userLoggedIn) {
      targetPage = (<Route path="*" name="Home" element={<DefaultLayout/>} />)
    }
    else {
      targetPage = (<Route path="*" element={<Navigate to="login" replace/>} />)
    }

    return (
      <div>
        <Router>
          <Suspense fallback={loading}>
            <Routes>
              <Route exact path="/login" name="Login Page" element={<Login />} />
              {targetPage}
              </Routes>
            </Suspense>
        </Router>
      </div>
    )
  }
}

export default App;
