import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import routes from '../Routes/routes'
const Content = () => {

    const loading = (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )

  return (
    <div className="container">
        <Suspense fallback={loading}>
            <Routes>
                {routes.map((route, id) => {
                  return (
                    route.element && (
                      <Route
                        key=     {id}
                        path=    {route.path}
                        exact=   {route.exact}
                        name=    {route.name}
                        element= {<route.element/>}
                      />
                    )
                  )
                })}
                <Route path="/" element= {<Navigate to="dashboard" replace/>} />
            </Routes>
        </Suspense>
    </div>
  )
}

export default React.memo(Content)