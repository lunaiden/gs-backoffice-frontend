import './Navbar.css';
import {NavLink} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth.tsx";
import api from "../../utils/api.ts";


export const Navbar = () => {
    const {logout} = useAuth();

    const logoutUser = () => {
        api.post('/auth/logout', {}, {withCredentials: true}).then(() => {
            logout();
        })
    };
    return (
        <>
            <div className="d-none d-md-flex bg-light sidebar"
            >
                <div className="navbar-list">
                    <div className='item'>
                        <NavLink to={'/dashboard'}>Tableau de bord</NavLink>
                    </div>
                    <div className='item'>
                        <NavLink to={'/dashboard/company'}>Entreprises</NavLink>
                    </div>
                </div>
                <br/>
                <div className='logout' onClick={logoutUser}>Se déconnecter</div>
            </div>
        </>
    )
};