import {useNavigate, useParams} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import {useState} from "react";

import './ForgotPassword.css';
import api from "../../utils/api.ts";

export const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const {token} = useParams();

    const navigate = useNavigate();

    const handleResetPassword = async () => {
        const regex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/);

        if (password !== confirmPassword) {
            setError('Les mots de passe doivent être identiques');
            return;
        }

        if (!regex.test(password)) {
            setError('Mot de passe trop faible')
            return;
        }

        setError(null);
        await api.post('/auth/reset-password', {token, password, confirmPassword})
            .then(() => {
                console.log("DONE")
                navigate('/reset-password-confirmation', {replace: true})
            })
            .catch((err) => {
                console.log(err);
            })
    };

    return (
        <div className='forgot-password-page'>
            <h1 className='mb-3'>Réinitialisez votre mot de passe</h1>
            <br/>
            <Form.Group className="mb-3">
                <Form.Label>Nouveau mot de passe</Form.Label>
                <Form.Control type="password"
                              onChange={(e) => setPassword(e.target.value)}
                />
                <Form.Text id="passwordHelpBlock" muted>
                    Le mot de passe doit contenir au minimum 8 caractères, dont 1 majuscule, 1 minuscule, 1 caractère spécial et 1 chiffre.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Confirmez le mot de passe</Form.Label>
                <Form.Control type="password"
                              onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {error &&
                    <Form.Text className='text-danger'>
                        {error}
                    </Form.Text>}
            </Form.Group>
            <div className="buttons-group mt-5">
                <Button variant="outline-dark" onClick={() => navigate('/login', {replace: true})}>Retour</Button>
                <Button variant="dark" onClick={handleResetPassword}>Réinitialiser mon mot de passe</Button></div>
        </div>
    )
};