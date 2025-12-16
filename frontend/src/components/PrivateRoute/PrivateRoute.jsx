
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth()
    const navigate = useNavigate()
    if (loading) {
        return <div>Loading...</div>
    }
    if (isAuthenticated) {
        return children
    } else {
        navigate('/')
    }
}

export default PrivateRoute
