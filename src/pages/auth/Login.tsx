import {Navigate, useNavigate} from "react-router-dom";
import './index.css'
import {Button, Form} from "react-bootstrap";
import {useState} from "react";
import api from "../../utils/api.ts";
import {useAuth} from "../../hooks/useAuth.tsx";

export const Login = () => {
    const {loginUser, user} = useAuth();
    const navigate = useNavigate();

    console.log(user);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    if (user) {
        console.log("j'passe là");
        return <Navigate to="/dashboard"/>;
    }

    const handleLogin = () => {
        api.post('/auth/login', {email, password},
            {withCredentials: true}
        )
            .then((res) => {
                console.log("la user data");
                loginUser(res.data.user);
            })
            .catch((err) => {
                console.log("login error", err);
            })
    }

    return (
        <div className='auth-page'>
            <div className='form-bloc'>
                <div className="login-form">
                    <h1 className="text-center">Connexion</h1>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Adresse e-mail</Form.Label>
                            <Form.Control type="email" placeholder="email@example.com"
                                          onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control type="password"
                                          onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="dark" onClick={handleLogin}>Se connecter</Button>
                    </Form>
                    <Button variant="link" onClick={() => navigate('/forgot-password')}>Mot de passe oublié</Button>
                </div>
            </div>
            <div className="img-bloc"></div>
        </div>
    )
}