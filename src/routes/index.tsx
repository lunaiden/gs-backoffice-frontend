import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../pages/auth/Login.tsx";
import {ForgotPassword} from "../pages/auth/ForgotPassword.tsx";
import {DashboardSuperAdmin} from "../pages/dashboard/dashboard-superadmin.tsx";
import {ProtectedRoute} from "./ProtectedRoute.tsx";
import {ForgotPasswordConfirmation} from "../pages/auth/ForgotPasswordConfirmation.tsx";
import {ResetPassword} from "../pages/auth/ResetPassword.tsx";
import {ResetPasswordConfirmation} from "../pages/auth/ResetPasswordConfirmation.tsx";

export const RouterComponent = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/forgot-password" element={<ForgotPassword/>}/>
            <Route path="/forgot-password/confirmation" element={<ForgotPasswordConfirmation/>}/>
            <Route path="/reset-password/:token" element={<ResetPassword/>}/>
            <Route path="/reset-password-confirmation" element={<ResetPasswordConfirmation/>}/>

            <Route path="/dashboard" element={<ProtectedRoute Component={<DashboardSuperAdmin/>} />}/>
        </Routes>
    )
}