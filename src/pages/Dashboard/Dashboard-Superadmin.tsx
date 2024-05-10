import {Button} from "react-bootstrap";
import {useAuth} from "../../hooks/useAuth.tsx";
import api from "../../utils/api.ts";
import {Header} from "../../components/Header/Header.tsx";

import './Dashboard.css';

export const DashboardSuperadmin = () => {
    const {logout} = useAuth();

    const logoutUser = () => {
        api.post('/auth/logout', {}, {withCredentials: true}).then(() => {
                logout();
            })
    };

    return (
        <>
            <Header title='Tableau de bord'/>
            <div className='bloc-page w-100 d-flex flex-column align-items-center'>
                <br/>
                <br/>
                <Button variant="dark" onClick={logoutUser}>Se déconnecter</Button>
            </div>
            <div className='bloc-img-forgot w-0'>

            </div>
        </>
    )
}