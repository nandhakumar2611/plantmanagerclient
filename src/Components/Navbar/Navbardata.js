import dataService from "../../Service/dataService";

const menuadmin = [
    {
        title: 'Home',
        url : '/admindashboard',
    },
    {
        title: 'Service Admin',
        url : '/',
        submenu: [
            {
                title: 'Web design',
                url: '/user',
            },
            {
                title: 'Web development',
                url: '/profile',
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