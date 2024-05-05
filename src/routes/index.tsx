import {Route, Routes} from "react-router-dom";
import {Login} from "../pages/auth/Login.tsx";
import {ForgotPassword} from "../pages/auth/ForgotPassword.tsx";
import {DashboardSuperAdmin} from "../pages/dashboard/dashboard-superadmin.tsx";
import {ProtectedRoute} from "./ProtectedRoute.tsx";

export const RouterComponent = () => {
    return (
        <Routes>
            {/*<Route path="/" element={<Navigate to="/login" replace/>}/>*/}
            <Route path="/" element={<Login/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/forgot-password" element={<ForgotPassword/>}/>

            <Route path="/dashboard" element={<ProtectedRoute Component={<DashboardSuperAdmin/>} />}/>
        </Routes>
    )
}