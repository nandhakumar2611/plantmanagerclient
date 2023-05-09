// Bootstarp package link 
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min";
// Jquery package link 
import "../node_modules/jquery/dist/jquery.min.js";
// Datatables package link
import "../node_modules/react-datepicker/dist/react-datepicker.css";
import "../node_modules/datatables.net-dt/js/dataTables.dataTables";
import "../node_modules/datatables.net-dt/css/jquery.dataTables.min.css";
import "../node_modules/datatables.net-buttons/js/dataTables.buttons.js";
import "../node_modules/datatables.net-buttons/js/buttons.colVis.js";
import "../node_modules/datatables.net-buttons/js/buttons.flash.js";
import "../node_modules/datatables.net-buttons/js/buttons.html5.js";
import "../node_modules/datatables.net-buttons/js/buttons.print.js";
// Chart JS Package link
import 'chart.js/auto';
import './App.css';
import {BrowserRouter  as Router, Routes, Route, Navigate } from 'react-router-dom';
import dataService from "./Service/dataService";
import React, { Component, Suspense } from "react";

const loading = (
  <div className="text-center">
    <div className="spinner-border primary" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
)

const DefaultLayout = React.lazy(() => import('./Components/Layout/DefaultLayout'))
const Login         = React.lazy(() => import('./Pages/Login/Login'))


class App extends Component {

  render() {

    let userLoggedIn = dataService.isUserLoggedIn()
    let targetPage
    if(userLoggedIn) {
      targetPage = (<Route path="*" name="Home" element={<DefaultLayout />} />)
    }
    else {
      targetPage = (<Route path="*" element={<Navigate to="login" replace />} />)
    }

    return (
        <Router>
          <Suspense fallback={loading}>
            <Routes>
              <Route exact path="/login" name="Login Page" element={<Login />} />
              {targetPage}
              </Routes>
            </Suspense>
        </Router>
    )
  }
}

export default App;
