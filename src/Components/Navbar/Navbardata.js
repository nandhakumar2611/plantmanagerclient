import dataService from "../../Service/dataService";

const menuadmin = [
    {
        title: 'Home',
        url : '/dashboard',
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


const menumanager = [
    {
        title: 'Home',
        url : '/dashboardM',
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
        url : '/dashboardU',
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

    let admin = "ADMIN";
    let manager = "MANAGER"
    let currentRole = dataService.getCurrentRole()
    console.log("CurrentRole",currentRole)

    if(currentRole === admin) {
        return menuadmin;
    }
    else if(currentRole === manager) {
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