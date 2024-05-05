import {useNavigate} from "react-router-dom";

export const ForgotPassword = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Mot de passe oublié</h1>
            <br/>
            <button onClick={() => navigate(-1)}>Retour</button>
        </div>
    )
}