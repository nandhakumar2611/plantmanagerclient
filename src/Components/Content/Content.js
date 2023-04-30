import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import routes from '../Routes/routes'
import dataService from "../../Service/dataService";

const Content = () => {

    const loading = (
        <div className="text-center">
          <div className="spinner-border danger" role="status">
          <span className="sr-only">Loading...</span>
          </div>
        </div>
      )

    const dashboardfinder =()=> {

      let currentRole = dataService.getCurrentRole()
  
      if(currentRole === "ADMIN") {
          return "admindashboard";
      }
      else if(currentRole === "MANAGER") {
          return "managerdashboard";
      }
      else {
          return "userdashboard";
      }
  }
    

  return (
    <div>
        <Suspense fallback={"Lazy loading"}>
            <Routes>
                {routes.map((route, id) => {
                  return (
                    route.element && (
                      <Route
                        key    = {id}
                        path   = {route.path}
                        exact  = {route.exact}
                        name   = {route.name}
                        element= {<route.element/>}
                      />
                    )
                  )
                })}
                <Route path="/" element= {<Navigate to={dashboardfinder()} replace/>} />
            </Routes>
        </Suspense>
    </div>
  )
}

export default React.memo(Content)