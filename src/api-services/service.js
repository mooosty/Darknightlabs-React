
import Axios from "axios";
import { apiRoutes } from "../utils/constants/apiUrl";
import { getStore } from "../store/injector";

const axiosApi = Axios.create({
    baseURL: apiRoutes.BASE,
    responseType: 'json',
})

const chatAxiosApi = Axios.create({
    baseURL: apiRoutes.CHAT_BASE_URL,
    responseType: 'json'
})

axiosApi.interceptors.request.use(
    async (config) => {
        const store = getStore()?.getState()
        let headers = {
            Accept: "application/json, */*",
            "Content-Type": "application/json",
        }

        if (store?.auth?.token) {
            headers = {
                ...headers,
                "Authorization": `Bearer ${store.auth.token}`
            }
        }

        config.headers = {
            ...headers
        }
        return config
    },
    (error) => { return error }
)

chatAxiosApi.interceptors.request.use(
    async (config) => {
        const store = getStore()?.getState()
        let headers = {
            Accept: "application/json, */*",
            "Content-Type": "application/json",
        }

        if (store?.auth?.token) {
            headers = {
                ...headers,
                "Authorization": `Bearer ${store.auth.token}`
            }
        }

        config.headers = {
            ...headers
        }
        return config
    },
    (error) => { return error }
)

axiosApi.interceptors.response.use((res) => {
    return res;
}, (err) => {
    if (err.response.status === 401) {
        // logout user here
        // const store = getStore()
        // store.dispatch()
    }
    return Promise.reject(err)
})

chatAxiosApi.interceptors.response.use((res) => {
    return res;
}, (err) => {
    if (err.response.status === 401) {
        // logout user here
        // const store = getStore()
        // store.dispatch()
    }
    return Promise.reject(err)
})

export { axiosApi, chatAxiosApi } 
