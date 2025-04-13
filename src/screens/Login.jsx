import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import api from '../connection/connection';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validação básica
        if (!email || !password) {
            setError('Por favor, preencha todos os campos');
            setLoading(false);
            return;
        }

        try {
            api.post("user/login", {
                login:email,
                senha:password
            }).then((response) => {
                
                if (response.data.status === "error") {
                    setError(response.data.message);
                    setLoading(false);
                    return;
                }
                
                if(response.data.valor.admin == "true"){
                   
                    navigate('/admin/mensagem');
                    return
                }

                navigate('/mensagem');

            }).catch((error) => {
              
                setError(error.response.data.valor);
                setLoading(false);
                return;
            });

        } catch (err) {

            setError('Credenciais inválidas. Por favor, tente novamente.');
            console.error('Erro no login:', err);

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Login</h2>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Login</label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Digite seu login"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Digite sua senha"
                        />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? 'Carregando...' : 'Entrar'}
                    </button>
                </form>


            </div>
        </div>
    );
}

export default Login