import {Navigate, useNavigate} from "react-router-dom";
import './index.css'
import {Button, Form} from "react-bootstrap";
import {useState} from "react";
import api from "../../utils/api.ts";
import {useAuth} from "../../hooks/useAuth.tsx";

export const Login = () => {
    const {loginUser, user} = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    if (user) {
        return <Navigate to="/dashboard"/>;
    }

    console.log(typeof email);

    const handleLogin = () => {
        api.post('/auth/login', {email: email, password: password},
            {withCredentials: true}
        )
            .then((res) => {
                loginUser(res.data.user);
            })
            .catch(() => {
                setError('Identifiants incorrects');
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
                        {error &&
                            <Form.Text className='text-danger text-center'>
                                {error}
                            </Form.Text>}
                        <Button variant="dark" onClick={handleLogin}>Se connecter</Button>
                    </Form>
                    <Button variant="link" onClick={() => navigate('/forgot-password')}>Mot de passe oublié</Button>
                </div>
            </div>
            <div className="img-bloc"></div>
        </div>
    )
}