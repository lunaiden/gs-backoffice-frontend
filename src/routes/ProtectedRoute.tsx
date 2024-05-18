import {Navigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth.tsx";

export const ProtectedRoute: React.ElementType = ({Component}) => {
    const { user } = useAuth();
    if (!user) {
        return <Navigate to="/login"/>;
    }

    if(location.pathname.includes('superadmin') && user.roleName !== 'superadmin') {
        if(user.roleName === 'admin' || user.roleName === 'referent') {
           return  <Navigate to="/admin/dashboard"/>
        }
        if(user.roleName === 'trainee') {
            return <Navigate to="/dashboard"/>;
        }
        return <Navigate to="/login"/>
    }
    return Component;
};