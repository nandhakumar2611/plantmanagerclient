import httpClient from "./http-commons";

const exe = (url,data) => {
    return httpClient.post(url,data)
}

const setUser = (user) => {
    sessionStorage.setItem('user',JSON.stringify(user))
}

const getUser = () => {
    let user = JSON.parse(sessionStorage.getItem('user')) //sessionStorage.getItem('user')
    if(user === null) return ' '
    return user
}

const setCurrentRole = (role) => {
    // sessionStorage.setItem('currentRole',JSON.stringify(role[0]))
    // sessionStorage.setItem('currentRole',JSON.stringify(role))
    sessionStorage.setItem('currentRole',role)
}

const getCurrentRole = () => {
    let currentRole = sessionStorage.getItem('currentRole')
    if(currentRole === null) return ' '
    return currentRole
}
const isUserLoggedIn = () => {
    let Author = sessionStorage.getItem('user')
    if (Author === null) return false
    return true
}
const exportedObject = {
    exe,
    setUser,
    getUser,
    isUserLoggedIn,
    setCurrentRole,
    getCurrentRole
};

export default exportedObject;