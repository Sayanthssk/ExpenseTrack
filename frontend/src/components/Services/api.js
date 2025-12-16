import axios from "axios"


const BASE_URL = "/api"

const LOGIN_URL = `${BASE_URL}/token/`
const REFRESH_URL = `${BASE_URL}/token/refresh/`
const EXPENSE_URL = `${BASE_URL}/expenses/`
const ADD_EXPENSE_URL = `${BASE_URL}/add-expense/`
const EXPENSE_SUMMARY_URL = `${BASE_URL}/expense-summary/`
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
        const response = await axios.post(
            REFRESH_URL,
            {},
            { withCredentials: true }
        );

        return response.data.refreshed === true;
    } catch (error) {
        return false;
    }
};


export const getExpenses = async (filters = {}) => {
    try {
        const response = await axios.get(EXPENSE_URL,
            {
                withCredentials: true,
                params: filters
            }
        )
        return response.data
    } catch (error) {
        return call_refresh(error, () => axios.get(EXPENSE_URL, { withCredentials: true, params: filters }))
    }
}

export const getExpenseSummary = async () => {
    try {
        const response = await axios.get(EXPENSE_SUMMARY_URL, { withCredentials: true });
        return response.data;
    } catch (error) {
        return call_refresh(error, () => axios.get(EXPENSE_SUMMARY_URL, { withCredentials: true }));
    }
}

const call_refresh = async (error, retryFn) => {
    if (error.response?.status === 401) {
        const refreshed = await refresh_token();

        if (refreshed) {
            const retryResponse = await retryFn();
            return retryResponse.data;
        }
    }
    throw error;
};



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
        await axios.post(
            AUTH_URL,
            {},
            { withCredentials: true }
        );
        return true;
    } catch (error) {
        if (error.response?.status === 401) {
            const refreshed = await refresh_token();
            return refreshed;
        }
        return false;
    }
};


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

export const addExpense = async (data) => {
    try {
        const response = await axios.post(ADD_EXPENSE_URL, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw error;
    }
};
