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
                url: '/machine',
            },
            {
                title: 'MachineView',
                url: '/machineview',
            },
            {
                title: 'Operation',
                url: '/dashboard',
            },
            {
                title: 'Raw Material',
                url: '/dashboard',
            },
        ],
    },
    {
        title: 'About',
        url : '/page5',
    },
]


const menumanager = [
    {
        title: 'Home',
        url : '/managerdashboard',
    },
    {
        title: 'Service manager',
        url : '/',
        submenu: [
            {
                title: 'Web design',
                url: '/userM',
            },
            {
                title: 'Web development',
                url: '/table',
            },
            {
                title: 'SEO',
                url: '/dashboard',
            },
        ],
    },
    {
        title: 'About',
        url : '/page5',
    },
]

const menuuser = [
    {
        title: 'Home',
        url : '/userdashboard',
    },
    {
        title: 'Service user',
        url : '/',
        submenu: [
            {
                title: 'Web design',
                url: '/userU',
            },
            {
                title: 'Web development',
                url: '/table',
            },
            {
                title: 'SEO',
                url: '/dashboard',
            },
        ],
    },
    {
        title: 'About',
        url : '/page5',
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