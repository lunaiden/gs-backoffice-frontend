import {Button} from "react-bootstrap";
import {useAuth} from "../../hooks/useAuth.tsx";
import api from "../../utils/api.ts";

export const DashboardSuperAdmin = () => {
    const {logout} = useAuth();

    const logoutUser = () => {
        api.post('/auth/logout', {}, {withCredentials: true}).then(() => {
                logout();
            })
    };

    return (
        <>
            <div className='bloc-form-forgot w-100 d-flex flex-column align-items-center'>
                <h1 className='mb-5 mt-5'>Dashboard</h1>
                <br/>
                <br/>
                <Button variant="dark" onClick={logoutUser}>Se déconnecter</Button>
            </div>
            <div className='bloc-img-forgot w-0'>

            </div>
        </>
    )
}