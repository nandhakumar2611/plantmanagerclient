import httpClient from "./http-commons";

const postexe = (url,data) => {
    return httpClient.post(url,data)
}

const getexe = (url) => {
    return httpClient.get(url)
}

const putexe = (url,data) => {
    return httpClient.put(url,data)
}

const deleteexe = (url) => {
    return httpClient.delete(url)
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

const setAccessToken = (authorization) => {
    sessionStorage.setItem('Authorization',authorization)
}

const getAccessToken = () => {
    let Authorization = sessionStorage.getItem('Authorization')
    if(Authorization === null) return ' '
    return Authorization
}

const isUserLoggedIn = () => {
    let Author = sessionStorage.getItem('user')
    if (Author === null) return false
    return true
}

const logout = () => {
    sessionStorage.clear();
}
const exportedObject = {
    postexe,
    getexe,
    putexe,
    deleteexe,
    setUser,
    getUser,
    isUserLoggedIn,
    setCurrentRole,
    getCurrentRole,
    setAccessToken,
    getAccessToken,
    logout
};

export default exportedObject;