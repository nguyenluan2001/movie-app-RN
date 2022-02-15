import axios from "axios";
const token = "f0539a99604363ca9db1e5eb162128d2"
const axiosInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params:{
        api_key: token
    }
})
export {axiosInstance};