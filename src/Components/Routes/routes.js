import React from 'react'

const AdminDashboard =  React.lazy(() => import('../../Pages/Admin/Dashboard'))
const AdminUser =  React.lazy(() => import('../../Pages/Admin/User'))
const UserDashboard =  React.lazy(() => import('../../Pages/User/Dashboard'))
const User =  React.lazy(() => import('../../Pages/User/User'))
const ManagerDashboard =  React.lazy(() => import('../../Pages/Manager/Dashboard'))
const ManagerUser =  React.lazy(() => import('../../Pages/Manager/User'))

const routes = [
    
    { path: '/', exact: true, name: 'Home' },
    { path: '/dashboard', name: 'Dashboard', element: AdminDashboard },
    { path: '/user', name: 'AdminUser', element: AdminUser },
    { path: '/dashboardU', name: 'DashboardUser', element: UserDashboard },
    { path: '/userU', name: 'UserUser', element: User },
    { path: '/dashboardM', name: 'DashboardManager', element: ManagerDashboard },
    { path: '/userM', name: 'ManagerUser', element: ManagerUser },
    
]

export default routes