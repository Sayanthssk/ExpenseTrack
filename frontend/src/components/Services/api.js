import axios from "axios"


const BASE_URL = "/api"

const LOGIN_URL = `${BASE_URL}/token/`
const REFRESH_URL = `${BASE_URL}/token/refresh/`
const EXPENSE_URL = `${BASE_URL}/expenses/`
const LOGOUT_URL = `${BASE_URL}/logout/`


export const login = async (username, password) => {
    const response = await axios.post(LOGIN_URL,
        { username: username, password: password },
        { withCredentials: true }
    )
    return response.data.success
}

export const refresh_token = async () => {
    try {
        const response = await axios.post(REFRESH_URL,
            {},
            { withCredentials: true }
        )
        return response.data.refreshed
    } catch (error) {
        return false
    }
}

export const getExpenses = async () => {
    try {
        const response = await axios.get(EXPENSE_URL,
            { withCredentials: true }
        )
        return response.data
    } catch (error) {
        return call_refresh(error, axios.get(EXPENSE_URL, { withCredentials: true }))
    }
}


const call_refresh = async (error, func) => {
    if (error.response && error.response.status === 401) {
        const tokenRefreshed = await refresh_token()
        if (tokenRefreshed) {
            const retryResponse = await func()
            return retryResponse.data
        }
    }
    return error.response.data
}


export const logout = async () => {
    try {
        const response = await axios.post(LOGOUT_URL,
            {},
            { withCredentials: true }
        )
        return response.data.success
    } catch (error) {
        return false
    }
}