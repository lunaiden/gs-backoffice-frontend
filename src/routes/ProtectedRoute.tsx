import {Navigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth.tsx";

export const ProtectedRoute: React.ElementType = ({Component}) => {
    const { user } = useAuth();
    if (!user) {
        return <Navigate to="/login"/>;
    }
    return Component;
};