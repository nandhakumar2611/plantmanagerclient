import httpClient from "./http-commons";

const exe = (url,data) => {
    return httpClient.post(url,data)
}

const setUser = (user) => {
    sessionStorage.setItem('user',JSON.stringify(user))
}

const setCurrentRole = (role) => {
    sessionStorage.setItem('currentRole',JSON.stringify(role[0]))
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
    isUserLoggedIn,
    setCurrentRole,
    getCurrentRole
};

export default exportedObject;