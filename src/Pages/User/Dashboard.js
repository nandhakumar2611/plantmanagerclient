import React, { useEffect, useState } from 'react'
import dataService from "../../Service/dataService";

const Dashboard = () => {
  let [standard, setStandard] = useState(0)

  const username = dataService.getUser().username
 //  console.log(username)
 const initBatchOrder = () => {

   dataService.getexe(`auth/tasklist/${username}`)
       .then(response => {
           console.log("USER DATA1", response.data);
           setStandard(response.data.length)
           // console.log(standard)
       })
       .catch(error => {
           console.log("SOMETHING WRONG", error);
       })
}

useEffect(() => {
 initBatchOrder();
}, []);

  return (
    <div>
    <div className="container-fluid">

      {/* <!-- Page Heading --> */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
        <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
          className="fa fa-download fa-sm text-white-50"></i> Generate Report</a>
      </div>

      {/* <!-- Content Row --> */}
      <div className="row">

        {/* <!-- Earnings (Monthly) Card Example --> */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-start border-0 border-5 shadow border-primary h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Task</div>
                  <div className="h5 mb-0 font-weight-bold text-secondary">{standard}</div>
                </div>
                <div className="col-auto">
                  <i className="fa fa-calendar fa-2x text-secondary"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Earnings (Monthly) Card Example --> */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-start border-0 border-5 shadow border-success h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Earnings (Annual)</div>
                  <div className="h5 mb-0 font-weight-bold text-secondary">$215,000</div>
                </div>
                <div className="col-auto">
                  <i className="fa fa-dollar fa-2x text-secondary"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Earnings (Monthly) Card Example --> */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-start border-0 border-5 shadow border-info h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Tasks
                  </div>
                  <div className="row no-gutters align-items-center">
                    <div className="col-auto">
                      <div className="h5 mb-0 mr-3 font-weight-bold text-secondary">50%</div>
                    </div>
                    <div className="col">
                      <div className="progress progress-sm mr-2">
                        <div className="progress-bar bg-info" role="progressbar"
                          style={{ width: " 50%" }} aria-valuenow="50" aria-valuemin="0"
                          aria-valuemax="100"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fa fa-list fa-2x text-secondary"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Pending Requests Card Example --> */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-start border-0 border-5 shadow border-warning h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                    Pending Requests</div>
                  <div className="h5 mb-0 font-weight-bold text-secondary">18</div>
                </div>
                <div className="col-auto">
                  <i className="fa fa-comments fa-2x text-secondary"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Content Row --> */}
    </div>
  </div>
  )
}

export default Dashboard