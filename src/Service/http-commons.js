import axios from "axios";

const instance=axios.create({

    baseURL: 'http://localhost:8080/api',

    headers: {
        // "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        "Access-Control-Allow-Origin": "*"
    }
});

function getAuthorization () {
    let Author = sessionStorage.getItem('user')
    if (Author === null) return ''
    return Author
}

instance.interceptors.request.use(
    (config) => {
        config.headers.authorization = getAuthorization()
        return config
    }
)

export default instance