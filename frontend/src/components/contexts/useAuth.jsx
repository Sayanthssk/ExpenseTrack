import { createContext, useContext, useEffect, useState } from "react";
import { is_authenticated, login, register, addExpense } from "../Services/api.js";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    const get_authenticated = async () => {
        try {
            const success = await is_authenticated();
            setIsAuthenticated(success);
        } catch (error) {
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    const login_user = async (username, password) => {
        try {
            const success = await login(username, password);
            if (success) {
                setIsAuthenticated(true);
                navigate('/dashboard')
            }
        } catch (error) {
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    }


    const register_user = async (username, email, password, Cpassword) => {
        if (password !== Cpassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            await register(username, email, password);
            alert("Registered successfully");
            navigate("/");
        } catch (error) {
            console.error(error);
            alert("Registration failed");
        }
    };

    const Add_Expense = async (data) => {
        try {
            await addExpense(data);
            alert("Expense added successfully");
            navigate("/dashboard");
        } catch (error) {
            console.error(error);
            alert("Failed to add expense");
        }
    };


    useEffect(() => {
        get_authenticated();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, login_user, register_user, Add_Expense }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
