import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";

import './ForgotPassword.css';

export const ForgotPasswordConfirmation = () => {


    const navigate = useNavigate();

    return (
        <div className='forgot-password-page'>
            <h1 className='mt-5 mb-3'>Consultez votre boîte mail !</h1>
            <h6>Si vous avez un compte sur notre site, vous devriez recevoir un email dans les prochaines minutes contenant un lien pour réinitialiser votre mot de passe.
                <br/><strong>Ce lien est valide pendant 24 heures.</strong>
            </h6>
            <br/>
            <div className='text-center mt-3'>
                <Button variant='outline-dark' onClick={() => navigate('/login')}>Revenir à la page de connexion</Button>
            </div>
        </div>
    )
};