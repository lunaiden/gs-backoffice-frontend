import {useNavigate} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import {useState} from "react";

import './ForgotPassword.css';
import {isEmail} from "../../utils/functions.ts";
import api from "../../utils/api.ts";

export const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleSendMail = async () => {
        if (isEmail(email)) {
            setError(null);

            await api.get('/auth/forgot-password', {params: {email}})
                .then(() => {
                    navigate('/forgot-password/confirmation');
                })
                .catch((err) => {
                    console.log('erreur', err);
                })
        } else {
            setError("Veuillez renseigner une adresse e-mail valide.");
        }
    };

    return (
        <div className='forgot-password-page'>
            <h1 className='mb-3'>Vous avez perdu votre mot de passe ?</h1>
            <h6>Pas de problème !
                Nous allons vous envoyer un lien pour le réinitialiser.
                Indiquez l'adresse e-mail que vous utilisez pour vous connecter à votre compte.</h6>
            <br/>
            <Form.Group className="mb-3">
                <Form.Label>Adresse e-mail</Form.Label>
                <Form.Control type="email" placeholder="email@example.com"
                              onChange={(e) => setEmail(e.target.value)}
                />
                {error &&
                    <Form.Text className='text-danger'>
                        Veuillez renseigner une adresse e-mail valide.
                    </Form.Text>}
            </Form.Group>
            <div className="buttons-group mt-5">
                <Button variant="outline-dark" onClick={() => navigate(-1)}>Retour</Button>
                <Button variant="dark" onClick={handleSendMail}>Réinitialiser mon mot de passe</Button></div>
        </div>
    )
};