import axios from "axios"


const BASE_URL = "/api"

const LOGIN_URL = `${BASE_URL}/token/`
const REFRESH_URL = `${BASE_URL}/token/refresh/`
const EXPENSE_URL = `${BASE_URL}/expenses/`
const LOGOUT_URL = `${BASE_URL}/logout/`
const AUTH_URL = `${BASE_URL}/authenticated/`
const REGISTER_URL = `${BASE_URL}/register/`


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

export const is_authenticated = async () => {
   try {
    await axios.post(AUTH_URL,
        {},
        { withCredentials: true }
    )
    return true
   } catch (error) {
    return false
   }
}

export const register = async (username, email, password) => {
  try {
    const response = await axios.post(
      REGISTER_URL,
      {
        username,
        email,
        password,
      },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
