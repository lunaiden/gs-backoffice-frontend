import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HashRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {AuthProvider} from "./hooks/useAuth.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <HashRouter>
            <AuthProvider>
                <App/>
            </AuthProvider>
        </HashRouter>
    </React.StrictMode>,
)
