import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MessageForm.css';
import api from '../connection/connection';

const MessageForm = () => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        if (!message.trim()) {
            setError('Por favor, insira uma mensagem');
            setLoading(false);
            return;
        }

        try {
          
            api.post("/denuncia/salvar", {
                "msg":message,
                "titulo":title
            }).then((response) => { 

                setSuccess('Mensagem enviada com sucesso!');
                setLoading(false);
            }).catch((error) => {
                setError(error.response.data.valor);
                setLoading(false);
                return;
            });

          
            setTitle('');
            setMessage('');

        } catch (err) {

            setError('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.');

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <div className="form-card">
                <h2>Criar Nova Mensagem</h2>

                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Título ( opcional )</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Digite o título"
                            maxLength={100}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Mensagem</label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Digite sua mensagem"
                            rows={6}
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit" disabled={loading}>
                            {loading ? 'Enviando...' : 'Enviar Mensagem'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MessageForm;