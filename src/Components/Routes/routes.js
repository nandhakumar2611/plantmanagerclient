import React from 'react'

const AdminDashboard   =  React.lazy(() => import('../../Pages/Admin/Dashboard'))
const AdminUser        =  React.lazy(() => import('../../Pages/Admin/User'))
const UserDashboard    =  React.lazy(() => import('../../Pages/User/Dashboard'))
const User             =  React.lazy(() => import('../../Pages/User/User'))
const ManagerDashboard =  React.lazy(() => import('../../Pages/Manager/Dashboard'))
const ManagerUser      =  React.lazy(() => import('../../Pages/Manager/User'))
const Profile          =  React.lazy(() => import('../../Pages/Profile/Profile'))
const UserView         =  React.lazy(() => import('../../Pages/Admin/UserView'))
const EditUser         =  React.lazy(() => import('../../Pages/Admin/EditUser'))
const UseUpdate        =  React.lazy(() => import('../../Pages/UseUpdate'))
const Update           =  React.lazy(() => import('../../Pages/Update'))
const Sample           =  React.lazy(() => import('../../Pages/Sample'))
const PlantView        =  React.lazy(() => import('../../Pages/Plant/PlantView'))
const Plant            =  React.lazy(() => import('../../Pages/Plant/Plant'))
const MachineView      =  React.lazy(() => import('../../Pages/Machine/MachineView'))
const Machine          =  React.lazy(() => import('../../Pages/Machine/Machine'))
const Operation        =  React.lazy(() => import('../../Pages/Operation/Operation'))
const OperationView    =  React.lazy(() => import('../../Pages/Operation/OperationView'))
const EditOperation    =  React.lazy(() => import('../../Pages/Operation/EditOperation'))
const EditMachine      =  React.lazy(() => import('../../Pages/Machine/EditMachine'))
const EditPlant        =  React.lazy(() => import('../../Pages/Plant/EditPlant'))
const Product          =  React.lazy(() => import('../../Pages/Product/Product'))
const ProductView      =  React.lazy(() => import('../../Pages/Product/ProductView'))
const EditProduct      =  React.lazy(() => import('../../Pages/Product/EditProduct'))
const BatchOrder       =  React.lazy(() => import('../../Pages/BatchOrder/BatchOrder'))
const BatchOrderView   =  React.lazy(() => import('../../Pages/BatchOrder/BatchOrderView'))
const EditBatchOrder   =  React.lazy(() => import('../../Pages/BatchOrder/EditBatchOrder'))
const BatchOrderAssgin =  React.lazy(() => import('../../Pages/BatchOrder/BatchOrderAssgin'))
const TaskView         =  React.lazy(() => import('../../Pages/User/TaskView'))
const TaskTime         =  React.lazy(() => import('../../Pages/TaskTime/TaskTime'))

const routes = [
    
    { path: '/'                               , name: 'Home'            , exact: true               },
    { path: '/admindashboard'                 , name: 'Dashboard'       , element: AdminDashboard   },
    { path: '/user'                           , name: 'AdminUser'       , element: AdminUser        },
    { path: '/userdashboard'                  , name: 'DashboardUser'   , element: UserDashboard    },
    { path: '/userU'                          , name: 'UserUser'        , element: User             },
    { path: '/managerdashboard'               , name: 'DashboardManager', element: ManagerDashboard },
    { path: '/userM'                          , name: 'ManagerUser'     , element: ManagerUser      },
    { path: '/profile'                        , name: 'Profile'         , element: Profile          },
    { path: '/userview'                       , name: 'Userview'        , element: UserView         },
    { path: '/edituser/:id'                   , name: 'EditUser'        , element: EditUser         },
    { path: '/UseUpdate'                      , name: 'UseUpdate'       , element: UseUpdate        },
    { path: '/Update'                         , name: 'Update'          , element: Update           },
    { path: '/Sample'                         , name: 'Sample'          , element: Sample           },
    { path: '/PlantView'                      , name: 'PlantView'       , element: PlantView        },
    { path: '/MachineView'                    , name: 'MachineView'     , element: MachineView      },
    { path: '/OperationView'                  , name: 'OperationView'   , element: OperationView    },
    { path: '/Operation'                      , name: 'Operation'       , element: Operation        },
    { path: '/Machine'                        , name: 'Machine'         , element: Machine          },
    { path: '/Plant'                          , name: 'Plant'           , element: Plant            },
    { path: '/EditOperation/:id'              , name: 'EditOperation'   , element: EditOperation    },
    { path: '/EditMachine/:id'                , name: 'Editmachine'     , element: EditMachine      },
    { path: '/EditPlant/:id'                  , name: 'EditPlant'       , element: EditPlant        },
    { path: '/Product'                        , name: 'Product'         , element: Product          },
    { path: '/ProductView'                    , name: 'ProductView'     , element: ProductView      },
    { path: '/EditProduct/:id'                , name: 'EditProduct'     , element: EditProduct      },
    { path: '/BatchOrder'                     , name: 'BatchOrder'      , element: BatchOrder       },
    { path: '/EditBatchOrder/:id'             , name: 'EditBatchOrder'  , element: EditBatchOrder   },
    { path: '/BatchOrderView'                 , name: 'BatchOrderView'  , element: BatchOrderView   },
    { path: '/BatchOrderAssgin/:id/tasklist'  , name: 'BatchOrderAssgin', element: BatchOrderAssgin },
    { path: '/taskview'                       , name: 'TaskView'        , element: TaskView         },
    { path: '/tasktime'                       , name: 'TaskTime'        , element: TaskTime         },
]

export default routes