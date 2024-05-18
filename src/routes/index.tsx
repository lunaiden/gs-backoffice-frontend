import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../pages/Auth/Login.tsx";
import {ForgotPassword} from "../pages/Auth/ForgotPassword.tsx";
import {DashboardSuperadmin} from "../pages/Dashboard/Dashboard-Superadmin.tsx";
import {ProtectedRoute} from "./ProtectedRoute.tsx";
import {ForgotPasswordConfirmation} from "../pages/Auth/ForgotPasswordConfirmation.tsx";
import {ResetPassword} from "../pages/Auth/ResetPassword.tsx";
import {ResetPasswordConfirmation} from "../pages/Auth/ResetPasswordConfirmation.tsx";
import {CompanyList} from "../pages/Company/CompanyList.tsx";
import {CompanyCreate} from "../pages/Company/CompanyCreate/CompanyCreate.tsx";
import {CompanyDetails} from "../pages/Company/CompanyDetails/CompanyDetails.tsx";
import {CompanyUpdate} from "../pages/Company/CompanyUpdate/CompanyUpdate.tsx";

export const RouterComponent = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/forgot-password" element={<ForgotPassword/>}/>
            <Route path="/forgot-password/confirmation" element={<ForgotPasswordConfirmation/>}/>
            <Route path="/reset-password/:token" element={<ResetPassword/>}/>
            <Route path="/reset-password-confirmation" element={<ResetPasswordConfirmation/>}/>

            <Route path="/superadmin/dashboard" element={<ProtectedRoute Component={<DashboardSuperadmin/>} />}/>


            {/* COMPANY */}
            <Route path="/superadmin/companies" element={<ProtectedRoute Component={<CompanyList/>} />}/>
            <Route path="/superadmin/companies/create" element={<ProtectedRoute Component={<CompanyCreate/>} />}/>
            <Route path="/superadmin/companies/details/:id" element={<ProtectedRoute Component={<CompanyDetails/>} />}/>
            <Route path="/superadmin/companies/edit/:id" element={<ProtectedRoute Component={<CompanyUpdate/>} />}/>
        </Routes>
    )
}