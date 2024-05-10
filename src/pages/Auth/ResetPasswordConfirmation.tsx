import './ForgotPassword.css';
import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";

export const ResetPasswordConfirmation = () => {
    const navigate = useNavigate();

    return (
        <div className='forgot-password-page'>
            <h1 className='mt-5 mb-3'> Votre mot de passe a bien été réinitialisé !</h1>
            <h6>
                Super nouvelle ! Votre mot de passe a été changé avec succès. Vous pouvez désormais vous connecter à votre compte avec votre nouveau mot de passe.
            </h6>
            <br/>
            <div className='text-center mt-3'>
                <Button variant='dark' onClick={() => navigate('/login')}>Me connecter</Button>
            </div>
        </div>
    )
};