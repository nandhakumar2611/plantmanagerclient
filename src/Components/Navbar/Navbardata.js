import dataService from "../../Service/dataService";

const menuadmin = [
    {
        title: 'Home',
        url : '/admindashboard',
    },
    {
        title: 'Admin Master',
        url : '/',
        submenu: [
            {
                title: 'User',
                url: '/userview',
            },
            {
                title: 'Machine',
                url: '/machineview',
            },
            {
                title: 'Product',
                url: '/productview',
            },
            {
                title: 'Plant',
                url: '/plantview',
            },
            {
                title: 'Operation',
                url: '/operationview',
            },
        ],
    },
    {
        title: 'BatchOrder',
        url : '/BatchOrderview',
    },
    {
        title: 'Time',
        url : '/tasktime',
    },
]


const menumanager = [
    {
        title: 'Home',
        url : '/managerdashboard',
    },
    {
        title: 'BatchOrder',
        url : '/BatchOrderview',
    },
]

const menuuser = [
    {
        title: 'Home',
        url : '/userdashboard',
    },
    {
        title: 'Task',
        url : '/taskview',
    },
]

const menu =()=> {
    
    let currentRole = dataService.getCurrentRole()
    
    if(currentRole === "ADMIN") {
        return menuadmin;
    }
    else if(currentRole === "MANAGER") {
        return menumanager;
    }
    else{
        return menuuser;
    }
}

const findmenu ={
    menu
}

export default findmenu;