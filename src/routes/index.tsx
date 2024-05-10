import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../pages/Auth/Login.tsx";
import {ForgotPassword} from "../pages/Auth/ForgotPassword.tsx";
import {DashboardSuperadmin} from "../pages/Dashboard/Dashboard-Superadmin.tsx";
import {ProtectedRoute} from "./ProtectedRoute.tsx";
import {ForgotPasswordConfirmation} from "../pages/Auth/ForgotPasswordConfirmation.tsx";
import {ResetPassword} from "../pages/Auth/ResetPassword.tsx";
import {ResetPasswordConfirmation} from "../pages/Auth/ResetPasswordConfirmation.tsx";
import {CompanyList} from "../pages/Company/CompanyList.tsx";

export const RouterComponent = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/forgot-password" element={<ForgotPassword/>}/>
            <Route path="/forgot-password/confirmation" element={<ForgotPasswordConfirmation/>}/>
            <Route path="/reset-password/:token" element={<ResetPassword/>}/>
            <Route path="/reset-password-confirmation" element={<ResetPasswordConfirmation/>}/>

            <Route path="/dashboard" element={<ProtectedRoute Component={<DashboardSuperadmin/>} />}/>


            {/* COMPANY */}
            <Route path="/dashboard/company" element={<ProtectedRoute Component={<CompanyList/>} />}/>
        </Routes>
    )
}