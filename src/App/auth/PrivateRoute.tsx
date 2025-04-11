import { Navigate, Outlet } from "react-router-dom";
import {useAuth} from "./authProvider.tsx";

const PrivateRoute = () => {
    const user = useAuth();
    if (!user?.refreshToken) return <Navigate to="/auth/login" />;
    return <Outlet />;
};

export default PrivateRoute;